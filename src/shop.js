'use strict';

window.BossFishShop = {
  getUpgradeEffectText,
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
    const effect = document.createElement('p');
    const price = document.createElement('p');
    const buyButton = document.createElement('button');

    entry.className = 'upgrade-entry';
    name.textContent = `${upgrade.name} Lv.${currentLevel} / ${upgrade.maxLevel}`;
    description.className = 'upgrade-description';
    description.textContent = upgrade.description;
    effect.className = 'upgrade-effect';
    effect.textContent = getUpgradeEffectText(
      upgrade.id,
      currentLevel,
      upgrade.maxLevel
    );
    price.className = 'upgrade-price';
    price.textContent = isMaxLevel
      ? '已满级'
      : `价格：${getUpgradeCost(upgrade, currentLevel)}`;
    buyButton.type = 'button';
    buyButton.textContent = isMaxLevel ? '满级' : '购买';
    buyButton.disabled = isMaxLevel;
    buyButton.addEventListener('click', () => onBuy(upgrade));

    entry.append(name, description, effect, price, buyButton);
    list.append(entry);
  }
}

function getUpgradeEffectText(upgradeId, currentLevel, maxLevel) {
  const currentEffect = getEffectAtLevel(upgradeId, currentLevel);

  if (currentLevel >= maxLevel) {
    return `当前：${currentEffect} · 已满级`;
  }

  const nextEffect = getEffectAtLevel(upgradeId, currentLevel + 1);
  return `当前：${currentEffect} · 下级：${nextEffect}`;
}

function getEffectAtLevel(upgradeId, level) {
  if (upgradeId === 'biteSpeed') {
    const minimumSeconds = Math.max(10, 20 - level * 2);
    const maximumSeconds = Math.max(40, 60 - level * 4);
    return `${minimumSeconds}～${maximumSeconds} 秒`;
  }

  if (upgradeId === 'sellBonus') {
    return `+${level * 15}%`;
  }

  return '效果未知';
}

function getUpgradeCost(upgrade, currentLevel) {
  return Math.floor(upgrade.baseCost * upgrade.costMultiplier ** currentLevel);
}
