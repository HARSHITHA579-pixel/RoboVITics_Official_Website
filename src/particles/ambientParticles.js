/**
 * Ambient Particles — Floating dust motes and sensor beam effects
 * Rendered on a fixed background canvas
 */

export function init() {
  const canvas = document.getElementById('ambient-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let beams = [];
  let animId;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((width * height) / 15000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }
  }

  function spawnBeam() {
    if (beams.length >= 2) return;
    if (Math.random() > 0.003) return;

    const isVertical = Math.random() > 0.5;
    beams.push({
      isVertical,
      pos: isVertical ? Math.random() * width : Math.random() * height,
      progress: 0,
      speed: 2 + Math.random() * 3,
      opacity: 0.06 + Math.random() * 0.06,
      width: 1 + Math.random(),
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (const p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;

      // Wrap around
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(87, 124, 142, ${currentOpacity})`;
      ctx.fill();
    }

    // Spawn and update sensor beams
    spawnBeam();

    for (let i = beams.length - 1; i >= 0; i--) {
      const beam = beams[i];
      beam.progress += beam.speed;

      const maxProgress = beam.isVertical ? height : width;
      if (beam.progress > maxProgress) {
        beams.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      if (beam.isVertical) {
        ctx.moveTo(beam.pos, beam.progress);
        ctx.lineTo(beam.pos, beam.progress - 100);
      } else {
        ctx.moveTo(beam.progress, beam.pos);
        ctx.lineTo(beam.progress - 100, beam.pos);
      }
      ctx.strokeStyle = `rgba(87, 124, 142, ${beam.opacity})`;
      ctx.lineWidth = beam.width;
      ctx.stroke();
    }

    animId = requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}
