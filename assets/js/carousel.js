// Carrossel de Áreas
function initAreasCarousel() {
    const carouselTrack = document.querySelector('.areas-carousel-track');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (!carouselTrack || !prevBtn || !nextBtn) return;
    
    const cards = carouselTrack.querySelectorAll('.area-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    
    // Determinar quantos cards mostrar por vez
    const getCardsPerView = () => {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 968) return 2;
        if (window.innerWidth < 1200) return 3;
        return 4;
    };
    
    let cardsPerView = getCardsPerView();
    
    // Criar indicadores
    const createIndicators = () => {
        indicatorsContainer.innerHTML = '';
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.setAttribute('aria-label', `Ir para slide ${i + 1}`);
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    };
    
    // Atualizar posição do carrossel
    const updateCarousel = () => {
        if (cards.length === 0 || !carouselTrack.parentElement) return;
        
        // Calcular baseado no container width
        const containerWidth = carouselTrack.parentElement.offsetWidth;
        const cardWidth = containerWidth / cardsPerView;
        const gap = 24; // 1.5rem aproximado
        const moveDistance = cardWidth + gap;
        const translateX = -currentIndex * moveDistance;
        
        carouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Atualizar indicadores
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === currentIndex);
        });
        
        // Atualizar botões (desabilitar no início/fim)
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - 1;
        
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.3';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.opacity = '0.7';
            prevBtn.style.pointerEvents = 'auto';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.3';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.opacity = '0.7';
            nextBtn.style.pointerEvents = 'auto';
        }
    };
    
    // Ir para slide específico
    const goToSlide = (index) => {
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
    };
    
    // Próximo slide
    const nextSlide = () => {
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        } else {
            // Voltar ao início quando chegar no fim
            currentIndex = 0;
            updateCarousel();
        }
    };
    
    // Slide anterior
    const prevSlide = () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Ir para o último quando estiver no início
            const totalSlides = Math.ceil(totalCards / cardsPerView);
            currentIndex = totalSlides - 1;
            updateCarousel();
        }
    };
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Atualizar ao redimensionar
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                currentIndex = 0;
                createIndicators();
                updateCarousel();
            } else {
                updateCarousel();
            }
        }, 250);
    });
    
    // Inicializar
    createIndicators();
    
    // Aguardar renderização completa
    setTimeout(() => {
        updateCarousel();
    }, 100);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initAreasCarousel();
});

