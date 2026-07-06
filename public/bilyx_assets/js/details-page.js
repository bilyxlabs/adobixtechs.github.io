/**
 * Detail pages – theme toggle (shared with main site via localStorage).
 */
(function () {
  'use strict';

  const root = document.documentElement;

  function resolveTheme() {
    if (window.BilyxTheme) {
      return window.BilyxTheme.resolveTheme();
    }
    const stored = localStorage.getItem('site-theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', normalized);
    const icon = document.querySelector('[data-theme-icon]');
    const btn = document.querySelector('[data-theme-toggle]');
    if (icon) {
      icon.className = normalized === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
    if (btn) {
      const label = normalized === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(resolveTheme());

    const btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (window.BilyxTheme) {
        window.BilyxTheme.setPreference(next);
      } else {
        localStorage.setItem('site-theme', next);
      }
      applyTheme(next);
    });
  });
})();
