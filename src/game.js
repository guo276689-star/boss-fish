'use strict';

const SCENE_WIDTH = 420;
const SCENE_HEIGHT = 190;
const CATCH_DURATION = 760;
const CAT_ANIMATION_SETTINGS = {
  idle: { frameDuration: 400, loop: true },
  bite: { frameDuration: 100, loop: true },
  happy: { frameDuration: 320, loop: true },
  excited: { frameDuration: 300, loop: true },
  pull: { frameDuration: CATCH_DURATION / 3, loop: false }
};
const CAT_FRAME_SOURCES = {
  idle: [
    'assets/images/cats/idle-1.png',
    'assets/images/cats/idle-2.png'
  ],
  bite: [
    'assets/images/cats/bite-1.png',
    'assets/images/cats/bite-2.png'
  ],
  happy: [
    'assets/images/cats/happy-1.png',
    'assets/images/cats/happy-2.png',
    'assets/images/cats/happy-3.png'
  ],
  excited: [
    'assets/images/cats/excited-1.png',
    'assets/images/cats/excited-2.png',
    'assets/images/cats/excited-3.png',
    'assets/images/cats/excited-4.png'
  ],
  pull: [
    'assets/images/cats/pull-1.png',
    'assets/images/cats/pull-2.png',
    'assets/images/cats/pull-3.png'
  ]
};
const FISH_SPRITE_SOURCES = [
  'assets/images/fish/round.png',
  'assets/images/fish/carp.png',
  'assets/images/fish/eel.png',
  'assets/images/fish/sardine.png',
  'assets/images/fish/catfish.png',
  'assets/images/fish/jellyfish.png',
  'assets/images/fish/turtle.png',
  'assets/images/fish/octopus.png',
  'assets/images/fish/crab.png',
  'assets/images/fish/seahorse.png',
  'assets/images/fish/shark.png',
  'assets/images/fish/whale.png',
  'assets/images/fish/stingray.png',
  'assets/images/fish/starfish.png',
  'assets/images/fish/swordfish.png',
  'assets/images/fish/puffer.png'
];

window.BossFishGame = {
  start(canvas) {
    const scene = createScene(canvas);

    scene.images.ready.then(() => {
      window.requestAnimationFrame((timestamp) => drawScene(scene, timestamp));
    });
    return createGameApi(scene);
  }
};

function createScene(canvas) {
  const context = canvas.getContext('2d');

  context.imageSmoothingEnabled = false;
  return {
    context,
    images: createGameImages(),
    state: {
      fishBiting: false,
      lastCaughtFishName: '',
      catReaction: null,
      catReactionUntil: 0,
      catchAnimation: null,
      catAnimationState: 'idle',
      catAnimationStartedAt: window.performance.now()
    }
  };
}

function createGameApi(scene) {
  return {
    setFishBiting(isBiting) {
      scene.state.fishBiting = isBiting;

      if (isBiting) {
        clearReaction(scene.state);
        setCatAnimationState(
          scene.state,
          'bite',
          window.performance.now()
        );
      }
    },
    setLastCaughtFish(fish) {
      scene.state.lastCaughtFishName = fish ? fish.name : '';
    },
    playCatch(fish) {
      const now = window.performance.now();

      scene.state.catchAnimation = {
        fish,
        startedAt: now
      };
      scene.state.catReaction = isRareFish(fish) ? 'excited' : 'happy';
      scene.state.catReactionUntil = now + 2500;
      setCatAnimationState(scene.state, 'pull', now);
    },
    clearCatReaction() {
      clearReaction(scene.state);
      setCatAnimationState(
        scene.state,
        'idle',
        window.performance.now()
      );
    }
  };
}

function clearReaction(state) {
  state.catReaction = null;
  state.catReactionUntil = 0;
  state.catchAnimation = null;
}

function drawScene(scene, timestamp) {
  const catchPose = getCatchPose(scene.state, timestamp);
  const nextCatState = getCatState(scene.state, catchPose, timestamp);
  const bobberPose = getBobberPose(timestamp, scene.state.fishBiting);

  setCatAnimationState(scene.state, nextCatState, timestamp);
  drawBackground(scene.context, scene.images.pondBackground);
  drawPondMotion(scene.context, timestamp);
  if (scene.state.fishBiting) {
    drawBiteRipple(scene.context, bobberPose, timestamp);
  }
  drawCat(
    scene.context,
    getCatFrame(
      scene.images.cats,
      scene.state.catAnimationState,
      timestamp - scene.state.catAnimationStartedAt
    )
  );
  drawFishingRod(
    scene.context,
    scene.images.bobber,
    bobberPose,
    catchPose,
    scene.state.catAnimationState,
    scene.state.fishBiting
  );
  drawCatchFish(scene.context, scene.images.fish, catchPose);
  drawStatus(
    scene.context,
    scene.state.fishBiting,
    scene.state.lastCaughtFishName
  );
  window.requestAnimationFrame((nextTimestamp) => {
    drawScene(scene, nextTimestamp);
  });
}

