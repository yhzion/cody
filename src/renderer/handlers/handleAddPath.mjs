import { addPathItem } from "../pathManager.mjs";
import { saveFormData } from "../data.mjs";

export function handleAddPath() {
  addPathItem("directory", "");
  saveFormData();
}
