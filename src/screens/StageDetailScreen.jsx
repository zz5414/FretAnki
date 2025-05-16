import React, { useState } from 'react';
import Fretboard from '../components/Fretboard';
import { getNote } from '../utils/guitarLogic';

// 튜토리얼 모드에서 사용할 컴포넌트
const TutorialView = ({ stage }) => {
  // 튜토리얼에서 보여줄 노트 정보 생성
  const tutorialNotes = stage.quizzes.map(quiz => {
    return {
      string: quiz.string,
      fret: quiz.fret,
      note: getNote(quiz.string, quiz.fret)
    };
  });

  return (
    <div className="w-full flex-grow flex flex-col items-center">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-white mb-2">튜토리얼 모드</h2>
        <p className="text-slate-300">아래 위치의 음들을 학습하세요</p>
      </div>
      
      <div className="w-full flex-grow flex justify-center items-center">
        <Fretboard 
          tutorialMode={true}
          tutorialNotes={tutorialNotes}
          onNoteSelect={() => {}} // 튜토리얼 모드에서는 클릭 이벤트 비활성화
        />
      </div>
      
      <div className="mt-4 w-full max-w-md">
        <ul className="bg-slate-800 rounded-lg p-4 grid grid-cols-2 gap-2">
          {tutorialNotes.map((note, index) => (
            <li key={index} className="text-white flex items-center">
              <span className="w-8 h-8 flex items-center justify-center bg-sky-600 rounded-full mr-2">
                {note.string + 1}
              </span>
              <span>
                {note.fret}프렛: <strong className="text-sky-400">{note.note}</strong>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const StageDetailScreen = ({ stage, onBack, onStartPractice }) => {
  const [showTutorial, setShowTutorial] = useState(false);
  
  return (
    <div className="w-full h-full flex flex-col">
      {/* 상단 네비게이션 바 */}
      <div className="w-full bg-slate-800 p-4 flex items-center justify-between pt-[calc(env(safe-area-inset-top)+1rem)]">
        <button 
          onClick={onBack}
          className="text-white flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          뒤로
        </button>
        
        {showTutorial && (
          <button 
            onClick={onStartPractice}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            시작하기
          </button>
        )}
      </div>
      
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-grow flex flex-col items-center p-6">
        {showTutorial ? (
          <TutorialView stage={stage} />
        ) : (
          <div className="w-full max-w-md flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white mb-4">{stage.title}</h1>
            <p className="text-slate-300 mb-8 text-center">{stage.description}</p>
            
            <div className="w-full space-y-4">
              <button 
                onClick={() => setShowTutorial(true)}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200"
              >
                튜토리얼 보기
              </button>
              
              <button 
                onClick={onStartPractice}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200"
              >
                연습 시작하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StageDetailScreen;
