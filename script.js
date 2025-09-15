// Navegação mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Fechar menu ao clicar no overlay
navOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}));

// Criar botão mobile de cotação dinamicamente
function createMobileQuoteButton() {
    if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('.nav-menu');
        const existingButton = document.querySelector('.mobile-quote-button');
        
        if (!existingButton && navMenu) {
            const buttonLi = document.createElement('li');
            buttonLi.className = 'nav-item mobile-quote-button';
            buttonLi.innerHTML = `
                <a href="https://wa.me/5548999413996?text=Olá! Gostaria de fazer uma cotação dos serviços da SALLUS." 
                   class="btn-cotacao-mobile" 
                   target="_blank">FAÇA SUA COTAÇÃO</a>
            `;
            navMenu.appendChild(buttonLi);
        }
    } else {
        const existingButton = document.querySelector('.mobile-quote-button');
        if (existingButton) {
            existingButton.remove();
        }
    }
}

// Criar botão na inicialização
createMobileQuoteButton();

// Recriar botão ao redimensionar a janela
window.addEventListener('resize', createMobileQuoteButton);

// Scroll suave para seções
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

// Efeito de scroll no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.backdropFilter = 'blur(25px)';
        header.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    }
});

// Função para controlar o botão "Ver Mais" dos benefícios
function toggleBeneficios() {
    const hiddenBoxes = document.querySelectorAll('.beneficio-box-hidden');
    const btnVerMais = document.querySelector('.btn-ver-mais');
    const verMaisTexto = document.querySelector('.ver-mais-texto');
    const verMaisIcon = document.querySelector('.ver-mais-icon');
    
    // Verificar se as boxes estão escondidas
    const isHidden = hiddenBoxes[0].style.display === 'none' || 
                    window.getComputedStyle(hiddenBoxes[0]).display === 'none';
    
    if (isHidden) {
        // Mostrar todas as boxes escondidas
        hiddenBoxes.forEach(box => {
            box.style.display = 'block';
        });
        
        // Atualizar botão
        verMaisTexto.textContent = 'Ver Menos Benefícios';
        btnVerMais.classList.add('expanded');
        
        // Scroll suave para a seção
        document.getElementById('beneficios').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    } else {
        // Esconder as boxes extras
        hiddenBoxes.forEach(box => {
            box.style.display = 'none';
        });
        
        // Atualizar botão
        verMaisTexto.textContent = 'Ver Mais Benefícios';
        btnVerMais.classList.remove('expanded');
    }
}
// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.servico-card, .stat-item, .contato-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Efeito parallax nas formas do hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Observar seção de estatísticas para animar contadores
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h4');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    stat.textContent = '0' + text.replace(/\d/g, '');
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Efeito de hover nos cards de serviços
document.querySelectorAll('.servico-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito de entrada do título (já controlado pelo CSS)
// As animações são aplicadas automaticamente via CSS

// Controle do vídeo de background
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('heroVideo');
    
    if (heroVideo) {
        // Reiniciar vídeo quando terminar
        heroVideo.addEventListener('ended', function() {
            console.log('Vídeo terminou, reiniciando...');
            this.currentTime = 0;
            this.play().catch(function(error) {
                console.log('Erro ao reiniciar vídeo:', error);
            });
        });
        
        // Fallback para dispositivos que não suportam autoplay
        heroVideo.addEventListener('canplay', function() {
            this.play().catch(function(error) {
                console.log('Autoplay foi bloqueado:', error);
            });
        });
        
        // Pausar vídeo quando a página não está visível (economia de bateria)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                heroVideo.pause();
            } else {
                heroVideo.play().catch(function(error) {
                    console.log('Autoplay foi bloqueado:', error);
                });
            }
        });
        
        // Iniciar o vídeo
        heroVideo.src = 'background.mp4';
        heroVideo.load();
    }
    
});

// Lazy loading para imagens (quando forem adicionadas)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Adicionar classe de scroll para animações CSS
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.body.style.setProperty('--scroll', scrolled + 'px');
});

// Efeito de partículas no hero (opcional)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'var(--primary-green)';
    particle.style.borderRadius = '50%';
    particle.style.opacity = '0.6';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.animation = 'float 8s linear infinite';
    
    document.querySelector('.hero-shapes').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Criar partículas periodicamente
setInterval(createParticle, 2000);

// Adicionar estilos para partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Carrossel Infinito de Benefícios
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('beneficiosCarousel');
    if (!carousel) return;
    
    // Duplicar os benefícios para criar efeito infinito
    function duplicateBenefits() {
        const benefits = carousel.innerHTML;
        carousel.innerHTML = benefits + benefits; // Duplica o conteúdo
    }
    
    // Inicializar carrossel infinito
    duplicateBenefits();
    
    
    // Pausar animação quando a página não está visível
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            carousel.style.animationPlayState = 'paused';
        } else {
            carousel.style.animationPlayState = 'running';
        }
    });


});


