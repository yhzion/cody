const { contextBridge, ipcRenderer } = require('electron');
const { shell } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveData: (data) => ipcRenderer.invoke('save-data', data),
  loadData: () => ipcRenderer.invoke('load-data'),
  openChatGPT: () => ipcRenderer.invoke('open-chatgpt'),
  openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
  openFileOrDirectory: (type) => ipcRenderer.invoke('dialog:openFileOrDirectory', type),
  setAlwaysOnTop: (isAlwaysOnTop) => ipcRenderer.invoke('set-always-on-top', isAlwaysOnTop),
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  quitApp: () => ipcRenderer.send('app-quit'),
  runCommandAndCopy: (data) => ipcRenderer.invoke('run-command-and-copy', data),

  on: (channel, func) => ipcRenderer.on(channel, func),
  // 시스템 설정 페이지로 이동하는 함수 추가
  openSettings: () => {
    if (process.platform === 'darwin') {
      shell.openExternal('x-apple.systempreferences:com.apple.preference.notifications');
    } else {
      // Windows나 Linux는 각각의 시스템 설정 페이지로 이동하는 링크를 구성해야 함
      console.log('시스템 설정 페이지를 열 수 없습니다.');
    }
  },
});
