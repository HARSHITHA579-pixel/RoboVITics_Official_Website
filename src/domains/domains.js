import { gsap } from 'gsap';

// ── Inline SVG Icons ──────────────────────────────────────────
const DOMAIN_ICONS = {
  // ─── Technical ───
  gear: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="24" cy="24" r="7"/>
    <path d="M24 5v4M24 39v4M5 24h4M39 24h4M10.1 10.1l2.8 2.8M35.1 35.1l2.8 2.8M10.1 37.9l2.8-2.8M35.1 12.9l2.8-2.8"/>
    <circle cx="24" cy="24" r="12" stroke-dasharray="4 3" opacity="0.4"/>
  </svg>`,

  resistor: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="4" y1="24" x2="12" y2="24"/>
    <polyline points="12,24 15,16 18,32 21,16 24,32 27,16 30,32 33,16 36,24"/>
    <line x1="36" y1="24" x2="44" y2="24"/>
    <circle cx="8" cy="24" r="2" opacity="0.4"/>
    <circle cx="40" cy="24" r="2" opacity="0.4"/>
  </svg>`,

  neuralNet: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="10" cy="14" r="3"/><circle cx="10" cy="34" r="3"/>
    <circle cx="24" cy="10" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="24" cy="38" r="3"/>
    <circle cx="38" cy="18" r="3"/><circle cx="38" cy="32" r="3"/>
    <line x1="13" y1="14" x2="21" y2="10" opacity="0.5"/><line x1="13" y1="14" x2="21" y2="24" opacity="0.5"/>
    <line x1="13" y1="34" x2="21" y2="24" opacity="0.5"/><line x1="13" y1="34" x2="21" y2="38" opacity="0.5"/>
    <line x1="27" y1="10" x2="35" y2="18" opacity="0.5"/><line x1="27" y1="24" x2="35" y2="18" opacity="0.5"/>
    <line x1="27" y1="24" x2="35" y2="32" opacity="0.5"/><line x1="27" y1="38" x2="35" y2="32" opacity="0.5"/>
  </svg>`,

  microchip: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="14" width="20" height="20" rx="2"/>
    <rect x="18" y="18" width="12" height="12" rx="1" opacity="0.4"/>
    <line x1="18" y1="8" x2="18" y2="14"/><line x1="24" y1="8" x2="24" y2="14"/><line x1="30" y1="8" x2="30" y2="14"/>
    <line x1="18" y1="34" x2="18" y2="40"/><line x1="24" y1="34" x2="24" y2="40"/><line x1="30" y1="34" x2="30" y2="40"/>
    <line x1="8" y1="18" x2="14" y2="18"/><line x1="8" y1="24" x2="14" y2="24"/><line x1="8" y1="30" x2="14" y2="30"/>
    <line x1="34" y1="18" x2="40" y2="18"/><line x1="34" y1="24" x2="40" y2="24"/><line x1="34" y1="30" x2="40" y2="30"/>
  </svg>`,

  cube: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
    <path d="M24 6L40 16v16L24 42 8 32V16L24 6z"/>
    <path d="M24 6v36" opacity="0.4"/>
    <path d="M8 16l16 10 16-10" opacity="0.4"/>
    <circle cx="24" cy="24" r="2" opacity="0.3"/>
  </svg>`,

  codeBrackets: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="16,12 8,24 16,36"/>
    <polyline points="32,12 40,24 32,36"/>
    <line x1="28" y1="8" x2="20" y2="40"/>
    <circle cx="24" cy="24" r="2" opacity="0.3"/>
  </svg>`,

  // ─── Non-Technical ───
  camera: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 16h4l4-6h20l4 6h4v22H6V16z"/>
    <circle cx="24" cy="27" r="7"/>
    <circle cx="24" cy="27" r="3" opacity="0.4"/>
    <circle cx="38" cy="20" r="1.5" opacity="0.5"/>
  </svg>`,

  palette: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 6C14 6 6 14 6 24s8 18 18 18c2 0 3-1 3-2.5 0-.7-.3-1.3-.7-1.8-.4-.5-.7-1.1-.7-1.7 0-1.4 1.1-2.5 2.5-2.5H32c5.5 0 10-4.5 10-10C42 13.4 33.9 6 24 6z"/>
    <circle cx="16" cy="20" r="2.5"/><circle cx="22" cy="14" r="2.5"/>
    <circle cx="30" cy="14" r="2.5"/><circle cx="36" cy="20" r="2.5"/>
  </svg>`,

  calendar: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="6" y="10" width="36" height="30" rx="3"/>
    <line x1="6" y1="18" x2="42" y2="18"/>
    <line x1="14" y1="6" x2="14" y2="14"/><line x1="34" y1="6" x2="34" y2="14"/>
    <rect x="12" y="23" width="5" height="4" rx="0.5" opacity="0.4"/>
    <rect x="21.5" y="23" width="5" height="4" rx="0.5" opacity="0.4"/>
    <rect x="31" y="23" width="5" height="4" rx="0.5" opacity="0.4"/>
    <rect x="12" y="31" width="5" height="4" rx="0.5" opacity="0.4"/>
    <rect x="21.5" y="31" width="5" height="4" rx="0.5" opacity="0.4"/>
  </svg>`,

  megaphone: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M38 8L16 16H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8l22 8V8z"/>
    <path d="M14 28v8a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-6" opacity="0.5"/>
    <line x1="42" y1="20" x2="46" y2="20" opacity="0.4"/>
    <line x1="42" y1="28" x2="46" y2="28" opacity="0.4"/>
    <line x1="44" y1="24" x2="46" y2="24" opacity="0.4"/>
  </svg>`,

  chart: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="6" y1="40" x2="42" y2="40"/>
    <line x1="6" y1="40" x2="6" y2="8"/>
    <rect x="12" y="26" width="5" height="14" rx="1" opacity="0.6"/>
    <rect x="21" y="18" width="5" height="22" rx="1" opacity="0.6"/>
    <rect x="30" y="12" width="5" height="28" rx="1" opacity="0.6"/>
    <polyline points="12,24 21,16 30,10 39,14" stroke-dasharray="3 2" opacity="0.5"/>
    <circle cx="39" cy="14" r="2" opacity="0.4"/>
  </svg>`,

  book: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 8h14c2.2 0 4 1.8 4 4v28c0-2.2-1.8-3-4-3H6V8z"/>
    <path d="M42 8H28c-2.2 0-4 1.8-4 4v28c0-2.2 1.8-3 4-3h14V8z"/>
    <line x1="12" y1="16" x2="18" y2="16" opacity="0.4"/>
    <line x1="12" y1="22" x2="18" y2="22" opacity="0.4"/>
    <line x1="12" y1="28" x2="16" y2="28" opacity="0.4"/>
    <line x1="30" y1="16" x2="36" y2="16" opacity="0.4"/>
    <line x1="30" y1="22" x2="36" y2="22" opacity="0.4"/>
    <line x1="30" y1="28" x2="34" y2="28" opacity="0.4"/>
  </svg>`,
};

