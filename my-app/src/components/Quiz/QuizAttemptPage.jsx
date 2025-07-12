// QuizAttemptPage.jsx
import React from 'react';
import QuizStatsHeader from './QuizStatsHeader';
import QuizQuestionCard from './QuizQuestionCard';
import QuizNavigation from './QuizNavigation';

const QuizAttemptPage = ({ 
  selectedQuiz, 
  currentQuestionIndex, 
  selectedAnswers, 
  timeLeft, 
  onAnswerSelect, 
  onNextQuestion, 
  onPrevQuestion, 
  onFinishQuiz, 
  onExitQuiz 
}) => {
  const currentQuestion = selectedQuiz.questions_data[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-4xl text-black mx-auto">
        <QuizStatsHeader 
          quizTitle={selectedQuiz.title}
          currentQuestion={currentQuestionIndex}
          totalQuestions={selectedQuiz.questions_data.length}
          answeredCount={answeredCount}
          timeLeft={timeLeft}
          onExitQuiz={onExitQuiz}
        />

        <QuizQuestionCard 
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={selectedQuiz.questions_data.length}
          selectedAnswer={selectedAnswers[currentQuestion.id]}
          onAnswerSelect={onAnswerSelect}
        />

        <QuizNavigation 
          currentQuestion={currentQuestionIndex}
          totalQuestions={selectedQuiz.questions_data.length}
          onPrevious={onPrevQuestion}
          onNext={onNextQuestion}
          onFinish={onFinishQuiz}
        />
      </div>
    </div>
  );
};

export default QuizAttemptPage;