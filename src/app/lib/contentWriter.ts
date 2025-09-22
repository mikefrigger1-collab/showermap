// lib/contentWriter.ts

interface LocationData {
  title: string; 
  category: string; 
  city: string; 
  state: string; 
  country: string; 
  amenities: string; 
  cost: string; 
  access: string; 
  rating: string; 
  hours: string; 
  phone: string; 
  website: string; 
  description: string; 
  showerReviews?: any[]; 
  businessType: string; 
  address: string; 
  lat?: number;
  lng?: number;
}

export class ContentWriter {

  // Direct, authoritative openings - no hedging
  private static readonly directOpenings = [
    `{title} provides public shower facilities in {city}, {state}.`,
    `Located in {city}, {title} offers shower access for travelers and locals.`,
    `{title} operates shower facilities at {address}.`,
    `Public showers are available at {title} in {city}.`,
    `{title} in {city} maintains shower facilities open to the public.`,
  ];

  // Specific amenity descriptions - be concrete, not vague
  private static readonly amenityDescriptions: Record<string, string> = {
    'Hot Water': 'hot water',
    'Towels': 'towel service',
    'Lockers': 'secure lockers',
    'Soap': 'soap dispensers',
    'Accessible': 'wheelchair accessible facilities',
    'Parking': 'on-site parking',
    'WiFi': 'free WiFi',
    'Shampoo': 'shampoo dispensers',
    'Hair Dryers': 'hair dryers',
    'Private Stalls': 'private shower stalls'
  };

  static writeContentPackage(location: LocationData): { 
    seoTitle: string; 
    metaDescription: string; 
    content: string;
    schemaMarkup?: any;
  } {
    const seed = this.createSeed(location);
    const articleStructure = this.determineArticleStructure(seed);
    
    return {
      seoTitle: this.createSEOTitle(location),
      metaDescription: this.createMetaDescription(location),
      content: this.writeArticle(location, articleStructure, seed),
      schemaMarkup: this.generateSchemaMarkup(location)
    };
  }

  private static createSeed(location: LocationData): number {
    const seedString = `${location.title}${location.address}${location.phone}`;
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = ((hash << 5) - hash + seedString.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash);
  }

  // Vary article structure to avoid templating
  private static determineArticleStructure(seed: number): string[] {
    const structures = [
      ['intro', 'amenities', 'access', 'reviews', 'location', 'tips'],
      ['intro', 'location', 'amenities', 'pricing', 'reviews'],
      ['intro', 'reviews', 'facilities', 'access', 'contact'],
      ['intro', 'access', 'location', 'amenities', 'summary'],
      ['intro', 'facilities', 'pricing', 'location', 'reviews', 'contact']
    ];
    return structures[seed % structures.length];
  }

  private static createSEOTitle(location: LocationData): string {
    const { title, city, state, category } = location;
    
    // Focus on local SEO with category
    if (category && category !== 'Public Facility') {
      return `${title} Showers | ${category} in ${city}, ${state}`;
    }
    return `${title} | Public Showers in ${city}, ${state}`;
  }

  private static createMetaDescription(location: LocationData): string {
    const { title, city, state, cost, amenities, rating } = location;
    
    let description = `${title} in ${city}, ${state} offers public shower facilities`;
    
    // Add concrete details
    if (cost && cost !== 'Contact for pricing') {
      description += ` for ${cost}`;
    }
    
    if (rating && parseFloat(rating) > 0) {
      description += ` (${rating} stars)`;
    }
    
    // Add specific amenities
    const amenityList = amenities ? amenities.split('|').filter(a => a.trim()).slice(0, 3) : [];
    if (amenityList.length > 0) {
      const translated = amenityList.map(a => 
        this.amenityDescriptions[a] || a.toLowerCase()
      ).join(', ');
      description += `. Features: ${translated}`;
    }
    
    description += `. Current hours, directions, and visitor information.`;
    
    return description.substring(0, 160); // Keep under 160 chars
  }

  private static writeArticle(
    location: LocationData, 
    structure: string[], 
    seed: number
  ): string {
    const sections: string[] = [];
    
    structure.forEach(section => {
      switch(section) {
        case 'intro':
          sections.push(this.writeIntro(location, seed));
          break;
        case 'amenities':
          sections.push(this.writeAmenities(location));
          break;
        case 'facilities':
          sections.push(this.writeFacilities(location));
          break;
        case 'access':
        case 'pricing':
          sections.push(this.writeAccessAndPricing(location));
          break;
        case 'location':
          sections.push(this.writeLocationDetails(location));
          break;
        case 'reviews':
          if (location.showerReviews && location.showerReviews.length > 0) {
            sections.push(this.writeReviewSummary(location));
          }
          break;
        case 'contact':
          sections.push(this.writeContactInfo(location));
          break;
        case 'tips':
          sections.push(this.writePracticalInfo(location, seed));
          break;
        case 'summary':
          sections.push(this.writeSummary(location));
          break;
      }
    });
    
    return sections.filter(s => s && s.length > 0).join('\n\n');
  }

