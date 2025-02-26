'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { XIcon, Camera, Trophy, Mountain, Calendar, Clock, Trash2 } from 'lucide-react';
import type { UserProfile } from '@/lib/firebase/firebaseUtils';
import { motion, AnimatePresence } from 'framer-motion';

type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
type TerrainPreference = "groomed" | "powder" | "park" | "backcountry";
type TimeAvailability = "half-day" | "full-day" | "custom";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => Promise<void>;
}

const achievementBadges = [
  { id: 'early-bird', name: 'Early Bird', icon: Clock, description: 'First on the slopes' },
  { id: 'powder-hunter', name: 'Powder Hunter', icon: Mountain, description: 'Found fresh powder' },
  { id: 'season-veteran', name: 'Season Veteran', icon: Calendar, description: '20+ days this season' },
  { id: 'peak-master', name: 'Peak Master', icon: Trophy, description: 'Reached summit' },
];

export default function EditProfileModal({ isOpen, onClose, profile, onSave }: EditProfileModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    displayName: profile.displayName,
    skillLevel: profile.skillLevel,
    preferences: profile.preferences,
    timeAvailability: profile.timeAvailability,
    goals: profile.goals || [],
    customHours: profile.customHours,
    achievements: profile.achievements || [],
  });
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ['Basic Info', 'Preferences', 'Goals', 'Achievements'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Profile Image */}
            <div className="relative w-32 h-32 mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-blue-100 dark:ring-blue-900 shadow-lg"
              >
                <Image
                  src={imagePreview || profile.photoURL || '/default-avatar.png'}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </motion.div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Display Name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Skill Level */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Skill Level</label>
              <div className="grid grid-cols-2 gap-3">
                {(["beginner", "intermediate", "advanced", "expert"] as SkillLevel[]).map((level) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setFormData({ ...formData, skillLevel: level })}
                    className={`p-3 rounded-lg transition-all ${
                      formData.skillLevel === level
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="font-medium capitalize">{level}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Terrain Preferences */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Terrain Preferences</label>
              <div className="grid grid-cols-2 gap-3">
                {['Groomed', 'Powder', 'Park', 'Trees', 'Moguls', 'Backcountry'].map((pref) => (
                  <motion.button
                    key={pref}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => {
                      const newPrefs = formData.preferences.includes(pref)
                        ? formData.preferences.filter((p) => p !== pref)
                        : [...formData.preferences, pref];
                      setFormData({ ...formData, preferences: newPrefs });
                    }}
                    className={`p-3 rounded-lg transition-all ${
                      formData.preferences.includes(pref)
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {pref}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Time Availability */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Time Availability</label>
              <div className="space-y-3">
                {(["half-day", "full-day", "custom"] as TimeAvailability[]).map((time) => (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setFormData({ ...formData, timeAvailability: time })}
                    className={`w-full p-3 rounded-lg transition-all ${
                      formData.timeAvailability === time
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="font-medium capitalize">{time.replace('-', ' ')}</span>
                  </motion.button>
                ))}
              </div>
              {formData.timeAvailability === 'custom' && (
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">Start Time</label>
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
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">End Time</label>
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
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Skiing Goals</label>
            <div className="space-y-3">
              {formData.goals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => {
                      const newGoals = [...formData.goals];
                      newGoals[index] = e.target.value;
                      setFormData({ ...formData, goals: newGoals });
                    }}
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your goal..."
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => {
                      const newGoals = formData.goals.filter((_, i) => i !== index);
                      setFormData({ ...formData, goals: newGoals });
                    }}
                    className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setFormData({ ...formData, goals: [...formData.goals, ''] })}
                className="w-full p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
              >
                Add New Goal
              </motion.button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Achievements</label>
            <div className="grid grid-cols-2 gap-3">
              {achievementBadges.map((badge) => {
                const Icon = badge.icon;
                const isEarned = formData.achievements?.includes(badge.id);
                return (
                  <motion.button
                    key={badge.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => {
                      const newAchievements = isEarned
                        ? formData.achievements.filter(id => id !== badge.id)
                        : [...(formData.achievements || []), badge.id];
                      setFormData({ ...formData, achievements: newAchievements });
                    }}
                    className={`p-4 rounded-lg transition-all ${
                      isEarned
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon className="w-6 h-6" />
                      <span className="font-medium">{badge.name}</span>
                      <span className="text-xs opacity-75">{badge.description}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="bg-white dark:bg-dark-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl"
        >
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-between items-center mb-6">
              {sections.map((section, index) => (
                <button
                  key={section}
                  onClick={() => setCurrentSection(index)}
                  className="flex flex-col items-center"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-colors ${
                    currentSection === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-dark-accent text-gray-600 dark:text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-sm ${
                    currentSection === index
                      ? 'text-blue-500 font-medium'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {section}
                  </span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {renderSection()}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  className={`px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors ${
                    currentSection === 0 ? 'invisible' : ''
                  }`}
                >
                  Previous
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type={currentSection === sections.length - 1 ? 'submit' : 'button'}
                  onClick={() => {
                    if (currentSection < sections.length - 1) {
                      setCurrentSection(currentSection + 1);
                    }
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : currentSection === sections.length - 1 ? 'Save Changes' : 'Next'}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 