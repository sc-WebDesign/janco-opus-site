// Sticky header shadow once the page has moved off the hero.
const header = document.getElementById('site-header');
if (header) {
  const applyShadow = () => header.classList.toggle('shadow-md', window.scrollY > 8);
  applyShadow();
  window.addEventListener('scroll', applyShadow, { passive: true });
}

// Floating call bar on mobile. The barbers research found a sticky phone action
// is standard in this trade, because nearly every booking starts on a handset.
// It hides once the "find us" block is on screen, where the number is already large.
const ctaBar = document.getElementById('mobile-cta');
if (ctaBar) {
  const find = document.getElementById('find');
  let nearFind = false;
  const updateBar = () => {
    const show = window.scrollY > 380 && !nearFind;
    ctaBar.classList.toggle('translate-y-full', !show);
  };
  window.addEventListener('scroll', updateBar, { passive: true });
  if (find && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      nearFind = entries[0].isIntersecting;
      updateBar();
    }, { threshold: 0.15 }).observe(find);
  }
  updateBar();
}

// Scroll-reveal. Headings and eyebrows are tagged here; photograph cards carry
// .js-reveal in the markup, so both sets are observed together below.
const revealTargets = document.querySelectorAll('main section h2, main section .section-eyebrow, .faq-item');
const canReveal = 'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canReveal) {
  revealTargets.forEach((el) => {
    el.classList.add('js-reveal');
    const siblings = Array.from(el.parentElement.children);
    el.style.transitionDelay = `${(siblings.indexOf(el) % 4) * 70}ms`;
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  // Observe everything carrying the class, including elements written directly
  // into the markup. Observing only revealTargets would strand those at opacity 0.
  document.querySelectorAll('.js-reveal').forEach((el) => io.observe(el));
} else {
  document.querySelectorAll('.js-reveal').forEach((el) => el.classList.add('in'));
}
