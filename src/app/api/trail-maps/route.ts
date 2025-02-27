import { NextResponse } from "next/server";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// These coordinates and zoom levels are optimized for trail map views
const RESORT_CONFIGS: { [key: string]: { center: [number, number], zoom: number, bearing: number, pitch: number } } = {
  "vail": {
    center: [-106.3741, 39.6061],
    zoom: 13.5,
    bearing: 25,
    pitch: 75
  },
  "aspen": {
    center: [-106.8317, 39.1911],
    zoom: 13.5,
    bearing: 15,
    pitch: 75
  },
  "park-city": {
    center: [-111.5089, 40.6514],
    zoom: 13.5,
    bearing: 45,
    pitch: 75
  },
  "mammoth": {
    center: [-119.0326, 37.6308],
    zoom: 13.5,
    bearing: -15,
    pitch: 75
  },
  "jackson-hole": {
    center: [-110.8279, 43.5875],
    zoom: 13.5,
    bearing: 30,
    pitch: 75
  },
  "steamboat": {
    center: [-106.8045, 40.4572],
    zoom: 13.5,
    bearing: -25,
    pitch: 75
  },
  "killington": {
    center: [-72.8030, 43.6045],
    zoom: 13.5,
    bearing: 15,
    pitch: 75
  },
  "snowbird": {
    center: [-111.6564, 40.5829],
    zoom: 13.5,
    bearing: -15,
    pitch: 75
  },
  "big-sky": {
    center: [-111.4018, 45.2862],
    zoom: 13.5,
    bearing: 30,
    pitch: 75
  },
  "palisades-tahoe": {
    center: [-120.2377, 39.1967],
    zoom: 13.5,
    bearing: 45,
    pitch: 75
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resortId = searchParams.get("resortId");

  console.log("Fetching trail map for resort:", resortId);

  if (!resortId || !RESORT_CONFIGS[resortId]) {
    console.error("Invalid resort ID:", resortId);
    return new NextResponse("Resort ID not found", { status: 404 });
  }

  try {
    const config = RESORT_CONFIGS[resortId];
    
    // Construct Mapbox Static Image URL with winter style and terrain
    const width = 1200;
    const height = 800;
    const style = 'mapbox://styles/mapbox/outdoors-v12'; // Changed to outdoors style
    
    const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/${
      config.center[0]},${config.center[1]},${
      config.zoom},${config.bearing},${config.pitch}/${
      width}x${height}@2x?access_token=${MAPBOX_TOKEN}&logo=false`;

    console.log("Generated Mapbox URL for resort:", {
      resortId,
      center: config.center,
      zoom: config.zoom,
      bearing: config.bearing,
      pitch: config.pitch
    });

    return NextResponse.json({
      id: resortId,
      name: resortId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      url: imageUrl,
      metadata: {
        width,
        height,
        center: config.center,
        zoom: config.zoom,
        bearing: config.bearing,
        pitch: config.pitch
      }
    });

  } catch (error) {
    console.error("Error generating trail map URL:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Error generating trail map URL", 
      { status: 500 }
    );
  }
} 