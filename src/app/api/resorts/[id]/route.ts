import { NextResponse } from "next/server";
import type { Resort } from "@/types/resort";

// This would typically come from a database
const resorts: Resort[] = [
  {
    id: "vail",
    name: "Vail Mountain Resort",
    location: {
      lat: 39.6403,
      lng: -106.3742,
      address: "Vail, Colorado 81657",
      state: "Colorado",
      country: "United States"
    },
    difficulty: {
      beginner: 18,
      intermediate: 29,
      advanced: 53,
      expert: 0
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
    imageUrl: "https://images.unsplash.com/photo-1605540436563-5bca919ae766",
    websiteUrl: "https://www.vail.com",
    description: "Vail Mountain Resort is one of the largest ski resorts in North America, featuring world-class skiing and snowboarding across 5,317 acres of terrain."
  },
  {
    id: "aspen",
    name: "Aspen Snowmass",
    location: {
      lat: 39.2084,
      lng: -106.9490,
      address: "Snowmass Village, Colorado 81615",
      state: "Colorado",
      country: "United States"
    },
    difficulty: {
      beginner: 5,
      intermediate: 48,
      advanced: 47,
      expert: 0
    },
    amenities: {
      nightSkiing: false,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 8104,
      peakElevation: 12510,
      verticalDrop: 4406,
      numberOfLifts: 20,
      numberOfRuns: 98
    },
    weather: {
      temperature: 30,
      condition: "Partly Cloudy",
      snowfall24h: 2,
      snowDepth: 38,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "9:00 AM",
      closing: "3:30 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1544466387-1d5321c24bfd",
    websiteUrl: "https://www.aspensnowmass.com",
    description: "Aspen Snowmass is a world-renowned ski resort featuring four unique mountains, offering diverse terrain for all skill levels."
  }
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const resort = resorts.find(r => r.id === params.id);
  
  if (!resort) {
    return new NextResponse("Resort not found", { status: 404 });
  }

  return NextResponse.json(resort);
} 