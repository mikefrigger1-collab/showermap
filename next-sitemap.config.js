// ========================================
// FILE: next.config.ts (UPDATED)
// Update your existing next.config.ts
// ========================================

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce trailing slashes
  trailingSlash: true,
  
  // Output as static site (optional, for better performance)
  output: 'standalone', // or 'export' for full static
  
  // Generate static pages at build time
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // Set to true if using static export
  },
  
  // Redirects
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
  
  // Generate static paths for better SEO
  async generateStaticParams() {
    // This runs at build time to generate static pages
    return {
      '/': { revalidate: 3600 }, // Revalidate homepage every hour
      '/map': { revalidate: 3600 },
      // Add other static pages
    };
  },
};

export default nextConfig;
