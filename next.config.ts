import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false, // Disable React strict mode (optional, helps identify hydration causes)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doctrramj.ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  }
  
  
};

export default nextConfig;
