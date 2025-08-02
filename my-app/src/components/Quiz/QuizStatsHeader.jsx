import React from "react";

const QuizStatsHeader = ({
  quizTitle,
  currentQuestion,
  totalQuestions,
  answeredCount,
  timeLeft,
  onExitQuiz
}) => {
  const progress =
    totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const formatTime = (seconds) => {
    if (seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{quizTitle}</h1>
        <button
          onClick={onExitQuiz}
          className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          Exit Quiz
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {currentQuestion + 1}
          </div>
          <div className="text-sm text-gray-500">Current</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-700">{answeredCount}</div>
          <div className="text-sm text-gray-500">Answered</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-800">
            {Math.max(totalQuestions - answeredCount, 0)}
          </div>
          <div className="text-sm text-gray-500">Remaining</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-900">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-500">Time Left</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-green-600 h-2 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizStatsHeader;
