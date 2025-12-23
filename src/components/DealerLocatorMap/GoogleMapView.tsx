import { useCallback, useState } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import type { DealerWithScore } from '../../services/dealerService';
import DealerMarker from './DealerMarker';
import './DealerLocatorMap.css';

// C/D Design System map styling
// Matches our color tokens for a branded look
const mapStyles: google.maps.MapTypeStyle[] = [
  // Water - Blue Cobalt Light
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#60A5FA' }],
  },
  // Land - Gray 100
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [{ color: '#F5F5F5' }],
  },
  // Roads - White
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#FFFFFF' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#E5E5E5' }],
  },
  // Highway - Slightly darker
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#F0F0F0' }],
  },
  // Labels - Dark
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#222222' }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#FFFFFF' }, { weight: 2 }],
  },
  // Hide POIs for cleaner look
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  // Show parks subtly
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ visibility: 'on' }, { color: '#E8F5E9' }],
  },
  // Transit - hide
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
];

interface GoogleMapViewProps {
  dealers: DealerWithScore[];
  center: { lat: number; lng: number };
  selectedDealerId?: string | null;
  onDealerSelect?: (dealer: DealerWithScore) => void;
  apiKey?: string;
}

// Inner component that uses the map context
const MapContent = ({
  dealers,
  selectedDealerId,
  onDealerSelect,
}: Omit<GoogleMapViewProps, 'center' | 'apiKey'>) => {
  const map = useMap();

  const handleMarkerClick = useCallback((dealer: DealerWithScore) => {
    onDealerSelect?.(dealer);
    
    // Pan to the dealer location
    if (map) {
      map.panTo({ lat: dealer.lat, lng: dealer.lng });
    }
  }, [map, onDealerSelect]);

  return (
    <>
      {dealers.map((dealer) => (
        <DealerMarker
          key={dealer.id}
          dealer={dealer}
          isSelected={selectedDealerId === dealer.id}
          onClick={() => handleMarkerClick(dealer)}
        />
      ))}
    </>
  );
};

const GoogleMapView = ({
  dealers,
  center,
  selectedDealerId,
  onDealerSelect,
  apiKey,
}: GoogleMapViewProps) => {
  const [mapError, setMapError] = useState<string | null>(null);

  // If no API key, show placeholder
  if (!apiKey) {
    return (
      <div className="google-map-view google-map-view--placeholder">
        <div className="google-map-view__placeholder-content">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p>Google Maps</p>
          <p className="google-map-view__placeholder-note">
            Add VITE_GOOGLE_MAPS_API_KEY to enable interactive map
          </p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="google-map-view google-map-view--error">
        <p>Unable to load map</p>
        <p className="google-map-view__error-detail">{mapError}</p>
      </div>
    );
  }

  return (
    <div className="google-map-view">
      <APIProvider 
        apiKey={apiKey}
        onLoad={() => console.log('Google Maps API loaded')}
      >
        <Map
          defaultCenter={center}
          defaultZoom={11}
          mapId="dealer-locator-map"
          styles={mapStyles}
          gestureHandling="greedy"
          disableDefaultUI={false}
          zoomControl={true}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={true}
          className="google-map-view__map"
        >
          <MapContent
            dealers={dealers}
            selectedDealerId={selectedDealerId}
            onDealerSelect={onDealerSelect}
          />
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMapView;

