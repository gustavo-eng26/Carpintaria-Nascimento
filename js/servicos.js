// servicos.js - Funcionalidades da página de serviços

document.addEventListener('DOMContentLoaded', () => {
  initCardHoverEffects();
  initWhatsAppButton();
});

function initCardHoverEffects() {
  const cards = document.querySelectorAll('[class*="bg-"][class*="border-stone-700"]');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

function initWhatsAppButton() {
  const whatsappButton = document.querySelector('a[aria-label="Contato via WhatsApp"]');
  if (whatsappButton) {
    whatsappButton.addEventListener('mouseover', () => {
      whatsappButton.style.transform = 'scale(1.1)';
    });

    whatsappButton.addEventListener('mouseout', () => {
      whatsappButton.style.transform = 'scale(1)';
    });
  }
}
