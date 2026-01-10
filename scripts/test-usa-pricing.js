/**
 * Test script to verify USA pricing distribution
 * Uses the same logic as dataLoader.ts getCategoryBasedPricing
 */

const fs = require('fs');
const path = require('path');

function getCategoryBasedPricing(category, country) {
  const normalizedCategory = (category || '').toLowerCase();
  const currency = country === 'UK' ? '£' : country === 'Australia' ? 'A$' : '$';

  // FREE facilities
  if (
    normalizedCategory.includes('beach') ||
    normalizedCategory.includes('public shower') ||
    normalizedCategory.includes('surf club') ||
    normalizedCategory.includes('surf life saving') ||
    normalizedCategory.includes('surf lifesaving') ||
    normalizedCategory.includes('public bathroom') ||
    normalizedCategory.includes('public toilet') ||
    normalizedCategory.includes('wheelchair-accessible bathroom') ||
    normalizedCategory.includes('promenade') ||
    normalizedCategory.includes('outdoor bath') ||
    normalizedCategory.includes('beach pavil') ||
    normalizedCategory.includes('homeless service') ||
    normalizedCategory.includes('homeless shelter') ||
    normalizedCategory.includes('national reserve') ||
    normalizedCategory.includes('nature preserve') ||
    normalizedCategory.includes('hiking area')
  ) {
    return { cost: 'Free', access: 'Public Access' };
  }

  // Council/public pools and leisure centres
  if (
    normalizedCategory.includes('leisure centre') ||
    normalizedCategory.includes('leisure center') ||
    normalizedCategory.includes('aquatic centre') ||
    normalizedCategory.includes('aquatic center') ||
    normalizedCategory.includes('swimming pool') ||
    normalizedCategory.includes('swimming facility') ||
    normalizedCategory.includes('swim club') ||
    normalizedCategory.includes('swimming lake') ||
    normalizedCategory.includes('swimming basin') ||
    normalizedCategory.includes('public pool') ||
    normalizedCategory.includes('council pool') ||
    normalizedCategory.includes('lido')
  ) {
    return { cost: currency + '5-10', access: 'Day Pass' };
  }

  // Gyms and fitness studios
  if (
    normalizedCategory.includes('gym') ||
    normalizedCategory.includes('fitness') ||
    normalizedCategory.includes('health club') ||
    normalizedCategory.includes('yoga studio') ||
    normalizedCategory.includes('pilates') ||
    normalizedCategory.includes('boot camp') ||
    normalizedCategory.includes('personal trainer') ||
    normalizedCategory.includes('rock climbing') ||
    normalizedCategory.includes('martial arts') ||
    normalizedCategory.includes('jujitsu') ||
    normalizedCategory.includes('boxing gym')
  ) {
    return { cost: currency + '10-25 day pass', access: 'Day Pass Available' };
  }

  // YMCA
  if (normalizedCategory.includes('ymca')) {
    return { cost: currency + '10-20', access: 'Day Pass Available' };
  }

  // Recreation/Sports centres and clubs
  if (
    normalizedCategory.includes('recreation') ||
    normalizedCategory.includes('sports centre') ||
    normalizedCategory.includes('sports center') ||
    normalizedCategory.includes('sports club') ||
    normalizedCategory.includes('sports activity') ||
    normalizedCategory.includes('athletics centre') ||
    normalizedCategory.includes('athletics center') ||
    normalizedCategory.includes('stadium') ||
    normalizedCategory.includes('community center') ||
    normalizedCategory.includes('community centre') ||
    normalizedCategory.includes('tennis club') ||
    normalizedCategory.includes('soccer club') ||
    normalizedCategory.includes('basketball club') ||
    normalizedCategory.includes('bowling')
  ) {
    return { cost: currency + '5-15', access: 'Day Pass' };
  }

  // Hostels and Hotels
  if (
    normalizedCategory.includes('hostel') ||
    normalizedCategory.includes('yha') ||
    normalizedCategory.includes('backpacker') ||
    normalizedCategory.includes('hotel') ||
    normalizedCategory.includes('motel')
  ) {
    return { cost: currency + '5-10', access: 'Non-Guest Fee' };
  }

  // Caravan parks / Camping
  if (
    normalizedCategory.includes('caravan') ||
    normalizedCategory.includes('holiday park') ||
    normalizedCategory.includes('holiday home') ||
    normalizedCategory.includes('camping') ||
    normalizedCategory.includes('campsite') ||
    normalizedCategory.includes('campground') ||
    normalizedCategory.includes('accommodation')
  ) {
    return { cost: currency + '5-10', access: 'Day Visitor' };
  }

  // Motorway services / Truck stops / Rest stops
  if (
    normalizedCategory.includes('motorway') ||
    normalizedCategory.includes('service') ||
    normalizedCategory.includes('truck stop') ||
    normalizedCategory.includes('travel center') ||
    normalizedCategory.includes('travel centre') ||
    normalizedCategory.includes('rest area') ||
    normalizedCategory.includes('rest stop') ||
    normalizedCategory.includes('toll road')
  ) {
    return { cost: currency + '10-15', access: 'Pay Per Use' };
  }

  // Day Spa / Wellness centres
  if (
    normalizedCategory.includes('day spa') ||
    normalizedCategory.includes('wellness') ||
    normalizedCategory.includes('massage spa') ||
    normalizedCategory.includes('massage therapist')
  ) {
    return { cost: currency + '30-60', access: 'Entry Fee' };
  }

  // Spas
  if (
    normalizedCategory.includes('spa') ||
    normalizedCategory.includes('turkish bath') ||
    normalizedCategory.includes('public bath')
  ) {
    return { cost: currency + '20-50', access: 'Entry Fee' };
  }

  // Saunas
  if (normalizedCategory.includes('sauna')) {
    return { cost: currency + '15-30', access: 'Entry Fee' };
  }

  // Water parks
  if (normalizedCategory.includes('water park')) {
    return { cost: currency + '30-50', access: 'Entry Fee' };
  }

  // Sports complexes
  if (normalizedCategory.includes('sports complex')) {
    return { cost: currency + '8-15', access: 'Day Pass' };
  }

  // Swimming/Surf schools
  if (
    normalizedCategory.includes('swimming school') ||
    normalizedCategory.includes('swim school') ||
    normalizedCategory.includes('swimming instructor') ||
    normalizedCategory.includes('surf school') ||
    normalizedCategory.includes('sports school')
  ) {
    return { cost: 'Lesson-based', access: 'Students Only' };
  }

  // Petrol/Service stations
  if (
    normalizedCategory.includes('petrol station') ||
    normalizedCategory.includes('service station')
  ) {
    return { cost: currency + '5-15', access: 'Pay Per Use' };
  }

  // Parks (free)
  if (normalizedCategory.includes('park')) {
    return { cost: 'Free', access: 'Public Access' };
  }

  return { cost: 'Contact for pricing', access: 'Contact for access' };
}

