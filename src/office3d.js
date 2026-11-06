import * as THREE from './vendor/three/three.module.js';
import { OrbitControls } from './vendor/three/OrbitControls.js';

// ============================================================================
// 1. DATA ROSTER 9 CUSTOM AGENTS GLOBAL (C:\Users\HP\.agents\agents)
//    1 Main Orchestrator + 5 Freelance/Hackathon Sub-Agents + 3 Game Dev Sub-Agents
// ============================================================================
export const AGENTS_ROSTER = [
  {
    id: 'main-orchestrator',
    name: 'Main Orchestrator',
    codename: 'ORCH-0',
    role: 'Lead Engineer & .env Custodian',
    division: 'Executive',
    divisionKey: 'main',
    divisionName: 'Main Agent Command',
    model: 'inherit (Dynamic Selector)',
    runtime: 'MAIN-AGENT',
    phase: 'Core',
    status: 'active',
    isWorking: false,
    currentTask: '',
    color: '#fbbf24',
    type: 'android',
    zone: 'ceo',
    zoneName: '👑 Ruang CEO (North Mezzanine)',
    position: [-2.2, 0.38, -7.6],
    rotation: [0, 1.0, 0],
    mission:
      'Orkestrator utama Freelance, Hackathon, dan Game Dev. Menulis kode langsung, memilih model sub-agent (pro/flash/inherit), dan pemegang akses tunggal file .env.',
    description:
      'Terhubung langsung ke C:\\Users\\HP\\.agents\\agents\\main-orchestrator.md. Mengatur multi-tasking 8 sub-agent, menjaga aturan Zero Assumption, dan memastikan keamanan kredensial.',
    tools: [
      'Direct Coding',
      'Subagent Model Selector',
      'Exclusive .env Access',
      'GitHub & Godot MCP',
    ],
    inputs: ['Prompt User (Freelance / Hackathon / Game Dev)', 'Laporan & Hasil 8 Sub-Agent'],
    outputs: ['Keputusan Arsitektur', 'Konfigurasi .env Aman', 'Kode Produksi Terintegrasi'],
  },
  {
    id: 'discovery-researcher',
    name: 'Discovery Researcher',
    codename: 'DISC-1',
    role: 'Client & Hackathon Research',
    division: 'Discovery',
    divisionKey: 'freelance-hackathon',
    divisionName: 'Freelance & Hackathon Squad',
    model: 'flash / inherit',
    runtime: 'SUB-AGENT',
    phase: 'Discovery',
    status: 'idle',
    isWorking: false,
    currentTask: '',
    color: '#2dd4bf',
    type: 'drone',
    zone: 'mailbox',
    zoneName: '📬 Discovery & Research Hub',
    position: [0.0, 1.45, 7.6],
    rotation: [0, Math.PI, 0],
    mission:
      'Riset masalah bisnis client (Freelance), pencarian Problem Statement relevan di Google sesuai tema (Hackathon), serta validasi kelayakan teknis secara paralel.',
    description:
      'Terhubung ke C:\\Users\\HP\\.agents\\agents\\discovery-researcher.md. Bekerja paralel memvalidasi apakah solusi, API, atau library relevan sembari Main Agent menulis kode.',
    tools: ['Google Web Search', 'Playwright MCP', 'GitHub MCP', 'deep-research Skill'],
    inputs: ['Tema Hackathon / Brief Klien', 'Pertanyaan Validasi Solusi Paralel'],
    outputs: ['Problem Statement Tervalidasi', 'Data & Statistik Pasar', 'Rekomendasi Kelayakan Teknis'],
  },
  {
    id: 'solution-architect',
    name: 'Solution Architect',
    codename: 'ARCH-2',
    role: 'Clean Arch & Mermaid Flow',
    division: 'Engineering',
    divisionKey: 'freelance-hackathon',
    divisionName: 'Freelance & Hackathon Squad',
    model: 'pro / inherit',
    runtime: 'SUB-AGENT',
    phase: 'Architecture',
    status: 'idle',
    isWorking: false,
    currentTask: '',
    color: '#38bdf8',
    type: 'android',
    zone: 'engineering',
    zoneName: '💻 Ruang Software Engineer',
    position: [-9.2, 0.38, -5.8],
    rotation: [0, Math.PI, 0],
    mission:
      'Merancang Clean Architecture, skema database (Convex, Prisma, PostgreSQL, MongoDB), kontrak API, dan wajib menyertakan diagram Mermaid End-to-End User Flow.',
    description:
      'Terhubung ke C:\\Users\\HP\\.agents\\agents\\solution-architect.md. Menjamin struktur kode modular, camelCase, terbebas dari dead-code, dan siap skala produksi.',
    tools: ['Convex Schema', 'Prisma MCP', 'Supabase MCP', 'Stitch MCP', 'Mermaid Flow'],
    inputs: ['Kebutuhan Fitur & hasil riset', 'Target Platform (Web / Mobile)'],
    outputs: ['Diagram Mermaid End-to-End', 'Blueprint Clean Architecture', 'Skema Database'],
  },
  {
    id: 'fullstack-builder',
    name: 'Fullstack Builder',
    codename: 'BUILD-3',
    role: 'Web, Mobile & AI Engineer',
    division: 'Engineering',
    divisionKey: 'freelance-hackathon',
    divisionName: 'Freelance & Hackathon Squad',
    model: 'inherit',
    runtime: 'SUB-AGENT',
    phase: 'Implementation',
    status: 'idle',
    isWorking: false,
    currentTask: '',
    color: '#60a5fa',
    type: 'android',
    zone: 'engineering',
    zoneName: '💻 Ruang Software Engineer',
    position: [-6.4, 0.38, -5.8],
    rotation: [0, Math.PI, 0],
    mission:
      'Implementasi aplikasi Web, Mobile & AI (JS/TS, Python, React, Next.js, Expo/RN, Shadcn, Tailwind, MUI, Chakra, TanStack Query, Zustand, Clerk, Midtrans, Express, PyTorch, TF.js).',
    description:
      'Terhubung ke C:\\Users\\HP\\.agents\\agents\\fullstack-builder.md. Menerapkan camelCase, try-catch terpusat (tanpa bocor error server ke UI), self-documenting code, dan auto-delete dead code.',
    tools: ['Next.js / Expo', 'Convex / Prisma', 'Clerk & Midtrans', 'PyTorch & TF.js'],
    inputs: ['Blueprint Arsitektur', 'Desain UI & Kontrak API'],
    outputs: ['Kode Produksi Bersih', 'Permintaan Kunci .env ke Main Agent', 'Update Dokumentasi Fungsi'],
  },
  {
    id: 'qa-security-auditor',
    name: 'QA & Security Auditor',
    codename: 'AUDIT-4',
    role: 'Integration Test & Security',
    division: 'Testing',
    divisionKey: 'freelance-hackathon',
    divisionName: 'Freelance & Hackathon Squad',
    model: 'pro / inherit',
    runtime: 'SUB-AGENT',
    phase: 'Verification',
    status: 'idle',
    isWorking: false,
    currentTask: '',
    color: '#ef4444',
    type: 'android',
    zone: 'security',
    zoneName: '🛡️ Ruang Cyber Security SOC',
    position: [7.2, 0.38, -5.4],
    rotation: [0, -0.6, 0],
    mission:
      'Menyusun Integration Test di folder khusus (tests/integration/), mengaudit keamanan (Clerk, webhook Midtrans, sanitasi input), dan mencegah kebocoran error server ke UI.',
    description:
      'Terhubung ke C:\\Users\\HP\\.agents\\agents\\qa-security-auditor.md. Mendeteksi kode tidak efisien dan melaporkannya untuk diverifikasi sebelum direfaktor.',
    tools: ['Integration Test Suite', 'Playwright MCP', 'Security Audit Skill', 'UI Error Leak Check'],
    inputs: ['Kode Implementasi Baru', 'Endpoint API & Webhook Midtrans/Clerk'],
    outputs: ['File Test di tests/integration/', 'Laporan Audit Keamanan', 'Rekomendasi Refactoring'],
  },
  {
    id: 'pitch-delivery-specialist',
    name: 'Pitch & Delivery',
    codename: 'PITCH-5',
    role: 'Hackathon Pitch & Handover',
    division: 'Marketing',
    divisionKey: 'freelance-hackathon',
    divisionName: 'Freelance & Hackathon Squad',
    model: 'flash / inherit',
    runtime: 'SUB-AGENT',
    phase: 'Delivery',
    status: 'idle',
    isWorking: false,
    currentTask: '',
    color: '#f59e0b',
    type: 'android',
    zone: 'marketing',
    zoneName: '📈 Ruang Pitch & Delivery Studio',
    position: [-7.5, 0.38, 5.2],
    rotation: [0, 0.8, 0],
    mission:
      'Menyusun Pitch Deck, Problem-Solution Fit narrative, Demo Script (Hackathon), serta dokumen Handover & Deployment Checklist (Freelance Client).',
    description:
      'Terhubung ke C:\\Users\\HP\\.agents\\agents\\pitch-delivery-specialist.md. Mengemas hasil teknis menjadi presentasi pemenang Hackathon atau serah-terima profesional ke klien.',
    tools: ['Pitch Deck Structurer', 'Mermaid User Journey', 'Demo Script Writer', 'Release Checklist'],
    inputs: ['Problem Statement & MVP Selesai', 'Kriteria Penilaian Juri / Kebutuhan Klien'],
    outputs: ['Struktur Pitch Deck & Narasi', 'Naskah Live Demo', 'Dokumen Serah-Terima Produksi'],
  },
  {
    id: 'game-designer-architect',
    name: 'Game Designer Architect',
    codename: 'GDD-6',
    role: 'GDD, Core Loop & Balance',
    division: 'Design',
    divisionKey: 'game-dev',
    divisionName: 'Game Developer Squad (Roblox & Godot)',
    model: 'pro / inherit',
    runtime: 'SUB-AGENT',
    phase: 'Game Design',
    status: 'idle',
    isWorking: false,
    currentTask: '',
    color: '#ec4899',
    type: 'android',
    zone: 'lounge',
    zoneName: '☕ Game Design Studio (Sky Lounge)',
    position: [8.2, 0.38, 5.2],
    rotation: [0, -0.8, 0],
    mission:
      'Merancang Game Design Document (GDD), Core Gameplay Loop, sistem ekonomi/monetisasi, pipeline level/combat/UI/audio, dan diagram Mermaid Player Flow untuk Roblox & Godot (2D/3D).',
    description:
      'Terhubung ke C:\\Users\\HP\\.agents\\agents\\game-designer-architect.md serta ratusan skill game dev (team-combat, team-level, genre-*, balance-check).',
    tools: ['GDD & Core Loop Architect', 'team-* & genre-* Skills', 'balance-check', 'Mermaid Player Flow'],
    inputs: ['Ide / Konsep Game (2D / 3D)', 'Target Engine (Roblox Studio / Godot 4.7.1)'],
    outputs: ['Dokumen GDD Terstruktur', 'Diagram Mermaid Player Journey', 'Formula Balancing & Ekonomi'],
  },
  {
    id: 'roblox-luau-specialist',
    name: 'Roblox Luau Specialist',
    codename: 'LUAU-7',
    role: 'Roblox Studio & Anti-Exploit',
    division: 'GameEngine',
    divisionKey: 'game-dev',
    divisionName: 'Game Developer Squad (Roblox & Godot)',
    model: 'inherit',
    runtime: 'SUB-AGENT',
    phase: 'Roblox Dev',
    status: 'idle',
    isWorking: false,
    currentTask: '',
    color: '#10b981',
    type: 'android',
    zone: 'server',
    zoneName: '🗄️ Game Engine Wing (Roblox Studio)',
    position: [4.2, 0.38, -7.2],
    rotation: [0, -0.6, 0],
    mission:
      'Membangun game Roblox 2D/3D dengan Modular Luau (--!strict), Server-Authoritative RemoteEvents (anti-exploit), Session-Locked DataStore (BindToClose), MarketplaceService, & Object Pooling.',
    description:
      'Terhubung ke C:\\Users\\HP\\.agents\\agents\\roblox-luau-specialist.md. Menjaga FPS tinggi dengan pembersihan koneksi Maid/Janitor dan keamanan penuh di sisi Server.',
    tools: ['Strict Luau (--!strict)', 'Server-Authoritative Net', 'Safe DataStore', 'Object Pooling'],
    inputs: ['Spesifikasi GDD & Mekanik', 'Struktur ServerScriptService / ReplicatedStorage'],
    outputs: ['ModuleScript / ServerScript / LocalScript', 'Sistem Anti-Exploit & DataStore', 'Monetisasi Gamepass'],
  },
  {
    id: 'godot-engine-specialist',
    name: 'Godot Engine Specialist',
    codename: 'GODOT-8',
    role: 'Godot 4.7.1 & MCP Specialist',
    division: 'GameEngine',
    divisionKey: 'game-dev',
    divisionName: 'Game Developer Squad (Roblox & Godot)',
    model: 'inherit',
    runtime: 'SUB-AGENT',
    phase: 'Godot Dev',
    status: 'idle',
    isWorking: false,
    currentTask: '',
    color: '#c084fc',
    type: 'drone',
    zone: 'server',
    zoneName: '🗄️ Game Engine Wing (Godot 4.7.1)',
    position: [-4.2, 1.5, -7.2],
    rotation: [0, 0.6, 0],
    mission:
      'Spesialis Godot v4.7.1.stable (GDScript Static Typing & C#) untuk 2D & 3D (PC/Mobile/Web). Mengeksekusi Godot MCP secara otonom untuk membuat scene, node, playtest, dan debug.',
    description:
      'Terhubung ke C:\\Users\\HP\\.agents\\agents\\godot-engine-specialist.md & Godot MCP Server. Menerapkan Composition over Inheritance (Component Nodes), Signal Bus, Custom Resources (.tres), dan Object Pooling.',
    tools: ['Godot 4.7.1 MCP Server', 'GDScript Static Typing / C#', 'godot-export GLB', 'Object Pooling'],
    inputs: ['Desain Scene & Komponen Node', 'Aset 2D Sprite / 3D GLB'],
    outputs: ['Scene (.tscn) & Resource (.tres)', 'Script Komponen Modular', 'Verifikasi Playtest & Debug Log'],
  },
];

