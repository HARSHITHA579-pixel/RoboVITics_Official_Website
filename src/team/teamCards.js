/**
 * Team Cards — The Operators
 * ID badge–style cards with watermark overlays,
 * random barcodes, and scroll-triggered stagger animations.
 * Click opens a digital report-style pop-up ID card.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  // Row 1 — Command & Leads
  {
    name: 'Arjun Mehta',
    role: 'Club President',
    photo: 'https://picsum.photos/seed/arjun/400/400',
    division: 'Command',
    joined: '2022',
    specialization: 'Systems Architecture & Strategy',
    clearance: 'LEVEL-5',
    id: 'RV-CMD-001',
  },
  {
    name: 'Priya Sharma',
    role: 'Vice President',
    photo: 'https://picsum.photos/seed/priya/400/400',
    division: 'Command',
    joined: '2022',
    specialization: 'Operations & Planning',
    clearance: 'LEVEL-5',
    id: 'RV-CMD-002',
  },
  {
    name: 'Karthik Rajan',
    role: 'Orcus Lead',
    photo: 'https://picsum.photos/seed/karthik/400/400',
    division: 'Orcus',
    joined: '2023',
    specialization: 'Combat Robotics & Mechanical Design',
    clearance: 'LEVEL-4',
    id: 'RV-ORC-003',
  },
  {
    name: 'Ananya Iyer',
    role: 'Artemis Lead',
    photo: 'https://picsum.photos/seed/ananya/400/400',
    division: 'Artemis',
    joined: '2023',
    specialization: 'Legged Locomotion & Control Systems',
    clearance: 'LEVEL-4',
    id: 'RV-ART-004',
  },
  {
    name: 'Rohan Desai',
    role: 'Avatar Lead',
    photo: 'https://picsum.photos/seed/rohan/400/400',
    division: 'Avatar',
    joined: '2023',
    specialization: 'Humanoid Systems & Dexterous Manipulation',
    clearance: 'LEVEL-4',
    id: 'RV-AVT-005',
  },
  {
    name: 'Sneha Patel',
    role: 'Technical Director',
    photo: 'https://picsum.photos/seed/sneha/400/400',
    division: 'Command',
    joined: '2022',
    specialization: 'Embedded Systems & Integration',
    clearance: 'LEVEL-5',
    id: 'RV-CMD-006',
  },
  // Row 2 — Department Heads
  {
    name: 'Vikram Singh',
    role: 'Design Head',
    photo: 'https://picsum.photos/seed/vikram/400/400',
    division: 'Non-Tech',
    joined: '2023',
    specialization: 'Visual Identity & UI/UX',
    clearance: 'LEVEL-3',
    id: 'RV-DSG-007',
  },
  {
    name: 'Meera Krishnan',
    role: 'Events Head',
    photo: 'https://picsum.photos/seed/meera/400/400',
    division: 'Non-Tech',
    joined: '2023',
    specialization: 'Event Planning & Logistics',
    clearance: 'LEVEL-3',
    id: 'RV-EVT-008',
  },
  {
    name: 'Aditya Nair',
    role: 'Software Lead',
    photo: 'https://picsum.photos/seed/aditya/400/400',
    division: 'Orcus',
    joined: '2024',
    specialization: 'ROS2 & Control Algorithms',
    clearance: 'LEVEL-3',
    id: 'RV-SFT-009',
  },
  {
    name: 'Ishita Gupta',
    role: 'Electronics Lead',
    photo: 'https://picsum.photos/seed/ishita/400/400',
    division: 'Artemis',
    joined: '2024',
    specialization: 'PCB Design & Power Systems',
    clearance: 'LEVEL-3',
    id: 'RV-ELC-010',
  },
  {
    name: 'Rahul Verma',
    role: 'Mechanical Lead',
    photo: 'https://picsum.photos/seed/rahul/400/400',
    division: 'Orcus',
    joined: '2024',
    specialization: 'CAD/CAM & Fabrication',
    clearance: 'LEVEL-3',
    id: 'RV-MCH-011',
  },
  {
    name: 'Diya Menon',
    role: 'AI/ML Lead',
    photo: 'https://picsum.photos/seed/diya/400/400',
    division: 'Avatar',
    joined: '2024',
    specialization: 'Computer Vision & Reinforcement Learning',
    clearance: 'LEVEL-3',
    id: 'RV-AIM-012',
  },
  // Row 3 — Coordinators
  {
    name: 'Sanjay Kumar',
    role: 'Outreach Head',
    photo: 'https://picsum.photos/seed/sanjay/400/400',
    division: 'Non-Tech',
    joined: '2024',
    specialization: 'Sponsor Relations & PR',
    clearance: 'LEVEL-2',
    id: 'RV-OUT-013',
  },
  {
    name: 'Kavya Reddy',
    role: 'Content Head',
    photo: 'https://picsum.photos/seed/kavya/400/400',
    division: 'Non-Tech',
    joined: '2024',
    specialization: 'Video Production & Social Media',
    clearance: 'LEVEL-2',
    id: 'RV-CNT-014',
  },
  {
    name: 'Aryan Joshi',
    role: 'Finance Head',
    photo: 'https://picsum.photos/seed/aryan/400/400',
    division: 'Non-Tech',
    joined: '2024',
    specialization: 'Budget & Procurement',
    clearance: 'LEVEL-2',
    id: 'RV-FIN-015',
  },
  {
    name: 'Nisha Pillai',
    role: 'Documentation Lead',
    photo: 'https://picsum.photos/seed/nisha/400/400',
    division: 'Non-Tech',
    joined: '2024',
    specialization: 'Technical Writing & Research',
    clearance: 'LEVEL-2',
    id: 'RV-DOC-016',
  },
  {
    name: 'Dev Patel',
    role: 'Workshop Coordinator',
    photo: 'https://picsum.photos/seed/dev/400/400',
    division: 'Orcus',
    joined: '2025',
    specialization: 'Hands-on Training & Mentorship',
    clearance: 'LEVEL-2',
    id: 'RV-WRK-017',
  },
  {
    name: 'Tanvi Shah',
    role: 'Social Media Manager',
    photo: 'https://picsum.photos/seed/tanvi/400/400',
    division: 'Non-Tech',
    joined: '2025',
    specialization: 'Digital Strategy & Analytics',
    clearance: 'LEVEL-2',
    id: 'RV-SOC-018',
  },
];

/**
 * Generate a set of random-width barcode line divs
 */
