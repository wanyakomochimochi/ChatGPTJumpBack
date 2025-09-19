# リリース v1.1.0

## 概要

- ChatGPTの利用時に、AIに質問を送信したり、スクロールボタンを押した後に、ワンクリックで元の場所に戻れる機能です。過去の会話ログを読み返していて、質問がしたくなったとき、再び元の会話の位置を探す手間が省けます。質問した後にAIから送られてきた回答を見て、また新しい質問がしたくなっても大丈夫！複数回のクリックで、いつでも元の場所まで戻ってこられます。

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

### v1.1.0

- ページ上で直前だけでなく、それ以前の位置にも繰り返し戻れるように機能を拡張

### v1.0.2

- README の GIF デモを修正／更新
- 情報メニューのリンクが、ブラウザ言語に応じて日本語／英語の Chrome ウェブストアを開くように変更

### v1.0.1

- README に利用上の注意事項を追記
  （非公式ツールであること、OpenAI 公式ではないこと、自己責任での利用、DOM 操作のみであることを明記）
- コンテキストメニュー生成における競合状態を修正

## リンク

- README: https://github.com/wanyakomochimochi/ChatGPTJumpBack/blob/main/README.ja.md
- 変更履歴: https://github.com/wanyakomochimochi/ChatGPTJumpBack/blob/main/CHANGELOG.md
- リポジトリ: https://github.com/wanyakomochimochi/ChatGPTJumpBack
