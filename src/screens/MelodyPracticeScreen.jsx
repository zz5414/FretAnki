import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Fretboard from "../components/Fretboard";
import MelodyNotes from "../components/MelodyNotes";
import { generateMelodyFromStage } from "../data/melodies";
import { getNote, getNoteWithOctave } from "../utils/guitarLogic";
import { playSound, playMelodySequence } from "../utils/soundManager";
import STAGES from "../data/stages";

const MelodyPracticeScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stage } = location.state || {};

  // 상태 관리
  const [melody, setMelody] = useState([]);
  const [playedCount, setPlayedCount] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showCorrectAnswerHighlight, setShowCorrectAnswerHighlight] =
    useState(false);
  const [correctAnswerDetails, setCorrectAnswerDetails] = useState(null);
  const [selectedNoteInfo, setSelectedNoteInfo] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // 멜로디 전체 재생 함수
  const playMelody = async () => {
    if (!melody || melody.length === 0) return;

    for (let i = 0; i < melody.length; i++) {
      const note = melody[i];
      const noteWithOctave = getNoteWithOctave(note.string, note.fret);
      if (noteWithOctave) {
        playSound(noteWithOctave);
        // 음표 간 간격 (500ms)
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  };

  // 초기 멜로디 생성
  useEffect(() => {
    if (stage) {
      const generatedMelody = generateMelodyFromStage(stage);
      setMelody(generatedMelody);
      console.log("Generated melody:", generatedMelody);
    }
  }, [stage]);

  // 스테이지 없음 처리
  if (!stage) {
    return (
      <div className="w-full h-[100vh] flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-xl font-bold mb-4">
          오류: 스테이지 데이터를 찾을 수 없습니다
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 rounded-lg"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  // 현재 연주해야 할 음표
  const currentTargetNote =
    playedCount < melody.length ? melody[playedCount] : null;

  // 노트 선택 처리
  const handleNoteSelect = (stringIndex, fretNum) => {
    if (isCompleted || !currentTargetNote) return;

    const noteName = getNote(stringIndex, fretNum);
    const noteNameWithOctave = getNoteWithOctave(stringIndex, fretNum);

    // 정확한 위치인지 확인 (string과 fret 모두 일치해야 함)
    const isCorrect =
      stringIndex === currentTargetNote.string &&
      fretNum === currentTargetNote.fret;

    // 선택된 노트 정보 설정
    setSelectedNoteInfo({
      string: stringIndex,
      fret: fretNum,
      name: noteName,
      nameWithOctave: noteNameWithOctave,
      isCorrect: isCorrect,
    });

    // 사운드 재생
    playSound(noteNameWithOctave);

    if (isCorrect) {
      // 정답
      setShowCorrectAnswerHighlight(false);
      setCorrectAnswerDetails(null);
      setWrongAttempts(0);

      const newPlayedCount = playedCount + 1;
      setPlayedCount(newPlayedCount);

      // 모든 음표를 완주했는지 확인
      if (newPlayedCount >= melody.length) {
        setIsCompleted(true);
        setTimeout(() => {
          setShowCompletionModal(true);
        }, 1000);
      }

      // 0.8초 후 선택 표시 제거
      setTimeout(() => {
        setSelectedNoteInfo(null);
      }, 800);
    } else {
      // 오답
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);

      if (newWrongAttempts >= 3) {
        // 3회 틀렸을 때 정답 표시
        setShowCorrectAnswerHighlight(true);
        setCorrectAnswerDetails({
          string: currentTargetNote.string,
          fret: currentTargetNote.fret,
        });
      }

      // 1.5초 후 선택 표시 제거
      setTimeout(() => {
        setSelectedNoteInfo(null);
      }, 1500);
    }
  };

  // 다시 시작
  const handleRestart = () => {
    const newMelody = generateMelodyFromStage(stage);
    setMelody(newMelody);
    setPlayedCount(0);
    setWrongAttempts(0);
    setShowCorrectAnswerHighlight(false);
    setCorrectAnswerDetails(null);
    setSelectedNoteInfo(null);
    setIsCompleted(false);
    setShowCompletionModal(false);
  };

  // 다음 스테이지로 이동
  const handleNextStage = () => {
    const currentStageIndex = STAGES.findIndex((s) => s.id === stage.id);
    if (currentStageIndex !== -1 && currentStageIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentStageIndex + 1];
      navigate("/stage-detail", { state: { stage: nextStage }, replace: true });
    } else {
      // 마지막 스테이지인 경우 홈으로
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col overflow-hidden bg-slate-900">
      {/* 제목 */}
      <div className="flex-shrink-0 text-center p-4">
        <h1 className="text-xl font-bold text-white">
          {stage.title} - 멜로디 연습
        </h1>
      </div>

      {/* 멜로디 표시 영역 */}
      <div className="flex-shrink-0">
        <MelodyNotes
          melody={melody}
          playedCount={playedCount}
          onPlayMelody={playMelody}
        />
      </div>

      {/* 기타 지판 */}
      <div className="flex-grow flex items-center justify-center overflow-hidden">
        <Fretboard
          onNoteSelect={handleNoteSelect}
          selectedNote={selectedNoteInfo}
          highlightCorrectAnswer={
            showCorrectAnswerHighlight ? correctAnswerDetails : null
          }
          showAnswerLabel={showCorrectAnswerHighlight}
        />
      </div>

      {/* 완료 모달 */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg max-w-sm mx-4">
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              🎉 축하합니다!
            </h2>
            <p className="text-slate-300 mb-6 text-center">
              멜로디를 모두 완주했습니다!
            </p>
            <div className="space-y-3">
              <button
                onClick={handleRestart}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              >
                한번 더 하기
              </button>
              <button
                onClick={handleNextStage}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                다음 스테이지
              </button>
              <button
                onClick={() => navigate("/stage-detail", { state: { stage } })}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg font-semibold"
              >
                스테이지로 돌아가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MelodyPracticeScreen;
