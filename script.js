// Loading Screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-screen');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Scroll Reveal Animations
ScrollReveal().reveal('.service-card', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    interval: 200
});

ScrollReveal().reveal('.plan-card', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    interval: 200
});

// Smooth Scroll para links de navegação
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

// Botão Scroll to Top
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animação do Menu na Rolagem
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// Contador para os planos
const counters = document.querySelectorAll('.price');
counters.forEach(counter => {
    const value = counter.textContent;
    counter.textContent = '0';
    
    const updateCounter = () => {
        const target = parseFloat(value.replace('R$ ', '').replace(',', '.'));
        const c = parseFloat(counter.textContent.replace('R$ ', '').replace(',', '.'));
        const increment = target / 20;
        
        if (c < target) {
            counter.textContent = `R$ ${Math.ceil(c + increment).toFixed(2).replace('.', ',')}`;
            setTimeout(updateCounter, 50);
        } else {
            counter.textContent = value;
        }
    };
    
    updateCounter();
});

// Adicionar funcionalidade ao botão CTA do hero
document.querySelector('.cta-button').addEventListener('click', function() {
    const message = encodeURIComponent(
        `Olá! Tenho interesse no plano Premium de 400 Mega por R$ 99,99/mês. Pode me ajudar?`
    );
    window.open(`https://wa.me/5599981461362?text=${message}`, '_blank');
});

// Animação e funcionalidade dos botões de contratação
document.querySelectorAll('.plan-card button').forEach(button => {
    // Encontrar o nome do plano e o preço
    const planName = button.parentElement.querySelector('h3').textContent;
    const planSpeed = button.parentElement.querySelector('ul li:first-child').textContent;
    const planPrice = button.parentElement.querySelector('.price').textContent.trim();
    
    // Criar mensagem para o WhatsApp
    const message = encodeURIComponent(
        `Olá! Tenho interesse no plano ${planName} de ${planSpeed} por ${planPrice}. Pode me ajudar?`
    );
    
    // Adicionar evento de clique
    button.addEventListener('click', function() {
        window.open(`https://wa.me/5599981461362?text=${message}`, '_blank');
    });
    
    // Manter as animações existentes
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Adicionar estilos CSS necessários
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-color);
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .scroll-top:hover {
        background: var(--accent-color);
        transform: translateY(-5px);
    }

    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s;
    }

    .loader {
        width: 50px;
        height: 50px;
        border: 5px solid var(--light-bg);
        border-top: 5px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .navbar {
        transition: all 0.3s ease;
    }
`;

document.head.appendChild(style); 