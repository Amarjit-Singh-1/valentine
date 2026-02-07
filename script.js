const title = document.querySelector('h1');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const responseText = document.getElementById('responseText');
const slideshowContainer = document.querySelector('.slideshow-container');
const bgMusic = document.getElementById('bgMusic');
const startMusicBtn = document.getElementById('startMusicBtn');

// Set background music volume to be subtle (20% volume)
let musicStarted = false;

function startMusic() {
    if (bgMusic && !musicStarted) {
        bgMusic.volume = 0.2;
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    musicStarted = true;
                    
                    // Hide the start music button
                    if (startMusicBtn) {
                        startMusicBtn.classList.add('hidden');
                        setTimeout(() => {
                            startMusicBtn.style.display = 'none';
                        }, 500);
                    }
                })
                .catch(e => {
                    console.log('Audio play failed:', e.message);
                });
        }
    }
}

// Start music button click handler
if (startMusicBtn) {
    startMusicBtn.addEventListener('click', startMusic);
}

// Slideshow functionality
const slides = document.querySelectorAll('.slideshow-slide');
let currentSlide = 0;

function showNextSlide() {
    if (slides.length === 0) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
}

// Change slide every 3 seconds
if (slides.length > 1) {
    setInterval(showNextSlide, 10000);
}

yesBtn.addEventListener('click', () => {
    responseText.innerHTML = `
        <p style="margin-bottom: 15px;">Yay, I am so happy! 🤍❤️</p>
        <p style="margin-bottom: 15px;">Knowing you has truly been a blessing, and with every passing day, I find myself falling for you a little more.</p>
        <p style="margin-bottom: 15px;">You always make me feel cared for and special, and this page is just a small way to express what words sometimes can't.</p>
        <p style="margin-bottom: 15px;">Everyone has opinions, but you're the one who asks me how I feel — and that means more than you know.</p>
        <p style="margin-bottom: 10px;">So here's my heart 🤍 to my Valentine.</p>
        <p>I hope all your dreams come true — even the one above.</p>
    `;
    // Replace slideshow with couple image
    if (slideshowContainer) {
        slideshowContainer.innerHTML = '<img src="public/couple.png" alt="Together" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">';
    }
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    title.style.color = 'transparent';
    title.style.height = '0';
    title.style.margin = '0';
});

yesBtn.addEventListener('click', () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

noBtn.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    const x = Math.max(10, Math.random() * maxX);
    const y = Math.max(10, Math.random() * maxY);
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.zIndex = '1000';
});

// No button click - no effect (button still moves on hover)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
});

// hearts animation

const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

if (!canvas) {
    console.error('Canvas element not found!');
}

if (!ctx) {
    console.error('Could not get canvas context!');
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log('Canvas initialized:', canvas.width, 'x', canvas.height);

const hearts = [];

class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#ff6f61' : '#ff3b2f';
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 4, this.x - this.size, this.y + this.size / 2, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 2, this.x + this.size / 2, this.y - this.size / 4, this.x, this.y);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -50;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}

document.addEventListener('mousemove', (e) => {
    const heart = new Heart();
    heart.x = e.clientX;
    heart.y = e.clientY;
    heart.size = 10;
    heart.speed = 1;
    hearts.push(heart);
});

function init() {
    for (let i = 0; i < 50; i++) {
        hearts.push(new Heart());
    }
    console.log('Initialized', hearts.length, 'hearts');
}

let frameCount = 0;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => heart.update());
    requestAnimationFrame(animate);
    
    // Log every 60 frames (about once per second)
    frameCount++;
    if (frameCount === 60) {
        console.log('Animation running, hearts count:', hearts.length);
        frameCount = 0;
    }
}

init();
animate();
console.log('Animation started');

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

