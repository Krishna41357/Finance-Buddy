import React, { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getAllQuizzes, getUserStats, markQuizTaken } from '../../services/quizApi';
import QuizAttemptPage  from '../../components/Quiz/QuizAttemptPage';
import QuizResultsPage  from '../../components/Quiz/QuizResultsPage';

import {
  ChevronLeft, ChevronRight, Search, Sparkles, Trophy,
  Timer, Target, Award, TrendingUp, Users, Star
} from 'lucide-react';

const QuizMainPage = () => {
  const { user, isLoading } = useContext(AuthContext);
  const scrollRef = useRef(null);

  const [quizList, setQuizList]   = useState([]);
  const [stats, setStats]         = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const userId = user?._id || user?.userId;

  /* ---------- fetchers ---------- */
  const loadQuizzes = () => getAllQuizzes().then(setQuizList).catch(console.error);
  const loadStats   = () => userId && getUserStats(userId).then(setStats).catch(console.error);

 
  useEffect(() => { loadQuizzes(); }, []);
  useEffect(() => { if (!isLoading && userId) loadStats(); }, [user, isLoading, userId]);

  /* ---------- quiz flow ---------- */
  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setQuizCompleted(false);
  };
const handleFinishQuiz = async (result) => {
  if (userId && selectedQuiz?._id) {
    await markQuizTaken(userId, selectedQuiz._id);
    await loadStats();
  }
  setSelectedQuiz(prev => ({ ...prev, ...result, showResults: true }));
  setQuizCompleted(true);
};

  /* ---------- helpers ---------- */
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) { 
      case 'beginner':     return 'text-green-500 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced':     return 'text-red-500 bg-red-100';
      default:             return 'text-gray-500 bg-gray-100';
    }
  };

  /* ---------- filtering ---------- */
  const filtered = quizList.filter(
    q =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!difficulty || q.difficulty.toLowerCase() === difficulty.toLowerCase())
  );

  const attemptedSet = React.useMemo(
    () => new Set(stats?.quizzesTaken?.map(q => String(q._id))),
    [stats]
  );

  /* ---------- render states ---------- */
  if (quizCompleted && selectedQuiz) {
    return (
      <QuizResultsPage
  selectedQuiz={selectedQuiz}
  result={{
    selectedAnswers: selectedQuiz.selectedAnswers,
    correct: selectedQuiz.correct,
    total: selectedQuiz.total,
    percentage: selectedQuiz.percentage,
  }}
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
        quiz={selectedQuiz}
        onFinish={handleFinishQuiz}
        onExit={() => {
          setSelectedQuiz(null);
          setQuizCompleted(false);
        }}
      />
    );
  }

  /* ---------- main ui ---------- */
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#022c22] via-[#042f28] to-[#011a13] px-6 py-10">
      {/* decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 opacity-10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 opacity-10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* title */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-4 text-4xl font-extrabold bg-gradient-to-r from-green-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
          <Sparkles className="animate-spin" /> Quiz Center <Trophy className="animate-bounce" />
        </div>
        <p className="text-green-200 text-lg mt-2">Test your finance skills & earn rewards!</p>
      </div>

      {/* filters */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-3.5 right-4 text-green-300" size={20} />
          <input
            type="text"
            placeholder="Search your next challenge..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/10 border border-green-300 text-white placeholder-green-200 shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          className="px-5 py-3 rounded-xl bg-white/10 border border-green-300 text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">All Levels</option>
          <option value="Beginner">🌱 Beginner</option>
          <option value="Intermediate">⚡ Intermediate</option>
          <option value="Advanced">🔥 Advanced</option>
        </select>
      </div>

      {/* carousel */}
      <div className="relative ml-2 mr-2">
        <button
          className="absolute z-20 left-[-1.5rem] top-[40%] bg-emerald-500 text-white p-2 rounded-full shadow-xl hover:scale-110"
          onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
        >
          <ChevronLeft size={24} />
        </button>

        <div ref={scrollRef} className="flex gap-6 rounded-2xl overflow-x-auto w-[95%] ml-6 pb-2 pt-2 scrollbar-hide">
          {filtered.map(q => (
            <div
              key={q._id}
              onClick={() => startQuiz(q)}
              className="min-w-[320px] max-w-[340px] p-6 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 border border-green-200 shadow-2xl hover:scale-105 transform transition duration-300 cursor-pointer"
            >
              {attemptedSet.has(String(q._id)) && (
                <span className="text-xs bg-yellow-400 text-white rounded-full px-2 py-1 mb-2 inline-block">Attempted</span>
              )}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{q.title}</h3>
                <span className="text-3xl">{q.thumbnail}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{q.description}</p>
              <div className="flex justify-between text-sm text-gray-700 mb-3">
                <div className="flex gap-2 items-center"><Target size={16} /> {q.questions} Questions</div>
                <div className="flex gap-2 items-center"><Timer size={16} /> {q.timeLimit} mins</div>
              </div>
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(q.difficulty)}`}>
                {q.difficulty}
              </span>
              <button className="w-full mt-4 bg-emerald-500 text-white font-semibold py-2 px-4 rounded-full shadow hover:bg-emerald-400 transition">
                Start Challenge
              </button>
            </div>
          ))}
        </div>

        <button
          className="absolute z-20 right-[-1.5rem] top-[40%] bg-emerald-500 text-white p-2 rounded-full shadow-xl hover:scale-110"
          onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* stats */}
      <div className="relative group mt-10 max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="relative transform hover:scale-102 transition-transform duration-300">
          <div className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-sm border border-green-200/40 rounded-3xl shadow-lg p-6">
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
              <StatCard Icon={Award} label="Completed" value={stats?.quizzesTakenCount ?? 0} unit="Quizzes" color="green" />
              <StatCard Icon={TrendingUp} label="Accuracy" value="--%" unit="Not available" color="blue" />
              <StatCard Icon={Users} label="Rank" value="--" unit="Not available" color="purple" />
              <StatCard Icon={Star} label="Streak" value="--" unit="Not available" color="amber" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ Icon, label, value, unit, color }) => (
  <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 p-3 rounded-xl border border-${color}-200/30 shadow-sm`}>
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`text-${color}-600`} size={16} />
      <span className="text-xs font-semibold text-gray-700">{label}</span>
    </div>
    <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
    <div className="text-xs text-gray-500">{unit}</div>
  </div>
);

export default QuizMainPage;