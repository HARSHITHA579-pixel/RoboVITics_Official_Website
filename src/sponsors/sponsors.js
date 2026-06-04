/**
 * Sponsors — Compact Logo Collage
 * Masonry-style grid of sponsor logos with links
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPONSORS = [
  { name: 'Texas Instruments', logo: 'TI', url: 'https://www.ti.com', width: 'wide' },
  { name: 'Arduino', logo: 'ARDUINO', url: 'https://www.arduino.cc', width: 'normal' },
  { name: 'Raspberry Pi', logo: 'RPi', url: 'https://www.raspberrypi.com', width: 'normal' },
  { name: 'NVIDIA', logo: 'NVIDIA', url: 'https://www.nvidia.com', width: 'wide' },
  { name: 'Bosch', logo: 'BOSCH', url: 'https://www.bosch.com', width: 'normal' },
  { name: 'Altium', logo: 'ALTIUM', url: 'https://www.altium.com', width: 'normal' },
  { name: 'Autodesk', logo: 'AUTODESK', url: 'https://www.autodesk.com', width: 'wide' },
  { name: 'STMicroelectronics', logo: 'STM', url: 'https://www.st.com', width: 'normal' },
  { name: 'Dassault Systèmes', logo: 'DS', url: 'https://www.3ds.com', width: 'normal' },
  { name: 'MathWorks', logo: 'MATLAB', url: 'https://www.mathworks.com', width: 'normal' },
];

function renderSponsors() {
  const container = document.getElementById('sponsors-grid');
  if (!container) return;

  SPONSORS.forEach((sponsor) => {
    const card = document.createElement('a');
    card.className = `sponsor-card interactive ${sponsor.width === 'wide' ? 'sponsor-wide' : ''}`;
    card.href = sponsor.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('aria-label', `Visit ${sponsor.name}`);

    card.innerHTML = `
      <div class="sponsor-logo-text">${sponsor.logo}</div>
      <div class="sponsor-name">${sponsor.name}</div>
      <div class="sponsor-link-icon">↗</div>
    `;

    container.appendChild(card);
  });
}

function animateEntrance() {
  const cards = document.querySelectorAll('.sponsor-card');
  if (!cards.length) return;

  gsap.set(cards, { opacity: 0, y: 20, scale: 0.95 });

  ScrollTrigger.batch(cards, {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        overwrite: true,
      });
    },
    onLeaveBack: (batch) => {
      gsap.to(batch, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.in',
        overwrite: true,
      });
    },
    start: 'top 85%',
  });
}

export function init() {
  renderSponsors();
  animateEntrance();
}
