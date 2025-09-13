# ChatGPT JumpBack

When you send a prompt in ChatGPT, the page scrolls to the bottom. With JumpBack, you can quickly return to where you were reading so you don’t lose context.

---

## ✨ Features

- Auto-record: Saves the nearest visible message block (center of the screen) when you:
  - Press Enter to send a prompt
  - Click the Send button
  - Click the “Scroll to latest” button
- Jump back: Instantly scroll back to the recorded position
- Icon state:
  - Color = enabled (active on ChatGPT page)
  - Gray = disabled
- Context menus:
  - Right-click the extension icon:
    - Open “ChatGPT JumpBack” page (Chrome Web Store link)
    - Toggle “Enable/Disable ChatGPT JumpBack”
  - Right-click the page (only on ChatGPT when enabled):
    - “Return to last reading position”
- Keyboard shortcut:
  - Default: Alt+J (changeable at chrome://extensions/shortcuts)
- Auto enable/disable:
  - Enabled only if the active tab is a ChatGPT page
  - Disabled automatically when ChatGPT tab is closed or inactive

---

## 🛠 Installation (Developer Mode)

1. Download this repository (Code → Download ZIP) and unzip.
2. Open Chrome → `chrome://extensions/`.
3. Enable Developer mode (top-right).
4. Click “Load unpacked” and select the unzipped folder.
5. The extension icon should appear in your toolbar.

---

## ⚠ Notes

- This extension relies on ChatGPT’s DOM structure.
  It detects `div[data-message-author-role]` elements to recognize ChatGPT pages.
- Since ChatGPT is a SPA (Single Page Application), UI updates may change behaviors.
- If it stops working, updating the selector may be required.

---

## 📜 License

MIT License

---

# ChatGPT JumpBack（日本語）

ChatGPT でプロンプトを送信するとページが末尾までスクロールされます。JumpBack は、読み途中の場所に素早く戻れる拡張機能です。会話の流れを追いやすくなり、文脈を見失いません。

---

## ✨ 機能

- 自動記録: 次の操作時に、画面中央に最も近い会話ブロックを記録
  - Enter キーで送信
  - 送信ボタンをクリック
  - 「最新へ」ボタンをクリック
- ジャンプバック: 記録した位置までスムーズに戻ります
- アイコン状態:
  - カラー = 有効（ChatGPT ページで動作中）
  - グレー = 無効
- コンテキストメニュー:
  - 拡張アイコンの右クリック:
    - 「ChatGPT JumpBack」ページを開く（Chrome ウェブストア）
    - 「ChatGPT JumpBack を有効化/無効化」
  - ページの右クリック（ChatGPT かつ有効時のみ表示）:
    - 「読み途中の会話に戻る」
- キーボードショートカット:
  - 既定: Alt+J（chrome://extensions/shortcuts で変更可能）
- 自動有効/無効:
  - アクティブタブが ChatGPT ページなら自動で有効
  - ChatGPT を閉じる / 他のページに切替えで自動無効

---

## 🛠 インストール方法（開発者モード）

1. 本リポジトリをダウンロード（右上の Code → Download ZIP）して解凍
2. Chrome で `chrome://extensions/` にアクセス
3. 右上の「デベロッパーモード」をオン
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、解凍したフォルダを選択
5. ツールバーにアイコンが表示されれば成功

---

## ⚠ 注意点

- ChatGPT の DOM 構造に依存しています。`div[data-message-author-role]` 要素で ChatGPT ページを判定します。
- ChatGPT は SPA（シングルページアプリ）なので、UI 更新で動作が変わる可能性があります。
- 動作しなくなった場合は、セレクタの更新が必要になることがあります。

---

## 📜 ライセンス

MIT License
