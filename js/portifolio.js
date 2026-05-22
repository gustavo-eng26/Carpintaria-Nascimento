document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('close-lightbox');
    const prevBtn = document.getElementById('prev-lightbox');
    const nextBtn = document.getElementById('next-lightbox');

    let currentIndex = 0; // Para rastrear a imagem atual na galeria

    const openLightbox = (index) => {
        currentIndex = index;
        const item = galleryItems[currentIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('p')?.textContent || '';

        // Se a imagem for do Unsplash, carregamos uma versão maior (1600px) para o zoom
        const highResSrc = img.src.includes('unsplash.com') ? img.src.replace('w=800', 'w=1600') : img.src;
        lightboxImg.src = highResSrc;
        lightboxCaption.textContent = caption;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.classList.add('overflow-hidden'); // Trava o scroll da página
    };

    const closeLightbox = () => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
        lightboxImg.src = '';
        lightboxCaption.textContent = '';
    };

    const showNextImage = () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(currentIndex);
    };

    const showPreviousImage = () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    // Fecha ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Fecha com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPreviousImage();
        }
    });
});