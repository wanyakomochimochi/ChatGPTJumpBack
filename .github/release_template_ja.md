# リリース vX.Y.Z

## 概要
- リリースの一行サマリ（ユーザーにとっての価値）。

## ハイライト
- 主要な改善点 1（ユーザー視点）
- 主要な改善点 2

## 変更点
### 追加
- ...
### 変更
- ...
### 修正
- ...

## 権限と対象
- manifest の version: X.Y.Z
- permissions: `contextMenus`, `tabs`, `storage`, `scripting`
- host permissions: `https://chat.openai.com/*`, `https://chatgpt.com/*`
- rationale（理由）: 既存の ChatGPT タブへ注入するために `scripting` と host 権限を使用（それ以外では使用しません）。

## スクリーンショット
- 画像を添付またはリンク（1280×800 推奨）

## アップデート手順
1. サイドロードしている場合は前版を削除
2. `chrome://extensions/` → デベロッパーモード → 「パッケージ化されていない拡張機能を読み込む」で vX.Y.Z を読み込み
3. もしくは Chrome ウェブストアで更新

## チェック項目
- [ ] ON/OFF に応じてアイコン色が切り替わる
- [ ] Enter/送信ボタン/「最新へ」で記録される
- [ ] アイコン/ショートカット/ページ右クリックでジャンプ（ChatGPT 上）
- [ ] サービスワーカーコンソールにエラーなし

## リンク
- Changelog: CHANGELOG.md
- Repo: https://github.com/wanyakomochimochi/ChatGPTJumpBack
