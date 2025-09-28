// Background script for SkipTheMid
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Set default settings on first install
        chrome.storage.sync.set({
            threshold: 8.0,
            enabled: true,
            showRatings: true,
            isPro: false,
            apiKey: '',
            installDate: Date.now()
        });

        // Open welcome page
        chrome.tabs.create({
            url: chrome.runtime.getURL('welcome.html')
        });
    }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes('netflix.com')) {
        // Toggle extension on Netflix
        chrome.storage.sync.get(['enabled'], (result) => {
            chrome.storage.sync.set({ enabled: !result.enabled });
        });
    } else {
        // Open Netflix in new tab
        chrome.tabs.create({ url: 'https://www.netflix.com' });
    }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateBadge') {
        chrome.action.setBadgeText({
            text: message.count > 0 ? message.count.toString() : '',
            tabId: sender.tab.id
        });
        chrome.action.setBadgeBackgroundColor({
            color: '#ff6b6b',
            tabId: sender.tab.id
        });
    }
});

// Periodic cleanup of old cache data
chrome.alarms.create('cleanup', { periodInMinutes: 60 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'cleanup') {
        // Clean up old cached ratings (older than 24 hours)
        chrome.storage.local.get(null, (items) => {
            const now = Date.now();
            const oneDay = 24 * 60 * 60 * 1000;
            
            Object.keys(items).forEach(key => {
                if (key.startsWith('rating_') && items[key].timestamp) {
                    if (now - items[key].timestamp > oneDay) {
                        chrome.storage.local.remove(key);
                    }
                }
            });
        });
    }
});
