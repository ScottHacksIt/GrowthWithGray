/**
 * Growth With Gray - FAQ Accordion
 * Enhances <details>/<summary> with smooth animation
 */

document.addEventListener('components-loaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    const answer = item.querySelector('.faq-answer');

    if (!summary || !answer) return;

    summary.addEventListener('click', (e) => {
      e.preventDefault();

      // If already open, close it
      if (item.hasAttribute('open')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        // Force reflow
        answer.offsetHeight;
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';

        answer.addEventListener('transitionend', function handler() {
          item.removeAttribute('open');
          answer.style.maxHeight = '';
          answer.style.overflow = '';
          answer.removeEventListener('transitionend', handler);
        });
      } else {
        // Open it
        item.setAttribute('open', '');
        const height = answer.scrollHeight;
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        // Force reflow
        answer.offsetHeight;
        answer.style.transition = 'max-height 300ms ease';
        answer.style.maxHeight = height + 'px';

        answer.addEventListener('transitionend', function handler() {
          answer.style.maxHeight = '';
          answer.style.overflow = '';
          answer.style.transition = '';
          answer.removeEventListener('transitionend', handler);
        });
      }
    });
  });
});
