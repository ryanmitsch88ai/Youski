"use client";

import { useState, useEffect } from "react";
import { Resort } from "@/types/resort";
import { useAuth } from "@/lib/hooks/useAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { MapPinIcon, FilterIcon, SearchIcon } from "lucide-react";
import dynamic from "next/dynamic";
import ResortCard from "./ResortCard";

// Dynamically import the map component to avoid SSR issues
const ResortMap = dynamic(() => import("./ResortMap"), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "expert";
type AmenityType = "nightSkiing" | "rentals" | "lessons" | "terrain_park" | "gondola";

interface Filters {
  difficulty: DifficultyLevel[];
  amenities: AmenityType[];
  maxDistance?: number;
}

export default function ResortFinder() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [filteredResorts, setFilteredResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    difficulty: [],
    amenities: [],
  });
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

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
    fetchResorts();
  }, []);

  useEffect(() => {
    // Apply filters and search whenever they change
    const filtered = resorts
      .filter((resort) => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            resort.name.toLowerCase().includes(query) ||
            resort.location.state.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .filter((resort) => {
        // Difficulty filter
        if (filters.difficulty.length > 0) {
          return filters.difficulty.some((level) => resort.difficulty[level] > 0);
        }
        return true;
      })
      .filter((resort) => {
        // Amenities filter
        if (filters.amenities.length > 0) {
          return filters.amenities.every((amenity) => resort.amenities[amenity]);
        }
        return true;
      });

    setFilteredResorts(filtered);
  }, [searchQuery, filters, resorts]);

  const fetchResorts = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch("/api/resorts");
      const data = await response.json();
      setResorts(data);
    } catch (err) {
      setError("Failed to load resorts");
      console.error("Error fetching resorts:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (type: keyof Filters, value: DifficultyLevel | AmenityType) => {
    setFilters((prev) => {
      const currentArray = prev[type] as (DifficultyLevel | AmenityType)[];
      return {
        ...prev,
        [type]: currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value],
      };
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 text-center p-4 font-medium">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filter Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search resorts by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            <FilterIcon className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </button>
          <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-1 rounded font-medium ${
                viewMode === "list" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-1 rounded font-medium ${
                viewMode === "map" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Map
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Difficulty Filters */}
              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Difficulty Level</h3>
                <div className="space-y-2">
                  {["beginner", "intermediate", "advanced", "expert"].map((level) => (
                    <label key={level} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.difficulty.includes(level as DifficultyLevel)}
                        onChange={() => toggleFilter("difficulty", level as DifficultyLevel)}
                        className="rounded text-blue-500 focus:ring-blue-500"
                      />
                      <span className="capitalize text-gray-700 font-medium">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities Filters */}
              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Amenities</h3>
                <div className="space-y-2">
                  {[
                    { id: "nightSkiing", label: "Night Skiing" },
                    { id: "rentals", label: "Equipment Rentals" },
                    { id: "lessons", label: "Ski Lessons" },
                    { id: "terrain_park", label: "Terrain Park" },
                    { id: "gondola", label: "Gondola" },
                  ].map(({ id, label }) => (
                    <label key={id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(id as AmenityType)}
                        onChange={() => toggleFilter("amenities", id as AmenityType)}
                        className="rounded text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 font-medium">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className={viewMode === "map" ? "h-[calc(100vh-200px)]" : ""}>
        {viewMode === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResorts.map((resort) => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        ) : (
          <ResortMap
            resorts={filteredResorts}
            userLocation={userLocation}
            center={userLocation || { lat: 39.8283, lng: -98.5795 }} // Default to center of US
          />
        )}
      </div>
    </div>
  );
} 