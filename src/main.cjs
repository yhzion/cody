const { app, Menu } = require("electron");
const createWindow = require("./main/createWindow");
const menu = require("./main/menuTemplate");
const setupIpcHandlers = require("./main/ipcHandlers");
const setupAppEvents = require("./main/appEvents");

app.setName("Cody");

app.whenReady().then(() => {
  const mainWindow = createWindow();
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
