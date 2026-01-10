/**
 * UK Shower Facilities Scraper - Google Maps Version
 *
 * Searches Google Maps for facilities and verifies they have showers
 * by checking if reviews mention "shower" keywords.
 *
 * Usage:
 *   npx ts-node scripts/scrapers/uk/scrapeGoogleMaps.ts              # Scrape all regions
 *   npx ts-node scripts/scrapers/uk/scrapeGoogleMaps.ts london       # Scrape London only
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
  outputDir: path.join(process.cwd(), 'public', 'data', 'uk'),
  headless: false, // Set to false to see browser
  slowMo: 50, // Slow down actions by 50ms
  defaultTimeout: 30000,
  protocolTimeout: 120000, // 2 minutes for slow Google Maps pages
  minDelay: 500, // Min delay between actions (ms)
  maxDelay: 1000, // Max delay between actions (ms)
  maxReviewsToCheck: 20, // Max reviews to load per place
  maxPlacesPerSearch: 15, // Max places to check per search query
};

// Random delay helper - varies between minDelay and maxDelay
function randomDelay(): number {
  return Math.floor(Math.random() * (CONFIG.maxDelay - CONFIG.minDelay + 1)) + CONFIG.minDelay;
}

// Shower-related keywords to search for in reviews
const SHOWER_KEYWORDS = [
  'shower', 'showers', 'showering', 'showered',
  'locker room', 'locker rooms', 'lockers',
  'changing room', 'changing rooms', 'changing facilities',
  'wash', 'washing facilities', 'freshen up',
  'hot water', 'water pressure', 'power shower',
  'towel', 'towels',
  'clean facilities', 'hygiene',
  'cubicle', 'cubicles', // UK term for shower stalls
  'wetroom', 'wet room',
  'swimming', 'after swim', 'post-swim', // Pool context
  'after workout', 'post-workout', // Gym context
  'trucker facilities', 'driver facilities', // Motorway services
  'hairdryer', 'hair dryer' // Usually means shower facilities nearby
];

// ============================================
// UK REGIONS
// ============================================
interface UKRegion {
  slug: string;
  name: string;
  searchCities: string[];
}

const UK_REGIONS: UKRegion[] = [
  {
    slug: 'north-west',
    name: 'North West',
    searchCities: ['Manchester', 'Liverpool', 'Chester', 'Preston']
  },
  {
    slug: 'north-east',
    name: 'North East',
    searchCities: ['Newcastle', 'Sunderland', 'Durham']
  },
  {
    slug: 'scotland',
    name: 'Scotland',
    searchCities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee']
  },
  {
    slug: 'wales',
    name: 'Wales',
    searchCities: ['Cardiff', 'Swansea', 'Newport']
  },
  {
    slug: 'northern-ireland',
    name: 'Northern Ireland',
    searchCities: ['Belfast', 'Derry', 'Lisburn']
  }
];

// Search queries for each city
const FACILITY_SEARCHES = [
  // Leisure & Sports
  'leisure centre with showers',
  'gym with showers',
  'swimming pool public',
  'sports centre',
  'lido', // Outdoor pools - popular in UK
  'YMCA',
  'public baths',
  'fitness centre day pass',

  // Budget Gyms (day passes available)
  'PureGym',
  'The Gym Group',
  'JD Gyms',
  'Energie Fitness',


  // Motorway & Truck Stops
  'motorway services',
  'truck stop',
  'Moto services',
  'Welcome Break services',
  'Roadchef services',
  'Extra services',

  // Hostels & Accommodation
  'YHA hostel',
  'hostel with showers',

  // Camping
  'campsite with showers',
  'caravan park',
  'holiday park',

];

// ============================================
// TYPES
// ============================================
interface ShowerReview {
  reviewText: string;
  rating?: number;
  author?: string;
}

interface VerifiedLocation {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  postcode: string;
  ukRegion: string;
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
  hours: Record<string, string>;
  showerReviews: ShowerReview[];
  showerReviewCount: number;
  businessType: string;
  verified: boolean;
  lastUpdated: string;
  content: string;
  street: string;
  province: string;
  state: string;
  zip: string;
  email: string;
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

function containsShowerKeyword(text: string): boolean {
  const lowerText = text.toLowerCase();
  return SHOWER_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

function extractPostcode(address: string): string {
  const postcodeMatch = address.match(/[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i);
  return postcodeMatch ? postcodeMatch[0].toUpperCase() : '';
}

function extractCity(address: string, searchCity: string): string {
  // Try to extract city from address, fallback to search city
  const parts = address.split(',').map(p => p.trim());
  if (parts.length >= 2) {
    // Usually city is second to last part (before postcode)
    const potentialCity = parts[parts.length - 2];
    if (potentialCity && !potentialCity.match(/[A-Z]{1,2}[0-9]/)) {
      return potentialCity;
    }
  }
  return searchCity;
}

// ============================================
// SCRAPER CLASS
// ============================================
class GoogleMapsScraper {
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

    // Set viewport and user agent
    await this.page.setViewport({ width: 1280, height: 800 });
    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Accept cookies if prompted
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
      // Wait for and click cookie accept button
      const acceptButton = await this.page.$('button[aria-label*="Accept"]');
      if (acceptButton) {
        await acceptButton.click();
        await delay(randomDelay());
      }
    } catch (e) {
      // Cookie dialog may not appear
    }
  }

  async searchPlaces(query: string): Promise<string[]> {
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

    try {
      await this.page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: CONFIG.defaultTimeout });
      await this.acceptCookies();
      await delay(randomDelay());

      // Scroll the results panel to load more
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
        return links.slice(0, 15); // Limit results
      });

      return placeLinks;
    } catch (error) {
      console.error(`    Error searching: ${error}`);
      return [];
    }
  }

  async getPlaceDetails(placeUrl: string, searchCity: string, regionSlug: string, regionName: string): Promise<VerifiedLocation | null> {
    try {
      await this.page.goto(placeUrl, { waitUntil: 'networkidle2', timeout: CONFIG.defaultTimeout });
      await delay(randomDelay());

      // Extract basic info
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
          return categoryButton?.textContent?.trim() || 'Fitness Centre';
        };

        const getCoords = () => {
          const url = window.location.href;
          const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
          return match ? { lat: parseFloat(match[1]), lng: parseFloat(match[2]) } : { lat: 0, lng: 0 };
        };

        return {
          name: getName(),
          address: getAddress(),
          phone: getPhone(),
          website: getWebsite(),
          rating: getRating(),
          reviewCount: getReviewCount(),
          category: getCategory(),
          coords: getCoords()
        };
      });

      if (!placeData.name || !placeData.address) {
        return null;
      }

      // Now check reviews for shower mentions
      const showerReviews = await this.getShowerReviews();

      if (showerReviews.length === 0) {
        // No shower mentions found - skip this place
        return null;
      }

      console.log(`      VERIFIED: "${placeData.name}" - ${showerReviews.length} shower reviews found`);

      const postcode = extractPostcode(placeData.address);
      const city = extractCity(placeData.address, searchCity);

      const location: VerifiedLocation = {
        id: `gm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        slug: createSlug(placeData.name),
        title: placeData.name,
        address: placeData.address,
        street: placeData.address.split(',')[0] || '',
        city: city,
        postcode: postcode,
        zip: postcode,
        province: regionName,
        state: regionName,
        ukRegion: regionSlug,
        country: 'UK',
        lat: placeData.coords.lat,
        lng: placeData.coords.lng,
        phone: placeData.phone,
        email: '',
        website: placeData.website,
        rating: placeData.rating,
        reviewCount: placeData.reviewCount,
        categories: [placeData.category],
        amenities: ['Showers', 'Changing Rooms'],
        cost: 'Contact for pricing',
        access: 'Contact for access',
        hours: {},
        showerReviews: showerReviews,
        showerReviewCount: showerReviews.length,
        businessType: placeData.category,
        verified: true,
        lastUpdated: new Date().toISOString(),
        content: `${placeData.name} is a verified shower facility in ${city}, ${regionName}. User reviews confirm shower facilities are available. Contact the venue for current pricing and access information.`
      };

      return location;

    } catch (error) {
      console.error(`    Error getting place details: ${error}`);
      return null;
    }
  }

  async getShowerReviews(): Promise<ShowerReview[]> {
    const showerReviews: ShowerReview[] = [];

    try {
      // Click on reviews tab
      const reviewsTab = await this.page.$('button[aria-label*="Reviews"]');
      if (reviewsTab) {
        await reviewsTab.click();
        await delay(randomDelay());
      }

      // Scroll to load more reviews
      const reviewsPanel = await this.page.$('div[role="main"]');
      if (reviewsPanel) {
        for (let i = 0; i < 5; i++) {
          await this.page.evaluate((el: any) => el.scrollBy(0, 800), reviewsPanel);
          await delay(randomDelay());
        }
      }

      // Expand "More" buttons on reviews
      const moreButtons = await this.page.$$('button[aria-label="See more"]');
      for (const button of moreButtons.slice(0, 10)) {
        try {
          await button.click();
          await delay(randomDelay());
        } catch (e) {
          // Button may not be clickable
        }
      }

      // Extract reviews
      const reviews = await this.page.evaluate(() => {
        const reviewElements = document.querySelectorAll('div[data-review-id]');
        const extracted: { text: string; rating: number; author: string }[] = [];

        reviewElements.forEach((el) => {
          const textEl = el.querySelector('span[data-expandable-section]') || el.querySelector('.wiI7pd');
          const ratingEl = el.querySelector('span[role="img"]');
          const authorEl = el.querySelector('div.d4r55');

          const text = textEl?.textContent?.trim() || '';
          const ratingMatch = ratingEl?.getAttribute('aria-label')?.match(/(\d)/);
          const rating = ratingMatch ? parseInt(ratingMatch[1]) : 0;
          const author = authorEl?.textContent?.trim() || '';

          if (text) {
            extracted.push({ text, rating, author });
          }
        });

        return extracted;
      });

      // Filter for shower-related reviews
      for (const review of reviews) {
        if (containsShowerKeyword(review.text)) {
          showerReviews.push({
            reviewText: review.text,
            rating: review.rating,
            author: review.author
          });
        }
      }

    } catch (error) {
      console.error(`    Error getting reviews: ${error}`);
    }

    return showerReviews;
  }

  async scrapeRegion(region: UKRegion): Promise<VerifiedLocation[]> {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Scraping ${region.name} (searching for shower mentions in reviews)`);
    console.log(`${'='.repeat(60)}`);

    const allLocations: Map<string, VerifiedLocation> = new Map();

    for (const city of region.searchCities) {
      console.log(`\n  City: ${city}`);

      for (const searchType of FACILITY_SEARCHES) {
        const query = `${searchType} in ${city} UK`;
        console.log(`    Searching: "${query}"`);

        const placeUrls = await this.searchPlaces(query);
        console.log(`    Found ${placeUrls.length} places to check`);

        for (const url of placeUrls.slice(0, CONFIG.maxPlacesPerSearch)) {
          const location = await this.getPlaceDetails(url, city, region.slug, region.name);

          if (location && !allLocations.has(location.slug)) {
            allLocations.set(location.slug, location);
          }

          await delay(randomDelay());
        }

        await delay(randomDelay()); // Delay between searches
      }
    }

    console.log(`\n  Total verified locations for ${region.name}: ${allLocations.size}`);
    return Array.from(allLocations.values());
  }
}

// ============================================
// MAIN
// ============================================
async function main() {
  const args = process.argv.slice(2);
  const targetRegion = args[0]?.toLowerCase();

  // Filter regions if specific one requested
  let regionsToScrape = UK_REGIONS;
  if (targetRegion) {
    regionsToScrape = UK_REGIONS.filter(r => r.slug === targetRegion);
    if (regionsToScrape.length === 0) {
      console.error(`Unknown region: ${targetRegion}`);
      console.log('Available regions:', UK_REGIONS.map(r => r.slug).join(', '));
      process.exit(1);
    }
  }

  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  const scraper = new GoogleMapsScraper();

  try {
    await scraper.init();

    for (const region of regionsToScrape) {
      const locations = await scraper.scrapeRegion(region);

      // Save to JSON file
      const outputData = {
        region: region.slug,
        regionName: region.name,
        country: 'UK',
        locations: locations,
        scrapedAt: new Date().toISOString(),
        totalLocations: locations.length,
        note: 'All locations verified via Google Maps reviews mentioning showers'
      };

      const outputPath = path.join(CONFIG.outputDir, `${region.slug}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
      console.log(`\nSaved ${locations.length} locations to ${outputPath}`);
    }

  } catch (error) {
    console.error('Scraper error:', error);
  } finally {
    await scraper.close();
  }

  console.log('\n' + '='.repeat(60));
  console.log('Scraping complete!');
  console.log('='.repeat(60));
}

main().catch(console.error);
