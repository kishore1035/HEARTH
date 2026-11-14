// Locality satellite plates for the flat map stage.
// All imagery sourced directly from NASA Earth Observatory, NASA SVS EIC Gallery,
// NASA GIBS (VIIRS / MODIS TrueColor), NASA Astronaut Photography (ISS), and USGS.
// All imagery is 100% public domain and free of watermarks.

export const REGION_IMAGERY = Object.freeze({
  // --- Major Incidents & Tsunamis ---
  tohoku_fukushima: {
    file: 'tohoku-fukushima-satellite.jpg',
    label: 'NASA Astronaut Photography ISS026 · Tohoku Coastline & Tsunami Surge Zone',
    note: 'Expedition 26 orbital documentation of the Sendai coastal plain and maritime surge channels.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },
  banda_aceh: {
    file: 'banda-aceh-satellite.jpg',
    label: 'High-Resolution Satellite · Banda Aceh Coastal Margin & Tsunami Rebuilt Coast',
    note: 'Sumatran northwestern coast, Aceh river estuary, and reclaimed tsunami waterline.',
    credit: 'High-Resolution Earth Observation Satellite'
  },
  chernobyl: {
    file: 'chernobyl-satellite.jpg',
    label: 'NASA ISS-57 Astronaut Photography · Chernobyl Reactor & Exclusion Zone',
    note: 'High-resolution space station view of the reactor complex and Pripyat forest.',
    credit: 'NASA Johnson Space Center (ISS-57)'
  },
  venice_lagoon: {
    file: 'venice-lagoon-satellite-hires.jpg',
    label: 'NASA Astronaut Photography ISS046 · Venice Lagoon, Grand Canal & Barrier Islands',
    note: 'High-definition telephoto view of the historic city of Venice, the Grand Canal, tidal shallows, and the Adriatic Lido barrier.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },

  // --- Megafires & Wildfires ---
  california_wildfires: {
    file: 'california-wildfire-satellite.jpg',
    label: 'NASA Astronaut Photography ISS056 · California Megafires & Pyrocumulus Clouds',
    note: 'Massive convective pyrocumulus smoke columns rising from Sierra Nevada forest fires and drifting over the Central Valley.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },
  australia_black_summer: {
    file: 'australia-bushfire-satellite.jpg',
    label: 'NASA Astronaut Photography ISS037 · New South Wales Coastline & Bushfire Frontline',
    note: 'Catastrophic bushfire smoke plumes blowing eastward off the Great Dividing Range into the Tasman Sea.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },
  amazon_basin: {
    file: 'amazon-deforestation-satellite.jpg',
    label: 'NASA Astronaut Photography ISS026 · Amazon Basin Deforestation Arc & Frontier',
    note: 'Geometric fishbone deforestation patterns and cleared timber swaths cutting through the southern Amazon canopy.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },

  // --- Wonders of the World ---
  pyramids_giza: {
    file: 'pyramids-giza-satellite.jpg',
    label: 'NASA Astronaut Photography ISS010 · Great Pyramids at Giza & Nile Margin',
    note: 'International Space Station high-magnification telephoto photography capturing Khufu, Khafre, Menkaure, and the Giza necropolis.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },
  taj_mahal: {
    file: 'taj-mahal-satellite.jpg',
    label: 'High-Resolution Satellite · Taj Mahal, Yamuna River & Charbagh Complex',
    note: 'Razor-sharp orbital imagery of the white marble dome, minarets, and Yamuna River floodplain.',
    credit: 'High-Resolution Earth Observation Satellite'
  },
  great_barrier_reef: {
    file: 'great-barrier-reef-satellite.jpg',
    label: 'NASA Astronaut Photography ISS045 · Great Barrier Reef Marine Coral Matrix',
    note: 'Telephoto orbital imagery of turquoise coral lagoons, barrier reefs, and deep Pacific oceanic channels.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },
  mount_everest: {
    file: 'everest-satellite.jpg',
    label: 'NASA Astronaut Photography ISS066 · Mount Everest Summit & Khumbu Glacier',
    note: 'International Space Station astronaut photography of the 8,848m Everest pyramid, Khumbu icefall, and glaciated cirques.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },
  grand_canyon: {
    file: 'grand-canyon-satellite.jpg',
    label: 'High-Resolution Satellite · Grand Canyon & Colorado River Gorge',
    note: 'Geological strata incision, Colorado River gorge, and South Rim plateau.',
    credit: 'High-Resolution Earth Observation Satellite'
  },
  machu_picchu: {
    file: 'machu-picchu-satellite.jpg',
    label: 'NASA Astronaut Photography ISS023 · Machu Picchu Citadel & Urubamba Andean Valley',
    note: 'High-altitude orbital photography of the Urubamba River canyon and mist-shrouded Andean peaks.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },
  victoria_falls: {
    file: 'victoria-falls-satellite.jpg',
    label: 'NASA Astronaut Photography ISS062 · Victoria Falls, Batoka Gorge & Zambezi River',
    note: 'Ultra-high-resolution orbital view of the Mosi-oa-Tunya curtain, spray plumes, and zigzagging basalt Batoka gorge channels.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },

  // --- Huge Beaches & Oceanic Coastal Sands ---
  praia_do_cassino: {
    file: 'praia-do-cassino-satellite.jpg',
    label: 'NASA Terra MODIS · Praia do Cassino 212 km Ocean Beach Shoreline',
    note: 'World’s longest continuous ocean beach buffer.',
    credit: 'NASA Earth Observatory / MODIS'
  },
  copacabana_beach: {
    file: 'copacabana-satellite.jpg',
    label: 'NASA Astronaut Photography ISS047 · Copacabana Crescent, Sugarloaf & Guanabara Bay',
    note: 'High-definition astronaut photography of Rio de Janeiro’s Atlantic coastline, Rodrigo de Freitas lagoon, and Atlantic swell.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },
  whitehaven_beach: {
    file: 'whitehaven-beach-satellite.jpg',
    label: 'High-Resolution Satellite · Whitehaven Beach & Hill Inlet Silica Barrier',
    note: '98% pure silica sand spit and barrier reef turquoise lagoon swirls.',
    credit: 'High-Resolution Earth Observation Satellite'
  },
  coxs_bazar: {
    file: 'coxs-bazar.jpg',
    label: 'NASA Landsat & MODIS · Cox’s Bazar 120 km Intertidal Sea Beach',
    note: 'World’s longest unbroken natural sea sand beach.',
    credit: 'NASA Landsat / USGS'
  },

  // --- Great Rainforests of Earth ---
  amazon_rainforest: {
    file: 'amazon-rainforest-satellite.jpg',
    label: 'NASA Astronaut Photography ISS040 · Amazon River Meanders in Sunglint & Dense Tropical Rainforest',
    note: 'Spectacular orbital sunglint reflecting off the meandering Amazon channels and pristine primary tropical rainforest canopy.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  },
  congo_rainforest: {
    file: 'congo-rainforest-satellite.jpg',
    label: 'High-Resolution Satellite · Congo Basin Primary Peatland & Rainforest',
    note: 'Second largest contiguous tropical rainforest on Earth.',
    credit: 'High-Resolution Earth Observation Satellite'
  },
  daintree_rainforest: {
    file: 'daintree-rainforest-satellite.jpg',
    label: 'High-Resolution Satellite · Daintree Ancient Wet Tropics Canopy',
    note: 'Oldest surviving tropical rainforest on Earth (135+ million years).',
    credit: 'High-Resolution Earth Observation Satellite'
  },
  borneo_rainforest: {
    file: 'borneo-rainforest-satellite.jpg',
    label: 'High-Resolution Satellite · Borneo Tropical Peat Swamp & Rainforest',
    note: 'Ancient Dipterocarp canopy and primary peatland biodiversity.',
    credit: 'High-Resolution Earth Observation Satellite'
  },

  // --- Catastrophic Landslides & Debris Surges ---
  wayanad_landslide: {
    file: 'wayanad-landslide-satellite.jpg',
    label: 'High-Resolution Satellite · Western Ghats Wayanad Escarpment',
    note: 'July 2024 catastrophic monsoon debris avalanche and slope failure.',
    credit: 'High-Resolution Earth Observation Satellite'
  },
  oso_landslide: {
    file: 'oso-landslide-satellite.jpg',
    label: 'NASA Earth Observatory & USGS Landsat 8 (OLI) · Oso Catastrophic Valley Landslide & Barrier Lake',
    note: 'High-resolution multispectral natural color imagery of the massive 2014 slope failure, debris fan, and blocked Stillaguamish River.',
    credit: 'NASA Earth Observatory / USGS'
  },
  kedarnath_landslide: {
    file: 'kedarnath-landslide-satellite.jpg',
    label: 'High-Resolution Satellite · Garhwal Himalaya & Kedarnath Valley',
    note: 'Chorabari glacial moraine outburst and catastrophic debris surge.',
    credit: 'High-Resolution Earth Observation Satellite'
  },
  zhouqu_landslide: {
    file: 'zhouqu-landslide-satellite.jpg',
    label: 'High-Resolution Satellite · Gansu Loess Plateau & Zhouqu River Gorge',
    note: 'Loess soil saturation and mudflow canyon surge.',
    credit: 'High-Resolution Earth Observation Satellite'
  },

  // --- Critical Biosphere Frontlines ---
  sundarbans: {
    file: 'sundarbans-hls.jpg',
    label: 'NASA HLS L30 (Landsat 8/9) · Sundarbans Tidal Mangrove Biosphere',
    note: 'Tidal mangrove labyrinth and cyclonic surge buffer.',
    credit: 'NASA HLS L30 via NASA GIBS; Landsat data courtesy of USGS'
  },
  death_valley: {
    file: 'death-valley-satellite.jpg',
    label: 'NASA Astronaut Photography ISS061 · Death Valley Basin & Panamint Salt Flats',
    note: 'High-resolution nadir imagery of Badwater Basin salt playas, alluvial fans, and rugged fault-block mountain ranges.',
    credit: 'NASA JSC Earth Science and Remote Sensing Unit'
  }
});
