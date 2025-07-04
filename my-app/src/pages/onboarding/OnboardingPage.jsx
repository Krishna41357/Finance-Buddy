import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Stocks3DBackground from './ChartBackground.jsx';
import ChartBackground from './ChartBackground.jsx';

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
      const res = await axios.post('http://localhost:8000/api/v1/auth/preferences', {
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
   <div className="relative w-screen h-screen overflow-hidden bg-green-900 text-white flex items-center justify-center">
  <ChartBackground />

      {/* Main UI */}
      <div className="z-10 flex flex-col items-center justify-center text-center px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Welcome Onboard!</h1>
        <p className="text-lg text-center mb-6 max-w-2xl">
          Choose topics that matter most to you – from savings and investments to real-time insights and expert articles.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => toggleTopic(topic)}
              className={`px-4 py-2 rounded transition ${
                selectedTopics.includes(topic)
                  ? 'bg-white text-green-900 font-semibold'
                  : 'bg-green-700 hover:bg-green-600'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-white text-green-900 font-semibold px-6 py-2 rounded hover:bg-gray-200 transition"
        >
          Continue
        </button>
        <p className="mt-2 text-sm">{selectedTopics.length} preferences selected</p>
      </div>
    </div>
  );
};

export default OnboardingPage;
