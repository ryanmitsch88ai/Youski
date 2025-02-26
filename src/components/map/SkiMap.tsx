'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Resort } from '@/types/resort';

interface SkiMapProps {
  resorts: Resort[];
  userLocation: { lat: number; lng: number } | null;
  center: { lat: number; lng: number };
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function SkiMap({ resorts, userLocation, center }: SkiMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [center.lng, center.lat],
      zoom: 12,
      pitch: 45,
      bearing: 0,
    });

    map.current.on('load', () => {
      if (!map.current) return;
      
      // Add terrain layer
      map.current.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      
      map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

      // Add 3D buildings for the resort
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

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
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

  // Add resort markers
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    const markers = document.getElementsByClassName('mapboxgl-marker');
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
        </div>
      `);

      new mapboxgl.Marker({ color: '#dc2626' })
        .setLngLat([resort.location.lng, resort.location.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Add user location marker if available
    if (userLocation) {
      new mapboxgl.Marker({ color: '#2563eb' })
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new mapboxgl.Popup().setHTML('<h3 class="font-bold">Your Location</h3>'))
        .addTo(map.current);
    }
  }, [resorts, userLocation]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
} 