function createBarcodeLines(count) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const line = document.createElement('div');
    line.className = 'barcode-line';
    const width =
      Math.random() < 0.3
        ? 1
        : Math.random() < 0.6
          ? 2
          : Math.floor(Math.random() * 4) + 1;
    line.style.maxWidth = `${width}px`;
    fragment.appendChild(line);
  }
  return fragment;
}

/**
 * Create a single ID badge card element
 */
function createBadge(member, index) {
  const badge = document.createElement('div');
  badge.className = 'id-badge interactive';
  badge.dataset.memberIndex = index;

  // Unified Clearance strip
  const clearanceStrip = document.createElement('div');
  clearanceStrip.className = 'badge-clearance';
  clearanceStrip.style.backgroundColor = 'var(--secondary)';
  badge.appendChild(clearanceStrip);

  // Photo area
  const photoContainer = document.createElement('div');
  photoContainer.className = 'badge-photo';

  const img = document.createElement('img');
  img.src = member.photo;
  img.alt = member.name;
  img.loading = 'lazy';
  img.draggable = false;

  const watermark = document.createElement('span');
  watermark.className = 'badge-watermark';
  watermark.textContent = 'CLASSIFIED';

  photoContainer.appendChild(img);
  photoContainer.appendChild(watermark);
  badge.appendChild(photoContainer);

  // Body info
  const body = document.createElement('div');
  body.className = 'badge-body';

  const nameEl = document.createElement('div');
  nameEl.className = 'badge-name';
  nameEl.textContent = member.name;

  const roleEl = document.createElement('div');
  roleEl.className = 'badge-role';
  roleEl.textContent = member.role;

  body.appendChild(nameEl);
  body.appendChild(roleEl);
  badge.appendChild(body);

  // Barcode
  const barcode = document.createElement('div');
  barcode.className = 'badge-barcode';
  barcode.appendChild(createBarcodeLines(15));
  badge.appendChild(barcode);

  return badge;
}

/**
 * Create and show the pop-up ID card modal
 */
