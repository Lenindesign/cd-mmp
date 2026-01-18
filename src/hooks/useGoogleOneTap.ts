import { useEffect, useCallback, useState } from 'react';
import { trackHighIntentPageView } from '../utils/cdpTracking';
import { getAuthUser, isUserAuthenticated, type GoogleUser } from '../components/GoogleOneTap/GoogleOneTap';
// Types are imported from the shared google.d.ts
import '../types/google.d';

export interface UseGoogleOneTapOptions {
  /** Page type for tracking */
  pageType: 'mmp' | 'rankings' | 'comparison' | 'pricing' | 'other';
  /** Vehicle information for tracking */
  vehicleInfo?: {
    year?: number;
    make?: string;
    model?: string;
    trim?: string;
  };
  /** Whether to show the One Tap prompt */
  enabled?: boolean;
  /** Callback when user signs in */
  onSignIn?: (user: GoogleUser) => void;
  /** Callback when user signs out */
  onSignOut?: () => void;
}

export interface UseGoogleOneTapReturn {
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Current authenticated user */
  user: GoogleUser | null;
  /** Whether One Tap should be shown */
  shouldShowOneTap: boolean;
  /** Sign out the current user */
  signOut: () => void;
  /** Refresh authentication state */
  refreshAuth: () => void;
  /** Page type being tracked */
  pageType: UseGoogleOneTapOptions['pageType'];
  /** Vehicle info being tracked */
  vehicleInfo: UseGoogleOneTapOptions['vehicleInfo'];
}

/**
 * Hook for managing Google One Tap on high-intent pages
 * 
 * Usage:
 * ```tsx
 * const { isAuthenticated, user, shouldShowOneTap } = useGoogleOneTap({
 *   pageType: 'mmp',
 *   vehicleInfo: { year: 2024, make: 'Honda', model: 'CR-V' }
 * });
 * 
 * return (
 *   <>
 *     {shouldShowOneTap && <GoogleOneTap pageType={pageType} vehicleInfo={vehicleInfo} />}
 *     <VehicleDetails />
 *   </>
 * );
 * ```
 */
export const useGoogleOneTap = ({
  pageType,
  vehicleInfo,
  enabled = true,
  onSignIn,
  onSignOut,
}: UseGoogleOneTapOptions): UseGoogleOneTapReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => isUserAuthenticated());
  const [user, setUser] = useState<GoogleUser | null>(() => getAuthUser());

  // Refresh authentication state
  const refreshAuth = useCallback(() => {
    const authenticated = isUserAuthenticated();
    const currentUser = getAuthUser();
    setIsAuthenticated(authenticated);
    setUser(currentUser);
  }, []);

  // Sign out
  const signOut = useCallback(() => {
    // Clear from localStorage
    localStorage.removeItem('cd_auth_user');
    
    // Update state
    setIsAuthenticated(false);
    setUser(null);
    
    // Disable auto-select for future prompts
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
    
    // Call callback
    onSignOut?.();
  }, [onSignOut]);

  // Track high-intent page view on mount
  // For MMP pages, wait for vehicleInfo; for other pages, track immediately
  useEffect(() => {
    if (!enabled) return;
    
    // For MMP pages, only track when we have vehicle info
    if (pageType === 'mmp') {
      if (vehicleInfo?.make && vehicleInfo?.model) {
        console.log('[CDP] Tracking MMP page view:', vehicleInfo);
        trackHighIntentPageView(pageType, vehicleInfo);
      }
    } else {
      // For other page types (rankings, etc.), track immediately
      console.log('[CDP] Tracking page view:', pageType);
      trackHighIntentPageView(pageType, vehicleInfo);
    }
  }, [pageType, vehicleInfo?.year, vehicleInfo?.make, vehicleInfo?.model, vehicleInfo?.trim, enabled]);

  // Listen for storage changes (for cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'cd_auth_user') {
        refreshAuth();
        
        // Call appropriate callback
        const newUser = getAuthUser();
        if (newUser && !user) {
          onSignIn?.(newUser);
        } else if (!newUser && user) {
          onSignOut?.();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshAuth, onSignIn, onSignOut, user]);

  // Determine if One Tap should be shown
  const shouldShowOneTap = enabled && !isAuthenticated;

  return {
    isAuthenticated,
    user,
    shouldShowOneTap,
    signOut,
    refreshAuth,
    pageType,
    vehicleInfo,
  };
};

export default useGoogleOneTap;
