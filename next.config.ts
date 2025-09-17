import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce trailing slashes
  trailingSlash: true,
  
  // Completely disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image optimization settings
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // SEO and performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Redirect non-www to www in production
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'showermap.com',
          },
        ],
        destination: 'https://www.showermap.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;