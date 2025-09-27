// Bulk geocoder - replaces ALL coordinates with fresh geocoded ones
// Run with: node bulk-geocoder.js ./data/states ./data/states-geocoded

const fs = require('fs');
const path = require('path');

class BulkGeocoder {
  constructor() {
    this.requestDelay = 1100; // Nominatim 1 req/sec limit
    this.processedCount = 0;
    this.successCount = 0;
    this.failedCount = 0;
    this.skippedCount = 0;
  }

  async geocodeAddress(address, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, this.requestDelay));
        
        const url = `https://nominatim.openstreetmap.org/search?` +
          `format=json&limit=1&countrycodes=us&addressdetails=1&` +
          `q=${encodeURIComponent(address)}`;
          
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'BulkGeocoder/1.0 (data-cleanup)'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
          const result = data[0];
          
          // Debug logging for confidence investigation
          console.log(`    Raw importance: ${result.importance}`);
          console.log(`    Place type: ${result.type}, Class: ${result.class}`);
          
          // Calculate confidence based on multiple factors
          let confidence = this.calculateConfidence(result, address);
          
          return {
            lat: parseFloat(result.lat),
            lng: parseFloat(result.lon),
            confidence: confidence,
            displayName: result.display_name,
            osmType: result.osm_type,
            placeType: result.type,
            rawImportance: result.importance
          };
        }
        
        return null;
      } catch (error) {
        console.warn(`  Geocoding attempt ${attempt}/${maxRetries} failed:`, error.message);
        if (attempt === maxRetries) {
          return null;
        }
        // Wait longer before retrying
        await new Promise(resolve => setTimeout(resolve, attempt * 2000));
      }
    }
  }

  calculateConfidence(result, searchAddress) {
    let confidence = 0;
    
    // Base score from Nominatim importance (0-1 scale)
    const importance = parseFloat(result.importance) || 0;
    confidence += importance * 0.4; // 40% weight
    
    // Bonus for exact address matches
    if (result.display_name && searchAddress) {
      const displayLower = result.display_name.toLowerCase();
      const searchLower = searchAddress.toLowerCase();
      
      // Check if key components match
      if (searchLower.includes(result.housenumber || '')) confidence += 0.2;
      if (searchLower.includes((result.road || '').toLowerCase())) confidence += 0.2;
      if (searchLower.includes((result.city || result.town || result.village || '').toLowerCase())) confidence += 0.15;
    }
    
    // Bonus for specific place types
    const placeType = result.type || '';
    if (['house', 'building', 'commercial'].includes(placeType)) {
      confidence += 0.15;
    } else if (['amenity', 'leisure', 'shop'].includes(result.class)) {
      confidence += 0.1;
    }
    
    // Penalty for very generic matches
    if (placeType === 'administrative' || result.class === 'boundary') {
      confidence -= 0.2;
    }
    
    // Ensure confidence is between 0 and 1
    return Math.max(0, Math.min(1, confidence));
  }

  buildAddressOptions(location, stateCode) {
    const options = [];
    
    // Clean the street address if it has quotes or extra text
    let cleanStreet = location.street || '';
    if (cleanStreet.includes('"')) {
      cleanStreet = cleanStreet.split('"')[0].trim();
    }
    
    // Remove business descriptions from street field
    cleanStreet = cleanStreet.replace(/\s+\d+\.\d+\(\d+\).*$/, '').trim();
    
    // Option 1: Full address field (if it exists and looks complete)
    if (location.address && location.address.includes(',')) {
      options.push(location.address);
    }
    
    // Option 2: Street + City + State
    if (cleanStreet && location.city && cleanStreet.length > 3) {
      options.push(`${cleanStreet}, ${location.city}, ${stateCode}`);
    }
    
    // Option 3: Title + City + State (for named places)
    if (location.title && location.city) {
      options.push(`${location.title}, ${location.city}, ${stateCode}`);
    }
    
    // Option 4: Street + Zip (if available)
    if (cleanStreet && location.zip && cleanStreet.length > 3) {
      options.push(`${cleanStreet}, ${location.zip}`);
    }
    
    // Option 5: Just city + state as fallback
    if (location.city) {
      options.push(`${location.city}, ${stateCode}`);
    }
    
    // Filter out empty/short options and duplicates
    const filtered = options.filter(addr => addr && addr.length > 5);
    return [...new Set(filtered)]; // Remove duplicates
  }

  async geocodeLocation(location, stateCode) {
    this.processedCount++;
    
    const addressOptions = this.buildAddressOptions(location, stateCode);
    
    if (addressOptions.length === 0) {
      console.log(`  SKIP: No usable address for "${location.title}"`);
      this.skippedCount++;
      return {
        ...location,
        geocodeStatus: 'no_address',
        originalLat: location.lat,
        originalLng: location.lng
      };
    }

    console.log(`\n[${this.processedCount}] Geocoding: ${location.title}`);
    
    // Try each address option until one works
    for (let i = 0; i < addressOptions.length; i++) {
      const address = addressOptions[i];
      console.log(`  Trying (${i + 1}/${addressOptions.length}): ${address}`);
      
      const result = await this.geocodeAddress(address);
      
      if (result) {
        this.successCount++;
        console.log(`  SUCCESS: ${result.lat}, ${result.lng}`);
        console.log(`  Confidence: ${result.confidence.toFixed(3)} (was ${result.rawImportance})`);
        
        // Only accept results with reasonable confidence
        if (result.confidence < 0.1) {
          console.log(`  WARNING: Very low confidence, continuing to next address option...`);
          continue;
        }
        
        return {
          ...location,
          lat: result.lat.toString(),
          lng: result.lng.toString(),
          geocodeStatus: 'success',
          geocodeConfidence: result.confidence,
          geocodeAddress: address,
          geocodeDisplayName: result.displayName,
          geocodeOsmType: result.osmType,
          geocodePlaceType: result.placeType,
          originalLat: location.lat,
          originalLng: location.lng,
          geocodedAt: new Date().toISOString()
        };
      }
    }
    
    // If we get here, all address options failed
    this.failedCount++;
    console.log(`  FAILED: Could not geocode any address variant`);
    
    return {
      ...location,
      geocodeStatus: 'failed',
      attemptedAddresses: addressOptions,
      originalLat: location.lat,
      originalLng: location.lng
    };
  }

  async processStateFile(stateCode, inputPath, outputPath) {
    console.log(`\n=== Processing ${stateCode} ===`);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`File not found: ${inputPath}`);
      return;
    }

    try {
      const rawData = fs.readFileSync(inputPath, 'utf8');
      const stateData = JSON.parse(rawData);
      
      if (!stateData.locations || !Array.isArray(stateData.locations)) {
        console.log(`Invalid data format in ${inputPath}`);
        return;
      }

      console.log(`Found ${stateData.locations.length} locations to geocode`);
      console.log(`Estimated time: ${(stateData.locations.length * 1.5 / 60).toFixed(1)} minutes\n`);

      // Reset counters for this state
      this.processedCount = 0;
      this.successCount = 0;
      this.failedCount = 0;
      this.skippedCount = 0;

      // Process each location
      const geocodedLocations = [];
      
      for (const location of stateData.locations) {
        const geocodedLocation = await this.geocodeLocation(location, stateCode);
        geocodedLocations.push(geocodedLocation);
        
        // Progress update every 25 locations
        if (this.processedCount % 25 === 0) {
          console.log(`\n--- Progress: ${this.processedCount}/${stateData.locations.length} ---`);
          console.log(`Success: ${this.successCount}, Failed: ${this.failedCount}, Skipped: ${this.skippedCount}`);
        }
      }

      // Create output data with stats
      const outputData = {
        ...stateData,
        locations: geocodedLocations,
        geocodingStats: {
          totalLocations: stateData.locations.length,
          processedCount: this.processedCount,
          successCount: this.successCount,
          failedCount: this.failedCount,
          skippedCount: this.skippedCount,
          successRate: ((this.successCount / this.processedCount) * 100).toFixed(1) + '%',
          processedAt: new Date().toISOString()
        }
      };

      // Write output file
      fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
      
      console.log(`\n=== ${stateCode} Complete ===`);
      console.log(`Total: ${this.processedCount}`);
      console.log(`Success: ${this.successCount}`);
      console.log(`Failed: ${this.failedCount}`);
      console.log(`Skipped: ${this.skippedCount}`);
      console.log(`Success Rate: ${((this.successCount / this.processedCount) * 100).toFixed(1)}%`);
      console.log(`Saved to: ${outputPath}`);
      
    } catch (error) {
      console.error(`Error processing ${stateCode}:`, error.message);
    }
  }

  async processAllStates(inputFolder, outputFolder) {
    const allStates = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];
    
    // Ensure output folder exists
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    console.log(`Starting bulk geocoding for ${allStates.length} states`);
    console.log(`Input: ${inputFolder}`);
    console.log(`Output: ${outputFolder}\n`);
    
    const overallStats = {
      totalStates: allStates.length,
      processedStates: 0,
      totalLocations: 0,
      totalSuccess: 0,
      totalFailed: 0,
      totalSkipped: 0,
      startTime: new Date().toISOString()
    };

    for (const stateCode of allStates) {
      const inputPath = path.join(inputFolder, `${stateCode}.json`);
      const outputPath = path.join(outputFolder, `${stateCode}.json`);
      
      await this.processStateFile(stateCode, inputPath, outputPath);
      
      overallStats.processedStates++;
      overallStats.totalLocations += this.processedCount;
      overallStats.totalSuccess += this.successCount;
      overallStats.totalFailed += this.failedCount;
      overallStats.totalSkipped += this.skippedCount;
      
      console.log(`\nOverall Progress: ${overallStats.processedStates}/${allStates.length} states complete\n`);
    }

    overallStats.endTime = new Date().toISOString();
    overallStats.overallSuccessRate = ((overallStats.totalSuccess / overallStats.totalLocations) * 100).toFixed(1) + '%';

    // Save overall stats
    const statsPath = path.join(outputFolder, 'geocoding-summary.json');
    fs.writeFileSync(statsPath, JSON.stringify(overallStats, null, 2));

    console.log(`\n=== BULK GEOCODING COMPLETE ===`);
    console.log(`Total locations: ${overallStats.totalLocations}`);
    console.log(`Successfully geocoded: ${overallStats.totalSuccess}`);
    console.log(`Failed: ${overallStats.totalFailed}`);
    console.log(`Skipped: ${overallStats.totalSkipped}`);
    console.log(`Overall success rate: ${overallStats.overallSuccessRate}`);
    console.log(`Summary saved to: ${statsPath}`);
  }
}

