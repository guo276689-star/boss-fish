'use strict';

const DRAG_THRESHOLD = 4;
const miniButton = document.getElementById('mini-button');
const biteIndicator = document.getElementById('bite-indicator');
let pointerId = null;
let startX = 0;
let startY = 0;
let dragging = false;
let dragReady = null;

window.BossFishWindow.onMiniBiting((isBiting) => {
  biteIndicator.hidden = !isBiting;
});

miniButton.addEventListener('pointerdown', (event) => {
  pointerId = event.pointerId;
  startX = event.screenX;
  startY = event.screenY;
  dragging = false;
  miniButton.setPointerCapture(pointerId);
  dragReady = window.BossFishWindow.startMiniDrag(startX, startY);
});

miniButton.addEventListener('pointermove', (event) => {
  if (event.pointerId !== pointerId) {
    return;
  }

  const distance = Math.hypot(
    event.screenX - startX,
    event.screenY - startY
  );

  if (distance < DRAG_THRESHOLD) {
    return;
  }

  dragging = true;
  const currentX = event.screenX;
  const currentY = event.screenY;

  dragReady.then(() => {
    window.BossFishWindow.moveMiniDrag(currentX, currentY);
  });
});

miniButton.addEventListener('pointerup', async (event) => {
  if (event.pointerId !== pointerId) {
    return;
  }

  miniButton.releasePointerCapture(pointerId);
  pointerId = null;

  if (dragging) {
    await window.BossFishWindow.endMiniDrag();
    return;
  }

  await window.BossFishWindow.restoreGame();
});

miniButton.addEventListener('pointercancel', async (event) => {
  if (event.pointerId !== pointerId) {
    return;
  }

  pointerId = null;
  await window.BossFishWindow.endMiniDrag();
});
