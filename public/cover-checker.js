const fs = require('fs').promises;
const path = require('path');

/**
 * Analyze shower location coverage gaps in major US cities
 */
class CityCoverageAnalyzer {
  constructor(inputDir = './data') {
    this.inputDir = inputDir;
    this.citiesWithLocations = new Set();
    this.locationsByCity = new Map();
    this.statesByCity = new Map();
    this.totalLocations = 0;
  }

  /**
   * Major US cities by population and importance
   * Includes cities with 100k+ population and major metropolitan areas
   */
  getMajorUSCities() {
    return [
      // Major cities (500k+)
      { city: 'New York', state: 'NY', population: 8336817, tier: 'major' },
      { city: 'Los Angeles', state: 'CA', population: 3979576, tier: 'major' },
      { city: 'Chicago', state: 'IL', population: 2693976, tier: 'major' },
      { city: 'Houston', state: 'TX', population: 2320268, tier: 'major' },
      { city: 'Phoenix', state: 'AZ', population: 1680992, tier: 'major' },
      { city: 'Philadelphia', state: 'PA', population: 1584064, tier: 'major' },
      { city: 'San Antonio', state: 'TX', population: 1547253, tier: 'major' },
      { city: 'San Diego', state: 'CA', population: 1423851, tier: 'major' },
      { city: 'Dallas', state: 'TX', population: 1343573, tier: 'major' },
      { city: 'San Jose', state: 'CA', population: 1021795, tier: 'major' },
      { city: 'Austin', state: 'TX', population: 978908, tier: 'major' },
      { city: 'Jacksonville', state: 'FL', population: 949611, tier: 'major' },
      { city: 'Fort Worth', state: 'TX', population: 918915, tier: 'major' },
      { city: 'Columbus', state: 'OH', population: 905748, tier: 'major' },
      { city: 'Indianapolis', state: 'IN', population: 876384, tier: 'major' },
      { city: 'Charlotte', state: 'NC', population: 874579, tier: 'major' },
      { city: 'San Francisco', state: 'CA', population: 873965, tier: 'major' },
      { city: 'Seattle', state: 'WA', population: 753675, tier: 'major' },
      { city: 'Denver', state: 'CO', population: 715522, tier: 'major' },
      { city: 'Washington', state: 'DC', population: 689545, tier: 'major' },
      { city: 'Boston', state: 'MA', population: 685094, tier: 'major' },
      { city: 'El Paso', state: 'TX', population: 695044, tier: 'major' },
      { city: 'Nashville', state: 'TN', population: 689447, tier: 'major' },
      { city: 'Detroit', state: 'MI', population: 672351, tier: 'major' },
      { city: 'Oklahoma City', state: 'OK', population: 695044, tier: 'major' },
      { city: 'Portland', state: 'OR', population: 652503, tier: 'major' },
      { city: 'Las Vegas', state: 'NV', population: 641903, tier: 'major' },
      { city: 'Memphis', state: 'TN', population: 633104, tier: 'major' },
      { city: 'Louisville', state: 'KY', population: 617638, tier: 'major' },
      { city: 'Baltimore', state: 'MD', population: 576498, tier: 'major' },
      { city: 'Milwaukee', state: 'WI', population: 577222, tier: 'major' },
      { city: 'Albuquerque', state: 'NM', population: 564559, tier: 'major' },
      { city: 'Tucson', state: 'AZ', population: 548073, tier: 'major' },
      { city: 'Fresno', state: 'CA', population: 542107, tier: 'major' },
      { city: 'Sacramento', state: 'CA', population: 524943, tier: 'major' },
      { city: 'Mesa', state: 'AZ', population: 518012, tier: 'major' },
      { city: 'Kansas City', state: 'MO', population: 508090, tier: 'major' },
      { city: 'Atlanta', state: 'GA', population: 498715, tier: 'major' },
      { city: 'Colorado Springs', state: 'CO', population: 478961, tier: 'major' },
      { city: 'Omaha', state: 'NE', population: 486051, tier: 'major' },
      { city: 'Raleigh', state: 'NC', population: 474069, tier: 'major' },
      { city: 'Miami', state: 'FL', population: 461080, tier: 'major' },
      { city: 'Long Beach', state: 'CA', population: 466742, tier: 'major' },
      { city: 'Virginia Beach', state: 'VA', population: 459470, tier: 'major' },
      { city: 'Oakland', state: 'CA', population: 433031, tier: 'major' },
      { city: 'Minneapolis', state: 'MN', population: 429954, tier: 'major' },
      { city: 'Tulsa', state: 'OK', population: 413066, tier: 'major' },
      { city: 'Tampa', state: 'FL', population: 399700, tier: 'major' },
      { city: 'Arlington', state: 'TX', population: 398854, tier: 'major' },
      { city: 'New Orleans', state: 'LA', population: 383997, tier: 'major' },
      { city: 'Wichita', state: 'KS', population: 389938, tier: 'major' },

      // Semi-major cities (200k-500k)
      { city: 'Bakersfield', state: 'CA', population: 380874, tier: 'semi-major' },
      { city: 'Anaheim', state: 'CA', population: 352497, tier: 'semi-major' },
      { city: 'Honolulu', state: 'HI', population: 345064, tier: 'semi-major' },
      { city: 'Santa Ana', state: 'CA', population: 334136, tier: 'semi-major' },
      { city: 'Riverside', state: 'CA', population: 331360, tier: 'semi-major' },
      { city: 'Corpus Christi', state: 'TX', population: 326586, tier: 'semi-major' },
      { city: 'Lexington', state: 'KY', population: 323780, tier: 'semi-major' },
      { city: 'Stockton', state: 'CA', population: 312697, tier: 'semi-major' },
      { city: 'Henderson', state: 'NV', population: 320189, tier: 'semi-major' },
      { city: 'Saint Paul', state: 'MN', population: 311527, tier: 'semi-major' },
      { city: 'St. Louis', state: 'MO', population: 301578, tier: 'semi-major' },
      { city: 'Cincinnati', state: 'OH', population: 309317, tier: 'semi-major' },
      { city: 'Pittsburgh', state: 'PA', population: 300286, tier: 'semi-major' },
      { city: 'Greensboro', state: 'NC', population: 295570, tier: 'semi-major' },
      { city: 'Anchorage', state: 'AK', population: 291247, tier: 'semi-major' },
      { city: 'Plano', state: 'TX', population: 285494, tier: 'semi-major' },
      { city: 'Lincoln', state: 'NE', population: 295178, tier: 'semi-major' },
      { city: 'Orlando', state: 'FL', population: 307573, tier: 'semi-major' },
      { city: 'Irvine', state: 'CA', population: 307670, tier: 'semi-major' },
      { city: 'Newark', state: 'NJ', population: 311549, tier: 'semi-major' },
      { city: 'Toledo', state: 'OH', population: 270871, tier: 'semi-major' },
      { city: 'Durham', state: 'NC', population: 283506, tier: 'semi-major' },
      { city: 'Chula Vista', state: 'CA', population: 275487, tier: 'semi-major' },
      { city: 'Fort Wayne', state: 'IN', population: 270402, tier: 'semi-major' },
      { city: 'Jersey City', state: 'NJ', population: 292449, tier: 'semi-major' },
      { city: 'St. Petersburg', state: 'FL', population: 265098, tier: 'semi-major' },
      { city: 'Laredo', state: 'TX', population: 262491, tier: 'semi-major' },
      { city: 'Madison', state: 'WI', population: 269840, tier: 'semi-major' },
      { city: 'Chandler', state: 'AZ', population: 275987, tier: 'semi-major' },
      { city: 'Buffalo', state: 'NY', population: 278349, tier: 'semi-major' },
      { city: 'Lubbock', state: 'TX', population: 258862, tier: 'semi-major' },
      { city: 'Scottsdale', state: 'AZ', population: 258069, tier: 'semi-major' },
      { city: 'Reno', state: 'NV', population: 264165, tier: 'semi-major' },
      { city: 'Glendale', state: 'AZ', population: 248325, tier: 'semi-major' },
      { city: 'Gilbert', state: 'AZ', population: 267918, tier: 'semi-major' },
      { city: 'Winston-Salem', state: 'NC', population: 249545, tier: 'semi-major' },
      { city: 'North Las Vegas', state: 'NV', population: 262527, tier: 'semi-major' },
      { city: 'Norfolk', state: 'VA', population: 238005, tier: 'semi-major' },
      { city: 'Chesapeake', state: 'VA', population: 249422, tier: 'semi-major' },
      { city: 'Garland', state: 'TX', population: 246018, tier: 'semi-major' },
      { city: 'Irving', state: 'TX', population: 256684, tier: 'semi-major' },
      { city: 'Hialeah', state: 'FL', population: 223109, tier: 'semi-major' },
      { city: 'Fremont', state: 'CA', population: 230504, tier: 'semi-major' },
      { city: 'Boise', state: 'ID', population: 235684, tier: 'semi-major' },
      { city: 'Richmond', state: 'VA', population: 230436, tier: 'semi-major' },
      { city: 'Baton Rouge', state: 'LA', population: 227470, tier: 'semi-major' },
      { city: 'San Bernardino', state: 'CA', population: 222101, tier: 'semi-major' },
      { city: 'Birmingham', state: 'AL', population: 200733, tier: 'semi-major' },
      { city: 'Spokane', state: 'WA', population: 228989, tier: 'semi-major' },
      { city: 'Rochester', state: 'NY', population: 211328, tier: 'semi-major' },
      { city: 'Des Moines', state: 'IA', population: 214133, tier: 'semi-major' },
      { city: 'Modesto', state: 'CA', population: 218464, tier: 'semi-major' },
      { city: 'Fayetteville', state: 'NC', population: 208501, tier: 'semi-major' },
      { city: 'Tacoma', state: 'WA', population: 219346, tier: 'semi-major' },
      { city: 'Oxnard', state: 'CA', population: 202063, tier: 'semi-major' },
      { city: 'Fontana', state: 'CA', population: 208393, tier: 'semi-major' },
      { city: 'Columbus', state: 'GA', population: 206922, tier: 'semi-major' },
      { city: 'Montgomery', state: 'AL', population: 200603, tier: 'semi-major' },

      // Important smaller cities (100k-200k) - key transportation/economic hubs
      { city: 'Shreveport', state: 'LA', population: 187593, tier: 'important' },
      { city: 'Aurora', state: 'CO', population: 379289, tier: 'important' },
      { city: 'Akron', state: 'OH', population: 190469, tier: 'important' },
      { city: 'Mobile', state: 'AL', population: 187041, tier: 'important' },
      { city: 'Little Rock', state: 'AR', population: 198606, tier: 'important' },
      { city: 'Huntsville', state: 'AL', population: 215006, tier: 'important' },
      { city: 'Augusta', state: 'GA', population: 202081, tier: 'important' },
      { city: 'Amarillo', state: 'TX', population: 200393, tier: 'important' },
      { city: 'Glendale', state: 'CA', population: 199303, tier: 'important' },
      { city: 'Grand Rapids', state: 'MI', population: 198917, tier: 'important' },
      { city: 'Salt Lake City', state: 'UT', population: 200567, tier: 'important' },
      { city: 'Tallahassee', state: 'FL', population: 194500, tier: 'important' },
      { city: 'Huntington Beach', state: 'CA', population: 198711, tier: 'important' },
      { city: 'Grand Prairie', state: 'TX', population: 196100, tier: 'important' },
      { city: 'Knoxville', state: 'TN', population: 190740, tier: 'important' },
      { city: 'Worcester', state: 'MA', population: 185877, tier: 'important' },
      { city: 'Newport News', state: 'VA', population: 186247, tier: 'important' },
      { city: 'Brownsville', state: 'TX', population: 186738, tier: 'important' },
      { city: 'Santa Clarita', state: 'CA', population: 176320, tier: 'important' },
      { city: 'Providence', state: 'RI', population: 190934, tier: 'important' },
      { city: 'Fort Lauderdale', state: 'FL', population: 182760, tier: 'important' },
      { city: 'Chattanooga', state: 'TN', population: 181099, tier: 'important' },
      { city: 'Tempe', state: 'AZ', population: 195805, tier: 'important' },
      { city: 'Eugene', state: 'OR', population: 176654, tier: 'important' },
      { city: 'Santa Rosa', state: 'CA', population: 178127, tier: 'important' },
      { city: 'Sioux Falls', state: 'SD', population: 192517, tier: 'important' },
      { city: 'Springfield', state: 'MO', population: 169176, tier: 'important' },
      { city: 'Jackson', state: 'MS', population: 153701, tier: 'important' },
      { city: 'Overland Park', state: 'KS', population: 197238, tier: 'important' },
      { city: 'Garden Grove', state: 'CA', population: 171949, tier: 'important' },
      { city: 'Cape Coral', state: 'FL', population: 194016, tier: 'important' },
      { city: 'McKinney', state: 'TX', population: 199177, tier: 'important' },
      { city: 'Pembroke Pines', state: 'FL', population: 171178, tier: 'important' },
      { city: 'Flint', state: 'MI', population: 95538, tier: 'important' },
      { city: 'Kansas City', state: 'KS', population: 156607, tier: 'important' },
      { city: 'Coral Springs', state: 'FL', population: 134394, tier: 'important' }
    ];
  }

