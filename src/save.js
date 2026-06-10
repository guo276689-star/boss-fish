'use strict';

const SAVE_KEY = 'bossFishSave';

window.BossFishSave = {
  getDefaultSave,
  loadSave,
  saveGame,
  resetSave,
  addCatchToSave
};

function getDefaultSave() {
  return {
    coins: 0,
    totalCaught: 0,
    ownedFish: {},
    lastCatch: null,
    upgrades: {
      biteSpeed: 0,
      sellBonus: 0
    },
    settings: {
      windowMode: 'game'
    }
  };
}

function loadSave() {
  const savedData = localStorage.getItem(SAVE_KEY);

  if (!savedData) {
    return getDefaultSave();
  }

  try {
    const parsedData = JSON.parse(savedData);
    const defaultSave = getDefaultSave();

    return {
      ...defaultSave,
      ...parsedData,
      ownedFish: parsedData.ownedFish || {},
      upgrades: {
        ...defaultSave.upgrades,
        ...parsedData.upgrades
      },
      settings: {
        ...defaultSave.settings,
        ...parsedData.settings
      }
    };
  } catch {
    return getDefaultSave();
  }
}

function saveGame(data) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  return data;
}

function resetSave() {
  localStorage.removeItem(SAVE_KEY);
  return getDefaultSave();
}

function addCatchToSave(fish) {
  const data = loadSave();
  const sellBonusLevel = data.upgrades.sellBonus;
  const earnedCoins = Math.floor(
    fish.basePrice * (1 + sellBonusLevel * 0.15)
  );

  data.coins += earnedCoins;
  data.totalCaught += 1;
  data.ownedFish[fish.id] = (data.ownedFish[fish.id] || 0) + 1;
  data.lastCatch = {
    id: fish.id,
    name: fish.name,
    rarity: fish.rarity,
    basePrice: fish.basePrice
  };

  return saveGame(data);
}
