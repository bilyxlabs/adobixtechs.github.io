/**
 * Bilyx theme bootstrap – runs in <head> before paint.
 * Default: dark. Only uses light if the user previously chose light.
 */
(function () {
  var stored = localStorage.getItem('site-theme');
  var theme = stored === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
})();
