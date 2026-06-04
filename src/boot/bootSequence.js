/**
 * Boot Sequence — System startup → blank bg hold → content slide-in
 */
import { gsap } from 'gsap';

const BOOT_LINES = [
  { text: '[BIOS]  POST check ............................ ', status: 'ok', suffix: 'PASSED' },
  { text: '[INIT]  Loading kernel modules ............... ', status: 'ok', suffix: 'OK' },
  { text: '[SYS]   Mounting filesystem /dev/robo0 ....... ', status: 'ok', suffix: 'MOUNTED' },
  { text: '[DRV]   Initializing CAN bus interface ....... ', status: 'ok', suffix: 'READY' },
  { text: '[DRV]   Loading motor driver v3.2.1 .......... ', status: 'ok', suffix: 'LOADED' },
  { text: '[CAL]   Calibrating gyroscopic sensors ....... ', status: 'info', suffix: 'DONE' },
  { text: '[CAL]   Calibrating accelerometer array ...... ', status: 'info', suffix: 'DONE' },
  { text: '[NET]   Establishing telemetry uplink ........ ', status: 'warn', suffix: 'LATENCY: 12ms' },
  { text: '[ACT]   Testing actuator drivers ............. ', status: 'ok', suffix: 'ALL NOMINAL' },
  { text: '[ACT]   Servo #01 — shoulder azimuth ......... ', status: 'ok', suffix: 'READY' },
  { text: '[ACT]   Servo #02 — shoulder elevation ....... ', status: 'ok', suffix: 'READY' },
  { text: '[ACT]   Servo #03 — elbow flexion ............ ', status: 'ok', suffix: 'READY' },
  { text: '[ACT]   Servo #04 — wrist rotation ........... ', status: 'ok', suffix: 'READY' },
  { text: '[ACT]   Servo #05 — gripper actuator ......... ', status: 'ok', suffix: 'READY' },
  { text: '[KIN]   Initializing kinematics engine ....... ', status: 'info', suffix: 'v2.8.0' },
  { text: '[KIN]   Loading inverse kinematics solver .... ', status: 'ok', suffix: 'LOADED' },
  { text: '[KIN]   Trajectory planner online ............ ', status: 'ok', suffix: 'ACTIVE' },
  { text: '[VIS]   LIDAR array power-on ................. ', status: 'ok', suffix: 'SCANNING' },
  { text: '[VIS]   Depth camera calibration ............. ', status: 'info', suffix: 'CALIBRATED' },
  { text: '[PWR]   Battery level ........................ ', status: 'ok', suffix: '98.7%' },
  { text: '[PWR]   Power distribution unit .............. ', status: 'ok', suffix: 'NOMINAL' },
  { text: '[COM]   Radio link established ............... ', status: 'ok', suffix: '2.4GHz' },
  { text: '[SEC]   Failsafe systems armed ............... ', status: 'warn', suffix: 'ARMED' },
  { text: '[SYS]   All subsystems operational ........... ', status: 'ok', suffix: 'GREEN' },
  { text: '', status: 'info', suffix: '' },
  { text: '>> SYSTEM BOOT COMPLETE. ALL SYSTEMS NOMINAL.', status: 'ok', suffix: '' },
  { text: '>> Launching RoboVITics Interface ...........', status: 'info', suffix: '' },
];

export function init() {
  return new Promise((resolve) => {
    const overlay = document.getElementById('boot-overlay');
    const terminal = document.getElementById('boot-terminal');
    const logo = document.getElementById('boot-logo');
    const scanner = document.getElementById('boot-scanner');
    const tagline = logo?.querySelector('.logo-tagline');
    const mainContent = document.getElementById('main-content');

    if (!overlay) { resolve(); return; }

    document.body.style.overflow = 'hidden';

    let lineIndex = 0;
    const lineDelay = 80;

    function printLine() {
      if (lineIndex >= BOOT_LINES.length) {
        setTimeout(startTransition, 300);
        return;
      }

      const { text, status, suffix } = BOOT_LINES[lineIndex];
      const lineEl = document.createElement('div');
      lineEl.className = `line ${status}`;

      if (suffix) {
        lineEl.innerHTML = `${text}<span class="${status === 'ok' ? 'ok' : status === 'warn' ? 'warn' : 'info'}">${suffix}</span>`;
      } else {
        lineEl.textContent = text;
      }

      terminal.appendChild(lineEl);
      terminal.scrollTop = terminal.scrollHeight;
      lineIndex++;
      setTimeout(printLine, lineDelay + Math.random() * 40);
    }

    function startTransition() {
      const tl = gsap.timeline({
        onComplete: () => {
          // Overlay fully gone — now show blank bg for 2 seconds
          overlay.style.display = 'none';
          document.body.style.overflow = '';

          // Hold blank bg for 2 seconds, then slide content in
          setTimeout(() => {
            if (mainContent) {
              mainContent.classList.remove('content-hidden');
              mainContent.classList.add('content-visible');
            }
            resolve();
          }, 300);
        }
      });

      // Phase 1: Terminal fades out smoothly
      tl.to(terminal, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in'
      });

      // Phase 2: Scanner sweeps down
      tl.set(scanner, { opacity: 1, top: '0%' })
        .to(scanner, {
          top: '100%',
          duration: 0.8,
          ease: 'power1.inOut'
        });

      // Phase 3: Logo fades in
      tl.to(logo, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.5');

      tl.to(tagline, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.2');

      // Phase 4: Brief hold on logo
      tl.to({}, { duration: 0.6 });

      // Phase 5: Logo scales up, overlay fades out
      tl.to(logo, {
        scale: 1.1,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in'
      });

      tl.to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      }, '-=0.4');
    }

    setTimeout(printLine, 300);
  });
}
