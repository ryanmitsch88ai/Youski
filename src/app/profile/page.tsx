'use client';

import { useAuth } from "@/lib/hooks/useAuth";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPinIcon, CalendarIcon, TrophyIcon, UsersIcon, MountainIcon } from "lucide-react";
import EditProfileModal from "@/components/profile/EditProfileModal";
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
        <p className="text-lg text-gray-700">Please sign in to view your profile.</p>
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-blue-100">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-4xl">
                    {user.displayName?.[0] || user.email?.[0] || '?'}
                  </div>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
                {user.displayName || 'Skier'}
              </h1>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>

            {/* Skill Level & Preferences */}
            <div className="mt-8 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                  Skill Level
                </h3>
                <p className="text-gray-700 capitalize">{userProfile?.skillLevel || 'Not set'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                  Preferred Terrain
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile?.preferences?.map((pref) => (
                    <span key={pref} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize">
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Stats Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Progress Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Days Skied</span>
                <span className="text-gray-900 font-semibold">{progressStats.daysSkied}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Highest Altitude</span>
                <span className="text-gray-900 font-semibold">{progressStats.highestAltitude}′</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Longest Run</span>
                <span className="text-gray-900 font-semibold">{progressStats.longestRun} miles</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Vertical</span>
                <span className="text-gray-900 font-semibold">{progressStats.totalVertical}′</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Additional Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Favorite Resorts */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Favorite Resorts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteResorts.length > 0 ? (
                favoriteResorts.map((resort) => (
                  <div
                    key={resort.id}
                    onClick={() => router.push(`/resorts/${resort.id}`)}
                    className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
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
                      <h3 className="font-semibold text-gray-900">{resort.name}</h3>
                      <p className="text-sm text-gray-600">{resort.location.state}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 col-span-2">No favorite resorts added yet.</p>
              )}
            </div>
          </div>

          {/* Skiing Goals */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Skiing Goals</h2>
            <div className="space-y-4">
              {skiGoals.map((goal) => (
                <div key={goal.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => {
                      // Implement goal completion logic
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`ml-3 ${goal.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {goal.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Trips */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Trips</h2>
            {recentTrips.length > 0 ? (
              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div
                    key={`${trip.resortId}-${trip.date}`}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
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
                      <h3 className="font-semibold text-gray-900">{trip.resortName}</h3>
                      <p className="text-sm text-gray-600">{new Date(trip.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              </div>
            ) : (
              <p className="text-gray-600">No recent trips recorded.</p>
            )}
          </div>

          {/* Friends */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ski Friends</h2>
            {friends.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={friend.photoUrl}
                        alt={friend.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{friend.skillLevel}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No friends added yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userProfile={userProfile}
          onSave={updateProfile}
        />
      )}
    </div>
  );
} 