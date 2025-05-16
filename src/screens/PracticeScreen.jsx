import React, { useState, useEffect, useCallback } from 'react';
import Fretboard from '../components/Fretboard';
import QuizDisplayMinimal from '../components/QuizDisplay';
import { getNote, getNoteWithOctave } from '../utils/guitarLogic';
import { generateQuizSequence, createQuizInfo } from '../utils/quizGenerator';
import { Howl } from 'howler';

const soundFiles = import.meta.glob('../assets/sounds/*.mp3');
const soundCache = {};

const playSound = (noteWithOctave) => {
  if (!noteWithOctave) return;
  const soundFileName = `${noteWithOctave.replace("#", "s")}.mp3`;
  const soundPathKey = `../assets/sounds/${soundFileName}`;

  if (soundCache[soundPathKey]) {
    soundCache[soundPathKey].play();
  } else if (soundFiles[soundPathKey]) {
    soundFiles[soundPathKey]().then(module => {
      const sound = new Howl({
        src: [module.default],
        volume: 0.7,
        html5: true,
        onloaderror: (id, err) => console.error('Howler load error:', err, `for ${soundPathKey}`),
        onplayerror: (id, err) => console.error('Howler play error:', err, `for ${soundPathKey}`),
      });
      soundCache[soundPathKey] = sound;
      sound.play();
    }).catch(err => {
      console.error(`Error loading sound module ${soundPathKey}:`, err);
    });
  } else {
    // console.warn(`Sound file not found: ${soundPathKey}. Ensure actual audio is present.`);
  }
};

const PracticeScreen = ({ stage, onBack }) => {
  const [quizSequence, setQuizSequence] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedNoteInfo, setSelectedNoteInfo] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [showCorrectAnswerHighlight, setShowCorrectAnswerHighlight] = useState(false);
  const [correctAnswerDetails, setCorrectAnswerDetails] = useState(null);
  const [quizProgress, setQuizProgress] = useState({ current: 0, total: 0 });

  // 단계별 퀴즈 시퀀스 생성
  useEffect(() => {
    if (stage && stage.quizzes) {
      // 각 음이 최소 3번 반복되는 퀴즈 시퀀스 생성
      const sequence = generateQuizSequence(stage.quizzes, 3);
      setQuizSequence(sequence);
      setQuizProgress({ current: 1, total: sequence.length });
      setCurrentQuizIndex(0);
    }
  }, [stage]);

  // 현재 퀴즈 설정
  useEffect(() => {
    if (quizSequence.length > 0 && currentQuizIndex < quizSequence.length) {
      const quiz = quizSequence[currentQuizIndex];
      setCurrentQuiz(createQuizInfo(quiz, getNote));
      setSelectedNoteInfo(null);
      setFeedbackMessage(null);
      setShowCorrectAnswerHighlight(false);
      setCorrectAnswerDetails(null);
      setQuizProgress(prev => ({ ...prev, current: currentQuizIndex + 1 }));
    }
  }, [quizSequence, currentQuizIndex]);

  // 다음 퀴즈로 이동
  const nextQuiz = useCallback(() => {
    if (currentQuizIndex < quizSequence.length - 1) {
      setCurrentQuizIndex(prevIndex => prevIndex + 1);
    } else {
      // 모든 퀴즈 완료
      setFeedbackMessage({ 
        type: 'complete', 
        text: `모든 퀴즈를 완료했습니다! (${quizSequence.length}/${quizSequence.length})` 
      });
    }
  }, [currentQuizIndex, quizSequence.length]);

  // 노트 선택 처리
  const handleNoteSelect = (stringIndex, fretNum) => {
    if (!currentQuiz) return;

    const noteName = getNote(stringIndex, fretNum);
    const noteNameWithOctave = getNoteWithOctave(stringIndex, fretNum);
    setSelectedNoteInfo({ string: stringIndex, fret: fretNum, name: noteName, nameWithOctave: noteNameWithOctave });
    
    playSound(noteNameWithOctave);

    if (stringIndex === currentQuiz.string && fretNum === currentQuiz.fret) {
      // 정답
      setFeedbackMessage({ type: 'correct', text: `정답입니다! ${noteName}` });
      setShowCorrectAnswerHighlight(false);
      setCorrectAnswerDetails(null);
      setTimeout(nextQuiz, 1200);
    } else {
      // 오답
      const quizStringNumber = currentQuiz.string + 1;
      setFeedbackMessage({
        type: 'incorrect',
        text: `정답: ${quizStringNumber}번줄 ${currentQuiz.fret}프렛` 
      });
      setShowCorrectAnswerHighlight(true);
      setCorrectAnswerDetails({ string: currentQuiz.string, fret: currentQuiz.fret });
    }
  };

  return (
    <div className="w-full h-[100dvh] max-h-[100dvh] flex flex-col bg-slate-900 overflow-hidden">
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
        
        <div className="text-white text-sm">
          {quizProgress.current} / {quizProgress.total}
        </div>
      </div>
      
      {/* 퀴즈 표시 영역 */}
      {currentQuiz && (
        <QuizDisplayMinimal 
          quiz={currentQuiz}
          feedbackMessage={feedbackMessage} 
        />
      )}
      
      {/* Fretboard 영역 */}
      <div className="w-full flex-grow flex justify-center items-center mt-8 px-1 pb-[env(safe-area-inset-bottom)]">
        <Fretboard 
          onNoteSelect={handleNoteSelect} 
          highlightCorrectAnswer={showCorrectAnswerHighlight ? correctAnswerDetails : null}
          selectedNote={selectedNoteInfo}
        />
      </div>
    </div>
  );
};

export default PracticeScreen;
