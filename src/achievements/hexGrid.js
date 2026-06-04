/**
 * Achievements — Clean expandable card grid with icons
 */
import achievementsData from './achievementsData.json';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  trophy: `<svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/><path d="M6 3h12v6a6 6 0 0 1-12 0V3z"/><path d="M9 21h6M12 15v6"/></svg>`,
  star: `<svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`,
  award: `<svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>`,
  document: `<svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>`,
  medal: `<svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.21 15L2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><circle cx="12" cy="17" r="5"/><path d="M12 14v6"/><path d="M9.5 16.5l5 1"/></svg>`,
};

export function init() {
  const grid = document.getElementById('achievements-grid');
  if (!grid) return;

  achievementsData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'achievement-card interactive';
    card.innerHTML = `
      <div class="achievement-header">
        <div class="achievement-icon">
          ${ICONS[item.icon] || ICONS.trophy}
        </div>
        <div class="achievement-title-group">
          <div class="achievement-title">${item.title}</div>
          <div class="achievement-year">${item.year}</div>
        </div>
      </div>
      <div class="achievement-desc">${item.description}</div>
      <div class="achievement-expand-hint">
        <span>▸</span> Click to ${index === 0 ? 'expand' : 'expand'}
      </div>
    `;

    card.addEventListener('click', () => {
      const wasExpanded = card.classList.contains('expanded');
      // Close all others
      grid.querySelectorAll('.achievement-card.expanded').forEach(c => {
        if (c !== card) c.classList.remove('expanded');
      });
      card.classList.toggle('expanded');
    });

    grid.appendChild(card);
  });

  // Scroll animation
  const cards = grid.querySelectorAll('.achievement-card');
  gsap.fromTo(cards,
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    }
  );
}
