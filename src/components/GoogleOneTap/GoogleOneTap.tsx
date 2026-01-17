import { useEffect, useCallback, useRef, useState } from 'react';
import {
  trackG1TPromptTriggered,
  trackG1TPromptDismissed,
  trackUserRegistration,
} from '../../utils/cdpTracking';
import './GoogleOneTap.css';

// Google Identity Services types
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleOneTapConfig) => void;
          prompt: (callback?: (notification: PromptMomentNotification) => void) => void;
          cancel: () => void;
          disableAutoSelect: () => void;
          revoke: (email: string, callback: () => void) => void;
        };
      };
    };
  }
}

interface GoogleOneTapConfig {
  client_id: string;
  callback: (response: CredentialResponse) => void;
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
}

interface CredentialResponse {
  credential: string;
  select_by: string;
  clientId?: string;
}

interface PromptMomentNotification {
  isDisplayMoment: () => boolean;
  isDisplayed: () => boolean;
  isNotDisplayed: () => boolean;
  getNotDisplayedReason: () => string;
  isSkippedMoment: () => boolean;
  getSkippedReason: () => string;
  isDismissedMoment: () => boolean;
  getDismissedReason: () => string;
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email_verified?: boolean;
  locale?: string;
}

export interface GoogleOneTapProps {
  /** Callback when user successfully signs in */
  onSuccess?: (user: GoogleUser, credential: string) => void;
  /** Callback when sign-in fails */
  onError?: (error: string) => void;
  /** Callback when prompt is dismissed */
  onDismiss?: (reason: string) => void;
  /** Delay before showing prompt (ms) */
  promptDelay?: number;
  /** Page type for CDP tracking */
  pageType?: 'mmp' | 'rankings' | 'comparison' | 'pricing' | 'other';
  /** Vehicle info for CDP tracking */
  vehicleInfo?: {
    year?: number;
    make?: string;
    model?: string;
    trim?: string;
  };
  /** Whether user is already authenticated */
  isAuthenticated?: boolean;
  /** Custom class name */
  className?: string;
  /** Enable debug logging */
  debug?: boolean;
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const GOOGLE_SCRIPT_URL = 'https://accounts.google.com/gsi/client';
const AUTH_USER_KEY = 'cd_auth_user';

/**
 * Decode JWT token from Google
 */
const decodeJWT = (token: string): GoogleUser | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      given_name: payload.given_name,
      family_name: payload.family_name,
      picture: payload.picture,
      email_verified: payload.email_verified,
      locale: payload.locale,
    };
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

/**
 * Store authenticated user in localStorage
 */
export const storeAuthUser = (user: GoogleUser): void => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

/**
 * Get authenticated user from localStorage
 */
