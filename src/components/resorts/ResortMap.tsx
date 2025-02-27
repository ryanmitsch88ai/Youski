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
    center: [number, number];
    zoom: number;
    bearing: number;
    pitch: number;
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
  const [selectedResort, setSelectedResort] = useState<string | null>(null);
  const [trailMap, setTrailMap] = useState<TrailMapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [center.lng, center.lat],
      zoom: 12,
      pitch: 60,
      bearing: 0,
      maxPitch: 85,
      antialias: true
    });

    map.current.on("load", () => {
      if (!map.current) return;
      
      // Add terrain source
      map.current.addSource("mapbox-dem", {
        "type": "raster-dem",
        "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
        "tileSize": 512,
        "maxzoom": 14
      });
      
      // Add sky layer
      map.current.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });

      // Set terrain configuration
      map.current.setTerrain({
        "source": "mapbox-dem",
        "exaggeration": 1.5
      });

      // Add satellite layer
      map.current.addSource('satellite', {
        'type': 'raster',
        'url': 'mapbox://mapbox.satellite',
        'tileSize': 256,
        'maxzoom': 22
      });

      map.current.addLayer({
        'id': 'satellite',
        'type': 'raster',
        'source': 'satellite',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
          'raster-opacity': 0.5
        }
      }, 'land-structure-polygon');

      // Add 3D buildings
      map.current.addLayer({
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.6
        }
      });
    });

    // Add navigation controls with visualization options
    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
      showZoom: true,
      showCompass: true
    });
    map.current.addControl(nav, 'top-right');
    
    // Add geolocation control
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }));

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center]);

  // Add resort markers and handle resort selection
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    const markers = document.getElementsByClassName("mapboxgl-marker");
    while (markers[0]) {
      markers[0].remove();
    }

    // Add resort markers
    resorts.forEach((resort) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-4">
          <h3 class="text-lg font-bold">${resort.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${resort.location.address}</p>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span class="font-semibold">Base:</span> ${resort.stats.baseElevation}′
            </div>
            <div>
              <span class="font-semibold">Peak:</span> ${resort.stats.peakElevation}′
            </div>
            <div>
              <span class="font-semibold">Runs:</span> ${resort.stats.numberOfRuns}
            </div>
            <div>
              <span class="font-semibold">Snow:</span> ${resort.weather.snowDepth}″
            </div>
          </div>
          <button 
            class="mt-3 w-full px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onclick="window.selectResort('${resort.id}')"
          >
            View Trail Map
          </button>
        </div>
      `);

      const marker = new mapboxgl.Marker({ color: "#dc2626" })
        .setLngLat([resort.location.lng, resort.location.lat])
        .setPopup(popup)
        .addTo(map.current!);

      marker.getElement().addEventListener("click", () => {
        setSelectedResort(resort.id);
      });
    });

    // Add user location marker if available
    if (userLocation) {
      new mapboxgl.Marker({ color: "#2563eb" })
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new mapboxgl.Popup().setHTML("<h3 class='font-bold'>Your Location</h3>"))
        .addTo(map.current);
    }

    // Add global function for marker button click
    (window as any).selectResort = (resortId: string) => {
      setSelectedResort(resortId);
    };
  }, [resorts, userLocation]);

  // Fetch and display trail map when resort is selected
  useEffect(() => {
    if (!selectedResort || !map.current) return;

    const fetchTrailMap = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/trail-maps?resortId=${selectedResort}`);
        if (!response.ok) throw new Error("Failed to fetch trail map");
        
        const data = await response.json();
        setTrailMap(data);

        // Update map view to trail map position
        map.current?.flyTo({
          center: data.metadata.center,
          zoom: data.metadata.zoom,
          bearing: data.metadata.bearing,
          pitch: data.metadata.pitch,
          duration: 2000
        });

      } catch (err) {
        console.error("Error fetching trail map:", err);
        setError(err instanceof Error ? err.message : "Failed to load trail map");
      } finally {
        setLoading(false);
      }
    };

    fetchTrailMap();
  }, [selectedResort]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
} 