// ── Domain Data ───────────────────────────────────────────────
const TECH_DOMAINS = [
  {
    name: 'Mechanical Engineering',
    description: 'Chassis design, CNC machining, material science, and structural analysis for combat-grade robotics.',
    icon: 'gear',
  },
  {
    name: 'Electrical Systems',
    description: 'Power distribution, motor controllers, custom PCB design, and high-current wiring harnesses.',
    icon: 'resistor',
  },
  {
    name: 'AI/ML & Autonomy',
    description: 'Computer vision pipelines, reinforcement learning for gait control, and autonomous navigation stacks.',
    icon: 'neuralNet',
  },
  {
    name: 'Embedded Systems',
    description: 'Firmware development on STM32/ESP32, real-time sensor fusion, and communication protocols.',
    icon: 'microchip',
  },
  {
    name: 'CAD & Simulation',
    description: 'SolidWorks & Fusion 360 modeling, FEA stress testing, and Gazebo/MATLAB simulations.',
    icon: 'cube',
  },
  {
    name: 'Software Development',
    description: 'ROS2 integration, web dashboards, control algorithms, and telemetry data systems.',
    icon: 'codeBrackets',
  },
];

const NON_TECH_DOMAINS = [
  {
    name: 'Content & Design',
    description: 'Visual identity, poster design, video production, photography, social media management, and technical storytelling across all channels.',
    icon: 'camera',
  },
  {
    name: 'Events & Outreach',
    description: 'Planning and executing workshops, hackathons, competitions, sponsor relations, cross-club partnerships, and public engagement.',
    icon: 'calendar',
  },
  {
    name: 'Operations & Research',
    description: 'Budget allocation, procurement, logistics coordination, technical paper writing, documentation, and knowledge-base maintenance.',
    icon: 'chart',
  },
];

