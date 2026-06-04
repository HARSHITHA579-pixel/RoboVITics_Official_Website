/**
 * RoboVITics — Main Entry Point
 * Orchestrates boot sequence → content slide-in → per-letter glitch headings
 */
import './style.css';
import '@fontsource/special-gothic-condensed-one/400.css';

import { init as initBoot } from './boot/bootSequence.js';
import { init as initHero } from './hero/heroScene.js';
import { init as initAbout } from './about/about.js';
import { init as initEvents } from './events/pcbBoard.js';
import { init as initDomains } from './domains/domains.js';
import { init as initTeams } from './teams/teamsScene.js';
import { init as initAchievements } from './achievements/hexGrid.js';
import { init as initTerminal } from './terminal/terminal.js';
import { init as initGallery } from './gallery/gallery.js';
import { init as initTeamCards } from './team/teamCards.js';
import { init as initSocials } from './socials/socials.js';
import { init as initSponsors } from './sponsors/sponsors.js';
import { init as initFooter } from './footer/physicsFooter.js';
import { init as initCursor } from './cursor/customCursor.js';
import { init as initParticles } from './particles/ambientParticles.js';

/**
 * Hamburger navigation
 */
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('open');
    });
  });

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    if (Math.abs(window.scrollY - lastScroll) > 100) {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      lastScroll = window.scrollY;
    }
  });
}

/**
 * Dramatic per-letter glitch animation.
 * Each letter glitches independently for ~5 seconds before settling.
 * Letters appear and flicker with random timing — blue & red color shifts.
 */
function initGlitchHeadings() {
  const headings = document.querySelectorAll('.section-title[data-text]');
  if (!headings.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.glitched) return;
        el.dataset.glitched = 'true';
        triggerLetterGlitch(el);
      }
    });
  }, { threshold: 0.3 });

  headings.forEach(h => observer.observe(h));
}

function triggerLetterGlitch(headingEl) {
  // Save original HTML and extract plain text
  const originalHTML = headingEl.innerHTML;
  const fullText = headingEl.textContent;

  // Split into individual characters, preserving HTML span structure
  // We'll rebuild from data-text which has the clean text
  const dataText = headingEl.getAttribute('data-text') || fullText;

  // Clear and rebuild with letter spans
  headingEl.innerHTML = '';

  const letters = [];
  for (let i = 0; i < dataText.length; i++) {
    const ch = dataText[i];
    const span = document.createElement('span');

    if (ch === ' ') {
      span.innerHTML = '&nbsp;';
      span.className = 'glitch-letter';
      span.style.opacity = '1'; // spaces always visible
    } else {
      span.textContent = ch;
      span.className = 'glitch-letter';
    }

    headingEl.appendChild(span);
    letters.push({ el: span, char: ch, index: i });
  }

  // Phase 1 (0–4s): Letters appear one by one with random delay,
  // each runs the glitch animation independently
  const totalGlitchDuration = 1500; // 2.5 seconds total
  const staggerWindow = 500; // letters start appearing over first 1.5s

  letters.forEach(({ el, char, index }) => {
    if (char === ' ') return; // skip spaces

    // Random start delay within the stagger window
    // Earlier letters tend to start earlier
    const baseDelay = (index / letters.length) * staggerWindow * 0.6;
    const randomJitter = Math.random() * (staggerWindow * 0.4);
    const startDelay = baseDelay + randomJitter;

    // Random glitch duration per letter (2-4 seconds)
    const glitchDuration = 2000 + Math.random() * 2000;

    setTimeout(() => {
      el.style.animation = `letterGlitch ${glitchDuration}ms steps(1) forwards`;
      el.classList.add('glitching');
    }, startDelay);

    // Settle the letter after glitch completes
    setTimeout(() => {
      el.classList.remove('glitching');
      el.classList.add('settled');
      el.style.animation = '';
    }, startDelay + glitchDuration);
  });

  // Phase 2 (at 5s): Restore original HTML with colors intact
  setTimeout(() => {
    // Final clean settle — all letters visible
    letters.forEach(({ el }) => {
      el.classList.remove('glitching');
      el.classList.add('settled');
      el.style.animation = '';
    });

    // After a beat, restore original HTML with <span class="accent"> etc.
    setTimeout(() => {
      headingEl.innerHTML = originalHTML;
    }, 200);
  }, totalGlitchDuration);
}

/**
 * Initialize all modules after boot
 */
function initAllSections() {
  initCursor();
  initParticles();
  initNav();
  initHero();
  initAbout();
  initEvents();
  initSponsors();
  initDomains();
  initTeams();
  initAchievements();
  initTerminal();
  initGallery();
  initTeamCards();
  initSocials();
  initFooter();

  // Glitch headings need to be initialized AFTER content is visible
  // (otherwise IntersectionObserver may fire immediately)
  setTimeout(() => {
    initGlitchHeadings();
  }, 100);
}

/**
 * Application boot sequence
 */
async function boot() {
  try {
    await initBoot();
  } catch (e) {
    console.warn('[boot] Boot sequence error, continuing:', e);
    const overlay = document.getElementById('boot-overlay');
    if (overlay) overlay.style.display = 'none';
    // If boot fails, still reveal content
    const mc = document.getElementById('main-content');
    if (mc) {
      mc.classList.remove('content-hidden');
      mc.classList.add('content-visible');
    }
  }

  initAllSections();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
