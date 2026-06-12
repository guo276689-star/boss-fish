'use strict';

(function initProgression() {
  const levelButton = document.getElementById('open-progression');
  const levelElement = document.getElementById('progression-level');
  const titleElement = document.getElementById('progression-title');
  const nextElement = document.getElementById('progression-next');
  const progressElement = document.getElementById('progression-level-progress');
  const levels = [
    { level: 1, target: 0, title: '实习摸鱼员' },
    { level: 2, target: 5, title: '工位观察员' },
    { level: 3, target: 15, title: '茶水间常客' },
    { level: 4, target: 30, title: '带薪垂钓员' },
    { level: 5, target: 60, title: '摸鱼主管' },
    { level: 6, target: 100, title: '摸鱼总监' },
    { level: 7, target: 200, title: '传说摸鱼王' }
  ];

  window.BossFishProgression = {
    getLevelInfo,
    render
  };

  function getLevelInfo(totalCaught) {
    let currentIndex = 0;

    for (let index = 1; index < levels.length; index += 1) {
      if (totalCaught < levels[index].target) {
        break;
      }

      currentIndex = index;
    }

    const current = levels[currentIndex];
    const next = levels[currentIndex + 1] || null;

    return {
      ...current,
      next,
      progress: next ? totalCaught - current.target : 1,
      progressTarget: next ? next.target - current.target : 1
    };
  }

  function render(data) {
    const info = getLevelInfo(data.totalCaught);

    levelButton.textContent = `成长 Lv.${info.level}`;
    levelElement.textContent = `Lv.${info.level}`;
    titleElement.textContent = info.title;
    progressElement.max = info.progressTarget;
    progressElement.value = info.progress;
    nextElement.textContent = info.next
      ? `再钓 ${info.next.target - data.totalCaught} 条鱼，晋升为${info.next.title}`
      : `累计钓到 ${data.totalCaught} 条鱼，已达到最高等级`;
  }
})();
