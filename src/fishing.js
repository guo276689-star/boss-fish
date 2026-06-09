'use strict';

window.BossFishFishing = {
  async create(onBiteChange, onCatch) {
    const response = await fetch('data/fish.json');
    const fishList = await response.json();
    let fishBiting = false;

    function scheduleBite() {
      const delay = 20000 + Math.random() * 40000;

      window.setTimeout(() => {
        fishBiting = true;
        onBiteChange(true);
      }, delay);
    }

    function catchFish() {
      if (!fishBiting) {
        return;
      }

      fishBiting = false;
      onBiteChange(false);

      const fish = pickWeightedFish(fishList);
      onCatch(fish);
      scheduleBite();
    }

    scheduleBite();

    return {
      catchFish
    };
  }
};

function pickWeightedFish(fishList) {
  const totalWeight = fishList.reduce((sum, fish) => sum + fish.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const fish of fishList) {
    roll -= fish.weight;

    if (roll < 0) {
      return fish;
    }
  }

  return fishList[fishList.length - 1];
}
