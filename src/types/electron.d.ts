export interface ElectronAPI {
  getVersion: () => Promise<string>;
  getPlatform: () => Promise<string>;
  openExternal: (url: string) => Promise<void>;
  showMessageBox: (options: MessageBoxOptions) => Promise<MessageBoxReturnValue>;
  toggleTheme: () => Promise<boolean>;
  getTheme: () => Promise<'light' | 'dark'>;
  minimizeWindow: () => Promise<void>;
  maximizeWindow: () => Promise<void>;
  closeWindow: () => Promise<void>;
}

export interface MessageBoxOptions {
  type?: 'none' | 'info' | 'error' | 'question' | 'warning';
  buttons?: string[];
  defaultId?: number;
  title?: string;
  message: string;
  detail?: string;
  cancelId?: number;
  noLink?: boolean;
  normalizeAccessKeys?: boolean;
}

export interface MessageBoxReturnValue {
  response: number;
  checkboxChecked?: boolean;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}



