const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('Products', {
  products: () => ipcRenderer.invoke('products').then(result => result)
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  invoke: (event: any) => ipcRenderer.invoke(event),
  send: (event: any, data: any) => ipcRenderer.send(event, data),
});