export default function ResortLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative h-96 rounded-xl overflow-hidden mb-8 bg-gray-200" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                <div className="h-6 bg-gray-200 rounded w-16" />
              </div>
            ))}
          </div>

          {/* Map Skeleton */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
            <div className="h-[400px] bg-gray-200 rounded" />
          </div>

          {/* Trail Difficulty Skeleton */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-4 bg-gray-200 rounded w-12" />
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Operating Hours Skeleton */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-6 bg-gray-200 rounded w-36 mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48" />
              <div className="h-4 bg-gray-200 rounded w-32" />
            </div>
          </div>

          {/* Weather Skeleton */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-4 bg-gray-200 rounded w-32" />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-28" />
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Skeleton */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-6 bg-gray-200 rounded w-28 mb-4" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-4 bg-gray-200 rounded w-4 mr-2" />
                  <div className="h-4 bg-gray-200 rounded w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 