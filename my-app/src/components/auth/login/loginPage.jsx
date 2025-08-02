import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const res = await axios.post(`${BASE_API}/api/v1/auth/login`, { email, password });
      const data = res.data;
      if (data?.token) {
        login({ token: data.token, user: data.user });
        toast.success('Login successful');
        navigate('/dashboard', {
          state: {
            username: data.user.username,
            userId: data.user.userId,
          },
        });
      } else {
        toast.error('Incorrect Credentials');
      }
    } catch (err) {
      console.error(err);
      toast.error('Login failed. Try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_API}/api/v1/auth/google`;
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-black flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Glows */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-lg backdrop-blur-lg border border-white/10 bg-white/5 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-emerald-400">Welcome</span> Back!
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Log in to Generate, Analyze, and Optimize with Ease!
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="text-right text-sm">
            <a href="#" className="text-red-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-full transition shadow-md"
          >
            Log In
          </button>

          <div className="text-center text-sm text-gray-400 mt-4">
            Not registered yet?{' '}
            <span
              onClick={() => navigate('/auth/signup')}
              className="text-yellow-400 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </div>

          <div className="text-center text-sm text-gray-400 mt-6">
            or Continue with
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-white/20 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <img src="/google-logo.png" alt="Google" className="h-5 w-5" />
              <span className="text-sm font-medium">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-white/20 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <img src="/facebook-logo.png" alt="Facebook" className="h-5 w-5" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
