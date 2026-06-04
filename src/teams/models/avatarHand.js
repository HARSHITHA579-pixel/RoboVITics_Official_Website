import * as THREE from 'three';

/**
 * Creates a procedural tendon-driven robotic hand model.
 * Features: palm base, 5 fingers with 3 phalanges each,
 * visible tendon lines, wrist joint, joint spheres.
 * All wireframe with color #577C8E.
 * Animates a slow clench-unclench cycle.
 * @returns {{ group: THREE.Group, update: (time: number) => void }}
 */
export function createAvatarHand() {
  const group = new THREE.Group();
  const color = 0x577C8E;
  const wireframeMat = new THREE.MeshBasicMaterial({ color, wireframe: true });
  const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 });
  const tendonMat = new THREE.LineBasicMaterial({ color: 0x6a9ab0, transparent: true, opacity: 0.5 });

  // ── Wrist joint ──
  const wristGeo = new THREE.CylinderGeometry(0.4, 0.35, 0.2, 10);
  const wrist = new THREE.Mesh(wristGeo, wireframeMat);
  wrist.position.y = -0.6;
  group.add(wrist);

  // Wrist ring detail
  const wristRingGeo = new THREE.TorusGeometry(0.38, 0.03, 6, 16);
  const wristRing = new THREE.Mesh(wristRingGeo, wireframeMat);
  wristRing.position.y = -0.5;
  wristRing.rotation.x = Math.PI / 2;
  group.add(wristRing);

  // Forearm stub
  const forearmGeo = new THREE.BoxGeometry(0.55, 0.4, 0.3);
  const forearm = new THREE.Mesh(forearmGeo, wireframeMat);
  forearm.position.y = -0.9;
  group.add(forearm);

  // Forearm detail lines
  const forearmLine1 = [
    new THREE.Vector3(-0.27, -0.7, 0.15),
    new THREE.Vector3(-0.27, -1.1, 0.15)
  ];
  const forearmLine2 = [
    new THREE.Vector3(0.27, -0.7, 0.15),
    new THREE.Vector3(0.27, -1.1, 0.15)
  ];
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(forearmLine1), lineMat));
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(forearmLine2), lineMat));

  // ── Palm base ──
  const palmGeo = new THREE.BoxGeometry(1.4, 0.6, 0.2);
  const palm = new THREE.Mesh(palmGeo, wireframeMat);
  palm.position.y = -0.15;
  group.add(palm);

  // Palm internal structure lines
  for (let i = 0; i < 3; i++) {
    const x = -0.35 + i * 0.35;
    const pts = [
      new THREE.Vector3(x, 0.1, 0.1),
      new THREE.Vector3(x, -0.4, 0.1)
    ];
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
  }

  // Palm cross bracing
  const palmBrace1 = [
    new THREE.Vector3(-0.6, -0.1, 0.1),
    new THREE.Vector3(0.6, -0.2, 0.1)
  ];
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(palmBrace1), lineMat));

  // ── Finger configurations ──
  // Each finger: { baseX, baseY, lengths[3], baseRotZ, isThumb }
  const fingerConfigs = [
    { baseX: -0.55, baseY: 0.15, lengths: [0.28, 0.24, 0.2], rotZ: -0.05, isThumb: false }, // index
    { baseX: -0.2, baseY: 0.2, lengths: [0.32, 0.28, 0.22], rotZ: 0, isThumb: false },       // middle
    { baseX: 0.15, baseY: 0.18, lengths: [0.30, 0.26, 0.20], rotZ: 0.03, isThumb: false },    // ring
    { baseX: 0.48, baseY: 0.12, lengths: [0.24, 0.20, 0.16], rotZ: 0.08, isThumb: false },    // pinky
    { baseX: -0.75, baseY: -0.2, lengths: [0.24, 0.22, 0.18], rotZ: -0.8, isThumb: true },    // thumb
  ];

  const fingers = [];

  fingerConfigs.forEach((cfg, fingerIdx) => {
    const fingerData = { joints: [], phalanges: [], tendonLine: null, cfg };

    // Base joint pivot (attached to palm)
    const baseJoint = new THREE.Group();
    baseJoint.position.set(cfg.baseX, cfg.baseY, 0);
    baseJoint.rotation.z = cfg.rotZ;

    if (cfg.isThumb) {
      // Thumb has different orientation — rotated to oppose
      baseJoint.rotation.x = 0.3;
    }

    group.add(baseJoint);

    let currentParent = baseJoint;
    let yOffset = 0;

    const phalanxGroups = [];
    const jointSpheres = [];

    for (let p = 0; p < 3; p++) {
      const len = cfg.lengths[p];

      // Joint sphere at pivot point
      const jointGeo = new THREE.SphereGeometry(0.05, 6, 4);
      const joint = new THREE.Mesh(jointGeo, wireframeMat);
      joint.position.y = yOffset;
      currentParent.add(joint);
      jointSpheres.push(joint);

      // Phalanx pivot group
      const phalanxPivot = new THREE.Group();
      phalanxPivot.position.y = yOffset;
      currentParent.add(phalanxPivot);

      // Phalanx box
      const phalanxGeo = new THREE.BoxGeometry(0.12, len, 0.1);
      const phalanx = new THREE.Mesh(phalanxGeo, wireframeMat);
      phalanx.position.y = len / 2;
      phalanxPivot.add(phalanx);

      // Side detail lines on phalanx
      if (p < 2) {
        const sideLineL = [
          new THREE.Vector3(-0.06, 0.02, 0.05),
          new THREE.Vector3(-0.06, len - 0.02, 0.05)
        ];
        phalanxPivot.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(sideLineL), lineMat));
      }

      phalanxGroups.push(phalanxPivot);
      currentParent = phalanxPivot;
      yOffset = len;
    }

    // Fingertip detail
    const tipGeo = new THREE.SphereGeometry(0.04, 4, 3);
    const tip = new THREE.Mesh(tipGeo, wireframeMat);
    tip.position.y = cfg.lengths[2];
    phalanxGroups[2].add(tip);

    // ── Tendon line (will be updated dynamically) ──
    // Create with enough points for palm-to-tip
    const tendonPoints = [];
    for (let t = 0; t < 6; t++) {
      tendonPoints.push(new THREE.Vector3(0, 0, 0));
    }
    const tendonGeo = new THREE.BufferGeometry().setFromPoints(tendonPoints);
    const tendonLine = new THREE.Line(tendonGeo, tendonMat);
    group.add(tendonLine);

    fingerData.joints = phalanxGroups;
    fingerData.baseJoint = baseJoint;
    fingerData.tendonLine = tendonLine;
    fingerData.tendonGeo = tendonGeo;
    fingerData.jointSpheres = jointSpheres;
    fingers.push(fingerData);
  });

  // ── Knuckle reinforcement bars across the palm top ──
  const knuckleBarGeo = new THREE.BoxGeometry(1.2, 0.04, 0.06);
  const knuckleBar = new THREE.Mesh(knuckleBarGeo, wireframeMat);
  knuckleBar.position.set(-0.05, 0.16, 0.08);
  group.add(knuckleBar);

  // Center and angle the hand for display
  group.rotation.x = -0.3;
  group.position.y = 0.3;

  // Temp vector for world position calculations
  const _worldPos = new THREE.Vector3();

  /**
   * Update animation — slow clench-unclench cycle with tendon updates.
   * @param {number} time - elapsed time in seconds
   */
  function update(time) {
    const cycleSpeed = 0.6;
    const t = time * cycleSpeed;

    // Smooth clench factor: oscillates 0 → 1 → 0
    // Using a smoothed sine wave for natural motion
    const rawClench = (Math.sin(t) + 1) * 0.5; // 0 to 1
    const clench = rawClench * rawClench * (3 - 2 * rawClench); // smoothstep

    fingers.forEach((finger, fIdx) => {
      const cfg = finger.cfg;

      // Phase offset per finger for wave-like curling
      const fingerPhase = fIdx * 0.15;
      const delayed = (Math.sin(t - fingerPhase) + 1) * 0.5;
      const curl = delayed * delayed * (3 - 2 * delayed);

      if (cfg.isThumb) {
        // Thumb opposition — rotates differently
        const thumbCurl = curl * 0.9;

        // Base rotation for opposition
        finger.baseJoint.rotation.z = cfg.rotZ + thumbCurl * 0.4;
        finger.baseJoint.rotation.x = 0.3 + thumbCurl * 0.3;

        // Phalanx curling
        finger.joints[0].rotation.x = thumbCurl * 0.7;
        finger.joints[1].rotation.x = thumbCurl * 0.9;
        finger.joints[2].rotation.x = thumbCurl * 0.6;
      } else {
        // Normal finger curling
        // Proximal, middle, distal joints have different max angles
        finger.joints[0].rotation.x = curl * 1.2;
        finger.joints[1].rotation.x = curl * 1.4;
        finger.joints[2].rotation.x = curl * 0.8;

        // Slight finger splay when open
        const splay = (1 - curl) * 0.05 * (fIdx - 1.5);
        finger.baseJoint.rotation.z = cfg.rotZ + splay;
      }

      // ── Update tendon line positions ──
      // We need world positions of: palm base, base joint, each phalanx tip
      const positions = finger.tendonGeo.attributes.position;

      // Point 0: tendon anchor on palm/forearm
      const palmAnchor = new THREE.Vector3(cfg.baseX, -0.3, -0.1);
      positions.setXYZ(0, palmAnchor.x, palmAnchor.y, palmAnchor.z);

      // Point 1: base of finger
      finger.baseJoint.getWorldPosition(_worldPos);
      group.worldToLocal(_worldPos.clone());
      positions.setXYZ(1, cfg.baseX, cfg.baseY - 0.05, -0.05);

      // Points 2-4: along the phalanges (approximate based on curl)
      // Calculate curled positions relative to base
      let cumAngle = 0;
      let posX = cfg.baseX;
      let posY = cfg.baseY;

      for (let p = 0; p < 3; p++) {
        const jointAngle = cfg.isThumb
          ? finger.joints[p].rotation.x
          : finger.joints[p].rotation.x;
        cumAngle += jointAngle;

        const len = cfg.lengths[p];
        posX += Math.sin(finger.baseJoint.rotation.z) * len * Math.cos(cumAngle) * 0.3;
        posY += len * Math.cos(cumAngle);

        positions.setXYZ(p + 2, posX, posY, -0.05);
      }

      // Point 5: fingertip
      positions.setXYZ(5, posX, posY + 0.02, -0.05);

      positions.needsUpdate = true;
    });

    // Subtle wrist flex
    group.rotation.x = -0.3 + Math.sin(t * 0.7) * 0.05;
  }

  return { group, update };
}
