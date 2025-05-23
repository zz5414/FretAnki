import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import STAGES from "../data/stages";
import { preloadAllSounds } from "../utils/soundManager";

const StageItem = ({ stage, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(stage)}
      className="w-full max-w-md bg-slate-800 hover:bg-slate-700 text-white rounded-lg shadow-lg p-6 mb-4 transition-all duration-200 transform hover:scale-102 border border-slate-700 hover:border-sky-500"
    >
      <h2 className="text-xl font-bold mb-2 text-sky-400">{stage.title}</h2>
      <p className="text-slate-300">{stage.description}</p>
    </button>
  );
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const [soundsLoaded, setSoundsLoaded] = useState(false);
  const [soundsLoading, setSoundsLoading] = useState(false);

  // 사운드 미리 로딩
  useEffect(() => {
    const loadSounds = async () => {
      setSoundsLoading(true);
      console.log("Loading all guitar note sounds...");
      const success = await preloadAllSounds();
      if (success) {
        setSoundsLoaded(true);
        console.log("All sounds loaded successfully");
      }
      setSoundsLoading(false);
    };

    loadSounds();
  }, []);

  const handleStageSelect = (stage) => {
    console.log("HomeScreen - Stage selected:", stage);
    navigate("/stage-detail", { state: { stage } });
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-start p-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] overflow-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        기타 지판 암기 학습
      </h1>

      {/* 사운드 로딩 상태 표시 */}
      {soundsLoading && (
        <div className="mb-4 p-3 bg-slate-800 rounded-lg border border-slate-700">
          <div className="text-sm text-slate-300 text-center">
            🎵 사운드 파일을 로딩 중입니다...
          </div>
        </div>
      )}

      {soundsLoaded && (
        <div className="mb-4 p-3 bg-green-800 rounded-lg border border-green-700">
          <div className="text-sm text-white text-center">
            ✅ 모든 사운드가 준비되었습니다!
          </div>
        </div>
      )}

      <div className="w-full max-w-md flex flex-col items-center space-y-4">
        {STAGES.map((stage) => (
          <StageItem
            key={stage.id}
            stage={stage}
            onSelect={handleStageSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
