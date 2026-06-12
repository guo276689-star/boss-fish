'use strict';

(function initProgression() {
  const levelButton = document.getElementById('open-progression');
  const levelElement = document.getElementById('progression-level');
  const titleElement = document.getElementById('progression-title');
  const nextElement = document.getElementById('progression-next');
  const progressElement = document.getElementById('progression-level-progress');
  const badgeCountElement = document.getElementById('progression-badge-count');
  const badgeListElement = document.getElementById('progression-badge-list');
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
    getBadges,
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
    const badges = getBadges(data);

    levelButton.textContent = `成长 Lv.${info.level}`;
    levelElement.textContent = `Lv.${info.level}`;
    titleElement.textContent = info.title;
    progressElement.max = info.progressTarget;
    progressElement.value = info.progress;
    nextElement.textContent = info.next
      ? `再钓 ${info.next.target - data.totalCaught} 条鱼，晋升为${info.next.title}`
      : `累计钓到 ${data.totalCaught} 条鱼，已达到最高等级`;
    renderBadges(badges);
  }

  function getBadges(data) {
    const ownedCounts = Object.values(data.ownedFish);
    const discoveredFish = ownedCounts.filter((count) => count > 0).length;
    const hasFavoriteFish = ownedCounts.some((count) => count >= 10);

    return [
      createBadge('首次钓鱼', '钓到第一条办公室同事', data.totalCaught >= 1),
      createBadge('午休丰收', '累计钓到 10 条鱼', data.totalCaught >= 10),
      createBadge('熟练摸鱼', '累计钓到 50 条鱼', data.totalCaught >= 50),
      createBadge('百竿不怠', '累计钓到 100 条鱼', data.totalCaught >= 100),
      createBadge('图鉴起步', '发现 5 种鱼', discoveredFish >= 5),
      createBadge('办公水族箱', '发现 10 种鱼', discoveredFish >= 10),
      createBadge('鱼类同事录', '发现 15 种鱼', discoveredFish >= 15),
      createBadge('专属爱鱼', '同一种鱼累计钓到 10 条', hasFavoriteFish)
    ];
  }

  function createBadge(name, description, unlocked) {
    return { name, description, unlocked };
  }

  function renderBadges(badges) {
    badgeListElement.replaceChildren();

    for (const badge of badges) {
      const entry = document.createElement('article');
      const name = document.createElement('h4');
      const description = document.createElement('p');
      const status = document.createElement('span');

      entry.className = `progression-badge ${badge.unlocked ? 'unlocked' : ''}`;
      name.textContent = badge.name;
      description.textContent = badge.description;
      status.textContent = badge.unlocked ? '已解锁' : '未解锁';
      entry.append(name, description, status);
      badgeListElement.append(entry);
    }

    const unlockedCount = badges.filter((badge) => badge.unlocked).length;
    badgeCountElement.textContent = `${unlockedCount} / ${badges.length}`;
  }
})();
