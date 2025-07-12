import React from 'react';
import { Trophy, Target, TrendingUp } from 'lucide-react';

const UserStatsCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Stats</h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <Trophy size={16} /> Total Score
          </span>
          <span className="font-bold text-gray-800">0</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <Target size={16} /> Quiz Streak
          </span>
          <span className="font-bold text-gray-800">0 days</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <TrendingUp size={16} /> Level
          </span>
          <span className="font-bold bg-gray-100 px-2 py-0.5 rounded-md text-xs">beginner</span>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Achievement Level: <span className="font-semibold text-purple-600">🥇 Quiz Beginner</span>
      </div>
    </div>
  );
};

export default UserStatsCard;
