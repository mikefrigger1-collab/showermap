/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_PRODUCTION_URL || 'https://www.showermap.com/',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  trailingSlash: true,
  transform: async (config, path) => {
    // Ensure all URLs have trailing slashes
    const urlWithSlash = path.endsWith('/') ? path : `${path}/`;
    
    return {
      loc: urlWithSlash,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      'https://www.showermap.com/sitemap.xml',
    ],
  },
}