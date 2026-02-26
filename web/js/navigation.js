/**
 * Growth With Gray - Navigation
 * Mobile menu toggle, active page highlight, scroll-based header
 */

document.addEventListener('components-loaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // ---- Active Page Highlight ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const pageName = currentPage.replace('.html', '') || 'index';

  navLinks.forEach(link => {
    if (link.dataset.page === pageName) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ---- Mobile Menu Toggle ----
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isOpen);
      nav.classList.toggle('is-open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
          toggle.setAttribute('aria-expanded', 'false');
          nav.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  // ---- Scroll-based Header ----
  let lastScrollY = 0;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load

  // ---- Smooth Scroll for Anchor Links ----
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);

    if (target) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
