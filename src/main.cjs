const { app, Menu, BrowserWindow } = require("electron");
const createWindow = require("./main/createWindow.cjs");
const menu = require("./main/menuTemplate.cjs");
const setupIpcHandlers = require("./main/ipcHandlers.cjs");
const setupAppEvents = require("./main/appEvents.cjs");

app.setName("Cody");

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

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
}
