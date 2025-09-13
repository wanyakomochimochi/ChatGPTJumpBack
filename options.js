(() => {
  const toggle = document.getElementById('enabledToggle');

  async function load() {
    try {
      const { userEnabled } = await chrome.storage.local.get(['userEnabled']);
      toggle.checked = typeof userEnabled === 'boolean' ? userEnabled : true;
    } catch (e) {
      toggle.checked = true;
    }
  }

  toggle.addEventListener('change', async () => {
    try {
      await chrome.storage.local.set({ userEnabled: toggle.checked });
    } catch (e) {
      console.error('[ChatGPT JumpBack] 設定保存に失敗しました', e);
    }
  });

  // ホットキー関連の処理は commands に統一したため不要

  document.addEventListener('DOMContentLoaded', load);
})();
