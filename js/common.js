// common.js - Scripts usados em todas as páginas

document.addEventListener('DOMContentLoaded', () => {
  initGlobalMobileMenu();
});

function initGlobalMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('main-nav');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('hidden');
  });

  document.addEventListener('click', (event) => {
    if (!menu.classList.contains('hidden') && !menu.contains(event.target) && !toggle.contains(event.target)) {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
