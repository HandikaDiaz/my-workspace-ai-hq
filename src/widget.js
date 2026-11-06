import * as THREE from './vendor/three/three.module.js';

const canvasContainer = document.getElementById('canvas-container');
const widgetContainer = document.getElementById('widget-container');
const statusBubble = document.getElementById('status-bubble');
const statusBadge = document.getElementById('status-badge');
const badgeDot = document.getElementById('badge-dot');
const badgeTitle = document.getElementById('badge-title');
const statusText = document.getElementById('status-text');
const hintPill = document.getElementById('hint-pill');

// ========================================================
// 1. INISIALISASI THREE.JS SCENE DENGAN BACKGROUND TRANSPARAN
// ========================================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0.4, 3.6);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
canvasContainer.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
dirLight.position.set(3, 4, 3);
scene.add(dirLight);

const backLight = new THREE.DirectionalLight(0xf59e0b, 1.5);
backLight.position.set(-3, -2, -2);
scene.add(backLight);

// ========================================================
// 2. BUILD 3D ASTRONOT MINI (COMMANDER DIAZ)
// ========================================================
const astroGroup = new THREE.Group();
astroGroup.position.set(0, -0.45, 0);
scene.add(astroGroup);

const titaniumMat = new THREE.MeshStandardMaterial({
  color: '#F8FAFC',
  roughness: 0.25,
  metalness: 0.5,
});
const carbonMat = new THREE.MeshStandardMaterial({
  color: '#0F172A',
  roughness: 0.4,
  metalness: 0.8,
});
const royalArmorMat = new THREE.MeshStandardMaterial({
  color: '#4F46E5',
  roughness: 0.25,
  metalness: 0.7,
});
const cyanGlowMat = new THREE.MeshStandardMaterial({
  color: '#38BDF8',
  emissive: '#0284C7',
  emissiveIntensity: 2.5,
});
const goldMat = new THREE.MeshStandardMaterial({
  color: '#F59E0B',
  emissive: '#D97706',
  emissiveIntensity: 0.6,
  metalness: 0.9,
});
const visorGoldMat = new THREE.MeshStandardMaterial({
  color: '#F59E0B',
  emissive: '#D97706',
  emissiveIntensity: 0.8,
  roughness: 0.05,
  metalness: 0.98,
});

// Badan / Torso
const torso = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.52, 0.32), titaniumMat);
torso.position.set(0, 0.82, 0);
astroGroup.add(torso);

const chestArmor = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.32, 0.08), royalArmorMat);
chestArmor.position.set(0, 0.86, 0.15);
astroGroup.add(chestArmor);

const arcReactor = new THREE.Mesh(
  new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16),
  cyanGlowMat
);
arcReactor.rotation.x = Math.PI / 2;
arcReactor.position.set(0, 0.86, 0.19);
astroGroup.add(arcReactor);

// Jetpack & Thrusters
const jetpack = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.48, 0.22), titaniumMat);
jetpack.position.set(0, 0.84, -0.24);
astroGroup.add(jetpack);

const thrusterFlames = [];
[-0.13, 0.13].forEach((tx) => {
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.48, 12), carbonMat);
  tank.position.set(tx, 0.84, -0.3);
  astroGroup.add(tank);

  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.06, 0.28, 12),
    new THREE.MeshBasicMaterial({ color: '#38BDF8', transparent: true, opacity: 0.9 })
  );
  flame.rotation.x = Math.PI;
  flame.position.set(tx, 0.46, -0.3);
  astroGroup.add(flame);
  thrusterFlames.push(flame);
});

// Helm & Visor
const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.27, 24, 24), titaniumMat);
helmet.position.set(0, 1.3, 0);
astroGroup.add(helmet);

const visor = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), visorGoldMat);
visor.position.set(0, 1.3, 0.08);
visor.scale.set(1.02, 0.82, 0.78);
astroGroup.add(visor);

// Antena
const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.28, 8), goldMat);
antenna.position.set(0.26, 1.48, -0.04);
astroGroup.add(antenna);

// Tangan & Kaki
const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.42, 0.14), titaniumMat);
leftArm.position.set(-0.33, 0.68, 0);
astroGroup.add(leftArm);

const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.42, 0.14), titaniumMat);
rightArm.position.set(0.33, 0.68, 0);
astroGroup.add(rightArm);

const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.46, 0.18), carbonMat);
leftLeg.position.set(-0.14, 0.32, 0);
astroGroup.add(leftLeg);

const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.46, 0.18), carbonMat);
rightLeg.position.set(0.14, 0.32, 0);
astroGroup.add(rightLeg);

// ========================================================
// 3. ANIMATION LOOP (FLOATING / JETPACK EFFECT)
// ========================================================
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  // Floating bobbing up and down
  astroGroup.position.y = -0.45 + Math.sin(elapsed * 2.4) * 0.07;
  astroGroup.rotation.y = Math.sin(elapsed * 1.2) * 0.24;
  astroGroup.rotation.z = Math.cos(elapsed * 1.8) * 0.04;

  // Lambaian tangan
  leftArm.rotation.x = Math.sin(elapsed * 2.4) * 0.25;
  rightArm.rotation.x = -Math.sin(elapsed * 2.4) * 0.25;

  // Gerakan kaki melayang
  leftLeg.rotation.x = -Math.sin(elapsed * 2.0) * 0.15;
  rightLeg.rotation.x = Math.sin(elapsed * 2.0) * 0.15;

  // Api thruster bergetar realistis
  thrusterFlames.forEach((flame) => {
    const s = 0.8 + Math.random() * 0.4;
    flame.scale.set(s, s, s);
  });

  renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========================================================
// 4. RESTORE MAIN WINDOW INTERACTION
// ========================================================
function triggerRestore() {
  if (window.widgetAPI?.restoreMainWindow) {
    window.widgetAPI.restoreMainWindow();
  }
}

widgetContainer.addEventListener('dblclick', triggerRestore);
statusBubble.addEventListener('click', triggerRestore);
hintPill.addEventListener('click', triggerRestore);

// ========================================================
// 5. UPDATE STATUS DARI IPC REAL-TIME
// ========================================================
function updateStatusUI(payload) {
  if (!payload || !payload.activeAgents) return;
  const activeList = Object.entries(payload.activeAgents).filter(
    ([_id, val]) => val?.isWorking
  );

  if (activeList.length > 0) {
    const [firstId, firstVal] = activeList[0];
    statusBadge.classList.add('working');
    badgeTitle.textContent = `${activeList.length} WORKING`;
    statusText.textContent = firstVal.task || `${firstId} sedang bekerja`;
    statusBubble.style.borderColor = '#34d399';
    badgeDot.style.color = '#34d399';
  } else {
    statusBadge.classList.remove('working');
    badgeTitle.textContent = 'ALL IDLE';
    statusText.textContent = 'Tim Standby di Pos';
    statusBubble.style.borderColor = 'rgba(56, 189, 248, 0.45)';
    badgeDot.style.color = '#38bdf8';
  }
}

if (window.widgetAPI) {
  window.widgetAPI.getState().then(updateStatusUI).catch(() => {});
  window.widgetAPI.onStateChanged(updateStatusUI);
}
