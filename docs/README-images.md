# Images and Annotations Guide

This guide helps you create Store screenshots quickly and consistently.

## Target size
- 1280×800 (recommended by Chrome Web Store)
- PNG format, keep text readable (2–3 MB or less per image)

## Suggested 3 screenshots
1) After sending – at the bottom
- Show ChatGPT scrolled to the latest message (value context)
- Toolbar with the extension icon (colored = ON) visible
- Optional caption: “送信後、ページ末尾へ / After sending, at the bottom”

2) Right‑click menu – start the jump
- Show the page context menu with “読み途中の会話に戻る / Return to last reading position” highlighted
- Optional caption: “右クリック → 読み途中へ（Alt+J） / Right‑click → Jump back (Alt+J)”

3) Restored position – result
- Show the previous reading message centered, optionally highlighted
- Optional caption: “ワンクリックで読み途中へ / Back to where you were”

## How to capture
- Windows: Win+Shift+S (Snipping Tool) / macOS: Cmd+Shift+4
- Zoom 100%, hide unrelated toolbars/extensions, blur any personal info

## How to annotate (SVG template)
- Open `docs/annotation-template.svg` in Inkscape/Illustrator/VS Code SVG preview
- Insert your screenshot: add `<image href="screenshot-*.png" x="0" y="0" width="1280" height="800" />`
- Add/adjust:
  - Highlight rectangle: `<rect class="highlight" ... />`
  - Arrow path: `<path class="arrow" d="M ..." />`
  - Caption: background pill `<rect class="pill" ... />` + text `<text class="caption">...</text>`
- Export as PNG at 1280×800

## Style tokens
- Caption font: Segoe UI / Arial, 24px, semi‑bold, white on dark pill (60% black)
- Accent color: #2D6CDF (arrows, highlights)
- Corner radius: 10–12 px

## File names
- docs/screenshot-1-bottom.png
- docs/screenshot-2-menu.png
- docs/screenshot-3-restored.png

## Tips
- Keep captions short (5–8 words)
- Prefer light theme for clarity (or keep all images consistent)
- Make sure texts match README/Store descriptions (Alt+J / mac: Alt+Shift+J)