  private static writeIntro(location: LocationData, seed: number): string {
    const { title, city, state, category, rating, address } = location;
    
    // Direct, factual opening
    let intro = this.directOpenings[seed % this.directOpenings.length]
      .replace('{title}', title)
      .replace('{city}', city)
      .replace('{state}', state)
      .replace('{address}', address);
    
    // Add specific category context if relevant
    if (category === 'YMCA') {
      intro += ` As a YMCA facility, day passes are typically available for non-members.`;
    } else if (category === 'Recreation Center') {
      intro += ` This municipal recreation center serves both residents and visitors.`;
    } else if (category === 'Truck Stop') {
      intro += ` The facility caters primarily to commercial drivers and travelers.`;
    } else if (category === 'Gym') {
      intro += ` Day passes or guest passes may be required for shower access.`;
    }
    
    // Add rating if strong
    if (rating && parseFloat(rating) >= 4.0) {
      intro += ` The facility maintains a ${rating}-star rating from visitors.`;
    }
    
    return intro;
  }

  private static writeAmenities(location: LocationData): string {
    const { amenities, title } = location;
    
    if (!amenities || amenities.trim() === '') {
      return `Specific amenity information for ${title} should be confirmed by calling ahead.`;
    }
    
    const amenityList = amenities.split('|').filter(a => a.trim());
    if (amenityList.length === 0) return '';
    
    // Group amenities logically
    const essentials = amenityList.filter(a => 
      ['Hot Water', 'Soap', 'Towels'].includes(a)
    );
    const security = amenityList.filter(a => 
      ['Lockers', 'Security', 'Surveillance'].includes(a)
    );
    const accessibility = amenityList.filter(a => 
      ['Accessible', 'ADA Compliant'].includes(a)
    );
    const extras = amenityList.filter(a => 
      !essentials.includes(a) && !security.includes(a) && !accessibility.includes(a)
    );
    
    let content = 'Facilities include ';
    const allGroups = [];
    
    if (essentials.length > 0) {
      allGroups.push(essentials.map(a => 
        this.amenityDescriptions[a] || a.toLowerCase()
      ).join(' and '));
    }
    
    if (security.length > 0) {
      allGroups.push(security.map(a => 
        this.amenityDescriptions[a] || a.toLowerCase()
      ).join(' and '));
    }
    
    if (accessibility.length > 0) {
      allGroups.push('wheelchair accessible facilities');
    }
    
    if (extras.length > 0) {
      allGroups.push(extras.map(a => 
        this.amenityDescriptions[a] || a.toLowerCase()
      ).join(', '));
    }
    
    content += allGroups.join('. Additional amenities include ');
    content += '.';
    
    return content;
  }

  private static writeFacilities(location: LocationData): string {
    const { category, title } = location;
    
    // Category-specific facility descriptions
    if (category === 'YMCA') {
      return `The ${title} shower facilities are part of the locker room complex, typically including both individual stalls and open shower areas. Member and day pass holders have equal access to all amenities.`;
    } else if (category === 'Recreation Center') {
      return `Shower facilities are located in the locker room areas. Access may require facility entry fee or day pass purchase at the front desk.`;
    } else if (category === 'Truck Stop') {
      return `Private shower rooms are available 24/7. Each room typically includes a toilet, sink, and shower stall with a locking door for complete privacy.`;
    } else if (category === 'Gym') {
      return `Showers are located in the main locker rooms. Guest passes or day passes can be purchased at the front desk for facility access.`;
    }
    
    return `The ${title} maintains shower facilities for public use. Specific facility layout and features vary by location.`;
  }

  private static writeAccessAndPricing(location: LocationData): string {
    const { cost, access, title } = location;
    let content = '';
    
    if (cost && cost !== 'Contact for pricing') {
      content = `Current pricing is ${cost}`;
      
      if (access && access !== 'Contact for access') {
        content += ` for ${access}`;
      }
      content += '.';
      
      // Add context for free facilities
      if (cost.toLowerCase().includes('free')) {
        content += ' No payment required for shower use.';
      }
    } else if (access && access !== 'Contact for access') {
      content = `Access available through ${access}. Contact facility for current pricing.`;
    } else {
      content = `Contact ${title} directly for current pricing and access information.`;
    }
    
    return content;
  }

