"use client";

import { Resort } from "@/types/resort";
import Image from "next/image";
import Link from "next/link";
import { MapPinIcon, ThermometerIcon, CloudSnowIcon } from "lucide-react";

interface ResortCardProps {
  resort: Resort;
}

export default function ResortCard({ resort }: ResortCardProps) {
  const getDifficultyColor = (level: keyof Resort["difficulty"]) => {
    switch (level) {
      case "beginner":
        return "bg-green-500";
      case "intermediate":
        return "bg-blue-500";
      case "advanced":
        return "bg-red-500";
      case "expert":
        return "bg-black";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <Image
          src={resort.imageUrl}
          alt={resort.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{resort.name}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPinIcon className="w-4 h-4 mr-1" />
          <span className="text-sm">{resort.location.address}</span>
        </div>

        {/* Weather Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <ThermometerIcon className="w-4 h-4 mr-1 text-gray-600" />
            <span>{resort.weather.temperature}°F</span>
          </div>
          <div className="flex items-center">
            <CloudSnowIcon className="w-4 h-4 mr-1 text-gray-600" />
            <span>{resort.weather.snowDepth}″ Base</span>
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="mb-4">
          <div className="text-sm font-medium mb-1">Trail Difficulty</div>
          <div className="flex h-2 rounded-full overflow-hidden">
            {(["beginner", "intermediate", "advanced", "expert"] as const).map((level) => (
              resort.difficulty[level] > 0 && (
                <div
                  key={level}
                  className={`${getDifficultyColor(level)}`}
                  style={{ width: `${resort.difficulty[level]}%` }}
                />
              )
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(resort.amenities).map(([key, value]) => (
            value && (
              <span
                key={key}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
            )
          ))}
        </div>

        {/* Action Button */}
        <Link
          href={`/resorts/${resort.id}`}
          className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
} 