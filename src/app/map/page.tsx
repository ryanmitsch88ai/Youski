import dynamic from 'next/dynamic';

// Dynamically import the SkiMap component with no SSR to avoid mapbox-gl issues
const SkiMap = dynamic(() => import('@/components/map/SkiMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="text-lg font-semibold text-gray-600">Loading map...</div>
    </div>
  ),
});

export default function MapPage() {
  return <SkiMap />;
} 