

chrome.runtime.onInstalled.addListener(() => {
    const startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);
    chrome.storage.sync.set({ betaInternalServerCounter: 0, startDate: startDate.toISOString() });
    console.log('Starting betaInternalServerCounter at 0');
});

chrome.webRequest.onCompleted.addListener(
    () => {
        chrome.storage.sync.get(['betaInternalServerCounter', 'startDate'], function ({ betaInternalServerCounter: actualCounter, startDate }) {
            const currentDate = new Date();
            const startDateTomorrow = new Date(startDate)
            startDateTomorrow.setDate(startDateTomorrow.getDate() + 1)
            if (startDateTomorrow.toISOString() < currentDate.toISOString()) {
                currentDate.setUTCHours(0, 0, 0, 0);
                chrome.storage.sync.set({ betaInternalServerCounter: 1, startDate: currentDate });
            } else {
                chrome.storage.sync.set({ betaInternalServerCounter: actualCounter + 1 });
            }
        });
    },
    { urls: ["*://*.aodap-staging.fr/*/500"] },
);