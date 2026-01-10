// lib/australiaContent.ts
// Australia-specific SEO content generator for ShowerMap

interface CityHighlight {
  name: string;
  description: string;
}

interface FacilityType {
  type: string;
  description: string;
}

interface AustraliaStateInfo {
  name: string;
  code: string;
  // Conversational narrative content
  narrative: {
    intro: string;
    travelersNote?: string;
    localTip?: string;
  };
  // Cities with context
  cities: CityHighlight[];
  // Facility types with descriptions
  facilityTypes: FacilityType[];
  // Pricing as helpful guidance
  pricingContext: {
    budget: string;
    midRange: string;
    premium?: string;
  };
  // Merged seasonal/practical advice
  beforeYouGo?: string;
  // Keep for data accuracy
  priceRange: { low: number; high: number };
}

// Comprehensive Australia state-specific data with conversational content
const australiaStateData: Record<string, AustraliaStateInfo> = {
  'new-south-wales': {
    name: 'New South Wales',
    code: 'NSW',
    narrative: {
      intro: `New South Wales has the most extensive shower infrastructure in Australia, thanks to its 2,000+ kilometres of coastline and the beach culture that comes with it. Sydney alone has free outdoor showers at nearly every patrolled beach - from Bondi to Manly to Cronulla. They're cold water, but after a swim in the Pacific, that's exactly what you want.

Beyond the beaches, NSW has a strong network of aquatic centres run by local councils. These are your reliable option for a hot shower and proper facilities. Most charge A$6-10 for casual entry which includes pool access and changing rooms. The Surf Life Saving clubs dotted along the coast sometimes allow non-members to use their facilities for a small donation.

If you're road-tripping through regional NSW, caravan parks are your friend. Most will let you use their shower facilities for A$5-10 even if you're not staying overnight - just ask at reception.`,
      travelersNote: `The Pacific Highway and Princes Highway both have excellent caravan park coverage for travelers heading up or down the coast. Inland on the Newell Highway, facilities are more spread out - plan your stops.`,
      localTip: `Sydney's ocean pools (like Bronte Baths or Wylie's Baths) are free to use and have changing rooms with showers. They're a uniquely Australian experience worth seeking out.`
    },
    cities: [
      { name: 'Sydney', description: 'Free beach showers everywhere, plus extensive aquatic centre network' },
      { name: 'Newcastle', description: 'Great beach facilities and affordable council pools' },
      { name: 'Wollongong', description: 'Surf beaches with free showers, Continental Pool in the city' },
      { name: 'Byron Bay', description: 'Backpacker-friendly town with hostels offering shower access' },
      { name: 'Coffs Harbour', description: 'Mid-coast stop with beach facilities and aquatic centre' },
      { name: 'Blue Mountains', description: 'Katoomba Sports & Aquatic Centre for mountain visitors' }
    ],
    facilityTypes: [
      { type: 'Beach Showers', description: 'Free cold-water showers at most patrolled beaches along the coast' },
      { type: 'Aquatic Centres', description: 'Council-run pools with full facilities, typically A$6-10 casual entry' },
      { type: 'Ocean Pools', description: 'Free heritage rock pools with basic changing facilities' },
      { type: 'Caravan Parks', description: 'Most allow non-guests to use showers for A$5-10' },
      { type: 'Surf Clubs', description: 'Some allow public use of facilities for a donation' }
    ],
    pricingContext: {
      budget: 'Beach showers and ocean pools are free. Caravan parks charge A$5-10 for shower access.',
      midRange: 'Aquatic centres run A$6-10 for casual entry with full pool and shower access.',
      premium: 'Premium gyms like Fitness First charge A$25-35 for day passes.'
    },
    beforeYouGo: `Summer (Dec-Feb) is peak beach season and facilities get busy. Stinger season doesn't affect NSW beaches. Some regional aquatic centres close for winter maintenance (June-July). Sydney's eastern beaches can be crowded on sunny weekends.`,
    priceRange: { low: 0, high: 35 }
  },

  'victoria': {
    name: 'Victoria',
    code: 'VIC',
    narrative: {
      intro: `Victoria's shower facilities reflect its climate - you'll find fewer beach showers than Queensland or NSW, but an excellent network of indoor aquatic centres that operate year-round. Melbourne alone has dozens of council-run leisure centres, most operated by groups like YMCA Victoria or Aligned Leisure.

The Great Ocean Road is one of Australia's most popular road trips, and caravan parks along the route are well set up for travelers needing a shower. Towns like Torquay, Lorne, Apollo Bay, and Port Campbell all have facilities. Melbourne's beach suburbs (St Kilda, Brighton, Elwood) have free outdoor showers, though the water is cold and the beaches can be bracing even in summer.

For budget-conscious travelers, Victoria has a strong YMCA presence with reasonable day pass rates compared to commercial gyms.`,
      travelersNote: `Melbourne weather is famously unpredictable - four seasons in one day is a real thing. Always have a backup indoor facility in mind, especially if you're relying on beach showers.`,
      localTip: `Melbourne's public pools are a local institution. Try the Melbourne City Baths (since 1860) in the CBD for a historic experience, or the heated outdoor pool at Fitzroy for something more relaxed.`
    },
    cities: [
      { name: 'Melbourne', description: 'Extensive network of council leisure centres and YMCAs' },
      { name: 'Geelong', description: 'Waterfront facilities and Leisurelink Aquatic Centre' },
      { name: 'Ballarat', description: 'Eureka Pool and regional aquatic centre' },
      { name: 'Bendigo', description: 'Bendigo Aquatic Centre with full facilities' },
      { name: 'Great Ocean Road', description: 'Caravan parks along the route cater to road-trippers' },
      { name: 'Phillip Island', description: 'Tourist town with caravan parks and leisure centre' }
    ],
    facilityTypes: [
      { type: 'Leisure Centres', description: 'Council-run facilities throughout Melbourne and regional cities' },
      { type: 'YMCAs', description: 'Strong Victorian network with reasonable day pass rates' },
      { type: 'Beach Showers', description: 'Free at St Kilda, Brighton and other bay beaches (cold water)' },
      { type: 'Caravan Parks', description: 'Great Ocean Road parks are well set up for travelers' },
      { type: 'Public Pools', description: 'Historic heated pools throughout Melbourne suburbs' }
    ],
    pricingContext: {
      budget: 'Beach showers free. Some smaller council pools charge A$4-6.',
      midRange: 'Leisure centres and YMCAs typically A$8-15 for casual entry.',
      premium: 'Premium Melbourne gyms charge A$25-40 for day passes.'
    },
    beforeYouGo: `Victoria is cooler than other Australian states - winter (June-Aug) can be genuinely cold. Indoor facilities operate year-round. Summer brings crowds to the Great Ocean Road; autumn (March-May) is a better time to visit. Melbourne Cup week (early November) makes everything busier.`,
    priceRange: { low: 0, high: 40 }
  },

  'queensland': {
    name: 'Queensland',
    code: 'QLD',
    narrative: {
      intro: `Queensland's subtropical to tropical climate means outdoor facilities are usable year-round, and the state has invested heavily in public shower infrastructure. The Gold Coast has free showers at every surf beach, often with footwashes too. Brisbane's South Bank Parklands includes Streets Beach - a free man-made beach with showers right in the city centre.

The backpacker trail up the coast (Brisbane to Cairns) is well-served by hostels that offer shower access to non-guests. Caravan parks along the Bruce Highway cater to the grey nomad crowd and are happy to let travelers use their facilities.

One thing to know: North of Townsville, you're in stinger season territory from October to May. Beach facilities still operate, but you'll want to swim in stinger nets or stick to the aquatic centres.`,
      travelersNote: `The Bruce Highway stretches 1,700km from Brisbane to Cairns. Plan your stops - some stretches between towns can be 2-3 hours with limited facilities.`,
      localTip: `Brisbane's South Bank has Australia's only inner-city beach with free entry and excellent facilities. Perfect for freshening up if you're passing through the city.`
    },
    cities: [
      { name: 'Brisbane', description: 'South Bank beach is free, plus extensive council aquatic centres' },
      { name: 'Gold Coast', description: 'Free beach showers everywhere from Coolangatta to Southport' },
      { name: 'Sunshine Coast', description: 'Great beach facilities at Noosa, Mooloolaba, and Caloundra' },
      { name: 'Cairns', description: 'Cairns Esplanade Lagoon is free with showers, great for tourists' },
      { name: 'Townsville', description: 'The Strand beachfront with free facilities' },
      { name: 'Airlie Beach', description: 'Backpacker hub with hostel and lagoon facilities' }
    ],
    facilityTypes: [
      { type: 'Beach Showers', description: 'Free at most beaches, especially Gold Coast and Sunshine Coast' },
      { type: 'Public Lagoons', description: 'Free swimming and showers at Cairns Esplanade and Airlie Beach' },
      { type: 'Aquatic Centres', description: 'Council-run facilities throughout, A$5-8 casual entry' },
      { type: 'Hostels', description: 'Backpacker route is well-served with shower access options' },
      { type: 'Caravan Parks', description: 'Along Bruce Highway, most allow non-guest shower use' }
    ],
    pricingContext: {
      budget: 'Beach showers and lagoon facilities are free. Many hostels charge A$5 for shower access.',
      midRange: 'Aquatic centres run A$5-8. Caravan parks typically A$5-10.',
      premium: 'Resort day passes (Surfers Paradise area) can run A$30-50.'
    },
    beforeYouGo: `Stinger season (Oct-May) north of Townsville means beach swimming requires nets or stinger suits. Wet season (Dec-March) can bring cyclones and flooding in the north. Peak tourist season (June-August) sees higher demand, especially in Cairns and Whitsundays.`,
    priceRange: { low: 0, high: 50 }
  },

  'western-australia': {
    name: 'Western Australia',
    code: 'WA',
    narrative: {
      intro: `Western Australia is vast - you could fit most of Western Europe inside it. This means facilities are spread thin once you leave Perth, but the ones that exist are well-maintained and cater specifically to long-distance travelers.

Perth has excellent beach facilities along the coast from Fremantle to Scarborough to Hillarys. The city's aquatic centres are well-equipped and reasonably priced. Once you're on the road, caravan parks become essential. The Stuart Highway north to Broome and the coastal routes south to Esperance are dotted with roadhouses and caravan parks that expect travelers to stop for showers.

The mining boom brought modern facilities to regional towns like Kalgoorlie and Port Hedland that you might not expect. These are lifelines for road-trippers crossing the Nullarbor or heading up to the Kimberley.`,
      travelersNote: `Distances in WA are no joke. Perth to Broome is 2,200km. Roadhouses can be 200-300km apart on some stretches. Always check fuel and plan your shower stops before setting off.`,
      localTip: `Perth's Cottesloe Beach has excellent free facilities and is a local institution for sunset watching. Combine a swim, shower, and sunset for the quintessential Perth experience.`
    },
    cities: [
      { name: 'Perth', description: 'Excellent beach facilities from Fremantle to Scarborough' },
      { name: 'Fremantle', description: 'Historic port town with beach showers and leisure centre' },
      { name: 'Broome', description: 'Cable Beach facilities and caravan parks cater to tourists' },
      { name: 'Margaret River', description: 'Wine region with caravan parks and local recreation centre' },
      { name: 'Kalgoorlie', description: 'Mining town with modern leisure facilities' },
      { name: 'Geraldton', description: 'Mid-coast stop with aquatic centre and beach facilities' }
    ],
    facilityTypes: [
      { type: 'Beach Showers', description: 'Free at Perth metro beaches and major coastal towns' },
      { type: 'Aquatic Centres', description: 'Council facilities in Perth and regional centres, A$6-10' },
      { type: 'Roadhouses', description: 'Essential for outback travel, most have shower facilities' },
      { type: 'Caravan Parks', description: 'Spread along major routes, A$5-15 for shower access' },
      { type: 'Mining Town Facilities', description: 'Modern leisure centres in Pilbara and Goldfields towns' }
    ],
    pricingContext: {
      budget: 'Beach showers free. Roadhouse showers can be free with fuel purchase.',
      midRange: 'Caravan parks A$5-15. Aquatic centres A$6-10.',
      premium: 'Perth premium gyms A$25-35 for day access.'
    },
    beforeYouGo: `WA has two distinct climates - Perth has Mediterranean weather while the north is tropical. Wet season (Nov-April) in the Kimberley can close roads. The Nullarbor crossing has limited facilities - plan carefully. Perth can hit 40C+ in summer (Dec-Feb).`,
    priceRange: { low: 0, high: 35 }
  },

  'south-australia': {
    name: 'South Australia',
    code: 'SA',
    narrative: {
      intro: `South Australia revolves around Adelaide, and the city has solid shower infrastructure through council-run aquatic centres and beach facilities along the Glenelg to Henley Beach strip. The Adelaide Aquatic Centre in North Adelaide is particularly good, with an outdoor 50m pool and modern facilities.

Beyond Adelaide, South Australia is wine country, outback, and coastline. The Fleurieu Peninsula south of Adelaide is popular for beach holidays and has good facilities at Victor Harbor and Port Elliot. The Barossa and Clare Valleys don't have much in terms of public showers - you're relying on accommodation or the occasional caravan park.

For serious outback travelers, the Stuart Highway north toward Darwin and the Eyre Highway west to Perth have roadhouses with shower facilities spaced for long-haul driving.`,
      travelersNote: `Kangaroo Island requires a ferry crossing and has limited facilities outside Kingscote and Penneshaw. Plan your shower stops on the mainland before crossing.`,
      localTip: `Adelaide's Glenelg Beach has excellent free facilities and is easily reached by tram from the city. It's the classic Adelaide beach experience.`
    },
    cities: [
      { name: 'Adelaide', description: 'Adelaide Aquatic Centre and beach facilities from Glenelg to Henley' },
      { name: 'Glenelg', description: 'Popular beach suburb with free showers and tram access to city' },
      { name: 'Victor Harbor', description: 'Fleurieu Peninsula hub with aquatic centre' },
      { name: 'Mount Gambier', description: 'Regional city with council aquatic facility' },
      { name: 'Port Augusta', description: 'Gateway to the outback with good stopping facilities' },
      { name: 'Coober Pedy', description: 'Unique outback town with caravan park facilities' }
    ],
    facilityTypes: [
      { type: 'Beach Showers', description: 'Free along Adelaide metro beaches' },
      { type: 'Aquatic Centres', description: 'Adelaide Aquatic Centre is excellent, A$7.50 casual entry' },
      { type: 'Roadhouses', description: 'Stuart Highway and Eyre Highway have facilities for travelers' },
      { type: 'Caravan Parks', description: 'Throughout wine regions and coastal areas' },
      { type: 'Council Pools', description: 'Regional towns have basic but functional facilities' }
    ],
    pricingContext: {
      budget: 'Beach showers free. Some smaller regional pools A$4-6.',
      midRange: 'Adelaide Aquatic Centre A$7.50. Caravan parks A$5-10.',
      premium: 'Adelaide premium gyms A$20-30 for day passes.'
    },
    beforeYouGo: `Adelaide has a Mediterranean climate - hot, dry summers and mild winters. The outback gets extremely hot (45C+) in summer. Kangaroo Island ferry bookings are essential in peak season. Wine regions have limited public facilities - plan around accommodation.`,
    priceRange: { low: 0, high: 30 }
  },

  'tasmania': {
    name: 'Tasmania',
    code: 'TAS',
    narrative: {
      intro: `Tasmania's compact size makes shower access straightforward - nowhere is more than a few hours from a facility. Hobart and Launceston both have excellent aquatic centres, and the council-run pools throughout the state offer good value.

The island's hiking culture (Cradle Mountain, Freycinet, Overland Track) means facilities near national parks cater to hikers needing a proper wash after multi-day treks. Caravan parks and small-town recreation centres understand this market well.

Beach showers exist but are less common than on the mainland - Tassie waters are cold year-round, so fewer people are rinsing off after ocean swims. The Tamar Valley and East Coast wine regions have limited public facilities, so plan around accommodation or caravan parks.`,
      travelersNote: `Tasmania is cooler than mainland Australia. Even summer (Dec-Feb) can have cool days, and the water is always cold. Indoor heated facilities are popular year-round.`,
      localTip: `The Hobart Aquatic Centre is one of the best in Australia for the price. Good facilities, heated pools, and right near the waterfront.`
    },
    cities: [
      { name: 'Hobart', description: 'Excellent Hobart Aquatic Centre near the waterfront' },
      { name: 'Launceston', description: 'Launceston Aquatic Centre with indoor heated pools' },
      { name: 'Devonport', description: 'Ferry arrival point with nearby recreation facilities' },
      { name: 'Cradle Mountain', description: 'Facilities at gateway towns for Overland Track hikers' },
      { name: 'Freycinet', description: 'Coles Bay has basic facilities for national park visitors' },
      { name: 'Strahan', description: 'West coast town with caravan park options' }
    ],
    facilityTypes: [
      { type: 'Aquatic Centres', description: 'Hobart and Launceston have excellent council facilities' },
      { type: 'Recreation Centres', description: 'Smaller towns have basic but functional pools' },
      { type: 'Caravan Parks', description: 'Well-distributed around the island' },
      { type: 'Hiker Facilities', description: 'Gateway towns near national parks cater to walkers' },
      { type: 'Beach Showers', description: 'Less common than mainland - water is cold year-round' }
    ],
    pricingContext: {
      budget: 'Some smaller council pools A$4-6.',
      midRange: 'Hobart and Launceston aquatic centres A$7-10.',
      premium: 'Premium facilities limited - Hobart gyms around A$20-25.'
    },
    beforeYouGo: `Tasmania has four seasons and changeable weather. Even summer can be cool. Overland Track requires advance booking. Ferry crossings from Melbourne should be booked ahead in peak season. The island is compact - most places are within 2-3 hours of Hobart.`,
    priceRange: { low: 4, high: 25 }
  },

  'northern-territory': {
    name: 'Northern Territory',
    code: 'NT',
    narrative: {
      intro: `The Northern Territory is outback Australia, and facilities are spread accordingly. Darwin has good beach and aquatic centre options, but once you're on the Stuart Highway heading south, roadhouses become your lifeline. The good news is they're well-maintained and expect travelers to stop for showers.

Alice Springs sits roughly in the middle of Australia and serves as a hub for Uluru visitors. It has several aquatic centres and is the last major town with full facilities if you're heading to the Red Centre. Katherine, between Darwin and Alice, has the Katherine Hot Springs (free!) and a council pool.

Kakadu National Park has limited shower facilities - you're mostly relying on camping ground amenities or the Cooinda and Jabiru accommodation complexes.`,
      travelersNote: `The Stuart Highway from Darwin to Alice Springs is 1,500km. Roadhouses are spaced for fuel range but can be 200-300km apart. Always plan your stops and carry water.`,
      localTip: `Darwin's wave pool at the Waterfront Precinct is free and includes showers - perfect for cooling off in the tropical heat without the crocodile risk of natural swimming.`
    },
    cities: [
      { name: 'Darwin', description: 'Waterfront wave pool is free, plus beaches and aquatic centres' },
      { name: 'Alice Springs', description: 'Multiple aquatic centres serving Red Centre visitors' },
      { name: 'Katherine', description: 'Katherine Hot Springs are free with natural swimming' },
      { name: 'Kakadu', description: 'Limited to camping grounds and lodge facilities' },
      { name: 'Uluru', description: 'Resort facilities at Yulara serve all visitors' },
      { name: 'Tennant Creek', description: 'Stuart Highway stop with basic pool facilities' }
    ],
    facilityTypes: [
      { type: 'Roadhouses', description: 'Essential Stuart Highway stops with shower facilities' },
      { type: 'Aquatic Centres', description: 'Darwin and Alice Springs have council facilities' },
      { type: 'Hot Springs', description: 'Katherine Hot Springs and others are free natural options' },
      { type: 'Resort Facilities', description: 'Uluru-Kata Tjuta area relies on Yulara resort amenities' },
      { type: 'Camping Grounds', description: 'National park camping areas have basic showers' }
    ],
    pricingContext: {
      budget: 'Darwin Waterfront and Katherine Hot Springs are free. Camping ground showers included.',
      midRange: 'Aquatic centres A$6-8. Roadhouse showers A$5-10.',
      premium: 'Resort facilities at Uluru can be A$20+ for non-guests.'
    },
    beforeYouGo: `The Top End has two seasons: Wet (Nov-April) with cyclones and flooding, and Dry (May-Oct) which is peak tourist season. Swimming in natural waterways is risky due to crocodiles. Always check road conditions - flooding can close highways for days.`,
    priceRange: { low: 0, high: 25 }
  },

  'australian-capital-territory': {
    name: 'Australian Capital Territory',
    code: 'ACT',
    narrative: {
      intro: `The ACT is essentially Canberra and its surroundings. Being the national capital, it has excellent public facilities for its size. The ACT Government runs several aquatic centres through Active Canberra, and they're well-maintained with reasonable casual entry prices.

Canberra Indoor Aquatic Leisure Centre (CISAC) and the Lakeside Leisure Centre are both popular options with full facilities. The Australian National University also opens its sports facilities to the public.

The ACT is compact - you can get anywhere within 20-30 minutes. If you're visiting Parliament House, the National Gallery, or the War Memorial, there are aquatic centres within easy reach for freshening up.`,
      travelersNote: `Canberra can get very cold in winter (June-Aug) with frost common. Summer (Dec-Feb) is hot but less humid than coastal cities. Air-conditioned facilities are welcome either season.`,
      localTip: `The Canberra Olympic Pool (actually called Canberra International Sports and Aquatic Centre) is the best facility in town - used for national competitions but open to the public.`
    },
    cities: [
      { name: 'Civic', description: 'Central Canberra with CISAC nearby' },
      { name: 'Belconnen', description: 'Lakeside Leisure Centre serves this large suburb' },
      { name: 'Tuggeranong', description: 'Lakeside Leisure Centre South' },
      { name: 'ANU Campus', description: 'University facilities open to public' },
      { name: 'Woden', description: 'Close to several facilities, central location' }
    ],
    facilityTypes: [
      { type: 'Aquatic Centres', description: 'Active Canberra runs excellent facilities, A$7-8 casual entry' },
      { type: 'University Facilities', description: 'ANU opens sports facilities to the public' },
      { type: 'Council Pools', description: 'Several suburban pools with good facilities' },
      { type: 'Gyms', description: 'Commercial gyms throughout with day pass options' }
    ],
    pricingContext: {
      budget: 'Council pool casual entry around A$7-8.',
      midRange: 'Aquatic centres A$7-9 including pool and shower access.',
      premium: 'Commercial gyms A$20-30 for day passes.'
    },
    beforeYouGo: `Canberra has four distinct seasons - cold winters and hot summers. Everything is spread out and designed for cars, but facilities are well-distributed across suburbs. Parliament sits Feb-June and Aug-Dec, which brings more visitors. Floriade (flower festival) in Sept-Oct is peak tourism.`,
    priceRange: { low: 7, high: 30 }
  }
};

