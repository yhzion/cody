import { collectFormData } from "../form.mjs";
import { handleNotification } from "../notification.mjs";

export async function handleGeneratePrompt() {
  const formData = collectFormData();
  const result = await window.electronAPI.runCommandAndCopy(formData);
  handleNotification(result, "The result has been copied to the clipboard.");
}
