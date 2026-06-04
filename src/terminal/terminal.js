/**
 * RoboVITics Command Terminal
 * Interactive terminal interface with navigation, info commands, and easter eggs.
 */

const SECTIONS = [
  'hero', 'about-vit', 'about-us', 'events', 'domains',
  'teams', 'achievements', 'gallery',
  'our-team', 'socials'
];

const COMMANDS_HELP = [
  { cmd: 'help', desc: 'Display this help menu' },
  { cmd: 'cd <section>', desc: 'Navigate to a section' },
  { cmd: 'ls', desc: 'List all sections' },
  { cmd: 'contact', desc: 'Display contact information' },
  { cmd: 'whoami', desc: 'Display current operator identity' },
  { cmd: 'status', desc: 'Display system status' },
  { cmd: 'clear', desc: 'Clear terminal output' },
];

let commandHistory = [];
let historyIndex = -1;
let outputEl = null;
let inputEl = null;

/**
 * Append content to the terminal output
 */
function appendOutput(html) {
  if (!outputEl) return;
  const div = document.createElement('div');
  div.innerHTML = html;
  outputEl.appendChild(div);
  outputEl.scrollTop = outputEl.scrollHeight;
}

/**
 * Append the command line echo
 */
function echoCommand(cmd) {
  appendOutput(`<div class="cmd-line"><span style="color:var(--accent)">$&gt;</span> ${escapeHtml(cmd)}</div>`);
}

/**
 * Escape HTML characters to prevent XSS
 */
function escapeHtml(str) {
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

/**
 * Build a formatted ASCII table
 */
function buildTable(rows) {
  // Find max widths
  let maxKey = 0;
  let maxVal = 0;
  rows.forEach(([k, v]) => {
    if (k.length > maxKey) maxKey = k.length;
    if (v.length > maxVal) maxVal = v.length;
  });
  maxKey = Math.max(maxKey, 6);
  maxVal = Math.max(maxVal, 6);

  const border = `+${'-'.repeat(maxKey + 2)}+${'-'.repeat(maxVal + 2)}+`;
  let table = border + '\n';
  rows.forEach(([k, v]) => {
    table += `| ${k.padEnd(maxKey)} | ${v.padEnd(maxVal)} |\n`;
  });
  table += border;
  return table;
}

// ====== Command Handlers ======

function cmdHelp() {
  let out = '<div class="cmd-output">\n';
  out += '<br>  <strong style="color:var(--accent-light)">╔═══════════════════════════════════════╗</strong>\n';
  out += ' <br> <strong style="color:var(--accent-light)">║     ⠀⠀⠀ROBOVITICS COMMAND TERMINAL⠀⠀⠀        ║</strong>\n';
  out += ' <br> <strong style="color:var(--accent-light)">╚═══════════════════════════════════════╝</strong><br><br>';
  out += '  Available commands:<br><br>';
  COMMANDS_HELP.forEach(({ cmd, desc }) => {
    out += `  <span style="color:var(--accent-light);min-width:140px;display:inline-block">${escapeHtml(cmd.padEnd(18))}</span> <span style="color:var(--text-secondary)">${escapeHtml(desc)}</span><br>`;
  });
  out += '<br></div>';
  appendOutput(out);
}

function cmdCd(section) {
  if (!section) {
    appendOutput('<div class="cmd-error">  Error: missing argument. Usage: cd &lt;section&gt;</div>');
    return;
  }

  const sectionId = section;

  if (!SECTIONS.includes(sectionId)) {
    appendOutput(`<div class="cmd-error">  Error: section '${escapeHtml(section)}' not found.</div>`);
    appendOutput('<div class="cmd-output">  Available sections: ' + SECTIONS.map(s => `<span style="color:var(--accent-light)">${s}</span>`).join(', ') + '</div>');
    return;
  }

  const target = document.getElementById(sectionId);
  if (target) {
    appendOutput(`<div class="cmd-success">  Navigating to /${escapeHtml(section)}...</div>`);
    // Close terminal popup before scrolling
    closeTerminal();
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  } else {
    appendOutput(`<div class="cmd-error">  Error: DOM element '#${escapeHtml(sectionId)}' not found.</div>`);
  }
}

function cmdContact() {
  const rows = [
    ['Phone', '+91 98765 43210'],
    ['Email', 'robovitics@vit.ac.in'],
    ['Instagram', '@robovitics'],
    ['LinkedIn', '/company/robovitics'],
  ];
  const table = buildTable(rows);
  appendOutput(`<pre class="cmd-table">\n  CONTACT INFORMATION\n  ${'═'.repeat(40)}\n${table}\n</pre>`);
}

function cmdClear() {
  if (outputEl) {
    outputEl.innerHTML = '';
  }
}

function cmdLs() {
  let out = '<div class="cmd-output"><br>  <span style="color:var(--accent-light)">drwxr-x--- robovitics system</span><br><br>';
  SECTIONS.forEach((s, i) => {
    const num = String(i + 1).padStart(2, '0');
    out += `  <span style="color:var(--text-muted)">${num}.</span> <span style="color:var(--accent-light)">📁</span> ${s}/\n<br>`;
  });
  out += '<br>  <span style="color:var(--text-muted)">total ' + SECTIONS.length + ' directories</span><br></div>';
  appendOutput(out);
}

function cmdWhoami() {
  appendOutput(`<div class="cmd-success">
  <br>  <span style="color:var(--accent-light)">robovitics-operator</span> // clearance: <span style="color:var(--green)">level-5</span>
  <br>
</div>`);
}

function cmdStatus() {
  const statusLines = [
    ['Core Systems', 'OK'],
    ['Motor Controllers', 'OK'],
    ['Sensor Array', 'OK'],
    ['Communications', 'OK'],
    ['AI Module', 'OK'],
    ['Power Systems', 'OK'],
  ];

  let out = '<div class="cmd-output"><br>  <strong style="color:var(--accent-light)">SYSTEM STATUS REPORT</strong><br>  ' + '═'.repeat(36) + '<br><br>';
  statusLines.forEach(([label, status]) => {
    const color = status === 'OK' ? 'var(--green)' : 'var(--red)';
    const icon = status === 'OK' ? '●' : '✖';
    out += `  <span style="color:${color}">${icon}</span> ${label.padEnd(22)} [<span style="color:${color}">${status}</span>]<br>`;
  });
  out += `<br>  <span style="color:var(--text-muted)">Uptime: 99.97% | Last check: ${new Date().toLocaleTimeString()}</span><br><br></div>`;
  appendOutput(out);
}

function cmdSudoRm() {
  appendOutput(`<div class="cmd-error">
  <br>  Nice try. Access denied. 🔒
  <br>
</div>`);
}

function cmdMatrix() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 99998;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: hidden;
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.2;
    color: #00ff41;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
  const count = Math.floor((window.innerWidth * window.innerHeight) / 200);

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.textContent = chars[Math.floor(Math.random() * chars.length)];
    span.style.cssText = `
      opacity: ${(Math.random() * 0.8 + 0.2).toFixed(2)};
      color: hsl(${120 + Math.random() * 20}, 100%, ${30 + Math.random() * 40}%);
      padding: 1px 3px;
    `;
    overlay.appendChild(span);
  }

  document.body.appendChild(overlay);

  // Fade in
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });

  // Flicker individual chars
  const flickerInterval = setInterval(() => {
    const spans = overlay.querySelectorAll('span');
    const randomCount = Math.min(50, spans.length);
    for (let i = 0; i < randomCount; i++) {
      const idx = Math.floor(Math.random() * spans.length);
      spans[idx].textContent = chars[Math.floor(Math.random() * chars.length)];
    }
  }, 80);

  // Fade out and remove
  setTimeout(() => {
    overlay.style.opacity = '0';
    clearInterval(flickerInterval);
    setTimeout(() => {
      overlay.remove();
    }, 400);
  }, 2000);

  appendOutput('<div class="cmd-success">  Entering the Matrix... 💊</div>');
}

