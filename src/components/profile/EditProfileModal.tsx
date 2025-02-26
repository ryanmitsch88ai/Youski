'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { XIcon, UploadIcon } from 'lucide-react';
import type { UserProfile } from '@/lib/firebase/firebaseUtils';

type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
type TerrainPreference = "groomed" | "powder" | "park" | "backcountry";
type TimeAvailability = "half-day" | "full-day" | "custom";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => Promise<void>;
}

export default function EditProfileModal({ isOpen, onClose, profile, onSave }: EditProfileModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    displayName: profile.displayName,
    skillLevel: profile.skillLevel,
    preferences: profile.preferences,
    timeAvailability: profile.timeAvailability,
    goals: profile.goals || [],
    customHours: profile.customHours,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let photoURL = profile.photoURL;
      if (profileImage) {
        // Handle image upload to storage here
        // photoURL = await uploadProfileImage(profileImage);
      }

      await onSave({
        ...formData,
        photoURL,
        updatedAt: new Date(),
      });
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            {/* Profile Image */}
            <div className="mb-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={profileImage ? URL.createObjectURL(profileImage) : profile.photoURL || '/default-avatar.png'}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-800"
              >
                Change Profile Picture
              </button>
            </div>

            {/* Display Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Display Name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Skill Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Skill Level</label>
              <select
                value={formData.skillLevel}
                onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value as UserProfile['skillLevel'] })}
                className="w-full p-2 border rounded"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Terrain Preferences */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Terrain Preferences</label>
              <div className="flex flex-wrap gap-2">
                {['Groomed', 'Powder', 'Park', 'Trees', 'Moguls', 'Backcountry'].map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => {
                      const newPrefs = formData.preferences.includes(pref)
                        ? formData.preferences.filter((p) => p !== pref)
                        : [...formData.preferences, pref];
                      setFormData({ ...formData, preferences: newPrefs });
                    }}
                    className={`px-4 py-2 rounded ${
                      formData.preferences.includes(pref)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Availability */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Time Availability</label>
              <select
                value={formData.timeAvailability}
                onChange={(e) => setFormData({ ...formData, timeAvailability: e.target.value as UserProfile['timeAvailability'] })}
                className="w-full p-2 border rounded"
              >
                <option value="half-day">Half Day</option>
                <option value="full-day">Full Day</option>
                <option value="custom">Custom Hours</option>
              </select>
              {formData.timeAvailability === 'custom' && (
                <div className="mt-2 flex gap-4">
                  <input
                    type="time"
                    value={formData.customHours?.start || '09:00'}
                    onChange={(e) => setFormData({
                      ...formData,
                      customHours: {
                        start: e.target.value,
                        end: formData.customHours?.end || '17:00'
                      }
                    })}
                    className="p-2 border rounded"
                  />
                  <span className="self-center">to</span>
                  <input
                    type="time"
                    value={formData.customHours?.end || '17:00'}
                    onChange={(e) => setFormData({
                      ...formData,
                      customHours: {
                        start: formData.customHours?.start || '09:00',
                        end: e.target.value
                      }
                    })}
                    className="p-2 border rounded"
                  />
                </div>
              )}
            </div>

            {/* Goals */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Skiing Goals</label>
              <div className="space-y-2">
                {formData.goals.map((goal, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => {
                        const newGoals = [...formData.goals];
                        newGoals[index] = e.target.value;
                        setFormData({ ...formData, goals: newGoals });
                      }}
                      className="flex-1 p-2 border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newGoals = formData.goals.filter((_, i) => i !== index);
                        setFormData({ ...formData, goals: newGoals });
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, goals: [...formData.goals, ''] })}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Add Goal
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 