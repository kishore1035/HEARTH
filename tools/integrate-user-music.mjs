import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = 'C:\\Users\\pkish\\HEARTH';
const USER_TEMP = path.join(ROOT, 'temp_user_music');
const AUDIO_DIR = path.join(ROOT, 'assets', 'audio');
const MUSIC_DIR = path.join(ROOT, 'music');
const MIRROR_AUDIO = 'C:\\Users\\pkish\\DeltaEcho-Jukebox\\assets\\audio';
const MIRROR_MUSIC = 'C:\\Users\\pkish\\DeltaEcho-Jukebox\\music';
const USER_MUSIC = 'C:\\Users\\pkish\\music';

[AUDIO_DIR, MUSIC_DIR, MIRROR_AUDIO, MIRROR_MUSIC, USER_MUSIC].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Full mapping of user's zip files to HEARTH region IDs
const MAPPING = [
  { id: 'tohoku_fukushima', userFile: 'Tohok.wav', canonical: '01_Tohoku_Coast_and_Fukushima', legacyFile: 'fukushima-tsunami.ogg' },
  { id: 'banda_aceh', userFile: 'Banda.wav', canonical: '02_Banda_Aceh', legacyFile: 'banda-aceh-surf.ogg' },
  { id: 'chernobyl', userFile: 'Chernobyl.wav', canonical: '03_Chernobyl_Exclusion_Zone', legacyFile: 'chernobyl-ruins.ogg' },
  { id: 'venice_lagoon', userFile: 'Venetian Lagoon.wav', canonical: '04_Venice_Lagoon', legacyFile: 'venice-canal.ogg' },
  { id: 'california_wildfires', userFile: 'US WildFires.wav', canonical: '05_Pacific_Northwest_and_California_Wildfires', legacyFile: 'california-wildfires.ogg' },
  { id: 'australia_black_summer', userFile: 'NSW SouthEast.wav', canonical: '06_NSW_and_Southeast_Australia_Black_Summer', legacyFile: 'australia-bushfire.ogg' },
  { id: 'amazon_basin', userFile: 'Amazon Basin.wav', canonical: '07_Amazon_Basin_and_Pantanal_Wildfires', legacyFile: 'amazon-wildfire.ogg' },
  { id: 'pyramids_giza', userFile: 'Egypt.wav', canonical: '08_Great_Pyramid_of_Giza', legacyFile: 'giza-desert-wind.ogg' },
  { id: 'taj_mahal', userFile: 'Taj Mahal.wav', canonical: '09_Taj_Mahal_and_Yamuna_Basin', legacyFile: 'taj-sitar-yaman.ogg' },
  { id: 'great_barrier_reef', userFile: 'Great Barrier Reef.wav', canonical: '10_Great_Barrier_Reef', legacyFile: 'barrier-reef-marine.ogg' },
  { id: 'mount_everest', userFile: null, canonical: '11_Mount_Everest_and_Khumbu', legacyFile: 'everest-howling-wind.ogg' },
  { id: 'grand_canyon', userFile: null, canonical: '12_Grand_Canyon_and_Lake_Mead', legacyFile: 'grand-canyon-echo.ogg' },
  { id: 'machu_picchu', userFile: null, canonical: '13_Machu_Picchu_and_Andes', legacyFile: 'machu-picchu-andes.ogg' },
  { id: 'victoria_falls', userFile: 'Victoria Falls.wav', canonical: '14_Victoria_Falls_and_Zambezi', legacyFile: 'victoria-waterfall.ogg' },
  { id: 'praia_do_cassino', userFile: 'Praira do.wav', canonical: '15_Praia_do_Cassino_Ocean_Beach', legacyFile: 'praia-cassino-roar.ogg' },
  { id: 'copacabana_beach', userFile: 'Copacabana.wav', canonical: '16_Copacabana_and_Ipanema_Shoreline', legacyFile: 'copacabana-beach.ogg' },
  { id: 'whitehaven_beach', userFile: "Whitehaven'.wav", canonical: '17_Whitehaven_Beach_and_Whitsundays', legacyFile: 'whitehaven-silica.ogg' },
  { id: 'coxs_bazar', userFile: 'Cox Bazar.wav', canonical: '18_Coxs_Bazar_Intertidal_Sea_Beach', legacyFile: 'coxs-bazar-surf.ogg' },
  { id: 'amazon_rainforest', userFile: 'Amazon Rainforest.wav', canonical: '19_Amazon_Rainforest_Heart', legacyFile: 'amazon-rainforest.ogg' },
  { id: 'congo_rainforest', userFile: 'DR Congo.wav', canonical: '20_Congo_Basin_Primary_Rainforest', legacyFile: 'congo-jungle-night.ogg' },
  { id: 'daintree_rainforest', userFile: 'Daintree.wav', canonical: '21_Daintree_Ancient_Tropical_Rainforest', legacyFile: 'daintree-rainforest.ogg' },
  { id: 'borneo_rainforest', userFile: 'Borneo.wav', canonical: '22_Borneo_Tropical_Peat_Canopy', legacyFile: 'borneo-swamp-chorus.ogg' },
  { id: 'wayanad_landslide', userFile: 'Wayanad.wav', canonical: '23_Wayanad_Megalandslide_Frontline', legacyFile: 'wayanad-landslide.ogg' },
  { id: 'oso_landslide', userFile: "Oso Washington'.wav", canonical: '24_Oso_Landslide_Disaster', legacyFile: 'oso-landslide.ogg' },
  { id: 'kedarnath_landslide', userFile: 'Kedarnath.wav', canonical: '25_Kedarnath_Glacial_Debris_Surge', legacyFile: 'kedarnath-debris.ogg' },
  { id: 'zhouqu_landslide', userFile: 'Zhouqu Loess Mudslide.wav', canonical: '26_Zhouqu_Loess_Mudslide_Disaster', legacyFile: 'zhouqu-landslide.ogg' },
  { id: 'sundarbans', userFile: 'Sundarbans.wav', canonical: '27_Sundarbans_Mangrove_Delta', legacyFile: 'sundarbans-mangrove.ogg' },
  { id: 'death_valley', userFile: 'Death Valley.wav', canonical: '28_Death_Valley_Thermal_Basin', legacyFile: 'death-valley-heat.ogg' }
];

