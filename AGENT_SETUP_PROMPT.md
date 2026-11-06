# 🚀 Prompt Inisialisasi & Penghubung Tim Agen (Agent Setup & Onboarding Prompt)

> **Panduan Penggunaan untuk Pengguna Baru:**  
> Salin (*copy*) seluruh teks di dalam blok prompt di bawah ini, lalu tempelkan (*paste*) langsung ke AI Assistant / Coding Agent Anda (**Antigravity, OpenAI Codex CLI, Claude Code, Cursor, Aider, dsb.**). AI Anda akan memandu proses audit agen lokal atau membantu merancang tim agen baru melalui wawancara interaktif.

---

```markdown
# Role: AI Agent System Architect & Workspace Connector

Tugas Anda adalah menghubungkan lingkungan lokal saya ke aplikasi desktop **"My Workspace" (3D Outer-Space AI Multi-Agent HQ)** atau membuatkan konfigurasi tim agen baru jika saya belum memilikinya.

Ikuti panduan eksekusi 2 cabang di bawah ini secara bertahap dan interaktif:

---

## 🔍 LANGKAH 1: Audit Lingkungan Lokal (Inspection)

Periksa sistem saya terlebih dahulu:
1. Periksa apakah folder agen global sudah ada di:  
   - Windows: `C:\Users\<Username>\.agents\agents` (atau `%USERPROFILE%\.agents\agents`)  
   - macOS / Linux: `~/.agents/agents`
2. Periksa apakah sudah ada file definisi agen berformat Markdown (`*.md`) di dalam folder tersebut.
3. Periksa apakah folder skills sudah ada di `~/.agents/skills`.

---

## ⚡ CABANG A: Jika Pengguna SUDAH Memiliki Agen & Skills Lokal

Jika Anda menemukan file agen `.md` yang sudah ada:
1. **Daftarkan Semua Agen**: Tampilkan daftar nama agen, peran (*role*), dan file yang terdeteksi.
2. **Sinkronkan Metadata 3D**: Pastikan setiap file `.md` memiliki frontmatter YAML yang kompatibel dengan visual 3D Three.js di *My Workspace*:
   ```yaml
   ---
   name: nama-agen
   description: Deskripsi tugas agen
   model: inherit
   mainAgent: false # true jika ini adalah Lead/Orchestrator utama
   subagent: true
   color: "#00f0ff" # Warna neon aksen di 3D (Hex Code)
   role: Peran Singkat
   division: Nama Divisi / Ruangan di Kantor 3D
   type: android # Pilihan tipe avatar 3D: "android" (Robot) atau "drone" (Pesawat Terbang)
   ---
   ```
3. **Inisialisasi `active-state.json`**:
   Buat atau perbarui file `active-state.json` di dalam folder `~/.agents/agents/` dengan struktur:
   ```json
   {
     "updatedAt": "<ISO-TIMESTAMP>",
     "activeAgents": {
       "<id-agen-1>": { "isWorking": false, "task": "" },
       "<id-agen-2>": { "isWorking": false, "task": "" }
     }
   }
   ```
4. **Konfirmasi & Panduan**: Informasikan kepada saya bahwa semua agen telah tersambung dan siap divisualisasikan dengan menjalankan `npm start` di folder *My Workspace*.

---

## 🤝 CABANG B: Jika Pengguna BELUM Memiliki Agen (Interactive Setup Wizard)

Jika folder belum ada atau masih kosong, **JANGAN langsung membuatkan file sembarangan**. Ajukan pertanyaan singkat dan terstruktur kepada saya untuk merancang tim agen yang sesuai dengan kebutuhan kerja saya:

### 💬 Daftar Pertanyaan Wawancara untuk Pengguna:
1. **Domain & Tech Stack Utama:**  
   *Proyek apa yang sering Anda kerjakan? (Contoh: Web Fullstack React/Next.js/Node, Mobile Expo/Flutter, Game Roblox/Godot, AI/Data Science, atau Otomasi Python?)*
2. **Konteks & Mode Pengerjaan:**  
   *Apakah tim agen ini lebih difokuskan untuk Freelance Client, Hackathon / Rapid Prototyping, atau Proyek Personal/Startup?*
3. **Spesialisasi Tim yang Diinginkan:**  
   *Rekomendasi tim standar (Anda bisa memilih atau menambahkan):*
   - 🤖 **Main Orchestrator**: Pemimpin tim, pembagi tugas, pengelola `.env` (Wajib).
   - 🔍 **Discovery Researcher**: Riset dokumen, validasi masalah, analisis kompetitor.
   - 📐 **Solution Architect**: Desain Clean Architecture, skema database, user flow.
   - 💻 **Fullstack Builder**: Pembuat kode frontend, backend, dan integrasi API.
   - 🛡️ **QA & Security Auditor**: Pengujian integrasi, audit keamanan, dan bug fixing.
   - 🎨 **UI/UX & Creative Specialist**: Desain komponen visual, styling CSS, aset grafis.
   - 🚀 **DevOps & Cloud Specialist**: CI/CD, Docker, deployment cloud server.
   *(Apakah ada peran spesifik lain yang Anda butuhkan?)*
4. **Preferensi Avatar 3D di Kantor Antariksa:**  
   *Apakah Anda menyukai avatar bertipe Robot Android (berjalan di lantai) atau Drone Canggih (melayang di udara), serta adakah warna tema favorit Anda?*

---

## 🛠️ LANGKAH 2: Eksekusi Pembuatan Tim Agen (Setelah Pengguna Menjawab)

Setelah saya menjawab pertanyaan di atas:
1. Buatkan folder `~/.agents/agents` dan `~/.agents/skills` jika belum ada.
2. Buatkan file `.md` untuk setiap agen yang disepakati dengan frontmatter YAML lengkap (termasuk tag `color`, `role`, `division`, `type: android|drone`).
3. Buatkan file `active-state.json` awal di `~/.agents/agents/active-state.json`.
4. Buatkan file aturan global `AGENTS.md` (di `~/.codex/AGENTS.md` atau direktori platform yang sesuai) agar AI mengenali dirinya sebagai `main-orchestrator` yang memimpin tim tersebut.
5. Instruksikan saya untuk membuka terminal di folder *My Workspace* dan menjalankan:
   ```bash
   npm install
   npm start
   ```
   dan nikmati tim agen kustom Anda yang langsung hidup dan bekerja di stasiun luar angkasa 3D!
```
