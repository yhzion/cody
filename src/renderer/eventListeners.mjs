import {
  handleBaseDirSelection,
  handleOutputFileCheckboxChange,
  handleOutputDirSelection,
  handleAddPath,
  resetExcludeRegex,
  handleCopy,
  handleAlwaysOnTopChange,
} from "./handlers/index.mjs";
import { resetUserPrompt } from "./handlers/resetUserPrompt.mjs";
import { saveFormData } from "./data.mjs"; // 추가된 부분

export function initializeEventListeners() {
  console.log("Initializing event listeners");
  document
    .getElementById("select-base-dir")
    .addEventListener("click", handleBaseDirSelection);
  document
    .getElementById("output-file")
    .addEventListener("change", handleOutputFileCheckboxChange);
  document
    .getElementById("select-output-dir")
    .addEventListener("click", handleOutputDirSelection);
  document.getElementById("add-path").addEventListener("click", handleAddPath);
  document
    .getElementById("reset-exclude-regex")
    .addEventListener("click", resetExcludeRegex);
  document
    .getElementById("reset-user-prompt")
    .addEventListener("click", resetUserPrompt);
  document
    .getElementById("minimize-btn")
    .addEventListener("click", () => window.electronAPI.minimizeWindow());
  document
    .getElementById("exit-btn")
    .addEventListener("click", () => window.electronAPI.quitApp());
  document.getElementById("copy-btn").addEventListener("click", handleCopy);
  document
    .getElementById("always-on-top")
    .addEventListener("change", handleAlwaysOnTopChange);

  // 추가된 부분: 입력 필드 변경 시 저장
  document
    .getElementById("base-directory")
    .addEventListener("input", saveFormData);
  document
    .getElementById("include-regex")
    .addEventListener("input", saveFormData);
  document
    .getElementById("exclude-regex")
    .addEventListener("input", saveFormData);
  document
    .getElementById("show-content")
    .addEventListener("change", saveFormData);
  document
    .getElementById("output-file")
    .addEventListener("change", saveFormData);
  document
    .getElementById("output-file-path")
    .addEventListener("input", saveFormData);
  document
    .getElementById("always-on-top")
    .addEventListener("change", saveFormData);
  document
    .getElementById("user-prompt")
    .addEventListener("input", saveFormData);
  document.getElementById("max-tokens").addEventListener("input", saveFormData);
}
