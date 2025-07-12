import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const SignupForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetName = (e) => setUserName(e.target.value);
  const handleSetEmail = (e) => setEmail(e.target.value);
  const handleSetPassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/register", {
        username,
        email,
        password,
      });
      const { success, token, user, message } = response.data;
      if (success && token && user) {
        login({ token, user });
        toast.success("Signup successful! Let's set up your preferences.");
        triggerConfetti();
        navigate("/preferences");
      } else {
        toast.error(message || "User already exists with this email.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const triggerConfetti = () => {
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-piece";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = ["#10b981", "#34d399", "#6ee7b7"][Math.floor(Math.random() * 3)];
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  };

  useEffect(() => {
    const bubbleContainer = document.getElementById("bubble-container");
    const createBubble = () => {
      const bubble = document.createElement("div");
      const size = Math.random() * 10 + 8;
      bubble.className = "absolute rounded-full bg-emerald-500/10 blur-2xl z-0";
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.bottom = "-20px";
      bubble.style.animation = `bubble-rise ${4 + Math.random() * 6}s linear infinite`;
      bubbleContainer.appendChild(bubble);
      setTimeout(() => bubble.remove(), 10000);
    };
    const interval = setInterval(createBubble, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute w-72 h-72 bg-green-500/20 rounded-full blur-3xl top-0 left-0 animate-pulse" />
      <div className="absolute w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl bottom-0 right-0 animate-pulse" />
      <div className="absolute w-full h-full bg-[radial-gradient(#134e4a_1px,transparent_1px)] bg-[length:20px_20px] opacity-5 animate-pulse" />

      {/* Bubble Container */}
      <div id="bubble-container" className="absolute inset-0 pointer-events-none overflow-hidden"></div>

      <div className="relative z-10 w-full max-w-xl p-8 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          <span className="text-emerald-400">Create</span> Account
        </h2>
        <p className="text-sm text-gray-300 text-center mb-6">Join StudentCorner to unlock personalized content and tools!</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={username}
              onChange={handleSetName}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={handleSetEmail}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={handleSetPassword}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-full transition shadow-md"
          >
            Sign Up
          </button>

          <p className="text-sm text-gray-400 text-center">
            Already have an account?{' '}
            <span
              className="text-yellow-400 hover:underline cursor-pointer"
              onClick={() => navigate('/auth/login')}
            >
              Log In
            </span>
          </p>

          <div className="text-center text-sm text-gray-400 mt-4">or continue with</div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="button"
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

      {/* Styles for animations */}
      <style jsx>{`
        @keyframes bubble-rise {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 8px;
          top: 0;
          z-index: 50;
          border-radius: 50%;
          animation: confetti-fall ease-in forwards;
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SignupForm;
