import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import StageDetailScreen from './screens/StageDetailScreen';
import PracticeScreen from './screens/PracticeScreen';

// 앱 화면 상태 정의
const SCREENS = {
  HOME: 'home',
  STAGE_DETAIL: 'stage_detail',
  PRACTICE: 'practice'
};

function App() {
  // 현재 화면 상태
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);
  // 현재 선택된 단계
  const [selectedStage, setSelectedStage] = useState(null);

  // 단계 선택 핸들러
  const handleStageSelect = (stage) => {
    setSelectedStage(stage);
    setCurrentScreen(SCREENS.STAGE_DETAIL);
  };

  // 홈 화면으로 돌아가기
  const handleBackToHome = () => {
    setCurrentScreen(SCREENS.HOME);
  };

  // 연습 시작 핸들러
  const handleStartPractice = () => {
    setCurrentScreen(SCREENS.PRACTICE);
  };

  // 연습 화면에서 뒤로가기 (단계 상세로)
  const handleBackToPractice = () => {
    setCurrentScreen(SCREENS.STAGE_DETAIL);
  };

  // 현재 화면에 따라 컴포넌트 렌더링
  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.HOME:
        return <HomeScreen onStageSelect={handleStageSelect} />;
      
      case SCREENS.STAGE_DETAIL:
        return (
          <StageDetailScreen 
            stage={selectedStage} 
            onBack={handleBackToHome} 
            onStartPractice={handleStartPractice} 
          />
        );
      
      case SCREENS.PRACTICE:
        return (
          <PracticeScreen 
            stage={selectedStage} 
            onBack={handleBackToPractice} 
          />
        );
      
      default:
        return <HomeScreen onStageSelect={handleStageSelect} />;
    }
  };

  return (
    <div className="App bg-slate-900 w-screen h-[100dvh] max-h-[100dvh] overflow-y-auto">
      {renderScreen()}
    </div>
  );
}

export default App;
