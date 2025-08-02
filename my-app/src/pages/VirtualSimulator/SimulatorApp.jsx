import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  PieChart, 
  BookOpen, 
  Search, 
  Menu, 
  X, 
  ArrowLeft,
  Plus,
  Minus,
  BarChart3,
  Eye,
  EyeOff,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data for demonstration
const mockIndices = [
  { name: 'NIFTY 50', value: 19850.25, change: 125.30, changePercent: 0.63 },
  { name: 'SENSEX', value: 66589.93, change: 418.67, changePercent: 0.63 },
  { name: 'BANK NIFTY', value: 44287.15, change: -89.25, changePercent: -0.20 },
  { name: 'NIFTY IT', value: 28950.40, change: 245.80, changePercent: 0.86 }
];

const mockStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2485.60, change: 12.45, changePercent: 0.50, volume: 1250000 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3652.30, change: -24.70, changePercent: -0.67, volume: 890000 },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1489.80, change: 18.90, changePercent: 1.29, volume: 2100000 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1598.45, change: -8.25, changePercent: -0.51, volume: 1800000 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 989.75, change: 15.60, changePercent: 1.60, volume: 1650000 },
  { symbol: 'ADANIGREEN', name: 'Adani Green Energy', price: 1245.80, change: -45.20, changePercent: -3.50, volume: 950000 }
];

const mockPortfolio = {
  totalValue: 125000,
  todaysPL: 2450,
  totalPL: 8750,
  invested: 116250,
  holdings: [
    { symbol: 'RELIANCE', qty: 10, avgPrice: 2400, currentPrice: 2485.60, pl: 856 },
    { symbol: 'TCS', qty: 5, avgPrice: 3700, currentPrice: 3652.30, pl: -239 },
    { symbol: 'INFY', qty: 15, avgPrice: 1450, currentPrice: 1489.80, pl: 597 }
  ]
};

// Global wallet state
let walletBalance = 50000;
let walletTransactions = [
  { id: 1, type: 'CREDIT', amount: 50000, description: 'Initial deposit', timestamp: new Date() }
];

// Components
const WalletCard = ({ balance, showBalance, onToggleBalance }) => (
  <div className="bg-gradient-to-br from-emerald-900/60 to-emerald-800/40 backdrop-blur-sm rounded-xl p-4 border border-emerald-700/50 shadow-lg">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="bg-emerald-500/20 p-2 rounded-lg">
          <Wallet className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <div className="text-emerald-300 text-sm font-medium">Wallet Balance</div>
          <div className="text-white font-bold text-lg">
            {showBalance ? `₹${balance.toLocaleString()}` : '₹****'}
          </div>
        </div>
      </div>
      <button
        onClick={onToggleBalance}
        className="text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </button>
    </div>
  </div>
);

