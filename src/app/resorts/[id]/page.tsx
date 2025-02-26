"use client";

import { useEffect, useState } from "react";
import { Resort } from "@/types/resort";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";
import { MapPinIcon, ThermometerIcon, CloudSnowIcon, ClockIcon } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the map component
const ResortMap = dynamic(() => import("@/components/resorts/ResortMap"), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

export default function ResortPage({ params }: { params: { id: string } }) {
  const [resort, setResort] = useState<Resort | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResort = async () => {
      try {
        const response = await fetch(`/api/resorts/${params.id}`);
        if (!response.ok) throw new Error("Resort not found");
        const data = await response.json();
        setResort(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load resort");
      } finally {
        setLoading(false);
      }
    };

    fetchResort();
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!resort) return <div className="text-center p-4">Resort not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-96 rounded-xl overflow-hidden mb-8">
        <Image
          src={resort.imageUrl}
          alt={resort.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{resort.name}</h1>
          <div className="flex items-center">
            <MapPinIcon className="w-5 h-5 mr-2" />
            <span>{resort.location.address}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-600">Base Depth</div>
              <div className="text-2xl font-bold">{resort.weather.snowDepth}″</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-600">Temperature</div>
              <div className="text-2xl font-bold">{resort.weather.temperature}°F</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-600">Lifts Open</div>
              <div className="text-2xl font-bold">{resort.stats.numberOfLifts}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-600">Runs Open</div>
              <div className="text-2xl font-bold">{resort.stats.numberOfRuns}</div>
            </div>
          </div>

          {/* Trail Map */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Trail Map</h2>
            <div className="h-[400px]">
              <ResortMap
                resorts={[resort]}
                userLocation={null}
                center={{ lat: resort.location.lat, lng: resort.location.lng }}
              />
            </div>
          </div>

          {/* Trail Difficulty Breakdown */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Trail Difficulty</h2>
            <div className="space-y-4">
              {(["beginner", "intermediate", "advanced", "expert"] as const).map((level) => (
                resort.difficulty[level] > 0 && (
                  <div key={level} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{level}</span>
                      <span>{resort.difficulty[level]}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          level === "beginner"
                            ? "bg-green-500"
                            : level === "intermediate"
                            ? "bg-blue-500"
                            : level === "advanced"
                            ? "bg-red-500"
                            : "bg-black"
                        }`}
                        style={{ width: `${resort.difficulty[level]}%` }}
                      />
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Operating Hours */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Operating Hours</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 mr-2 text-gray-600" />
                <span>{resort.operatingHours.opening} - {resort.operatingHours.closing}</span>
              </div>
              <div className={`text-sm ${resort.operatingHours.isOpen ? "text-green-600" : "text-red-600"}`}>
                {resort.operatingHours.isOpen ? "Currently Open" : "Currently Closed"}
              </div>
            </div>
          </div>

          {/* Weather */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Current Conditions</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <ThermometerIcon className="w-5 h-5 mr-2 text-gray-600" />
                <span>{resort.weather.temperature}°F</span>
              </div>
              <div className="flex items-center">
                <CloudSnowIcon className="w-5 h-5 mr-2 text-gray-600" />
                <div>
                  <div>{resort.weather.snowDepth}″ Base Depth</div>
                  <div className="text-sm text-gray-600">
                    {resort.weather.snowfall24h}″ Last 24h
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Resort Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Elevation</span>
                <span>{resort.stats.baseElevation}′</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Peak Elevation</span>
                <span>{resort.stats.peakElevation}′</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vertical Drop</span>
                <span>{resort.stats.verticalDrop}′</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Lifts</span>
                <span>{resort.stats.numberOfLifts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Runs</span>
                <span>{resort.stats.numberOfRuns}</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Amenities</h2>
            <div className="space-y-2">
              {Object.entries(resort.amenities).map(([key, value]) => (
                <div
                  key={key}
                  className={`flex items-center ${value ? "text-green-600" : "text-gray-400"}`}
                >
                  <span className="mr-2">{value ? "✓" : "×"}</span>
                  <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 