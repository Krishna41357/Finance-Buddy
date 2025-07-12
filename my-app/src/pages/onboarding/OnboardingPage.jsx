import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import phoneMockup from '../../assets/phone-mockup.png'; // Add your image

const topics = [
  'Personal Finance',
  'Loans and Credit',
  'Cryptocurrency',
  'Equity and Stock Market',
  'Retirement Planning',
  'Gold and Commodities',
  'Mutual Funds and SIPs',
  'Other',
];

const OnboardingPage = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [userId, setUserId] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) {
      setUserId(user.userId);
    } else {
      toast.error('User not authenticated. Please log in again.');
    }
  }, [user]);

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error('User ID not found. Please log in again.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/v1/auth/preferences', {
        userId,
        preferences: selectedTopics,
      });

      toast.success('Preferences saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="relative w-screen  min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-black text-white overflow-hidden flex items-center justify-center px-4">
      {/* Background Glow Orbs */}
      <div className="absolute w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-green-500/10 rounded-full blur-3xl bottom-20 right-20 animate-pulse delay-1000" />

      {/* Confetti-like Sparkle Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300 rounded-full opacity-50 animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Layout Container */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl gap-10 md:gap-20">
        {/* Phone Image with Glow */}
        <div className="relative w-60 sm:w-72 md:w-80 lg:w-96">
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl z-0" />
          <motion.img
            src={phoneMockup}
            alt="Phone UI"
            initial={{ x: -200, rotate: -12, opacity: 0 }}
            animate={{ x: 0, rotate: -10, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 w-full"
            style={{ transform: 'rotate(-10deg)' }}
          />
        </div>

        {/* Onboarding Box with Green Glow */}
        <div className="relative w-full md:w-[60%]">
          {/* Green Glow Behind Card */}
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-3xl z-0" />

          <motion.div
            className="relative z-10 p-6 sm:p-8 md:p-10 border border-white/10 backdrop-blur-2xl bg-white/5 rounded-3xl shadow-2xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Welcome <span className="text-emerald-400">Onboard!</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6">
              Choose topics that matter most to you — from savings and investments to real-time insights and expert articles.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 justify-center">
              {topics.map((topic) => (
                <motion.button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full transition font-medium text-sm backdrop-blur-md border 
                    ${
                      selectedTopics.includes(topic)
                        ? 'bg-green-400 text-slate-900 border-green-300 shadow-green-400/40 shadow-md'
                        : 'bg-white/10 text-white hover:bg-white/20 border-white/10'
                    }`}
                >
                  {topic}
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                className="bg-green-500 hover:bg-green-400 text-slate-900 font-semibold px-6 py-2 rounded-full transition shadow-md"
              >
                Continue
              </motion.button>
              <p className="text-sm text-gray-400">{selectedTopics.length} preferences selected</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
