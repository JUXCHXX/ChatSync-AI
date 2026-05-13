// ChatSync AI — interactions

// Scroll progress bar
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = pct + '%';
});

// Navbar scrolled state
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// Mobile menu
const burger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');
burger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Custom cursor
const cursor = document.getElementById('cursorDot');
let cx = 0, cy = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
function loop(){
  cx += (tx - cx) * 0.18;
  cy += (ty - cy) * 0.18;
  cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
  requestAnimationFrame(loop);
}
loop();
document.querySelectorAll('a, button, .price-card, .segment-card, .step').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width = '32px'; cursor.style.height = '32px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width = '14px'; cursor.style.height = '14px'; });
});

// Particles
const particlesEl = document.getElementById('particles');
if (particlesEl){
  for (let i = 0; i < 28; i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100 + '%';
    p.style.top = Math.random()*100 + '%';
    p.style.animationDelay = (Math.random()*8) + 's';
    p.style.animationDuration = (8 + Math.random()*10) + 's';
    p.style.opacity = (0.15 + Math.random()*0.4).toString();
    particlesEl.appendChild(p);
  }
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      e.target.classList.add('in');
      // Counter
      if (e.target.classList.contains('metric')){
        const num = e.target.querySelector('.num');
        if (num && !num.classList.contains('static') && !num.dataset.done){
          num.dataset.done = '1';
          const target = parseInt(num.dataset.count, 10);
          const prefix = num.dataset.prefix || '';
          const suffix = num.dataset.suffix || '';
          let v = 0;
          const step = Math.max(1, Math.round(target / 60));
          const t = setInterval(() => {
            v += step;
            if (v >= target){ v = target; clearInterval(t); }
            num.textContent = prefix + v + suffix;
          }, 24);
        }
      }
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .metric').forEach(el => io.observe(el));