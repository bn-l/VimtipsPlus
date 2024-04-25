import an from "../vendor/google-analytics.ts";


addEventListener("unhandledrejection", async(event) => {
    void an.error(event.reason);
});

chrome.runtime.onInstalled.addListener(() => {
    void an.event("install");
});

console.log("Hello from service worker!");
