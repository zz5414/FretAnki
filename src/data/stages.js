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
      { string: 0, fret: 0 }, // 1번줄(인덱스 0) E
    ],
  },
  {
    id: 2,
    title: "2단계: 6번줄 G, A, B",
    description: "6번줄의 G, A, B 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 3 }, // 6번줄(인덱스 5) G (3프렛)
      { string: 5, fret: 5 }, // 6번줄(인덱스 5) A (5프렛)
      { string: 5, fret: 7 }, // 6번줄(인덱스 5) B (7프렛)
    ],
  },
  {
    id: 3,
    title: "3단계: 6번줄 F, C, D",
    description: "6번줄의 F, C, D 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 1 }, // 6번줄(인덱스 5) F (1프렛)
      { string: 5, fret: 8 }, // 6번줄(인덱스 5) C (8프렛)
      { string: 5, fret: 10 }, // 6번줄(인덱스 5) D (10프렛)
    ],
  },
  {
    id: 4,
    title: "4단계: 6번줄 복습 E, F, G, A, B, C, D",
    description: "6번줄의 E, F, G, A, B, C, D 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 0 }, // 6번줄(인덱스 5) E (0프렛)
      { string: 5, fret: 1 }, // 6번줄(인덱스 5) F (1프렛)
      { string: 5, fret: 3 }, // 6번줄(인덱스 5) G (2프렛)
      { string: 5, fret: 5 }, // 6번줄(인덱스 5) A (3프렛)
      { string: 5, fret: 7 }, // 6번줄(인덱스 5) B (4프렛)
      { string: 5, fret: 8 }, // 6번줄(인덱스 5) C (5프렛)
      { string: 5, fret: 10 }, // 6번줄(인덱스 5) D (6프렛)
    ],
  },
  {
    id: 5,
    title: "5단계: 5번줄 C, D, E",
    description: "5번줄의 C, D, E 음계를 학습합니다.",
    quizzes: [
      { string: 4, fret: 3 }, // 5번줄(인덱스 4) C (3프렛)
      { string: 4, fret: 5 }, // 5번줄(인덱스 4) D (5프렛)
      { string: 4, fret: 7 }, // 5번줄(인덱스 4) E (7프렛)
    ],
  },
  {
    id: 6,
    title: "6단계: 5번줄 B, F, G",
    description: "5번줄의 B, F, G 음계를 학습합니다.",
    quizzes: [
      { string: 4, fret: 2 }, // 4번줄(인덱스 3) B (1프렛)
      { string: 4, fret: 8 }, // 4번줄(인덱스 3) F (8프렛)
      { string: 4, fret: 10 }, // 4번줄(인덱스 3) G (10프렛)
    ],
  },

  {
    id: 7,
    title: "7단계: 5번줄 복습 A, B, C, D, E, F, G",
    description: "5번줄의 A, B, C, D, E, F, G 음계를 학습합니다.",
    quizzes: [
      { string: 4, fret: 0 }, // 5번줄(인덱스 4) A (0프렛)
      { string: 4, fret: 2 }, // 5번줄(인덱스 4) B (2프렛)
      { string: 4, fret: 3 }, // 5번줄(인덱스 4) C (2프렛)
      { string: 4, fret: 5 }, // 5번줄(인덱스 4) D (3프렛)
      { string: 4, fret: 7 }, // 5번줄(인덱스 4) E (4프렛)
      { string: 4, fret: 8 }, // 5번줄(인덱스 4) F (5프렛)
      { string: 4, fret: 10 }, // 5번줄(인덱스 4) G (6프렛)
    ],
  },
  {
    id: 8,
    title: "8단계: 5, 6번줄 복습",
    description: "5, 6번줄의 복습을 학습합니다.",
    quizzes: [
      { string: 5, fret: 0 }, // 6번줄(인덱스 5) E (0프렛)
      { string: 5, fret: 1 }, // 6번줄(인덱스 5) F (1프렛)
      { string: 5, fret: 3 }, // 6번줄(인덱스 5) G (2프렛)
      { string: 5, fret: 5 }, // 6번줄(인덱스 5) A (3프렛)
      { string: 5, fret: 7 }, // 6번줄(인덱스 5) B (4프렛)
      { string: 5, fret: 8 }, // 6번줄(인덱스 5) C (5프렛)
      { string: 5, fret: 10 }, // 6번줄(인덱스 5) D (6프렛)
      { string: 4, fret: 0 }, // 5번줄(인덱스 4) A (0프렛)
      { string: 4, fret: 2 }, // 5번줄(인덱스 4) B (2프렛)
      { string: 4, fret: 3 }, // 5번줄(인덱스 4) C (2프렛)
      { string: 4, fret: 5 }, // 5번줄(인덱스 4) D (3프렛)
      { string: 4, fret: 7 }, // 5번줄(인덱스 4) E (4프렛)
      { string: 4, fret: 8 }, // 5번줄(인덱스 4) F (5프렛)
      { string: 4, fret: 10 }, // 5번줄(인덱스 4) G (6프렛)
    ],
  },
  {
    id: 9,
    title: "9단계: 4번줄 G, A, B",
    description: "4번줄의 G, A, B 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 3 }, // 6번줄(인덱스 5) G (3프렛)
      { string: 5, fret: 5 }, // 6번줄(인덱스 5) A (5프렛)
      { string: 5, fret: 7 }, // 6번줄(인덱스 5) B (7프렛)
      { string: 3, fret: 5 }, // 4번줄(인덱스 3) G (5프렛)
      { string: 3, fret: 7 }, // 4번줄(인덱스 3) A (7프렛)
      { string: 3, fret: 9 }, // 4번줄(인덱스 3) B (9프렛)
    ],
  },
  {
    id: 10,
    title: "10단계: 4번줄 E, F, C",
    description: "4번줄의 E, F, C 음계를 학습합니다.",
    quizzes: [
      { string: 3, fret: 2 },
      { string: 3, fret: 3 },
      { string: 3, fret: 10 },
    ],
  },
  {
    id: 11,
    title: "11단계: 4번줄 D, E, F, G, A, B, C",
    description: "4번줄의 D, E, F, G, A, B, C 음계를 학습합니다.",
    quizzes: [
      { string: 3, fret: 0 },
      { string: 3, fret: 2 },
      { string: 3, fret: 3 },
      { string: 3, fret: 5 },
      { string: 3, fret: 7 },
      { string: 3, fret: 9 },
      { string: 3, fret: 10 },
    ],
  },
  // 12단계 5번줄 c d e 3번줄 c d e
  {
    id: 12,
    title: "12단계: 3번줄 C, D, E",
    description: "3번줄의 C, D, E 음계를 학습합니다.",
    quizzes: [
      { string: 4, fret: 3 }, // 5번줄(인덱스 4) C (3프렛)
      { string: 4, fret: 5 }, // 5번줄(인덱스 4) D (5프렛)
      { string: 4, fret: 7 }, // 5번줄(인덱스 4) E (7프렛)
      { string: 2, fret: 5 }, // 5번줄(인덱스 4) C (3프렛)
      { string: 2, fret: 7 }, // 5번줄(인덱스 4) D (5프렛)
      { string: 2, fret: 9 }, // 5번줄(인덱스 4) E (7프렛)
    ],
  },
  {
    id: 13,
    title: "13단계: 3번줄 A, B, F",
    description: "3번줄의 A, B, F 음계를 학습합니다.",
    quizzes: [
      { string: 2, fret: 2 }, // 5번줄(인덱스 4) C (3프렛)
      { string: 2, fret: 4 }, // 5번줄(인덱스 4) D (5프렛)
      { string: 2, fret: 10 }, // 5번줄(인덱스 4) E (7프렛)
    ],
  },
  {
    id: 14,
    title: "14단계: 3번줄 복습 G, A, B, C, D, E, F",
    description: "3번줄의 G, A, B, C, D, E, F 음계를 학습합니다.",
    quizzes: [
      { string: 2, fret: 0 },
      { string: 2, fret: 5 }, // 5번줄(인덱스 4) C (3프렛)
      { string: 2, fret: 7 }, // 5번줄(인덱스 4) D (5프렛)
      { string: 2, fret: 9 }, // 5번줄(인덱스 4) E (7프렛)
      { string: 2, fret: 2 }, // 5번줄(인덱스 4) C (3프렛)
      { string: 2, fret: 4 }, // 5번줄(인덱스 4) D (5프렛)
      { string: 2, fret: 10 }, // 5번줄(인덱스 4) E (7프렛)
    ],
  },
  {
    id: 15,
    title: "15단계: 2번줄 C, D, E",
    description: "2번줄의 C, D, E 음계를 학습합니다.",
    quizzes: [
      { string: 1, fret: 1 },
      { string: 1, fret: 3 },
      { string: 1, fret: 5 },
    ],
  },
  {
    id: 16,
    title: "16단계: 2번줄 G, A, B",
    description: "2번줄의 G, A, B 음계를 학습합니다.",
    quizzes: [
      { string: 1, fret: 8 },
      { string: 1, fret: 10 },
      { string: 1, fret: 12 },
    ],
  },
  {
    id: 17,
    title: "17단계: 2번줄 복습 B, C, D, E, F, G, A",
    description: "2번줄의 B, C, D, E, F, G, A 음계를 학습합니다.",
    quizzes: [
      { string: 1, fret: 0 },
      { string: 1, fret: 1 },
      { string: 1, fret: 3 },
      { string: 1, fret: 5 },
      { string: 1, fret: 6 },
      { string: 1, fret: 8 },
      { string: 1, fret: 10 },
    ],
  },
  {
    id: 18,
    title: "18단계: 1번줄 복습 E, F, G, A, B, C, D",
    description: "1번줄의 E, F, G, A, B, C, D 음계를 학습합니다.",
    quizzes: [
      { string: 0, fret: 0 },
      { string: 0, fret: 1 },
      { string: 0, fret: 3 },
      { string: 0, fret: 5 },
      { string: 0, fret: 7 },
      { string: 0, fret: 8 },
      { string: 0, fret: 10 },
    ],
  },
  {
    id: 19,
    title: "19단계: 각 줄 별로 G 학습",
    description: "모든줄의 G 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 3 },
      { string: 4, fret: 10 },
      { string: 3, fret: 5 },
      { string: 2, fret: 0 },
      { string: 1, fret: 8 },
      { string: 0, fret: 3 },
    ],
  },
  {
    id: 20,
    title: "20단계: 각 줄 별로 A 학습",
    description: "모든줄의 A 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 5 },
      { string: 4, fret: 0 },
      { string: 3, fret: 7 },
      { string: 2, fret: 2 },
      { string: 1, fret: 10 },
      { string: 0, fret: 5 },
    ],
  },
  {
    id: 21,
    title: "21단계: 각 줄 별로 B 학습",
    description: "모든줄의 B 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 7 },
      { string: 4, fret: 2 },
      { string: 3, fret: 9 },
      { string: 2, fret: 4 },
      { string: 1, fret: 0 },
      { string: 0, fret: 7 },
    ],
  },
  {
    id: 22,
    title: "22단계: 각 줄 별로 C 학습",
    description: "모든줄의 C 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 8 },
      { string: 4, fret: 3 },
      { string: 3, fret: 10 },
      { string: 2, fret: 5 },
      { string: 1, fret: 1 },
      { string: 0, fret: 8 },
    ],
  },
  {
    id: 23,
    title: "23단계: 각 줄 별로 D 학습",
    description: "모든줄의 D 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 10 },
      { string: 4, fret: 5 },
      { string: 3, fret: 0 },
      { string: 2, fret: 7 },
      { string: 1, fret: 3 },
      { string: 0, fret: 10 },
    ],
  },
  {
    id: 24,
    title: "24단계: 각 줄 별로 E 학습",
    description: "모든줄의 E 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 0 },
      { string: 4, fret: 7 },
      { string: 3, fret: 2 },
      { string: 2, fret: 9 },
      { string: 1, fret: 5 },
      { string: 0, fret: 0 },
    ],
  },
  {
    id: 25,
    title: "25단계: 각 줄 별로 F 학습",
    description: "모든줄의 F 음계를 학습합니다.",
    quizzes: [
      { string: 5, fret: 1 },
      { string: 4, fret: 8 },
      { string: 3, fret: 3 },
      { string: 2, fret: 10 },
      { string: 1, fret: 6 },
      { string: 0, fret: 1 },
    ],
  },
];

export default STAGES;
