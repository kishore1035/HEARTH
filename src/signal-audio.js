// Web Audio engine for HEARTH Planetary Geospatial Sonification Observatory.
// Spans 28 planetary destinations: authentic spatial environment audio soundscapes
// paired with lush, harmonic, cinematic climate telemetry layers.
//
// Zero buzzing synth presets: pure harmonic sine/triangle ambient pads,
// crystalline glass-harp pentatonic arpeggiations, soft water droplets,
// deep subterranean sub-bass, and real CC0 spatial environmental recordings.

import { SIGNALS } from './regions.js';

const PENTATONIC = [0, 3, 5, 7, 10, 12];
const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value);

// Dataset ranges for normalized audio mapping
const AUDIO_RANGES = {
  temperature: [-25, 54],
  rain: [0, 6000],
  vegetation: [0.05, 0.95],
  canopy: [0, 35],
  groundwater: [-35, 25],
  seaLevel: [0, 300],
  air: [5, 120],
  carbon: [335, 445],
  lights: [0, 100],
  disasters: [0, 35]
};

function normalise(value, range) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return null;
  const min = range[0];
  const max = range[1];
  return clamp01((Number(value) - min) / (max - min));
}

function makeNoiseBuffer(ctx, seconds = 3) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function makeImpulse(ctx, seconds = 3.2, decay = 2.4) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = impulse.getChannelData(channel);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return impulse;
}

// Full 28-destination dedicated spatial environmental soundscape mapping
export const REGION_ENVIRONMENT_AUDIO = Object.freeze({
  // --- Major Incidents & Tsunamis ---
  tohoku_fukushima: { file: 'fukushima-tsunami.wav', name: 'Pacific Tsunami Surge, Concrete Seawall & Warning Bell', volume: 0.24 },
  banda_aceh: { file: 'banda-aceh-surf.wav', name: 'Indian Ocean Breakers & Tropical Rebuilt Shoreline', volume: 0.25 },
  chernobyl: { file: 'chernobyl-ruins.wav', name: 'Pripyat Exclusion Zone Whistling Ruins & Geiger Clicks', volume: 0.22 },
  venice_lagoon: { file: 'venice-canal.wav', name: 'Venetian Canal Water Lap & Distant Church Bell', volume: 0.24 },

  // --- Megafires & Wildfires ---
  california_wildfires: { file: 'wildfire-loop.ogg', name: 'Sierra Pine Forest Crown Fire & Timber Blaze', volume: 0.26 },
  australia_black_summer: { file: 'wildfire-loop.ogg', name: 'Black Summer Eucalyptus Bushfire Frontline & Ember Roar', volume: 0.26 },
  amazon_basin: { file: 'wildfire-loop.ogg', name: 'Amazon Basin Deforestation Arc Burning Timber & Smoke', volume: 0.25 },

  // --- Wonders of the World ---
  pyramids_giza: { file: 'giza-desert-wind.wav', name: 'Giza Plateau Sahara Desert Wind & Limestone Corridors', volume: 0.22 },
  taj_mahal: { file: 'taj-sitar-yaman.ogg', name: 'Yamuna Riverbank & Sacred Sitar Raga Yaman', volume: 0.26 },
  great_barrier_reef: { file: 'barrier-reef-marine.wav', name: 'Coral Sea Reef Lagoon Hydrophone & Tropical Swell', volume: 0.24 },
  mount_everest: { file: 'everest-howling-wind.ogg', name: 'Himalayan Khumbu Ridge & 8000m Alpine Blizzard Gale', volume: 0.24 },
  grand_canyon: { file: 'grand-canyon-echo.wav', name: 'Colorado River Gorge Cavernous Red-Rock Echoes', volume: 0.22 },
  machu_picchu: { file: 'machu-picchu-andes.wav', name: 'Andean Mountain Peak Mist & Sacred Quena Flute', volume: 0.24 },
  victoria_falls: { file: 'victoria-waterfall.ogg', name: 'Mosi-oa-Tunya Cataract Roar & White Water Deluge', volume: 0.25 },

  // --- Huge Beaches & Oceanic Coastal Sands ---
  praia_do_cassino: { file: 'praia-cassino-roar.wav', name: '240km South Atlantic Endless Rolling Ocean Roar', volume: 0.26 },
  coxs_bazar: { file: 'ocean-loop.ogg', name: 'Bay of Bengal 120km Intertidal Surf & Coastal Gale', volume: 0.26 },
  copacabana_beach: { file: 'ocean-loop.ogg', name: 'Copacabana Atlantic Shoreline Waves & Surf Breakers', volume: 0.25 },
  whitehaven_beach: { file: 'whitehaven-silica.wav', name: 'Whitsunday Coral Sand Shore & Gentle Silica Lap', volume: 0.22 },

  // --- Ancient & Lush Rainforests ---
  amazon_rainforest: { file: 'rainforest-loop.ogg', name: 'Amazon Primary Rainforest Canopy Wildlife & Rain', volume: 0.26 },
  congo_rainforest: { file: 'congo-jungle-night.wav', name: 'Congo Basin Primary Rainforest Night Insect Choir & Drip', volume: 0.24 },
  daintree_rainforest: { file: 'forest-birds.ogg', name: 'Daintree Ancient Tropical Rainforest Canopy & Creek', volume: 0.24 },
  borneo_rainforest: { file: 'borneo-swamp-chorus.wav', name: 'Borneo Tropical Peat Swamp & Treefrog Choir', volume: 0.24 },

  // --- Catastrophic Landslides & Mountain Disasters ---
  wayanad_landslide: { file: 'wayanad-landslide.wav', name: 'Western Ghats Monsoon Cloudburst & Mountain Torrent', volume: 0.25 },
  oso_landslide: { file: 'rain-thunder.ogg', name: 'Pacific Northwest River Valley Downpour & Thunder', volume: 0.25 },
  kedarnath_landslide: { file: 'kedarnath-debris.wav', name: 'Mandakini Valley Glacial Flood & Roaring River Rapids', volume: 0.25 },
  zhouqu_landslide: { file: 'wayanad-landslide.wav', name: 'Bailong River Mountain Canyon Mud Torrent & Deluge', volume: 0.25 },

  // --- Critical Biosphere Frontlines ---
  death_valley: { file: 'death-valley-heat.wav', name: 'Badwater Basin Shimmering Thermal Arid Drafts', volume: 0.20 },
  sundarbans: { file: 'sundarbans-mangrove.wav', name: 'Sundarbans Mangrove Tidal Estuary Swirl & Delta Breeze', volume: 0.24 }
});

