// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('hidden') === false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    iconOpen.classList.toggle('hidden', isOpen);
    iconClose.classList.toggle('hidden', !isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    });
  });
}

// Sticky header shadow on scroll
const header = document.getElementById('site-header');
if (header) {
  const applyShadow = () => {
    header.classList.toggle('shadow-md', window.scrollY > 8);
  };
  applyShadow();
  window.addEventListener('scroll', applyShadow, { passive: true });
}

// FAQ accordion (the + icon rotates 45 degrees into a close mark)
document.querySelectorAll('.faq-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const panel = trigger.nextElementSibling;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-trigger').forEach((t) => {
      t.setAttribute('aria-expanded', 'false');
      t.querySelector('.faq-icon').classList.remove('rotate-45');
      t.nextElementSibling.classList.add('hidden');
    });

    if (!isOpen) {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.querySelector('.faq-icon').classList.add('rotate-45');
      panel.classList.remove('hidden');
    }
  });
});

// Floating mobile CTA bar: appears past the hero, hides at the booking form
const ctaBar = document.getElementById('mobile-cta');
if (ctaBar) {
  const contact = document.getElementById('contact');
  let nearContact = false;
  const updateBar = () => {
    const show = window.scrollY > 350 && !nearContact;
    ctaBar.classList.toggle('translate-y-full', !show);
  };
  window.addEventListener('scroll', updateBar, { passive: true });
  if (contact && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      nearContact = entries[0].isIntersecting;
      updateBar();
    }, { threshold: 0.15 }).observe(contact);
  }
  updateBar();
}

// Scroll-reveal for cards, headings and FAQ rows (skipped for reduced-motion users)
const revealTargets = document.querySelectorAll('.card, #reviews blockquote, .faq-item, main section h2, main section .section-eyebrow');
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
  // Observe every reveal element, including any written directly into the markup.
  // Observing only revealTargets would leave hand-authored ones stuck at opacity 0.
  document.querySelectorAll('.js-reveal').forEach((el) => io.observe(el));
} else {
  document.querySelectorAll('.js-reveal').forEach((el) => el.classList.add('in'));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
