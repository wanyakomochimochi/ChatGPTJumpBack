# Chrome Web Store Listing (English)

## Short description (<= 132 chars)
Jump back to your last reading position in ChatGPT after auto-scroll.

## Full description
ChatGPT scrolls to the bottom after you send a prompt. ChatGPT JumpBack records the closest visible message (near the viewport center) so you can instantly return to where you were reading — without losing context.

Key features
- Auto-record on Enter (without Shift), Send button, or "scroll to latest/bottom" UI
- Jump via extension icon, keyboard shortcut (Alt+J; mac: Alt+Shift+J), or page context menu
- Icon color matches ON/OFF setting (ON = colored, OFF = gray)
- Works only on ChatGPT pages

How it works
- Records the nearest visible message block when you send or click "scroll to latest/bottom".
- Smoothly scrolls back to that message when triggered.

Permissions
- `contextMenus`, `tabs`, `storage`, `scripting`
- Host permissions: `https://chat.openai.com/*`, `https://chatgpt.com/*`
- Rationale: `scripting` + host permissions are used only to inject into already-open ChatGPT tabs. No analytics, no network calls.

Notes
- ChatGPT is a SPA and UI may change; if detection stops working, selector updates may be required.
- "Scroll to latest" detection includes a broad fallback to reduce missed detections (especially on mobile).

Privacy
- No user data is collected. Local storage is used only for the ON/OFF setting.
