// Coordinate Updater - matches addresses and updates lat/lng in JSON files
// Run with: node update-coordinates.js correctlonglat.csv ./data/states

const fs = require('fs');
const path = require('path');

class CoordinateUpdater {
  constructor() {
    this.correctCoordinates = new Map();
    this.stats = {
      csvRecords: 0,
      filesProcessed: 0,
      locationsChecked: 0,
      matchesFound: 0,
      coordinatesUpdated: 0
    };
  }

  // Normalize address for better matching
  normalizeAddress(address) {
    if (!address) return '';
    
    return address
      .toLowerCase()
      .trim()
      // Remove extra spaces
      .replace(/\s+/g, ' ')
      // Standardize common abbreviations
      .replace(/\bstreet\b/g, 'st')
      .replace(/\bavenue\b/g, 'ave')
      .replace(/\bboulevard\b/g, 'blvd')
      .replace(/\broad\b/g, 'rd')
      .replace(/\bdrive\b/g, 'dr')
      .replace(/\bcircle\b/g, 'cir')
      .replace(/\blane\b/g, 'ln')
      .replace(/\bparkway\b/g, 'pkwy')
      // Remove punctuation except commas and spaces
      .replace(/[^\w\s,]/g, '')
      // Clean up multiple commas/spaces
      .replace(/,+/g, ',')
      .replace(/\s*,\s*/g, ',')
      .trim();
  }

