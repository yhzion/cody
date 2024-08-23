import { initializeEventListeners } from "./eventListeners.mjs";
import { loadData } from "./data.mjs";

document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners();
  loadData();
});
