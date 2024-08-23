const { app, Menu } = require("electron");
const createWindow = require("./main/createWindow.cjs"); // createWindow 함수를 가져옵니다.
const menu = require("./main/menuTemplate.cjs");
const setupIpcHandlers = require("./main/ipcHandlers.cjs");
const setupAppEvents = require("./main/appEvents.cjs");

app.setName("Cody");

app.whenReady().then(() => {
  const mainWindow = createWindow(); // createWindow 함수를 호출하여 윈도우를 생성합니다.
  setupIpcHandlers(mainWindow, app);
  setupAppEvents();
  Menu.setApplicationMenu(menu);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
