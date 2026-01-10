const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'public', 'data', 'australia');

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanAddress(address) {
  let cleaned = address
    // Remove unit/suite/level info
    .replace(/^(Unit|Suite|Shop|Level|Lvl|Retail Area|Entry Via)[^\d,]*/gi, '')
    .replace(/\b(Unit|Suite|Shop|Level|Lvl)\s*\d+[a-z]?\/?/gi, '')
    // Remove floor info
    .replace(/\b(Ground Floor|Lower Ground Floor|Basement Level|Floor \d+)\s*[,\/]?\s*/gi, '')
    // Remove business names in parentheses or before commas
    .replace(/\([^)]+\)/g, '')
    // Remove "Cnr" and convert to just the main street
    .replace(/Cnr\.?\s+[^,&]+\s*[&,]\s*/gi, '')
    .replace(/\bCorner of\s+[^,]+,?\s*/gi, '')
    // Remove plus codes
    .replace(/^[A-Z0-9]{4}\+[A-Z0-9]+,?\s*/i, '')
    // Remove business/venue names at start
    .replace(/^[^,]+Caravan Park,?\s*/i, '')
    .replace(/^[^,]+Tourist Park,?\s*/i, '')
    .replace(/^[^,]+Hotel,?\s*/i, '')
    .replace(/^[^,]+Resort,?\s*/i, '')
    .replace(/^[^,]+Cottages?,?\s*/i, '')
    .replace(/^[^,]+Centre,?\s*/i, '')
    .replace(/^The [^,]+,\s*/i, '')
    // Clean up remaining
    .replace(/\s+/g, ' ')
    .replace(/^[,\s]+/, '')
    .replace(/[,\s]+$/, '')
    .trim();

  // Add Australia if not present
  if (!cleaned.toLowerCase().includes('australia')) {
    cleaned += ', Australia';
  }

  return cleaned;
}

// Extract just city/suburb and state for fallback
function getSimpleAddress(address) {
  // Try to extract just the suburb and state
  const match = address.match(/([A-Za-z\s]+)\s+(NSW|VIC|QLD|SA|WA|NT|TAS|ACT)\s*\d*/i);
  if (match) {
    return `${match[1].trim()}, ${match[2]}, Australia`;
  }
  return null;
}

async function geocodeAddress(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=au&limit=1`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'ShowerMap/1.0 (geocoding locations)' }
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

async function main() {
  const failedFile = path.join(__dirname, 'failed-geocodes.json');
  if (!fs.existsSync(failedFile)) {
    console.log('No failed-geocodes.json found');
    return;
  }

  const failed = JSON.parse(fs.readFileSync(failedFile, 'utf8'));
  console.log(`Processing ${failed.length} failed locations\n`);

  const stateData = {};
  let fixed = 0;
  let stillFailed = [];

  for (const loc of failed) {
    // Load state data if not cached
    if (!stateData[loc.state]) {
      const filePath = path.join(dataDir, `${loc.state}.json`);
      stateData[loc.state] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    const data = stateData[loc.state];
    const idx = data.locations.findIndex(l => l.id === loc.id);

    if (idx === -1) {
      console.log(`Could not find ${loc.id} in ${loc.state}`);
      continue;
    }

    const location = data.locations[idx];

    console.log(`[${fixed + stillFailed.length + 1}/${failed.length}] ${loc.title}`);
    console.log(`  Original: ${loc.address}`);

    // Try cleaned address first
    const cleanedAddr = cleanAddress(loc.address);
    console.log(`  Cleaned: ${cleanedAddr}`);

    await delay(1100);
    let result = await geocodeAddress(cleanedAddr);

    // If that fails, try simple suburb + state
    if (!result) {
      const simpleAddr = getSimpleAddress(loc.address);
      if (simpleAddr && simpleAddr !== cleanedAddr) {
        console.log(`  Fallback: ${simpleAddr}`);
        await delay(1100);
        result = await geocodeAddress(simpleAddr);
      }
    }

    if (result) {
      location.lat = result.lat;
      location.lng = result.lng;
      console.log(`  ✓ Fixed: (${result.lat.toFixed(4)}, ${result.lng.toFixed(4)})`);
      fixed++;
    } else {
      console.log(`  ✗ Still failed`);
      stillFailed.push(loc);
    }
    console.log('');
  }

  // Save updated state files
  for (const [state, data] of Object.entries(stateData)) {
    const filePath = path.join(dataDir, `${state}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Saved ${state}.json`);
  }

  console.log(`\n========================================`);
  console.log(`Fixed: ${fixed}`);
  console.log(`Still failed: ${stillFailed.length}`);
  console.log(`========================================`);

  if (stillFailed.length > 0) {
    fs.writeFileSync(failedFile, JSON.stringify(stillFailed, null, 2));
    console.log(`\nRemaining failures saved to scripts/failed-geocodes.json`);
  } else {
    fs.unlinkSync(failedFile);
    console.log(`\nAll locations geocoded! Removed failed-geocodes.json`);
  }
}

main().catch(console.error);
