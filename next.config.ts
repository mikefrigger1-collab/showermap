// next.config.ts
import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  trailingSlash: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  compress: true,

  // Enable static page generation where possible
  output: 'standalone',

  // Headers for caching and security
  async headers() {
    return [
      {
        // Cache static assets aggressively
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache JS and CSS with revalidation
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache JSON data files
        source: '/data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Security headers for all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },

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

export default withBundleAnalyzer(nextConfig);
