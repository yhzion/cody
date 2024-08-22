import { populateFormData } from "./form.js";
import { collectFormData } from "./form.js";

const defaultExcludePattern =
  "node_modules(/|$)|\\.git(/|$)|\\.svn(/|$)|\\.hg(/|$)|\\.idea(/|$)|\\.vscode(/|$)|\\.vscode-test(/|$)|\\.vscode-server(/|$)|\\.DS_Store$|Thumbs\\.db$|\\.venv(/|$)|__pycache__(/|$)|\\.tox(/|$)|\\.pytest_cache(/|$)|\\.coverage$|\\.mypy_cache(/|$)|\\.ccls-cache(/|$)|\\.clangd(/|$)|\\.history(/|$)|\\.npm(/|$)|\\.yarn(/|$)|\\.gradle(/|$)|\\.gradle-cache(/|$)|build(/|$)|dist(/|$)|out(/|$)|target(/|$)|\\.log$|npm-debug\\.log$|yarn\\.lock$|package-lock\\.json$|\\.env$|\\.env\\..*$|\\.terraform(/|$)|\\.serverless(/|$)|\\.next(/|$)|\\.nuxt(/|$)|\\.expo(/|$)|\\.expo-shared(/|$)|\\.cache(/|$)|\\.parcel-cache(/|$)|\\.docusaurus(/|$)|\\.vuepress(/|$)|\\.firebase(/|$)|\\.eslintcache$|\\.stylelintcache$|node-repl-history$|\\.tsbuildinfo$|\\.Rproj\\.user(/|$)|\\.matplotlib(/|$)|\\.jupyter(/|$)|\\.ipynb_checkpoints(/|$)|\\.pnp\\..*$|\\.nuget(/|$)|\\.vs(/|$)|\\.android(/|$)|\\.ios(/|$)|Pods(/|$)|DerivedData(/|$)|Carthage(/|$)|fastlane(/|$)|\\.aws-sam(/|$)|\\.serverless(/|$)|\\.azure(/|$)|\\.project(/|$)|\\.classpath(/|$)|\\.settings(/|$)|\\.apt_generated(/|$)|\\.cxx(/|$)|\\.metadata(/|$)";

export function loadData() {
  window.electronAPI.loadData().then((data) => {
    if (data) {
      populateFormData(data);
    } else {
      document.getElementById("exclude-regex").value = defaultExcludePattern;
    }
  });
}

export function saveFormData() {
  const data = collectFormData();
  window.electronAPI.saveData(data);
}
