import { defaultUserPrompt } from "../data.mjs";

export function resetUserPrompt() {
  document.getElementById("user-prompt").value = defaultUserPrompt;
}
