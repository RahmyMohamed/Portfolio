// ============================================================
//  Mohamed Rahmy Portfolio — script.js
// ============================================================

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const dot    = document.getElementById('cursorDot');
let cx = 0, cy = 0, dx = 0, dy = 0;

document.addEventListener('mousemove', e => {
  dx = e.clientX;
  dy = e.clientY;
  dot.style.left = dx + 'px';
  dot.style.top  = dy + 'px';
});

(function animCursor() {
  cx += (dx - cx) * 0.12;
  cy += (dy - cy) * 0.12;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(2)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
});


// ---- Matrix Rain ----
const canvas = document.getElementById('matrix-canvas');
const ctx    = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  initMatrix();
});

const chars = '01アイウエオカキクケコサシスセソタチツテト∑∇∆∫≈≠∞ABCDEF0123456789';
const fontSize = 13;
let cols, drops;

function initMatrix() {
  cols  = Math.floor(canvas.width / fontSize);
  drops = Array(cols).fill(1);
}
initMatrix();

function drawMatrix() {
  ctx.fillStyle = 'rgba(2,11,15,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00f5ff';
  ctx.font = fontSize + 'px Share Tech Mono, monospace';

  for (let i = 0; i < drops.length; i++) {
    const c = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(c, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 45);


// ---- Scroll Fade-In ----
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// ---- Terminal Typing Effect ----
const termLines = document.querySelectorAll('.t-line');
termLines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.3s';
    line.style.opacity = '1';
  }, i * 200 + 500);
});


// ---- Contact Form Submit (Demo) ----
const submitBtn = document.querySelector('.form-submit');
if (submitBtn) {
  submitBtn.addEventListener('click', function () {
    this.querySelector('span').textContent = 'MESSAGE TRANSMITTED ✓';
    this.style.borderColor = 'var(--green)';
    this.style.color = 'var(--green)';
    setTimeout(() => {
      this.querySelector('span').textContent = 'TRANSMIT MESSAGE →';
      this.style.borderColor = 'var(--cyan)';
      this.style.color = 'var(--cyan)';
    }, 3000);
  });
}