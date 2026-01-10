const fs = require('fs');
const path = require('path');

const ukDataDir = path.join(__dirname, '..', 'public', 'data', 'uk');
const regionFiles = fs.readdirSync(ukDataDir).filter(f => f.endsWith('.json') && f !== 'index.json' && f !== 'uk-free-showers.json');

let totalLocations = 0;
let freeLocations = 0;
let freeByRegion = {};
let freeExamples = [];

regionFiles.forEach(file => {
  const data = JSON.parse(fs.readFileSync(path.join(ukDataDir, file), 'utf8'));
  const regionFree = data.locations.filter(loc => {
    const cost = (loc.cost || '').toLowerCase();
    return cost.includes('free') || cost === '0' || cost === '£0';
  });

  freeByRegion[file.replace('.json', '')] = regionFree.length;
  freeLocations += regionFree.length;
  totalLocations += data.locations.length;

  regionFree.slice(0, 3).forEach(loc => {
    freeExamples.push(`${loc.title} (${file.replace('.json', '')})`);
  });
});

console.log('FREE locations by region:\n');
Object.entries(freeByRegion).sort((a,b) => b[1] - a[1]).forEach(([region, count]) => {
  if (count > 0) console.log(`  ${region}: ${count}`);
});

console.log('');
console.log(`TOTAL FREE: ${freeLocations} / ${totalLocations} (${Math.round(freeLocations/totalLocations*100)}%)`);

if (freeExamples.length > 0) {
  console.log('\nSample free locations:');
  freeExamples.slice(0, 20).forEach(ex => console.log(`  - ${ex}`));
}
