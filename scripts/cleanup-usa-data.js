/**
 * Cleanup script for USA data
 * Removes locations that shouldn't be in a shower finder app
 */

const fs = require('fs');
const path = require('path');

const usaDir = path.join(process.cwd(), 'public', 'data', 'states');

// Business types that definitely should NOT be in a shower finder app
const EXCLUDE_BUSINESS_TYPES = [
  // Retail / Food
  'Convenience store', 'Pizza takeaway', 'Pizza delivery', 'Restaurant',
  'American restaurant', 'Fast food restaurant', 'Taco restaurant', 'Pizza restaurant',
  'Punjabi restaurant', 'Diner', 'Coffee shop', 'Cafe', 'Bar', 'Cocktail bar',
  'Butcher shop', 'Produce market', 'Flea market', 'Hardware store', 'Shop',
  'Outlet mall',
  // Vehicle services (not truck stops with showers)
  'Car wash', 'Car Repair Shop', 'Car dealer', 'Used car dealer', 'Auto broker',
  'Car detailing service', 'Tire shop', 'Towing service',
  'Truck repair shop', 'Truck dealer', 'Truck accessories store', 'Used truck dealer',
  // Parking (no showers)
  'Parking lot', 'Public parking space', 'Free parking lot', 'Park & ride',
  // Religious (unless homeless services)
  'Church', 'Christian church', 'Catholic church', 'United Methodist church',
  'Episcopal church', 'Seventh-day Adventist church', 'Mosque', 'Hindu temple',
  'Cathedral', 'Mission', 'Religious institution',
  // Transport infrastructure (no showers)
  'Bus stop', 'ATM', 'Bus Interchange', 'Bike sharing station', 'Bicycle rack',
  'Weigh station', 'Transport hub',
  // Museums/Entertainment
  'Science museum', 'Aquarium', 'Zoo', 'Art gallery', 'Amusement center',
  'Performing arts theater', 'Auditorium', 'Arena', 'Casino',
  // Contractors / Services (not shower providers)
  'Swimming pool contractor', 'Swimming pool repair service', 'Swimming pool supply store',
  'Pool cleaning service', 'Hot tub store', 'Contractor', 'Repair service',
  'Diesel engine repair service', 'Trailer repair shop', 'Manufacturer', 'Warehouse',
  'Agricultural service', 'Agricultural cooperative', 'Financial planner',
  'Office space rental agency', 'Apartment rental agency', 'Travel Agents',
  // Medical (not shower providers)
  'Medical Center', 'Urgent care center', 'Mental health clinic', 'Physiotherapist',
  'Occupational Rehabilitation Centre',
  // Child care (restricted access, not public showers)
  'Child Care Centre', 'Children\'s camp', 'Preschool', 'Child care agency',
  'After school program', 'Nursery school', 'Head start center', 'Children\'s home',
  'Indoor playground', 'Adult day care center',
  // Event venues (not shower providers)
  'Event venue', 'Wedding venue', 'Banquet hall',
  // Other inappropriate
  'Skatepark', 'Basketball court', 'Athletic field', 'Soccer field', 'Playground',
  'Dog park', 'Fountain', 'Lake', 'Water', 'Garden', 'Botanical garden',
  'Community garden', 'Historical landmark', 'Fortress',
  // Food services
  'Food processing company', 'Food court', 'Mobile caterer',
  // Offices
  'Corporate office', 'Business center', 'Art center',
  // Organizations (usually restricted)
  'Fraternal organization', 'Student union', 'Women\'s Organisation',
  'Support group', 'Crisis center', 'Gay & Lesbian Organisation',
  'Arts organization', 'Volunteer organization',
  // Government offices (not shower providers)
  'City government office', 'State government office', 'Government office',
  'Local government office', 'Council',
  // Summer camps (seasonal, restricted)
  'Summer camp organizer',
  // Education (restricted access)
  'Education center',
  // Misc
  'Band', 'Tradesmen', 'Fuel supplier', 'Diesel fuel supplier',
  'Club' // generic clubs are usually private
];

// Categories to clean up (keep only primary, remove combos)
const CATEGORY_CLEANUP_RULES = {
  // If category contains these duplications, simplify
  'Truck Stop, Public Facility': 'Truck Stop',
  'Public Facility, Truck Stop': 'Truck Stop',
  'Community Center, Public Facility': 'Community Center',
  'Public Facility, Community Center': 'Community Center',
  'Recreation Center, Public Facility': 'Recreation Center',
  'Public Facility, Recreation Center': 'Recreation Center',
  'Public Pool, Public Facility': 'Public Pool',
  'Public Facility, Public Pool': 'Public Pool',
  'Public Facility, Gym': 'Gym',
  'YMCA, Gym': 'YMCA',
  'YMCA, Public Facility': 'YMCA'
};

function cleanupUSAData() {
  console.log('Starting USA data cleanup...\n');

  let totalRemoved = 0;
  let totalKept = 0;
  const removedByType = {};
  const removedByState = {};

  const files = fs.readdirSync(usaDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(usaDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (!data.locations || !Array.isArray(data.locations)) {
      console.log(`Skipping ${file} - no locations array`);
      continue;
    }

    const stateName = data.stateName || file.replace('.json', '');
    const originalCount = data.locations.length;

    // Filter out excluded business types
    const filteredLocations = data.locations.filter(loc => {
      const businessType = (loc.businessType || '').trim();

      if (EXCLUDE_BUSINESS_TYPES.includes(businessType)) {
        // Track what we're removing
        removedByType[businessType] = (removedByType[businessType] || 0) + 1;
        removedByState[stateName] = (removedByState[stateName] || 0) + 1;
        return false;
      }
      return true;
    });

    // Clean up category field (simplify combos)
    filteredLocations.forEach(loc => {
      if (loc.category && CATEGORY_CLEANUP_RULES[loc.category]) {
        loc.category = CATEGORY_CLEANUP_RULES[loc.category];
      }
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

  console.log('\nRemoved by business type:');
  Object.entries(removedByType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  ${count} - ${type}`);
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
  cleanupUSAData();
}

module.exports = { cleanupUSAData, EXCLUDE_BUSINESS_TYPES };
