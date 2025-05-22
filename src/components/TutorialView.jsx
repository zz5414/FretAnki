import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Fretboard from "./Fretboard";
import { getNote } from "../utils/guitarLogic";

const TutorialView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stage } = location.state || {};

  // 스테이지 데이터 디버깅
  console.log("TutorialView - 스테이지 데이터:", stage);

  if (!stage) {
    return (
      <div className="w-full h-[100vh] flex flex-col items-center justify-center text-white p-4 overflow-hidden">
        <h2 className="text-xl font-bold mb-4">
          오류: 스테이지 데이터를 찾을 수 없습니다
        </h2>
        <p className="mb-6">홈으로 돌아가서 스테이지를 다시 선택해주세요.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 rounded-lg"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  // 튜토리얼에서 보여줄 노트 정보 생성
  const tutorialNotes = stage.quizzes.map((quiz) => {
    return {
      string: quiz.string,
      fret: quiz.fret,
      note: getNote(quiz.string, quiz.fret),
    };
  });

  // 연습 시작 버튼 핸들러
  const handleStartPractice = () => {
    navigate("/practice", { state: { stage } });
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center overflow-hidden">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-white mb-2">튜토리얼 모드</h2>
        <p className="text-slate-300 mb-1">아래 위치의 음들을 학습하세요</p>
        <p className="text-xs text-slate-400">
          각 음은 색상별로 표시됩니다 (A-G)
        </p>
      </div>

      <div className="w-full flex-grow flex justify-center items-center overflow-hidden">
        <Fretboard
          tutorialMode={true}
          showAllNotes={false}
          tutorialNotes={tutorialNotes}
          onNoteSelect={() => {}} // 튜토리얼 모드에서는 클릭 이벤트 비활성화
        />
      </div>

      {/* 색상별 음 범례 */}
      <div className="mt-4 w-full max-w-md">
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-white text-sm mb-2 font-medium">색상별 음 범례:</p>
          <div className="grid grid-cols-7 gap-2">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#FF5252] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#FF9800] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#FFEB3B] rounded-full flex items-center justify-center">
                <span className="text-black font-bold">C</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#2196F3] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#673AB7] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#E91E63] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 연습 시작 버튼 */}
      <div className="w-full max-w-md mt-6 mb-8 px-4">
        <button
          onClick={handleStartPractice}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-200"
        >
          연습 시작하기
        </button>
      </div>
    </div>
  );
};

export default TutorialView;
