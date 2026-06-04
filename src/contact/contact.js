/**
 * Contact Form — Terminal-styled with transmission confirmation
 */

export function init() {
  const form = document.getElementById('contact-form');
  const confirmation = document.getElementById('contact-confirmation');

  if (!form || !confirmation) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate transmission
    const submitBtn = document.getElementById('contact-submit');
    if (submitBtn) {
      submitBtn.innerHTML = '<span>TRANSMITTING...</span>';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
    }

    setTimeout(() => {
      form.classList.add('hidden');
      confirmation.classList.remove('hidden');

      // Reset after 5 seconds
      setTimeout(() => {
        confirmation.classList.add('hidden');
        form.classList.remove('hidden');
        form.reset();
        if (submitBtn) {
          submitBtn.innerHTML = `<span>TRANSMIT</span>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>`;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }
      }, 5000);
    }, 1200);
  });

  // Add blinking cursor effect to focused inputs
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
}
