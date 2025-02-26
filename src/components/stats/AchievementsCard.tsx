'use client';

import { motion } from 'framer-motion';
import {
  Trophy,
  Mountain,
  Clock,
  Calendar,
  Snowflake,
  Map,
  Users,
  Star,
  Award
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'First on the slopes',
    icon: Clock,
    color: 'bg-blue-500'
  },
  {
    id: 'powder-hunter',
    name: 'Powder Hunter',
    description: 'Found fresh powder',
    icon: Snowflake,
    color: 'bg-cyan-500'
  },
  {
    id: 'season-veteran',
    name: 'Season Veteran',
    description: '20+ days this season',
    icon: Calendar,
    color: 'bg-purple-500'
  },
  {
    id: 'peak-master',
    name: 'Peak Master',
    description: 'Reached summit',
    icon: Mountain,
    color: 'bg-indigo-500'
  },
  {
    id: 'resort-explorer',
    name: 'Resort Explorer',
    description: 'Visited 5+ resorts',
    icon: Map,
    color: 'bg-green-500'
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Made 10+ ski friends',
    icon: Users,
    color: 'bg-pink-500'
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Hit 50+ mph',
    icon: Star,
    color: 'bg-yellow-500'
  },
  {
    id: 'endurance-master',
    name: 'Endurance Master',
    description: '8+ hour session',
    icon: Award,
    color: 'bg-orange-500'
  }
];

interface AchievementsCardProps {
  achievements: string[];
}

export default function AchievementsCard({ achievements: earnedAchievements }: AchievementsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Achievements</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          const isEarned = earnedAchievements.includes(achievement.id);

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className={`relative p-4 rounded-lg ${
                isEarned
                  ? `${achievement.color} text-white`
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`p-2 rounded-full ${
                  isEarned ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-sm">{achievement.name}</h3>
                <p className="text-xs opacity-75">{achievement.description}</p>
                {!isEarned && (
                  <div className="absolute inset-0 bg-gray-900/10 dark:bg-gray-900/40 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Locked</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {earnedAchievements.length} of {achievements.length} achievements unlocked
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(earnedAchievements.length / achievements.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-blue-500 h-2 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
} 