  /**
   * Normalize city names for matching
   */
  normalizeCity(city) {
    if (!city) return '';
    
    return city.toLowerCase()
      .replace(/\bst\b\.?/g, 'saint')  // St. -> Saint
      .replace(/\bft\b\.?/g, 'fort')   // Ft. -> Fort
      .replace(/\bmt\b\.?/g, 'mount')  // Mt. -> Mount
      .replace(/[^\w\s]/g, '')         // Remove punctuation
      .replace(/\s+/g, ' ')            // Normalize spaces
      .trim();
  }

  /**
   * Check if a city matches, accounting for variations
   */
  cityMatches(city1, city2) {
    const norm1 = this.normalizeCity(city1);
    const norm2 = this.normalizeCity(city2);
    
    if (norm1 === norm2) return true;
    
    // Check if one contains the other (for cases like "Kansas City" vs "Kansas City Metro")
    if (norm1.includes(norm2) || norm2.includes(norm1)) {
      // But avoid false positives like "New York" matching "York"
      if (norm1.length > 3 && norm2.length > 3) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Main analysis function
   */
  async analyze() {
    try {
      console.log('Starting city coverage gap analysis...\n');
      
      // Step 1: Read all location data
      await this.readLocationData();
      
      // Step 2: Analyze coverage gaps
      this.findCoverageGaps();
      
      // Step 3: Display reports in terminal
      this.displayReports();
      
    } catch (error) {
      console.error('Error during analysis:', error);
    }
  }

  /**
   * Read all location data from JSON files
   */
  async readLocationData() {
    const files = await fs.readdir(this.inputDir);
    const jsonFiles = files.filter(file => 
      file.startsWith('city_') && file.endsWith('.json')
    );
    
    console.log(`Reading ${jsonFiles.length} location data files...\n`);
    
    for (const file of jsonFiles) {
      const filePath = path.join(this.inputDir, file);
      
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(content);
        
        if (data.locations && Array.isArray(data.locations)) {
          data.locations.forEach(location => {
            // Extract city and state from multiple possible sources
            let city = null;
            let state = null;
            
            // Method 1: Direct fields (if populated)
            if (location.city && location.city.trim()) {
              city = location.city.trim();
            }
            if (location.province && location.province.trim()) {
              state = location.province.trim();
            }
            
            // Method 2: Extract from address field
            if ((!city || !state) && location.address) {
              const extracted = this.extractCityStateFromAddress(location.address);
              if (!city && extracted.city) city = extracted.city;
              if (!state && extracted.state) state = extracted.state;
            }
            
            // Method 3: Extract from file metadata if available
            if ((!city || !state) && data.city && data.state) {
              if (!city && data.city.trim()) city = data.city.trim();
              if (!state && data.state.trim()) state = data.state.trim();
            }
            
            // Only process if we have both city and state
            if (city && state && city !== 'Unknown' && state !== 'Unknown') {
              const normalizedCity = this.normalizeCity(city);
              const stateCode = this.normalizeState(state);
              
              if (normalizedCity && stateCode) {
                this.citiesWithLocations.add(`${normalizedCity}|${stateCode}`);
                
                const cityKey = `${city}, ${stateCode}`;
                if (!this.locationsByCity.has(cityKey)) {
                  this.locationsByCity.set(cityKey, 0);
                }
                this.locationsByCity.set(cityKey, this.locationsByCity.get(cityKey) + 1);
                this.statesByCity.set(normalizedCity, stateCode);
                this.totalLocations++;
              }
            }
          });
        }
      } catch (error) {
        console.error(`Error reading ${file}:`, error.message);
      }
    }
    
    console.log(`Found locations in ${this.citiesWithLocations.size} unique cities`);
    console.log(`Total locations processed: ${this.totalLocations}\n`);
  }

  /**
   * Extract city and state from address string
   */
  extractCityStateFromAddress(address) {
    if (!address) return { city: null, state: null };
    
    // Handle various US address formats
    // "3400 Nafta Pkwy, Brownsville, TX 78526, United States"
    // "City, State Zip"
    // "City, State Zip, United States"
    
    // Remove "United States" if present
    let cleanAddress = address.replace(/,\s*(United States|USA|US)$/i, '').trim();
    
    // Pattern: "..., City, State Zip"
    const pattern1 = /^.*?,\s*([^,]+),\s*([A-Z]{2})\s+\d{5}(-\d{4})?$/;
    const match1 = cleanAddress.match(pattern1);
    
    if (match1) {
      return {
        city: match1[1].trim(),
        state: match1[2].trim()
      };
    }
    
    // Pattern: "City, State" (no zip)
    const pattern2 = /^.*?,\s*([^,]+),\s*([A-Z]{2})$/;
    const match2 = cleanAddress.match(pattern2);
    
    if (match2) {
      return {
        city: match2[1].trim(),
        state: match2[2].trim()
      };
    }
    
    // Try to extract from the last two comma-separated parts
    const parts = cleanAddress.split(',').map(p => p.trim());
    if (parts.length >= 2) {
      const lastPart = parts[parts.length - 1];
      const secondLastPart = parts[parts.length - 2];
      
      // Check if last part contains state and zip
      const stateZipMatch = lastPart.match(/^([A-Z]{2})\s+\d{5}(-\d{4})?$/);
      if (stateZipMatch) {
        return {
          city: secondLastPart,
          state: stateZipMatch[1]
        };
      }
      
      // Check if last part is just a state
      if (lastPart.match(/^[A-Z]{2}$/)) {
        return {
          city: secondLastPart,
          state: lastPart
        };
      }
    }
    
    return { city: null, state: null };
  }

  /**
   * Normalize state names/codes to standard 2-letter codes
   */
  normalizeState(state) {
    if (!state) return null;
    
    const stateCode = state.trim().toUpperCase();
    
    // If already 2-letter code, return it
    if (stateCode.length === 2 && stateCode.match(/^[A-Z]{2}$/)) {
      return stateCode;
    }
    
    // State name to code mapping
    const stateNameToCode = {
      'ALABAMA': 'AL', 'ALASKA': 'AK', 'ARIZONA': 'AZ', 'ARKANSAS': 'AR',
      'CALIFORNIA': 'CA', 'COLORADO': 'CO', 'CONNECTICUT': 'CT', 'DELAWARE': 'DE',
      'FLORIDA': 'FL', 'GEORGIA': 'GA', 'HAWAII': 'HI', 'IDAHO': 'ID',
      'ILLINOIS': 'IL', 'INDIANA': 'IN', 'IOWA': 'IA', 'KANSAS': 'KS',
      'KENTUCKY': 'KY', 'LOUISIANA': 'LA', 'MAINE': 'ME', 'MARYLAND': 'MD',
      'MASSACHUSETTS': 'MA', 'MICHIGAN': 'MI', 'MINNESOTA': 'MN', 'MISSISSIPPI': 'MS',
      'MISSOURI': 'MO', 'MONTANA': 'MT', 'NEBRASKA': 'NE', 'NEVADA': 'NV',
      'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ', 'NEW MEXICO': 'NM', 'NEW YORK': 'NY',
      'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND', 'OHIO': 'OH', 'OKLAHOMA': 'OK',
      'OREGON': 'OR', 'PENNSYLVANIA': 'PA', 'RHODE ISLAND': 'RI', 'SOUTH CAROLINA': 'SC',
      'SOUTH DAKOTA': 'SD', 'TENNESSEE': 'TN', 'TEXAS': 'TX', 'UTAH': 'UT',
      'VERMONT': 'VT', 'VIRGINIA': 'VA', 'WASHINGTON': 'WA', 'WEST VIRGINIA': 'WV',
      'WISCONSIN': 'WI', 'WYOMING': 'WY', 'DISTRICT OF COLUMBIA': 'DC'
    };
    
    return stateNameToCode[stateCode] || null;
  }

  /**
   * Find coverage gaps in major cities
   */
  findCoverageGaps() {
    console.log('Analyzing coverage gaps...\n');
    
    const majorCities = this.getMajorUSCities();
    this.coverageAnalysis = {
      covered: [],
      gaps: [],
      byTier: {
        major: { total: 0, covered: 0, gaps: [] },
        'semi-major': { total: 0, covered: 0, gaps: [] },
        important: { total: 0, covered: 0, gaps: [] }
      }
    };

    majorCities.forEach(city => {
      const normalizedCity = this.normalizeCity(city.city);
      const cityKey = `${normalizedCity}|${city.state}`;
      
      this.coverageAnalysis.byTier[city.tier].total++;
      
      let hasLocation = false;
      
      // Check if we have this city
      if (this.citiesWithLocations.has(cityKey)) {
        hasLocation = true;
      } else {
        // Check for variations and nearby matches
        for (const existingCity of this.citiesWithLocations) {
          const [existingCityName, existingState] = existingCity.split('|');
          if (existingState === city.state && this.cityMatches(normalizedCity, existingCityName)) {
            hasLocation = true;
            break;
          }
        }
      }
      
      if (hasLocation) {
        this.coverageAnalysis.covered.push(city);
        this.coverageAnalysis.byTier[city.tier].covered++;
      } else {
        this.coverageAnalysis.gaps.push(city);
        this.coverageAnalysis.byTier[city.tier].gaps.push(city);
      }
    });

    // Sort gaps by population (largest first)
    this.coverageAnalysis.gaps.sort((a, b) => b.population - a.population);
    
    console.log('Coverage Analysis Complete:');
    console.log(`✓ Cities with locations: ${this.coverageAnalysis.covered.length}`);
    console.log(`⚠ Cities without locations: ${this.coverageAnalysis.gaps.length}`);
    
    Object.entries(this.coverageAnalysis.byTier).forEach(([tier, data]) => {
      const coveragePercent = ((data.covered / data.total) * 100).toFixed(1);
      console.log(`  ${tier}: ${data.covered}/${data.total} (${coveragePercent}%)`);
    });
  }

  /**
   * Display all reports in the terminal
   */
  displayReports() {
    console.log('\n' + '='.repeat(80));
    console.log('CITY COVERAGE ANALYSIS REPORT');
    console.log('Generated: ' + new Date().toISOString());
    console.log('='.repeat(80));

    // Executive Summary
    this.displaySummaryReport();
    
    // Coverage gaps by tier
    this.displayDetailedGapReport();
    
    // State analysis
    this.displayStateReport();
    
    // Well-covered cities
    this.displayWellCoveredCities();
    
    // Strategic recommendations
    this.displayRecommendations();
  }

  /**
   * Display executive summary in terminal
   */
  displaySummaryReport() {
    const totalMajorCities = this.getMajorUSCities().length;
    const overallCoverage = ((this.coverageAnalysis.covered.length / totalMajorCities) * 100).toFixed(1);
    
    console.log('\n📊 EXECUTIVE SUMMARY');
    console.log('-'.repeat(40));
    console.log(`Total Major Cities Analyzed: ${totalMajorCities}`);
    console.log(`Cities with Shower Locations: ${this.coverageAnalysis.covered.length}`);
    console.log(`Cities without Locations: ${this.coverageAnalysis.gaps.length}`);
    console.log(`Overall Coverage: ${overallCoverage}%`);
    
    console.log('\nCoverage by City Tier:');
    Object.entries(this.coverageAnalysis.byTier).forEach(([tier, data]) => {
      const coveragePercent = ((data.covered / data.total) * 100).toFixed(1);
      console.log(`  ${tier.toUpperCase().padEnd(12)}: ${data.covered.toString().padStart(2)}/${data.total.toString().padEnd(2)} (${coveragePercent.padStart(5)}%)`);
    });
  }

  /**
   * Display detailed gap analysis in terminal
   */
  displayDetailedGapReport() {
    console.log('\n🎯 TOP COVERAGE GAPS BY POPULATION');
    console.log('-'.repeat(70));
    
    const topGaps = this.coverageAnalysis.gaps.slice(0, 20);
    
    console.log('Rank | City                    | State | Population | Tier      | Priority');
    console.log('-----|-------------------------|-------|------------|-----------|----------');
    
    topGaps.forEach((city, index) => {
      const rank = (index + 1).toString().padStart(4);
      const cityName = city.city.padEnd(23);
      const state = city.state.padEnd(5);
      const population = city.population.toLocaleString().padStart(10);
      const tier = city.tier.padEnd(9);
      const priority = this.calculateMarketPotential(city).padEnd(8);
      
      console.log(`${rank} | ${cityName} | ${state} | ${population} | ${tier} | ${priority}`);
    });

    // Major cities gaps
    if (this.coverageAnalysis.byTier.major.gaps.length > 0) {
      console.log('\n🚨 MAJOR CITIES WITHOUT COVERAGE:');
      console.log('-'.repeat(50));
      this.coverageAnalysis.byTier.major.gaps
        .sort((a, b) => b.population - a.population)
        .forEach(city => {
          const pop = city.population.toLocaleString().padStart(10);
          console.log(`  • ${city.city}, ${city.state} ${pop}`);
        });
    }
  }

  /**
   * Display state analysis in terminal
   */
  displayStateReport() {
    console.log('\n🗺️  STATE-BY-STATE ANALYSIS');
    console.log('-'.repeat(60));
    
    // Calculate state analysis
    const stateAnalysis = {};
    const allStates = new Set();
    this.getMajorUSCities().forEach(city => allStates.add(city.state));
    
    allStates.forEach(state => {
      stateAnalysis[state] = {
        majorCities: this.getMajorUSCities().filter(c => c.state === state).length,
        citiesWithLocations: 0,
        citiesWithoutLocations: [],
      };
    });
    
    this.coverageAnalysis.gaps.forEach(city => {
      if (stateAnalysis[city.state]) {
        stateAnalysis[city.state].citiesWithoutLocations.push(city);
      }
    });
    
    this.coverageAnalysis.covered.forEach(city => {
      if (stateAnalysis[city.state]) {
        stateAnalysis[city.state].citiesWithLocations++;
      }
    });
    
    // Best covered states
    const bestStates = Object.entries(stateAnalysis)
      .filter(([state, data]) => data.majorCities > 0)
      .map(([state, data]) => ({
        state,
        coverage: ((data.citiesWithLocations / data.majorCities) * 100).toFixed(1),
        covered: data.citiesWithLocations,
        total: data.majorCities
      }))
      .sort((a, b) => parseFloat(b.coverage) - parseFloat(a.coverage))
      .slice(0, 10);
    
    console.log('TOP 10 BEST COVERED STATES:');
    console.log('State | Coverage | Cities');
    console.log('------|----------|--------');
    bestStates.forEach(s => {
      console.log(`${s.state.padEnd(5)} | ${s.coverage.padStart(7)}% | ${s.covered}/${s.total}`);
    });
    
    // Worst covered states
    const worstStates = Object.entries(stateAnalysis)
      .filter(([state, data]) => data.majorCities > 0)
      .map(([state, data]) => ({
        state,
        coverage: ((data.citiesWithLocations / data.majorCities) * 100).toFixed(1),
        covered: data.citiesWithLocations,
        total: data.majorCities,
        gaps: data.citiesWithoutLocations.slice(0, 3)
      }))
      .sort((a, b) => parseFloat(a.coverage) - parseFloat(b.coverage))
      .slice(0, 10);
    
    console.log('\nTOP 10 STATES NEEDING COVERAGE:');
    console.log('State | Coverage | Cities | Top Gaps');
    console.log('------|----------|--------|----------');
    worstStates.forEach(s => {
      const gapCities = s.gaps.map(g => g.city).join(', ');
      console.log(`${s.state.padEnd(5)} | ${s.coverage.padStart(7)}% | ${s.covered}/${s.total}     | ${gapCities}`);
    });
  }

  /**
   * Display cities with good coverage
   */
  displayWellCoveredCities() {
    const wellCovered = Array.from(this.locationsByCity.entries())
      .filter(([city, count]) => count >= 3)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);
    
    if (wellCovered.length > 0) {
      console.log('\n⭐ CITIES WITH EXCELLENT COVERAGE (3+ locations):');
      console.log('-'.repeat(55));
      console.log('City                           | Locations');
      console.log('-------------------------------|----------');
      wellCovered.forEach(([city, count]) => {
        console.log(`${city.padEnd(30)} | ${count.toString().padStart(9)}`);
      });
    }
  }

