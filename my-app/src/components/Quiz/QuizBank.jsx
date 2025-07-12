import React, { useRef, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const QuizBank = ({ quizData, onStartQuiz }) => {
  const containerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const scroll = (direction) => {
    const scrollAmount = 400;
    containerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const filteredData = quizData.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficulty ? quiz.difficulty.toLowerCase() === difficulty.toLowerCase() : true;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center border px-3 py-2 rounded-md bg-white shadow-sm w-full sm:w-2/3">
          <Search size={18} className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="text-sm p-2 border rounded-md shadow-sm bg-white"
        >
          <option value="">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Carousel Controls */}
      <div className="relative">
        <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full">
          <ChevronLeft size={20} />
        </button>
        <div
          ref={containerRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 py-4 px-2 scroll-smooth"
        >
          {filteredData.map((quiz) => (
            <div
              key={quiz._id}
              className="min-w-[300px] max-w-[320px] bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl p-6 transition duration-300 flex-shrink-0"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{quiz.thumbnail}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{quiz.title}</h3>
                  <p className="text-sm text-gray-500">{quiz.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">📝 {quiz.questions} Qs</div>
                <div className="flex items-center gap-1">⏱️ {quiz.timeLimit} min</div>
                <div className="flex items-center gap-1 col-span-2">📊 {quiz.difficulty}</div>
              </div>

              <button
                onClick={() => onStartQuiz(quiz)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex justify-center items-center gap-2"
              >
                <BookOpen size={16} />
                Attempt Quiz
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuizBank;
