import React, { useEffect, useRef, useState } from 'react';
import { Search, Newspaper, FileText } from 'lucide-react';
import Feeds from './Feeds';

const BlogPage = ({ userId, initialType = "Blog", setShowOverlay = () => {} }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState(initialType);
  const [isToggled, setIsToggled] = useState(initialType === "news");
  const [page, setPage] = useState(1);
  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

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
      const url = `${BASE_API}/api/v1/blogCache/recentBlogs?userId=${userId}&type=${type}&page=${isLoadMore ? page : 1}`;
      const res = await fetch(url);
      if (!res.ok) return console.error("Backend error", res.status);

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

      if (validArticles.length > 0 && isLoadMore) setPage(prev => prev + 1);
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setTimeout(() => {
        isLoadMore ? setIsFetchingMore(false) : setLoading(false);
        setShowOverlay(false);
        clearTimeout(overlayTimeoutRef.current);
      }, 1000);
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
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !isFetchingMore && !loading) {
      fetchArticles(true);
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 min-h-screen p-8 overflow-hidden relative">
      {/* Glow Backgrounds */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-green-400 rounded-full opacity-10 blur-2xl animate-pulse delay-1000"></div>

      {/* Header */}
      <div className="text-center mb-10 z-10 relative">
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="bg-white rounded-full p-3 shadow-xl">
            <Newspaper className="text-emerald-600" size={32} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-300 via-green-400 to-lime-300 text-transparent bg-clip-text drop-shadow-lg">
            Financial Content Feed
          </h1>
        </div>
        <p className="text-emerald-200 font-medium text-lg">
          Curated blogs and articles to elevate your financial literacy 📈
        </p>
      </div>

      {/* Search & Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-4xl mx-auto mb-10">
        <div className="relative w-full sm:w-2/3">
          <Search className="absolute top-3.5 left-4 text-green-300" size={20} />
          <input
            type="text"
            placeholder="Search your next article..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-green-200 backdrop-blur-md outline-none focus:ring-2 focus:ring-emerald-400 shadow-xl"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleToggle("Blog")}
            className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
              !isToggled ? 'bg-white text-emerald-800' : 'bg-emerald-600/20 text-white hover:bg-emerald-500/30'
            }`}
          >
            Blog Posts
          </button>
          <button
            onClick={() => handleToggle("news")}
            className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
              isToggled ? 'bg-white text-emerald-800' : 'bg-emerald-600/20 text-white hover:bg-emerald-500/30'
            }`}
          >
            News Articles
          </button>
        </div>
      </div>

      {/* Scrollable Feed */}
      <div className="relative z-10 rounded-3xl shadow-inner border border-emerald-100/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden max-w-6xl mx-auto">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-[70vh] overflow-y-auto scrollbar-hide custom-scrollbar space-y-6 px-2 pr-4"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-white">
              <div className="w-14 h-14 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-cente  py-16 text-white">
              <FileText size={48} className="mx-auto mb-4 text-green-200" />
              <h3 className="text-2xl font-bold mb-2">No articles found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          ) : (
            <Feeds articles={filteredArticles} />
          )}

          {/* Load more indicator */}
          {isFetchingMore && (
            <div className="flex justify-center py-6">
              <div className="w-5 h-5 border-2 border-green-300 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-white">Loading more...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
