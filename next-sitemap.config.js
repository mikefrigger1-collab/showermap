// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */

const fs = require('fs');
const path = require('path');

// Function to load all your location URLs from data files
function loadDynamicPaths() {
  const urls = [];
  
  try {
    // Check if you have location data files
    const dataPath = path.join(process.cwd(), 'public', 'data', 'locations-by-state');
    
    if (fs.existsSync(dataPath)) {
      const stateFiles = fs.readdirSync(dataPath);
      
      stateFiles.forEach(file => {
        if (file.endsWith('.json')) {
          const stateData = JSON.parse(
            fs.readFileSync(path.join(dataPath, file), 'utf8')
          );
          
          // Add state page
          if (stateData.slug) {
            urls.push(`/usa/${stateData.slug}/`);
          }
          
          // Add location pages
          if (stateData.locations && Array.isArray(stateData.locations)) {
            stateData.locations.forEach(location => {
              if (location.slug) {
                urls.push(`/usa/${stateData.slug}/${location.slug}/`);
              }
            });
          }
        }
      });
    }
  } catch (error) {
    console.log('Note: Location data not found, using default paths only');
  }
  
  // If no data files exist yet, add some default state URLs
  if (urls.length === 0) {
    const defaultStates = [
      'california', 'texas', 'new-york', 'florida', 'illinois',
      'pennsylvania', 'ohio', 'georgia', 'north-carolina', 'michigan',
      'washington', 'arizona', 'massachusetts', 'tennessee', 'indiana',
      'missouri', 'maryland', 'wisconsin', 'colorado', 'minnesota'
    ];
    
    defaultStates.forEach(state => {
      urls.push(`/usa/${state}/`);
    });
  }
  
  return urls;
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_PRODUCTION_URL || 'https://www.showermap.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Set to true when you have 1000+ URLs
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  trailingSlash: true,
  autoLastmod: true,
  
  exclude: [
    '/api/*',
    '/_next/*',
    '/404',
    '/500',
    '/admin/*',
    '/draft/*',
    '/*.json',
    '/server-sitemap.xml',
  ],

  // Custom transform function for dynamic priorities and changefreq
  transform: async (config, path) => {
    // Ensure trailing slash
    const urlWithSlash = path.endsWith('/') ? path : `${path}/`;
    
    // Custom priority based on page type
    const getPriority = (url) => {
      // Homepage - highest priority
      if (url === '/') return 1.0;
      
      // Map page - very high priority
      if (url === '/map/') return 0.95;
      
      // State/region pages - high priority for SEO
      if (url.match(/^\/usa\/[a-z-]+\/$/) && url.split('/').filter(Boolean).length === 2) {
        return 0.85;
      }
      
      // Individual location pages - medium-high priority
      if (url.match(/^\/usa\/[a-z-]+\/[a-z-]+\/$/) && url.split('/').filter(Boolean).length === 3) {
        return 0.7;
      }
      
      // Static pages - lower priority
      if (['/about/', '/contact/', '/guidelines/', '/privacy/', '/terms/'].includes(url)) {
        return 0.5;
      }
      
      // Default
      return 0.6;
    };

    // Custom changefreq based on content type
    const getChangefreq = (url) => {
      // Homepage - updates daily with new locations
      if (url === '/') return 'daily';
      
      // Map page - updates frequently
      if (url === '/map/') return 'daily';
      
      // State pages - update weekly
      if (url.match(/^\/usa\/[a-z-]+\/$/)) return 'weekly';
      
      // Location pages - update weekly (hours/status might change)
      if (url.match(/^\/usa\/[a-z-]+\/[a-z-]+\/$/)) return 'weekly';
      
      // Static pages - rarely change
      if (['/about/', '/guidelines/', '/privacy/', '/terms/'].includes(url)) {
        return 'monthly';
      }
      
      // Contact page - occasional updates
      if (url === '/contact/') return 'monthly';
      
      return 'weekly';
    };
    
    return {
      loc: urlWithSlash,
      changefreq: getChangefreq(urlWithSlash),
      priority: getPriority(urlWithSlash),
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [], // Add hreflang tags later for international expansion
    };
  },

  // Add additional paths that might not be in the build output
  additionalPaths: async (config) => {
    const result = [];
    
    // Load dynamic paths from your data
    const dynamicUrls = loadDynamicPaths();
    
    // Add each dynamic URL with appropriate settings
    dynamicUrls.forEach(url => {
      const isStatePage = url.split('/').filter(Boolean).length === 2;
      const isLocationPage = url.split('/').filter(Boolean).length === 3;
      
      result.push({
        loc: url,
        changefreq: isStatePage ? 'weekly' : 'weekly',
        priority: isStatePage ? 0.85 : 0.7,
        lastmod: new Date().toISOString(),
      });
    });
    
    // Add map page if not already in build
    result.push({
      loc: '/map/',
      changefreq: 'daily',
      priority: 0.95,
      lastmod: new Date().toISOString(),
    });
    
    console.log(`Adding ${result.length} additional paths to sitemap`);
    
    return result;
  },

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/draft/',
          '/*.json$',
          '/server-sitemap.xml',
        ],
      },
      // Be friendly to search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'bingbot', 
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      // Add these as your site grows
      // 'https://www.showermap.com/server-sitemap.xml', // For server-generated sitemaps
      // 'https://www.showermap.com/news-sitemap.xml',   // If you add a blog
    ],
  },
};