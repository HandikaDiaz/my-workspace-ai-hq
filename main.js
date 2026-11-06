const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const pty = require('node-pty');

let mainWindow = null;
let widgetWindow = null;
const ptySessions = new Map();

// Lokasi folder global custom agents (Single Source of Truth)
const GLOBAL_AGENTS_DIR =
  process.env.ANTIGRAVITY_AGENTS_DIR || path.join(os.homedir(), '.agents', 'agents');
const ACTIVE_STATE_PATH = path.join(GLOBAL_AGENTS_DIR, 'active-state.json');
const ANTIGRAVITY_BRAIN_DIR = path.join(os.homedir(), '.gemini', 'antigravity-cli', 'brain');
const CODEX_HOME = path.join(os.homedir(), '.codex');
const CODEX_HISTORY_PATH = path.join(CODEX_HOME, 'history.jsonl');
const CODEX_SESSIONS_DIR = path.join(CODEX_HOME, 'sessions');

/**
 * Mendapatkan daftar ID seluruh agen yang ada di folder C:\Users\HP\.agents\agents secara dinamis
 */
function getDiscoveredAgentIds() {
  try {
    if (!fs.existsSync(GLOBAL_AGENTS_DIR)) return [];
    return fs
      .readdirSync(GLOBAL_AGENTS_DIR)
      .filter((file) => file.endsWith('.md') && file.toLowerCase() !== 'readme.md')
      .map((file) => file.slice(0, -3));
  } catch (err) {
    console.error('[AgentDiscovery] Gagal membaca folder agen:', err.message);
    return [];
  }
}

/**
 * Mem-parsing frontmatter YAML sederhana dari file Markdown (.md) agen di C:\Users\HP\.agents\agents
 */
function parseAgentMarkdownFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf8');
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return null;

    const yamlBlock = match[1];
    const meta = { tools: [], mcpServers: [] };
    let currentListKey = null;

    for (const rawLine of yamlBlock.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;

      if (line.startsWith('- ') && currentListKey) {
        const val = line.slice(2).trim();
        if (currentListKey === 'tools') meta.tools.push(val);
        if (currentListKey === 'mcp_servers') meta.mcpServers.push(val);
        continue;
      }

      const kvMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1];
        const value = kvMatch[2].trim();
        if (!value) {
          currentListKey = key;
        } else {
          currentListKey = null;
          meta[key] = value.replace(/^['"]|['"]$/g, '');
        }
      }
    }
    return meta;
  } catch (err) {
    console.error(`[AgentParser] Gagal membaca file agen ${filePath}:`, err.message);
    return null;
  }
}

/**
 * Membaca seluruh metadata dari SEMUA file .md agen di C:\Users\HP\.agents\agents secara dinamis
 */
function readAllAgentMarkdownMetadata() {
  const result = {};
  try {
    const discoveredIds = getDiscoveredAgentIds();
    for (const id of discoveredIds) {
      const mdPath = path.join(GLOBAL_AGENTS_DIR, `${id}.md`);
      const parsed = parseAgentMarkdownFile(mdPath);
      if (parsed) {
        result[id] = {
          name: parsed.name || id,
          description: parsed.description || '',
          model: parsed.model || 'inherit',
          mainAgent: parsed.mainAgent === 'true',
          subagent: parsed.subagent === 'true',
          tools: parsed.tools || [],
          mcpServers: parsed.mcpServers || [],
          color: parsed.color || null,
          role: parsed.role || null,
          division: parsed.division || null,
          type: parsed.type || null,
          filePath: mdPath,
        };
      }
    }
  } catch (err) {
    console.error('[AgentLoader] Gagal memuat metadata agen:', err.message);
  }
  return result;
}

/**
 * Membaca state kerja real-time dari C:\Users\HP\.agents\agents\active-state.json
 */
