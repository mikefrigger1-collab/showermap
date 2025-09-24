const fs = require('fs').promises;
const path = require('path');

/**
 * Process and combine shower location data files with advanced duplicate detection
 */
class ShowerDataProcessor {
  constructor(inputDir = './data', outputDir = './processed') {
    this.inputDir = inputDir;
    this.outputDir = outputDir;
    this.allLocations = [];
    this.locationsByState = {};
    this.duplicateCount = 0;
    this.duplicateReasons = new Map(); // Track why duplicates were found
    this.fuzzyMatches = []; // Track fuzzy matches for review
  }

  /**
   * Advanced duplicate detection with multiple strategies
   */
  removeDuplicates() {
    console.log('Removing duplicates with enhanced detection...');
    const uniqueLocations = new Map();
    const potentialDuplicates = [];
    let phonesCleaned = 0;
    let phonesRemoved = 0;
    let addressesCleaned = 0;
    let citiesFixed = 0;

    // Step 1: Exact coordinate matches (highest priority)
    console.log('  → Phase 1: Exact coordinate matching...');
    this.findExactCoordinateDuplicates(uniqueLocations);

    // Step 2: Address-based matching
    console.log('  → Phase 2: Address-based matching...');
    this.findAddressDuplicates(uniqueLocations);

    // Step 3: Fuzzy title matching within same area
    console.log('  → Phase 3: Fuzzy title matching...');
    this.findFuzzyTitleDuplicates(uniqueLocations);

    // Step 4: Phone number matching
    console.log('  → Phase 4: Phone number matching...');
    this.findPhoneDuplicates(uniqueLocations);

    // Step 5: Near-coordinate clustering (within ~100 meters)
    console.log('  → Phase 5: Proximity clustering...');
    this.findProximityDuplicates(uniqueLocations);

    // Step 6: Business name normalization matching
    console.log('  → Phase 6: Business name normalization...');
    this.findNormalizedNameDuplicates(uniqueLocations);

    // Clean up and finalize unique locations
    this.finalizeUniqueLocations(uniqueLocations);

    console.log(`  ✓ Removed ${this.duplicateCount} total duplicates`);
    this.printDuplicateStatistics();
    console.log(`  ✓ ${this.allLocations.length} unique locations remaining\n`);
  }

  /**
   * Find duplicates with identical coordinates (within 0.0001 degrees ~11 meters)
   */
  findExactCoordinateDuplicates(uniqueLocations) {
    const coordMap = new Map();
    let exactCoordDupes = 0;

    this.allLocations.forEach((location, index) => {
      const lat = parseFloat(location.lat || 0);
      const lng = parseFloat(location.lng || 0);
      
      // Create coordinate key with precision to ~11 meters
      const coordKey = `${lat.toFixed(4)}_${lng.toFixed(4)}`;
      
      if (coordMap.has(coordKey)) {
        const existing = coordMap.get(coordKey);
        const merged = this.mergeLocations(existing, location, 'exact_coordinates');
        coordMap.set(coordKey, merged);
        exactCoordDupes++;
      } else {
        coordMap.set(coordKey, { ...location, _index: index });
      }
    });

    // Add to unique locations
    coordMap.forEach(location => {
      const key = this.generatePrimaryKey(location);
      uniqueLocations.set(key, location);
    });

    if (exactCoordDupes > 0) {
      console.log(`    ✓ Found ${exactCoordDupes} exact coordinate duplicates`);
      this.duplicateReasons.set('exact_coordinates', exactCoordDupes);
    }
  }

  /**
   * Find duplicates based on normalized addresses
   */
  findAddressDuplicates(uniqueLocations) {
    const addressMap = new Map();
    let addressDupes = 0;

    Array.from(uniqueLocations.values()).forEach(location => {
      const normalizedAddress = this.normalizeAddress(location.address);
      if (normalizedAddress && normalizedAddress.length > 10) { // Skip very short addresses
        
        if (addressMap.has(normalizedAddress)) {
          const existing = addressMap.get(normalizedAddress);
          const merged = this.mergeLocations(existing, location, 'address_match');
          addressMap.set(normalizedAddress, merged);
          
          // Remove from unique locations
          const existingKey = this.generatePrimaryKey(existing);
          const currentKey = this.generatePrimaryKey(location);
          uniqueLocations.delete(existingKey);
          uniqueLocations.delete(currentKey);
          addressDupes++;
        } else {
          addressMap.set(normalizedAddress, location);
        }
      }
    });

    // Re-add merged locations
    addressMap.forEach(location => {
      const key = this.generatePrimaryKey(location);
      uniqueLocations.set(key, location);
    });

    if (addressDupes > 0) {
      console.log(`    ✓ Found ${addressDupes} address-based duplicates`);
      this.duplicateReasons.set('address_match', addressDupes);
    }
  }

