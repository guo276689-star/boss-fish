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
    recordCatch(data) {
      const refreshedData = refreshForToday(data);

      for (const quest of refreshedData.dailyQuests.quests) {
        quest.progress = Math.min(quest.target, quest.progress + 1);
      }

      window.BossFishSave.saveGame(refreshedData);
      render(refreshedData);
      return refreshedData;
    },
    render
  };

  function refreshForToday(data) {
    const today = getLocalDateKey();

    if (data.dailyQuests.date !== today) {
      data.dailyQuests = window.BossFishSave.getDefaultSave().dailyQuests;
    }

    return data;
  }

  function render(data) {
    list.replaceChildren();

    for (const quest of data.dailyQuests.quests) {
      const entry = document.createElement('article');
      const title = document.createElement('h3');
      const progressText = document.createElement('p');
      const progress = document.createElement('progress');

      entry.className = 'daily-quest-entry';
      title.textContent = quest.title;
      progressText.className = 'daily-quest-progress';
      progressText.textContent = `${quest.progress} / ${quest.target}`;
      progress.max = quest.target;
      progress.value = quest.progress;

      entry.append(title, progressText, progress);
      list.append(entry);
    }
  }

  function getLocalDateKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
})();
