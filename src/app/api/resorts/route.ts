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
    imageUrl: "https://source.unsplash.com/featured/?ski,vail",
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
    imageUrl: "https://source.unsplash.com/featured/?ski,aspen",
    websiteUrl: "https://www.aspensnowmass.com",
    description: "Four unique mountains combined into one amazing resort experience."
  }
];

export async function GET() {
  // TODO: Replace with actual database query
  return NextResponse.json(resorts);
} 