  /**
   * Find duplicates using fuzzy string matching on business names
   */
  findFuzzyTitleDuplicates(uniqueLocations) {
    const locations = Array.from(uniqueLocations.values());
    const toRemove = new Set();
    const toAdd = [];
    let fuzzyDupes = 0;

    for (let i = 0; i < locations.length; i++) {
      if (toRemove.has(i)) continue;
      
      const locationA = locations[i];
      const normalizedTitleA = this.normalizeBusinessName(locationA.title);
      
      if (!normalizedTitleA || normalizedTitleA.length < 3) continue;

      for (let j = i + 1; j < locations.length; j++) {
        if (toRemove.has(j)) continue;
        
        const locationB = locations[j];
        const normalizedTitleB = this.normalizeBusinessName(locationB.title);
        
        if (!normalizedTitleB) continue;

        // Check if they're in the same general area (within 50 miles)
        if (!this.areLocationsNearby(locationA, locationB, 50)) continue;

        // Calculate similarity
        const similarity = this.calculateStringSimilarity(normalizedTitleA, normalizedTitleB);
        
        if (similarity > 0.85) { // 85% similarity threshold
          const merged = this.mergeLocations(locationA, locationB, 'fuzzy_title');
          toAdd.push(merged);
          toRemove.add(i);
          toRemove.add(j);
          fuzzyDupes++;
          break;
        }
      }
    }

    // Remove flagged duplicates and add merged ones
    toRemove.forEach(index => {
      const location = locations[index];
      const key = this.generatePrimaryKey(location);
      uniqueLocations.delete(key);
    });

    toAdd.forEach(merged => {
      const key = this.generatePrimaryKey(merged);
      uniqueLocations.set(key, merged);
    });

    if (fuzzyDupes > 0) {
      console.log(`    ✓ Found ${fuzzyDupes} fuzzy title duplicates`);
      this.duplicateReasons.set('fuzzy_title', fuzzyDupes);
    }
  }

  /**
   * Find duplicates based on phone numbers
   */
  findPhoneDuplicates(uniqueLocations) {
    const phoneMap = new Map();
    let phoneDupes = 0;

    Array.from(uniqueLocations.values()).forEach(location => {
      if (!location.phone) return;
      
      const normalizedPhone = this.normalizePhoneNumber(location.phone);
      if (!normalizedPhone) return;

      if (phoneMap.has(normalizedPhone)) {
        const existing = phoneMap.get(normalizedPhone);
        
        // Only merge if they're reasonably close (within 100 miles)
        if (this.areLocationsNearby(existing, location, 100)) {
          const merged = this.mergeLocations(existing, location, 'phone_match');
          phoneMap.set(normalizedPhone, merged);
          
          // Remove from unique locations
          const existingKey = this.generatePrimaryKey(existing);
          const currentKey = this.generatePrimaryKey(location);
          uniqueLocations.delete(existingKey);
          uniqueLocations.delete(currentKey);
          phoneDupes++;
        }
      } else {
        phoneMap.set(normalizedPhone, location);
      }
    });

    // Re-add merged locations
    phoneMap.forEach(location => {
      const key = this.generatePrimaryKey(location);
      uniqueLocations.set(key, location);
    });

    if (phoneDupes > 0) {
      console.log(`    ✓ Found ${phoneDupes} phone number duplicates`);
      this.duplicateReasons.set('phone_match', phoneDupes);
    }
  }

