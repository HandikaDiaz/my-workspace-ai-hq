const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('windowAPI', {
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  close: () => ipcRenderer.send('window:close'),
});

contextBridge.exposeInMainWorld('electronAPI', {
  nodeVersion: () => process.versions?.node || '',
  chromeVersion: () => process.versions?.chrome || '',
  electronVersion: () => process.versions?.electron || '',
  platform: () => process.platform || '',
  cwd: () => (typeof process.cwd === 'function' ? process.cwd() : ''),
  getCwd: () => ipcRenderer.invoke('app:getCwd'),
});

contextBridge.exposeInMainWorld('agentsAPI', {
  getState: () => ipcRenderer.invoke('agents:getState'),
  setWorking: (agentId, isWorking, task = '') =>
    ipcRenderer.invoke('agents:setWorking', { agentId, isWorking, task }),
  setAllWorking: (isWorking, task = '') =>
    ipcRenderer.invoke('agents:setAllWorking', { isWorking, task }),
  onStateChanged: (callback) => {
    const subscription = (_event, payload) => callback(payload);
    ipcRenderer.on('agents:stateChanged', subscription);
    return () => ipcRenderer.removeListener('agents:stateChanged', subscription);
  },
});

contextBridge.exposeInMainWorld('terminalAPI', {
  create: (id, cols, rows) => ipcRenderer.send('terminal:create', { id, cols, rows }),
  write: (id, data) => ipcRenderer.send('terminal:write', { id, data }),
  resize: (id, cols, rows) => ipcRenderer.send('terminal:resize', { id, cols, rows }),
  close: (id, cols, rows) => ipcRenderer.send('terminal:close', { id, cols, rows }),
  restart: (id) => ipcRenderer.send('terminal:restart', { id }),
  onData: (callback) => {
    const subscription = (_event, payload) => callback(payload);
    ipcRenderer.on('terminal:data', subscription);
    return () => ipcRenderer.removeListener('terminal:data', subscription);
  },
  onExit: (callback) => {
    const subscription = (_event, payload) => callback(payload);
    ipcRenderer.on('terminal:exit', subscription);
    return () => ipcRenderer.removeListener('terminal:exit', subscription);
  },
});
