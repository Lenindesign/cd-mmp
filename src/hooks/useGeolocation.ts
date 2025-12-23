import { useState, useEffect, useCallback } from 'react';

export interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: GeolocationPositionError | null;
  loading: boolean;
  timestamp: number | null;
}

export interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  onSuccess?: (position: GeolocationPosition) => void;
  onError?: (error: GeolocationPositionError) => void;
}

export interface UseGeolocationReturn extends GeolocationState {
  requestLocation: () => void;
  isSupported: boolean;
  clearError: () => void;
}

// Default location (Miami, FL) for fallback
const DEFAULT_LOCATION = {
  latitude: 25.7617,
  longitude: -80.1918,
};

/**
 * Custom hook for browser geolocation with graceful fallback
 * 
 * Progressive Enhancement:
 * - Level 0: Returns default location if geolocation not supported
 * - Level 1: Returns cached location if available
 * - Level 2: Requests fresh location from browser
 * 
 * @example
 * ```tsx
 * const { latitude, longitude, loading, error, requestLocation } = useGeolocation();
 * 
 * if (loading) return <Spinner />;
 * if (error) return <ZipCodeInput onSubmit={handleZipCode} />;
 * 
 * return <Map center={{ lat: latitude, lng: longitude }} />;
 * ```
 */
export function useGeolocation(options: UseGeolocationOptions = {}): UseGeolocationReturn {
  const {
    enableHighAccuracy = false,
    timeout = 10000,
    maximumAge = 5 * 60 * 1000, // 5 minutes
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: false,
    timestamp: null,
  });

  const isSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator;

  // Try to get cached location from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cached = localStorage.getItem('user_geolocation');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const age = Date.now() - parsed.timestamp;
        
        // Use cached location if it's less than maximumAge old
        if (age < maximumAge) {
          setState(prev => ({
            ...prev,
            latitude: parsed.latitude,
            longitude: parsed.longitude,
            accuracy: parsed.accuracy,
            timestamp: parsed.timestamp,
          }));
        }
      } catch {
        // Invalid cache, ignore
        localStorage.removeItem('user_geolocation');
      }
    }
  }, [maximumAge]);

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const newState: GeolocationState = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      error: null,
      loading: false,
      timestamp: position.timestamp,
    };

    setState(newState);

    // Cache the location
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_geolocation', JSON.stringify({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      }));
    }

    onSuccess?.(position);
  }, [onSuccess]);

  const handleError = useCallback((error: GeolocationPositionError) => {
    setState(prev => ({
      ...prev,
      error,
      loading: false,
    }));

    onError?.(error);
  }, [onError]);

  const requestLocation = useCallback(() => {
    if (!isSupported) {
      // Fallback to default location
      setState(prev => ({
        ...prev,
        latitude: DEFAULT_LOCATION.latitude,
        longitude: DEFAULT_LOCATION.longitude,
        accuracy: null,
        error: null,
        loading: false,
        timestamp: Date.now(),
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy,
        timeout,
        maximumAge,
      }
    );
  }, [isSupported, enableHighAccuracy, timeout, maximumAge, handleSuccess, handleError]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    requestLocation,
    isSupported,
    clearError,
  };
}

/**
 * Get coordinates from a ZIP code using a geocoding approach
 * In a real app, this would call a geocoding API
 * 
 * @param zipCode - US ZIP code
 * @returns Coordinates or null
 */
export async function geocodeZipCode(zipCode: string): Promise<{ lat: number; lng: number } | null> {
  // Common US ZIP code to coordinates mapping (mock data)
  // In production, use Google Geocoding API or similar
  const zipCodeMap: Record<string, { lat: number; lng: number }> = {
    // Florida
    '33101': { lat: 25.7617, lng: -80.1918 }, // Miami
    '33024': { lat: 26.0112, lng: -80.2945 }, // Pembroke Pines
    '33143': { lat: 25.6986, lng: -80.3106 }, // South Miami
    '33126': { lat: 25.7823, lng: -80.3389 }, // Miami (Doral area)
    '33130': { lat: 25.7654, lng: -80.2089 }, // Brickell
    '33016': { lat: 25.8756, lng: -80.3456 }, // Hialeah Gardens
    '33156': { lat: 25.6456, lng: -80.3234 }, // Pinecrest
    
    // California
    '90001': { lat: 33.9425, lng: -118.2551 }, // Los Angeles
    '90210': { lat: 34.0901, lng: -118.4065 }, // Beverly Hills
    '94102': { lat: 37.7749, lng: -122.4194 }, // San Francisco
    
    // New York
    '10001': { lat: 40.7484, lng: -73.9967 }, // Manhattan
    '10013': { lat: 40.7195, lng: -74.0089 }, // Tribeca
    '11201': { lat: 40.6944, lng: -73.9917 }, // Brooklyn
    
    // Texas
    '77001': { lat: 29.7604, lng: -95.3698 }, // Houston
    '75201': { lat: 32.7767, lng: -96.7970 }, // Dallas
    '78201': { lat: 29.4241, lng: -98.4936 }, // San Antonio
    
    // Illinois
    '60601': { lat: 41.8781, lng: -87.6298 }, // Chicago
  };

  // Clean the ZIP code
  const cleanZip = zipCode.replace(/\D/g, '').substring(0, 5);
  
  if (zipCodeMap[cleanZip]) {
    return zipCodeMap[cleanZip];
  }

  // For unknown ZIP codes, return null (would trigger API call in production)
  return null;
}

export default useGeolocation;

