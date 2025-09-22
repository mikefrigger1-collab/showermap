// lib/stateContent.ts

interface StateInfo {
  name: string;
  code: string;
  majorCities: string[];
  universityTowns: string[];
  popularVenues: string[];
  majorHighways: string[];
  stateParkSystems: string[];
  regulations?: string;
  climateNote?: string;
  seasonalEvents?: string[];
  localContext: string;
  priceRange: { low: number; high: number };
  commonFacilities: string[];
}

// Comprehensive state-specific data for all 50 states
const stateData: Record<string, StateInfo> = {
  'alabama': {
    name: 'Alabama',
    code: 'AL',
    majorCities: ['Birmingham', 'Montgomery', 'Huntsville', 'Mobile', 'Tuscaloosa'],
    universityTowns: ['Tuscaloosa (University of Alabama)', 'Auburn', 'Troy'],
    popularVenues: ['Planet Fitness', 'Anytime Fitness', 'YMCA of Greater Birmingham', 'Love\'s Travel Stops', 'Pilot Flying J'],
    majorHighways: ['I-65', 'I-20', 'I-59', 'I-10'],
    stateParkSystems: ['Gulf State Park', 'Oak Mountain State Park', 'Cheaha State Park'],
    regulations: 'Alabama Department of Public Health regulates public bathing facilities under Chapter 420-6-2.',
    climateNote: 'Hot, humid summers from May through September increase shower demand. Gulf Coast facilities may close during hurricane season.',
    seasonalEvents: ['Spring break (March)', 'Football season (Fall)', 'Beach season (May-September)'],
  localContext: 'Alabama\'s Gulf Shores and Orange Beach areas maintain year-round public beach rinse stations popular with tourists. The I-65 corridor from Mobile to Tennessee serves as a major trucking route with well-established stops every 30-50 miles. Birmingham\'s legacy of public recreation centers dates to the civil rights era, many still offering affordable shower access. College towns see surge pricing during football season, with some facilities restricting access to members only during home games. Rural Black Belt counties have limited options beyond school facilities.',
    priceRange: { low: 0, high: 18 },
    commonFacilities: ['Truck stops', 'State parks', 'Recreation centers', 'University gyms', 'Beach facilities']
  },
  
  'alaska': {
    name: 'Alaska',
    code: 'AK',
    majorCities: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan'],
    universityTowns: ['Fairbanks (UAF)', 'Anchorage (UAA)'],
    popularVenues: ['Alaska Club', 'YMCA of Anchorage', 'Planet Fitness Anchorage', 'Recreation centers'],
    majorHighways: ['AK-1 (Seward Highway)', 'AK-2 (Sterling Highway)', 'AK-3 (Parks Highway)'],
    stateParkSystems: ['Chugach State Park', 'Denali State Park', 'Kachemak Bay State Park'],
    regulations: 'Alaska Administrative Code Title 18 Chapter 30 covers public accommodations and recreational facilities.',
    climateNote: 'Extended winter conditions October-April. Many outdoor facilities seasonal. 24-hour daylight in summer affects operating hours.',
    seasonalEvents: ['Summer tourism (May-September)', 'Iditarod (March)', 'Cruise season (May-September)'],
  localContext: 'Alaska\'s unique challenges include extreme remoteness where some communities are only accessible by plane or boat. Anchorage and Fairbanks concentrate most public facilities, with suburban rec centers offering day passes. Bush communities often rely on school gymnasiums that open to public during specific hours. Summer tourism creates temporary shower facilities at RV parks and campgrounds from May-September. Many facilities offer "shower only" rates for travelers, typically $5-15. Winter conditions can close facilities unexpectedly, and some remote areas rely on tribal community centers.',   priceRange: { low: 0, high: 25 },
    commonFacilities: ['Recreation centers', 'Hotels with day use', 'RV parks', 'Community centers', 'Fitness clubs']
  },
  
  'arizona': {
    name: 'Arizona',
    code: 'AZ',
    majorCities: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale'],
    universityTowns: ['Tempe (ASU)', 'Tucson (U of A)', 'Flagstaff (NAU)'],
    popularVenues: ['LA Fitness', 'EōS Fitness', 'Mountainside Fitness', 'Love\'s Travel Stops', 'YMCA Valley of the Sun'],
    majorHighways: ['I-10', 'I-17', 'I-40', 'I-8'],
    stateParkSystems: ['Lake Havasu State Park', 'Slide Rock State Park', 'Lost Dutchman State Park'],
    regulations: 'Arizona Administrative Code Title 9 Chapter 8 Article 8 governs public bathing places.',
    climateNote: 'Extreme summer heat (June-August) with temperatures over 110°F. Winter influx of snowbirds increases demand.',
    seasonalEvents: ['Spring training (February-March)', 'Snowbird season (October-April)', 'Monsoon season (July-September)'],
  localContext: 'Arizona\'s snowbird population (500,000+ winter visitors) drives seasonal demand with RV resorts offering day passes ranging from $5-20. Phoenix metro has the highest concentration of budget gym chains in the nation. Summer heat makes outdoor facilities unusable from June-September when temperatures exceed 115°F. Border towns like Nogales and Yuma have truck stops catering to international commerce. Native American reservations may require permits for facility use. Sedona and Flagstaff mountain areas provide cooler alternatives during summer months.',
    priceRange: { low: 0, high: 22 },
    commonFacilities: ['Fitness centers', 'RV parks', 'Recreation centers', 'Truck stops', 'Resort day passes']
  },
  
  'arkansas': {
    name: 'Arkansas',
    code: 'AR',
    majorCities: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro'],
    universityTowns: ['Fayetteville (U of A)', 'Conway (UCA)', 'Arkadelphia'],
    popularVenues: ['10 Fitness', 'Planet Fitness', 'Anytime Fitness', 'Love\'s Travel Stops', 'YMCA of Greater Little Rock'],
    majorHighways: ['I-30', 'I-40', 'I-55', 'I-49'],
    stateParkSystems: ['Hot Springs National Park', 'Devil\'s Den State Park', 'Petit Jean State Park'],
    regulations: 'Arkansas Department of Health Rules and Regulations for Public Swimming Pools and Spas.',
    climateNote: 'Hot, humid summers with mild winters. Spring severe weather season may affect facility operations.',
    seasonalEvents: ['Razorback football (Fall)', 'Hot Springs racing season (January-March)', 'Lake season (May-September)'],
  localContext: 'Arkansas\'s natural hot springs in the Ouachita Mountains offer unique bathing experiences with day rates at commercial springs. Little Rock\'s downtown revival includes modern fitness facilities catering to young professionals. The Mississippi River corridor has fewer facilities than interstate routes. Walmart\'s headquarters in Bentonville has driven upscale fitness development in Northwest Arkansas. State parks with shower facilities often close seasonally (November-March). Rural Delta region has minimal public options, with many communities relying on high school facilities.',
    priceRange: { low: 0, high: 18 },
    commonFacilities: ['State parks', 'Truck stops', 'Community centers', 'Hot springs facilities', 'Lake recreation areas']
  },
  
  'california': {
    name: 'California',
    code: 'CA',
    majorCities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose', 'Fresno', 'Oakland', 'Long Beach'],
    universityTowns: ['Berkeley (UC Berkeley)', 'Davis (UC Davis)', 'Isla Vista (UCSB)', 'San Luis Obispo (Cal Poly)'],
    popularVenues: ['24 Hour Fitness', 'LA Fitness', 'Planet Fitness', 'Equinox', 'YMCA of San Francisco', 'Venice Beach facilities'],
    majorHighways: ['I-5', 'I-10', 'I-15', 'I-80', 'US-101', 'I-405'],
    stateParkSystems: ['California State Parks', 'Huntington Beach', 'Big Sur State Parks', 'Lake Tahoe parks'],
    regulations: 'California Health and Safety Code Section 116035-116068 governs public swimming pools and shower facilities.',
    climateNote: 'Mediterranean climate with year-round mild weather on coast. Mountain areas have winter snow. Desert regions extremely hot in summer.',
    seasonalEvents: ['Summer beach season (May-October)', 'Coachella (April)', 'Ski season (December-March)', 'Fire season (August-November)'],
  localContext: 'California leads the nation in free public beach shower access with over 200 beaches offering rinse stations. San Francisco\'s extensive rec center network charges just $3-7 for shower access. Los Angeles has stark contrasts between affluent West Side gyms ($150+/month) and community centers serving lower-income areas. Silicon Valley tech campuses often allow public access to facilities with advance booking. Homeless populations have created dedicated shower programs in major cities - SF\'s Lava Mae, LA\'s Refresh Spot. Mountain towns like Mammoth and Tahoe cater to seasonal sports enthusiasts.',    priceRange: { low: 0, high: 35 },
    commonFacilities: ['Beach showers', 'State beaches', 'Recreation centers', 'YMCAs', 'Premium gyms', 'University facilities']
  },
  
  'colorado': {
    name: 'Colorado',
    code: 'CO',
    majorCities: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Boulder'],
    universityTowns: ['Boulder (CU)', 'Fort Collins (CSU)', 'Greeley (UNC)', 'Golden (Mines)'],
    popularVenues: ['24 Hour Fitness', 'Anytime Fitness', 'Chuze Fitness', 'YMCA of Metro Denver', 'Recreation Centers of Denver'],
    majorHighways: ['I-25', 'I-70', 'I-76', 'US-285'],
    stateParkSystems: ['Rocky Mountain National Park', 'Cherry Creek State Park', 'Chatfield State Park'],
    regulations: 'Colorado Department of Public Health regulations 5 CCR 1003-5 cover swimming pools and mineral baths.',
    climateNote: 'High altitude affects visitors. Ski season November-April. Summer hiking season increases backcountry facility demand.',
    seasonalEvents: ['Ski season (November-April)', 'Summer festival season', 'Hiking season (June-October)', 'College football (Fall)'],
  localContext: 'Colorado\'s fitness-obsessed culture means gyms on every corner in Denver/Boulder. Ski resorts offer day shower passes ($10-25) primarily for van-lifers and seasonal workers. The I-70 mountain corridor gets overwhelmed on weekends with limited facilities. Cannabis tourism has increased demand for hostel-style facilities. Hot springs range from developed resorts ($40+) to primitive pools (free-$15). Recreation centers pride themselves on accessibility with income-based pricing. Altitude sickness drives demand for recovery facilities. Mountain towns struggle with seasonal worker housing, making public showers essential.',
    priceRange: { low: 0, high: 28 },
    commonFacilities: ['Recreation centers', 'Hot springs', 'Ski resort facilities', 'University gyms', 'Climbing gyms']
  },
  
  'connecticut': {
    name: 'Connecticut',
    code: 'CT',
    majorCities: ['Hartford', 'New Haven', 'Stamford', 'Bridgeport', 'Waterbury'],
    universityTowns: ['New Haven (Yale)', 'Storrs (UConn)', 'Middletown (Wesleyan)'],
    popularVenues: ['Planet Fitness', 'Edge Fitness', 'Chelsea Piers', 'YMCA locations', 'LA Fitness'],
    majorHighways: ['I-95', 'I-84', 'I-91', 'Route 15 (Merritt Parkway)'],
    stateParkSystems: ['Hammonasset Beach State Park', 'Silver Sands State Park', 'Gillette Castle State Park'],
    regulations: 'Connecticut Public Health Code Section 19-13-B33 regulates public swimming pools.',
    climateNote: 'Four distinct seasons. Beach facilities seasonal May-September. Winter weather may affect operations.',
    seasonalEvents: ['Summer beach season', 'Fall foliage (September-October)', 'College seasons'],
  localContext: 'Connecticut\'s wealth disparity shows in facility access - Greenwich and Westport have exclusive clubs while cities like Bridgeport rely on aging YMCAs. Long Island Sound beaches charge out-of-state visitors premium rates ($20-30) while residents enter free. Yale opens select facilities to New Haven residents as community outreach. Casino resorts (Mohegan Sun, Foxwoods) offer spa facilities to non-guests. NYC commuters use gym chains near train stations for morning showers. State parks provide basic facilities but many close after Labor Day. Shore towns restrict beach access to residents during peak season.',
    priceRange: { low: 0, high: 30 },
    commonFacilities: ['Beach facilities', 'YMCAs', 'Premium fitness clubs', 'State parks', 'University facilities']
  },
  
  'delaware': {
    name: 'Delaware',
    code: 'DE',
    majorCities: ['Wilmington', 'Dover', 'Newark', 'Rehoboth Beach', 'Lewes'],
    universityTowns: ['Newark (University of Delaware)', 'Dover (Delaware State)'],
    popularVenues: ['Planet Fitness', 'Anytime Fitness', 'YMCA of Delaware', 'Rehoboth Beach facilities'],
    majorHighways: ['I-95', 'US-13', 'US-1', 'DE-1'],
    stateParkSystems: ['Cape Henlopen State Park', 'Delaware Seashore State Park', 'Lums Pond State Park'],
    regulations: 'Delaware Health and Social Services regulations govern public bathing facilities.',
    climateNote: 'Beach season May-September. Humid summers, mild winters. Tourist season affects coastal facility availability.',
    seasonalEvents: ['Beach season (Memorial Day-Labor Day)', 'NASCAR races (Dover)', 'Tax-free shopping'],
  localContext: 'Delaware\'s beaches draw 7+ million annual visitors, with Rehoboth Beach alone providing 20+ public shower stations. Tax-free shopping brings Pennsylvania and Maryland residents who use gym day passes while on shopping trips. Corporate presence in Wilmington (credit card companies) ensures high-end fitness options downtown. Dover Air Force Base influences local gym culture. Beach towns have "shower only" pricing ($3-5) for day-trippers. Many facilities close or reduce hours October through April. The state\'s small size means most facilities are within 30-minute drives.',
    priceRange: { low: 0, high: 25 },
    commonFacilities: ['Beach showers', 'State parks', 'Fitness centers', 'YMCAs', 'Hotel day passes']
  },
  
  'florida': {
    name: 'Florida',
    code: 'FL',
    majorCities: ['Miami', 'Tampa', 'Jacksonville', 'Orlando', 'St. Petersburg', 'Fort Lauderdale', 'Tallahassee'],
    universityTowns: ['Gainesville (UF)', 'Tallahassee (FSU)', 'Tampa (USF)', 'Orlando (UCF)'],
    popularVenues: ['LA Fitness', 'Anytime Fitness', 'YouFit', 'Pilot Flying J', 'YMCA locations', 'Beach facilities'],
    majorHighways: ['I-95', 'I-75', 'I-4', 'I-10', 'Florida Turnpike'],
    stateParkSystems: ['Everglades National Park', 'John Pennekamp Coral Reef', 'Bahia Honda State Park'],
    regulations: 'Florida Administrative Code Chapter 64E-9 governs public swimming pools and bathing places.',
    climateNote: 'Year-round warm weather. Hurricane season June-November may affect coastal facilities. High humidity year-round.',
    seasonalEvents: ['Spring break (March)', 'Hurricane season (June-Nov)', 'Snowbird season (Nov-April)', 'Theme park peak (summer, holidays)'],
  localContext: 'Florida\'s 1,350-mile coastline means nearly every beach has public showers, from basic cold-water rinses to heated facilities with changing areas. Miami Beach alone has 40+ shower stations. Theme park areas (Orlando, Tampa) have numerous budget motels offering day passes for pool/shower use ($10-20). Retirement communities often restrict access to residents and guests. The Keys have limited facilities between Key Largo and Key West. Truck stops along Florida\'s Turnpike are modern "travel plazas" with premium shower facilities. Hurricane evacuations can overwhelm inland facilities. Spring break brings temporary shower trailers to popular beaches.',    priceRange: { low: 0, high: 30 },
    commonFacilities: ['Beach showers', 'Theme park area facilities', 'State parks', 'Truck stops', 'Resort day passes']
  },
  
  'georgia': {
    name: 'Georgia',
    code: 'GA',
    majorCities: ['Atlanta', 'Columbus', 'Augusta', 'Macon', 'Savannah', 'Athens'],
    universityTowns: ['Athens (UGA)', 'Atlanta (Georgia Tech)', 'Statesboro (Georgia Southern)'],
    popularVenues: ['LA Fitness', 'Planet Fitness', 'Anytime Fitness', 'Love\'s Travel Stops', 'YMCA of Metro Atlanta'],
    majorHighways: ['I-75', 'I-85', 'I-20', 'I-95', 'I-16'],
    stateParkSystems: ['Cloudland Canyon', 'Tybee Island', 'Amicalola Falls State Park'],
    regulations: 'Georgia Department of Public Health Rules Chapter 511-3-5 covers public swimming pools.',
    climateNote: 'Hot, humid summers. Mild winters. Spring pollen season may affect outdoor facilities.',
    seasonalEvents: ['Masters Tournament (April)', 'College football (Fall)', 'Peach season (June-August)', 'Atlanta conventions year-round'],
  localContext: 'Atlanta\'s sprawl means facilities cluster in specific areas - Buckhead for premium gyms, suburbs for family-focused chains. The city\'s role as a transportation hub makes it the "truck stop capital of the South" with major facilities at every interstate junction. Savannah\'s historic district has limited options, pushing visitors to Tybee Island (20 minutes). College towns transform during football season with Athens and Atlanta seeing 100,000+ visitors on game days. The Appalachian Trail\'s southern terminus at Springer Mountain creates seasonal demand for hiker facilities. CDC presence brings health-conscious culture to Atlanta area.',
    priceRange: { low: 0, high: 25 },
    commonFacilities: ['Truck stops', 'Fitness centers', 'Recreation centers', 'University facilities', 'State parks']
  },
  
  'hawaii': {
    name: 'Hawaii',
    code: 'HI',
    majorCities: ['Honolulu', 'Pearl City', 'Hilo', 'Kailua-Kona', 'Kahului'],
    universityTowns: ['Honolulu (UH Manoa)', 'Hilo (UH Hilo)'],
    popularVenues: ['24 Hour Fitness', 'Anytime Fitness', 'YMCA of Honolulu', 'Beach park facilities'],
    majorHighways: ['H-1', 'H-2', 'H-3', 'Route 11', 'Route 19'],
    stateParkSystems: ['Hawaii Volcanoes National Park', 'Hanauma Bay', 'Diamond Head State Monument'],
    regulations: 'Hawaii Administrative Rules Title 11 Chapter 10 governs public swimming pools.',
    climateNote: 'Year-round tropical climate. Trade winds provide natural cooling. Occasional tropical storms.',
    seasonalEvents: ['Peak tourist season (December-April)', 'Summer break (June-August)', 'Ironman (October)', 'Surf season (November-February)'],
  localContext: 'Hawaii\'s beach culture means virtually every beach park has shower facilities - over 150 locations statewide. Waikiki alone has 30+ public showers. Local etiquette requires rinsing before entering ocean (remove sunscreen) and after (remove salt). Military bases (Pearl Harbor, Schofield Barracks) restrict access but influence surrounding gym development. Neighbor islands have fewer commercial gyms but excellent beach facilities. Japanese tourism drives demand for clean, well-maintained facilities. Homeless populations\' use of beach showers creates occasional maintenance issues and hour restrictions. Many facilities now use low-flow fixtures due to water scarcity concerns.',    priceRange: { low: 0, high: 35 },
    commonFacilities: ['Beach park showers', 'Hotel day passes', 'Fitness centers', 'YMCAs', 'Community pools']
  },
  
  'idaho': {
    name: 'Idaho',
    code: 'ID',
    majorCities: ['Boise', 'Meridian', 'Idaho Falls', 'Pocatello', 'Coeur d\'Alene'],
    universityTowns: ['Moscow (U of I)', 'Pocatello (ISU)', 'Boise (Boise State)'],
    popularVenues: ['Anytime Fitness', 'Planet Fitness', 'The Athletic Club', 'YMCA locations'],
    majorHighways: ['I-84', 'I-15', 'I-90', 'US-95'],
    stateParkSystems: ['Craters of the Moon', 'Ponderosa State Park', 'Harriman State Park'],
    regulations: 'Idaho Administrative Code IDAPA 16.02.19 governs public swimming pools.',
    climateNote: 'Four seasons with cold winters. Mountain areas have heavy snow. Hot springs available year-round.',
    seasonalEvents: ['Ski season (December-March)', 'River season (June-September)', 'Harvest season (Fall)'],
    localContext: 'Idaho has over 130 soakable hot springs, ranging from developed resorts to primitive backcountry pools requiring hiking access. Boise\'s growth has brought modern fitness chains while rural areas depend on school facilities that open to public evenings/weekends. Sun Valley attracts wealthy tourists with high-end spa facilities. Mormon influence in eastern Idaho affects Sunday operations. Agricultural workers in Magic Valley have limited access, with some churches providing shower programs. White water rafting companies offer end-of-trip shower facilities. Winter road conditions can make facilities inaccessible for days. Californian transplants to Boise have increased demand for premium fitness options.',
    priceRange: { low: 0, high: 20 },
    commonFacilities: ['Hot springs', 'Recreation centers', 'State parks', 'University gyms', 'Fitness centers']
  },
  
  'illinois': {
    name: 'Illinois',
    code: 'IL',
    majorCities: ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville', 'Springfield'],
    universityTowns: ['Champaign-Urbana (UIUC)', 'Carbondale (SIU)', 'Normal (ISU)', 'Evanston (Northwestern)'],
    popularVenues: ['LA Fitness', 'Planet Fitness', 'Xsport Fitness', 'Chicago Park District', 'YMCA of Metro Chicago'],
    majorHighways: ['I-55', 'I-57', 'I-80', 'I-90', 'I-94'],
    stateParkSystems: ['Starved Rock State Park', 'Illinois Beach State Park', 'Giant City State Park'],
    regulations: 'Illinois Department of Public Health Administrative Code Title 77 Chapter I governs public swimming facilities.',
    climateNote: 'Cold winters with lake effect snow. Hot, humid summers. Spring and fall moderate.',
    seasonalEvents: ['Summer festivals (June-August)', 'College sports seasons', 'State Fair (August)', 'Lake Michigan beach season'],
  localContext: 'Chicago Park District operates 70+ facilities with shower access, most charging $20-35 day passes. Lake Michigan beaches have 30+ shower stations open May-October. The Loop has premium gyms catering to finance workers with early opening hours (4:30am). South and West sides have fewer commercial options but strong community center networks. Winter creates "gym refugees" when outdoor runners need indoor alternatives. O\'Hare area has numerous hotels offering day rates for layover passengers. Downstate Illinois relies heavily on YMCAs, with many small towns having no other options. Universities open facilities to community members for higher fees during summer.',
    priceRange: { low: 0, high: 30 },
    commonFacilities: ['Park district facilities', 'Beach houses', 'Fitness centers', 'YMCAs', 'University facilities']
  },
  
  'indiana': {
    name: 'Indiana',
    code: 'IN',
    majorCities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Bloomington'],
    universityTowns: ['Bloomington (IU)', 'West Lafayette (Purdue)', 'Notre Dame', 'Muncie (Ball State)'],
    popularVenues: ['Planet Fitness', 'Anytime Fitness', 'LA Fitness', 'YMCA locations', 'Community centers'],
    majorHighways: ['I-65', 'I-69', 'I-70', 'I-74', 'I-80/90'],
    stateParkSystems: ['Indiana Dunes National Park', 'Brown County State Park', 'Turkey Run State Park'],
    regulations: 'Indiana State Department of Health 410 IAC 6-2.1 governs public swimming pools.',
    climateNote: 'Four distinct seasons. Cold winters, hot humid summers. Lake Michigan moderates northern climate.',
    seasonalEvents: ['Indianapolis 500 (May)', 'State Fair (August)', 'College basketball season', 'Football season (Fall)'],
  localContext: 'Indianapolis 500 brings 300,000+ visitors in May, straining facilities citywide. Basketball culture means even small towns have recreation centers with showers. Religious conservatism affects some facilities\' policies on family changing areas. RV manufacturing in Elkhart area supports numerous campgrounds with facilities. Indiana Dunes provides beach showers but water is cold even in summer. Amish country in northern Indiana has very limited public facilities. College towns see dramatic population shifts affecting access and pricing. Truck stops along I-65 and I-70 serve as crucial facilities for rural areas between cities.',
    priceRange: { low: 0, high: 22 },
    commonFacilities: ['Recreation centers', 'YMCAs', 'University facilities', 'Truck stops', 'State parks']
  },
  
  'iowa': {
    name: 'Iowa',
    code: 'IA',
    majorCities: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'],
    universityTowns: ['Iowa City (U of Iowa)', 'Ames (Iowa State)', 'Cedar Falls (UNI)'],
    popularVenues: ['Anytime Fitness', 'Planet Fitness', 'YMCA locations', 'Love\'s Travel Stops'],
    majorHighways: ['I-35', 'I-80', 'I-29', 'I-380'],
    stateParkSystems: ['Backbone State Park', 'Maquoketa Caves State Park', 'Clear Lake State Park'],
    regulations: 'Iowa Administrative Code Chapter 15 governs swimming pools and spas.',
    climateNote: 'Continental climate with cold winters and hot summers. Spring severe weather season.',
    seasonalEvents: ['Iowa State Fair (August)', 'RAGBRAI (July)', 'College football (Fall)', 'Caucus season'],
  localContext: 'RAGBRAI (bike ride across Iowa) creates a moving demand for shower facilities each July, with small towns opening schools and churches. Iowa\'s agricultural character means many rural communities have only school facilities available after hours. Caucus season brings media and political operatives seeking facilities. The world\'s largest truck stop (Iowa 80) sets the standard for interstate shower facilities. College towns have stark contrasts between student-focused and community facilities. Many small-town pools built in the 1960s-70s are aging out with limited replacement funds. Wind farm workers in rural areas create unexpected demand in formerly quiet towns.',
    priceRange: { low: 0, high: 18 },
    commonFacilities: ['Truck stops', 'Community centers', 'YMCAs', 'University facilities', 'Recreation centers']
  },
  
  'kansas': {
    name: 'Kansas',
    code: 'KS',
    majorCities: ['Wichita', 'Kansas City', 'Topeka', 'Lawrence', 'Manhattan'],
    universityTowns: ['Lawrence (KU)', 'Manhattan (K-State)', 'Pittsburg (Pitt State)'],
    popularVenues: ['Genesis Health Clubs', 'Planet Fitness', 'Anytime Fitness', 'YMCA locations'],
    majorHighways: ['I-35', 'I-70', 'I-135', 'US-54'],
    stateParkSystems: ['Eisenhower State Park', 'Milford State Park', 'Wilson State Park'],
    regulations: 'Kansas Administrative Regulations 28-14 governs swimming pools and spas.',
    climateNote: 'Continental climate with hot summers and cold winters. Tornado season April-June.',
    seasonalEvents: ['Sunflower season (September)', 'College basketball season', 'State Fair (September)'],
  localContext: 'Kansas\'s position on cross-country trucking routes means excellent truck stop facilities every 50-75 miles on I-70. Basketball obsession ensures most communities have gymnasiums with shower facilities. Agricultural areas have seasonal worker populations with limited access. Oil field workers in western Kansas rely on hotel day rates and truck stops. Small towns often have single facility serving entire community - typically the school. Tornado damage can eliminate a town\'s only facility. Military presence at Fort Riley and McConnell AFB influences nearby civilian facilities. German-Russian heritage areas maintain strong community center traditions.',
    priceRange: { low: 0, high: 20 },
    commonFacilities: ['Truck stops', 'Community centers', 'University gyms', 'Recreation centers', 'Fitness centers']
  },
  
  'kentucky': {
    name: 'Kentucky',
    code: 'KY',
    majorCities: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'],
    universityTowns: ['Lexington (UK)', 'Louisville (U of L)', 'Bowling Green (WKU)', 'Richmond (EKU)'],
    popularVenues: ['Planet Fitness', 'Anytime Fitness', 'Baptist Health/Milestone Wellness', 'YMCA of Greater Louisville'],
    majorHighways: ['I-65', 'I-75', 'I-24', 'I-71'],
    stateParkSystems: ['Mammoth Cave National Park', 'Lake Cumberland State Resort Park', 'Natural Bridge State Resort Park'],
    regulations: 'Kentucky Administrative Regulations Title 902 KAR 10:120 governs public swimming pools.',
    climateNote: 'Humid subtropical climate. Hot summers, mild winters. Cave systems maintain constant temperatures.',
    seasonalEvents: ['Kentucky Derby (May)', 'Bourbon Trail season', 'College basketball season', 'Fall foliage'],
  localContext: 'Kentucky\'s unique state resort park system includes lodges with public shower access even for non-guests. Basketball culture rivals Indiana\'s, ensuring recreation centers in most communities. Bourbon tourism has created upscale facilities along the trail routes. Eastern Kentucky\'s coal country has limited options with some communities relying entirely on school facilities. Lake Cumberland and Land Between the Lakes provide seasonal facilities for boaters. Louisville\'s Derby Week sees prices triple and restricted access at many facilities. Appalachian areas may have cultural hesitancy about public facilities. Fort Campbell influences Hopkinsville area facilities.',
    priceRange: { low: 0, high: 22 },
    commonFacilities: ['State resort parks', 'Lake facilities', 'University gyms', 'YMCAs', 'Truck stops']
  },
  
  'louisiana': {
    name: 'Louisiana',
    code: 'LA',
    majorCities: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles'],
    universityTowns: ['Baton Rouge (LSU)', 'New Orleans (Tulane)', 'Ruston (LA Tech)', 'Hammond (Southeastern)'],
    popularVenues: ['Anytime Fitness', 'Planet Fitness', 'Franco\'s Athletic Club', 'YMCA locations'],
    majorHighways: ['I-10', 'I-12', 'I-20', 'I-49'],
    stateParkSystems: ['Fontainebleau State Park', 'Chicot State Park', 'Lake Bistineau State Park'],
    regulations: 'Louisiana Administrative Code Title 51 Part XIV governs public swimming pools.',
    climateNote: 'Subtropical climate with high humidity. Hurricane season June-November. Hot summers year-round warmth.',
    seasonalEvents: ['Mardi Gras (February/March)', 'Jazz Fest (April/May)', 'Festival season (Spring/Fall)', 'Hurricane season'],
  localContext: 'New Orleans\' tourism creates year-round demand with French Quarter gyms offering day passes to visitors. Mardi Gras and Jazz Fest can make facilities completely inaccessible to non-members. Post-Katrina infrastructure varies widely by parish. Oil industry workers in offshore rotation use facilities during shore time. Sportsman\'s Paradise region has boat launch facilities with showers. Cultural attitudes about public bathing vary between Cajun/Creole communities. Casino resorts in Lake Charles and Shreveport offer day spa access. Hurricane evacuations can overwhelm facilities in northern parishes. Some facilities still recovering from 2020-2021 hurricane damage.',
    priceRange: { low: 0, high: 20 },
    commonFacilities: ['Community centers', 'State parks', 'Truck stops', 'University facilities', 'Recreation centers']
  },
  
  'maine': {
    name: 'Maine',
    code: 'ME',
    majorCities: ['Portland', 'Lewiston', 'Bangor', 'Augusta', 'Biddeford'],
    universityTowns: ['Orono (U of Maine)', 'Portland (USM)', 'Waterville (Colby)'],
    popularVenues: ['Planet Fitness', 'Anytime Fitness', 'YMCA locations', 'Portland Community Centers'],
    majorHighways: ['I-95', 'I-295', 'US-1', 'US-2'],
    stateParkSystems: ['Acadia National Park', 'Baxter State Park', 'Sebago Lake State Park'],
    regulations: 'Maine CDC rules 10-144 CMR Chapter 202 govern public swimming pools.',
    climateNote: 'Cold winters with significant snow. Cool summers. Short beach season July-August.',
    seasonalEvents: ['Summer tourism (July-August)', 'Fall foliage (September-October)', 'Ski season (December-March)', 'Lobster season'],
  localContext: 'Maine\'s 3,500-mile coastline has limited warm-water beach days, making beach showers less common than other coastal states. Portland\'s food scene brings tourists who use urban gym day passes. Acadia National Park area has seasonal facilities overwhelmed in summer. Remote northern Maine has vast areas with no public facilities. Lobster fishermen communities have informal networks for shower access. Winter conditions can isolate communities for days. Many facilities are seasonal (May-October) due to freeze concerns. L.L.Bean employees and outdoor culture drive Freeport area facilities. French-Canadian influence in northern areas affects facility design.',
    priceRange: { low: 0, high: 25 },
    commonFacilities: ['YMCAs', 'State parks', 'Beach facilities', 'Recreation centers', 'Ski resorts']
  },
  
  'maryland': {
    name: 'Maryland',
    code: 'MD',
    majorCities: ['Baltimore', 'Silver Spring', 'Germantown', 'Waldorf', 'Rockville', 'Annapolis'],
    universityTowns: ['College Park (UMD)', 'Baltimore (Johns Hopkins)', 'Towson', 'Annapolis (Naval Academy)'],
    popularVenues: ['LA Fitness', 'Planet Fitness', '24 Hour Fitness', 'Merritt Clubs', 'YMCA of Central Maryland'],
    majorHighways: ['I-95', 'I-495', 'I-70', 'I-83', 'US-50'],
    stateParkSystems: ['Sandy Point State Park', 'Deep Creek Lake State Park', 'Assateague State Park'],
    regulations: 'COMAR 10.17.01 Maryland Department of Health regulations govern public swimming pools.',
    climateNote: 'Four seasons with humid summers. Chesapeake Bay moderates climate. Beach season May-September.',
    seasonalEvents: ['Beach season (Memorial Day-Labor Day)', 'Crab season (April-November)', 'Naval Academy events'],
  localContext: 'Maryland\'s DC suburbs have extensive premium facilities serving federal workers and contractors. Ocean City\'s 10-mile beach has shower stations every few blocks during season. Baltimore\'s neighborhood pools serve as crucial community resources but many are underfunded. Chesapeake Bay facilities focus on boaters rather than swimmers. Naval Academy restricts access but influences Annapolis area gym culture. Montgomery County\'s wealth shows in exceptional public recreation centers. Deep Creek Lake area serves as "Western Maryland\'s beach" with seasonal facilities. Federal facilities (NIH, Fort Meade) have restricted access but excellent quality.',
    priceRange: { low: 0, high: 30 },
    commonFacilities: ['Beach facilities', 'Recreation centers', 'Premium gyms', 'YMCAs', 'State parks']
  },
  
  'massachusetts': {
    name: 'Massachusetts',
    code: 'MA',
    majorCities: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Brockton'],
    universityTowns: ['Cambridge (Harvard/MIT)', 'Amherst (UMass)', 'Medford (Tufts)', 'Chestnut Hill (BC)'],
    popularVenues: ['Planet Fitness', 'Equinox', 'BSC', 'YMCAs', 'Cambridge Athletic Clubs'],
    majorHighways: ['I-90', 'I-95', 'I-495', 'I-93', 'Route 2'],
    stateParkSystems: ['Cape Cod National Seashore', 'Walden Pond', 'Mount Greylock State Reservation'],
    regulations: 'Massachusetts 105 CMR 435.000 State Sanitary Code Chapter V governs swimming pools.',
    climateNote: 'Four distinct seasons. Cold, snowy winters. Beach season limited to summer months.',
    seasonalEvents: ['Summer beach season', 'Boston Marathon (April)', 'College move-in (September)', 'Fall foliage'],
  localContext: 'Boston area has 50+ colleges creating huge September demand during move-in week. Cape Cod beaches provide extensive facilities but parking costs can exceed $30/day for non-residents. Cambridge/Somerville has the highest concentration of premium fitness options in New England. Working-class cities like Lynn and Brockton depend on YMCAs and community centers. MDC (Metropolitan District Commission) pools and facilities serve greater Boston. Northampton/Amherst area has progressive co-op style facilities. Maritime heritage means many coastal towns have "fishermen\'s facilities" with informal public access. T-accessible gyms command premium prices.',
    priceRange: { low: 0, high: 35 },
    commonFacilities: ['University facilities', 'YMCAs', 'Beach facilities', 'Premium fitness clubs', 'Community centers']
  },
  
  'michigan': {
    name: 'Michigan',
    code: 'MI',
    majorCities: ['Detroit', 'Grand Rapids', 'Warren', 'Lansing', 'Ann Arbor', 'Flint'],
    universityTowns: ['Ann Arbor (U of M)', 'East Lansing (MSU)', 'Kalamazoo (WMU)', 'Mount Pleasant (CMU)'],
    popularVenues: ['Planet Fitness', 'Anytime Fitness', 'Lifetime Fitness', 'YMCA locations', 'LA Fitness'],
    majorHighways: ['I-75', 'I-94', 'I-96', 'I-69', 'US-131'],
    stateParkSystems: ['Sleeping Bear Dunes', 'Mackinac Island State Park', 'Holland State Park'],
    regulations: 'Michigan Administrative Code R 325.2121 governs public swimming pools.',
    climateNote: 'Great Lakes moderate climate. Cold winters with lake effect snow. Beach season June-August.',
    seasonalEvents: ['Summer lake season', 'Fall colors (September-October)', 'Winter sports season', 'Auto shows'],
  localContext: 'Michigan has more miles of Great Lakes coastline than any other state, with 200+ public beaches offering shower facilities. Detroit\'s recovery includes new recreation centers in previously underserved neighborhoods. "Up North" culture means seasonal facility demand from Memorial Day to Labor Day. Mackinac Island\'s no-car policy creates unique facility access challenges. University of Michigan football Saturdays make Ann Arbor facilities inaccessible. Auto industry heritage means strong UAW-negotiated gym benefits affecting private gym competition. Winter creates "polar bear" swimmers who use beach facilities year-round. Arab American communities in Dearborn have culturally-specific facility needs.',
    priceRange: { low: 0, high: 25 },
    commonFacilities: ['Beach facilities', 'State parks', 'Recreation centers', 'YMCAs', 'University facilities']
  },
  
  'minnesota': {
    name: 'Minnesota',
    code: 'MN',
    majorCities: ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington'],
    universityTowns: ['Minneapolis (U of M)', 'St. Cloud (SCSU)', 'Mankato (MSU)', 'Winona'],
    popularVenues: ['Life Time Fitness', 'Anytime Fitness', 'LA Fitness', 'YMCA of the Greater Twin Cities', 'Snap Fitness'],
    majorHighways: ['I-35', 'I-94', 'I-90', 'US-169'],
    stateParkSystems: ['Voyageurs National Park', 'Itasca State Park', 'Gooseberry Falls State Park'],
    regulations: 'Minnesota Rules Chapter 4717 governs public swimming pools.',
    climateNote: 'Extreme winters with subzero temperatures. Short, warm summers. 10,000 lakes provide seasonal facilities.',
    seasonalEvents: ['State Fair (August-September)', 'Ice fishing season', 'Summer lake season', 'Fall colors'],
  localContext: 'Minnesota originated Life Time Fitness and Anytime Fitness, creating a strong gym culture. The state\'s 11,842 lakes mean most communities have seasonal lake facilities. Minneapolis park system is consistently rated best in nation with year-round facilities. Skyway system in Twin Cities connects many fitness facilities for winter access. Mayo Clinic brings medical tourists to Rochester needing accessible facilities. Boundary Waters area has primitive facilities for wilderness enthusiasts. Mall of America area caters to tourists with day-pass options. Somali and Hmong communities have influenced facility offerings in Twin Cities. Winter forces creativity - some facilities offer "sauna to ice plunge" experiences.',
    priceRange: { low: 0, high: 28 },
    commonFacilities: ['Fitness centers', 'YMCAs', 'Lake facilities', 'Recreation centers', 'Community centers']
  },
  
  'mississippi': {
    name: 'Mississippi',
    code: 'MS',
    majorCities: ['Jackson', 'Gulfport', 'Hattiesburg', 'Biloxi', 'Meridian'],
    universityTowns: ['Oxford (Ole Miss)', 'Starkville (MSU)', 'Hattiesburg (USM)'],
    popularVenues: ['Courthouse Racquet & Fitness', 'Planet Fitness', 'Anytime Fitness', 'YMCA locations'],
    majorHighways: ['I-55', 'I-20', 'I-59', 'I-10'],
    stateParkSystems: ['Gulf Islands National Seashore', 'Tishomingo State Park', 'Percy Quin State Park'],
    regulations: 'Mississippi State Department of Health regulations govern public swimming pools.',
    climateNote: 'Hot, humid subtropical climate. Hurricane risk on coast. Long summer season.',
    seasonalEvents: ['Beach season (April-October)', 'College football (Fall)', 'Blues festivals', 'Hurricane season'],
  localContext: 'Mississippi Gulf Coast casinos provide spa/fitness facilities accessible to non-guests for day fees. Hurricane Katrina\'s effects still visible in coastal facility infrastructure. Delta region has fewest options with some counties having no public facilities. Oxford\'s literary tourism and Ole Miss create unusual demand patterns. SEC football Saturdays completely transform university towns. Racial history affects facility access and development patterns. Many rural communities depend entirely on school facilities. Poverty levels mean cost is significant barrier even at low-price facilities. Casino workers on coast have negotiated facility access at some properties.',
    priceRange: { low: 0, high: 18 },
    commonFacilities: ['Beach facilities', 'State parks', 'University gyms', 'Community centers', 'Truck stops']
  },
  
  'missouri': {
    name: 'Missouri',
    code: 'MO',
    majorCities: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence'],
    universityTowns: ['Columbia (Mizzou)', 'Rolla (S&T)', 'Springfield (MSU)', 'St. Louis (WashU)'],
    popularVenues: ['Club Fitness', 'Planet Fitness', 'Anytime Fitness', 'YMCA locations', 'The Lodge Des Peres'],
    majorHighways: ['I-70', 'I-44', 'I-55', 'I-35', 'I-29'],
    stateParkSystems: ['Lake of the Ozarks State Park', 'Bennett Spring State Park', 'Meramec State Park'],
    regulations: 'Missouri Code of State Regulations 19 CSR 20-20.010 governs public swimming pools.',
    climateNote: 'Continental climate with hot summers and cold winters. Tornado season in spring.',
    seasonalEvents: ['Lake of the Ozarks season (May-September)', 'State Fair (August)', 'Cardinals baseball', 'Chiefs football'],
  localContext: 'Lake of the Ozarks creates massive seasonal demand with numerous marinas offering shower facilities to boaters. St. Louis\'s free Forest Park facilities serve as national model for public access. Kansas City\'s sprawl means facilities cluster in suburbs rather than urban core. Branson\'s entertainment tourism supports numerous hotel day-pass options. University of Missouri\'s SEC membership changed Columbia\'s facility landscape. Ozark mountain culture maintains suspicion of "fancy" fitness facilities. St. Louis\'s unique high school question ("Where did you go to school?") extends to gym loyalties. Arch grounds redevelopment improved downtown St. Louis facility access.',
    priceRange: { low: 0, high: 22 },
    commonFacilities: ['Lake facilities', 'Recreation centers', 'YMCAs', 'University facilities', 'Truck stops']
  },
  
  'montana': {
    name: 'Montana',
    code: 'MT',
    majorCities: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Helena'],
    universityTowns: ['Missoula (U of M)', 'Bozeman (MSU)', 'Dillon', 'Havre'],
    popularVenues: ['The Ridge Athletic Club', 'Anytime Fitness', 'Planet Fitness', 'YMCA locations'],
    majorHighways: ['I-90', 'I-94', 'I-15', 'US-93'],
    stateParkSystems: ['Glacier National Park', 'Yellowstone (partial)', 'Flathead Lake State Park'],
    regulations: 'Montana Administrative Rules 17.38.201 governs public swimming pools.',
    climateNote: 'Continental climate with cold winters. Short summer season. Mountain weather varies by elevation.',
    seasonalEvents: ['Ski season (November-April)', 'Summer tourism (June-August)', 'Hunting season (Fall)'],
  localContext: 'Montana\'s vast distances (147,000 sq miles, 1 million people) mean some residents drive 100+ miles to facilities. Bozeman\'s tech boom has brought upscale fitness options uncommon elsewhere in state. Natural hot springs dot the state with 20+ commercial and dozens of primitive sites. Yellowstone and Glacier tourism creates seasonal facility demand. Native American reservations have limited facilities, often just tribal schools. Oil boom in Bakken region stressed Williston-area facilities. Ranch culture means many rural residents have never used public facilities. Winter road closures can isolate communities for weeks. "Shoulder season" (April-May, October-November) sees many facilities closed.',
    priceRange: { low: 0, high: 22 },
    commonFacilities: ['Hot springs', 'Recreation centers', 'Ski resorts', 'University facilities', 'Fitness centers']
  },
  
  'nebraska': {
    name: 'Nebraska',
    code: 'NE',
    majorCities: ['Omaha', 'Lincoln', 'Grand Island', 'Kearney', 'Fremont'],
    universityTowns: ['Lincoln (UNL)', 'Kearney (UNK)', 'Wayne', 'Chadron'],
    popularVenues: ['Genesis Health Clubs', 'Planet Fitness', 'Anytime Fitness', 'YMCA locations'],
    majorHighways: ['I-80', 'I-29', 'US-275', 'US-77'],
    stateParkSystems: ['Eugene T. Mahoney State Park', 'Chadron State Park', 'Lake McConaughy'],
    regulations: 'Nebraska Administrative Code Title 178 Chapter 5 governs swimming pools.',
    climateNote: 'Continental climate with hot summers and cold winters. Tornado season in spring.',
    seasonalEvents: ['College World Series (June)', 'State Fair (August-September)', 'Cornhusker football (Fall)'],
  localContext: 'Nebraska football Saturdays make Lincoln the state\'s third-largest city, overwhelming all facilities. Omaha\'s insurance industry headquarters support extensive corporate fitness options. I-80 corridor has some of the nation\'s cleanest truck stops due to competition. Rural counties may have only a single school facility serving multiple communities. College World Series brings 300,000+ visitors to Omaha each June. Agricultural economy means seasonal worker populations with limited access. Sandhills region has vast areas with no facilities. Warren Buffett\'s influence keeps some Omaha facilities surprisingly affordable. Kearney\'s position on crane migration route brings unique seasonal eco-tourism demand.',
    priceRange: { low: 0, high: 20 },
    commonFacilities: ['Truck stops', 'University facilities', 'YMCAs', 'Recreation centers', 'Community centers']
  },
  
  'nevada': {
    name: 'Nevada',
    code: 'NV',
    majorCities: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
    universityTowns: ['Reno (UNR)', 'Las Vegas (UNLV)'],
    popularVenues: ['Las Vegas Athletic Clubs', 'EōS Fitness', 'Planet Fitness', 'Life Time Fitness'],
    majorHighways: ['I-15', 'I-80', 'US-95', 'US-93'],
    stateParkSystems: ['Valley of Fire State Park', 'Lake Tahoe Nevada State Park', 'Red Rock Canyon'],
    regulations: 'Nevada Administrative Code Chapter 444 governs public bathing places.',
    climateNote: 'Desert climate with extreme summer heat. Mild winters. Lake Tahoe area has winter snow.',
    seasonalEvents: ['Convention season (year-round)', 'EDC (May)', 'Pool season (March-October)', 'Burning Man (August)'],
  localContext: 'Las Vegas operates 24/7 with gyms and spas following suit - true round-the-clock access. Casino employees get facility access at major properties as employment benefit. Pool day passes at Strip hotels range from $25-75+ depending on DJ/event. Burning Man preparation creates unusual demand for shower facilities in Reno area. Local\'s casinos offer much cheaper facility access than Strip properties. Nevada\'s legalized prostitution means some rural facilities have unusual policies. Military presence (Nellis AFB, NAS Fallon) influences facility development. Water conservation measures affect shower timer systems throughout state. Downtown Las Vegas renovation has brought new boutique fitness options.',
    priceRange: { low: 0, high: 40 },
    commonFacilities: ['Casino/hotel facilities', 'Fitness centers', 'Recreation centers', 'Truck stops', 'Day spas']
  },
  
  'new-hampshire': {
    name: 'New Hampshire',
    code: 'NH',
    majorCities: ['Manchester', 'Nashua', 'Concord', 'Portsmouth', 'Dover'],
    universityTowns: ['Durham (UNH)', 'Hanover (Dartmouth)', 'Plymouth', 'Keene'],
    popularVenues: ['Planet Fitness', 'Anytime Fitness', 'Executive Health & Sports Center', 'YMCA locations'],
    majorHighways: ['I-93', 'I-89', 'I-95', 'US-3'],
    stateParkSystems: ['White Mountain National Forest', 'Hampton Beach State Park', 'Franconia Notch State Park'],
    regulations: 'New Hampshire Code of Administrative Rules Env-Wq 1100 governs public swimming pools.',
    climateNote: 'Four distinct seasons. Cold, snowy winters. Short beach season. Mountain weather varies.',
    seasonalEvents: ['Ski season (December-March)', 'Fall foliage (September-October)', 'Lake season (June-August)', 'Motorcycle Week (June)'],
  localContext: 'New Hampshire\'s "Live Free or Die" motto extends to minimal facility regulations. White Mountains draw hikers needing facilities after multi-day trips. Lakes Region has 273 lakes with varying levels of public access. Massachusetts residents fleeing taxes use NH facilities while shopping. Ski areas struggle with providing affordable facilities for seasonal workers. Portsmouth\'s seacoast area has limited beach facilities due to cold water. Dartmouth\'s influence makes Hanover facilities more expensive than surrounding areas. State\'s frugal culture means many facilities are basic but functional. Presidential Primary season brings temporary demand spikes to small towns.',
    priceRange: { low: 0, high: 25 },
    commonFacilities: ['Ski resorts', 'Lake facilities', 'YMCAs', 'Recreation centers', 'State parks']
  },
  
  'new-jersey': {
    name: 'New Jersey',
    code: 'NJ',
    majorCities: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Trenton', 'Atlantic City'],
    universityTowns: ['New Brunswick (Rutgers)', 'Princeton', 'Newark (NJIT)', 'Hoboken (Stevens)'],
    popularVenues: ['LA Fitness', 'Planet Fitness', 'Retro Fitness', 'Edge Fitness', 'YMCA locations'],
    majorHighways: ['I-95', 'I-80', 'I-78', 'I-287', 'Garden State Parkway', 'NJ Turnpike'],
    stateParkSystems: ['Island Beach State Park', 'Liberty State Park', 'High Point State Park'],
    regulations: 'N.J.A.C. 8:26 Public Recreational Bathing Code governs swimming facilities.',
    climateNote: 'Four seasons with hot, humid summers. Beach season May-September. Winter snow varies by region.',
    seasonalEvents: ['Shore season (Memorial Day-Labor Day)', 'Atlantic City events', 'Fall foliage', 'College seasons'],
  localContext: 'Jersey Shore culture includes 130 miles of beaches with most towns charging beach badges ($5-15/day) that include shower access. "Bennies" (tourists) versus locals tension affects facility access and pricing. Atlantic City casinos offer day passes to pool/spa facilities. NYC commuters use NJ gyms near train stations for better prices. Property taxes (highest in nation) fund excellent municipal recreation centers. Taylor Ham vs. Pork Roll divide extends to North/South facility preferences. Urban areas like Newark and Camden struggle with facility maintenance. Princeton area has premium facilities serving pharmaceutical executives.',
    priceRange: { low: 0, high: 30 },
    commonFacilities: ['Beach showers', 'Fitness centers', 'YMCAs', 'Recreation centers', 'Casino facilities']
  },
  
  'new-mexico': {
    name: 'New Mexico',
    code: 'NM',
    majorCities: ['Albuquerque', 'Las Cruces', 'Santa Fe', 'Rio Rancho', 'Roswell'],
    universityTowns: ['Albuquerque (UNM)', 'Las Cruces (NMSU)', 'Portales (ENMU)'],
    popularVenues: ['Defined Fitness', 'Planet Fitness', 'Anytime Fitness', 'Chuze Fitness', 'YMCA locations'],
    majorHighways: ['I-25', 'I-40', 'I-10', 'US-285'],
    stateParkSystems: ['White Sands National Park', 'Carlsbad Caverns', 'Elephant Butte Lake State Park'],
    regulations: 'New Mexico Administrative Code 7.18.2 governs public swimming pools.',
    climateNote: 'High desert climate with hot summers and mild winters. Significant elevation changes affect temperature.',
    seasonalEvents: ['Balloon Fiesta (October)', 'Ski season (December-March)', 'Art markets', 'Chile season (Fall)'],
  localContext: 'New Mexico has numerous natural hot springs, from developed resorts (Ojo Caliente, Ten Thousand Waves) to primitive roadside pools. Native American pueblos generally don\'t allow non-tribal access to facilities. Santa Fe\'s art scene supports high-end spa facilities beyond typical gym offerings. Military presence (Los Alamos, White Sands, Kirtland AFB) creates security restrictions. Border proximity means some facilities serve international clientele. High altitude (Santa Fe at 7,000 feet) affects visitor stamina at facilities. Rural areas between Albuquerque and El Paso have 50+ mile gaps in facilities. Breaking Bad tourism has oddly increased demand for Albuquerque facilities.',
    priceRange: { low: 0, high: 22 },
    commonFacilities: ['Hot springs', 'Recreation centers', 'Fitness centers', 'State parks', 'Truck stops']
  },
  
  'new-york': {
    name: 'New York',
    code: 'NY',
    majorCities: ['New York City', 'Buffalo', 'Rochester', 'Syracuse', 'Albany', 'Yonkers'],
    universityTowns: ['Ithaca (Cornell)', 'Syracuse', 'Binghamton', 'New Paltz', 'Geneseo'],
    popularVenues: ['Equinox', 'Planet Fitness', 'New York Sports Clubs', 'Blink Fitness', 'YMCA locations'],
    majorHighways: ['I-87', 'I-90', 'I-95', 'I-84', 'I-81'],
    stateParkSystems: ['Niagara Falls State Park', 'Jones Beach State Park', 'Adirondack Park'],
    regulations: 'New York State Sanitary Code Part 6 governs swimming pools.',
    climateNote: 'Varied climate by region. NYC moderate, Upstate has cold winters. Beach season limited to summer.',
    seasonalEvents: ['NYC summer events', 'Fall foliage', 'Ski season (December-March)', 'Beach season (June-August)'],
  localContext: 'NYC has 500+ fitness facilities but Manhattan prices can exceed $300/month. City recreation centers offer $150/year memberships for residents. Long Island beaches have extensive facilities but parking fees can reach $50/day. Adirondack Park (6 million acres) has scattered facilities mainly at campgrounds. Buffalo\'s proximity to Niagara Falls creates unique tourist facility demand. Finger Lakes wine tourism has spawned spa facilities at many wineries. Orthodox Jewish communities in Brooklyn have gender-separated facility requirements. Hamptons facilities become exclusive clubs Memorial Day through Labor Day. Upstate struggles with maintaining facilities through harsh winters.',    priceRange: { low: 0, high: 40 },
    commonFacilities: ['Recreation centers', 'Beach facilities', 'YMCAs', 'Premium gyms', 'State parks']
  },
  
  'north-carolina': {
    name: 'North Carolina',
    code: 'NC',
    majorCities: ['Charlotte', 'Raleigh', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary'],
    universityTowns: ['Chapel Hill (UNC)', 'Durham (Duke)', 'Raleigh (NC State)', 'Boone (App State)'],
    popularVenues: ['YMCA locations', 'O2 Fitness', 'Planet Fitness', 'Anytime Fitness', 'Gold\'s Gym'],
    majorHighways: ['I-95', 'I-85', 'I-40', 'I-77', 'I-26'],
    stateParkSystems: ['Great Smoky Mountains National Park', 'Cape Hatteras National Seashore', 'Blue Ridge Parkway'],
    regulations: 'North Carolina Administrative Code Title 15A Chapter 18A governs public swimming pools.',
    climateNote: 'Varied climate from mountains to coast. Humid summers, mild winters. Hurricane risk on coast.',
    seasonalEvents: ['Beach season (May-September)', 'Mountain tourism (Fall)', 'College basketball season', 'NASCAR races'],
  localContext: 'North Carolina\'s 300-mile coastline from Outer Banks to Calabash provides extensive beach shower facilities. Research Triangle (Raleigh-Durham-Chapel Hill) has premium facilities serving tech and pharma workers. Asheville\'s wellness culture supports numerous alternative facilities including communal bathhouses. Great Smoky Mountains National Park visitors strain Gatlinburg/Cherokee facilities. Military bases (Fort Bragg, Camp Lejeune) restrict access but influence surrounding civilian facilities. Charlotte\'s banking center has corporate gyms in most towers. NASCAR race weekends completely overwhelm facilities near tracks. Mountain communities often rely on seasonal tourism facilities that close in winter. Hurricane evacuations from coast stress inland facilities.',    priceRange: { low: 0, high: 25 },
    commonFacilities: ['Beach facilities', 'Mountain resorts', 'YMCAs', 'University facilities', 'Recreation centers']
  },
  
  'north-dakota': {
    name: 'North Dakota',
    code: 'ND',
    majorCities: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'Williston'],
    universityTowns: ['Grand Forks (UND)', 'Fargo (NDSU)', 'Dickinson', 'Minot'],
    popularVenues: ['Courts Plus', 'Family Wellness', 'Anytime Fitness', 'YMCA locations'],
    majorHighways: ['I-94', 'I-29', 'US-2', 'US-83'],
    stateParkSystems: ['Theodore Roosevelt National Park', 'Lake Sakakawea State Park', 'Fort Abraham Lincoln State Park'],
    regulations: 'North Dakota Administrative Code Article 33-29 governs public swimming pools.',
    climateNote: 'Continental climate with very cold winters and warm summers. Short outdoor season.',
    seasonalEvents: ['State Fair (July)', 'Oil boom activity', 'Winter sports season', 'Summer lake season'],
  localContext: 'North Dakota\'s oil boom (Bakken formation) transformed small towns with man camps requiring shower facilities. Brutal winters (-40°F) mean many outdoor facilities are unusable 6 months/year. Fargo-Moorhead area shares facilities with Minnesota across the Red River. Native American reservations (Spirit Lake, Standing Rock) have limited facilities often centered at tribal colleges. Agricultural areas see seasonal demand from harvest workers. Some towns are 100+ miles from nearest public facility. Norwegian heritage influences sauna culture in some communities. Missouri River recreation areas provide seasonal facilities. Population density (11 people/sq mile) makes facility sustainability challenging.',    priceRange: { low: 0, high: 20 },
    commonFacilities: ['Community centers', 'Truck stops', 'YMCAs', 'University facilities', 'Recreation centers']
  },
  
  'ohio': {
    name: 'Ohio',
    code: 'OH',
    majorCities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton'],
    universityTowns: ['Columbus (OSU)', 'Athens (Ohio U)', 'Oxford (Miami)', 'Bowling Green', 'Kent'],
    popularVenues: ['Planet Fitness', 'Anytime Fitness', 'LA Fitness', 'Lifetime Fitness', 'YMCA locations'],
    majorHighways: ['I-70', 'I-71', 'I-75', 'I-77', 'I-80', 'I-90'],
    stateParkSystems: ['Hocking Hills State Park', 'Lake Erie State Parks', 'Cuyahoga Valley National Park'],
    regulations: 'Ohio Administrative Code Chapter 3701-31 governs public swimming pools.',
    climateNote: 'Four seasons with cold winters and humid summers. Lake Erie moderates northern climate.',
    seasonalEvents: ['State Fair (July-August)', 'College football (Fall)', 'Cedar Point season (May-October)', 'Lake Erie summer'],
  localContext: 'Ohio\'s rust belt cities have aging infrastructure with many pools/facilities built in the 1960s-70s needing updates. Columbus growth has brought modern facilities while Cleveland and Cincinnati struggle with maintenance budgets. Lake Erie provides 312 miles of shoreline with beach facilities concentrated near population centers. Amish country (Holmes County) has virtually no public facilities. Ohio State football Saturdays make Columbus the third-largest city in Ohio, straining all facilities. Cedar Point amusement park area has seasonal facilities catering to tourists. Cuyahoga Valley National Park provides limited facilities along towpath trail. Health-conscious culture weaker than coasts, affecting facility demand.',
    priceRange: { low: 0, high: 25 },
    commonFacilities: ['Recreation centers', 'YMCAs', 'Fitness centers', 'Lake facilities', 'University facilities']
  },
  
  'oklahoma': {
    name: 'Oklahoma',
    code: 'OK',
    majorCities: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Edmond'],
    universityTowns: ['Norman (OU)', 'Stillwater (OSU)', 'Ada (ECU)', 'Weatherford (SWOSU)'],
    popularVenues: ['Lifetime Fitness', 'Planet Fitness', 'Gold\'s Gym', 'YMCA locations', 'Love\'s Travel Stops'],
    majorHighways: ['I-35', 'I-40', 'I-44', 'US-69'],
    stateParkSystems: ['Lake Murray State Park', 'Robbers Cave State Park', 'Natural Falls State Park'],
    regulations: 'Oklahoma Administrative Code Title 310 Chapter 215 governs public bathing places.',
    climateNote: 'Variable climate with hot summers and mild winters. Tornado season April-June.',
    seasonalEvents: ['State Fair (September)', 'College football (Fall)', 'Tornado season', 'Lake season (May-September)'],
  localContext: 'Oklahoma\'s 400+ miles of Route 66 heritage creates nostalgic truck stop culture with excellent facilities. Lake culture (200+ lakes) means most facilities are seasonal May-September. Native American population (9% of state) has limited facilities on tribal lands, though some casinos offer public access. Tornado damage regularly destroys community facilities requiring rebuilding. Oil field workers in western Oklahoma rely heavily on truck stops. University towns (Norman, Stillwater) see dramatic population swings on game days. Medical marijuana licenses have created unexpected facility demand patterns. Churches often provide shower facilities during disaster relief. Braum\'s ice cream stores oddly serve as community gathering points near facilities.',
    priceRange: { low: 0, high: 20 },
    commonFacilities: ['Lake facilities', 'Truck stops', 'YMCAs', 'Recreation centers', 'University gyms']
  },
  
  'oregon': {
    name: 'Oregon',
    code: 'OR',
    majorCities: ['Portland', 'Salem', 'Eugene', 'Bend', 'Medford', 'Beaverton'],
    universityTowns: ['Eugene (U of O)', 'Corvallis (OSU)', 'La Grande (EOU)', 'Ashland (SOU)'],
    popularVenues: ['24 Hour Fitness', 'Planet Fitness', 'LA Fitness', 'Portland Parks & Recreation', 'YMCA locations'],
    majorHighways: ['I-5', 'I-84', 'US-101', 'US-97'],
    stateParkSystems: ['Crater Lake National Park', 'Silver Falls State Park', 'Cannon Beach', 'Smith Rock State Park'],
    regulations: 'Oregon Administrative Rules Chapter 333 Division 60 governs public swimming pools.',
    climateNote: 'Mild, wet winters on coast. Dry summers inland. Mountain areas have snow. Beach water stays cold year-round.',
    seasonalEvents: ['Summer festival season', 'Ski season (December-March)', 'Wine harvest (Fall)', 'Beach season (July-September)'],
  localContext: 'Oregon\'s outdoors-obsessed culture means extensive facilities even in small towns. Portland has 50+ community centers with shower access, many offering "shower only" rates. Coast beaches provide rinse stations but Pacific water stays cold (50-60°F) year-round. Homeless population has led to innovative programs like mobile shower units. Bend area serves as base for Cascade adventures with facilities catering to van-lifers. Crater Lake and Mount Hood create seasonal tourist demand. Cannabis tourism adds unexpected facility users. Environmental consciousness means many facilities use gray water systems. Rural eastern Oregon has vast areas without facilities.',
      priceRange: { low: 0, high: 28 },
    commonFacilities: ['Recreation centers', 'Hot springs', 'Beach facilities', 'Fitness centers', 'University facilities']
  },
  
  'pennsylvania': {
    name: 'Pennsylvania',
    code: 'PA',
    majorCities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Harrisburg'],
    universityTowns: ['State College (Penn State)', 'Philadelphia (Penn, Temple)', 'Pittsburgh (Pitt, CMU)'],
    popularVenues: ['Planet Fitness', 'LA Fitness', 'Crunch Fitness', 'YMCA locations', 'JCC facilities'],
    majorHighways: ['I-76', 'I-80', 'I-81', 'I-95', 'I-70'],
    stateParkSystems: ['Presque Isle State Park', 'Ohiopyle State Park', 'Ricketts Glen State Park'],
    regulations: 'Pennsylvania Code Title 28 Chapter 18 governs public bathing places.',
    climateNote: 'Four seasons with cold winters and humid summers. Lake Erie beaches in northwest.',
    seasonalEvents: ['Summer shore season', 'Fall foliage', 'Penn State football (Fall)', 'Ski season (December-March)'],
  localContext: 'Pennsylvania\'s coal and steel heritage left many communities with grand but aging facilities needing updates. Philadelphia has 150+ public pools and rec centers, though budget constraints affect maintenance. Pittsburgh\'s hilly terrain creates neighborhood isolation affecting facility access. Pocono Mountains resorts offer day passes primarily for skiing/waterpark visitors. Penn State becomes Pennsylvania\'s third-largest city on football weekends. Lancaster County\'s Plain communities don\'t use public facilities. Hersheypark area has tourist-focused options. Delaware Water Gap provides seasonal facilities. Presque Isle State Park offers Great Lakes beach access. Appalachian Trail through-hikers create seasonal demand.',
    priceRange: { low: 0, high: 28 },
    commonFacilities: ['YMCAs', 'Recreation centers', 'University facilities', 'State parks', 'Fitness centers']
  },
  
  'rhode-island': {
    name: 'Rhode Island',
    code: 'RI',
    majorCities: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'Newport'],
    universityTowns: ['Providence (Brown, RISD)', 'Kingston (URI)', 'Newport (Salve Regina)'],
    popularVenues: ['Planet Fitness', 'Edge Fitness', 'YMCA locations', 'JCC of Rhode Island'],
    majorHighways: ['I-95', 'I-195', 'Route 6', 'Route 1'],
    stateParkSystems: ['Misquamicut State Beach', 'Scarborough State Beach', 'Roger Williams Park'],
    regulations: 'Rhode Island General Laws Title 23 Chapter 23-20 governs public swimming facilities.',
    climateNote: 'Ocean State with moderate climate. Beach season May-September. Cold winters.',
    seasonalEvents: ['Beach season (Memorial Day-Labor Day)', 'Newport events', 'College seasons', 'WaterFire Providence'],
  localContext: 'Rhode Island\'s small size (48x37 miles) means everything is accessible within an hour. Newport\'s Gilded Age mansions contrast with accessible public beaches. Providence universities create September demand surge. Block Island ferry creates unique access patterns for facilities. Narragansett Bay beaches provide extensive shower stations. Italian-American heritage influences facility culture in Federal Hill area. Seasonal population swings (850K winter to 1.2M summer) affect availability. Many facilities close or reduce hours October-April. Warwick mall area serves as central facility hub. Portuguese communities in East Providence have distinct facility preferences.',
    priceRange: { low: 0, high: 25 },
    commonFacilities: ['Beach facilities', 'YMCAs', 'Fitness centers', 'State beaches', 'Recreation centers']
  },
  
  'south-carolina': {
    name: 'South Carolina',
    code: 'SC',
    majorCities: ['Charleston', 'Columbia', 'Greenville', 'Rock Hill', 'Myrtle Beach'],
    universityTowns: ['Columbia (USC)', 'Clemson', 'Charleston (C of C)', 'Spartanburg (Wofford)'],
    popularVenues: ['Planet Fitness', 'Gold\'s Gym', 'O2 Fitness', 'YMCA locations', 'Caine Halter YMCA'],
    majorHighways: ['I-95', 'I-85', 'I-26', 'I-20', 'I-77'],
    stateParkSystems: ['Myrtle Beach State Park', 'Hunting Island State Park', 'Table Rock State Park'],
    regulations: 'South Carolina Code of Regulations 61-51 governs public swimming pools.',
    climateNote: 'Humid subtropical with hot summers. Hurricane risk on coast. Mild winters.',
    seasonalEvents: ['Beach season (April-October)', 'Golf season (year-round)', 'College football (Fall)', 'Spring break (March)'],
  localContext: 'South Carolina\'s Grand Strand (60-mile beach stretch) has shower facilities every few blocks from Myrtle Beach to Georgetown. Charleston\'s historic district has limited facilities, pushing visitors to suburban gyms. Hilton Head and Kiawah Island cater to wealthy retirees with premium facilities. Columbia\'s brutal summer heat (100°F+) makes indoor facilities essential. Clemson football brings 80,000+ to a town of 17,000, overwhelming facilities. Gullah communities on sea islands maintain distinct cultural practices affecting facility use. Spring break and summer tourism can make coastal facilities inaccessible to locals. Many facilities still recovering from recent hurricane damages.',
    priceRange: { low: 0, high: 22 },
    commonFacilities: ['Beach facilities', 'Golf resorts', 'YMCAs', 'State parks', 'Recreation centers']
  },
  
  'south-dakota': {
    name: 'South Dakota',
    code: 'SD',
    majorCities: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown'],
    universityTowns: ['Brookings (SDSU)', 'Vermillion (USD)', 'Spearfish (BHSU)'],
    popularVenues: ['Avera McKennan Fitness', 'Anytime Fitness', 'Planet Fitness', 'YMCA locations'],
    majorHighways: ['I-90', 'I-29', 'US-14', 'US-83'],
    stateParkSystems: ['Badlands National Park', 'Custer State Park', 'Wind Cave National Park'],
    regulations: 'South Dakota Administrative Rules Article 44:01 governs public swimming pools.',
    climateNote: 'Continental climate with cold winters and hot summers. Black Hills have different weather patterns.',
    seasonalEvents: ['Sturgis Rally (August)', 'State Fair (September)', 'Summer tourism', 'Pheasant hunting (Fall)'],
  localContext: 'South Dakota\'s Sturgis Motorcycle Rally (500,000+ visitors) creates extreme temporary demand each August. Mount Rushmore tourism supports Black Hills facilities while east of Missouri River has limited options. Native American reservations (Pine Ridge, Rosebud) have severe facility shortages. Harsh winters (-30°F) close many facilities November-March. Pheasant hunting season brings temporary demand to rural areas. Wall Drug oddly serves as facility landmark for travelers. Some counties have no public facilities within 50+ miles. Seasonal workers at national parks struggle to find affordable shower access. Churches often provide only facilities in small towns.',
    priceRange: { low: 0, high: 18 },
    commonFacilities: ['Recreation centers', 'Hotels/motels', 'Truck stops', 'State parks', 'Community centers']
  },
  
  'tennessee': {
    name: 'Tennessee',
    code: 'TN',
    majorCities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'],
    universityTowns: ['Knoxville (UT)', 'Nashville (Vanderbilt)', 'Murfreesboro (MTSU)', 'Memphis (U of M)'],
    popularVenues: ['Planet Fitness', 'Anytime Fitness', 'YMCA locations', 'Love\'s Travel Stops', 'Gold\'s Gym'],
    majorHighways: ['I-40', 'I-65', 'I-75', 'I-24', 'I-81'],
    stateParkSystems: ['Great Smoky Mountains National Park', 'Fall Creek Falls State Park', 'Reelfoot Lake State Park'],
    regulations: 'Tennessee Department of Environment and Conservation Chapter 0400-23-01 governs public pools.',
    climateNote: 'Humid subtropical with hot summers and mild winters. Mountains have cooler temperatures.',
    seasonalEvents: ['CMA Fest (June)', 'Bonnaroo (June)', 'Football season (Fall)', 'Spring wildflowers (April-May)'],
  localContext: 'Tennessee\'s music tourism creates distinct patterns - Nashville\'s Broadway district gyms cater to musicians and tourists, Memphis Beale Street area has limited options. Great Smoky Mountains National Park (most visited in US) strains Gatlinburg/Pigeon Forge facilities. TVA lakes provide 50+ recreation areas with seasonal facilities. Truck stops along I-40 corridor serve as vital facilities for rural communities. Bonnaroo festival brings 80,000+ to tiny Manchester each June. Historically Black colleges (TSU, Fisk) in Nashville have community-accessible facilities. Appalachian communities in east maintain cultural wariness of public facilities. Dollywood area has surprising number of tourist-focused facilities.',
    priceRange: { low: 0, high: 22 },
    commonFacilities: ['Truck stops', 'YMCAs', 'Recreation centers', 'State parks', 'University facilities']
  },
  
  'texas': {
    name: 'Texas',
    code: 'TX',
    majorCities: ['Houston', 'Dallas', 'San Antonio', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi'],
    universityTowns: ['Austin (UT)', 'College Station (A&M)', 'Lubbock (Tech)', 'Denton (UNT)', 'San Marcos (Texas State)'],
    popularVenues: ['LA Fitness', 'Planet Fitness', 'Gold\'s Gym', 'Life Time', 'Love\'s Travel Stops', 'Buc-ee\'s'],
    majorHighways: ['I-10', 'I-35', 'I-45', 'I-20', 'I-30', 'I-40'],
    stateParkSystems: ['Big Bend National Park', 'Padre Island National Seashore', 'Garner State Park', 'Palo Duro Canyon'],
    regulations: 'Texas Administrative Code Title 25 Part 1 Chapter 265 governs public swimming pools and spas.',
    climateNote: 'Hot summers statewide with temperatures over 100°F common. Coastal humidity year-round. Mild winters except Panhandle.',
    seasonalEvents: ['SXSW (March)', 'Spring break (March)', 'Summer vacation (June-August)', 'State Fair (September-October)', 'ACL Fest (October)'],
  localContext: 'Texas leads the nation in truck stop facilities with Buc-ee\'s setting the gold standard (60+ pumps, dozens of shower stalls). Austin\'s tech boom created premium fitness culture contrasting with traditional Texas gym chains. Houston\'s sprawl means facilities cluster in suburbs with downtown having fewer options. Border towns (El Paso, Laredo, Brownsville) serve international travelers with bilingual facilities. Oil field workers in Permian Basin rely on man camps and truck stops. South Padre Island spring break brings temporary facilities for 100,000+ students. German heritage in Hill Country influences facility culture (New Braunfels, Fredericksburg). Hurricane Harvey recovery still affecting Houston-area facility infrastructure. Friday night football culture means many schools open facilities to community.',
    priceRange: { low: 0, high: 25 },
    commonFacilities: ['Truck stops', 'Fitness centers', 'Municipal pools', 'Recreation centers', 'University facilities', 'Beach showers']
  },
  
  'utah': {
    name: 'Utah',
    code: 'UT',
    majorCities: ['Salt Lake City', 'Provo', 'St. George', 'Ogden', 'Sandy', 'Park City'],
    universityTowns: ['Provo (BYU)', 'Salt Lake City (U of U)', 'Logan (USU)', 'Cedar City (SUU)'],
    popularVenues: ['VASA Fitness', 'Planet Fitness', 'EōS Fitness', 'Lifetime Fitness', 'Park City Recreation'],
    majorHighways: ['I-15', 'I-80', 'I-70', 'I-84', 'US-89'],
    stateParkSystems: ['Zion National Park', 'Arches National Park', 'Antelope Island State Park', 'Wasatch Mountain State Park'],
    regulations: 'Utah Administrative Code R392-302 governs public swimming pools.',
    climateNote: 'Desert climate with hot, dry summers and cold winters. Mountain areas receive heavy snow. High elevation affects visitors.',
    seasonalEvents: ['Ski season (November-April)', 'Sundance Film Festival (January)', 'National park season (April-October)', 'Pioneer Day (July 24)'],
  localContext: 'Utah\'s "Mighty Five" national parks create seasonal tourist demand with limited facilities in remote areas. Salt Lake City\'s LDS influence means many facilities close Sundays and have family-focused policies. Park City and Alta ski resorts cater to wealthy tourists with premium facilities ($30+ day passes). VASA Fitness originated here, creating competitive gym market. Lake Powell houseboating culture includes marina shower facilities. Silicon Slopes tech boom in Lehi/Draper brings premium fitness options. BYU\'s Honor Code influences Provo-area facility policies. Desert areas require travelers to plan carefully as facilities can be 100+ miles apart. Polygamous communities in southern Utah generally avoid public facilities.',
    priceRange: { low: 0, high: 28 },
    commonFacilities: ['Recreation centers', 'Ski resorts', 'Fitness centers', 'Hot springs', 'National park facilities']
  },
  
  'vermont': {
    name: 'Vermont',
    code: 'VT',
    majorCities: ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier'],
    universityTowns: ['Burlington (UVM)', 'Middlebury', 'Northfield (Norwich)', 'Castleton'],
    popularVenues: ['Edge Sports & Fitness', 'Planet Fitness', 'YMCA locations', 'The Gym VT'],
    majorHighways: ['I-89', 'I-91', 'US-7', 'US-4'],
    stateParkSystems: ['Green Mountain National Forest', 'Quechee State Park', 'Lake Champlain beaches'],
    regulations: 'Vermont Department of Health regulations govern public swimming pools.',
    climateNote: 'Cold winters with significant snowfall. Short, mild summers. Mud season in spring affects travel.',
    seasonalEvents: ['Ski season (December-March)', 'Fall foliage (September-October)', 'Maple syrup season (March-April)', 'Summer lake season'],
  localContext: 'Vermont\'s 251 towns include many with fewer than 1,000 residents and no facilities. Ski resorts (Stowe, Killington) provide year-round facilities but at premium prices. Burlington\'s progressive culture supports co-op and community-run facilities. Maple syrup season (March-April) brings agritourism demand. Long Trail and Appalachian Trail hikers need facilities after multi-day treks. Quarry swimming holes provide natural alternatives to facilities. Harsh winters and mud season isolate communities, making facilities inaccessible. New England frugality means facilities are basic but well-maintained. Second-home owners from Boston/NYC influence facility development in southern Vermont.',
    priceRange: { low: 0, high: 25 },
    commonFacilities: ['Ski resorts', 'YMCAs', 'Recreation centers', 'Lake facilities', 'Community centers']
  },
  
  'virginia': {
    name: 'Virginia',
    code: 'VA',
    majorCities: ['Virginia Beach', 'Norfolk', 'Richmond', 'Arlington', 'Alexandria', 'Newport News'],
    universityTowns: ['Charlottesville (UVA)', 'Blacksburg (Virginia Tech)', 'Williamsburg (W&M)', 'Harrisonburg (JMU)'],
    popularVenues: ['Gold\'s Gym', 'Planet Fitness', 'Anytime Fitness', 'ACAC Fitness', 'YMCA locations'],
    majorHighways: ['I-95', 'I-64', 'I-81', 'I-77', 'I-66'],
    stateParkSystems: ['Shenandoah National Park', 'Virginia Beach oceanfront', 'First Landing State Park', 'Smith Mountain Lake'],
    regulations: 'Virginia Administrative Code 12VAC5-460 governs swimming pools and recreational water facilities.',
    climateNote: 'Varied climate from mountains to coast. Hot, humid summers. Mild winters except in mountains.',
    seasonalEvents: ['Beach season (May-September)', 'College football (Fall)', 'Blue Ridge Parkway season', 'Military events year-round'],
  localContext: 'Virginia Beach\'s 38 miles of beaches provide the state\'s most extensive shower facilities. Northern Virginia\'s federal workforce supports premium fitness chains with security clearance considerations affecting some facilities. Norfolk/Hampton Roads military presence (world\'s largest naval base) creates unique demand patterns with deployment schedules. Shenandoah National Park and Blue Ridge Parkway provide seasonal facilities along scenic routes. Richmond\'s Fan district and Carytown have boutique fitness options. University towns see dramatic population shifts (Blacksburg goes from 45,000 to 110,000 on game days). Colonial Williamsburg area balances tourist facilities with historical preservation. Appalachian Trail runs 544 miles through state creating hiker facility demand.',
    priceRange: { low: 0, high: 30 },
    commonFacilities: ['Beach facilities', 'Military base gyms', 'Recreation centers', 'YMCAs', 'University facilities']
  },
  
  'washington': {
    name: 'Washington',
    code: 'WA',
    majorCities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Everett'],
    universityTowns: ['Seattle (UW)', 'Pullman (WSU)', 'Bellingham (WWU)', 'Ellensburg (CWU)'],
    popularVenues: ['24 Hour Fitness', 'LA Fitness', 'Planet Fitness', 'Seattle Parks & Recreation', 'YMCA of Greater Seattle'],
    majorHighways: ['I-5', 'I-90', 'I-82', 'I-405', 'US-101'],
    stateParkSystems: ['Olympic National Park', 'Mount Rainier National Park', 'Deception Pass State Park', 'San Juan Islands'],
    regulations: 'Washington Administrative Code 246-260 governs water recreation facilities.',
    climateNote: 'Marine climate west of Cascades with mild, wet winters. Eastern Washington has continental climate. Mountain areas receive heavy snow.',
    seasonalEvents: ['Summer festival season', 'Ski season (December-March)', 'Salmon runs', 'Apple harvest (Fall)'],
  localContext: 'Washington\'s Seattle freeze (social phenomenon) extends to gym culture with less interaction than other regions. Tech workers at Microsoft, Amazon, and Boeing campuses have extensive on-site facilities. Puget Sound provides cold-water beaches with basic rinse stations. Eastern Washington\'s agricultural areas have seasonal worker populations needing facilities. San Juan Islands accessible only by ferry have limited options. Mount Rainier and North Cascades create hiker demand for facilities. Seattle\'s homeless crisis has led to innovative hygiene center programs. Recreational marijuana has created cannabis tourism affecting facility demand patterns. Rain (150+ days/year in Seattle) means indoor facilities essential.',
    priceRange: { low: 0, high: 35 },
    commonFacilities: ['Recreation centers', 'Corporate gyms', 'Hot springs', 'State parks', 'Fitness centers']
  },
  
  'west-virginia': {
    name: 'West Virginia',
    code: 'WV',
    majorCities: ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling'],
    universityTowns: ['Morgantown (WVU)', 'Huntington (Marshall)', 'Shepherdstown', 'Athens (Concord)'],
    popularVenues: ['Planet Fitness', 'Anytime Fitness', 'YMCA locations', 'HealthWorks Fitness'],
    majorHighways: ['I-64', 'I-77', 'I-79', 'I-68', 'I-70'],
    stateParkSystems: ['New River Gorge National Park', 'Blackwater Falls State Park', 'Stonewall Resort State Park'],
    regulations: 'West Virginia Code of State Rules Title 64 Series 19 governs public swimming pools.',
    climateNote: 'Mountain climate with cold winters and mild summers. High humidity in valleys. Variable weather by elevation.',
    seasonalEvents: ['White water season (April-October)', 'Ski season (December-March)', 'Fall foliage', 'Bridge Day (October)'],
  localContext: 'West Virginia\'s mountainous terrain isolates communities, with some facilities 50+ miles apart on winding roads. Coal mining heritage left many towns with deteriorating infrastructure and limited funds for facilities. New River Gorge National Park designation (2020) is increasing tourist facility demand. Chemical Valley (Charleston-Huntington) has industrial workforce needing facilities. Whitewater rafting companies provide seasonal facilities April-October. Poverty levels (highest in nation) make even low-cost facilities unaffordable for many. Greenbrier Resort offers day passes but at premium prices ($50+). Churches and community organizations often provide the only facilities in former coal towns. Opioid crisis has affected facility operations and safety protocols.',
    priceRange: { low: 0, high: 18 },
    commonFacilities: ['State park lodges', 'YMCAs', 'University facilities', 'Recreation centers', 'Hot springs']
  },
  
  'wisconsin': {
    name: 'Wisconsin',
    code: 'WI',
    majorCities: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine', 'Appleton'],
    universityTowns: ['Madison (UW-Madison)', 'Milwaukee (UWM)', 'La Crosse', 'Stevens Point', 'Eau Claire'],
    popularVenues: ['Anytime Fitness', 'Planet Fitness', 'Snap Fitness', 'YMCA locations', 'Wisconsin Athletic Club'],
    majorHighways: ['I-94', 'I-90', 'I-43', 'I-39', 'US-41'],
    stateParkSystems: ['Devil\'s Lake State Park', 'Peninsula State Park', 'Wisconsin Dells parks'],
    regulations: 'Wisconsin Administrative Code DHS 172 governs public swimming pools.',
    climateNote: 'Cold winters with heavy snow. Warm, humid summers. Great Lakes moderate coastal climate.',
    seasonalEvents: ['Summerfest (June-July)', 'State Fair (August)', 'Packers season (Fall-Winter)', 'Wisconsin Dells tourism'],
  localContext: 'Wisconsin Dells "Waterpark Capital" has more concentrated water facilities than anywhere globally. Milwaukee and Madison have strong Germanic heritage influencing facility culture (saunas, thermal experiences). Frozen winters mean indoor facilities essential - many outdoor pools covered and heated year-round. Packers game days make Green Bay inaccessible, with Lambeau Field area facilities overwhelmed. Door County peninsula tourist season (May-October) creates dramatic demand shifts. North Woods lake culture provides thousands of seasonal facilities at resorts. Milwaukee\'s brewing heritage influences gym locations near historic breweries. Ice fishing culture creates unique winter facility patterns. Dairy farming areas have limited facilities, often just school-based.',
    priceRange: { low: 0, high: 25 },
    commonFacilities: ['Water parks', 'YMCAs', 'Recreation centers', 'Lake facilities', 'University facilities']
  },
  
  'wyoming': {
    name: 'Wyoming',
    code: 'WY',
    majorCities: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs', 'Jackson'],
    universityTowns: ['Laramie (UW)', 'Powell (Northwest College)', 'Sheridan College'],
    popularVenues: ['Planet Fitness', 'Anytime Fitness', 'Recreation centers', 'Hot springs resorts'],
    majorHighways: ['I-80', 'I-25', 'I-90', 'US-287'],
    stateParkSystems: ['Yellowstone National Park', 'Grand Teton National Park', 'Hot Springs State Park'],
    regulations: 'Wyoming Department of Health Chapter 11 regulations govern public swimming pools.',
    climateNote: 'High elevation with cold winters and mild summers. Wind is constant. Snow October through May in mountains.',
    seasonalEvents: ['Cheyenne Frontier Days (July)', 'Ski season (November-April)', 'National park season (May-October)', 'Hunting season (Fall)'],
  localContext: 'Wyoming has the nation\'s lowest population (580,000) spread across 98,000 square miles, creating vast facility deserts. Jackson Hole\'s extreme wealth disparity shows in facilities - $40 day passes next to basic community options. Yellowstone and Grand Teton bring 5+ million annual visitors overwhelming gateway town facilities. Natural hot springs throughout state range from developed (Thermopolis, Saratoga) to primitive backcountry soaks. Energy industry (coal, oil, gas, wind) creates boom-bust cycles affecting facility sustainability. Ranching culture means many residents have never used public facilities. Winter road closures can isolate communities for weeks. Altitude (most of state above 6,000 feet) affects visitor stamina. Some counties have no public facilities whatsoever.',
    priceRange: { low: 0, high: 30 },
    commonFacilities: ['Hot springs', 'National park facilities', 'Recreation centers', 'Truck stops', 'Resort facilities']
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
    
    // Regional information
    sections.push(this.generateRegionalSection(state, stats));
    
    // Pricing and access
    sections.push(this.generatePricingSection(state, stats));
    
    // Regulations and standards
    if (state.regulations) {
      sections.push(this.generateRegulationsSection(state));
    }
    
    // Climate considerations
    if (state.climateNote) {
      sections.push(this.generateClimateSection(state));
    }
    
    // Major cities
    sections.push(this.generateCitiesSection(state, stats));
    
    // Facility types
    sections.push(this.generateFacilityTypesSection(state));
    
    return sections.join('\n\n');
  }
  
/// lib/stateContent.ts - Updated TypeScript generator with H2 and H3 classes

// lib/stateContent.ts - Updated TypeScript generator with H2 and H3 classes

private static generateIntroSection(state: StateInfo, stats: any): string {
  return `
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 relative pb-4">
      Public Shower Facilities in ${state.name}
    </h2>
    
    <p class="intro-text">
      ${state.localContext}
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
  const topCities = state.majorCities.slice(0, 6);
  const additionalCities = stats.cities.slice(6, 10).filter((city: string) => 
    !topCities.includes(city) && city && city.length > 2
  );
  
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
  return `
    <h3 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 mt-12">
      Types of Shower Facilities
    </h3>
    
    <div class="facility-grid">
      ${state.commonFacilities.map((facility, index) => `
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