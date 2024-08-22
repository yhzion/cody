const { BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 650,
    height: 650,
    minWidth: 650,
    maxWidth: 650,
    resizable: true,
    icon: path.join(__dirname, "../../assets/fox.icns"),
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../../public/index.html"));
  // mainWindow.webContents.openDevTools({ mode: "detach" });
  return mainWindow;
}

module.exports = createWindow;
