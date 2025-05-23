import { getNote, getNoteWithOctave } from "../utils/guitarLogic";

/**
 * 주어진 스테이지 정보를 바탕으로 멜로디를 생성합니다.
 * @param {Object} stage - 스테이지 정보 (quizzes 배열 포함)
 * @returns {Array} 멜로디 배열 [{string, fret, noteName, noteNameWithOctave}, ...]
 */
export const generateMelodyFromStage = (stage) => {
  if (!stage || !stage.quizzes || stage.quizzes.length === 0) {
    return [];
  }

  const stageNotes = stage.quizzes.map((quiz) => ({
    string: quiz.string,
    fret: quiz.fret,
    noteName: getNote(quiz.string, quiz.fret),
    noteNameWithOctave: getNoteWithOctave(quiz.string, quiz.fret),
  }));

  // 중복되지 않는 고유한 음이름들을 추출
  const uniqueNoteNames = [...new Set(stageNotes.map((note) => note.noteName))];
  const uniqueNotes = uniqueNoteNames.map((noteName) => {
    // 각 고유한 음이름에 대해 첫 번째로 발견되는 위치를 사용
    return stageNotes.find((note) => note.noteName === noteName);
  });

  const n = uniqueNotes.length;
  const targetLength = n + Math.floor(n / 2);

  // 모든 고유한 음이 최소 한 번은 포함되도록 시작
  const melody = [...uniqueNotes];

  // 남은 자리를 랜덤하게 채움 (중복 허용하지 않음)
  while (melody.length < targetLength) {
    const availableNotes = uniqueNotes.filter(
      (note) =>
        !melody.some(
          (melodyNote) =>
            melodyNote.string === note.string && melodyNote.fret === note.fret
        )
    );

    if (availableNotes.length === 0) {
      // 더 이상 추가할 고유한 음이 없으면 기존 음 중에서 선택
      const randomNote =
        uniqueNotes[Math.floor(Math.random() * uniqueNotes.length)];
      // 연속된 같은 음이 오지 않도록 체크
      const lastNote = melody[melody.length - 1];
      if (
        lastNote.string !== randomNote.string ||
        lastNote.fret !== randomNote.fret
      ) {
        melody.push(randomNote);
      }
    } else {
      const randomNote =
        availableNotes[Math.floor(Math.random() * availableNotes.length)];
      melody.push(randomNote);
    }
  }

  // 배열을 섞어서 순서를 랜덤화
  return shuffleArray(melody);
};

/**
 * 배열을 랜덤하게 섞는 Fisher-Yates 알고리즘
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
