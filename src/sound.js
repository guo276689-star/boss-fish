'use strict';

(function initSound() {
  const toggleButton = document.getElementById('toggle-sound');
  let audioContext = null;
  let soundEnabled = false;

  window.BossFishSound = {
    playBite() {
      playSequence([
        { frequency: 520, duration: 0.09 }
      ]);
    },
    playCatch(rarity) {
      const sequences = {
        common: [
          { frequency: 440, duration: 0.08 },
          { frequency: 560, duration: 0.1, delay: 0.07 }
        ],
        rare: [
          { frequency: 520, duration: 0.1 },
          { frequency: 700, duration: 0.13, delay: 0.08 }
        ],
        epic: [
          { frequency: 520, duration: 0.1 },
          { frequency: 700, duration: 0.11, delay: 0.07 },
          { frequency: 880, duration: 0.16, delay: 0.15 }
        ],
        legendary: [
          { frequency: 440, duration: 0.1 },
          { frequency: 660, duration: 0.12, delay: 0.07 },
          { frequency: 880, duration: 0.13, delay: 0.15 },
          { frequency: 1040, duration: 0.2, delay: 0.24 }
        ]
      };

      playSequence(sequences[rarity] || sequences.common);
    },
    playQuestReward() {
      playSequence([
        { frequency: 600, duration: 0.09 },
        { frequency: 760, duration: 0.1, delay: 0.07 },
        { frequency: 920, duration: 0.15, delay: 0.14 }
      ]);
    },
    syncSettings(data) {
      soundEnabled = Boolean(data.settings.soundEnabled);
      renderToggle();
    }
  };

  toggleButton.addEventListener('click', () => {
    const data = window.BossFishSave.loadSave();
    data.settings.soundEnabled = !data.settings.soundEnabled;
    window.BossFishSave.saveGame(data);
    soundEnabled = data.settings.soundEnabled;
    renderToggle();

    if (soundEnabled) {
      resumeAudioContext();
    }
  });

  window.BossFishSound.syncSettings(window.BossFishSave.loadSave());

  function playSequence(tones) {
    if (!soundEnabled) {
      return;
    }

    try {
      const context = getAudioContext();

      if (!context) {
        return;
      }

      if (context.state === 'suspended') {
        context.resume()
          .then(() => scheduleTonesSafely(context, tones))
          .catch(() => {});
        return;
      }

      scheduleTonesSafely(context, tones);
    } catch {
      // Sound must never interrupt the game loop.
    }
  }

  function scheduleTonesSafely(context, tones) {
    try {
      scheduleTones(context, tones);
    } catch {
      // Ignore unavailable or interrupted audio output.
    }
  }

  function scheduleTones(context, tones) {
    for (const tone of tones) {
      const startTime = context.currentTime + (tone.delay || 0);
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(tone.frequency, startTime);
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.035, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        startTime + tone.duration
      );
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startTime);
      oscillator.stop(startTime + tone.duration);
    }
  }

  function resumeAudioContext() {
    try {
      const context = getAudioContext();

      if (context && context.state === 'suspended') {
        context.resume().catch(() => {});
      }
    } catch {
      // The setting remains enabled even if this device cannot play audio.
    }
  }

  function getAudioContext() {
    if (!audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;

      if (!AudioContext) {
        return null;
      }

      audioContext = new AudioContext();
    }

    return audioContext;
  }

  function renderToggle() {
    toggleButton.textContent = soundEnabled ? '音效：开' : '音效：关';
    toggleButton.setAttribute('aria-pressed', String(soundEnabled));
  }
})();
