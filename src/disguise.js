'use strict';

(function initReportMode() {
  const featuresView = document.getElementById('features-view');
  const reportView = document.getElementById('report-view');
  const openReportButton = document.getElementById('open-report');
  const closeReportButton = document.getElementById('close-report');

  openReportButton.addEventListener('click', () => {
    featuresView.hidden = true;
    reportView.hidden = false;
  });

  closeReportButton.addEventListener('click', () => {
    reportView.hidden = true;
    featuresView.hidden = false;
  });
})();
