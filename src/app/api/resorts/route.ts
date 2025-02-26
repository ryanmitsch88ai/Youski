import { NextResponse } from "next/server";
import type { Resort } from "@/types/resort";

// Example resort data - Replace with actual data from your database
const resorts: Resort[] = [
  {
    id: "vail",
    name: "Vail Mountain Resort",
    location: {
      lat: 39.6403,
      lng: -106.3742,
      address: "Vail, Colorado 81657",
      state: "Colorado",
      country: "USA"
    },
    difficulty: {
      beginner: 18,
      intermediate: 29,
      advanced: 30,
      expert: 23
    },
    amenities: {
      nightSkiing: false,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 8120,
      peakElevation: 11570,
      verticalDrop: 3450,
      numberOfLifts: 31,
      numberOfRuns: 195
    },
    weather: {
      temperature: 28,
      condition: "Sunny",
      snowfall24h: 0,
      snowDepth: 45,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "8:30 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1544466387-1d5321c24bfd?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.vail.com",
    description: "Vail Mountain Resort is one of the largest ski resorts in North America."
  },
  {
    id: "aspen",
    name: "Aspen Snowmass",
    location: {
      lat: 39.2084,
      lng: -106.9490,
      address: "Aspen, Colorado 81611",
      state: "Colorado",
      country: "USA"
    },
    difficulty: {
      beginner: 25,
      intermediate: 35,
      advanced: 25,
      expert: 15
    },
    amenities: {
      nightSkiing: true,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 8000,
      peakElevation: 12510,
      verticalDrop: 4406,
      numberOfLifts: 40,
      numberOfRuns: 336
    },
    weather: {
      temperature: 30,
      condition: "Partly Cloudy",
      snowfall24h: 2,
      snowDepth: 52,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.aspensnowmass.com",
    description: "Four unique mountains combined into one amazing resort experience."
  },
  {
    id: "park-city",
    name: "Park City Mountain Resort",
    location: {
      lat: 40.6461,
      lng: -111.4980,
      address: "Park City, Utah 84060",
      state: "Utah",
      country: "USA"
    },
    difficulty: {
      beginner: 20,
      intermediate: 40,
      advanced: 28,
      expert: 12
    },
    amenities: {
      nightSkiing: true,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 6800,
      peakElevation: 10026,
      verticalDrop: 3226,
      numberOfLifts: 41,
      numberOfRuns: 348
    },
    weather: {
      temperature: 32,
      condition: "Snowing",
      snowfall24h: 4,
      snowDepth: 58,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=2576&auto=format&fit=crop",
    websiteUrl: "https://www.parkcitymountain.com",
    description: "The largest ski resort in the United States."
  },
  {
    id: "mammoth",
    name: "Mammoth Mountain",
    location: {
      lat: 37.6308,
      lng: -119.0326,
      address: "Mammoth Lakes, California 93546",
      state: "California",
      country: "USA"
    },
    difficulty: {
      beginner: 25,
      intermediate: 40,
      advanced: 20,
      expert: 15
    },
    amenities: {
      nightSkiing: false,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 7953,
      peakElevation: 11053,
      verticalDrop: 3100,
      numberOfLifts: 28,
      numberOfRuns: 150
    },
    weather: {
      temperature: 35,
      condition: "Sunny",
      snowfall24h: 0,
      snowDepth: 65,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "8:30 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1605540436034-45618a89fa4f?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.mammothmountain.com",
    description: "California's highest ski resort and one of the longest seasons in North America."
  }
];

export async function GET() {
  // TODO: Replace with actual database query
  return NextResponse.json(resorts);
} 