const fs = require('fs');
const path = require('path');

// Manual geocode fixes with cleaned addresses
const manualFixes = {
  'ts-shell-23': {
    // BLACKWATER - 18 Railway Street Blackwater QLD
    searchQuery: '18 Railway Street, Blackwater, Queensland, Australia',
    fallback: { lat: -23.5857, lng: 148.8079 } // Blackwater QLD center
  },
  'ts-ampol-0': {
    // Benaraby Travel Centre - 48813 Bruce Highway
    searchQuery: '48813 Bruce Highway, Benaraby, Queensland, Australia',
    fallback: { lat: -24.0167, lng: 151.2167 } // Benaraby area
  },
  'ts-ampol-9': {
    // Rockhampton North - 524-528 Yaamba Road
    searchQuery: '524 Yaamba Road, Rockhampton, Queensland, Australia',
    fallback: { lat: -23.3500, lng: 150.5167 } // North Rockhampton
  },
  'ts-caltex-12': {
    // Marlborough North - 13 Perkins Road
    searchQuery: '13 Perkins Road, Marlborough, Queensland, Australia',
    fallback: { lat: -22.8167, lng: 149.8833 } // Marlborough QLD
  },
  'ts-caltex-16': {
    // Nanango - Gretna Lane
    searchQuery: 'Gretna Lane, Nanango, Queensland, Australia',
    fallback: { lat: -26.6667, lng: 151.9833 } // Nanango QLD
  },
  'ts-shell-6': {
    // Buronga - 141 Sturt Highway
    searchQuery: '141 Sturt Highway, Buronga, New South Wales, Australia',
    fallback: { lat: -34.1667, lng: 142.1833 } // Buronga NSW
  },
  'ts-shell-12': {
    // Finley - Newell Hwy & Murray Hut Drive
    searchQuery: 'Newell Highway, Finley, New South Wales, Australia',
    fallback: { lat: -35.6500, lng: 145.5667 } // Finley NSW
  },
  'ts-shell-15': {
    // Wyalong - Mid Western Hwy
    searchQuery: 'Mid Western Highway, Wyalong, New South Wales, Australia',
    fallback: { lat: -33.9333, lng: 147.2333 } // Wyalong NSW
  },
  'ts-ampol-19': {
    // Wyong Southbound - F3 Freeway
    searchQuery: 'F3 Freeway, Wyong, New South Wales, Australia',
    fallback: { lat: -33.2833, lng: 151.4167 } // Wyong area
  },
  'ts-caltex-7': {
    // Forbes Diesel Stop - Parkes Road and Wyndham Avenue
    searchQuery: 'Parkes Road, Forbes, New South Wales, Australia',
    fallback: { lat: -33.3833, lng: 148.0167 } // Forbes NSW
  },
  'ts-shell-7': {
    // Warracknabeal - 213 Henty Highway
    searchQuery: '213 Henty Highway, Warracknabeal, Victoria, Australia',
    fallback: { lat: -36.2500, lng: 142.4000 } // Warracknabeal VIC
  },
  'ts-ampol-22': {
    // Kalkallo - 1340 Hume Highway
    searchQuery: '1340 Hume Highway, Kalkallo, Victoria, Australia',
    fallback: { lat: -37.5167, lng: 144.9500 } // Kalkallo VIC
  },
  'ts-ampol-24': {
    // Yamba Roadhouse - Sturt Highway SA
    searchQuery: 'Sturt Highway, Yamba, South Australia, Australia',
    fallback: { lat: -34.2167, lng: 140.1167 } // Yamba SA area
  },
  'ts-caltex-19': {
    // Port Augusta - National Highway 1
    searchQuery: 'Augusta Highway, Port Augusta, South Australia, Australia',
    fallback: { lat: -32.4833, lng: 137.7833 } // Port Augusta SA
  },
  'ts-ampol-26': {
    // Swagman - Hepburn Street WA
    searchQuery: 'Hepburn Street, Kalgoorlie, Western Australia, Australia',
    fallback: { lat: -30.7500, lng: 121.4667 } // Kalgoorlie WA
  },
  'ts-ampol-27': {
    // Williams - Albany Highway
    searchQuery: 'Albany Highway, Williams, Western Australia, Australia',
    fallback: { lat: -33.0333, lng: 116.8833 } // Williams WA
  },
  'ts-shell-2': {
    // Erldunda - Stuart Hwy & Lasseter Hwy
    searchQuery: 'Stuart Highway, Erldunda, Northern Territory, Australia',
    fallback: { lat: -25.2333, lng: 133.2000 } // Erldunda NT
  },
  'ts-shell-5': {
    // Alice Springs - Dalgety Rd & Lilbili St
    searchQuery: 'Dalgety Road, Alice Springs, Northern Territory, Australia',
    fallback: { lat: -23.7000, lng: 133.8667 } // Alice Springs NT
  },
  'ts-shell-14': {
    // Threeways - Stuart & Barkly Hwys
    searchQuery: 'Stuart Highway, Tennant Creek, Northern Territory, Australia',
    fallback: { lat: -19.6333, lng: 134.1833 } // Threeways/Tennant Creek NT
  }
};

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function geocodeAddress(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=au&limit=1`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'ShowerMap/1.0 (geocoding truck stops)' }
    });
    const data = await response.json();

    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), source: 'nominatim' };
    }
    return null;
  } catch (e) {
    console.error('Geocoding error:', e.message);
    return null;
  }
}

async function main() {
  const dataDir = path.join(__dirname, '..', 'public', 'data', 'australia');
  const states = ['queensland', 'new-south-wales', 'victoria', 'south-australia', 'western-australia', 'northern-territory'];

  let fixed = 0;
  let usedFallback = 0;

  for (const state of states) {
    const filePath = path.join(dataDir, `${state}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let modified = false;

    for (const loc of data.locations) {
      if ((loc.lat === 0 || loc.lng === 0) && loc.businessType === 'Truck stop') {
        const fix = manualFixes[loc.id];

        if (fix) {
          console.log(`\nProcessing: ${loc.id} - ${loc.title}`);
          console.log(`  Searching: ${fix.searchQuery}`);

          await delay(1100); // Rate limit
          const result = await geocodeAddress(fix.searchQuery);

          if (result) {
            loc.lat = result.lat;
            loc.lng = result.lng;
            console.log(`  ✓ Geocoded: ${result.lat}, ${result.lng}`);
            fixed++;
            modified = true;
          } else if (fix.fallback) {
            loc.lat = fix.fallback.lat;
            loc.lng = fix.fallback.lng;
            console.log(`  ⚠ Using fallback: ${fix.fallback.lat}, ${fix.fallback.lng}`);
            fixed++;
            usedFallback++;
            modified = true;
          }
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`\nSaved ${state}.json`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Fixed: ${fixed} locations`);
  console.log(`Used fallback coordinates: ${usedFallback}`);
  console.log(`========================================`);
}

main().catch(console.error);