export const getAuthUser = (): GoogleUser | null => {
  try {
    const user = localStorage.getItem(AUTH_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

/**
 * Clear authenticated user from localStorage
 */
export const clearAuthUser = (): void => {
  localStorage.removeItem(AUTH_USER_KEY);
};

/**
 * Check if user is authenticated
 */
export const isUserAuthenticated = (): boolean => {
  return getAuthUser() !== null;
};

/**
 * GoogleOneTap Component
 * 
 * Implements Google One Tap authentication for seamless sign-in.
 * Shows prompt on high-intent pages for non-authenticated users.
 */
const GoogleOneTap = ({
  onSuccess,
  onError,
  onDismiss,
  promptDelay = 500,
  pageType,
  vehicleInfo,
  isAuthenticated = false,
  className = '',
  debug = false,
}: GoogleOneTapProps) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const promptTriggeredRef = useRef(false);
  const scriptLoadedRef = useRef(false);

  const log = useCallback(
    (...args: unknown[]) => {
      if (debug || import.meta.env.DEV) {
        console.log('[GoogleOneTap]', ...args);
      }
    },
    [debug]
  );

  // Handle successful sign-in
  const handleCredentialResponse = useCallback(
    (response: CredentialResponse) => {
      log('Credential response received');
      
      const user = decodeJWT(response.credential);
      
      if (user) {
        log('User decoded:', user.email);
        
        // Store user in localStorage (demo mode)
        storeAuthUser(user);
        
        // Track registration with CDP
        trackUserRegistration('google_one_tap', {
          email: user.email,
          name: user.name,
          user_id: user.id,
        });
        
        // Call success callback
        onSuccess?.(user, response.credential);
      } else {
        const error = 'Failed to decode user information';
        log('Error:', error);
        onError?.(error);
      }
    },
    [onSuccess, onError, log]
  );

  // Handle prompt moment notifications
  const handlePromptMoment = useCallback(
    (notification: PromptMomentNotification) => {
      if (notification.isDisplayMoment()) {
        if (notification.isDisplayed()) {
          log('Prompt displayed');
          trackG1TPromptTriggered(pageType, vehicleInfo);
        } else if (notification.isNotDisplayed()) {
          const reason = notification.getNotDisplayedReason();
          log('Prompt not displayed:', reason);
          
          // Common reasons: browser_not_supported, invalid_client, missing_client_id,
          // opt_out_or_no_session, secure_http_required, suppressed_by_user
          if (reason === 'opt_out_or_no_session') {
            // User has opted out or no Google session - this is expected
          } else {
            onError?.(`Prompt not displayed: ${reason}`);
          }
        }
      }
      
      if (notification.isSkippedMoment()) {
        const reason = notification.getSkippedReason();
        log('Prompt skipped:', reason);
      }
      
      if (notification.isDismissedMoment()) {
        const reason = notification.getDismissedReason();
        log('Prompt dismissed:', reason);
        trackG1TPromptDismissed(reason);
        onDismiss?.(reason);
      }
    },
    [pageType, vehicleInfo, onError, onDismiss, log]
  );

  // Load Google Identity Services script
  useEffect(() => {
    if (scriptLoadedRef.current || isAuthenticated) {
      return;
    }

    // Check if script is already loaded
    if (window.google?.accounts?.id) {
      log('Google script already loaded');
      setIsScriptLoaded(true);
      scriptLoadedRef.current = true;
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(`script[src="${GOOGLE_SCRIPT_URL}"]`);
    if (existingScript) {
      log('Script tag exists, waiting for load');
      existingScript.addEventListener('load', () => {
        setIsScriptLoaded(true);
        scriptLoadedRef.current = true;
      });
      return;
    }

    log('Loading Google Identity Services script');
    
    const script = document.createElement('script');
    script.src = GOOGLE_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      log('Script loaded');
      setIsScriptLoaded(true);
      scriptLoadedRef.current = true;
    };
    
    script.onerror = () => {
      const error = 'Failed to load Google Identity Services script';
      log('Error:', error);
      onError?.(error);
    };
    
    document.head.appendChild(script);

    return () => {
      // Don't remove script on unmount - it may be needed by other components
    };
  }, [isAuthenticated, onError, log]);

  // Initialize Google One Tap
  useEffect(() => {
    if (!isScriptLoaded || isInitialized || isAuthenticated) {
      return;
    }

    if (!GOOGLE_CLIENT_ID) {
      log('Warning: VITE_GOOGLE_CLIENT_ID not set');
      return;
    }

    if (!window.google?.accounts?.id) {
      log('Google Identity Services not available');
      return;
    }

    log('Initializing Google One Tap');

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false, // Don't auto-select, let user choose
        cancel_on_tap_outside: false, // Stay visible when clicking outside
        context: 'signin',
        itp_support: true, // Support Intelligent Tracking Prevention
      });

      setIsInitialized(true);
      log('Initialized successfully');
    } catch (error) {
      log('Initialization error:', error);
      onError?.(`Initialization failed: ${error}`);
    }
  }, [isScriptLoaded, isInitialized, isAuthenticated, handleCredentialResponse, onError, log]);

  // Show prompt after delay
  useEffect(() => {
    if (!isInitialized || isAuthenticated || promptTriggeredRef.current) {
      return;
    }

    const timeoutId = setTimeout(() => {
      if (window.google?.accounts?.id && !promptTriggeredRef.current) {
        log(`Showing prompt after ${promptDelay}ms delay`);
        promptTriggeredRef.current = true;
        
        window.google.accounts.id.prompt(handlePromptMoment);
      }
    }, promptDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isInitialized, isAuthenticated, promptDelay, handlePromptMoment, log]);

  // Cancel prompt on unmount
  useEffect(() => {
    return () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel();
      }
    };
  }, []);

  // Don't render anything if authenticated or no client ID
  if (isAuthenticated || !GOOGLE_CLIENT_ID) {
    return null;
  }

  // This component doesn't render visible UI - Google handles the prompt
  return <div className={`google-one-tap ${className}`} data-testid="google-one-tap" />;
};

export default GoogleOneTap;
