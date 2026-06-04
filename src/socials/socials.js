/**
 * Socials — Clean cards with plain white stroke icons
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    name: 'Instagram',
    handle: '@robovitics_vit',
    url: 'https://instagram.com/robovitics_vit',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>`,
  },
  {
    name: 'LinkedIn',
    handle: '/company/robovitics-vit',
    url: 'https://linkedin.com/company/robovitics-vit',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  },
  {
    name: 'YouTube',
    handle: '@RoboVITics',
    url: 'https://youtube.com/@RoboVITics',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75,15.02 15.5,11.75 9.75,8.48"/></svg>`,
  },
  {
    name: 'GitHub',
    handle: 'github.com/robovitics',
    url: 'https://github.com/robovitics',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  },
];

export function init() {
  const grid = document.getElementById('socials-grid');
  if (!grid) return;

  SOCIALS.forEach((social) => {
    const card = document.createElement('a');
    card.className = 'social-card interactive';
    card.href = social.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    card.innerHTML = `
      <div class="social-card-icon">${social.icon}</div>
      <div class="social-card-info">
        <div class="social-card-name">${social.name}</div>
        <div class="social-card-handle">${social.handle}</div>
      </div>
      <span class="social-card-arrow">→</span>
    `;

    grid.appendChild(card);
  });

  const cards = grid.querySelectorAll('.social-card');
  gsap.fromTo(cards,
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    }
  );
}
