import React from 'react';
import { CheckCircle, XCircle, ArrowLeft, BookOpen } from 'lucide-react';

const QuizResultsPage = ({
  selectedQuiz,
  result,              // { selectedAnswers, correct, total, percentage }
  onRetakeQuiz,
  onBackToBank,
}) => {
  const { selectedAnswers, correct, total, percentage } = result;
  const questions = selectedQuiz.questions_data;

  const getGradeColor = pct =>
    pct >= 80 ? 'text-green-600' : pct >= 60 ? 'text-yellow-600' : 'text-red-600';

  const getMessage = pct =>
    pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good job!' : 'Keep studying!';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
          <p className="text-gray-600">Results for "{selectedQuiz.title}"</p>
        </div>

        {/* score card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${getGradeColor(percentage)} mb-2`}>
              {percentage}%
            </div>
            <div className="text-xl text-gray-600 mb-2">
              {correct} / {total} correct
            </div>
            <p className="text-gray-600">{getMessage(percentage)}</p>
          </div>

          {/* buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetakeQuiz}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              <BookOpen size={16} /> Retake Quiz
            </button>
            <button
              onClick={onBackToBank}
              className="flex items-center gap-2 px-6 py-3 bg-green-800 hover:bg-green-900 text-white rounded-lg"
            >
              <ArrowLeft size={16} /> Back to Quiz Bank
            </button>
          </div>
        </div>

        {/* detailed review */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Question Review</h3>
          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[q._id];
              const correctIdx = q.correct;
              const isRight = userAns === correctIdx;

              return (
                <div
                  key={q._id}
                  className={`border-l-4 ${isRight ? 'border-green-500' : 'border-red-500'} pl-4`}
                >
                  <div className="flex items-start gap-3">
                    {isRight ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800 mb-1">
                        {idx + 1}. {q.question}
                      </p>
                      <p className="text-sm text-gray-600">
                        Correct: {q.options[correctIdx]}
                      </p>
                      {!isRight && (
                        <p className="text-sm text-gray-600">
                          Your answer: {q.options[userAns]}
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