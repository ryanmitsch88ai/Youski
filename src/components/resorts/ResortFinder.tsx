"use client";

import { useState, useEffect } from "react";
import { Resort } from "@/types/resort";
import { useAuth } from "@/lib/hooks/useAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { MapPinIcon, FilterIcon, SearchIcon } from "lucide-react";
import dynamic from "next/dynamic";
import ResortCard from "./ResortCard";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
  snowDepth: {
    min: number;
    max: number;
  };
}

type SortOption = "name" | "snowfall" | "rating";

export default function ResortFinder() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [filteredResorts, setFilteredResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [filters, setFilters] = useState<Filters>({
    difficulty: [],
    amenities: [],
    snowDepth: {
      min: 0,
      max: 200,
    },
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
    let filtered = resorts
      .filter((resort) => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            resort.name.toLowerCase().includes(query) ||
            resort.location.state.toLowerCase().includes(query) ||
            resort.location.country.toLowerCase().includes(query)
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
      })
      .filter((resort) => {
        // Snow depth filter
        return (
          resort.weather.snowDepth >= filters.snowDepth.min &&
          resort.weather.snowDepth <= filters.snowDepth.max
        );
      });

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case "snowfall":
          return b.weather.snowDepth - a.weather.snowDepth;
        case "rating":
          // You would need to add a rating field to your Resort type
          return 0;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredResorts(filtered);
  }, [searchQuery, filters, resorts, sortBy]);

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
    <div className="space-y-8">
      {/* Search Section */}
      <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-lg rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resorts..."
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-accent border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-dark-bg outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg font-medium transition-colors ${
                showFilters
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FilterIcon className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="snowfall">Sort by Snowfall</option>
              <option value="rating">Sort by Rating</option>
            </select>
            <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-1 rounded font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-4 py-1 rounded font-medium transition-colors ${
                  viewMode === "map"
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resorts Grid with Fade In Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResorts.slice(0, 3).map((resort) => (
          <motion.div
            key={resort.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ResortCard resort={resort} />
          </motion.div>
        ))}
      </div>

      {/* Remaining Resorts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {filteredResorts.slice(3).map((resort, index) => (
          <motion.div
            key={resort.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ResortCard resort={resort} />
          </motion.div>
        ))}
      </div>

      {/* Show More Button */}
      {filteredResorts.length > 3 && (
        <div className="text-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
          >
            View More Resorts
            <ChevronDown className="ml-2 h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
} 