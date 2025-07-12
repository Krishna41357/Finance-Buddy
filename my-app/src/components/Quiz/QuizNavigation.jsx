// QuizNavigation.jsx
import React from 'react';
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';

const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onFinish 
}) => {
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
          isFirstQuestion
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <ArrowLeft size={16} />
        Previous
      </button>
      
      {isLastQuestion ? (
        <button
          onClick={onFinish}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          <Trophy size={16} />
          Finish Quiz
        </button>
      ) : (
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Next
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

export default QuizNavigation;