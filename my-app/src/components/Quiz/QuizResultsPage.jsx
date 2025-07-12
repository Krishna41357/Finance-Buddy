// QuizResultsPage.jsx
import React from 'react';
import { BookOpen, ArrowLeft, CheckCircle, XCircle, BarChart3 } from 'lucide-react';

const QuizResultsPage = ({ 
  selectedQuiz, 
  selectedAnswers, 
  onRetakeQuiz, 
  onBackToBank 
}) => {
  const calculateScore = () => {
    let correct = 0;
    selectedQuiz.questions_data.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    return {
      correct,
      total: selectedQuiz.questions_data.length,
      percentage: Math.round((correct / selectedQuiz.questions_data.length) * 100)
    };
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return 'Excellent! You have a strong understanding of finance.';
    if (percentage >= 60) return 'Good job! You have a decent grasp of the concepts.';
    return 'Keep studying! There\'s room for improvement.';
  };

  const score = calculateScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
          <p className="text-gray-600">Here are your results for "{selectedQuiz.title}"</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${getScoreColor(score.percentage)} mb-2`}>
              {score.percentage}%
            </div>
            <div className="text-xl text-gray-600 mb-2">
              {score.correct} out of {score.total} questions correct
            </div>
            <p className="text-gray-600">{getScoreMessage(score.percentage)}</p>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{score.correct}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <XCircle className="w-8 h-8 text-green-700 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">{score.total - score.correct}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{score.percentage}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetakeQuiz}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <BookOpen size={16} />
              Retake Quiz
            </button>
            <button
              onClick={onBackToBank}
              className="px-6 py-3 bg-green-800 hover:bg-green-900 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Quiz Bank
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Question Review</h3>
          <div className="space-y-4">
            {selectedQuiz.questions_data.map((question, index) => {
              const userAnswer = selectedAnswers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-1">
                        {index + 1}. {question.question}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Correct Answer:</span> {question.options[question.correct]}
                      </p>
                      {userAnswer !== undefined && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Your Answer:</span> {question.options[userAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsPage;