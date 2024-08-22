import { collectFormData } from "../form.js";
import { handleNotification } from "../notification.js";

export async function handleCopyChatGPT() {
  const formData = collectFormData();
  const result = await window.electronAPI.runCommandAndCopy(formData);
  handleNotification(
    result,
    "결과가 클립보드에 복사되었으며, ChatGPT가 열립니다.",
  );
  if (result.success) {
    window.electronAPI.openChatGPT();
  }
}
