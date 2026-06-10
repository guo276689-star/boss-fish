'use strict';

const gameView = document.getElementById('game-view');
const reportView = document.getElementById('report-view');
const openReportButton = document.getElementById('open-report');
const closeReportButton = document.getElementById('close-report');

openReportButton.addEventListener('click', () => {
  gameView.hidden = true;
  reportView.hidden = false;
});

closeReportButton.addEventListener('click', () => {
  reportView.hidden = true;
  gameView.hidden = false;
});
