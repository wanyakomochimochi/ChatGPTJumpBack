// content.js
(() => {
  "use strict";

  // Prevent multiple injections
  if (typeof window !== "undefined") {
    if (window.__chatgptJumpBackInjected) return;
    window.__chatgptJumpBackInjected = true;
  }

  // Use a LIFO stack to keep multiple recorded indices
  let recordedStack = [];
  let lastRecordTs = 0; // debounce for recordOnly
  const STACK_LIMIT = 200;
  try {
    console.log("[ChatGPT JumpBack] content loaded");
  } catch {}

  function safeCheck() {
    return !!document.querySelector("div[data-message-author-role]");
  }

  function pushIndex(idx) {
    if (typeof idx !== "number" || Number.isNaN(idx)) return;
    const last = recordedStack.length
      ? recordedStack[recordedStack.length - 1]
      : null;
    if (last === idx) return; // avoid consecutive duplicates
    recordedStack.push(idx);
    if (recordedStack.length > STACK_LIMIT) recordedStack.shift();
  }

  // Record the message block closest to viewport center (with light debounce)
  function recordOnly() {
    const now = Date.now();
    if (now - lastRecordTs < 200) return;
    lastRecordTs = now;
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
      const idx = blocks.indexOf(target);
      pushIndex(idx);
      try {
        console.log(
          "[ChatGPT JumpBack] recorded:",
          idx,
          "stack size:",
          recordedStack.length
        );
      } catch {}
    }
  }

  function jumpBack() {
    if (!safeCheck()) return;
    if (!recordedStack.length) {
      try {
        console.log("[ChatGPT JumpBack] no record");
      } catch {}
      return;
    }
    const messages = document.querySelectorAll("div[data-message-author-role]");
    // Pop until a valid index is found or stack is empty
    while (recordedStack.length) {
      const idx = recordedStack.pop();
      if (typeof idx === "number" && idx >= 0 && idx < messages.length) {
        messages[idx].scrollIntoView({ behavior: "smooth", block: "center" });
        try {
          console.log(
            "[ChatGPT JumpBack] jump:",
            idx,
            "remaining stack:",
            recordedStack.length
          );
        } catch {}
        return;
      }
    }
    try {
      console.log("[ChatGPT JumpBack] no valid record");
    } catch {}
  }

  // Backward-compat custom event
  document.addEventListener("chatgpt-jumpback-dojump", () => jumpBack());

  // Message from background
  if (
    typeof chrome !== "undefined" &&
    chrome.runtime &&
    chrome.runtime.onMessage
  ) {
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
      const btn =
        e.target instanceof Element ? e.target.closest("button") : null;
      if (!btn) return;
      if (btn.matches('button[data-testid="send-button"]')) {
        recordOnly();
        return;
      }
      const aria = (btn.getAttribute("aria-label") || "").toLowerCase();
      if (/(^|\b)send\b/.test(aria) || aria.includes("送信")) {
        recordOnly();
        return;
      }
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
