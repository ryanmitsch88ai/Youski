"use client";

import { useEffect, useRef } from "react";
import { Resort } from "@/types/resort";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface ResortMapProps {
  resorts: Resort[];
  userLocation: { lat: number; lng: number } | null;
  center: { lat: number; lng: number };
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function ResortMap({ resorts, userLocation, center }: ResortMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [center.lng, center.lat],
      zoom: 5,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add user location marker if available
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
  }, [center, userLocation]);

  // Update markers when resorts change
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
  }, [resorts]);

  return <div ref={mapContainer} className="w-full h-full rounded-lg" />;
} 