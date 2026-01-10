// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */

const fs = require('fs');
const path = require('path');

// Function to load all your location URLs from data files
function loadDynamicPaths() {
  const urls = [];

  // Load USA locations
  try {
    const usaDataPath = path.join(process.cwd(), 'public', 'data', 'states');

    if (fs.existsSync(usaDataPath)) {
      const stateFiles = fs.readdirSync(usaDataPath);

      stateFiles.forEach(file => {
        if (file.endsWith('.json')) {
          const stateData = JSON.parse(
            fs.readFileSync(path.join(usaDataPath, file), 'utf8')
          );

          // Add state page
          if (stateData.slug) {
            urls.push(`/usa/${stateData.slug}/`);
          }

          // Add ALL location pages (no limit)
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
    console.log('Note: USA location data not found');
  }

  // Load UK locations
  try {
    const ukDataPath = path.join(process.cwd(), 'public', 'data', 'uk');

    if (fs.existsSync(ukDataPath)) {
      const regionFiles = fs.readdirSync(ukDataPath);

      regionFiles.forEach(file => {
        if (file.endsWith('.json')) {
          const regionData = JSON.parse(
            fs.readFileSync(path.join(ukDataPath, file), 'utf8')
          );

          // Add region page
          if (regionData.slug) {
            urls.push(`/uk/${regionData.slug}/`);
          }

          // Add ALL location pages
          if (regionData.locations && Array.isArray(regionData.locations)) {
            regionData.locations.forEach(location => {
              if (location.slug) {
                urls.push(`/uk/${regionData.slug}/${location.slug}/`);
              }
            });
          }
        }
      });
    }
  } catch (error) {
    console.log('Note: UK location data not found');
  }

  // Load Australia locations
  try {
    const ausDataPath = path.join(process.cwd(), 'public', 'data', 'australia');

    if (fs.existsSync(ausDataPath)) {
      const stateFiles = fs.readdirSync(ausDataPath);

      stateFiles.forEach(file => {
        if (file.endsWith('.json')) {
          const stateData = JSON.parse(
            fs.readFileSync(path.join(ausDataPath, file), 'utf8')
          );

          // Add state page
          if (stateData.slug) {
            urls.push(`/australia/${stateData.slug}/`);
          }

          // Add ALL location pages
          if (stateData.locations && Array.isArray(stateData.locations)) {
            stateData.locations.forEach(location => {
              if (location.slug) {
                urls.push(`/australia/${stateData.slug}/${location.slug}/`);
              }
            });
          }
        }
      });
    }
  } catch (error) {
    console.log('Note: Australia location data not found');
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

      // Country pages - high priority
      if (url.match(/^\/(usa|uk|australia)\/$/) && url.split('/').filter(Boolean).length === 1) {
        return 0.9;
      }

      // State/region pages - high priority for SEO (USA, UK, Australia)
      if (url.match(/^\/(usa|uk|australia)\/[a-z-]+\/$/) && url.split('/').filter(Boolean).length === 2) {
        return 0.85;
      }

      // Individual location pages - medium-high priority (all countries)
      if (url.match(/^\/(usa|uk|australia)\/[a-z-]+\/[a-z0-9-]+\/$/) && url.split('/').filter(Boolean).length === 3) {
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

      // Country pages - update weekly
      if (url.match(/^\/(usa|uk|australia)\/$/)) return 'weekly';

      // State/region pages - update weekly (all countries)
      if (url.match(/^\/(usa|uk|australia)\/[a-z-]+\/$/)) return 'weekly';

      // Location pages - update weekly (hours/status might change)
      if (url.match(/^\/(usa|uk|australia)\/[a-z-]+\/[a-z0-9-]+\/$/)) return 'weekly';

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