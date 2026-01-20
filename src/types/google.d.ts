/**
 * Unified Google API type declarations
 * Combines Google Maps and Google Identity Services (One Tap) types
 */

// Google Maps types
interface GoogleMapsGeocoderResult {
  place_id: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
}

interface GoogleMapsGeocoder {
  geocode: (
    request: {
      address?: string;
      location?: { lat: number; lng: number };
      placeId?: string;
      componentRestrictions?: { country: string };
    },
    callback: (results: GoogleMapsGeocoderResult[] | null, status: string) => void
  ) => void;
}

// Google One Tap types
interface GoogleOneTapConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  context?: 'signin' | 'signup' | 'use';
  itp_support?: boolean;
  prompt_parent_id?: string;
  nonce?: string;
  state_cookie_domain?: string;
  ux_mode?: 'popup' | 'redirect';
  allowed_parent_origin?: string | string[];
  intermediate_iframe_close_callback?: () => void;
  use_fedcm_for_prompt?: boolean; // Disable FedCM to use legacy One Tap UI
}

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
  clientId?: string;
}

interface GooglePromptMomentNotification {
  isDisplayMoment: () => boolean;
  isDisplayed: () => boolean;
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
  isDismissedMoment: () => boolean;
  getNotDisplayedReason: () => string;
  getSkippedReason: () => string;
  getDismissedReason: () => string;
  getMomentType: () => string;
}

interface GoogleButtonConfig {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  width?: number | string;
  locale?: string;
}

// Unified Window.google declaration
declare global {
  interface Window {
    google?: {
      // Google Maps API
      maps?: {
        Geocoder: new () => GoogleMapsGeocoder;
        importLibrary: (library: string) => Promise<unknown>;
        places?: {
          Place?: unknown;
          AutocompleteSuggestion?: unknown;
        };
      };
      // Google Identity Services (One Tap)
      accounts?: {
        id: {
          initialize: (config: GoogleOneTapConfig) => void;
          prompt: (callback?: (notification: GooglePromptMomentNotification) => void) => void;
          renderButton: (parent: HTMLElement, options: GoogleButtonConfig) => void;
          cancel: () => void;
          disableAutoSelect: () => void;
          revoke: (email: string, callback: () => void) => void;
        };
      };
    };
  }
}

export {
  GoogleMapsGeocoderResult,
  GoogleMapsGeocoder,
  GoogleOneTapConfig,
  GoogleCredentialResponse,
  GooglePromptMomentNotification,
  GoogleButtonConfig,
};
