import React from 'react';

const QuizDisplayMinimal = ({ quiz, feedbackMessage, progress }) => {
  if (!quiz) {
    return (
      <div className="fixed top-2 left-1/2 -translate-x-1/2 w-auto min-w-[180px] max-w-[80%] z-20">
        <div className="bg-slate-800 bg-opacity-75 backdrop-blur-sm shadow-lg rounded-md px-3 py-2 text-center text-xs font-medium text-slate-300 border border-slate-700">
          Loading quiz...
        </div>
      </div>
    );
  }

  // Determine background color based on feedback type for the main quiz question area
  let quizBgColor = 'bg-slate-800'; // Default
  if (feedbackMessage) {
    if (feedbackMessage.type === 'correct') {
      quizBgColor = 'bg-green-600';
    } else if (feedbackMessage.type === 'incorrect') {
      quizBgColor = 'bg-red-600';
    } else if (feedbackMessage.type === 'neutral') {
      quizBgColor = 'bg-sky-600';
    }
  }

  return (
    <>
      {/* Main Quiz Question with Progress */}
      <div className="fixed top-2 left-1/2 -translate-x-1/2 w-auto min-w-[200px] sm:min-w-[220px] max-w-[80%] z-20">
        <div className={`bg-opacity-80 backdrop-blur-sm shadow-xl rounded-md px-3 py-2 text-slate-50 border border-slate-700 transition-colors duration-300 ${quizBgColor}`}>
          <div className="flex flex-col items-center">
            {progress && (
              <div className="text-xs text-white/80 mb-1">
                {progress.current} / {progress.total}
              </div>
            )}
            <p className="text-sm sm:text-base text-center font-semibold font-mono truncate">
              {quiz.questionText}
            </p>
          </div>
        </div>
      </div>
      
      {/* Toast notification for incorrect answers */}
      {feedbackMessage && feedbackMessage.type === 'incorrect' && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 w-auto min-w-[200px] sm:min-w-[220px] max-w-[80%] z-30 animate-fade-in">
          <div className="bg-red-600 bg-opacity-90 backdrop-blur-sm shadow-xl rounded-md px-3 py-2 text-white border border-red-500">
            <p className="text-xs text-center font-medium truncate">
              {feedbackMessage.text}
            </p>
          </div>
        </div>
      )}

      {/* Toast notification for quiz completion */}
      {feedbackMessage && feedbackMessage.type === 'complete' && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 w-auto min-w-[200px] sm:min-w-[260px] max-w-[80%] z-30 animate-fade-in">
          <div className="bg-blue-600 bg-opacity-90 backdrop-blur-sm shadow-xl rounded-md px-4 py-3 text-white border border-blue-500">
            <p className="text-xs sm:text-sm text-center font-medium">
              {feedbackMessage.text}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizDisplayMinimal;

