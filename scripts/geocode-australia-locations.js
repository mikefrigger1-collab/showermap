const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'public', 'data', 'australia');

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function geocodeAddress(address) {
  // Clean up address for better geocoding
  let query = address
    .replace(/\s+/g, ' ')
    .trim();

  // Add Australia if not present
  if (!query.toLowerCase().includes('australia')) {
    query += ', Australia';
  }

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
  const states = ['queensland', 'new-south-wales', 'victoria', 'south-australia', 'western-australia', 'northern-territory', 'tasmania', 'australian-capital-territory'];

  let totalProcessed = 0;
  let totalGeocoded = 0;
  let totalFailed = 0;
  const failedLocations = [];

  for (const state of states) {
    const filePath = path.join(dataDir, `${state}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const needsGeocoding = data.locations.filter(l => l.lat === 0 || l.lng === 0);

    if (needsGeocoding.length === 0) {
      console.log(`${state}: No locations need geocoding`);
      continue;
    }

    console.log(`\n${state}: ${needsGeocoding.length} locations to geocode`);
    let stateGeocoded = 0;
    let stateFailed = 0;

    for (let i = 0; i < needsGeocoding.length; i++) {
      const loc = needsGeocoding[i];
      totalProcessed++;

      // Progress indicator
      process.stdout.write(`  [${i + 1}/${needsGeocoding.length}] ${loc.title.substring(0, 40)}...`);

      await delay(1100); // Rate limit: 1 request per second
      const result = await geocodeAddress(loc.address);

      if (result) {
        // Update the location in the data array
        const idx = data.locations.findIndex(l => l.id === loc.id);
        if (idx !== -1) {
          data.locations[idx].lat = result.lat;
          data.locations[idx].lng = result.lng;
        }
        console.log(` ✓ (${result.lat.toFixed(4)}, ${result.lng.toFixed(4)})`);
        stateGeocoded++;
        totalGeocoded++;
      } else {
        console.log(' ✗ FAILED');
        stateFailed++;
        totalFailed++;
        failedLocations.push({ state, title: loc.title, address: loc.address, id: loc.id });
      }
    }

    // Save state file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`  Saved ${state}.json (${stateGeocoded} geocoded, ${stateFailed} failed)`);
  }

  console.log(`\n========================================`);
  console.log(`Total processed: ${totalProcessed}`);
  console.log(`Successfully geocoded: ${totalGeocoded}`);
  console.log(`Failed: ${totalFailed}`);
  console.log(`========================================`);

  if (failedLocations.length > 0) {
    console.log(`\nFailed locations:`);
    failedLocations.forEach(f => {
      console.log(`  ${f.state} | ${f.title} | ${f.address}`);
    });

    // Save failed locations to file for review
    fs.writeFileSync(
      path.join(__dirname, 'failed-geocodes.json'),
      JSON.stringify(failedLocations, null, 2)
    );
    console.log(`\nFailed locations saved to scripts/failed-geocodes.json`);
  }
}

main().catch(console.error);
