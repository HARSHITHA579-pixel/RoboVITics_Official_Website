/**
 * Gallery — Visual Archives
 * Bento-style CSS grid with scroll-triggered stagger animations
 * and hover-reveal captions with scanline overlay
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BENTO_LAYOUT = [
  { cols: 2, rows: 2 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 2, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 2 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 2, rows: 1 },
];

const CAPTIONS = [
  'Combat Arena // RoboWars 2024',
  'Quadruped Testing // Lab Session',
  'Workshop // Soldering Basics',
  'Team Photo // Gravitas 2024',
  'Prototype // MK-IV Drum Spinner',
  'Competition // Asian Robo Championship',
  'Build Session // Midnight Oil',
  'Demo Day // VIT Tech Fest',
  'Victory // National Champions',
];

export function init() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  // Render bento gallery items
  BENTO_LAYOUT.forEach((layout, i) => {
    const el = document.createElement('div');
    el.className = 'gallery-item interactive';
    el.style.gridColumn = `span ${layout.cols}`;
    el.style.gridRow = `span ${layout.rows}`;

    const img = document.createElement('img');
    img.src = `https://picsum.photos/seed/robo${i + 1}/600/350`;
    img.alt = CAPTIONS[i];
    img.loading = 'lazy';
    img.draggable = false;

    const caption = document.createElement('span');
    caption.className = 'gallery-caption';
    caption.textContent = CAPTIONS[i];

    el.appendChild(img);
    el.appendChild(caption);
    grid.appendChild(el);
  });

  // GSAP ScrollTrigger stagger animation
  const items = grid.querySelectorAll('.gallery-item');

  gsap.set(items, {
    opacity: 0,
    y: 60,
    scale: 0.95,
  });

  ScrollTrigger.batch(items, {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        overwrite: true,
      });
    },
    onLeaveBack: (batch) => {
      gsap.to(batch, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.in',
        stagger: 0.05,
        overwrite: true,
      });
    },
    start: 'top 85%',
    end: 'bottom 15%',
  });

  // Subtle parallax drift on images during scroll
  items.forEach((item) => {
    const img = item.querySelector('img');
    if (!img) return;

    gsap.to(img, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  });
}
