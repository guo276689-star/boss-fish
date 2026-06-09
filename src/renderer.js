'use strict';

const canvas = document.getElementById('game-canvas');
const coinsElement = document.getElementById('coins');
const totalCaughtElement = document.getElementById('total-caught');
const lastCatchElement = document.getElementById('last-catch');
const resetSaveButton = document.getElementById('reset-save');
const openBestiaryButton = document.getElementById('open-bestiary');
const closeBestiaryButton = document.getElementById('close-bestiary');
const bestiaryOverlay = document.getElementById('bestiary-overlay');
const bestiaryList = document.getElementById('bestiary-list');
const game = window.BossFishGame.start(canvas);
const savedData = window.BossFishSave.loadSave();

renderSave(savedData);

window.BossFishBestiary.initBestiary({
  openButton: openBestiaryButton,
  closeButton: closeBestiaryButton,
  overlay: bestiaryOverlay,
  list: bestiaryList,
  getSave: window.BossFishSave.loadSave,
  getFishList: async () => {
    const response = await fetch('data/fish.json');
    return response.json();
  }
});

if (savedData.lastCatch) {
  game.setLastCaughtFish(savedData.lastCatch);
}

window.BossFishFishing.create(
  game.setFishBiting,
  (fish) => {
    game.setLastCaughtFish(fish);
    renderSave(window.BossFishSave.addCatchToSave(fish));
  }
).then((fishing) => {
  canvas.addEventListener('click', fishing.catchFish);
});

resetSaveButton.addEventListener('click', () => {
  const shouldReset = window.confirm('确定要重置存档吗？');

  if (!shouldReset) {
    return;
  }

  const defaultSave = window.BossFishSave.resetSave();
  game.setLastCaughtFish(null);
  renderSave(defaultSave);
});

function renderSave(data) {
  coinsElement.textContent = data.coins;
  totalCaughtElement.textContent = data.totalCaught;
  lastCatchElement.textContent = data.lastCatch ? data.lastCatch.name : '暂无';
}