  /**
   * Display strategic recommendations
   */
  displayRecommendations() {
    console.log('\n💡 STRATEGIC RECOMMENDATIONS');
    console.log('-'.repeat(50));
    
    const majorGaps = this.coverageAnalysis.byTier.major.gaps;
    const highPopGaps = this.coverageAnalysis.gaps.filter(c => c.population > 500000);
    const majorCoverage = ((this.coverageAnalysis.byTier.major.covered / this.coverageAnalysis.byTier.major.total) * 100).toFixed(0);
    const semiMajorCoverage = ((this.coverageAnalysis.byTier['semi-major'].covered / this.coverageAnalysis.byTier['semi-major'].total) * 100).toFixed(0);
    
    const recommendations = [
      `🎯 IMMEDIATE PRIORITY: Focus on ${majorGaps.length} major cities without coverage`,
      `🏙️  HIGH-IMPACT TARGETS: ${highPopGaps.slice(0, 5).map(c => `${c.city}, ${c.state}`).join(', ')}`,
      `📈 MAJOR CITY GOAL: Currently at ${majorCoverage}% coverage - aim for 90%+`,
      `📊 SEMI-MAJOR EXPANSION: At ${semiMajorCoverage}% coverage - systematic growth opportunity`,
      `🛣️  STRATEGIC CORRIDORS: Target interstate routes connecting covered/uncovered cities`,
      `📍 MARKET PENETRATION: Increase density in existing markets before expanding to new ones`
    ];
    
    recommendations.forEach((rec, index) => {
      console.log(`${(index + 1).toString().padStart(2)}. ${rec}`);
    });

    console.log('\n' + '='.repeat(80));
    console.log('END OF COVERAGE ANALYSIS REPORT');
    console.log('='.repeat(80));
  }

  /**
   * Calculate market potential for a city
   */
  calculateMarketPotential(city) {
    // Simple scoring based on population and tier
    let score = 0;
    
    if (city.population > 1000000) score += 10;
    else if (city.population > 500000) score += 8;
    else if (city.population > 250000) score += 6;
    else if (city.population > 100000) score += 4;
    else score += 2;
    
    if (city.tier === 'major') score += 5;
    else if (city.tier === 'semi-major') score += 3;
    else score += 1;
    
    if (score >= 13) return 'Very High';
    if (score >= 10) return 'High';
    if (score >= 7) return 'Medium';
    return 'Low';
  }
}

// Usage
async function main() {
  const analyzer = new CityCoverageAnalyzer('./data');
  await analyzer.analyze();
}

// Run if this is the main module
if (require.main === module) {
  main().catch(console.error);
}

module.exports = CityCoverageAnalyzer;