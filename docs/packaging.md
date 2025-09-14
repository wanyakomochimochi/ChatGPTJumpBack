# Packaging (Chrome Web Store)

This guide is for maintainers preparing the submission ZIP.

## Files to includea

- Core: `manifest.json`, `background.js`, `content.js`
- Options: `options.html`, `options.js`
- Locales: `_locales/` (all subfolders)
- Icons: `color_16.png`, `color_48.png`, `color_128.png`, `gray_16.png`, `gray_48.png`, `gray_128.png`

Exclude development files (`docs/`, `.github/`, `.git*`, `dist/`, etc.).

## PowerShell commands

```
New-Item -ItemType Directory -Force dist | Out-Null
$files = @(
  'manifest.json','background.js','content.js',
  'options.html','options.js','_locales',
  'color_16.png','color_48.png','color_128.png',
  'gray_16.png','gray_48.png','gray_128.png'
)

# Fixed name
Compress-Archive -Path $files -DestinationPath dist/ChatGPTJumpBack-v1.0.0.zip -Force

# Dynamic (use manifest version)
$mf = Get-Content manifest.json -Raw | ConvertFrom-Json
$ver = $mf.version
Compress-Archive -Path $files -DestinationPath ("dist/ChatGPTJumpBack-v$ver.zip") -Force
```

## Post-approval checklist (when the item is approved)

- Make the GitHub repository public
- Add the Chrome Web Store URL to README (Links section)
- Update in‑extension info link to the Store URL (replace GitHub link in `background.js`), then bump version for the next release
- Create a GitHub Release with the approved version and attach notes/screenshots if needed
