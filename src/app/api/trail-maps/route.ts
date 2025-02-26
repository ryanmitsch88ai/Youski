import { NextResponse } from "next/server";

const SKIMAP_API_BASE = "https://skimap.org/SkiAreas/view";

const RESORT_MAP_IDS: { [key: string]: number } = {
  "vail": 510,           // Vail
  "aspen": 505,          // Aspen Snowmass
  "park-city": 224,      // Park City
  "mammoth": 480,        // Mammoth Mountain
  "jackson-hole": 1025,  // Jackson Hole
  "steamboat": 946,      // Steamboat
  "killington": 235,     // Killington
  "snowbird": 47,        // Snowbird
  "big-sky": 257,        // Big Sky
  "palisades-tahoe": 542 // Palisades Tahoe (formerly Squaw Valley)
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resortId = searchParams.get("resortId");

  console.log("Fetching trail map for resort:", resortId);

  if (!resortId || !RESORT_MAP_IDS[resortId]) {
    console.error("Invalid resort ID:", resortId);
    return new NextResponse("Resort ID not found", { status: 404 });
  }

  try {
    // First, get the resort data from Skimap.org
    const skimapId = RESORT_MAP_IDS[resortId];
    console.log("Fetching from Skimap.org ID:", skimapId);
    
    // Try HTML format first since Skimap.org seems to prefer it
    const response = await fetch(`${SKIMAP_API_BASE}/${skimapId}`, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (compatible; YouSkiBot/1.0)'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Skimap.org API error:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        error: errorText
      });
      throw new Error(`Failed to fetch resort data: ${response.statusText}\n${errorText}`);
    }
    
    const htmlText = await response.text();
    
    // Extract image ID from HTML response using regex
    const imageMatch = htmlText.match(/\/data\/image\/(\d+)/);
    if (!imageMatch) {
      throw new Error("No trail map image found in response");
    }
    
    const imageId = imageMatch[1];
    const imageUrl = `https://skimap.org/data/image/${imageId}.jpg`;
    
    // Extract resort name
    const nameMatch = htmlText.match(/<title>([^<]+)<\/title>/);
    const resortName = nameMatch ? nameMatch[1].replace(" | Skimap.org", "") : "Unknown Resort";
    
    console.log("Extracted map data:", {
      imageId,
      resortName,
      url: imageUrl
    });

    // Return the trail map data
    return NextResponse.json({
      id: imageId,
      name: resortName,
      url: imageUrl,
      metadata: {
        width: 1200,  // Default size, actual size will be determined by the image
        height: 800
      }
    });
  } catch (error) {
    console.error("Error fetching trail map:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Error fetching trail map", 
      { status: 500 }
    );
  }
} 