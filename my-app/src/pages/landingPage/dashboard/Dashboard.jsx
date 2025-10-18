import React, { useState, useEffect, useContext } from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, Target, Calendar, Clock,
  BookOpen, Trophy, Award, Star, Users, ChevronRight, Play,
  Newspaper, FileText, Timer, Sparkles, Activity, Bell,
  PieChart, BarChart3, LineChart, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import { getUserStats } from '../../../services/quizApi';
import axios from 'axios';

const Dashboard = ({ onActionClick }) => {  // Fixed: destructure onActionClick properly
  const { user, isLoading } = useContext(AuthContext);
  const userId = user?._id || user?.userId;
  const quizTaken = user?.quizTakenCount || 0;

  // State management
  const [quizStats, setQuizStats] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [totalGoals, setTotalGoals] = useState(0);
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 41000,
    todayChange: 1240,
    todayChangePercent: 3.12,
    activeInvestments: 'Active'
  });
  const [loadingStates, setLoadingStates] = useState({
    stats: false,
    articles: false,
    goals: false
  });

  const quickActions = [
    { id: 1, title: 'Take Quiz', subtitle: 'Test your knowledge', color: 'bg-green-500', icon: Play , targetPage: 'Quiz' },
    { id: 2, title: 'Set Goals', subtitle: 'Plan your future', color: 'bg-blue-500', icon: Target  , targetPage : "Portfolio" },
    { id: 3, title: 'Start Trading', subtitle: 'Invest wisely', color: 'bg-purple-500', icon: TrendingUp, targetPage: "Paper Trading" },
    { id: 4, title: 'Read Articles', subtitle: 'Stay informed', color: 'bg-yellow-500', icon: BookOpen, targetPage: "Content Feed" }
  ];

  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'
  // API Functions
  const fetchUserStats = async () => {
    if (!userId) return;
    
    setLoadingStates(prev => ({ ...prev, stats: true }));
    try {
      const stats = await getUserStats(userId);
      setQuizStats(stats);
    } catch (error) {
      console.error('Error fetching quiz stats:', error);
      // Set fallback data
      setQuizStats({
        quizzesTakenCount: quizTaken,
        averageScore: 85,
        totalPoints: 0,
        streak: 0
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, stats: false }));
    }
  };

  const fetchProfile = async () => {
    if (!userId) return;
    
    try {
      const response = await axios.get(`${BASE_API}/api/v1/user/portfolio/${userId}`);
      const fetchedProfile = response.data?.profile;
      const goalsCount = fetchedProfile?.financialgoalsCount || 0;
      setTotalGoals(goalsCount);
      
      // If portfolio data is available, update it
      if (fetchedProfile?.portfolioValue) {
        setPortfolioData(prev => ({
          ...prev,
          totalValue: fetchedProfile.portfolioValue,
          todayChange: fetchedProfile.todayChange || prev.todayChange,
          todayChangePercent: fetchedProfile.todayChangePercent || prev.todayChangePercent
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setTotalGoals(0);
    }
  };

  const fetchRecentArticles = async () => {
    if (!userId) return;

    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort() , 2000); //timeout 2s
    
    setLoadingStates(prev => ({ ...prev, articles: true }));
    try {
      const res = await fetch(`${BASE_API}/api/v1}/blogCache/recentBlogs?userId=${userId}&type=News`, {signal : controller.signal});
      if (res.ok) {
        const data = await res.json();
        const articles = Array.isArray(data?.articles) ? data.articles : Array.isArray(data) ? data : [];
        setRecentArticles(articles.slice(0, 3));
      } else {
        throw new Error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Articles fetch error:', error);
      // Set mock data as fallback
      setRecentArticles([
        {
          _id: '1',
          title: 'Home Loan Interest Rates: Banks vs NBFCs Comparison',
          content: 'A detailed comparison of home loan interest rates offered by banks and NBFCs, with insights on which option might be better for different financial situations.',
          author: 'SavingsYogi',
          publishedAt: '2 hours ago',
          type: 'Blog'
        },
        {
          _id: '2',
          title: 'New Tax Regime vs Old: Complete Comparison for FY 2024-25',
          content: 'With updated tax slabs and deductions, understanding the differences between old and new tax regimes is crucial for effective tax planning.',
          author: 'MoneyTips',
          publishedAt: '5 hours ago',
          type: 'Blog'
        },
        {
          _id: '3',
          title: 'Nifty 50 Hits Record High Amid Strong Q3 Earnings',
          content: 'The Nifty 50 index touched a new record high as companies reported better-than-expected Q3 earnings, with sectors like banking and IT leading gains.',
          author: 'MarketWatch',
          publishedAt: '1 day ago',
          type: 'news'
        }
      ]);
    } finally {
      setLoadingStates(prev => ({ ...prev, articles: false }));
    }
  };

  const generateRecentActivity = () => {
    setRecentActivity([
      {
        id: 1,
        type: 'quiz',
        title: 'Daily Quiz Completed',
        description: 'Scored 85% on Investment Basics',
        time: '2 hours ago',
        icon: Trophy,
        color: 'text-green-500'
      },
      {
        id: 2,
        type: 'purchase',
        title: 'Stock Purchase',
        description: 'Bought 10 shares of RELIANCE',
        time: '1 day ago',
        icon: TrendingUp,
        color: 'text-blue-500'
      },
      {
        id: 3,
        type: 'article',
        title: 'New Article Read',
        description: 'Understanding Mutual Fund NAV',
        time: '2 days ago',
        icon: BookOpen,
        color: 'text-purple-500'
      }
    ]);
  };

  // Effects
  useEffect(() => {
    if (!isLoading && userId) {
      fetchUserStats();
      fetchProfile();
      fetchRecentArticles();
      generateRecentActivity();
    }
  }, [user, isLoading, userId]);

  // Utility functions
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Handle action click
  const handleActionClick = (targetPage) => {
    if (onActionClick && typeof onActionClick === 'function') {
      onActionClick(targetPage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-emerald-200 text-xl">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 p-6 relative overflow-hidden">
      {/* Glowing Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 opacity-10 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 opacity-10 blur-[150px] rounded-full pointer-events-none animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-300 opacity-5 blur-[120px] rounded-full pointer-events-none animate-pulse delay-500"></div>

      {/* Header */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center justify-between">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {getGreeting()}, {user?.username || 'User'}!
                </h1>
                <p className="text-emerald-200 text-sm">Ready to build your financial future?</p>
              </div>
            </div>
          </div>
          <div className="text-right m-4">
            <div className="text-4xl font-bold text-white">₹{portfolioData.totalValue.toLocaleString()}</div>
            <div className="text-emerald-200 text-sm">Virtual Portfolio</div>
          </div>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Portfolio Value */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg">
                <DollarSign className="text-white" size={20} />
              </div>
              <span className="text-emerald-200 text-sm font-medium">Portfolio Value</span>
            </div>
            <div className="text-2xl font-bold text-white">₹{portfolioData.totalValue.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-green-400">
                <ArrowUpRight size={16} />
                <span className="text-sm">+₹{portfolioData.todayChange}</span>
              </div>
              <span className="text-emerald-200 text-sm">({portfolioData.todayChangePercent}%)</span>
            </div>
          </div>
        </div>

        {/* Quiz Taken */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg">
                <Timer className="text-white" size={20} />
              </div>
              <span className="text-emerald-200 text-sm font-medium">Quizzes Taken</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {loadingStates.stats ? '...' : (quizStats?.quizzesTakenCount || quizTaken)}
            </div>
            <div className="text-emerald-200 text-sm mt-2">Keep learning!</div>
          </div>
        </div>

        {/* Total Goals */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg">
                <Target className="text-white" size={20} />
              </div>
              <span className="text-emerald-200 text-sm font-medium">Financial Goals</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalGoals}</div>
            <div className="text-emerald-200 text-sm mt-2">Active targets</div>
          </div>
        </div>

        {/* Investment Status */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg">
                <Activity className="text-white" size={20} />
              </div>
              <span className="text-emerald-200 text-sm font-medium">Investment Status</span>
            </div>
            <div className="text-2xl font-bold text-white">{portfolioData.activeInvestments}</div>
            <div className="text-emerald-200 text-sm mt-2">Portfolio status</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="text-emerald-400" size={24} />
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${
                      activity.color === 'text-green-500' ? 'from-green-400 to-green-500' : 
                      activity.color === 'text-blue-500' ? 'from-blue-400 to-blue-500' : 
                      'from-purple-400 to-purple-500'
                    }`}>
                      <activity.icon className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{activity.title}</h3>
                      <p className="text-emerald-200 text-sm">{activity.description}</p>
                    </div>
                    <span className="text-emerald-300 text-sm">{activity.time}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Activity className="text-emerald-400 mx-auto mb-3" size={48} />
                  <p className="text-emerald-200">No recent activity to show</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Quick Actions */}
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="w-full mb-4 flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/20 hover:from-white/10 hover:to-white/15 transition-all group"
              onClick={() => handleActionClick(action.targetPage)}
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <action.icon className="text-white" size={20} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white">{action.title}</h3>
                <p className="text-emerald-200 text-sm">{action.subtitle}</p>
              </div>
              <ChevronRight className="text-emerald-400 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          ))}

          {/* Quiz Stats */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="text-emerald-400" size={24} />
              <h2 className="text-xl font-bold text-white">Quiz Progress</h2>
            </div>
            {loadingStates.stats ? (
              <div className="text-center py-4">
                <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-emerald-200 text-sm">Loading stats...</p>
              </div>
            ) : quizStats ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-gradient-to-br from-green-400/10 to-green-500/5 border border-green-400/20">
                  <Award className="text-green-400 mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-white">{quizStats.quizzesTakenCount || 0}</div>
                  <div className="text-green-200 text-sm">Completed</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-400/10 to-blue-500/5 border border-blue-400/20">
                  <Star className="text-blue-400 mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-white">{quizStats.averageScore || 0}%</div>
                  <div className="text-blue-200 text-sm">Average Score</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <Trophy className="text-emerald-400 mx-auto mb-3" size={48} />
                <p className="text-emerald-200">Start taking quizzes to see your progress!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Latest Financial Insights */}
      <div className="mt-8">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Newspaper className="text-emerald-400" size={24} />
              <h2 className="text-xl font-bold text-white">Latest Financial Insights</h2>
            </div>
            <button 
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-2"
              onClick={() => handleActionClick("Content Feed")}
            >
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          {loadingStates.articles ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-emerald-200">Loading articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <div 
                  key={article._id} 
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
                  onClick={() => handleActionClick("Content Feed")}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1 bg-gradient-to-br from-emerald-400 to-green-500 rounded">
                      <FileText className="text-white" size={14} />
                    </div>
                    <span className="text-emerald-300 text-xs font-medium uppercase">{article.type}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-emerald-200 text-sm mb-3 line-clamp-3">
                    {article.content}
                  </p>
                  <div className="flex items-center justify-between text-xs text-emerald-300">
                    <span>{article.author}</span>
                    <span>{article.publishedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;