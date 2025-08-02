import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';

const UserPillar = ({ username, userId, selectedPage, setSelectedPage }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [coinBalance, setCoinBalance] = useState(null);

  const displayName = username || 'shubham';

  const navigationItems = [
    { name: 'Home', icon: '' },
    { name: 'Content Feed', icon: '' },
    { name: 'Portfolio', icon: '' },
    { name: 'Quiz', icon: '' },
    { name: 'Market Research', icon: '' },
    { name: 'Paper Trading', icon: '' },
    { name: 'YogiBot', icon: '' },
  ];
  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(`${BASE_API}/api/v1/user/coins/${userId}`);
        const data = await res.json();
        setCoinBalance(data?.totalCoins);
      } catch (err) {
        console.error('Failed to fetch Yogi Coins:', err);
        setCoinBalance(0);
      }
    };

    if (userId) fetchCoins();
  }, [userId]);

  return (
    <div className="w-72 bg-gradient-to-br from-slate-900 via-emerald-950 to-black text-white border-r border-white/10 h-full flex flex-col overflow-hidden shadow-xl">
      {/* User Info */}
      <div className="px-4 py-6  border-b border-white/10">
        <div className="flex items-center justify-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">
              <Avatar name={username} />
            </span>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-1 text-emerald-300">{displayName}</h2>
         
        </div>

        {/* Yogi Coins */}
        <div className="bg-emerald-500/10 border border-emerald-400/20 mt-4 rounded-xl p-4 text-center shadow-md">
          <p className="text-emerald-300 text-xs uppercase tracking-wide">Yogi Coins</p>
          <h3 className="text-xl font-bold text-white mt-1">
            {coinBalance !== null ? (
              <>
                {coinBalance} <span className="spin-z inline-block">🪙</span>
              </>
            ) : (
              <span className="animate-pulse text-gray-400">Loading...</span>
            )}
          </h3>
         
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 scrollbar-hide overflow-y-auto">
        <nav className="space-y-2">
          {navigationItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedPage(item.name)}
              className={`group relative flex items-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedPage === item.name
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 shadow-inner'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-lg mr-4">{item.icon}</span>
              <span className="font-medium text-sm">{item.name}</span>
              {selectedPage === item.name && (
                <div className="absolute right-3 w-2 h-2 bg-green-400 rounded-full"></div>
              )}
            </div>
          ))}

          {/* Logout */}
          <button
            onClick={async () => {
              setIsLoggingOut(true);
              try {
                await fetch(`${BASE_API}/api/v1/auth/logout`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/');
              } catch (err) {
                alert('Logout failed.');
              } finally {
                setIsLoggingOut(false);
              }
            }}
            disabled={isLoggingOut}
            className={`group relative flex items-center px-4 py-3 mt-6 rounded-xl w-full transition-all duration-200 text-left ${
              isLoggingOut
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-red-500 hover:bg-red-500/10 hover:text-red-400'
            }`}
          >
            <span className="text-lg mr-4">{isLoggingOut ? '⏳' : '🚪'}</span>
            <span className="font-medium text-sm">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </nav>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10 text-xs text-gray-500 text-center">
        © 2025 Savings Yogi. All rights reserved.
      </div>
    </div>
  );
};

export default UserPillar;
