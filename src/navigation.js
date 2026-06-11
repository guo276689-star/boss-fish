'use strict';

(function initNavigation() {
  const gameView = document.getElementById('game-view');
  const featuresView = document.getElementById('features-view');
  const dailyQuestsView = document.getElementById('daily-quests-view');
  const openFeaturesButton = document.getElementById('open-features');
  const closeFeaturesButton = document.getElementById('close-features');
  const openDailyQuestsButton = document.getElementById('open-daily-quests');
  const closeDailyQuestsButton = document.getElementById('close-daily-quests');
  const openBestiaryButton = document.getElementById('open-bestiary');
  const closeBestiaryButton = document.getElementById('close-bestiary');
  const openShopButton = document.getElementById('open-shop');
  const closeShopButton = document.getElementById('close-shop');

  openFeaturesButton.addEventListener('click', () => {
    gameView.hidden = true;
    featuresView.hidden = false;
  });

  closeFeaturesButton.addEventListener('click', () => {
    featuresView.hidden = true;
    gameView.hidden = false;
  });

  openDailyQuestsButton.addEventListener('click', () => {
    window.BossFishDailyQuests.initialize(window.BossFishSave.loadSave());
    featuresView.hidden = true;
    dailyQuestsView.hidden = false;
  });

  closeDailyQuestsButton.addEventListener('click', () => {
    dailyQuestsView.hidden = true;
    featuresView.hidden = false;
  });

  openBestiaryButton.addEventListener('click', () => {
    featuresView.hidden = true;
    gameView.hidden = false;
  });

  closeBestiaryButton.addEventListener('click', () => {
    gameView.hidden = true;
    featuresView.hidden = false;
  });

  openShopButton.addEventListener('click', () => {
    featuresView.hidden = true;
    gameView.hidden = false;
  });

  closeShopButton.addEventListener('click', () => {
    gameView.hidden = true;
    featuresView.hidden = false;
  });
})();
