// theme.js - Gerenciador de temas claro/escuro

const THEME_STORAGE_KEY = 'carpintaria-theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (prefersDark ? DARK_THEME : LIGHT_THEME);
  applyTheme(initialTheme);
  
  createThemeToggleButton();
}

function createThemeToggleButton() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const toggleButton = document.createElement('button');
  toggleButton.id = 'theme-toggle';
  toggleButton.className = 'px-4 py-2 rounded-full bg-amber-700 hover:bg-amber-800 text-white transition-all shadow-lg font-bold text-sm';
  toggleButton.setAttribute('aria-label', 'Alternar tema');
  
  const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  toggleButton.innerHTML = currentTheme === DARK_THEME 
    ? '☀️ Claro' 
    : '🌙 Escuro';
  
  toggleButton.addEventListener('click', toggleTheme);
  nav.appendChild(toggleButton);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || DARK_THEME;
  const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  applyTheme(newTheme);
}

function applyTheme(theme) {
  const html = document.documentElement;
  const toggleButton = document.getElementById('theme-toggle');
  
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  
  if (theme === LIGHT_THEME) {
    html.setAttribute('data-theme', 'light');
    document.body.style.backgroundColor = '#f5f5f4';
    if (toggleButton) {
      toggleButton.innerHTML = '🌙 Escuro';
    }
  } else {
    html.setAttribute('data-theme', 'dark');
    document.body.style.backgroundColor = '#1c1917';
    if (toggleButton) {
      toggleButton.innerHTML = '☀️ Claro';
    }
  }
}

document.addEventListener('DOMContentLoaded', initTheme);