const NavBar = ({ currentPage, setCurrentPage, isMobile, showMobileMenu, setShowMobileMenu, walletBalance, showWalletBalance, setShowWalletBalance }) => (
  <div className="bg-gradient-to-r from-emerald-900/95 to-emerald-800/95 backdrop-blur-sm border-b border-emerald-700/50 sticky top-0 z-50 shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-4">
          <div className="bg-emerald-500/20 p-2 rounded-lg">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-xl font-bold text-white">TradeSimulator</h1>
        </div>
        
        {!isMobile && (
          <div className="flex items-center space-x-4">
            <WalletCard 
              balance={walletBalance} 
              showBalance={showWalletBalance}
              onToggleBalance={() => setShowWalletBalance(!showWalletBalance)}
            />
          </div>
        )}
        
        {isMobile ? (
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-white p-2 hover:bg-emerald-800/50 rounded-lg transition-colors"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        ) : (
          <div className="flex space-x-6">
            {['home', 'portfolio', 'orders', 'wallet'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors font-medium ${
                  currentPage === page
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
    
    {isMobile && showMobileMenu && (
      <div className="bg-emerald-900/98 border-t border-emerald-700/50 backdrop-blur-sm">
        <div className="px-4 py-3">
          <WalletCard 
            balance={walletBalance} 
            showBalance={showWalletBalance}
            onToggleBalance={() => setShowWalletBalance(!showWalletBalance)}
          />
        </div>
        <div className="px-4 py-2 space-y-2">
          {['home', 'portfolio', 'orders', 'wallet'].map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg capitalize transition-colors font-medium ${
                currentPage === page
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);

const IndicesCard = ({ indices }) => (
  <div className="bg-gradient-to-br from-white/10 to-emerald-900/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
      <div className="bg-emerald-500/20 p-2 rounded-lg mr-3">
        <BarChart3 className="w-5 h-5 text-emerald-400" />
      </div>
      Market Indices
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {indices.map((index, i) => (
        <div key={i} className="bg-gradient-to-br from-white/10 to-emerald-800/40 rounded-lg p-4 border border-white/10 hover:border-emerald-400/30 transition-all">
          <div className="text-emerald-300 text-sm font-medium">{index.name}</div>
          <div className="text-white text-lg font-bold">{index.value.toLocaleString()}</div>
          <div className={`flex items-center text-sm ${
            index.change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {index.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StockCard = ({ stock, onClick }) => (
  <div
    onClick={() => onClick(stock)}
    className="bg-gradient-to-br from-white/10 to-emerald-800/40 rounded-lg p-4 cursor-pointer hover:from-white/15 hover:to-emerald-700/50 transition-all border border-white/10 hover:border-emerald-400/30 shadow-lg hover:shadow-emerald-500/20"
  >
    <div className="flex justify-between items-start">
      <div>
        <div className="text-white font-semibold">{stock.symbol}</div>
        <div className="text-emerald-300 text-sm truncate">{stock.name}</div>
      </div>
      <div className="text-right">
        <div className="text-white font-bold">₹{stock.price.toFixed(2)}</div>
        <div className={`text-sm flex items-center ${
          stock.change >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
        </div>
      </div>
    </div>
    <div className="mt-2 text-emerald-400 text-xs">
      Vol: {stock.volume.toLocaleString()}
    </div>
  </div>
);

const TradingInterface = ({ stock, onBack }) => {
  const [orderType, setOrderType] = useState('BUY');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(stock.price);
  const [orderForm, setOrderForm] = useState('MARKET');
  const [ws, setWs] = useState(null);
  const [livePrice, setLivePrice] = useState(stock.price);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Mock WebSocket connection
    const mockWs = {
      send: (data) => console.log('Sending:', data),
      close: () => console.log('Connection closed')
    };
    setWs(mockWs);

    // Mock live price updates
    const priceInterval = setInterval(() => {
      const change = (Math.random() - 0.5) * 10;
      setLivePrice(prev => Math.max(prev + change, 0));
    }, 2000);

    // Mock chart data
    const chartInterval = setInterval(() => {
      const now = new Date();
      const newPoint = {
        time: now.toLocaleTimeString(),
        price: livePrice + (Math.random() - 0.5) * 20
      };
      setChartData(prev => [...prev.slice(-19), newPoint]);
    }, 3000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(chartInterval);
      if (mockWs) mockWs.close();
    };
  }, []);

  const handleOrder = () => {
    const order = {
      symbol: stock.symbol,
      type: orderType,
      quantity,
      price: orderForm === 'MARKET' ? livePrice : price,
      orderType: orderForm
    };
    console.log('Placing order:', order);
    // Here you would send the order to your backend
    alert(`${orderType} order placed for ${quantity} shares of ${stock.symbol}`);
  };

  return (
    <div className="max-w-7xl cursor-not-allowed mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={onBack}
        className="flex items-center text-emerald-400 hover:text-emerald-300 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Markets
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Info & Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-700/50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{stock.symbol}</h1>
                <p className="text-emerald-300">{stock.name}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">₹{livePrice.toFixed(2)}</div>
                <div className={`flex items-center ${
                  stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stock.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>

            {/* OHLC Data */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-emerald-800/30 rounded-lg p-3">
                <div className="text-emerald-300 text-sm">Open</div>
                <div className="text-white font-semibold">₹{(stock.price - 15).toFixed(2)}</div>
              </div>
              <div className="bg-emerald-800/30 rounded-lg p-3">
                <div className="text-emerald-300 text-sm">High</div>
                <div className="text-white font-semibold">₹{(stock.price + 25).toFixed(2)}</div>
              </div>
              <div className="bg-emerald-800/30 rounded-lg p-3">
                <div className="text-emerald-300 text-sm">Low</div>
                <div className="text-white font-semibold">₹{(stock.price - 32).toFixed(2)}</div>
              </div>
              <div className="bg-emerald-800/30 rounded-lg p-3">
                <div className="text-emerald-300 text-sm">Volume</div>
                <div className="text-white font-semibold">{stock.volume.toLocaleString()}</div>
              </div>
            </div>

            {/* Mock Chart */}
            <div className="bg-emerald-800/20 rounded-lg p-4 h-64">
              <div className="text-emerald-300 text-sm mb-2">Live Price Chart</div>
              <div className="h-full flex items-end space-x-1">
                {chartData.map((point, i) => (
                  <div
                    key={i}
                    className="bg-emerald-400 w-2 rounded-t"
                    style={{ height: `${Math.min((point.price / livePrice) * 100, 100)}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Panel */}
        <div className="bg-emerald-900/40 cursor-not-allowed backdrop-blur-sm rounded-xl p-6 border border-emerald-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">Place Order</h2>
          
          <div className="space-y-4">
            <div className="flex bg-emerald-800/30 rounded-lg p-1">
              <button
                onClick={() => setOrderType('BUY')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  orderType === 'BUY' 
                    ? 'bg-green-600 text-white' 
                    : 'text-emerald-300 hover:bg-emerald-700/50'
                }`}
              >
                BUY
              </button>
              <button
                onClick={() => setOrderType('SELL')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  orderType === 'SELL' 
                    ? 'bg-red-600 text-white' 
                    : 'text-emerald-300 hover:bg-emerald-700/50'
                }`}
              >
                SELL
              </button>
            </div>

            <div className="flex bg-emerald-800/30 rounded-lg p-1">
              <button
                onClick={() => setOrderForm('MARKET')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  orderForm === 'MARKET' 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-emerald-300 hover:bg-emerald-700/50'
                }`}
              >
                MARKET
              </button>
              <button
                onClick={() => setOrderForm('LIMIT')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  orderForm === 'LIMIT' 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-emerald-300 hover:bg-emerald-700/50'
                }`}
              >
                LIMIT
              </button>
            </div>

            <div>
              <label className="block text-emerald-300 text-sm mb-2">Quantity</label>
              <div className="flex items-center bg-emerald-800/30 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-emerald-400 hover:text-emerald-300"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 bg-transparent text-white text-center py-2 focus:outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-emerald-400 hover:text-emerald-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {orderForm === 'LIMIT' && (
              <div>
                <label className="block text-emerald-300 text-sm mb-2">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-emerald-800/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  step="0.01"
                />
              </div>
            )}

            <div className="bg-emerald-800/30 rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-300">Total Amount:</span>
                <span className="text-white font-semibold">
                  ₹{(quantity * (orderForm === 'MARKET' ? livePrice : price)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleOrder}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                orderType === 'BUY'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {orderType} {quantity} shares
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
        <p className="text-emerald-300">Track your investments and performance</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-700/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-emerald-300 text-sm font-medium">Total Value</h3>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-emerald-400 hover:text-emerald-300"
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          <div className="text-2xl font-bold text-white">
            {showBalance ? `₹${mockPortfolio.totalValue.toLocaleString()}` : '₹****'}
          </div>
        </div>

        <div className="bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-700/50">
          <h3 className="text-emerald-300 text-sm font-medium mb-2">Today's P&L</h3>
          <div className={`text-2xl font-bold ${
            mockPortfolio.todaysPL >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {showBalance ? `₹${mockPortfolio.todaysPL.toLocaleString()}` : '₹****'}
          </div>
        </div>

        <div className="bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-700/50">
          <h3 className="text-emerald-300 text-sm font-medium mb-2">Total P&L</h3>
          <div className={`text-2xl font-bold ${
            mockPortfolio.totalPL >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {showBalance ? `₹${mockPortfolio.totalPL.toLocaleString()}` : '₹****'}
          </div>
        </div>

        <div className="bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-700/50">
          <h3 className="text-emerald-300 text-sm font-medium mb-2">Invested</h3>
          <div className="text-2xl font-bold text-white">
            {showBalance ? `₹${mockPortfolio.invested.toLocaleString()}` : '₹****'}
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-700/50">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <PieChart className="w-5 h-5 mr-2 text-emerald-400" />
          Holdings
        </h2>
        <div className="space-y-4">
          {mockPortfolio.holdings.map((holding, i) => (
            <div key={i} className="bg-emerald-800/30 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-white font-semibold">{holding.symbol}</div>
                  <div className="text-emerald-300 text-sm">
                    {holding.qty} shares • Avg: ₹{holding.avgPrice.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">₹{holding.currentPrice.toFixed(2)}</div>
                  <div className={`text-sm ${
                    holding.pl >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {holding.pl >= 0 ? '+' : ''}₹{holding.pl.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-emerald-400 text-sm">
                Current Value: ₹{(holding.qty * holding.currentPrice).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const mockOrders = [
    { id: 1, symbol: 'RELIANCE', type: 'BUY', qty: 10, price: 2480, status: 'COMPLETED', time: '10:30 AM' },
    { id: 2, symbol: 'TCS', type: 'SELL', qty: 5, price: 3660, status: 'PENDING', time: '11:15 AM' },
    { id: 3, symbol: 'INFY', type: 'BUY', qty: 15, price: 1485, status: 'COMPLETED', time: '12:00 PM' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Orders</h1>
        <p className="text-emerald-300">View and manage your trading orders</p>
      </div>

      <div className="bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-700/50">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-emerald-400" />
          Order Book
        </h2>
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-emerald-800/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white font-semibold">{order.symbol}</div>
                  <div className="text-emerald-300 text-sm">
                    {order.type} • {order.qty} shares • ₹{order.price.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === 'COMPLETED' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {order.status}
                  </div>
                  <div className="text-emerald-400 text-sm mt-1">{order.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ onStockClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredStocks = mockStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="max-w-7xl cursor-not-allowed mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Feature Coming soon...<br/>
            Markets</h1>
          <p className="text-emerald-300">Real-time market data and trading</p>
        </div>

        <div className="space-y-8">
          <IndicesCard indices={mockIndices} />
          
          <div className="bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-700/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-xl font-semibold text-white mb-4 sm:mb-0 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-emerald-400" />
                Top Stocks
              </h2>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 bg-emerald-800/30 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStocks.map((stock, i) => (
                <StockCard key={i} stock={stock} onClick={onStockClick} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  
};

// Main App Component
const SimulatorApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStock, setSelectedStock] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setCurrentPage('trading');
  };

  const handleBackToHome = () => {
    setSelectedStock(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen cursor-not-allowed bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800">
      <NavBar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isMobile={isMobile}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
      
      {currentPage === 'home' && (
        <HomePage onStockClick={handleStockClick} />
      )}
      
      {currentPage === 'trading' && selectedStock && (
        <TradingInterface stock={selectedStock} onBack={handleBackToHome} />
      )}
      
      {currentPage === 'portfolio' && (
        <PortfolioPage />
      )}
      
      {currentPage === 'orders' && (
        <OrdersPage />
      )}
    </div>
  );
};

export default SimulatorApp;