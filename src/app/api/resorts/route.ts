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
  },
  {
    id: "breckenridge",
    name: "Breckenridge Ski Resort",
    location: {
      lat: 39.4817,
      lng: -106.0384,
      address: "Breckenridge, Colorado 80424",
      state: "Colorado",
      country: "USA"
    },
    difficulty: {
      beginner: 14,
      intermediate: 31,
      advanced: 19,
      expert: 36
    },
    amenities: {
      nightSkiing: false,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 9600,
      peakElevation: 12998,
      verticalDrop: 3398,
      numberOfLifts: 34,
      numberOfRuns: 187
    },
    weather: {
      temperature: 25,
      condition: "Partly Cloudy",
      snowfall24h: 2,
      snowDepth: 68,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "8:30 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1612456225451-bb8d10d0131d?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.breckenridge.com",
    description: "One of North America's most popular resorts, featuring the highest chairlift on the continent."
  },
  {
    id: "jackson-hole",
    name: "Jackson Hole Mountain Resort",
    location: {
      lat: 43.5875,
      lng: -110.8276,
      address: "Teton Village, Wyoming 83025",
      state: "Wyoming",
      country: "USA"
    },
    difficulty: {
      beginner: 10,
      intermediate: 40,
      advanced: 30,
      expert: 20
    },
    amenities: {
      nightSkiing: false,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 6311,
      peakElevation: 10450,
      verticalDrop: 4139,
      numberOfLifts: 13,
      numberOfRuns: 131
    },
    weather: {
      temperature: 22,
      condition: "Snowing",
      snowfall24h: 6,
      snowDepth: 85,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1567599672391-17b31d92e431?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.jacksonhole.com",
    description: "Known for its steep terrain and deep powder snow."
  },
  {
    id: "steamboat",
    name: "Steamboat Ski Resort",
    location: {
      lat: 40.4572,
      lng: -106.8045,
      address: "Steamboat Springs, Colorado 80487",
      state: "Colorado",
      country: "USA"
    },
    difficulty: {
      beginner: 14,
      intermediate: 42,
      advanced: 44,
      expert: 0
    },
    amenities: {
      nightSkiing: true,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 6900,
      peakElevation: 10568,
      verticalDrop: 3668,
      numberOfLifts: 18,
      numberOfRuns: 169
    },
    weather: {
      temperature: 28,
      condition: "Sunny",
      snowfall24h: 0,
      snowDepth: 71,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "8:30 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1579804037586-39d39dad90bf?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.steamboat.com",
    description: "Famous for its Champagne Powder® snow and western atmosphere."
  },
  {
    id: "killington",
    name: "Killington Resort",
    location: {
      lat: 43.6045,
      lng: -72.8201,
      address: "Killington, Vermont 05751",
      state: "Vermont",
      country: "USA"
    },
    difficulty: {
      beginner: 28,
      intermediate: 33,
      advanced: 24,
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
      baseElevation: 1165,
      peakElevation: 4241,
      verticalDrop: 3076,
      numberOfLifts: 22,
      numberOfRuns: 155
    },
    weather: {
      temperature: 18,
      condition: "Cloudy",
      snowfall24h: 3,
      snowDepth: 42,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1580933884561-a5ca843e1d7c?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.killington.com",
    description: "The largest ski resort in Eastern North America, known as 'The Beast of the East'."
  },
  {
    id: "snowbird",
    name: "Snowbird",
    location: {
      lat: 40.5830,
      lng: -111.6556,
      address: "Snowbird, Utah 84092",
      state: "Utah",
      country: "USA"
    },
    difficulty: {
      beginner: 27,
      intermediate: 38,
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
      baseElevation: 7760,
      peakElevation: 11000,
      verticalDrop: 3240,
      numberOfLifts: 14,
      numberOfRuns: 169
    },
    weather: {
      temperature: 30,
      condition: "Snowing",
      snowfall24h: 8,
      snowDepth: 92,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1548824505-a6646e3a2160?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.snowbird.com",
    description: "Known for its deep powder snow and steep terrain."
  },
  {
    id: "big-sky",
    name: "Big Sky Resort",
    location: {
      lat: 45.2862,
      lng: -111.4015,
      address: "Big Sky, Montana 59716",
      state: "Montana",
      country: "USA"
    },
    difficulty: {
      beginner: 15,
      intermediate: 25,
      advanced: 42,
      expert: 18
    },
    amenities: {
      nightSkiing: false,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 6800,
      peakElevation: 11166,
      verticalDrop: 4366,
      numberOfLifts: 39,
      numberOfRuns: 317
    },
    weather: {
      temperature: 20,
      condition: "Sunny",
      snowfall24h: 0,
      snowDepth: 75,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1564524208017-8e4011c278c4?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.bigskyresort.com",
    description: "The Biggest Skiing in America with 5,850 acres of skiable terrain."
  },
  {
    id: "squaw-valley",
    name: "Palisades Tahoe",
    location: {
      lat: 39.1969,
      lng: -120.2358,
      address: "Olympic Valley, California 96146",
      state: "California",
      country: "USA"
    },
    difficulty: {
      beginner: 25,
      intermediate: 45,
      advanced: 20,
      expert: 10
    },
    amenities: {
      nightSkiing: true,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 6200,
      peakElevation: 9050,
      verticalDrop: 2850,
      numberOfLifts: 29,
      numberOfRuns: 170
    },
    weather: {
      temperature: 38,
      condition: "Partly Cloudy",
      snowfall24h: 0,
      snowDepth: 82,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1605377347958-e8b5cb026cc6?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.palisadestahoe.com",
    description: "Host of the 1960 Winter Olympics, known for its challenging terrain and stunning views of Lake Tahoe."
  },
  {
    id: "sun-valley",
    name: "Sun Valley Resort",
    location: {
      lat: 43.6959,
      lng: -114.3513,
      address: "Sun Valley, Idaho 83353",
      state: "Idaho",
      country: "USA"
    },
    difficulty: {
      beginner: 36,
      intermediate: 42,
      advanced: 17,
      expert: 5
    },
    amenities: {
      nightSkiing: false,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 5750,
      peakElevation: 9150,
      verticalDrop: 3400,
      numberOfLifts: 18,
      numberOfRuns: 121
    },
    weather: {
      temperature: 32,
      condition: "Sunny",
      snowfall24h: 0,
      snowDepth: 55,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1583191017486-3a3baf4d622a?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.sunvalley.com",
    description: "America's first destination ski resort, known for its perfect grooming and sunny days."
  },
  {
    id: "stowe",
    name: "Stowe Mountain Resort",
    location: {
      lat: 44.5303,
      lng: -72.7814,
      address: "Stowe, Vermont 05672",
      state: "Vermont",
      country: "USA"
    },
    difficulty: {
      beginner: 16,
      intermediate: 59,
      advanced: 16,
      expert: 9
    },
    amenities: {
      nightSkiing: false,
      rentals: true,
      lessons: true,
      terrain_park: true,
      gondola: true
    },
    stats: {
      baseElevation: 1559,
      peakElevation: 3719,
      verticalDrop: 2160,
      numberOfLifts: 13,
      numberOfRuns: 116
    },
    weather: {
      temperature: 15,
      condition: "Snowing",
      snowfall24h: 4,
      snowDepth: 48,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "8:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1609963994044-a214e6c6a7af?q=80&w=2574&auto=format&fit=crop",
    websiteUrl: "https://www.stowe.com",
    description: "The Ski Capital of the East, combining New England charm with world-class terrain."
  }
];

export async function GET() {
  // TODO: Replace with actual database query
  return NextResponse.json(resorts);
} 