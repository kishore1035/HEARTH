# HEARTH — Planetary Geospatial Sonification Observatory

**Translating 42 Years (1985–2026) of NASA Earth Observation Satellite Telemetry & Multi-Spectral Visual Frames into Real-Time Interactive Acoustic Soundscapes**

[![Author](https://img.shields.io/badge/Author-kishore1035-0B3D91?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kishore1035)
[![Runtime](https://img.shields.io/badge/Runtime-Zero_Dependencies_Vanilla_ESM_WebGL2-1E293B?style=for-the-badge)](https://github.com/kishore1035/HEARTH)
[![Acoustic Engine](https://img.shields.io/badge/Synthesis-10_Voice_Web_Audio_Graph-FF6D00?style=for-the-badge&logo=waveform&logoColor=white)](https://github.com/kishore1035/HEARTH)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.1_Screen_Reader_and_Voice_Guide-7C3AED?style=for-the-badge)](https://github.com/kishore1035/HEARTH)

---

## 1. Overview & Vision

For more than four decades, space agency Earth-observing satellites have tracked our evolving biosphere in staggering visual resolution. Yet relying exclusively on visual graphs and imagery creates an accessibility divide for blind and low-vision individuals, while obscuring multi-dimensional planetary trends that the human ear can distinguish with ease.

**HEARTH** is a zero-dependency, browser-native geospatial sonification observatory that unites 3D celestial navigation, computer-vision image telemetry, and multi-timbral synthesis across two interconnected engines:

1. **The 3D Solar-to-Surface Observatory (`index.html`):**  
   Choreographs an 8-stage cinematic descent from the wide Solar System past an atmosphere-wrapped Earth onto high-resolution satellite locality plates across 8 frontline ecological and climatic regions. Each destination drives a real-time **10-voice Web Audio synthesizer** spanning **1985–2026**, equipped with **5-year and 10-year comparative delta ($\Delta$) auditioning**.
2. **The Acoustic Computer-Vision Lab (`studio.html`):**  
   Performs live pixel-level feature extraction on chronological satellite filmstrip matrices (130-month MODIS series, annual Cryosphere glacial retreat, and VIIRS wildfire smoke plumes). A hardware-clocked scanline analyzes luminance, cloud coverage, vegetation greenness, spatial edge density, and surface water in real time to drive an expressive A-minor pentatonic synthesizer.

---

## 2. Scientific Telemetry to Acoustic Synthesis Mapping

Every sound generated in HEARTH is derived from physical satellite observations and displayed alongside its verified metric:

### A. 10-Voice Regional Environmental Synthesizer (`src/signal-audio.js`)

| # | Environmental Layer | Sensor / Model Source | Physical Range & Unit | Real-Time Web Audio Synthesis Behavior |
| :- | :--- | :--- | :--- | :--- |
| **1** | **Surface Temperature** (`T2M_C`) | NASA POWER / MERRA-2 | $10.0\text{ to }40.0^\circ\text{C}$ | **Lead Triangle Synth Pitch:** Exponential mapping $f = 220 \times 4^{\frac{T-10}{30}}\text{ Hz}$ ($220\text{--}880\text{ Hz}$) with $4.6\text{ Hz}$ vibrato. |
| **2** | **Precipitation** (`PRECTOTCORR_mm`) | NASA POWER / GPM IMERG | $0\text{ to }6,000\text{ mm/yr}$ | **Plucked Pentatonic Rain Notes:** Controls trigger density ($0.3\text{--}5.8\text{ notes/sec}$) across an A-minor pentatonic register. |
| **3** | **Vegetation Greenness** (`NDVI`) | NASA MODIS / VIIRS | $0.10\text{ to }0.90\text{ index}$ | **Harmonic Pad Brightness:** Modulates low-pass filter cutoff ($300\text{--}2,800\text{ Hz}$) across a 3-voice pad (`sawtooth` + `triangle` + `sine`). |
| **4** | **Canopy Height** (`GEDI_canopy_m`) | NASA ISS GEDI Lidar | $2.0\text{ to }20.0\text{ m}$ | **Convolution Reverb Wet Mix:** Direct send ($0.10\text{--}0.85$). Deep canopies reverberate in lush space; deforestation dries the sound. |
| **5** | **Groundwater & Ice Mass** (`GRACE_ewh_cm`) | NASA GRACE / GRACE-FO | $-20.0\text{ to }+15.0\text{ cm EWH}$ | **Sub-Bass Foundation Drone:** Drives pure sine sub-bass frequency ($55\text{--}110\text{ Hz}$) and volume level. |
| **6** | **Sea-Level Anomaly** (`SEA_LEVEL_mm`) | NASA Sea Level Change | $0.0\text{ to }250.0\text{ mm}$ | **Coastal Wave-Wash Sweep:** High-pass filtered noise ($260\text{--}1,710\text{ Hz}$) modulated by a $0.13\text{ Hz}$ tidal LFO (muted for landlocked regions). |
| **7** | **Air Quality** (`AIR_AOD_NO2_index`) | NASA Aura OMI & MODIS AOD | $10.0\text{ to }100.0\text{ index}$ | **Waveshaper Distortion Grit:** Bandpass noise ($1,300\text{--}2,800\text{ Hz}$) routed through a $2\times$ oversampled non-linear distortion curve. |
| **8** | **Atmospheric Carbon** (`CO2_ppm`) | NASA OCO-2 / OCO-3 | $340.0\text{ to }435.0\text{ ppm}$ | **Microtonal Detuning Tension:** Adds $0\text{ to }+35\text{ cents}$ detune across voices to express global atmospheric greenhouse tension. |
| **9** | **Nighttime Lights** (`NIGHT_LIGHTS_nW`) | NASA Black Marble VIIRS | $0.0\text{ to }100.0\text{ nW/cm}^2/\text{sr}$ | **Urban Footprint Arpeggiator:** Square-wave pentatonic arpeggio rate ($1.5\text{--}8.5\text{ steps/sec}$) reflecting human electrification. |
| **10**| **Disasters & Wildfires** (`EXTREME_EVENTS`) | NASA FIRMS VIIRS | $0\text{ to }30+\text{ events/yr}$ | **Percussion & Sub-Drop Hits:** Filtered noise bursts paired with $72 \to 42\text{ Hz}$ exponential pitch-drop bass drums. |

---

### B. Computer-Vision Satellite Pixel Analysis (`src/filmstrip.js` & `src/sonify.js`)

In the **Acoustic Lab (`studio.html`)**, each $256\times256$ satellite frame is analyzed using a 2px-grid downsampling kernel (`measureCell`):
* **Luminance ($L = 0.2126R + 0.7152G + 0.0722B$):** Governs master low-pass filter cutoff ($320\text{--}2,820\text{ Hz}$).
* **Cloud Coverage ($R > 205 \land G > 205 \land B > 205$):** Controls white/pink atmospheric noise bed volume.
* **Vegetation ($G - R$):** Shifts harmonic chord voicing: Minor third (somber bare terrain), Major third (temperate vegetation), or Suspended fourth (dense canopy).
* **Spatial Edge Energy ($|\Delta L_x| + |\Delta L_y|$):** Sets rhythmic plucking pulse frequency ($0.55\text{--}4.45\text{ Hz}$).
* **Surface Water ($B > G + 8 \land B > R + 14$):** Bolsters the sub-octave $55\text{ Hz}$ foundation.
* **Missing Swath Suppression:** Detects missing or black telemetry swaths ($L < 5 \lor L > 250$ with contrast $< 0.5$) and silences output to prevent hallucinating data.

---

## 3. Project Architecture

```
HEARTH/
├── index.html                  # 3D Solar-to-Surface Observatory entry point
├── studio.html                 # Acoustic Lab filmstrip sonification lab
├── styles.css                  # Craft-designed scientific observatory styling
├── studio.css                  # Studio laboratory UI styling
├── server.mjs                  # Zero-dependency local development server
├── assets/
│   ├── data/                   # NASA POWER, MODIS, GRACE, GEDI, OCO-2 telemetry
│   └── textures/               # High-res Earth surfaces, planet maps, satellite plates
├── src/
│   ├── main.js                 # Observatory lifecycle & rendering pipeline
│   ├── config.js               # Astronomical constants, render thresholds & camera states
│   ├── camera-director.js      # 8-stage camera choreography & interruption rig
│   ├── controls.js             # Mouse drag, pinch, and momentum handling
│   ├── signal-audio.js         # 10-layer Web Audio synthesizer engine
│   ├── filmstrip.js            # Satellite sprite sheet loading & pixel analysis
│   ├── sonify.js               # Frame-to-sound synthesis graph & GISTEMP detuning
│   ├── earth.js                # Rayleigh atmosphere shader & city lights emission
│   ├── sun.js                  # Simplex 4D noise procedural solar corona
│   ├── solar-system.js         # Keplerian planetary orbits & ring shaders
│   ├── atlas.js                # Locality flat map stage & procedural survey plates
│   ├── ui.js                   # Accessible HUD, search filter, voice guide & mobile sheet
│   └── utils.js                # Spherical math, easing, and coordinate helpers
└── vendor/
    ├── three.module.js         # Vendored Three.js r128+ ESM
    └── gsap/                   # Vendored GreenSock animation engine
```

---

## 4. Running Locally

HEARTH runs completely natively in any modern web browser without requiring a bundler, package manager, or compile step.

```bash
# Start the local development server (Node.js 18+)
node server.mjs

# Custom port
PORT=8080 node server.mjs
```

Open your browser to:
- **Observatory:** `http://localhost:5173/`
- **Acoustic Lab:** `http://localhost:5173/studio.html`

---

## 5. Author & Attribution

* **Creator / Architect:** **Kishore** ([GitHub @kishore1035](https://github.com/kishore1035))
* **License:** Released under the [Apache-2.0 / MIT License](LICENSE).
* **Data & Imagery:** Derived from public domain observations courtesy of the **NASA Earth Information Center (EIC)**, **NASA SVS**, **NASA POWER**, **USGS/NASA Landsat**, and **MODIS/VIIRS**.