export class SignalAudio {
  constructor() {
    this.ctx = null;
    this.ready = false;
    this.initPromise = null;
    this.region = null;
    this.year = null;
    this.enabled = new Set(SIGNALS.map((signal) => signal.key));
    this.norms = {};
    this.rates = { rain: 0.4, lights: 2, disasters: 0.1 };
    this.nextRain = 0;
    this.nextLights = 0;
    this.nextHit = 0;
    this.lightsStep = 0;
    this.userGain = null;
    this.analyser = null;
    this.muted = false;
    this.volume = 1;
    this.onStateChange = null;
    this.failureStatus = null;
    this.playRequested = false;
    this.hasPlayed = false;
    this.hasRun = false;

    // Spatial environmental soundscape state
    this.envAudioCache = new Map();
    this.currentEnvFile = null;
    this.currentEnvSource = null;
    this.currentEnvGain = null;
    this.activeSoundscapeName = '';
  }

  get state() {
    let status;
    if (this.failureStatus) status = this.failureStatus;
    else if (!(window.AudioContext || window.webkitAudioContext) || this.ctx?.state === 'closed') status = 'unavailable';
    else if (!this.ready) status = 'idle';
    else if (this.ctx.state !== 'running') status = this.hasRun ? 'paused' : 'blocked';
    else if (this.playRequested && this.region) status = 'playing';
    else status = this.hasPlayed && this.region ? 'paused' : 'ready';
    return {
      status,
      muted: this.muted,
      volume: this.volume,
      soundscape: this.activeSoundscapeName
    };
  }

