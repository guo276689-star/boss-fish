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
    },
    dailyQuests: createDailyQuests()
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
      },
      dailyQuests: parsedData.dailyQuests || defaultSave.dailyQuests
    };
  } catch {
    return getDefaultSave();
  }
}

function createDailyQuests() {
  return {
    date: getLocalDateKey(),
    quests: [
      createQuest('catch_3', '钓到 3 条鱼', 3),
      createQuest('catch_5', '钓到 5 条鱼', 5),
      createQuest('catch_8', '钓到 8 条鱼', 8)
    ]
  };
}

function createQuest(id, title, target) {
  return {
    id,
    title,
    target,
    progress: 0
  };
}

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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
