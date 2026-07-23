// Criar um canvas para as estrelas
const canvas = document.createElement('canvas');
canvas.id = 'stars-canvas';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '0';
document.body.insertBefore(canvas, document.body.firstChild);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const starCount = 300;
let seed = 42;

function seededRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
}

class Star {
    constructor() {
        this.x = seededRandom() * canvas.width;
        this.y = seededRandom() * canvas.height;
        this.size = seededRandom() * 1.5;
        this.opacity = seededRandom() * 0.7 + 0.3;
        this.twinkleSpeed = seededRandom() * 0.02 + 0.005;
        this.twinkleAmount = seededRandom() * Math.PI * 2;
        this.color = this.getRandomColor();
    }
    getRandomColor() {
        const colors = [
            'rgba(255, 255, 255, ',
            'rgba(200, 220, 255, ',
            'rgba(220, 200, 255, ',
            'rgba(200, 255, 220, '
        ];
        return colors[Math.floor(seededRandom() * colors.length)];
    }
    update() {
        this.twinkleAmount += this.twinkleSpeed;
        this.opacity = 0.3 + Math.sin(this.twinkleAmount) * 0.4;
    }
    draw() {
        const distToCenter = Math.sqrt(
            Math.pow(this.x - canvas.width / 2, 2) + 
            Math.pow(this.y - canvas.height / 2, 2)
        );
        let finalOpacity = this.opacity;
        if (distToCenter < 350) {
            finalOpacity = this.opacity * 0.15;
        }
        ctx.fillStyle = this.color + finalOpacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createStars() {
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

createStars();
animate();

// ==================== ANIMAÇÃO DE ABERTURA ====================
const devclubReveal = document.querySelector('.devclub-reveal');
const contentH1 = document.querySelector('.content h1');
const contentP = document.querySelector('.content p');
const btnPrimary = document.querySelector('.btn-primary');
const statsSection = document.querySelector('.stats-section');

const timeline = {
    devclub: 500,
    matrixStart: 500,
    h1: 1100,
    p: 1250,
    btn: 1400,
    stats: 1550
};
function hideAllElements() {
    devclubReveal.style.opacity = '0';
    contentH1.style.opacity = '0';
    contentP.style.opacity = '0';
    btnPrimary.style.opacity = '0';
    statsSection.style.opacity = '0';
}

function showDevclub() {
    setTimeout(() => {
        devclubReveal.style.opacity = '1';
        devclubReveal.style.animation = 'fadeInDevclub 0.6s ease-out forwards, devclubFlicker 3s infinite 0.6s';
    }, timeline.devclub);
}
function startMatrixEffect() {
    const codeArray = [
        'const', 'let', 'var', 'function', 'async', 'await', 'return', 'import', 'export', 
        'class', 'extends', 'new', 'this', 'super', 'static', 'if', 'else', 'for', 'while',
        'React', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback',
        'Component', 'Props', 'Hooks', 'JSX', 'Fragment', 'Portal',
        'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
        'middleware', 'router', 'controller', 'model', 'schema',
        'map()', 'filter()', 'reduce()', 'find()', 'forEach()', 'slice()', 'splice()',
        'push()', 'pop()', 'shift()', 'unshift()', 'concat()', 'join()',
        'fetch()', 'Promise', 'async/await', 'setTimeout', 'setInterval', 'localStorage',
        'CSS', 'HTML', 'flexbox', 'grid', '@media', 'animation', 'transition',
        'Git', 'Docker', 'webpack', 'Babel', 'npm', 'yarn', 'TypeScript', 'ESLint',
        'Jest', 'CI/CD', 'AWS', 'Heroku', 'Vercel',
        'SQL', 'NoSQL', 'query', 'index', 'migration', 'seed', 'transaction',
        'MVC', 'REST', 'SOLID', 'Design Pattern', 'Middleware', 'Hook',
        'Context', 'Redux', 'Vuex', 'Zustand'
    ];
    
    setTimeout(() => {
        setInterval(() => {
            const codeElement = document.createElement('div');
            codeElement.className = 'matrix-code';
            codeElement.textContent = codeArray[Math.floor(Math.random() * codeArray.length)];
            codeElement.style.left = (Math.random() * 80 + 10) + '%'; 
            codeElement.style.top = '-50px';
            codeElement.style.position = 'fixed';
            document.body.appendChild(codeElement);
            
            requestAnimationFrame(() => {
                codeElement.style.animation = 'matrixFall 8s linear forwards';
            });
            
            setTimeout(() => {
                codeElement.remove();
            }, 8000);
        }, 300);
    }, timeline.matrixStart);
}

function showHero() {
    setTimeout(() => {
        contentH1.style.opacity = '1';
        contentH1.style.animation = 'fadeInHero 0.8s ease-out forwards';
    }, timeline.h1);
    
    setTimeout(() => {
        contentP.style.opacity = '1';
        contentP.style.animation = 'fadeInHero 0.8s ease-out forwards';
    }, timeline.p);
    
    setTimeout(() => {
        btnPrimary.style.opacity = '1';
        btnPrimary.style.animation = 'fadeInHero 0.8s ease-out forwards';
    }, timeline.btn);
    
    setTimeout(() => {
        statsSection.style.opacity = '1';
        statsSection.style.animation = 'fadeInHero 0.8s ease-out forwards';
    }, timeline.stats);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDevclub {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes fadeInHero {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes matrixFall {
        from {
            transform: translateY(0);
            opacity: 0.8;
        }
        80% {
            opacity: 0.5;
        }
        to {
            transform: translateY(150vh);
            opacity: 0;
        }
    }
    
    .matrix-code {
        position: fixed;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        color: rgba(150, 150, 255, 0.5);
        text-shadow: 0 0 10px rgba(150, 150, 255, 0.3);
        pointer-events: none;
        z-index: 30;
        letter-spacing: 2px;
    }
`;
document.head.appendChild(style);

function startAnimation() {
    hideAllElements();
    showDevclub();
    startMatrixEffect();
    showHero();
}

window.addEventListener('load', () => {
    startAnimation();
});



// Seleciona o planeta e o modal
const planetaFrontEnd = document.querySelector('.planeta.frontend');
const modalFrontEnd = document.getElementById('modalFrontEnd');
const modalOverlay = modalFrontEnd.querySelector('.modal-overlay');
const modalContent = modalFrontEnd.querySelector('.modal-content');
const modalClose = modalFrontEnd.querySelector('.modal-close');

// Abrir modal ao clicar no planeta
planetaFrontEnd.addEventListener('click', () => {
    modalFrontEnd.style.display = 'flex';
});

// Fechar ao clicar no overlay (fora da imagem)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {  // ← Só fecha se clicar NO overlay
        modalFrontEnd.style.display = 'none';
    }
});


modalClose.addEventListener('click', () => {
    modalFrontEnd.style.display = 'none';
});

// BACKEND
const planetaBackEnd = document.querySelector('.planeta.backend');
const modalBackEnd = document.getElementById('modalBackEnd');
const modalOverlayBackEnd = modalBackEnd.querySelector('.modal-overlay');
const modalCloseBackEnd = modalBackEnd.querySelector('.modal-close');

planetaBackEnd.addEventListener('click', () => {
    modalBackEnd.style.display = 'flex';
});

modalOverlayBackEnd.addEventListener('click', (e) => {
    if (e.target === modalOverlayBackEnd) {
        modalBackEnd.style.display = 'none';
    }
});

modalCloseBackEnd.addEventListener('click', () => {
    modalBackEnd.style.display = 'none';
});


// MOBILE
const planetaMobile = document.querySelector('.planeta.mobile');
const modalMobile = document.getElementById('modalMobile');
const modalOverlayMobile = modalMobile.querySelector('.modal-overlay');
const modalCloseMobile = modalMobile.querySelector('.modal-close');

planetaMobile.addEventListener('click', () => {
    modalMobile.style.display = 'flex';
});

modalOverlayMobile.addEventListener('click', (e) => {
    if (e.target === modalOverlayMobile) {
        modalMobile.style.display = 'none';
    }
});

modalCloseMobile.addEventListener('click', () => {
    modalMobile.style.display = 'none';
});


// GESTOR-IA


// IA
const planetaIA = document.querySelector('.planeta.ia');
const modalIA = document.getElementById('modalIA');
const modalOverlayIA = modalIA.querySelector('.modal-overlay');
const modalCloseIA = modalIA.querySelector('.modal-close');

planetaIA.addEventListener('click', () => {
    modalIA.style.display = 'flex';
});

modalOverlayIA.addEventListener('click', (e) => {
    if (e.target === modalOverlayIA) {
        modalIA.style.display = 'none';
    }
});

modalCloseIA.addEventListener('click', () => {
    modalIA.style.display = 'none';
});





// FULLSTACK
const planetaFullStack = document.querySelector('.planeta.fullstack');
const modalFullStack = document.getElementById('modalFullStack');
const modalOverlayFullStack = modalFullStack.querySelector('.modal-overlay');
const modalCloseFullStack = modalFullStack.querySelector('.modal-close');

planetaFullStack.addEventListener('click', () => {
    modalFullStack.style.display = 'flex';
});

modalOverlayFullStack.addEventListener('click', (e) => {
    if (e.target === modalOverlayFullStack) {
        modalFullStack.style.display = 'none';
    }
});

modalCloseFullStack.addEventListener('click', () => {
    modalFullStack.style.display = 'none';
});


// ===== PROFESSORES =====

const slider = document.querySelector(".teachers-slider");
const nextBtn = document.querySelector(".teachers-next");
const prevBtn = document.querySelector(".teachers-prev");
const cards = document.querySelectorAll(".teacher-card");

let currentPosition = 0;

// largura de um card + gap
const move = cards[0].offsetWidth + 30;

// quantidade máxima que o slider pode andar
const maxPosition = (cards.length - 4) * move;

// Próximo
nextBtn.addEventListener("click", () => {

    if (currentPosition < maxPosition) {

        currentPosition += move;

        slider.style.transform = `translateX(-${currentPosition}px)`;

    }

});

// Anterior
prevBtn.addEventListener("click", () => {

    if (currentPosition > 0) {

        currentPosition -= move;

        slider.style.transform = `translateX(-${currentPosition}px)`;

    }

});




// ==========================
// LOGIN MODAL
// ==========================

const loginOpen = document.querySelector(".login-open");
const loginOverlay = document.querySelector(".login-overlay");
const loginClose = document.querySelector(".login-close");

// Abrir

loginOpen.addEventListener("click", (e) => {

    e.preventDefault();

    loginOverlay.style.display = "flex";

});

// Fechar no X

loginClose.addEventListener("click", () => {

    loginOverlay.style.display = "none";

});

// Fechar clicando fora

loginOverlay.addEventListener("click", (e) => {

    if(e.target === loginOverlay){

        loginOverlay.style.display = "none";

    }

});

// Fechar com ESC

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        loginOverlay.style.display = "none";

    }

});