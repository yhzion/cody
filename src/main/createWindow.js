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
      contextIsolation: true, // context isolation 활성화
      nodeIntegration: false, // nodeIntegration 비활성화
      enableRemoteModule: false, // enableRemoteModule 비활성화
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../../public/index.html"));

  // 자동으로 개발자 도구를 열고 싶다면 아래 코드 추가
  // mainWindow.webContents.openDevTools({ mode: "detach" });

  return mainWindow;
}

module.exports = createWindow;