export class AustraliaContentGenerator {
  static generateStateContent(stateSlug: string, stats: { totalLocations: number; freeLocations: number; cities: string[]; verifiedCount?: number }): string {
    const state = australiaStateData[stateSlug];
    if (!state) {
      return `<p>Explore public shower facilities across this region of Australia.</p>`;
    }

    return `
      <div class="region-content">
        <h2 class="text-2xl font-bold text-warm-900 mb-6">Finding Showers in ${state.name}</h2>

        <div class="region-intro prose prose-lg max-w-none mb-8">
          ${state.narrative.intro.split('\n\n').map(para => `<p class="text-warm-700 leading-relaxed mb-4">${para.trim()}</p>`).join('')}
        </div>

        ${state.narrative.travelersNote ? `
        <div class="travelers-note bg-secondary-50 border-l-4 border-secondary-400 p-4 mb-8 rounded-r-lg">
          <p class="text-warm-700 text-sm"><strong class="text-secondary-700">Good to know:</strong> ${state.narrative.travelersNote}</p>
        </div>
        ` : ''}

        <div class="stats-narrative bg-warm-50 p-6 rounded-xl mb-8">
          <p class="text-warm-700">
            We've mapped <strong class="text-primary-600">${stats.totalLocations}+ shower locations</strong> across ${state.name},
            with <strong class="text-primary-600">${stats.verifiedCount || 0} verified by travelers</strong> like you.
            You'll find facilities in <strong class="text-primary-600">${stats.cities.length}+ cities and towns</strong> throughout the state.
          </p>
        </div>

        <h3 class="text-xl font-bold text-warm-900 mt-10 mb-4">Where to Find Showers</h3>
        <div class="city-highlights grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          ${state.cities.map(city => `
            <div class="city-item bg-white border border-warm-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
              <h4 class="font-semibold text-warm-900 mb-1">${city.name}</h4>
              <p class="text-sm text-warm-600">${city.description}</p>
            </div>
          `).join('')}
        </div>

        <h3 class="text-xl font-bold text-warm-900 mt-10 mb-4">Types of Facilities</h3>
        <div class="facility-overview space-y-4 mb-8">
          ${state.facilityTypes.map(facility => `
            <div class="facility-category bg-white border border-warm-200 rounded-lg p-4">
              <h4 class="font-semibold text-warm-900 mb-1">${facility.type}</h4>
              <p class="text-sm text-warm-600">${facility.description}</p>
            </div>
          `).join('')}
        </div>

        <h3 class="text-xl font-bold text-warm-900 mt-10 mb-4">What You'll Typically Pay</h3>
        <div class="pricing-advice bg-white border border-warm-200 rounded-xl p-6 mb-8">
          <div class="space-y-3">
            <p class="text-warm-700"><span class="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span><strong>Budget:</strong> ${state.pricingContext.budget}</p>
            <p class="text-warm-700"><span class="inline-block w-3 h-3 bg-amber-500 rounded-full mr-2"></span><strong>Mid-range:</strong> ${state.pricingContext.midRange}</p>
            ${state.pricingContext.premium ? `<p class="text-warm-700"><span class="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2"></span><strong>Premium:</strong> ${state.pricingContext.premium}</p>` : ''}
          </div>
        </div>

        ${state.beforeYouGo ? `
        <div class="helpful-note bg-accent-50 border-l-4 border-accent-400 p-5 rounded-r-lg mb-8">
          <h4 class="font-semibold text-warm-900 mb-2">Before You Go</h4>
          <p class="text-warm-700 text-sm">${state.beforeYouGo}</p>
        </div>
        ` : ''}

        ${state.narrative.localTip ? `
        <div class="local-tip bg-primary-50 border-l-4 border-primary-400 p-5 rounded-r-lg">
          <h4 class="font-semibold text-warm-900 mb-2">Local Tip</h4>
          <p class="text-warm-700 text-sm">${state.narrative.localTip}</p>
        </div>
        ` : ''}
      </div>
    `;
  }
}

export default AustraliaContentGenerator;
