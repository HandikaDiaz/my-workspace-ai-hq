# 🛸 My Workspace — 3D Outer-Space AI Multi-Agent HQ

Aplikasi desktop interaktif berbasis **Electron**, **Three.js**, dan **node-pty** yang memvisualisasikan markas stasiun luar angkasa (*Outer-Space Office*) untuk ekosistem **Custom Multi-Agent System** secara *real-time*.

Aplikasi ini terhubung langsung secara dua arah (*bi-directional*) dengan agen kustom di `C:\Users\HP\.agents\agents` dan aktivitas AI di Google Antigravity.

---

## 🌟 Fitur Utama

1. **3D Interactive Outer-Space Island (Three.js)**
   - Markas stasiun antariksa futuristik lengkap dengan pencahayaan kosmik, kabut nebula, kubah kaca, dan 2.000+ bintang.
   - Karakter astronot **Commander Diaz (CEO / Chief Architect)** yang dapat digerakkan secara bebas menggunakan tombol **WASD + Spasi (Jetpack)**.
   - Mode kamera ganda: **Isometric Overview** dan **First-Person Visor HUD**.

2. **Real-Time Multi-Agent Workbench Sync**
   - **Pergerakan Agen Selektif**: Agen yang sedang diberi tugas (`isWorking: true`) akan otomatis berjalan atau terbang ke **Meja Rakit Utama (Tengah)**, mengaktifkan hologram perakitan, dan menyalakan animasi las percikan api.
   - Agen yang sedang santai (`isWorking: false`) tetap berada di mode **Idle Roam** (berkeliling santai di ruangan divisinya).

3. **Dynamic Auto-Discovery Agen Baru**
   - Mendeteksi penambahan file `.md` baru di `C:\Users\HP\.agents\agents` secara otomatis tanpa perlu restart aplikasi.
   - Sistem langsung membuatkan avatar 3D (Robot Android / Drone), badge nama 3D, serta stasiun kerja di meja tengah.

4. **Multi-Tab Terminal Modal (Campbell Dark)**
   - Terminal mengambang bertenaga **node-pty** & **xterm.js** dengan dukungan multi-tab.
   - Buka/tutup terminal kapan saja menggunakan tombol di titlebar atau shortcut `Ctrl + ` ` (backtick).

---

## 🤖 Struktur Tim Custom Agents (C:\Users\HP\.agents\agents)

| ID Agen | Nama Agen | Tipe Avatar | Divisi / Peran Utama |
| :--- | :--- | :--- | :--- |
| `main-orchestrator` | **Main Orchestrator** | 🤖 Android Emas | Lead Engineer, Orkestrasi Tugas & Pemegang `.env` |
| `discovery-researcher` | **Discovery Researcher** | 🛸 Drone | Riset Masalah Klien & Validasi Problem Hackathon |
| `solution-architect` | **Solution Architect** | 🤖 Android Ungu | Clean Architecture, Desain Database & Skema Sistem |
| `fullstack-builder` | **Fullstack Builder** | 🤖 Android Oranye | Implementasi Web, Mobile & Integrasi AI (React/Next/Node) |
| `qa-security-auditor` | **QA & Security Auditor** | 🛸 Drone Hijau | Integration Testing, Audit OWASP, Midtrans & Clerk |
| `pitch-delivery-specialist`| **Pitch & Delivery Specialist** | 🤖 Android Pink | Pitch Deck Hackathon, Demo Script & Dokumentasi Proyek |
| `game-designer-architect` | **Game Designer Architect**| 🤖 Android Kuning | GDD, Core Gameplay Loop & Mekanik Roblox/Godot |
| `roblox-luau-specialist` | **Roblox Luau Specialist** | 🤖 Android Merah | Scripting Luau Strict, Server-Authoritative & DataStore |
| `godot-engine-specialist` | **Godot Engine Specialist**| 🛸 Drone Lavender | Godot 4.7.1, GDScript, Autonomous Godot MCP Server |
| `devops-pipeline-specialist`| **DevOps Pipeline Specialist**| 🛸 Drone Cyan | CI/CD GitHub Actions, Docker & Cloud Infrastructure |

---

## 🚀 Panduan Instalasi & Menjalankan

### 1. Prasyarat Sistem
- **Node.js** versi LTS (v18 ke atas disarankan).
- **Windows / macOS / Linux**.
- Build Tools C++ untuk kompilasi `node-pty` (di Windows otomatis terpasang jika menggunakan Node.js installer standar atau Visual Studio Build Tools).

### 2. Instalasi Dependensi
Buka terminal di root direktori proyek, lalu jalankan:
```bash
npm install
```

### 3. Menjalankan Aplikasi

#### Mode Standar (Produksi):
```bash
npm start
```

#### Mode Development (Live Reload & Nodemon):
```bash
npm run dev
```
- Otomatis me-restart aplikasi jika file `main.js` atau `preload.js` diubah.
- Otomatis me-reload tampilan UI seketika file di `src/` (HTML, CSS, JS) disimpan.

---

## ⌨️ Shortcut Keyboard & Navigasi

- **WASD / Tombol Panah**: Menggerakkan Commander Diaz.
- **Spasi**: Mengaktifkan Jetpack / Melompat.
- **Shift (Tahan)**: Sprint / Lari Cepat.
- **Klik Kiri pada Agen**: Memfokuskan kamera dan membuka kartu inspeksi agen (*Inspector Card*).
- **Klik ⚡ pada Roster**: Memerintahkan agen tertentu untuk bekerja ke Meja Tengah secara instan.
- **Ctrl + ` (Backtick)**: Buka / Tutup Floating Terminal Modal.
- **Ctrl + Shift + T**: Membuka tab terminal baru.
- **Ctrl + Shift + W**: Menutup tab terminal aktif.
- **F5 / Ctrl + R**: Reload antarmuka 3D secara manual.
- **Ctrl + Shift + I**: Membuka / Menutup Chrome Developer Tools.

