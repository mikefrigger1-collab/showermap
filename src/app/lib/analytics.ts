// src/app/lib/analytics.ts
// Lightweight GA4 (gtag) event helper. Safe to call from anywhere on the client;
// no-ops on the server or before gtag has loaded.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      action: string,
      params?: GtagParams
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fire a GA4 custom event. Silently does nothing if gtag isn't available
 * (SSR, ad-blockers, or before the script loads).
 */
export function trackEvent(action: string, params: GtagParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  // Drop undefined values so they don't show up as "(not set)" in GA.
  const clean: GtagParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') clean[key] = value;
  }

  window.gtag('event', action, clean);
}

// ---------------------------------------------------------------------------
// Named helpers for the events we care about (revenue/intent signals).
// ---------------------------------------------------------------------------

/** User picked a country + region to browse on /map/. */
export function trackSelectRegion(country: string, region: string): void {
  trackEvent('select_region', { country, region });
}

/** User typed a search query (call debounced). */
export function trackSearch(query: string, country?: string, region?: string): void {
  trackEvent('search', { search_term: query, country, region });
}

/** User clicked "Use My Location" (geolocation). */
export function trackUseMyLocation(status: 'requested' | 'success' | 'error'): void {
  trackEvent('use_my_location', { status });
}

/** User toggled between map / list / grid views. */
export function trackViewModeChange(view_mode: string): void {
  trackEvent('view_mode_change', { view_mode });
}

/** User opened a location's detail page (strong intent). */
export function trackSelectLocation(params: {
  location_title: string;
  country?: string;
  region?: string;
  source: string; // 'map_popup' | 'list_card' | 'grid_card'
}): void {
  trackEvent('select_location', params);
}

/** User clicked "Directions" → Google Maps (strongest intent signal). */
export function trackGetDirections(params: {
  location_title: string;
  country?: string;
  region?: string;
  source: string; // 'map_popup' | 'list_card' | 'grid_card'
}): void {
  trackEvent('get_directions', params);
}

/** User zoomed into a cluster on the map. */
export function trackClusterZoom(count: number): void {
  trackEvent('cluster_zoom', { location_count: count });
}

/** User applied a filter (category / cost / verified). */
export function trackFilterApply(filter_type: string, filter_value: string | boolean): void {
  trackEvent('filter_apply', { filter_type, filter_value: String(filter_value) });
}

// ---------------------------------------------------------------------------
// Guide / money-page funnel: CTA impression -> CTA click -> affiliate click.
// Mark `affiliate_click` (and optionally `guide_cta_click`) as Key Events in GA4.
// ---------------------------------------------------------------------------

/** A guide CTA became visible somewhere on the site. */
export function trackGuideCtaImpression(
  guide: string,
  placement: string,
  params: { country?: string; region?: string } = {}
): void {
  trackEvent('guide_cta_impression', { guide, placement, ...params });
}

/** User clicked a guide CTA (internal nav to a money page). */
export function trackGuideCtaClick(
  guide: string,
  placement: string,
  params: { country?: string; region?: string } = {}
): void {
  trackEvent('guide_cta_click', { guide, placement, ...params });
}

/** User clicked an affiliate / outbound link ON a guide page (the revenue event). */
export function trackAffiliateClick(params: {
  program: string;   // e.g. 'classpass'
  merchant?: string; // e.g. 'amazon'
  page?: string;     // pathname
  placement?: string; // 'offer_grid' | 'inline' | 'comparison_table'
  geo?: string;      // 'us' | 'uk' | 'au' | 'default'
}): void {
  trackEvent('affiliate_click', params);
}
