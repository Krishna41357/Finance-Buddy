import React, { useEffect, useState } from 'react';
import QuizStatsHeader  from './QuizStatsHeader';
import QuizQuestionCard from './QuizQuestionCard';
import QuizNavigation   from './QuizNavigation';

const QuizAttemptPage = ({ quiz, onFinish, onExit }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});   // { questionId: chosenIndex }
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60);

  /* ---------- timer ---------- */
  useEffect(() => {
    if (timeLeft <= 0) { finish(); return; }
    const t = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const qArray = quiz.questions_data;

  /* ---------- finish ---------- */
  const finish = () => {
    const correct = qArray.filter((q) => answers[q._id] === q.correct).length;
    const percentage = Math.round((correct / qArray.length) * 100);

    onFinish({
      selectedAnswers: answers,
      correct,
      total: qArray.length,
      percentage,
    });
  };

  /* ---------- render ---------- */
  const curQ = qArray[current];
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-4xl text-black mx-auto">
        <QuizStatsHeader
          quizTitle={quiz.title}
          currentQuestion={current}
          totalQuestions={qArray.length}
          answeredCount={Object.keys(answers).length}
          timeLeft={timeLeft}
          onExitQuiz={onExit}
        />

        <QuizQuestionCard
          question={curQ}
          currentIndex={current}
          totalQuestions={qArray.length}
          selectedAnswer={answers[curQ._id]}
          onAnswerSelect={(_, idx) =>
            setAnswers(a => ({ ...a, [curQ._id]: idx }))
          }
        />

        <QuizNavigation
          currentQuestion={current}
          totalQuestions={qArray.length}
          onPrevious={() => setCurrent(c => c - 1)}
          onNext={() => setCurrent(c => c + 1)}
          onFinish={finish}
        />
      </div>
    </div>
  );
};

export default QuizAttemptPage;