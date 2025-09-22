// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_PRODUCTION_URL || 'https://www.showermap.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true, // Enable index sitemap for large sites
  sitemapSize: 5000, // Split sitemaps every 5000 URLs
  changefreq: 'weekly',
  priority: 0.7,
  trailingSlash: true,
  exclude: [
    '/api/*',
    '/_next/*',
    '/404',
    '/500',
    '/admin/*', // Exclude any admin pages
    '/draft/*', // Exclude draft pages
  ],

  // Custom transform function for dynamic priorities
  transform: async (config, path) => {
    // Ensure all URLs have trailing slashes
    const urlWithSlash = path.endsWith('/') ? path : `${path}/`;
    
    // Define custom priorities based on page importance
    const getPriority = (url) => {
      // Homepage
      if (url === '/') return 1.0;
      
      // Main feature pages
      if (url === '/map/') return 0.9;
      
      // Country pages (top-level regions)
      if (url.match(/^\/[a-z-]+\/$/) && !url.includes('/')) return 0.8;
      
      // State/Province pages (high search value)
      if (url.match(/^\/[a-z-]+\/[a-z-]+\/$/) && url.split('/').length === 4) return 0.85;
      
      // City pages (very high SEO value)
      if (url.includes('/california/') || 
          url.includes('/new-york/') ||
          url.includes('/texas/')) return 0.9;
      
      // Individual shower locations
      if (url.split('/').length >= 5) return 0.6;
      
      // Static pages
      if (url === '/about/' || url === '/contact/' || url === '/guidelines/') return 0.5;
      
      return 0.7; // Default priority
    };

    // Define changefreq based on content type
    const getChangefreq = (url) => {
      // Homepage updates frequently
      if (url === '/') return 'daily';
      
      // Map page updates with new locations
      if (url === '/map/') return 'daily';
      
      // State/region pages update regularly
      if (url.split('/').length === 4) return 'weekly';
      
      // Individual locations might change hours/status
      if (url.split('/').length >= 5) return 'weekly';
      
      // Static pages rarely change
      if (url === '/about/' || url === '/guidelines/') return 'monthly';
      
      return 'weekly';
    };
    
    return {
      loc: urlWithSlash,
      changefreq: getChangefreq(urlWithSlash),
      priority: getPriority(urlWithSlash),
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [], // Add hreflang alternatives later
    };
  },

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
          '/*?*', // Block URL parameters initially
        ],
      },
      // Specific rules for search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 1,
      },
    ],
    additionalSitemaps: [
      'https://www.showermap.com/sitemap.xml',
      'https://www.showermap.com/sitemap-0.xml', // For index sitemaps
      // Add more as the site grows
    ],
  },
};