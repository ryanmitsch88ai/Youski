import type { Resort } from "@/types/resort";

export const resorts: Resort[] = [
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
  // ... all other resorts data
]; 