(() => {
  const toggle = document.getElementById('enabledToggle');

  function applyI18n() {
    try {
      const uiLang = chrome.i18n.getUILanguage?.() || 'en';
      document.documentElement.lang = uiLang;
    } catch {}
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      try {
        const msg = chrome.i18n.getMessage(key);
        if (msg) {
          if (el.tagName === 'TITLE') document.title = msg;
          else el.textContent = msg;
        }
      } catch {}
    });
  }

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
      console.error('[ChatGPT JumpBack] Failed to save settings', e);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    applyI18n();
    load();
  });
})();

