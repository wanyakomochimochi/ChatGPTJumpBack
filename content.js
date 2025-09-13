// content.js
(() => {
  "use strict";

  let recordedIndex = null;
  try { console.log("[ChatGPT JumpBack] content loaded"); } catch {}

  function safeCheck() {
    return !!document.querySelector("div[data-message-author-role]");
  }

  // 画面中央に最も近い要素を記録
  function recordOnly() {
    if (!safeCheck()) return;
    const blocks = Array.from(
      document.querySelectorAll("div[data-message-author-role]")
    );
    if (blocks.length === 0) return;

    const viewportCenter = window.innerHeight / 2;
    let target = null;
    let minDistance = Infinity;

    for (const block of blocks) {
      const rect = block.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const blockCenter = (rect.top + rect.bottom) / 2;
        const distance = Math.abs(blockCenter - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          target = block;
        }
      }
    }

    if (target) {
      recordedIndex = blocks.indexOf(target);
      console.log("[ChatGPT JumpBack] 記録:", recordedIndex);
    }
  }

  // 記録位置にジャンプ
  function jumpBack() {
    if (!safeCheck()) return;
    if (recordedIndex === null) {
      console.log("[ChatGPT JumpBack] 記録がありません");
      return;
    }
    const messages = document.querySelectorAll("div[data-message-author-role]");
    if (recordedIndex < messages.length) {
      messages[recordedIndex].scrollIntoView({ behavior: "smooth", block: "center" });
      console.log("[ChatGPT JumpBack] ジャンプ:", recordedIndex);
    }
  }

  // 互換用カスタムイベント
  document.addEventListener("chatgpt-jumpback-dojump", () => {
    jumpBack();
  });

  // 背景スクリプトからのメッセージでジャンプ
  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg && msg.type === "jump") jumpBack();
    });
  }

  // キーボードショートカットは Chrome の commands に統一

  // Enter送信時に記録
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) recordOnly();
    },
    true // capture: ChatGPT 側で stopPropagation されても拾う
  );

  // ページ内ショートカット実装は削除（競合回避・設定の一元化のため）

  // 送信ボタン監視
  const sendObserver = new MutationObserver(() => {
    const sendBtn = document.querySelector('button[data-testid="send-button"]');
    if (sendBtn && !sendBtn.dataset._jb_bound) {
      sendBtn.addEventListener("click", () => recordOnly());
      sendBtn.dataset._jb_bound = "1";
    }
  });
  if (document.body) {
    sendObserver.observe(document.body, { childList: true, subtree: true });
  }

  // 「最新へ」ボタンらしきものをクリックしたら記録（簡易判定）
  document.addEventListener(
    "click",
    (e) => {
      const path = e.composedPath ? e.composedPath() : e.path || [];
      for (const el of path) {
        if (!(el instanceof Element)) continue;
        if (el.tagName === "BUTTON" && el.querySelector("svg")) {
          recordOnly();
          break;
        }
      }
    },
    true
  );
})();
