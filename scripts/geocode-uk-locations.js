const fs = require('fs');
const path = require('path');

const ukDataDir = path.join(__dirname, '..', 'public', 'data', 'uk');

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function geocodeAddress(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=gb&limit=1`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'ShowerMap/1.0 (geocoding UK locations)' }
    });
    const data = await response.json();

    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    return null;
  } catch (e) {
    console.error('  Error:', e.message);
    return null;
  }
}

function cleanAddress(address) {
  if (!address) return null;

  let cleaned = address
    // Remove business names (text before first comma with business keywords)
    .replace(/^[^,]*(?:Club|School|Centre|Center|Hotel|Park|Beach)[^,]*,\s*/i, '')
    // Clean up
    .replace(/United Kingdom/gi, 'UK')
    .trim();

  if (!cleaned.toLowerCase().includes('uk')) {
    cleaned += ', UK';
  }

  return cleaned;
}

function getSimpleAddress(loc) {
  if (loc.postcode && loc.city) {
    return `${loc.city}, ${loc.postcode}, UK`;
  }
  if (loc.postcode) {
    return `${loc.postcode}, UK`;
  }
  if (loc.city) {
    return `${loc.city}, UK`;
  }
  return null;
}

async function main() {
  const needsGeocodeFile = path.join(__dirname, 'uk-needs-geocode.json');

  if (!fs.existsSync(needsGeocodeFile)) {
    console.log('No uk-needs-geocode.json found. Run import-uk-free-showers.js first.');
    return;
  }

  const needsGeocode = JSON.parse(fs.readFileSync(needsGeocodeFile, 'utf8'));
  console.log(`Geocoding ${needsGeocode.length} UK locations...\n`);

  // Load region data
  const regionData = {};
  let geocoded = 0;
  let failed = [];

  for (let i = 0; i < needsGeocode.length; i++) {
    const loc = needsGeocode[i];

    // Load region file if not cached
    if (!regionData[loc.region]) {
      const regionFile = path.join(ukDataDir, `${loc.region}.json`);
      if (fs.existsSync(regionFile)) {
        regionData[loc.region] = JSON.parse(fs.readFileSync(regionFile, 'utf8'));
      } else {
        console.log(`Region file not found: ${loc.region}.json`);
        continue;
      }
    }

    const data = regionData[loc.region];
    const locationIdx = data.locations.findIndex(l => l.id === loc.id);

    if (locationIdx === -1) {
      console.log(`Location not found: ${loc.id}`);
      continue;
    }

    console.log(`[${i + 1}/${needsGeocode.length}] ${loc.title}`);

    // Try full address
    await delay(1100);
    let result = await geocodeAddress(loc.address);

    // Try cleaned address
    if (!result) {
      const cleaned = cleanAddress(loc.address);
      if (cleaned && cleaned !== loc.address) {
        console.log(`  Trying: ${cleaned}`);
        await delay(1100);
        result = await geocodeAddress(cleaned);
      }
    }

    // Try simple address (city + postcode)
    if (!result) {
      const simple = getSimpleAddress(loc);
      if (simple) {
        console.log(`  Trying: ${simple}`);
        await delay(1100);
        result = await geocodeAddress(simple);
      }
    }

    if (result) {
      data.locations[locationIdx].lat = result.lat;
      data.locations[locationIdx].lng = result.lng;
      console.log(`  Success: (${result.lat.toFixed(4)}, ${result.lng.toFixed(4)})`);
      geocoded++;
    } else {
      console.log(`  Failed`);
      failed.push(loc);
    }
  }

  // Save updated region files
  for (const [region, data] of Object.entries(regionData)) {
    const regionFile = path.join(ukDataDir, `${region}.json`);
    fs.writeFileSync(regionFile, JSON.stringify(data, null, 2));
    console.log(`Saved ${region}.json`);
  }

  console.log('\n========================================');
  console.log(`Geocoded: ${geocoded}`);
  console.log(`Failed: ${failed.length}`);
  console.log('========================================');

  if (failed.length > 0) {
    const failedFile = path.join(__dirname, 'uk-failed-geocodes.json');
    fs.writeFileSync(failedFile, JSON.stringify(failed, null, 2));
    console.log(`\nFailed locations saved to: scripts/uk-failed-geocodes.json`);
  }

  // Clean up the needs geocode file
  if (failed.length === 0) {
    fs.unlinkSync(needsGeocodeFile);
    console.log('Removed uk-needs-geocode.json (all done!)');
  } else {
    fs.writeFileSync(needsGeocodeFile, JSON.stringify(failed, null, 2));
    console.log('Updated uk-needs-geocode.json with remaining locations');
  }
}

main().catch(console.error);