  get isPlaying() {
    return this.playRequested && this.ctx?.state === 'running';
  }

  emitState() {
    this.onStateChange?.(this.state);
  }

  applyUserGain() {
    if (!this.userGain || this.ctx?.state === 'closed') return;
    const gain = this.userGain.gain;
    const target = this.muted ? 0.0001 : Math.max(0.0001, this.volume);
    gain.cancelScheduledValues(this.now);
    gain.setTargetAtTime(target, this.now, 0.02);
  }

  setMuted(muted) {
    this.muted = Boolean(muted);
    this.applyUserGain();
    this.emitState();
  }

  setVolume(volume) {
    if (!Number.isFinite(Number(volume))) return;
    this.volume = clamp01(Number(volume));
    this.applyUserGain();
    this.emitState();
  }

  async init() {
    if (this.ready) return this.ctx;
    try {
      this.failureStatus = null;
      const ctx = this.buildGraph();
      this.emitState();
      return ctx;
    } catch (error) {
      const ctx = this.ctx;
      this.ctx = null;
      this.ready = false;
      this.userGain = null;
    this.analyser = null;
      this.hasRun = false;
      if (ctx && ctx.state !== 'closed') ctx.close().catch(() => {});
      this.failureStatus = error.name === 'NotAllowedError' ? 'blocked' : 'unavailable';
      this.emitState();
      throw error;
    }
  }

  buildGraph() {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) throw new Error('Web Audio is not available');
    const ctx = new Ctor({ latencyHint: 'interactive' });
    this.ctx = ctx;
    this.hasRun = ctx.state === 'running';
    ctx.addEventListener('statechange', () => {
      if (this.ctx !== ctx) return;
      if (ctx.state === 'running') {
        this.hasRun = true;
        this.failureStatus = null;
      }
      this.emitState();
    });

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.knee.value = 24;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.01;
    compressor.release.value = 0.25;

    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(compressor);

    const userGain = ctx.createGain();
    userGain.gain.value = this.muted ? 0 : this.volume;
    compressor.connect(userGain);
    userGain.connect(ctx.destination);
    this.userGain = userGain;
    this.master = master;

    // Real-time audio analyser for frequency & wave HUD
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.8;
    userGain.connect(analyser);
    this.analyser = analyser;

    // Shared lush convolution reverb
    const convolver = ctx.createConvolver();
    convolver.buffer = makeImpulse(ctx);
    const reverbWet = ctx.createGain();
    reverbWet.gain.value = 0.05;
    convolver.connect(reverbWet);
    reverbWet.connect(master);
    const reverbSend = ctx.createGain();
    reverbSend.gain.value = 0.65;
    reverbSend.connect(convolver);
    this.reverb = convolver;
    this.reverbWet = reverbWet;
    this.reverbSend = reverbSend;

    // Dedicated bus for spatial environmental ambient recordings
    const envBus = ctx.createGain();
    envBus.gain.value = 0.85;
    envBus.connect(master);
    envBus.connect(reverbSend);
    this.envBus = envBus;

    this.noiseBuffer = makeNoiseBuffer(ctx);

    // Vegetation: Warm, lush cinematic ambient pad (pure harmonic sines + triangle)
    // NO harsh sawtooth oscillators
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.value = 520;
    padFilter.Q.value = 0.5;
    const padGain = ctx.createGain();
    padGain.gain.value = 0;
    padFilter.connect(padGain);
    padGain.connect(master);
    padGain.connect(reverbSend);
    this.padFilter = padFilter;
    this.padGain = padGain;

