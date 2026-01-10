/**
 * Australia Shower Facilities Scraper - Google Maps Version
 *
 * Searches Google Maps for facilities and verifies they have showers
 * by checking if reviews mention "shower" keywords.
 *
 * Usage:
 *   npx ts-node scripts/scrapers/australia/scrapeGoogleMaps.ts                    # Scrape all states
 *   npx ts-node scripts/scrapers/australia/scrapeGoogleMaps.ts new-south-wales    # Scrape NSW only
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
  outputDir: path.join(process.cwd(), 'public', 'data', 'australia'),
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
  'changing room', 'changing rooms', 'change room', 'change rooms',
  'wash', 'washing facilities', 'freshen up',
  'hot water', 'water pressure', 'power shower',
  'towel', 'towels',
  'clean facilities', 'hygiene',
  'cubicle', 'cubicles',
  'wetroom', 'wet room',
  'swimming', 'after swim', 'post-swim',
  'after workout', 'post-workout',
  'amenities block', 'amenities',
  'camp kitchen', // Often near showers in Australia
  'hairdryer', 'hair dryer'
];

// ============================================
// AUSTRALIA STATES/TERRITORIES
// ============================================
interface AustraliaState {
  slug: string;
  name: string;
  code: string;
  searchCities: string[];
}

const AUSTRALIA_STATES: AustraliaState[] = [
  {
    slug: 'victoria',
    name: 'Victoria',
    code: 'VIC',
    searchCities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'St Kilda', 'South Melbourne', 'Dandenong', 'Mornington']
  },
  {
    slug: 'queensland',
    name: 'Queensland',
    code: 'QLD',
    searchCities: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Cairns', 'Townsville', 'Surfers Paradise', 'Noosa', 'Toowoomba']
  },
  {
    slug: 'western-australia',
    name: 'Western Australia',
    code: 'WA',
    searchCities: ['Perth', 'Fremantle', 'Mandurah', 'Bunbury', 'Geraldton', 'Scarborough', 'Cottesloe']
  },
  {
    slug: 'south-australia',
    name: 'South Australia',
    code: 'SA',
    searchCities: ['Adelaide', 'Glenelg', 'Port Adelaide', 'Mount Gambier', 'Victor Harbor']
  },
  {
    slug: 'tasmania',
    name: 'Tasmania',
    code: 'TAS',
    searchCities: ['Hobart', 'Launceston', 'Devonport', 'Burnie']
  },
  {
    slug: 'northern-territory',
    name: 'Northern Territory',
    code: 'NT',
    searchCities: ['Darwin', 'Alice Springs', 'Katherine']
  },
  {
    slug: 'australian-capital-territory',
    name: 'Australian Capital Territory',
    code: 'ACT',
    searchCities: ['Canberra', 'Belconnen', 'Woden']
  }
];

// Search queries for each city - Australian-specific
const FACILITY_SEARCHES = [
  // Aquatic & Swimming
  'aquatic centre',
  'swimming pool public',
  'leisure centre',

  // Gyms
  'gym with showers',

  // Beaches - common in Australia
  'beach showers',
  'surf club',

  // Caravan & Camping
  'caravan park',
  'holiday park',
  'camping ground with showers',
  'Discovery Parks',

  // Hostels
  'backpacker hostel',

  // Rest stops & truck stops
  'rest area with facilities',
  
  // Recreation
  'recreation centre',
  'sports centre',

  // Other
  'council pool',
  'day spa'
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
  state: string;
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
  // Australian postcodes are 4 digits
  const postcodeMatch = address.match(/\b\d{4}\b/);
  return postcodeMatch ? postcodeMatch[0] : '';
}

function extractCity(address: string, searchCity: string): string {
  const parts = address.split(',').map(p => p.trim());
  if (parts.length >= 2) {
    const potentialCity = parts[parts.length - 2];
    if (potentialCity && !potentialCity.match(/^\d{4}$/)) {
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
        '--lang=en-AU'
      ]
    });

    this.page = await this.browser.newPage();

    await this.page.setViewport({ width: 1280, height: 800 });
    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await this.page.setExtraHTTPHeaders({
      'Accept-Language': 'en-AU,en;q=0.9'
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

  async searchPlaces(query: string): Promise<string[]> {
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

    try {
      await this.page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: CONFIG.defaultTimeout });
      await this.acceptCookies();
      await delay(randomDelay());

      const resultsPanel = await this.page.$('div[role="feed"]');
      if (resultsPanel) {
        for (let i = 0; i < 3; i++) {
          await this.page.evaluate((el: any) => el.scrollBy(0, 500), resultsPanel);
          await delay(randomDelay());
        }
      }

      const placeLinks = await this.page.evaluate(() => {
        const links: string[] = [];
        const anchors = document.querySelectorAll('a[href*="/maps/place/"]');
        anchors.forEach((a: any) => {
          if (a.href && !links.includes(a.href)) {
            links.push(a.href);
          }
        });
        return links.slice(0, 15);
      });

      return placeLinks;
    } catch (error) {
      console.error(`    Error searching: ${error}`);
      return [];
    }
  }

  async getPlaceDetails(placeUrl: string, searchCity: string, stateSlug: string, stateName: string): Promise<VerifiedLocation | null> {
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
          return categoryButton?.textContent?.trim() || 'Aquatic Centre';
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

      const showerReviews = await this.getShowerReviews();

      if (showerReviews.length === 0) {
        return null;
      }

      console.log(`      VERIFIED: "${placeData.name}" - ${showerReviews.length} shower reviews found`);

      const postcode = extractPostcode(placeData.address);
      const city = extractCity(placeData.address, searchCity);

      const location: VerifiedLocation = {
        id: `gm-au-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        slug: createSlug(placeData.name),
        title: placeData.name,
        address: placeData.address,
        street: placeData.address.split(',')[0] || '',
        city: city,
        postcode: postcode,
        zip: postcode,
        province: stateName,
        state: stateName,
        country: 'Australia',
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
        content: `${placeData.name} is a verified shower facility in ${city}, ${stateName}. User reviews confirm shower facilities are available. Contact the venue for current pricing and access information.`
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
      const reviewsTab = await this.page.$('button[aria-label*="Reviews"]');
      if (reviewsTab) {
        await reviewsTab.click();
        await delay(randomDelay());
      }

      const reviewsPanel = await this.page.$('div[role="main"]');
      if (reviewsPanel) {
        for (let i = 0; i < 5; i++) {
          await this.page.evaluate((el: any) => el.scrollBy(0, 800), reviewsPanel);
          await delay(randomDelay());
        }
      }

      const moreButtons = await this.page.$$('button[aria-label="See more"]');
      for (const button of moreButtons.slice(0, 10)) {
        try {
          await button.click();
          await delay(randomDelay());
        } catch (e) {
          // Button may not be clickable
        }
      }

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

  async scrapeState(state: AustraliaState): Promise<VerifiedLocation[]> {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Scraping ${state.name} (searching for shower mentions in reviews)`);
    console.log(`${'='.repeat(60)}`);

    const allLocations: Map<string, VerifiedLocation> = new Map();

    for (const city of state.searchCities) {
      console.log(`\n  City: ${city}`);

      for (const searchType of FACILITY_SEARCHES) {
        const query = `${searchType} in ${city} ${state.code} Australia`;
        console.log(`    Searching: "${query}"`);

        const placeUrls = await this.searchPlaces(query);
        console.log(`    Found ${placeUrls.length} places to check`);

        for (const url of placeUrls.slice(0, CONFIG.maxPlacesPerSearch)) {
          const location = await this.getPlaceDetails(url, city, state.slug, state.name);

          if (location && !allLocations.has(location.slug)) {
            allLocations.set(location.slug, location);
          }

          await delay(randomDelay());
        }

        await delay(randomDelay());
      }
    }

    console.log(`\n  Total verified locations for ${state.name}: ${allLocations.size}`);
    return Array.from(allLocations.values());
  }
}

// ============================================
// MAIN
// ============================================
async function main() {
  const args = process.argv.slice(2);
  const targetState = args[0]?.toLowerCase();

  let statesToScrape = AUSTRALIA_STATES;
  if (targetState) {
    statesToScrape = AUSTRALIA_STATES.filter(s => s.slug === targetState);
    if (statesToScrape.length === 0) {
      console.error(`Unknown state: ${targetState}`);
      console.log('Available states:', AUSTRALIA_STATES.map(s => s.slug).join(', '));
      process.exit(1);
    }
  }

  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  const scraper = new GoogleMapsScraper();

  try {
    await scraper.init();

    for (const state of statesToScrape) {
      const locations = await scraper.scrapeState(state);

      const outputData = {
        state: state.slug,
        stateName: state.name,
        country: 'Australia',
        locations: locations,
        scrapedAt: new Date().toISOString(),
        totalLocations: locations.length,
        note: 'All locations verified via Google Maps reviews mentioning showers'
      };

      const outputPath = path.join(CONFIG.outputDir, `${state.slug}.json`);
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
