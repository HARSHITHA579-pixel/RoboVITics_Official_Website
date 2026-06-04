/**
 * Teams — Simple column expand/collapse without Three.js
 * Uses mockup background images instead of 3D canvases
 */

export function init() {
  const container = document.getElementById('teams-container');
  if (!container) return;

  const columns = container.querySelectorAll('.team-column');

  columns.forEach(col => {
    col.addEventListener('click', () => {
      const wasExpanded = col.classList.contains('expanded');

      // Collapse all
      columns.forEach(c => c.classList.remove('expanded'));

      // Toggle the clicked one
      if (!wasExpanded) {
        col.classList.add('expanded');
      }
    });
  });

  // Close expanded teams when scrolling away
  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const section = document.getElementById('teams');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (!isVisible) {
          columns.forEach(c => c.classList.remove('expanded'));
        }
      }
    }, 200);
  });
}
