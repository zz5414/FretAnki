import { Howl } from "howler";

const soundFiles = import.meta.glob("../assets/sounds/*.ogg");
const soundCache = {};
let currentSound = null;
let allSoundsLoaded = false;

// 사용 가능한 모든 사운드 파일 이름 추출
const getAllAvailableSounds = () => {
  const soundPaths = Object.keys(soundFiles);
  return soundPaths.map((path) => {
    const fileName = path.split("/").pop().replace(".ogg", "");
    // s를 #으로 변환 (예: Fs -> F#)
    return fileName.replace("s", "#");
  });
};

// 사운드 미리 로드 함수
const preloadSound = async (noteWithOctave) => {
  if (!noteWithOctave) return null;

  const soundFileName = `${noteWithOctave.replace("#", "s")}.ogg`;
  const soundPathKey = `../assets/sounds/${soundFileName}`;

  // 이미 캐시된 경우 바로 반환
  if (soundCache[soundPathKey]) {
    return soundCache[soundPathKey];
  }

  // 사운드 파일이 존재하는 경우 로드
  if (soundFiles[soundPathKey]) {
    try {
      const module = await soundFiles[soundPathKey]();
      const sound = new Howl({
        src: [module.default],
        volume: 0.7,
        html5: true,
        preload: true,
        onloaderror: (id, err) =>
          console.error("Howler load error:", err, `for ${soundPathKey}`),
        onplayerror: (id, err) =>
          console.error("Howler play error:", err, `for ${soundPathKey}`),
      });

      // 사운드 로드 완료까지 대기
      return new Promise((resolve) => {
        if (sound.state() === "loaded") {
          soundCache[soundPathKey] = sound;
          resolve(sound);
        } else {
          sound.once("load", () => {
            soundCache[soundPathKey] = sound;
            resolve(sound);
          });
        }
      });
    } catch (err) {
      console.error(`Error loading sound module ${soundPathKey}:`, err);
      return null;
    }
  }

  return null;
};

// 모든 사운드를 한 번에 미리 로드하는 함수
export const preloadAllSounds = async () => {
  if (allSoundsLoaded) {
    return true;
  }

  const allSounds = getAllAvailableSounds();
  const loadPromises = allSounds.map((note) => preloadSound(note));
  try {
    await Promise.all(loadPromises);
    console.log(`Successfully preloaded ${allSounds.length} sounds`);
    allSoundsLoaded = true;
    return true;
  } catch (err) {
    console.error("Error preloading sounds:", err);
    return false;
  }
};

// 사운드 재생 함수
export const playSound = (noteNameWithOctave) => {
  if (!noteNameWithOctave) return;

  // 이전에 재생 중이던 소리가 있다면 중지
  if (currentSound) {
    currentSound.stop();
    currentSound = null;
  }

  const soundFileName = `${noteNameWithOctave.replace("#", "s")}.ogg`;
  const soundPathKey = `../assets/sounds/${soundFileName}`;

  // 캐시된 사운드가 있으면 바로 재생
  if (soundCache[soundPathKey]) {
    currentSound = soundCache[soundPathKey];
    currentSound.play();
  } else {
    // 캐시되지 않은 경우
    console.warn(`Sound not preloaded: ${soundPathKey}`);
    if (soundFiles[soundPathKey]) {
      soundFiles[soundPathKey]()
        .then((module) => {
          const sound = new Howl({
            src: [module.default],
            volume: 0.7,
            html5: true,
            onloaderror: (id, err) =>
              console.error("Howler load error:", err, `for ${soundPathKey}`),
            onplayerror: (id, err) =>
              console.error("Howler play error:", err, `for ${soundPathKey}`),
          });
          soundCache[soundPathKey] = sound;
          currentSound = sound;
          sound.play();
        })
        .catch((err) => {
          console.error(`Error loading sound module ${soundPathKey}:`, err);
        });
    }
  }
};

// 멜로디 전체 재생 함수
export const playMelodySequence = async (melody) => {
  if (!melody || melody.length === 0) return;

  for (let i = 0; i < melody.length; i++) {
    const note = melody[i];
    const noteWithOctave = note.noteNameWithOctave || `${note.noteName}4`; // 기본 옥타브 4
    playSound(noteWithOctave);
    // 음표 간 간격 (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
};

// 사운드 로딩 상태 확인
export const areSoundsLoaded = () => allSoundsLoaded;
