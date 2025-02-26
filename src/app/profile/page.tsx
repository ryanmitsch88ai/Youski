'use client';

import { useAuth } from "@/lib/hooks/useAuth";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPinIcon, CalendarIcon, TrophyIcon, UsersIcon, MountainIcon } from "lucide-react";
import EditProfileModal from "@/components/profile/EditProfileModal";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { motion } from "framer-motion";
import { Resort } from "@/types/resort";

type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
type TerrainPreference = "groomed" | "powder" | "park" | "backcountry";
type TimeAvailability = "half-day" | "full-day" | "custom";

interface SkiGoal {
  id: string;
  title: string;
  completed: boolean;
}

interface SkiTrip {
  resortId: string;
  resortName: string;
  date: string;
  imageUrl: string;
}

interface Friend {
  id: string;
  name: string;
  photoUrl: string;
  skillLevel: SkillLevel;
}

interface ProgressStats {
  daysSkied: number;
  highestAltitude: number;
  longestRun: number;
  totalVertical: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ProfilePage() {
  const { user, userProfile, updateProfile } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const [favoriteResorts, setFavoriteResorts] = useState<Resort[]>([]);
  const [skiGoals, setSkiGoals] = useState<SkiGoal[]>([]);
  const [recentTrips, setRecentTrips] = useState<SkiTrip[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [progressStats, setProgressStats] = useState<ProgressStats>({
    daysSkied: 0,
    highestAltitude: 0,
    longestRun: 0,
    totalVertical: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (userProfile) {
        // Fetch additional user data from Firebase
        // This is a placeholder - implement actual Firebase fetching
        setFavoriteResorts([]);
        setSkiGoals([
          { id: '1', title: 'Improve speed', completed: false },
          { id: '2', title: 'Try expert slopes', completed: false },
          { id: '3', title: 'Compete in a race', completed: false }
        ]);
        setRecentTrips([]);
        setFriends([]);
        setProgressStats({
          daysSkied: 15,
          highestAltitude: 11570,
          longestRun: 5.2,
          totalVertical: 125000
        });
        setInitialLoading(false);
      }
    };

    fetchUserData();
  }, [userProfile]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-700 dark:text-gray-300">Please sign in to view your profile.</p>
      </div>
    );
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Main Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <motion.div variants={item} className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="relative overflow-hidden bg-white dark:bg-dark-card rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5" />
            <div className="relative p-8">
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-blue-100 dark:ring-blue-900 shadow-lg"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl">
                      {user.displayName?.[0] || user.email?.[0] || '?'}
                    </div>
                  )}
                </motion.div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1">
                  {user.displayName || 'Skier'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Edit Profile
                </motion.button>
              </div>

              {/* Skill Level & Preferences */}
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">
                    Skill Level
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 capitalize">{userProfile?.skillLevel || 'Not set'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">
                    Preferred Terrain
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile?.preferences?.map((pref) => (
                      <motion.span
                        key={pref}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm capitalize shadow-sm"
                      >
                        {pref}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Stats Card */}
          <motion.div variants={item} className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Progress Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Days Skied</span>
                <AnimatedNumber
                  value={progressStats.daysSkied}
                  className="text-gray-900 dark:text-white font-semibold"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Highest Altitude</span>
                <AnimatedNumber
                  value={progressStats.highestAltitude}
                  unit="′"
                  className="text-gray-900 dark:text-white font-semibold"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Longest Run</span>
                <AnimatedNumber
                  value={progressStats.longestRun}
                  unit=" miles"
                  className="text-gray-900 dark:text-white font-semibold"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Vertical</span>
                <AnimatedNumber
                  value={progressStats.totalVertical}
                  unit="′"
                  className="text-gray-900 dark:text-white font-semibold"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Additional Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Favorite Resorts */}
          <motion.div variants={item} className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Favorite Resorts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteResorts.length > 0 ? (
                favoriteResorts.map((resort) => (
                  <motion.div
                    key={resort.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => router.push(`/resorts/${resort.id}`)}
                    className="flex items-center p-4 bg-gray-50 dark:bg-dark-accent rounded-lg cursor-pointer hover:shadow-md transition-all duration-200"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
                      <Image
                        src={resort.imageUrl}
                        alt={resort.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{resort.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{resort.location.state}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400 col-span-2">No favorite resorts added yet.</p>
              )}
            </div>
          </motion.div>

          {/* Skiing Goals */}
          <motion.div variants={item} className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skiing Goals</h2>
            <div className="space-y-4">
              {skiGoals.map((goal) => (
                <motion.div
                  key={goal.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => {
                      // Implement goal completion logic
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`ml-3 ${
                    goal.completed
                      ? 'line-through text-gray-400 dark:text-gray-600'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {goal.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Trips */}
          <motion.div variants={item} className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Trips</h2>
            {recentTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentTrips.map((trip) => (
                  <motion.div
                    key={`${trip.resortId}-${trip.date}`}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-4 bg-gray-50 dark:bg-dark-accent rounded-lg"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
                      <Image
                        src={trip.imageUrl}
                        alt={trip.resortName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{trip.resortName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(trip.date).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No recent trips recorded.</p>
            )}
          </motion.div>

          {/* Friends */}
          <motion.div variants={item} className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Ski Friends</h2>
            {friends.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {friends.map((friend) => (
                  <motion.div
                    key={friend.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-4 bg-gray-50 dark:bg-dark-accent rounded-lg"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={friend.photoUrl}
                        alt={friend.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{friend.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{friend.skillLevel}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No friends added yet.</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={userProfile!}
          onSave={updateProfile}
        />
      )}
    </motion.div>
  );
} 