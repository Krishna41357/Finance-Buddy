// QuizQuestionCard.jsx
import React from 'react';

const QuizQuestionCard = ({ 
  question, 
  currentIndex, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="mb-4">
        <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(question.id, index)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              selectedAnswer === index
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedAnswer === index
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === index && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestionCard;