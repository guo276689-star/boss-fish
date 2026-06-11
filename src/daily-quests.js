'use strict';

(function initDailyQuests() {
  const list = document.getElementById('daily-quests-list');

  window.BossFishDailyQuests = {
    initialize(data) {
      const refreshedData = refreshForToday(data);
      window.BossFishSave.saveGame(refreshedData);
      render(refreshedData);
      return refreshedData;
    },
    recordCatch(fish, earnedCoins) {
      const data = refreshForToday(window.BossFishSave.loadSave());

      for (const quest of data.dailyQuests.quests) {
        if (quest.claimed) {
          continue;
        }

        const increment = getQuestIncrement(quest, fish, earnedCoins);
        quest.progress = Math.min(quest.target, quest.progress + increment);
        quest.completed = quest.progress >= quest.target;
      }

      window.BossFishSave.saveGame(data);
      render(data);
      return data;
    },
    claimQuest,
    render
  };

  function refreshForToday(data) {
    const today = getLocalDateKey();

    if (
      data.dailyQuests.date !== today ||
      !hasCurrentQuestFormat(data.dailyQuests.quests)
    ) {
      data.dailyQuests = window.BossFishSave.getDefaultSave().dailyQuests;
    }

    return data;
  }

  function hasCurrentQuestFormat(quests) {
    return Array.isArray(quests) &&
      quests.length === 3 &&
      quests.every((quest) => (
        typeof quest.type === 'string' &&
        typeof quest.rewardCoins === 'number' &&
        typeof quest.completed === 'boolean' &&
        typeof quest.claimed === 'boolean'
      ));
  }

  function getQuestIncrement(quest, fish, earnedCoins) {
    if (quest.type === 'catch_count') {
      return 1;
    }

    if (quest.type === 'earn_coins') {
      return earnedCoins;
    }

    if (
      quest.type === 'catch_rarity' &&
      quest.rarities.includes(fish.rarity)
    ) {
      return 1;
    }

    return 0;
  }

  function claimQuest(questId) {
    const data = refreshForToday(window.BossFishSave.loadSave());
    const quest = data.dailyQuests.quests.find((item) => item.id === questId);

    if (!quest || !quest.completed || quest.claimed) {
      window.BossFishSave.saveGame(data);
      render(data);
      return data;
    }

    data.coins += quest.rewardCoins;
    quest.claimed = true;
    window.BossFishSave.saveGame(data);
    render(data);
    document.getElementById('coins').textContent = data.coins;
    return data;
  }

  function render(data) {
    list.replaceChildren();

    for (const quest of data.dailyQuests.quests) {
      const entry = document.createElement('article');
      const title = document.createElement('h3');
      const details = document.createElement('p');
      const status = createQuestStatus(quest);
      const progress = document.createElement('progress');

      entry.className = 'daily-quest-entry';
      title.textContent = quest.title;
      details.className = 'daily-quest-details';
      details.textContent = (
        `进度 ${quest.progress} / ${quest.target} · 奖励 ${quest.rewardCoins} 金币`
      );
      progress.max = quest.target;
      progress.value = quest.progress;

      entry.append(title, status, details, progress);
      list.append(entry);
    }
  }

  function createQuestStatus(quest) {
    if (quest.claimed) {
      const claimed = document.createElement('span');
      claimed.className = 'daily-quest-status claimed';
      claimed.textContent = '已领取';
      return claimed;
    }

    if (quest.completed) {
      const actions = document.createElement('span');
      const available = document.createElement('span');
      const claimButton = document.createElement('button');

      actions.className = 'daily-quest-actions';
      available.className = 'daily-quest-status available';
      available.textContent = '可领取';
      claimButton.className = 'daily-quest-claim';
      claimButton.type = 'button';
      claimButton.textContent = '领取';
      claimButton.addEventListener('click', () => {
        claimQuest(quest.id);
      });

      actions.append(available, claimButton);
      return actions;
    }

    const active = document.createElement('span');
    active.className = 'daily-quest-status';
    active.textContent = '进行中';
    return active;
  }

  function getLocalDateKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
})();
