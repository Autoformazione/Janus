const MODE_OFF = "off";
const MODE_PARTIAL = "partial";
const MODE_FULL = "full";

let currentMode = MODE_OFF;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["defaultMode"], (result) => {
    const defaultMode = result.defaultMode || MODE_OFF;
    setMode(defaultMode);
  });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(["defaultMode"], (result) => {
    const defaultMode = result.defaultMode || MODE_OFF;
    setMode(defaultMode);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getStatus") {
    sendResponse({ mode: currentMode });
  } else if (message.type === "setMode") {
    chrome.storage.local.set({ defaultMode: message.mode });
    setMode(message.mode);
    sendResponse({ success: true });
  }
});

function setMode(mode) {
  currentMode = mode;
  updateBadge();

  let rulesToAdd = [];
  if (mode === MODE_PARTIAL || mode === MODE_FULL) {
    const blockedTypes = [
      ...(mode === MODE_PARTIAL ? [] : ["script"]),
      "xmlhttprequest",
      "ping",
      "media",
      "websocket",
      "other"
    ];
    rulesToAdd = [
      {
        id: 1,
        priority: 1,
        action: { type: "block" },
        condition: { resourceTypes: blockedTypes }
      }
    ];
  }

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: rulesToAdd
  });

  updateIcon(mode);
}

function updateIcon(mode) {
  const iconMap = {
    [MODE_OFF]: "icons/icon_off.png",
    [MODE_PARTIAL]: "icons/icon_partial.png",
    [MODE_FULL]: "icons/icon_full.png"
  };
  const titleMap = {
    [MODE_OFF]: "OFF",
    [MODE_PARTIAL]: "Parziale",
    [MODE_FULL]: "Totale"
  };
  chrome.action.setIcon({ path: iconMap[mode] });
  chrome.action.setTitle({ title: titleMap[mode] });
}

function updateBadge() {
  const textMap = {
    [MODE_OFF]: "",
    [MODE_PARTIAL]: "P",
    [MODE_FULL]: "T"
  };
  chrome.action.setBadgeText({ text: textMap[currentMode] });
  chrome.action.setBadgeBackgroundColor({
    color: currentMode === MODE_FULL ? "#ff0000" : currentMode === MODE_PARTIAL ? "#ffa500" : "#000000"
  });
}