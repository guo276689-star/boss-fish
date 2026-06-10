'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('BossFishWindow', {
  enterMini(position) {
    return ipcRenderer.invoke('window:enter-mini', position);
  },
  restoreGame() {
    return ipcRenderer.invoke('window:restore-game');
  },
  setMiniBiting(isBiting) {
    ipcRenderer.send('mini:set-biting', isBiting);
  },
  startMiniDrag(x, y) {
    return ipcRenderer.invoke('mini:start-drag', { x, y });
  },
  moveMiniDrag(x, y) {
    ipcRenderer.send('mini:move-drag', { x, y });
  },
  endMiniDrag() {
    return ipcRenderer.invoke('mini:end-drag');
  },
  onMiniBiting(callback) {
    ipcRenderer.on('mini:set-biting', (event, isBiting) => {
      callback(isBiting);
    });
  },
  onModeChanged(callback) {
    ipcRenderer.on('window:mode-changed', (event, mode) => {
      callback(mode);
    });
  },
  onMiniPositionChanged(callback) {
    ipcRenderer.on('mini:position-changed', (event, position) => {
      callback(position);
    });
  }
});