// ── Module state ──────────────────────────────────────────────
let isTech = true;
let isAnimating = false;

// ── Render domain cards into the grid ─────────────────────────
function renderCards(domains, animate = true) {
  const grid = document.getElementById('domains-grid');
  if (!grid) return;

  grid.innerHTML = '';

  // Apply grid mode class
  grid.classList.remove('domains-grid-tech', 'domains-grid-nontech');
  grid.classList.add(isTech ? 'domains-grid-tech' : 'domains-grid-nontech');

  domains.forEach((domain) => {
    const card = document.createElement('div');
    card.className = 'domain-card interactive';

    card.innerHTML = `
      <div class="domain-indicator"></div>
      <div class="domain-icon">${DOMAIN_ICONS[domain.icon]}</div>
      <h3>${domain.name}</h3>
      <p>${domain.description}</p>
    `;

    grid.appendChild(card);
  });

  if (animate) {
    const cards = grid.querySelectorAll('.domain-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.07,
        ease: 'power2.out',
        onComplete: () => {
          cards.forEach((c) => c.classList.add('visible'));
          isAnimating = false;
        },
      }
    );
  } else {
    const cards = grid.querySelectorAll('.domain-card');
    cards.forEach((c) => c.classList.add('visible'));
  }
}

// ── Update toggle label styling ──────────────────────────────
function updateLabels() {
  const techLabel = document.getElementById('tech-label');
  const nonTechLabel = document.getElementById('nontech-label');
  const toggle = document.getElementById('domain-toggle');

  if (techLabel) techLabel.classList.toggle('active', isTech);
  if (nonTechLabel) nonTechLabel.classList.toggle('active', !isTech);

  if (toggle) {
    if (isTech) {
      toggle.classList.remove('non-tech');
    } else {
      toggle.classList.add('non-tech');
    }
  }
}

// ── Toggle handler ────────────────────────────────────────────
function handleToggle() {
  if (isAnimating) return;
  isAnimating = true;

  const grid = document.getElementById('domains-grid');
  if (!grid) return;

  const currentCards = grid.querySelectorAll('.domain-card');

  // Animate out current cards
  gsap.to(currentCards, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    stagger: 0.04,
    ease: 'power2.in',
    onComplete: () => {
      // Flip state
      isTech = !isTech;
      updateLabels();

      // Render new cards with entrance animation
      const newDomains = isTech ? TECH_DOMAINS : NON_TECH_DOMAINS;
      renderCards(newDomains, true);
    },
  });
}

// ── Init ──────────────────────────────────────────────────────
export function init() {
  // Set initial labels
  updateLabels();

  // Render initial tech domains
  renderCards(TECH_DOMAINS, true);

  // Bind toggle click
  const toggle = document.getElementById('domain-toggle');
  if (toggle) {
    toggle.addEventListener('click', handleToggle);
  }

  // Bind label clicks
  const techLabel = document.getElementById('tech-label');
  const nonTechLabel = document.getElementById('nontech-label');

  if (techLabel) {
    techLabel.addEventListener('click', () => {
      if (!isTech) handleToggle();
    });
  }

  if (nonTechLabel) {
    nonTechLabel.addEventListener('click', () => {
      if (isTech) handleToggle();
    });
  }
}
