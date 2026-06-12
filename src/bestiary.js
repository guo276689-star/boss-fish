'use strict';

window.BossFishBestiary = {
  initBestiary
};

function initBestiary(options) {
  const {
    openButton,
    closeButton,
    overlay,
    list,
    detail,
    closeDetailButton,
    getSave,
    getFishList
  } = options;
  const fishListPromise = getFishList();

  openButton.addEventListener('click', async () => {
    const fishList = await fishListPromise;
    renderBestiary(list, detail, fishList, getSave().ownedFish);
    overlay.hidden = false;
  });

  closeButton.addEventListener('click', () => {
    overlay.hidden = true;
  });

  closeDetailButton.addEventListener('click', () => {
    detail.hidden = true;
    list.hidden = false;
  });
}

function renderBestiary(list, detail, fishList, ownedFish) {
  list.replaceChildren();
  list.hidden = false;
  detail.hidden = true;

  for (const fish of fishList) {
    const count = ownedFish[fish.id] || 0;
    const entry = document.createElement(count > 0 ? 'button' : 'article');
    entry.className = 'fish-entry';

    if (count === 0) {
      const lockedName = document.createElement('h3');
      lockedName.textContent = '？？？';
      entry.append(lockedName);
      list.append(entry);
      continue;
    }

    entry.classList.add('fish-entry-button');
    entry.type = 'button';
    const name = document.createElement('h3');
    const meta = document.createElement('p');
    const description = document.createElement('p');

    name.textContent = fish.name;
    meta.className = 'fish-meta';
    meta.textContent = `${fish.rarity} · 已钓到 ${count}`;
    description.className = 'fish-description';
    description.textContent = fish.description;

    entry.append(name, meta, description);
    entry.addEventListener('click', () => {
      renderFishDetail(detail, fish, count);
      list.hidden = true;
      detail.hidden = false;
    });
    list.append(entry);
  }
}

function renderFishDetail(detail, fish, count) {
  const rarityLabels = {
    common: '普通',
    rare: '稀有',
    epic: '史诗',
    legendary: '传说'
  };

  detail.querySelector('#bestiary-detail-name').textContent = fish.name;
  detail.querySelector('#bestiary-detail-rarity').textContent = (
    rarityLabels[fish.rarity]
  );
  detail.querySelector('#bestiary-detail-price').textContent = (
    `${fish.basePrice} 金币`
  );
  detail.querySelector('#bestiary-detail-count').textContent = `${count} 条`;
  detail.querySelector('#bestiary-detail-description').textContent = (
    fish.description
  );
  detail.querySelector('#bestiary-detail-flavor').textContent = (
    fish.flavorText || fish.description || ''
  );
}
