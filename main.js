/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile burger ── */
document.getElementById('burger').addEventListener('click', () => {
  nav.classList.toggle('open');
});
document.querySelectorAll('.nav-links a, .cta-nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

/* ── Reveal on scroll ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));