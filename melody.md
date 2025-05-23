# 멜로디 따라하기 기능 설계 문서

## 1. 개요

기타 지판 암기 웹앱에 '멜로디 따라하기' 기능을 추가하여 사용자가 간단한 멜로디를 순서대로 연주하며 기타 지판을 더 효과적으로 학습할 수 있도록 합니다.

## 2. 기능 요구사항

- 3-7개 음으로 구성된 간단한 멜로디(예: 작은별)를 화면에 표시
- 멜로디를 들을 수 있는 기능 제공
- 사용자가 박자와 관계없이 순서대로 음을 연주하면 통과
- 연주한 음표는 왼쪽부터 순서대로 초록색으로 변경
- 사용자가 쉽게 멜로디를 추가할 수 있는 구조 제공

## 3. UI 설계

### 3.1 화면 구성

1. **홈 화면(HomeScreen)**
   - 기존 단계 선택 버튼 아래에 "멜로디 연주" 버튼 추가

2. **멜로디 선택 화면(MelodySelectScreen)**
   - 사용 가능한 멜로디 목록 표시
   - 각 멜로디 항목에 "연습 시작" 버튼
   - 상단 좌측에 뒤로가기 버튼

3. **멜로디 연습 화면(MelodyPracticeScreen)**
   - 상단: 멜로디 이름과 뒤로가기 버튼
   - 중앙 상단: 멜로디 음표 표시 영역 (회색 음표들, 연주 시 초록색으로 변경)
   - 중앙: 기타 지판 (기존 Fretboard 컴포넌트 재사용)
   - 하단: "멜로디 듣기" 버튼

### 3.2 UI 컴포넌트

1. **MelodyNotes 컴포넌트**
   - 멜로디의 음표들을 가로로 나열하여 표시
   - 각 음표는 처음에 회색으로 표시
   - 사용자가 올바른 음을 연주할 때마다 왼쪽부터 순서대로 초록색으로 변경
   - 모든 음표가 초록색으로 변경되면 성공 메시지 표시

2. **MelodyControls 컴포넌트**
   - "멜로디 듣기" 버튼: 클릭 시 전체 멜로디 재생
   - 완료 후 "다시 하기" 및 "다른 멜로디" 버튼 표시

## 4. 데이터 구조

### 4.1 멜로디 데이터 구조

```javascript
// src/data/melodies.js
const MELODIES = [
  {
    id: 1,
    title: "작은별",
    description: "모차르트의 작은별 변주곡 테마",
    notes: [
      { string: 0, fret: 0, noteName: "E", noteNameWithOctave: "E4" }, // 도
      { string: 0, fret: 0, noteName: "E", noteNameWithOctave: "E4" }, // 도
      { string: 0, fret: 7, noteName: "B", noteNameWithOctave: "B4" }, // 솔
      { string: 0, fret: 7, noteName: "B", noteNameWithOctave: "B4" }, // 솔
      { string: 0, fret: 9, noteName: "C#", noteNameWithOctave: "C#5" }, // 라
      { string: 0, fret: 9, noteName: "C#", noteNameWithOctave: "C#5" }, // 라
      { string: 0, fret: 7, noteName: "B", noteNameWithOctave: "B4" }  // 솔
    ]
  }
  // 추가 멜로디는 같은 형식으로 추가 가능
];

export default MELODIES;
```

### 4.2 멜로디 연습 상태 관리

```javascript
// MelodyPracticeScreen 내부 상태 관리
const [currentMelody, setCurrentMelody] = useState(null);
const [playedNotes, setPlayedNotes] = useState([]);
const [isCompleted, setIsCompleted] = useState(false);
```

## 5. 로직 설계

### 5.1 멜로디 재생 로직

```javascript
// 멜로디 전체 재생 함수
const playMelody = async (melody) => {
  for (const note of melody.notes) {
    // 각 음표 사운드 재생
    await playNoteSound(note.noteNameWithOctave);
    // 음표 간 간격 (500ms)
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};

// 개별 음표 사운드 재생 함수
const playNoteSound = (noteWithOctave) => {
  const audio = new Audio(`/src/assets/sounds/${noteWithOctave.replace('#', 's')}.mp3`);
  return audio.play();
};
```

### 5.2 사용자 연주 검증 로직

```javascript
// 사용자가 기타 지판의 특정 위치를 클릭했을 때 호출되는 함수
const handleNotePlay = (stringIndex, fret) => {
  // 현재 연주해야 할 음표 인덱스
  const currentIndex = playedNotes.length;
  
  // 모든 음표를 이미 연주했으면 무시
  if (currentIndex >= currentMelody.notes.length) return;
  
  // 현재 연주해야 할 음표
  const targetNote = currentMelody.notes[currentIndex];
  
  // 사용자가 연주한 음표
  const playedNote = {
    string: stringIndex,
    fret: fret,
    noteName: getNote(stringIndex, fret),
    noteNameWithOctave: getNoteWithOctave(stringIndex, fret)
  };
  
  // 음표 재생
  playNoteSound(playedNote.noteNameWithOctave);
  
  // 올바른 음을 연주했는지 확인 (음이름만 비교)
  if (playedNote.noteName === targetNote.noteName) {
    // 연주한 음표 추가
    setPlayedNotes([...playedNotes, playedNote]);
    
    // 모든 음표를 연주했는지 확인
    if (currentIndex + 1 >= currentMelody.notes.length) {
      setIsCompleted(true);
    }
  }
};
```

## 6. 확장성 고려사항

1. **멜로디 추가 용이성**
   - 멜로디 데이터 구조를 단순하게 유지하여 사용자가 쉽게 새로운 멜로디 추가 가능
   - 향후 멜로디 에디터 기능 추가 가능성 고려

2. **난이도 시스템**
   - 향후 멜로디 난이도 구분 추가 가능 (쉬움/보통/어려움)
   - 음표 개수, 사용되는 프렛 범위 등에 따른 난이도 자동 계산 가능

3. **사운드 시스템**
   - 기존 사운드 파일 구조 활용
   - 누락된 음표 사운드 파일에 대한 예외 처리 추가

## 7. 구현 계획

1. 멜로디 데이터 파일 생성 (`src/data/melodies.js`)
2. 멜로디 선택 화면 컴포넌트 구현 (`src/screens/MelodySelectScreen.jsx`)
3. 멜로디 연습 화면 컴포넌트 구현 (`src/screens/MelodyPracticeScreen.jsx`)
4. 멜로디 음표 표시 컴포넌트 구현 (`src/components/MelodyNotes.jsx`)
5. App.jsx에 새로운 화면 통합
6. 사운드 재생 및 검증 로직 구현
7. UI 스타일링 및 사용자 경험 개선