// ============================================================================
// 2. DATA ZONA RUANGAN STASIUN LUAR ANGKASA
// ============================================================================
export const OFFICE_ZONES = {
  ceo: {
    id: 'ceo',
    title: '👑 Ruang CEO (Commander Diaz Suite)',
    subtitle: 'NORTH MEZZANINE COMMAND STAGE',
    accent: '#F59E0B',
    cameraPos: [0, 7.5, -1.5],
    cameraTarget: [0, 1.5, -8.2],
    description: 'Panggung komando utama di mezzanine utara dengan 3 layar holografis melengkung, globe strategi emas, dan kursi eksekutif menghadap seluruh pulau.',
  },
  workbench: {
    id: 'workbench',
    title: '⚙️ Meja Rakit Utama (Assembly Workbench)',
    subtitle: 'CENTRAL AI ASSEMBLY WORKBENCH',
    accent: '#38BDF8',
    cameraPos: [0, 7.2, 7.8],
    cameraTarget: [0, 1.2, 0],
    description: 'Pusat perakitan kolaboratif tempat agen yang sedang diberi tugas berkumpul mengelas ide dan kode dengan 3 lengan robotik berartikulasi serta inti energi oktahedron.',
  },
  engineering: {
    id: 'engineering',
    title: '💻 Ruang Software Engineer & Architect',
    subtitle: 'FULLSTACK & ARCHITECTURE LAB',
    accent: '#06B6D4',
    cameraPos: [-9.8, 6.8, 0.5],
    cameraTarget: [-9.8, 1.2, -6.2],
    description: 'Laboratorium rekayasa perangkat lunak di sayap barat-utara lengkap dengan workstation dual-monitor dan hologram blueprint arsitektur 3D.',
  },
  security: {
    id: 'security',
    title: '🛡️ Ruang Cyber Security & SOC',
    subtitle: 'NVIDIA SKILLSPECTOR & DEFENSE',
    accent: '#10B981',
    cameraPos: [9.8, 6.8, 0.5],
    cameraTarget: [9.8, 1.2, -6.2],
    description: 'Pusat operasi keamanan siber di sayap timur-utara dengan layar radar pemindai ancaman dan hologram perisai ikosahedron.',
  },
  marketing: {
    id: 'marketing',
    title: '📈 Ruang Marketing, SEO & Creative Studio',
    subtitle: 'GROWTH, CONTENT & VIDEO STUDIO',
    accent: '#F59E0B',
    cameraPos: [-9.8, 6.8, 12.8],
    cameraTarget: [-9.8, 1.2, 6.2],
    description: 'Studio pertumbuhan & kreatif di sayap barat-selatan dengan meja analitik grafik batang 3D holografis.',
  },
  server: {
    id: 'server',
    title: '🗄️ Quantum Server Wings',
    subtitle: 'HIGH-DENSITY AI COMPUTE RACKS',
    accent: '#818CF8',
    cameraPos: [-4.5, 5.5, -2.5],
    cameraTarget: [-4.5, 1.3, -8.8],
    description: 'Empat rak server kuantum berkecepatan tinggi yang mengapit panggung mezzanine CEO di sisi utara.',
  },
  mailbox: {
    id: 'mailbox',
    title: '📬 Ruang Workspace & Gmail Hub',
    subtitle: 'GOOGLE WORKSPACE CLI TRIAGE',
    accent: '#F43F5E',
    cameraPos: [0, 6.2, 14.5],
    cameraTarget: [0, 1.2, 8.0],
    description: 'Terminal komunikasi di gerbang selatan stasiun dengan hologram TorusKnot pemindai pesan dan triase otomatis.',
  },
  lounge: {
    id: 'lounge',
    title: '☕ Sky Lounge & Cafe',
    subtitle: 'LOFI SYNTH & POMODORO BREAK',
    accent: '#EC4899',
    cameraPos: [9.8, 6.8, 12.8],
    cameraTarget: [9.8, 1.2, 6.2],
    description: 'Area santai di tepi tenggara stasiun luar angkasa dengan sofa empuk dan pohon bonsai sakura bio-luminescent.',
  },
};

// ============================================================================
// 3. HELPER AUDIO EFEK CHIME FUTURISTIK (WEB AUDIO API)
// ============================================================================
export function playAgentClickChime(freqStart = 520, freqEnd = 880) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + 0.14);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (e) {
    // Abaikan jika audio dibatasi
  }
}

// ============================================================================
// 4. HELPER PEMBUAT PAPAN NAMA 3D BILLBOARD & BADGE AGEN (CANVAS TEXTURE)
// ============================================================================
function createBillboardSign(title, subtitle, accentHex, width = 3.4, height = 0.85) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Latar belakang kaca gelap
  ctx.fillStyle = 'rgba(9, 13, 28, 0.88)';
  ctx.beginPath();
  ctx.roundRect(6, 6, 500, 116, 24);
  ctx.fill();

  // Garis tepi bercahaya
  ctx.lineWidth = 5;
  ctx.strokeStyle = accentHex;
  ctx.stroke();

  // Bar aksen kiri
  ctx.fillStyle = accentHex;
  ctx.beginPath();
  ctx.roundRect(18, 22, 10, 84, 5);
  ctx.fill();

  // Teks Judul
  ctx.fillStyle = '#FFFFFF';
  ctx.font = "bold 28px 'Segoe UI', Inter, sans-serif";
  ctx.fillText(title, 42, 56);

  // Teks Subjudul
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 19px Consolas, monospace';
  ctx.fillText(subtitle, 42, 94);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const geo = new THREE.PlaneGeometry(width, height);
  return new THREE.Mesh(geo, mat);
}

function drawAgentBadgeCanvas(canvas, agent) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 140);

  const isWorking = Boolean(agent.isWorking);

  ctx.fillStyle = isWorking ? 'rgba(6, 24, 20, 0.94)' : 'rgba(8, 12, 24, 0.86)';
  ctx.beginPath();
  ctx.roundRect(16, 16, 480, 108, 22);
  ctx.fill();

  ctx.strokeStyle = isWorking ? '#34d399' : agent.color;
  ctx.lineWidth = isWorking ? 6 : 5;
  ctx.beginPath();
  ctx.roundRect(16, 16, 480, 108, 22);
  ctx.stroke();

  ctx.fillStyle = isWorking ? '#34d399' : agent.color;
  ctx.beginPath();
  ctx.arc(52, 52, 11, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px "Segoe UI", sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(agent.name, 76, 52);

  if (isWorking) {
    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 18px Consolas, monospace';
    const taskLabel = agent.currentTask
      ? agent.currentTask.slice(0, 32)
      : 'BEKERJA DI MEJA TENGAH';
    ctx.fillText(`⚡ WORKING • ${taskLabel}`, 50, 94);
  } else {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 18px Consolas, monospace';
    ctx.fillText(`🚶 IDLE ROAM • ${agent.role}`, 50, 94);
  }
}

function createAgentBadge(agent) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 140;
  drawAgentBadgeCanvas(canvas, agent);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const geo = new THREE.PlaneGeometry(1.85, 0.5);
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = `badge_${agent.id}`;
  mesh.userData.badgeCanvas = canvas;
  mesh.userData.badgeTexture = texture;
  return mesh;
}

// ============================================================================
// 5. PEMBANGUN MESH ROBOT ANDROID & HOVER-DRONE (9 CUSTOM AGENTS)
// ============================================================================
const DEPARTMENT_BOUNDS = {
  Executive: { minX: -3.8, maxX: 3.8, minZ: -8.6, maxZ: -5.2 },
  Discovery: { minX: -3.5, maxX: 3.5, minZ: 5.2, maxZ: 9.6 },
  Engineering: { minX: -11.2, maxX: -4.4, minZ: -7.6, maxZ: -2.6 },
  Testing: { minX: 4.4, maxX: 11.2, minZ: -7.6, maxZ: -2.6 },
  Marketing: { minX: -11.2, maxX: -4.4, minZ: 2.8, maxZ: 8.2 },
  Design: { minX: 4.4, maxX: 11.2, minZ: 2.8, maxZ: 8.2 },
  GameEngine: { minX: -6.2, maxX: 6.2, minZ: -9.2, maxZ: -5.2 },
};

const WORKBENCH_STATIONS = Array.from({ length: 24 }, (_, idx) => {
  const angle = (idx / 24) * Math.PI * 2;
  const radius = 3.35;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius];
});

function pickRandomRoamPoint(division, homePos) {
  const bounds = DEPARTMENT_BOUNDS[division] || {
    minX: homePos.x - 2.5,
    maxX: homePos.x + 2.5,
    minZ: homePos.z - 2.5,
    maxZ: homePos.z + 2.5,
  };
  let tx = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
  let tz = bounds.minZ + Math.random() * (bounds.maxZ - bounds.minZ);
  // Pastikan agen yang tidak sedang disuruh kerja tidak masuk ke area meja tengah (radius < 4.0)
  const distFromCenter = Math.hypot(tx, tz);
  if (distFromCenter < 4.0) {
    const pushAngle = Math.atan2(tz, tx);
    tx = Math.cos(pushAngle) * 4.4;
    tz = Math.sin(pushAngle) * 4.4;
  }
  return new THREE.Vector3(tx, homePos.y, tz);
}

