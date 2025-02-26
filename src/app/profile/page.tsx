'use client';

import { useAuth } from "@/lib/hooks/useAuth";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";

type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
type TerrainPreference = "groomed" | "powder" | "park" | "backcountry";
type TimeAvailability = "half-day" | "full-day" | "custom";

export default function ProfilePage() {
  const { user, userProfile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    skillLevel: "beginner" as SkillLevel,
    preferences: [] as TerrainPreference[],
    timeAvailability: "full-day" as TimeAvailability
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        skillLevel: (userProfile.skillLevel as SkillLevel) || "beginner",
        preferences: (userProfile.preferences as TerrainPreference[]) || [],
        timeAvailability: (userProfile.timeAvailability as TimeAvailability) || "full-day"
      });
      setInitialLoading(false);
    }
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

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceToggle = (preference: TerrainPreference) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header Section */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
                {user.displayName?.[0] || user.email?.[0] || '?'}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.displayName || 'Skier'}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Skill Level */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Skill Level</h2>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-4">
                    {(["beginner", "intermediate", "advanced", "expert"] as SkillLevel[]).map((level) => (
                      <button
                        key={level}
                        onClick={() => setFormData(prev => ({ ...prev, skillLevel: level }))}
                        className={`p-4 rounded-lg border-2 ${
                          formData.skillLevel === level
                            ? "border-blue-500 bg-blue-50 text-black"
                            : "border-gray-200 hover:border-blue-300 text-black"
                        }`}
                      >
                        <div className="font-semibold capitalize">{level}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 capitalize">{formData.skillLevel}</p>
                )}
              </div>

              {/* Terrain Preferences */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Terrain Preferences</h2>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-4">
                    {(["groomed", "powder", "park", "backcountry"] as TerrainPreference[]).map((terrain) => (
                      <button
                        key={terrain}
                        onClick={() => handlePreferenceToggle(terrain)}
                        className={`p-4 rounded-lg border-2 ${
                          formData.preferences.includes(terrain)
                            ? "border-blue-500 bg-blue-50 text-black"
                            : "border-gray-200 hover:border-blue-300 text-black"
                        }`}
                      >
                        <div className="font-semibold capitalize">{terrain}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {formData.preferences.map(pref => (
                      <span key={pref} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                        {pref}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Availability */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Time Availability</h2>
                {isEditing ? (
                  <div className="space-y-4">
                    {(["half-day", "full-day", "custom"] as TimeAvailability[]).map((time) => (
                      <button
                        key={time}
                        onClick={() => setFormData(prev => ({ ...prev, timeAvailability: time }))}
                        className={`w-full p-4 rounded-lg border-2 ${
                          formData.timeAvailability === time
                            ? "border-blue-500 bg-blue-50 text-black"
                            : "border-gray-200 hover:border-blue-300 text-black"
                        }`}
                      >
                        <div className="font-semibold capitalize">{time.replace("-", " ")}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 capitalize">{formData.timeAvailability.replace("-", " ")}</p>
                )}
              </div>

              {/* Edit/Save Buttons */}
              <div className="flex justify-end pt-4">
                {isEditing ? (
                  <div className="space-x-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 