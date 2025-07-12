import React from 'react';
import { Sparkles } from 'lucide-react';

const AIQuizGeneratorCard = ({ onGenerate }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Sparkles className="text-purple-500" size={18} />
        AI Quiz Generator
      </h3>

      <div className="text-sm text-gray-700 space-y-1 mb-4">
        <p>🎯 Level: <strong>beginner</strong></p>
        <p>📌 Goals: <strong>3 selected</strong></p>
      </div>

      <button
        onClick={onGenerate}
        className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors"
      >
        Generate Personalized Quiz
      </button>

      <p className="text-xs text-gray-400 mt-2">
        AI will create questions based on your profile and goals
      </p>
    </div>
  );
};

export default AIQuizGeneratorCard;
