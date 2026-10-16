// Web Audio API Synthesizer - Menghasilkan efek suara interaktif tanpa perlu file MP3 eksternal
const AudioManager = (function() {
  let audioCtx = null;
  let isMuted = false;

  function getContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1, delay = 0) {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + delay;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(gainVal, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  return {
    toggleMute() {
      isMuted = !isMuted;
      return isMuted;
    },
    isMuted() {
      return isMuted;
    },
    click() {
      playTone(600, 'triangle', 0.04, 0.05);
    },
    chime() {
      // Dua nada naik lembut (C5 -> G5)
      playTone(523.25, 'sine', 0.18, 0.12, 0);
      playTone(783.99, 'sine', 0.28, 0.12, 0.08);
    },
    success() {
      // Akord Major Fanfare (C5 -> E5 -> G5 -> C6)
      playTone(523.25, 'triangle', 0.15, 0.12, 0);
      playTone(659.25, 'triangle', 0.15, 0.12, 0.09);
      playTone(783.99, 'triangle', 0.18, 0.14, 0.18);
      playTone(1046.50, 'sine', 0.45, 0.18, 0.27);
    },
    tick() {
      playTone(800, 'square', 0.02, 0.03);
    },
    spinTick() {
      playTone(400 + Math.random() * 200, 'triangle', 0.03, 0.04);
    },
    alert() {
      playTone(350, 'sawtooth', 0.15, 0.08, 0);
      playTone(300, 'sawtooth', 0.25, 0.08, 0.12);
    }
  };
})();
