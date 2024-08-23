import { addPathItem } from "./pathManager.mjs"; // 추가된 부분
import { defaultExcludePattern, defaultUserPrompt } from "./data.mjs";

export function populateFormData(data) {
  document.getElementById("base-directory").value = data.baseDir;
  document.getElementById("include-regex").value = data.includeRegex || "";
  document.getElementById("exclude-regex").value =
    data.excludeRegex || defaultExcludePattern;
  document.getElementById("show-content").checked = data.showContent;
  document.getElementById("output-file").checked = data.outputToFile;
  document.getElementById("output-file-path").value = data.outputFilePath;
  document.getElementById("always-on-top").checked = data.alwaysOnTop;
  document.getElementById("user-prompt").value =
    data.userPrompt || defaultUserPrompt;
  document.getElementById("max-tokens").value = data.maxTokens || 128; // 추가된 부분

  if (data.paths) {
    data.paths.forEach((path) => {
      addPathItem(path.type, path.value);
    });
  }

  window.electronAPI.setAlwaysOnTop(
    document.getElementById("always-on-top").checked,
  );
}

export function collectFormData() {
  const paths = [];
  document.querySelectorAll(".path-item").forEach((item) => {
    paths.push({
      type: item.querySelector("select").value,
      value: item.querySelector(".path-input").value,
    });
  });

  if (paths.length === 0) {
    paths.push({
      type: "directory",
      value: document.getElementById("base-directory").value,
    });
  }

  return {
    baseDir: document.getElementById("base-directory").value,
    includeRegex: document.getElementById("include-regex").value,
    excludeRegex: document.getElementById("exclude-regex").value,
    showContent: document.getElementById("show-content").checked,
    outputToFile: document.getElementById("output-file").checked,
    outputFilePath: document.getElementById("output-file-path").value,
    alwaysOnTop: document.getElementById("always-on-top").checked,
    userPrompt: document.getElementById("user-prompt").value,
    maxTokens: document.getElementById("max-tokens").value, // 추가된 부분
    paths,
  };
}
