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

  // 위치(string+fret) 기준으로 중복 제거 (음이름이 같아도 위치가 다르면 다른 것으로 취급)
  const uniquePositions = new Set();
  const uniqueNotes = stageNotes.filter((note) => {
    const positionKey = `${note.string}-${note.fret}`;
    if (uniquePositions.has(positionKey)) {
      return false;
    }
    uniquePositions.add(positionKey);
    return true;
  });

  const n = uniqueNotes.length;
  const minLength = Math.max(8, n + Math.floor(n / 2)); // 최소 8개 보장

  // 모든 고유한 위치가 최소 한 번은 포함되도록 시작
  const melody = [...uniqueNotes];

  // 남은 자리를 랜덤하게 채움
  while (melody.length < minLength) {
    // 사용 가능한 음표들 중에서 선택 (연속된 같은 위치만 방지)
    const lastNote = melody[melody.length - 1];
    const availableNotes = uniqueNotes.filter(
      (note) =>
        !(lastNote.string === note.string && lastNote.fret === note.fret)
    );

    if (availableNotes.length > 0) {
      const randomNote =
        availableNotes[Math.floor(Math.random() * availableNotes.length)];
      melody.push(randomNote);
    } else {
      // 모든 음표가 마지막 음표와 같은 경우 (거의 발생하지 않음)
      break;
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
