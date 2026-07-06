/**
 * Bilyx theme bootstrap – runs in <head> before paint.
 * Default: system (prefers-color-scheme). User toggle saves light/dark override.
 */
(function () {
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function getStoredTheme() {
    var stored = localStorage.getItem('site-theme');
    return stored === 'light' || stored === 'dark' ? stored : null;
  }

  function resolveTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }

  applyTheme(resolveTheme());

  window.BilyxTheme = {
    getSystemTheme: getSystemTheme,
    getStoredTheme: getStoredTheme,
    resolveTheme: resolveTheme,
    applyTheme: applyTheme,
    setPreference: function (theme) {
      localStorage.setItem('site-theme', theme === 'dark' ? 'dark' : 'light');
      applyTheme(theme);
    }
  };

  if (!getStoredTheme() && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  var path = window.location.pathname;
  if (/\/index\.html$/i.test(path)) {
    var cleanPath = path.replace(/\/index\.html$/i, '/') || '/';
    window.history.replaceState(
      null,
      '',
      cleanPath + window.location.search + window.location.hash
    );
  }
})();
