// ========================================
// FILE: scripts/generate-sitemap-urls.js
// Create this file to generate a complete list of URLs
// ========================================

const fs = require('fs');
const path = require('path');

// Load your actual location data from all countries
function loadLocations() {
  const allUrls = [];

  // Load USA locations
  try {
    const usaDataPath = path.join(process.cwd(), 'public', 'data', 'states');
    if (fs.existsSync(usaDataPath)) {
      const states = fs.readdirSync(usaDataPath);

      states.forEach(stateFile => {
        if (stateFile.endsWith('.json')) {
          const stateCode = stateFile.replace('.json', '');
          const stateData = JSON.parse(
            fs.readFileSync(path.join(usaDataPath, stateFile), 'utf8')
          );

          // Add state page URL
          const stateSlug = stateData.slug || stateCode.toLowerCase();
          allUrls.push(`/usa/${stateSlug}/`);

          // Add ALL location URLs
          if (stateData.locations && Array.isArray(stateData.locations)) {
            stateData.locations.forEach(location => {
              if (location.slug) {
                allUrls.push(`/usa/${stateSlug}/${location.slug}/`);
              }
            });
          }
        }
      });
    }
  } catch (error) {
    console.error('Error loading USA locations:', error);
  }

  // Load UK locations
  try {
    const ukDataPath = path.join(process.cwd(), 'public', 'data', 'uk');
    if (fs.existsSync(ukDataPath)) {
      const regions = fs.readdirSync(ukDataPath);

      regions.forEach(regionFile => {
        if (regionFile.endsWith('.json')) {
          const regionData = JSON.parse(
            fs.readFileSync(path.join(ukDataPath, regionFile), 'utf8')
          );

          // Add region page URL
          if (regionData.slug) {
            allUrls.push(`/uk/${regionData.slug}/`);

            // Add ALL location URLs
            if (regionData.locations && Array.isArray(regionData.locations)) {
              regionData.locations.forEach(location => {
                if (location.slug) {
                  allUrls.push(`/uk/${regionData.slug}/${location.slug}/`);
                }
              });
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Error loading UK locations:', error);
  }

  // Load Australia locations
  try {
    const ausDataPath = path.join(process.cwd(), 'public', 'data', 'australia');
    if (fs.existsSync(ausDataPath)) {
      const states = fs.readdirSync(ausDataPath);

      states.forEach(stateFile => {
        if (stateFile.endsWith('.json')) {
          const stateData = JSON.parse(
            fs.readFileSync(path.join(ausDataPath, stateFile), 'utf8')
          );

          // Add state page URL
          if (stateData.slug) {
            allUrls.push(`/australia/${stateData.slug}/`);

            // Add ALL location URLs
            if (stateData.locations && Array.isArray(stateData.locations)) {
              stateData.locations.forEach(location => {
                if (location.slug) {
                  allUrls.push(`/australia/${stateData.slug}/${location.slug}/`);
                }
              });
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Error loading Australia locations:', error);
  }

  return allUrls;
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