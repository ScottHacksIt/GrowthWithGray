/**
 * Growth With Gray - Scroll Animations
 * Intersection Observer for scroll-triggered reveals
 */

document.addEventListener('components-loaded', () => {
  const reveals = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale');

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
});
