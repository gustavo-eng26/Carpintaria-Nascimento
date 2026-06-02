// index.js - Funcionalidades da página inicial

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppButton();
  initScrollAnimations();
  initMobileMenu();
});

function initWhatsAppButton() {
  const whatsappButton = document.querySelector('a[aria-label="Contato via WhatsApp"]');
  if (whatsappButton) {
    whatsappButton.addEventListener('mouseover', () => {
      whatsappButton.classList.add('shadow-[0_10px_25px_rgba(37,211,102,0.4)]');
    });
  }
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('main-nav');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', (e) => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('hidden');
  });

  // Fechar o menu ao clicar fora (apenas quando aberto)
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Fechar o menu ao clicar em um link (mobile)
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
