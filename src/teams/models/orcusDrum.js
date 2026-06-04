import * as THREE from 'three';

/**
 * Creates a procedural combat bot drum spinner model.
 * Features: cylindrical drum body, hardened teeth/impactors,
 * motor housing, mounting bracket, drive shaft, and battle damage detail lines.
 * All wireframe with color #577C8E.
 * @returns {{ group: THREE.Group, update: (time: number) => void }}
 */
export function createOrcusDrum() {
  const group = new THREE.Group();
  const color = 0x577C8E;
  const wireframeMat = new THREE.MeshBasicMaterial({ color, wireframe: true });
  const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 });

  // ── Spinning assembly (drum + teeth + shaft end) ──
  const spinGroup = new THREE.Group();

  // Main cylindrical drum body
  const drumGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.8, 16, 1, false);
  const drum = new THREE.Mesh(drumGeo, wireframeMat);
  drum.rotation.z = Math.PI / 2; // align drum axis along X
  spinGroup.add(drum);

  // End caps for the drum (ring-like detail)
  const endCapGeo = new THREE.TorusGeometry(1.1, 0.06, 6, 16);
  const endCapLeft = new THREE.Mesh(endCapGeo, wireframeMat);
  endCapLeft.position.x = -0.4;
  endCapLeft.rotation.y = Math.PI / 2;
  spinGroup.add(endCapLeft);

  const endCapRight = endCapLeft.clone();
  endCapRight.position.x = 0.4;
  spinGroup.add(endCapRight);

  // Teeth / impactors protruding from drum surface (6 teeth)
  const toothCount = 6;
  const toothGeo = new THREE.BoxGeometry(0.6, 0.25, 0.2);
  for (let i = 0; i < toothCount; i++) {
    const angle = (i / toothCount) * Math.PI * 2;
    const tooth = new THREE.Mesh(toothGeo, wireframeMat);
    // Position on drum surface (radius 1.2, along the drum's circumference)
    tooth.position.set(0, Math.cos(angle) * 1.3, Math.sin(angle) * 1.3);
    tooth.rotation.x = angle;
    spinGroup.add(tooth);

    // Hardened tip detail on each tooth
    const tipGeo = new THREE.BoxGeometry(0.55, 0.12, 0.28);
    const tip = new THREE.Mesh(tipGeo, wireframeMat);
    tip.position.set(0, Math.cos(angle) * 1.5, Math.sin(angle) * 1.5);
    tip.rotation.x = angle;
    spinGroup.add(tip);
  }

  // Inner hub detail (visible through wireframe)
  const hubGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.9, 8);
  const hub = new THREE.Mesh(hubGeo, wireframeMat);
  hub.rotation.z = Math.PI / 2;
  spinGroup.add(hub);

  // Spoke lines connecting hub to drum
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const points = [
      new THREE.Vector3(0, Math.cos(angle) * 0.3, Math.sin(angle) * 0.3),
      new THREE.Vector3(0, Math.cos(angle) * 1.1, Math.sin(angle) * 1.1)
    ];
    const spokeGeo = new THREE.BufferGeometry().setFromPoints(points);
    const spoke = new THREE.Line(spokeGeo, lineMat);
    spinGroup.add(spoke);
  }

  group.add(spinGroup);

  // ── Drive shaft connecting motor to drum ──
  const shaftGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 8);
  const shaft = new THREE.Mesh(shaftGeo, wireframeMat);
  shaft.rotation.z = Math.PI / 2;
  shaft.position.x = -1.0;
  group.add(shaft);

  // Shaft coupling (where shaft meets drum)
  const couplingGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.2, 8);
  const coupling = new THREE.Mesh(couplingGeo, wireframeMat);
  coupling.rotation.z = Math.PI / 2;
  coupling.position.x = -0.5;
  group.add(coupling);

  // ── Motor housing (behind the drum) ──
  const motorGeo = new THREE.CylinderGeometry(0.45, 0.4, 0.7, 10);
  const motor = new THREE.Mesh(motorGeo, wireframeMat);
  motor.rotation.z = Math.PI / 2;
  motor.position.x = -1.6;
  group.add(motor);

  // Motor rear cap
  const motorCapGeo = new THREE.SphereGeometry(0.4, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2);
  const motorCap = new THREE.Mesh(motorCapGeo, wireframeMat);
  motorCap.rotation.z = -Math.PI / 2;
  motorCap.position.x = -1.95;
  group.add(motorCap);

  // Motor cooling vents (line details)
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const r = 0.42;
    const points = [
      new THREE.Vector3(-1.3, Math.cos(angle) * r, Math.sin(angle) * r),
      new THREE.Vector3(-1.9, Math.cos(angle) * r, Math.sin(angle) * r)
    ];
    const ventGeo = new THREE.BufferGeometry().setFromPoints(points);
    const vent = new THREE.Line(ventGeo, lineMat);
    group.add(vent);
  }

  // ── Mounting bracket ──
  const bracketBaseGeo = new THREE.BoxGeometry(1.0, 0.12, 1.4);
  const bracketBase = new THREE.Mesh(bracketBaseGeo, wireframeMat);
  bracketBase.position.set(-1.0, -0.7, 0);
  group.add(bracketBase);

  // Bracket vertical supports
  const bracketPostGeo = new THREE.BoxGeometry(0.12, 0.5, 0.12);

  const postPositions = [
    [-0.55, -0.45, 0.6],
    [-0.55, -0.45, -0.6],
    [-1.45, -0.45, 0.6],
    [-1.45, -0.45, -0.6]
  ];
  postPositions.forEach(([x, y, z]) => {
    const post = new THREE.Mesh(bracketPostGeo, wireframeMat);
    post.position.set(x, y, z);
    group.add(post);
  });

  // Bearing housings (where shaft meets bracket)
  const bearingGeo = new THREE.TorusGeometry(0.2, 0.05, 6, 8);
  const bearingFront = new THREE.Mesh(bearingGeo, wireframeMat);
  bearingFront.position.set(-0.55, -0.2, 0);
  bearingFront.rotation.y = Math.PI / 2;
  group.add(bearingFront);

  const bearingRear = bearingFront.clone();
  bearingRear.position.x = -1.45;
  group.add(bearingRear);

  // ── Battle damage / scratch detail lines ──
  const scratchMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });

  // Scratches on the drum surface
  const scratchData = [
    // Diagonal gashes across drum
    [new THREE.Vector3(-0.3, 1.15, 0.3), new THREE.Vector3(0.2, 1.0, -0.2)],
    [new THREE.Vector3(0.1, -0.9, 0.8), new THREE.Vector3(-0.15, -1.1, 0.5)],
    [new THREE.Vector3(-0.2, 0.5, -1.1), new THREE.Vector3(0.25, 0.8, -0.95)],
    // Scratches on bracket
    [new THREE.Vector3(-0.6, -0.65, 0.5), new THREE.Vector3(-0.9, -0.65, 0.2)],
    [new THREE.Vector3(-1.1, -0.65, -0.3), new THREE.Vector3(-1.4, -0.65, -0.6)],
    // Scratch on motor housing
    [new THREE.Vector3(-1.4, 0.35, 0.15), new THREE.Vector3(-1.7, 0.2, -0.1)],
    [new THREE.Vector3(-1.3, -0.3, -0.2), new THREE.Vector3(-1.55, -0.15, 0.05)],
    // Impact marks on teeth
    [new THREE.Vector3(0.15, 1.35, -0.05), new THREE.Vector3(0.05, 1.45, 0.1)],
    [new THREE.Vector3(-0.1, -1.25, 0.65), new THREE.Vector3(0.05, -1.35, 0.5)],
  ];

  scratchData.forEach(points => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const scratch = new THREE.Line(geo, scratchMat);
    group.add(scratch);
  });

  // Dent/displaced-vertex style detail: small wireframe fragments near impact zones
  const dentGeo = new THREE.TetrahedronGeometry(0.08, 0);
  const dentMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.3 });

  const dentPositions = [
    [0.1, 1.25, 0.15], [-0.15, -1.1, 0.65], [0.2, 0.6, -1.05],
    [-0.25, 1.0, -0.5], [0.05, -0.8, -0.9], [-1.5, 0.3, 0.1]
  ];
  dentPositions.forEach(([x, y, z]) => {
    const dent = new THREE.Mesh(dentGeo, dentMat);
    dent.position.set(x, y, z);
    dent.rotation.set(x * 3, y * 2, z * 4);
    spinGroup.add(dent); // first 5 on drum (spin with it)
  });

  // ── Center the whole assembly ──
  group.position.set(0.5, 0.2, 0);

  /**
   * Update animation — spins the drum at high speed.
   * @param {number} time - elapsed time in seconds
   */
  function update(time) {
    // High-speed drum spin around its local X axis (the drum's axle)
    spinGroup.rotation.x = time * 8.0;

    // Subtle motor vibration
    group.position.y = 0.2 + Math.sin(time * 30) * 0.005;
  }

  return { group, update };
}
