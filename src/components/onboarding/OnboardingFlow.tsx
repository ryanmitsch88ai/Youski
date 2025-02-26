"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
type TerrainPreference = "groomed" | "powder" | "park" | "backcountry";
type TimeAvailability = "half-day" | "full-day" | "custom";

interface UserProfile {
  skillLevel: SkillLevel;
  preferences: TerrainPreference[];
  timeAvailability: TimeAvailability;
  customHours?: { start: string; end: string };
}

const defaultProfile: UserProfile = {
  skillLevel: "beginner",
  preferences: ["groomed"],
  timeAvailability: "full-day",
};

export default function OnboardingFlow() {
  const { user, loading, login, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const updateProfileData = async (key: keyof UserProfile, value: any) => {
    const newProfile = { ...profile, [key]: value };
    setProfile(newProfile);
    
    if (user && step === 3) {
      try {
        await updateProfile(newProfile);
        // TODO: Navigate to main app
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to You Ski</h1>
        <p className="text-gray-600 text-center mb-6">
          Please sign in to create your personalized skiing experience
        </p>
        <button
          onClick={login}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-1/3 h-2 rounded-full ${
                stepNumber <= step ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <h2 className="text-xl font-semibold text-center">
          {step === 1 && "What's your skill level?"}
          {step === 2 && "What type of terrain do you prefer?"}
          {step === 3 && "How long do you typically ski?"}
        </h2>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-2 gap-4">
          {(["beginner", "intermediate", "advanced", "expert"] as SkillLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => {
                updateProfileData("skillLevel", level);
                setStep(2);
              }}
              className={`p-4 rounded-lg border-2 ${
                profile.skillLevel === level
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="font-semibold capitalize">{level}</div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-2 gap-4">
          {(["groomed", "powder", "park", "backcountry"] as TerrainPreference[]).map((terrain) => (
            <button
              key={terrain}
              onClick={() => {
                const newPreferences = profile.preferences.includes(terrain)
                  ? profile.preferences.filter((p) => p !== terrain)
                  : [...profile.preferences, terrain];
                updateProfileData("preferences", newPreferences);
              }}
              className={`p-4 rounded-lg border-2 ${
                profile.preferences.includes(terrain)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="font-semibold capitalize">{terrain}</div>
            </button>
          ))}
          <div className="col-span-2 mt-4">
            <button
              onClick={() => setStep(3)}
              disabled={profile.preferences.length === 0}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          {(["half-day", "full-day", "custom"] as TimeAvailability[]).map((time) => (
            <button
              key={time}
              onClick={() => {
                updateProfileData("timeAvailability", time);
              }}
              className={`w-full p-4 rounded-lg border-2 ${
                profile.timeAvailability === time
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="font-semibold capitalize">{time.replace("-", " ")}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 