const { ipcMain, dialog, clipboard, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const { generateTree } = require("../utils/fileSystem/index.cjs");

function setupIpcHandlers(mainWindow, app) {
  ipcMain.handle("notification-permission-denied", () => {
    mainWindow.webContents.send("notification-permission-denied");
  });

  ipcMain.handle("load-data", () => {
    try {
      const dataPath = path.join(app.getPath("userData"), "form-data.json");
      if (fs.existsSync(dataPath)) {
        const data = fs.readFileSync(dataPath);
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    return null;
  });

  ipcMain.handle("save-data", (event, data) => {
    try {
      const dataPath = path.join(app.getPath("userData"), "form-data.json");
      fs.writeFileSync(dataPath, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  });

  ipcMain.handle("dialog:openDirectory", async () => {
    try {
      const result = await dialog.showOpenDialog(mainWindow, {
        properties: ["openDirectory"],
      });
      return result;
    } catch (error) {
      console.error("Error opening directory:", error);
    }
  });

  ipcMain.handle("dialog:openFileOrDirectory", async (event, type) => {
    try {
      const properties = type === "file" ? ["openFile"] : ["openDirectory"];
      const result = await dialog.showOpenDialog(mainWindow, { properties });
      return result;
    } catch (error) {
      console.error("Error opening file or directory:", error);
    }
  });

  ipcMain.handle("set-always-on-top", (event, isAlwaysOnTop) => {
    try {
      if (mainWindow) {
        mainWindow.setAlwaysOnTop(isAlwaysOnTop);
      }
    } catch (error) {
      console.error("Error setting always on top:", error);
    }
  });

  ipcMain.on("app-quit", () => {
    app.quit();
  });

  ipcMain.on("window-minimize", () => {
    if (mainWindow) {
      mainWindow.minimize();
    }
  });

  ipcMain.handle("run-command-and-copy", async (event, formData) => {
    try {
      const {
        baseDir,
        includeRegex,
        excludeRegex,
        showContent,
        outputToFile,
        outputFilePath,
        paths,
        userPrompt,
      } = formData;

      const defaultExcludePattern = [
        "node_modules(/|$)",
        "\\.git(/|$)",
        "\\.svn(/|$)",
        "\\.hg(/|$)",
        "\\.idea(/|$)",
        "\\.vscode(/|$)",
        "\\.vscode-test(/|$)",
        "\\.vscode-server(/|$)",
        "\\.DS_Store$",
        "Thumbs\\.db$",
        "\\.venv(/|$)",
        "__pycache__(/|$)",
        "\\.tox(/|$)",
        "\\.pytest_cache(/|$)",
        "\\.coverage$",
        "\\.mypy_cache(/|$)",
        "\\.ccls-cache(/|$)",
        "\\.clangd(/|$)",
        "\\.history(/|$)",
        "\\.npm(/|$)",
        "\\.yarn(/|$)",
        "\\.gradle(/|$)",
        "\\.gradle-cache(/|$)",
        "build(/|$)",
        "dist(/|$)",
        "out(/|$)",
        "target(/|$)",
        "\\.log$",
        "npm-debug\\.log$",
        "yarn\\.lock$",
        "package-lock\\.json$",
        "\\.env$",
        "\\.env\\..*$",
        "\\.terraform(/|$)",
        "\\.serverless(/|$)",
        "\\.next(/|$)",
        "\\.nuxt(/|$)",
        "\\.expo(/|$)",
        "\\.expo-shared(/|$)",
        "\\.cache(/|$)",
        "\\.parcel-cache(/|$)",
        "\\.docusaurus(/|$)",
        "\\.vuepress(/|$)",
        "\\.firebase(/|$)",
        "\\.eslintcache$",
        "\\.stylelintcache$",
        "node-repl-history$",
        "\\.tsbuildinfo$",
        "\\.Rproj\\.user(/|$)",
        "\\.matplotlib(/|$)",
        "\\.jupyter(/|$)",
        "\\.ipynb_checkpoints(/|$)",
        "\\.pnp\\..*$",
        "\\.nuget(/|$)",
        "\\.vs(/|$)",
        "\\.android(/|$)",
        "\\.ios(/|$)",
        "Pods(/|$)",
        "DerivedData(/|$)",
        "Carthage(/|$)",
        "fastlane(/|$)",
        "\\.aws-sam(/|$)",
        "\\.serverless(/|$)",
        "\\.azure(/|$)",
        "\\.project(/|$)",
        "\\.classpath(/|$)",
        "\\.settings(/|$)",
        "\\.apt_generated(/|$)",
        "\\.cxx(/|$)",
        "\\.metadata(/|$)",
      ].join("|");

      const options = {
        includePattern: includeRegex,
        excludePattern: excludeRegex || defaultExcludePattern,
        showContent,
        outputFile: outputToFile ? outputFilePath : null,
        saveClipboard: true,
      };

      let targetDirs = paths.length > 0 ? paths.map((p) => p.value) : [];
      if (targetDirs.length === 0 && baseDir) {
        targetDirs = [baseDir];
      }

      let output = userPrompt ? `${userPrompt}\n\n` : "";

      if (
        (targetDirs.length === 0) | targetDirs.every((d) => !Boolean(d)) &&
        baseDir
      ) {
        targetDirs = [baseDir];
      }

      if (!baseDir) {
        return { success: false, error: "No base directory provided." };
      }

      for (const dir of targetDirs) {
        if (!dir) {
          console.warn("Skipping empty directory path.");
          continue;
        }
        output += await generateTree(dir, options);
      }

      if (output.trim() === "") {
        console.warn("No valid directories to process.");
        return { success: false, error: "No valid directories to process." };
      }

      clipboard.writeText(output);

      return { success: true };
    } catch (error) {
      console.error("Error executing command:", error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = setupIpcHandlers;