    const padVoice = (type, freq, gainValue) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = gainValue;
      osc.connect(gain);
      gain.connect(padFilter);
      osc.start();
      return osc;
    };
    this.padVoices = [
      padVoice('sine', 110, 0.045),         // Warm A2 fundamental
      padVoice('triangle', 164.81, 0.022),   // Soft E3 perfect fifth
      padVoice('sine', 220, 0.038),          // Velvet A3 octave
      padVoice('sine', 329.63, 0.014)        // Ethereal E4 celestial sheen
    ];

    // Temperature: Gentle celestial sine lead with slow chorused drift
    // NO harsh triangle buzzer with fast vibrato
    const lead = ctx.createOscillator();
    lead.type = 'sine';
    lead.frequency.value = 220;
    const leadFilter = ctx.createBiquadFilter();
    leadFilter.type = 'lowpass';
    leadFilter.frequency.value = 850;
    leadFilter.Q.value = 0.5;
    const leadGain = ctx.createGain();
    leadGain.gain.value = 0;
    lead.connect(leadFilter);
    leadFilter.connect(leadGain);
    leadGain.connect(master);
    leadGain.connect(reverbSend);
    lead.start();
    this.lead = lead;
    this.leadGain = leadGain;

    // Slow, serene chorusing drift (0.65 Hz)
    const vibrato = ctx.createOscillator();
    vibrato.type = 'sine';
    vibrato.frequency.value = 0.65;
    const vibratoDepth = ctx.createGain();
    vibratoDepth.gain.value = 2.5;
    vibrato.connect(vibratoDepth);
    vibratoDepth.connect(lead.detune);
    vibrato.start();
    this.vibrato = vibrato;

    // Groundwater: Sub-bass warmth (55-82 Hz)
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 55;
    const subGain = ctx.createGain();
    subGain.gain.value = 0;
    sub.connect(subGain);
    subGain.connect(master);
    sub.start();
    this.sub = sub;
    this.subGain = subGain;

    // Sea level: Gentle wave wash with soft lowpass
    const sea = ctx.createBufferSource();
    sea.buffer = this.noiseBuffer;
    sea.loop = true;
    const seaFilter = ctx.createBiquadFilter();
    seaFilter.type = 'bandpass';
    seaFilter.frequency.value = 350;
    seaFilter.Q.value = 0.8;
    const seaGain = ctx.createGain();
    seaGain.gain.value = 0;
    sea.connect(seaFilter);
    seaFilter.connect(seaGain);
    seaGain.connect(master);
    seaGain.connect(reverbSend);
    sea.start();
    this.seaFilter = seaFilter;
    this.seaGain = seaGain;

    const seaLfo = ctx.createOscillator();
    seaLfo.type = 'sine';
    seaLfo.frequency.value = 0.12;
    const seaLfoDepth = ctx.createGain();
    seaLfoDepth.gain.value = 120;
    seaLfo.connect(seaLfoDepth);
    seaLfoDepth.connect(seaFilter.frequency);
    seaLfo.start();
    this.seaLfo = seaLfo;

    // Air quality: Silky breath of wind (NO clipping distortion waveshaper)
    const air = ctx.createBufferSource();
    air.buffer = this.noiseBuffer;
    air.loop = true;
    const airFilter = ctx.createBiquadFilter();
    airFilter.type = 'bandpass';
    airFilter.frequency.value = 1100;
    airFilter.Q.value = 0.7;
    const airGain = ctx.createGain();
    airGain.gain.value = 0;
    air.connect(airFilter);
    airFilter.connect(airGain);
    airGain.connect(master);
    airGain.connect(reverbSend);
    air.start();
    this.airFilter = airFilter;
    this.airGain = airGain;

    // Rhythmic buses
    this.rainBus = ctx.createGain();
    this.rainBus.gain.value = 0;
    this.rainBus.connect(master);
    this.rainBus.connect(reverbSend);

    this.lightsBus = ctx.createGain();
    this.lightsBus.gain.value = 0;
    this.lightsBus.connect(master);
    this.lightsBus.connect(reverbSend);

    this.hitBus = ctx.createGain();
    this.hitBus.gain.value = 0;
    this.hitBus.connect(master);
    this.hitBus.connect(reverbSend);

    this.ready = true;
    const now = ctx.currentTime;
    this.nextRain = now + 0.1;
    this.nextLights = now + 0.2;
    this.nextHit = now + 0.4;
    this.apply(now);
    return ctx;
  }

  async fetchAndDecodeAudio(filename) {
    if (this.envAudioCache.has(filename)) {
      return this.envAudioCache.get(filename);
    }
    const response = await fetch(`./assets/audio/${filename}`);
    if (!response.ok) throw new Error(`Audio load failed: ${response.status} ${filename}`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
    this.envAudioCache.set(filename, audioBuffer);
    return audioBuffer;
  }

  async playEnvironmentForRegion(region) {
    if (!region || !this.ready || this.ctx.state === 'closed') return;
    const meta = REGION_ENVIRONMENT_AUDIO[region.id] || {
      file: 'mountain-wind-loop.ogg',
      name: 'Planetary Surface Ambient Atmosphere',
      volume: 0.6
    };

    this.activeSoundscapeName = meta.name;
    this.emitState();

    if (this.currentEnvFile === meta.file && this.currentEnvSource) {
      // Already running the correct soundscape
      return;
    }

    const now = this.now;

    // Crossfade out previous track
    if (this.currentEnvGain && this.currentEnvSource) {
      const oldGain = this.currentEnvGain;
      const oldSource = this.currentEnvSource;
      oldGain.gain.cancelScheduledValues(now);
      oldGain.gain.setValueAtTime(oldGain.gain.value, now);
      oldGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        try { oldSource.stop(); } catch {}
      }, 900);
      this.currentEnvSource = null;
      this.currentEnvGain = null;
    }

    try {
      const buffer = await this.fetchAndDecodeAudio(meta.file);
      if (!this.ready || this.ctx.state === 'closed') return;

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(meta.volume, now + 1.2);

      source.connect(gain);
      gain.connect(this.envBus);
      source.start(now);

      this.currentEnvSource = source;
      this.currentEnvGain = gain;
      this.currentEnvFile = meta.file;
    } catch (err) {
      console.warn('Could not start spatial environment soundscape:', err);
    }
  }

  stopEnvironment() {
    if (this.currentEnvGain && this.currentEnvSource) {
      const now = this.now;
      const oldGain = this.currentEnvGain;
      const oldSource = this.currentEnvSource;
      oldGain.gain.cancelScheduledValues(now);
      oldGain.gain.setValueAtTime(oldGain.gain.value, now);
      oldGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      setTimeout(() => {
        try { oldSource.stop(); } catch {}
      }, 700);
      this.currentEnvSource = null;
      this.currentEnvGain = null;
      this.currentEnvFile = null;
    }
  }

  async start() {
    if (!this.initPromise) {
      this.initPromise = this.init().catch((error) => {
        this.initPromise = null;
        throw error;
      });
    }
    await this.initPromise;
    await this.resume();
    return this.ctx;
  }

  get now() {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  computeRegionBounds(region) {
    if (!region || !region.years) return {};
    const bounds = {};
    for (const signal of SIGNALS) {
      bounds[signal.key] = { min: Infinity, max: -Infinity };
    }
    for (const y of Object.keys(region.years)) {
      const row = region.years[y];
      if (!row) continue;
      for (const signal of SIGNALS) {
        const val = row[signal.key];
        if (typeof val === 'number' && !Number.isNaN(val)) {
          if (val < bounds[signal.key].min) bounds[signal.key].min = val;
          if (val > bounds[signal.key].max) bounds[signal.key].max = val;
        }
      }
    }
    return bounds;
  }

  setDestination(region) {
    this.region = region || null;
    this.regionBounds = this.computeRegionBounds(region);
    if (!region) {
      this.playRequested = false;
      this.stopEnvironment();
    } else {
      this.playEnvironmentForRegion(region);
    }
    this.setYear(this.year);
    this.emitState();
  }

  setYear(year, glide = 0.08) {
    this.year = Number(year);
    this.readValues();
    if (this.ready) this.apply(this.now, glide);
  }

  setEnabled(key, on) {
    if (on) this.enabled.add(key);
    else this.enabled.delete(key);
    if (this.ready) this.apply(this.now, 0.08);
  }

  setEnabledSet(keys) {
    this.enabled = new Set(keys);
    if (this.ready) this.apply(this.now, 0.08);
  }

  isAvailable(key) {
    if (!this.region) return false;
    if (Array.isArray(this.region.unavailable) && this.region.unavailable.includes(key)) return false;
    return true;
  }

  readValues() {
    const norms = {};
    const localNorms = {};
    for (const signal of SIGNALS) {
      if (!this.region || !this.isAvailable(signal.key)) {
        norms[signal.key] = null;
        localNorms[signal.key] = null;
        continue;
      }
      const row = this.region.years[this.year];
      const value = row ? row[signal.key] : null;
      if (typeof value === 'number' && !Number.isNaN(value)) {
        norms[signal.key] = normalise(value, AUDIO_RANGES[signal.key] || signal.range);
        const b = this.regionBounds?.[signal.key];
        if (b && b.max > b.min) {
          localNorms[signal.key] = clamp01((value - b.min) / (b.max - b.min));
        } else {
          localNorms[signal.key] = 0.5;
        }
      } else {
        norms[signal.key] = null;
        localNorms[signal.key] = null;
      }
    }
    this.norms = norms;
    this.localNorms = localNorms;
  }

  apply(now = this.now, glide = 0.25) {
    if (!this.ready) return;
    const n = this.norms;
    const ln = this.localNorms || n;
    const on = (key) => this.enabled.has(key) && n[key] !== null && n[key] !== undefined;

    // Temperature: Celestial sine melody with expressive 42-year musical sweep
    // Combines global climate anchor (160Hz alpine cold -> 360Hz tropical heat) with clear local trajectory
    if (on('temperature')) {
      const gTemp = n.temperature;
      const lTemp = ln.temperature !== null ? ln.temperature : 0.5;
      const baseFreq = 160 * Math.pow(2.2, gTemp);
      const freq = baseFreq * Math.pow(1.68, lTemp);
      this.lead.frequency.setTargetAtTime(freq, now, glide);
      this.leadGain.gain.setTargetAtTime(0.24, now, glide);
    } else {
      this.leadGain.gain.setTargetAtTime(0, now, glide);
    }

    // Vegetation: Silk ambient harmonic pad brightness
    if (on('vegetation')) {
      const gVeg = n.vegetation;
      const lVeg = ln.vegetation !== null ? ln.vegetation : 0.5;
      const cutoff = 260 + (gVeg * 0.35 + lVeg * 0.65) * 880;
      this.padFilter.frequency.setTargetAtTime(cutoff, now, glide);
      this.padGain.gain.setTargetAtTime(0.12 + (gVeg * 0.4 + lVeg * 0.6) * 0.12, now, glide);
    } else {
      this.padGain.gain.setTargetAtTime(0, now, glide);
    }

    // Groundwater: Sub-bass body
    if (on('groundwater')) {
      const gGround = n.groundwater;
      const lGround = ln.groundwater !== null ? ln.groundwater : 0.5;
      const subFreq = 42 + (gGround * 0.4 + lGround * 0.6) * 44;
      this.sub.frequency.setTargetAtTime(subFreq, now, glide);
      this.subGain.gain.setTargetAtTime(0.14 + (1 - lGround) * 0.12, now, glide);
    } else {
      this.subGain.gain.setTargetAtTime(0, now, glide);
    }

    // Sea level: Ocean wave wash
    if (on('seaLevel')) {
      const gSea = n.seaLevel;
      const lSea = ln.seaLevel !== null ? ln.seaLevel : 0.5;
      this.seaFilter.frequency.setTargetAtTime(220 + (gSea * 0.4 + lSea * 0.6) * 550, now, glide);
      this.seaGain.gain.setTargetAtTime(0.08 + lSea * 0.10, now, glide);
    } else {
      this.seaGain.gain.setTargetAtTime(0, now, glide);
    }

    // Air quality: Wind breath
    if (on('air')) {
      const gAir = n.air;
      const lAir = ln.air !== null ? ln.air : 0.5;
      this.airFilter.frequency.setTargetAtTime(800 + (gAir * 0.4 + lAir * 0.6) * 800, now, glide);
      this.airGain.gain.setTargetAtTime(0.06 + lAir * 0.09, now, glide);
    } else {
      this.airGain.gain.setTargetAtTime(0, now, glide);
    }

    // Canopy: Reverb depth
    const canopy = on('canopy') ? (ln.canopy !== null ? ln.canopy : n.canopy) : null;
    const wet = canopy === null ? 0.04 : 0.05 + canopy * 0.28;
    this.reverbWet.gain.setTargetAtTime(wet, now, 0.4);

    // Carbon: Atmospheric greenhouse detuning tension
    const carbon = on('carbon') ? (ln.carbon !== null ? ln.carbon : n.carbon) : null;
    const cents = carbon === null ? 0 : carbon * 32;
    for (const voice of this.padVoices) voice.detune.setTargetAtTime(cents, now, 0.5);
    this.lead.detune.setTargetAtTime(cents, now, 0.5);

    // Rain droplet pluck rate
    if (on('rain')) {
      const lRain = ln.rain !== null ? ln.rain : n.rain;
      this.rates.rain = 0.4 + (n.rain * 0.3 + lRain * 0.7) * 5.2;
      this.rainBus.gain.setTargetAtTime(0.85, now, 0.1);
    } else {
      this.rates.rain = 0;
      this.rainBus.gain.setTargetAtTime(0, now, 0.1);
    }

    // Night lights arpeggiator rate
    if (on('lights')) {
      const lLights = ln.lights !== null ? ln.lights : n.lights;
      this.rates.lights = 0.8 + (n.lights * 0.3 + lLights * 0.7) * 5.8;
      this.lightsBus.gain.setTargetAtTime(0.75, now, 0.1);
    } else {
      this.rates.lights = 0;
      this.lightsBus.gain.setTargetAtTime(0, now, 0.1);
    }

    // Disasters percussion hits
    if (on('disasters')) {
      const lDis = ln.disasters !== null ? ln.disasters : n.disasters;
      this.rates.disasters = 0.04 + (n.disasters * 0.3 + lDis * 0.7) * 0.95;
      this.hitBus.gain.setTargetAtTime(0.85, now, 0.1);
    } else {
      this.rates.disasters = 0;
      this.hitBus.gain.setTargetAtTime(0, now, 0.1);
    }
    this.lightsBus.gain.setTargetAtTime(on('lights') ? 0.75 : 0, now, 0.1);
    this.hitBus.gain.setTargetAtTime(on('disasters') ? 0.85 : 0, now, 0.1);
  }

  async togglePlay() {
    const { status } = this.state;
    if (status === 'unavailable') return;
    if (status === 'playing') {
      this.playRequested = false;
      await this.suspend();
      return;
    }
    if (!this.region) return;
    try {
      await this.start();
      if (!this.region || this.state.status === 'unavailable') return;
      await this.fadeIn(0.6);
    } catch (error) {
      console.warn('Audio unavailable', error);
      this.emitState();
    }
  }

  async fadeIn(seconds = 1.6) {
    if (this.ready && this.ctx.state !== 'closed' && this.region) {
      if (this.ctx.state === 'suspended') {
        try { await this.ctx.resume(); } catch {}
      }
      const now = this.now;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(Math.max(0.0001, this.master.gain.value), now);
      this.master.gain.exponentialRampToValueAtTime(0.85, now + seconds);
      this.playRequested = true;
      this.hasPlayed = true;
      this.apply(now);
      this.playEnvironmentForRegion(this.region);
    }
    this.emitState();
  }

  fadeOut(seconds = 0.8) {
    this.playRequested = false;
    if (this.ready && this.ctx.state !== 'closed') {
      const now = this.now;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(Math.max(0.0001, this.master.gain.value), now);
      this.master.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
      this.stopEnvironment();
    }
    this.emitState();
  }

  async suspend() {
    try {
      if (this.ctx && this.ctx.state === 'running') await this.ctx.suspend();
    } finally {
      this.emitState();
    }
  }

  async resume() {
    if (!this.ready) return this.start();
    const ctx = this.ctx;
    try {
      if (!ctx || ctx.state === 'closed') throw new Error('Audio context is closed');
      if (ctx.state !== 'running') await ctx.resume();
      if (this.ctx !== ctx) return;
      if (ctx.state !== 'running') throw new Error('Audio is blocked; try again from a user gesture');
      this.hasRun = true;
      this.failureStatus = null;
      if (this.region) this.playEnvironmentForRegion(this.region);
      this.emitState();
      return ctx;
    } catch (error) {
      if (this.ctx === ctx) {
        this.failureStatus = ctx && ctx.state !== 'closed' ? 'blocked' : 'unavailable';
        this.emitState();
      }
      throw error;
    }
  }

  update() {
    if (!this.ready) return;
    const now = this.now;

    // Rain: Gentle water droplet plucks
    if (this.rates.rain > 0) {
      if (this.nextRain < now - 0.4) this.nextRain = now + 0.02;
      let guard = 0;
      while (this.nextRain < now + 0.12 && guard < 6) {
        this.spawnPluck(this.nextRain);
        this.nextRain += (0.8 + Math.random() * 0.6) / this.rates.rain;
        guard += 1;
      }
    } else {
      this.nextRain = now + 0.25;
    }

    // Night lights: Delicate glass celesta / bell chime (pure sine)
    if (this.rates.lights > 0) {
      if (this.nextLights < now - 0.4) this.nextLights = now + 0.02;
      let guard = 0;
      while (this.nextLights < now + 0.12 && guard < 8) {
        this.spawnArp(this.nextLights);
        this.nextLights += 1 / this.rates.lights;
        guard += 1;
      }
    } else {
      this.nextLights = now + 0.25;
    }

    // Disasters: Deep resonance and atmospheric percussion
    if (this.rates.disasters > 0) {
      if (this.nextHit < now - 0.4) this.nextHit = now + 0.05;
      let guard = 0;
      while (this.nextHit < now + 0.12 && guard < 2) {
        this.spawnHit(this.nextHit);
        this.nextHit += (0.8 + Math.random() * 1.0) / this.rates.disasters;
        guard += 1;
      }
    } else {
      this.nextHit = now + 0.35;
    }
  }

  // Soft warm water droplet pluck with organic downward fluid pitch bend
  spawnPluck(time) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const degree = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];

    // Warm, rounded water register (164 - 330 Hz)
    const baseFreq = 164.81 * Math.pow(2, degree / 12);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * 1.25, time);
    osc.frequency.exponentialRampToValueAtTime(baseFreq, time + 0.045);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(520, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.18, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.rainBus);
    osc.start(time);
    osc.stop(time + 0.25);
  }

  // Crystalline glass celesta bell chime in middle octave (pure musical tone)
  spawnArp(time) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const degree = PENTATONIC[this.lightsStep % PENTATONIC.length];
    this.lightsStep += 1;

    // Warm middle octave (261 Hz C4 to 523 Hz C5)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(261.63 * Math.pow(2, degree / 12), time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(780, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.14, time + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.38);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.lightsBus);
    osc.start(time);
    osc.stop(time + 0.4);
  }

  // Soft cinematic sub-thump and wind sweep
  spawnHit(time) {
    const ctx = this.ctx;
    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    noise.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450 + Math.random() * 400, time);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.045, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.4);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.hitBus);
    noise.start(time);
    noise.stop(time + 0.45);

    const thump = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(65, time);
    thump.frequency.exponentialRampToValueAtTime(38, time + 0.35);
    thumpGain.gain.setValueAtTime(0.0001, time);
    thumpGain.gain.linearRampToValueAtTime(0.04, time + 0.01);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.38);
    thump.connect(thumpGain);
    thumpGain.connect(this.hitBus);
    thump.start(time);
    thump.stop(time + 0.42);
  }

  async close() {
    if (!this.ctx) return;
    this.fadeOut(0.2);
    this.stopEnvironment();
    const ctx = this.ctx;
    if (typeof ctx.close === 'function') {
      setTimeout(() => ctx.close().catch(() => {}), 260);
    }
    this.ctx = null;
    this.ready = false;
    this.initPromise = null;
    this.userGain = null;
    this.analyser = null;
    this.playRequested = false;
    this.hasPlayed = false;
    this.hasRun = false;
    this.failureStatus = null;
    this.emitState();
  }
}
