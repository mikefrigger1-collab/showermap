const fs = require('fs').promises;
const path = require('path');

/**
 * Process and combine shower location data files
 * - Reads all city JSON files from a directory
 * - Combines locations from all files
 * - Removes duplicates based on multiple criteria
 * - Groups locations by state
 * - Saves separate files for each state
 */

class ShowerDataProcessor {
  constructor(inputDir = './data', outputDir = './processed') {
    this.inputDir = inputDir;
    this.outputDir = outputDir;
    this.allLocations = [];
    this.locationsByState = {};
    this.duplicateCount = 0;
  }

  /**
   * Main processing function
   */
  async process() {
    try {
      console.log('Starting data processing...\n');
      
      // Step 1: Read all JSON files
      await this.readAllFiles();
      
      // Step 2: Remove duplicates
      this.removeDuplicates();
      
      // Step 3: Group by state
      this.groupByState();
      
      // Step 4: Save state files
      await this.saveStateFiles();
      
      // Step 5: Generate summary
      this.generateSummary();
      
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  /**
   * Read all JSON files from the input directory
   */
  async readAllFiles() {
    const files = await fs.readdir(this.inputDir);
    const jsonFiles = files.filter(file => 
      file.startsWith('city_') && file.endsWith('.json')
    );
    
    console.log(`Found ${jsonFiles.length} city files to process:\n`);
    
    for (const file of jsonFiles) {
      const filePath = path.join(this.inputDir, file);
      console.log(`Reading ${file}...`);
      
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(content);
        
        if (data.locations && Array.isArray(data.locations)) {
          // Add metadata to each location
          data.locations.forEach(location => {
            location.sourceFile = file;
            location.sourceCity = data.city || 'Unknown';
            location.sourceState = data.state || 'Unknown';
            location.timestamp = data.timestamp || new Date().toISOString();
          });
          
          this.allLocations.push(...data.locations);
          console.log(`  ✓ Added ${data.locations.length} locations from ${data.city}, ${data.state}`);
        }
      } catch (error) {
        console.error(`  ✗ Error reading ${file}:`, error.message);
      }
    }
    
    console.log(`\nTotal locations loaded: ${this.allLocations.length}\n`);
  }

  /**
   * Generate a unique key for location comparison
   */
  generateLocationKey(location) {
    // Create a normalized key based on multiple attributes
    const normalizedTitle = (location.title || '').toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    
    const normalizedAddress = (location.street || '').toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    
    const lat = parseFloat(location.lat || 0).toFixed(4);
    const lng = parseFloat(location.lng || 0).toFixed(4);
    
    // Use multiple criteria for uniqueness
    return `${normalizedTitle}_${normalizedAddress}_${lat}_${lng}`;
  }

  /**
   * Remove duplicate locations
   */
  removeDuplicates() {
    console.log('Removing duplicates...');
    const uniqueLocations = new Map();
    
    this.allLocations.forEach(location => {
      const key = this.generateLocationKey(location);
      
      if (!uniqueLocations.has(key)) {
        // Clean up temporary metadata fields
        const cleanLocation = { ...location };
        delete cleanLocation.sourceFile;
        
        // Ensure required fields
        cleanLocation.state = cleanLocation.sourceState || this.extractStateFromAddress(cleanLocation);
        cleanLocation.city = cleanLocation.city || cleanLocation.sourceCity || 'Unknown';
        
        uniqueLocations.set(key, cleanLocation);
      } else {
        this.duplicateCount++;
        
        // Optionally merge data from duplicate (e.g., combine reviews)
        const existing = uniqueLocations.get(key);
        if (location.showerReviews && location.showerReviews.length > 0) {
          existing.showerReviews = this.mergeReviews(
            existing.showerReviews || [],
            location.showerReviews
          );
          existing.showerReviewCount = existing.showerReviews.length;
        }
      }
    });
    
    this.allLocations = Array.from(uniqueLocations.values());
    console.log(`  ✓ Removed ${this.duplicateCount} duplicates`);
    console.log(`  ✓ ${this.allLocations.length} unique locations remaining\n`);
  }

  /**
   * Merge shower reviews from duplicates
   */
  mergeReviews(existingReviews, newReviews) {
    const reviewMap = new Map();
    
    // Add existing reviews
    existingReviews.forEach(review => {
      const key = `${review.reviewerName}_${review.reviewText.substring(0, 50)}`;
      reviewMap.set(key, review);
    });
    
    // Add new reviews if unique
    newReviews.forEach(review => {
      const key = `${review.reviewerName}_${review.reviewText.substring(0, 50)}`;
      if (!reviewMap.has(key)) {
        reviewMap.set(key, review);
      }
    });
    
    return Array.from(reviewMap.values());
  }

  /**
   * Extract state from address or other fields
   */
  extractStateFromAddress(location) {
    // Try to extract from address field
    if (location.address) {
      const stateMatch = location.address.match(/,\s*([A-Z]{2})\s+\d{5}/);
      if (stateMatch) return stateMatch[1];
    }
    
    // Try googleMapsUrl
    if (location.googleMapsUrl) {
      // Extract from URL patterns like "CA" in URLs
      const urlStateMatch = location.googleMapsUrl.match(/,\+([A-Z]{2})\+/);
      if (urlStateMatch) return urlStateMatch[1];
    }
    
    return location.sourceState || 'Unknown';
  }

  /**
   * Group locations by state
   */
  groupByState() {
    console.log('Grouping locations by state...');
    
    this.allLocations.forEach(location => {
      const state = location.state || 'Unknown';
      
      if (!this.locationsByState[state]) {
        this.locationsByState[state] = {
          state: state,
          stateName: this.getStateName(state),
          locations: [],
          cities: new Set(),
          totalReviews: 0,
          categories: new Set(),
          timestamp: new Date().toISOString()
        };
      }
      
      this.locationsByState[state].locations.push(location);
      
      // Track unique cities
      if (location.city && location.city !== 'Unknown') {
        this.locationsByState[state].cities.add(location.city);
      }
      
      // Track categories
      if (location.category) {
        this.locationsByState[state].categories.add(location.category);
      }
      
      // Count reviews
      if (location.showerReviewCount) {
        this.locationsByState[state].totalReviews += location.showerReviewCount;
      }
    });
    
    // Convert sets to arrays
    Object.values(this.locationsByState).forEach(stateData => {
      stateData.cities = Array.from(stateData.cities).sort();
      stateData.categories = Array.from(stateData.categories);
      stateData.locationCount = stateData.locations.length;
      
      // Sort locations by city, then by title
      stateData.locations.sort((a, b) => {
        const cityCompare = (a.city || '').localeCompare(b.city || '');
        if (cityCompare !== 0) return cityCompare;
        return (a.title || '').localeCompare(b.title || '');
      });
    });
    
    console.log(`  ✓ Grouped into ${Object.keys(this.locationsByState).length} states\n`);
  }

  /**
   * Get full state name from abbreviation
   */
  getStateName(abbr) {
    const states = {
      'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
      'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
      'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
      'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
      'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
      'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
      'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
      'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
      'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
      'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
      'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
      'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
      'WI': 'Wisconsin', 'WY': 'Wyoming', 'DC': 'District of Columbia'
    };
    
    return states[abbr] || abbr;
  }

  /**
   * Save separate files for each state
   */
  async saveStateFiles() {
    console.log('Saving state files...');
    
    // Create output directory if it doesn't exist
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
    
    for (const [state, data] of Object.entries(this.locationsByState)) {
      const filename = `state_${state}_shower_locations.json`;
      const filepath = path.join(this.outputDir, filename);
      
      try {
        await fs.writeFile(filepath, JSON.stringify(data, null, 2));
        console.log(`  ✓ Saved ${filename} (${data.locationCount} locations)`);
      } catch (error) {
        console.error(`  ✗ Error saving ${filename}:`, error.message);
      }
    }
    
    // Also save a master index file
    const indexData = {
      generated: new Date().toISOString(),
      totalLocations: this.allLocations.length,
      totalStates: Object.keys(this.locationsByState).length,
      duplicatesRemoved: this.duplicateCount,
      states: Object.entries(this.locationsByState).map(([state, data]) => ({
        state: state,
        stateName: data.stateName,
        locationCount: data.locationCount,
        cityCount: data.cities.length,
        reviewCount: data.totalReviews,
        categories: data.categories,
        filename: `state_${state}_shower_locations.json`
      }))
    };
    
    const indexPath = path.join(this.outputDir, 'index.json');
    await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2));
    console.log(`  ✓ Saved index.json\n`);
  }

  /**
   * Generate and display summary
   */
  generateSummary() {
    console.log('='.repeat(60));
    console.log('PROCESSING COMPLETE');
    console.log('='.repeat(60));
    console.log(`Total unique locations: ${this.allLocations.length}`);
    console.log(`Duplicates removed: ${this.duplicateCount}`);
    console.log(`States processed: ${Object.keys(this.locationsByState).length}\n`);
    
    console.log('Locations by state:');
    Object.entries(this.locationsByState)
      .sort((a, b) => b[1].locationCount - a[1].locationCount)
      .forEach(([state, data]) => {
        console.log(`  ${state.padEnd(3)} - ${data.stateName.padEnd(20)} : ${data.locationCount.toString().padStart(4)} locations, ${data.cities.length.toString().padStart(3)} cities`);
      });
    
    console.log('\nFiles saved to:', this.outputDir);
  }
}

// Usage
async function main() {
  const processor = new ShowerDataProcessor(
    './data',      // Input directory with city files
    './processed'  // Output directory for state files
  );
  
  await processor.process();
}

// Run if this is the main module
if (require.main === module) {
  main().catch(console.error);
}

module.exports = ShowerDataProcessor;