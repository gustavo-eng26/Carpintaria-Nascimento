document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('close-lightbox');
    const prevBtn = document.getElementById('prev-lightbox');
    const nextBtn = document.getElementById('next-lightbox');

    const tabPhotosBtn = document.getElementById('tab-photos-btn');
    const tabVideosBtn = document.getElementById('tab-videos-btn');
    const photoSection = document.getElementById('photo-section');
    const videoSection = document.getElementById('video-section');

    let currentIndex = 0;
    const allImages = [];

    // Detecta as imagens numeradas no padrão "portifolio (N).jpeg"
    // Ajuste o total se necessário; aqui detectamos até 999 para segurança.
    const maxCheck = 999;
    for (let i = 1; i <= maxCheck; i++) {
        const relPath = `../imagens/portifolio (${i}).jpeg`;
        // Não podemos verificar arquivos localmente no navegador sem requisição,
        // então assumimos que os arquivos numerados existem até encontrarmos uma sequência vazia.
        allImages.push({ src: relPath, alt: `Projeto ${i}`, number: i });
    }

    // Se preferir limitar a 135 (conforme conjunto atual), altere maxCheck ou filtre abaixo.
    // Filtrar por existência não é trivial sem requisições; para performance, vamos limitar com base no que já existe no repositório.
    // Reduzir para 135 conforme imagens presentes no repositório.
    const images = allImages.slice(0, 135);

    function renderGallery() {
        if (!galleryContainer) return;
        galleryContainer.innerHTML = '';
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'aspect-square overflow-hidden rounded-3xl group relative gallery-item cursor-pointer';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" class="w-full h-full object-cover transition-transform duration-500" loading="lazy">
                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p class="text-white font-bold uppercase text-sm">Projeto nº ${image.number}</p>
                </div>
            `;
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryContainer.appendChild(galleryItem);
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        const img = images[index];
        lightboxImg.src = img.src;
        lightboxCaption.textContent = `Projeto nº ${img.number} de ${images.length}`;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    }

    function closeLightboxModal() {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
        lightboxImg.src = '';
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    }

    function renderVideoGrid() {
        const videoGrid = document.getElementById('video-grid');
        if (!videoGrid) return;

        const videoFiles = [
            'video (1).mp4',
            'video (2).mp4',
            'video (3).mp4',
            'video (4).mp4',
            'video (5).mp4',
            'video (6).mp4',
            'video7.mp4'
        ];

        videoGrid.innerHTML = '';
        videoFiles.forEach((fileName, index) => {
            const videoCard = document.createElement('div');
            videoCard.className = 'bg-[var(--bg-gallery-card)] p-4 border border-stone-800 rounded-sm';
            videoCard.innerHTML = `
                <video controls class="w-full rounded-lg mb-4 bg-black">
                    <source src="../VIDEO/${fileName}" type="video/mp4">
                    Seu navegador não suporta vídeo HTML5.
                </video>
                <h4 class="text-white font-bold uppercase text-sm tracking-widest">Processo em Vídeo ${index + 1}</h4>
                <p class="text-stone-400 text-xs mt-2">Acompanhe detalhes de acabamento e montagem da madeira.</p>
            `;
            videoGrid.appendChild(videoCard);
        });
    }

    // Lógica das Abas (Pastas)
    function setupTabs() {
        if (!tabPhotosBtn || !tabVideosBtn) return;

        tabPhotosBtn.addEventListener('click', () => {
            photoSection.classList.remove('hidden');
            videoSection.classList.add('hidden');
            
            tabPhotosBtn.classList.add('text-amber-500', 'border-amber-500');
            tabPhotosBtn.classList.remove('text-stone-500');
            tabVideosBtn.classList.remove('text-amber-500', 'border-amber-500');
            tabVideosBtn.classList.add('text-stone-500');
        });

        tabVideosBtn.addEventListener('click', () => {
            videoSection.classList.remove('hidden');
            photoSection.classList.add('hidden');
            
            tabVideosBtn.classList.add('text-amber-500', 'border-amber-500');
            tabVideosBtn.classList.remove('text-stone-500');
            tabPhotosBtn.classList.remove('text-amber-500', 'border-amber-500');
            tabPhotosBtn.classList.add('text-stone-500');
        });
    }

    // Event listeners
    renderGallery();
    renderVideoGrid();
    setupTabs();
    closeBtn.addEventListener('click', closeLightboxModal);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxModal();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('flex')) {
            if (e.key === 'Escape') closeLightboxModal();
            else if (e.key === 'ArrowRight') showNextImage();
            else if (e.key === 'ArrowLeft') showPreviousImage();
        }
    });
});