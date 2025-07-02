const MODE_OFF = "off";
const MODE_PARTIAL = "partial";
const MODE_FULL = "full";

let currentMode = MODE_OFF;

// Lista whitelist domini (aggregatori e siti di notizie)
const whitelist = [
  "youtube.com",
  "news.google.com",
  "dailymotion.com",
  "rai.it",
  "rainews.it",
  "video.repubblica.it",
  "ilpost.it",
  "ansa.it",
  "fanpage.it",
  "skytg24.it",
  "tgcom24.mediaset.it",
  "euronews.com",
  "open.online",
  "ilmeteo.it",
  "meteo.it",
  "ilfattoquotidiano.it",
  "agi.it",
  "adnkronos.com",
  "notizie.tiscali.it",
  "lapresse.it"
];

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

  let rulesToAdd = [];

  if (mode === MODE_FULL) {
    // Modalità TOTALE: blocco completo, nessuna whitelist
    rulesToAdd.push({
      id: 1,
      priority: 1,
      action: { type: "block" },
      condition: {
        resourceTypes: ["script", "xmlhttprequest", "sub_frame", "ping", "media", "websocket", "other"]
      }
    });
  } else if (mode === MODE_PARTIAL) {
    // Modalità PARZIALE: blocco selettivo, con whitelist, senza bloccare script
    rulesToAdd.push({
      id: 1,
      priority: 1,
      action: { type: "block" },
      condition: {
        resourceTypes: ["xmlhttprequest", "sub_frame", "ping", "media", "websocket", "other"],
        excludedDomains: whitelist
      }
    });

    // Regola speciale Google News (esempio: blocco risorse non script)
    rulesToAdd.push({
      id: 1001,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "||news.google.com^",
        resourceTypes: ["ping", "websocket", "media", "other"],
        excludedDomains: whitelist
      }
    });
  }

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, 1001],
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
  chrome.action.setIcon({ path: iconMap[mode] });
  chrome.action.setTitle({
    title:
      mode === MODE_OFF
        ? "OFF"
        : mode === MODE_PARTIAL
        ? "Parziale"
        : "Totale"
  });
}

function updateBadge() {
  // Nessun badge, come richiesto
  chrome.action.setBadgeText({ text: "" });
}