function readActiveState() {
  const discoveredIds = getDiscoveredAgentIds();
  try {
    if (fs.existsSync(ACTIVE_STATE_PATH)) {
      const content = fs.readFileSync(ACTIVE_STATE_PATH, 'utf8');
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed.activeAgents === 'object') {
        // Pastikan agen baru yang belum tercatat otomatis mendapat default state
        let updated = false;
        for (const id of discoveredIds) {
          if (!parsed.activeAgents[id]) {
            parsed.activeAgents[id] = { isWorking: false, task: '' };
            updated = true;
          }
        }
        if (updated) {
          writeActiveState(parsed);
        }
        return parsed;
      }
    }
  } catch (err) {
    console.error('[ActiveState] Gagal membaca active-state.json:', err.message);
  }

  const defaultAgents = {};
  for (const id of discoveredIds) {
    defaultAgents[id] = { isWorking: false, task: '' };
  }
  return {
    updatedAt: new Date().toISOString(),
    activeAgents: defaultAgents,
  };
}

/**
 * Menyimpan perubahan state kerja ke C:\Users\HP\.agents\agents\active-state.json
 */
function writeActiveState(stateObj) {
  try {
    fs.mkdirSync(GLOBAL_AGENTS_DIR, { recursive: true });
    const payload = {
      updatedAt: new Date().toISOString(),
      activeAgents: stateObj.activeAgents || {},
    };
    fs.writeFileSync(ACTIVE_STATE_PATH, JSON.stringify(payload, null, 2), 'utf8');
    return payload;
  } catch (err) {
    console.error('[ActiveState] Gagal menulis active-state.json:', err.message);
    return stateObj;
  }
}

/**
 * Mengirimkan event perubahan state agen ke window renderer 3D Office & Floating Widget
 */
function broadcastAgentState() {
  try {
    const state = readActiveState();
    const diskMetadata = readAllAgentMarkdownMetadata();
    const payload = {
      agentsDir: GLOBAL_AGENTS_DIR,
      updatedAt: state.updatedAt,
      activeAgents: state.activeAgents,
      diskMetadata,
    };
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('agents:stateChanged', payload);
    }
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      widgetWindow.webContents.send('agents:stateChanged', payload);
    }
  } catch (err) {
    console.error('[BroadcastState] Error:', err.message);
  }
}

// Tentukan default shell sesuai OS
const getShell = () => {
  if (process.platform === 'win32') {
    return 'powershell.exe';
  }
  return process.env.SHELL || '/bin/bash';
};

// Buat sesi PTY baru dengan ID tertentu (untuk multi-tab)
function createSession(id, cols = 80, rows = 24) {
  if (ptySessions.has(id)) {
    try {
      ptySessions.get(id).kill();
    } catch (e) {}
    ptySessions.delete(id);
  }

  const shell = getShell();
  const cwd = process.cwd();

  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-256color',
    cols: cols > 0 ? cols : 80,
    rows: rows > 0 ? rows : 24,
    cwd: cwd,
    env: process.env,
  });

  ptyProcess.onData((data) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('terminal:data', { id, data });
    }
  });

  ptyProcess.onExit(({ exitCode, signal }) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('terminal:exit', { id, exitCode, signal });
    }
    ptySessions.delete(id);
  });

  ptySessions.set(id, ptyProcess);
}

