const { contextBridge, ipcRenderer } = require("electron");
const { shell } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  saveData: (data) => ipcRenderer.invoke("save-data", data),
  loadData: () => ipcRenderer.invoke("load-data"),
  openDirectory: () => ipcRenderer.invoke("dialog:openDirectory"),
  openFileOrDirectory: (type) =>
    ipcRenderer.invoke("dialog:openFileOrDirectory", type),
  setAlwaysOnTop: (isAlwaysOnTop) =>
    ipcRenderer.invoke("set-always-on-top", isAlwaysOnTop),
  minimizeWindow: () => ipcRenderer.send("window-minimize"),
  quitApp: () => ipcRenderer.send("app-quit"),
  runCommandAndCopy: (data) => ipcRenderer.invoke("run-command-and-copy", data),

  on: (channel, func) => ipcRenderer.on(channel, func),

  openSettings: () => {
    if (process.platform === "darwin") {
      shell.openExternal(
        "x-apple.systempreferences:com.apple.preference.notifications",
      );
    } else {
      console.log("Unable to open the system settings page.");
    }
  },
});
