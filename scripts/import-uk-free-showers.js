const fs = require('fs');
const path = require('path');

const ukDataDir = path.join(__dirname, '..', 'public', 'data', 'uk');
const sourceDir = path.join(__dirname, '..', '..', 'public', 'data', 'uk'); // Files are in parent ShowerMap folder

// Transform free shower location to match region file format
function transformLocation(loc) {
  return {
    id: loc.id,
    slug: loc.slug,
    title: loc.title,
    address: loc.address || '',
    street: '',
    city: loc.city || '',
    postcode: loc.postcode || '',
    zip: loc.postcode || '',
    province: loc.regionName || '',
    state: loc.regionName || '',
    ukRegion: loc.ukRegion,
    country: 'UK',
    lat: loc.lat || 0,
    lng: loc.lng || 0,
    phone: loc.phone || '',
    email: '',
    website: loc.website || '',
    rating: loc.rating || 0,
    reviewCount: loc.reviewCount || 0,
    categories: loc.categories || [],
    amenities: loc.amenities || [],
    cost: loc.cost || 'Free',
    access: loc.access || 'Public Access',
    hours: {},
    showerReviews: [],
    businessType: loc.businessType || '',
    content: loc.content || '',
    lastUpdated: loc.lastUpdated || new Date().toISOString(),
    isFree: true,
    facilityType: loc.facilityType || 'beach_shower'
  };
}

async function main() {
  console.log('Importing UK free shower locations (without geocoding)...\n');

  // Read free shower files from source directory
  let file1Path = path.join(sourceDir, 'uk-free-showers.json');
  let file2Path = path.join(sourceDir, 'uk-free-showers2.json');

  // Try ukDataDir if not found in sourceDir
  if (!fs.existsSync(file1Path)) {
    file1Path = path.join(ukDataDir, 'uk-free-showers.json');
    file2Path = path.join(ukDataDir, 'uk-free-showers2.json');
  }

  if (!fs.existsSync(file1Path)) {
    console.error('Could not find uk-free-showers.json');
    console.error('Tried:', path.join(sourceDir, 'uk-free-showers.json'));
    console.error('And:', path.join(ukDataDir, 'uk-free-showers.json'));
    return;
  }

  console.log('Reading from:', file1Path);

  const file1 = JSON.parse(fs.readFileSync(file1Path, 'utf8'));
  const file2 = JSON.parse(fs.readFileSync(file2Path, 'utf8'));

  const allLocations = [...file1.locations, ...file2.locations];
  console.log(`Found ${allLocations.length} free shower locations to import`);

  const withCoords = allLocations.filter(l => l.lat !== 0 && l.lng !== 0).length;
  const needsGeocode = allLocations.length - withCoords;
  console.log(`  With coordinates: ${withCoords}`);
  console.log(`  Needs geocoding: ${needsGeocode}\n`);

  // Group by region
  const byRegion = {};
  allLocations.forEach(loc => {
    const region = loc.ukRegion;
    if (!region) {
      console.log(`Skipping location without region: ${loc.title}`);
      return;
    }
    if (!byRegion[region]) {
      byRegion[region] = [];
    }
    byRegion[region].push(loc);
  });

  // Process each region
  let totalAdded = 0;
  let totalSkipped = 0;
  const needsGeocodeList = [];

  for (const [region, locations] of Object.entries(byRegion)) {
    const regionFile = path.join(ukDataDir, `${region}.json`);

    if (!fs.existsSync(regionFile)) {
      console.log(`Region file not found: ${region}.json - skipping ${locations.length} locations`);
      continue;
    }

    const regionData = JSON.parse(fs.readFileSync(regionFile, 'utf8'));
    const existingIds = new Set(regionData.locations.map(l => l.id));
    const existingSlugs = new Set(regionData.locations.map(l => l.slug));

    let addedToRegion = 0;
    let skippedInRegion = 0;

    for (const loc of locations) {
      // Skip if already exists
      if (existingIds.has(loc.id) || existingSlugs.has(loc.slug)) {
        skippedInRegion++;
        totalSkipped++;
        continue;
      }

      // Transform to proper format
      const transformed = transformLocation(loc);

      // Track locations needing geocoding
      if (transformed.lat === 0 && transformed.lng === 0) {
        needsGeocodeList.push({
          id: loc.id,
          title: loc.title,
          address: loc.address,
          city: loc.city,
          postcode: loc.postcode,
          region: region
        });
      }

      regionData.locations.push(transformed);
      existingIds.add(transformed.id);
      existingSlugs.add(transformed.slug);
      addedToRegion++;
      totalAdded++;
    }

    // Save updated region file
    fs.writeFileSync(regionFile, JSON.stringify(regionData, null, 2));
    console.log(`${region}: Added ${addedToRegion}, skipped ${skippedInRegion} duplicates (total: ${regionData.locations.length})`);
  }

  console.log('\n========================================');
  console.log(`Total added: ${totalAdded}`);
  console.log(`Duplicates skipped: ${totalSkipped}`);
  console.log(`Still need geocoding: ${needsGeocodeList.length}`);
  console.log('========================================');

  if (needsGeocodeList.length > 0) {
    const needsGeocodeFile = path.join(__dirname, 'uk-needs-geocode.json');
    fs.writeFileSync(needsGeocodeFile, JSON.stringify(needsGeocodeList, null, 2));
    console.log(`\nLocations needing geocoding saved to: scripts/uk-needs-geocode.json`);
    console.log('Run: node scripts/geocode-uk-locations.js');
  }
}

main().catch(console.error);
