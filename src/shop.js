'use strict';

window.BossFishShop = {
  initShop
};

function initShop(options) {
  const {
    openButton,
    closeButton,
    overlay,
    list,
    message,
    getSave,
    saveGame,
    getUpgrades,
    onPurchase
  } = options;
  const upgradesPromise = getUpgrades();
  let upgrades = [];

  openButton.addEventListener('click', async () => {
    upgrades = await upgradesPromise;
    message.textContent = '';
    renderShop(list, upgrades, getSave(), purchaseUpgrade);
    overlay.hidden = false;
  });

  closeButton.addEventListener('click', () => {
    overlay.hidden = true;
  });

  function purchaseUpgrade(upgrade) {
    const data = getSave();
    const currentLevel = data.upgrades[upgrade.id];

    if (currentLevel >= upgrade.maxLevel) {
      message.textContent = '该升级已满级。';
      return;
    }

    const cost = getUpgradeCost(upgrade, currentLevel);

    if (data.coins < cost) {
      message.textContent = '金币不足。';
      return;
    }

    data.coins -= cost;
    data.upgrades[upgrade.id] += 1;
    saveGame(data);
    message.textContent = '购买成功。';
    renderShop(list, upgrades, data, purchaseUpgrade);
    onPurchase(data, upgrade.id);
  }
}

function renderShop(list, upgrades, data, onBuy) {
  list.replaceChildren();

  for (const upgrade of upgrades) {
    const currentLevel = data.upgrades[upgrade.id];
    const isMaxLevel = currentLevel >= upgrade.maxLevel;
    const entry = document.createElement('article');
    const name = document.createElement('h3');
    const description = document.createElement('p');
    const price = document.createElement('p');
    const buyButton = document.createElement('button');

    entry.className = 'upgrade-entry';
    name.textContent = `${upgrade.name} Lv.${currentLevel} / ${upgrade.maxLevel}`;
    description.className = 'upgrade-description';
    description.textContent = upgrade.description;
    price.className = 'upgrade-price';
    price.textContent = isMaxLevel
      ? '已满级'
      : `价格：${getUpgradeCost(upgrade, currentLevel)}`;
    buyButton.type = 'button';
    buyButton.textContent = isMaxLevel ? '满级' : '购买';
    buyButton.disabled = isMaxLevel;
    buyButton.addEventListener('click', () => onBuy(upgrade));

    entry.append(name, description, price, buyButton);
    list.append(entry);
  }
}

function getUpgradeCost(upgrade, currentLevel) {
  return Math.floor(upgrade.baseCost * upgrade.costMultiplier ** currentLevel);
}
