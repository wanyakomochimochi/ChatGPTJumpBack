// background.js
let userEnabled = true; // ユーザー設定（有効/無効）
let isChatGPT = false;  // アクティブタブが ChatGPT かどうか

function isChatGPTUrl(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.hostname === "chat.openai.com" || u.hostname === "chatgpt.com";
  } catch {
    return false;
  }
}

function updateIcon(tabId) {
  const active = userEnabled && isChatGPT;
  const path = active
    ? { 16: "icon_16x16.png", 48: "icon_48x48.png", 128: "icon_128x128.png" }
    : { 16: "icon_gray_16x16.png", 48: "icon_gray_48x48.png", 128: "icon_gray_128x128.png" };
  chrome.action.setIcon({ tabId, path });
}

function updateContextMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "jumpback-info",
      title: "ChatGPT JumpBack",
      contexts: ["action"],
    });

    chrome.contextMenus.create({
      id: "jumpback-toggle",
      title: userEnabled ? "ChatGPT JumpBack を無効化" : "ChatGPT JumpBack を有効化",
      contexts: ["action"],
    });

    chrome.contextMenus.create({
      id: "jumpback-open-options",
      title: "設定を開く",
      contexts: ["action"],
    });

    if (userEnabled && isChatGPT) {
      chrome.contextMenus.create({
        id: "jumpback-page-jump",
        title: "読み途中の会話に戻る",
        contexts: ["page"],
        documentUrlPatterns: ["https://chat.openai.com/*", "https://chatgpt.com/*"],
      });
    }
  });
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab || !tab.id) return;
  const active = userEnabled && isChatGPTUrl(tab.url);
  if (active) {
    chrome.tabs.sendMessage(tab.id, { type: "jump" });
  }
});

// キーボードショートカット（Chrome commands）
chrome.commands?.onCommand.addListener(async (command) => {
  if (command !== "jump-back") return;
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const tab = tabs[0];
  if (!tab || !tab.id) return;
  const active = userEnabled && isChatGPTUrl(tab.url);
  if (active) {
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
    if (tab?.id) updateIcon(tab.id);
    updateContextMenus();
  }

  if (info.menuItemId === "jumpback-page-jump" && tab?.id) {
    chrome.tabs.sendMessage(tab.id, { type: "jump" });
  }

  if (info.menuItemId === "jumpback-open-options") {
    chrome.runtime.openOptionsPage();
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab?.active) {
    isChatGPT = isChatGPTUrl(tab.url);
    updateIcon(tabId);
    updateContextMenus();
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    isChatGPT = isChatGPTUrl(tab?.url);
    updateIcon(activeInfo.tabId);
    updateContextMenus();
  } catch {
    isChatGPT = false;
  }
});

chrome.tabs.onRemoved.addListener(async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs[0]) {
    isChatGPT = isChatGPTUrl(tabs[0].url);
    updateIcon(tabs[0].id);
  } else {
    isChatGPT = false;
  }
  updateContextMenus();
});

chrome.runtime.onInstalled.addListener(async () => {
  try {
    const { userEnabled: stored } = await chrome.storage?.local?.get?.("userEnabled") || {};
    if (typeof stored === "boolean") userEnabled = stored;
  } catch {}
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs[0]) {
    isChatGPT = isChatGPTUrl(tabs[0].url);
    updateIcon(tabs[0].id);
  } else {
    isChatGPT = false;
  }
  updateContextMenus();
});

chrome.runtime.onStartup.addListener(async () => {
  try {
    const { userEnabled: stored } = await chrome.storage?.local?.get?.("userEnabled") || {};
    if (typeof stored === "boolean") userEnabled = stored;
  } catch {}
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs[0]) {
    isChatGPT = isChatGPTUrl(tabs[0].url);
    updateIcon(tabs[0].id);
  } else {
    isChatGPT = false;
  }
  updateContextMenus();
});

// 設定変更の監視（即時反映）
chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area !== "local" || !changes.userEnabled) return;
  userEnabled = !!changes.userEnabled.newValue;
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs[0]) updateIcon(tabs[0].id);
  updateContextMenus();
});
