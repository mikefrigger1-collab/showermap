// ========================================
// FILE: scripts/generate-sitemap-urls.js
// Create this file to generate a complete list of URLs
// ========================================

const fs = require('fs');
const path = require('path');

// Load your actual location data
function loadLocations() {
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', 'locations-by-state');
    const states = fs.readdirSync(dataPath);
    const allUrls = [];
    
    states.forEach(stateFile => {
      if (stateFile.endsWith('.json')) {
        const stateCode = stateFile.replace('.json', '');
        const stateData = JSON.parse(
          fs.readFileSync(path.join(dataPath, stateFile), 'utf8')
        );
        
        // Add state page URL
        const stateSlug = stateData.slug || stateCode.toLowerCase();
        allUrls.push(`/usa/${stateSlug}/`);
        
        // Add location URLs
        if (stateData.locations && Array.isArray(stateData.locations)) {
          stateData.locations.forEach(location => {
            if (location.slug) {
              allUrls.push(`/usa/${stateSlug}/${location.slug}/`);
            }
          });
        }
      }
    });
    
    return allUrls;
  } catch (error) {
    console.error('Error loading locations:', error);
    return [];
  }
}

// Generate sitemap-urls.txt file
function generateSitemapUrlsFile() {
  const urls = loadLocations();
  const urlsContent = urls.join('\n');
  
  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'sitemap-urls.txt'),
    urlsContent
  );
  
  console.log(`Generated ${urls.length} URLs for sitemap`);
}

// Run if called directly
if (require.main === module) {
  generateSitemapUrlsFile();
}

module.exports = { loadLocations, generateSitemapUrlsFile };