  /**
   * Find duplicates within close proximity (likely same business)
   */
  findProximityDuplicates(uniqueLocations) {
    const locations = Array.from(uniqueLocations.values());
    const toRemove = new Set();
    const toAdd = [];
    let proximityDupes = 0;

    for (let i = 0; i < locations.length; i++) {
      if (toRemove.has(i)) continue;
      
      const locationA = locations[i];
      if (!locationA.lat || !locationA.lng) continue;

      for (let j = i + 1; j < locations.length; j++) {
        if (toRemove.has(j)) continue;
        
        const locationB = locations[j];
        if (!locationB.lat || !locationB.lng) continue;

        const distance = this.calculateDistance(
          parseFloat(locationA.lat), parseFloat(locationA.lng),
          parseFloat(locationB.lat), parseFloat(locationB.lng)
        );

        // If within 100 meters and similar names or same category
        if (distance <= 0.1) { // 100 meters
          const titleSimilarity = this.calculateStringSimilarity(
            this.normalizeBusinessName(locationA.title || ''),
            this.normalizeBusinessName(locationB.title || '')
          );
          
          const sameCategory = locationA.category && locationB.category && 
                              locationA.category === locationB.category;
          
          if (titleSimilarity > 0.6 || sameCategory) {
            const merged = this.mergeLocations(locationA, locationB, 'proximity');
            toAdd.push(merged);
            toRemove.add(i);
            toRemove.add(j);
            proximityDupes++;
            break;
          }
        }
      }
    }

    // Remove flagged duplicates and add merged ones
    toRemove.forEach(index => {
      const location = locations[index];
      const key = this.generatePrimaryKey(location);
      uniqueLocations.delete(key);
    });

    toAdd.forEach(merged => {
      const key = this.generatePrimaryKey(merged);
      uniqueLocations.set(key, merged);
    });

    if (proximityDupes > 0) {
      console.log(`    ✓ Found ${proximityDupes} proximity-based duplicates`);
      this.duplicateReasons.set('proximity', proximityDupes);
    }
  }

  /**
   * Find duplicates using normalized business names (handles variations)
   */
  findNormalizedNameDuplicates(uniqueLocations) {
    const normalizedMap = new Map();
    let normalizedDupes = 0;

    Array.from(uniqueLocations.values()).forEach(location => {
      const normalized = this.normalizeBusinessNameAdvanced(location.title);
      if (!normalized || normalized.length < 3) return;

      const city = location.city || location.sourceCity || 'unknown';
      const key = `${normalized}_${city.toLowerCase()}`;

      if (normalizedMap.has(key)) {
        const existing = normalizedMap.get(key);
        
        // Only merge if they're in the same city/area
        if (this.areLocationsNearby(existing, location, 25)) {
          const merged = this.mergeLocations(existing, location, 'normalized_name');
          normalizedMap.set(key, merged);
          
          // Remove from unique locations
          const existingKey = this.generatePrimaryKey(existing);
          const currentKey = this.generatePrimaryKey(location);
          uniqueLocations.delete(existingKey);
          uniqueLocations.delete(currentKey);
          normalizedDupes++;
        }
      } else {
        normalizedMap.set(key, location);
      }
    });

    // Re-add merged locations
    normalizedMap.forEach(location => {
      const key = this.generatePrimaryKey(location);
      uniqueLocations.set(key, location);
    });

    if (normalizedDupes > 0) {
      console.log(`    ✓ Found ${normalizedDupes} normalized name duplicates`);
      this.duplicateReasons.set('normalized_name', normalizedDupes);
    }
  }

