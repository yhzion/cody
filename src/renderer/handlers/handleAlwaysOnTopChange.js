export function handleAlwaysOnTopChange() {
  const isAlwaysOnTop = document.getElementById("always-on-top").checked;
  window.electronAPI.setAlwaysOnTop(isAlwaysOnTop);
}
