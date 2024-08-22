import { collectFormData } from "../form.js";
import { handleNotification } from "../notification.js";

export async function handleCopy() {
  const formData = collectFormData();
  const result = await window.electronAPI.runCommandAndCopy(formData);
  handleNotification(result, "The result has been copied to the clipboard.");
}
