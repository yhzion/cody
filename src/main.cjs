const { app, BrowserWindow, ipcMain, dialog, clipboard, shell, Menu, Notification } = require('electron');
const path = require('path');
const fs = require('fs');
const { generateTree } = require('./utils/fileSystem.cjs');

let mainWindow;

app.setName('Cody');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 650,
    height: 650,
    minWidth: 650,
    maxWidth: 650,
    resizable: true,
    icon: path.join(__dirname, '../assets/fox.icns'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // context isolation 활성화
      nodeIntegration: false,  // nodeIntegration 비활성화
      enableRemoteModule: false, // enableRemoteModule 비활성화
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));

  // 자동으로 개발자 도구를 열고 싶다면 아래 코드 추가
  // mainWindow.webContents.openDevTools();
}

const menuTemplate = [
  {
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'quit' },
    ],
  },
  {
    label: 'File',
    submenu: [
      { role: 'close' }
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' }
    ],
  },
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

app.whenReady().then(async () => {
  createWindow();


  const permission = await Notification.requestPermission();
  console.log('Notification permission:', permission);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('notification-permission-denied', () => {
  mainWindow.webContents.send('notification-permission-denied');
});

ipcMain.handle('load-data', () => {
  try {
    const dataPath = path.join(app.getPath('userData'), 'form-data.json');
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath);
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('데이터 로드 오류:', error);
  }
  return null;
});

ipcMain.handle('save-data', (event, data) => {
  try {
    const dataPath = path.join(app.getPath('userData'), 'form-data.json');
    fs.writeFileSync(dataPath, JSON.stringify(data));
  } catch (error) {
    console.error('데이터 저장 오류:', error);
  }
});

ipcMain.handle('dialog:openDirectory', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    });
    return result;
  } catch (error) {
    console.error('디렉토리 열기 오류:', error);
  }
});

ipcMain.handle('dialog:openFileOrDirectory', async (event, type) => {
  try {
    const properties = type === 'file' ? ['openFile'] : ['openDirectory'];
    const result = await dialog.showOpenDialog(mainWindow, { properties });
    return result;
  } catch (error) {
    console.error('파일 또는 디렉토리 열기 오류:', error);
  }
});

ipcMain.handle('set-always-on-top', (event, isAlwaysOnTop) => {
  try {
    if (mainWindow) {
      mainWindow.setAlwaysOnTop(isAlwaysOnTop);
    }
  } catch (error) {
    console.error('최상단 설정 오류:', error);
  }
});

ipcMain.on('app-quit', () => {
  app.quit();
});

ipcMain.on('window-minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

// 'open-chatgpt' 핸들러 추가
ipcMain.handle('open-chatgpt', () => {
  shell.openExternal('https://chat.openai.com');
});

ipcMain.handle('run-command-and-copy', async (event, formData) => {
  try {
    const { baseDir, includeRegex, excludeRegex, showContent, outputToFile, outputFilePath, paths } = formData;

    // 포괄적인 제외 경로 정규식 필터
    const defaultExcludePattern = [
      'node_modules(/|$)',
      '\\.git(/|$)',
      '\\.svn(/|$)',
      '\\.hg(/|$)',
      '\\.idea(/|$)',
      '\\.vscode(/|$)',
      '\\.vscode-test(/|$)',
      '\\.vscode-server(/|$)',
      '\\.DS_Store$',
      'Thumbs\\.db$',
      '\\.venv(/|$)',
      '__pycache__(/|$)',
      '\\.tox(/|$)',
      '\\.pytest_cache(/|$)',
      '\\.coverage$',
      '\\.mypy_cache(/|$)',
      '\\.ccls-cache(/|$)',
      '\\.clangd(/|$)',
      '\\.history(/|$)',
      '\\.npm(/|$)',
      '\\.yarn(/|$)',
      '\\.gradle(/|$)',
      '\\.gradle-cache(/|$)',
      'build(/|$)',
      'dist(/|$)',
      'out(/|$)',
      'target(/|$)',
      '\\.log$',
      'npm-debug\\.log$',
      'yarn\\.lock$',
      'package-lock\\.json$',
      '\\.env$',
      '\\.env\\..*$',
      '\\.terraform(/|$)',
      '\\.serverless(/|$)',
      '\\.next(/|$)',
      '\\.nuxt(/|$)',
      '\\.expo(/|$)',
      '\\.expo-shared(/|$)',
      '\\.cache(/|$)',
      '\\.parcel-cache(/|$)',
      '\\.docusaurus(/|$)',
      '\\.vuepress(/|$)',
      '\\.firebase(/|$)',
      '\\.eslintcache$',
      '\\.stylelintcache$',
      'node-repl-history$',
      '\\.tsbuildinfo$',
      '\\.Rproj\\.user(/|$)',
      '\\.matplotlib(/|$)',
      '\\.jupyter(/|$)',
      '\\.ipynb_checkpoints(/|$)',
      '\\.pnp\\..*$',
      '\\.nuget(/|$)',
      '\\.vs(/|$)',
      '\\.android(/|$)',
      '\\.ios(/|$)',
      'Pods(/|$)',
      'DerivedData(/|$)',
      'Carthage(/|$)',
      'fastlane(/|$)',
      '\\.aws-sam(/|$)',
      '\\.serverless(/|$)',
      '\\.azure(/|$)',
      '\\.project(/|$)',
      '\\.classpath(/|$)',
      '\\.settings(/|$)',
      '\\.apt_generated(/|$)',
      '\\.cxx(/|$)',
      '\\.metadata(/|$)'
    ].join('|');

    const options = {
      includePattern: includeRegex,
      excludePattern: excludeRegex || defaultExcludePattern,
      showContent,
      outputFile: outputToFile ? outputFilePath : null,
      saveClipboard: true,
    };

    const targetDirs = paths.length > 0 ? paths.map(p => p.value) : [baseDir];
    let output = '';

    for (const dir of targetDirs) {
      output += await generateTree(dir, options);
    }

    clipboard.writeText(output);

    return { success: true };
  } catch (error) {
    console.error('명령어 실행 오류:', error);
    return { success: false, error: error.message };
  }
});




