const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('Electron', {
  items: () => ipcRenderer.invoke('items').then(result => result)
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  invoke: (event: any) => ipcRenderer.invoke(event),
  send: (event: any, data: any) => ipcRenderer.send(event, data),
});