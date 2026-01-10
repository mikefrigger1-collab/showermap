/**
 * Update all UK lidos to have FREE cost
 *
 * Lidos typically have free outdoor rinse showers
 * (separate from paid pool entry)
 *
 * Usage: node scripts/update-lido-costs.js
 */

const fs = require('fs');
const path = require('path');

const ukDataDir = path.join(__dirname, '..', 'public', 'data', 'uk');

console.log('Updating UK lidos to FREE cost...\n');

const regionFiles = fs.readdirSync(ukDataDir)
  .filter(f => f.endsWith('.json') && f !== 'index.json' && f !== 'uk-free-showers.json');

let totalUpdated = 0;
let updatedLocations = [];

regionFiles.forEach(file => {
  const filePath = path.join(ukDataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  let regionUpdated = 0;

  data.locations.forEach(loc => {
    const businessType = (loc.businessType || '').toLowerCase();
    const title = (loc.title || '').toLowerCase();
    const categories = (loc.categories || []).map(c => c.toLowerCase()).join(' ');
    const combined = businessType + ' ' + title + ' ' + categories;

    // Check if it's a lido
    if (combined.includes('lido') || combined.includes('outdoor pool') || combined.includes('open air pool')) {
      // Update to free (outdoor shower access is typically free at lidos)
      loc.cost = 'Free';
      loc.access = 'Public Access';

      // Add to categories if not present
      if (!loc.categories.some(c => c.toLowerCase() === 'lido')) {
        loc.categories.push('Lido');
      }
      if (!loc.categories.some(c => c.toLowerCase().includes('free'))) {
        loc.categories.push('Free Shower');
      }

      regionUpdated++;
      updatedLocations.push({
        title: loc.title,
        region: file.replace('.json', ''),
        businessType: loc.businessType
      });
    }
  });

  if (regionUpdated > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`${file}: Updated ${regionUpdated} lido(s)`);
    totalUpdated += regionUpdated;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`TOTAL LIDOS UPDATED TO FREE: ${totalUpdated}`);
console.log('='.repeat(50));

if (updatedLocations.length > 0) {
  console.log('\nUpdated locations:');
  updatedLocations.forEach(loc => {
    console.log(`  - ${loc.title} (${loc.region})`);
  });
}

console.log('\nDone!');