  private static writeLocationDetails(location: LocationData): string {
    const { address, city, state, phone } = location;
    
    let content = `The facility is located at ${address}`;
    
    // Add neighborhood/area context if available
    const cityArea = this.getCityArea(city, state);
    if (cityArea) {
      content += `, in the ${cityArea} area`;
    }
    
    content += '.';
    
    // Add parking or transit info based on location type
    if (location.category === 'YMCA' || location.category === 'Recreation Center') {
      content += ' Free parking is typically available on-site.';
    } else if (location.category === 'Truck Stop') {
      content += ' Ample truck and RV parking available.';
    }
    
    if (phone) {
      content += ` For directions or parking information, call ${phone}.`;
    }
    
    return content;
  }

  private static getCityArea(city: string, state: string): string | null {
    // This would ideally pull from a database of neighborhoods
    // For now, return null to avoid making up information
    return null;
  }

  private static writeReviewSummary(location: LocationData): string {
    const { showerReviews, rating } = location;
    
    if (!showerReviews || showerReviews.length === 0) return '';
    
    const recentReviews = showerReviews.slice(0, 3);
    let content = `Recent visitor feedback highlights `;
    
    // Extract common themes from reviews
    const themes: string[] = [];
    const reviewTexts = recentReviews.map(r => r.reviewText?.toLowerCase() || '').join(' ');
    
    if (reviewTexts.includes('clean')) themes.push('cleanliness');
    if (reviewTexts.includes('hot water')) themes.push('reliable hot water');
    if (reviewTexts.includes('staff') || reviewTexts.includes('friendly')) themes.push('helpful staff');
    if (reviewTexts.includes('quick') || reviewTexts.includes('fast')) themes.push('minimal wait times');
    
    if (themes.length > 0) {
      content += themes.join(', ');
    } else {
      content += 'consistent service quality';
    }
    
    if (rating && parseFloat(rating) > 0) {
      content += `. Overall rating: ${rating} stars.`;
    } else {
      content += '.';
    }
    
    return content;
  }

  private static writeContactInfo(location: LocationData): string {
    const { phone, website, title } = location;
    let content = '';
    
    if (phone) {
      content = `For current hours and facility status, call ${title} at ${phone}.`;
      
      if (website) {
        content += ` Additional information available at their website.`;
      }
    } else if (website) {
      content = `Visit the ${title} website for current hours and facility information.`;
    } else {
      content = `Contact ${title} directly for current operating hours and facility details.`;
    }
    
    return content;
  }

  private static writePracticalInfo(location: LocationData, seed: number): string {
    const { category, cost } = location;
    const tips: string[] = [];
    
    // Category-specific tips
    if (category === 'YMCA' || category === 'Gym') {
      tips.push('Bring your own lock for lockers');
      tips.push('Check for member guest pass discounts');
    } else if (category === 'Recreation Center') {
      tips.push('Resident discounts may apply with ID');
      tips.push('Senior and student rates often available');
    } else if (category === 'Truck Stop') {
      tips.push('Shower tickets may be earned with fuel purchase');
      tips.push('Team driver discounts sometimes available');
    } else {
      tips.push('Call ahead to confirm current hours');
      tips.push('Bring your own towel and toiletries');
    }
    
    // Cost-based tips
    if (cost && cost.toLowerCase().includes('free')) {
      tips.push('Arrive early during peak times as facilities may be busy');
    }
    
    // Select different tips based on seed to vary content
    const selectedTips = [tips[seed % tips.length], tips[(seed + 1) % tips.length]]
      .filter(tip => tip);
    
    if (selectedTips.length > 0) {
      return `Practical tips: ${selectedTips.join('. ')}.`;
    }
    
    return '';
  }

  private static writeSummary(location: LocationData): string {
    const { title, city, cost } = location;
    
    let summary = `${title} serves the ${city} area`;
    
    if (cost && cost.toLowerCase().includes('free')) {
      summary += ' as a free public shower facility';
    } else {
      summary += ' with public shower access';
    }
    
    summary += '. Verify current hours and requirements before visiting.';
    
    return summary;
  }

  private static generateSchemaMarkup(location: LocationData): any {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": location.title,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": location.address,
        "addressLocality": location.city,
        "addressRegion": location.state,
        "addressCountry": location.country || "USA"
      },
      "telephone": location.phone || undefined,
      "url": location.website || undefined,
      "aggregateRating": location.rating && parseFloat(location.rating) > 0 ? {
        "@type": "AggregateRating",
        "ratingValue": location.rating,
        "reviewCount": location.showerReviews?.length || 1
      } : undefined,
      "geo": location.lat && location.lng ? {
        "@type": "GeoCoordinates",
        "latitude": location.lat,
        "longitude": location.lng
      } : undefined,
      "priceRange": location.cost || undefined
    };
  }
}