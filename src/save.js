'use strict';

const SAVE_KEY = 'bossFishSave';
const MAX_RECENT_CATCHES = 5;
const DAILY_QUEST_TEMPLATES = {
  catchCount: [
    {
      id: 'catch_3',
      type: 'catch_count',
      title: '摸鱼热身：钓到 3 条鱼',
      target: 3,
      rewardCoins: 25
    },
    {
      id: 'catch_5',
      type: 'catch_count',
      title: '今日进度：钓到 5 条鱼',
      target: 5,
      rewardCoins: 50
    },
    {
      id: 'catch_6',
      type: 'catch_count',
      title: '工位巡塘：钓到 6 条鱼',
      target: 6,
      rewardCoins: 55
    },
    {
      id: 'catch_10',
      type: 'catch_count',
      title: '带薪丰收：钓到 10 条鱼',
      target: 10,
      rewardCoins: 90
    },
    {
      id: 'catch_8',
      type: 'catch_count',
      title: '工位续航：钓到 8 条鱼',
      target: 8,
      rewardCoins: 70
    },
    {
      id: 'catch_12',
      type: 'catch_count',
      title: '全天候巡塘：钓到 12 条鱼',
      target: 12,
      rewardCoins: 110
    }
  ],
  earnCoins: [
    {
      id: 'earn_30',
      type: 'earn_coins',
      title: '摸鱼创收：获得 30 金币',
      target: 30,
      rewardCoins: 15
    },
    {
      id: 'earn_80',
      type: 'earn_coins',
      title: '工位创收：获得 80 金币',
      target: 80,
      rewardCoins: 30
    },
    {
      id: 'earn_120',
      type: 'earn_coins',
      title: '今日业绩：获得 120 金币',
      target: 120,
      rewardCoins: 45
    },
    {
      id: 'earn_200',
      type: 'earn_coins',
      title: '超额摸鱼：获得 200 金币',
      target: 200,
      rewardCoins: 80
    },
    {
      id: 'earn_50',
      type: 'earn_coins',
      title: '茶水间创收：获得 50 金币',
      target: 50,
      rewardCoins: 20
    },
    {
      id: 'earn_160',
      type: 'earn_coins',
      title: '午后业绩：获得 160 金币',
      target: 160,
      rewardCoins: 60
    }
  ],
  catchRarity: [
    {
      id: 'catch_rare_1',
      type: 'catch_rarity',
      title: '发现 1 条稀有及以上的鱼',
      target: 1,
      rarities: ['rare', 'epic', 'legendary'],
      rewardCoins: 120
    },
    {
      id: 'catch_epic_1',
      type: 'catch_rarity',
      title: '发现 1 条史诗及以上的鱼',
      target: 1,
      rarities: ['epic', 'legendary'],
      rewardCoins: 200
    },
    {
      id: 'catch_rare_2',
      type: 'catch_rarity',
      title: '发现 2 条稀有及以上的鱼',
      target: 2,
      rarities: ['rare', 'epic', 'legendary'],
      rewardCoins: 180
    },
    {
      id: 'catch_epic_2',
      type: 'catch_rarity',
      title: '发现 2 条史诗及以上的鱼',
      target: 2,
      rarities: ['epic', 'legendary'],
      rewardCoins: 320
    }
  ]
};

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
    recentCatches: [],
    upgrades: {
      biteSpeed: 0,
      sellBonus: 0
    },
    settings: {
      windowMode: 'game',
      soundEnabled: false
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
      recentCatches: normalizeRecentCatches(parsedData.recentCatches),
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

function normalizeRecentCatches(recentCatches) {
  if (!Array.isArray(recentCatches)) {
    return [];
  }

  return recentCatches
    .filter(isValidRecentCatch)
    .slice(0, MAX_RECENT_CATCHES)
    .map((catchEntry) => ({ ...catchEntry }));
}

function isValidRecentCatch(catchEntry) {
  return catchEntry &&
    typeof catchEntry.id === 'string' &&
    typeof catchEntry.name === 'string' &&
    typeof catchEntry.rarity === 'string' &&
    Number.isFinite(catchEntry.earnedCoins) &&
    catchEntry.earnedCoins >= 0;
}

function createDailyQuests() {
  const date = getLocalDateKey();

  return {
    date,
    quests: [
      createQuest(selectDailyTemplate(
        DAILY_QUEST_TEMPLATES.catchCount,
        date,
        'catch_count'
      )),
      createQuest(selectDailyTemplate(
        DAILY_QUEST_TEMPLATES.earnCoins,
        date,
        'earn_coins'
      )),
      createQuest(selectDailyTemplate(
        DAILY_QUEST_TEMPLATES.catchRarity,
        date,
        'catch_rarity'
      ))
    ]
  };
}

function selectDailyTemplate(templates, date, category) {
  const seed = hashText(`${date}:${category}`);
  return templates[seed % templates.length];
}

function hashText(text) {
  let hash = 2166136261;

  for (const character of text) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  hash ^= hash >>> 16;
  return hash >>> 0;
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
  data.recentCatches.unshift({
    id: fish.id,
    name: fish.name,
    rarity: fish.rarity,
    earnedCoins
  });
  data.recentCatches = data.recentCatches.slice(0, MAX_RECENT_CATCHES);

  return {
    data: saveGame(data),
    earnedCoins
  };
}
