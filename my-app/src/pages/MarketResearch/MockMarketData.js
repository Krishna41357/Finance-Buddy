// mockData.js - Market Research Hub Mock Data


export const categories = [
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

export const quickSearchOptions = [
  { symbol: 'BTC', name: 'Bitcoin', type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', type: 'crypto' },
  { symbol: 'BNB', name: 'Binance Coin', type: 'crypto' },
  { symbol: 'ADA', name: 'Cardano', type: 'crypto' },
  { symbol: 'DOT', name: 'Polkadot', type: 'crypto' },
  { symbol: 'MATIC', name: 'Polygon', type: 'crypto' },
  { symbol: 'RELIANCE', name: 'Reliance Industries', type: 'stock' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', type: 'stock' },
  { symbol: 'INFY', name: 'Infosys', type: 'stock' },
  { symbol: 'HDFC', name: 'HDFC Bank', type: 'stock' }
];

export const featuredAssets = {
  crypto: {
    id: 'BTC',
    name: 'Bitcoin (BTC)',
    currentPrice: 42850000, // in INR
    priceChange: -1875000,
    priceChangePercent: -4.19,
    marketCap: 8.4,
    volume24h: 892.5,
    description: 'Bitcoin is a decentralized digital currency that operates on a peer-to-peer network, enabling direct transactions without the need for intermediaries. It utilizes blockchain technology to ensure transparency and security, with a fixed supply cap of 21 million coins, which contributes to its scarcity and potential value appreciation over time.',
    riskLevel: 'High Risk - Small Allocation',
    volatility: '24H Volume: 50 Billion USD',
    technicalOverview: 'Bitcoin is a decentralized digital currency that operates on a peer-to-peer network, enabling direct transactions without the need for intermediaries. It utilizes blockchain technology to ensure transparency and security, with a fixed supply cap of 21 million coins, which contributes to its scarcity and potential value appreciation over time.',
    useCases: [
      'Digital Store of Value',
      'Medium of Exchange',
      'Investment Asset'
    ],
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
  stock: {
    id: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    currentPrice: 2847.50,
    priceChange: 28.75,
    priceChangePercent: 1.02,
    marketCap: 19.2,
    volume24h: 15.8,
    description: 'Reliance Industries Limited is India\'s largest private sector company, with businesses across energy, petrochemicals, textiles, natural resources, retail, and telecommunications. The company has been expanding its digital and retail footprint significantly.',
    riskLevel: 'Medium Risk - Large Cap',
    volatility: '24H Volume: 15.8 Million Shares',
    technicalOverview: 'Reliance Industries is a diversified conglomerate with strong fundamentals and consistent growth across multiple sectors. The company\'s digital transformation and retail expansion have opened new revenue streams.',
    useCases: [
      'Long-term Investment',
      'Dividend Income',
      'Portfolio Diversification'
    ],
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
  },
  mutualfund: {
    id: 'AXIS_BLUECHIP',
    name: 'Axis Bluechip Fund',
    currentPrice: 45.67,
    priceChange: 0.89,
    priceChangePercent: 1.99,
    marketCap: 28.5,
    volume24h: 156.2,
    description: 'Axis Bluechip Fund is an open-ended equity scheme predominantly investing in large cap stocks. The fund aims to generate long-term capital appreciation by investing in fundamentally strong large-cap companies.',
    riskLevel: 'Moderate Risk - Large Cap Equity',
    volatility: 'AUM: ₹28,500 Crores',
    technicalOverview: 'This fund follows a growth-oriented investment approach, focusing on companies with strong business fundamentals, competitive advantages, and potential for sustainable earnings growth.',
    useCases: [
      'Long-term Wealth Creation',
      'SIP Investment',
      'Tax Saving (ELSS variant)'
    ],
    benefits: [
      'Professional fund management',
      'Diversified portfolio',
      'Liquidity and transparency'
    ],
    risks: [
      'Market risk',
      'Concentration risk',
      'Manager risk'
    ],
    warnings: [
      'Mutual fund investments are subject to market risks',
      'Read all scheme related documents carefully',
      'Past performance may or may not be sustained'
    ]
  },
  commodity: {
    id: 'GOLD',
    name: 'Gold (per 10 grams)',
    currentPrice: 63450,
    priceChange: 125,
    priceChangePercent: 0.20,
    marketCap: 15.8,
    volume24h: 2847.3,
    description: 'Gold is a precious metal that has been used as a store of value and medium of exchange for thousands of years. It serves as a hedge against inflation and currency devaluation.',
    riskLevel: 'Low to Moderate Risk',
    volatility: 'Daily Volume: ₹2,847 Crores',
    technicalOverview: 'Gold prices are influenced by various factors including inflation, currency movements, geopolitical tensions, and central bank policies. It typically performs well during uncertain economic times.',
    useCases: [
      'Inflation Hedge',
      'Portfolio Diversification',
      'Safe Haven Asset'
    ],
    benefits: [
      'Hedge against inflation',
      'Portfolio diversification',
      'Liquidity and global acceptance'
    ],
    risks: [
      'Price volatility',
      'Storage and insurance costs',
      'No regular income'
    ],
    warnings: [
      'Gold prices can be volatile in short term',
      'Consider storage and making charges',
      'Allocate only a portion of portfolio to gold'
    ]
  }
};

export const marketTrends = [
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

export const regulatoryNews = [
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

export const popularSearches = [
  'Bitcoin price prediction',
  'Best mutual funds 2024',
  'Gold vs Fixed Deposit',
  'Real estate investment tips',
  'Stock market analysis',
  'Cryptocurrency regulations India'
];