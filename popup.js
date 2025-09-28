// Popup script for SkipTheMid extension
class SkipTheMidPopup {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadSettings();
        this.setupEventListeners();
        this.updateStats();
    }

    async loadSettings() {
        const result = await chrome.storage.sync.get({
            threshold: 8.0,
            enabled: true,
            showRatings: true,
            isPro: false,
            apiKey: ''
        });

        document.getElementById('threshold').value = result.threshold;
        document.getElementById('threshold-value').textContent = result.threshold;
        document.getElementById('enabled').checked = result.enabled;
        document.getElementById('show-ratings').checked = result.showRatings;

        // Handle Pro features
        if (!result.isPro) {
            this.lockProFeatures();
        }
    }

    lockProFeatures() {
        const thresholdSlider = document.getElementById('threshold');
        thresholdSlider.min = 6.0;
        thresholdSlider.max = 6.0;
        thresholdSlider.value = 6.0;
        thresholdSlider.disabled = true;
        thresholdSlider.classList.add('pro-feature');
        
        document.getElementById('threshold-value').textContent = '6.0';
    }

    setupEventListeners() {
        // Threshold slider
        const thresholdSlider = document.getElementById('threshold');
        const thresholdValue = document.getElementById('threshold-value');
        
        thresholdSlider.addEventListener('input', (e) => {
            thresholdValue.textContent = e.target.value;
        });

        thresholdSlider.addEventListener('change', async (e) => {
            await this.saveSettings();
            this.notifyContentScript();
        });

        // Toggle switches
        document.getElementById('enabled').addEventListener('change', async () => {
            await this.saveSettings();
            this.notifyContentScript();
        });

        document.getElementById('show-ratings').addEventListener('change', async () => {
            await this.saveSettings();
            this.notifyContentScript();
        });

        // Buttons
        document.getElementById('refresh').addEventListener('click', () => {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.reload(tabs[0].id);
            });
        });

        document.getElementById('upgrade').addEventListener('click', () => {
            chrome.tabs.create({url: 'https://gumroad.com/skipthemid'});
        });
    }

    async saveSettings() {
        const settings = {
            threshold: parseFloat(document.getElementById('threshold').value),
            enabled: document.getElementById('enabled').checked,
            showRatings: document.getElementById('show-ratings').checked
        };

        await chrome.storage.sync.set(settings);
    }

    notifyContentScript() {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0] && tabs[0].url.includes('netflix.com')) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'settingsChanged'
                });
            }
        });
    }

    async updateStats() {
        try {
            const result = await chrome.storage.local.get(['hiddenCount', 'visibleCount']);
            document.getElementById('hidden-count').textContent = result.hiddenCount || 0;
            document.getElementById('visible-count').textContent = result.visibleCount || 0;
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SkipTheMidPopup();
});
