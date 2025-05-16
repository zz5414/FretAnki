import React from 'react';

const QuizDisplayMinimal = ({ quiz, feedbackMessage }) => {
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
    <div className="fixed top-2 left-1/2 -translate-x-1/2 w-auto min-w-[200px] sm:min-w-[220px] max-w-[80%] z-20">
      <div className={`bg-opacity-80 backdrop-blur-sm shadow-xl rounded-md px-3 py-2 text-slate-50 border border-slate-700 transition-colors duration-300 ${quizBgColor}`}>
        {/* Quiz Question - Always visible if quiz exists */} 
        <p className="text-sm sm:text-base text-center font-semibold font-mono truncate">
          {quiz.questionText}
        </p>
        
        {/* Feedback Message - Only shown if feedback exists and it's an incorrect answer, or for a very short time for correct/neutral */}
        {feedbackMessage && feedbackMessage.type === 'incorrect' && (
          <p className="text-xs text-center font-medium mt-1 text-white truncate">
            {feedbackMessage.text} 
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizDisplayMinimal;

