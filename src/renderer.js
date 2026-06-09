'use strict';

const canvas = document.getElementById('game-canvas');
const game = window.BossFishGame.start(canvas);

window.BossFishFishing.create(
  game.setFishBiting,
  game.setLastCaughtFish
).then((fishing) => {
  canvas.addEventListener('click', fishing.catchFish);
});