function killAllSessions() {
  for (const [_id, proc] of ptySessions.entries()) {
    try {
      proc.kill();
    } catch (e) {}
  }
  ptySessions.clear();
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 850,
    minHeight: 550,
    title: 'My Workspace — 9 Custom Agents 3D HQ',
    frame: false,
    backgroundColor: '#090d14',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  // Keyboard Shortcuts Global untuk Development
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'i') {
      mainWindow.webContents.toggleDevTools();
      event.preventDefault();
    }
    if (input.key === 'F5' || (input.control && input.key.toLowerCase() === 'r')) {
      mainWindow.webContents.reloadIgnoringCache();
      event.preventDefault();
    }
  });

  // Watcher 1: Live Reload otomatis saat ada perubahan file di folder src/
  let reloadTimeout = null;
  try {
    const srcDir = path.join(__dirname, 'src');
    fs.watch(srcDir, { recursive: true }, (_eventType, filename) => {
      if (filename && !filename.endsWith('~') && mainWindow && !mainWindow.isDestroyed()) {
        clearTimeout(reloadTimeout);
        reloadTimeout = setTimeout(() => {
          console.log(`[Live Reload] Perubahan terdeteksi: ${filename}`);
          mainWindow.webContents.reloadIgnoringCache();
        }, 150);
      }
    });
  } catch (err) {
    console.warn('Gagal mengaktifkan live reload watcher:', err.message);
  }

  // Watcher 2: Real-Time Watcher untuk C:\Users\HP\.agents\agents (active-state.json & *.md)
  let agentWatchTimeout = null;
  try {
    if (fs.existsSync(GLOBAL_AGENTS_DIR)) {
      fs.watch(GLOBAL_AGENTS_DIR, { recursive: false }, (_eventType, filename) => {
        if (!filename || filename.endsWith('~')) return;
        clearTimeout(agentWatchTimeout);
        agentWatchTimeout = setTimeout(() => {
          broadcastAgentState();
        }, 80);
      });
    }
  } catch (err) {
    console.warn('[AgentWatcher] Gagal memantau folder global agents:', err.message);
  }

  // Watcher 3: Pantau aktivitas subagent dari transcript Antigravity terbaru (opsional auto-detect)
  let transcriptWatchTimeout = null;
  let mainAgentIdleTimer = null;
  try {
    if (fs.existsSync(ANTIGRAVITY_BRAIN_DIR)) {
      fs.watch(ANTIGRAVITY_BRAIN_DIR, { recursive: true }, (_eventType, filename) => {
        if (!filename || !filename.endsWith('transcript.jsonl')) return;
        clearTimeout(transcriptWatchTimeout);
        transcriptWatchTimeout = setTimeout(() => {
          try {
            const fullPath = path.join(ANTIGRAVITY_BRAIN_DIR, filename);
            if (!fs.existsSync(fullPath)) return;
            const stats = fs.statSync(fullPath);
            const readSize = Math.min(stats.size, 16384);
            const fd = fs.openSync(fullPath, 'r');
            const buffer = Buffer.alloc(readSize);
            fs.readSync(fd, buffer, 0, readSize, Math.max(0, stats.size - readSize));
            fs.closeSync(fd);

            const tailLines = buffer.toString('utf8').trim().split(/\r?\n/);
            const lastLine = tailLines[tailLines.length - 1];
            if (!lastLine) return;
            const step = JSON.parse(lastLine);

            const currentState = readActiveState();
            let changed = false;

            // 1. Jika ada user input baru atau Main Agent sedang membalas/eksekusi
            if (step.source === 'USER_EXPLICIT' && step.type === 'USER_INPUT') {
              if (currentState.activeAgents['main-orchestrator']) {
                currentState.activeAgents['main-orchestrator'] = {
                  isWorking: true,
                  task: 'Merespons instruksi User & Mengorkestrasi sistem',
                };
                changed = true;
              }
              // Reset timer idle jika user baru saja mengirim prompt
              if (mainAgentIdleTimer) {
                clearTimeout(mainAgentIdleTimer);
                mainAgentIdleTimer = null;
              }
            } else if (step.source === 'MODEL' && step.type === 'PLANNER_RESPONSE') {
              if (currentState.activeAgents['main-orchestrator']) {
                currentState.activeAgents['main-orchestrator'] = {
                  isWorking: true,
                  task: 'Sedang mengeksekusi kode / merespons prompt',
                };
                changed = true;
              }

              // Fitur Auto-Idle Timer (15 Detik):
              // Setelah respons/turn selesai dan tidak ada pemanggilan tool lagi,
              // Main Agent otomatis kembali ke pos Ruang CEO (isWorking: false).
              if (mainAgentIdleTimer) clearTimeout(mainAgentIdleTimer);
              mainAgentIdleTimer = setTimeout(() => {
                const latestState = readActiveState();
                if (latestState.activeAgents?.['main-orchestrator']?.isWorking) {
                  latestState.activeAgents['main-orchestrator'] = {
                    isWorking: false,
                    task: '',
                  };
                  writeActiveState(latestState);
                  broadcastAgentState();
                  console.log('[Auto-Idle] Main Orchestrator otomatis kembali santai ke Ruang CEO (15 detik idle)');
                }
              }, 15000);
            }

            // 2. Deteksi pemanggilan sub-agent via invoke_subagent
            if (step.tool_calls && Array.isArray(step.tool_calls)) {
              for (const call of step.tool_calls) {
                if (call.name === 'invoke_subagent' && call.args?.TypeName) {
                  const targetId = call.args.TypeName;
                  if (currentState.activeAgents[targetId]) {
                    currentState.activeAgents[targetId] = {
                      isWorking: true,
                      task: call.args.Role || 'Menjalankan tugas sub-agent',
                    };
                    changed = true;
                  }
                }
              }
            }

            if (changed) {
              writeActiveState(currentState);
              broadcastAgentState();
            }
          } catch (_e) {
            // Abaikan jika JSON line sedang ditulis parsial
          }
        }, 180);
      });
    }
  } catch (err) {
    console.warn('[TranscriptWatcher] Info:', err.message);
  }

  // Watcher 4A: Tangkap input prompt baru secara INSTAN saat User menekan Enter di Codex CLI (Thinking Phase)
  let codexIdleTimer = null;
  let lastKnownCodexHistoryLine = '';

  function handleCodexPromptSubmit() {
    try {
      if (!fs.existsSync(CODEX_HISTORY_PATH)) return;
      const stats = fs.statSync(CODEX_HISTORY_PATH);
      const readSize = Math.min(stats.size, 4096);
      const fd = fs.openSync(CODEX_HISTORY_PATH, 'r');
      const buffer = Buffer.alloc(readSize);
      fs.readSync(fd, buffer, 0, readSize, Math.max(0, stats.size - readSize));
      fs.closeSync(fd);

      const lines = buffer.toString('utf8').trim().split(/\r?\n/);
      const lastLine = lines[lines.length - 1];
      if (!lastLine || lastLine === lastKnownCodexHistoryLine) return;
      lastKnownCodexHistoryLine = lastLine;

      let taskDesc = 'Codex: Sedang berpikir & memproses instruksi...';
      try {
        const parsed = JSON.parse(lastLine);
        if (parsed.text) {
          const preview = parsed.text.length > 35 ? parsed.text.slice(0, 35) + '...' : parsed.text;
          taskDesc = `Codex Berpikir: "${preview}"`;
        }
      } catch (_e) {}

      const currentState = readActiveState();
      if (currentState.activeAgents?.['main-orchestrator']) {
        currentState.activeAgents['main-orchestrator'] = {
          isWorking: true,
          task: taskDesc,
        };
        writeActiveState(currentState);
        broadcastAgentState();
        console.log('[Codex Instant] Prompt diterima -> Main Agent seketika ke meja tengah:', taskDesc);
      }
      if (codexIdleTimer) {
        clearTimeout(codexIdleTimer);
        codexIdleTimer = null;
      }
    } catch (_e) {}
  }

  try {
    if (fs.existsSync(CODEX_HOME)) {
      fs.watch(CODEX_HOME, { recursive: false }, (_eventType, filename) => {
        if (filename && filename.toLowerCase() === 'history.jsonl') {
          handleCodexPromptSubmit();
        }
      });
      if (fs.existsSync(CODEX_HISTORY_PATH)) {
        fs.watchFile(CODEX_HISTORY_PATH, { interval: 80 }, () => {
          handleCodexPromptSubmit();
        });
      }
    }
  } catch (err) {
    console.warn('[CodexHistoryWatcher] Info:', err.message);
  }

  // Watcher 4B: Pantau respons stream & tool execution Codex dari folder sessions rollout (*.jsonl)
  let codexWatchTimeout = null;
  try {
    if (fs.existsSync(CODEX_SESSIONS_DIR)) {
      fs.watch(CODEX_SESSIONS_DIR, { recursive: true }, (_eventType, filename) => {
        if (!filename || !filename.endsWith('.jsonl')) return;
        clearTimeout(codexWatchTimeout);
        codexWatchTimeout = setTimeout(() => {
          try {
            const fullPath = path.join(CODEX_SESSIONS_DIR, filename);
            if (!fs.existsSync(fullPath)) return;
            const stats = fs.statSync(fullPath);
            const readSize = Math.min(stats.size, 16384);
            const fd = fs.openSync(fullPath, 'r');
            const buffer = Buffer.alloc(readSize);
            fs.readSync(fd, buffer, 0, readSize, Math.max(0, stats.size - readSize));
            fs.closeSync(fd);

            const tailLines = buffer.toString('utf8').trim().split(/\r?\n/);
            const lastLine = tailLines[tailLines.length - 1];
            if (!lastLine) return;
            const event = JSON.parse(lastLine);

            const currentState = readActiveState();
            let changed = false;

            const isStarting = event.type === 'event_msg' && event.payload?.type === 'task_started';
            const isWorkingResponse = event.type === 'response_item';
            const isComplete = event.type === 'event_msg' && event.payload?.type === 'task_complete';

            if (isStarting || isWorkingResponse) {
              if (currentState.activeAgents['main-orchestrator']) {
                currentState.activeAgents['main-orchestrator'] = {
                  isWorking: true,
                  task: 'Codex CLI: Sedang mengeksekusi tugas / merespons',
                };
                changed = true;
              }
              if (codexIdleTimer) {
                clearTimeout(codexIdleTimer);
                codexIdleTimer = null;
              }
            }

            if (isComplete || isWorkingResponse) {
              if (codexIdleTimer) clearTimeout(codexIdleTimer);
              const idleDelay = isComplete ? 8000 : 15000;
              codexIdleTimer = setTimeout(() => {
                const latestState = readActiveState();
                if (latestState.activeAgents?.['main-orchestrator']?.isWorking) {
                  latestState.activeAgents['main-orchestrator'] = {
                    isWorking: false,
                    task: '',
                  };
                  writeActiveState(latestState);
                  broadcastAgentState();
                  console.log('[Auto-Idle] Main Orchestrator kembali ke Ruang CEO setelah aktivitas Codex selesai');
                }
              }, idleDelay);
            }

            if (changed) {
              writeActiveState(currentState);
              broadcastAgentState();
            }
          } catch (_e) {
            // Abaikan jika JSON line sedang ditulis parsial
          }
        }, 120);
      });
    }
  } catch (err) {
    console.warn('[CodexWatcher] Info:', err.message);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      widgetWindow.close();
      widgetWindow = null;
    }
    killAllSessions();
  });

  // Saat Window Utama di-minimize, tampilkan Desktop Pet Floating Widget!
  mainWindow.on('minimize', () => {
    showFloatingWidget();
  });

  // Saat Window Utama di-restore, sembunyikan widget
  mainWindow.on('restore', () => {
    hideFloatingWidget();
  });

  mainWindow.on('focus', () => {
    if (mainWindow.isVisible() && !mainWindow.isMinimized()) {
      hideFloatingWidget();
    }
  });
};

