# Release vX.Y.Z

## Summary
- One-line summary of the release (what users get).

## Highlights
- Bullet 1 (user-facing highlight)
- Bullet 2

## Changes
### Added
- ...
### Changed
- ...
### Fixed
- ...

## Permissions and Scope
- manifest version: X.Y.Z
- permissions: `contextMenus`, `tabs`, `storage`, `scripting`
- host permissions: `https://chat.openai.com/*`, `https://chatgpt.com/*`
- rationale: `scripting` + host permissions are used only to inject into already-open ChatGPT tabs.

## Screenshots
- Attach or reference images (1280×800 recommended)

## How to Update
1. Remove previous version if side-loaded.
2. Load vX.Y.Z via Developer Mode: `chrome://extensions/` -> Load unpacked.
3. Or install/update from Chrome Web Store when available.

## Checks
- [ ] Icon changes color according to ON/OFF
- [ ] Enter/Send/"scroll to latest" triggers recording
- [ ] Icon click / shortcut / page menu jump works on ChatGPT
- [ ] No errors in service worker console

## Links
- Changelog: CHANGELOG.md
- Repo: https://github.com/wanyakomochimochi/ChatGPTJumpBack
