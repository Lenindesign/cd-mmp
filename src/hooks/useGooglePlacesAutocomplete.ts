import { useState, useEffect, useCallback, useRef } from 'react';

export interface PlacePrediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export interface PlaceDetails {
  lat: number;
  lng: number;
  formattedAddress: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface UseGooglePlacesAutocompleteOptions {
  apiKey: string;
  debounceMs?: number;
  types?: string[];
  componentRestrictions?: { country: string | string[] };
}

// Load Google Maps Places library using the new API
const loadGooglePlacesLibrary = async (apiKey: string): Promise<void> => {
  // Check if Places library is already loaded (new API)
  // @ts-ignore - Place class is part of the new Places API
  if (window.google?.maps?.places?.Place) {
    return;
  }

  // If Google Maps is loaded, try to import the Places library
  if (window.google?.maps) {
    // @ts-ignore - importLibrary is available in newer Google Maps API versions
    if (window.google.maps.importLibrary) {
      try {
        await window.google.maps.importLibrary('places');
        return;
      } catch (e) {
        console.warn('Failed to import places library:', e);
      }
    }
  }

  // If no Google Maps at all, load it with Places
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existingScript) {
      // Wait for the API to be ready
      const checkInterval = setInterval(() => {
        // @ts-ignore
        if (window.google?.maps?.places?.Place) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve(); // Resolve anyway after timeout
      }, 5000);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const checkInterval = setInterval(() => {
        // @ts-ignore
        if (window.google?.maps?.places?.Place) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 50);
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 2000);
    };
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });
};

