// background.js
let userEnabled = true; // ON=colored icon, OFF=gray (persisted)

function isChatGPTUrl(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.hostname === "chat.openai.com" || u.hostname === "chatgpt.com";
  } catch {
    return false;
  }
}

function t(key) {
  try { return chrome.i18n.getMessage(key) || key; } catch { return key; }
}

async function refreshIcons() {
  const colored = !!userEnabled;
  const tabs = await chrome.tabs.query({});
  const coloredPath = { 16: "color_16.png", 48: "color_48.png", 128: "color_128.png" };
  const grayPath = { 16: "gray_16.png", 48: "gray_48.png", 128: "gray_128.png" };
  for (const t of tabs) {
    if (t.id) chrome.action.setIcon({ tabId: t.id, path: colored ? coloredPath : grayPath });
  }
}

function updateContextMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({ id: "jumpback-info", title: t("menuInfo"), contexts: ["action"] });
    chrome.contextMenus.create({ id: "jumpback-toggle", title: userEnabled ? t("menuToggleDisable") : t("menuToggleEnable"), contexts: ["action"] });
    if (userEnabled) {
      chrome.contextMenus.create({ id: "jumpback-page-jump", title: t("menuPageJump"), contexts: ["page"], documentUrlPatterns: ["https://chat.openai.com/*", "https://chatgpt.com/*"] });
    }
  });
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab || !tab.id) return;
  if (!userEnabled) return;
  if (isChatGPTUrl(tab.url)) {
    chrome.tabs.sendMessage(tab.id, { type: "jump" });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "jumpback-info") {
    chrome.tabs.create({ url: "https://github.com/wanyakomochimochi/ChatGPTJumpBack" });
  }
  if (info.menuItemId === "jumpback-toggle") {
    userEnabled = !userEnabled;
    chrome.storage?.local?.set?.({ userEnabled });
    refreshIcons();
    updateContextMenus();
    if (userEnabled) injectIntoExistingChatGPTTabs();
  }
  if (info.menuItemId === "jumpback-page-jump" && tab?.id && userEnabled) {
    chrome.tabs.sendMessage(tab.id, { type: "jump" });
  }
});

chrome.commands?.onCommand.addListener(async (command) => {
  if (command !== "jump-back") return;
  if (!userEnabled) return;
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const tab = tabs[0];
  if (tab?.id && isChatGPTUrl(tab.url)) {
    chrome.tabs.sendMessage(tab.id, { type: "jump" });
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    await refreshIcons();
    updateContextMenus();
  }
});
chrome.tabs.onActivated.addListener(async () => { await refreshIcons(); updateContextMenus(); });
chrome.tabs.onRemoved.addListener(async () => { await refreshIcons(); updateContextMenus(); });

chrome.runtime.onInstalled.addListener(async () => {
  try {
    const { userEnabled: stored } = await chrome.storage?.local?.get?.("userEnabled") || {};
    if (typeof stored === "boolean") userEnabled = stored;
  } catch {}
  await refreshIcons();
  updateContextMenus();
  if (userEnabled) injectIntoExistingChatGPTTabs();
});
chrome.runtime.onStartup.addListener(async () => {
  try {
    const { userEnabled: stored } = await chrome.storage?.local?.get?.("userEnabled") || {};
    if (typeof stored === "boolean") userEnabled = stored;
  } catch {}
  await refreshIcons();
  updateContextMenus();
  if (userEnabled) injectIntoExistingChatGPTTabs();
});
chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area !== "local" || !changes.userEnabled) return;
  userEnabled = !!changes.userEnabled.newValue;
  await refreshIcons();
  updateContextMenus();
});

async function injectIntoExistingChatGPTTabs() {
  try {
    const tabs = await chrome.tabs.query({ url: ["https://chat.openai.com/*", "https://chatgpt.com/*"] });
    for (const t of tabs) {
      if (!t.id) continue;
      try {
        await chrome.scripting.executeScript({ target: { tabId: t.id }, files: ["content.js"] });
      } catch (e) {
        // ignore
      }
    }
  } catch {}
}

