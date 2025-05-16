// src/utils/quizGenerator.js
// 단계별 퀴즈 생성 로직

/**
 * 단계별 퀴즈 배열에서 학습용 퀴즈 시퀀스를 생성합니다.
 * 각 음이 최소 repetitions 횟수만큼 반복되고, 동일한 음이 연속해서 나오지 않도록 합니다.
 * 
 * @param {Array} stageQuizzes - 단계별 퀴즈 배열 (string, fret 속성을 가진 객체 배열)
 * @param {number} repetitions - 각 음의 최소 반복 횟수 (기본값: 3)
 * @returns {Array} - 생성된 퀴즈 시퀀스
 */
export function generateQuizSequence(stageQuizzes, repetitions = 3) {
  // 각 퀴즈를 repetitions 횟수만큼 복제하여 배열 생성
  let quizSequence = [];
  for (let i = 0; i < repetitions; i++) {
    quizSequence = [...quizSequence, ...stageQuizzes];
  }
  
  // 배열 섞기 (Fisher-Yates 알고리즘)
  for (let i = quizSequence.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizSequence[i], quizSequence[j]] = [quizSequence[j], quizSequence[i]];
  }
  
  // 연속된 동일 음 방지 (필요시 재배치)
  for (let i = 1; i < quizSequence.length; i++) {
    if (isSameNote(quizSequence[i], quizSequence[i-1])) {
      // 다음 위치에 있는 다른 음과 교환
      for (let j = i + 1; j < quizSequence.length; j++) {
        if (!isSameNote(quizSequence[j], quizSequence[i-1])) {
          [quizSequence[i], quizSequence[j]] = [quizSequence[j], quizSequence[i]];
          break;
        }
      }
    }
  }
  
  return quizSequence;
}

/**
 * 두 퀴즈가 같은 음인지 확인합니다.
 * 
 * @param {Object} quiz1 - 첫 번째 퀴즈 (string, fret 속성을 가진 객체)
 * @param {Object} quiz2 - 두 번째 퀴즈 (string, fret 속성을 가진 객체)
 * @returns {boolean} - 두 퀴즈가 같은 음이면 true, 아니면 false
 */
function isSameNote(quiz1, quiz2) {
  return quiz1.string === quiz2.string && quiz1.fret === quiz2.fret;
}

/**
 * 단계별 퀴즈 배열에서 현재 퀴즈 정보를 생성합니다.
 * 
 * @param {Object} quiz - 현재 퀴즈 (string, fret 속성을 가진 객체)
 * @param {Function} getNoteFunction - 음 이름을 가져오는 함수
 * @returns {Object} - 현재 퀴즈 정보 (string, fret, noteName, questionText 속성을 가진 객체)
 */
export function createQuizInfo(quiz, getNoteFunction) {
  const noteName = getNoteFunction(quiz.string, quiz.fret);
  const stringNumber = quiz.string + 1; // 0-indexed to 1-indexed for display
  
  return {
    ...quiz,
    noteName,
    questionText: `${stringNumber}번줄 ${noteName}`
  };
}