/**
 * Membuat atau menampilkan Desktop Pet Floating Astronaut Widget
 */
function createWidgetWindow() {
  if (widgetWindow && !widgetWindow.isDestroyed()) return;

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenW, height: screenH } = primaryDisplay.workAreaSize;
  const widgetW = 220;
  const widgetH = 260;

  // Letakkan di pojok kanan bawah desktop (di atas taskbar)
  const posX = Math.round(screenW - widgetW - 24);
  const posY = Math.round(screenH - widgetH - 24);

  widgetWindow = new BrowserWindow({
    width: widgetW,
    height: widgetH,
    x: posX,
    y: posY,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'widget-preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  widgetWindow.loadFile(path.join(__dirname, 'src', 'widget.html'));

  widgetWindow.on('closed', () => {
    widgetWindow = null;
  });
}

function showFloatingWidget() {
  if (!widgetWindow || widgetWindow.isDestroyed()) {
    createWidgetWindow();
  }
  widgetWindow.show();
  broadcastAgentState();
}

function hideFloatingWidget() {
  if (widgetWindow && !widgetWindow.isDestroyed() && widgetWindow.isVisible()) {
    widgetWindow.hide();
  }
}

// --- IPC WINDOW CONTROLS ---
ipcMain.on('window:minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
    showFloatingWidget();
  }
});

