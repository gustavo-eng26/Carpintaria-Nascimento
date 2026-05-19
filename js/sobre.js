// sobre.js - Funcionalidades da página sobre

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppButton();
  initImageHoverEffect();
});

function initWhatsAppButton() {
  const whatsappButton = document.querySelector('a[aria-label="Contato via WhatsApp"]');
  if (whatsappButton) {
    whatsappButton.addEventListener('click', (e) => {
      console.log('WhatsApp contact clicked from Sobre page');
    });
  }
}

function initImageHoverEffect() {
  const image = document.querySelector('img[alt="Carpinteiro Jonas Nascimento trabalhando"]');
  if (image) {
    image.addEventListener('mouseenter', () => {
      image.style.filter = 'grayscale(0%)';
    });
    
    image.addEventListener('mouseleave', () => {
      image.style.filter = 'grayscale(100%)';
    });
  }
}
