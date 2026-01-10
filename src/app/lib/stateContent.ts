// lib/stateContent.ts

// New schema matching UK content approach - conversational narratives
interface CityHighlight {
  name: string;
  description: string;
}

interface FacilityType {
  name: string;
  description: string;
}

interface StateInfo {
  name: string;
  code: string;
  narrative: {
    intro: string;
    travelersNote?: string;
    localTip?: string;
  };
  cities: CityHighlight[];
  facilityTypes: FacilityType[];
  pricingContext: {
    budget: string;
    midRange: string;
    premium?: string;
  };
  beforeYouGo?: string;
  priceRange: { low: number; high: number };

  // Legacy fields - kept for backwards compatibility during migration
  majorCities?: string[];
  universityTowns?: string[];
  popularVenues?: string[];
  majorHighways?: string[];
  stateParkSystems?: string[];
  regulations?: string;
  climateNote?: string;
  seasonalEvents?: string[];
  localContext?: string;
  commonFacilities?: string[];
}

// Comprehensive state-specific data for all 50 states
const stateData: Record<string, StateInfo> = {
  'alabama': {
    name: 'Alabama',
    code: 'AL',
    narrative: {
      intro: `Whether you're road-tripping down to Gulf Shores, passing through on I-65, or catching a game in Tuscaloosa, Alabama has more shower options than you might expect. The Gulf Coast beaches at Orange Beach and Gulf Shores offer free rinse stations year-round-nothing fancy, but perfect after a day in the sand. Inland, Birmingham's network of public recreation centers (many dating back decades) still offer affordable shower access to visitors for just a few dollars.`,
      travelersNote: `The I-65 corridor from Mobile to the Tennessee border is well-served by truck stops every 30-50 miles, most with clean, private shower rooms. College football weekends can make facilities in Tuscaloosa and Auburn harder to access-some gyms restrict to members only on game days.`,
      localTip: `State parks like Gulf State Park and Oak Mountain have excellent shower facilities if you're camping or just passing through. Day-use fees are reasonable and the facilities tend to be well-maintained.`
    },
    cities: [
      { name: 'Birmingham', description: 'Best network of public rec centers in the state, many with day passes under $10' },
      { name: 'Mobile', description: 'Gulf Coast gateway with truck stops and beach facilities nearby' },
      { name: 'Huntsville', description: 'Modern facilities serving the tech and space industry workforce' },
      { name: 'Montgomery', description: 'State capital with YMCA and municipal pool options' },
      { name: 'Tuscaloosa', description: 'College town-expect crowds and restrictions on football Saturdays' }
    ],
    facilityTypes: [
      { name: 'Truck stops', description: 'Love\'s and Pilot Flying J along I-65 and I-20 with 24/7 private showers' },
      { name: 'State parks', description: 'Gulf State Park, Oak Mountain, and Cheaha offer campground showers' },
      { name: 'Recreation centers', description: 'Birmingham area has excellent municipal facilities with day passes' },
      { name: 'Beach facilities', description: 'Free rinse stations at Gulf Shores and Orange Beach' },
      { name: 'Fitness centers', description: 'Planet Fitness and Anytime Fitness locations statewide' }
    ],
    pricingContext: {
      budget: `Free beach rinses at Gulf Shores, state park day-use for $2-5, and some rec centers under $5`,
      midRange: `Truck stop showers run $12-15, most gym day passes $10-15`,
      premium: `Premium gyms and university facilities up to $18`
    },
    beforeYouGo: `Summers are hot and humid (May-September) so you'll want that shower. Gulf Coast facilities may close during hurricane season. Football weekends in college towns get crowded-plan accordingly.`,
    priceRange: { low: 0, high: 18 }
  },
  
  'alaska': {
    name: 'Alaska',
    code: 'AK',
    narrative: {
      intro: `Alaska presents unique challenges for finding shower facilities, but if you know where to look, options exist even in this vast frontier state. Anchorage and Fairbanks have the most reliable access, with municipal recreation centers offering day passes that include full locker room facilities. The Alaska Club chain is popular locally, though day passes can be pricey.`,
      travelersNote: `If you're traveling the road system during summer, RV parks and campgrounds between Anchorage and Fairbanks typically offer shower access to non-guests for $5-15. In bush communities only accessible by plane or boat, your best bet is asking at the local school gym or tribal community center.`,
      localTip: `Many Alaskan hotels offer "shower only" rates for travelers who just need to freshen up. It never hurts to ask at the front desk, especially in smaller towns along the highway.`
    },
    cities: [
      { name: 'Anchorage', description: 'Best selection in the state with rec centers, gyms, and the YMCA' },
      { name: 'Fairbanks', description: 'University facilities and community pools with day access' },
      { name: 'Juneau', description: 'Limited options in the capital, try the Augustus Brown Swimming Pool' },
      { name: 'Ketchikan', description: 'Cruise port town with a few gym options for visitors' },
      { name: 'Sitka', description: 'Small town with community pool facilities' }
    ],
    facilityTypes: [
      { name: 'Recreation centers', description: 'Municipal facilities in Anchorage and Fairbanks with day passes' },
      { name: 'RV parks', description: 'Shower access for non-guests along the highway system, $5-15' },
      { name: 'Hotels', description: 'Many offer shower-only rates, especially in smaller towns' },
      { name: 'Community centers', description: 'Tribal and community facilities in remote areas' },
      { name: 'Fitness clubs', description: 'Alaska Club locations, though day passes are expensive' }
    ],
    pricingContext: {
      budget: `RV parks charge $5-10 for shower access, some community pools under $10`,
      midRange: `Recreation center day passes run $10-15, hotel shower rates similar`,
      premium: `Premium gyms like Alaska Club can charge $20-25 for day access`
    },
    beforeYouGo: `Winter (October-April) can close facilities unexpectedly due to weather. Summer brings 24-hour daylight which affects some facility hours. Plan ahead in remote areas as options can be 100+ miles apart.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'arizona': {
    name: 'Arizona',
    code: 'AZ',
    narrative: {
      intro: `Arizona is one of the easiest states to find an affordable shower. The Phoenix metro area has the highest concentration of budget gym chains in the country, with EoS Fitness, Planet Fitness, and LA Fitness locations everywhere. Most offer day passes for $5-15, and you'll find clean, air-conditioned facilities when you need them most.`,
      travelersNote: `If you're passing through on I-10 or I-40, truck stops are plentiful and well-maintained. The snowbird population (500,000+ winter visitors) means RV resorts throughout the state offer day passes for showers, typically $5-20. In summer, head to Flagstaff or Sedona in the mountains to escape the brutal desert heat.`,
      localTip: `During extreme summer heat (June-September), outdoor facilities are essentially unusable. Stick to air-conditioned gyms and rec centers when temperatures hit 110°F+.`
    },
    cities: [
      { name: 'Phoenix', description: 'Endless gym options, easily the best coverage in the state' },
      { name: 'Tucson', description: 'University of Arizona area has good options, plus municipal pools' },
      { name: 'Flagstaff', description: 'Mountain town with cooler temps and NAU campus facilities' },
      { name: 'Scottsdale', description: 'More upscale options, resort day passes available' },
      { name: 'Yuma', description: 'Border town with truck stops serving I-8 traffic' }
    ],
    facilityTypes: [
      { name: 'Budget gyms', description: 'EoS, Planet Fitness, LA Fitness everywhere in Phoenix metro' },
      { name: 'RV parks', description: 'Snowbird-friendly resorts offer day passes statewide' },
      { name: 'Truck stops', description: 'Love\'s and Pilot along I-10, I-17, and I-40 corridors' },
      { name: 'Recreation centers', description: 'Municipal facilities in most cities with day rates' },
      { name: 'Resort day passes', description: 'Scottsdale and Sedona resorts offer spa access' }
    ],
    pricingContext: {
      budget: `Budget gyms run $5-10 for day passes, some RV parks charge $5 for showers`,
      midRange: `Truck stops $12-15, nicer gym chains $15-20`,
      premium: `Resort and spa day passes in Scottsdale area $20-50+`
    },
    beforeYouGo: `Summer heat is no joke - temperatures exceed 115°F from June through September. Spring training (Feb-March) and snowbird season (Oct-April) increase demand at facilities. Native American reservations may have different access rules.`,
    priceRange: { low: 0, high: 22 }
  },
  
  'arkansas': {
    name: 'Arkansas',
    code: 'AR',
    narrative: {
      intro: `Arkansas has a hidden gem that sets it apart: natural hot springs. The Ouachita Mountains around Hot Springs National Park offer a unique bathing experience you won't find elsewhere, with commercial bathhouses charging day rates for a proper soak and shower. Beyond the springs, Little Rock has solid gym options and the YMCA network serves most of the state.`,
      travelersNote: `If you're driving I-40 or I-30, truck stops are your reliable option. Northwest Arkansas around Bentonville and Fayetteville has surprisingly upscale facilities thanks to Walmart's corporate presence. The Delta region along the Mississippi has very limited options - plan ahead.`,
      localTip: `State parks like Devil's Den and Petit Jean have campground showers, but many close November through March. During Razorback football season, Fayetteville facilities get crowded on game weekends.`
    },
    cities: [
      { name: 'Little Rock', description: 'Downtown revival brought modern fitness options, plus YMCA locations' },
      { name: 'Fayetteville', description: 'College town with good options, busy during football season' },
      { name: 'Hot Springs', description: 'Famous bathhouses offer unique shower and soak experiences' },
      { name: 'Bentonville', description: 'Upscale facilities driven by Walmart corporate presence' },
      { name: 'Fort Smith', description: 'Western Arkansas hub with basic gym and truck stop options' }
    ],
    facilityTypes: [
      { name: 'Hot springs', description: 'Commercial bathhouses in Hot Springs area with day rates' },
      { name: 'Truck stops', description: 'Love\'s along I-40 and I-30 corridors' },
      { name: 'State parks', description: 'Campground showers at Devil\'s Den, Petit Jean (seasonal)' },
      { name: 'Fitness centers', description: '10 Fitness, Planet Fitness in larger cities' },
      { name: 'YMCAs', description: 'Network across the state with day pass options' }
    ],
    pricingContext: {
      budget: `State park day-use under $5, some community centers $3-5`,
      midRange: `Truck stops $12-15, gym day passes $10-15`,
      premium: `Hot springs bathhouses $15-40 for full experience`
    },
    beforeYouGo: `Hot, humid summers and mild winters. Spring severe weather can affect operations. The Delta region has minimal facilities - often just high school gyms that may allow public access.`,
    priceRange: { low: 0, high: 18 }
  },
  
  'california': {
    name: 'California',
    code: 'CA',
    narrative: {
      intro: `California leads the nation in free public shower access. With over 200 beaches offering rinse stations from San Diego to Crescent City, you're never far from a free outdoor shower on the coast. San Francisco's recreation centers charge just $3-7 for full locker room access, making it one of the most affordable major cities for travelers needing a proper wash.`,
      travelersNote: `The contrast between regions is stark. LA's West Side has gyms charging $150+/month while community centers in other neighborhoods offer day passes for $5. In the mountains, ski towns like Mammoth and Tahoe have facilities catering to van-lifers and seasonal workers. The Central Valley along I-5 has fewer options - truck stops are your best bet.`,
      localTip: `Major cities have dedicated shower programs for those in need - SF's Lava Mae mobile showers and LA's Refresh Spot. State beach campgrounds offer showers to day visitors for a small fee, usually $5-10.`
    },
    cities: [
      { name: 'Los Angeles', description: 'Beach showers everywhere, huge range from budget gyms to premium clubs' },
      { name: 'San Francisco', description: 'Excellent rec center network with affordable day rates' },
      { name: 'San Diego', description: 'Beach showers along the coast, good gym coverage' },
      { name: 'Sacramento', description: 'State capital with standard gym chains and municipal pools' },
      { name: 'Lake Tahoe', description: 'Ski resort facilities and campground showers' }
    ],
    facilityTypes: [
      { name: 'Beach showers', description: 'Free rinse stations at 200+ beaches statewide' },
      { name: 'Recreation centers', description: 'City-run facilities with day passes, especially good in SF' },
      { name: 'State parks', description: 'Campground showers at state beaches, small day-use fee' },
      { name: 'Fitness centers', description: '24 Hour Fitness, LA Fitness, Planet Fitness everywhere' },
      { name: 'University facilities', description: 'UC and CSU campuses often allow community access' }
    ],
    pricingContext: {
      budget: `Free beach showers, SF rec centers $3-7, state park day-use $5-10`,
      midRange: `Gym day passes $10-20, truck stops along I-5 $12-15`,
      premium: `Equinox and premium gyms $25-40, resort day spas $50+`
    },
    beforeYouGo: `Year-round mild weather on the coast. Mountain areas have winter snow. Desert regions (Palm Springs, Death Valley) are brutal in summer. Fire season (Aug-Nov) can close facilities and affect air quality.`,
    priceRange: { low: 0, high: 35 }
  },
  
  'colorado': {
    name: 'Colorado',
    code: 'CO',
    narrative: {
      intro: `Colorado's fitness-obsessed culture means you'll find gyms on every corner in Denver and Boulder. The state's recreation centers are particularly good, with many offering income-based pricing and welcoming attitudes toward travelers. Hot springs scattered throughout the mountains provide a unique option ranging from developed resorts to free primitive pools.`,
      travelersNote: `Ski resorts offer day shower passes ($10-25) primarily aimed at van-lifers and seasonal workers - a lifesaver if you're living out of your vehicle. The I-70 mountain corridor gets overwhelmed on weekends, so weekday access is easier. Mountain towns struggle with seasonal worker housing, making public showers essential infrastructure.`,
      localTip: `Denver's recreation centers pride themselves on accessibility. Ask about day passes - they're usually reasonable and include full locker room access. For a treat, check out the natural hot springs in Glenwood Springs, Steamboat, or the more rustic options around Buena Vista.`
    },
    cities: [
      { name: 'Denver', description: 'Excellent rec center network plus every gym chain imaginable' },
      { name: 'Boulder', description: 'Fitness culture capital with premium options' },
      { name: 'Colorado Springs', description: 'Military town with good gym coverage' },
      { name: 'Fort Collins', description: 'College town with CSU facilities and local gyms' },
      { name: 'Glenwood Springs', description: 'Famous hot springs resort with day access' }
    ],
    facilityTypes: [
      { name: 'Recreation centers', description: 'Denver and Front Range cities have excellent municipal facilities' },
      { name: 'Hot springs', description: 'Developed resorts to primitive backcountry pools throughout the mountains' },
      { name: 'Ski resorts', description: 'Day shower passes available at most resorts, $10-25' },
      { name: 'Fitness centers', description: '24 Hour Fitness, Chuze, Anytime Fitness across the Front Range' },
      { name: 'Climbing gyms', description: 'Many include locker rooms with showers' }
    ],
    pricingContext: {
      budget: `Primitive hot springs free-$15, some rec centers under $10`,
      midRange: `Gym day passes $10-20, ski resort showers $10-25`,
      premium: `Developed hot springs resorts $25-50, premium Denver gyms $25+`
    },
    beforeYouGo: `High altitude (Denver is 5,280 ft) affects visitors - take it easy. Ski season runs Nov-April. Summer hiking season increases backcountry demand. I-70 traffic on weekends can make mountain facilities hard to reach.`,
    priceRange: { low: 0, high: 28 }
  },
  
  'connecticut': {
    name: 'Connecticut',
    code: 'CT',
    narrative: {
      intro: `Connecticut is a small state with big disparities in facility access. Wealthy towns like Greenwich and Westport have exclusive clubs, while cities like Bridgeport and Hartford rely on YMCAs and community centers. The good news: the state is small enough that you're never far from something, and the Long Island Sound beaches offer shower facilities during summer months.`,
      travelersNote: `NYC commuters keep gym chains near train stations busy with early morning showers. If you're passing through on I-95, know that beach parking for non-residents can be expensive ($20-30) during summer. Casino resorts at Mohegan Sun and Foxwoods offer spa access to non-guests if you want a more luxurious option.`,
      localTip: `State parks like Hammonasset Beach have shower facilities but many close after Labor Day. Yale opens some facilities to New Haven residents as community outreach - worth checking if you're in the area.`
    },
    cities: [
      { name: 'Hartford', description: 'State capital with YMCA and basic gym options' },
      { name: 'New Haven', description: 'Yale area with some university facilities open to public' },
      { name: 'Stamford', description: 'NYC commuter hub with gym chains near Metro-North stations' },
      { name: 'Bridgeport', description: 'Working class city with community centers and YMCAs' },
      { name: 'New London', description: 'Near casinos with spa access options' }
    ],
    facilityTypes: [
      { name: 'Beach facilities', description: 'Long Island Sound beaches with showers (May-Sept), pricey parking for non-residents' },
      { name: 'YMCAs', description: 'Solid network throughout the state with day passes' },
      { name: 'Casino resorts', description: 'Mohegan Sun and Foxwoods offer spa/pool day access' },
      { name: 'State parks', description: 'Hammonasset and Silver Sands have seasonal facilities' },
      { name: 'Fitness centers', description: 'Planet Fitness, Edge Fitness, LA Fitness in most towns' }
    ],
    pricingContext: {
      budget: `YMCA day passes $10-15, state park day-use $7-15`,
      midRange: `Gym day passes $10-20, beach parking + shower $20-30 for non-residents`,
      premium: `Casino spa day passes $30-50, premium clubs $25+`
    },
    beforeYouGo: `Four distinct seasons. Beach facilities are seasonal (May-Sept). Shore towns can restrict beach access to residents during peak summer - check policies before driving out.`,
    priceRange: { low: 0, high: 30 }
  },
  
  'delaware': {
    name: 'Delaware',
    code: 'DE',
    narrative: {
      intro: `Delaware may be small, but its beaches draw 7+ million visitors annually and the shower infrastructure reflects that. Rehoboth Beach alone has 20+ public shower stations along the boardwalk and beach access points. The state's compact size means you're never more than 30 minutes from a facility, whether you're in Wilmington's corporate district or the quieter southern beaches.`,
      travelersNote: `Tax-free shopping brings Maryland and Pennsylvania residents who often use gym day passes while on shopping trips. Beach towns offer "shower only" pricing ($3-5) for day-trippers who just need a quick rinse. Many coastal facilities reduce hours or close entirely from October through April.`,
      localTip: `Cape Henlopen and Delaware Seashore State Parks have excellent beach facilities. If you're near Wilmington, the corporate presence (credit card company headquarters) means there are solid gym options downtown.`
    },
    cities: [
      { name: 'Rehoboth Beach', description: '20+ public shower stations, the beach town hub' },
      { name: 'Wilmington', description: 'Corporate downtown with good gym options' },
      { name: 'Dover', description: 'State capital, Air Force Base nearby influences gym culture' },
      { name: 'Newark', description: 'University of Delaware town with campus facilities' },
      { name: 'Lewes', description: 'Quieter beach town with Cape Henlopen State Park nearby' }
    ],
    facilityTypes: [
      { name: 'Beach showers', description: 'Free rinse stations throughout Rehoboth and beach towns' },
      { name: 'State parks', description: 'Cape Henlopen and Delaware Seashore with beach facilities' },
      { name: 'Fitness centers', description: 'Planet Fitness, Anytime Fitness statewide' },
      { name: 'YMCAs', description: 'YMCA of Delaware locations with day passes' },
      { name: 'Hotel day passes', description: 'Beach hotels sometimes offer pool/shower access' }
    ],
    pricingContext: {
      budget: `Free beach showers, "shower only" rates at beach businesses $3-5`,
      midRange: `Gym day passes $10-15, state park day-use $5-10`,
      premium: `Wilmington premium gyms $20-25`
    },
    beforeYouGo: `Beach season runs Memorial Day to Labor Day. Many coastal facilities close or reduce hours Oct-April. NASCAR races at Dover bring crowds. The whole state is small - nothing is far.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'florida': {
    name: 'Florida',
    code: 'FL',
    narrative: {
      intro: `Florida's 1,350-mile coastline means you're never far from a free beach shower. Nearly every public beach has rinse stations, from basic cold-water setups to heated facilities with changing areas. Miami Beach alone has 40+ shower stations. The year-round warm weather means facilities operate constantly, making Florida one of the easiest states to find a shower.`,
      travelersNote: `Theme park areas around Orlando and Tampa have budget motels offering day passes for pool and shower use ($10-20). If you're driving the Turnpike or I-95, the truck stops are modern "travel plazas" with quality shower facilities. The Keys are beautiful but have limited options between Key Largo and Key West - plan your stops.`,
      localTip: `Snowbird season (Nov-April) increases demand at facilities across the state. During hurricane season (June-Nov), coastal facilities may close with little notice. Spring break overwhelms beach facilities in March, but some towns bring in temporary shower trailers.`
    },
    cities: [
      { name: 'Miami', description: '40+ beach shower stations, endless gym options' },
      { name: 'Orlando', description: 'Theme park area with budget motel day passes available' },
      { name: 'Tampa', description: 'Beach access plus good gym coverage' },
      { name: 'Jacksonville', description: 'Large city with beaches and standard facilities' },
      { name: 'Key West', description: 'Limited but available at the end of the Keys' }
    ],
    facilityTypes: [
      { name: 'Beach showers', description: 'Free rinse stations at nearly every public beach' },
      { name: 'Truck stops', description: 'Modern travel plazas along Turnpike and I-95' },
      { name: 'State parks', description: 'Bahia Honda, John Pennekamp, and others with beach facilities' },
      { name: 'Fitness centers', description: 'LA Fitness, YouFit, Anytime Fitness everywhere' },
      { name: 'Motel day passes', description: 'Budget motels in tourist areas offer pool/shower access' }
    ],
    pricingContext: {
      budget: `Free beach showers everywhere, state park day-use $4-8`,
      midRange: `Truck stops $12-15, gym day passes $10-15, motel day passes $10-20`,
      premium: `Resort day passes $25-50+`
    },
    beforeYouGo: `Year-round warm weather but high humidity. Hurricane season (June-Nov) can close coastal facilities. Spring break (March) overwhelms beach facilities. Snowbird season (Nov-April) increases demand statewide.`,
    priceRange: { low: 0, high: 30 }
  },
  
  'georgia': {
    name: 'Georgia',
    code: 'GA',
    narrative: {
      intro: `Atlanta's position as a major transportation hub makes Georgia the "truck stop capital of the South" with quality facilities at every interstate junction. The city's sprawl means gyms cluster in specific areas - Buckhead for premium options, suburbs for family chains. Beyond Atlanta, you'll find good coverage in most cities, though rural areas between interstates can be sparse.`,
      travelersNote: `Savannah's charming historic district has limited shower options - most visitors head to Tybee Island (20 minutes away) for beach facilities. College football transforms Athens and Atlanta on game days, with 100,000+ visitors making facilities crowded. If you're hiking the Appalachian Trail, Springer Mountain (the southern terminus) has nearby facilities catering to thru-hikers.`,
      localTip: `The CDC headquarters in Atlanta has fostered a health-conscious culture, so you'll find more gym options per capita than you might expect. State parks like Cloudland Canyon and Amicalola Falls have campground showers.`
    },
    cities: [
      { name: 'Atlanta', description: 'Major hub with facilities clustered by neighborhood, great truck stop coverage' },
      { name: 'Savannah', description: 'Historic district is limited, head to Tybee Island for beach showers' },
      { name: 'Athens', description: 'UGA college town, busy on football weekends' },
      { name: 'Augusta', description: 'Masters Tournament in April affects availability' },
      { name: 'Macon', description: 'Central Georgia with standard gym options' }
    ],
    facilityTypes: [
      { name: 'Truck stops', description: 'Love\'s and Pilot at every major interstate junction' },
      { name: 'Fitness centers', description: 'LA Fitness, Planet Fitness, Anytime Fitness throughout metro areas' },
      { name: 'Recreation centers', description: 'YMCA of Metro Atlanta plus municipal facilities' },
      { name: 'State parks', description: 'Cloudland Canyon, Amicalola Falls with campground showers' },
      { name: 'Beach facilities', description: 'Tybee Island and Georgia coast beaches' }
    ],
    pricingContext: {
      budget: `State park day-use $5, beach showers free at Tybee Island`,
      midRange: `Gym day passes $10-15, truck stops $12-15`,
      premium: `Buckhead premium gyms $20-25`
    },
    beforeYouGo: `Hot, humid summers. College football weekends (especially UGA in Athens) overwhelm facilities. Masters Tournament in April makes Augusta area very busy. Spring pollen season is intense.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'hawaii': {
    name: 'Hawaii',
    code: 'HI',
    narrative: {
      intro: `Hawaii's beach culture makes it one of the easiest places to find a free shower. Virtually every beach park has shower facilities - over 150 locations statewide. Waikiki alone has 30+ public showers along the beach. Local etiquette actually requires rinsing before entering the ocean (to remove sunscreen) and after (to remove salt), so the infrastructure is built for it.`,
      travelersNote: `The neighbor islands (Maui, Big Island, Kauai) have fewer commercial gyms than Oahu but excellent beach facilities throughout. Hotel day passes for pool and shower access are common in tourist areas, though prices vary widely. Military bases restrict access but influence surrounding gym development.`,
      localTip: `Many beach showers now use low-flow fixtures due to water scarcity - be mindful of usage. If you need a more private shower, community pools often offer affordable access. The YMCA of Honolulu is a reliable option on Oahu.`
    },
    cities: [
      { name: 'Honolulu', description: 'Waikiki has 30+ beach showers, plus gyms and YMCA' },
      { name: 'Kahului', description: 'Maui hub with beach parks and basic gym options' },
      { name: 'Kailua-Kona', description: 'Big Island west side with beach facilities' },
      { name: 'Hilo', description: 'Big Island east side, UH Hilo campus area' },
      { name: 'Lihue', description: 'Kauai main town with beach access nearby' }
    ],
    facilityTypes: [
      { name: 'Beach park showers', description: 'Free at 150+ beach parks statewide' },
      { name: 'Hotel day passes', description: 'Pool and shower access at resort hotels, prices vary' },
      { name: 'Community pools', description: 'Affordable access with shower facilities' },
      { name: 'Fitness centers', description: '24 Hour Fitness, Anytime Fitness mainly on Oahu' },
      { name: 'YMCAs', description: 'YMCA of Honolulu with day pass options' }
    ],
    pricingContext: {
      budget: `Free beach showers everywhere, community pools $3-5`,
      midRange: `Gym day passes $15-20, some hotel day passes $15-25`,
      premium: `Resort pool day passes $30-75+`
    },
    beforeYouGo: `Year-round tropical weather with trade winds. Peak tourist season (Dec-April) and Ironman in October (Big Island) increase demand. Water conservation is important - be mindful of shower usage.`,
    priceRange: { low: 0, high: 35 }
  },
  
  'idaho': {
    name: 'Idaho',
    code: 'ID',
    narrative: {
      intro: `Idaho has over 130 soakable hot springs, making it unique for shower access. These range from developed resorts with full facilities to primitive backcountry pools requiring a hike. Beyond the springs, Boise's recent growth has brought modern fitness chains, though rural areas still depend on school facilities that open to the public during evenings and weekends.`,
      travelersNote: `Sun Valley attracts wealthy tourists with high-end spa facilities, while the rest of the state is more modest. White water rafting companies along the Salmon and Payette Rivers typically offer end-of-trip shower facilities for their guests. Winter road conditions in the mountains can make facilities inaccessible for days.`,
      localTip: `Eastern Idaho has strong Mormon influence, so many facilities close on Sundays. If you're passing through the Magic Valley agricultural area, options are limited - some churches run shower programs for seasonal workers.`
    },
    cities: [
      { name: 'Boise', description: 'Growing city with modern gym chains and increasing premium options' },
      { name: 'Coeur d\'Alene', description: 'North Idaho resort town with lake facilities' },
      { name: 'Idaho Falls', description: 'Eastern Idaho hub, watch for Sunday closures' },
      { name: 'Pocatello', description: 'ISU college town with campus facilities' },
      { name: 'Sun Valley', description: 'Upscale ski resort with high-end spa options' }
    ],
    facilityTypes: [
      { name: 'Hot springs', description: '130+ locations from developed resorts to primitive pools' },
      { name: 'Recreation centers', description: 'Municipal facilities in larger cities' },
      { name: 'Fitness centers', description: 'Anytime Fitness, Planet Fitness in Boise area' },
      { name: 'Rafting outfitters', description: 'End-of-trip showers for river trip guests' },
      { name: 'School facilities', description: 'Rural areas open school gyms to public evenings/weekends' }
    ],
    pricingContext: {
      budget: `Primitive hot springs free-$10, school facilities often free or donation`,
      midRange: `Gym day passes $10-15, developed hot springs $10-20`,
      premium: `Sun Valley resort spa $30+, premium Boise gyms $20+`
    },
    beforeYouGo: `Four seasons with cold winters. Mountain roads can be impassable in winter. Eastern Idaho has Sunday closures. Hot springs are available year-round but some primitive ones require hiking.`,
    priceRange: { low: 0, high: 20 }
  },
  
  'illinois': {
    name: 'Illinois',
    code: 'IL',
    narrative: {
      intro: `Chicago dominates Illinois shower options with the Park District operating 70+ facilities across the city. Lake Michigan beaches have 30+ shower stations open from May through October - completely free to use. The Loop caters to finance workers with premium gyms opening as early as 4:30am, while South and West sides have strong community center networks.`,
      travelersNote: `If you're passing through O'Hare, numerous hotels offer day rates for layover passengers needing a shower. Downstate Illinois is a different story - many small towns rely entirely on YMCAs, and some have no public options at all. University towns like Champaign-Urbana open campus facilities to the community, especially during summer.`,
      localTip: `Chicago Park District day passes run $20-35 but include pool access. If you just need a quick shower after the beach, the lakefront beach houses are free. Winter creates demand for indoor facilities when outdoor runners need alternatives.`
    },
    cities: [
      { name: 'Chicago', description: '70+ Park District facilities, 30+ beach showers along lakefront' },
      { name: 'Springfield', description: 'State capital with basic municipal options' },
      { name: 'Champaign-Urbana', description: 'UIUC college town with university facilities' },
      { name: 'Rockford', description: 'Northern Illinois city with YMCAs and gyms' },
      { name: 'Naperville', description: 'Affluent suburb with good gym coverage' }
    ],
    facilityTypes: [
      { name: 'Park District facilities', description: 'Chicago runs 70+ facilities with day passes $20-35' },
      { name: 'Beach houses', description: 'Free showers at 30+ Lake Michigan beach locations (May-Oct)' },
      { name: 'Fitness centers', description: 'LA Fitness, Xsport, Planet Fitness in metro areas' },
      { name: 'YMCAs', description: 'The backbone of downstate Illinois access' },
      { name: 'University facilities', description: 'Campus rec centers open to community, especially summer' }
    ],
    pricingContext: {
      budget: `Free Lake Michigan beach showers, some community centers under $10`,
      midRange: `Gym day passes $10-20, Park District facilities $20-35 with pool access`,
      premium: `Loop premium gyms $25-40`
    },
    beforeYouGo: `Cold winters with lake effect snow. Beach facilities open May-Oct only. O'Hare area hotels offer day rates for travelers. Downstate options are limited compared to Chicago.`,
    priceRange: { low: 0, high: 30 }
  },
  
  'indiana': {
    name: 'Indiana',
    code: 'IN',
    narrative: {
      intro: `Indiana's basketball culture means even small towns have recreation centers with showers - the gym is central to community life here. Indianapolis has solid coverage with YMCAs and fitness chains, while college towns like Bloomington and West Lafayette offer campus facilities. Truck stops along I-65 and I-70 serve as crucial facilities for the stretches of rural farmland between cities.`,
      travelersNote: `The Indianapolis 500 in May brings 300,000+ visitors and strains facilities citywide - plan ahead if visiting during race week. Indiana Dunes National Park has beach showers, though Lake Michigan water is cold even in summer. Amish country in northern Indiana has very limited public facilities.`,
      localTip: `The RV manufacturing hub around Elkhart supports numerous campgrounds with shower facilities - useful if you're passing through on I-80/90. College towns empty out in summer, making university facilities more accessible.`
    },
    cities: [
      { name: 'Indianapolis', description: 'State capital with YMCAs, gyms, and rec centers throughout' },
      { name: 'Bloomington', description: 'IU college town with campus facilities' },
      { name: 'Fort Wayne', description: 'Second largest city with standard gym coverage' },
      { name: 'South Bend', description: 'Notre Dame area with university influence' },
      { name: 'Gary', description: 'Near Indiana Dunes with beach shower access' }
    ],
    facilityTypes: [
      { name: 'Recreation centers', description: 'Basketball culture means most towns have a gym with showers' },
      { name: 'YMCAs', description: 'Strong network throughout the state' },
      { name: 'Truck stops', description: 'Along I-65, I-70, and I-80/90 corridors' },
      { name: 'University facilities', description: 'IU, Purdue, Notre Dame with varying public access' },
      { name: 'State parks', description: 'Indiana Dunes, Brown County, Turkey Run with campground showers' }
    ],
    pricingContext: {
      budget: `State park day-use $5-7, some community centers under $5`,
      midRange: `Gym day passes $10-15, truck stops $12-15`,
      premium: `Premium Indianapolis gyms $20+`
    },
    beforeYouGo: `Four seasons with cold winters and humid summers. Indy 500 (May) overwhelms the city. Amish areas have limited facilities. College towns change dramatically between school year and summer.`,
    priceRange: { low: 0, high: 22 }
  },
  
  'iowa': {
    name: 'Iowa',
    code: 'IA',
    narrative: {
      intro: `Iowa is home to the world's largest truck stop - Iowa 80 on I-80 - which sets the standard for interstate shower facilities. Beyond the highways, the state's agricultural character means many rural communities have only school facilities available after hours, but the cities have solid YMCA and gym coverage. Des Moines, Cedar Rapids, and the college towns offer the most options.`,
      travelersNote: `RAGBRAI (the famous bike ride across Iowa) each July creates moving demand as small towns open schools and churches for cyclists. College towns like Iowa City and Ames have good facilities but stark differences between student-focused and community options. Wind farm workers in rural areas create unexpected demand in formerly quiet towns.`,
      localTip: `Iowa 80 truck stop near Walcott is worth a stop even if you're not a trucker - clean facilities, food options, and a trucking museum. Many small-town pools built in the 1960s-70s are aging, so quality varies.`
    },
    cities: [
      { name: 'Des Moines', description: 'State capital with the best facility coverage' },
      { name: 'Iowa City', description: 'University of Iowa town with campus rec facilities' },
      { name: 'Cedar Rapids', description: 'Second largest city with YMCAs and gyms' },
      { name: 'Ames', description: 'Iowa State University town' },
      { name: 'Davenport', description: 'Quad Cities area on the Mississippi' }
    ],
    facilityTypes: [
      { name: 'Truck stops', description: 'Iowa 80 is world-famous, plus Love\'s along I-80 and I-35' },
      { name: 'YMCAs', description: 'Network throughout the state' },
      { name: 'Community centers', description: 'Small towns often have a community pool or rec center' },
      { name: 'University facilities', description: 'Iowa, Iowa State, UNI with varying access' },
      { name: 'School facilities', description: 'Rural areas open schools after hours' }
    ],
    pricingContext: {
      budget: `School and community facilities often under $5, some free`,
      midRange: `Truck stops $12-15, gym day passes $10-15`,
      premium: `Premium Des Moines gyms $15-20`
    },
    beforeYouGo: `Continental climate with cold winters and hot summers. RAGBRAI in July transforms small towns. Iowa State Fair in August brings crowds to Des Moines. Caucus season (every 4 years) brings media crowds.`,
    priceRange: { low: 0, high: 18 }
  },
  
  'kansas': {
    name: 'Kansas',
    code: 'KS',
    narrative: {
      intro: `Kansas's position on cross-country trucking routes means excellent truck stop facilities every 50-75 miles along I-70. Like neighboring Indiana, basketball culture runs deep here, so most communities have gymnasiums with shower facilities. The cities - Wichita, Kansas City (KS), Topeka - have standard gym and YMCA coverage.`,
      travelersNote: `Western Kansas is oil field country where workers rely on hotel day rates and truck stops. Small towns often have just one facility serving the entire community, typically the school gym. College towns Lawrence (KU) and Manhattan (K-State) have good options but get overwhelmed during basketball season.`,
      localTip: `Fort Riley and McConnell AFB influence nearby civilian facilities in Junction City and Wichita respectively. German-Russian heritage communities in central Kansas maintain strong community center traditions with welcoming attitudes.`
    },
    cities: [
      { name: 'Wichita', description: 'Largest city with Genesis Health Clubs and major chains' },
      { name: 'Kansas City', description: 'KCK side of metro area with gym coverage' },
      { name: 'Lawrence', description: 'KU college town, busy during basketball season' },
      { name: 'Topeka', description: 'State capital with standard options' },
      { name: 'Manhattan', description: 'K-State town with university facilities' }
    ],
    facilityTypes: [
      { name: 'Truck stops', description: 'Every 50-75 miles along I-70, good coverage on I-35' },
      { name: 'Community centers', description: 'Basketball culture means most towns have a gym' },
      { name: 'University facilities', description: 'KU and K-State with varying public access' },
      { name: 'Fitness centers', description: 'Genesis Health Clubs (regional), Planet Fitness, Anytime Fitness' },
      { name: 'School facilities', description: 'Small towns often open schools to public' }
    ],
    pricingContext: {
      budget: `School and community facilities often under $5`,
      midRange: `Truck stops $12-15, gym day passes $10-15`,
      premium: `Premium Wichita gyms $15-20`
    },
    beforeYouGo: `Hot summers and cold winters. Tornado season (April-June) can damage or close facilities. Basketball season makes college towns busy. Western Kansas has long stretches between facilities.`,
    priceRange: { low: 0, high: 20 }
  },
  
  'kentucky': {
    name: 'Kentucky',
    code: 'KY',
    narrative: {
      intro: `Kentucky has a unique asset: the state resort park system. These parks include lodges with public shower access even for non-guests, making them a reliable option throughout the state. Basketball culture here rivals Indiana's, so most communities have recreation centers. Louisville and Lexington have solid gym coverage, and the bourbon tourism boom has brought upscale facilities along the trail routes.`,
      travelersNote: `Eastern Kentucky's coal country has limited options - some communities rely entirely on school facilities. Lake Cumberland and Land Between the Lakes provide seasonal facilities for boaters. Louisville's Derby Week (first Saturday in May) sees prices triple and restricted access at many facilities - avoid if you can.`,
      localTip: `State resort parks like Lake Cumberland, Natural Bridge, and Cumberland Falls are worth knowing about - they're scattered throughout the state and offer reliable shower access even if you're not staying overnight.`
    },
    cities: [
      { name: 'Louisville', description: 'Largest city with YMCAs and major gym chains, crazy during Derby' },
      { name: 'Lexington', description: 'UK college town with university facilities and horse country gyms' },
      { name: 'Bowling Green', description: 'WKU town with campus and community options' },
      { name: 'Covington', description: 'Northern Kentucky near Cincinnati with shared metro facilities' },
      { name: 'Lake Cumberland area', description: 'Resort park and lake facilities for boaters' }
    ],
    facilityTypes: [
      { name: 'State resort parks', description: 'Unique to Kentucky - lodges with public shower access' },
      { name: 'Recreation centers', description: 'Basketball culture means most towns have a gym' },
      { name: 'Lake facilities', description: 'Lake Cumberland, Land Between the Lakes for boaters' },
      { name: 'University facilities', description: 'UK, U of L, WKU with varying access' },
      { name: 'Truck stops', description: 'Along I-65, I-75, and I-64 corridors' }
    ],
    pricingContext: {
      budget: `State park day-use $5-10, community facilities under $5`,
      midRange: `Gym day passes $10-15, truck stops $12-15`,
      premium: `Bourbon Trail area premium facilities $20+, Louisville Derby week prices triple`
    },
    beforeYouGo: `Humid summers and mild winters. Kentucky Derby (May) makes Louisville impossible. Basketball season affects college towns. Eastern Kentucky has limited options - state parks are your backup.`,
    priceRange: { low: 0, high: 22 }
  },
  
  'louisiana': {
    name: 'Louisiana',
    code: 'LA',
    narrative: {
      intro: `New Orleans drives Louisiana's tourism, and French Quarter gyms have adapted by offering day passes to visitors year-round. Outside the city, Baton Rouge has LSU facilities and standard gym chains, while the rest of the state varies widely. Casino resorts in Lake Charles and Shreveport offer spa and fitness day access if you want something nicer.`,
      travelersNote: `During Mardi Gras (Feb/March) and Jazz Fest (April/May), New Orleans facilities can be completely inaccessible to non-members - plan accordingly or skip the city during these times. Oil industry workers on offshore rotation use facilities during shore time, creating unusual demand patterns in coastal parishes.`,
      localTip: `Post-Katrina infrastructure varies widely by parish, and some facilities are still recovering from 2020-2021 hurricane damage. State parks like Fontainebleau have reliable campground showers. Boat launch facilities in the "Sportsman's Paradise" region often have basic showers.`
    },
    cities: [
      { name: 'New Orleans', description: 'French Quarter gyms offer tourist day passes, avoid during Mardi Gras' },
      { name: 'Baton Rouge', description: 'LSU campus facilities plus standard gym chains' },
      { name: 'Lafayette', description: 'Cajun country hub with community centers' },
      { name: 'Shreveport', description: 'Casino resort spa access available' },
      { name: 'Lake Charles', description: 'Casino town with spa day passes' }
    ],
    facilityTypes: [
      { name: 'Community centers', description: 'Parish-run facilities throughout the state' },
      { name: 'Casino resorts', description: 'Lake Charles and Shreveport offer spa day access' },
      { name: 'State parks', description: 'Fontainebleau, Chicot with campground showers' },
      { name: 'University facilities', description: 'LSU, Tulane with varying access' },
      { name: 'Truck stops', description: 'Along I-10, I-20, and I-49' }
    ],
    pricingContext: {
      budget: `State park day-use $3-5, community centers under $5`,
      midRange: `Gym day passes $10-15, truck stops $12-15`,
      premium: `Casino spa day passes $20-40, New Orleans premium gyms $20+`
    },
    beforeYouGo: `Subtropical humidity year-round. Mardi Gras and Jazz Fest make New Orleans facilities inaccessible. Hurricane season (June-Nov) can close coastal facilities. Infrastructure quality varies by parish.`,
    priceRange: { low: 0, high: 20 }
  },
  
  'maine': {
    name: 'Maine',
    code: 'ME',
    narrative: {
      intro: `Maine's 3,500-mile coastline is rugged and cold, making beach showers less common than other coastal states - the water is rarely warm enough for casual swimming. Portland has become a food destination, and tourists use urban gym day passes while visiting. Acadia National Park area has facilities but they're overwhelmed in summer. Much of northern Maine has vast areas with no public facilities at all.`,
      travelersNote: `Many facilities are seasonal (May-October) due to freeze concerns. Winter conditions can isolate communities for days. If you're heading to Acadia in summer, book accommodations with shower access - the park area gets extremely crowded and facilities fill up.`,
      localTip: `The L.L.Bean flagship store area in Freeport has influenced local outdoor culture, and you'll find good facilities nearby. Ski resorts in winter offer shower access to day visitors. French-Canadian influence in northern Maine affects some facility customs.`
    },
    cities: [
      { name: 'Portland', description: 'Food destination city with urban gym day passes available' },
      { name: 'Bangor', description: 'Gateway to northern Maine with YMCA and basic options' },
      { name: 'Bar Harbor', description: 'Acadia gateway, overwhelmed in summer' },
      { name: 'Augusta', description: 'State capital with limited but available facilities' },
      { name: 'Freeport', description: 'L.L.Bean town with outdoor culture and good options nearby' }
    ],
    facilityTypes: [
      { name: 'YMCAs', description: 'Primary option in most Maine cities' },
      { name: 'State parks', description: 'Acadia, Baxter, Sebago Lake with seasonal facilities' },
      { name: 'Recreation centers', description: 'Portland and larger towns have municipal facilities' },
      { name: 'Ski resorts', description: 'Winter shower access for day visitors' },
      { name: 'Fitness centers', description: 'Planet Fitness, Anytime Fitness in southern Maine' }
    ],
    pricingContext: {
      budget: `State park day-use $6-8, some community pools under $5`,
      midRange: `YMCA and gym day passes $10-20`,
      premium: `Resort and spa facilities $25+`
    },
    beforeYouGo: `Cold winters with heavy snow. Cool summers with short beach season (July-Aug only). Many facilities seasonal May-Oct. Northern Maine has vast areas with nothing - plan ahead. Acadia area overwhelmed in summer.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'maryland': {
    name: 'Maryland',
    code: 'MD',
    narrative: {
      intro: `Maryland's DC suburbs have extensive premium facilities serving federal workers and contractors - Montgomery County's public recreation centers are among the best in the nation. Ocean City's 10-mile beach has shower stations every few blocks during season. Baltimore has neighborhood pools serving as community resources, though funding varies by area.`,
      travelersNote: `The Chesapeake Bay is for boaters more than swimmers, so facilities there focus on marinas rather than beaches. Deep Creek Lake in Western Maryland serves as the region's "beach" destination with seasonal facilities. Federal facilities (NIH, Fort Meade) have restricted access but influence surrounding areas.`,
      localTip: `Montgomery County recreation centers are exceptional and worth seeking out if you're in the DC suburbs. Ocean City is very seasonal - facilities close or reduce hours significantly after Labor Day. The Naval Academy influences Annapolis gym culture.`
    },
    cities: [
      { name: 'Baltimore', description: 'Neighborhood pools and YMCAs, quality varies by area' },
      { name: 'Ocean City', description: 'Beach showers every few blocks, very seasonal' },
      { name: 'Bethesda/Rockville', description: 'Exceptional Montgomery County rec centers' },
      { name: 'Annapolis', description: 'Naval Academy area with maritime culture' },
      { name: 'College Park', description: 'UMD campus facilities' }
    ],
    facilityTypes: [
      { name: 'Beach facilities', description: 'Ocean City and Assateague with seasonal showers' },
      { name: 'Recreation centers', description: 'Montgomery County facilities are exceptional' },
      { name: 'Premium gyms', description: 'Merritt Clubs, LA Fitness throughout DC suburbs' },
      { name: 'YMCAs', description: 'YMCA of Central Maryland network' },
      { name: 'State parks', description: 'Sandy Point, Assateague, Deep Creek Lake' }
    ],
    pricingContext: {
      budget: `Free Ocean City beach showers, state park day-use $5-7`,
      midRange: `Montgomery County rec centers $10-15, gym day passes $15-20`,
      premium: `Merritt Clubs and DC suburb premium gyms $25-30`
    },
    beforeYouGo: `Humid summers. Beach season Memorial Day to Labor Day only. Ocean City very seasonal. Montgomery County has the best public facilities. Federal workers influence gym culture in DC suburbs.`,
    priceRange: { low: 0, high: 30 }
  },
  
  'massachusetts': {
    name: 'Massachusetts',
    code: 'MA',
    narrative: {
      intro: `Boston area has 50+ colleges, creating a unique fitness landscape. Cambridge and Somerville have the highest concentration of premium fitness options in New England, while working-class cities like Lynn and Brockton depend on YMCAs and community centers. Cape Cod beaches provide extensive shower facilities but parking can cost $30+/day for non-residents during summer.`,
      travelersNote: `September college move-in week creates huge demand across greater Boston. MDC (Metropolitan District Commission) pools serve the metro area with affordable access. The Northampton/Amherst area has progressive co-op style facilities with welcoming attitudes. Maritime heritage means some coastal towns have informal "fishermen's facilities."`,
      localTip: `T-accessible gyms in Boston command premium prices, but you can find better deals slightly outside the city. Cape Cod parking is the real expense - if you can get there, the beach facilities are extensive and free. Walden Pond has shower facilities and is worth the trip.`
    },
    cities: [
      { name: 'Boston', description: 'Dense gym coverage but premium prices, good MDC facilities' },
      { name: 'Cambridge', description: 'Harvard/MIT area with highest concentration of fitness options' },
      { name: 'Cape Cod', description: 'Extensive beach facilities, expensive parking for non-residents' },
      { name: 'Worcester', description: 'Central Mass hub with YMCAs and standard gyms' },
      { name: 'Northampton', description: 'Progressive college town with co-op style facilities' }
    ],
    facilityTypes: [
      { name: 'University facilities', description: '50+ colleges with varying public access' },
      { name: 'Beach facilities', description: 'Cape Cod National Seashore and coastal towns' },
      { name: 'YMCAs', description: 'Essential in working-class cities' },
      { name: 'MDC facilities', description: 'Metropolitan District pools serving greater Boston' },
      { name: 'Premium gyms', description: 'Equinox, BSC in Cambridge/Boston' }
    ],
    pricingContext: {
      budget: `MDC pools $5-10, beach facilities free (parking extra)`,
      midRange: `YMCA and gym day passes $15-25`,
      premium: `Boston/Cambridge premium gyms $30-40, Cape Cod parking $30+`
    },
    beforeYouGo: `Cold snowy winters. Beach season summer only. September college move-in week is chaotic. Cape Cod parking costs are the real expense. T-accessible Boston gyms cost more.`,
    priceRange: { low: 0, high: 35 }
  },
  
  'michigan': {
    name: 'Michigan',
    code: 'MI',
    narrative: {
      intro: `Michigan has more Great Lakes coastline than any other state, with 200+ public beaches offering shower facilities. This makes summer access excellent, especially along Lake Michigan's western shore. Detroit's recovery has brought new recreation centers to previously underserved neighborhoods, and Grand Rapids has emerged as a strong fitness market. The auto industry heritage means UAW-negotiated gym benefits affect the private gym landscape.`,
      travelersNote: `"Up North" culture means seasonal demand from Memorial Day to Labor Day - facilities in northern Michigan and the Upper Peninsula may be limited outside summer. University of Michigan football Saturdays make Ann Arbor facilities virtually inaccessible. Mackinac Island's no-car policy creates unique facility access challenges.`,
      localTip: `Sleeping Bear Dunes and Holland State Park have excellent beach facilities. Dearborn's Arab American community has influenced local facilities with culturally-specific options. Some hardy "polar bear" swimmers use beach facilities year-round, so winter access may be possible.`
    },
    cities: [
      { name: 'Detroit', description: 'Recovering city with new rec centers in previously underserved areas' },
      { name: 'Grand Rapids', description: 'Growing west Michigan hub with good gym coverage' },
      { name: 'Ann Arbor', description: 'U of M town - avoid on football Saturdays' },
      { name: 'Traverse City', description: 'Northern Michigan summer destination' },
      { name: 'Lansing', description: 'State capital with MSU nearby' }
    ],
    facilityTypes: [
      { name: 'Beach facilities', description: '200+ Great Lakes beaches with showers' },
      { name: 'State parks', description: 'Sleeping Bear Dunes, Holland State Park with excellent facilities' },
      { name: 'Recreation centers', description: 'Detroit recovery includes new municipal facilities' },
      { name: 'YMCAs', description: 'Network throughout the state' },
      { name: 'University facilities', description: 'U of M, MSU, WMU with varying access' }
    ],
    pricingContext: {
      budget: `Beach showers free, state park day-use $10-15`,
      midRange: `Gym day passes $10-20, rec centers $10-15`,
      premium: `Lifetime Fitness $25+, Ann Arbor premium gyms $20+`
    },
    beforeYouGo: `Cold winters with lake effect snow. Beach season June-August. "Up North" facilities are seasonal. U of M football Saturdays (fall) make Ann Arbor impossible. Auto shows bring crowds to Detroit area.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'minnesota': {
    name: 'Minnesota',
    code: 'MN',
    narrative: {
      intro: `Minnesota is the birthplace of Life Time Fitness and Anytime Fitness, creating a uniquely strong gym culture for a cold-weather state. The Minneapolis park system is consistently rated best in the nation with year-round facilities. With 11,842 lakes, most communities have seasonal lake facilities during summer. The Twin Cities skyway system connects many downtown fitness facilities for winter access without going outside.`,
      travelersNote: `Mayo Clinic brings medical tourists to Rochester needing accessible facilities - the area is well-equipped. The Boundary Waters area has only primitive facilities for wilderness enthusiasts. Mall of America area caters to tourists with day-pass gym options. Winter forces creativity - some facilities offer unique "sauna to ice plunge" experiences.`,
      localTip: `Minneapolis park system facilities are exceptional and affordable. Somali and Hmong communities have influenced Twin Cities facility offerings. The State Fair (late August) brings crowds to the metro area. Lake facilities are seasonal but abundant from Memorial Day to Labor Day.`
    },
    cities: [
      { name: 'Minneapolis', description: 'Best-in-nation park system with year-round facilities' },
      { name: 'St. Paul', description: 'Twin Cities partner with strong YMCA network' },
      { name: 'Rochester', description: 'Mayo Clinic area with accessible facilities for medical tourists' },
      { name: 'Duluth', description: 'Lake Superior gateway with seasonal options' },
      { name: 'Bloomington', description: 'Mall of America area with tourist-friendly day passes' }
    ],
    facilityTypes: [
      { name: 'Fitness centers', description: 'Birthplace of Life Time Fitness and Anytime Fitness' },
      { name: 'Park facilities', description: 'Minneapolis park system is nationally renowned' },
      { name: 'Lake facilities', description: '11,842 lakes with seasonal community facilities' },
      { name: 'YMCAs', description: 'Strong network in Twin Cities and throughout state' },
      { name: 'Community centers', description: 'Diverse offerings influenced by immigrant communities' }
    ],
    pricingContext: {
      budget: `Lake facilities often free or under $5, park system pools $5-10`,
      midRange: `Gym day passes $15-20, YMCA $15-20`,
      premium: `Life Time Fitness $25-35`
    },
    beforeYouGo: `Extreme winters with subzero temps - skyway system helps downtown. Short warm summers. State Fair (late August) brings crowds. Lake facilities seasonal. Rochester well-equipped for medical visitors.`,
    priceRange: { low: 0, high: 28 }
  },
  
  'mississippi': {
    name: 'Mississippi',
    code: 'MS',
    narrative: {
      intro: `Mississippi's Gulf Coast casinos provide spa and fitness facilities accessible to non-guests for day fees - this is your best option on the coast. Beyond Biloxi and Gulfport, facilities are limited. The Delta region has some of the fewest options in the country, with some counties having no public facilities at all. Jackson and the college towns offer the most reliable access.`,
      travelersNote: `Hurricane Katrina's effects are still visible in coastal facility infrastructure. SEC football Saturdays completely transform Oxford and Starkville - avoid university town facilities on game days. Many rural communities depend entirely on school facilities, and poverty levels mean even low prices can be barriers.`,
      localTip: `Gulf Islands National Seashore has beach facilities. Casino workers on the coast have negotiated facility access at some properties, so asking at casinos is worth it. State parks like Tishomingo offer campground showers.`
    },
    cities: [
      { name: 'Biloxi', description: 'Casino town with spa/fitness day passes available' },
      { name: 'Gulfport', description: 'Gulf Coast with beach and casino facilities' },
      { name: 'Jackson', description: 'State capital with the most reliable options' },
      { name: 'Oxford', description: 'Ole Miss town - avoid on football Saturdays' },
      { name: 'Hattiesburg', description: 'USM town with university and community options' }
    ],
    facilityTypes: [
      { name: 'Casino facilities', description: 'Biloxi and Gulfport casinos offer day passes' },
      { name: 'Beach facilities', description: 'Gulf Islands National Seashore has shower access' },
      { name: 'State parks', description: 'Tishomingo, Percy Quin with campground showers' },
      { name: 'University facilities', description: 'Ole Miss, MSU, USM with varying access' },
      { name: 'Truck stops', description: 'Along I-55, I-20, I-10 corridors' }
    ],
    pricingContext: {
      budget: `State park day-use $3-5, some community centers under $5`,
      midRange: `Casino spa day passes $15-25, gym day passes $10-15`,
      premium: `Premium casino spa facilities $25+`
    },
    beforeYouGo: `Hot, humid summers. Hurricane season affects coast (June-Nov). SEC football Saturdays transform college towns. Delta region has extremely limited options. Katrina damage still affects some coastal infrastructure.`,
    priceRange: { low: 0, high: 18 }
  },
  
  'missouri': {
    name: 'Missouri',
    code: 'MO',
    narrative: {
      intro: `Missouri has two distinct facility landscapes: the cities and the Lake of the Ozarks. St. Louis's Forest Park facilities are a national model for free public access. Kansas City's sprawl means facilities cluster in suburbs rather than downtown. Lake of the Ozarks creates massive seasonal demand with marinas offering shower facilities to boaters throughout the summer.`,
      travelersNote: `Branson's entertainment tourism supports numerous hotel day-pass options if you're in the area. Columbia transformed when Mizzou joined the SEC, affecting facility capacity on game days. Ozark mountain culture tends to favor practical over fancy - don't expect premium gyms outside the cities.`,
      localTip: `Forest Park in St. Louis has excellent free facilities worth seeking out. Lake of the Ozarks marinas typically offer shower access to non-boaters for a fee. Bennett Spring State Park has campground showers and is a popular stop.`
    },
    cities: [
      { name: 'St. Louis', description: 'Forest Park sets national standard for free public access' },
      { name: 'Kansas City', description: 'Suburban sprawl means facilities outside downtown core' },
      { name: 'Columbia', description: 'Mizzou SEC town - game days are crowded' },
      { name: 'Springfield', description: 'Ozarks gateway with standard options' },
      { name: 'Branson', description: 'Entertainment tourism supports hotel day passes' }
    ],
    facilityTypes: [
      { name: 'Lake facilities', description: 'Lake of the Ozarks marinas offer shower access to boaters' },
      { name: 'Recreation centers', description: 'St. Louis and KC municipal facilities' },
      { name: 'YMCAs', description: 'Network throughout the state' },
      { name: 'University facilities', description: 'Mizzou, WashU with varying access' },
      { name: 'Truck stops', description: 'Along I-70, I-44, I-55 corridors' }
    ],
    pricingContext: {
      budget: `St. Louis Forest Park facilities free, state parks $3-5`,
      midRange: `Gym day passes $10-15, marina showers $5-15`,
      premium: `St. Louis premium gyms $20+`
    },
    beforeYouGo: `Hot summers, cold winters. Tornado season in spring. Lake of the Ozarks is seasonal (May-Sept). Mizzou game days affect Columbia. Cardinals and Chiefs games affect their respective cities.`,
    priceRange: { low: 0, high: 22 }
  },
  
  'montana': {
    name: 'Montana',
    code: 'MT',
    narrative: {
      intro: `Montana's vast distances (147,000 square miles, 1 million people) mean some residents drive 100+ miles to facilities. The good news: natural hot springs dot the state with 20+ commercial sites and dozens of primitive backcountry pools. Bozeman's tech boom has brought upscale fitness options uncommon elsewhere. Yellowstone and Glacier tourism creates concentrated seasonal demand near the parks.`,
      travelersNote: `Native American reservations have limited facilities, often just tribal schools. Ranch culture means many rural residents have never used public facilities - don't expect extensive options outside cities. Winter road closures can isolate communities for weeks. "Shoulder season" (April-May, Oct-Nov) sees many facilities closed.`,
      localTip: `Hot springs are your unique Montana option - from developed resorts like Chico Hot Springs to primitive roadside pools. Ski resorts offer shower access to day visitors in winter. Plan ahead in summer as Glacier and Yellowstone areas get overwhelmed.`
    },
    cities: [
      { name: 'Bozeman', description: 'Tech boom brought upscale options uncommon elsewhere' },
      { name: 'Missoula', description: 'University of Montana town with campus facilities' },
      { name: 'Billings', description: 'Largest city with standard gym coverage' },
      { name: 'Whitefish', description: 'Glacier gateway with ski resort facilities' },
      { name: 'Helena', description: 'State capital with basic options' }
    ],
    facilityTypes: [
      { name: 'Hot springs', description: '20+ commercial sites plus primitive backcountry pools' },
      { name: 'Ski resorts', description: 'Winter shower access for day visitors' },
      { name: 'Recreation centers', description: 'Municipal facilities in larger towns' },
      { name: 'University facilities', description: 'U of Montana, MSU with varying access' },
      { name: 'Fitness centers', description: 'Limited to Bozeman, Billings, Missoula' }
    ],
    pricingContext: {
      budget: `Primitive hot springs free, state park camping $5-10`,
      midRange: `Developed hot springs $10-20, gym day passes $10-15`,
      premium: `Bozeman premium gyms $20+, resort hot springs $20+`
    },
    beforeYouGo: `Cold winters with road closures possible. Short summer (June-Aug). Vast distances between facilities - plan ahead. Glacier and Yellowstone areas overwhelmed in summer. Shoulder seasons see many closures.`,
    priceRange: { low: 0, high: 22 }
  },
  
  'nebraska': {
    name: 'Nebraska',
    code: 'NE',
    narrative: {
      intro: `Nebraska's I-80 corridor has some of the nation's cleanest truck stops due to intense competition - a lifesaver if you're crossing the country. Omaha has excellent corporate fitness options thanks to insurance industry headquarters, and Warren Buffett's influence keeps some facilities surprisingly affordable. Lincoln is solid but transforms on Cornhusker football Saturdays when it becomes the state's third-largest city.`,
      travelersNote: `College World Series brings 300,000+ visitors to Omaha each June - plan accordingly. Rural counties may have only a single school facility serving multiple communities. The Sandhills region has vast areas with no facilities at all. Kearney sees unique seasonal demand during spring crane migration.`,
      localTip: `Genesis Health Clubs (regional chain) and YMCAs are your best bets in the cities. Lake McConaughy has beach facilities in summer. Avoid Lincoln entirely on Cornhusker game days unless you're going to the game.`
    },
    cities: [
      { name: 'Omaha', description: 'Best options in the state, corporate gyms and affordable facilities' },
      { name: 'Lincoln', description: 'Good except on Cornhusker Saturdays when the city overwhelms' },
      { name: 'Kearney', description: 'I-80 corridor town with crane migration tourism' },
      { name: 'Grand Island', description: 'Central Nebraska hub with basic options' },
      { name: 'North Platte', description: 'Western Nebraska truck stop town' }
    ],
    facilityTypes: [
      { name: 'Truck stops', description: 'I-80 corridor has excellent, clean facilities' },
      { name: 'Fitness centers', description: 'Genesis Health Clubs, Planet Fitness in cities' },
      { name: 'YMCAs', description: 'Network in Omaha and Lincoln' },
      { name: 'University facilities', description: 'UNL with varying access' },
      { name: 'Lake facilities', description: 'Lake McConaughy has summer beach facilities' }
    ],
    pricingContext: {
      budget: `School facilities in rural areas often free, state parks $5-7`,
      midRange: `Gym day passes $10-15, truck stops $12-15`,
      premium: `Omaha premium gyms $15-20`
    },
    beforeYouGo: `Hot summers, cold winters. Tornado season in spring. Cornhusker football Saturdays (fall) make Lincoln impossible. College World Series (June) crowds Omaha. Sandhills region has no facilities.`,
    priceRange: { low: 0, high: 20 }
  },
  
  'nevada': {
    name: 'Nevada',
    code: 'NV',
    narrative: {
      intro: `Las Vegas operates 24/7 and gyms follow suit - true round-the-clock access is available. The city has two tiers: Strip hotel pool/spa day passes ($25-75+ depending on the DJ or event) and locals' casinos offering much cheaper facility access. EoS Fitness and Las Vegas Athletic Clubs serve the resident population with affordable options. Reno has a more modest scene but solid coverage.`,
      travelersNote: `Casino employees get facility access at major properties as an employment benefit, which affects what's available to visitors. Burning Man (late August) creates unusual demand in the Reno area - book ahead. Water conservation measures mean many showers have timers. Lake Tahoe Nevada side has winter ski facilities.`,
      localTip: `Skip the Strip for affordable showers - locals' casinos like Station Casinos properties offer gym access for much less. Downtown Las Vegas renovation has brought new boutique fitness options. Red Rock Canyon has limited facilities for day visitors.`
    },
    cities: [
      { name: 'Las Vegas', description: '24/7 gym access, huge range from budget to ultra-premium' },
      { name: 'Henderson', description: 'Locals\' area with affordable gym chains' },
      { name: 'Reno', description: 'More modest scene, UNR campus facilities' },
      { name: 'Lake Tahoe (NV side)', description: 'Ski resort facilities in winter' },
      { name: 'Laughlin', description: 'Small casino town with some day pass options' }
    ],
    facilityTypes: [
      { name: 'Casino facilities', description: 'Strip hotels expensive, locals\' casinos much cheaper' },
      { name: 'Fitness centers', description: 'EoS, LVAC, Planet Fitness for residents' },
      { name: 'Recreation centers', description: 'Municipal facilities in Las Vegas and Henderson' },
      { name: 'Truck stops', description: 'Along I-15 and I-80' },
      { name: 'Day spas', description: 'Premium Strip spa day passes' }
    ],
    pricingContext: {
      budget: `Locals' casino gyms $5-10, municipal rec centers $10-15`,
      midRange: `Chain gym day passes $10-20, truck stops $12-15`,
      premium: `Strip hotel pool passes $25-75+, premium spas $50+`
    },
    beforeYouGo: `Extreme summer heat in desert (June-Sept). Water conservation means shower timers. Burning Man (Aug) affects Reno area. 24/7 access in Vegas. Strip prices much higher than locals' options.`,
    priceRange: { low: 0, high: 40 }
  },
  
  'new-hampshire': {
    name: 'New Hampshire',
    code: 'NH',
    narrative: {
      intro: `New Hampshire's "Live Free or Die" culture extends to minimal facility regulations and a frugal approach - facilities tend to be basic but functional. The White Mountains draw hikers needing showers after multi-day trips. The Lakes Region has 273 lakes with varying levels of public access. Massachusetts residents fleeing taxes use NH facilities while shopping, creating unusual cross-border demand.`,
      travelersNote: `Ski areas struggle with providing affordable facilities for seasonal workers - worth asking about. Portsmouth's seacoast area has limited beach facilities since the water is cold. Dartmouth's influence makes Hanover facilities more expensive than surrounding areas. Presidential Primary season (every 4 years) brings temporary demand spikes.`,
      localTip: `White Mountain National Forest and Franconia Notch have basic facilities for hikers. Ski resorts offer shower access in winter. Hampton Beach State Park has seasonal beach facilities. YMCAs are your most reliable option in the cities.`
    },
    cities: [
      { name: 'Manchester', description: 'Largest city with YMCA and standard gym options' },
      { name: 'Nashua', description: 'Southern NH near MA border with good coverage' },
      { name: 'Portsmouth', description: 'Seacoast area but limited beach facilities' },
      { name: 'Hanover', description: 'Dartmouth town - facilities pricier than surroundings' },
      { name: 'North Conway', description: 'White Mountains gateway with ski resort facilities' }
    ],
    facilityTypes: [
      { name: 'Ski resorts', description: 'Winter shower access for day visitors' },
      { name: 'Lake facilities', description: '273 lakes with varying public access' },
      { name: 'YMCAs', description: 'Most reliable option in cities' },
      { name: 'State parks', description: 'White Mountains, Hampton Beach with basic facilities' },
      { name: 'Fitness centers', description: 'Planet Fitness, Anytime Fitness in southern NH' }
    ],
    pricingContext: {
      budget: `State park day-use $4-5, some community facilities under $5`,
      midRange: `Gym day passes $10-15, YMCA $15-20`,
      premium: `Hanover/Dartmouth area $20+, resort facilities $20+`
    },
    beforeYouGo: `Cold snowy winters. Short beach season. Lake season June-Aug. Ski season Dec-March. Fall foliage (Sept-Oct) brings crowds. Motorcycle Week (June) affects Laconia area. Frugal culture means basic facilities.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'new-jersey': {
    name: 'New Jersey',
    code: 'NJ',
    narrative: {
      intro: `New Jersey's 130 miles of Shore coastline means extensive beach shower facilities - but most towns charge beach badges ($5-15/day) that include shower access. The state's highest-in-nation property taxes fund excellent municipal recreation centers, especially in wealthier suburbs. NYC commuters use NJ gyms near train stations for better prices than Manhattan, creating demand at places like Hoboken and Jersey City.`,
      travelersNote: `"Bennies" (tourists) versus locals tension affects Shore facility access and pricing - expect some restrictions at peak times. Atlantic City casinos offer day passes to pool/spa facilities. Urban areas like Newark and Camden struggle with facility maintenance compared to suburbs. Princeton area has premium facilities serving pharmaceutical executives.`,
      localTip: `Beach badges are your entry to Shore shower facilities - factor the cost in. Island Beach State Park has facilities without the badge system. Train station gyms in commuter towns offer good value. Municipal rec centers are worth seeking out in the suburbs.`
    },
    cities: [
      { name: 'Jersey City', description: 'NYC commuter hub with good gym coverage' },
      { name: 'Atlantic City', description: 'Casino spa day passes available' },
      { name: 'Princeton', description: 'Premium facilities serving pharma executives' },
      { name: 'Newark', description: 'Urban area with varying facility quality' },
      { name: 'Shore towns', description: 'Beach badges include shower access' }
    ],
    facilityTypes: [
      { name: 'Beach facilities', description: '130 miles of Shore with showers - beach badge required ($5-15)' },
      { name: 'Recreation centers', description: 'Excellent municipal facilities funded by property taxes' },
      { name: 'Casino facilities', description: 'Atlantic City spa day passes' },
      { name: 'Fitness centers', description: 'LA Fitness, Retro Fitness, Edge Fitness throughout' },
      { name: 'YMCAs', description: 'Network across the state' }
    ],
    pricingContext: {
      budget: `Some municipal pools $5-10, beach badges $5-15 (include shower)`,
      midRange: `Gym day passes $10-20, rec center day passes $10-15`,
      premium: `Atlantic City casino spa $25-50, Princeton area gyms $25+`
    },
    beforeYouGo: `Hot humid summers. Shore season Memorial Day to Labor Day. Beach badges required at most Shore towns. Property taxes fund good suburban rec centers. Urban area facilities vary in quality.`,
    priceRange: { low: 0, high: 30 }
  },
  
  'new-mexico': {
    name: 'New Mexico',
    code: 'NM',
    narrative: {
      intro: `New Mexico has numerous natural hot springs, from developed resorts like Ojo Caliente and Ten Thousand Waves to primitive roadside pools scattered throughout the state. Santa Fe's art scene supports high-end spa facilities beyond typical gym offerings. Albuquerque has standard gym coverage with regional chains like Defined Fitness, plus the UNM campus.`,
      travelersNote: `Native American pueblos generally don't allow non-tribal access to facilities. Military presence at Los Alamos, White Sands, and Kirtland AFB creates security restrictions in some areas. Rural stretches between Albuquerque and El Paso have 50+ mile gaps with no facilities. High altitude (Santa Fe at 7,000 feet) affects visitor stamina.`,
      localTip: `Hot springs are the unique New Mexico experience - from rustic to luxurious. Elephant Butte Lake State Park has facilities for boaters. The Balloon Fiesta in October brings crowds to Albuquerque. Breaking Bad tourism has oddly increased facility demand in ABQ.`
    },
    cities: [
      { name: 'Albuquerque', description: 'Largest city with Defined Fitness and standard chains' },
      { name: 'Santa Fe', description: 'Art scene supports high-end spas beyond typical gyms' },
      { name: 'Las Cruces', description: 'NMSU town in southern New Mexico' },
      { name: 'Taos', description: 'Ski town with resort and hot spring access' },
      { name: 'Ojo Caliente', description: 'Famous hot springs resort' }
    ],
    facilityTypes: [
      { name: 'Hot springs', description: 'From developed resorts to primitive pools throughout the state' },
      { name: 'Fitness centers', description: 'Defined Fitness (regional), Planet Fitness in cities' },
      { name: 'State parks', description: 'Elephant Butte Lake and others with facilities' },
      { name: 'Recreation centers', description: 'Municipal facilities in larger cities' },
      { name: 'Truck stops', description: 'Along I-25, I-40, I-10' }
    ],
    pricingContext: {
      budget: `Primitive hot springs free, state parks $5, community pools $3-5`,
      midRange: `Gym day passes $10-15, developed hot springs $15-25`,
      premium: `Santa Fe spas $30-75+, Ten Thousand Waves $40+`
    },
    beforeYouGo: `High desert with hot summers, mild winters. High altitude affects stamina. Balloon Fiesta (Oct) crowds Albuquerque. Rural areas have 50+ mile gaps. Native American lands have restricted access.`,
    priceRange: { low: 0, high: 22 }
  },
  
  'new-york': {
    name: 'New York',
    code: 'NY',
    narrative: {
      intro: `New York is really two states: NYC and everything else. The city has 500+ fitness facilities, but Manhattan prices can exceed $300/month. The secret is NYC recreation centers, which offer $150/year memberships for residents - some of the best value in the country. Long Island beaches have extensive facilities but parking can reach $50/day. Upstate is more modest with YMCAs and local gyms.`,
      travelersNote: `Adirondack Park (6 million acres) has scattered facilities mainly at campgrounds. Finger Lakes wine tourism has spawned spa facilities at wineries. Orthodox Jewish communities in Brooklyn have gender-separated facility requirements. Hamptons facilities become exclusive clubs Memorial Day through Labor Day. Upstate struggles with winter maintenance.`,
      localTip: `NYC recreation centers are the move for residents. For visitors, Blink Fitness offers the best day pass value in Manhattan. Jones Beach has excellent facilities. Niagara Falls area has tourist-focused options. Ithaca (Cornell) has good campus-area facilities.`
    },
    cities: [
      { name: 'New York City', description: '500+ facilities, huge price range from budget to ultra-premium' },
      { name: 'Long Island', description: 'Extensive beach facilities, expensive parking' },
      { name: 'Buffalo', description: 'Niagara Falls tourism influences facility options' },
      { name: 'Ithaca', description: 'Cornell town with good campus options' },
      { name: 'Albany', description: 'State capital with standard coverage' }
    ],
    facilityTypes: [
      { name: 'Recreation centers', description: 'NYC centers are incredible value for residents' },
      { name: 'Beach facilities', description: 'Long Island and Jones Beach with extensive showers' },
      { name: 'Premium gyms', description: 'Equinox, NYSC in Manhattan' },
      { name: 'Budget gyms', description: 'Blink Fitness, Planet Fitness throughout' },
      { name: 'State parks', description: 'Adirondacks, Finger Lakes with campground facilities' }
    ],
    pricingContext: {
      budget: `NYC rec centers $150/year for residents, Blink Fitness $15 day pass`,
      midRange: `YMCA $20-25, standard gym day passes $15-25`,
      premium: `Manhattan Equinox $40+ day pass, Hamptons summer access $50+`
    },
    beforeYouGo: `NYC and upstate are different worlds. Beach season June-Aug. Long Island parking expensive. Hamptons exclusive in summer. Adirondacks have scattered facilities. Cold upstate winters affect operations.`,
    priceRange: { low: 0, high: 40 }
  },
  
  'north-carolina': {
    name: 'North Carolina',
    code: 'NC',
    narrative: {
      intro: `North Carolina stretches from 300 miles of coastline to the Great Smoky Mountains, with facilities to match. The Outer Banks and coastal towns have extensive beach shower facilities. The Research Triangle (Raleigh-Durham-Chapel Hill) has premium options serving tech and pharma workers. Charlotte's banking center has corporate gyms in most towers. Asheville's wellness culture supports alternative facilities including communal bathhouses.`,
      travelersNote: `Military bases (Fort Bragg, Camp Lejeune) restrict access but influence surrounding civilian facilities. NASCAR race weekends completely overwhelm facilities near tracks in Charlotte and beyond. Great Smoky Mountains visitors strain Cherokee and Gatlinburg-area facilities. Hurricane evacuations from coast stress inland facilities seasonally.`,
      localTip: `YMCAs are strong throughout the state. O2 Fitness is a good regional chain. Cape Hatteras National Seashore has beach facilities. Asheville is worth seeking out for unique wellness options. Mountain communities may close tourist facilities in winter.`
    },
    cities: [
      { name: 'Charlotte', description: 'Banking center with corporate gyms and premium options' },
      { name: 'Raleigh-Durham', description: 'Research Triangle with tech/pharma premium facilities' },
      { name: 'Asheville', description: 'Wellness culture supports alternative facilities and bathhouses' },
      { name: 'Outer Banks', description: 'Extensive beach shower facilities along coast' },
      { name: 'Chapel Hill', description: 'UNC town with university and community options' }
    ],
    facilityTypes: [
      { name: 'Beach facilities', description: '300 miles of coast from Outer Banks to Calabash' },
      { name: 'YMCAs', description: 'Strong network throughout the state' },
      { name: 'Fitness centers', description: 'O2 Fitness (regional), Planet Fitness, Gold\'s Gym' },
      { name: 'Mountain facilities', description: 'Ski resorts and wellness centers in Blue Ridge' },
      { name: 'University facilities', description: 'UNC, Duke, NC State with varying access' }
    ],
    pricingContext: {
      budget: `Beach showers free, state park day-use $5-7`,
      midRange: `YMCA and gym day passes $10-20`,
      premium: `Charlotte/Triangle premium gyms $25+, Asheville spa facilities $30+`
    },
    beforeYouGo: `Varied climate - humid coast, cooler mountains. Beach season May-Sept. Hurricane risk on coast. NASCAR weekends overwhelm local facilities. College basketball season affects Triangle towns.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'north-dakota': {
    name: 'North Dakota',
    code: 'ND',
    narrative: {
      intro: `Finding a shower in North Dakota takes some planning - this is one of the least densely populated states in the country, and facilities can be 100+ miles apart in some areas. The good news is that Fargo-Moorhead (which shares facilities with Minnesota across the Red River) has excellent coverage, and even small towns along I-94 have truck stops with clean shower facilities.`,
      travelersNote: `The Bakken oil boom transformed western North Dakota, and towns like Williston now have facilities that didn't exist a decade ago. That said, if you're heading through the rural areas between cities, the truck stops along I-94 and I-29 are often your only option - and they're reliable. Winter is brutal here (-40F is not unusual) so indoor facilities are essential October through April.`,
      localTip: `Norwegian heritage runs deep here, and some communities have saunas at their rec centers - a nice bonus if you're looking for more than just a quick shower. The university towns (Fargo, Grand Forks) are your best bet for variety and affordability.`
    },
    cities: [
      { name: 'Fargo', description: 'Best coverage in the state, shares metro area with Moorhead MN' },
      { name: 'Bismarck', description: 'State capital with rec centers and standard gym options' },
      { name: 'Grand Forks', description: 'UND college town with university facilities' },
      { name: 'Minot', description: 'Air Force base town with military influence on facilities' },
      { name: 'Williston', description: 'Oil boom town with newer facilities serving workers' }
    ],
    facilityTypes: [
      { name: 'Truck stops', description: 'Love\'s along I-94 and I-29, essential for rural stretches' },
      { name: 'Recreation centers', description: 'Courts Plus and Family Wellness in major cities' },
      { name: 'YMCAs', description: 'Locations in Fargo and Bismarck with day passes' },
      { name: 'University facilities', description: 'UND and NDSU with community access options' },
      { name: 'Community pools', description: 'Small town pools often the only local option' }
    ],
    pricingContext: {
      budget: `Community pools $3-5, some rec centers under $10`,
      midRange: `Gym day passes $10-15, truck stops $12-15`,
      premium: `Premium fitness centers $15-20`
    },
    beforeYouGo: `Brutal winters close outdoor facilities October-April. Summer lake season (June-August) opens more options. Oil field areas can have strained facilities. Some rural areas have no facilities for 100+ miles.`,
    priceRange: { low: 0, high: 20 }
  },
  
  'ohio': {
    name: 'Ohio',
    code: 'OH',
    narrative: {
      intro: `Ohio's three major cities - Columbus, Cleveland, and Cincinnati - each have solid shower coverage, though the character varies. Columbus has grown rapidly with modern fitness chains everywhere, while Cleveland and Cincinnati show their rust belt heritage with aging but functional municipal facilities. Lake Erie's 312-mile shoreline provides beach showers at state parks, and the interstate highway network means truck stops are never far.`,
      travelersNote: `The interstate system through Ohio is excellent for facilities. I-70, I-71, I-75, and I-80/90 all have truck stops every 30-50 miles with reliable showers. College towns like Athens (Ohio U) and Oxford (Miami) have good options but watch for football weekends - Ohio State Saturdays turn Columbus into the third-largest city in the state.`,
      localTip: `Amish country in Holmes County has virtually no public shower facilities - plan accordingly if you're visiting. The Hocking Hills region near Athens has campground showers but limited other options. Lake Erie beaches north of Cleveland are your best bet for free seasonal rinse stations.`
    },
    cities: [
      { name: 'Columbus', description: 'Fastest-growing city with modern gym chains everywhere' },
      { name: 'Cleveland', description: 'Lake Erie access plus municipal rec centers, some aging' },
      { name: 'Cincinnati', description: 'River city with YMCAs and standard gym coverage' },
      { name: 'Toledo', description: 'Northern Ohio hub near Lake Erie beaches' },
      { name: 'Akron', description: 'Near Cuyahoga Valley National Park with basic options' }
    ],
    facilityTypes: [
      { name: 'Fitness centers', description: 'Planet Fitness, LA Fitness, Anytime Fitness statewide' },
      { name: 'YMCAs', description: 'Strong network throughout the state' },
      { name: 'Recreation centers', description: 'Municipal facilities in major cities, some aging but functional' },
      { name: 'Lake facilities', description: 'Lake Erie state parks with seasonal beach showers' },
      { name: 'University gyms', description: 'OSU, Ohio U, Miami with varying public access' }
    ],
    pricingContext: {
      budget: `State park beach showers free, some municipal pools $3-5`,
      midRange: `Gym day passes $10-15, truck stops $12-15`,
      premium: `Lifetime Fitness and premium Columbus gyms $20-25`
    },
    beforeYouGo: `Cold winters and humid summers. Beach facilities seasonal (May-October). Ohio State football weekends strain Columbus facilities. Amish country has no public facilities. Cedar Point area gets crowded in summer.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'oklahoma': {
    name: 'Oklahoma',
    code: 'OK',
    narrative: {
      intro: `Oklahoma's 400+ miles of historic Route 66 established a truck stop culture that serves travelers well to this day. Love's Travel Stops is headquartered here, and you'll find their facilities (and competitors') at every major interstate junction. Oklahoma City and Tulsa have standard gym coverage, while the state's 200+ lakes create a summer recreation culture with seasonal facilities.`,
      travelersNote: `The I-35, I-40, and I-44 corridors are well-served with truck stops every 30-40 miles. Lake facilities are seasonal (May-September) so don't count on them off-season. University towns like Norman (OU) and Stillwater (OSU) have good options but get overwhelmed on football weekends - these are serious football schools.`,
      localTip: `Tribal casinos often have pool facilities open to the public, worth asking if you're near one. After a tornado (they're common April-June), churches frequently set up shower stations for relief workers. The oil field areas in western Oklahoma have truck stops catering to workers.`
    },
    cities: [
      { name: 'Oklahoma City', description: 'State capital with Lifetime Fitness and standard gym chains' },
      { name: 'Tulsa', description: 'Second city with similar coverage, YMCAs and fitness centers' },
      { name: 'Norman', description: 'OU college town, crowded on football Saturdays' },
      { name: 'Stillwater', description: 'OSU college town, same football weekend warning' },
      { name: 'Edmond', description: 'OKC suburb with good gym options' }
    ],
    facilityTypes: [
      { name: 'Truck stops', description: 'Love\'s everywhere plus Pilot along major interstates' },
      { name: 'Lake facilities', description: '200+ lakes with seasonal shower access (May-Sept)' },
      { name: 'Fitness centers', description: 'Lifetime, Planet Fitness, Gold\'s in metro areas' },
      { name: 'YMCAs', description: 'Locations in OKC and Tulsa with day passes' },
      { name: 'State parks', description: 'Lake Murray, Robbers Cave with campground showers' }
    ],
    pricingContext: {
      budget: `State park day-use $5-10, some community pools $3-5`,
      midRange: `Truck stops $12-15, gym day passes $10-15`,
      premium: `Lifetime Fitness $20+, casino spa day passes $20-30`
    },
    beforeYouGo: `Hot summers and tornado season (April-June). Lake facilities are seasonal. Football weekends in Norman and Stillwater get extremely crowded. Oil field areas have good truck stop coverage but few other options.`,
    priceRange: { low: 0, high: 20 }
  },
  
  'oregon': {
    name: 'Oregon',
    code: 'OR',
    narrative: {
      intro: `Oregon's outdoors-obsessed culture means you'll find shower facilities even in surprisingly small towns. Portland alone has 50+ community centers with shower access, and many offer "shower only" rates if you just need a quick rinse. The coast has rinse stations at most beaches, though the Pacific stays cold year-round (50-60F). Bend has become a hub for van-lifers with facilities catering to that crowd.`,
      travelersNote: `Portland's homeless crisis led to innovative mobile shower programs that serve anyone in need. The I-5 corridor from California to Washington has good truck stop coverage. Eastern Oregon is a different story - once you cross the Cascades, facilities can be 100+ miles apart. Hot springs scattered throughout the state offer a more interesting bathing option.`,
      localTip: `Ask Portland community centers about "shower only" rates - they're often just a few dollars. The Bend area has facilities that explicitly welcome van-lifers, including some hostels with shower-only options. Oregon's environmental consciousness means you'll see low-flow fixtures and gray water systems.`
    },
    cities: [
      { name: 'Portland', description: '50+ community centers, strong infrastructure for all income levels' },
      { name: 'Eugene', description: 'U of O college town with university and community options' },
      { name: 'Bend', description: 'Van-lifer friendly town with outdoor recreation focus' },
      { name: 'Salem', description: 'State capital with standard municipal facilities' },
      { name: 'Ashland', description: 'Theater town near California border with basic options' }
    ],
    facilityTypes: [
      { name: 'Recreation centers', description: 'Portland Parks & Rec runs 50+ facilities with day passes' },
      { name: 'Hot springs', description: 'Natural springs throughout the Cascades and eastern Oregon' },
      { name: 'Beach facilities', description: 'Rinse stations at coast beaches along US-101' },
      { name: 'Fitness centers', description: '24 Hour Fitness, Planet Fitness, LA Fitness in metro areas' },
      { name: 'Van-life facilities', description: 'Bend area hostels and campgrounds cater to travelers' }
    ],
    pricingContext: {
      budget: `Beach rinse stations free, Portland "shower only" rates $3-7`,
      midRange: `Gym day passes $10-20, developed hot springs $10-20`,
      premium: `Premium Portland gyms $20-28`
    },
    beforeYouGo: `Wet winters west of Cascades, dry east. Beach water is cold year-round. Eastern Oregon has vast distances between facilities. Summer festival season increases demand in Portland and Bend.`,
    priceRange: { low: 0, high: 28 }
  },
  
  'pennsylvania': {
    name: 'Pennsylvania',
    code: 'PA',
    narrative: {
      intro: `Pennsylvania's two major cities couldn't be more different in character, but both have good shower coverage. Philadelphia has 150+ public pools and rec centers - many dating to the city's industrial heyday and showing their age, but functional. Pittsburgh's hilly terrain isolates neighborhoods, so you'll want to plan which area you're targeting. The state's extensive interstate network means truck stops are plentiful.`,
      travelersNote: `I-80 and I-76 (Pennsylvania Turnpike) have truck stops with showers every 30-40 miles. Penn State football weekends turn State College into the third-largest city in Pennsylvania - plan accordingly. The Poconos resort area offers day passes primarily aimed at waterpark and ski visitors. If you're hiking the Appalachian Trail, towns like Duncannon and Delaware Water Gap cater to thru-hikers.`,
      localTip: `Lancaster County's Amish communities don't use public facilities, so options are limited there. Presque Isle State Park in Erie has Great Lakes beach facilities. Many of Philly's neighborhood rec centers are underutilized and happy to have visitors.`
    },
    cities: [
      { name: 'Philadelphia', description: '150+ pools and rec centers, some aging but functional' },
      { name: 'Pittsburgh', description: 'Hilly terrain isolates neighborhoods, plan your target area' },
      { name: 'State College', description: 'Penn State town, extremely crowded on football weekends' },
      { name: 'Erie', description: 'Lake Erie access with Presque Isle beach facilities' },
      { name: 'Harrisburg', description: 'State capital with standard gym and YMCA options' }
    ],
    facilityTypes: [
      { name: 'Recreation centers', description: 'Philadelphia has 150+, Pittsburgh has neighborhood-based options' },
      { name: 'YMCAs', description: 'Strong network throughout the state' },
      { name: 'Truck stops', description: 'Along I-80, I-76 Turnpike, I-95, and I-81' },
      { name: 'State parks', description: 'Presque Isle, Ohiopyle, Ricketts Glen with campground showers' },
      { name: 'University facilities', description: 'Penn State, Pitt, Temple with varying public access' }
    ],
    pricingContext: {
      budget: `Some Philly rec centers under $5, state park day-use $5-10`,
      midRange: `Gym day passes $10-20, truck stops $12-15`,
      premium: `Premium Philly gyms $20-28`
    },
    beforeYouGo: `Cold winters, humid summers. Penn State football weekends overwhelm State College. Amish country has limited facilities. Poconos facilities often tied to resort packages. Appalachian Trail towns cater to hikers.`,
    priceRange: { low: 0, high: 28 }
  },
  
  'rhode-island': {
    name: 'Rhode Island',
    code: 'RI',
    narrative: {
      intro: `Rhode Island's small size (you can drive across it in an hour) means you're never far from a facility. Narragansett Bay beaches have extensive shower stations, and Providence has solid YMCA and gym coverage. The catch is that beach facilities are very seasonal - many close or reduce hours from October through April, and the summer population nearly doubles.`,
      travelersNote: `Newport's Gilded Age mansions attract tourists, but the actual shower facilities are modest - most visitors head to the public beaches at Easton or Second Beach. Providence's universities (Brown, RISD) create a September demand surge. Block Island is accessible by ferry and has limited but available facilities on the island.`,
      localTip: `The state beaches at Misquamicut and Scarborough have the best beach shower facilities, but expect crowds and parking fees in summer. If you're in Providence, the East Side near Brown has good gym options. The JCC of Rhode Island welcomes visitors with day passes.`
    },
    cities: [
      { name: 'Providence', description: 'Capital city with YMCAs, gyms, and university-area options' },
      { name: 'Newport', description: 'Tourist town with beach access, facilities modest for visitor volume' },
      { name: 'Warwick', description: 'Central location with mall-area gyms' },
      { name: 'Cranston', description: 'Providence suburb with standard options' },
      { name: 'Narragansett', description: 'Beach town with good seasonal facilities' }
    ],
    facilityTypes: [
      { name: 'Beach facilities', description: 'State beaches along Narragansett Bay with seasonal showers' },
      { name: 'YMCAs', description: 'Providence area locations with day passes' },
      { name: 'Fitness centers', description: 'Planet Fitness, Edge Fitness throughout metro area' },
      { name: 'JCC', description: 'JCC of Rhode Island welcomes visitors' },
      { name: 'State parks', description: 'Misquamicut, Scarborough with summer beach facilities' }
    ],
    pricingContext: {
      budget: `State beach showers free (parking $10-15), some YMCAs under $15`,
      midRange: `Gym day passes $10-20`,
      premium: `Newport area premium options $20-25`
    },
    beforeYouGo: `Beach facilities are seasonal (May-Sept). Summer population nearly doubles, straining facilities. Newport gets very crowded during yacht season. Block Island requires ferry access. Many facilities reduce hours Oct-April.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'south-carolina': {
    name: 'South Carolina',
    code: 'SC',
    narrative: {
      intro: `South Carolina's Grand Strand - the 60-mile beach stretch from Myrtle Beach to Georgetown - has shower facilities every few blocks, making it one of the easiest coastal regions for travelers. Charleston's historic district is charming but has limited facilities, so you'll likely head to the suburbs. Greenville in the upstate has become a destination with good gym coverage.`,
      travelersNote: `Myrtle Beach is shower central for the coast, with public beach facilities everywhere. Spring break (March) and summer tourism can make these crowded, but they're rarely unavailable. Charleston visitors should note that the downtown historic district pushes you to Mount Pleasant or West Ashley for gyms. Clemson football brings 80,000+ to a town of 17,000 - avoid game weekends unless you plan way ahead.`,
      localTip: `Columbia's summer heat regularly exceeds 100F - you'll want that shower, but stick to air-conditioned facilities. Hilton Head and Kiawah Island cater to wealthy retirees with premium pricing. Many beach facilities are still recovering from recent hurricane damage.`
    },
    cities: [
      { name: 'Myrtle Beach', description: 'Beach shower facilities every few blocks along the Grand Strand' },
      { name: 'Charleston', description: 'Historic downtown limited, better options in surrounding suburbs' },
      { name: 'Columbia', description: 'State capital, brutal summer heat makes indoor facilities essential' },
      { name: 'Greenville', description: 'Upstate city with good modern gym coverage' },
      { name: 'Clemson', description: 'Small college town, completely overwhelmed on football weekends' }
    ],
    facilityTypes: [
      { name: 'Beach facilities', description: 'Grand Strand has extensive public shower stations' },
      { name: 'Fitness centers', description: 'Planet Fitness, Gold\'s, O2 Fitness in metro areas' },
      { name: 'YMCAs', description: 'Strong network including well-known Caine Halter YMCA' },
      { name: 'State parks', description: 'Myrtle Beach State Park, Hunting Island with campground showers' },
      { name: 'Golf resorts', description: 'Hilton Head, Kiawah Island with premium day access' }
    ],
    pricingContext: {
      budget: `Beach showers free, state park day-use $5-8`,
      midRange: `Gym day passes $10-15, truck stops along I-95 $12-15`,
      premium: `Hilton Head resort facilities $20-40+`
    },
    beforeYouGo: `Hot, humid summers. Hurricane risk on coast can close facilities. Spring break crowds Myrtle Beach. Clemson football weekends impossible. Some coastal facilities still recovering from storm damage.`,
    priceRange: { low: 0, high: 22 }
  },
  
  'south-dakota': {
    name: 'South Dakota',
    code: 'SD',
    narrative: {
      intro: `South Dakota is really two states for shower purposes. East of the Missouri River, Sioux Falls has good coverage with gyms and rec centers. West of the river, you're in tourist country - the Black Hills around Mount Rushmore and the Badlands have facilities catering to visitors, but it's sparse between attractions. The Sturgis Motorcycle Rally each August brings 500,000+ visitors to a state of 900,000, so avoid that week unless you're attending.`,
      travelersNote: `I-90 runs the width of the state with truck stops at major exits, but stretches can be 50+ miles without services. Wall Drug has become a landmark for travelers (the signs start 300 miles away) and there are facilities nearby. The Black Hills towns - Rapid City, Spearfish, Deadwood - have tourist-oriented options. Native American reservations like Pine Ridge and Rosebud have severe facility shortages.`,
      localTip: `Winter is brutal here (-30F is possible) and many facilities close November-March. Pheasant hunting season (October-January) brings temporary demand to rural areas. In small towns, the church may be your only option - don't be shy about asking.`
    },
    cities: [
      { name: 'Sioux Falls', description: 'Largest city with best facility coverage in the state' },
      { name: 'Rapid City', description: 'Black Hills gateway with tourist-oriented options' },
      { name: 'Brookings', description: 'SDSU college town with university facilities' },
      { name: 'Aberdeen', description: 'Northeastern hub with basic options' },
      { name: 'Spearfish', description: 'Northern Black Hills with BHSU campus' }
    ],
    facilityTypes: [
      { name: 'Recreation centers', description: 'Avera McKennan Fitness in Sioux Falls, municipal facilities elsewhere' },
      { name: 'Truck stops', description: 'Along I-90 and I-29, essential for cross-state travel' },
      { name: 'State parks', description: 'Custer State Park, campground showers in Black Hills' },
      { name: 'Fitness centers', description: 'Anytime Fitness, Planet Fitness in larger towns' },
      { name: 'Hotels/motels', description: 'Many offer shower access to non-guests for a fee' }
    ],
    pricingContext: {
      budget: `State park campground showers $5, some community centers under $5`,
      midRange: `Gym day passes $10-15, truck stops $12-15`,
      premium: `Premium Sioux Falls facilities $15-18`
    },
    beforeYouGo: `Brutal winters close facilities Nov-March. Sturgis Rally (August) overwhelms the entire Black Hills region. Some counties have no facilities for 50+ miles. Reservations have severe facility shortages. Pheasant season brings temporary demand.`,
    priceRange: { low: 0, high: 18 }
  },
  
  'tennessee': {
    name: 'Tennessee',
    code: 'TN',
    narrative: {
      intro: `Tennessee stretches from the Appalachian Mountains to the Mississippi River, with three distinct regions and different facility landscapes. Nashville's music tourism has created gyms catering to musicians and tourists along Broadway. Memphis's Beale Street area has limited options - you'll head to the suburbs. The Great Smoky Mountains (most visited national park) strain Gatlinburg and Pigeon Forge facilities.`,
      travelersNote: `I-40 runs the width of the state with truck stops every 30-40 miles - these are vital facilities in rural areas. The TVA created 50+ recreation areas along its lakes with seasonal shower access. Bonnaroo festival brings 80,000+ to tiny Manchester each June - if you're not attending, avoid the area. Knoxville gets overwhelmed during UT football weekends.`,
      localTip: `Nashville's downtown gyms are used to visitors and often have reasonable day passes. The Dollywood area in Pigeon Forge has more facilities than you'd expect given the town size. Memphis's better gym options are in the Midtown or East Memphis areas, not near Beale Street.`
    },
    cities: [
      { name: 'Nashville', description: 'Music city with tourist-friendly gyms, Broadway area well-served' },
      { name: 'Memphis', description: 'Beale Street area limited, better options in Midtown and East Memphis' },
      { name: 'Knoxville', description: 'UT college town, busy on football weekends' },
      { name: 'Chattanooga', description: 'Outdoor recreation hub with good facilities' },
      { name: 'Gatlinburg', description: 'Smokies gateway, tourist facilities strain during peak season' }
    ],
    facilityTypes: [
      { name: 'Truck stops', description: 'Love\'s, Pilot along I-40, I-65, I-75 - vital in rural areas' },
      { name: 'YMCAs', description: 'Strong network in Nashville and Memphis metro areas' },
      { name: 'Fitness centers', description: 'Planet Fitness, Anytime Fitness, Gold\'s in metro areas' },
      { name: 'State parks', description: 'Fall Creek Falls, TVA lake recreation areas with campground showers' },
      { name: 'University facilities', description: 'UT Knoxville, Vanderbilt with varying public access' }
    ],
    pricingContext: {
      budget: `State park day-use $5, some community centers under $10`,
      midRange: `Gym day passes $10-15, truck stops $12-15`,
      premium: `Premium Nashville gyms $18-22`
    },
    beforeYouGo: `Hot, humid summers. Bonnaroo (June) overwhelms Manchester area. UT football weekends strain Knoxville. Smokies tourist season (summer, fall foliage) crowds Gatlinburg facilities. CMA Fest (June) brings 80,000+ to Nashville.`,
    priceRange: { low: 0, high: 22 }
  },
  
  'texas': {
    name: 'Texas',
    code: 'TX',
    narrative: {
      intro: `Texas leads the nation in truck stop facilities, and it's not close. Buc-ee's has set a new standard with 60+ pump stations, dozens of immaculate shower stalls, and facilities that rival many gyms. You'll find them along every major highway. Beyond truck stops, the major metros have excellent gym coverage - Houston, Dallas-Fort Worth, San Antonio, and Austin all have every national chain plus local options.`,
      travelersNote: `The distances here are real - El Paso is closer to San Diego than to Houston. Plan your stops. Austin's tech boom created a premium fitness culture with boutique studios, while Houston's sprawl means facilities cluster in suburbs rather than downtown. The Gulf Coast beaches from Galveston to South Padre have rinse stations. Oil field workers in the Permian Basin rely heavily on truck stops and man camps.`,
      localTip: `Buc-ee's is genuinely worth seeking out - the facilities are spotless and they're scattered along I-10, I-35, and I-45. College football weekends can overwhelm Austin (UT) and College Station (A&M). South Padre Island becomes a shower challenge during spring break with 100,000+ students.`
    },
    cities: [
      { name: 'Houston', description: 'Sprawling metro, facilities cluster in suburbs not downtown' },
      { name: 'Dallas-Fort Worth', description: 'Good coverage across the metroplex' },
      { name: 'Austin', description: 'Tech boom brought premium fitness culture, crowded UT football weekends' },
      { name: 'San Antonio', description: 'Military presence influences gym culture, good coverage' },
      { name: 'El Paso', description: 'Border city with bilingual facilities, far from everything else' }
    ],
    facilityTypes: [
      { name: 'Truck stops', description: 'Buc-ee\'s sets the gold standard, plus Love\'s and Pilot everywhere' },
      { name: 'Fitness centers', description: 'LA Fitness, Planet Fitness, Gold\'s, Life Time across metros' },
      { name: 'Beach facilities', description: 'Galveston to South Padre with rinse stations' },
      { name: 'Recreation centers', description: 'Municipal facilities in most cities' },
      { name: 'University facilities', description: 'UT Austin, Texas A&M with varying public access' }
    ],
    pricingContext: {
      budget: `Beach showers free, some municipal pools $3-5`,
      midRange: `Gym day passes $10-15, truck stops $12-15 (Buc-ee's is free with purchase)`,
      premium: `Life Time and Austin boutique studios $20-25`
    },
    beforeYouGo: `Hot summers - 100F+ is common statewide. Hurricane risk on Gulf Coast. Spring break overwhelms South Padre. SXSW and ACL Fest strain Austin facilities. Distances are vast - plan stops carefully.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'utah': {
    name: 'Utah',
    code: 'UT',
    narrative: {
      intro: `Utah's Wasatch Front (Salt Lake City to Provo) has excellent gym coverage - VASA Fitness originated here and the competition keeps prices reasonable. Outside the cities, you're in national park country. The "Mighty Five" parks (Zion, Arches, Bryce Canyon, Canyonlands, Capitol Reef) draw millions of visitors but have limited facilities in surrounding towns. Plan ahead in the desert - facilities can be 100+ miles apart.`,
      travelersNote: `Salt Lake City's LDS influence means many facilities close Sundays - check before planning. Park City and the ski resorts cater to wealthy tourists with premium pricing ($30+ day passes). The Silicon Slopes tech boom in Lehi and Draper has brought premium fitness options. Lake Powell houseboating culture means marinas have shower facilities. BYU's Honor Code influences Provo-area facility policies.`,
      localTip: `VASA Fitness is the local favorite with competitive day pass pricing. Hot springs scattered throughout the state offer a unique alternative - some are developed resorts (Crystal Hot Springs), others are free backcountry soaks. High altitude affects visitors - take it easy on your first day.`
    },
    cities: [
      { name: 'Salt Lake City', description: 'Best coverage in state, note Sunday closures' },
      { name: 'Provo', description: 'BYU town with family-focused facilities' },
      { name: 'Park City', description: 'Ski resort town with premium pricing' },
      { name: 'St. George', description: 'Southern Utah gateway to Zion, growing rapidly' },
      { name: 'Moab', description: 'Arches/Canyonlands gateway, limited options for visitor volume' }
    ],
    facilityTypes: [
      { name: 'Fitness centers', description: 'VASA Fitness, Planet Fitness, EoS across the Wasatch Front' },
      { name: 'Ski resorts', description: 'Park City, Alta, Snowbird with day passes $30+' },
      { name: 'Hot springs', description: 'Crystal Hot Springs, backcountry soaks throughout the state' },
      { name: 'Recreation centers', description: 'Municipal facilities in most cities' },
      { name: 'Marina facilities', description: 'Lake Powell marinas with shower access' }
    ],
    pricingContext: {
      budget: `Backcountry hot springs free-$10, some rec centers under $10`,
      midRange: `Gym day passes $10-15, developed hot springs $15-25`,
      premium: `Park City ski resort facilities $28-40+`
    },
    beforeYouGo: `Sunday closures common due to LDS influence. High altitude affects visitors. National park gateway towns have limited facilities. Desert areas require careful planning - facilities 100+ miles apart. Ski season Nov-April brings premium pricing.`,
    priceRange: { low: 0, high: 28 }
  },
  
  'vermont': {
    name: 'Vermont',
    code: 'VT',
    narrative: {
      intro: `Vermont's 251 towns include many with fewer than 1,000 residents and no public shower facilities at all. Burlington is your best bet with good gym and YMCA coverage. Ski resorts like Stowe and Killington have year-round facilities but at premium prices. The rest of the state requires planning - community centers and YMCAs are scattered, and distances add up on winding mountain roads.`,
      travelersNote: `Long Trail and Appalachian Trail hikers create seasonal demand - towns like Killington and Manchester are used to hikers needing showers after multi-day treks and have options. Mud season (March-April) makes some facilities inaccessible. Harsh winters mean indoor facilities are essential November through April. Fall foliage season (late September-October) brings tourists who fill everything.`,
      localTip: `Burlington's progressive culture supports community-run facilities with sliding-scale pricing. Natural quarry swimming holes throughout the state offer a Vermont-style alternative in summer. New England frugality means facilities are basic but well-maintained.`
    },
    cities: [
      { name: 'Burlington', description: 'Best coverage in the state, UVM campus area has good options' },
      { name: 'Stowe', description: 'Ski resort town with premium year-round facilities' },
      { name: 'Killington', description: 'Another ski resort hub, hiker-friendly in summer' },
      { name: 'Montpelier', description: 'Smallest state capital, limited but available options' },
      { name: 'Rutland', description: 'Central Vermont hub with basic coverage' }
    ],
    facilityTypes: [
      { name: 'Ski resorts', description: 'Stowe, Killington with year-round facilities at premium prices' },
      { name: 'YMCAs', description: 'Burlington and scattered locations throughout' },
      { name: 'Recreation centers', description: 'Community-run facilities in larger towns' },
      { name: 'Lake facilities', description: 'Lake Champlain beaches with summer showers' },
      { name: 'Community pools', description: 'Small town pools, often the only local option' }
    ],
    pricingContext: {
      budget: `Community pools $3-5, some rec centers under $10`,
      midRange: `YMCA day passes $10-20, gym day passes $10-15`,
      premium: `Ski resort facilities $20-25`
    },
    beforeYouGo: `Cold winters (Nov-April) make indoor facilities essential. Mud season (March-April) can make facilities inaccessible. Fall foliage (Sept-Oct) brings crowds. Many small towns have no facilities. Winding mountain roads mean distances take longer than expected.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'virginia': {
    name: 'Virginia',
    code: 'VA',
    narrative: {
      intro: `Virginia stretches from the Atlantic beaches to the Appalachian Mountains, with facility options varying dramatically by region. Virginia Beach's 38 miles of oceanfront have extensive free shower stations. Northern Virginia's federal workforce supports premium gym chains (though some require security clearances). Richmond has solid coverage with boutique options in the Fan district and Carytown.`,
      travelersNote: `The Norfolk/Hampton Roads area hosts the world's largest naval base, which creates unique demand patterns and military-influenced gym culture. Shenandoah National Park and the Blue Ridge Parkway provide seasonal facilities but they're spread out. The Appalachian Trail runs 544 miles through the state - trail towns like Damascus are used to hikers needing showers. Virginia Tech football weekends turn Blacksburg from 45,000 to 110,000 people.`,
      localTip: `Virginia Beach's boardwalk has free showers every few blocks. If you're in Northern Virginia, many gyms cater to federal workers with flexible hours. Colonial Williamsburg has limited public facilities - the historic area prioritizes preservation over modern amenities.`
    },
    cities: [
      { name: 'Virginia Beach', description: '38 miles of beaches with extensive free shower stations' },
      { name: 'Richmond', description: 'State capital with good coverage, boutique options in Fan/Carytown' },
      { name: 'Norfolk', description: 'Military town with unique gym culture and demand patterns' },
      { name: 'Arlington', description: 'DC suburb with federal worker-oriented premium gyms' },
      { name: 'Blacksburg', description: 'Virginia Tech town, completely overwhelmed on football weekends' }
    ],
    facilityTypes: [
      { name: 'Beach facilities', description: 'Virginia Beach oceanfront with free showers every few blocks' },
      { name: 'Fitness centers', description: 'Gold\'s Gym (founded in VA), Planet Fitness, ACAC across the state' },
      { name: 'YMCAs', description: 'Strong network throughout Virginia' },
      { name: 'Recreation centers', description: 'Municipal facilities in most cities' },
      { name: 'State parks', description: 'Shenandoah, First Landing with campground showers' }
    ],
    pricingContext: {
      budget: `Beach showers free, state park day-use $5-10`,
      midRange: `Gym day passes $10-20, truck stops along I-81 and I-95 $12-15`,
      premium: `Northern Virginia premium gyms $25-30`
    },
    beforeYouGo: `Hot, humid summers on coast. Beach season May-September. Virginia Tech football weekends overwhelm Blacksburg. Colonial Williamsburg has limited modern facilities. Appalachian Trail towns cater to hikers. Blue Ridge Parkway facilities are seasonal.`,
    priceRange: { low: 0, high: 30 }
  },
  
  'washington': {
    name: 'Washington',
    code: 'WA',
    narrative: {
      intro: `Washington is really two states divided by the Cascades. West of the mountains, Seattle has excellent coverage - the Parks & Recreation department runs numerous facilities, and every gym chain is represented. Rain falls 150+ days a year, so indoor facilities are essential. East of the Cascades, Spokane has good options but agricultural areas rely on seasonal facilities and school gyms.`,
      travelersNote: `Tech workers at Microsoft, Amazon, and Boeing campuses have extensive on-site facilities that aren't public, so don't count on corporate campus access. The San Juan Islands require ferry access and have limited options. Mount Rainier and Olympic National Parks create hiker demand for facilities in gateway towns. Seattle's homeless crisis led to innovative hygiene center programs that serve anyone in need.`,
      localTip: `Seattle Parks & Recreation has surprisingly affordable day passes - many community centers offer shower access. The "Seattle freeze" social phenomenon means gym culture is less chatty than other regions. Hot springs in the Cascades offer unique bathing options if you're willing to hike.`
    },
    cities: [
      { name: 'Seattle', description: 'Excellent coverage with Parks & Rec facilities and every gym chain' },
      { name: 'Spokane', description: 'Eastern Washington hub with good standard options' },
      { name: 'Tacoma', description: 'South Sound city with solid coverage' },
      { name: 'Bellevue', description: 'Tech suburb with premium fitness options' },
      { name: 'Bellingham', description: 'WWU college town near Canadian border' }
    ],
    facilityTypes: [
      { name: 'Recreation centers', description: 'Seattle Parks & Rec runs affordable community facilities' },
      { name: 'Fitness centers', description: '24 Hour Fitness, LA Fitness, Planet Fitness across metro areas' },
      { name: 'Hot springs', description: 'Cascade mountain springs, some require hiking' },
      { name: 'State parks', description: 'Deception Pass, Cape Disappointment with campground showers' },
      { name: 'Hygiene centers', description: 'Seattle programs serving anyone in need' }
    ],
    pricingContext: {
      budget: `Seattle Parks & Rec centers under $10, some hygiene centers free`,
      midRange: `Gym day passes $15-25`,
      premium: `Bellevue premium gyms $30-35`
    },
    beforeYouGo: `Rain 150+ days/year west of Cascades - indoor facilities essential. San Juan Islands require ferry. Eastern Washington has continental climate with hot summers and cold winters. National park gateway towns have limited facilities for visitor volume.`,
    priceRange: { low: 0, high: 35 }
  },
  
  'west-virginia': {
    name: 'West Virginia',
    code: 'WV',
    narrative: {
      intro: `West Virginia's mountainous terrain isolates communities, and facilities can be 50+ miles apart on winding roads that take twice as long as you'd expect. The coal mining heritage left many towns with aging infrastructure and limited funds. Charleston and Huntington have the best coverage with YMCAs and basic gym chains. The New River Gorge area (now a national park as of 2020) is seeing increased facility development.`,
      travelersNote: `Whitewater rafting companies in the New River and Gauley areas provide seasonal shower facilities April-October - worth asking even if you're not rafting. Morgantown has good options thanks to WVU, but football weekends are intense. The Greenbrier Resort offers day passes but at premium prices ($50+). Many former coal towns have only church-run facilities available.`,
      localTip: `State parks like Blackwater Falls and Stonewall Resort have lodges with day-use shower access. Bridge Day in October brings 80,000+ people to Fayetteville - avoid that weekend unless you're attending. Churches and community organizations often provide the only facilities in rural areas.`
    },
    cities: [
      { name: 'Charleston', description: 'State capital with best coverage, YMCAs and basic gyms' },
      { name: 'Huntington', description: 'Marshall University town with campus and community options' },
      { name: 'Morgantown', description: 'WVU college town, intense on football weekends' },
      { name: 'Fayetteville', description: 'New River Gorge gateway, rafting companies have showers' },
      { name: 'Wheeling', description: 'Northern panhandle city with basic options' }
    ],
    facilityTypes: [
      { name: 'State parks', description: 'Blackwater Falls, Stonewall Resort with lodge day-use access' },
      { name: 'YMCAs', description: 'Locations in Charleston and Huntington' },
      { name: 'Rafting outfitters', description: 'New River and Gauley areas with seasonal facilities' },
      { name: 'University facilities', description: 'WVU and Marshall with varying public access' },
      { name: 'Church facilities', description: 'Often the only option in former coal towns' }
    ],
    pricingContext: {
      budget: `State park day-use $5-10, church facilities often free/donation`,
      midRange: `Gym day passes $10-15, YMCA day passes $10-15`,
      premium: `Greenbrier Resort $50+`
    },
    beforeYouGo: `Mountainous terrain means winding roads take longer than expected. Facilities can be 50+ miles apart. WVU football weekends overwhelm Morgantown. Bridge Day (October) brings 80,000 to Fayetteville. Many communities have only church-run facilities.`,
    priceRange: { low: 0, high: 18 }
  },
  
  'wisconsin': {
    name: 'Wisconsin',
    code: 'WI',
    narrative: {
      intro: `Wisconsin Dells is the "Waterpark Capital of the World" with more concentrated water facilities than anywhere else on earth - dozens of indoor and outdoor waterparks with shower access. Beyond the Dells, Milwaukee and Madison have solid coverage with Germanic heritage influencing facility culture (look for saunas). Cold winters make indoor facilities essential, and many communities have year-round indoor pools.`,
      travelersNote: `Packers game days make Green Bay essentially inaccessible - Lambeau Field area facilities are overwhelmed and the whole city is gridlocked. Door County peninsula has strong tourist season (May-October) with resorts offering day passes. The North Woods lake country has thousands of seasonal facilities at resorts. If you're traveling I-94, truck stops are reliable between Milwaukee and Minneapolis.`,
      localTip: `Wisconsin Dells waterparks often offer day passes with shower access - a fun option if you want more than just a shower. Madison's campus area has good options and the city is very bike-friendly. Milwaukee's brewing district has gyms near historic breweries.`
    },
    cities: [
      { name: 'Milwaukee', description: 'Largest city with Germanic-influenced facilities, good coverage' },
      { name: 'Madison', description: 'State capital and UW town, bike-friendly with campus options' },
      { name: 'Green Bay', description: 'Packers town - avoid game days, completely inaccessible' },
      { name: 'Wisconsin Dells', description: 'Waterpark capital with dozens of facilities offering day access' },
      { name: 'Door County', description: 'Peninsula tourist area with seasonal resort options' }
    ],
    facilityTypes: [
      { name: 'Waterparks', description: 'Wisconsin Dells has 20+ waterparks with day passes and showers' },
      { name: 'YMCAs', description: 'Strong network throughout the state' },
      { name: 'Fitness centers', description: 'Anytime Fitness, Planet Fitness, Wisconsin Athletic Club' },
      { name: 'Lake resorts', description: 'North Woods resorts with seasonal day passes' },
      { name: 'Recreation centers', description: 'Municipal facilities with year-round indoor pools' }
    ],
    pricingContext: {
      budget: `Some community pools $3-5, basic gym day passes $10-15`,
      midRange: `Waterpark day passes $20-40 (includes all amenities)`,
      premium: `Wisconsin Athletic Club $20-25, premium resorts $25+`
    },
    beforeYouGo: `Cold winters make indoor facilities essential. Packers games overwhelm Green Bay. Door County is seasonal (May-Oct). Wisconsin Dells is packed in summer. North Woods lake season runs June-August. Summerfest (June-July) brings 800,000 to Milwaukee.`,
    priceRange: { low: 0, high: 25 }
  },
  
  'wyoming': {
    name: 'Wyoming',
    code: 'WY',
    narrative: {
      intro: `Wyoming has the nation's lowest population (580,000) spread across 98,000 square miles, creating vast facility deserts. But what it lacks in quantity, it makes up for with unique options - natural hot springs range from the developed pools at Thermopolis (world's largest mineral hot spring) to primitive backcountry soaks. Yellowstone and Grand Teton draw 5+ million visitors annually, overwhelming gateway town facilities.`,
      travelersNote: `Jackson Hole shows extreme wealth disparity - $40 gym day passes alongside basic community options. The national park gateway towns (Jackson, Cody, West Yellowstone just over the Montana border) strain during tourist season but have reasonable options off-peak. I-80 across the southern part of the state has truck stops, but I-90 in the north is more sparse. Some counties have no public facilities at all.`,
      localTip: `Hot Springs State Park in Thermopolis has free public pools fed by natural hot springs - a unique Wyoming experience. The high altitude (most of the state is above 6,000 feet) affects visitors. Winter road closures can isolate communities for weeks, so check conditions before relying on remote facilities.`
    },
    cities: [
      { name: 'Jackson', description: 'Wealthy ski resort town with premium pricing, gateway to Tetons' },
      { name: 'Cheyenne', description: 'State capital with basic municipal options' },
      { name: 'Casper', description: 'Central Wyoming hub with standard coverage' },
      { name: 'Cody', description: 'Yellowstone east entrance gateway with tourist facilities' },
      { name: 'Thermopolis', description: 'Hot springs town with free public mineral pools' }
    ],
    facilityTypes: [
      { name: 'Hot springs', description: 'Thermopolis has free public pools, Saratoga has developed resort' },
      { name: 'Recreation centers', description: 'Municipal facilities in larger towns' },
      { name: 'Truck stops', description: 'Along I-80 and I-25, sparse on I-90' },
      { name: 'Resort facilities', description: 'Jackson Hole ski resort with premium day access' },
      { name: 'National park facilities', description: 'Yellowstone and Grand Teton with campground showers' }
    ],
    pricingContext: {
      budget: `Thermopolis Hot Springs State Park free, some community centers under $10`,
      midRange: `Gym day passes $10-15, truck stops $12-15`,
      premium: `Jackson Hole resort facilities $30-40+`
    },
    beforeYouGo: `Lowest population density in lower 48. Some counties have no facilities. High altitude affects visitors. Winter road closures isolate communities. National park season (May-Oct) strains gateway towns. Cheyenne Frontier Days (July) brings 200,000+ visitors.`,
    priceRange: { low: 0, high: 30 }
  }
};

