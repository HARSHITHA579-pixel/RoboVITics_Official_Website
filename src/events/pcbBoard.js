/**
 * Events — Split-Layout with PCB Background
 * PCB circuit schematic as background, events list on right,
 * expanded detail card on left with auto-rotating image carousel
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EVENTS = [
  {
    name: 'RoboWars Championship',
    type: 'Competition',
    date: 'Dec 2025',
    description: 'The ultimate combat bot tournament. Teams from across the country battle custom-built machines in an arena of destruction. Weight classes from 8kg to 60kg. Engineering meets strategy in the most intense robotic showdown of the year.',
    images: [
      'https://picsum.photos/seed/robowars1/600/400',
      'https://picsum.photos/seed/robowars2/600/400',
      'https://picsum.photos/seed/robowars3/600/400',
    ],
  },
  {
    name: 'MakeAThon 5.0',
    type: 'Hackathon',
    date: 'Jan 2026',
    description: 'A 48-hour build marathon where participants go from concept to working prototype. Mentors, components, and tools provided. No sleep guaranteed. Innovate under pressure and walk away with a real, functional creation.',
    images: [
      'https://picsum.photos/seed/makeathon1/600/400',
      'https://picsum.photos/seed/makeathon2/600/400',
      'https://picsum.photos/seed/makeathon3/600/400',
    ],
  },
  {
    name: 'Circuit Siege',
    type: 'Workshop',
    date: 'Feb 2026',
    description: 'An intensive electronics and IoT hackathon. Design, solder, and program embedded systems from scratch. From PCB layout to firmware deployment — master the full hardware development pipeline in one weekend.',
    images: [
      'https://picsum.photos/seed/circuit1/600/400',
      'https://picsum.photos/seed/circuit2/600/400',
      'https://picsum.photos/seed/circuit3/600/400',
    ],
  },
  {
    name: 'Kinematic Konquest',
    type: 'Challenge',
    date: 'Mar 2026',
    description: 'Legged robot obstacle course race. Navigate rough terrain, climb inclines, and maintain balance through dynamic obstacles. The fastest and most agile quadruped wins. Push the limits of locomotion engineering.',
    images: [
      'https://picsum.photos/seed/kinematic1/600/400',
      'https://picsum.photos/seed/kinematic2/600/400',
      'https://picsum.photos/seed/kinematic3/600/400',
    ],
  },
  {
    name: 'Neural Nexus',
    type: 'Workshop',
    date: 'Apr 2026',
    description: 'AI/ML robotics workshop series covering computer vision, reinforcement learning, and autonomous navigation. Hands-on with ROS2 and Gazebo simulation. Bridge the gap between intelligent algorithms and physical machines.',
    images: [
      'https://picsum.photos/seed/neural1/600/400',
      'https://picsum.photos/seed/neural2/600/400',
      'https://picsum.photos/seed/neural3/600/400',
    ],
  },
  {
    name: 'Mech Mayhem',
    type: 'Competition',
    date: 'May 2026',
    description: 'Open robotics competition — any design, any mechanism. Innovation is the only rule. Judged on design creativity, performance, and engineering quality. Unleash your most ambitious robotic creation on the world stage.',
    images: [
      'https://picsum.photos/seed/mechmay1/600/400',
      'https://picsum.photos/seed/mechmay2/600/400',
      'https://picsum.photos/seed/mechmay3/600/400',
    ],
  },
];

const CHIP_ICONS = [
  `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="12" fill="none" stroke-width="1.5"/><path d="M14 14l12 12M26 14l-12 12" stroke-width="1.5"/></svg>`,
  `<svg viewBox="0 0 40 40"><rect x="8" y="8" width="24" height="24" rx="2" fill="none" stroke-width="1.5"/><circle cx="20" cy="20" r="4" fill="none" stroke-width="1.5"/></svg>`,
  `<svg viewBox="0 0 40 40"><path d="M10 30L20 10L30 30" fill="none" stroke-width="1.5"/><line x1="14" y1="23" x2="26" y2="23" stroke-width="1.5"/></svg>`,
  `<svg viewBox="0 0 40 40"><rect x="10" y="14" width="20" height="12" rx="1" fill="none" stroke-width="1.5"/><line x1="10" y1="20" x2="6" y2="20" stroke-width="1.5"/><line x1="30" y1="20" x2="34" y2="20" stroke-width="1.5"/></svg>`,
  `<svg viewBox="0 0 40 40"><circle cx="15" cy="20" r="3" fill="none" stroke-width="1.5"/><circle cx="25" cy="20" r="3" fill="none" stroke-width="1.5"/><line x1="18" y1="20" x2="22" y2="20" stroke-width="1.5"/><line x1="8" y1="20" x2="12" y2="20" stroke-width="1.5"/><line x1="28" y1="20" x2="32" y2="20" stroke-width="1.5"/></svg>`,
  `<svg viewBox="0 0 40 40"><polygon points="20,8 32,16 32,28 20,36 8,28 8,16" fill="none" stroke-width="1.5"/><circle cx="20" cy="22" r="5" fill="none" stroke-width="1.5"/></svg>`,
];

// Circuit component SVG symbols
const COMPONENTS = {
  resistor: (x, y, horiz = true) => {
    if (horiz) return `<path d="M${x-15},${y} l3,0 l2,-6 l4,12 l4,-12 l4,12 l4,-12 l4,12 l2,-6 l3,0" fill="none" class="circuit-component"/>`;
    return `<path d="M${x},${y-15} l0,3 l-6,2 l12,4 l-12,4 l12,4 l-12,4 l12,4 l-6,2 l0,3" fill="none" class="circuit-component"/>`;
  },
  capacitor: (x, y, horiz = true) => {
    if (horiz) return `<line x1="${x-10}" y1="${y}" x2="${x-3}" y2="${y}" class="circuit-component"/><line x1="${x-3}" y1="${y-8}" x2="${x-3}" y2="${y+8}" class="circuit-component"/><line x1="${x+3}" y1="${y-8}" x2="${x+3}" y2="${y+8}" class="circuit-component"/><line x1="${x+3}" y1="${y}" x2="${x+10}" y2="${y}" class="circuit-component"/>`;
    return `<line x1="${x}" y1="${y-10}" x2="${x}" y2="${y-3}" class="circuit-component"/><line x1="${x-8}" y1="${y-3}" x2="${x+8}" y2="${y-3}" class="circuit-component"/><line x1="${x-8}" y1="${y+3}" x2="${x+8}" y2="${y+3}" class="circuit-component"/><line x1="${x}" y1="${y+3}" x2="${x}" y2="${y+10}" class="circuit-component"/>`;
  },
  diode: (x, y, horiz = true) => {
    if (horiz) return `<line x1="${x-10}" y1="${y}" x2="${x-4}" y2="${y}" class="circuit-component"/><polygon points="${x-4},${y-6} ${x+4},${y} ${x-4},${y+6}" fill="none" class="circuit-component"/><line x1="${x+4}" y1="${y-6}" x2="${x+4}" y2="${y+6}" class="circuit-component"/><line x1="${x+4}" y1="${y}" x2="${x+10}" y2="${y}" class="circuit-component"/>`;
    return `<line x1="${x}" y1="${y-10}" x2="${x}" y2="${y-4}" class="circuit-component"/><polygon points="${x-6},${y-4} ${x},${y+4} ${x+6},${y-4}" fill="none" class="circuit-component"/><line x1="${x-6}" y1="${y+4}" x2="${x+6}" y2="${y+4}" class="circuit-component"/><line x1="${x}" y1="${y+4}" x2="${x}" y2="${y+10}" class="circuit-component"/>`;
  },
  via: (x, y) => `<circle cx="${x}" cy="${y}" r="4" fill="none" class="circuit-component"/><circle cx="${x}" cy="${y}" r="1.5" class="circuit-via"/>`,
  ground: (x, y) => `<line x1="${x}" y1="${y}" x2="${x}" y2="${y+6}" class="circuit-component"/><line x1="${x-8}" y1="${y+6}" x2="${x+8}" y2="${y+6}" class="circuit-component"/><line x1="${x-5}" y1="${y+10}" x2="${x+5}" y2="${y+10}" class="circuit-component"/><line x1="${x-2}" y1="${y+14}" x2="${x+2}" y2="${y+14}" class="circuit-component"/>`,
};

let activeEventIndex = -1;
let carouselInterval = null;
let currentSlide = 0;

// ── Create static circuit schematic background ──
function createCircuitSchematic(svg) {
  const w = svg.clientWidth || 1000;
  const h = svg.clientHeight || 600;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

  let bgSvg = '';
  const traceColor = 'rgba(87, 124, 142, 0.08)';
  const nodeColor = 'rgba(87, 124, 142, 0.12)';

  for (let x = 30; x < w - 30; x += 50) {
    for (let y = 30; y < h - 30; y += 50) {
      if (Math.random() > 0.6) {
        const len = 30 + Math.random() * 40;
        bgSvg += `<line x1="${x}" y1="${y}" x2="${x + len}" y2="${y}" stroke="${traceColor}" stroke-width="1"/>`;
      }
      if (Math.random() > 0.7) {
        const len = 25 + Math.random() * 35;
        bgSvg += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + len}" stroke="${traceColor}" stroke-width="1"/>`;
      }
      if (Math.random() > 0.85) {
        bgSvg += `<circle cx="${x}" cy="${y}" r="2" fill="${nodeColor}"/>`;
      }
    }
  }

  const bgComponents = [
    COMPONENTS.resistor(80, 80, true),
    COMPONENTS.capacitor(w - 120, 60, true),
    COMPONENTS.diode(150, h - 60, true),
    COMPONENTS.via(w / 2 - 60, 50),
    COMPONENTS.via(w / 2 + 80, h - 50),
    COMPONENTS.ground(w / 2, h - 40),
    COMPONENTS.resistor(w - 200, h / 2, false),
    COMPONENTS.capacitor(100, h / 2 + 30, false),
  ];

  const bgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  bgGroup.setAttribute('class', 'circuit-bg');
  bgGroup.innerHTML = bgSvg + bgComponents.join('');
  svg.appendChild(bgGroup);
}

// ── Draw animated trace from event chip to expanded panel ──
function drawTrace(svg, chipEl) {
  clearTraces(svg);

  const svgRect = svg.getBoundingClientRect();
  const chipRect = chipEl.getBoundingClientRect();

  const cx = chipRect.left + chipRect.width / 2 - svgRect.left;
  const cy = chipRect.top + chipRect.height / 2 - svgRect.top;

  // Trace goes from chip leftward toward the expanded panel area
  const targetX = svgRect.width * 0.38;
  const targetY = svgRect.height * 0.5;

  // Create an L-shaped path with some variation
  const midX = cx - (cx - targetX) * 0.5;
  const path = `M${cx},${cy} L${midX},${cy} L${midX},${targetY} L${targetX},${targetY}`;

  const filterId = `trace-glow`;
  const traceGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  traceGroup.setAttribute('class', 'active-trace');
  traceGroup.innerHTML = `
    <defs>
      <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
  `;

  const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathEl.setAttribute('d', path);
  pathEl.setAttribute('fill', 'none');
  pathEl.setAttribute('stroke', '#C4873B');
  pathEl.setAttribute('stroke-width', '2');
  pathEl.setAttribute('filter', `url(#${filterId})`);
  pathEl.setAttribute('opacity', '0.8');

  const pathLength = 800;
  pathEl.style.strokeDasharray = pathLength;
  pathEl.style.strokeDashoffset = pathLength;

  traceGroup.appendChild(pathEl);

  // Add via nodes at bends
  const compGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  compGroup.setAttribute('class', 'trace-components');
  compGroup.setAttribute('opacity', '0');
  compGroup.innerHTML = COMPONENTS.via(midX, cy) + COMPONENTS.via(midX, targetY);
  traceGroup.appendChild(compGroup);

  svg.appendChild(traceGroup);

  gsap.to(pathEl.style, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' });
  gsap.to(compGroup, { opacity: 1, duration: 0.4, delay: 0.4, ease: 'power2.out' });
}

function clearTraces(svg) {
  svg.querySelectorAll('.active-trace').forEach(el => el.remove());
}

// ── Carousel ──
function startCarousel(images) {
  stopCarousel();
  currentSlide = 0;
  updateCarouselSlide(images);

  carouselInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % images.length;
    updateCarouselSlide(images);
  }, 3000);
}

function stopCarousel() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

function updateCarouselSlide(images) {
  const track = document.getElementById('event-carousel-track');
  if (!track) return;

  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

// ── Render Events ──
function renderEvents() {
  const listContainer = document.getElementById('events-list');
  if (!listContainer) return;

  EVENTS.forEach((event, i) => {
    const item = document.createElement('div');
    item.className = 'event-item interactive';
    item.dataset.index = i;

    item.innerHTML = `
      <div class="event-item-icon">${CHIP_ICONS[i]}</div>
      <div class="event-item-info">
        <div class="event-item-name">${event.name}</div>
        <div class="event-item-meta">${event.type} · ${event.date}</div>
      </div>
      <div class="event-item-indicator"></div>
    `;

    item.addEventListener('click', () => selectEvent(i));
    listContainer.appendChild(item);
  });
}

function selectEvent(index) {
  const container = document.getElementById('events-layout');
  const expandedPanel = document.getElementById('event-expanded');
  const svg = document.getElementById('pcb-traces');
  const allItems = document.querySelectorAll('.event-item');

  // Deselect if same
  if (activeEventIndex === index) {
    deselectEvent();
    return;
  }

  const wasAlreadyExpanded = activeEventIndex >= 0;
  activeEventIndex = index;

  // Mark container as expanded
  container.classList.add('expanded');

  // Update item styles
  allItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });

  // Draw PCB trace to active item
  const activeItem = allItems[index];
  if (svg && activeItem) {
    requestAnimationFrame(() => drawTrace(svg, activeItem));
  }

  // Populate expanded panel
  const event = EVENTS[index];
  const carouselHTML = event.images.map(img =>
    `<div class="carousel-slide"><img src="${img}" alt="${event.name}" loading="lazy" /></div>`
  ).join('');

  const dotsHTML = event.images.map((_, i) =>
    `<span class="carousel-dot ${i === 0 ? 'active' : ''}"></span>`
  ).join('');

  const contentEl = document.getElementById('event-expanded-content');
  if (!wasAlreadyExpanded) {
    // First time opening — animate in
    expandedPanel.innerHTML = `
      <div id="event-expanded-content">
        <h3 class="event-expanded-title">${event.name}</h3>
        <div class="event-expanded-type">${event.type} · ${event.date}</div>
        <div class="event-carousel">
          <div class="event-carousel-track" id="event-carousel-track">${carouselHTML}</div>
          <div class="carousel-dots">${dotsHTML}</div>
        </div>
        <p class="event-expanded-desc">${event.description}</p>
      </div>
    `;

    gsap.fromTo(expandedPanel, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
  } else {
    // Already expanded — crossfade content
    const existingContent = expandedPanel.querySelector('#event-expanded-content');
    if (existingContent) {
      gsap.to(existingContent, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          expandedPanel.innerHTML = `
            <div id="event-expanded-content">
              <h3 class="event-expanded-title">${event.name}</h3>
              <div class="event-expanded-type">${event.type} · ${event.date}</div>
              <div class="event-carousel">
                <div class="event-carousel-track" id="event-carousel-track">${carouselHTML}</div>
                <div class="carousel-dots">${dotsHTML}</div>
              </div>
              <p class="event-expanded-desc">${event.description}</p>
            </div>
          `;
          const newContent = expandedPanel.querySelector('#event-expanded-content');
          gsap.fromTo(newContent, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
          startCarousel(event.images);
        },
      });
      return;
    }
  }

  startCarousel(event.images);
}

function deselectEvent() {
  const container = document.getElementById('events-layout');
  const expandedPanel = document.getElementById('event-expanded');
  const svg = document.getElementById('pcb-traces');
  const allItems = document.querySelectorAll('.event-item');

  activeEventIndex = -1;
  stopCarousel();

  allItems.forEach(item => item.classList.remove('active'));

  gsap.to(expandedPanel, {
    opacity: 0,
    x: -30,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      expandedPanel.innerHTML = '';
      container.classList.remove('expanded');
      gsap.set(expandedPanel, { clearProps: 'all' });
    },
  });

  if (svg) clearTraces(svg);
}

// ── Entrance Animation ──
function animateEntrance() {
  const items = document.querySelectorAll('.event-item');
  gsap.fromTo(items,
    { opacity: 0, x: 20 },
    {
      opacity: 1, x: 0,
      duration: 0.5, stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#events-layout', start: 'top 80%' },
    }
  );
}

// ── Init ──
export function init() {
  const svg = document.getElementById('pcb-traces');
  if (svg) {
    requestAnimationFrame(() => createCircuitSchematic(svg));
  }

  renderEvents();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeEventIndex >= 0) deselectEvent();
  });

  // Close on scroll away
  let scrollTimer;
  window.addEventListener('scroll', () => {
    if (activeEventIndex < 0) return;
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const section = document.getElementById('events');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) deselectEvent();
      }
    }, 150);
  });

  animateEntrance();

  // Redraw on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (svg) {
        svg.innerHTML = '';
        createCircuitSchematic(svg);
        if (activeEventIndex >= 0) {
          const activeItem = document.querySelector('.event-item.active');
          if (activeItem) drawTrace(svg, activeItem);
        }
      }
    }, 300);
  });
}
