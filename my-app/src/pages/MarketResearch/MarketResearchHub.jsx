import React, { useState, useEffect } from 'react';
import { 
  Search, TrendingUp, TrendingDown, AlertCircle, Info, CheckCircle, 
  AlertTriangle, BarChart3, LineChart, PieChart, Activity, 
  Star, BookOpen, Newspaper, Target, ArrowRight, Filter,
  Calendar, Globe, TrendingUp as TrendingUpIcon
} from 'lucide-react';

// Mock Data (since we can't import from separate files)
const categories = [
  {
    id: 'stocks',
    title: 'Stocks & Equity',
    subtitle: 'Indian stock market analysis',
    icon: '📈',
    color: 'from-emerald-400 to-green-500'
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    subtitle: 'Property & real estate insights',
    icon: '🏠',
    color: 'from-blue-400 to-blue-500'
  },
  {
    id: 'commodities',
    title: 'Gold & Precious Metals',
    subtitle: 'Gold, silver market trends',
    icon: '🥇',
    color: 'from-yellow-400 to-yellow-500'
  },
  {
    id: 'mutualfunds',
    title: 'Mutual Funds',
    subtitle: 'SIP & mutual fund analysis',
    icon: '📊',
    color: 'from-purple-400 to-purple-500'
  },
  {
    id: 'crypto',
    title: 'Cryptocurrency',
    subtitle: 'Digital asset insights',
    icon: '₿',
    color: 'from-orange-400 to-orange-500'
  },
  {
    id: 'bonds',
    title: 'Bonds & FDs',
    subtitle: 'Fixed income securities',
    icon: '🏦',
    color: 'from-indigo-400 to-indigo-500'
  }
];

