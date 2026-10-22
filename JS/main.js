/* =========================================
   EXPLORAR + | Main JavaScript
   ========================================= */

// Verifica se o usuário está logado
function isUserLoggedIn() {
    const user = localStorage.getItem('explorar_user');
    return user !== null && user !== 'null' && user !== undefined && user !== '';
}

// Obtém o usuário logado atual
function getLoggedUser() {
    if (!isUserLoggedIn()) return null;
    try {
        return JSON.parse(localStorage.getItem('explorar_user'));
    } catch (e) {
        return null;
    }
}

// Realiza logout do usuário
function fazerLogout() {
    localStorage.removeItem('explorar_user');
    showToast('Você saiu da sua conta.', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 600);
}

// Controle de rotas protegidas
function checkPageAuth() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    // Apenas 'index.html', 'destinos.html', 'pacotes.html', 'agendamentos.html', 'login.html', 'cadastro.html' são públicas
    const restrictedPages = ['usuario.html', 'questionario.html', 'pontuacao.html'];

    if (restrictedPages.includes(currentPath)) {
        if (!isUserLoggedIn()) {
            alert('🔒 Área restrita para membros! Faça login ou crie sua conta para acessar esta página.');
            window.location.href = `login.html?redirect=${encodeURIComponent(currentPath)}`;
        }
    }
}

// Executa verificação imediatamente
checkPageAuth();

// Atualiza Navbar dinamicamente
function updateNavbar() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    const loggedIn = isUserLoggedIn();
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    if (loggedIn) {
        navMenu.innerHTML = `
            <a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">Início</a>
            <a href="destinos.html" class="${currentPath === 'destinos.html' ? 'active' : ''}">Destinos</a>
            <a href="pacotes.html" class="${currentPath === 'pacotes.html' ? 'active' : ''}">Pacotes</a>
            <a href="agendamentos.html" class="${currentPath === 'agendamentos.html' ? 'active' : ''}">Agendamentos</a>
            <a href="questionario.html" class="${currentPath === 'questionario.html' ? 'active' : ''}">Quiz</a>
            <a href="pontuacao.html" class="${currentPath === 'pontuacao.html' ? 'active' : ''}">Fidelidade</a>
            <a href="usuario.html" class="${currentPath === 'usuario.html' ? 'active' : ''} nav-btn-outline">👤 Minha Conta</a>
            <a href="#" onclick="fazerLogout(); return false;" class="nav-logout-btn" style="color: #f87171; font-weight: 600; margin-left: 0.5rem; text-decoration: none;">Sair</a>
        `;
    } else {
        // Visitante não-logado: apenas Início, Destinos, Pacotes, Agendamentos, Entrar e Cadastrar
        navMenu.innerHTML = `
            <a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">Início</a>
            <a href="destinos.html" class="${currentPath === 'destinos.html' ? 'active' : ''}">Destinos</a>
            <a href="pacotes.html" class="${currentPath === 'pacotes.html' ? 'active' : ''}">Pacotes</a>
            <a href="agendamentos.html" class="${currentPath === 'agendamentos.html' ? 'active' : ''}">Agendamentos</a>
            <a href="login.html" class="nav-btn-outline ${currentPath === 'login.html' ? 'active' : ''}">Entrar</a>
            <a href="cadastro.html" class="nav-btn ${currentPath === 'cadastro.html' ? 'active' : ''}">Cadastrar</a>
        `;
    }

    setupMobileMenu();
}

// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 350);
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar-explorar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.onclick = () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        };

        navMenu.querySelectorAll('a').forEach(link => {
            link.onclick = () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            };
        });
    }
}

document.addEventListener('click', (e) => {
    const hamburger = document.querySelector('.nav-hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();

    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');
    animatedElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.05}s`;
        scrollObserver.observe(el);
    });

    document.querySelectorAll('[data-counter]').forEach(el => {
        counterObserver.observe(el);
    });
});

// Password toggle
function mostrarsenha() {
    const localsenha = document.getElementById("senhat") || document.getElementById("senha");
    const btn = document.querySelector('.password-toggle');
    if (localsenha) {
        if (localsenha.type === "password") {
            localsenha.type = "text";
            if (btn) btn.textContent = "🙈";
        } else {
            localsenha.type = "password";
            if (btn) btn.textContent = "👁";
        }
    }
}

// Smooth counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString('pt-BR');
        }
    }, 16);
}

// Initialize counters when visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = true;
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

// Parallax effect for hero sections
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const yPos = -(window.scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});

// Toast notification utility
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        <span class="toast-message">${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 24px;
        background: ${type === 'success' ? 'rgba(14, 138, 95, 0.95)' : type === 'error' ? 'rgba(255, 80, 80, 0.95)' : 'rgba(100, 150, 255, 0.95)'};
        color: white;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 0.95rem;
        font-weight: 500;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slide-up 0.4s ease;
        backdrop-filter: blur(10px);
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}