function buildAndroidMesh(agent) {
  const root = new THREE.Group();
  root.name = `agent_${agent.id}`;

  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.25,
    metalness: 0.2,
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.3,
    metalness: 0.8,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(agent.color),
    emissive: new THREE.Color(agent.color),
    emissiveIntensity: 0.65,
    roughness: 0.2,
    metalness: 0.5,
  });

  const bodyGroup = new THREE.Group();
  const torsoGeo = new THREE.CapsuleGeometry(0.24, 0.34, 12, 24);
  const torso = new THREE.Mesh(torsoGeo, whiteMat);
  torso.position.y = 0.52;
  torso.castShadow = true;
  torso.receiveShadow = true;
  torso.userData = { agentId: agent.id };
  bodyGroup.add(torso);

  const coreGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
  const core = new THREE.Mesh(coreGeo, accentMat);
  core.rotation.x = Math.PI / 2;
  core.position.set(0, 0.58, 0.23);
  core.userData = { agentId: agent.id };
  bodyGroup.add(core);

  [-0.27, 0.27].forEach((xOffset) => {
    const armGeo = new THREE.CapsuleGeometry(0.06, 0.22, 8, 12);
    const arm = new THREE.Mesh(armGeo, whiteMat);
    arm.position.set(xOffset, 0.5, 0);
    arm.rotation.z = xOffset < 0 ? 0.18 : -0.18;
    arm.castShadow = true;
    arm.userData = { agentId: agent.id };
    bodyGroup.add(arm);
  });

  root.add(bodyGroup);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.04, 0);

  const headGeo = new THREE.SphereGeometry(0.23, 24, 24);
  headGeo.scale(1.12, 0.92, 1.0);
  const headMesh = new THREE.Mesh(headGeo, whiteMat);
  headMesh.castShadow = true;
  headMesh.userData = { agentId: agent.id };
  headGroup.add(headMesh);

  const visorGeo = new THREE.SphereGeometry(
    0.215,
    20,
    16,
    -Math.PI * 0.35,
    Math.PI * 0.7,
    Math.PI * 0.28,
    Math.PI * 0.42
  );
  visorGeo.scale(1.12, 0.92, 1.04);
  const visor = new THREE.Mesh(visorGeo, darkMat);
  visor.rotation.y = -Math.PI / 2;
  visor.userData = { agentId: agent.id };
  headGroup.add(visor);

  const eyeGeo = new THREE.SphereGeometry(0.032, 12, 12);
  eyeGeo.scale(1.2, 0.65, 0.5);
  [-0.08, 0.08].forEach((xEye) => {
    const eye = new THREE.Mesh(eyeGeo, accentMat);
    eye.position.set(xEye, 0.02, 0.22);
    eye.userData = { agentId: agent.id };
    headGroup.add(eye);
  });

  [-0.25, 0.25].forEach((xEar) => {
    const earGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.05, 16);
    const ear = new THREE.Mesh(earGeo, accentMat);
    ear.rotation.z = Math.PI / 2;
    ear.position.set(xEar, 0.0, 0);
    ear.userData = { agentId: agent.id };
    headGroup.add(ear);
  });

  root.add(headGroup);

  const ringGeo = new THREE.RingGeometry(0.32, 0.42, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(agent.color),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.55,
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = -Math.PI / 2;
  ringMesh.position.y = 0.03;
  root.add(ringMesh);

  const badgeMesh = createAgentBadge(agent);
  badgeMesh.position.set(0, 1.62, 0);
  badgeMesh.rotation.set(-0.28, 0, 0);
  root.add(badgeMesh);

  return { root, headGroup, bodyMesh: bodyGroup, ringMesh, badgeMesh };
}

function buildDroneMesh(agent) {
  const root = new THREE.Group();
  root.name = `agent_${agent.id}`;

  const shellMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.25,
    metalness: 0.75,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(agent.color),
    emissive: new THREE.Color(agent.color),
    emissiveIntensity: 0.85,
    roughness: 0.2,
    metalness: 0.4,
  });

  const bodyGroup = new THREE.Group();

  const sphereGeo = new THREE.SphereGeometry(0.24, 24, 24);
  const sphere = new THREE.Mesh(sphereGeo, shellMat);
  sphere.castShadow = true;
  sphere.userData = { agentId: agent.id };
  bodyGroup.add(sphere);

  const lensGeo = new THREE.SphereGeometry(0.09, 16, 16);
  const lens = new THREE.Mesh(lensGeo, accentMat);
  lens.position.set(0, 0, 0.2);
  lens.userData = { agentId: agent.id };
  bodyGroup.add(lens);

  const gyroGeo = new THREE.TorusGeometry(0.36, 0.03, 12, 32);
  const gyro = new THREE.Mesh(gyroGeo, accentMat);
  gyro.rotation.x = Math.PI / 2;
  gyro.userData = { agentId: agent.id };
  bodyGroup.add(gyro);

  root.add(bodyGroup);

  const ringGeo = new THREE.RingGeometry(0.28, 0.38, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(agent.color),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.4,
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = -Math.PI / 2;
  ringMesh.position.y = -1.05;
  root.add(ringMesh);

  const beamGeo = new THREE.ConeGeometry(0.42, 1.1, 20, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(agent.color),
    transparent: true,
    opacity: 0.0,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const scanBeam = new THREE.Mesh(beamGeo, beamMat);
  scanBeam.position.set(0, -0.55, 0);
  root.add(scanBeam);

  const badgeMesh = createAgentBadge(agent);
  badgeMesh.position.set(0, 0.65, 0);
  badgeMesh.rotation.set(-0.28, 0, 0);
  root.add(badgeMesh);

  return { root, bodyMesh: bodyGroup, ringMesh, badgeMesh, scanBeam };
}

function spawnAllAgents(scene, roster, onRegisterInteractable) {
  const instances = [];

  roster.forEach((agent, index) => {
    const instanceData =
      agent.type === 'drone' ? buildDroneMesh(agent) : buildAndroidMesh(agent);

    const { root, headGroup, bodyMesh, ringMesh, badgeMesh, scanBeam } = instanceData;

    root.position.set(agent.position[0], agent.position[1], agent.position[2]);
    root.rotation.set(agent.rotation[0], agent.rotation[1], agent.rotation[2]);
    root.userData = { agentId: agent.id, isAgentRoot: true, isAgent: true };

    if (onRegisterInteractable) {
      root.traverse((child) => {
        if (child.isMesh) {
          child.userData = {
            ...child.userData,
            isAgent: true,
            agentId: agent.id,
            label: `🤖 ${agent.name} — ${agent.role} (${agent.division})`,
          };
          onRegisterInteractable(child);
        }
      });
    }

    scene.add(root);

    const baseY = agent.position[1];
    const phaseOffset = index * 0.85;
    const homePos = new THREE.Vector3(agent.position[0], agent.position[1], agent.position[2]);
    const stationCoords = WORKBENCH_STATIONS[index % WORKBENCH_STATIONS.length];
    const workbenchPos = new THREE.Vector3(stationCoords[0], baseY, stationCoords[1]);

    const instance = {
      data: agent,
      group: root,
      headGroup,
      bodyMesh,
      ringMesh,
      badgeMesh,
      scanBeam,
      navMode: 'idle_roam',
      homePos,
      roamTarget: pickRandomRoamPoint(agent.division, homePos),
      workbenchPos,
      roamPauseTimer: (index % 4) * 0.9,
      walkCycle: phaseOffset,
      refreshBadge() {
        if (badgeMesh.userData.badgeCanvas && badgeMesh.userData.badgeTexture) {
          drawAgentBadgeCanvas(badgeMesh.userData.badgeCanvas, agent);
          badgeMesh.userData.badgeTexture.needsUpdate = true;
        }
        ringMesh.material.color.set(agent.isWorking ? '#34d399' : agent.color);
      },
      updateAnimation(elapsed, delta, isSelected, isAgentWorking = false) {
        const dt = Math.min(delta || 0.016, 0.1);
        const shouldGoToCenterTable = Boolean(isAgentWorking || agent.isWorking);
        const targetMode = shouldGoToCenterTable
          ? instance.navMode === 'working_workbench'
            ? 'working_workbench'
            : 'mobilizing'
          : 'idle_roam';
        instance.navMode = targetMode;

        const activeTarget =
          instance.navMode === 'idle_roam' ? instance.roamTarget : instance.workbenchPos;

        const dx = activeTarget.x - root.position.x;
        const dz = activeTarget.z - root.position.z;
        const dist = Math.hypot(dx, dz);

        const moveSpeed =
          instance.navMode === 'idle_roam'
            ? agent.type === 'drone'
              ? 1.45
              : 1.05
            : 2.85;

        let isMoving = false;

        if (instance.navMode === 'idle_roam') {
          if (dist < 0.25) {
            instance.roamPauseTimer -= dt;
            if (instance.roamPauseTimer <= 0) {
              instance.roamTarget = pickRandomRoamPoint(agent.division, instance.homePos);
              instance.roamPauseTimer = 2.0 + Math.random() * 3.5;
            }
          } else {
            isMoving = true;
            const step = Math.min(dist, moveSpeed * dt);
            root.position.x += (dx / dist) * step;
            root.position.z += (dz / dist) * step;
            const desiredYaw = Math.atan2(dx, dz);
            const angleDiff = Math.atan2(
              Math.sin(desiredYaw - root.rotation.y),
              Math.cos(desiredYaw - root.rotation.y)
            );
            root.rotation.y += angleDiff * Math.min(1, dt * 6.5);
          }
        } else {
          if (dist > 0.15) {
            isMoving = true;
            const step = Math.min(dist, moveSpeed * dt);
            root.position.x += (dx / dist) * step;
            root.position.z += (dz / dist) * step;
            const desiredYaw = Math.atan2(dx, dz);
            const angleDiff = Math.atan2(
              Math.sin(desiredYaw - root.rotation.y),
              Math.cos(desiredYaw - root.rotation.y)
            );
            root.rotation.y += angleDiff * Math.min(1, dt * 8.0);
          } else {
            instance.navMode = 'working_workbench';
            const centerYaw = Math.atan2(-root.position.x, -root.position.z);
            const angleDiff = Math.atan2(
              Math.sin(centerYaw - root.rotation.y),
              Math.cos(centerYaw - root.rotation.y)
            );
            root.rotation.y += angleDiff * Math.min(1, dt * 7.0);
          }
        }

        if (agent.type === 'drone') {
          root.position.y = baseY + Math.sin(elapsed * 2.5 + phaseOffset) * 0.12;
          bodyMesh.rotation.y = Math.sin(elapsed * 1.2 + phaseOffset) * 0.35;
          if (scanBeam) {
            scanBeam.material.opacity =
              instance.navMode === 'working_workbench'
                ? 0.22 + Math.sin(elapsed * 6.0 + phaseOffset) * 0.08
                : 0.0;
          }
        } else {
          if (isMoving) {
            instance.walkCycle += dt * (instance.navMode === 'idle_roam' ? 6.0 : 10.5);
            bodyMesh.position.y = Math.abs(Math.sin(instance.walkCycle)) * 0.055;
            bodyMesh.rotation.z = Math.sin(instance.walkCycle) * 0.05;
          } else if (instance.navMode === 'working_workbench') {
            bodyMesh.position.y = Math.sin(elapsed * 6.0 + phaseOffset) * 0.03;
            bodyMesh.rotation.x = 0.12 + Math.sin(elapsed * 8.0 + phaseOffset) * 0.06;
            bodyMesh.rotation.z = 0;
          } else {
            bodyMesh.position.y = Math.sin(elapsed * 2.0 + phaseOffset) * 0.025;
            bodyMesh.rotation.x = 0;
            bodyMesh.rotation.z = 0;
          }

          if (headGroup) {
            if (instance.navMode === 'working_workbench') {
              headGroup.rotation.y = Math.sin(elapsed * 4.5 + phaseOffset) * 0.25;
              headGroup.rotation.x = 0.15 + Math.sin(elapsed * 7.0) * 0.08;
            } else {
              headGroup.rotation.y = Math.sin(elapsed * 0.9 + phaseOffset) * 0.18;
              headGroup.rotation.x = 0;
            }
          }
        }

        const ringMat = ringMesh.material;
        if (isSelected || instance.navMode === 'working_workbench') {
          const scale = 1.18 + Math.sin(elapsed * 5.0) * 0.12;
          ringMesh.scale.set(scale, scale, 1);
          ringMat.opacity = isSelected ? 0.95 : 0.78;
        } else {
          ringMesh.scale.set(1, 1, 1);
          ringMat.opacity = 0.45;
        }
      },
    };

    instances.push(instance);
  });

  return instances;
}

// ============================================================================
// 6. KONFIGURASI PENCAHAYAAN & LANGIT (NIGHT / DEEP SPACE DEFAULT)
// ============================================================================
const LIGHTING_PRESETS = {
  night: {
    skyTop: '#03030A',
    skyBottom: '#161233',
    fogColor: '#070612',
    ambientColor: '#818CF8',
    ambientIntensity: 0.95,
    hemiSky: '#312E81',
    hemiGround: '#090814',
    hemiIntensity: 0.85,
    dirColor: '#A5B4FC',
    dirIntensity: 1.65,
    sunPos: [14, 24, -14],
    sunColor: '#E0E7FF',
    starOpacity: 0.98,
    cloudColor: '#334155',
    cloudOpacity: 0.32,
    deckColor: '#161428',
    planetOpacity: 0.92,
  },
  sunset: {
    skyTop: '#311042',
    skyBottom: '#F97316',
    fogColor: '#FB923C',
    ambientColor: '#FED7AA',
    ambientIntensity: 1.25,
    hemiSky: '#F97316',
    hemiGround: '#3B0764',
    hemiIntensity: 1.15,
    dirColor: '#FB7185',
    dirIntensity: 2.6,
    sunPos: [-26, 10, -20],
    sunColor: '#F97316',
    starOpacity: 0.45,
    cloudColor: '#FDBA74',
    cloudOpacity: 0.8,
    deckColor: '#261B38',
    planetOpacity: 0.65,
  },
  day: {
    skyTop: '#0284C7',
    skyBottom: '#BAE6FD',
    fogColor: '#7DD3FC',
    ambientColor: '#FFFFFF',
    ambientIntensity: 1.9,
    hemiSky: '#E0F2FE',
    hemiGround: '#94A3B8',
    hemiIntensity: 1.45,
    dirColor: '#FFFBEB',
    dirIntensity: 3.1,
    sunPos: [18, 34, 18],
    sunColor: '#FEF08A',
    starOpacity: 0.0,
    cloudColor: '#FFFFFF',
    cloudOpacity: 0.94,
    deckColor: '#3B4252',
    planetOpacity: 0.15,
  },
  dawn: {
    skyTop: '#38BDF8',
    skyBottom: '#FDE68A',
    fogColor: '#BAE6FD',
    ambientColor: '#FFF7ED',
    ambientIntensity: 1.55,
    hemiSky: '#BAE6FD',
    hemiGround: '#FED7AA',
    hemiIntensity: 1.25,
    dirColor: '#FDBA74',
    dirIntensity: 2.5,
    sunPos: [24, 14, -18],
    sunColor: '#FBBF24',
    starOpacity: 0.15,
    cloudColor: '#FFF7ED',
    cloudOpacity: 0.88,
    deckColor: '#334155',
    planetOpacity: 0.3,
  },
};

function resolveTimePreset(mode) {
  if (mode !== 'auto') return LIGHTING_PRESETS[mode] || LIGHTING_PRESETS.night;
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 9) return LIGHTING_PRESETS.dawn;
  if (hour >= 9 && hour < 16) return LIGHTING_PRESETS.day;
  if (hour >= 16 && hour < 19) return LIGHTING_PRESETS.sunset;
  return LIGHTING_PRESETS.night;
}

