// Initialize button with user's preferred color
let counterElement = document.getElementById("counter");

chrome.storage.sync.get("betaInternalServerCounter", ({ betaInternalServerCounter }) => {
    counterElement.innerHTML = betaInternalServerCounter;
});
