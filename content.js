// content.js
(() => {
  "use strict";

  // Prevent multiple injections
  if (typeof window !== "undefined") {
    if (window.__chatgptJumpBackInjected) return;
    window.__chatgptJumpBackInjected = true;
  }

  let recordedIndex = null;
  let lastRecordTs = 0; // debounce for recordOnly
  try { console.log("[ChatGPT JumpBack] content loaded"); } catch {}

  function safeCheck() {
    return !!document.querySelector("div[data-message-author-role]");
  }

  // Record the message block closest to viewport center (with light debounce)
  function recordOnly() {
    const now = Date.now();
    if (now - lastRecordTs < 200) return;
    lastRecordTs = now;
    if (!safeCheck()) return;

    const blocks = Array.from(document.querySelectorAll("div[data-message-author-role]"));
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
      try { console.log("[ChatGPT JumpBack] recorded:", recordedIndex); } catch {}
    }
  }

  function jumpBack() {
    if (!safeCheck()) return;
    if (recordedIndex === null) {
      try { console.log("[ChatGPT JumpBack] no record"); } catch {}
      return;
    }
    const messages = document.querySelectorAll("div[data-message-author-role]");
    if (recordedIndex < messages.length) {
      messages[recordedIndex].scrollIntoView({ behavior: "smooth", block: "center" });
      try { console.log("[ChatGPT JumpBack] jump:", recordedIndex); } catch {}
    }
  }

  // Backward-compat custom event
  document.addEventListener("chatgpt-jumpback-dojump", () => jumpBack());

  // Message from background
  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg && msg.type === "jump") jumpBack();
    });
  }

  // Enter to send -> record
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) recordOnly();
    },
    true
  );

  // Send button detection (event delegation, capture)
  document.addEventListener(
    "click",
    (e) => {
      const btn = e.target instanceof Element ? e.target.closest("button") : null;
      if (!btn) return;
      if (btn.matches('button[data-testid="send-button"]')) { recordOnly(); return; }
      const aria = (btn.getAttribute("aria-label") || "").toLowerCase();
      if (/(^|\b)send\b/.test(aria) || aria.includes("送信")) { recordOnly(); return; }
    },
    true
  );

  // "Scroll to latest" broad detection (fallback): any button with an SVG icon
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

