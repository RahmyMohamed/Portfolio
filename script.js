// ============================================================
//  Mohamed Rahmy Portfolio — script.js
// ============================================================

const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Custom Cursor (desktop only) ----
const cursor = document.getElementById('cursor');
const dot    = document.getElementById('cursorDot');
let cx = 0, cy = 0, dx = 0, dy = 0;

if (window.matchMedia('(hover: hover)').matches) {
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
}


// ---- Hamburger Menu ----
const navToggle  = document.getElementById('navToggle');
const navMenu    = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  navToggle.classList.add('open');
  navMenu.classList.add('open');
  navOverlay.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navToggle.classList.remove('open');
  navMenu.classList.remove('open');
  navOverlay.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeMenu() : openMenu();
});

navOverlay.addEventListener('click', closeMenu);

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu on backdrop tap and Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});


// ---- Matrix Rain (performance-optimized for mobile) ----
const canvas = document.getElementById('matrix-canvas');
const ctx    = canvas.getContext('2d');

let cols, drops, fontSize;
const matrixChars = '01アイウエオカキクケコサシスセソタチツテト∑∇∆∫≈≠∞ABCDEF0123456789';
let mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

function initMatrix() {
  const dpr = isTouch ? 1 : Math.min(window.devicePixelRatio || 1, 2);
  fontSize = isTouch ? 10 : 13;
  canvas.width  = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cols  = Math.floor(window.innerWidth / fontSize);
  drops = Array(cols).fill(1);
}

let frameId;
let lastMatrixTime = 0;
const matrixInterval = isTouch ? 90 : 45;

function drawMatrix(timestamp) {
  if (timestamp - lastMatrixTime < matrixInterval) {
    frameId = requestAnimationFrame(drawMatrix);
    return;
  }
  lastMatrixTime = timestamp;

  ctx.fillStyle = 'rgba(2,11,15,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00f5ff';
  ctx.font = fontSize + 'px Share Tech Mono, monospace';

  for (let i = 0; i < drops.length; i++) {
    const c = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(c, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  frameId = requestAnimationFrame(drawMatrix);
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initMatrix();
  }, 200);
});

// Only run matrix rain if user hasn't requested reduced motion
if (!mqReduced.matches && !reducedMotion) {
  initMatrix();
  frameId = requestAnimationFrame(drawMatrix);
} else {
  canvas.style.display = 'none';
}

// Pause animation when tab is hidden for battery savings
document.addEventListener('visibilitychange', () => {
  if (mqReduced.matches || reducedMotion) return;
  if (document.hidden) {
    cancelAnimationFrame(frameId);
  } else {
    lastMatrixTime = 0;
    frameId = requestAnimationFrame(drawMatrix);
  }
});


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
  if (reducedMotion) { line.style.opacity = '1'; return; }
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.3s';
    line.style.opacity = '1';
  }, i * 200 + 500);
});


// ---- Certificate Cards: Tap-to-toggle on touch devices ----
document.querySelectorAll('.cert-card').forEach(card => {
  const hint = document.createElement('span');
  hint.className = 'cert-tap-hint';
  hint.textContent = '▸ TAP TO VIEW CERTIFICATE';
  card.appendChild(hint);

  card.addEventListener('click', function (e) {
    if (!isTouch) return;
    // Ignore clicks on links inside the card
    if (e.target.closest('a')) return;
    const wasOpen = this.classList.contains('open');
    document.querySelectorAll('.cert-card.open').forEach(c => c.classList.remove('open'));
    if (!wasOpen) this.classList.add('open');
  });
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


// ---- Service Worker Registration (PWA) ----
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.warn('Service worker registration failed:', err);
    });
  });
}