---

## ⚡ Arsitektur Multi-CLI & Zero-Token (100% Gratis Token)

### 1. Apakah Visual 3D Ini Mengonsumsi Kuota Token AI?
**SAMA SEKALI TIDAK (0 Token).**
- Visual 3D Three.js, pergerakan robot, efek partikel, dan animasi obor las berjalan **100% secara lokal** di GPU/CPU komputer Anda melalui proses Electron.
- Sinkronisasi state dilakukan melalui pemantauan file lokal (*Single Source of Truth* di `C:\Users\HP\.agents\agents\active-state.json`) via internal OS file watcher (`fs.watch`) dengan latensi hanya ~80ms.
- **Token AI hanya terpakai** ketika Anda sedang mengirimkan prompt percakapan teks ke LLM/Agent untuk menghasilkan analisis atau kode program, bukan untuk animasi pergerakan visualnya.

### 2. Kompatibilitas dengan CLI Lain (Claude Code, Codex, Aider, Cursor, dll.)
Aplikasi ini dirancang agnostik (*universal*), tidak terkunci hanya pada Google Antigravity. Anda dapat mengontrol pergerakan agen dari CLI mana pun dengan cara:
- **Operasi File JSON Sederhana**: CLI atau hook script eksternal cukup mengedit status agen di `active-state.json`.
- **Eksekusi Sekali Jalan**:
  ```bash
  node -e "const fs=require('fs'); const p='C:/Users/HP/.agents/agents/active-state.json'; const d=JSON.parse(fs.readFileSync(p)); d.activeAgents['fullstack-builder']={isWorking:true, task:'Claude Code sedang refactor API'}; fs.writeFileSync(p, JSON.stringify(d,null,2));"
  ```
  Dalam ~80ms, robot yang bersangkutan di layar 3D akan langsung bergegas ke Meja Rakit Utama!

---

## 📁 Struktur Direktori

```text
My Workspace/
├── main.js                  # Electron Main Process, Dynamic Agent Discovery & State Watcher
├── preload.js               # Context Bridge & IPC APIs (agentsAPI, terminalAPI, windowAPI)
├── package.json             # Konfigurasi dependensi Electron, Three.js, xterm, node-pty
├── README.md                # Dokumentasi proyek & panduan setup
└── src/
    ├── index.html           # Layout utama UI, HUD Titlebar, Roster Drawer, Inspector Card
    ├── styles.css           # Styling Sci-Fi Glassmorphism & layout responsif
    ├── renderer.js          # Pengendali UI, event listener, dan IPC state binding
    ├── office3d.js          # Engine 3D Three.js (Procedural Space Office, Agents, Animasi)
    └── vendor/              # Library Three.js & OrbitControls lokal
```

---

*Dikembangkan dengan arsitektur multi-agen otonom untuk pengalaman kolaborasi software engineering generasi baru.*
