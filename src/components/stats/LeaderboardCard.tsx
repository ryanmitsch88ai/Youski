'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Trophy, ArrowUp, ArrowDown } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  photoURL: string;
  score: number;
  change: 'up' | 'down' | 'same';
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: '1',
    displayName: 'Sarah Smith',
    photoURL: '/default-avatar.png',
    score: 45,
    change: 'up'
  },
  {
    rank: 2,
    userId: '2',
    displayName: 'Mike Johnson',
    photoURL: '/default-avatar.png',
    score: 42,
    change: 'same'
  },
  {
    rank: 3,
    userId: '3',
    displayName: 'Emma Davis',
    photoURL: '/default-avatar.png',
    score: 38,
    change: 'down'
  },
  {
    rank: 4,
    userId: '4',
    displayName: 'James Wilson',
    photoURL: '/default-avatar.png',
    score: 35,
    change: 'up'
  },
  {
    rank: 5,
    userId: '5',
    displayName: 'Lisa Brown',
    photoURL: '/default-avatar.png',
    score: 32,
    change: 'same'
  }
];

const categories = [
  { id: 'days', label: 'Days Skied' },
  { id: 'vertical', label: 'Vertical Feet' },
  { id: 'distance', label: 'Total Distance' }
];

export default function LeaderboardCard() {
  const [selectedCategory, setSelectedCategory] = useState('days');
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'season'>('season');

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Leaderboard
        </h2>
        <div className="flex gap-2">
          {['week', 'month', 'season'].map((time) => (
            <button
              key={time}
              onClick={() => setTimeFrame(time as 'week' | 'month' | 'season')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                timeFrame === time
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {time.charAt(0).toUpperCase() + time.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mockLeaderboard.map((entry) => (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex items-center gap-4">
              <span className={`w-6 text-center font-bold ${
                entry.rank <= 3 ? 'text-yellow-500' : 'text-gray-500 dark:text-gray-400'
              }`}>
                #{entry.rank}
              </span>
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={entry.photoURL}
                  alt={entry.displayName}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                {entry.displayName}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-900 dark:text-white">
                {entry.score}
              </span>
              {entry.change === 'up' && <ArrowUp className="w-4 h-4 text-green-500" />}
              {entry.change === 'down' && <ArrowDown className="w-4 h-4 text-red-500" />}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 