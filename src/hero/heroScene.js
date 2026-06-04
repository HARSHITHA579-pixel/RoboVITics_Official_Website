import * as THREE from 'three';

// ─── Constants ───────────────────────────────────────────────────────────────
const WIREFRAME_COLOR = 0x577c8e;
const GLOW_COLOR = 0x577c8e;
const ACCENT_COLOR = 0xc4873b;
const BG_COLOR = 0x192328;
const GRID_COLOR = 0x2a4550;

// ─── Utility ─────────────────────────────────────────────────────────────────
function createWireframe(geometry, color = WIREFRAME_COLOR, opacity = 0.7) {
  const wireGeo = new THREE.WireframeGeometry(geometry);
  return new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({
    color, transparent: true, opacity, depthWrite: false,
  }));
}

function createEdges(geometry, color = WIREFRAME_COLOR, opacity = 1.0) {
  const edgeGeo = new THREE.EdgesGeometry(geometry, 15);
  return new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({
    color, transparent: true, opacity,
  }));
}

function createGlow(geometry, color = GLOW_COLOR, scale = 1.05) {
  const wireGeo = new THREE.WireframeGeometry(geometry);
  const mesh = new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({
    color, transparent: true, opacity: 0.1,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  mesh.scale.multiplyScalar(scale);
  return mesh;
}

// ─── Build the Core: nested polyhedra ────────────────────────────────────────
function buildCoreStructure() {
  const core = new THREE.Group();

  // Inner icosahedron — small, bright
  const icoGeo = new THREE.IcosahedronGeometry(1.2, 0);
  core.add(createEdges(icoGeo, ACCENT_COLOR, 0.9));
  core.add(createGlow(icoGeo, ACCENT_COLOR, 1.08));

  // Inner pulsing sphere
  const sphereGeo = new THREE.SphereGeometry(0.4, 8, 8);
  const sphereWire = createWireframe(sphereGeo, ACCENT_COLOR, 0.4);
  sphereWire.name = 'innerSphere';
  core.add(sphereWire);

  // Middle dodecahedron
  const dodecGeo = new THREE.DodecahedronGeometry(2.4, 0);
  const dodecEdges = createEdges(dodecGeo, WIREFRAME_COLOR, 0.5);
  dodecEdges.name = 'middleDodec';
  core.add(dodecEdges);
  core.add(createGlow(dodecGeo, WIREFRAME_COLOR, 1.04));

  // Outer icosahedron — large, faint
  const outerIcoGeo = new THREE.IcosahedronGeometry(4.0, 1);
  const outerWire = createWireframe(outerIcoGeo, WIREFRAME_COLOR, 0.15);
  outerWire.name = 'outerIco';
  core.add(outerWire);

  return core;
}

// ─── Build Orbital Rings ─────────────────────────────────────────────────────
function buildOrbitalRings() {
  const rings = new THREE.Group();

  const ringConfigs = [
    { radius: 3.2, tube: 0.015, color: WIREFRAME_COLOR, opacity: 0.5, rotX: Math.PI * 0.35, rotZ: Math.PI * 0.1 },
    { radius: 3.8, tube: 0.015, color: WIREFRAME_COLOR, opacity: 0.35, rotX: Math.PI * 0.6, rotZ: Math.PI * 0.4 },
    { radius: 4.5, tube: 0.012, color: WIREFRAME_COLOR, opacity: 0.2, rotX: Math.PI * 0.15, rotZ: Math.PI * 0.7 },
  ];

  ringConfigs.forEach((cfg, i) => {
    const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 3, 64);
    const ringMesh = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
      color: cfg.color, transparent: true, opacity: cfg.opacity,
      wireframe: true, depthWrite: false,
    }));
    ringMesh.rotation.x = cfg.rotX;
    ringMesh.rotation.z = cfg.rotZ;
    ringMesh.name = `ring-${i}`;
    rings.add(ringMesh);

    // Add data nodes along the ring (small spheres)
    const nodeCount = 4 + i * 2;
    for (let j = 0; j < nodeCount; j++) {
      const angle = (j / nodeCount) * Math.PI * 2;
      const nx = Math.cos(angle) * cfg.radius;
      const ny = Math.sin(angle) * cfg.radius;

      const nodeGeo = new THREE.OctahedronGeometry(0.08, 0);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? ACCENT_COLOR : WIREFRAME_COLOR,
        transparent: true, opacity: 0.6,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(nx, ny, 0);
      // Apply same rotation as ring
      node.applyMatrix4(new THREE.Matrix4().makeRotationX(cfg.rotX));
      node.applyMatrix4(new THREE.Matrix4().makeRotationZ(cfg.rotZ));
      node.name = `node-${i}-${j}`;
      rings.add(node);
    }
  });

  return rings;
}

// ─── Build floating data fragments ───────────────────────────────────────────
function buildDataFragments() {
  const fragments = new THREE.Group();

  for (let i = 0; i < 30; i++) {
    // Random position in a sphere shell
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 5 + Math.random() * 3;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    // Tiny geometric shapes
    const shapes = [
      () => new THREE.TetrahedronGeometry(0.06, 0),
      () => new THREE.BoxGeometry(0.08, 0.08, 0.08),
      () => new THREE.OctahedronGeometry(0.05, 0),
    ];

    const geo = shapes[i % 3]();
    const mat = new THREE.MeshBasicMaterial({
      color: WIREFRAME_COLOR, transparent: true,
      opacity: 0.2 + Math.random() * 0.3,
    });
    const frag = new THREE.Mesh(geo, mat);
    frag.position.set(x, y, z);
    frag.userData.baseY = y;
    frag.userData.speed = 0.3 + Math.random() * 0.7;
    frag.userData.phase = Math.random() * Math.PI * 2;
    fragments.add(frag);
  }

  return fragments;
}

