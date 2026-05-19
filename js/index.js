// index.js - Funcionalidades da página inicial

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppButton();
  initScrollAnimations();
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
