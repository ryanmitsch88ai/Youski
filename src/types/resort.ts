export interface Resort {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    state: string;
    country: string;
  };
  difficulty: {
    beginner: number; // Percentage of beginner runs
    intermediate: number;
    advanced: number;
    expert: number;
  };
  amenities: {
    nightSkiing: boolean;
    rentals: boolean;
    lessons: boolean;
    terrain_park: boolean;
    gondola: boolean;
  };
  stats: {
    baseElevation: number;
    peakElevation: number;
    verticalDrop: number;
    numberOfLifts: number;
    numberOfRuns: number;
  };
  weather: {
    temperature: number;
    condition: string;
    snowfall24h: number;
    snowDepth: number;
    lastUpdated: string;
  };
  operatingHours: {
    opening: string;
    closing: string;
    isOpen: boolean;
  };
  imageUrl: string;
  websiteUrl: string;
  description: string;
} 