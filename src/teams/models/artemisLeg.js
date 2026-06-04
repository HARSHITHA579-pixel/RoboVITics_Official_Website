import * as THREE from 'three';

/**
 * Creates a procedural quadruped robot leg assembly.
 * Features: hip servo bracket, upper/lower leg segments,
 * knee joint, foot/pad, visible servo boxes at joints.
 * All wireframe with color #577C8E.
 * Animates a natural walking gait cycle.
 * @returns {{ group: THREE.Group, update: (time: number) => void }}
 */
export function createArtemisLeg() {
  const group = new THREE.Group();
  const color = 0x577C8E;
  const wireframeMat = new THREE.MeshBasicMaterial({ color, wireframe: true });
  const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.5 });

  // ── Hip body / chassis mount plate ──
  const chassisGeo = new THREE.BoxGeometry(2.4, 0.2, 1.2);
  const chassis = new THREE.Mesh(chassisGeo, wireframeMat);
  chassis.position.y = 1.8;
  group.add(chassis);

  // Chassis cross-bracing detail
  const bracePoints1 = [
    new THREE.Vector3(-1.2, 1.8, 0.6),
    new THREE.Vector3(1.2, 1.8, -0.6)
  ];
  const bracePoints2 = [
    new THREE.Vector3(1.2, 1.8, 0.6),
    new THREE.Vector3(-1.2, 1.8, -0.6)
  ];
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(bracePoints1), lineMat));
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(bracePoints2), lineMat));

  // ── Build 4 legs ──
  const legs = [];
  const legPositions = [
    { x: -0.9, z: 0, phase: 0 },         // front-left
    { x: 0.9, z: 0, phase: Math.PI },     // front-right
    { x: -0.9, z: 0, phase: Math.PI },    // rear-left (mirrored on Z later)
    { x: 0.9, z: 0, phase: 0 },           // rear-right
  ];

  // We'll visually offset front and rear legs on Z
  const legZOffsets = [0.5, 0.5, -0.5, -0.5];

  legPositions.forEach((cfg, idx) => {
    const legGroup = new THREE.Group();
    legGroup.position.set(cfg.x, 1.7, legZOffsets[idx]);

    // ── Hip servo bracket ──
    const hipBracketGeo = new THREE.BoxGeometry(0.35, 0.25, 0.4);
    const hipBracket = new THREE.Mesh(hipBracketGeo, wireframeMat);
    legGroup.add(hipBracket);

    // Hip servo motor (visible box)
    const hipServoGeo = new THREE.BoxGeometry(0.28, 0.18, 0.22);
    const hipServo = new THREE.Mesh(hipServoGeo, wireframeMat);
    hipServo.position.set(0, 0, 0.18);
    legGroup.add(hipServo);

    // Hip servo horn detail
    const hipHornGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 8);
    const hipHorn = new THREE.Mesh(hipHornGeo, wireframeMat);
    hipHorn.position.set(0, -0.12, 0);
    legGroup.add(hipHorn);

    // ── Hip pivot group (rotates for hip oscillation) ──
    const hipPivot = new THREE.Group();
    hipPivot.position.y = -0.12;
    legGroup.add(hipPivot);

    // Upper leg segment
    const upperLegGeo = new THREE.BoxGeometry(0.15, 0.85, 0.12);
    const upperLeg = new THREE.Mesh(upperLegGeo, wireframeMat);
    upperLeg.position.y = -0.45;
    hipPivot.add(upperLeg);

    // Upper leg servo housing (at the side)
    const upperServoGeo = new THREE.BoxGeometry(0.22, 0.2, 0.16);
    const upperServo = new THREE.Mesh(upperServoGeo, wireframeMat);
    upperServo.position.set(0.12, -0.3, 0);
    hipPivot.add(upperServo);

    // Reinforcement lines on upper leg
    const upperLinePoints = [
      new THREE.Vector3(-0.075, -0.05, 0.06),
      new THREE.Vector3(-0.075, -0.85, 0.06)
    ];
    hipPivot.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(upperLinePoints), lineMat));

    // ── Knee joint ──
    const kneeJointGeo = new THREE.SphereGeometry(0.1, 8, 6);
    const kneeJoint = new THREE.Mesh(kneeJointGeo, wireframeMat);
    kneeJoint.position.y = -0.88;
    hipPivot.add(kneeJoint);

    // Knee servo (visible box)
    const kneeServoGeo = new THREE.BoxGeometry(0.2, 0.16, 0.14);
    const kneeServo = new THREE.Mesh(kneeServoGeo, wireframeMat);
    kneeServo.position.set(-0.12, -0.88, 0);
    hipPivot.add(kneeServo);

    // Knee ring detail
    const kneeRingGeo = new THREE.TorusGeometry(0.12, 0.02, 6, 12);
    const kneeRing = new THREE.Mesh(kneeRingGeo, wireframeMat);
    kneeRing.position.y = -0.88;
    kneeRing.rotation.x = Math.PI / 2;
    hipPivot.add(kneeRing);

    // ── Knee pivot group (rotates for knee bend) ──
    const kneePivot = new THREE.Group();
    kneePivot.position.y = -0.88;
    hipPivot.add(kneePivot);

    // Lower leg segment
    const lowerLegGeo = new THREE.BoxGeometry(0.12, 0.75, 0.1);
    const lowerLeg = new THREE.Mesh(lowerLegGeo, wireframeMat);
    lowerLeg.position.y = -0.4;
    kneePivot.add(lowerLeg);

    // Lower leg shock absorber detail
    const shockGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 6);
    const shock = new THREE.Mesh(shockGeo, wireframeMat);
    shock.position.set(0.08, -0.25, 0);
    kneePivot.add(shock);

    // Lower leg reinforcement line
    const lowerLinePoints = [
      new THREE.Vector3(0.06, -0.05, 0.05),
      new THREE.Vector3(0.06, -0.75, 0.05)
    ];
    kneePivot.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(lowerLinePoints), lineMat));

    // ── Ankle joint ──
    const ankleGeo = new THREE.SphereGeometry(0.06, 6, 4);
    const ankle = new THREE.Mesh(ankleGeo, wireframeMat);
    ankle.position.y = -0.78;
    kneePivot.add(ankle);

    // ── Foot / pad ──
    const footGeo = new THREE.BoxGeometry(0.3, 0.06, 0.25);
    const foot = new THREE.Mesh(footGeo, wireframeMat);
    foot.position.y = -0.84;
    kneePivot.add(foot);

    // Foot grip detail (small ridges)
    for (let r = 0; r < 3; r++) {
      const ridgeGeo = new THREE.BoxGeometry(0.28, 0.02, 0.04);
      const ridge = new THREE.Mesh(ridgeGeo, wireframeMat);
      ridge.position.set(0, -0.87, -0.08 + r * 0.08);
      kneePivot.add(ridge);
    }

    group.add(legGroup);

    legs.push({
      hipPivot,
      kneePivot,
      phase: cfg.phase,
      legGroup
    });
  });

  // ── Wiring detail lines connecting chassis to legs ──
  for (let i = 0; i < 4; i++) {
    const wirePoints = [
      new THREE.Vector3(legPositions[i].x * 0.5, 1.8, legZOffsets[i] * 0.3),
      new THREE.Vector3(legPositions[i].x, 1.7, legZOffsets[i])
    ];
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(wirePoints), lineMat));
  }

  // Center the assembly so it sits nicely
  group.position.y = -0.6;

  /**
   * Update animation — walking gait cycle.
   * Uses sin/cos at different phases for natural quadruped gait (trot).
   * @param {number} time - elapsed time in seconds
   */
  function update(time) {
    const gaitSpeed = 1.8;
    const t = time * gaitSpeed;

    legs.forEach(leg => {
      const phase = leg.phase;

      // Hip oscillation: swings forward and back (rotation around Z axis)
      const hipAngle = Math.sin(t + phase) * 0.35;
      leg.hipPivot.rotation.z = hipAngle;

      // Knee bend: bends more during swing phase (when leg is off ground)
      // Use a biased sine to create asymmetric motion
      const swingPhase = Math.sin(t + phase);
      const kneeBend = swingPhase > 0
        ? swingPhase * 0.6  // swing phase: knee bends more
        : swingPhase * 0.15; // stance phase: knee nearly straight
      leg.kneePivot.rotation.z = kneeBend;

      // Subtle lateral hip sway
      leg.hipPivot.rotation.x = Math.sin(t * 0.5 + phase) * 0.05;
    });

    // Subtle chassis bob (body moves up/down with gait)
    group.position.y = -0.6 + Math.sin(t * 2) * 0.03;

    // Very slight chassis roll
    group.rotation.z = Math.sin(t) * 0.015;
    group.rotation.x = Math.cos(t * 0.5) * 0.01;
  }

  return { group, update };
}