// ─── Build connecting beams (lines from core to outer nodes) ─────────────────
function buildConnectionBeams() {
  const beams = new THREE.Group();
  const beamMat = new THREE.LineBasicMaterial({
    color: WIREFRAME_COLOR, transparent: true, opacity: 0.08,
    depthWrite: false,
  });

  // Create lines radiating from center to random outer points
  for (let i = 0; i < 12; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 5 + Math.random() * 2;

    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ),
    ];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    beams.add(new THREE.Line(lineGeo, beamMat));
  }

  return beams;
}

// ─── Build ground grid ───────────────────────────────────────────────────────
function buildGrid() {
  const grid = new THREE.Group();

  const gridHelper = new THREE.GridHelper(30, 30, GRID_COLOR, GRID_COLOR);
  gridHelper.position.y = -5;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.15;
  grid.add(gridHelper);

  return grid;
}

// ─── Main init ───────────────────────────────────────────────────────────────
export function init() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BG_COLOR);
  scene.fog = new THREE.FogExp2(BG_COLOR, 0.035);

  // Camera
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(5, 3, 8);
  camera.lookAt(0, 0, 0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Build all components
  const coreStructure = buildCoreStructure();
  scene.add(coreStructure);

  const orbitalRings = buildOrbitalRings();
  scene.add(orbitalRings);

  const dataFragments = buildDataFragments();
  scene.add(dataFragments);

  const connectionBeams = buildConnectionBeams();
  scene.add(connectionBeams);

  const grid = buildGrid();
  scene.add(grid);

  // Clock
  const clock = new THREE.Clock();
  let isRendering = true;
  let animationId = null;

  // ── Animation loop ─────────────────────────────────────────────────────
  function animate() {
    if (!isRendering) return;
    animationId = requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // Rotate core structure slowly
    coreStructure.rotation.y = elapsed * 0.15;
    coreStructure.rotation.x = Math.sin(elapsed * 0.08) * 0.1;

    // Middle dodec counter-rotates
    const middleDodec = coreStructure.getObjectByName('middleDodec');
    if (middleDodec) {
      middleDodec.rotation.y = -elapsed * 0.1;
      middleDodec.rotation.z = elapsed * 0.05;
    }

    // Outer ico very slow counter-rotate
    const outerIco = coreStructure.getObjectByName('outerIco');
    if (outerIco) {
      outerIco.rotation.y = elapsed * 0.03;
      outerIco.rotation.x = elapsed * 0.02;
    }

    // Inner sphere pulses
    const innerSphere = coreStructure.getObjectByName('innerSphere');
    if (innerSphere) {
      const pulse = 0.9 + Math.sin(elapsed * 2) * 0.15;
      innerSphere.scale.setScalar(pulse);
      innerSphere.material.opacity = 0.3 + Math.sin(elapsed * 3) * 0.15;
    }

    // Orbital rings rotate at different speeds
    orbitalRings.children.forEach(child => {
      if (child.name.startsWith('ring-')) {
        const idx = parseInt(child.name.split('-')[1]);
        const speed = [0.08, -0.05, 0.03][idx] || 0.05;
        child.rotation.y += speed * 0.016;
      }
      // Nodes twinkle
      if (child.name.startsWith('node-')) {
        const phase = child.userData?.phase || parseFloat(child.name.split('-')[2]) * 0.7;
        child.material.opacity = 0.3 + Math.sin(elapsed * 2 + phase) * 0.3;
        child.rotation.y = elapsed;
      }
    });

    // Data fragments float gently
    dataFragments.children.forEach(frag => {
      frag.position.y = frag.userData.baseY + Math.sin(elapsed * frag.userData.speed + frag.userData.phase) * 0.3;
      frag.rotation.x = elapsed * frag.userData.speed * 0.5;
      frag.rotation.z = elapsed * frag.userData.speed * 0.3;
    });

    // Connection beams rotate slowly
    connectionBeams.rotation.y = elapsed * 0.02;

    renderer.render(scene, camera);
  }

  // ── Resize handler ─────────────────────────────────────────────────────
  function onResize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  window.addEventListener('resize', onResize);

  // ── Visibility-based rendering ─────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isRendering) {
            isRendering = true;
            clock.start();
            animate();
          } else if (!entry.isIntersecting && isRendering) {
            isRendering = false;
            if (animationId !== null) {
              cancelAnimationFrame(animationId);
              animationId = null;
            }
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);
  }

  // ── Start ──────────────────────────────────────────────────────────────
  animate();

  return {
    pause() {
      isRendering = false;
      if (animationId !== null) { cancelAnimationFrame(animationId); animationId = null; }
    },
    resume() {
      if (!isRendering) { isRendering = true; clock.start(); animate(); }
    },
    dispose() {
      isRendering = false;
      if (animationId !== null) { cancelAnimationFrame(animationId); animationId = null; }
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
    },
  };
}