const quickSearchOptions = [
  { symbol: 'BTC', name: 'Bitcoin', type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', type: 'crypto' },
  { symbol: 'BNB', name: 'Binance Coin', type: 'crypto' },
  { symbol: 'RELIANCE', name: 'Reliance Industries', type: 'stock' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', type: 'stock' },
  { symbol: 'HDFC', name: 'HDFC Bank', type: 'stock' }
];

const featuredAssets = {
  BTC: {
    id: 'BTC',
    name: 'Bitcoin (BTC)',
    currentPrice: 42850000,
    priceChange: -1875000,
    priceChangePercent: -4.19,
    marketCap: 8.4,
    volume24h: 892.5,
    description: 'Bitcoin is a decentralized digital currency that operates on a peer-to-peer network, enabling direct transactions without the need for intermediaries.',
    riskLevel: 'High Risk - Small Allocation',
    volatility: '24H Volume: 50 Billion USD',
    technicalOverview: 'Bitcoin utilizes blockchain technology to ensure transparency and security, with a fixed supply cap of 21 million coins.',
    benefits: [
      'Decentralized and transparent',
      'Potential for high returns',
      'Increasing institutional adoption'
    ],
    risks: [
      'High volatility',
      'Regulatory uncertainties',
      'Security risks'
    ],
    warnings: [
      'Invest only what you can afford to lose',
      'Stay updated on regulatory changes',
      'Use secure platforms and wallets'
    ]
  },
  ETH: {
    id: 'ETH',
    name: 'Ethereum (ETH)',
    currentPrice: 2850000,
    priceChange: 125000,
    priceChangePercent: 4.58,
    marketCap: 4.2,
    volume24h: 234.8,
    description: 'Ethereum is a decentralized platform that enables smart contracts and decentralized applications.',
    riskLevel: 'High Risk - Small Allocation',
    volatility: '24H Volume: 25 Billion USD',
    technicalOverview: 'Ethereum 2.0 transition to Proof of Stake has improved scalability and energy efficiency.',
    benefits: [
      'Smart contract platform leader',
      'Strong developer ecosystem',
      'DeFi and NFT foundation'
    ],
    risks: [
      'High gas fees during congestion',
      'Competition from other blockchains',
      'Regulatory uncertainty'
    ],
    warnings: [
      'Highly volatile asset',
      'Technical risks with smart contracts',
      'Environmental concerns being addressed'
    ]
  },
  RELIANCE: {
    id: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    currentPrice: 2847.50,
    priceChange: 28.75,
    priceChangePercent: 1.02,
    marketCap: 19.2,
    volume24h: 15.8,
    description: 'Reliance Industries Limited is India\'s largest private sector company, with businesses across energy, petrochemicals, textiles, natural resources, retail, and telecommunications.',
    riskLevel: 'Medium Risk - Large Cap',
    volatility: '24H Volume: 15.8 Million Shares',
    technicalOverview: 'Reliance Industries is a diversified conglomerate with strong fundamentals and consistent growth across multiple sectors.',
    benefits: [
      'Market leader in multiple sectors',
      'Strong financial position',
      'Consistent dividend payments'
    ],
    risks: [
      'Market volatility',
      'Regulatory changes',
      'Sector-specific risks'
    ],
    warnings: [
      'Past performance doesn\'t guarantee future returns',
      'Market conditions can change rapidly',
      'Diversify your investment portfolio'
    ]
  }
};

const marketTrends = [
  {
    category: 'Crypto',
    trend: 'up',
    percentage: '+12.5%',
    description: 'Strong institutional adoption driving crypto markets'
  },
  {
    category: 'Indian Stocks',
    trend: 'up',
    percentage: '+3.2%',
    description: 'Q3 earnings beat expectations across sectors'
  },
  {
    category: 'Gold',
    trend: 'down',
    percentage: '-1.8%',
    description: 'Strong dollar putting pressure on gold prices'
  },
  {
    category: 'Real Estate',
    trend: 'up',
    percentage: '+8.7%',
    description: 'Residential demand surge in tier-1 cities'
  }
];

const regulatoryNews = [
  {
    title: 'SEBI Updates Mutual Fund Guidelines',
    description: 'New regulations for better investor protection and transparency',
    date: '2 hours ago',
    impact: 'Medium',
    category: 'Mutual Funds'
  },
  {
    title: 'RBI Announces Digital Currency Pilot',
    description: 'Central Bank Digital Currency trials to expand nationwide',
    date: '5 hours ago',
    impact: 'High',
    category: 'Digital Currency'
  },
  {
    title: 'New Tax Rules for Crypto Trading',
    description: 'Government clarifies taxation framework for cryptocurrency',
    date: '1 day ago',
    impact: 'High',
    category: 'Cryptocurrency'
  }
];

const MarketResearchHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (query) => {
    const asset = featuredAssets[query.toUpperCase()];
    if (asset) {
      setSelectedAsset(asset);
      setShowComingSoon(false);
    } else {
      setSelectedAsset(null);
      setShowComingSoon(true);
    }
  };

  const handleQuickSelect = (symbol) => {
    setSearchQuery(symbol);
    handleSearch(symbol);
  };

  const formatPrice = (price, symbol) => {
    if (symbol === 'BTC' || symbol === 'ETH') {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const ComingSoonBanner = () => (
    <div className="backdrop-blur-xl bg-emerald-500/10 border border-emerald-300/20 rounded-3xl p-8 text-center shadow-2xl shadow-emerald-500/20">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-green-500/20 backdrop-blur-xl rounded-2xl mb-6 shadow-lg shadow-emerald-500/25">
        <Info className="w-10 h-10 text-emerald-400" />
      </div>
      <h3 className="text-3xl font-bold text-emerald-100 mb-3">Feature Not Fully Unlocked</h3>
      <p className="text-emerald-200 mb-6 text-lg">This advanced market research feature is coming soon!</p>
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-emerald-300/20 mb-6 shadow-lg shadow-emerald-500/10">
        <p className="text-emerald-100 font-semibold text-lg">🚀 Coming Soon with SavingsYogi</p>
        <p className="text-emerald-200 mt-2">
          Get AI-powered insights for thousands of assets across all investment categories
        </p>
      </div>
      <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 font-semibold">
        Stay Tuned with SavingsYogi
      </button>
    </div>
  );

  return (
    <div className="min-h-screen cursor-not-allowed bg-gradient-to-br from-emerald-900 to-green-900 animation-pulse p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with enhanced glassmorphism */}
        <div className="text-center mb-8">
          <div className="backdrop-blur-xl bg-emerald-500/10 rounded-3xl p-8 border border-emerald-300/20 shadow-2xl shadow-emerald-500/20">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-3">
              Market Research Hub
            </h1>
            <p className="text-emerald-200 text-lg">Get AI-powered insights across all major investment categories
                <br/><span className='text-white font-[900] text-2xl '>Feature Coming Soon...</span>
            </p>
          </div>
        </div>
         {/* Enhanced Search with glassmorphism */}
              <div className="backdrop-blur-xl bg-emerald-500/10 rounded-3xl p-6 shadow-2xl shadow-emerald-500/20 border border-emerald-300/20 mb-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-emerald-400" />
              <input
                type="text"
                placeholder="Search for stocks, crypto, mutual funds..."
                className="w-full pl-12 pr-4 py-3 backdrop-blur-xl bg-white/10 border border-emerald-300/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-emerald-100 placeholder-emerald-300/70 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              />
            </div>
            <button 
              onClick={() => handleSearch(searchQuery)}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 font-semibold"
            >
              Analyze
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="backdrop-blur-xl bg-white/10 text-emerald-100 p-3 rounded-2xl border border-emerald-300/20 hover:bg-white/20 transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          <div className="flex cursor-not-allowed flex-wrap gap-2">
            <span className="text-emerald-200 mr-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Quick select:
            </span>
            {quickSearchOptions.map((option) => (
              <button
                key={option.symbol}
                onClick={() => handleQuickSelect(option.symbol)}
                className="px-4 py-2 backdrop-blur-xl bg-emerald-500/20 text-emerald-100 rounded-full text-sm hover:bg-emerald-500/30 transition-all duration-300 border border-emerald-300/20 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                {option.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Categories with glassmorphism */}
        {!selectedAsset && !showComingSoon && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 cursor- mb-8">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className="group backdrop-blur-xl bg-gradient-to-br from-emerald-500/20 to-green-600/20 hover:from-emerald-400/30 hover:to-green-500/30 p-6 rounded-2xl text-white cursor-pointer hover:scale-105 transition-all duration-300 border border-emerald-300/20 shadow-xl shadow-emerald-500/10 hover:shadow-2xl hover:shadow-emerald-500/30"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                  <h3 className="font-semibold text-sm text-emerald-100">{category.title}</h3>
                  <p className="text-xs opacity-80 text-emerald-200">{category.subtitle}</p>
                </div>
              ))}
            </div>
             

            {/* Market Trends Section */}
            <div className="backdrop-blur-xl bg-emerald-500/10 rounded-3xl p-6 border border-emerald-300/20 shadow-2xl shadow-emerald-500/20 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUpIcon className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-emerald-100">Market Trends</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {marketTrends.map((trend, index) => (
                  <div key={index} className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-emerald-300/20 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-emerald-100">{trend.category}</h3>
                      <span className={`flex items-center gap-1 ${trend.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {trend.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {trend.percentage}
                      </span>
                    </div>
                    <p className="text-sm text-emerald-200/80">{trend.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulatory News Section */}
            <div className="backdrop-blur-xl bg-emerald-500/10 rounded-3xl p-6 border border-emerald-300/20 shadow-2xl shadow-emerald-500/20 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Newspaper className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-emerald-100">Regulatory Updates</h2>
              </div>
              <div className="space-y-4">
                {regulatoryNews.map((news, index) => (
                  <div key={index} className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-emerald-300/20 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-emerald-100 mb-1">{news.title}</h3>
                        <p className="text-sm text-emerald-200/80 mb-2">{news.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-emerald-300">{news.date}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            news.impact === 'High' ? 'bg-red-500/20 text-red-300' : 
                            news.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' : 
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {news.impact} Impact
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      
      

        {/* Enhanced Disclaimer */}
        {!selectedAsset && !showComingSoon && (
          <div className="backdrop-blur-xl bg-yellow-500/10 border border-yellow-300/20 rounded-2xl p-4 mb-6 flex items-start gap-3 shadow-lg shadow-yellow-500/10">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-100">
              <strong>Important Disclaimer:</strong> Cryptocurrencies are highly volatile and risky investments. Regulatory status in India is evolving. Only invest what you can afford to lose completely. This is not financial advice.
            </div>
          </div>
        )}

        {/* Coming Soon Banner */}
        {showComingSoon && <ComingSoonBanner />}

        {/* Enhanced Asset Analysis */}
        {selectedAsset && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Analysis with enhanced glassmorphism */}
            <div className="lg:col-span-2 backdrop-blur-xl bg-emerald-500/10 rounded-3xl p-8 shadow-2xl shadow-emerald-500/20 border border-emerald-300/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-green-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <span className="text-2xl">₿</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-emerald-100">{selectedAsset.name}</h2>
                  <div className="flex items-center gap-6 mt-2">
                    <span className="text-3xl font-bold text-emerald-100">
                      {formatPrice(selectedAsset.currentPrice, selectedAsset.id)}
                    </span>
                    <span className={`flex items-center gap-2 ${selectedAsset.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedAsset.priceChange >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      {selectedAsset.priceChangePercent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Tabs */}
              <div className="flex gap-2 mb-8">
                {['overview', 'analysis', 'risks'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30' 
                        : 'backdrop-blur-xl bg-white/10 text-emerald-200 hover:bg-white/20'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-emerald-300/20">
                      <p className="text-emerald-400 font-semibold">24h Change</p>
                      <p className="text-2xl font-bold text-emerald-100">{selectedAsset.priceChangePercent}%</p>
                    </div>
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-emerald-300/20">
                      <p className="text-emerald-400 font-semibold">Market Cap</p>
                      <p className="text-2xl font-bold text-emerald-100">{selectedAsset.marketCap}T USD</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-emerald-100">
                      <Info className="w-6 h-6 text-emerald-400" />
                      What is {selectedAsset.name.split(' ')[0]}?
                    </h3>
                    <p className="text-emerald-200 leading-relaxed text-lg">{selectedAsset.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-emerald-100">Technology Overview</h3>
                    <p className="text-emerald-200 leading-relaxed text-lg">{selectedAsset.technicalOverview}</p>
                  </div>
                </div>
              )}

              {activeTab === 'analysis' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-emerald-300 mb-4 flex items-center gap-3 text-lg">
                      <CheckCircle className="w-5 h-5" />
                      Potential Benefits
                    </h4>
                    <ul className="space-y-3">
                      {selectedAsset.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-green-400/50"></div>
                          <span className="text-emerald-200">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-300 mb-4 flex items-center gap-3 text-lg">
                      <AlertTriangle className="w-5 h-5" />
                      Key Metrics
                    </h4>
                    <div className="space-y-3">
                      <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-3 border border-emerald-300/20">
                        <p className="text-emerald-400 text-sm">Risk Level</p>
                        <p className="text-emerald-100 font-semibold">{selectedAsset.riskLevel}</p>
                      </div>
                      <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-3 border border-emerald-300/20">
                        <p className="text-emerald-400 text-sm">Volatility</p>
                        <p className="text-emerald-100 font-semibold">High</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'risks' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-red-300 mb-4 flex items-center gap-3 text-lg">
                      <AlertTriangle className="w-5 h-5" />
                      Risks & Concerns
                    </h4>
                    <ul className="space-y-3">
                      {selectedAsset.risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-red-400/50"></div>
                          <span className="text-emerald-200">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="backdrop-blur-xl bg-red-500/10 border border-red-300/20 rounded-2xl p-6 shadow-lg shadow-red-500/10">
                    <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5" />
                      Important Warnings
                    </h4>
                    <ul className="space-y-2">
                      {selectedAsset.warnings.map((warning, index) => (
                        <li key={index} className="text-red-200">• {warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              <div className="backdrop-blur-xl bg-emerald-500/10 rounded-3xl p-6 shadow-2xl shadow-emerald-500/20 border border-emerald-300/20">
                <h3 className="text-xl font-semibold mb-6 text-emerald-100">Investment Analysis</h3>
                <div className="space-y-4">
                  <div className="backdrop-blur-xl bg-gradient-to-r from-emerald-500/20 to-green-600/20 p-4 rounded-2xl border border-emerald-300/20">
                    <p className="font-semibold text-emerald-100">{selectedAsset.riskLevel}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-3 border border-emerald-300/20">
                      <p className="text-emerald-400 text-sm">Market Trend</p>
                      <p className="font-semibold text-emerald-100">Sideways</p>
                    </div>
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-3 border border-emerald-300/20">
                      <p className="text-emerald-400 text-sm">Volatility</p>
                      <p className="font-semibold text-red-300">High</p>
                    </div>
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-3 border border-emerald-300/20">
                      <p className="text-emerald-400 text-sm">24H Volume</p>
                      <p className="font-semibold text-emerald-100">{selectedAsset.volatility}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-emerald-500/10 rounded-3xl p-6 shadow-2xl shadow-emerald-500/20 border border-emerald-300/20">
                <h3 className="text-xl font-semibold mb-4 text-emerald-100">Indian Regulatory Status</h3>
                <div className="backdrop-blur-xl bg-emerald-500/10 border border-emerald-300/20 p-4 rounded-2xl">
                  <p className="text-emerald-200">
                    Digital assets trading is legal and 1% TDS on transactions above ₹50,000 on each transaction as per regulatory framework.
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
                            {/* Quick Actions */}
              <div className="backdrop-blur-xl bg-emerald-500/10 rounded-3xl p-6 shadow-2xl shadow-emerald-500/20 border border-emerald-300/20">
                <h3 className="text-xl font-semibold mb-4 text-emerald-100">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 font-semibold flex items-center justify-center gap-2">
                    <Target className="w-5 h-5" />
                    Add to Watchlist
                  </button>
                  <button className="w-full backdrop-blur-xl bg-white/10 text-emerald-100 px-6 py-3 rounded-2xl hover:bg-white/20 transition-all duration-300 font-semibold flex items-center justify-center gap-2 border border-emerald-300/20">
                    <BookOpen className="w-5 h-5" />
                    Read Detailed Report
                  </button>
                  <button className="w-full backdrop-blur-xl bg-white/10 text-emerald-100 px-6 py-3 rounded-2xl hover:bg-white/20 transition-all duration-300 font-semibold flex items-center justify-center gap-2 border border-emerald-300/20">
                    <Calendar className="w-5 h-5" />
                    Set Price Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketResearchHub;
