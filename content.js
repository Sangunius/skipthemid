// SkipTheMid Content Script for Netflix
class SkipTheMid {
    constructor() {
        this.settings = {
            threshold: 8.0,
            enabled: true,
            showRatings: true,
            isPro: false,
            apiKey: ''
        };
        this.ratingCache = new Map();
        this.processedElements = new WeakSet();
        this.observer = null;
        this.init();
    }

    async init() {
        await this.loadSettings();
        this.setupMessageListener();
        
        if (this.settings.enabled) {
            this.startObserving();
            this.processExistingContent();
        }
    }

    async loadSettings() {
        try {
            const result = await chrome.storage.sync.get({
                threshold: 8.0,
                enabled: true,
                showRatings: true,
                isPro: false,
                apiKey: ''
            });
            this.settings = result;
        } catch (error) {
            console.error('SkipTheMid: Error loading settings:', error);
        }
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === 'settingsChanged') {
                this.loadSettings().then(() => {
                    this.restart();
                });
            }
        });
    }

    startObserving() {
        if (this.observer) {
            this.observer.disconnect();
        }

        this.observer = new MutationObserver((mutations) => {
            let shouldProcess = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldProcess = true;
                }
            });
            
            if (shouldProcess) {
                setTimeout(() => this.processExistingContent(), 500);
            }
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    restart() {
        this.clearAllOverlays();
        if (this.settings.enabled) {
            this.startObserving();
            this.processExistingContent();
        } else {
            if (this.observer) {
                this.observer.disconnect();
            }
        }
    }

    processExistingContent() {
        const titleElements = this.findTitleElements();
        titleElements.forEach(element => {
            if (!this.processedElements.has(element)) {
                this.processTitleElement(element);
                this.processedElements.add(element);
            }
        });
    }

    findTitleElements() {
        // Netflix uses various selectors for titles - we'll try multiple approaches
        const selectors = [
            '[data-uia="title-card-title"]',
            '.title-card-title',
            '[data-uia="title-card-title-text"]',
            '.title-card-title-text',
            '[data-uia="title-card-title-text-wrapper"]',
            '.title-card-title-text-wrapper',
            // Fallback selectors for different Netflix layouts
            '[data-uia*="title"]',
            '.title',
            '[class*="title"]'
        ];

        let elements = [];
        selectors.forEach(selector => {
            const found = document.querySelectorAll(selector);
            elements = elements.concat(Array.from(found));
        });

        // Remove duplicates and filter out elements that don't contain text
        return [...new Set(elements)].filter(el => {
            const text = el.textContent?.trim();
            return text && text.length > 0 && text.length < 100;
        });
    }

    async processTitleElement(element) {
        const title = this.extractTitle(element);
        if (!title) return;

        try {
            const rating = await this.getRating(title);
            this.applyRatingToElement(element, rating, title);
        } catch (error) {
            console.error('SkipTheMid: Error processing title:', title, error);
        }
    }

    extractTitle(element) {
        // Try to get the title text from various possible locations
        let title = element.textContent?.trim();
        
        // If the element contains other elements, try to find the main title
        if (element.children.length > 0) {
            const titleChild = element.querySelector('[data-uia*="title"], .title, [class*="title"]');
            if (titleChild) {
                title = titleChild.textContent?.trim();
            }
        }

        // Clean up the title
        if (title) {
            title = title.replace(/\s+/g, ' ').trim();
            // Remove common Netflix suffixes
            title = title.replace(/\s*\(\d{4}\)\s*$/, ''); // Remove year
            title = title.replace(/\s*Season\s+\d+\s*$/i, ''); // Remove season info
        }

        return title;
    }

    async getRating(title) {
        // Check cache first
        if (this.ratingCache.has(title)) {
            return this.ratingCache.get(title);
        }

        try {
            const rating = await this.fetchRatingFromAPI(title);
            this.ratingCache.set(title, rating);
            return rating;
        } catch (error) {
            console.error('SkipTheMid: Error fetching rating for:', title, error);
            return null;
        }
    }

    async fetchRatingFromAPI(title) {
        // Use OMDb API - user needs to provide their own API key
        const apiKey = this.settings.apiKey || 'demo'; // Demo key for testing
        
        // Check if we have a cached rating first
        const cacheKey = `rating_${title.toLowerCase().replace(/\s+/g, '_')}`;
        const cached = await this.getCachedRating(cacheKey);
        if (cached) {
            return cached;
        }
        
        try {
            const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.Response === 'True' && data.imdbRating && data.imdbRating !== 'N/A') {
                const rating = parseFloat(data.imdbRating);
                // Cache the rating for 24 hours
                await this.cacheRating(cacheKey, rating);
                return rating;
            }
            
            return null;
        } catch (error) {
            console.error('SkipTheMid: API Error:', error);
            return null;
        }
    }

    async getCachedRating(key) {
        try {
            const result = await chrome.storage.local.get(key);
            const cached = result[key];
            if (cached && cached.timestamp) {
                const now = Date.now();
                const oneDay = 24 * 60 * 60 * 1000;
                if (now - cached.timestamp < oneDay) {
                    return cached.rating;
                }
            }
        } catch (error) {
            console.error('SkipTheMid: Cache read error:', error);
        }
        return null;
    }

    async cacheRating(key, rating) {
        try {
            await chrome.storage.local.set({
                [key]: {
                    rating: rating,
                    timestamp: Date.now()
                }
            });
        } catch (error) {
            console.error('SkipTheMid: Cache write error:', error);
        }
    }

    applyRatingToElement(element, rating, title) {
        if (!rating) {
            this.addNoRatingIndicator(element);
            return;
        }

        // Add rating display
        if (this.settings.showRatings) {
            this.addRatingDisplay(element, rating);
        }

        // Apply hiding logic
        if (rating < this.settings.threshold) {
            this.hideElement(element);
        } else {
            this.showElement(element);
        }

        // Update stats
        this.updateStats();
    }

    addRatingDisplay(element, rating) {
        // Remove existing rating display
        const existing = element.querySelector('.skipthemid-rating');
        if (existing) {
            existing.remove();
        }

        const ratingDisplay = document.createElement('div');
        ratingDisplay.className = 'skipthemid-rating';
        ratingDisplay.textContent = `IMDb: ${rating}`;
        
        // Position the rating display
        element.style.position = 'relative';
        element.appendChild(ratingDisplay);
    }

    addNoRatingIndicator(element) {
        const indicator = document.createElement('div');
        indicator.className = 'skipthemid-no-rating';
        indicator.textContent = 'No rating';
        
        element.style.position = 'relative';
        element.appendChild(indicator);
    }

    hideElement(element) {
        element.classList.add('skipthemid-hidden');
        element.setAttribute('data-skipthemid-hidden', 'true');
    }

    showElement(element) {
        element.classList.remove('skipthemid-hidden');
        element.removeAttribute('data-skipthemid-hidden');
    }

    clearAllOverlays() {
        // Remove all SkipTheMid elements and classes
        document.querySelectorAll('.skipthemid-rating, .skipthemid-no-rating').forEach(el => el.remove());
        document.querySelectorAll('.skipthemid-hidden').forEach(el => {
            el.classList.remove('skipthemid-hidden');
            el.removeAttribute('data-skipthemid-hidden');
        });
        
        // Clear processed elements
        this.processedElements = new WeakSet();
    }

    updateStats() {
        const hiddenCount = document.querySelectorAll('.skipthemid-hidden').length;
        const visibleCount = document.querySelectorAll('[data-uia*="title"]:not(.skipthemid-hidden)').length;
        
        chrome.storage.local.set({
            hiddenCount,
            visibleCount
        });
    }
}

// Initialize SkipTheMid when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SkipTheMid();
    });
} else {
    new SkipTheMid();
}
