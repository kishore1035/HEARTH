// HEARTH — Auditory UI Earcons & Tactile Haptic Engine
// Provides instantaneous, non-intrusive acoustic & vibration cues for accessibility.

let earconCtx = null;
let sharedDest = null;

export function setEarconContext(ctx, destination = null) {
  earconCtx = ctx;
  sharedDest = destination;
}

function getEarconContext() {
  if (!earconCtx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (Ctor) {
      earconCtx = new Ctor({ latencyHint: 'interactive' });
    }
  }
  if (earconCtx && earconCtx.state === 'suspended') {
    earconCtx.resume().catch(() => {});
  }
  return earconCtx;
}

/**
 * Synthesizes instantaneous, gentle acoustic feedback for UI actions.
 * @param {'enable' | 'disable' | 'tick' | 'milestone' | 'select' | 'disaster'} type
 */
export function playEarcon(type) {
  try {
    const ctx = getEarconContext();
    if (!ctx || ctx.state === 'closed') return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const dest = sharedDest || ctx.destination;

    if (type === 'enable') {
      // Ascending gentle ping (C5 523.25 Hz -> G5 783.99 Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.08);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.20, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(dest);
      osc.start(now);
      osc.stop(now + 0.19);
    } else if (type === 'disable') {
      // Descending gentle tone (G5 783.99 Hz -> C5 523.25 Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(783.99, now);
      osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.09);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(dest);
      osc.start(now);
      osc.stop(now + 0.17);
    } else if (type === 'tick') {
      // Snappy woodblock / tactile mechanical click (~25ms)
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.026);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'milestone') {
      // Dual-harmonic bell chime for benchmark years (1985, 2000, 2025)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);  // E5
      osc2.frequency.setValueAtTime(1318.5, now);  // E6

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(dest);

      osc1.start(now); osc1.stop(now + 0.34);
      osc2.start(now); osc2.stop(now + 0.34);
    } else if (type === 'select') {
      // Double celestial bell chime (D5 587.33 Hz -> A5 880 Hz)
      const notes = [587.33, 880.0];
      notes.forEach((freq, i) => {
        const start = now + i * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(0.09, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.23);
      });
    } else if (type === 'disaster') {
      // Low resonant rumble for catastrophe / alert
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(70, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + 0.35);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    }
  } catch (err) {
    // Non-critical: earcons should never break app execution
    console.debug('Earcon playback skipped:', err);
  }
}

/**
 * Triggers physical tactile haptic vibration patterns if supported on the device.
 * @param {'click' | 'milestone' | 'disaster' | 'select'} type
 */
export function triggerHaptic(type) {
  try {
    if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;

    if (type === 'click') {
      navigator.vibrate(14);
    } else if (type === 'milestone') {
      navigator.vibrate([30, 25, 30]);
    } else if (type === 'disaster') {
      navigator.vibrate([90, 40, 90]);
    } else if (type === 'select') {
      navigator.vibrate([25, 20, 40]);
    }
  } catch (err) {
    // Graceful degradation on devices without haptic engines
  }
}
