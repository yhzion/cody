import { populateFormData, collectFormData } from "./form.mjs";

export const defaultExcludePattern =
  "node_modules(/|$)|\\.git(/|$)|\\.svn(/|$)|\\.hg(/|$)|\\.idea(/|$)|\\.vscode(/|$)|\\.vscode-test(/|$)|\\.vscode-server(/|$)|\\.DS_Store$|Thumbs\\.db$|\\.venv(/|$)|__pycache__(/|$)|\\.tox(/|$)|\\.pytest_cache(/|$)|\\.coverage$|\\.mypy_cache(/|$)|\\.ccls-cache(/|$)|\\.clangd(/|$)|\\.history(/|$)|\\.npm(/|$)|\\.yarn(/|$)|\\.gradle(/|$)|\\.gradle-cache(/|$)|build(/|$)|dist(/|$)|out(/|$)|target(/|$)|\\.log$|npm-debug\\.log$|yarn\\.lock$|package-lock\\.json$|\\.env$|\\.env\\..*$|\\.terraform(/|$)|\\.serverless(/|$)|\\.next(/|$)|\\.nuxt(/|$)|\\.expo(/|$)|\\.expo-shared(/|$)|\\.cache(/|$)|\\.parcel-cache(/|$)|\\.docusaurus(/|$)|\\.vuepress(/|$)|\\.firebase(/|$)|\\.eslintcache$|\\.stylelintcache$|node-repl-history$|\\.tsbuildinfo$|\\.Rproj\\.user(/|$)|\\.matplotlib(/|$)|\\.jupyter(/|$)|\\.ipynb_checkpoints(/|$)|\\.pnp\\..*$|\\.nuget(/|$)|\\.vs(/|$)|\\.android(/|$)|\\.ios(/|$)|Pods(/|$)|DerivedData(/|$)|Carthage(/|$)|fastlane(/|$)|\\.aws-sam(/|$)|\\.serverless(/|$)|\\.azure(/|$)|\\.project(/|$)|\\.classpath(/|$)|\\.settings(/|$)|\\.apt_generated(/|$)|\\.cxx(/|$)|\\.metadata(/|$)";

export const defaultUserPrompt = `<Role>
  당신은 프로그램을 만드는 개발자입니다.

  <Description>
  아래 내용은 프로그램 소스의 디렉토리 구조와 소스 내용을 표시합니다.

  <Response Instructions>
  - 사족이나 미사여구는 사용하지 않습니다.
  - 파일명 목록을 요청할 경우 파일명만 표시합니다.
  - 모든 응답에서 요점으로 답합니다. 단 코드는 예외입니다.

  아래 주어진 코드를 이해하고 "이해했습니다." 라고 대답합니다.

  <Source code>
`;

export function loadData() {
  window.electronAPI.loadData().then((data) => {
    if (data) {
      populateFormData(data);
    } else {
      document.getElementById("exclude-regex").value = defaultExcludePattern;
      document.getElementById("user-prompt").value = defaultUserPrompt;
      document.getElementById("max-tokens").value = 128; // 추가된 부분
    }
  });
}

export function saveFormData() {
  const data = collectFormData();
  window.electronAPI.saveData(data);
}