function createGameImages() {
  const pending = [];
  const images = {
    pondBackground: loadImage('assets/images/pond_background.png', pending),
    bobber: loadImage('assets/images/bobber.png', pending),
    cats: Object.fromEntries(
      Object.entries(CAT_FRAME_SOURCES).map(([state, sources]) => {
        return [
          state,
          sources.map((source) => loadImage(source, pending))
        ];
      })
    ),
    fish: new Map(
      FISH_SPRITE_SOURCES.map((source) => {
        return [source, loadImage(source, pending)];
      })
    )
  };

  images.ready = Promise.all(pending);
  return images;
}

function loadImage(source, pending) {
  const image = new Image();
  const ready = new Promise((resolve) => {
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', resolve, { once: true });
  });

  pending.push(ready);
  image.src = source;
  return image;
}

function isImageReady(image) {
  return image && image.complete && image.naturalWidth > 0;
}

function isRareFish(fish) {
  return fish && fish.rarity !== 'common';
}

function drawBackground(context, backgroundImage) {
  if (isImageReady(backgroundImage)) {
    context.fillStyle = '#55aeb5';
    context.fillRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);
    context.drawImage(backgroundImage, 0, 0);
    return;
  }

  context.fillStyle = '#a9d9e8';
  context.fillRect(0, 0, SCENE_WIDTH, 72);
  context.fillStyle = '#d7c58b';
  context.fillRect(0, 72, SCENE_WIDTH, 38);
  context.fillStyle = '#72b6c9';
  context.fillRect(0, 110, SCENE_WIDTH, 80);
  context.fillStyle = '#8cc8d6';
  context.fillRect(0, 122, SCENE_WIDTH, 4);
  context.fillRect(210, 146, 58, 3);
  context.fillRect(320, 168, 48, 3);
  context.fillStyle = '#8aa45d';
  context.fillRect(0, 68, SCENE_WIDTH, 8);
}

function drawPondMotion(context, timestamp) {
  const waveShift = Math.floor(timestamp / 320) % 2;
  const shimmerVisible = Math.floor(timestamp / 900) % 3 === 0;

  context.globalAlpha = 0.55;
  drawWave(context, 198 + waveShift * 2, 132, 24);
  drawWave(context, 344 - waveShift * 2, 158, 18);
  drawWave(context, 238 - waveShift, 176, 30);
  drawBubbles(context, timestamp);

  if (shimmerVisible) {
    context.fillStyle = '#c8eef0';
    context.fillRect(365, 126, 5, 2);
    context.fillRect(368, 123, 2, 8);
  }

  context.globalAlpha = 1;
}

function drawWave(context, x, y, width) {
  context.fillStyle = '#a7dfe3';
  context.fillRect(x, y, width, 2);
  context.fillRect(x + 5, y + 3, Math.max(4, width - 10), 1);
}

function drawBubbles(context, timestamp) {
  const bubbles = [
    { x: 326, y: 172, phase: 0 },
    { x: 382, y: 151, phase: 900 },
    { x: 226, y: 166, phase: 1700 }
  ];

  context.fillStyle = '#bce9eb';
  for (const bubble of bubbles) {
    const cycle = (timestamp + bubble.phase) % 2800;

    if (cycle > 1500) {
      continue;
    }

    const rise = Math.floor(cycle / 300) * 3;
    context.fillRect(bubble.x, bubble.y - rise, 3, 3);
    context.clearRect(bubble.x + 1, bubble.y - rise + 1, 1, 1);
  }
}

function drawBiteRipple(context, bobberPose, timestamp) {
  const stage = Math.floor(timestamp / 100) % 3;
  const width = 20 + stage * 8;
  const left = Math.round(bobberPose.x - width / 2);
  const y = Math.round(bobberPose.y + 9 + stage * 2);

  context.globalAlpha = 0.7;
  context.fillStyle = '#d7f4ef';
  context.fillRect(left, y, width, 2);
  context.fillRect(left + 5, y + 3, width - 10, 1);
  context.globalAlpha = 1;
}

function getCatState(state, catchPose, timestamp) {
  if (catchPose) {
    return 'pull';
  }

  if (state.fishBiting) {
    return 'bite';
  }

  if (state.catReaction && timestamp < state.catReactionUntil) {
    return state.catReaction;
  }

  state.catReaction = null;
  return 'idle';
}

function setCatAnimationState(state, nextState, timestamp) {
  if (state.catAnimationState === nextState) {
    return;
  }

  state.catAnimationState = nextState;
  state.catAnimationStartedAt = timestamp;
}

function getCatFrame(catFrames, state, elapsed) {
  const frames = catFrames[state] || catFrames.idle;
  const settings = CAT_ANIMATION_SETTINGS[state];
  const rawIndex = Math.floor(Math.max(0, elapsed) / settings.frameDuration);
  const frameIndex = settings.loop
    ? rawIndex % frames.length
    : Math.min(rawIndex, frames.length - 1);

  return frames[frameIndex];
}

function drawCat(context, catImage) {
  if (isImageReady(catImage)) {
    context.drawImage(catImage, 20, 25, 96, 96);
    return;
  }

  context.fillStyle = '#66584d';
  context.fillRect(43, 66, 38, 38);
  context.fillStyle = '#eee1c5';
  context.fillRect(49, 48, 28, 28);
}

