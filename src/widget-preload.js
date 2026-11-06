const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('widgetAPI', {
  restoreMainWindow: () => ipcRenderer.send('widget:restoreMainWindow'),
  closeWidget: () => ipcRenderer.send('widget:closeWidget'),
  onStateChanged: (callback) => {
    const subscription = (_event, payload) => callback(payload);
    ipcRenderer.on('agents:stateChanged', subscription);
    return () => ipcRenderer.removeListener('agents:stateChanged', subscription);
  },
  getState: () => ipcRenderer.invoke('agents:getState'),
});