const usaDir = path.join(process.cwd(), 'public', 'data', 'states');
const pricing = { free: 0, paid: 0, contact: 0, lesson: 0 };
const unmatchedTypes = {};

fs.readdirSync(usaDir).forEach(file => {
  if (file.endsWith('.json')) {
    const data = JSON.parse(fs.readFileSync(path.join(usaDir, file), 'utf8'));
    data.locations?.forEach(loc => {
      const bt = loc.businessType || '';
      const result = getCategoryBasedPricing(bt, 'USA');

      if (result.cost === 'Free') pricing.free++;
      else if (result.cost === 'Lesson-based') pricing.lesson++;
      else if (result.cost.includes('Contact')) {
        pricing.contact++;
        unmatchedTypes[bt] = (unmatchedTypes[bt] || 0) + 1;
      }
      else pricing.paid++;
    });
  }
});

const total = pricing.free + pricing.paid + pricing.contact + pricing.lesson;
console.log('=== USA Final Pricing Distribution ===');
console.log('Total locations:', total);
console.log('FREE:', pricing.free, '(' + (pricing.free/total*100).toFixed(1) + '%)');
console.log('PAID:', pricing.paid, '(' + (pricing.paid/total*100).toFixed(1) + '%)');
console.log('LESSON:', pricing.lesson, '(' + (pricing.lesson/total*100).toFixed(1) + '%)');
console.log('CONTACT:', pricing.contact, '(' + (pricing.contact/total*100).toFixed(1) + '%)');

console.log('\n=== Remaining Unmatched Business Types ===');
Object.entries(unmatchedTypes).sort((a,b) => b[1] - a[1]).forEach(([type, count]) => {
  console.log(count + ' - ' + (type || '(empty)'));
});
