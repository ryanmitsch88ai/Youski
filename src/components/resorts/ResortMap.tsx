"use client";

import { useEffect, useRef, useState } from "react";
import { Resort } from "@/types/resort";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { Map, Mountain, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface TrailMapData {
  id: string;
  name: string;
  url: string;
  metadata: {
    width: number;
    height: number;
  };
}

interface ResortMapProps {
  resorts: Resort[];
  userLocation: { lat: number; lng: number } | null;
  center: { lat: number; lng: number };
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function ResortMap({ resorts, userLocation, center }: ResortMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [showTrailMap, setShowTrailMap] = useState(true);
  const [trailMapData, setTrailMapData] = useState<TrailMapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  // Fetch trail map data when a single resort is selected
  useEffect(() => {
    if (resorts.length !== 1) {
      setTrailMapData(null);
      return;
    }

    const fetchTrailMap = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching trail map for resort:", resorts[0].id);
        const response = await fetch(`/api/trail-maps?resortId=${resorts[0].id}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Trail map fetch error:", {
            status: response.status,
            statusText: response.statusText,
            error: errorText
          });
          throw new Error(errorText || "Failed to fetch trail map");
        }

        const data = await response.json();
        console.log("Trail map data received:", data);
        setTrailMapData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load trail map";
        console.error("Error in fetchTrailMap:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (showTrailMap) {
      fetchTrailMap();
    }
  }, [resorts, showTrailMap]);

  // Initialize the location map
  useEffect(() => {
    if (!mapContainer.current || map.current || showTrailMap) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [center.lng, center.lat],
      zoom: 5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    if (userLocation) {
      new mapboxgl.Marker({ color: "#0000FF" })
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new mapboxgl.Popup().setHTML("<h3>Your Location</h3>"))
        .addTo(map.current);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, userLocation, showTrailMap]);

  // Update location map markers
  useEffect(() => {
    if (!map.current || showTrailMap) return;

    const markers = document.getElementsByClassName("mapboxgl-marker");
    while (markers[0]) {
      markers[0].remove();
    }

    resorts.forEach((resort) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold">${resort.name}</h3>
          <p class="text-sm text-gray-600">${resort.location.address}</p>
          <div class="mt-2">
            <p class="text-sm">
              <span class="font-semibold">Snow:</span> ${resort.weather.snowDepth}″
            </p>
            <p class="text-sm">
              <span class="font-semibold">Temp:</span> ${resort.weather.temperature}°F
            </p>
          </div>
        </div>
      `);

      new mapboxgl.Marker({ color: "#FF0000" })
        .setLngLat([resort.location.lng, resort.location.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [resorts, showTrailMap]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 0.5));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="relative w-full h-full">
      {/* Map Type Toggle */}
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-dark-card rounded-lg shadow-lg p-2">
        <div className="flex gap-2">
          <button
            id="trail-map-toggle"
            name="trail-map-toggle"
            onClick={() => setShowTrailMap(true)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              showTrailMap
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Mountain className="w-4 h-4" />
            <span className="text-sm font-medium">Trail Map</span>
          </button>
          <button
            id="location-map-toggle"
            name="location-map-toggle"
            onClick={() => setShowTrailMap(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              !showTrailMap
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Map className="w-4 h-4" />
            <span className="text-sm font-medium">Location</span>
          </button>
        </div>
      </div>

      {/* Trail Map View */}
      {showTrailMap && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-center p-8">
                <p className="text-red-500 dark:text-red-400">{error}</p>
                <button
                  id="view-location-fallback"
                  name="view-location-fallback"
                  onClick={() => setShowTrailMap(false)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  View Location Map Instead
                </button>
              </div>
            ) : resorts.length === 1 && trailMapData ? (
              <div className="relative w-full h-full overflow-hidden">
                <div 
                  className="absolute inset-0 transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center'
                  }}
                >
                  <Image
                    src={trailMapData.url}
                    alt={`${trailMapData.name} trail map`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-contain"
                    quality={100}
                    priority
                    onError={(e) => {
                      console.error("Image load error:", e);
                      const target = e.target as HTMLImageElement;
                      setError("Failed to load trail map image");
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <Mountain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Select a resort to view its trail map
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Trail Map Controls */}
      {showTrailMap && trailMapData && !loading && !error && (
        <div className="absolute top-4 right-4 z-10 bg-white dark:bg-dark-card rounded-lg shadow-lg p-2">
          <div className="flex gap-2">
            <button
              id="zoom-in"
              name="zoom-in"
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              id="zoom-out"
              name="zoom-out"
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              id="zoom-reset"
              name="zoom-reset"
              onClick={handleResetZoom}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Location Map View */}
      <div 
        ref={mapContainer} 
        className={`w-full h-full rounded-lg transition-opacity duration-300 ${
          showTrailMap ? "opacity-0 pointer-events-none" : "opacity-100"
        }`} 
      />
    </div>
  );
} 