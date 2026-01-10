/**
 * UK Free Shower Scraper - Beach & Surf Facilities
 *
 * Searches Google Maps for FREE shower facilities in UK coastal areas:
 * - Beach showers / rinse stations
 * - Surf life saving clubs
 * - Public beach facilities
 * - Promenade showers
 *
 * Saves results to a SEPARATE file (uk-free-showers.json) - does not overwrite existing data.
 *
 * Usage:
 *   npx ts-node scripts/scrapers/uk/scrapeFreeShowers.ts
 *
 * Requirements:
 *   npm install puppeteer
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  outputFile: path.join(process.cwd(), 'public', 'data', 'uk', 'uk-free-showers.json'),
  headless: false,
  slowMo: 50,
  defaultTimeout: 30000,
  protocolTimeout: 120000,
  minDelay: 500,
  maxDelay: 1000,
  maxPlacesPerSearch: 20,
};

function randomDelay(): number {
  return Math.floor(Math.random() * (CONFIG.maxDelay - CONFIG.minDelay + 1)) + CONFIG.minDelay;
}

// ============================================
// UK COASTAL AREAS - Most likely to have free beach showers
// ============================================
const COASTAL_SEARCH_LOCATIONS = [
  // Cornwall - Major surf beaches
  { name: 'Newquay', region: 'south-west', regionName: 'South West' },
  { name: 'St Ives', region: 'south-west', regionName: 'South West' },
  { name: 'Penzance', region: 'south-west', regionName: 'South West' },
  { name: 'Padstow', region: 'south-west', regionName: 'South West' },
  { name: 'Falmouth', region: 'south-west', regionName: 'South West' },
  { name: 'Bude', region: 'south-west', regionName: 'South West' },
  { name: 'Perranporth', region: 'south-west', regionName: 'South West' },

  // Devon
  { name: 'Croyde', region: 'south-west', regionName: 'South West' },
  { name: 'Woolacombe', region: 'south-west', regionName: 'South West' },
  { name: 'Torquay', region: 'south-west', regionName: 'South West' },
  { name: 'Exmouth', region: 'south-west', regionName: 'South West' },
  { name: 'Sidmouth', region: 'south-west', regionName: 'South West' },

  // Dorset - Jurassic Coast
  { name: 'Bournemouth', region: 'south-west', regionName: 'South West' },
  { name: 'Poole', region: 'south-west', regionName: 'South West' },
  { name: 'Weymouth', region: 'south-west', regionName: 'South West' },
  { name: 'Swanage', region: 'south-west', regionName: 'South West' },
  { name: 'Lyme Regis', region: 'south-west', regionName: 'South West' },

  // South East Coast
  { name: 'Brighton', region: 'south-east', regionName: 'South East' },
  { name: 'Eastbourne', region: 'south-east', regionName: 'South East' },
  { name: 'Hastings', region: 'south-east', regionName: 'South East' },
  { name: 'Margate', region: 'south-east', regionName: 'South East' },
  { name: 'Broadstairs', region: 'south-east', regionName: 'South East' },
  { name: 'Whitstable', region: 'south-east', regionName: 'South East' },
  { name: 'Folkestone', region: 'south-east', regionName: 'South East' },
  { name: 'Worthing', region: 'south-east', regionName: 'South East' },
  { name: 'Littlehampton', region: 'south-east', regionName: 'South East' },
  { name: 'Bognor Regis', region: 'south-east', regionName: 'South East' },

  // East Coast
  { name: 'Southend-on-Sea', region: 'east-of-england', regionName: 'East of England' },
  { name: 'Clacton-on-Sea', region: 'east-of-england', regionName: 'East of England' },
  { name: 'Great Yarmouth', region: 'east-of-england', regionName: 'East of England' },
  { name: 'Lowestoft', region: 'east-of-england', regionName: 'East of England' },
  { name: 'Cromer', region: 'east-of-england', regionName: 'East of England' },
  { name: 'Hunstanton', region: 'east-of-england', regionName: 'East of England' },
];

// Search queries focused on FREE facilities
const FREE_SHOWER_SEARCHES = [
  'beach shower',
  'surf club',
  'free public shower',
];

// ============================================
// TYPES
// ============================================
interface FreeShowerLocation {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  postcode: string;
  ukRegion: string;
  regionName: string;
  country: string;
  lat: number;
  lng: number;
  phone: string;
  website: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  amenities: string[];
  cost: string;
  access: string;
  businessType: string;
  lastUpdated: string;
  content: string;
  isFree: boolean;
  facilityType: string; // 'beach_shower', 'surf_club', 'public_shower'
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractPostcode(address: string): string {
  const postcodeMatch = address.match(/[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i);
  return postcodeMatch ? postcodeMatch[0].toUpperCase() : '';
}

function determineFacilityType(name: string, category: string): string {
  const lower = (name + ' ' + category).toLowerCase();
  if (lower.includes('surf') || lower.includes('slsc') || lower.includes('life saving')) {
    return 'surf_club';
  }
  if (lower.includes('beach') || lower.includes('promenade') || lower.includes('seafront')) {
    return 'beach_shower';
  }
  return 'public_shower';
}

// ============================================
// SCRAPER CLASS
// ============================================
class FreeShowerScraper {
  private browser: any;
  private page: any;

  async init() {
    console.log('Launching browser...');
    this.browser = await puppeteer.launch({
      headless: CONFIG.headless,
      slowMo: CONFIG.slowMo,
      protocolTimeout: CONFIG.protocolTimeout,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled',
        '--lang=en-GB'
      ]
    });

    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1280, height: 800 });
    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );
    await this.page.setExtraHTTPHeaders({
      'Accept-Language': 'en-GB,en;q=0.9'
    });

    console.log('Browser ready');
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async acceptCookies() {
    try {
      const acceptButton = await this.page.$('button[aria-label*="Accept"]');
      if (acceptButton) {
        await acceptButton.click();
        await delay(randomDelay());
      }
    } catch (e) {
      // Cookie dialog may not appear
    }
  }

  async checkReviewsForShower(): Promise<boolean> {
    try {
      // Try to click the reviews tab/button to load reviews
      const reviewsButton = await this.page.$('button[aria-label*="Reviews"]');
      if (reviewsButton) {
        await reviewsButton.click();
        await delay(randomDelay());
      }

      // Scroll to load some reviews
      const reviewsPanel = await this.page.$('div[role="main"]');
      if (reviewsPanel) {
        await this.page.evaluate((el: any) => el.scrollBy(0, 300), reviewsPanel);
        await delay(randomDelay());
      }

      // Get all visible review text
      const reviewText = await this.page.evaluate(() => {
        const reviews: string[] = [];
        // Try multiple selectors for review content
        const reviewElements = document.querySelectorAll('span[class*="review"], div[data-review-id] span, div[class*="review"] span');
        reviewElements.forEach((el: any) => {
          if (el.textContent) {
            reviews.push(el.textContent.toLowerCase());
          }
        });
        // Also check the overall page text for shower mentions
        const pageText = document.body.innerText || '';
        return reviews.join(' ') + ' ' + pageText.toLowerCase();
      });

      // Check for shower-related keywords in reviews
      const showerKeywords = ['shower', 'rinse', 'wash off', 'freshwater'];
      return showerKeywords.some(keyword => reviewText.includes(keyword));
    } catch (error) {
      // If we can't check reviews, return false
      return false;
    }
  }

  async searchPlaces(query: string): Promise<string[]> {
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

    try {
      await this.page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: CONFIG.defaultTimeout });
      await this.acceptCookies();
      await delay(randomDelay());

      // Scroll results panel to load more
      const resultsPanel = await this.page.$('div[role="feed"]');
      if (resultsPanel) {
        for (let i = 0; i < 3; i++) {
          await this.page.evaluate((el: any) => el.scrollBy(0, 500), resultsPanel);
          await delay(randomDelay());
        }
      }

      // Get all place links
      const placeLinks = await this.page.evaluate(() => {
        const links: string[] = [];
        const anchors = document.querySelectorAll('a[href*="/maps/place/"]');
        anchors.forEach((a: any) => {
          if (a.href && !links.includes(a.href)) {
            links.push(a.href);
          }
        });
        return links.slice(0, 20);
      });

      return placeLinks;
    } catch (error) {
      console.error(`    Error searching: ${error}`);
      return [];
    }
  }

  async getPlaceDetails(placeUrl: string, searchLocation: typeof COASTAL_SEARCH_LOCATIONS[0]): Promise<FreeShowerLocation | null> {
    try {
      await this.page.goto(placeUrl, { waitUntil: 'networkidle2', timeout: CONFIG.defaultTimeout });
      await delay(randomDelay());

      const placeData = await this.page.evaluate(() => {
        const getName = () => {
          const h1 = document.querySelector('h1');
          return h1?.textContent?.trim() || '';
        };

        const getAddress = () => {
          const addressButton = document.querySelector('button[data-item-id="address"]');
          return addressButton?.textContent?.trim() || '';
        };

        const getPhone = () => {
          const phoneButton = document.querySelector('button[data-item-id*="phone"]');
          return phoneButton?.textContent?.trim() || '';
        };

        const getWebsite = () => {
          const websiteLink = document.querySelector('a[data-item-id="authority"]');
          return (websiteLink as HTMLAnchorElement)?.href || '';
        };

        const getRating = () => {
          const ratingSpan = document.querySelector('span[role="img"]');
          const match = ratingSpan?.getAttribute('aria-label')?.match(/(\d+\.?\d*)/);
          return match ? parseFloat(match[1]) : 0;
        };

        const getReviewCount = () => {
          const reviewButton = document.querySelector('button[jsaction*="review"]');
          const text = reviewButton?.textContent || '';
          const match = text.match(/(\d[\d,]*)/);
          return match ? parseInt(match[1].replace(',', '')) : 0;
        };

        const getCategory = () => {
          const categoryButton = document.querySelector('button[jsaction*="category"]');
          return categoryButton?.textContent?.trim() || 'Beach facility';
        };

        const getCoords = () => {
          const url = window.location.href;
          const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
          return match ? { lat: parseFloat(match[1]), lng: parseFloat(match[2]) } : { lat: 0, lng: 0 };
        };

        // Get amenities/about section text
        const getAboutText = () => {
          const aboutSection = document.querySelector('div[aria-label*="About"]');
          const amenitiesText = aboutSection?.textContent || '';
          // Also check for any service options or highlights
          const highlights = document.querySelectorAll('div[data-section-id="highlights"] span');
          let highlightText = '';
          highlights.forEach((h: any) => highlightText += ' ' + (h.textContent || ''));
          return amenitiesText + highlightText;
        };

        return {
          name: getName(),
          address: getAddress(),
          phone: getPhone(),
          website: getWebsite(),
          rating: getRating(),
          reviewCount: getReviewCount(),
          category: getCategory(),
          coords: getCoords(),
          aboutText: getAboutText()
        };
      });

      if (!placeData.name) {
        return null;
      }

      // Filter - only include if it looks like a free facility
      const nameLower = placeData.name.toLowerCase();
      const categoryLower = placeData.category.toLowerCase();
      const aboutLower = (placeData.aboutText || '').toLowerCase();
      const combined = nameLower + ' ' + categoryLower + ' ' + aboutLower;

      // Skip if it's clearly a paid facility
      if (combined.includes('gym') || combined.includes('leisure centre') ||
          combined.includes('swimming pool') || combined.includes('fitness') ||
          combined.includes('spa') || combined.includes('hotel')) {
        return null;
      }

      // Skip if it's clearly just a toilet without showers
      const isJustToilet = (categoryLower.includes('toilet') || categoryLower.includes('restroom') ||
                           categoryLower.includes('public bathroom') || nameLower.includes('public toilet') ||
                           nameLower.includes('public convenience') || nameLower.includes('wc')) &&
                          !combined.includes('shower');
      if (isJustToilet) {
        console.log(`      Skipping toilet-only: "${placeData.name}"`);
        return null;
      }

      // Check if "shower" is explicitly mentioned in name, category, or about section
      const hasShowerInDetails = combined.includes('shower');

      // If no shower mention in basic details, try to check reviews
      let hasShowerInReviews = false;
      if (!hasShowerInDetails) {
        hasShowerInReviews = await this.checkReviewsForShower();
      }

      // Must have shower mention somewhere to be included
      if (!hasShowerInDetails && !hasShowerInReviews) {
        // Only include surf clubs without explicit shower mention (they typically have showers)
        const isSurfClub = combined.includes('surf') || combined.includes('slsc') || combined.includes('life saving');
        if (!isSurfClub) {
          console.log(`      Skipping (no shower mention): "${placeData.name}"`);
          return null;
        }
      }

      console.log(`      Found: "${placeData.name}" (${placeData.category})`);

      const postcode = extractPostcode(placeData.address);
      const facilityType = determineFacilityType(placeData.name, placeData.category);

      const location: FreeShowerLocation = {
        id: `free-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        slug: createSlug(placeData.name),
        title: placeData.name,
        address: placeData.address || `${searchLocation.name}, UK`,
        city: searchLocation.name,
        postcode: postcode,
        ukRegion: searchLocation.region,
        regionName: searchLocation.regionName,
        country: 'UK',
        lat: placeData.coords.lat,
        lng: placeData.coords.lng,
        phone: placeData.phone,
        website: placeData.website,
        rating: placeData.rating,
        reviewCount: placeData.reviewCount,
        categories: [placeData.category, 'Beach', 'Free Shower'],
        amenities: ['Free Shower', 'Outdoor', 'Cold Water'],
        cost: 'Free',
        access: 'Public Access',
        businessType: placeData.category,
        lastUpdated: new Date().toISOString(),
        content: `${placeData.name} offers free public shower facilities in ${searchLocation.name}. These are outdoor cold-water showers, perfect for rinsing off after swimming or beach activities.`,
        isFree: true,
        facilityType: facilityType
      };

      return location;

    } catch (error) {
      console.error(`    Error getting place details: ${error}`);
      return null;
    }
  }

  async scrapeAll(): Promise<FreeShowerLocation[]> {
    console.log('\n' + '='.repeat(60));
    console.log('UK Free Shower Scraper - Beach & Surf Facilities');
    console.log('='.repeat(60));
    console.log(`Searching ${COASTAL_SEARCH_LOCATIONS.length} coastal locations`);
    console.log(`Using ${FREE_SHOWER_SEARCHES.length} search queries per location`);
    console.log('='.repeat(60));

    const allLocations: Map<string, FreeShowerLocation> = new Map();

    for (const location of COASTAL_SEARCH_LOCATIONS) {
      console.log(`\n  Location: ${location.name} (${location.regionName})`);

      for (const searchType of FREE_SHOWER_SEARCHES) {
        const query = `${searchType} ${location.name} UK`;
        console.log(`    Searching: "${query}"`);

        const placeUrls = await this.searchPlaces(query);

        if (placeUrls.length > 0) {
          console.log(`    Found ${placeUrls.length} results`);
        }

        for (const url of placeUrls.slice(0, CONFIG.maxPlacesPerSearch)) {
          const foundLocation = await this.getPlaceDetails(url, location);

          if (foundLocation && !allLocations.has(foundLocation.slug)) {
            allLocations.set(foundLocation.slug, foundLocation);
            console.log(`      ADDED: ${foundLocation.title}`);
          }

          await delay(randomDelay());
        }

        await delay(randomDelay());
      }
    }

    console.log(`\n  Total free shower locations found: ${allLocations.size}`);
    return Array.from(allLocations.values());
  }
}

// ============================================
// MAIN
// ============================================
async function main() {
  const scraper = new FreeShowerScraper();

  try {
    await scraper.init();

    const locations = await scraper.scrapeAll();

    // Group by region for summary
    const byRegion: Record<string, number> = {};
    locations.forEach(loc => {
      byRegion[loc.regionName] = (byRegion[loc.regionName] || 0) + 1;
    });

    // Save to separate JSON file
    const outputData = {
      type: 'uk-free-showers',
      description: 'Free beach showers, surf club facilities, and public showers in UK coastal areas',
      locations: locations,
      scrapedAt: new Date().toISOString(),
      totalLocations: locations.length,
      byRegion: byRegion,
      note: 'These are FREE facilities - beach showers, surf clubs, promenade rinse stations'
    };

    // Ensure directory exists
    const outputDir = path.dirname(CONFIG.outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(CONFIG.outputFile, JSON.stringify(outputData, null, 2));
    console.log(`\nSaved ${locations.length} free shower locations to ${CONFIG.outputFile}`);

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY BY REGION:');
    console.log('='.repeat(60));
    Object.entries(byRegion).sort((a, b) => b[1] - a[1]).forEach(([region, count]) => {
      console.log(`  ${region}: ${count}`);
    });
    console.log('='.repeat(60));

  } catch (error) {
    console.error('Scraper error:', error);
  } finally {
    await scraper.close();
  }

  console.log('\nScraping complete!');
}

main().catch(console.error);
