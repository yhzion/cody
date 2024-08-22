import { saveFormData } from "../data.js";

export async function handleOutputDirSelection() {
  const result = await window.electronAPI.openDirectory();
  if (result && !result.canceled) {
    document.getElementById("output-file-path").value =
      `${result.filePaths[0]}/prompt.txt`;
    saveFormData();
  }
}
