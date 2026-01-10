/**
 * Import Australia Truck Stop Locations from CSV files
 *
 * Parses 4 different CSV formats and merges into existing state JSON files
 * Uses OpenStreetMap Nominatim for geocoding addresses without coordinates
 */

const fs = require('fs');
const path = require('path');

const ausDir = path.join(process.cwd(), 'public', 'data', 'australia');

// State mapping
const stateMapping = {
  'NSW': { slug: 'new-south-wales', name: 'New South Wales' },
  'QLD': { slug: 'queensland', name: 'Queensland' },
  'VIC': { slug: 'victoria', name: 'Victoria' },
  'SA': { slug: 'south-australia', name: 'South Australia' },
  'WA': { slug: 'western-australia', name: 'Western Australia' },
  'NT': { slug: 'northern-territory', name: 'Northern Territory' },
  'TAS': { slug: 'tasmania', name: 'Tasmania' },
  'ACT': { slug: 'australian-capital-territory', name: 'Australian Capital Territory' }
};

// Delay function for rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate slug from title
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Geocode address using OpenStreetMap Nominatim
async function geocodeAddress(address) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=au&limit=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ShowerMap/1.0 (https://showermap.com)',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.log(`  Geocoding failed for: ${address} (HTTP ${response.status})`);
      return { lat: 0, lng: 0 };
    }

    const data = await response.json();

    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }

    console.log(`  No geocoding result for: ${address}`);
    return { lat: 0, lng: 0 };
  } catch (error) {
    console.log(`  Geocoding error for ${address}: ${error.message}`);
    return { lat: 0, lng: 0 };
  }
}

// Extract state from address string
function extractStateFromAddress(address) {
  const statePatterns = [
    /\b(NSW)\b/i,
    /\b(QLD)\b/i,
    /\b(VIC)\b/i,
    /\b(SA)\b/i,
    /\b(WA)\b/i,
    /\b(NT)\b/i,
    /\b(TAS)\b/i,
    /\b(ACT)\b/i
  ];

  for (const pattern of statePatterns) {
    const match = address.match(pattern);
    if (match) {
      return match[1].toUpperCase();
    }
  }
  return null;
}

// Extract postcode from address
function extractPostcode(address) {
  const match = address.match(/\b(\d{4})\b/);
  return match ? match[1] : '';
}

// Create location object
function createLocation(data, index, brand) {
  const stateInfo = stateMapping[data.state] || { slug: 'unknown', name: data.state };

  return {
    id: `ts-${brand.toLowerCase().replace(/\s+/g, '-')}-${index}`,
    slug: slugify(data.title),
    title: data.title,
    address: data.address,
    street: data.street || data.address.split(',')[0] || '',
    city: data.city || '',
    postcode: data.postcode || '',
    zip: data.postcode || '',
    province: stateInfo.name,
    state: stateInfo.name,
    country: 'Australia',
    lat: data.lat || 0,
    lng: data.lng || 0,
    phone: data.phone || '',
    email: '',
    website: '',
    rating: 0,
    reviewCount: 0,
    categories: ['Truck Stop'],
    amenities: ['Showers', 'Toilets', 'Parking', 'Fuel'],
    cost: 'A$5-15',
    access: 'Pay Per Use',
    hours: data.hours || {},
    showerReviews: [],
    showerReviewCount: 0,
    businessType: 'Truck stop',
    verified: false,
    lastUpdated: new Date().toISOString(),
    content: `${data.title} is a truck stop with shower facilities in ${data.city || stateInfo.name}, Australia. Showers available for truck drivers and travelers.`
  };
}

// Parse truckstops1.csv (BP/24Seven) - has GPS
function parseTruckstops1(content) {
  const lines = content.split('\n');
  const locations = [];

  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV - handle commas in fields
    const parts = line.split(',');
    if (parts.length < 7) continue;

    const name = parts[0].trim();
    const address = parts[1].trim();
    const city = parts[2].trim();
    const state = parts[3].trim();
    const postcode = parts[4].trim();
    const lat = parseFloat(parts[5]);
    const lng = parseFloat(parts[6]);
    const phone = parts[7] ? parts[7].trim() : '';
    const is24Hours = parts[8] === 'TRUE';

    // Parse hours
    const hours = {};
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (is24Hours) {
      days.forEach(day => hours[day] = '00:00-23:59');
    } else {
      for (let j = 0; j < 7; j++) {
        const hourVal = parts[9 + j];
        if (hourVal && hourVal.trim()) {
          hours[days[j]] = hourVal.trim();
        }
      }
    }

    const fullAddress = `${address}, ${city}, ${state} ${postcode}`;

    locations.push({
      title: name,
      address: fullAddress,
      street: address,
      city: city,
      state: state,
      postcode: postcode,
      lat: lat,
      lng: lng,
      phone: phone,
      hours: hours
    });
  }

  return locations;
}