console.log('=== Integrating User Music from Music.zip into HEARTH ===\n');

for (const item of MAPPING) {
  if (item.userFile) {
    const rawWav = path.join(USER_TEMP, item.userFile);
    if (!fs.existsSync(rawWav)) {
      console.warn(`User file missing: ${rawWav}`);
      continue;
    }

    console.log(`Processing user audio: "${item.userFile}" -> ${item.id} (${item.canonical})...`);

    // 1. Keep original WAV in music/
    const targetWav = path.join(MUSIC_DIR, `${item.canonical}.wav`);
    fs.copyFileSync(rawWav, targetWav);

    // 2. Convert to high-fidelity 48kHz stereo OGG Vorbis with micro-fade for seamless looping
    // We output to legacy filename in assets/audio/ AND canonical in music/
    const targetOggLegacy = path.join(AUDIO_DIR, item.legacyFile);
    const targetOggMusic = path.join(MUSIC_DIR, `${item.canonical}.ogg`);
    const targetOggUserNamed = path.join(MUSIC_DIR, item.userFile.replace(/\.wav$/i, '.ogg'));

    const oggCmd = `ffmpeg -y -hide_banner -loglevel error -i "${rawWav}" -af "afade=t=in:ss=0:d=0.08,afade=t=out:st=29.92:d=0.08" -c:a libvorbis -q:a 6 "${targetOggLegacy}"`;
    execSync(oggCmd);
    fs.copyFileSync(targetOggLegacy, targetOggMusic);
    fs.copyFileSync(targetOggLegacy, targetOggUserNamed);

    // 3. Convert to 320k MP3
    const targetMp3 = path.join(MUSIC_DIR, `${item.canonical}.mp3`);
    const targetMp3UserNamed = path.join(MUSIC_DIR, item.userFile.replace(/\.wav$/i, '.mp3'));
    const mp3Cmd = `ffmpeg -y -hide_banner -loglevel error -i "${rawWav}" -c:a libmp3lame -b:a 320k -metadata title="${item.canonical}" -metadata artist="HEARTH Planetary Sonification" -metadata album="Earth Observational Soundscapes" "${targetMp3}"`;
    execSync(mp3Cmd);
    fs.copyFileSync(targetMp3, targetMp3UserNamed);

    // 4. Mirror copies to DeltaEcho-Jukebox and C:\Users\pkish\music
    fs.copyFileSync(targetOggLegacy, path.join(MIRROR_AUDIO, item.legacyFile));
    fs.copyFileSync(targetOggMusic, path.join(MIRROR_MUSIC, `${item.canonical}.ogg`));
    fs.copyFileSync(targetMp3, path.join(MIRROR_MUSIC, `${item.canonical}.mp3`));
    fs.copyFileSync(targetOggMusic, path.join(USER_MUSIC, `${item.canonical}.ogg`));
    fs.copyFileSync(targetMp3, path.join(USER_MUSIC, `${item.canonical}.mp3`));
  } else {
    console.log(`Preserving authentic field recording for: ${item.id} (${item.canonical})...`);
    const srcOgg = path.join(AUDIO_DIR, item.legacyFile);
    if (fs.existsSync(srcOgg)) {
      const targetOggMusic = path.join(MUSIC_DIR, `${item.canonical}.ogg`);
      fs.copyFileSync(srcOgg, targetOggMusic);
      fs.copyFileSync(srcOgg, path.join(MIRROR_AUDIO, item.legacyFile));
      fs.copyFileSync(srcOgg, path.join(MIRROR_MUSIC, `${item.canonical}.ogg`));
      fs.copyFileSync(srcOgg, path.join(USER_MUSIC, `${item.canonical}.ogg`));
    }
  }
}

// Copy Australia.wav alias as well
if (fs.existsSync(path.join(USER_TEMP, 'Australia.wav'))) {
  fs.copyFileSync(path.join(USER_TEMP, 'Australia.wav'), path.join(MUSIC_DIR, 'Australia.wav'));
  execSync(`ffmpeg -y -hide_banner -loglevel error -i "${path.join(USER_TEMP, 'Australia.wav')}" -c:a libvorbis -q:a 6 "${path.join(MUSIC_DIR, 'Australia.ogg')}"`);
  execSync(`ffmpeg -y -hide_banner -loglevel error -i "${path.join(USER_TEMP, 'Australia.wav')}" -c:a libmp3lame -b:a 320k "${path.join(MUSIC_DIR, 'Australia.mp3')}"`);
}

console.log('\n✓ Successfully integrated all files from Music.zip into HEARTH!');
