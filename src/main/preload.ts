import { contextBridge, ipcRenderer } from 'electron';

// Context Bridge API tanımları
const electronAPI = {
  getVersion: () => ipcRenderer.invoke('get-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),
  showMessageBox: (options: any) => ipcRenderer.invoke('show-message-box', options),
  toggleTheme: () => ipcRenderer.invoke('toggle-theme'),
  getTheme: () => ipcRenderer.invoke('get-theme'),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
};

// Context Bridge'i etkinleştir
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// TypeScript için global tip tanımları
declare global {
  interface Window {
    electronAPI: typeof electronAPI;
  }
}