// ============================================================================
// 7. CLASS UTAMA: SpaceOffice3D (PORTING PENUH VIRTUALOFFICE3D.TSX)
// ============================================================================
export class SpaceOffice3D {
  constructor(container, callbacks = {}) {
    this.container = container;
    this.onSelectAgent = callbacks.onSelectAgent || (() => {});
    this.onSelectZone = callbacks.onSelectZone || (() => {});
    this.onHoverChange = callbacks.onHoverChange || (() => {});
    this.onPointerLockChange = callbacks.onPointerLockChange || (() => {});
    this.onCameraModeChange = callbacks.onCameraModeChange || (() => {});

    this.timeOfDay = 'night'; // Default Malam Luar Angkasa (Deep Space)
    this.cameraMode = 'isometric';
    this.isAssembling = false;
    this.selectedAgentId = null;
    this.isInputBlocked = false; // Saat modal terminal dibuka atau fokus di input

    this.isCameraLerping = false;
    this.cameraLerpTarget = new THREE.Vector3();
    this.controlsLerpTarget = new THREE.Vector3();

    this.interactables = [];
    this.keys = {};

    this.init();
  }

  init() {
    const lighting = resolveTimePreset(this.timeOfDay);

    // 1. SCENE & SKY DOME SHADER
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(lighting.fogColor, 0.0085);

    const skyGeo = new THREE.SphereGeometry(125, 32, 32);
    this.skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(lighting.skyTop) },
        bottomColor: { value: new THREE.Color(lighting.skyBottom) },
        offset: { value: 12 },
        exponent: { value: 0.65 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize( vWorldPosition + offset ).y;
          gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    });
    this.scene.add(new THREE.Mesh(skyGeo, this.skyMat));

    // CAMERA & RENDERER
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      240
    );
    this.camera.position.set(0, 18.5, 22.5);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.14;
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 4.5;
    this.controls.maxDistance = 46.0;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.03;
    this.controls.minPolarAngle = 0.15;
    this.controls.target.set(0, 1.0, 1.0);

    this.controls.addEventListener('start', () => {
      this.isCameraLerping = false;
    });

    // 2. LIGHTS & SUN/MOON ORB + RINGED SPACE PLANET
    this.ambient = new THREE.AmbientLight(lighting.ambientColor, lighting.ambientIntensity);
    this.scene.add(this.ambient);

    this.hemi = new THREE.HemisphereLight(
      lighting.hemiSky,
      lighting.hemiGround,
      lighting.hemiIntensity
    );
    this.hemi.position.set(0, 35, 0);
    this.scene.add(this.hemi);

    this.dir = new THREE.DirectionalLight(lighting.dirColor, lighting.dirIntensity);
    this.dir.position.set(...lighting.sunPos);
    this.dir.castShadow = true;
    this.dir.shadow.mapSize.set(2048, 2048);
    this.dir.shadow.camera.near = 0.5;
    this.dir.shadow.camera.far = 75;
    const d = 20;
    this.dir.shadow.camera.left = -d;
    this.dir.shadow.camera.right = d;
    this.dir.shadow.camera.top = d;
    this.dir.shadow.camera.bottom = -d;
    this.scene.add(this.dir);

    this.sunOrb = new THREE.Mesh(
      new THREE.SphereGeometry(3.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: lighting.sunColor })
    );
    this.sunOrb.position.set(
      lighting.sunPos[0] * 1.5,
      lighting.sunPos[1] * 1.2,
      lighting.sunPos[2] * 1.5
    );
    this.scene.add(this.sunOrb);

    // Planet Bercincin di Kejauhan Luar Angkasa
    this.planetGroup = new THREE.Group();
    this.planetGroup.position.set(-34, 22, -42);
    this.planetMat = new THREE.MeshStandardMaterial({
      color: '#6366F1',
      emissive: '#312E81',
      emissiveIntensity: 0.6,
      roughness: 0.7,
      transparent: true,
      opacity: lighting.planetOpacity,
    });
    const planetSphere = new THREE.Mesh(new THREE.SphereGeometry(5.5, 32, 32), this.planetMat);
    this.planetRingMat = new THREE.MeshBasicMaterial({
      color: '#38BDF8',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: lighting.planetOpacity * 0.55,
    });
    const planetRing = new THREE.Mesh(new THREE.RingGeometry(7.2, 10.8, 48), this.planetRingMat);
    planetRing.rotation.x = Math.PI * 0.38;
    planetRing.rotation.y = 0.25;
    this.planetGroup.add(planetSphere, planetRing);
    this.scene.add(this.planetGroup);

    const registerInteractable = (mesh, zone, label) => {
      mesh.userData = { ...mesh.userData, zone, label };
      this.interactables.push(mesh);
    };

    // 3. PULAU MELAYANG LUAR ANGKASA (30m x 24m MULTI-ROOM CAMPUS)
    const islandGroup = new THREE.Group();
    this.scene.add(islandGroup);

    this.deckMat = new THREE.MeshStandardMaterial({
      color: lighting.deckColor,
      roughness: 0.55,
      metalness: 0.2,
    });
    const mainDeck = new THREE.Mesh(new THREE.BoxGeometry(30, 0.8, 24), this.deckMat);
    mainDeck.position.set(0, -0.4, 0);
    mainDeck.receiveShadow = true;
    islandGroup.add(mainDeck);

    const campusGrid = new THREE.GridHelper(29.6, 30, '#6366F1', '#334155');
    campusGrid.position.set(0, 0.01, 0);
    islandGroup.add(campusGrid);

    const borderMat = new THREE.MeshStandardMaterial({
      color: '#6366F1',
      emissive: '#4F46E5',
      emissiveIntensity: 1.8,
    });
    [-11.8, 11.8].forEach((z) => {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(29.6, 0.06, 0.12), borderMat);
      strip.position.set(0, 0.03, z);
      islandGroup.add(strip);
    });
    [-14.8, 14.8].forEach((x) => {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 23.6), borderMat);
      strip.position.set(x, 0.03, 0);
      islandGroup.add(strip);
    });

    // Batu Pulau Melayang di Bawah Dek
    const rockMat = new THREE.MeshStandardMaterial({
      color: '#332D4B',
      roughness: 0.88,
      flatShading: true,
    });
    const mainRock = new THREE.Mesh(new THREE.ConeGeometry(15.5, 6.2, 8), rockMat);
    mainRock.position.set(0, -3.5, 0);
    mainRock.rotation.x = Math.PI;
    islandGroup.add(mainRock);

    [
      [-9.5, -2.8, 5.0, 7.5, 4.5],
      [9.5, -2.9, -4.5, 7.8, 4.8],
      [-8.5, -2.7, -5.5, 6.8, 4.2],
      [8.8, -2.7, 5.5, 6.8, 4.2],
    ].forEach(([rx, ry, rz, rad, h], idx) => {
      const r = new THREE.Mesh(new THREE.ConeGeometry(rad, h, 6), rockMat);
      r.position.set(rx, ry, rz);
      r.rotation.set(Math.PI, idx * 0.8, 0.1);
      islandGroup.add(r);
    });

    const glassWallMat = new THREE.MeshStandardMaterial({
      color: '#38BDF8',
      transparent: true,
      opacity: 0.22,
      roughness: 0.1,
      metalness: 0.8,
    });
    const pillarMat = new THREE.MeshStandardMaterial({
      color: '#0F172A',
      roughness: 0.3,
      metalness: 0.8,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#F59E0B',
      emissive: '#D97706',
      emissiveIntensity: 1.6,
    });

    const createGlassWall = (w, h, d, x, y, z, parent) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), glassWallMat);
      wall.position.set(x, y, z);
      parent.add(wall);
    };

    // =========================================================================
    // ROOM 1: 👑 RUANG CEO (COMMANDER DIAZ SUITE) — NORTH MEZZANINE (0, -8.2)
    // =========================================================================
    const ceoRoom = new THREE.Group();
    ceoRoom.position.set(0, 0.18, -8.2);
    islandGroup.add(ceoRoom);

    const ceoPlat = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.32, 5.2),
      new THREE.MeshStandardMaterial({ color: '#1E1B4B', roughness: 0.35, metalness: 0.4 })
    );
    ceoPlat.position.set(0, 0.08, 0);
    ceoPlat.receiveShadow = true;
    registerInteractable(ceoPlat, 'ceo', '👑 Ruang CEO — North Mezzanine Stage (Commander Diaz)');
    ceoRoom.add(ceoPlat);

    const ceoTrimFront = new THREE.Mesh(new THREE.BoxGeometry(7.25, 0.06, 0.08), goldMat);
    ceoTrimFront.position.set(0, 0.25, 2.6);
    ceoRoom.add(ceoTrimFront);

    createGlassWall(7.2, 2.5, 0.12, 0, 1.45, -2.55, ceoRoom);
    createGlassWall(0.12, 2.5, 3.6, -3.55, 1.45, -0.75, ceoRoom);
    createGlassWall(0.12, 2.5, 3.6, 3.55, 1.45, -0.75, ceoRoom);

    const ceoSign = createBillboardSign(
      '👑 RUANG CEO (DIAZ)',
      'NORTH MEZZANINE COMMAND STAGE',
      '#F59E0B',
      3.8,
      0.92
    );
    ceoSign.position.set(0, 3.2, -2.5);
    ceoRoom.add(ceoSign);

    const ceoDeskTop = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.14, 1.25),
      new THREE.MeshStandardMaterial({ color: '#090D16', roughness: 0.15, metalness: 0.85 })
    );
    ceoDeskTop.position.set(0, 1.08, -0.4);
    ceoDeskTop.castShadow = true;
    registerInteractable(ceoDeskTop, 'ceo', '👑 Meja Kerja CEO Diaz (Panggung Utara)');
    ceoRoom.add(ceoDeskTop);

    const ceoDeskGoldStrip = new THREE.Mesh(new THREE.BoxGeometry(3.24, 0.05, 0.05), goldMat);
    ceoDeskGoldStrip.position.set(0, 1.09, 0.22);
    ceoRoom.add(ceoDeskGoldStrip);

    [-1.3, 1.3].forEach((x) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.85, 1.05), pillarMat);
      leg.position.set(x, 0.6, -0.4);
      ceoRoom.add(leg);
    });

    const ceoChairSeat = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.12, 0.75),
      new THREE.MeshStandardMaterial({ color: '#311042', roughness: 0.4 })
    );
    ceoChairSeat.position.set(0, 0.72, -1.45);
    const ceoChairBack = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 1.15, 0.14),
      new THREE.MeshStandardMaterial({ color: '#311042', roughness: 0.4 })
    );
    ceoChairBack.position.set(0, 1.32, -1.78);
    const ceoChairGold = new THREE.Mesh(new THREE.BoxGeometry(0.77, 0.06, 0.16), goldMat);
    ceoChairGold.position.set(0, 1.9, -1.78);
    ceoRoom.add(ceoChairSeat, ceoChairBack, ceoChairGold);

    const ceoCenterScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 0.78),
      new THREE.MeshStandardMaterial({
        color: '#38BDF8',
        emissive: '#0284C7',
        emissiveIntensity: 1.2,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      })
    );
    ceoCenterScreen.position.set(0, 1.62, -0.75);
    ceoRoom.add(ceoCenterScreen);

    [-1.2, 1.2].forEach((x, idx) => {
      const s = new THREE.Mesh(
        new THREE.PlaneGeometry(0.88, 0.68),
        new THREE.MeshStandardMaterial({
          color: '#F59E0B',
          emissive: '#D97706',
          emissiveIntensity: 1.0,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
        })
      );
      s.position.set(x, 1.58, -0.55);
      s.rotation.y = idx === 0 ? 0.38 : -0.38;
      ceoRoom.add(s);
    });

    this.holoGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 16, 16),
      new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        emissive: '#F59E0B',
        emissiveIntensity: 1.5,
        wireframe: true,
      })
    );
    this.holoGlobe.position.set(2.2, 1.38, 1.15);
    ceoRoom.add(this.holoGlobe);

    const globeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.48, 0.65, 20), pillarMat);
    globeBase.position.set(2.2, 0.55, 1.15);
    ceoRoom.add(globeBase);

    // =========================================================================
    // CENTERPIECE: ⚙️ MEJA RAKIT UTAMA (CENTRAL ASSEMBLY WORKBENCH) (0, 0, 0)
    // =========================================================================
    const workbenchGroup = new THREE.Group();
    workbenchGroup.position.set(0, 0, 0);
    islandGroup.add(workbenchGroup);

    const stationFloorRing = new THREE.Mesh(
      new THREE.RingGeometry(3.15, 3.65, 48),
      new THREE.MeshBasicMaterial({
        color: '#06B6D4',
        transparent: true,
        opacity: 0.42,
        side: THREE.DoubleSide,
      })
    );
    stationFloorRing.rotation.x = -Math.PI / 2;
    stationFloorRing.position.y = 0.03;
    workbenchGroup.add(stationFloorRing);

    const wbBase = new THREE.Mesh(
      new THREE.CylinderGeometry(2.35, 2.65, 0.38, 6),
      new THREE.MeshStandardMaterial({ color: '#0F172A', roughness: 0.25, metalness: 0.85 })
    );
    wbBase.position.set(0, 0.19, 0);
    wbBase.receiveShadow = true;
    wbBase.castShadow = true;
    registerInteractable(wbBase, 'workbench', '⚙️ Meja Rakit Utama (Central Assembly Workbench)');
    workbenchGroup.add(wbBase);

    const wbTableTop = new THREE.Mesh(
      new THREE.CylinderGeometry(1.85, 2.05, 0.48, 12),
      new THREE.MeshStandardMaterial({ color: '#1E293B', roughness: 0.2, metalness: 0.9 })
    );
    wbTableTop.position.set(0, 0.62, 0);
    wbTableTop.castShadow = true;
    registerInteractable(wbTableTop, 'workbench', '⚙️ Inti Perakitan AI — Klik untuk Detail / Mobilize');
    workbenchGroup.add(wbTableTop);

    const wbNeonRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.92, 0.045, 12, 48),
      new THREE.MeshStandardMaterial({
        color: '#38BDF8',
        emissive: '#0284C7',
        emissiveIntensity: 2.0,
      })
    );
    wbNeonRing.rotation.x = Math.PI / 2;
    wbNeonRing.position.set(0, 0.86, 0);
    workbenchGroup.add(wbNeonRing);

    const wbSign = createBillboardSign(
      '⚙️ MEJA RAKIT UTAMA',
      'CENTRAL AI ASSEMBLY WORKBENCH',
      '#38BDF8',
      3.8,
      0.88
    );
    wbSign.position.set(0, 3.25, 0);
    workbenchGroup.add(wbSign);

    this.roboticArms = [];
    this.laserBeams = [];
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const armRoot = new THREE.Group();
      armRoot.position.set(Math.cos(angle) * 1.55, 0.86, Math.sin(angle) * 1.55);
      armRoot.rotation.y = -angle - Math.PI / 2;

      const baseJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.24, 12), goldMat);
      armRoot.add(baseJoint);

      const lowerLimb = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.68, 0.12),
        new THREE.MeshStandardMaterial({ color: '#E2E8F0', metalness: 0.8, roughness: 0.2 })
      );
      lowerLimb.position.set(0, 0.38, 0.12);
      lowerLimb.rotation.x = 0.35;
      armRoot.add(lowerLimb);

      const upperHead = new THREE.Mesh(
        new THREE.ConeGeometry(0.11, 0.28, 12),
        new THREE.MeshStandardMaterial({
          color: '#F59E0B',
          emissive: '#D97706',
          emissiveIntensity: 1.4,
        })
      );
      upperHead.position.set(0, 0.72, 0.36);
      upperHead.rotation.x = Math.PI * 0.68;
      armRoot.add(upperHead);

      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.035, 1.25, 8),
        new THREE.MeshBasicMaterial({
          color: '#38BDF8',
          transparent: true,
          opacity: 0.25,
        })
      );
      beam.position.set(0, 0.92, 0.85);
      beam.rotation.x = Math.PI * 0.42;
      armRoot.add(beam);
      this.laserBeams.push(beam);

      workbenchGroup.add(armRoot);
      this.roboticArms.push(armRoot);
    }

    this.workbenchCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.52, 0),
      new THREE.MeshStandardMaterial({
        color: '#38BDF8',
        emissive: '#0284C7',
        emissiveIntensity: 2.2,
        flatShading: true,
        metalness: 0.6,
        roughness: 0.15,
      })
    );
    this.workbenchCore.position.set(0, 1.68, 0);
    workbenchGroup.add(this.workbenchCore);

    this.workbenchRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.78, 0.032, 12, 36),
      goldMat
    );
    this.workbenchRing1.position.set(0, 1.68, 0);
    workbenchGroup.add(this.workbenchRing1);

    this.workbenchRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.96, 0.025, 12, 36),
      new THREE.MeshStandardMaterial({
        color: '#38BDF8',
        emissive: '#38BDF8',
        emissiveIntensity: 1.8,
      })
    );
    this.workbenchRing2.position.set(0, 1.68, 0);
    this.workbenchRing2.rotation.x = Math.PI / 3;
    workbenchGroup.add(this.workbenchRing2);

    this.sparkCount = 36;
    const sparkPositions = new Float32Array(this.sparkCount * 3);
    for (let i = 0; i < this.sparkCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 1.1;
      sparkPositions[i * 3] = Math.cos(a) * r;
      sparkPositions[i * 3 + 1] = 1.0 + Math.random() * 1.6;
      sparkPositions[i * 3 + 2] = Math.sin(a) * r;
    }
    this.sparkGeo = new THREE.BufferGeometry();
    this.sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    this.sparkMat = new THREE.PointsMaterial({
      color: '#FBBF24',
      size: 0.11,
      transparent: true,
      opacity: 0.65,
    });
    const sparkParticles = new THREE.Points(this.sparkGeo, this.sparkMat);
    workbenchGroup.add(sparkParticles);

    // =========================================================================
    // ROOM 2: 💻 RUANG SOFTWARE ENGINEER & ARCHITECT — NORTH-WEST (-9.8, -6.2)
    // =========================================================================
    const engRoom = new THREE.Group();
    engRoom.position.set(-9.8, 0, -6.2);
    islandGroup.add(engRoom);

    const engFloor = new THREE.Mesh(
      new THREE.BoxGeometry(7.4, 0.12, 6.8),
      new THREE.MeshStandardMaterial({ color: '#0F2942', roughness: 0.45 })
    );
    engFloor.position.set(0, 0.06, 0);
    engFloor.receiveShadow = true;
    registerInteractable(engFloor, 'engineering', '💻 Ruang Software Engineer & Architect');
    engRoom.add(engFloor);

    createGlassWall(7.4, 2.4, 0.12, 0, 1.25, -3.35, engRoom);
    createGlassWall(0.12, 2.4, 6.8, -3.65, 1.25, 0, engRoom);

    const engSign = createBillboardSign(
      '💻 SOFTWARE ENGINEER',
      'FULLSTACK & ARCHITECTURE LAB',
      '#06B6D4'
    );
    engSign.position.set(0, 2.95, -3.3);
    engRoom.add(engSign);

    [-1.6, 1.6].forEach((x) => {
      const devDesk = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.82, 1.0), pillarMat);
      devDesk.position.set(x, 0.45, -1.6);
      devDesk.castShadow = true;
      registerInteractable(devDesk, 'engineering', '💻 Workstation Software Engineer');
      engRoom.add(devDesk);

      [-0.45, 0.45].forEach((mx) => {
        const mon = new THREE.Mesh(
          new THREE.PlaneGeometry(0.75, 0.5),
          new THREE.MeshBasicMaterial({ color: '#06B6D4', side: THREE.DoubleSide })
        );
        mon.position.set(x + mx, 1.18, -1.85);
        engRoom.add(mon);
      });
    });

    this.archCube = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.55, 0),
      new THREE.MeshStandardMaterial({
        color: '#06B6D4',
        emissive: '#06B6D4',
        emissiveIntensity: 1.8,
        wireframe: true,
      })
    );
    this.archCube.position.set(0, 1.5, 1.1);
    engRoom.add(this.archCube);

    // =========================================================================
    // ROOM 3: 🛡️ RUANG CYBER SECURITY & SOC — NORTH-EAST (9.8, -6.2)
    // =========================================================================
    const secRoom = new THREE.Group();
    secRoom.position.set(9.8, 0, -6.2);
    islandGroup.add(secRoom);

    const secFloor = new THREE.Mesh(
      new THREE.BoxGeometry(7.4, 0.12, 6.8),
      new THREE.MeshStandardMaterial({ color: '#0B2E27', roughness: 0.45 })
    );
    secFloor.position.set(0, 0.06, 0);
    secFloor.receiveShadow = true;
    registerInteractable(secFloor, 'security', '🛡️ Ruang Cyber Security & SkillSpector SOC');
    secRoom.add(secFloor);

    createGlassWall(7.4, 2.4, 0.12, 0, 1.25, -3.35, secRoom);
    createGlassWall(0.12, 2.4, 6.8, 3.65, 1.25, 0, secRoom);

    const secSign = createBillboardSign(
      '🛡️ CYBER SECURITY SOC',
      'NVIDIA SKILLSPECTOR & DEFENSE',
      '#10B981'
    );
    secSign.position.set(0, 2.95, -3.3);
    secRoom.add(secSign);

    const socDesk = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.85, 1.1), pillarMat);
    socDesk.position.set(0, 0.46, -1.5);
    socDesk.castShadow = true;
    registerInteractable(socDesk, 'security', '🛡️ Terminal Audit Keamanan SkillSpector');
    secRoom.add(socDesk);

    const radarScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 1.2),
      new THREE.MeshBasicMaterial({
        color: '#10B981',
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
      })
    );
    radarScreen.position.set(0, 1.65, -2.9);
    secRoom.add(radarScreen);

    this.shieldHolo = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.6, 0),
      new THREE.MeshStandardMaterial({
        color: '#10B981',
        emissive: '#059669',
        emissiveIntensity: 2.0,
        wireframe: true,
      })
    );
    this.shieldHolo.position.set(0, 1.55, 1.1);
    secRoom.add(this.shieldHolo);

    // =========================================================================
    // ROOM 4: 📈 RUANG MARKETING, SEO & CREATIVE STUDIO — SOUTH-WEST (-9.8, 6.2)
    // =========================================================================
    const mktRoom = new THREE.Group();
    mktRoom.position.set(-9.8, 0, 6.2);
    islandGroup.add(mktRoom);

    const mktFloor = new THREE.Mesh(
      new THREE.BoxGeometry(7.4, 0.12, 6.8),
      new THREE.MeshStandardMaterial({ color: '#362013', roughness: 0.45 })
    );
    mktFloor.position.set(0, 0.06, 0);
    mktFloor.receiveShadow = true;
    registerInteractable(mktFloor, 'marketing', '📈 Ruang Marketing, SEO & Video Studio');
    mktRoom.add(mktFloor);

    createGlassWall(7.4, 2.4, 0.12, 0, 1.25, 3.35, mktRoom);
    createGlassWall(0.12, 2.4, 6.8, -3.65, 1.25, 0, mktRoom);

    const mktSign = createBillboardSign(
      '📈 MARKETING & SEO',
      'GROWTH, CONTENT & VIDEO STUDIO',
      '#F59E0B'
    );
    mktSign.position.set(0, 2.95, 3.3);
    mktRoom.add(mktSign);

    const mktTable = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.8, 1.4), pillarMat);
    mktTable.position.set(-0.5, 0.42, 0);
    registerInteractable(mktTable, 'marketing', '📈 Meja Analitik SEO & Growth Marketing');
    mktRoom.add(mktTable);

    [
      [-0.9, 0.45, '#F59E0B'],
      [-0.45, 0.7, '#FB923C'],
      [0.0, 0.95, '#34D399'],
      [0.45, 1.25, '#10B981'],
    ].forEach(([bx, bh, bcol]) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, bh, 0.28),
        new THREE.MeshStandardMaterial({
          color: bcol,
          emissive: bcol,
          emissiveIntensity: 1.4,
        })
      );
      bar.position.set(-0.5 + bx, 0.85 + bh / 2, 0);
      mktRoom.add(bar);
    });

    // =========================================================================
    // ROOM 5: 🗄️ FLANKING QUANTUM SERVER WINGS — NORTH MEZZANINE WINGS
    // =========================================================================
    const srvRoom = new THREE.Group();
    srvRoom.position.set(0, 0, -8.2);
    islandGroup.add(srvRoom);

    [-5.0, -4.1, 4.1, 5.0].forEach((rx) => {
      const rack = new THREE.Mesh(new THREE.BoxGeometry(0.75, 2.5, 0.95), pillarMat);
      rack.position.set(rx, 1.3, -1.2);
      rack.castShadow = true;
      registerInteractable(rack, 'server', '🗄️ Quantum Server Rack (Kluster Komputasi AI)');
      srvRoom.add(rack);

      [0.7, 0.3, -0.1, -0.5].forEach((ly) => {
        const led = new THREE.Mesh(
          new THREE.BoxGeometry(0.56, 0.06, 0.04),
          new THREE.MeshBasicMaterial({ color: '#38BDF8' })
        );
        led.position.set(rx, 1.3 + ly, -0.71);
        srvRoom.add(led);
      });
    });

    // =========================================================================
    // ROOM 6: 📬 RUANG WORKSPACE & GMAIL HUB — SOUTH-CENTER (0, 8.0)
    // =========================================================================
    const mailRoom = new THREE.Group();
    mailRoom.position.set(0, 0, 8.0);
    islandGroup.add(mailRoom);

    const mailFloor = new THREE.Mesh(
      new THREE.BoxGeometry(7.6, 0.12, 4.6),
      new THREE.MeshStandardMaterial({ color: '#2D122B', roughness: 0.45 })
    );
    mailFloor.position.set(0, 0.06, 0);
    mailFloor.receiveShadow = true;
    registerInteractable(mailFloor, 'mailbox', '📬 Ruang Komunikasi Google Workspace & Gmail');
    mailRoom.add(mailFloor);

    const mailSign = createBillboardSign(
      '📬 GMAIL & WORKSPACE',
      'GOOGLE WORKSPACE CLI TRIAGE',
      '#F43F5E'
    );
    mailSign.position.set(0, 2.75, 2.2);
    mailRoom.add(mailSign);

    const mailPedestal = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.85, 1.1), pillarMat);
    mailPedestal.position.set(0, 0.45, 0.4);
    registerInteractable(mailPedestal, 'mailbox', '📬 Hub Komunikasi & Triase Workspace');
    mailRoom.add(mailPedestal);

    this.mailHolo = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.34, 0.09, 64, 16),
      new THREE.MeshStandardMaterial({
        color: '#F43F5E',
        emissive: '#E11D48',
        emissiveIntensity: 1.8,
      })
    );
    this.mailHolo.position.set(0, 1.45, 0.4);
    mailRoom.add(this.mailHolo);

    // =========================================================================
    // ROOM 7: ☕ SKY LOUNGE & PANTRI — SOUTH-EAST (9.8, 6.2)
    // =========================================================================
    const loungeRoom = new THREE.Group();
    loungeRoom.position.set(9.8, 0, 6.2);
    islandGroup.add(loungeRoom);

    const loungeFloor = new THREE.Mesh(
      new THREE.BoxGeometry(7.4, 0.12, 6.8),
      new THREE.MeshStandardMaterial({ color: '#26173E', roughness: 0.45 })
    );
    loungeFloor.position.set(0, 0.06, 0);
    loungeFloor.receiveShadow = true;
    registerInteractable(loungeFloor, 'lounge', '☕ Sky Lounge, Espresso Bar & Lofi Deck');
    loungeRoom.add(loungeFloor);

    createGlassWall(7.4, 2.4, 0.12, 0, 1.25, 3.35, loungeRoom);
    createGlassWall(0.12, 2.4, 6.8, 3.65, 1.25, 0, loungeRoom);

    const loungeSign = createBillboardSign(
      '☕ SKY LOUNGE & CAFE',
      'LOFI SYNTH & POMODORO BREAK',
      '#EC4899'
    );
    loungeSign.position.set(0, 2.95, 3.3);
    loungeRoom.add(loungeSign);

    const sofa = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.5, 1.1),
      new THREE.MeshStandardMaterial({ color: '#5B21B6', roughness: 0.6 })
    );
    sofa.position.set(-0.8, 0.35, 1.2);
    registerInteractable(sofa, 'lounge', '☕ Sofa Bersantai Sky Lounge');
    loungeRoom.add(sofa);

    const bonsaiTrunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.22, 1.1, 8),
      new THREE.MeshStandardMaterial({ color: '#78350F' })
    );
    bonsaiTrunk.position.set(1.8, 0.6, -1.0);
    const bonsaiCrown = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.95, 0),
      new THREE.MeshStandardMaterial({
        color: '#EC4899',
        emissive: '#BE185D',
        emissiveIntensity: 0.9,
        flatShading: true,
      })
    );
    bonsaiCrown.position.set(1.8, 1.45, -1.0);
    loungeRoom.add(bonsaiTrunk, bonsaiCrown);

    // =========================================================================
    // 4. ASTRONOT COMMANDER DIAZ AVATAR (WASD + JETPACK)
    // =========================================================================
    this.astronautGroup = new THREE.Group();
    this.astroPos = new THREE.Vector3(0, 0.34, -5.8);
    this.astronautGroup.position.copy(this.astroPos);
    this.scene.add(this.astronautGroup);

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: '#F8FAFC',
      roughness: 0.22,
      metalness: 0.55,
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
      emissiveIntensity: 2.2,
    });
    const visorGoldMat = new THREE.MeshStandardMaterial({
      color: '#F59E0B',
      emissive: '#D97706',
      emissiveIntensity: 0.5,
      roughness: 0.05,
      metalness: 0.98,
    });

    const astroTorso = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.56, 0.34), titaniumMat);
    astroTorso.position.set(0, 1.02, 0);
    astroTorso.castShadow = true;
    this.astronautGroup.add(astroTorso);

    const chestArmor = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.36, 0.08), royalArmorMat);
    chestArmor.position.set(0, 1.06, 0.16);
    this.astronautGroup.add(chestArmor);

    const arcReactor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.05, 20),
      cyanGlowMat
    );
    arcReactor.rotation.x = Math.PI / 2;
    arcReactor.position.set(0, 1.06, 0.2);
    this.astronautGroup.add(arcReactor);

    const ceoBelt = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.09, 0.36), goldMat);
    ceoBelt.position.set(0, 0.72, 0);
    this.astronautGroup.add(ceoBelt);

    const jetpackBody = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.52, 0.24), titaniumMat);
    jetpackBody.position.set(0, 1.04, -0.26);
    jetpackBody.castShadow = true;
    this.astronautGroup.add(jetpackBody);

    this.thrusterFlames = [];
    [-0.14, 0.14].forEach((tx) => {
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.54, 16), carbonMat);
      tank.position.set(tx, 1.04, -0.32);
      this.astronautGroup.add(tank);

      const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.14, 16), carbonMat);
      nozzle.position.set(tx, 0.72, -0.32);
      this.astronautGroup.add(nozzle);

      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.065, 0.26, 12),
        new THREE.MeshBasicMaterial({ color: '#38BDF8', transparent: true, opacity: 0.85 })
      );
      flame.rotation.x = Math.PI;
      flame.position.set(tx, 0.56, -0.32);
      this.astronautGroup.add(flame);
      this.thrusterFlames.push(flame);
    });

    const helmetOuter = new THREE.Mesh(new THREE.SphereGeometry(0.29, 28, 28), titaniumMat);
    helmetOuter.position.set(0, 1.54, 0);
    helmetOuter.castShadow = true;
    this.astronautGroup.add(helmetOuter);

    const helmetVisor = new THREE.Mesh(new THREE.SphereGeometry(0.255, 28, 28), visorGoldMat);
    helmetVisor.position.set(0, 1.54, 0.08);
    helmetVisor.scale.set(1.02, 0.82, 0.78);
    this.astronautGroup.add(helmetVisor);

    const ceoCrest = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.28), goldMat);
    ceoCrest.position.set(0, 1.82, 0.02);
    this.astronautGroup.add(ceoCrest);

    [-0.28, 0.28].forEach((hx) => {
      const earPod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.08, 16),
        royalArmorMat
      );
      earPod.rotation.z = Math.PI / 2;
      earPod.position.set(hx, 1.54, 0);
      this.astronautGroup.add(earPod);
    });
    const antennaRod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.32, 8), goldMat);
    antennaRod.position.set(0.29, 1.72, -0.04);
    this.astronautGroup.add(antennaRod);

    const diazBadge = createBillboardSign(
      '👨‍🚀 COMMANDER DIAZ',
      'CEO & CHIEF ARCHITECT (WASD)',
      '#38BDF8',
      1.85,
      0.44
    );
    diazBadge.position.set(0, 2.18, 0);
    this.astronautGroup.add(diazBadge);

    this.astroLeftArm = new THREE.Group();
    this.astroLeftArm.position.set(-0.36, 1.24, 0);
    const lPauldron = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), royalArmorMat);
    const lUpperArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.48, 0.15), titaniumMat);
    lUpperArm.position.set(0, -0.22, 0);
    const lGauntlet = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.16, 0.17), cyanGlowMat);
    lGauntlet.position.set(0, -0.4, 0);
    this.astroLeftArm.add(lPauldron, lUpperArm, lGauntlet);
    this.astronautGroup.add(this.astroLeftArm);

    this.astroRightArm = new THREE.Group();
    this.astroRightArm.position.set(0.36, 1.24, 0);
    const rPauldron = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), royalArmorMat);
    const rUpperArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.48, 0.15), titaniumMat);
    rUpperArm.position.set(0, -0.22, 0);
    const rGauntlet = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.16, 0.17), goldMat);
    rGauntlet.position.set(0, -0.4, 0);
    this.astroRightArm.add(rPauldron, rUpperArm, rGauntlet);
    this.astronautGroup.add(this.astroRightArm);

    this.astroLeftLeg = new THREE.Group();
    this.astroLeftLeg.position.set(-0.15, 0.68, 0);
    const lThigh = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.52, 0.2), titaniumMat);
    lThigh.position.set(0, -0.26, 0);
    const lKnee = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.12, 0.22), royalArmorMat);
    lKnee.position.set(0, -0.28, 0.02);
    const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.16, 0.3), carbonMat);
    lBoot.position.set(0, -0.56, 0.04);
    this.astroLeftLeg.add(lThigh, lKnee, lBoot);
    this.astronautGroup.add(this.astroLeftLeg);

    this.astroRightLeg = new THREE.Group();
    this.astroRightLeg.position.set(0.15, 0.68, 0);
    const rThigh = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.52, 0.2), titaniumMat);
    rThigh.position.set(0, -0.26, 0);
    const rKnee = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.12, 0.22), royalArmorMat);
    rKnee.position.set(0, -0.28, 0.02);
    const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.16, 0.3), carbonMat);
    rBoot.position.set(0, -0.56, 0.04);
    this.astroRightLeg.add(rThigh, rKnee, rBoot);
    this.astronautGroup.add(this.astroRightLeg);

    const astroFloorRing = new THREE.Mesh(
      new THREE.RingGeometry(0.45, 0.54, 32),
      new THREE.MeshBasicMaterial({ color: '#38BDF8', side: THREE.DoubleSide })
    );
    astroFloorRing.rotation.x = -Math.PI / 2;
    astroFloorRing.position.set(0, 0.02, 0);
    this.astronautGroup.add(astroFloorRing);

    // =========================================================================
    // 5. SPAWN KE-14 AGEN SPESIALIS AI
    // =========================================================================
    this.agentInstances = spawnAllAgents(this.scene, AGENTS_ROSTER, (mesh) => {
      this.interactables.push(mesh);
    });

    // =========================================================================
    // 6. AWAN KOSMIK & 2.000 BINTANG LUAR ANGKASA
    // =========================================================================
    this.cloudMat = new THREE.MeshStandardMaterial({
      color: lighting.cloudColor,
      transparent: true,
      opacity: lighting.cloudOpacity,
      roughness: 0.9,
      flatShading: true,
    });
    this.cloudsGroup = new THREE.Group();
    [
      [-19.5, 2.5, -9.0, 1.6],
      [20.0, 3.5, -7.5, 1.8],
      [-18.5, -1.5, 9.5, 1.5],
      [19.2, 1.2, 10.0, 1.6],
    ].forEach(([cx, cy, cz, sc]) => {
      const cCluster = new THREE.Group();
      cCluster.position.set(cx, cy, cz);
      const p1 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.3 * sc, 0), this.cloudMat);
      const p2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.95 * sc, 0), this.cloudMat);
      p2.position.set(1.1 * sc, -0.15, 0.25);
      const p3 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85 * sc, 0), this.cloudMat);
      p3.position.set(-1.0 * sc, -0.2, -0.2);
      cCluster.add(p1, p2, p3);
      this.cloudsGroup.add(cCluster);
    });
    this.scene.add(this.cloudsGroup);

    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 180;
      starPositions[i * 3 + 1] = (Math.random() - 0.2) * 100;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 180;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    this.starMat = new THREE.PointsMaterial({
      color: '#E0E7FF',
      size: 0.26,
      transparent: true,
      opacity: lighting.starOpacity,
    });
    this.starsMesh = new THREE.Points(starGeo, this.starMat);
    this.scene.add(this.starsMesh);

    // =========================================================================
    // 7. INTERAKSI RAYCASTER, POINTER LOCK & KEYBOARD WASD
    // =========================================================================
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.astroYaw = Math.PI;
    this.astroPitch = -0.05;
    this.astroVelY = 0;
    this.isGrounded = true;

    const getHits = (e) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.raycaster.setFromCamera(this.pointer, this.camera);
      return this.raycaster.intersectObjects(this.interactables, false);
    };

    this.renderer.domElement.addEventListener('mousemove', (e) => {
      if (this.cameraMode === 'first-person') {
        if (document.pointerLockElement === this.renderer.domElement || e.buttons === 1) {
          this.astroYaw -= e.movementX * 0.0028;
          this.astroPitch = Math.max(
            -1.1,
            Math.min(1.1, this.astroPitch - e.movementY * 0.0028)
          );
        }
        return;
      }

      const hits = getHits(e);
      if (hits.length > 0) {
        this.renderer.domElement.style.cursor = 'pointer';
        this.onHoverChange(hits[0].object.userData.label || null);
      } else {
        this.renderer.domElement.style.cursor = 'grab';
        this.onHoverChange(null);
      }
    });

    this.renderer.domElement.addEventListener('click', (e) => {
      if (this.cameraMode === 'first-person') {
        if (document.pointerLockElement !== this.renderer.domElement) {
          this.renderer.domElement.requestPointerLock?.();
        }
        return;
      }

      const hits = getHits(e);
      if (hits.length > 0) {
        const hitObj = hits[0].object;

        if (hitObj.userData.isAgent && hitObj.userData.agentId) {
          const hitAgentId = hitObj.userData.agentId;
          playAgentClickChime();
          this.focusAgent(hitAgentId);
          return;
        }

        const zone = hitObj.userData.zone;
        if (zone && OFFICE_ZONES[zone]) {
          playAgentClickChime(440, 660);
          this.focusZone(zone);
        }
      } else {
        this.selectAgent(null);
        this.onSelectZone(null);
      }
    });

    document.addEventListener('pointerlockchange', () => {
      const locked = document.pointerLockElement === this.renderer.domElement;
      this.onPointerLockChange(locked);
    });

    window.addEventListener('keydown', (e) => {
      if (this.isInputBlocked) return;
      const tag = e.target?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
      if (e.target?.closest?.('.xterm')) return;

      this.keys[e.code] = true;
      if (e.code === 'Space' && this.isGrounded) {
        this.astroVelY = 5.4;
        this.isGrounded = false;
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    window.addEventListener('resize', () => this.handleResize());

    // =========================================================================
    // 8. ANIMATION LOOP
    // =========================================================================
    this.clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = Math.min(this.clock.getDelta(), 0.1);
      const elapsed = this.clock.getElapsedTime();

      // A. PERGERAKAN ASTRONOT COMMANDER DIAZ & JETPACK
      const isSprinting = this.keys['ShiftLeft'] || this.keys['ShiftRight'];
      const moveSpeed = (isSprinting ? 8.0 : 4.8) * delta;
      let moveX = 0;
      let moveZ = 0;

      if (!this.isInputBlocked) {
        if (this.cameraMode === 'first-person') {
          const forward = new THREE.Vector3(
            -Math.sin(this.astroYaw),
            0,
            -Math.cos(this.astroYaw)
          ).normalize();
          const right = new THREE.Vector3(
            Math.cos(this.astroYaw),
            0,
            -Math.sin(this.astroYaw)
          ).normalize();

          if (this.keys['KeyW'] || this.keys['ArrowUp']) {
            this.astroPos.addScaledVector(forward, moveSpeed);
            moveZ = 1;
          }
          if (this.keys['KeyS'] || this.keys['ArrowDown']) {
            this.astroPos.addScaledVector(forward, -moveSpeed);
            moveZ = -1;
          }
          if (this.keys['KeyA'] || this.keys['ArrowLeft']) {
            this.astroPos.addScaledVector(right, -moveSpeed);
            moveX = -1;
          }
          if (this.keys['KeyD'] || this.keys['ArrowRight']) {
            this.astroPos.addScaledVector(right, moveSpeed);
            moveX = 1;
          }
        } else {
          if (this.keys['KeyW'] || this.keys['ArrowUp']) moveZ -= 1;
          if (this.keys['KeyS'] || this.keys['ArrowDown']) moveZ += 1;
          if (this.keys['KeyA'] || this.keys['ArrowLeft']) moveX -= 1;
          if (this.keys['KeyD'] || this.keys['ArrowRight']) moveX += 1;

          if (moveX !== 0 || moveZ !== 0) {
            const moveVec = new THREE.Vector3(moveX, 0, moveZ).normalize();
            this.astroPos.addScaledVector(moveVec, moveSpeed);
            const targetAngle = Math.atan2(moveVec.x, moveVec.z);
            const diff =
              ((targetAngle - this.astroYaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
            this.astroYaw += diff * Math.min(1, delta * 10);
          }
        }
      }

      this.astroPos.y += this.astroVelY * delta;
      const floorHeight =
        Math.abs(this.astroPos.x) < 3.8 && Math.abs(this.astroPos.z) < 3.3 ? 0.18 : 0.08;
      if (this.astroPos.y > floorHeight) {
        this.astroVelY -= 9.8 * delta;
      } else {
        this.astroPos.y = floorHeight;
        this.astroVelY = 0;
        this.isGrounded = true;
      }

      this.astroPos.x = Math.max(-14.0, Math.min(14.0, this.astroPos.x));
      this.astroPos.z = Math.max(-11.0, Math.min(11.0, this.astroPos.z));

      this.astronautGroup.position.copy(this.astroPos);
      this.astronautGroup.rotation.y = this.astroYaw;

      const isAstroWalking = moveX !== 0 || moveZ !== 0;
      if (isAstroWalking) {
        const walkCycle = elapsed * (isSprinting ? 13 : 9);
        this.astroLeftLeg.rotation.x = Math.sin(walkCycle) * 0.6;
        this.astroRightLeg.rotation.x = -Math.sin(walkCycle) * 0.6;
        this.astroLeftArm.rotation.x = -Math.sin(walkCycle) * 0.5;
        this.astroRightArm.rotation.x = Math.sin(walkCycle) * 0.5;
      } else {
        this.astroLeftLeg.rotation.x = THREE.MathUtils.lerp(
          this.astroLeftLeg.rotation.x,
          0,
          delta * 8
        );
        this.astroRightLeg.rotation.x = THREE.MathUtils.lerp(
          this.astroRightLeg.rotation.x,
          0,
          delta * 8
        );
        this.astroLeftArm.rotation.x = THREE.MathUtils.lerp(
          this.astroLeftArm.rotation.x,
          0,
          delta * 8
        );
        this.astroRightArm.rotation.x = THREE.MathUtils.lerp(
          this.astroRightArm.rotation.x,
          Math.sin(elapsed * 2) * 0.06,
          delta * 5
        );
      }

      const flameScale =
        !this.isGrounded || isSprinting
          ? 1.6 + Math.sin(elapsed * 30) * 0.3
          : 0.7 + Math.sin(elapsed * 15) * 0.15;
      this.thrusterFlames.forEach((f) => {
        f.scale.set(1, flameScale, 1);
      });

      if (this.cameraMode === 'first-person') {
        const headBob = isAstroWalking
          ? Math.sin(elapsed * 11) * 0.045
          : Math.sin(elapsed * 2) * 0.01;
        this.camera.position.set(
          this.astroPos.x,
          this.astroPos.y + 1.62 + headBob,
          this.astroPos.z
        );
        const euler = new THREE.Euler(this.astroPitch, this.astroYaw, 0, 'YXZ');
        this.camera.quaternion.setFromEuler(euler);
      } else {
        if (this.isCameraLerping) {
          this.controls.target.lerp(this.controlsLerpTarget, delta * 3.8);
          this.camera.position.lerp(this.cameraLerpTarget, delta * 3.8);
          this.controls.update();

          const distCam = this.camera.position.distanceTo(this.cameraLerpTarget);
          const distTarget = this.controls.target.distanceTo(this.controlsLerpTarget);
          if (distCam < 0.05 && distTarget < 0.05) {
            this.isCameraLerping = false;
          }
        } else {
          this.controls.update();
        }
      }

      // B. UPDATE ANIMASI 9 CUSTOM AGENT (Hanya agent yang sedang disuruh kerja yang ke Meja Tengah)
      let activeWorkbenchCount = 0;
      this.agentInstances.forEach((inst) => {
        const isSelected = this.selectedAgentId === inst.data.id;
        const isAgentWorking = Boolean(this.isAssembling || inst.data.isWorking);
        if (isAgentWorking) activeWorkbenchCount++;
        inst.updateAnimation(elapsed, delta, isSelected, isAgentWorking);
      });

      // C. ANIMASI MEJA RAKIT UTAMA (Menyala jika minimal ada 1 agent yang sedang bekerja di meja tengah)
      const isWorkbenchActive = activeWorkbenchCount > 0;
      const speedMult = isWorkbenchActive ? 4.2 : 1.0;
      this.workbenchCore.rotation.y += delta * 1.1 * speedMult;
      this.workbenchCore.rotation.x += delta * 0.65 * speedMult;
      const coreScale = isWorkbenchActive
        ? 1.18 + Math.sin(elapsed * 7.5) * 0.14
        : 0.95 + Math.sin(elapsed * 2.2) * 0.05;
      this.workbenchCore.scale.setScalar(coreScale);

      this.workbenchRing1.rotation.z += delta * 1.4 * speedMult;
      this.workbenchRing1.rotation.x = Math.sin(elapsed * 1.8) * 0.5;
      this.workbenchRing2.rotation.y -= delta * 1.8 * speedMult;

      this.roboticArms.forEach((arm, idx) => {
        const osc = Math.sin(elapsed * (isWorkbenchActive ? 6.5 : 1.5) + idx * 2.1);
        arm.position.y = 0.86 + osc * (isWorkbenchActive ? 0.09 : 0.02);
        arm.rotation.z = osc * (isWorkbenchActive ? 0.18 : 0.04);
      });

      this.laserBeams.forEach((beam, idx) => {
        beam.material.opacity = isWorkbenchActive
          ? 0.45 + Math.sin(elapsed * 14 + idx) * 0.25
          : 0.12;
      });

      const posAttr = this.sparkGeo.getAttribute('position');
      for (let i = 0; i < this.sparkCount; i++) {
        let py = posAttr.getY(i) + delta * (isWorkbenchActive ? 1.8 : 0.45);
        if (py > 2.8) py = 0.95;
        posAttr.setY(i, py);
      }
      posAttr.needsUpdate = true;
      this.sparkMat.opacity = isWorkbenchActive ? 0.92 : 0.35;

      this.holoGlobe.rotation.y += delta * 0.7;
      this.archCube.rotation.x += delta * 0.8;
      this.archCube.rotation.y += delta * 1.1;
      this.shieldHolo.rotation.y -= delta * 0.9;
      this.mailHolo.rotation.x += delta * 0.7;
      this.mailHolo.rotation.y += delta * 1.0;
      this.cloudsGroup.rotation.y += delta * 0.01;
      this.planetGroup.rotation.y += delta * 0.04;
      this.starsMesh.rotation.y += delta * 0.004;

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  // ===========================================================================
  // PUBLIC API METHODS UNTUK UI CONTROLS
  // ===========================================================================
  setTimeOfDay(mode) {
    this.timeOfDay = mode;
    const lighting = resolveTimePreset(mode);

    this.scene.fog = new THREE.FogExp2(lighting.fogColor, 0.0085);
    this.skyMat.uniforms.topColor.value.set(lighting.skyTop);
    this.skyMat.uniforms.bottomColor.value.set(lighting.skyBottom);

    this.ambient.color.set(lighting.ambientColor);
    this.ambient.intensity = lighting.ambientIntensity;

    this.hemi.color.set(lighting.hemiSky);
    this.hemi.groundColor.set(lighting.hemiGround);
    this.hemi.intensity = lighting.hemiIntensity;

    this.dir.color.set(lighting.dirColor);
    this.dir.intensity = lighting.dirIntensity;
    this.dir.position.set(...lighting.sunPos);

    this.sunOrb.position.set(
      lighting.sunPos[0] * 1.5,
      lighting.sunPos[1] * 1.2,
      lighting.sunPos[2] * 1.5
    );
    this.sunOrb.material.color.set(lighting.sunColor);

    this.starMat.opacity = lighting.starOpacity;
    this.cloudMat.color.set(lighting.cloudColor);
    this.cloudMat.opacity = lighting.cloudOpacity;
    this.deckMat.color.set(lighting.deckColor);
    this.planetMat.opacity = lighting.planetOpacity;
    this.planetRingMat.opacity = lighting.planetOpacity * 0.55;
  }

  setCameraMode(mode) {
    this.cameraMode = mode;
    if (mode === 'first-person') {
      this.controls.enabled = false;
      this.astronautGroup.visible = false;
    } else {
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
      this.controls.enabled = true;
      this.astronautGroup.visible = true;
      this.resetCameraIsometric();
    }
    this.onCameraModeChange(mode);
  }

  toggleAssembleMode(forceState) {
    this.isAssembling =
      typeof forceState === 'boolean' ? forceState : !this.isAssembling;
    playAgentClickChime(this.isAssembling ? 480 : 720, this.isAssembling ? 960 : 480);

    if (this.isAssembling && this.cameraMode === 'isometric') {
      this.controlsLerpTarget.set(0, 1.2, 0);
      this.cameraLerpTarget.set(0, 10.5, 11.5);
      this.isCameraLerping = true;
    }
    return this.isAssembling;
  }

  /**
   * Sinkronisasi status kerja per-agent & metadata dari file .md di C:\Users\HP\.agents\agents.
   * Mendukung Auto-Discovery agen baru secara dinamis!
   */
  syncExternalState(payload = {}) {
    const activeAgents = payload.activeAgents || {};
    const diskMetadata = payload.diskMetadata || {};

    // 1. Periksa apakah ada agen baru yang ditemukan di disk tetapi belum ada di AGENTS_ROSTER
    Object.keys(diskMetadata).forEach((agentId) => {
      const exists = this.agentInstances.some((inst) => inst.data.id === agentId);
      if (!exists) {
        const disk = diskMetadata[agentId];
        const newIndex = this.agentInstances.length;
        const colorPalette = ['#38bdf8', '#a855f7', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#6366f1', '#14b8a6'];
        const autoColor = disk.color || colorPalette[newIndex % colorPalette.length];
        const autoType = disk.type || (newIndex % 2 === 0 ? 'android' : 'drone');
        const stationCoords = WORKBENCH_STATIONS[newIndex % WORKBENCH_STATIONS.length];
        const spawnX = -2.0 + (newIndex % 5) * 1.0;
        const spawnZ = 4.0 + Math.floor(newIndex / 5) * 1.0;

        const newAgentData = {
          id: agentId,
          name: disk.name || agentId,
          codename: `NEW-${newIndex + 1}`,
          role: disk.role || 'Custom Agent',
          division: disk.division || 'Custom Squad',
          divisionKey: (disk.division || 'custom').toLowerCase().replace(/\s+/g, '-'),
          divisionName: disk.division || 'Discovered Custom Squad',
          model: disk.model || 'inherit',
          runtime: disk.mainAgent ? 'MAIN-AGENT' : 'SUB-AGENT',
          phase: 'Discovered',
          status: 'idle',
          isWorking: Boolean(activeAgents[agentId]?.isWorking),
          currentTask: activeAgents[agentId]?.task || '',
          color: autoColor,
          type: autoType,
          zone: 'workbench',
          zoneName: '⚙️ Discovered Agent Station',
          position: [spawnX, autoType === 'drone' ? 1.4 : 0.38, spawnZ],
          rotation: [0, 0, 0],
          mission: disk.description || 'Agen baru yang ditemukan dari folder .agents/agents.',
          description: `Sumber File: ${disk.filePath || agentId}`,
          tools: disk.tools || [],
          inputs: ['Task Prompt'],
          outputs: ['Hasil Pekerjaan'],
        };

        AGENTS_ROSTER.push(newAgentData);

        const instanceData =
          newAgentData.type === 'drone'
            ? buildDroneMesh(newAgentData)
            : buildAndroidMesh(newAgentData);

        const { root, headGroup, bodyMesh, ringMesh, badgeMesh, scanBeam } = instanceData;
        root.position.set(newAgentData.position[0], newAgentData.position[1], newAgentData.position[2]);
        root.rotation.set(0, 0, 0);
        root.userData = { agentId: newAgentData.id, isAgentRoot: true, isAgent: true };

        root.traverse((child) => {
          if (child.isMesh) {
            child.userData = {
              ...child.userData,
              isAgent: true,
              agentId: newAgentData.id,
              label: `🤖 ${newAgentData.name} — ${newAgentData.role}`,
            };
            this.interactables.push(child);
          }
        });

        this.scene.add(root);

        const baseY = newAgentData.position[1];
        const homePos = new THREE.Vector3(...newAgentData.position);
        const workbenchPos = new THREE.Vector3(stationCoords[0], baseY, stationCoords[1]);

        const newInstance = {
          data: newAgentData,
          group: root,
          headGroup,
          bodyMesh,
          ringMesh,
          badgeMesh,
          scanBeam,
          navMode: 'idle_roam',
          homePos,
          roamTarget: pickRandomRoamPoint(newAgentData.division, homePos),
          workbenchPos,
          roamPauseTimer: (newIndex % 4) * 0.9,
          walkCycle: newIndex * 0.85,
          refreshBadge() {
            if (badgeMesh.userData.badgeCanvas && badgeMesh.userData.badgeTexture) {
              drawAgentBadgeCanvas(badgeMesh.userData.badgeCanvas, newAgentData);
              badgeMesh.userData.badgeTexture.needsUpdate = true;
            }
            ringMesh.material.color.set(newAgentData.isWorking ? '#34d399' : newAgentData.color);
          },
          updateAnimation: this.agentInstances[0]?.updateAnimation || null,
        };

        // Salin prototype updateAnimation dari instance pertama
        if (this.agentInstances[0]) {
          newInstance.updateAnimation = this.agentInstances[0].updateAnimation.bind(newInstance);
        }

        this.agentInstances.push(newInstance);
      }
    });

    // 2. Sinkronisasikan state & metadata untuk seluruh agent instances
    this.agentInstances.forEach((inst) => {
      const id = inst.data.id;
      const disk = diskMetadata[id];
      if (disk) {
        if (disk.description) inst.data.mission = disk.description;
        if (disk.filePath) {
          inst.data.description = `File Sumber Global: ${disk.filePath}`;
        }
        if (Array.isArray(disk.tools) && disk.tools.length > 0) {
          const mcpLabels = (disk.mcpServers || []).map((m) => `MCP:${m}`);
          inst.data.tools = [...mcpLabels, ...disk.tools];
        }
      }

      const workState = activeAgents[id];
      const nextWorking = Boolean(workState?.isWorking);
      const nextTask = workState?.task || '';
      const changed =
        inst.data.isWorking !== nextWorking || inst.data.currentTask !== nextTask;

      inst.data.isWorking = nextWorking;
      inst.data.currentTask = nextTask;
      inst.data.status = nextWorking ? 'executing' : 'idle';

      if (changed && typeof inst.refreshBadge === 'function') {
        inst.refreshBadge();
      }
    });
  }

  /**
   * Mengubah status kerja 1 agent spesifik secara langsung
   */
  setAgentWorking(agentId, isWorking, task = '') {
    const inst = this.agentInstances.find((a) => a.data.id === agentId);
    if (!inst) return null;

    inst.data.isWorking = Boolean(isWorking);
    inst.data.currentTask = isWorking ? task || 'Sedang Bekerja di Meja Tengah' : '';
    inst.data.status = inst.data.isWorking ? 'executing' : 'idle';
    if (typeof inst.refreshBadge === 'function') {
      inst.refreshBadge();
    }
    playAgentClickChime(isWorking ? 520 : 740, isWorking ? 920 : 460);
    return inst.data;
  }

  focusAgent(agentId) {
    const inst = this.agentInstances.find((a) => a.data.id === agentId);
    if (!inst) return;

    this.selectedAgentId = agentId;
    this.onSelectZone(null);
    this.onSelectAgent(inst.data);

    if (this.cameraMode === 'first-person') {
      this.setCameraMode('isometric');
    }

    const pos = inst.group.position;
    this.controlsLerpTarget.set(pos.x, pos.y + 0.6, pos.z);
    this.cameraLerpTarget.set(pos.x + 2.8, pos.y + 2.5, pos.z + 2.8);
    this.isCameraLerping = true;
  }

  selectAgent(agentId) {
    if (!agentId) {
      this.selectedAgentId = null;
      this.onSelectAgent(null);
      return;
    }
    this.focusAgent(agentId);
  }

  focusZone(zoneKey) {
    const zone = OFFICE_ZONES[zoneKey];
    if (!zone) return;

    if (this.cameraMode === 'first-person') {
      this.setCameraMode('isometric');
    }

    this.selectedAgentId = null;
    this.onSelectAgent(null);
    this.onSelectZone(zone);

    this.controlsLerpTarget.set(...zone.cameraTarget);
    this.cameraLerpTarget.set(...zone.cameraPos);
    this.isCameraLerping = true;
  }

  resetCameraIsometric() {
    this.controlsLerpTarget.set(0, 1.0, 1.0);
    this.cameraLerpTarget.set(0, 18.5, 22.5);
    this.isCameraLerping = true;
  }

  setInputBlocked(blocked) {
    this.isInputBlocked = Boolean(blocked);
    if (blocked) {
      this.keys = {};
    }
  }

  handleResize() {
    if (!this.container) return;
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}
