import { addPathItem } from "../pathManager.js";
import { saveFormData } from "../data.js";

export function handleAddPath() {
  addPathItem("directory", "");
  saveFormData();
}
