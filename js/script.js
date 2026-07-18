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

// Array para armazenar as estrelas
const stars = [];
const starCount = 300;

// Função pseudo-aleatória com seed
let seed = 42;
function seededRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
}

// Classe para as estrelas
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
        // Calcular distância até o centro
        const distToCenter = Math.sqrt(
            Math.pow(this.x - canvas.width / 2, 2) + 
            Math.pow(this.y - canvas.height / 2, 2)
        );
        
        // Reduzir opacidade perto do centro
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

// Criar estrelas
function createStars() {
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
}

// Animar
function animate() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

// Redimensionar
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Iniciar
createStars();
animate();