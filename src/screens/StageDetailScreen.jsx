import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StageDetailScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stage } = location.state || {};

  // Debug location state and stage data
  console.log("StageDetailScreen - Location state:", location.state);
  console.log("StageDetailScreen - Stage data:", stage);

  if (!stage) {
    return <div className="text-white">Stage not found</div>;
  }

  const handleStartPractice = () => {
    console.log("Starting practice with stage:", stage);
    navigate("/practice", { state: { stage: stage } });
  };

  return (
    <div className="w-full h-[100vh] flex flex-col overflow-hidden">
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 overflow-hidden">
        <div className="w-full max-w-md flex flex-col items-center">
          <h1 className="text-2xl font-bold text-white mb-4">{stage.title}</h1>
          <p className="text-slate-300 mb-8 text-center">{stage.description}</p>

          <div className="w-full space-y-4">
            <button
              onClick={() => navigate("tutorial", { state: { stage } })}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200"
            >
              튜토리얼 보기
            </button>

            <button
              onClick={handleStartPractice}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200"
            >
              연습 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageDetailScreen;
