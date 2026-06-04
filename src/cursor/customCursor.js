/**
 * Custom Cursor — SVG targeting reticle
 * Follows mouse with lerp, expands on interactive elements
 */

export function init() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  // Check for touch device
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let isHovering = false;
  let rotation = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Track interactive elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (
      target.classList.contains('interactive') ||
      target.closest('.interactive') ||
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button')
    ) {
      cursor.classList.add('hovering');
      isHovering = true;
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    if (
      target.classList.contains('interactive') ||
      target.closest('.interactive') ||
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button')
    ) {
      cursor.classList.remove('hovering');
      isHovering = false;
    }
  });

  function animate() {
    // Lerp cursor position
    const lerpFactor = 0.15;
    cursorX += (mouseX - cursorX) * lerpFactor;
    cursorY += (mouseY - cursorY) * lerpFactor;

    // Rotate when hovering
    if (isHovering) {
      rotation += 2;
    } else {
      rotation += 0.2;
    }

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    const svg = cursor.querySelector('svg');
    if (svg) {
      svg.style.transform = `rotate(${rotation}deg)`;
    }

    requestAnimationFrame(animate);
  }

  animate();
}
