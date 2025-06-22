import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import Feeds from './Feeds';

const BlogPage = ({ userId, initialType = "Blog" }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState(initialType); // Manage type as internal state
  const [isToggled, setIsToggled] = useState(initialType === "news");

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true); // Set loading when fetching new data
      const url = `http://localhost:8000/api/v1/blogCache/recentBlogs?userId=${userId}&type=${type}`;

      try {
        const res = await fetch(url);

        if (!res.ok) {
          console.error("Backend returned error", res.status);
          setArticles([]);
          return;
        }

        const data = await res.json();

        const validArticles = Array.isArray(data?.articles)
          ? data.articles
          : Array.isArray(data)
          ? data
          : [];

        setArticles(validArticles);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setArticles([]);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchArticles();
  }, [userId, type]); // Include type in dependency array

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggle = (newType) => {
    setType(newType);
    setIsToggled(newType === "news");
  };

  const filteredArticles = articles.filter(article =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-transparent h-screen overflow-hidden flex flex-col">
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #0f766e, #134e4a);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #134e4a, #0f172a);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #0f766e rgba(0, 0, 0, 0.1);
        }
      `}</style>
      
      {/* Fixed Header: Search Bar and Toggle */}
      <div className="w-full px-6 md:px-12 lg:px-28 py-4 flex items-center gap-4 bg-transparent shadow-md z-10">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Blog Title or Tag"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-20 py-4 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-gray-700 bg-white shadow-sm text-lg"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-800 hover:bg-teal-900 text-white px-6 py-2 rounded-full font-medium text-sm transition-colors">
              Go
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="flex items-center bg-transparent rounded-full p-1 shadow-sm flex-shrink-0 border border-teal-700">
          <button
            onClick={() => handleToggle("Blog")}
            className={`px-4 py-2 rounded-full font-medium text-xs transition-all ${
              !isToggled ? 'bg-teal-700 text-white shadow-sm' : 'text-teal-800 hover:text-teal-900'
            }`}
          >
            Blog Read
          </button>
          <button
            onClick={() => handleToggle("news")}
            className={`px-4 py-2 rounded-full font-medium text-xs transition-all ${
              isToggled ? 'bg-teal-700 text-white shadow-sm' : 'text-teal-800 hover:text-teal-900'
            }`}
          >
            News Read
          </button>
        </div>
      </div>

      {/* Scrollable Feeds Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar mt-4 px-6 md:px-6 pb-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[30vh] text-center mt-10">
            <svg
              className="animate-spin h-8 w-8 text-teal-800 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <p className="text-lg font-semibold text-gray-600">Fetching your personalized feed...</p>
          </div>
        ) : (
          <Feeds articles={filteredArticles} />
        )}
      </div>
    </div>
  );
};    

export default BlogPage;
