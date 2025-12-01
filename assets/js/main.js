// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Fechar menu ao clicar em link
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Ano no footer
const anoElement = document.getElementById('ano');
if (anoElement) {
    anoElement.textContent = new Date().getFullYear();
}

// Formulário de contato
const contatoForm = document.getElementById('contatoForm');
if (contatoForm) {
    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica de envio do formulário
        // Por exemplo, integração com um backend ou serviço de e-mail
        
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contatoForm.reset();
    });
}

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animações de scroll (Scroll Reveal)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Aplicar animações aos elementos
document.addEventListener('DOMContentLoaded', () => {
    // Hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out 0.3s both';
    }

    // Seções com fade-in-up
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section, index) => {
        section.classList.add('fade-in-up');
        observer.observe(section);
    });

    // Cards de áreas
    const areaCards = document.querySelectorAll('.area-card');
    areaCards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Cards de publicações
    const publicacaoCards = document.querySelectorAll('.publicacao-card');
    publicacaoCards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Cards de equipe
    const equipeCards = document.querySelectorAll('.equipe-card');
    equipeCards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Stats com contador animado
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.classList.add('fade-in-up');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
        
        const statNumber = item.querySelector('.stat-number');
        if (statNumber) {
            const finalValue = statNumber.textContent;
            const isPercentage = finalValue.includes('%');
            const isPlus = finalValue.includes('+');
            const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
            
            if (numericValue) {
                statNumber.textContent = '0' + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        statNumber.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current) + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
                    }
                }, 30);
            }
        }
    });
    
    // Items de diferenciação
    const diferencaFeatures = document.querySelectorAll('.diferenca-feature');
    diferencaFeatures.forEach((item, index) => {
        item.classList.add('fade-in-up');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Pilares
    const pilarItems = document.querySelectorAll('.pilar-item');
    pilarItems.forEach((item, index) => {
        item.classList.add('fade-in-up');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Títulos de seção
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('fade-in-up');
        observer.observe(title);
    });

    // Formulário
    const contatoForm = document.querySelector('.contato-form');
    if (contatoForm) {
        contatoForm.classList.add('fade-in-up');
        observer.observe(contatoForm);
    }
});

// Animação suave no scroll do header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});
