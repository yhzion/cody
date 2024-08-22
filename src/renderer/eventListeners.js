import {
  handleBaseDirSelection,
  handleOutputFileCheckboxChange,
  handleOutputDirSelection,
  handleAddPath,
  resetExcludeRegex,
  handleCopy,
  handleCopyChatGPT,
  handleAlwaysOnTopChange,
} from "./handlers/index.js";

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
    .getElementById("minimize-btn")
    .addEventListener("click", () => window.electronAPI.minimizeWindow());
  document
    .getElementById("exit-btn")
    .addEventListener("click", () => window.electronAPI.quitApp());
  document.getElementById("copy-btn").addEventListener("click", handleCopy);
  document
    .getElementById("copy-chatgpt-btn")
    .addEventListener("click", handleCopyChatGPT);
  document
    .getElementById("always-on-top")
    .addEventListener("change", handleAlwaysOnTopChange);
}
