/**
 * Growth With Gray - Contact Form
 * Validation and Formspree submission
 */

document.addEventListener('components-loaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: { el: form.querySelector('#name'), rules: { required: true, minLength: 2 } },
    email: { el: form.querySelector('#email'), rules: { required: true, email: true } },
    phone: { el: form.querySelector('#phone'), rules: {} },
    service: { el: form.querySelector('#service'), rules: { required: true } },
    message: { el: form.querySelector('#message'), rules: { required: true, minLength: 10 } }
  };

  const successEl = form.querySelector('.form-success');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(name) {
    const field = fields[name];
    if (!field || !field.el) return true;

    const value = field.el.value.trim();
    const rules = field.rules;
    const errorEl = document.getElementById(`${name}-error`);
    let valid = true;
    let message = '';

    if (rules.required && !value) {
      valid = false;
      message = 'This field is required.';
    } else if (rules.minLength && value.length < rules.minLength) {
      valid = false;
      message = `Please enter at least ${rules.minLength} characters.`;
    } else if (rules.email && value && !emailRegex.test(value)) {
      valid = false;
      message = 'Please enter a valid email address.';
    }

    if (!valid) {
      field.el.classList.add('is-invalid');
      field.el.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('is-visible');
      }
    } else {
      field.el.classList.remove('is-invalid');
      field.el.removeAttribute('aria-invalid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('is-visible');
      }
    }

    return valid;
  }

  function validateAll() {
    let allValid = true;
    for (const name of Object.keys(fields)) {
      if (!validateField(name)) {
        allValid = false;
      }
    }
    return allValid;
  }

  // Validate on blur
  for (const [name, field] of Object.entries(fields)) {
    if (field.el) {
      field.el.addEventListener('blur', () => validateField(name));
    }
  }

  // Handle submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    // Disable submit button
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        if (successEl) {
          successEl.textContent = 'Thank you for reaching out! I\'ll be in touch within 24\u201348 hours.';
          successEl.classList.add('is-visible');
        }
        // Hide success after 8 seconds
        setTimeout(() => {
          if (successEl) successEl.classList.remove('is-visible');
        }, 8000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      if (successEl) {
        successEl.textContent = 'Something went wrong. Please try again or email directly.';
        successEl.style.borderColor = 'var(--color-error)';
        successEl.style.color = 'var(--color-error)';
        successEl.classList.add('is-visible');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    }
  });
});
