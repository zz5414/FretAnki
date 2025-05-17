// src/data/stages.js
// 단계별 학습 데이터 정의

const STAGES = [
  {
    id: 1,
    title: "1단계: 개방현 음계",
    description: "0프렛의 EADGBE 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 0 }, // 6번줄(인덱스 5) E
      { string: 4, fret: 0 }, // 5번줄(인덱스 4) A
      { string: 3, fret: 0 }, // 4번줄(인덱스 3) D
      { string: 2, fret: 0 }, // 3번줄(인덱스 2) G
      { string: 1, fret: 0 }, // 2번줄(인덱스 1) B
      { string: 0, fret: 0 }  // 1번줄(인덱스 0) E
    ]
  },
  {
    id: 2,
    title: "2단계: 6번줄 G, A, B",
    description: "6번줄의 G, A, B 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 3 }, // 6번줄(인덱스 5) G (3프렛)
      { string: 5, fret: 5 }, // 6번줄(인덱스 5) A (5프렛)
      { string: 5, fret: 7 }  // 6번줄(인덱스 5) B (7프렛)
    ]
  },
  {
    id: 3,
    title: "3단계: 5번줄 C, D, E",
    description: "5번줄의 C, D, E 음계를 학습합니다.",
    quizzes: [
      { string: 4, fret: 3 }, // 5번줄(인덱스 4) C (3프렛)
      { string: 4, fret: 5 }, // 5번줄(인덱스 4) D (5프렛)
      { string: 4, fret: 7 }  // 5번줄(인덱스 4) E (7프렛)
    ]
  }
];

export default STAGES;
