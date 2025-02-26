/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'lh3.googleusercontent.com'],
  },
  // Configure webpack for production builds
  webpack: (config, { dev, isServer }) => {
    // Only optimize production builds
    if (!dev) {
      config.cache = true; // Use default cache configuration
    }
    return config;
  },
}

module.exports = nextConfig 