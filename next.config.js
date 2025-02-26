/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable telemetry
  telemetry: false,
  
  // Optimize webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimize production builds
    if (!dev) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: '.next/cache',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      }
    }
    return config
  },
}

module.exports = nextConfig 