  // Parse CSV file and build coordinate lookup
  loadCorrectCoordinates(csvPath) {
    console.log(`Loading correct coordinates from ${csvPath}...`);
    
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found: ${csvPath}`);
    }

    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Split by comma, but be careful of addresses with commas
      const parts = this.parseCSVLine(line);
      
      if (parts.length >= 3) {
        const address = parts[0];
        const lat = parseFloat(parts[1]);
        const lng = parseFloat(parts[2]);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          const normalizedAddress = this.normalizeAddress(address);
          this.correctCoordinates.set(normalizedAddress, {
            originalAddress: address,
            lat: lat,
            lng: lng
          });
          this.stats.csvRecords++;
        }
      }
    }
    
    console.log(`  Loaded ${this.stats.csvRecords} coordinate records`);
  }

  // Simple CSV parser that handles addresses with commas
  parseCSVLine(line) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last part
    if (current) {
      parts.push(current.trim());
    }
    
    return parts;
  }

  // Find matching address in the coordinate map
  findMatchingCoordinates(address) {
    if (!address) return null;
    
    const normalized = this.normalizeAddress(address);
    
    // Try exact match first
    if (this.correctCoordinates.has(normalized)) {
      return this.correctCoordinates.get(normalized);
    }
    
    // Try fuzzy matching - look for addresses that contain key components
    const addressParts = normalized.split(',').map(part => part.trim());
    const streetPart = addressParts[0] || '';
    const cityPart = addressParts[1] || '';
    
    for (const [csvAddress, coords] of this.correctCoordinates.entries()) {
      const csvParts = csvAddress.split(',').map(part => part.trim());
      const csvStreet = csvParts[0] || '';
      const csvCity = csvParts[1] || '';
      
      // Match if street and city both match
      if (streetPart && cityPart && csvStreet && csvCity) {
        if (streetPart === csvStreet && cityPart === csvCity) {
          return coords;
        }
      }
      
      // Match if the full normalized address is contained in CSV address or vice versa
      if (normalized.length > 10 && csvAddress.length > 10) {
        if (normalized.includes(csvAddress) || csvAddress.includes(normalized)) {
          // Additional check to make sure it's not a partial match
          const similarity = this.calculateSimilarity(normalized, csvAddress);
          if (similarity > 0.8) {
            return coords;
          }
        }
      }
    }
    
    return null;
  }

  // Calculate string similarity (simple implementation)
  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  // Levenshtein distance for string similarity
  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  // Process a single state JSON file
  processStateFile(stateCode, filePath) {
    console.log(`\nProcessing ${stateCode}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`  File not found: ${filePath}`);
      return;
    }

    try {
      const rawData = fs.readFileSync(filePath, 'utf8');
      const stateData = JSON.parse(rawData);
      
      if (!stateData.locations || !Array.isArray(stateData.locations)) {
        console.log(`  Invalid data format in ${filePath}`);
        return;
      }

      console.log(`  Found ${stateData.locations.length} locations`);
      
      let fileUpdated = false;
      let fileMatches = 0;
      
      // Check each location for address matches
      stateData.locations.forEach((location, index) => {
        this.stats.locationsChecked++;
        
        if (location.address) {
          const matchingCoords = this.findMatchingCoordinates(location.address);
          
          if (matchingCoords) {
            this.stats.matchesFound++;
            fileMatches++;
            
            // Store original coordinates before updating
            const originalLat = location.lat;
            const originalLng = location.lng;
            
            // Update coordinates
            location.lat = matchingCoords.lat.toString();
            location.lng = matchingCoords.lng.toString();
            
            // Add metadata about the update
            location.coordinateUpdate = {
              updatedAt: new Date().toISOString(),
              originalLat: originalLat,
              originalLng: originalLng,
              matchedAddress: matchingCoords.originalAddress,
              updateSource: 'csv_coordinate_correction'
            };
            
            console.log(`    MATCH: ${location.title}`);
            console.log(`      Address: ${location.address}`);
            console.log(`      Old: ${originalLat}, ${originalLng}`);
            console.log(`      New: ${matchingCoords.lat}, ${matchingCoords.lng}`);
            
            fileUpdated = true;
            this.stats.coordinatesUpdated++;
          }
        }
      });
      
      // Save updated file if changes were made
      if (fileUpdated) {
        // Add update metadata to the file
        stateData.coordinateUpdateSummary = {
          updatedAt: new Date().toISOString(),
          locationsUpdated: fileMatches,
          updateSource: 'csv_coordinate_correction'
        };
        
        fs.writeFileSync(filePath, JSON.stringify(stateData, null, 2));
        console.log(`  ✅ Updated ${fileMatches} locations and saved file`);
      } else {
        console.log(`  No matches found for ${stateCode}`);
      }
      
      this.stats.filesProcessed++;
      
    } catch (error) {
      console.error(`  Error processing ${stateCode}:`, error.message);
    }
  }

  // Process all state files
  updateAllStates(csvPath, statesFolder) {
    // Load correct coordinates from CSV
    this.loadCorrectCoordinates(csvPath);
    
    const allStates = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    console.log(`\nUpdating coordinates in ${allStates.length} state files...`);

    // Process each state file
    allStates.forEach(stateCode => {
      const filePath = path.join(statesFolder, `${stateCode}.json`);
      this.processStateFile(stateCode, filePath);
    });

    // Print final summary
    console.log('\n=== COORDINATE UPDATE COMPLETE ===');
    console.log(`CSV records loaded: ${this.stats.csvRecords}`);
    console.log(`Files processed: ${this.stats.filesProcessed}`);
    console.log(`Locations checked: ${this.stats.locationsChecked}`);
    console.log(`Address matches found: ${this.stats.matchesFound}`);
    console.log(`Coordinates updated: ${this.stats.coordinatesUpdated}`);
    console.log(`Success rate: ${((this.stats.matchesFound / this.stats.csvRecords) * 100).toFixed(1)}%`);
  }
}

// CLI Usage
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
🗺️  Coordinate Updater

Usage: node update-coordinates.js <csv-file> <states-folder>

Examples:
  node update-coordinates.js correctlonglat.csv ./data/states
  node update-coordinates.js coordinates.csv ./data/states

This will:
- Load correct coordinates from CSV file
- Match addresses between CSV and JSON files
- Update lat/lng coordinates in JSON files
- Preserve original coordinates as backup
- Add update metadata to modified locations

CSV Format:
original_address,lat,lng
"123 Main St, City, ST 12345",40.7128,-74.0060
    `);
    process.exit(1);
  }

  const csvPath = args[0];
  const statesFolder = args[1];

  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file does not exist: ${csvPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(statesFolder)) {
    console.error(`States folder does not exist: ${statesFolder}`);
    process.exit(1);
  }

  const updater = new CoordinateUpdater();
  updater.updateAllStates(csvPath, statesFolder);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { CoordinateUpdater };