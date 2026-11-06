import { SpaceOffice3D, AGENTS_ROSTER, playAgentClickChime } from './office3d.js';

// Palet Warna Mewah Putih & Emas (White & Gold Theme) Khusus Terminal
const WHITE_GOLD_THEME = {
  background: '#fdfbf7', // Background Putih Gading Cerah Solid
  foreground: '#23201b', // Teks arang gelap elegan, kontras tinggi di latar putih
  cursor: '#c59b27',     // Kursor aksen Emas
  cursorAccent: '#ffffff',
  selectionBackground: 'rgba(212, 175, 55, 0.35)',
  selectionForeground: '#1e1b15',
  black: '#2c2825',
  red: '#d1242f',
  green: '#1a7f37',
  yellow: '#b8860b',
  blue: '#0969da',
  magenta: '#8250df',
  cyan: '#1b7c83',
  white: '#6e7781',
  brightBlack: '#8c857b',
  brightRed: '#cf222e',
  brightGreen: '#2da44e',
  brightYellow: '#d4af37',
  brightBlue: '#218bff',
  brightMagenta: '#a475f9',
  brightCyan: '#319795',
  brightWhite: '#24292f',
};

window.addEventListener('DOMContentLoaded', async () => {
  try {
    if (document.fonts) {
      await document.fonts.ready;
    }
  } catch (e) {}

  // State aplikasi
  let isModalOpen = false;
  let tabCounter = 0;
  let activeTabId = null;
  let currentSelectedAgent = null;
  let currentSelectedZone = null;
  let activeRosterDivision = 'all';
  let rosterSearchQuery = '';
  const tabs = new Map(); // id -> { term, fitAddon, tabEl, viewEl, title }

  // Elemen DOM Terminal Modal
  const modalOverlay = document.getElementById('terminal-modal-overlay');
  const btnToggleModal = document.getElementById('btn-toggle-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalBtnClear = document.getElementById('modal-btn-clear');
  const tabsList = document.getElementById('tabs-list');
  const btnNewTab = document.getElementById('btn-new-tab');
  const terminalViewport = document.getElementById('terminal-viewport');

  // Elemen DOM 3D Space Office & Toolbar
  const officeCanvasContainer = document.getElementById('office-canvas-container');
  const btnToggleRoster = document.getElementById('btn-toggle-roster');
  const btnToggleAssemble = document.getElementById('btn-toggle-assemble');
  const btnCamIso = document.getElementById('btn-cam-iso');
  const btnCamFps = document.getElementById('btn-cam-fps');
  const btnCamReset = document.getElementById('btn-cam-reset');
  const timeButtons = document.querySelectorAll('.time-btn');
  const zoneQuickbar = document.getElementById('zone-quickbar');
  const zonePills = document.querySelectorAll('.zone-pill');

  // Elemen FPS Visor HUD
  const fpsVisorHud = document.getElementById('fps-visor-hud');
  const fpsLockPrompt = document.getElementById('fps-lock-prompt');
  const btnExitFps = document.getElementById('btn-exit-fps');

  // Elemen Agent Roster Drawer
  const rosterDrawer = document.getElementById('agent-roster-drawer');
  const btnCloseRoster = document.getElementById('btn-close-roster');
  const rosterSearchInput = document.getElementById('roster-search-input');
  const filterTabBtns = document.querySelectorAll('.filter-tab');
  const rosterListEl = document.getElementById('roster-list');

  // Elemen Agent Inspector Card
  const agentInspectorCard = document.getElementById('agent-inspector-card');
  const agentInspBanner = document.getElementById('agent-insp-banner');
  const agentInspDot = document.getElementById('agent-insp-dot');
  const agentInspDiv = document.getElementById('agent-insp-div');
  const agentInspAvatar = document.getElementById('agent-insp-avatar');
  const agentInspEmoji = document.getElementById('agent-insp-emoji');
  const agentInspType = document.getElementById('agent-insp-type');
  const agentInspName = document.getElementById('agent-insp-name');
  const agentInspCodename = document.getElementById('agent-insp-codename');
  const agentInspRole = document.getElementById('agent-insp-role');
  const agentInspStatus = document.getElementById('agent-insp-status');
  const agentInspModel = document.getElementById('agent-insp-model');
  const agentInspZone = document.getElementById('agent-insp-zone');
  const agentInspMission = document.getElementById('agent-insp-mission');
  const agentInspDesc = document.getElementById('agent-insp-desc');
  const agentInspTools = document.getElementById('agent-insp-tools');
  const agentInspInputs = document.getElementById('agent-insp-inputs');
  const agentInspOutputs = document.getElementById('agent-insp-outputs');
  const btnFocusAgent3D = document.getElementById('btn-focus-agent-3d');
  const btnCloseAgentInsp = document.getElementById('btn-close-agent-insp');
  const btnOpenAgentTerm = document.getElementById('btn-open-agent-term');
  const btnToggleAgentWork = document.getElementById('btn-toggle-agent-work');

  // Elemen Zone Inspector Card
  const zoneInspectorCard = document.getElementById('zone-inspector-card');
  const zoneInspSub = document.getElementById('zone-insp-sub');
  const zoneInspTitle = document.getElementById('zone-insp-title');
  const zoneInspDesc = document.getElementById('zone-insp-desc');
  const btnCloseZoneInsp = document.getElementById('btn-close-zone-insp');
  const btnOpenZoneTerm = document.getElementById('btn-open-zone-term');

  // Elemen Tooltip & Status Bawah
  const hoverTooltipPill = document.getElementById('hover-tooltip-pill');
  const bottomStatusPill = document.getElementById('bottom-status-pill');
  const statusAgentsText = document.getElementById('status-agents-text');

  // Window Controls
  document.getElementById('win-close')?.addEventListener('click', () => window.windowAPI?.close());
  document.getElementById('win-minimize')?.addEventListener('click', () => window.windowAPI?.minimize());
  document.getElementById('win-maximize')?.addEventListener('click', () => window.windowAPI?.maximize());

  // ========================================================
  // INISIALISASI 3D OUTER-SPACE OFFICE (THREE.JS)
  // ========================================================
  let spaceOffice = null;
  if (officeCanvasContainer) {
    spaceOffice = new SpaceOffice3D(officeCanvasContainer, {
      onSelectAgent: (agent) => {
        currentSelectedAgent = agent;
        renderAgentInspector(agent);
        renderRosterList();
        updateBottomStatus();
      },
      onSelectZone: (zone) => {
        currentSelectedZone = zone;
        renderZoneInspector(zone);
        zonePills.forEach((pill) => {
          pill.classList.toggle('active', Boolean(zone && pill.dataset.zone === zone.id));
        });
      },
      onHoverChange: (label) => {
        if (label && spaceOffice?.cameraMode === 'isometric') {
          if (hoverTooltipPill) {
            hoverTooltipPill.textContent = label;
            hoverTooltipPill.classList.remove('hidden');
          }
        } else {
          hoverTooltipPill?.classList.add('hidden');
        }
      },
      onPointerLockChange: (locked) => {
        fpsLockPrompt?.classList.toggle('hidden', locked);
      },
      onCameraModeChange: (mode) => {
        const isFps = mode === 'first-person';
        btnCamIso?.classList.toggle('active', !isFps);
        btnCamFps?.classList.toggle('active', isFps);
        fpsVisorHud?.classList.toggle('hidden', !isFps);
        bottomStatusPill?.classList.toggle('hidden', isFps);
        zoneQuickbar?.classList.toggle('hidden', isFps);
        if (isFps) {
          hoverTooltipPill?.classList.add('hidden');
        }
      },
    });
  }

  // ========================================================
  // RENDER AGENT INSPECTOR & ROSTER DRAWER
  // ========================================================
  function renderAgentInspector(agent) {
    if (!agent) {
      agentInspectorCard?.classList.add('hidden');
      return;
    }

    zoneInspectorCard?.classList.add('hidden');
    agentInspectorCard?.classList.remove('hidden');

    if (agentInspBanner) {
      agentInspBanner.style.background = `linear-gradient(90deg, ${agent.color}35, rgba(15, 23, 42, 0.7) 85%)`;
    }
    if (agentInspDot) {
      agentInspDot.style.backgroundColor = agent.color;
      agentInspDot.style.boxShadow = `0 0 10px ${agent.color}`;
    }
    if (agentInspDiv) agentInspDiv.textContent = agent.divisionName || agent.division;

    if (agentInspAvatar) {
      agentInspAvatar.style.backgroundColor = `${agent.color}22`;
      agentInspAvatar.style.borderColor = `${agent.color}66`;
      agentInspAvatar.style.boxShadow = `0 0 18px ${agent.color}33`;
    }
    if (agentInspEmoji) {
      agentInspEmoji.textContent = agent.type === 'drone' ? '🛸' : '🤖';
    }
    if (agentInspType) {
      agentInspType.textContent = agent.type.toUpperCase();
      agentInspType.style.backgroundColor = agent.color;
    }

    if (agentInspName) agentInspName.textContent = agent.name;
    if (agentInspCodename) agentInspCodename.textContent = agent.codename;
    if (agentInspRole) agentInspRole.textContent = agent.role;

    if (agentInspStatus) {
      if (agent.isWorking) {
        agentInspStatus.textContent = '⚡ WORKING (MEJA TENGAH)';
        agentInspStatus.style.background = 'rgba(16, 185, 129, 0.25)';
        agentInspStatus.style.borderColor = '#34d399';
        agentInspStatus.style.color = '#6ee7b7';
      } else {
        agentInspStatus.textContent = '🚶 IDLE (JALAN-JALAN)';
        agentInspStatus.style.background = 'rgba(148, 163, 184, 0.14)';
        agentInspStatus.style.borderColor = 'rgba(148, 163, 184, 0.35)';
        agentInspStatus.style.color = '#cbd5e1';
      }
    }
    if (btnToggleAgentWork) {
      btnToggleAgentWork.classList.toggle('working', Boolean(agent.isWorking));
      btnToggleAgentWork.innerHTML = agent.isWorking
        ? '<span>⏹️ Selesai Kerja (Kembali Jalan-Jalan)</span>'
        : '<span>⚡ Suruh Kerja ke Meja Tengah</span>';
    }
    if (agentInspModel) {
      agentInspModel.textContent = `${agent.model.toUpperCase()} • ${agent.runtime}`;
    }
    if (agentInspZone) {
      agentInspZone.textContent = agent.isWorking
        ? '⚙️ Meja Rakit Utama (Sedang Bekerja)'
        : agent.zoneName;
    }
    if (agentInspMission) {
      agentInspMission.textContent = agent.currentTask
        ? `🔥 Tugas Saat Ini: ${agent.currentTask} — ${agent.mission}`
        : agent.mission;
      agentInspMission.style.borderLeftColor = agent.isWorking ? '#34d399' : agent.color;
    }
    if (agentInspDesc) agentInspDesc.textContent = agent.description;

    if (agentInspTools) {
      agentInspTools.innerHTML = (agent.tools || [])
        .map((t) => `<span class="insp-chip">${t}</span>`)
        .join('');
    }
    if (agentInspInputs) {
      agentInspInputs.innerHTML = (agent.inputs || [])
        .map((i) => `<li>${i}</li>`)
        .join('');
    }
    if (agentInspOutputs) {
      agentInspOutputs.innerHTML = (agent.outputs || [])
        .map((o) => `<li>${o}</li>`)
        .join('');
    }
  }

  function renderZoneInspector(zone) {
    if (!zone) {
      zoneInspectorCard?.classList.add('hidden');
      return;
    }
    agentInspectorCard?.classList.add('hidden');
    zoneInspectorCard?.classList.remove('hidden');

    if (zoneInspSub) {
      zoneInspSub.textContent = zone.subtitle;
      zoneInspSub.style.color = zone.accent;
    }
    if (zoneInspTitle) zoneInspTitle.textContent = zone.title;
    if (zoneInspDesc) zoneInspDesc.textContent = zone.description;
  }

  function updateBottomStatus() {
    if (!statusAgentsText) return;
    const workingAgents = AGENTS_ROSTER.filter((a) => a.isWorking);
    if (currentSelectedAgent) {
      const stateBadge = currentSelectedAgent.isWorking
        ? '⚡ Sedang Bekerja di Meja Tengah'
        : '🚶 Idle / Jalan-Jalan';
      statusAgentsText.innerHTML = `🎯 <strong>${currentSelectedAgent.name}</strong> (${stateBadge} • ${currentSelectedAgent.codename})`;
    } else if (spaceOffice?.isAssembling) {
      statusAgentsText.innerHTML = `⚙️ <strong>MOBILIZE ALL AKTIF:</strong> Seluruh 9 Custom Agents berkumpul di Meja Rakit Utama`;
    } else if (workingAgents.length > 0) {
      const names = workingAgents.map((a) => a.name).join(', ');
      statusAgentsText.innerHTML = `⚡ <strong>${workingAgents.length}/9 Agen Bekerja di Meja Tengah:</strong> ${names}`;
    } else {
      statusAgentsText.innerHTML = `🤖 <strong>9 Custom Agents Standby:</strong> Jalan-jalan di zona masing-masing`;
    }
  }

  async function toggleSingleAgentWork(agentId) {
    const target = AGENTS_ROSTER.find((a) => a.id === agentId);
    if (!target) return;
    const nextWorking = !target.isWorking;
    const defaultTask = nextWorking ? `Mengerjakan tugas ${target.role}` : '';

    // Optimistic UI & 3D update
    spaceOffice?.setAgentWorking(agentId, nextWorking, defaultTask);
    if (currentSelectedAgent?.id === agentId) {
      renderAgentInspector(target);
    }
    renderRosterList();
    updateBottomStatus();

    // Simpan ke C:\Users\HP\.agents\agents\active-state.json via IPC
    try {
      if (window.agentsAPI?.setWorking) {
        await window.agentsAPI.setWorking(agentId, nextWorking, defaultTask);
      }
    } catch (e) {}
  }

  function renderRosterList() {
    if (!rosterListEl) return;
    const q = rosterSearchQuery.toLowerCase().trim();

    const filtered = AGENTS_ROSTER.filter((agent) => {
      if (activeRosterDivision !== 'all' && agent.divisionKey !== activeRosterDivision) {
        return false;
      }
      if (!q) return true;
      return (
        agent.name.toLowerCase().includes(q) ||
        agent.codename.toLowerCase().includes(q) ||
        agent.role.toLowerCase().includes(q) ||
        agent.division.toLowerCase().includes(q) ||
        (agent.tools || []).some((t) => t.toLowerCase().includes(q))
      );
    });

    if (filtered.length === 0) {
      rosterListEl.innerHTML = `<div style="text-align:center;padding:24px 12px;color:#64748b;font-size:11.5px;">Tidak ada agen yang cocok dengan filter.</div>`;
      return;
    }

    rosterListEl.innerHTML = filtered
      .map((agent) => {
        const isSelected = currentSelectedAgent?.id === agent.id;
        const iconEmoji = agent.type === 'drone' ? '🛸' : '🤖';
        const isWorking = Boolean(agent.isWorking);
        const workPill = isWorking
          ? `<span class="roster-work-pill working">⚡ MEJA TENGAH</span>`
          : `<span class="roster-work-pill idle">🚶 IDLE</span>`;
        const subText = isWorking && agent.currentTask
          ? `🔥 ${agent.currentTask}`
          : `${agent.role} • ${agent.zoneName}`;

        return `
          <div class="roster-item ${isSelected ? 'selected' : ''} ${isWorking ? 'is-working' : ''}" data-agent-id="${agent.id}">
            <span class="roster-stripe" style="background-color: ${isWorking ? '#34d399' : agent.color}"></span>
            <div class="roster-item-icon" style="background-color: ${agent.color}22; border-color: ${agent.color}55;">
              ${iconEmoji}
            </div>
            <div class="roster-item-info">
              <div class="roster-item-top">
                <span class="roster-item-name">${agent.name}</span>
                <span class="roster-item-code">${agent.codename}</span>
                ${workPill}
              </div>
              <div class="roster-item-role">${subText}</div>
            </div>
            <button class="roster-quick-work-btn ${isWorking ? 'active' : ''}" data-work-agent-id="${agent.id}" title="${isWorking ? 'Hentikan kerja & kembali jalan-jalan' : 'Suruh agen ini bekerja ke Meja Tengah'}">
              ${isWorking ? '⏹️' : '⚡'}
            </button>
          </div>
        `;
      })
      .join('');

    rosterListEl.querySelectorAll('.roster-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        const workBtn = e.target.closest?.('[data-work-agent-id]');
        if (workBtn) {
          e.stopPropagation();
          const targetId = workBtn.getAttribute('data-work-agent-id');
          if (targetId) toggleSingleAgentWork(targetId);
          return;
        }

        const agentId = item.getAttribute('data-agent-id');
        if (agentId && spaceOffice) {
          playAgentClickChime();
          spaceOffice.focusAgent(agentId);
        }
      });
    });
  }

  renderRosterList();

  // Sinkronisasi awal & real-time dengan C:\Users\HP\.agents\agents\active-state.json & *.md
  function applyExternalAgentState(payload) {
    if (!payload) return;
    spaceOffice?.syncExternalState(payload);
    if (currentSelectedAgent) {
      const updated = AGENTS_ROSTER.find((a) => a.id === currentSelectedAgent.id);
      if (updated) {
        currentSelectedAgent = updated;
        renderAgentInspector(updated);
      }
    }
    renderRosterList();
    updateBottomStatus();
  }

  if (window.agentsAPI) {
    window.agentsAPI
      .getState()
      .then((initialPayload) => {
        applyExternalAgentState(initialPayload);
      })
      .catch(() => {});

    window.agentsAPI.onStateChanged((payload) => {
      applyExternalAgentState(payload);
    });
  }

  btnToggleAgentWork?.addEventListener('click', () => {
    if (currentSelectedAgent) {
      toggleSingleAgentWork(currentSelectedAgent.id);
    }
  });

  // ========================================================
  // EVENT LISTENERS TOOLBAR & DRAWER 3D SPACE OFFICE
  // ========================================================
  btnToggleRoster?.addEventListener('click', () => {
    const isHidden = rosterDrawer?.classList.toggle('hidden');
    btnToggleRoster.classList.toggle('active', !isHidden);
  });

  btnCloseRoster?.addEventListener('click', () => {
    rosterDrawer?.classList.add('hidden');
    btnToggleRoster?.classList.remove('active');
  });

  rosterSearchInput?.addEventListener('input', (e) => {
    rosterSearchQuery = e.target.value || '';
    renderRosterList();
  });

  filterTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeRosterDivision = btn.dataset.div || 'all';
      filterTabBtns.forEach((b) => b.classList.toggle('active', b === btn));
      renderRosterList();
    });
  });

  btnToggleAssemble?.addEventListener('click', async () => {
    if (!spaceOffice) return;
    const assembling = spaceOffice.toggleAssembleMode();
    btnToggleAssemble.classList.toggle('active', assembling);
    try {
      if (window.agentsAPI?.setAllWorking) {
        await window.agentsAPI.setAllWorking(assembling);
      }
    } catch (e) {}
    renderRosterList();
    if (currentSelectedAgent) renderAgentInspector(currentSelectedAgent);
    updateBottomStatus();
  });

  btnCamIso?.addEventListener('click', () => {
    spaceOffice?.setCameraMode('isometric');
  });

  btnCamFps?.addEventListener('click', () => {
    spaceOffice?.setCameraMode('first-person');
  });

  btnExitFps?.addEventListener('click', () => {
    spaceOffice?.setCameraMode('isometric');
  });

  btnCamReset?.addEventListener('click', () => {
    if (!spaceOffice) return;
    if (spaceOffice.cameraMode === 'first-person') {
      spaceOffice.setCameraMode('isometric');
    } else {
      spaceOffice.resetCameraIsometric();
    }
    zonePills.forEach((p) => p.classList.remove('active'));
  });

  timeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.time || 'night';
      spaceOffice?.setTimeOfDay(mode);
      timeButtons.forEach((b) => b.classList.toggle('active', b === btn));
    });
  });

  zonePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const zoneKey = pill.dataset.zone;
      if (zoneKey && spaceOffice) {
        playAgentClickChime(440, 660);
        spaceOffice.focusZone(zoneKey);
      }
    });
  });

  btnFocusAgent3D?.addEventListener('click', () => {
    if (currentSelectedAgent && spaceOffice) {
      playAgentClickChime();
      spaceOffice.focusAgent(currentSelectedAgent.id);
    }
  });

  btnCloseAgentInsp?.addEventListener('click', () => {
    spaceOffice?.selectAgent(null);
  });

  btnCloseZoneInsp?.addEventListener('click', () => {
    currentSelectedZone = null;
    renderZoneInspector(null);
    zonePills.forEach((p) => p.classList.remove('active'));
  });

  btnOpenAgentTerm?.addEventListener('click', () => {
    const label = currentSelectedAgent
      ? `${currentSelectedAgent.codename} (${currentSelectedAgent.name})`
      : 'Agent Shell';
    openNamedTerminalTab(label);
  });

  btnOpenZoneTerm?.addEventListener('click', () => {
    const label = currentSelectedZone ? currentSelectedZone.title : 'Sector Shell';
    openNamedTerminalTab(label);
  });

  function openNamedTerminalTab(tabTitle) {
    openTerminalModal();
    for (const [id, tabData] of tabs.entries()) {
      if (tabData.title === tabTitle) {
        switchTab(id);
        return;
      }
    }
    createTab(tabTitle);
  }

  // ========================================================
  // LOGIKA BUKA / TUTUP MODAL TERMINAL (WHITE-GOLD)
  // ========================================================
  function openTerminalModal() {
    isModalOpen = true;
    spaceOffice?.setInputBlocked(true);
    modalOverlay?.classList.add('open');
    btnToggleModal?.classList.add('active');

    setTimeout(() => {
      if (activeTabId && tabs.has(activeTabId)) {
        const activeTab = tabs.get(activeTabId);
        try {
          activeTab.fitAddon.fit();
          activeTab.term.focus();
          if (window.terminalAPI && activeTab.term.cols > 0 && activeTab.term.rows > 0) {
            window.terminalAPI.resize(activeTabId, activeTab.term.cols, activeTab.term.rows);
          }
        } catch (e) {}
      }
    }, 120);
  }

  function closeTerminalModal() {
    isModalOpen = false;
    spaceOffice?.setInputBlocked(false);
    modalOverlay?.classList.remove('open');
    btnToggleModal?.classList.remove('active');
  }

  function toggleTerminalModal() {
    if (isModalOpen) {
      closeTerminalModal();
    } else {
      openTerminalModal();
    }
  }

  btnToggleModal?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleTerminalModal();
  });

  btnCloseModal?.addEventListener('click', () => {
    closeTerminalModal();
  });

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeTerminalModal();
    }
  });

  modalBtnClear?.addEventListener('click', () => {
    if (activeTabId && tabs.has(activeTabId)) {
      const activeTab = tabs.get(activeTabId);
      activeTab.term.clear();
      activeTab.term.focus();
    }
  });

  // ========================================================
  // MANAJEMEN MULTI-TAB TERMINAL
  // ========================================================
  function createTab(customTitle = null) {
    tabCounter++;
    const tabId = `tab-${tabCounter}`;
    const isWindows = window.electronAPI?.platform() === 'win32';
    const shellName = isWindows ? 'PowerShell' : 'bash';
    const title = customTitle || `${shellName} ${tabCounter}`;

    const tabEl = document.createElement('div');
    tabEl.className = 'tab-item';
    tabEl.id = `tab-btn-${tabId}`;
    tabEl.title = title;
    tabEl.innerHTML = `
      <span class="tab-icon">&gt;_</span>
      <span class="tab-title">${title}</span>
      <span class="tab-close" title="Tutup Tab">&times;</span>
    `;

    const viewEl = document.createElement('div');
    viewEl.className = 'terminal-tab-view';
    viewEl.id = `view-${tabId}`;
    terminalViewport?.appendChild(viewEl);

    const term = new window.Terminal({
      cursorBlink: true,
      cursorStyle: 'bar',
      cursorWidth: 2,
      fontFamily: 'Cascadia Mono, Consolas, "Courier New", monospace',
      fontSize: 14,
      letterSpacing: 0,
      lineHeight: 1.2,
      theme: WHITE_GOLD_THEME,
      convertEol: true,
      scrollback: 10000,
    });

    const fitAddon = new window.FitAddon.FitAddon();
    term.loadAddon(fitAddon);

    term.attachCustomKeyEventHandler((event) => {
      if (event.ctrlKey && event.key === '`' && event.type === 'keydown') {
        toggleTerminalModal();
        return false;
      }
      if (event.ctrlKey && event.key.toLowerCase() === 'c' && term.hasSelection()) {
        navigator.clipboard.writeText(term.getSelection());
        return false;
      }
      if (event.ctrlKey && event.key.toLowerCase() === 'v' && event.type === 'keydown') {
        navigator.clipboard.readText().then((text) => {
          if (text && window.terminalAPI) {
            window.terminalAPI.write(tabId, text);
          }
        });
        return false;
      }
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 't' && event.type === 'keydown') {
        createTab();
        return false;
      }
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'w' && event.type === 'keydown') {
        closeTab(tabId);
        return false;
      }
      return true;
    });

    tabs.set(tabId, { term, fitAddon, tabEl, viewEl, title });
    tabsList?.appendChild(tabEl);

    tabEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-close')) {
        e.stopPropagation();
        closeTab(tabId);
      } else {
        switchTab(tabId);
      }
    });

    switchTab(tabId);
    term.open(viewEl);

    setTimeout(() => {
      try {
        fitAddon.fit();
        if (isModalOpen) term.focus();

        if (window.terminalAPI) {
          const cols = term.cols > 0 ? term.cols : 120;
          const rows = term.rows > 0 ? term.rows : 30;
          window.terminalAPI.create(tabId, cols, rows);

          term.onData((data) => {
            window.terminalAPI.write(tabId, data);
          });
        }
      } catch (e) {}
    }, 60);

    viewEl.addEventListener('click', () => {
      term.focus();
    });
  }

  function switchTab(tabId) {
    if (!tabs.has(tabId)) return;
    activeTabId = tabId;

    tabs.forEach((tab, id) => {
      if (id === tabId) {
        tab.tabEl.classList.add('active');
        tab.viewEl.classList.add('active');
      } else {
        tab.tabEl.classList.remove('active');
        tab.viewEl.classList.remove('active');
      }
    });

    setTimeout(() => {
      const activeTab = tabs.get(tabId);
      if (activeTab) {
        try {
          activeTab.fitAddon.fit();
          if (isModalOpen) activeTab.term.focus();
          if (window.terminalAPI && activeTab.term.cols > 0 && activeTab.term.rows > 0) {
            window.terminalAPI.resize(tabId, activeTab.term.cols, activeTab.term.rows);
          }
        } catch (e) {}
      }
    }, 40);
  }

  function closeTab(tabId) {
    if (!tabs.has(tabId)) return;

    if (tabs.size === 1) {
      createTab();
    }

    const { term, tabEl, viewEl } = tabs.get(tabId);
    term.dispose();
    tabEl.remove();
    viewEl.remove();
    tabs.delete(tabId);

    if (window.terminalAPI) {
      window.terminalAPI.close(tabId);
    }

    if (activeTabId === tabId) {
      const remainingTabs = Array.from(tabs.keys());
      if (remainingTabs.length > 0) {
        switchTab(remainingTabs[remainingTabs.length - 1]);
      }
    }
  }

  if (window.terminalAPI) {
    window.terminalAPI.onData(({ id, data }) => {
      const tab = tabs.get(id);
      if (tab) {
        tab.term.write(data);
      }
    });

    window.terminalAPI.onExit(({ id, exitCode }) => {
      const tab = tabs.get(id);
      if (tab) {
        tab.term.write(`\r\n\x1b[90m[Proses shell selesai dengan exit code: ${exitCode}]\x1b[0m\r\n`);
      }
    });
  }

  btnNewTab?.addEventListener('click', (e) => {
    e.preventDefault();
    createTab();
  });

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '`') {
      e.preventDefault();
      toggleTerminalModal();
      return;
    }

    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't' && isModalOpen) {
      const isInsideTerminal =
        e.target &&
        (e.target.closest?.('.xterm') || e.target.classList?.contains('xterm-helper-textarea'));
      if (!isInsideTerminal) {
        e.preventDefault();
        createTab();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (isModalOpen && activeTabId && tabs.has(activeTabId)) {
      const activeTab = tabs.get(activeTabId);
      try {
        activeTab.fitAddon.fit();
        if (window.terminalAPI) {
          window.terminalAPI.resize(activeTabId, activeTab.term.cols, activeTab.term.rows);
        }
      } catch (e) {}
    }
  });

  // Buat sesi tab terminal pertama di background
  createTab('PowerShell');
});