  /**
   * Normalize address for comparison
   */
  normalizeAddress(address) {
    if (!address) return null;
    
    return address.toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .replace(/\b(street|st|avenue|ave|road|rd|lane|ln|drive|dr|boulevard|blvd|circle|cir|court|ct|place|pl)\b/g, '') // Remove street suffixes
      .replace(/\b(north|south|east|west|n|s|e|w)\b/g, '') // Remove directions
      .replace(/\b(suite|ste|unit|apt|apartment|#)\s*\d+/g, '') // Remove suite/unit numbers
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();
  }

  /**
   * Normalize business name for comparison
   */
  normalizeBusinessName(name) {
    if (!name) return null;
    
    return name.toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .replace(/\b(llc|inc|corp|corporation|company|co|ltd|limited)\b/g, '') // Remove business suffixes
      .replace(/\b(the|and|&)\b/g, '') // Remove common words
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();
  }

  /**
   * Advanced business name normalization (handles more variations)
   */
  normalizeBusinessNameAdvanced(name) {
    if (!name) return null;
    
    let normalized = name.toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
      .replace(/\b(truck\s*stop|travel\s*center|plaza|station|store|shop|market|gas|fuel|diesel|petro|pilot|loves|flying\s*j|ta|travel\s*america)\b/g, '') // Remove common business types
      .replace(/\b(llc|inc|corp|corporation|company|co|ltd|limited|enterprises|group)\b/g, '') // Remove business suffixes
      .replace(/\b(the|and|&|of|at|in|on)\b/g, '') // Remove common words
      .replace(/\b(number|no|#)\s*\d+\b/g, '') // Remove location numbers
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();

    // Handle specific chain normalizations
    const chainMappings = {
      'loves country store': 'loves',
      'loves travel stop': 'loves',
      'flying j travel plaza': 'flying j',
      'pilot travel center': 'pilot',
      'travel america': 'ta',
      'petro stopping center': 'petro'
    };

    for (const [pattern, replacement] of Object.entries(chainMappings)) {
      if (normalized.includes(pattern)) {
        normalized = replacement;
        break;
      }
    }

    return normalized;
  }

  /**
   * Normalize phone number for comparison
   */
  normalizePhoneNumber(phone) {
    if (!phone) return null;
    
    // Extract digits only
    const digits = phone.replace(/\D/g, '');
    
    // Handle US/Canada numbers
    if (digits.length === 11 && digits.startsWith('1')) {
      return digits.substring(1);
    }
    
    if (digits.length === 10) {
      return digits;
    }
    
    return null; // Invalid phone number
  }

  /**
   * Calculate string similarity using Levenshtein distance
   */
  calculateStringSimilarity(str1, str2) {
    if (!str1 || !str2) return 0;
    if (str1 === str2) return 1;
    
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
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

  /**
   * Calculate distance between two coordinates in kilometers
   */
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convert degrees to radians
   */
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Check if two locations are within a certain distance
   */
  areLocationsNearby(loc1, loc2, maxDistanceKm) {
    if (!loc1.lat || !loc1.lng || !loc2.lat || !loc2.lng) return false;
    
    const distance = this.calculateDistance(
      parseFloat(loc1.lat), parseFloat(loc1.lng),
      parseFloat(loc2.lat), parseFloat(loc2.lng)
    );
    
    return distance <= maxDistanceKm;
  }

  /**
   * Generate a primary key for location identification
   */
  generatePrimaryKey(location) {
    const lat = parseFloat(location.lat || 0).toFixed(6);
    const lng = parseFloat(location.lng || 0).toFixed(6);
    const normalizedTitle = this.normalizeBusinessName(location.title || '');
    return `${normalizedTitle}_${lat}_${lng}`;
  }

  /**
   * Merge two locations, keeping the best data from each
   */
  mergeLocations(loc1, loc2, reason) {
    this.duplicateCount++;
    
    const merged = { ...loc1 };
    
    // Keep the most complete title
    if (!merged.title || (loc2.title && loc2.title.length > merged.title.length)) {
      merged.title = loc2.title;
    }
    
    // Keep the most complete address
    if (!merged.address || (loc2.address && loc2.address.length > merged.address.length)) {
      merged.address = loc2.address;
    }
    
    // Keep phone if missing
    if (!merged.phone && loc2.phone) {
      merged.phone = loc2.phone;
    }
    
    // Keep the most specific coordinates (more decimal places)
    if (loc2.lat && (!merged.lat || loc2.lat.toString().length > merged.lat.toString().length)) {
      merged.lat = loc2.lat;
      merged.lng = loc2.lng;
    }
    
    // Merge reviews
    if (loc2.showerReviews && loc2.showerReviews.length > 0) {
      merged.showerReviews = this.mergeReviews(
        merged.showerReviews || [],
        loc2.showerReviews
      );
      merged.showerReviewCount = merged.showerReviews.length;
    }
    
    // Keep the better rating
    if (loc2.rating && (!merged.rating || loc2.rating > merged.rating)) {
      merged.rating = loc2.rating;
    }
    
    // Merge categories
    if (loc2.category && merged.category !== loc2.category) {
      merged.category = merged.category ? `${merged.category}, ${loc2.category}` : loc2.category;
    }
    
    // Track merge reason
    merged._mergeReason = reason;
    merged._mergedFrom = [
      merged._mergedFrom || merged.sourceFile || 'unknown',
      loc2._mergedFrom || loc2.sourceFile || 'unknown'
    ].flat();
    
    return merged;
  }

  /**
   * Finalize unique locations by cleaning up temporary fields
   */
  finalizeUniqueLocations(uniqueLocations) {
    this.allLocations = Array.from(uniqueLocations.values()).map(location => {
      const cleaned = { ...location };
      
      // Remove temporary fields
      delete cleaned._index;
      delete cleaned._mergeReason;
      delete cleaned._mergedFrom;
      delete cleaned.sourceFile;
      
      // Clean and standardize remaining fields
      if (cleaned.phone) {
        cleaned.phone = this.cleanPhoneNumber(cleaned.phone);
      }
      
      if (cleaned.address) {
        cleaned.address = this.cleanAddress(cleaned.address);
      }
      
      // Ensure required fields
      cleaned.state = cleaned.state || cleaned.sourceState || 'Unknown';
      cleaned.city = cleaned.city || cleaned.sourceCity || 'Unknown';
      
      return cleaned;
    });
  }

  /**
   * Print statistics about duplicate detection
   */
  printDuplicateStatistics() {
    if (this.duplicateReasons.size > 0) {
      console.log('    Duplicate breakdown:');
      for (const [reason, count] of this.duplicateReasons.entries()) {
        console.log(`      - ${reason.replace('_', ' ')}: ${count}`);
      }
    }
  }

  // ... rest of the original methods (readAllFiles, groupByState, etc.) remain the same ...

  /**
   * Main processing function
   */
  async process() {
    try {
      console.log('Starting data processing with enhanced duplicate detection...\n');
      
      // Step 1: Read all JSON files
      await this.readAllFiles();
      
      // Step 2: Remove duplicates with enhanced detection
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
          // Check if city/state are coordinates and extract from first location if needed
          let extractedCity = data.city || 'Unknown';
          let extractedState = data.state || 'Unknown';
          
          // Check if city field contains coordinates (starts with number or minus sign)
          if (extractedCity && /^-?\d/.test(extractedCity)) {
            // Try to extract from first location's address
            const firstLocation = data.locations[0];
            if (firstLocation && firstLocation.address) {
              const extracted = this.extractCityStateFromAddress(firstLocation.address);
              extractedCity = extracted.city;
              extractedState = extracted.state;
              console.log(`  → Extracted location: ${extractedCity}, ${extractedState}`);
            }
          }
          
          // Add metadata to each location
          data.locations.forEach(location => {
            location.sourceFile = file;
            location.sourceCity = extractedCity;
            location.sourceState = extractedState;
            location.timestamp = data.timestamp || new Date().toISOString();
            
            // If city field is empty or contains invalid data, try to extract from address
            if (!location.city || location.city.includes('Truck stop') || location.city.match(/^\d/)) {
              const extracted = this.extractCityStateFromAddress(location.address);
              location.city = extracted.city || extractedCity;
              location.state = extracted.state || extractedState;
            }
          });
          
          this.allLocations.push(...data.locations);
          console.log(`  ✓ Added ${data.locations.length} locations from ${extractedCity}, ${extractedState}`);
        }
      } catch (error) {
        console.error(`  ✗ Error reading ${file}:`, error.message);
      }
    }
    
    console.log(`\nTotal locations loaded: ${this.allLocations.length}\n`);
  }

  /**
   * Clean and standardize address fields
   */
  cleanAddress(address) {
    if (!address) return null;
    
    // Remove extra whitespace
    let cleaned = address.replace(/\s+/g, ' ').trim();
    
    // Remove "United States" or "USA" at the end if present
    cleaned = cleaned.replace(/,?\s*(United States|USA|U\.S\.A\.|US)$/i, '').trim();
    
    // Remove trailing comma if present
    cleaned = cleaned.replace(/,$/, '').trim();
    
    // Standardize state abbreviations if they're lowercase
    cleaned = cleaned.replace(/,\s*([a-z]{2})\s+(\d{5})/i, (match, state, zip) => {
      return `, ${state.toUpperCase()} ${zip}`;
    });
    
    // Remove or replace special characters while preserving address structure
    cleaned = cleaned
      .replace(/[""''`´]/g, '')     // Remove quotes and backticks
      .replace(/[–—]/g, '-')         // Standardize dashes
      .replace(/[&]/g, 'and')       // Replace ampersand with 'and'
      .replace(/[#]/g, '')           // Remove pound signs
      .replace(/\./g, '')            // Remove periods
      .replace(/[()[\]{}]/g, '')    // Remove brackets and parentheses
      .replace(/[!@$%^*+=<>?;:"'~|\\]/g, '') // Remove other special chars
      .replace(/\s+,/g, ',')        // Remove space before comma
      .replace(/,+/g, ',')          // Remove multiple commas
      .replace(/\s{2,}/g, ' ')      // Remove multiple spaces
      .trim();
    
    // Clean up any remaining issues
    cleaned = cleaned
      .replace(/\s+/g, ' ')          // Final whitespace cleanup
      .replace(/,\s*,/g, ',')        // Remove double commas
      .replace(/^,\s*/, '')          // Remove leading comma
      .replace(/,\s*$/, '');         // Remove trailing comma
    
    return cleaned || null;
  }

  /**
   * Clean and standardize phone numbers
   */
  cleanPhoneNumber(phone) {
    if (!phone) return null;
    
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Handle different formats
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      // Remove country code for US/Canada numbers
      cleaned = cleaned.substring(1);
    }
    
    // Check if it's a valid 10-digit number
    if (cleaned.length === 10) {
      // Format as (XXX) XXX-XXXX
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
    }
    
    // Handle 7-digit numbers (assume local, no area code)
    if (cleaned.length === 7) {
      return `${cleaned.substring(0, 3)}-${cleaned.substring(3)}`;
    }
    
    // For international or invalid numbers, return cleaned version or null
    if (cleaned.length > 10 || cleaned.length < 7) {
      // If it looks like it might be valid but international, keep it
      if (cleaned.length > 10 && cleaned.length <= 15) {
        return '+' + cleaned;
      }
      // Otherwise, return null for invalid numbers
      return null;
    }
    
    return null;
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
   * Extract city and state from a full address string
   */
  extractCityStateFromAddress(address) {
    if (!address) return { city: null, state: null };
    
    // Pattern for US addresses: "City, State Abbreviation Zip, Country"
    const usPattern = /^(?:.*?,\s*)?([^,]+),\s*([A-Z]{2})\s+\d{5}(?:-\d{4})?(?:,\s*United States)?$/;
    const match = address.match(usPattern);
    
    if (match) {
      return {
        city: match[1].trim(),
        state: match[2].trim()
      };
    }
    
    // Alternative pattern without zip code
    const altPattern = /([^,]+),\s*([A-Z]{2})(?:,\s*United States)?$/;
    const altMatch = address.match(altPattern);
    
    if (altMatch) {
      return {
        city: altMatch[1].trim(),
        state: altMatch[2].trim()
      };
    }
    
    return { city: null, state: null };
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
          locationsWithPhone: 0,
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
      
      // Count locations with phone numbers
      if (location.phone) {
        this.locationsByState[state].locationsWithPhone++;
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
      const filename = `${state}.json`;
      const filepath = path.join(this.outputDir, filename);
      
      try {
        await fs.writeFile(filepath, JSON.stringify(data, null, 2));
        console.log(`  ✓ Saved ${filename} (${data.locationCount} locations, ${data.locationsWithPhone} with phone)`);
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
      totalWithPhone: this.allLocations.filter(loc => loc.phone).length,
      duplicateBreakdown: Object.fromEntries(this.duplicateReasons),
      states: Object.entries(this.locationsByState).map(([state, data]) => ({
        state: state,
        stateName: data.stateName,
        locationCount: data.locationCount,
        cityCount: data.cities.length,
        reviewCount: data.totalReviews,
        locationsWithPhone: data.locationsWithPhone,
        categories: data.categories,
        filename: `${state}.json`
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
    const totalWithPhone = this.allLocations.filter(loc => loc.phone).length;
    
    console.log('='.repeat(60));
    console.log('PROCESSING COMPLETE');
    console.log('='.repeat(60));
    console.log(`Total unique locations: ${this.allLocations.length}`);
    console.log(`Duplicates removed: ${this.duplicateCount}`);
    console.log(`Locations with phone: ${totalWithPhone} (${(totalWithPhone/this.allLocations.length*100).toFixed(1)}%)`);
    console.log(`States processed: ${Object.keys(this.locationsByState).length}\n`);
    
    console.log('Locations by state:');
    Object.entries(this.locationsByState)
      .sort((a, b) => b[1].locationCount - a[1].locationCount)
      .forEach(([state, data]) => {
        const phonePercent = data.locationsWithPhone > 0 
          ? ` (${(data.locationsWithPhone/data.locationCount*100).toFixed(0)}% with phone)`
          : '';
        console.log(`  ${state.padEnd(3)} - ${data.stateName.padEnd(20)} : ${data.locationCount.toString().padStart(4)} locations, ${data.cities.length.toString().padStart(3)} cities${phonePercent}`);
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