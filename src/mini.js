'use strict';

(function initMiniMode() {
  const openMiniButton = document.getElementById('open-mini');

  window.BossFishMini = {
    setBiting(isBiting) {
      window.BossFishWindow.setMiniBiting(isBiting);
    }
  };

  openMiniButton.addEventListener('click', () => {
    enterMiniMode();
  });

  window.BossFishWindow.onModeChanged((mode) => {
    saveWindowMode(mode);
  });

  window.BossFishWindow.onMiniPositionChanged((position) => {
    const data = window.BossFishSave.loadSave();
    data.settings.miniPosition = position;
    window.BossFishSave.saveGame(data);
  });

  const savedData = window.BossFishSave.loadSave();
  if (savedData.settings.windowMode === 'mini') {
    window.BossFishWindow.enterMini(savedData.settings.miniPosition);
  }

  function enterMiniMode() {
    const data = window.BossFishSave.loadSave();
    data.settings.windowMode = 'mini';
    window.BossFishSave.saveGame(data);
    window.BossFishWindow.enterMini(data.settings.miniPosition);
  }

  function saveWindowMode(mode) {
    const data = window.BossFishSave.loadSave();
    data.settings.windowMode = mode;
    window.BossFishSave.saveGame(data);
  }
})();
