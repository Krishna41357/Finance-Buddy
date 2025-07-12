import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  ChevronLeft, ChevronRight, Search, BookOpen, Sparkles,
  Trophy, Timer, Target, Award, TrendingUp, Users, Star
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import QuizAttemptPage from '../../components/Quiz/QuizAttemptPage';
import QuizResultsPage from '../../components/Quiz/QuizResultsPage';
import AIQuizGeneratorCard from '../../components/Quiz/AIQuizGeneratorCard';

const QuizMain = () => {
  const scrollRef = useRef(null);
  const { user, isLoading } = useContext(AuthContext);

  const [quizData, setQuizData] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('');

  // Fetch all quizzes
  useEffect(() => {
    const getAllQuizzes = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/user/quiz/quizData");
        const data = await res.json();
        setQuizData(data);
      } catch (err) {
        console.error("Quiz fetch error:", err);
      }
    };
    getAllQuizzes();
  }, []);

  // Fetch user quiz stats
    useEffect(() => {
  console.log("🧠 From QuizMain - isLoading:", isLoading);
  console.log("👤 From QuizMain - user:", user);
  console.log("🆔 From QuizMain - userId:", user?._id);
}, [user, isLoading]);

useEffect(() => {
  const fetchStats = async () => {
    console.log("🧠 From QuizMain - isLoading:", isLoading);
    console.log("👤 From QuizMain - user:", user);

    const userId = user?._id || user?.userId;
    console.log("🆔 From QuizMain - userId:", userId);

    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:8000/api/v1/user/quiz/${userId}/stats`);
      const data = await res.json();
      setStats(data);
      console.log("📊 From QuizMain - Stats:", data);
    } catch (err) {
      console.error("❌ Stats fetch error:", err);
    }
  };

  if (!isLoading) fetchStats();
}, [user, isLoading]);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setTimeLeft(quiz.timeLimit * 60);
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'text-green-500 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const filteredQuizzes = quizData.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!difficulty || quiz.difficulty.toLowerCase() === difficulty.toLowerCase())
  );

  const scroll = (dir) => {
    scrollRef.current.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' });
  };

  if (quizCompleted) {
    return (
      <QuizResultsPage
        selectedQuiz={selectedQuiz}
        selectedAnswers={selectedAnswers}
        onRetakeQuiz={() => startQuiz(selectedQuiz)}
        onBackToBank={() => {
          setSelectedQuiz(null);
          setQuizCompleted(false);
        }}
      />
    );
  }

  if (selectedQuiz) {
    return (
      <QuizAttemptPage
        selectedQuiz={selectedQuiz}
        currentQuestionIndex={currentQuestionIndex}
        selectedAnswers={selectedAnswers}
        timeLeft={timeLeft}
        onAnswerSelect={(qid, ans) => setSelectedAnswers(prev => ({ ...prev, [qid]: ans }))}
        onNextQuestion={() => setCurrentQuestionIndex(i => i + 1)}
        onPrevQuestion={() => setCurrentQuestionIndex(i => i - 1)}
        onFinishQuiz={() => setQuizCompleted(true)}
        onExitQuiz={() => {
          setSelectedQuiz(null);
          setQuizCompleted(false);
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#022c22] via-[#042f28] to-[#011a13] px-6 py-10">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 opacity-10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 opacity-10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Title */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-4 text-4xl font-extrabold bg-gradient-to-r from-green-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
          <Sparkles className="animate-spin" />
          Quiz Center
          <Trophy className="animate-bounce" />
        </div>
        <p className="text-green-200 text-lg mt-2">Test your finance skills & earn rewards!</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search your next challenge..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/10 border border-green-300 text-white placeholder-green-200 shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <Search className="absolute top-3 right-4 text-green-300" size={20} />
        </div>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-5 py-3 rounded-xl bg-white/10 border border-green-300 text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">All Levels</option>
          <option value="Beginner">🌱 Beginner</option>
          <option value="Intermediate">⚡ Intermediate</option>
          <option value="Advanced">🔥 Advanced</option>
        </select>
      </div>

      {/* Quiz Cards Carousel */}
      <div className="relative ml-2 mr-2 ">
        <button
          className="absolute z-20 left-[-1.5rem] top-[40%] bg-emerald-500 text-white p-2 rounded-full shadow-xl hover:scale-110"
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={24} />
        </button>

        <div ref={scrollRef} className="flex gap-6 rounded-2xl overflow-x-auto w-[95%] ml-6 pb-2 pt-2 scrollbar-hide">
          {filteredQuizzes.length === 0 ? (
            <p className="text-white">No quizzes match your search.</p>
          ) : (
            filteredQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="min-w-[320px] max-w-[340px] p-6 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 border border-green-200 shadow-2xl hover:scale-105 transform transition duration-300 cursor-pointer"
                onClick={() => startQuiz(quiz)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{quiz.title}</h3>
                  <div className="text-3xl">{quiz.thumbnail}</div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
                <div className="flex justify-between text-sm text-gray-700 mb-3">
                  <div className="flex gap-2 items-center"><Target size={16} /> {quiz.questions} Questions</div>
                  <div className="flex gap-2 items-center"><Timer size={16} /> {quiz.timeLimit} mins</div>
                </div>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
                <button className="w-full mt-4 bg-emerald-500 text-white font-semibold py-2 px-4 rounded-full shadow hover:bg-emerald-400 transition">
                  Start Challenge
                </button>
              </div>
            ))
          )}
        </div>

        <button
          className="absolute z-20 right-[-1.5rem] top-[40%] bg-emerald-500 text-white p-2 rounded-full shadow-xl hover:scale-110"
          onClick={() => scroll('right')}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Stats Card */}
      {!stats ? (
        <div className="text-white text-center mt-10">Loading stats...</div>
      ) : (
        <div className="relative group mt-10 max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative transform hover:scale-102 transition-transform duration-300">
            <div className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-sm border border-green-200/40 rounded-3xl shadow-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-400/5 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-sm">
                    <Trophy className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Your Progress</h3>
                    <p className="text-sm text-gray-600">Keep pushing your limits!</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200/30 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="text-green-600" size={16} />
                      <span className="text-xs font-semibold text-gray-700">Completed</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{stats.quizzesTakenCount}</div>
                    <div className="text-xs text-gray-500">Quizzes</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200/30 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="text-blue-600" size={16} />
                      <span className="text-xs font-semibold text-gray-700">Accuracy</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">--%</div>
                    <div className="text-xs text-gray-500">Not available</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200/30 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="text-purple-600" size={16} />
                      <span className="text-xs font-semibold text-gray-700">Rank</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">--</div>
                    <div className="text-xs text-gray-500">Not available</div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-xl border border-amber-200/30 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="text-amber-600" size={16} />
                      <span className="text-xs font-semibold text-gray-700">Streak</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-600">--</div>
                    <div className="text-xs text-gray-500">Not available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizMain;
