import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Fretboard from "../components/Fretboard";
import QuizDisplayMinimal from "../components/QuizDisplay";
import { getNote, getNoteWithOctave } from "../utils/guitarLogic";
import { generateQuizSequence, createQuizInfo } from "../utils/quizGenerator";
import { Howl } from "howler";
import "../assets/responsive.css";

const soundFiles = import.meta.glob("../assets/sounds/*.ogg");
const soundCache = {};
let currentSound = null; // 추가: 현재 재생 중인 소리를 저장하는 전역 변수
let allSoundsLoaded = false; // 전체 사운드 로딩 완료 플래그

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
        preload: true, // 미리 로드 옵션 추가
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
const preloadAllSounds = async () => {
  if (allSoundsLoaded) {
    return true; // 이미 로드된 경우 바로 성공 반환
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

const playSound = (noteWithOctave) => {
  if (!noteWithOctave) return;

  // 이전에 재생 중이던 소리가 있다면 중지
  if (currentSound) {
    currentSound.stop();
    currentSound = null;
  }

  const soundFileName = `${noteWithOctave.replace("#", "s")}.ogg`;
  const soundPathKey = `../assets/sounds/${soundFileName}`;

  // 캐시된 사운드가 있으면 바로 재생
  if (soundCache[soundPathKey]) {
    currentSound = soundCache[soundPathKey];
    currentSound.play();
  } else {
    // 캐시되지 않은 경우 (이제 거의 발생하지 않아야 함)
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

const PracticeScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stage } = location.state || {};

  // 윈도우 크기 상태 관리
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // iPhone 14 Pro Max 가로 모드 감지
  const isIPhone14ProMaxLandscape = () => {
    return (
      windowSize.width >= 920 &&
      windowSize.width <= 940 &&
      windowSize.height >= 420 &&
      windowSize.height <= 440
    );
  };

  const [quizSequence, setQuizSequence] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedNoteInfo, setSelectedNoteInfo] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [showCorrectAnswerHighlight, setShowCorrectAnswerHighlight] =
    useState(false);
  const [correctAnswerDetails, setCorrectAnswerDetails] = useState(null);
  const [quizProgress, setQuizProgress] = useState({ current: 0, total: 0 });
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showAnswerLabel, setShowAnswerLabel] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [soundsLoaded, setSoundsLoaded] = useState(false);

  // 단계별 퀴즈 시퀀스 생성 및 사운드 미리 로드
  useEffect(() => {
    const initializeStage = async () => {
      if (stage && stage.quizzes) {
        setIsLoading(true);
        setSoundsLoaded(false);

        // 퀴즈 시퀀스 생성
        const sequence = generateQuizSequence(stage.quizzes, 3);
        setQuizSequence(sequence);
        setQuizProgress({ current: 1, total: sequence.length });
        setCurrentQuizIndex(0);
        setQuizCompleted(false);

        // 모든 사운드 미리 로드 (한 번만)
        console.log("Loading all guitar note sounds...");
        const success = await preloadAllSounds();

        if (success) {
          setSoundsLoaded(true);
        }
        setIsLoading(false);
      }
    };

    initializeStage();
  }, [stage]);

  // 현재 퀴즈 설정
  useEffect(() => {
    if (
      quizSequence.length > 0 &&
      currentQuizIndex < quizSequence.length &&
      soundsLoaded
    ) {
      const quiz = quizSequence[currentQuizIndex];
      setCurrentQuiz(createQuizInfo(quiz, getNote));
      setSelectedNoteInfo(null);
      setFeedbackMessage(null);
      setShowCorrectAnswerHighlight(false);
      setCorrectAnswerDetails(null);
      setQuizProgress((prev) => ({ ...prev, current: currentQuizIndex + 1 }));
      setWrongAttempts(0);
      setShowAnswerLabel(false);
    }
  }, [quizSequence, currentQuizIndex, soundsLoaded]);

  // 다음 퀴즈로 이동
  const nextQuiz = useCallback(() => {
    if (currentQuizIndex < quizSequence.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    } else {
      // 모든 퀴즈 완료
      setQuizCompleted(true);
      setFeedbackMessage({
        type: "complete",
        text: `모든 퀴즈를 완료했습니다! (${quizSequence.length}/${quizSequence.length})`,
      });
    }
  }, [currentQuizIndex, quizSequence.length]);

  // Restart the current practice
  const handleRestartPractice = () => {
    // Reset all state and regenerate the quiz sequence
    if (stage && stage.quizzes) {
      const sequence = generateQuizSequence(stage.quizzes, 3);
      setQuizSequence(sequence);
      setQuizProgress({ current: 1, total: sequence.length });
      setCurrentQuizIndex(0);
      setSelectedNoteInfo(null);
      setFeedbackMessage(null);
      setShowCorrectAnswerHighlight(false);
      setCorrectAnswerDetails(null);
      setWrongAttempts(0);
      setShowAnswerLabel(false);
      setQuizCompleted(false);
    }
  };

  // Handle back button - return to stage detail
  const handleBack = () => {
    navigate("/stage-detail", { state: { stage } });
  };

  // 노트 선택 처리
  const handleNoteSelect = (stringIndex, fretNum) => {
    if (!currentQuiz) {
      return;
    }

    const noteName = getNote(stringIndex, fretNum);
    const noteNameWithOctave = getNoteWithOctave(stringIndex, fretNum);

    // Check if the selected note is correct
    const isCorrect =
      stringIndex === currentQuiz.string && fretNum === currentQuiz.fret;

    // Set selected note with the correctness flag
    setSelectedNoteInfo({
      string: stringIndex,
      fret: fretNum,
      name: noteName,
      nameWithOctave: noteNameWithOctave,
      isCorrect: isCorrect,
    });

    playSound(noteNameWithOctave);

    if (isCorrect) {
      // 정답
      setFeedbackMessage({ type: "correct", text: `정답입니다! ${noteName}` });
      setShowCorrectAnswerHighlight(false);
      setCorrectAnswerDetails(null);
      setWrongAttempts(0);
      setTimeout(nextQuiz, 1200);
    } else {
      // 오답 - 틀린 횟수 증가
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);

      // 토스트 메시지 표시
      setFeedbackMessage({
        type: "incorrect",
        text: `틀렸습니다. (${newWrongAttempts}회 틀림)`,
      });

      // 3번 틀렸을 경우 정답 표시
      if (newWrongAttempts >= 3) {
        setShowCorrectAnswerHighlight(true);
        setCorrectAnswerDetails({
          string: currentQuiz.string,
          fret: currentQuiz.fret,
        });
        setShowAnswerLabel(true); // 지판 위에 알파벳 표시
      }
    }
  };

  // If no stage data, show an error message and a button to go back
  if (!stage) {
    return (
      <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-slate-900 text-white p-4 overflow-hidden">
        <h2 className="text-xl font-bold mb-4">
          오류: 스테이지 데이터를 찾을 수 없습니다
        </h2>
        <p className="mb-6">연습을 시작하려면 스테이지를 다시 선택해주세요.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 rounded-lg"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh] flex flex-col bg-slate-900 overflow-hidden">
      {/* 퀴즈 표시 영역 */}
      {currentQuiz && (
        <QuizDisplayMinimal
          quiz={currentQuiz}
          feedbackMessage={feedbackMessage}
          progress={quizProgress}
        />
      )}

      {/* 로딩 중일 때 표시 */}
      {(isLoading || !soundsLoaded) && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 w-auto min-w-[180px] max-w-[80%] z-20">
          <div className="bg-slate-800 bg-opacity-75 backdrop-blur-sm shadow-lg rounded-md px-3 py-2 text-center text-xs font-medium text-slate-300 border border-slate-700">
            {isLoading
              ? "퀴즈를 준비하는 중..."
              : !soundsLoaded
              ? "모든 사운드를 로딩하는 중..."
              : "준비 완료"}
          </div>
        </div>
      )}

      {/* Fretboard 영역 */}
      <div
        className={`w-full flex-grow flex justify-center items-center overflow-hidden ${
          isIPhone14ProMaxLandscape() ? "py-0" : "py-0"
        } landscape-padding min-height-adjust mt-[-10px] mb-[5px]`}
      >
        <Fretboard
          onNoteSelect={handleNoteSelect}
          highlightCorrectAnswer={
            showCorrectAnswerHighlight ? correctAnswerDetails : null
          }
          selectedNote={selectedNoteInfo}
          showAnswerLabel={showAnswerLabel}
        />
      </div>

      {/* 퀴즈 완료 모달 */}
      {quizCompleted && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-xs w-full mx-4 shadow-lg">
            <h3 className="text-lg font-bold text-white text-center mb-4">
              연습 완료!
            </h3>
            <p className="text-slate-300 text-center mb-6">
              {quizProgress.total}개의 문제를 모두 완료했습니다. 다음으로
              진행하시겠습니까?
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleRestartPractice}
                className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                다시 연습하기
              </button>
              <button
                onClick={handleBack}
                className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
              >
                다음 단계로
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeScreen;
