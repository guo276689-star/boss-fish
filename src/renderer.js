'use strict';

const canvas = document.getElementById('game-canvas');
const coinsElement = document.getElementById('coins');
const totalCaughtElement = document.getElementById('total-caught');
const resetSaveButton = document.getElementById('reset-save');
const openBestiaryButton = document.getElementById('open-bestiary');
const closeBestiaryButton = document.getElementById('close-bestiary');
const bestiaryOverlay = document.getElementById('bestiary-overlay');
const bestiaryList = document.getElementById('bestiary-list');
const openShopButton = document.getElementById('open-shop');
const closeShopButton = document.getElementById('close-shop');
const shopOverlay = document.getElementById('shop-overlay');
const shopList = document.getElementById('shop-list');
const shopMessage = document.getElementById('shop-message');
const rareCatchNotice = document.getElementById('rare-catch-notice');
let rareCatchNoticeTimer = null;
const game = window.BossFishGame.start(canvas);
const savedData = window.BossFishDailyQuests.initialize(
  window.BossFishSave.loadSave()
);

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
  (isBiting) => {
    game.setFishBiting(isBiting);
    window.BossFishMini.setBiting(isBiting);
  },
  (fish) => {
    game.setLastCaughtFish(fish);
    showRareCatchNotice(fish);
    const catchResult = window.BossFishSave.addCatchToSave(fish);
    const data = window.BossFishDailyQuests.recordCatch(
      fish,
      catchResult.earnedCoins
    );
    renderSave(data);
  },
  () => window.BossFishSave.loadSave().upgrades.biteSpeed
).then((fishing) => {
  canvas.addEventListener('click', fishing.catchFish);

  window.BossFishShop.initShop({
    openButton: openShopButton,
    closeButton: closeShopButton,
    overlay: shopOverlay,
    list: shopList,
    message: shopMessage,
    getSave: window.BossFishSave.loadSave,
    saveGame: window.BossFishSave.saveGame,
    getUpgrades: async () => {
      const response = await fetch('data/upgrades.json');
      return response.json();
    },
    onPurchase: (data, upgradeId) => {
      renderSave(data);

      if (upgradeId === 'biteSpeed') {
        fishing.refreshBiteTimer();
      }
    }
  });
});

resetSaveButton.addEventListener('click', () => {
  const shouldReset = window.confirm('确定要重置存档吗？');

  if (!shouldReset) {
    return;
  }

  const defaultSave = window.BossFishSave.resetSave();
  game.setLastCaughtFish(null);
  clearRareCatchNotice();
  window.BossFishDailyQuests.render(defaultSave);
  renderSave(defaultSave);
});

function showRareCatchNotice(fish) {
  const rarityLabels = {
    rare: '稀有鱼！',
    epic: '史诗鱼！',
    legendary: '传说鱼！'
  };
  const label = rarityLabels[fish.rarity];

  clearRareCatchNotice();

  if (!label) {
    return;
  }

  rareCatchNotice.textContent = `${label}${fish.name}`;
  rareCatchNotice.className = `rare-catch-notice ${fish.rarity}`;
  rareCatchNotice.hidden = false;
  rareCatchNoticeTimer = window.setTimeout(clearRareCatchNotice, 2500);
}

function clearRareCatchNotice() {
  window.clearTimeout(rareCatchNoticeTimer);
  rareCatchNoticeTimer = null;
  rareCatchNotice.hidden = true;
  rareCatchNotice.textContent = '';
  rareCatchNotice.className = 'rare-catch-notice';
}

function renderSave(data) {
  coinsElement.textContent = data.coins;
  totalCaughtElement.textContent = data.totalCaught;
}
