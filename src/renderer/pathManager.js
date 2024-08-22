import { saveFormData } from "./data.js";

let pathCount = 0;

export function addPathItem(type, value) {
  pathCount++;

  const pathItem = document.createElement("div");
  pathItem.classList.add("path-item");
  pathItem.innerHTML = `
    <select id="path-type-${pathCount}">
      <option value="directory" ${type === "directory" ? "selected" : ""}>디렉토리</option>
      <option value="file" ${type === "file" ? "selected" : ""}>파일</option>
    </select>
    <input type="text" id="path-${pathCount}" class="path-input" value="${value}" readonly>
    <button class="browse-btn" data-path-id="${pathCount}">탐색</button>
    <button class="remove-btn" data-path-id="${pathCount}">제거</button>
  `;
  document.getElementById("path-list").appendChild(pathItem);

  const browseBtn = pathItem.querySelector(".browse-btn");
  const removeBtn = pathItem.querySelector(".remove-btn");

  browseBtn.addEventListener("click", async () => {
    const pathType = pathItem.querySelector(`#path-type-${pathCount}`).value;
    const result = await window.electronAPI.openFileOrDirectory(pathType);
    if (result && !result.canceled) {
      pathItem.querySelector(`#path-${pathCount}`).value = result.filePaths[0];
      saveFormData();
    }
  });

  removeBtn.addEventListener("click", () => {
    document.getElementById("path-list").removeChild(pathItem);
    saveFormData();
  });
}
