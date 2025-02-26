"use client";

import { Resort } from "@/types/resort";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPinIcon, CloudSnowIcon, ThermometerIcon, CloudIcon, SunIcon, CloudRainIcon } from "lucide-react";

interface ResortCardProps {
  resort: Resort;
}

export default function ResortCard({ resort }: ResortCardProps) {
  const router = useRouter();

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

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <SunIcon className="w-4 h-4 text-yellow-500" />;
      case "cloudy":
        return <CloudIcon className="w-4 h-4 text-gray-500" />;
      case "snowing":
        return <CloudSnowIcon className="w-4 h-4 text-blue-500" />;
      case "raining":
        return <CloudRainIcon className="w-4 h-4 text-blue-400" />;
      default:
        return <CloudIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div 
      onClick={() => router.push(`/resorts/${resort.id}`)}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="relative h-48 bg-gray-100">
        <Image
          src={resort.imageUrl}
          alt={`${resort.name} ski resort`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
          loading="eager"
          onError={(e) => {
            // Fallback to a default image if the main image fails to load
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=2576&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-1 text-white">
            {getWeatherIcon(resort.weather.condition)}
            <span className="text-sm font-medium">{resort.weather.condition}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{resort.name}</h3>
        <div className="flex items-center text-gray-700 mb-4">
          <MapPinIcon className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{resort.location.address}</span>
        </div>

        {/* Weather Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center text-gray-800">
            <ThermometerIcon className="w-4 h-4 mr-1 text-gray-700" />
            <span className="font-medium">{resort.weather.temperature}°F</span>
          </div>
          <div className="flex items-center gap-1 text-gray-800">
            <CloudSnowIcon className="w-4 h-4 mr-1 text-gray-700" />
            <span className="font-medium">{resort.weather.snowDepth}″ Base</span>
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-900 mb-1">Trail Difficulty</div>
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
        <div className="flex flex-wrap gap-2">
          {Object.entries(resort.amenities).map(([key, value]) => (
            value && (
              <span
                key={key}
                className="px-2 py-1 bg-blue-100 text-blue-900 text-xs font-medium rounded-full"
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
            )
          ))}
        </div>
      </div>
    </div>
  );
} 