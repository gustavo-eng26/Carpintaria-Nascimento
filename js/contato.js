// contato.js - Funcionalidades da página de contato

document.addEventListener('DOMContentLoaded', () => {
  initFormHandler();
  initWhatsAppButton();
  initFormValidation();
});

function initFormHandler() {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      console.log('Form submitted');
      // Formspree handles the submission
    });
  }
}

function initWhatsAppButton() {
  const whatsappButton = document.querySelector('a[aria-label="Contato via WhatsApp"]');
  if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
      console.log('WhatsApp contact initiated from contact page');
    });
  }
}

function initFormValidation() {
  const inputs = document.querySelectorAll('input[required], textarea[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        input.classList.add('border-red-500');
      } else {
        input.classList.remove('border-red-500');
      }
    });
  });
}
