import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');
  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  // 🔁 Check if already logged in
  useEffect(() => {
    const savedToken = sessionStorage.getItem('adminToken');
    const savedAdminInfo = sessionStorage.getItem('adminInfo');

    if (savedToken && savedAdminInfo) {
      setToken(savedToken);
      setAdminInfo(JSON.parse(savedAdminInfo));
      setIsLoggedIn(true);
      navigate('/admin/dashboard', {
        state: {
          token: savedToken,
          adminInfo: JSON.parse(savedAdminInfo)
        }
      });
    }
  }, [navigate]);

  // ✅ Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_API}/api/v1/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('adminToken', data.token);
        sessionStorage.setItem('adminInfo', JSON.stringify(data.admin));
        setIsLoggedIn(true);
        setToken(data.token);
        setAdminInfo(data.admin);

        navigate('/admin/dashboard', {
          state: {
            token: data.token,
            adminInfo: data.admin
          }
        });
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Network error during login');
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Optional: Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-1/2 left-0 w-24 h-24 bg-green-300/20 rounded-full blur-xl animate-pulse"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-100 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-green-600 text-sm">Welcome back! Please sign in to continue.</p>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-bold">Email Address</label>
              <div className="relative ">
                <input  
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-black"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-bold">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-black"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Login</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
              )}
            </button>
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-gray-500">🔒 Secure admin access • Protected by encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
