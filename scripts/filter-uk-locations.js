/**
 * Filter UK location data to remove spas, massages, and big hotels
 *
 * Removes:
 * - Spas (businessType contains "spa" or "turkish bath")
 * - Massage places (businessType contains "massage")
 * - Hotels (title contains "hotel" but NOT "hostel")
 *
 * Keeps:
 * - Hostels and YHA
 * - Leisure centres, gyms, pools, lidos, truck stops, etc.
 *
 * Usage: node scripts/filter-uk-locations.js
 */

const fs = require('fs');
const path = require('path');

const ukDataDir = path.join(__dirname, '..', 'public', 'data', 'uk');

function shouldExclude(location) {
  const businessType = (location.businessType || '').toLowerCase();
  const title = (location.title || '').toLowerCase();

  // KEEP hostels and YHA (check first - these override hotel check)
  if (title.includes('hostel') || title.includes('yha')) {
    return false;
  }

  // REMOVE spas
  if (businessType.includes('spa') || businessType.includes('turkish bath')) {
    return true;
  }

  // REMOVE massage
  if (businessType.includes('massage')) {
    return true;
  }

  // REMOVE hotels
  if (title.includes('hotel') || businessType.includes('hotel')) {
    return true;
  }

  return false;
}

console.log('Filtering UK location data...\n');
console.log('Removing: Spas, Massage places, Hotels');
console.log('Keeping: Hostels, YHA, Leisure centres, Gyms, Pools, etc.\n');

// Get all UK region JSON files
const regionFiles = fs.readdirSync(ukDataDir)
  .filter(f => f.endsWith('.json') && f !== 'index.json');

let totalBefore = 0;
let totalAfter = 0;
let totalRemoved = 0;

regionFiles.forEach(file => {
  const filePath = path.join(ukDataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const before = data.locations.length;

  // Log what we're removing for this region
  const removedLocations = data.locations.filter(loc => shouldExclude(loc));

  data.locations = data.locations.filter(loc => !shouldExclude(loc));
  const after = data.locations.length;
  const removed = before - after;

  // Update totalLocations count in the JSON
  data.totalLocations = after;

  // Write back the filtered data
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log(`${file}: ${before} -> ${after} (removed ${removed})`);

  // Log some examples of what was removed
  if (removedLocations.length > 0) {
    const examples = removedLocations.slice(0, 3);
    examples.forEach(loc => {
      console.log(`  - Removed: "${loc.title}" (${loc.businessType})`);
    });
    if (removedLocations.length > 3) {
      console.log(`  - ... and ${removedLocations.length - 3} more`);
    }
  }

  totalBefore += before;
  totalAfter += after;
  totalRemoved += removed;
});

console.log('\n========================================');
console.log(`TOTAL: ${totalBefore} -> ${totalAfter} (removed ${totalRemoved} locations)`);
console.log('========================================\n');
console.log('Done! UK location data has been filtered.');
