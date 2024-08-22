import { collectFormData } from "../form.js";
import { handleNotification } from "../notification.js";

export async function handleCopy() {
  const formData = collectFormData();
  const result = await window.electronAPI.runCommandAndCopy(formData);
  handleNotification(result, "결과가 클립보드에 복사되었습니다.");
}
