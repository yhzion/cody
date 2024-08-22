import { initializeEventListeners } from "./eventListeners.js";
import { loadData } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners();
  loadData();
});
