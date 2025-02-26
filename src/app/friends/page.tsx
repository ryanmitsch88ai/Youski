'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Users, UserPlus, Mail, Share2, Search, Trophy } from 'lucide-react';

interface FriendProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  stats: {
    daysSkied: number;
    totalVertical: number;
    longestRun: number;
  };
  achievements: string[];
}

const mockFriends: FriendProfile[] = [
  {
    uid: '1',
    displayName: 'Sarah Smith',
    photoURL: '/default-avatar.png',
    stats: {
      daysSkied: 25,
      totalVertical: 150000,
      longestRun: 5.2
    },
    achievements: ['early-bird', 'powder-hunter', 'season-veteran']
  },
  {
    uid: '2',
    displayName: 'Mike Johnson',
    photoURL: '/default-avatar.png',
    stats: {
      daysSkied: 18,
      totalVertical: 120000,
      longestRun: 4.8
    },
    achievements: ['peak-master', 'resort-explorer']
  }
];

export default function FriendsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <p className="text-lg text-gray-700 dark:text-gray-300">Please sign in to view your friends.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <LoadingSpinner />
      </div>
    );
  }

  const filteredFriends = mockFriends.filter(friend =>
    friend.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Ski Friends
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with fellow skiers and track their progress
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Add Friend
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share Profile
            </motion.button>
          </div>
        </div>

        {/* Friends List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFriends.map((friend) => (
            <motion.div
              key={friend.uid}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={friend.photoURL}
                    alt={friend.displayName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {friend.displayName}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {friend.stats.daysSkied} days skied
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {(friend.stats.totalVertical / 1000).toFixed(1)}k vertical ft
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {friend.stats.longestRun} mile longest run
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recent Achievements
                </h4>
                <div className="flex gap-2">
                  {friend.achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
                      title={achievement.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    >
                      <Trophy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFriends.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No friends found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try a different search term' : 'Start by adding some friends!'}
            </p>
          </div>
        )}
      </motion.div>

      {/* Invite Modal */}
      {showInviteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-dark-card rounded-2xl max-w-md w-full p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Invite Friends
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="friend@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Personal Message (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Hey! Join me on YouSki..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Send Invite
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 