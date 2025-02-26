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
  {
    id: "aspen",
    name: "Aspen Snowmass",
    location: {
      lat: 39.2084,
      lng: -106.9490,
      address: "Snowmass Village, Colorado 81615",
      state: "Colorado",
      country: "USA"
    },
    difficulty: {
      beginner: 5,
      intermediate: 48,
      advanced: 30,
      expert: 17
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
    description: "Aspen Snowmass is a world-renowned ski resort featuring four unique mountains."
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
      beginner: 17,
      intermediate: 52,
      advanced: 21,
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
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1548716178-6c0c2ff18329",
    websiteUrl: "https://www.parkcitymountain.com",
    description: "Park City Mountain Resort is the largest ski resort in the United States."
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
      snowDepth: 120,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "8:30 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1605540436563-5bca919ae766",
    websiteUrl: "https://www.mammothmountain.com",
    description: "Mammoth Mountain is California's highest ski resort."
  },
  {
    id: "jackson-hole",
    name: "Jackson Hole Mountain Resort",
    location: {
      lat: 43.5875,
      lng: -110.8271,
      address: "Teton Village, Wyoming 83025",
      state: "Wyoming",
      country: "USA"
    },
    difficulty: {
      beginner: 10,
      intermediate: 40,
      advanced: 35,
      expert: 15
    },
    amenities: {
      nightSkiing: false,
      rentals: true,
      lessons: true,
      terrain_park: false,
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
      snowDepth: 85,
      lastUpdated: new Date().toISOString()
    },
    operatingHours: {
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1547636780-e41778614c28",
    websiteUrl: "https://www.jacksonhole.com",
    description: "Jackson Hole Mountain Resort is famous for its steep terrain and deep powder."
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
      opening: "8:30 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce",
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
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339",
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
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1551524559-8af4e6624178",
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
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1605796348246-9e37f54adf69",
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
      opening: "9:00 AM",
      closing: "4:00 PM",
      isOpen: true
    },
    imageUrl: "https://images.unsplash.com/photo-1551524559-8af4e6624178",
    websiteUrl: "https://www.palisadestahoe.com",
    description: "Home to the 1960 Winter Olympics, Palisades Tahoe offers world-class terrain across two mountains."
  }
]; 