'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import type { Resort } from '@/types/resort';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Dynamically import the SkiMap component with no SSR to avoid mapbox-gl issues
const SkiMap = dynamic(() => import('@/components/map/SkiMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <LoadingSpinner />
    </div>
  ),
});

export default function MapPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's location if they allow it
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    // Fetch resorts data
    const fetchResorts = async () => {
      try {
        const response = await fetch('/api/resorts');
        const data = await response.json();
        setResorts(data);
      } catch (error) {
        console.error('Error fetching resorts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResorts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  // Default to center of US if no user location
  const center = userLocation || { lat: 39.8283, lng: -98.5795 };

  return (
    <div className="w-full h-[calc(100vh-64px)]">
      <SkiMap
        resorts={resorts}
        userLocation={userLocation}
        center={center}
      />
    </div>
  );
} 