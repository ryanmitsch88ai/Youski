"use client";

import React from 'react';

interface WelcomePopupProps {
  onGetStarted: () => void;
  userName?: string;
}

export default function WelcomePopup({ onGetStarted, userName }: WelcomePopupProps) {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-xl text-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        Welcome{userName ? `, ${userName}` : ''}!
      </h1>
      <p className="text-gray-700 text-lg mb-8 leading-relaxed">
        Let&apos;s personalize your skiing experience. We&apos;ll ask you a few questions to help find the perfect slopes for you.
      </p>
      <button
        onClick={onGetStarted}
        className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        Get Started
      </button>
    </div>
  );
} 