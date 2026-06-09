'use strict';

window.BossFishGame = {
  start(canvas) {
    const context = canvas.getContext('2d');
    let fishBiting = false;
    let lastCaughtFishName = '';
    context.imageSmoothingEnabled = false;

    function drawScene(timestamp) {
      const bobberOffset = Math.sin(timestamp / 450) * 2;

      drawBackground(context);
      drawCat(context);
      drawFishingRod(context, bobberOffset, fishBiting);
      drawStatus(context, fishBiting, lastCaughtFishName);

      window.requestAnimationFrame(drawScene);
    }

    window.requestAnimationFrame(drawScene);

    return {
      setFishBiting(isBiting) {
        fishBiting = isBiting;
      },
      setLastCaughtFish(fish) {
        lastCaughtFishName = fish.name;
      }
    };
  }
};

function drawBackground(context) {
  context.fillStyle = '#a9d9e8';
  context.fillRect(0, 0, 420, 72);

  context.fillStyle = '#d7c58b';
  context.fillRect(0, 72, 420, 38);

  context.fillStyle = '#72b6c9';
  context.fillRect(0, 110, 420, 80);

  context.fillStyle = '#8cc8d6';
  context.fillRect(0, 122, 420, 4);
  context.fillRect(210, 146, 58, 3);
  context.fillRect(320, 168, 48, 3);

  context.fillStyle = '#8aa45d';
  context.fillRect(0, 68, 420, 8);

  context.fillStyle = '#6f8e4f';
  context.fillRect(16, 62, 5, 10);
  context.fillRect(28, 65, 5, 7);
  context.fillRect(390, 63, 5, 9);
}

function drawCat(context) {
  context.fillStyle = '#66584d';
  context.fillRect(42, 70, 38, 34);
  context.fillRect(48, 52, 28, 24);
  context.fillRect(48, 46, 8, 10);
  context.fillRect(68, 46, 8, 10);
  context.fillRect(34, 94, 14, 8);

  context.fillStyle = '#eee1c5';
  context.fillRect(54, 64, 5, 5);
  context.fillRect(67, 64, 5, 5);

  context.fillStyle = '#3e3833';
  context.fillRect(56, 65, 2, 2);
  context.fillRect(69, 65, 2, 2);
  context.fillRect(61, 71, 5, 3);
}

function drawFishingRod(context, bobberOffset, fishBiting) {
  const bobberX = 286;
  const bobberY = 137 + bobberOffset;

  context.strokeStyle = '#4b3d32';
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(75, 79);
  context.lineTo(218, 62);
  context.stroke();

  context.strokeStyle = '#ded7c4';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(218, 62);
  context.lineTo(bobberX, bobberY);
  context.stroke();

  context.fillStyle = fishBiting ? '#e23d32' : '#f2eee2';
  context.fillRect(bobberX - 3, bobberY - 7, 6, 7);

  context.fillStyle = fishBiting ? '#e23d32' : '#d8584c';
  context.fillRect(bobberX - 4, bobberY, 8, 8);

  context.fillStyle = '#518fa3';
  context.fillRect(bobberX - 10, bobberY + 9, 20, 2);
}

function drawStatus(context, fishBiting, lastCaughtFishName) {
  context.font = 'bold 16px "Microsoft YaHei", sans-serif';
  context.textAlign = 'center';

  if (fishBiting) {
    context.fillStyle = '#b52d27';
    context.fillText('上钩了！', 286, 112);
  }

  if (lastCaughtFishName) {
    context.fillStyle = '#3e514a';
    context.fillText(`最近钓到：${lastCaughtFishName}`, 210, 24);
  }
}