// IPC Handler dari Floating Widget
ipcMain.on('widget:restoreMainWindow', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.show();
    mainWindow.focus();
    hideFloatingWidget();
  }
});

ipcMain.on('widget:closeWidget', () => {
  hideFloatingWidget();
});

ipcMain.on('window:maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window:close', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.handle('app:getCwd', () => {
  return process.cwd();
});

// --- IPC CUSTOM AGENTS STATE & SYNC ---
ipcMain.handle('agents:getState', () => {
  try {
    const state = readActiveState();
    const diskMetadata = readAllAgentMarkdownMetadata();
    return {
      agentsDir: GLOBAL_AGENTS_DIR,
      updatedAt: state.updatedAt,
      activeAgents: state.activeAgents,
      diskMetadata,
    };
  } catch (err) {
    console.error('[IPC agents:getState] Error:', err.message);
    return {
      agentsDir: GLOBAL_AGENTS_DIR,
      updatedAt: new Date().toISOString(),
      activeAgents: {},
      diskMetadata: {},
    };
  }
});

ipcMain.handle('agents:setWorking', (_event, { agentId, isWorking, task }) => {
  try {
    const state = readActiveState();
    if (!state.activeAgents) state.activeAgents = {};
    state.activeAgents[agentId] = {
      isWorking: Boolean(isWorking),
      task: isWorking ? task || 'Sedang mengerjakan tugas di Meja Rakit Tengah' : '',
    };
    const saved = writeActiveState(state);
    broadcastAgentState();
    return { ok: true, state: saved };
  } catch (err) {
    console.error('[IPC agents:setWorking] Error:', err.message);
    return { ok: false, message: 'Gagal memperbarui status kerja agen.' };
  }
});

ipcMain.handle('agents:setAllWorking', (_event, { isWorking, task }) => {
  try {
    const state = readActiveState();
    const discoveredIds = getDiscoveredAgentIds();
    for (const id of discoveredIds) {
      state.activeAgents[id] = {
        isWorking: Boolean(isWorking),
        task: isWorking ? task || 'Kolaborasi Tim di Meja Rakit Utama' : '',
      };
    }
    const saved = writeActiveState(state);
    broadcastAgentState();
    return { ok: true, state: saved };
  } catch (err) {
    console.error('[IPC agents:setAllWorking] Error:', err.message);
    return { ok: false, message: 'Gagal memperbarui status seluruh agen.' };
  }
});

// --- IPC TERMINAL SESSIONS ---
ipcMain.on('terminal:create', (_event, { id, cols, rows }) => {
  createSession(id, cols, rows);
});

ipcMain.on('terminal:write', (_event, { id, data }) => {
  const session = ptySessions.get(id);
  if (session) {
    session.write(data);
  }
});

ipcMain.on('terminal:resize', (_event, { id, cols, rows }) => {
  const session = ptySessions.get(id);
  if (session && cols > 0 && rows > 0) {
    try {
      session.resize(cols, rows);
    } catch (e) {}
  }
});

ipcMain.on('terminal:close', (_event, { id }) => {
  const session = ptySessions.get(id);
  if (session) {
    try {
      session.kill();
    } catch (e) {}
    ptySessions.delete(id);
  }
});

ipcMain.on('terminal:restart', (_event, { id }) => {
  createSession(id);
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    killAllSessions();
    app.quit();
  }
});