function showMemberPopup(member) {
  // Remove existing popup if any
  closeMemberPopup();

  const overlay = document.createElement('div');
  overlay.className = 'operator-popup-overlay';
  overlay.id = 'operator-popup-overlay';

  const barcodeHTML = Array.from({ length: 30 }, () => {
    const w = Math.random() < 0.3 ? 1 : Math.random() < 0.6 ? 2 : Math.floor(Math.random() * 4) + 1;
    return `<div class="barcode-line" style="max-width:${w}px"></div>`;
  }).join('');

  overlay.innerHTML = `
    <div class="operator-popup-bg"></div>
    <div class="operator-popup-card" id="operator-popup-card">
      <div class="operator-popup-scanline"></div>
      <div class="popup-close-btn interactive" id="popup-close-btn">✕</div>
      <div class="popup-header-strip"></div>
      <div class="popup-content">
        <div class="popup-top-row">
          <div class="popup-photo-container">
            <img src="${member.photo}" alt="${member.name}" />
            <div class="popup-photo-frame"></div>
          </div>
          <div class="popup-details">
            <div class="popup-id-label">OPERATOR DOSSIER</div>
            <div class="popup-name">${member.name}</div>
            <div class="popup-role">${member.role}</div>
            <div class="popup-detail-row">
              <span class="popup-detail-key">ID</span>
              <span class="popup-detail-val">${member.id}</span>
            </div>
            <div class="popup-detail-row">
              <span class="popup-detail-key">DIVISION</span>
              <span class="popup-detail-val">${member.division}</span>
            </div>
            <div class="popup-detail-row">
              <span class="popup-detail-key">CLEARANCE</span>
              <span class="popup-detail-val popup-clearance">${member.clearance}</span>
            </div>
          </div>
        </div>
        <div class="popup-divider"></div>
        <div class="popup-bottom-row">
          <div class="popup-detail-row">
            <span class="popup-detail-key">SPEC</span>
            <span class="popup-detail-val">${member.specialization}</span>
          </div>
          <div class="popup-detail-row">
            <span class="popup-detail-key">JOINED</span>
            <span class="popup-detail-val">${member.joined}</span>
          </div>
          <div class="popup-detail-row">
            <span class="popup-detail-key">STATUS</span>
            <span class="popup-detail-val popup-status-active">● ACTIVE</span>
          </div>
        </div>
        <div class="popup-barcode">${barcodeHTML}</div>
        <div class="popup-barcode-label">${member.id} // ROBOVITICS PERSONNEL FILE</div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
    const card = document.getElementById('operator-popup-card');
    gsap.fromTo(card,
      { scale: 0.85, y: 30, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
    );
  });

  // Close handlers
  document.getElementById('popup-close-btn').addEventListener('click', closeMemberPopup);
  overlay.querySelector('.operator-popup-bg').addEventListener('click', closeMemberPopup);

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeMemberPopup();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function closeMemberPopup() {
  const overlay = document.getElementById('operator-popup-overlay');
  if (!overlay) return;

  const card = overlay.querySelector('.operator-popup-card');
  gsap.to(card, {
    scale: 0.9,
    y: 20,
    opacity: 0,
    duration: 0.25,
    ease: 'power2.in',
    onComplete: () => {
      overlay.remove();
    },
  });
}

export function init() {
  const container = document.getElementById('team-cards');
  if (!container) return;

  // Render all badge cards
  TEAM_MEMBERS.forEach((member, index) => {
    const badge = createBadge(member, index);
    badge.addEventListener('click', () => showMemberPopup(member));
    container.appendChild(badge);
  });

  // GSAP ScrollTrigger stagger animation
  const badges = container.querySelectorAll('.id-badge');

  gsap.set(badges, {
    opacity: 0,
    y: 80,
    rotateX: 8,
    transformPerspective: 800,
  });

  ScrollTrigger.batch(badges, {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        overwrite: true,
      });
    },
    onLeaveBack: (batch) => {
      gsap.to(batch, {
        opacity: 0,
        y: 80,
        rotateX: 8,
        duration: 0.4,
        ease: 'power2.in',
        stagger: 0.05,
        overwrite: true,
      });
    },
    start: 'top 85%',
    end: 'bottom 15%',
  });

  // Subtle hover tilt with mousemove
  badges.forEach((badge) => {
    badge.addEventListener('mousemove', (e) => {
      const rect = badge.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(badge, {
        rotateY: x * 8,
        rotateX: -y * 6,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 600,
      });
    });

    badge.addEventListener('mouseleave', () => {
      gsap.to(badge, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
        transformPerspective: 600,
      });
    });
  });
}