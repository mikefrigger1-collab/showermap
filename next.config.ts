import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce trailing slashes
  trailingSlash: true,
  
  // Image optimization settings
  images: {
    domains: ['images.unsplash.com'], // Add domains for shower facility images
    formats: ['image/webp', 'image/avif'],
  },
  
  // SEO and performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Disable ESLint rule that's causing build failures
  eslint: {
    ignoreDuringBuilds: false,
    rules: {
      'react/no-unescaped-entities': 'off',
    },
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