/**
 * Cleanup script for Australia data
 * Removes locations that shouldn't be in a shower finder app
 */

const fs = require('fs');
const path = require('path');

const ausDir = path.join(process.cwd(), 'public', 'data', 'australia');

// Categories that definitely should NOT be in a shower finder app
const EXCLUDE_CATEGORIES = [
  // Museums
  'Museum', 'Science museum', 'Children\'s museum',
  // Care facilities
  'Nursing home', 'Aged Care Service', 'Retirement community', 'Hospital',
  // Retail
  'Clothing store', 'Shopping mall', 'Nail salon', 'Hair salon', 'Beauty salon',
  'General store', 'Sportswear store', 'Sporting goods store',
  // Office/Events
  'Coworking space', 'Corporate office', 'Function room facility',
  'Convention center', 'Exhibition and trade center', 'Performing arts theater',
  // Tourist/Cultural
  'Historical place', 'Scenic spot', 'Festival', 'Cultural center',
  'Tourist information center',
  // Sports venues (no showers for visitors)
  'Squash court', 'Athletic field', 'Basketball court', 'Skatepark',
  'Badminton complex', 'Golf club', 'Ten Pin Bowling Alley',
  // Entertainment
  'Go-karting venue', 'Laser tag center', 'Amusement center',
  // Services (not shower providers)
  'Contractor', 'Swimming pool contractor', 'Swimming pool repair service',
  'Bathroom supply store', 'Bathroom remodeler', 'Luggage storage facility',
  // Private clubs
  'RSL Club', 'AFL Football Club', 'Youth organization',
  'Non-profit organization', 'Disability services and support organization',
  // Other
  'Marina'
];

function cleanupAustraliaData() {
  console.log('Starting Australia data cleanup...\n');

  let totalRemoved = 0;
  let totalKept = 0;
  const removedByCategory = {};
  const removedByState = {};

  const files = fs.readdirSync(ausDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(ausDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (!data.locations || !Array.isArray(data.locations)) {
      console.log(`Skipping ${file} - no locations array`);
      continue;
    }

    const stateName = data.stateName || file.replace('.json', '');
    const originalCount = data.locations.length;

    // Filter out excluded categories
    const filteredLocations = data.locations.filter(loc => {
      const category = (loc.categories || [])[0] || '';

      if (EXCLUDE_CATEGORIES.includes(category)) {
        // Track what we're removing
        removedByCategory[category] = (removedByCategory[category] || 0) + 1;
        removedByState[stateName] = (removedByState[stateName] || 0) + 1;
        return false;
      }
      return true;
    });

    const removedCount = originalCount - filteredLocations.length;
    totalRemoved += removedCount;
    totalKept += filteredLocations.length;

    if (removedCount > 0) {
      console.log(`${stateName}: removed ${removedCount} locations (${originalCount} -> ${filteredLocations.length})`);

      // Update the data
      data.locations = filteredLocations;
      if (data.totalLocations) {
        data.totalLocations = filteredLocations.length;
      }

      // Write back
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } else {
      console.log(`${stateName}: no changes (${originalCount} locations)`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('CLEANUP SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total removed: ${totalRemoved}`);
  console.log(`Total kept: ${totalKept}`);

  console.log('\nRemoved by category:');
  Object.entries(removedByCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${count} - ${cat}`);
    });

  console.log('\nRemoved by state:');
  Object.entries(removedByState)
    .sort((a, b) => b[1] - a[1])
    .forEach(([state, count]) => {
      console.log(`  ${count} - ${state}`);
    });
}

// Run if called directly
if (require.main === module) {
  cleanupAustraliaData();
}

module.exports = { cleanupAustraliaData, EXCLUDE_CATEGORIES };
