import type { Resort } from "@/types/resort";

export const resorts: Resort[] = [
  {
    id: "vail",
    name: "Vail Mountain Resort",
    location: {
      lat: 39.6061,
      lng: -106.3741,
      address: "Vail, Colorado",
      state: "Colorado",
      country: "USA"
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
      lastUpdated: "2024-02-20T08:00:00Z"
    },
    operatingHours: {
      opening: "08:30",
      closing: "16:00",
      isOpen: true
    },
    imageUrl: "/resorts/vail-mountain-resort.jpg",
    websiteUrl: "https://www.vail.com",
    description: "One of the largest ski resorts in North America, known for its legendary Back Bowls and upscale amenities."
  },
  {
    id: "aspen",
    name: "Aspen Snowmass",
    location: {
      lat: 39.1911,
      lng: -106.8317,
      address: "Aspen, Colorado",
      state: "Colorado",
      country: "USA"
    },
    difficulty: {
      beginner: 10,
      intermediate: 44,
      advanced: 46,
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
      baseElevation: 8000,
      peakElevation: 12510,
      verticalDrop: 4406,
      numberOfLifts: 40,
      numberOfRuns: 362
    },
    weather: {
      temperature: 30,
      condition: "Partly Cloudy",
      snowfall24h: 2,
      snowDepth: 52,
      lastUpdated: "2024-02-20T08:00:00Z"
    },
    operatingHours: {
      opening: "09:00",
      closing: "15:30",
      isOpen: true
    },
    imageUrl: "/resorts/aspen-snowmass.jpg",
    websiteUrl: "https://www.aspensnowmass.com",
    description: "Four unique mountains offering diverse terrain and a world-class resort experience."
  },
  {
    id: "park-city",
    name: "Park City Mountain Resort",
    location: {
      lat: 40.6514,
      lng: -111.5089,
      address: "Park City, Utah",
      state: "Utah",
      country: "USA"
    },
    difficulty: {
      beginner: 17,
      intermediate: 52,
      advanced: 31,
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
      baseElevation: 6800,
      peakElevation: 10026,
      verticalDrop: 3226,
      numberOfLifts: 41,
      numberOfRuns: 341
    },
    weather: {
      temperature: 32,
      condition: "Snowing",
      snowfall24h: 4,
      snowDepth: 65,
      lastUpdated: "2024-02-20T08:00:00Z"
    },
    operatingHours: {
      opening: "09:00",
      closing: "16:00",
      isOpen: true
    },
    imageUrl: "/resorts/park-city-mountain-resort.jpg",
    websiteUrl: "https://www.parkcitymountain.com",
    description: "The largest ski resort in the United States, offering diverse terrain and historic charm."
  },
  {
    id: "mammoth",
    name: "Mammoth Mountain",
    location: {
      lat: 37.6308,
      lng: -119.0326,
      address: "Mammoth Lakes, California",
      state: "California",
      country: "USA"
    },
    difficulty: {
      beginner: 25,
      intermediate: 40,
      advanced: 35,
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
      snowDepth: 85,
      lastUpdated: "2024-02-20T08:00:00Z"
    },
    operatingHours: {
      opening: "08:30",
      closing: "16:00",
      isOpen: true
    },
    imageUrl: "/resorts/mammoth-mountain.jpg",
    websiteUrl: "https://www.mammothmountain.com",
    description: "California's highest ski resort, known for its long season and exceptional terrain parks."
  },
  {
    id: "jackson-hole",
    name: "Jackson Hole Mountain Resort",
    location: {
      lat: 43.5875,
      lng: -110.8279,
      address: "Teton Village, Wyoming",
      state: "Wyoming",
      country: "USA"
    },
    difficulty: {
      beginner: 10,
      intermediate: 40,
      advanced: 50,
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
      baseElevation: 6311,
      peakElevation: 10450,
      verticalDrop: 4139,
      numberOfLifts: 13,
      numberOfRuns: 131
    },
    weather: {
      temperature: 25,
      condition: "Snowing",
      snowfall24h: 6,
      snowDepth: 92,
      lastUpdated: "2024-02-20T08:00:00Z"
    },
    operatingHours: {
      opening: "09:00",
      closing: "16:00",
      isOpen: true
    },
    imageUrl: "/resorts/jackson-hole-mountain-resort.jpg",
    websiteUrl: "https://www.jacksonhole.com",
    description: "Legendary steep terrain and deep powder, featuring the iconic Corbet's Couloir."
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
      advanced: 32,
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
      baseElevation: 6900,
      peakElevation: 10568,
      verticalDrop: 3668,
      numberOfLifts: 18,
      numberOfRuns: 169
    },
    weather: {
      temperature: 28,
      condition: "Cloudy",
      snowfall24h: 2,
      snowDepth: 75,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "08:30",
      closing: "16:00",
      isOpen: true
    },
    imageUrl: "/resorts/steamboat-ski-resort.jpg",
    websiteUrl: "https://www.steamboat.com",
    description: "Steamboat is famous for its Champagne Powder® snow and western hospitality."
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
      advanced: 29,
      expert: 10
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
      temperature: 22,
      condition: "Snowing",
      snowfall24h: 8,
      snowDepth: 40,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "09:00",
      closing: "16:00",
      isOpen: true
    },
    imageUrl: "/resorts/killington-resort.jpg",
    websiteUrl: "https://www.killington.com",
    description: "Known as 'The Beast of the East,' Killington is the largest ski resort in Eastern North America."
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
      advanced: 25,
      expert: 10
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
      condition: "Sunny",
      snowfall24h: 0,
      snowDepth: 100,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "09:00",
      closing: "16:00",
      isOpen: true
    },
    imageUrl: "/resorts/snowbird.jpg",
    websiteUrl: "https://www.snowbird.com",
    description: "Snowbird is known for its deep powder snow and steep terrain."
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
      advanced: 40,
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
      baseElevation: 6800,
      peakElevation: 11166,
      verticalDrop: 4366,
      numberOfLifts: 39,
      numberOfRuns: 300
    },
    weather: {
      temperature: 20,
      condition: "Partly Cloudy",
      snowfall24h: 3,
      snowDepth: 80,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "09:00",
      closing: "16:00",
      isOpen: true
    },
    imageUrl: "/resorts/big-sky-resort.jpg",
    websiteUrl: "https://www.bigskyresort.com",
    description: "Big Sky Resort offers the Biggest Skiing in America with 5,850 acres of terrain."
  },
  {
    id: "palisades-tahoe",
    name: "Palisades Tahoe",
    location: {
      lat: 39.1969,
      lng: -120.2374,
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
      nightSkiing: false,
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
      temperature: 35,
      condition: "Sunny",
      snowfall24h: 0,
      snowDepth: 150,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "09:00",
      closing: "16:00",
      isOpen: true
    },
    imageUrl: "/resorts/palisades-tahoe.jpg",
    websiteUrl: "https://www.palisadestahoe.com",
    description: "Home to the 1960 Winter Olympics, Palisades Tahoe offers world-class terrain across two mountains."
  }
]; 