// ── CURSOR ──
const cursorEl = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursorEl.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
});
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursorEl.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorEl.classList.remove('hover'));
});

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── BUST 3D PARALLAX TILT ──
const bust = document.getElementById('bustWrap');
if (bust) {
  // Current and target rotation values
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  // Max tilt in degrees — keep it subtle
  const MAX_TILT_X = 8;   // vertical tilt
  const MAX_TILT_Y = 12;  // horizontal tilt
  const LERP = 0.06;       // smoothing — lower = lazier/smoother

  document.addEventListener('mousemove', e => {
    // Normalize mouse to -1 .. 1 relative to viewport center
    const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;

    targetY =  nx * MAX_TILT_Y;  // left-right → rotateY
    targetX = -ny * MAX_TILT_X;  // up-down    → rotateX
  });

  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  // Smooth animation loop
  (function tick() {
    requestAnimationFrame(tick);

    // Lerp toward target
    currentX += (targetX - currentX) * LERP;
    currentY += (targetY - currentY) * LERP;

    // Apply subtle scale on hover for depth feel
    bust.style.transform = `
      perspective(900px)
      rotateX(${currentX}deg)
      rotateY(${currentY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
  })();
}
