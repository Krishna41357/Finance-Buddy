import React, { useRef, useState, useEffect, useContext } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const QuizBank = ({ quizData, onStartQuiz }) => {
  const containerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [attemptedQuizIds, setAttemptedQuizIds] = useState([]);
  const { user } = useContext(AuthContext);

  const userId = user?._id || user?.id;

  /* fetch attempted ids */
  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${BASE_API}/api/v1/user/quiz/${userId}/stats`)
      .then(res => setAttemptedQuizIds(res.data.quizzesTaken.map(q => String(q._id))))
      .catch(console.error);
  }, [userId]);

  /* scroll helpers */
  const scroll = dir =>
    containerRef.current?.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' });

  /* filter */
  const filtered = quizData.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDiff = difficulty ? q.difficulty.toLowerCase() === difficulty.toLowerCase() : true;
    return matchSearch && matchDiff;
  });

  return (
    <div className="space-y-6">
      {/* search / filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-2/3">
          <Search size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm bg-white text-sm"
          />
        </div>
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 border rounded-lg shadow-sm bg-white text-sm"
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* carousel */}
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full"
        >
          <ChevronLeft size={20} />
        </button>

        <div ref={containerRef} className="flex overflow-x-auto space-x-4 py-4 px-2">
          {filtered.map(q => (
            <div
              key={q._id}
              className="w-full max-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl p-5 flex flex-col"
            >
              {/* top content */}
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl shrink-0">{q.thumbnail}</span>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 leading-tight">{q.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{q.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                <span>📝 {q.questions} Qs</span>
                <span>⏱️ {q.timeLimit} min</span>
                <span className="col-span-2">📊 {q.difficulty}</span>
              </div>

              {attemptedQuizIds.includes(q._id) && (
                <span className="text-xs bg-yellow-400 text-white rounded-full px-2 py-1 mb-4 self-start">
                  Attempted
                </span>
              )}

              {/* button pinned to bottom */}
             <button
      onClick={() => onStartQuiz(q)}
      className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex justify-center items-center gap-2"
    >
                <BookOpen size={16} /> Start Challenge
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuizBank;