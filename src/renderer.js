document.addEventListener('DOMContentLoaded', () => {
  const baseDirInput = document.getElementById('base-directory');
  const addPathBtn = document.getElementById('add-path');
  const pathList = document.getElementById('path-list');
  const includeRegexInput = document.getElementById('include-regex');
  const excludeRegexInput = document.getElementById('exclude-regex');
  const showContentCheckbox = document.getElementById('show-content');
  const outputFileCheckbox = document.getElementById('output-file');
  const outputFilePathInput = document.getElementById('output-file-path');
  const selectOutputDirBtn = document.getElementById('select-output-dir');
  const alwaysOnTopCheckbox = document.getElementById('always-on-top');
  const resetExcludeRegexBtn = document.getElementById('reset-exclude-regex');
  const copyBtn = document.getElementById('copy-btn');
  const copyChatGPTBtn = document.getElementById('copy-chatgpt-btn');
  const minimizeBtn = document.getElementById('minimize-btn');
  const exitBtn = document.getElementById('exit-btn');
  let pathCount = 0;

  const defaultExcludePattern = 'node_modules(/|$)|\\.git(/|$)|\\.svn(/|$)|\\.hg(/|$)|\\.idea(/|$)|\\.vscode(/|$)|\\.vscode-test(/|$)|\\.vscode-server(/|$)|\\.DS_Store$|Thumbs\\.db$|\\.venv(/|$)|__pycache__(/|$)|\\.tox(/|$)|\\.pytest_cache(/|$)|\\.coverage$|\\.mypy_cache(/|$)|\\.ccls-cache(/|$)|\\.clangd(/|$)|\\.history(/|$)|\\.npm(/|$)|\\.yarn(/|$)|\\.gradle(/|$)|\\.gradle-cache(/|$)|build(/|$)|dist(/|$)|out(/|$)|target(/|$)|\\.log$|npm-debug\\.log$|yarn\\.lock$|package-lock\\.json$|\\.env$|\\.env\\..*$|\\.terraform(/|$)|\\.serverless(/|$)|\\.next(/|$)|\\.nuxt(/|$)|\\.expo(/|$)|\\.expo-shared(/|$)|\\.cache(/|$)|\\.parcel-cache(/|$)|\\.docusaurus(/|$)|\\.vuepress(/|$)|\\.firebase(/|$)|\\.eslintcache$|\\.stylelintcache$|node-repl-history$|\\.tsbuildinfo$|\\.Rproj\\.user(/|$)|\\.matplotlib(/|$)|\\.jupyter(/|$)|\\.ipynb_checkpoints(/|$)|\\.pnp\\..*$|\\.nuget(/|$)|\\.vs(/|$)|\\.android(/|$)|\\.ios(/|$)|Pods(/|$)|DerivedData(/|$)|Carthage(/|$)|fastlane(/|$)|\\.aws-sam(/|$)|\\.serverless(/|$)|\\.azure(/|$)|\\.project(/|$)|\\.classpath(/|$)|\\.settings(/|$)|\\.apt_generated(/|$)|\\.cxx(/|$)|\\.metadata(/|$)';

  // Load saved data when the app starts
  window.electronAPI.loadData().then((data) => {

    if (data) {
      baseDirInput.value = data.baseDir;
      includeRegexInput.value = data.includeRegex || '';
      excludeRegexInput.value = data.excludeRegex || defaultExcludePattern;
      showContentCheckbox.checked = data.showContent;
      outputFileCheckbox.checked = data.outputToFile;
      outputFilePathInput.value = data.outputFilePath;
      alwaysOnTopCheckbox.checked = data.alwaysOnTop;

      if (data.paths) {
        data.paths.forEach((path) => {
          addPathItem(path.type, path.value);
        });
      }

      // Apply the always on top setting
      window.electronAPI.setAlwaysOnTop(alwaysOnTopCheckbox.checked);
    } else {
      // 기본값 설정
      excludeRegexInput.value = defaultExcludePattern;
    }
  });

  // '재설정' 버튼 클릭 시 기본값으로 되돌림
  resetExcludeRegexBtn.addEventListener('click', () => {
    excludeRegexInput.value = defaultExcludePattern;
  });

  // Save data on change
  function saveFormData() {
    const data = collectFormData();
    window.electronAPI.saveData(data);
  }

  minimizeBtn.addEventListener('click', () => {
    window.electronAPI.minimizeWindow();
  });

  exitBtn.addEventListener('click', () => {
    window.electronAPI.quitApp();
  });

  // Handle base directory selection
  document.getElementById('select-base-dir').addEventListener('click', async () => {
    const result = await window.electronAPI.openDirectory();
    if (result && !result.canceled) {
      baseDirInput.value = result.filePaths[0];
      saveFormData(); // Save after selection
    }
  });

  // Handle output directory selection
  outputFileCheckbox.addEventListener('change', () => {
    selectOutputDirBtn.disabled = !outputFileCheckbox.checked;
    saveFormData(); // Save after toggle
  });

  selectOutputDirBtn.addEventListener('click', async () => {
    const result = await window.electronAPI.openDirectory();
    if (result && !result.canceled) {
      outputFilePathInput.value = `${result.filePaths[0]}/prompt.txt`;
      saveFormData(); // Save after selection
    }
  });

  // Add a new path item
  addPathBtn.addEventListener('click', () => {
    addPathItem('directory', '');
    saveFormData(); // Save after adding a path
  });

  // Add path item to the list
  function addPathItem(type, value) {
    pathCount++;

    const pathItem = document.createElement('div');
    pathItem.classList.add('path-item');
    pathItem.innerHTML = `
          <select id="path-type-${pathCount}">
              <option value="directory" ${type === 'directory' ? 'selected' : ''}>디렉토리</option>
              <option value="file" ${type === 'file' ? 'selected' : ''}>파일</option>
          </select>
          <input type="text" id="path-${pathCount}" class="path-input" value="${value}" readonly>
          <button class="browse-btn" data-path-id="${pathCount}">탐색</button>
          <button class="remove-btn" data-path-id="${pathCount}">제거</button>
      `;
    pathList.appendChild(pathItem);

    // Attach event listeners
    const browseBtn = pathItem.querySelector('.browse-btn');
    const removeBtn = pathItem.querySelector('.remove-btn');

    browseBtn.addEventListener('click', async () => {
      const pathType = pathItem.querySelector(`#path-type-${pathCount}`).value;
      const result = await window.electronAPI.openFileOrDirectory(pathType);
      if (result && !result.canceled) {
        pathItem.querySelector(`#path-${pathCount}`).value = result.filePaths[0];
        saveFormData(); // Save after selection
      }
    });

    removeBtn.addEventListener('click', () => {
      pathList.removeChild(pathItem);
      saveFormData(); // Save after removing a path
    });
  }

  // Collect form data
  function collectFormData() {
    const paths = [];
    document.querySelectorAll('.path-item').forEach((item) => {
      paths.push({
        type: item.querySelector('select').value,
        value: item.querySelector('.path-input').value,
      });
    });

    // 만약 paths가 비어 있으면 베이스 디렉토리를 기본으로 사용
    if (paths.length === 0) {
      paths.push({
        type: 'directory',
        value: baseDirInput.value,
      });
    }

    return {
      baseDir: baseDirInput.value,
      includeRegex: includeRegexInput.value,
      excludeRegex: excludeRegexInput.value,
      showContent: showContentCheckbox.checked,
      outputToFile: outputFileCheckbox.checked,
      outputFilePath: outputFilePathInput.value,
      alwaysOnTop: alwaysOnTopCheckbox.checked,
      paths,
    };
  }

  copyBtn.addEventListener('click', async () => {
    const formData = collectFormData();
    const result = await window.electronAPI.runCommandAndCopy(formData);

    if (result.success) {
      // Notification 권한 요청 및 결과에 따라 알림 표시
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification('작업 완료', {
            body: '결과가 클립보드에 복사되었습니다.'
          });
        } else {
          console.error('Notification 권한이 거부되었습니다.');
        }
      } else if (Notification.permission === 'granted') {
        new Notification('작업 완료', {
          body: '결과가 클립보드에 복사되었습니다.'
        });
      } else {
        console.error('Notification 권한이 없습니다.');
      }
    } else {
      new Notification('작업 실패', {
        body: '명령어 실행 중 오류가 발생했습니다.'
      });
    }
  });

  copyChatGPTBtn.addEventListener('click', async () => {
    const formData = collectFormData();
    const result = await window.electronAPI.runCommandAndCopy(formData);

    if (result.success) {
      // Notification 권한을 확인하고 요청
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification('작업 완료', {
            body: '결과가 클립보드에 복사되었으며, ChatGPT가 열립니다.'
          });
          window.electronAPI.openChatGPT();
        } else {
          console.error('Notification 권한이 거부되었습니다.');
        }
      } else if (Notification.permission === 'granted') {
        new Notification('작업 완료', {
          body: '결과가 클립보드에 복사되었으며, ChatGPT가 열립니다.'
        });
        window.electronAPI.openChatGPT();
      } else {
        console.error('Notification 권한이 없습니다.');
      }
    } else {
      new Notification('작업 실패', {
        body: '명령어 실행 중 오류가 발생했습니다.'
      });
    }

    // 권한 거부 시 처리
    window.electronAPI.on('notification-permission-denied', () => {
      console.log('Notification permission denied event received');
      const notification = document.getElementById('notification');
      notification.innerHTML = `<span style="color: red;">[<a href="#" id="open-settings-link">알림</a>] 설정을 켜주세요.</span>`;

      // 링크 클릭 시 시스템 설정으로 이동
      document.getElementById('open-settings-link').addEventListener('click', () => {
        window.electronAPI.openSettings();
      });
    });
  });


  alwaysOnTopCheckbox.addEventListener('change', () => {
    const isAlwaysOnTop = alwaysOnTopCheckbox.checked;
    window.electronAPI.setAlwaysOnTop(isAlwaysOnTop);
  });


});