export class StateContentGenerator {

  static generateStateSpecificContent(stateSlug: string, stats: any): string {
    const state = stateData[stateSlug];
    if (!state) {
      return this.generateGenericContent(stateSlug, stats);
    }

    const sections: string[] = [];

    // Opening with state-specific context
    sections.push(this.generateIntroSection(state, stats));

    // For new schema, use streamlined layout
    if (state.narrative) {
      // Pricing advice
      sections.push(this.generatePricingSection(state, stats));

      // Cities with descriptions
      sections.push(this.generateCitiesSection(state, stats));

      // Facility types
      sections.push(this.generateFacilityTypesSection(state));

      // Before You Go (replaces regulations + climate)
      if (state.beforeYouGo) {
        sections.push(`
          <div class="helpful-note bg-accent-50 border-l-4 border-accent-400 p-5 rounded-r-lg mb-8">
            <strong class="text-gray-900">Before you go:</strong>
            <span class="text-gray-700"> ${state.beforeYouGo}</span>
          </div>
        `);
      }
    } else {
      // Legacy schema - keep old layout
      sections.push(this.generateRegionalSection(state, stats));
      sections.push(this.generatePricingSection(state, stats));

      if (state.regulations) {
        sections.push(this.generateRegulationsSection(state));
      }

      if (state.climateNote) {
        sections.push(this.generateClimateSection(state));
      }

      sections.push(this.generateCitiesSection(state, stats));
      sections.push(this.generateFacilityTypesSection(state));
    }

    return sections.join('\n\n');
  }
  
/// lib/stateContent.ts - Updated TypeScript generator with H2 and H3 classes

// lib/stateContent.ts - Updated TypeScript generator with H2 and H3 classes

private static generateIntroSection(state: StateInfo, stats: any): string {
  // Support new schema (narrative object) and legacy (localContext string)
  if (state.narrative) {
    const sections = [];

    sections.push(`
      <div class="region-intro prose prose-lg max-w-none mb-8">
        <p class="intro-lead text-lg text-gray-700 leading-relaxed">${state.narrative.intro}</p>
        ${state.narrative.travelersNote ? `<p class="mt-4 text-gray-600">${state.narrative.travelersNote}</p>` : ''}
        ${state.narrative.localTip ? `
          <div class="helpful-note bg-accent-50 border-l-4 border-accent-400 p-5 rounded-r-lg mt-6">
            <strong>Local tip:</strong> ${state.narrative.localTip}
          </div>
        ` : ''}
      </div>
    `);

    sections.push(`
      <div class="stats-narrative bg-warm-50 p-6 rounded-xl mb-8">
        <p class="text-gray-700">
          We've mapped <strong class="text-gray-900">${stats.totalLocations}+ locations</strong> across ${state.name},
          with <strong class="text-gray-900">${stats.verifiedCount}</strong> verified by recent visitor reviews.
        </p>
      </div>
    `);

    return sections.join('');
  }

  // Legacy schema fallback
  return `
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 relative pb-4">
      Public Shower Facilities in ${state.name}
    </h2>

    <p class="intro-text">
      ${state.localContext || ''}
    </p>

    <p>
      Our directory tracks <span class="font-semibold text-gray-900">${stats.totalLocations}+</span> shower locations
      across ${state.name}, with <span class="font-semibold text-gray-900">${stats.verifiedCount}</span> facilities
      verified by recent visitor reviews.
    </p>
  `;
}

private static generateRegionalSection(state: StateInfo, stats: any): string {
  const freePercentage = stats.totalLocations > 0 
    ? Math.round((stats.freeLocations / stats.totalLocations) * 100) 
    : 0;
  
  return `
    <h3 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 mt-12">
      ${state.name} Facility Statistics
    </h3>
    
    <div class="stats-box">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-icon blue">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-value">${stats.totalLocations}+</p>
            <p class="stat-label">Total Locations</p>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon green">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-value">${stats.verifiedCount}</p>
            <p class="stat-label">Verified Reviews</p>
          </div>
        </div>
        
        
        <div class="stat-item">
          <div class="stat-icon orange">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-value">${stats.cities.length}</p>
            <p class="stat-label">Cities Covered</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

private static generatePricingSection(state: StateInfo, stats: any): string {
  // Support new schema (pricingContext prose) and legacy (generic pricing grid)
  if (state.pricingContext) {
    return `
      <h3 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">
        What You'll Pay
      </h3>

      <div class="pricing-advice bg-white border border-warm-200 rounded-xl p-6 mb-8">
        <p class="text-gray-700"><strong class="text-gray-900">Budget options ($0-10):</strong> ${state.pricingContext.budget}</p>
        <p class="mt-3 text-gray-700"><strong class="text-gray-900">Mid-range ($10-20):</strong> ${state.pricingContext.midRange}</p>
        ${state.pricingContext.premium ? `<p class="mt-3 text-gray-700"><strong class="text-gray-900">Premium ($20+):</strong> ${state.pricingContext.premium}</p>` : ''}
      </div>
    `;
  }

  // Legacy schema fallback
  return `
    <h3 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 mt-12">
      Pricing Guide for ${state.name}
    </h3>

    <div class="pricing-container">
      <div class="pricing-header">
        <p>
          Average daily shower costs range from $${state.priceRange.low} to $${state.priceRange.high}
        </p>
      </div>
      <div class="pricing-content">
        <div class="pricing-grid">
          <div class="pricing-item">
            <span class="pricing-badge free">Free</span>
            <span class="pricing-description">Public beaches, some state parks, select community centers</span>
          </div>
          <div class="pricing-item">
            <span class="pricing-badge low">$5-10</span>
            <span class="pricing-description">Municipal recreation centers, public pools, basic facilities</span>
          </div>
          <div class="pricing-item">
            <span class="pricing-badge mid">$10-15</span>
            <span class="pricing-description">Truck stops, travel centers, mid-range gyms</span>
          </div>
          <div class="pricing-item">
            <span class="pricing-badge high">$15-${state.priceRange.high}</span>
            <span class="pricing-description">Premium fitness centers, resort facilities, day spas</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

private static generateRegulationsSection(state: StateInfo): string {
  return `
    <div class="info-box regulation">
      <div class="info-box-header">
        <svg class="info-box-icon text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
        <h4 class="info-box-title">
          Health & Safety Regulations
        </h4>
      </div>
      <p class="info-box-content">
        ${state.regulations} All public shower facilities must maintain proper sanitation standards, 
        water temperature controls, and meet ADA accessibility requirements.
      </p>
    </div>
  `;
}

private static generateClimateSection(state: StateInfo): string {
  return `
    <div class="info-box climate">
      <div class="info-box-header">
        <svg class="info-box-icon text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>
        <h4 class="info-box-title">Seasonal Considerations</h4>
      </div>
      <p class="info-box-content">
        ${state.climateNote} Outdoor facilities may have limited seasonal hours.
      </p>
    </div>
  `;
}

private static generateCitiesSection(state: StateInfo, stats: any): string {
  // Support both new schema (cities array of objects) and legacy (majorCities string array)
  if (state.cities && state.cities.length > 0) {
    // New schema with descriptions
    return `
      <h3 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">
        Where to Find Facilities
      </h3>

      <div class="city-highlights grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        ${state.cities.slice(0, 6).map(city => `
          <div class="city-item bg-white border border-warm-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
            <strong class="text-gray-900">${city.name}</strong>
            <span class="text-gray-600"> - ${city.description}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Legacy schema fallback
  const topCities = state.majorCities?.slice(0, 6) || [];

  return `
    <h3 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 mt-12">
      Cities with Shower Facilities
    </h3>

    <div class="city-grid">
      ${topCities.map(city => `
        <div class="city-card hover-lift">
          <h4>${city}</h4>
          <p>Multiple locations</p>
        </div>
      `).join('')}
    </div>
  `;
}

private static generateFacilityTypesSection(state: StateInfo): string {
  // Support new schema (facilityTypes with descriptions) and legacy (commonFacilities strings)
  if (state.facilityTypes && state.facilityTypes.length > 0) {
    // New schema - no numbered list, just category cards
    return `
      <h3 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">
        Types of Facilities
      </h3>

      <div class="facility-overview space-y-4 mb-8">
        ${state.facilityTypes.map(facility => `
          <div class="facility-category bg-white border border-warm-200 rounded-lg p-4">
            <strong class="text-gray-900">${facility.name}</strong>
            <p class="text-gray-600 mt-1">${facility.description}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Legacy schema fallback
  const facilities = state.commonFacilities || [];
  return `
    <h3 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 mt-12">
      Types of Shower Facilities
    </h3>

    <div class="facility-grid">
      ${facilities.map((facility, index) => `
        <div class="facility-card">
          <div class="facility-card-inner">
            <span class="facility-number">
              ${index + 1}
            </span>
            <div class="facility-content">
              <h4>${facility}</h4>
              <p>${this.getFacilityDescription(facility)}</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

private static generateHighwaySection(state: StateInfo): string {
  if (!state.majorHighways || state.majorHighways.length === 0) return '';
  
  return `
    <div class="info-box highway">
      <div class="info-box-header">
        <svg class="info-box-icon text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
        </svg>
        <h4 class="info-box-title">
          Major Highway Corridors
        </h4>
      </div>
      <p class="info-box-content">
        Truck stops and travel centers with shower facilities are commonly found along:
      </p>
      <div class="highway-badges">
        ${state.majorHighways.map(highway => `
          <span class="highway-badge">
            ${highway}
          </span>
        `).join('')}
      </div>
    </div>
  `;
}

private static generateUniversitySection(state: StateInfo): string {
  if (!state.universityTowns || state.universityTowns.length === 0) return '';
  
  return `
    <div class="university-section">
      <div class="info-box-header">
        <svg class="info-box-icon text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
        </svg>
        <h4 class="info-box-title">
          University Towns
        </h4>
      </div>
      <p class="info-box-content">
        College towns typically offer campus recreation centers and student gym facilities:
      </p>
      <ul class="university-list">
        ${state.universityTowns.slice(0, 4).map(town => `
          <li class="university-item">
            <svg class="university-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            ${town}
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

private static getFacilityDescription(facilityType: string): string {
  const descriptions: Record<string, string> = {
    'Beach showers': 'Free rinse stations at public beaches, typically cold water only',
    'State park facilities': 'Campground and day-use area showers, fees may apply',
    'Recreation centers': 'Municipal facilities with full locker rooms, resident discounts common',
    'YMCAs': 'Membership-based with day pass options, comprehensive amenities',
    'Truck stops': '24/7 private shower rooms, primarily for commercial drivers',
    'Fitness centers': 'Gym chains offering day passes, full locker room facilities',
    'Municipal pools': 'Public pool facilities with shower access, seasonal hours',
    'Tourist areas': 'Visitor-focused facilities near attractions and hotels'
  };
  
  return descriptions[facilityType] || 'Public shower facilities';
}

private static generateGenericContent(stateSlug: string, stats: any): string {
  const stateName = stateSlug.charAt(0).toUpperCase() + stateSlug.slice(1).replace(/-/g, ' ');
  
  return `
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 relative pb-4">
      About Public Showers in ${stateName}
    </h2>
    
    <p class="intro-text">
      ShowerMap tracks ${stats.totalLocations}+ shower facilities across ${stateName}, 
      including ${stats.verifiedCount} locations verified by user reviews. 
      Our directory includes both free and paid facilities.
    </p>
    
    <h3 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 mt-12">
      Facility Statistics
    </h3>
    
    <div class="stats-box">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-icon blue">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-value">${stats.totalLocations}</p>
            <p class="stat-label">Total Locations</p>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon green">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-value">${stats.verifiedCount}</p>
            <p class="stat-label">Verified Facilities</p>
          </div>
        </div>
        
        
        <div class="stat-item">
          <div class="stat-icon orange">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-value">${stats.cities.length}</p>
            <p class="stat-label">Cities Covered</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Complete page generation method
private static generateCompletePage(state: StateInfo, stats: any): string {
  return `
    <div class="state-content">
      ${this.generateIntroSection(state, stats)}
      ${this.generateRegionalSection(state, stats)}
      ${this.generatePricingSection(state, stats)}
      ${this.generateRegulationsSection(state)}
      ${this.generateClimateSection(state)}
      ${this.generateHighwaySection(state)}
      ${this.generateCitiesSection(state, stats)}
      ${this.generateFacilityTypesSection(state)}
      ${this.generateUniversitySection(state)}
    </div>
  `;
}
}