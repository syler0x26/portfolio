const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

document.querySelectorAll('.tilt').forEach((img) => {
  const box = img.parentElement;
  box.addEventListener('mousemove', (e) => {
    const r = box.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    img.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  });
  box.addEventListener('mouseleave', () => {
    img.style.transform = '';
  });
});

const words = document.querySelectorAll('.swap .word');

words.forEach((w) => {
  w.setAttribute('aria-hidden', 'true');
  [...w.dataset.word].forEach((char, i) => {
    const s = document.createElement('span');
    s.className = 'ch';
    s.style.setProperty('--i', i);
    s.textContent = char;
    w.appendChild(s);
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (words.length > 1 && !reduceMotion) {
  let current = 0;
  setInterval(() => {
    const out = words[current];
    current = (current + 1) % words.length;
    const next = words[current];
    out.classList.remove('is-active');
    out.classList.add('is-leaving');
    next.classList.remove('is-leaving');
    next.classList.add('is-active');
    setTimeout(() => out.classList.remove('is-leaving'), 1000);
  }, 3200);
}