// Parse truckstops2.csv (Shell) - messy format, no GPS
function parseTruckstops2(content) {
  const lines = content.split('\n');
  const locations = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith(',')) continue;

    // Parse the line - format is: Name,Address,empty,empty,empty,empty,empty,phone
    const parts = line.split(',');
    const name = parts[0].trim();

    if (!name || name.length < 3) continue;

    // Try to extract address - it might be in the second column or merged with name
    let address = parts[1] ? parts[1].trim() : '';
    let phone = parts[parts.length - 1] ? parts[parts.length - 1].trim() : '';

    // Some entries have address merged with name like "SHELL REDDY EXPRESS GARBUTT346 Ingham Road"
    const nameAddressMatch = name.match(/^(SHELL\s+[\w\s]+?)(\d+.*)/i);
    if (nameAddressMatch && !address) {
      address = nameAddressMatch[2].trim();
    }

    // If address still in name (like "SHELL COOBER PEDY ROADHOUSE,454 Hutchison St Coober Pedy SA 5723")
    if (!address && parts[1]) {
      address = parts[1].trim();
    }

    // Extract state from address
    const state = extractStateFromAddress(address) || extractStateFromAddress(name);
    if (!state) continue;

    const postcode = extractPostcode(address);

    // Clean up phone (remove non-digits except +)
    if (phone) {
      phone = phone.replace(/[^\d+]/g, '');
      if (phone.length >= 8 && !phone.startsWith('+')) {
        phone = '+61 ' + phone;
      }
    }

    // Extract city from address
    const addressParts = address.split(/\s+/);
    let city = '';
    for (let j = addressParts.length - 1; j >= 0; j--) {
      if (addressParts[j].match(/^(NSW|QLD|VIC|SA|WA|NT|TAS|ACT)$/i)) {
        city = addressParts.slice(0, j).join(' ').replace(/^\d+\s*/, '').replace(/\s+(St|Street|Rd|Road|Hwy|Highway|Ave|Avenue|Dr|Drive|Pde|Parade).*$/i, '');
        break;
      }
    }

    locations.push({
      title: name.replace(/\d+.*$/, '').trim(),
      address: address,
      street: address.split(/\s+(NSW|QLD|VIC|SA|WA|NT|TAS|ACT)/i)[0] || address,
      city: city,
      state: state,
      postcode: postcode,
      lat: 0,
      lng: 0,
      phone: phone,
      hours: {},
      needsGeocoding: true
    });
  }

  return locations;
}

// Parse truckstops3-ampol.csv - has line breaks in fields
function parseTruckstops3(content) {
  const locations = [];

  // Clean up content - remove line breaks within fields
  const cleanedContent = content.replace(/\r\n/g, '\n').replace(/"\s*\n\s*/g, ' ').replace(/\n\s*"/g, ' ');
  const lines = cleanedContent.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === ',,,,') continue;

    const parts = line.split(',');
    const name = parts[0] ? parts[0].trim().replace(/"/g, '') : '';
    const address = parts[1] ? parts[1].trim().replace(/"/g, '') : '';
    const state = parts[4] ? parts[4].trim() : '';

    if (!name || name.length < 3) continue;
    if (!state || !stateMapping[state]) continue;

    const postcode = extractPostcode(address);

    // Try to extract city from the name (e.g., "ALLIGATOR CREEK" -> city is Alligator Creek area)
    const city = name.replace(/AMPOL\s*/i, '').replace(/\s*\([^)]*\)/g, '').trim();

    const fullAddress = address ? `${address}, ${city}, ${state}` : `${city}, ${state}`;

    locations.push({
      title: `Ampol ${name}`,
      address: fullAddress,
      street: address || '',
      city: city,
      state: state,
      postcode: postcode,
      lat: 0,
      lng: 0,
      phone: '',
      hours: {},
      needsGeocoding: true
    });
  }

  return locations;
}