export const useGooglePlacesAutocomplete = ({
  apiKey,
  debounceMs = 300,
  types = ['(cities)'],
  componentRestrictions = { country: 'us' },
}: UseGooglePlacesAutocompleteOptions) => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Google Maps services
  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key is required');
      return;
    }

    loadGooglePlacesLibrary(apiKey)
      .then(() => {
        geocoderRef.current = new google.maps.Geocoder();
        setIsReady(true);
        setError(null);
        console.log('Google Places Autocomplete ready (New API)');
      })
      .catch((err) => {
        console.error('Failed to load Google Places:', err);
        setError(err.message);
        setIsReady(false);
      });
  }, [apiKey]);

  // Search for place predictions using the new Places API
  const searchPlaces = useCallback(async (input: string) => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Clear predictions if input is empty
    if (!input.trim()) {
      setPredictions([]);
      setIsLoading(false);
      return;
    }

    // Don't search if not ready
    if (!isReady) {
      return;
    }

    setIsLoading(true);

    // Debounce the API call
    debounceTimerRef.current = setTimeout(async () => {
      try {
        // Use the new AutocompleteSuggestion API
        // @ts-ignore - AutocompleteSuggestion is part of the new Places API
        const { AutocompleteSuggestion } = await google.maps.importLibrary('places');
        
        // Build the request for the new API
        const request = {
          input,
          includedPrimaryTypes: ['locality', 'postal_code', 'administrative_area_level_1'],
          includedRegionCodes: ['us'],
        };

        // @ts-ignore - fetchAutocompleteSuggestions is the new API method
        const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        
        setIsLoading(false);
        
        if (suggestions && suggestions.length > 0) {
          setPredictions(
            suggestions.map((suggestion: any) => {
              const placePrediction = suggestion.placePrediction;
              return {
                placeId: placePrediction.placeId,
                description: placePrediction.text?.text || '',
                mainText: placePrediction.mainText?.text || placePrediction.text?.text || '',
                secondaryText: placePrediction.secondaryText?.text || '',
              };
            })
          );
        } else {
          setPredictions([]);
        }
      } catch (err: any) {
        console.warn('Places autocomplete error:', err);
        setIsLoading(false);
        
        // Fallback to Geocoding API for basic search
        try {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            { 
              address: input,
              componentRestrictions: { country: 'US' }
            },
            (results, status) => {
              if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
                setPredictions(
                  results.slice(0, 5).map((result) => ({
                    placeId: result.place_id,
                    description: result.formatted_address,
                    mainText: result.formatted_address.split(',')[0],
                    secondaryText: result.formatted_address.split(',').slice(1).join(',').trim(),
                  }))
                );
              } else {
                setPredictions([]);
              }
            }
          );
        } catch (geocodeErr) {
          console.warn('Geocoding fallback error:', geocodeErr);
          setPredictions([]);
        }
      }
    }, debounceMs);
  }, [isReady, debounceMs]);

  // Get place details from place ID using the new Places API
  const getPlaceDetails = useCallback(async (placeId: string): Promise<PlaceDetails> => {
    if (!isReady) {
      throw new Error('Google Places service not ready');
    }

    try {
      // @ts-ignore - Place is part of the new Places API
      const { Place } = await google.maps.importLibrary('places');
      
      // @ts-ignore
      const place = new Place({ id: placeId });
      
      // Fetch the place details
      // @ts-ignore
      await place.fetchFields({ fields: ['location', 'formattedAddress', 'addressComponents'] });
      
      const addressComponents = place.addressComponents || [];
      
      let city = '';
      let state = '';
      let zipCode = '';
      
      for (const component of addressComponents) {
        if (component.types.includes('locality')) {
          city = component.longText || component.shortText;
        } else if (component.types.includes('administrative_area_level_1')) {
          state = component.shortText;
        } else if (component.types.includes('postal_code')) {
          zipCode = component.longText || component.shortText;
        }
      }

      return {
        lat: place.location?.lat() || 0,
        lng: place.location?.lng() || 0,
        formattedAddress: place.formattedAddress || '',
        city,
        state,
        zipCode,
      };
    } catch (err) {
      console.warn('New Places API error, falling back to Geocoder:', err);
      
      // Fallback to Geocoder
      return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ placeId }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
            const result = results[0];
            const addressComponents = result.address_components || [];
            
            let city = '';
            let state = '';
            let zipCode = '';
            
            for (const component of addressComponents) {
              if (component.types.includes('locality')) {
                city = component.long_name;
              } else if (component.types.includes('administrative_area_level_1')) {
                state = component.short_name;
              } else if (component.types.includes('postal_code')) {
                zipCode = component.long_name;
              }
            }

            resolve({
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
              formattedAddress: result.formatted_address || '',
              city,
              state,
              zipCode,
            });
          } else {
            reject(new Error('Failed to get place details'));
          }
        });
      });
    }
  }, [isReady]);

  // Reverse geocode coordinates to get address
  const reverseGeocode = useCallback((lat: number, lng: number): Promise<PlaceDetails> => {
    return new Promise((resolve, reject) => {
      if (!isReady || !geocoderRef.current) {
        reject(new Error('Geocoder not ready'));
        return;
      }

      geocoderRef.current.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
            const result = results[0];
            const addressComponents = result.address_components || [];
            
            // Extract city, state, and zip from address components
            let city = '';
            let state = '';
            let zipCode = '';
            
            for (const component of addressComponents) {
              if (component.types.includes('locality')) {
                city = component.long_name;
              } else if (component.types.includes('administrative_area_level_1')) {
                state = component.short_name;
              } else if (component.types.includes('postal_code')) {
                zipCode = component.long_name;
              }
            }

            // Format a nice display name
            let formattedAddress = result.formatted_address;
            if (city && state) {
              formattedAddress = `${city}, ${state}`;
            }

            resolve({
              lat,
              lng,
              formattedAddress,
              city,
              state,
              zipCode,
            });
          } else {
            reject(new Error('Failed to reverse geocode'));
          }
        }
      );
    });
  }, [isReady]);

  // Clear predictions
  const clearPredictions = useCallback(() => {
    setPredictions([]);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    predictions,
    isLoading,
    error,
    isReady,
    searchPlaces,
    getPlaceDetails,
    reverseGeocode,
    clearPredictions,
  };
};

// Type declarations for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

export default useGooglePlacesAutocomplete;
