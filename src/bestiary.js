'use strict';

const BESTIARY_RARITY_LABELS = {
  common: '普通',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说'
};

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

  for (const rarity of Object.keys(BESTIARY_RARITY_LABELS)) {
    const discovered = fishList.filter((fish) => (
      fish.rarity === rarity && (ownedFish[fish.id] || 0) > 0
    ));

    appendBestiaryGroup(
      list,
      `${BESTIARY_RARITY_LABELS[rarity]} · 已发现 ${discovered.length}`,
      discovered.map((fish) => createFishEntry(
        fish,
        ownedFish[fish.id],
        list,
        detail
      ))
    );
  }

  const lockedCount = fishList.filter((fish) => !ownedFish[fish.id]).length;
  appendBestiaryGroup(
    list,
    `未发现 · ${lockedCount}`,
    Array.from({ length: lockedCount }, createLockedFishEntry)
  );
}

function appendBestiaryGroup(list, titleText, entries) {
  if (entries.length === 0) {
    return;
  }

  const group = document.createElement('section');
  const title = document.createElement('h3');
  const entriesElement = document.createElement('div');

  group.className = 'bestiary-group';
  title.className = 'bestiary-group-title';
  title.textContent = titleText;
  entriesElement.className = 'bestiary-group-entries';
  entriesElement.append(...entries);
  group.append(title, entriesElement);
  list.append(group);
}

function createFishEntry(fish, count, list, detail) {
  const entry = document.createElement('button');
  const name = document.createElement('h3');
  const meta = document.createElement('p');
  const description = document.createElement('p');

  entry.className = 'fish-entry fish-entry-button';
  entry.type = 'button';
  name.textContent = fish.name;
  meta.className = 'fish-meta';
  meta.textContent = `${BESTIARY_RARITY_LABELS[fish.rarity]} · 已钓到 ${count}`;
  description.className = 'fish-description';
  description.textContent = fish.description;
  entry.append(name, meta, description);
  entry.addEventListener('click', () => {
    renderFishDetail(detail, fish, count);
    list.hidden = true;
    detail.hidden = false;
  });
  return entry;
}

function createLockedFishEntry() {
  const entry = document.createElement('article');
  const name = document.createElement('h3');

  entry.className = 'fish-entry fish-entry-locked';
  name.textContent = '？？？';
  entry.append(name);
  return entry;
}

function renderFishDetail(detail, fish, count) {
  detail.querySelector('#bestiary-detail-name').textContent = fish.name;
  detail.querySelector('#bestiary-detail-rarity').textContent = (
    BESTIARY_RARITY_LABELS[fish.rarity]
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
