# Release v1.1.0

## Overview

- This feature lets you return to your original place with a single click after sending a question to the AI or pressing the scroll button while using ChatGPT. When you’re reviewing past conversation logs and feel like asking a question, you no longer need to search for your place again. After viewing the AI’s response, if you come up with another question, no problem! With just a few clicks, you can always return to your original spot.

## Highlights

- One-click or keyboard shortcut return on ChatGPT pages

- Simple icon behavior (ON = color, OFF = gray)
- Multi-language UI (en/ja/zh-CN/es/pt-BR/ko/de/fr/hi)
- No analytics; ON/OFF settings are saved locally only

## Shortcuts

- Alt+J (Alt+Shift+J on Mac) — configurable at chrome://extensions/shortcuts

## Permissions

- contextMenus, tabs, storage, scripting (used only for injection into existing tabs)

## Changes

### v1.1.0

- Extended the feature to allow jumping back repeatedly to earlier positions on the page, not just the most recent one.

### v1.0.2

- Fixed/updated GIF demo in README.
- Info menu link now opens Chrome Web Store in JA/EN based on browser language.

### v1.0.1

- Added usage disclaimer to the README
  (clarifying that this is an unofficial tool, not affiliated with OpenAI, use at your own risk, and operates only on the visible DOM)
- Fixed a race condition in context menu creation

## Links

- README: https://github.com/wanyakomochimochi/ChatGPTJumpBack#readme
- Changelog: https://github.com/wanyakomochimochi/ChatGPTJumpBack/blob/main/CHANGELOG.md
- Repository: https://github.com/wanyakomochimochi/ChatGPTJumpBack
