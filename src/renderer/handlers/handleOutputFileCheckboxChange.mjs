import { saveFormData } from "../data.mjs";

export function handleOutputFileCheckboxChange() {
  document.getElementById("select-output-dir").disabled =
    !document.getElementById("output-file").checked;
  saveFormData();
}
