"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useRouter } from "next/navigation";

type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert" | "";
type TerrainPreference = "groomed" | "powder" | "park" | "backcountry";
type TimeAvailability = "half-day" | "full-day" | "custom" | "";

interface UserProfile {
  skillLevel: SkillLevel;
  preferences: TerrainPreference[];
  timeAvailability: TimeAvailability;
  customHours?: { start: string; end: string };
}

interface OnboardingFlowProps {
  onComplete?: () => void;
}

const defaultProfile: UserProfile = {
  skillLevel: "" as SkillLevel,
  preferences: [],
  timeAvailability: "" as TimeAvailability,
};

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const router = useRouter();
  const { user, loading, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfileData = async (key: keyof UserProfile, value: any) => {
    const newProfile = { ...profile, [key]: value };
    setProfile(newProfile);
    
    if (user && step === 3 && newProfile.skillLevel && newProfile.timeAvailability) {
      try {
        const validProfile = {
          ...newProfile,
          skillLevel: newProfile.skillLevel as Exclude<SkillLevel, "">,
          timeAvailability: newProfile.timeAvailability as Exclude<TimeAvailability, "">
        };
        await updateProfile(validProfile);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleComplete = async () => {
    try {
      setIsSaving(true);
      setError(null);
      if (profile.skillLevel && profile.timeAvailability) {
        const validProfile = {
          ...profile,
          skillLevel: profile.skillLevel as Exclude<SkillLevel, "">,
          timeAvailability: profile.timeAvailability as Exclude<TimeAvailability, "">
        };
        await updateProfile(validProfile);
        onComplete?.();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error instanceof Error ? error.message : 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-1/3 h-2 rounded-full ${
                stepNumber <= step ? "bg-blue-600" : "bg-gray-300"
              } transition-colors duration-300`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          {step === 1 && "What's your skill level?"}
          {step === 2 && "What type of terrain do you prefer?"}
          {step === 3 && "How long do you typically ski?"}
        </h2>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {(["beginner", "intermediate", "advanced", "expert"] as SkillLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => {
                  updateProfileData("skillLevel", level);
                }}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  profile.skillLevel === level
                    ? "border-blue-600 bg-blue-50/90 text-gray-900 shadow-md"
                    : "border-gray-300 hover:border-blue-400 text-gray-800 hover:bg-white/50"
                }`}
              >
                <div className="font-semibold capitalize">{level}</div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!profile.skillLevel}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
          >
            Continue
          </button>
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
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                profile.preferences.includes(terrain)
                  ? "border-blue-600 bg-blue-50/90 text-gray-900 shadow-md"
                  : "border-gray-300 hover:border-blue-400 text-gray-800 hover:bg-white/50"
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
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                profile.timeAvailability === time
                  ? "border-blue-600 bg-blue-50/90 text-gray-900 shadow-md"
                  : "border-gray-300 hover:border-blue-400 text-gray-800 hover:bg-white/50"
              }`}
            >
              <div className="font-semibold capitalize">{time.replace("-", " ")}</div>
            </button>
          ))}

          <button
            onClick={handleComplete}
            disabled={isSaving || !profile.timeAvailability}
            className="w-full mt-6 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 flex items-center justify-center"
          >
            {isSaving ? (
              <>
                <LoadingSpinner />
                <span className="ml-2">Saving...</span>
              </>
            ) : (
              "Complete Setup"
            )}
          </button>
        </div>
      )}
    </div>
  );
} 