// CLI Usage
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
🗺️  Bulk Address Geocoder

Usage: node bulk-geocoder.js <input-folder> <output-folder> [state]

Examples:
  node bulk-geocoder.js ./data/states ./data/states-geocoded
  node bulk-geocoder.js ./data/states ./data/states-geocoded CA

This will:
- Replace ALL coordinates with fresh geocoded ones
- Use multiple address formats for best results  
- Keep original coordinates as backup
- Generate detailed statistics
- Work completely free using Nominatim

Estimated time:
- Small state: 15-45 minutes
- Large state: 2-5 hours  
- All 50 states: 24-72 hours
    `);
    process.exit(1);
  }

  const inputFolder = args[0];
  const outputFolder = args[1];
  const specificState = args[2]?.toUpperCase();

  if (!fs.existsSync(inputFolder)) {
    console.error(`Input folder does not exist: ${inputFolder}`);
    process.exit(1);
  }

  const geocoder = new BulkGeocoder();

  if (specificState) {
    // Process single state
    const inputPath = path.join(inputFolder, `${specificState}.json`);
    const outputPath = path.join(outputFolder, `${specificState}.json`);
    
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }
    
    await geocoder.processStateFile(specificState, inputPath, outputPath);
  } else {
    // Process all states
    await geocoder.processAllStates(inputFolder, outputFolder);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { BulkGeocoder };