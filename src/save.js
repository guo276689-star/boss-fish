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
      createQuest({
        id: 'catch_5',
        type: 'catch_count',
        title: '钓到 5 条鱼',
        target: 5,
        rewardCoins: 50
      }),
      createQuest({
        id: 'earn_200',
        type: 'earn_coins',
        title: '通过钓鱼获得 200 金币',
        target: 200,
        rewardCoins: 80
      }),
      createQuest({
        id: 'catch_rare_1',
        type: 'catch_rarity',
        title: '钓到 1 条稀有及以上的鱼',
        target: 1,
        rarities: ['rare', 'epic', 'legendary'],
        rewardCoins: 120
      })
    ]
  };
}

function createQuest(options) {
  return {
    ...options,
    progress: 0,
    completed: false,
    claimed: false
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

  return {
    data: saveGame(data),
    earnedCoins
  };
}
