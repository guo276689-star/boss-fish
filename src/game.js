'use strict';

window.BossFishGame = {
  start(canvas) {
    const context = canvas.getContext('2d');
    let fishBiting = false;
    let lastCaughtFishName = '';
    let catReaction = 'default';
    let catReactionTimer = null;
    context.imageSmoothingEnabled = false;

    function drawScene(timestamp) {
      const bobberOffset = Math.sin(timestamp / 450) * 2;
      const catMood = fishBiting ? 'bite' : catReaction;

      drawBackground(context);
      drawCat(context, catMood);
      drawFishingRod(context, bobberOffset, fishBiting);
      drawStatus(context, fishBiting, lastCaughtFishName);

      window.requestAnimationFrame(drawScene);
    }

    window.requestAnimationFrame(drawScene);

    return {
      setFishBiting(isBiting) {
        fishBiting = isBiting;

        if (isBiting) {
          clearCatReaction();
        }
      },
      setLastCaughtFish(fish) {
        lastCaughtFishName = fish ? fish.name : '';
      },
      setCatReaction(fish) {
        window.clearTimeout(catReactionTimer);
        catReaction = fish ? fish.rarity : 'default';
        catReactionTimer = window.setTimeout(clearCatReaction, 2500);
      },
      clearCatReaction
    };

    function clearCatReaction() {
      window.clearTimeout(catReactionTimer);
      catReactionTimer = null;
      catReaction = 'default';
    }
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

function drawCat(context, mood) {
  context.fillStyle = '#66584d';
  context.fillRect(42, 70, 38, 34);
  context.fillRect(48, 52, 28, 24);
  context.fillRect(
    48,
    mood === 'bite' ? 42 : 46,
    8,
    mood === 'bite' ? 14 : 10
  );
  context.fillRect(
    68,
    mood === 'bite' ? 42 : 46,
    8,
    mood === 'bite' ? 14 : 10
  );
  context.fillRect(34, 94, 14, 8);

  drawCatFace(context, mood);
  drawCatAccent(context, mood);
}

function drawCatFace(context, mood) {
  if (mood === 'bite' || mood === 'legendary') {
    context.fillStyle = '#eee1c5';
    context.fillRect(52, 61, 8, 8);
    context.fillRect(66, 61, 8, 8);
    context.fillStyle = '#3e3833';
    context.fillRect(55, 63, 3, 4);
    context.fillRect(69, 63, 3, 4);
  } else if (mood === 'rare') {
    context.fillStyle = '#3e3833';
    context.fillRect(53, 64, 7, 2);
    context.fillRect(67, 64, 7, 2);
    context.fillRect(53, 62, 2, 2);
    context.fillRect(72, 62, 2, 2);
  } else if (mood === 'epic') {
    context.fillStyle = '#fff3a6';
    context.fillRect(52, 61, 8, 8);
    context.fillRect(66, 61, 8, 8);
    context.fillStyle = '#8a5b18';
    context.fillRect(55, 63, 3, 3);
    context.fillRect(69, 63, 3, 3);
  } else {
    context.fillStyle = '#eee1c5';
    context.fillRect(54, 64, 5, 5);
    context.fillRect(67, 64, 5, 5);
    context.fillStyle = '#3e3833';
    context.fillRect(56, 65, 2, 2);
    context.fillRect(69, 65, 2, 2);
  }

  context.fillStyle = '#3e3833';

  if (mood === 'common' || mood === 'rare' || mood === 'epic') {
    context.fillRect(61, 70, 5, 2);
    context.fillRect(59, 69, 2, 2);
    context.fillRect(66, 69, 2, 2);
  } else {
    context.fillRect(61, 71, 5, 3);
  }

  if (mood === 'rare') {
    context.fillStyle = '#d78579';
    context.fillRect(50, 69, 3, 2);
    context.fillRect(74, 69, 3, 2);
  }
}

function drawCatAccent(context, mood) {
  if (mood === 'bite') {
    context.fillStyle = '#b52d27';
    context.fillRect(61, 30, 4, 8);
    context.fillRect(61, 40, 4, 4);
    return;
  }

  if (mood === 'epic') {
    drawStar(context, 43, 54, '#f3c84b');
    drawStar(context, 79, 49, '#f3c84b');
    return;
  }

  if (mood === 'legendary') {
    context.fillStyle = '#e6b735';
    context.fillRect(52, 43, 24, 7);
    context.fillRect(52, 38, 5, 5);
    context.fillRect(61, 35, 6, 8);
    context.fillRect(71, 38, 5, 5);
    context.fillStyle = '#fff1a6';
    context.fillRect(62, 37, 4, 3);
  }
}

function drawStar(context, x, y, color) {
  context.fillStyle = color;
  context.fillRect(x + 3, y, 3, 9);
  context.fillRect(x, y + 3, 9, 3);
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
