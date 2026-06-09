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
    getSave,
    getFishList
  } = options;
  const fishListPromise = getFishList();

  openButton.addEventListener('click', async () => {
    const fishList = await fishListPromise;
    renderBestiary(list, fishList, getSave().ownedFish);
    overlay.hidden = false;
  });

  closeButton.addEventListener('click', () => {
    overlay.hidden = true;
  });
}

function renderBestiary(list, fishList, ownedFish) {
  list.replaceChildren();

  for (const fish of fishList) {
    const count = ownedFish[fish.id] || 0;
    const entry = document.createElement('article');
    entry.className = 'fish-entry';

    if (count === 0) {
      const lockedName = document.createElement('h3');
      lockedName.textContent = '？？？';
      entry.append(lockedName);
      list.append(entry);
      continue;
    }

    const name = document.createElement('h3');
    const meta = document.createElement('p');
    const description = document.createElement('p');

    name.textContent = fish.name;
    meta.className = 'fish-meta';
    meta.textContent = `${fish.rarity} · 已钓到 ${count}`;
    description.className = 'fish-description';
    description.textContent = fish.description;

    entry.append(name, meta, description);
    list.append(entry);
  }
}
