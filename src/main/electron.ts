import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron';
import * as path from 'path';
import { isDev } from './utils';

// Context Bridge API'leri
interface ElectronAPI {
  getVersion: () => Promise<string>;
  getPlatform: () => Promise<string>;
  openExternal: (url: string) => Promise<void>;
  showMessageBox: (options: any) => Promise<any>;
  toggleTheme: () => Promise<void>;
  getTheme: () => Promise<'light' | 'dark'>;
  minimizeWindow: () => Promise<void>;
  maximizeWindow: () => Promise<void>;
  closeWindow: () => Promise<void>;
}

let mainWindow: BrowserWindow | null = null;

// WebGL'i mümkün olduğunca etkinleştir, WebGPU'yu devre dışı bırak
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('enable-accelerated-2d-canvas');
// WebGPU'yu devre dışı bırak (Pixi.js WebGL kullanmalı)
app.commandLine.appendSwitch('disable-webgpu');
// Windows için ANGLE backend tercihi
app.commandLine.appendSwitch('use-angle', 'd3d11');
let isDarkMode = false;

const createWindow = (): void => {
  // Ana pencereyi oluştur
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    transparent: false,
    icon: path.join(__dirname, '../../public/icon-32.svg'), // Uygulama icon'u
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  });

  // Pencere hazır olduğunda göster
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    
    if (isDev) {
      mainWindow?.webContents.openDevTools();
    }
  });

  // CSP ayarla - sadece production'da aktif
  if (!isDev) {
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            "default-src 'self' 'unsafe-inline' data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self';"
          ]
        }
      });
    });
  }

  // URL'yi yükle
  const startUrl = isDev 
    ? 'http://localhost:3001' 
    : `file://${path.join(process.cwd(), 'public/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Pencere kapatıldığında
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Dış linkler için
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
};

// Uygulama hazır olduğunda
app.whenReady().then(() => {
  createWindow();

  // macOS'ta dock'ta tıklandığında pencere oluştur
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Menü oluştur
  // createMenu();
});

// Tüm pencereler kapatıldığında (macOS hariç)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
ipcMain.handle('get-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-platform', () => {
  return process.platform;
});

ipcMain.handle('open-external', async (_, url: string) => {
  await shell.openExternal(url);
});

ipcMain.handle('show-message-box', async (_, options) => {
  const { dialog } = await import('electron');
  return await dialog.showMessageBox(mainWindow!, options);
});

ipcMain.handle('toggle-theme', () => {
  isDarkMode = !isDarkMode;
  return isDarkMode;
});

ipcMain.handle('get-theme', () => {
  return isDarkMode ? 'dark' : 'light';
});

ipcMain.handle('minimize-window', () => {
  mainWindow?.minimize();
});

ipcMain.handle('maximize-window', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.handle('close-window', () => {
  mainWindow?.close();
});

// Menü oluşturma
const createMenu = (): void => {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'Dosya',
      submenu: [
        {
          label: 'Yeni',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // Yeni dosya işlemi
          },
        },
        {
          label: 'Aç',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            // Dosya açma işlemi
          },
        },
        { type: 'separator' },
        {
          label: 'Çıkış',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Düzenle',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'Görünüm',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Pencere',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

// Güvenlik: Yeni pencere oluşturmayı engelle
app.on('web-contents-created', (_, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
});
