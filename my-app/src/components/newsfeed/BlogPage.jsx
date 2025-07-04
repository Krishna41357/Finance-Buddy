import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

import Feeds from './Feeds';

const BlogPage = ({ userId, initialType = "Blog", setShowOverlay = () => {} }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState(initialType);
  const [isToggled, setIsToggled] = useState(initialType === "Blog");
  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);
  const overlayTimeoutRef = useRef(null);

  const fetchArticles = async (isLoadMore = false) => {
    if (!isLoadMore) {
      setLoading(true);
    } else {
      setIsFetchingMore(true);
      overlayTimeoutRef.current = setTimeout(() => {
        setShowOverlay(true);
      }, 1000);
    }

    try {
      const url = `http://localhost:8000/api/v1/blogCache/recentBlogs?userId=${userId}&type=${type}&page=${isLoadMore ? page : 1}`;

      const res = await fetch(url);
      if (!res.ok) {
        console.error("Backend error", res.status);
        return;
      }

      const data = await res.json();
      const validArticles = Array.isArray(data?.articles)
        ? data.articles
        : Array.isArray(data)
        ? data
        : [];

      if (isLoadMore) {
        setArticles(prev => [...prev, ...validArticles]);
      } else {
        setArticles(validArticles);
      }

      if (validArticles.length > 0 && isLoadMore) {
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      if (!isLoadMore) {
        setTimeout(() => setLoading(false), 500);
      } else {
        setTimeout(() => {
          setIsFetchingMore(false);
          setShowOverlay(false);
          clearTimeout(overlayTimeoutRef.current);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    setPage(1);
    fetchArticles();
  }, [userId, type]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleToggle = (newType) => {
    setType(newType);
    setIsToggled(newType === "news");
  };

  const filteredArticles = articles.filter(article =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !isFetchingMore && !loading) {
      fetchArticles(true);
    }
  };

  return (
    <div className="bg-white h-screen overflow-hidden flex flex-col rounded-xl border border-gray-100">
      {/* Enhanced Scrollbar Styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #059669, #047857);
          width: 8px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #10b981 transparent;
        }
        
        .search-glow:focus-within {
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1), 0 0 20px rgba(16, 185, 129, 0.15);
        }
        
        .toggle-shadow {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {/* Enhanced Header with Search and Toggle */}
      <div className="px-6 py-6 border-b border-gray-100 bg-white mb-6">
        <div className="flex items-center justify-between gap-6">
          
          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative search-glow transition-all duration-300">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Search articles, tags, or authors..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-12 pr-32 py-3.5 text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-0 outline-none transition-all duration-300 text-sm font-medium"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <button 
                  className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  onClick={() => console.log('Search clicked')}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Toggle Switch */}
          <div className="flex items-center">
            <div className="relative bg-gray-100 rounded-2xl p-1.5 toggle-shadow">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleToggle("Blog")}
                  className={`relative z-10 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform ${
                    !isToggled 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Blog Read
                </button>
                <button
                  onClick={() => handleToggle("news")}
                  className={`relative z-10 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform ${
                    isToggled 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  News Read
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Content Area with proper spacing */}
      <div className="flex-1 px-6 pb-6">
        {/* Additional gap between header and feeds */}
        <div className="mt-6">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar"
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-teal-400 rounded-full animate-spin animation-delay-150"></div>
                </div>
                <p className="mt-6 text-lg font-medium text-gray-600">Fetching your personalized feed...</p>
                <p className="text-sm text-gray-400 mt-1">Curating the best content for you</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Gap before feeds section */}
                <div className="pt-4">
                  <Feeds articles={filteredArticles} />
                </div>
                
                {/* Load More Indicator */}
                {isFetchingMore && (
                  <div className="flex justify-center py-8">
                    <div className="flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100">
                      <div className="w-5 h-5 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                      <span className="text-sm font-medium text-gray-600">Loading more articles...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;