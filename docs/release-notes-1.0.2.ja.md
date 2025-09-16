# リリース v1.0.2

## 概要
- ChatGPT が末尾へ自動スクロールしても、読み途中へすばやく戻れます。

## ハイライト
- ChatGPT ページでワンクリック / ショートカットで復帰
- アイコン挙動はシンプル（ON=カラー、OFF=グレー）
- 多言語 UI（en/ja/zh‑CN/es/pt‑BR/ko/de/fr/hi）
- 解析なし・ON/OFF 設定のみローカル保存

## ショートカット
- Alt+J（mac は Alt+Shift+J）— `chrome://extensions/shortcuts` で変更可能

## 権限
- `contextMenus`, `tabs`, `storage`, `scripting`（既存タブへの注入にのみ使用）

## 変更点

### v1.0.2
- README の GIF デモを修正／更新
- 情報メニューのリンクが、ブラウザ言語に応じて日本語／英語の Chrome ウェブストアを開くように変更

### v1.0.1
- README に利用上の注意事項を追記
（非公式ツールであること、OpenAI公式ではないこと、自己責任での利用、DOM操作のみであることを明記）
- コンテキストメニュー生成における競合状態を修正

## リンク
- README: 機能・使い方・スクリーンショット
- Changelog: CHANGELOG.md
- Repo: https://github.com/wanyakomochimochi/ChatGPTJumpBack
