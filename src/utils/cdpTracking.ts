/**
 * CDP (Customer Data Platform) Tracking Utilities
 * Tracks user events to localStorage for analytics and personalization
 */

export interface CDPEvent {
  event_type: string;
  timestamp: string;
  properties: Record<string, unknown>;
}

export interface UserRegistration {
  source: 'google_one_tap' | 'email_signup' | 'social_login';
  timestamp: string;
  user_id?: string;
  email?: string;
}

export interface HighIntentPageView {
  page_type: 'mmp' | 'rankings' | 'comparison' | 'pricing';
  vehicle_info?: {
    year?: number;
    make?: string;
    model?: string;
    trim?: string;
  };
  timestamp: string;
}

const CDP_EVENTS_KEY = 'cdp_events';
const CDP_REGISTRATION_KEY = 'cdp_registration_source';
const CDP_HIGH_INTENT_KEY = 'cdp_high_intent_views';

/**
 * Get all CDP events from localStorage
 */
export const getCDPEvents = (): CDPEvent[] => {
  try {
    const events = localStorage.getItem(CDP_EVENTS_KEY);
    return events ? JSON.parse(events) : [];
  } catch {
    return [];
  }
};

/**
 * Store a CDP event to localStorage
 */
export const trackCDPEvent = (eventType: string, properties: Record<string, unknown> = {}): void => {
  try {
    const events = getCDPEvents();
    const newEvent: CDPEvent = {
      event_type: eventType,
      timestamp: new Date().toISOString(),
      properties,
    };
    events.push(newEvent);
    
    // Keep only last 100 events to prevent localStorage bloat
    const trimmedEvents = events.slice(-100);
    localStorage.setItem(CDP_EVENTS_KEY, JSON.stringify(trimmedEvents));
    
    // Log to console in development
    if (import.meta.env.DEV) {
      console.log('[CDP Event]', eventType, properties);
    }
  } catch (error) {
    console.error('Failed to track CDP event:', error);
  }
};

/**
 * Track when G1T prompt is triggered/shown
 */
export const trackG1TPromptTriggered = (pageType?: string, vehicleInfo?: Record<string, unknown>): void => {
  trackCDPEvent('g1t_prompt_triggered', {
    page_type: pageType,
    vehicle_info: vehicleInfo,
    url: window.location.href,
  });
};

/**
 * Track when G1T prompt is dismissed
 */
export const trackG1TPromptDismissed = (reason: string): void => {
  trackCDPEvent('g1t_prompt_dismissed', {
    reason,
    url: window.location.href,
  });
};

/**
 * Track user registration with source
 */
export const trackUserRegistration = (
  source: UserRegistration['source'],
  userInfo?: { email?: string; name?: string; user_id?: string }
): void => {
  const registration: UserRegistration = {
    source,
    timestamp: new Date().toISOString(),
    user_id: userInfo?.user_id,
    email: userInfo?.email,
  };
  
  // Store registration source separately for easy access
  localStorage.setItem(CDP_REGISTRATION_KEY, JSON.stringify(registration));
  
  // Also track as an event
  trackCDPEvent('user_registration', {
    source,
    ...userInfo,
  });
};

/**
 * Get the user's registration source
 */
export const getRegistrationSource = (): UserRegistration | null => {
  try {
    const registration = localStorage.getItem(CDP_REGISTRATION_KEY);
    return registration ? JSON.parse(registration) : null;
  } catch {
    return null;
  }
};

/**
 * Track high-intent page view (MMP, rankings, etc.)
 */
export const trackHighIntentPageView = (
  pageType: HighIntentPageView['page_type'],
  vehicleInfo?: HighIntentPageView['vehicle_info']
): void => {
  const pageView: HighIntentPageView = {
    page_type: pageType,
    vehicle_info: vehicleInfo,
    timestamp: new Date().toISOString(),
  };
  
  // Store high-intent views
  try {
    const views = getHighIntentPageViews();
    views.push(pageView);
    // Keep only last 50 views
    const trimmedViews = views.slice(-50);
    localStorage.setItem(CDP_HIGH_INTENT_KEY, JSON.stringify(trimmedViews));
  } catch (error) {
    console.error('Failed to store high-intent page view:', error);
  }
  
  // Also track as an event
  trackCDPEvent('high_intent_page_view', {
    page_type: pageType,
    vehicle_info: vehicleInfo,
    url: window.location.href,
  });
};

/**
 * Get all high-intent page views
 */
export const getHighIntentPageViews = (): HighIntentPageView[] => {
  try {
    const views = localStorage.getItem(CDP_HIGH_INTENT_KEY);
    return views ? JSON.parse(views) : [];
  } catch {
    return [];
  }
};

/**
 * Get count of high-intent page views by type
 */
export const getHighIntentPageViewCount = (pageType?: HighIntentPageView['page_type']): number => {
  const views = getHighIntentPageViews();
  if (pageType) {
    return views.filter(v => v.page_type === pageType).length;
  }
  return views.length;
};

/**
 * Check if user is a "hot lead" based on behavior
 * (Multiple high-intent page views, etc.)
 */
export const isHotLead = (): boolean => {
  const views = getHighIntentPageViews();
  const uniqueVehicles = new Set(
    views
      .filter(v => v.vehicle_info?.make && v.vehicle_info?.model)
      .map(v => `${v.vehicle_info?.make}-${v.vehicle_info?.model}`)
  );
  
  // Hot lead if: 3+ high-intent views OR 2+ unique vehicles viewed
  return views.length >= 3 || uniqueVehicles.size >= 2;
};

/**
 * Clear all CDP data (for testing/logout)
 */
export const clearCDPData = (): void => {
  localStorage.removeItem(CDP_EVENTS_KEY);
  localStorage.removeItem(CDP_REGISTRATION_KEY);
  localStorage.removeItem(CDP_HIGH_INTENT_KEY);
};

/**
 * Export CDP data for debugging
 */
export const exportCDPData = (): {
  events: CDPEvent[];
  registration: UserRegistration | null;
  highIntentViews: HighIntentPageView[];
} => {
  return {
    events: getCDPEvents(),
    registration: getRegistrationSource(),
    highIntentViews: getHighIntentPageViews(),
  };
};
