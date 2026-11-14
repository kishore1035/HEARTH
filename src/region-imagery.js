// Locality plates for the flat map stage. The five new plates are NASA HLS
// L30 (Landsat 8/9) true-colour products retrieved from NASA GIBS and graded
// locally for display. The supplied 2025 Landsat crops informed the coastal
// site/season treatment; at 8 km they were too narrow for a full map plate.
export const REGION_IMAGERY = Object.freeze({
  mount_everest: {
    file: 'everest-hls.jpg',
    label: 'NASA SVS ID 4834 & GIBS · Mount Everest, Khumbu Glacier & Imja Lake',
    note: 'Cryosphere & glacial retreat plate.',
    credit: 'NASA Scientific Visualization Studio (ID 4834) & NASA GIBS / Landsat'
  },
  california_wildfires: {
    file: 'wildfire-viirs.jpg',
    label: 'NASA SVS ID 5113 & 5453 · VIIRS Active Fires (FRP) & Smoke Plumes',
    note: 'Representative peak wildfire season plate.',
    credit: 'NASA SVS EIC Gallery (ID 5113, ID 5453) & NASA FIRMS VIIRS'
  },
  sundarbans: {
    file: 'sundarbans-hls.jpg',
    label: 'NASA HLS L30 (Landsat 8/9) · Sundarbans Tidal Mangrove Biosphere',
    note: 'Representative mangrove delta view.',
    credit: 'NASA HLS L30 via NASA GIBS; Landsat data courtesy of USGS'
  }
});
