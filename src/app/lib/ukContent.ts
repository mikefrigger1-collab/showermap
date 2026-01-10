// lib/ukContent.ts
// UK-specific SEO content generator for ShowerMap

interface CityHighlight {
  name: string;
  description: string;
}

interface FacilityType {
  type: string;
  description: string;
}

interface UKRegionInfo {
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

// Comprehensive UK region-specific data with conversational content
const ukRegionData: Record<string, UKRegionInfo> = {
  'london': {
    name: 'London',
    code: 'LON',
    narrative: {
      intro: `Finding a shower in London is easier than you might think. The city has an extensive network of borough-run leisure centres-most operated by Better, GLL, or Everyone Active-where you can walk in and pay for a swim or gym session that includes shower access.

If you're passing through and just need a quick wash, the areas around major transport hubs are your best bet. Victoria Coach Station, King's Cross, and Liverpool Street all have facilities nearby. Several hostels in these areas also offer shower access to non-guests for a few pounds, which can be a lifesaver after an overnight journey.

Budget gym chains like PureGym and The Gym Group have locations across the city with 24-hour access, though getting a day pass can be tricky-they're set up for memberships. For a guaranteed shower without commitment, stick to the council leisure centres.`,
      travelersNote: `Council leisure centres typically charge £5-10 for a swim session which includes changing room access. Arrive early on weekday mornings for the quietest experience.`,
      localTip: `The Oasis Sports Centre in Covent Garden has a heated outdoor pool and is one of the few places in central London where you can swim outdoors year-round.`
    },
    cities: [
      { name: 'Westminster', description: 'Central London with several leisure centres and hotel day-use options' },
      { name: 'Camden', description: 'Good mix of budget gyms and the excellent Kentish Town Sports Centre' },
      { name: 'Islington', description: 'Ironmonger Row Baths offers a traditional Turkish bath experience' },
      { name: 'Hackney', description: 'London Fields Lido and multiple council facilities' },
      { name: 'Southwark', description: 'Camberwell Leisure Centre and Peckham Pulse nearby' },
      { name: 'Greenwich', description: 'Waterfront Leisure Centre with pool and gym facilities' }
    ],
    facilityTypes: [
      { type: 'Council Leisure Centres', description: 'Your most reliable option across all boroughs, typically £5-10 for swim access' },
      { type: 'Budget Gyms', description: 'PureGym and The Gym Group have 24/7 access but prioritise memberships over day passes' },
      { type: 'Hostels', description: 'Many offer shower access to non-guests, especially near train stations' },
      { type: 'Swimming Pools', description: 'Lidos and indoor pools throughout the city, shower use included with entry' }
    ],
    pricingContext: {
      budget: 'Council leisure centres offer the best value at £5-10 for swim sessions with full changing facilities.',
      midRange: 'Hotel day-use and premium gyms run £15-30, offering a more comfortable experience.',
      premium: 'Spa day passes at places like AIRE Ancient Baths or the Corinthia start around £50+.'
    },
    beforeYouGo: `London facilities operate year-round with consistent hours. The city gets busy, so arriving before 9am or after 7pm at leisure centres means shorter queues for showers. Most facilities accept card payments, but a few older centres are cash-only for casual visits.`,
    priceRange: { low: 5, high: 15 }
  },

  'south-east': {
    name: 'South East',
    code: 'SE',
    narrative: {
      intro: `The South East offers a great mix of coastal and urban facilities. If you're traveling along the coast, Brighton's seafront has free outdoor showers along the promenade-basic cold-water rinse stations, but perfect after a swim or beach day.

For something warmer, the university cities are worth knowing about. Oxford and Reading both have campus sports facilities that open to the public during university holidays, often at good rates. The regular council leisure centres run by Freedom Leisure and Places Leisure are scattered throughout the region and offer reliable access.

If you're catching a ferry from Southampton or Portsmouth, both port areas have facilities nearby for freshening up before or after a crossing. The same goes for Gatwick Airport-several hotels in the area offer day rooms if you need more than just a quick shower.`,
      travelersNote: `Beach facilities along the coast typically operate May through September only. Indoor leisure centres are your year-round fallback.`,
      localTip: `Brighton's Sea Lanes pool on the seafront combines swimming with stunning views, and the showers are excellent.`
    },
    cities: [
      { name: 'Brighton', description: 'Free beach showers along the promenade, plus Prince Regent Swimming Complex' },
      { name: 'Southampton', description: 'Port area facilities and Quays Swimming & Diving Complex' },
      { name: 'Portsmouth', description: 'Good options near the ferry terminal for travelers' },
      { name: 'Oxford', description: 'University sports facilities with public access during holidays' },
      { name: 'Reading', description: 'Rivermead Leisure Complex and several budget gym options' },
      { name: 'Canterbury', description: 'Kingsmead Leisure Centre in the city centre' }
    ],
    facilityTypes: [
      { type: 'Beach Showers', description: 'Free cold-water rinse stations along the coast, seasonal (May-Sept)' },
      { type: 'Leisure Centres', description: 'Freedom Leisure and Places Leisure operate throughout the region' },
      { type: 'University Facilities', description: 'Oxford and Reading campuses open to public during holidays' },
      { type: 'Hotel Day Use', description: 'Particularly useful near Gatwick Airport and ferry ports' }
    ],
    pricingContext: {
      budget: 'Beach showers are free. Council leisure centres charge £4-8 for swim access.',
      midRange: 'Budget gyms and sports centres typically £8-12 for day access.',
      premium: 'Hotel day rooms near airports and ports start around £30-50.'
    },
    beforeYouGo: `Coastal facilities are weather-dependent and seasonal. If you're visiting outside summer months, check opening times in advance. The region is well-connected by rail, so hopping between towns to find an open facility is straightforward.`,
    priceRange: { low: 0, high: 12 }
  },

  'south-west': {
    name: 'South West',
    code: 'SW',
    narrative: {
      intro: `If you're traveling through the South West-whether you're surfing in Newquay, hiking the Jurassic Coast, or road-tripping through Devon-you'll find this region surprisingly well-equipped for travelers who need a proper wash.

The coastline is dotted with free beach rinse stations during summer months. They're nothing fancy, just cold water to wash off the salt and sand, but they're everywhere from Bournemouth to Bude. For a hot shower, most towns have a council-run leisure centre where you can pay a few pounds for access.

This is prime van life territory, so campsite owners are generally used to visitors wanting just a shower. Most holiday parks and caravan sites will let you use their facilities for £3-5, even if you're not staying overnight. Worth asking at reception rather than assuming you can't.`,
      travelersNote: `Peak summer months (July-August) see beach facilities get quite busy, especially around Newquay and St Ives. Early morning is your best bet for avoiding crowds.`,
      localTip: `Many pubs near popular beaches will let you use their facilities if you buy a drink-not officially advertised, but worth asking nicely.`
    },
    cities: [
      { name: 'Bristol', description: 'Strong network of council leisure centres and budget gyms' },
      { name: 'Exeter', description: 'Good stopping point with several options near the city centre' },
      { name: 'Plymouth', description: 'Life Centre is a modern facility with excellent amenities' },
      { name: 'Bath', description: 'Historic spa town-Thermae Bath Spa for a splurge, council pools for budget' },
      { name: 'Bournemouth', description: 'Seafront facilities and BH Live leisure centres' },
      { name: 'Newquay', description: 'Surf-focused town with beach showers and campsite options' }
    ],
    facilityTypes: [
      { type: 'Beach Rinse Stations', description: 'Free cold-water showers at most beaches, seasonal (May-Sept)' },
      { type: 'Campsites & Holiday Parks', description: 'Many allow day visitors to use showers for £3-5' },
      { type: 'Council Leisure Centres', description: 'LED Leisure and Everyone Active operate throughout the region' },
      { type: 'Hostels', description: 'YHA and independent hostels often allow non-guest shower access' }
    ],
    pricingContext: {
      budget: 'Beach showers are free. Campsites typically charge £3-5 for shower-only access.',
      midRange: 'Council leisure centres and budget gyms run £5-8 for swim or gym access.',
      premium: 'Bath\'s Thermae Bath Spa starts around £40 for a spa session-but it\'s an experience, not just a shower.'
    },
    beforeYouGo: `The South West gets plenty of rain, so having a backup indoor option is always smart. Beach facilities typically close by October. If you're traveling in shoulder season (April or October), stick to leisure centres which operate year-round.`,
    priceRange: { low: 0, high: 15 }
  },

  'east-of-england': {
    name: 'East of England',
    code: 'EE',
    narrative: {
      intro: `The East of England is a quieter region for travelers, but it has solid options once you know where to look. Cambridge stands out with excellent sports facilities through both the university and council-Parkside Pools is centrally located and welcoming to visitors.

The coastal towns like Southend, Great Yarmouth, and Clacton have seasonal beach facilities, though they're more basic than what you'd find in the South West. Norwich has a compact city centre with several leisure options within walking distance of each other.

If you're driving through on the A1 or A14, the region serves as a major freight corridor, so there are truck stops with shower facilities along the main routes. Flying into Stansted or Luton? Several nearby hotels offer day rooms for freshening up.`,
      travelersNote: `This region is drier than western England, but coastal areas can still be bracing. Beach facilities are seasonal and quite basic.`,
      localTip: `Cambridge's Jesus Green Lido is a stunning outdoor pool open May-September-one of the longest in Europe.`
    },
    cities: [
      { name: 'Cambridge', description: 'Excellent facilities including Parkside Pools and university sports centres' },
      { name: 'Norwich', description: 'Compact city with several leisure centres in walking distance' },
      { name: 'Ipswich', description: 'Crown Pools and budget gym options in the town centre' },
      { name: 'Peterborough', description: 'Good council leisure provision, handy for A1 travelers' },
      { name: 'Southend-on-Sea', description: 'Seasonal beach facilities and Southend Leisure Centre' },
      { name: 'Colchester', description: 'Leisure World complex with pool and gym facilities' }
    ],
    facilityTypes: [
      { type: 'Leisure Centres', description: 'Fusion Lifestyle and Better operate most council facilities' },
      { type: 'University Facilities', description: 'Cambridge and UEA have sports centres with community access' },
      { type: 'Beach Facilities', description: 'Basic seasonal showers at coastal towns' },
      { type: 'Truck Stops', description: 'Along A1 and A14 corridors for those driving through' }
    ],
    pricingContext: {
      budget: 'Beach showers are free but basic. Council leisure centres charge £4-7.',
      midRange: 'University sports centres and better-equipped gyms run £7-12.',
      premium: 'Hotel day rooms near airports start around £40.'
    },
    beforeYouGo: `Coastal facilities close earlier in the season here than in the South West. Cambridge gets very busy during university term time and graduation season (June). Norwich is a good alternative if Cambridge feels crowded.`,
    priceRange: { low: 4, high: 12 }
  },

  'east-midlands': {
    name: 'East Midlands',
    code: 'EM',
    narrative: {
      intro: `The East Midlands offers excellent value for money when it comes to public facilities. Everyone Active manages many of the council leisure centres across the region, and their pricing is consistently reasonable.

Nottingham and Leicester both have extensive networks of community leisure centres-you're rarely more than a short bus ride from an option. Derby sits at a convenient junction on the M1, making it a practical stopping point if you're driving through.

Lincoln's historic centre might feel like it's all medieval architecture, but there are modern leisure facilities nearby. The region is well-served by budget gym chains too, with PureGym and The Gym Group having a strong presence in all the major towns.`,
      travelersNote: `This region has a continental climate-warm summers and properly cold winters. All the main facilities operate year-round.`,
      localTip: `Nottingham's Victoria Leisure Centre has one of the nicest traditional swimming pools in the Midlands, with a good café attached.`
    },
    cities: [
      { name: 'Nottingham', description: 'Extensive network of community centres, Victoria Leisure Centre is excellent' },
      { name: 'Leicester', description: 'Multiple leisure centres across the city, good budget gym coverage' },
      { name: 'Derby', description: 'Convenient M1 location with Queen\'s Leisure Centre in the centre' },
      { name: 'Northampton', description: 'Good facilities benefiting from London commuter investment' },
      { name: 'Lincoln', description: 'Modern leisure facilities near the historic centre' },
      { name: 'Chesterfield', description: 'Queen\'s Park Sports Centre with pool and gym' }
    ],
    facilityTypes: [
      { type: 'Council Leisure Centres', description: 'Everyone Active and Fusion operate most facilities, consistently good value' },
      { type: 'Budget Gyms', description: 'Strong PureGym and The Gym Group presence across major towns' },
      { type: 'University Facilities', description: 'Nottingham and Leicester universities have sports centres with public access' },
      { type: 'Community Centres', description: 'Smaller local facilities often offer shower access' }
    ],
    pricingContext: {
      budget: 'Council leisure centres are excellent value at £4-7 for swim access.',
      midRange: 'Budget gyms and better facilities run £7-10 for day access.',
      premium: 'Hotel day use and premium gyms start around £15-20.'
    },
    beforeYouGo: `East Midlands Airport area has hotel day-use options if you need to freshen up before a flight. The region is compact and well-connected by road, so if one facility is busy, another is usually nearby.`,
    priceRange: { low: 4, high: 10 }
  },

  'west-midlands': {
    name: 'West Midlands',
    code: 'WM',
    narrative: {
      intro: `Birmingham has transformed its leisure facilities over the past decade, with significant investment ahead of the 2022 Commonwealth Games. The city now has some of the best council-run sports facilities in the country, and they're genuinely welcoming to casual visitors.

Beyond Birmingham, the wider West Midlands-Coventry, Wolverhampton, and the Black Country towns-all have decent coverage. The region is well-connected by motorway, so if you're driving through on the M6, M5, or M42, you're never far from an option.

The University of Birmingham has excellent sports facilities with community access, which is worth knowing if you're near the Edgbaston area. For something more convenient to the city centre or NEC, the council leisure centres are your best bet.`,
      travelersNote: `Birmingham can experience an urban heat island effect during summer-the air-conditioned leisure centres are a welcome refuge.`,
      localTip: `The new Sandwell Aquatics Centre, built for the Commonwealth Games, is now open to the public and has world-class facilities.`
    },
    cities: [
      { name: 'Birmingham', description: 'Excellent council provision including the new Sandwell Aquatics Centre' },
      { name: 'Coventry', description: 'Good budget gym coverage and council facilities' },
      { name: 'Wolverhampton', description: 'WV Active operates several leisure centres across the city' },
      { name: 'Stoke-on-Trent', description: 'Dimensions Leisure Centre and local authority facilities' },
      { name: 'Worcester', description: 'Perdiswell Leisure Centre near the city centre' },
      { name: 'Dudley', description: 'Shared facilities with broader Black Country network' }
    ],
    facilityTypes: [
      { type: 'Council Leisure Centres', description: 'Birmingham City Council and district authorities operate modern facilities' },
      { type: 'University Facilities', description: 'University of Birmingham Sport has excellent facilities with community access' },
      { type: 'Budget Gyms', description: 'PureGym and Nuffield Health have good coverage across the region' },
      { type: 'Hotel Day Use', description: 'NEC and airport area has options for travelers' }
    ],
    pricingContext: {
      budget: 'Council leisure centres charge £4-8 for swim access.',
      midRange: 'University facilities and better gyms run £8-12.',
      premium: 'Hotel day use near NEC/airport starts around £25-40.'
    },
    beforeYouGo: `The motorway network makes this region very accessible. If you're attending an event at the NEC or flying from Birmingham Airport, allow time to find parking at leisure centres-the popular ones fill up during peak hours.`,
    priceRange: { low: 4, high: 12 }
  },

  'yorkshire': {
    name: 'Yorkshire and the Humber',
    code: 'YH',
    narrative: {
      intro: `Yorkshire offers some of the best value leisure facilities in England. Both Leeds and Sheffield have invested heavily in their council provision, and the prices reflect Northern affordability rather than London premiums.

Sheffield's Ponds Forge is a standout-it's an Olympic-standard venue that's genuinely open to the public. You can swim in the same pools used for major competitions, and the shower facilities are excellent. Leeds has a similar network of well-maintained council centres.

For outdoor enthusiasts, the region is brilliant. The Yorkshire Dales and Peak District (the southern edge touches Yorkshire) have extensive campsite networks with shower facilities. Even if you're wild camping, there are usually options nearby for a proper wash.`,
      travelersNote: `The weather in Yorkshire is variable-the Pennines catch a lot of rain. Indoor facilities are reliable year-round, but outdoor campsites may have seasonal limitations.`,
      localTip: `York's Yearsley Swimming Pool is a beautiful Edwardian bath that's been sympathetically modernized-worth visiting for the architecture alone.`
    },
    cities: [
      { name: 'Leeds', description: 'Excellent council leisure network with good pricing' },
      { name: 'Sheffield', description: 'Ponds Forge offers Olympic-standard facilities open to the public' },
      { name: 'York', description: 'Tourist-friendly facilities near the station, historic Yearsley Pool' },
      { name: 'Hull', description: 'Facilities for ferry passengers to Rotterdam/Zeebrugge' },
      { name: 'Bradford', description: 'Richard Dunn Sports Centre and council facilities' },
      { name: 'Harrogate', description: 'Spa town heritage with Turkish Baths and modern leisure centre' }
    ],
    facilityTypes: [
      { type: 'Council Leisure Centres', description: 'Leeds City Council and Sheffield City Trust offer excellent value' },
      { type: 'Campsites', description: 'Extensive network in the Dales and Peak District fringes' },
      { type: 'University Facilities', description: 'Leeds, Sheffield, and York universities have sports centres' },
      { type: 'Historic Baths', description: 'Harrogate Turkish Baths and York\'s Yearsley Pool' }
    ],
    pricingContext: {
      budget: 'Council centres are excellent value at £3-6 for swim access.',
      midRange: 'Campsites and budget gyms typically charge £5-10.',
      premium: 'Harrogate Turkish Baths and spa facilities start around £15-25.'
    },
    beforeYouGo: `Hull serves ferry passengers to the Netherlands-if you're arriving on an early morning ferry, the city has facilities nearby for freshening up. York gets extremely busy during racing meets and the Christmas market.`,
    priceRange: { low: 3, high: 10 }
  },

  'north-west': {
    name: 'North West',
    code: 'NW',
    narrative: {
      intro: `Manchester has invested heavily in its sports facilities, and it shows. The city has excellent council provision with modern centres across the boroughs. Liverpool's waterfront area has also seen significant development, with good leisure options near the Albert Dock.

If you're heading to the Lake District, this is one of the best regions in the UK for outdoor camping. Cumbria has extensive campsite networks, and most site owners are happy to let you use their facilities for a few pounds even if you're not staying. The YHA hostels in the Lakes are particularly good for hikers.

Blackpool serves as a major tourist hub with plenty of accommodation options-if you just need a shower, many hotels and B&Bs will accommodate day visitors. Preston and Lancaster work well as corridor stops on the M6.`,
      travelersNote: `This region gets a lot of rain year-round. The Lake District has seasonal facilities, but the cities operate consistently throughout the year.`,
      localTip: `Manchester's Hathersage Road Swimming Pool in Chorlton is a hidden gem-a beautiful outdoor lido that's heated and open May to September.`
    },
    cities: [
      { name: 'Manchester', description: 'Excellent council provision across all boroughs' },
      { name: 'Liverpool', description: 'Modern facilities near the waterfront and city centre' },
      { name: 'Preston', description: 'Good M6 corridor stop with decent leisure options' },
      { name: 'Blackpool', description: 'Tourist hub with numerous accommodation options' },
      { name: 'Chester', description: 'Historic city with modern leisure facilities' },
      { name: 'Lancaster', description: 'University facilities and gateway to the Lakes' }
    ],
    facilityTypes: [
      { type: 'Council Leisure Centres', description: 'Manchester Leisure and Liverpool Active operate excellent facilities' },
      { type: 'Campsites', description: 'Extensive network in the Lake District and Cumbria' },
      { type: 'Hostels', description: 'YHA network in the Lakes, plus urban hostels in Manchester and Liverpool' },
      { type: 'Budget Gyms', description: 'Strong presence of PureGym and Total Fitness across the region' }
    ],
    pricingContext: {
      budget: 'Council leisure centres charge £3-7. Campsites typically £3-5 for shower access.',
      midRange: 'Budget gyms and better facilities run £7-12.',
      premium: 'Hotel and spa day use starts around £20-35.'
    },
    beforeYouGo: `The Lake District gets extremely busy during bank holidays and school summer holidays. If you're visiting during peak times, arrive early at facilities or consider the towns on the edge of the Lakes rather than the honeypot villages.`,
    priceRange: { low: 3, high: 12 }
  },

  'north-east': {
    name: 'North East',
    code: 'NE',
    narrative: {
      intro: `The North East offers some of the most affordable leisure facilities in England. Newcastle has a strong network of council centres, and the prices here are noticeably lower than what you'd pay further south.

The region works well as a corridor to Scotland-if you're driving up the A1, there are facilities at regular intervals. Gateshead and Sunderland share resources across their boundaries, so you have options on either side of the Tyne.

Durham is worth knowing about for its university facilities, which have community access. The city itself is compact and beautiful, making it a pleasant place to stop. Northumberland, to the north, is quieter but has campsites and outdoor facilities for those exploring the coast or heading to Hadrian's Wall.`,
      travelersNote: `The North East has a cool, maritime climate. Newcastle and the coast can be windy. Indoor facilities are the reliable choice year-round.`,
      localTip: `Tynemouth Outdoor Pool is a stunning Art Deco lido by the sea-seasonal but absolutely worth visiting if you're in the area during summer.`
    },
    cities: [
      { name: 'Newcastle upon Tyne', description: 'Strong council leisure network with affordable pricing' },
      { name: 'Sunderland', description: 'Shares facilities with Gateshead, good coverage' },
      { name: 'Durham', description: 'University facilities with community access, compact historic city' },
      { name: 'Middlesbrough', description: 'Neptune Centre and local authority facilities' },
      { name: 'Gateshead', description: 'Excellent facilities including Gateshead Leisure Centre' },
      { name: 'Darlington', description: 'Dolphin Centre in the town centre' }
    ],
    facilityTypes: [
      { type: 'Council Leisure Centres', description: 'Fusion Lifestyle and Everyone Active offer excellent value' },
      { type: 'University Facilities', description: 'Durham University has sports centres with public access' },
      { type: 'Campsites', description: 'Northumberland coast and countryside options' },
      { type: 'Historic Lidos', description: 'Tynemouth Outdoor Pool is a seasonal gem' }
    ],
    pricingContext: {
      budget: 'Council centres are among the most affordable in England at £3-6.',
      midRange: 'Budget gyms and university facilities run £6-10.',
      premium: 'Hotel day use starts around £15-25.'
    },
    beforeYouGo: `Port of Tyne serves ferry passengers to Amsterdam-facilities are available nearby for those arriving or departing. The Metro system provides good access across Tyneside, making it easy to reach facilities even without a car.`,
    priceRange: { low: 3, high: 10 }
  },

  'scotland': {
    name: 'Scotland',
    code: 'SC',
    narrative: {
      intro: `Scotland punches well above its weight when it comes to affordable shower access. Edinburgh Leisure and Glasgow Life both operate extensive networks of pools and leisure centres where you can get a proper hot shower for around £5-8-often including pool access if you fancy a swim.

Outside the cities, the picture changes. The Highlands and Islands have gorgeous scenery but limited facilities, so planning ahead matters. The good news is that Scotland's hosteling network (SYHA) is excellent, and many hostels will let non-guests use their showers for a small fee.

If you're walking the West Highland Way, doing the NC500, or exploring the whisky trail, you'll find that Scottish hospitality often extends to informal shower access. B&Bs and small hotels frequently accommodate travelers who just need a wash, especially in tourist-heavy areas.`,
      travelersNote: `The Highlands have limited year-round facilities. Major cities operate consistently, but remote areas may have seasonal restrictions.`,
      localTip: `Glasgow Life facilities often have cheaper rates before 9am-perfect if you're an early riser looking to save a few pounds.`
    },
    cities: [
      { name: 'Edinburgh', description: 'Excellent Edinburgh Leisure network with pools across the city' },
      { name: 'Glasgow', description: 'Glasgow Life operates extensive, affordable facilities' },
      { name: 'Aberdeen', description: 'Good coverage serving North Sea industry workers and travelers' },
      { name: 'Dundee', description: 'Olympia Leisure Centre and council facilities' },
      { name: 'Inverness', description: 'Gateway to the Highlands with reliable facilities' },
      { name: 'Fort William', description: 'Key stop for West Highland Way walkers' }
    ],
    facilityTypes: [
      { type: 'Trust Leisure Centres', description: 'Edinburgh Leisure and Glasgow Life offer excellent value' },
      { type: 'SYHA Hostels', description: 'Scottish hosteling network often allows non-guest shower access' },
      { type: 'Campsites', description: 'Excellent provision for outdoor enthusiasts, especially in the Highlands' },
      { type: 'Budget Gyms', description: 'PureGym and The Gym Group have presence in major cities' }
    ],
    pricingContext: {
      budget: 'Trust leisure centres charge £5-8 for swim sessions. SYHA hostels typically £3-5 for non-guest showers.',
      midRange: 'Budget gyms and better facilities run £8-12.',
      premium: 'Hotel day use and spa facilities start around £20-30.'
    },
    beforeYouGo: `The Highlands have a cool, wet climate year-round. If you're touring remote areas, fill up on fuel and confirm facility access in advance-services can be sparse. The whisky distillery visitor centres often have good facilities nearby.`,
    priceRange: { low: 3, high: 12 }
  },

  'wales': {
    name: 'Wales',
    code: 'WA',
    narrative: {
      intro: `Wales offers excellent value with strong council leisure provision, particularly in Cardiff and Swansea. The country is also paradise for outdoor enthusiasts-Snowdonia, Pembrokeshire, and the Brecon Beacons all have extensive campsite networks where shower access is straightforward.

Cardiff Bay has modern leisure facilities, and the city centre has several options within walking distance. Swansea's waterfront area has improved significantly, with good facilities near the beach. The university towns like Aberystwyth and Bangor have campus facilities with community access.

Along the coast, beach facilities are seasonal but free where they exist. The country has good hostel coverage for walkers and cyclists-particularly along the Wales Coast Path and Offa's Dyke Path.`,
      travelersNote: `Wales has a wet, mild climate. Beach facilities are seasonal (May-September). Indoor facilities operate year-round throughout the country.`,
      localTip: `Pontypridd Lido has been beautifully restored and is free to use during summer months-one of the best outdoor pools in Wales.`
    },
    cities: [
      { name: 'Cardiff', description: 'Modern facilities in the Bay area and city centre' },
      { name: 'Swansea', description: 'Waterfront facilities and LC Swansea complex' },
      { name: 'Newport', description: 'Good council provision with Newport Centre' },
      { name: 'Wrexham', description: 'Waterworld and local authority facilities' },
      { name: 'Aberystwyth', description: 'University facilities with community access' },
      { name: 'Bangor', description: 'University town with campus sports facilities' }
    ],
    facilityTypes: [
      { type: 'Council Leisure Centres', description: 'Strong provision throughout, especially in Cardiff and Swansea' },
      { type: 'Campsites', description: 'Excellent coverage in Snowdonia, Pembrokeshire, and Brecon Beacons' },
      { type: 'University Facilities', description: 'Aberystwyth and Bangor have sports centres with public access' },
      { type: 'Hostels', description: 'Good YHA network for walkers along Coast Path and Offa\'s Dyke' }
    ],
    pricingContext: {
      budget: 'Council leisure centres charge £3-6 for swim access. Many campsites allow day visitors for £3-5.',
      midRange: 'Budget gyms and better facilities run £6-10.',
      premium: 'Hotel and spa day use starts around £15-25.'
    },
    beforeYouGo: `Snowdonia gets extremely busy during summer holidays and bank holidays. The less-visited Brecon Beacons and Pembrokeshire coast can be quieter alternatives with equally good facilities.`,
    priceRange: { low: 3, high: 10 }
  },

  'northern-ireland': {
    name: 'Northern Ireland',
    code: 'NI',
    narrative: {
      intro: `Northern Ireland has invested significantly in leisure infrastructure, with modern facilities throughout Belfast and the surrounding areas. The city has several council-run leisure centres with affordable access, and the facilities are generally well-maintained.

If you're arriving by ferry at Belfast or Larne, there are facilities nearby for freshening up after the crossing. The Causeway Coast has seasonal beach facilities, though they're more basic than what you'd find in mainland UK.

Derry has good provision through council leisure, and the region is compact enough that you're rarely far from an option. Queen's University and the University of Ulster both have facilities with community access, which is worth knowing if you're near their campuses.`,
      travelersNote: `Northern Ireland has a mild, wet climate year-round. Indoor facilities are your most reliable option. The region is compact with good coverage relative to its population.`,
      localTip: `Belfast's Falls Leisure Centre has excellent facilities and is one of the most affordable options in the city.`
    },
    cities: [
      { name: 'Belfast', description: 'Several council-run leisure centres with modern facilities' },
      { name: 'Derry', description: 'Good council leisure provision including Foyle Arena' },
      { name: 'Lisburn', description: 'Lagan Valley LeisurePlex with pool and gym' },
      { name: 'Bangor', description: 'Coastal town with Aurora Aquatic Centre' },
      { name: 'Newry', description: 'Newry Leisure Centre near the border' },
      { name: 'Armagh', description: 'Orchard Leisure Centre in the city' }
    ],
    facilityTypes: [
      { type: 'Council Leisure Centres', description: 'Belfast City Council and district authorities operate modern facilities' },
      { type: 'University Facilities', description: 'Queen\'s and Ulster University have sports centres with community access' },
      { type: 'Budget Gyms', description: 'PureGym and Better have presence in Belfast area' },
      { type: 'Hostels', description: 'Several options in Belfast and tourist areas' }
    ],
    pricingContext: {
      budget: 'Council leisure centres charge £3-6 for swim access.',
      midRange: 'Better-equipped facilities and gyms run £6-10.',
      premium: 'Hotel day use starts around £15-25.'
    },
    beforeYouGo: `Ferry terminals at Belfast and Larne have facilities nearby. The Causeway Coast gets busy during summer-Giant\'s Causeway area has limited facilities, so plan accordingly. The region is compact and well-signposted.`,
    priceRange: { low: 3, high: 10 }
  }
};

export class UKContentGenerator {
  static generateRegionContent(regionSlug: string, stats: { totalLocations: number; freeLocations: number; cities: string[]; verifiedCount?: number }): string {
    const region = ukRegionData[regionSlug];
    if (!region) {
      return `<p>Explore public shower facilities across this region of the UK.</p>`;
    }

    return `
      <div class="region-content">
        <h2 class="text-2xl font-bold text-warm-900 mb-6">Finding Showers in ${region.name}</h2>

        <div class="region-intro prose prose-lg max-w-none mb-8">
          ${region.narrative.intro.split('\n\n').map(para => `<p class="text-warm-700 leading-relaxed mb-4">${para.trim()}</p>`).join('')}
        </div>

        ${region.narrative.travelersNote ? `
        <div class="travelers-note bg-secondary-50 border-l-4 border-secondary-400 p-4 mb-8 rounded-r-lg">
          <p class="text-warm-700 text-sm"><strong class="text-secondary-700">Good to know:</strong> ${region.narrative.travelersNote}</p>
        </div>
        ` : ''}

        <div class="stats-narrative bg-warm-50 p-6 rounded-xl mb-8">
          <p class="text-warm-700">
            We've mapped <strong class="text-primary-600">${stats.totalLocations}+ shower locations</strong> across ${region.name},
            with <strong class="text-primary-600">${stats.verifiedCount || 0} verified by travelers</strong> like you.
            You'll find facilities in <strong class="text-primary-600">${stats.cities.length}+ cities and towns</strong> throughout the region.
          </p>
        </div>

        <h3 class="text-xl font-bold text-warm-900 mt-10 mb-4">Where to Find Showers</h3>
        <div class="city-highlights grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          ${region.cities.map(city => `
            <div class="city-item bg-white border border-warm-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
              <h4 class="font-semibold text-warm-900 mb-1">${city.name}</h4>
              <p class="text-sm text-warm-600">${city.description}</p>
            </div>
          `).join('')}
        </div>

        <h3 class="text-xl font-bold text-warm-900 mt-10 mb-4">Types of Facilities</h3>
        <div class="facility-overview space-y-4 mb-8">
          ${region.facilityTypes.map(facility => `
            <div class="facility-category bg-white border border-warm-200 rounded-lg p-4">
              <h4 class="font-semibold text-warm-900 mb-1">${facility.type}</h4>
              <p class="text-sm text-warm-600">${facility.description}</p>
            </div>
          `).join('')}
        </div>

        <h3 class="text-xl font-bold text-warm-900 mt-10 mb-4">What You'll Typically Pay</h3>
        <div class="pricing-advice bg-white border border-warm-200 rounded-xl p-6 mb-8">
          <div class="space-y-3">
            <p class="text-warm-700"><span class="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span><strong>Budget:</strong> ${region.pricingContext.budget}</p>
            <p class="text-warm-700"><span class="inline-block w-3 h-3 bg-amber-500 rounded-full mr-2"></span><strong>Mid-range:</strong> ${region.pricingContext.midRange}</p>
            ${region.pricingContext.premium ? `<p class="text-warm-700"><span class="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2"></span><strong>Premium:</strong> ${region.pricingContext.premium}</p>` : ''}
          </div>
        </div>

        ${region.beforeYouGo ? `
        <div class="helpful-note bg-accent-50 border-l-4 border-accent-400 p-5 rounded-r-lg mb-8">
          <h4 class="font-semibold text-warm-900 mb-2">Before You Go</h4>
          <p class="text-warm-700 text-sm">${region.beforeYouGo}</p>
        </div>
        ` : ''}

        ${region.narrative.localTip ? `
        <div class="local-tip bg-primary-50 border-l-4 border-primary-400 p-5 rounded-r-lg">
          <h4 class="font-semibold text-warm-900 mb-2">Local Tip</h4>
          <p class="text-warm-700 text-sm">${region.narrative.localTip}</p>
        </div>
        ` : ''}
      </div>
    `;
  }
}

export default UKContentGenerator;
