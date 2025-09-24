// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  compress: true,
  // Remove this line - swcMinify is default in Next.js 15
  // swcMinify: true,
  
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