// Parse truckstops4.csv (Caltex) - multi-line format: name, address (next line), hours (next line)
function parseTruckstops4(content) {
  const locations = [];
  // Normalize line endings
  const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  let i = 0;
  while (i < lines.length) {
    const nameLine = lines[i].trim().replace(/,\s*$/, '');

    // Skip empty lines
    if (!nameLine || nameLine === ',') {
      i++;
      continue;
    }

    // Check if this is a name line (starts with Caltex or Choice)
    if (nameLine.match(/^(Caltex|Choice)/i)) {
      const title = nameLine;

      // Next line should be address
      i++;
      if (i >= lines.length) break;

      let addressLine = lines[i].trim();
      // Remove surrounding quotes and trailing comma
      addressLine = addressLine.replace(/^"|"$/g, '').replace(/,\s*$/, '').replace(/"/g, '');

      // Extract state and postcode from address
      const state = extractStateFromAddress(addressLine);
      const postcode = extractPostcode(addressLine);

      if (!state) {
        i++;
        continue; // Skip if no state found
      }

      // Extract city from address - format is "Street, City, STATE postcode"
      let city = '';
      const cityMatch = addressLine.match(/,\s*([^,]+),\s*(NSW|QLD|VIC|SA|WA|NT|TAS|ACT)/i);
      if (cityMatch) {
        city = cityMatch[1].trim();
      }

      // Next line should be hours
      i++;
      let hours = {};
      if (i < lines.length) {
        let hoursLine = lines[i].trim().replace(/,\s*$/, '').replace(/"/g, '');
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        if (hoursLine.includes('Operating Hours')) {
          if (hoursLine.includes('Daily 24 Hours') || hoursLine.includes('Daily 24 hours')) {
            days.forEach(day => hours[day] = '00:00-23:59');
          } else {
            // Parse "Daily 5am-10pm" format
            const dailyMatch = hoursLine.match(/Daily\s+(\d+(?::\d+)?(?:am|pm)?)\s*-\s*(\d+(?::\d+)?(?:am|pm)?)/i);
            if (dailyMatch) {
              days.forEach(day => hours[day] = `${dailyMatch[1]}-${dailyMatch[2]}`);
            }
          }
        }
      }

      locations.push({
        title: title,
        address: addressLine,
        street: addressLine.split(',')[0] || '',
        city: city,
        state: state,
        postcode: postcode,
        lat: 0,
        lng: 0,
        phone: '',
        hours: hours,
        needsGeocoding: true
      });
    }

    i++;
  }

  return locations;
}

// Check for duplicates
function isDuplicate(newLoc, existingLocations) {
  const newTitle = newLoc.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const newAddress = newLoc.address.toLowerCase().replace(/[^a-z0-9]/g, '');

  for (const existing of existingLocations) {
    const existingTitle = (existing.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const existingAddress = (existing.address || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    // Check title similarity
    if (existingTitle && newTitle && existingTitle.includes(newTitle.slice(0, 15))) {
      return true;
    }

    // Check address similarity
    if (existingAddress && newAddress && existingAddress.includes(newAddress.slice(0, 20))) {
      return true;
    }

    // Check GPS proximity (within ~100m)
    if (newLoc.lat && newLoc.lng && existing.lat && existing.lng) {
      const latDiff = Math.abs(newLoc.lat - existing.lat);
      const lngDiff = Math.abs(newLoc.lng - existing.lng);
      if (latDiff < 0.001 && lngDiff < 0.001) {
        return true;
      }
    }
  }

  return false;
}

// Main import function
async function importTruckstops() {
  console.log('Starting Australia truck stop import...\n');

  const stats = {
    file1: { parsed: 0, imported: 0, duplicates: 0 },
    file2: { parsed: 0, imported: 0, duplicates: 0, geocoded: 0 },
    file3: { parsed: 0, imported: 0, duplicates: 0, geocoded: 0 },
    file4: { parsed: 0, imported: 0, duplicates: 0, geocoded: 0 }
  };

  // Load all state JSON files
  const stateData = {};
  for (const [code, info] of Object.entries(stateMapping)) {
    const filePath = path.join(ausDir, `${info.slug}.json`);
    if (fs.existsSync(filePath)) {
      stateData[code] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  }

  // Collect all new locations by state
  const newLocationsByState = {};
  for (const code of Object.keys(stateMapping)) {
    newLocationsByState[code] = [];
  }

  // Parse truckstops1.csv (BP/24Seven)
  console.log('=== Parsing truckstops1.csv (BP/24Seven) ===');
  const file1Path = path.join(ausDir, 'truckstops1.csv');
  if (fs.existsSync(file1Path)) {
    const content = fs.readFileSync(file1Path, 'utf8');
    const locations = parseTruckstops1(content);
    stats.file1.parsed = locations.length;
    console.log(`Parsed ${locations.length} locations`);

    for (const loc of locations) {
      if (!loc.state || !stateMapping[loc.state]) {
        console.log(`  Skipping (unknown state): ${loc.title}`);
        continue;
      }

      const existingLocs = stateData[loc.state]?.locations || [];
      if (isDuplicate(loc, existingLocs)) {
        stats.file1.duplicates++;
        continue;
      }

      const location = createLocation(loc, stats.file1.imported, 'BP');
      newLocationsByState[loc.state].push(location);
      stats.file1.imported++;
    }
    console.log(`Imported: ${stats.file1.imported}, Duplicates: ${stats.file1.duplicates}\n`);
  }

  // Parse truckstops2.csv (Shell)
  console.log('=== Parsing truckstops2.csv (Shell) ===');
  const file2Path = path.join(ausDir, 'truckstops2.csv');
  if (fs.existsSync(file2Path)) {
    const content = fs.readFileSync(file2Path, 'utf8');
    const locations = parseTruckstops2(content);
    stats.file2.parsed = locations.length;
    console.log(`Parsed ${locations.length} locations`);

    for (const loc of locations) {
      if (!loc.state || !stateMapping[loc.state]) {
        console.log(`  Skipping (unknown state): ${loc.title}`);
        continue;
      }

      const existingLocs = stateData[loc.state]?.locations || [];
      const newLocs = newLocationsByState[loc.state] || [];
      if (isDuplicate(loc, [...existingLocs, ...newLocs])) {
        stats.file2.duplicates++;
        continue;
      }

      // Geocode
      if (loc.needsGeocoding && loc.address) {
        console.log(`  Geocoding: ${loc.address}`);
        const coords = await geocodeAddress(loc.address);
        loc.lat = coords.lat;
        loc.lng = coords.lng;
        stats.file2.geocoded++;
        await delay(1100); // Rate limit
      }

      const location = createLocation(loc, stats.file2.imported, 'Shell');
      newLocationsByState[loc.state].push(location);
      stats.file2.imported++;
    }
    console.log(`Imported: ${stats.file2.imported}, Duplicates: ${stats.file2.duplicates}, Geocoded: ${stats.file2.geocoded}\n`);
  }

  // Parse truckstops3-ampol.csv
  console.log('=== Parsing truckstops3-ampol.csv (Ampol) ===');
  const file3Path = path.join(ausDir, 'truckstops3-ampol.csv');
  if (fs.existsSync(file3Path)) {
    const content = fs.readFileSync(file3Path, 'utf8');
    const locations = parseTruckstops3(content);
    stats.file3.parsed = locations.length;
    console.log(`Parsed ${locations.length} locations`);

    for (const loc of locations) {
      if (!loc.state || !stateMapping[loc.state]) {
        console.log(`  Skipping (unknown state): ${loc.title}`);
        continue;
      }

      const existingLocs = stateData[loc.state]?.locations || [];
      const newLocs = newLocationsByState[loc.state] || [];
      if (isDuplicate(loc, [...existingLocs, ...newLocs])) {
        stats.file3.duplicates++;
        continue;
      }

      // Geocode
      if (loc.needsGeocoding && loc.address) {
        console.log(`  Geocoding: ${loc.address}`);
        const coords = await geocodeAddress(loc.address);
        loc.lat = coords.lat;
        loc.lng = coords.lng;
        stats.file3.geocoded++;
        await delay(1100); // Rate limit
      }

      const location = createLocation(loc, stats.file3.imported, 'Ampol');
      newLocationsByState[loc.state].push(location);
      stats.file3.imported++;
    }
    console.log(`Imported: ${stats.file3.imported}, Duplicates: ${stats.file3.duplicates}, Geocoded: ${stats.file3.geocoded}\n`);
  }

  // Parse truckstops4.csv (Caltex)
  console.log('=== Parsing truckstops4.csv (Caltex) ===');
  const file4Path = path.join(ausDir, 'truckstops4.csv');
  if (fs.existsSync(file4Path)) {
    const content = fs.readFileSync(file4Path, 'utf8');
    const locations = parseTruckstops4(content);
    stats.file4.parsed = locations.length;
    console.log(`Parsed ${locations.length} locations`);

    for (const loc of locations) {
      if (!loc.state || !stateMapping[loc.state]) {
        console.log(`  Skipping (unknown state): ${loc.title}`);
        continue;
      }

      const existingLocs = stateData[loc.state]?.locations || [];
      const newLocs = newLocationsByState[loc.state] || [];
      if (isDuplicate(loc, [...existingLocs, ...newLocs])) {
        stats.file4.duplicates++;
        continue;
      }

      // Geocode
      if (loc.needsGeocoding && loc.address) {
        console.log(`  Geocoding: ${loc.address}`);
        const coords = await geocodeAddress(loc.address);
        loc.lat = coords.lat;
        loc.lng = coords.lng;
        stats.file4.geocoded++;
        await delay(1100); // Rate limit
      }

      const location = createLocation(loc, stats.file4.imported, 'Caltex');
      newLocationsByState[loc.state].push(location);
      stats.file4.imported++;
    }
    console.log(`Imported: ${stats.file4.imported}, Duplicates: ${stats.file4.duplicates}, Geocoded: ${stats.file4.geocoded}\n`);
  }

  // Merge into state JSON files
  console.log('=== Merging into state JSON files ===');
  for (const [code, info] of Object.entries(stateMapping)) {
    const newLocs = newLocationsByState[code];
    if (newLocs.length === 0) continue;

    const filePath = path.join(ausDir, `${info.slug}.json`);
    if (!stateData[code]) {
      console.log(`  Creating new file: ${info.slug}.json`);
      stateData[code] = {
        state: info.slug,
        stateName: info.name,
        country: 'Australia',
        locations: []
      };
    }

    const beforeCount = stateData[code].locations.length;
    stateData[code].locations = [...stateData[code].locations, ...newLocs];
    const afterCount = stateData[code].locations.length;

    fs.writeFileSync(filePath, JSON.stringify(stateData[code], null, 2));
    console.log(`  ${info.name}: ${beforeCount} -> ${afterCount} (+${newLocs.length})`);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('IMPORT SUMMARY');
  console.log('='.repeat(50));
  console.log(`truckstops1.csv (BP):     ${stats.file1.imported} imported, ${stats.file1.duplicates} duplicates`);
  console.log(`truckstops2.csv (Shell):  ${stats.file2.imported} imported, ${stats.file2.duplicates} duplicates, ${stats.file2.geocoded} geocoded`);
  console.log(`truckstops3.csv (Ampol):  ${stats.file3.imported} imported, ${stats.file3.duplicates} duplicates, ${stats.file3.geocoded} geocoded`);
  console.log(`truckstops4.csv (Caltex): ${stats.file4.imported} imported, ${stats.file4.duplicates} duplicates, ${stats.file4.geocoded} geocoded`);

  const totalImported = stats.file1.imported + stats.file2.imported + stats.file3.imported + stats.file4.imported;
  const totalDuplicates = stats.file1.duplicates + stats.file2.duplicates + stats.file3.duplicates + stats.file4.duplicates;
  const totalGeocoded = stats.file2.geocoded + stats.file3.geocoded + stats.file4.geocoded;

  console.log('---');
  console.log(`TOTAL: ${totalImported} truck stops imported, ${totalDuplicates} duplicates skipped, ${totalGeocoded} addresses geocoded`);
}

// Run if called directly
if (require.main === module) {
  importTruckstops().catch(console.error);
}

module.exports = { importTruckstops };
