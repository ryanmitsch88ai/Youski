"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomePopupProps {
  onGetStarted: () => void;
  userName?: string;
}

export default function WelcomePopup({ onGetStarted, userName }: WelcomePopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleGetStarted = () => {
    setIsVisible(false);
    onGetStarted();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              Welcome to You Ski{userName ? `, ${userName}` : ""}! 🎿
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Ready to personalize your skiing experience? We&apos;ll ask you a few quick questions to help customize your journey.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105"
              >
                Let&apos;s Get Started
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 