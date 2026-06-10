'use strict';

window.BossFishFishing = {
  async create(onBiteChange, onCatch, getBiteSpeedLevel) {
    const response = await fetch('data/fish.json');
    const fishList = await response.json();
    let fishBiting = false;
    let biteTimer = null;

    function scheduleBite() {
      const level = getBiteSpeedLevel();
      const minimumSeconds = Math.max(10, 20 - level * 2);
      const maximumSeconds = Math.max(40, 60 - level * 4);
      const delay = (
        minimumSeconds +
        Math.random() * (maximumSeconds - minimumSeconds)
      ) * 1000;

      biteTimer = window.setTimeout(() => {
        biteTimer = null;
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

    function refreshBiteTimer() {
      if (fishBiting) {
        return;
      }

      window.clearTimeout(biteTimer);
      scheduleBite();
    }

    scheduleBite();

    return {
      catchFish,
      refreshBiteTimer
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
