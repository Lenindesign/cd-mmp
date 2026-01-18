/**
 * Google OAuth Utility
 * Handles Google sign-in via Google Identity Services
 */

import '../types/google.d';
import type { GoogleCredentialResponse } from '../types/google.d';
import { setUserFromGoogle } from '../services/authService';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const GOOGLE_SCRIPT_URL = 'https://accounts.google.com/gsi/client';

// #region agent log
fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:module-load',message:'Module loaded, checking Client ID',data:{hasClientId:!!GOOGLE_CLIENT_ID,clientIdLength:GOOGLE_CLIENT_ID.length,clientIdPrefix:GOOGLE_CLIENT_ID.substring(0,20)},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
// #endregion

/**
 * Decode JWT token from Google
 */
const decodeJWT = (token: string) => {
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
      picture: payload.picture,
    };
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

/**
 * Load Google Identity Services script
 */
const loadGoogleScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:loadGoogleScript',message:'loadGoogleScript called',data:{hasGoogle:!!window.google?.accounts?.id,hasExistingScript:!!document.querySelector(`script[src="${GOOGLE_SCRIPT_URL}"]`)},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    // Check if already loaded
    if (window.google?.accounts?.id) {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:loadGoogleScript',message:'Script already loaded',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      resolve();
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(`script[src="${GOOGLE_SCRIPT_URL}"]`);
    if (existingScript) {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:loadGoogleScript',message:'Existing script found, waiting for load',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      // Wait for it to load
      existingScript.addEventListener('load', () => {
        // #region agent log
        fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:loadGoogleScript',message:'Existing script loaded',data:{hasGoogle:!!window.google?.accounts?.id},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        resolve();
      });
      existingScript.addEventListener('error', () => {
        // #region agent log
        fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:loadGoogleScript',message:'Existing script load error',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        reject(new Error('Failed to load Google script'));
      });
      return;
    }

    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:loadGoogleScript',message:'Creating new script tag',data:{scriptUrl:GOOGLE_SCRIPT_URL},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    // Load the script
    const script = document.createElement('script');
    script.src = GOOGLE_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:loadGoogleScript',message:'Script onload fired',data:{hasGoogle:!!window.google?.accounts?.id},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      // Wait a bit for the API to be available
      const checkInterval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(checkInterval);
          // #region agent log
          fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:loadGoogleScript',message:'Google API available',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
          resolve();
        }
      }, 50);
      
      setTimeout(() => {
        clearInterval(checkInterval);
        if (window.google?.accounts?.id) {
          resolve();
        } else {
          // #region agent log
          fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:loadGoogleScript',message:'Timeout - Google API not available',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
          reject(new Error('Google Identity Services not available after script load'));
        }
      }, 2000);
    };
    
    script.onerror = () => {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:loadGoogleScript',message:'Script load error',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      reject(new Error('Failed to load Google Identity Services script'));
    };
    
    document.head.appendChild(script);
  });
};

// Track initialization state
let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

/**
 * Initialize Google OAuth (call once on app load)
 */
const initializeGoogleAuth = async (): Promise<void> => {
  if (isInitialized) {
    return;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:initializeGoogleAuth',message:'Initialization started',data:{hasClientId:!!GOOGLE_CLIENT_ID,clientIdLength:GOOGLE_CLIENT_ID.length,isInitialized},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    if (!GOOGLE_CLIENT_ID) {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:initializeGoogleAuth',message:'Client ID missing',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      throw new Error('Google Client ID not configured. Please set VITE_GOOGLE_CLIENT_ID environment variable.');
    }

    // Load Google Identity Services script
    await loadGoogleScript();

    if (!window.google?.accounts?.id) {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:initializeGoogleAuth',message:'Google API not available after script load',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      throw new Error('Google Identity Services not available');
    }

    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:initializeGoogleAuth',message:'Calling initialize',data:{clientId:GOOGLE_CLIENT_ID.substring(0,20)+'...'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    // Initialize Google Identity Services with callback for button clicks
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response: GoogleCredentialResponse) => {
        // #region agent log
        fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:initializeGoogleAuth:callback',message:'Credential response received',data:{hasCredential:!!response.credential,selectBy:response.select_by},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        console.log('[GoogleAuth] Credential response received');
        const user = decodeJWT(response.credential);
        
        if (user) {
          console.log('[GoogleAuth] User decoded:', user.email);
          // Use the existing setUserFromGoogle function
          setUserFromGoogle(user);
          
          // Notify AuthContext
          window.dispatchEvent(new CustomEvent('auth-google-signin', { detail: user }));
        } else {
          console.error('[GoogleAuth] Failed to decode user information');
        }
      },
      auto_select: false,
      cancel_on_tap_outside: false,
    });

    isInitialized = true;
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:initializeGoogleAuth',message:'Initialization complete',data:{isInitialized},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
  })();

  return initializationPromise;
};

/**
 * Trigger Google sign-in (for button clicks)
 * Uses prompt() which should work for button-triggered sign-in
 */
export const signInWithGoogle = async (): Promise<void> => {
  // #region agent log
  fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:signInWithGoogle',message:'signInWithGoogle called',data:{hasClientId:!!GOOGLE_CLIENT_ID,hasGoogle:!!window.google?.accounts?.id,isInitialized},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  try {
    // Initialize if not already done
    await initializeGoogleAuth();

    if (!window.google?.accounts?.id) {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:signInWithGoogle',message:'Google API not available',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      throw new Error('Google Identity Services not available');
    }

    if (!GOOGLE_CLIENT_ID) {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:signInWithGoogle',message:'Client ID not configured',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      throw new Error('Google Client ID not configured. Please set VITE_GOOGLE_CLIENT_ID environment variable.');
    }

    console.log('[GoogleAuth] Triggering sign-in prompt...');
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:signInWithGoogle',message:'Calling prompt()',data:{hasGoogle:!!window.google?.accounts?.id},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    // Use prompt() - this should show a popup when called from a button click
    // The callback is already set up in initializeGoogleAuth()
    window.google.accounts.id.prompt((notification) => {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:signInWithGoogle:prompt-callback',message:'Prompt notification received',data:{isNotDisplayed:notification.isNotDisplayed(),isSkipped:notification.isSkippedMoment(),isDismissed:notification.isDismissedMoment(),notDisplayedReason:notification.isNotDisplayed()?notification.getNotDisplayedReason():undefined,skippedReason:notification.isSkippedMoment()?notification.getSkippedReason():undefined,dismissedReason:notification.isDismissedMoment()?notification.getDismissedReason():undefined},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      if (notification.isNotDisplayed()) {
        const reason = notification.getNotDisplayedReason();
        console.error('[GoogleAuth] Prompt not displayed:', reason);
        throw new Error(`Google sign-in not available: ${reason}`);
      }
      if (notification.isSkippedMoment()) {
        const reason = notification.getSkippedReason();
        console.warn('[GoogleAuth] Prompt skipped:', reason);
      }
      if (notification.isDismissedMoment()) {
        const reason = notification.getDismissedReason();
        console.warn('[GoogleAuth] Prompt dismissed:', reason);
      }
    });
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:signInWithGoogle',message:'prompt() call completed',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
  } catch (error) {
    console.error('[GoogleAuth] Sign-in error:', error);
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'googleAuth.ts:signInWithGoogle',message:'Error caught',data:{error:error instanceof Error ? error.message : String(error),errorStack:error instanceof Error ? error.stack : undefined},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    throw error;
  }
};
