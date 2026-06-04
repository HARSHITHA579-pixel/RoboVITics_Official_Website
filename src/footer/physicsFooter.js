/**
 * Footer — Static cool design, no interactive physics.
 * Just initializes any minor footer effects.
 */

export function init() {
  // Nothing interactive — the footer is pure CSS
  // But add a subtle year update
  const yearEls = document.querySelectorAll('#site-footer .footer-bottom-content p');
  if (yearEls.length > 0) {
    const year = new Date().getFullYear();
    yearEls[0].innerHTML = `&copy; ${year} RoboVITics — VIT Vellore`;
  }
}
