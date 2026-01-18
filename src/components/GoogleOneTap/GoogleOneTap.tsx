import { useEffect, useCallback, useRef, useState } from 'react';
import {
  trackG1TPromptTriggered,
  trackG1TPromptDismissed,
  trackUserRegistration,
} from '../../utils/cdpTracking';
// Types are imported from the shared google.d.ts
import '../../types/google.d';
import './GoogleOneTap.css';

// Local interface definitions
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

// Log client ID status on module load
console.log('[GoogleOneTap] Client ID configured:', GOOGLE_CLIENT_ID ? `${GOOGLE_CLIENT_ID.substring(0, 20)}...` : 'NOT SET');

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
  debug: _debug = false, // Prefixed to avoid unused warning (logging always enabled for now)
}: GoogleOneTapProps) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const promptTriggeredRef = useRef(false);
  const scriptLoadedRef = useRef(false);

  const log = useCallback(
    (...args: unknown[]) => {
      // Always log in production for debugging (can remove later)
      console.log('[GoogleOneTap]', ...args);
    },
    []
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
        // Notify AuthContext so Header can show user and avatar
        window.dispatchEvent(new CustomEvent('auth-google-signin', { detail: user }));

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
      // #region agent log
      try {
        const state = {
          isDisplayMoment: notification.isDisplayMoment?.(),
          isDisplayed: notification.isDisplayed?.(),
          isNotDisplayed: notification.isNotDisplayed?.(),
          getNotDisplayedReason: notification.getNotDisplayedReason?.(),
          isSkippedMoment: notification.isSkippedMoment?.(),
          getSkippedReason: notification.getSkippedReason?.(),
          isDismissedMoment: notification.isDismissedMoment?.(),
          getDismissedReason: notification.getDismissedReason?.(),
        };
        fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'GoogleOneTap.tsx:handlePromptMoment',message:'handlePromptMoment called',data:state,timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
      } catch (_) {}
      // #endregion
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

    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'GoogleOneTap.tsx:initialize',message:'about to initialize',data:{clientId:GOOGLE_CLIENT_ID?.substring(0,20),hasGoogleApi:!!window.google?.accounts?.id},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D'})}).catch(()=>{});
    // #endregion

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false, // Don't auto-select, let user choose
        cancel_on_tap_outside: false, // Stay visible when clicking outside
        context: 'signin',
        itp_support: true, // Support Intelligent Tracking Prevention
        use_fedcm_for_prompt: false, // Disable FedCM, use legacy One Tap UI (fixes NetworkError)
      });

      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'GoogleOneTap.tsx:initializeSuccess',message:'initialized with use_fedcm_for_prompt:false',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D'})}).catch(()=>{});
      // #endregion

      setIsInitialized(true);
      log('Initialized successfully');
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'GoogleOneTap.tsx:initializeError',message:'initialization failed',data:{error:String(error)},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      log('Initialization error:', error);
      onError?.(`Initialization failed: ${error}`);
    }
  }, [isScriptLoaded, isInitialized, isAuthenticated, handleCredentialResponse, onError, log]);

  // Show prompt after delay
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'GoogleOneTap.tsx:showPromptEffect',message:'effect run',data:{isInitialized,isAuthenticated,promptTriggered:promptTriggeredRef.current,promptDelay},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    if (!isInitialized || isAuthenticated || promptTriggeredRef.current) {
      return;
    }

    const timeoutId = setTimeout(() => {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'GoogleOneTap.tsx:showPromptTimeout',message:'timeout fired',data:{hasGoogle:!!window.google?.accounts?.id,promptTriggered:promptTriggeredRef.current},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      if (window.google?.accounts?.id && !promptTriggeredRef.current) {
        log(`Showing prompt after ${promptDelay}ms delay`);
        promptTriggeredRef.current = true;
        // #region agent log
        fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'GoogleOneTap.tsx:promptCall',message:'calling prompt()',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        window.google.accounts.id.prompt(handlePromptMoment);
      }
    }, promptDelay);

    return () => {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'GoogleOneTap.tsx:showPromptCleanup',message:'effect cleanup clearTimeout',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      clearTimeout(timeoutId);
    };
  }, [isInitialized, isAuthenticated, promptDelay, handlePromptMoment, log]);

  // Cancel prompt on unmount only if we never called prompt() (avoids cancelling
  // when React Strict Mode or parent re-render unmounts after we've shown it)
  useEffect(() => {
    return () => {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'GoogleOneTap.tsx:unmountCleanup',message:'unmount cancel()',data:{hasGoogle:!!window.google?.accounts?.id,promptTriggered:promptTriggeredRef.current,willCancel:!!(window.google?.accounts?.id && !promptTriggeredRef.current)},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      if (window.google?.accounts?.id && !promptTriggeredRef.current) {
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
