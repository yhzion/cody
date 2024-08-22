import { saveFormData } from "../data.js";

export async function handleBaseDirSelection() {
  const result = await window.electronAPI.openDirectory();
  if (result && !result.canceled) {
    document.getElementById("base-directory").value = result.filePaths[0];
    saveFormData();
  }
}
