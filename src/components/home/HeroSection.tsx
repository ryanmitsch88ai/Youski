'use client';

import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import ResortFinder from "@/components/resorts/ResortFinder";

export default function HeroSection() {
  const handleScroll = () => {
    const searchSection = document.getElementById('resort-finder');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative h-[70vh]">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <Image
            src="/mountain-hero.jpg"
            alt="Snowy mountain peaks at sunset"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Subtle gradient overlay that doesn't interfere with image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center h-full text-center px-4">
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Find Your Perfect Slope
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl drop-shadow-md">
              Discover the best ski resorts tailored to your preferences and skill level
            </p>
            
            {/* Scroll Indicator */}
            <button 
              onClick={handleScroll}
              className="animate-bounce hover:scale-110 transition-transform mt-8"
            >
              <ChevronDown className="w-10 h-10 text-white drop-shadow-lg" />
            </button>
          </div>
        </div>
      </section>

      {/* Resort Finder Section */}
      <section id="resort-finder" className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-dark-bg dark:to-dark-bg/95">
        <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
          <ResortFinder />
        </div>
      </section>
    </>
  );
} 