function getBobberPose(timestamp, fishBiting) {
  const idleOffsets = [0, -1, -2, -1, 0, 1, 2, 1];
  const biteOffsets = [
    { x: -3, y: 2 },
    { x: 3, y: -3 },
    { x: -2, y: -1 },
    { x: 2, y: 3 }
  ];

  if (fishBiting) {
    const offset = biteOffsets[
      Math.floor(timestamp / 100) % biteOffsets.length
    ];
    return { x: 286 + offset.x, y: 137 + offset.y };
  }

  const offset = idleOffsets[
    Math.floor(timestamp / 200) % idleOffsets.length
  ];
  return { x: 286, y: 137 + offset };
}

function drawFishingRod(
  context,
  bobberImage,
  bobberPose,
  catchPose,
  catState,
  fishBiting
) {
  const rodTip = catState === 'pull'
    ? { x: 194, y: 48 }
    : { x: 218, y: 62 };
  const lineTarget = catchPose
    ? { x: catchPose.x, y: catchPose.y - 12 }
    : bobberPose;

  drawLine(context, '#4b3d32', 4, 84, 84, rodTip.x, rodTip.y);
  drawLine(
    context,
    '#ded7c4',
    1,
    rodTip.x,
    rodTip.y,
    lineTarget.x,
    lineTarget.y
  );

  if (!catchPose) {
    drawBobber(context, bobberImage, bobberPose, fishBiting);
  }
}

function drawLine(context, color, width, startX, startY, endX, endY) {
  context.strokeStyle = color;
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

function drawBobber(context, image, pose, fishBiting) {
  if (isImageReady(image)) {
    context.drawImage(image, Math.round(pose.x - 12), Math.round(pose.y - 12));
  } else {
    context.fillStyle = fishBiting ? '#e23d32' : '#f2eee2';
    context.fillRect(pose.x - 3, pose.y - 7, 6, 7);
    context.fillStyle = '#d8584c';
    context.fillRect(pose.x - 4, pose.y, 8, 8);
  }

  context.fillStyle = '#518fa3';
  context.fillRect(pose.x - 10, pose.y + 9, 20, 2);
}

function getCatchPose(state, timestamp) {
  const animation = state.catchAnimation;

  if (!animation) {
    return null;
  }

  const elapsed = timestamp - animation.startedAt;
  if (elapsed >= CATCH_DURATION) {
    state.catchAnimation = null;
    return null;
  }

  const progress = Math.max(0, elapsed / CATCH_DURATION);
  const eased = 1 - Math.pow(1 - progress, 2);

  return {
    fish: animation.fish,
    x: Math.round(lerp(286, 156, eased)),
    y: Math.round(lerp(151, 88, eased) - Math.sin(progress * Math.PI) * 25),
    rotation: lerp(-0.14, 0.08, eased)
  };
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function drawCatchFish(context, fishImages, pose) {
  if (!pose) {
    return;
  }

  const image = fishImages.get(pose.fish.sprite);
  if (!isImageReady(image)) {
    drawCatchFishFallback(context, pose);
    return;
  }

  context.save();
  context.translate(pose.x, pose.y);
  context.rotate(pose.rotation);
  context.drawImage(image, -42, -28, 84, 56);
  context.restore();
}

function drawCatchFishFallback(context, pose) {
  context.save();
  context.translate(pose.x, pose.y);
  context.rotate(pose.rotation);
  context.fillStyle = '#e0a844';
  context.fillRect(-24, -10, 36, 20);
  context.fillRect(12, -7, 12, 14);
  context.fillStyle = '#3e3833';
  context.fillRect(-17, -4, 3, 3);
  context.restore();
}

function drawStatus(context, fishBiting, lastCaughtFishName) {
  context.font = 'bold 15px "Microsoft YaHei", sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  if (fishBiting) {
    drawStatusLabel(
      context,
      '上钩了！',
      286,
      106,
      '#fff1dc',
      '#9e332c',
      '#9e332c'
    );
  }

  if (lastCaughtFishName) {
    drawStatusLabel(
      context,
      `最近钓到：${lastCaughtFishName}`,
      210,
      18,
      '#fff8df',
      '#5b4b3c',
      '#3e514a'
    );
  }
}

function drawStatusLabel(
  context,
  text,
  centerX,
  centerY,
  backgroundColor,
  borderColor,
  textColor
) {
  const horizontalPadding = 10;
  const height = 24;
  const width = Math.min(
    380,
    Math.ceil(context.measureText(text).width) + horizontalPadding * 2
  );
  const left = Math.round(centerX - width / 2);
  const top = Math.round(centerY - height / 2);

  context.fillStyle = borderColor;
  context.fillRect(left, top, width, height);
  context.fillStyle = backgroundColor;
  context.fillRect(left + 2, top + 2, width - 4, height - 4);
  context.fillStyle = textColor;
  context.fillText(text, centerX, centerY + 1, width - horizontalPadding * 2);
}