function cmdUnknown(cmd) {
  appendOutput(`<div class="cmd-error">  Command not found: '${escapeHtml(cmd)}'. Type <span style="color:var(--accent-light)">help</span> for available commands.</div>`);
}

// ====== Command Processor ======

function processCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return;

  // Store in history
  commandHistory.push(trimmed);
  historyIndex = commandHistory.length;

  // Echo the command
  echoCommand(trimmed);

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Match commands
  if (cmd === 'help') {
    cmdHelp();
  } else if (cmd === 'cd') {
    cmdCd(args[0]);
  } else if (cmd === 'contact') {
    cmdContact();
  } else if (cmd === 'clear') {
    cmdClear();
  } else if (cmd === 'ls') {
    cmdLs();
  } else if (cmd === 'whoami') {
    cmdWhoami();
  } else if (cmd === 'status') {
    cmdStatus();
  } else if (trimmed.toLowerCase() === 'sudo rm -rf /') {
    cmdSudoRm();
  } else if (cmd === 'matrix') {
    cmdMatrix();
  } else {
    cmdUnknown(trimmed);
  }
}

// ====== Terminal Popup Control ======

function openTerminal() {
  const overlay = document.getElementById('terminal-overlay');
  if (!overlay) return;
  overlay.classList.remove('hidden');
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
  });
  setTimeout(() => {
    if (inputEl) inputEl.focus();
  }, 300);
}

function closeTerminal() {
  const overlay = document.getElementById('terminal-overlay');
  if (!overlay) return;
  overlay.classList.remove('visible');
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 300);
}

// ====== Init ======

export function init() {
  outputEl = document.getElementById('terminal-output');
  inputEl = document.getElementById('terminal-input');

  if (!outputEl || !inputEl) return;

  // Welcome message
  appendOutput(`<div class="cmd-output">
  <span style="color:var(--accent-light)">RoboVITics Terminal v2.4.1</span>
  <br><span style="color:var(--text-muted)">Type 'help' to see available commands.</span>
  <br>
</div>`);

  // Handle Enter key
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = inputEl.value;
      inputEl.value = '';
      processCommand(value);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      historyIndex = Math.max(0, historyIndex - 1);
      inputEl.value = commandHistory[historyIndex] || '';
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      historyIndex = Math.min(commandHistory.length, historyIndex + 1);
      inputEl.value = commandHistory[historyIndex] || '';
    }
  });

  // Robot button opens terminal
  const robotBtn = document.getElementById('robot-btn');
  if (robotBtn) {
    robotBtn.addEventListener('click', openTerminal);
  }

  // Close button
  const closeBtn = document.getElementById('terminal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeTerminal);
  }

  // Click overlay bg to close
  const overlayBg = document.querySelector('.terminal-overlay-bg');
  if (overlayBg) {
    overlayBg.addEventListener('click', closeTerminal);
  }

  // Escape key closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('terminal-overlay');
      if (overlay && overlay.classList.contains('visible')) {
        closeTerminal();
      }
    }
  });
}
