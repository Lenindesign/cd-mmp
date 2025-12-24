import { useCallback, useState, useEffect } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import type { DealerWithScore } from '../../services/dealerService';
import DealerMarker from './DealerMarker';
import './DealerLocatorMap.css';

// Note: When using mapId, styles must be configured in Google Cloud Console
// Go to: https://console.cloud.google.com/google/maps-apis/studio/styles
// Create a new style and apply our C/D Design System colors:
// - Water: #60A5FA (Blue Cobalt Light)
// - Land/Landscape: #F5F5F5 (Gray 100)
// - Roads: #FFFFFF with #E5E5E5 stroke
// - Labels: #222222 (Dark)
// - Hide POIs and Transit for cleaner look

interface GoogleMapViewProps {
  dealers: DealerWithScore[];
  center: { lat: number; lng: number };
  selectedDealerId?: string | null;
  hoveredDealerId?: string | null;
  onDealerSelect?: (dealer: DealerWithScore) => void;
  onDealerHover?: (dealer: DealerWithScore | null) => void;
  apiKey?: string;
}

// Inner component that uses the map context and handles center changes
const MapContent = ({
  dealers,
  center,
  selectedDealerId,
  hoveredDealerId,
  onDealerSelect,
  onDealerHover,
}: Omit<GoogleMapViewProps, 'apiKey'>) => {
  const map = useMap();

  // Update map center when center prop changes
  useEffect(() => {
    if (map) {
      map.panTo(center);
    }
  }, [map, center.lat, center.lng]);

  const handleMarkerClick = useCallback((dealer: DealerWithScore) => {
    onDealerSelect?.(dealer);
    
    // Pan to the dealer location
    if (map) {
      map.panTo({ lat: dealer.lat, lng: dealer.lng });
    }
  }, [map, onDealerSelect]);

  const handleMarkerHover = useCallback((dealer: DealerWithScore | null) => {
    onDealerHover?.(dealer);
  }, [onDealerHover]);

  return (
    <>
      {dealers.map((dealer, idx) => (
        <DealerMarker
          key={dealer.id}
          dealer={dealer}
          index={idx + 1}
          isSelected={selectedDealerId === dealer.id}
          isHovered={hoveredDealerId === dealer.id}
          onClick={() => handleMarkerClick(dealer)}
          onHover={handleMarkerHover}
        />
      ))}
    </>
  );
};

const GoogleMapView = ({
  dealers,
  center,
  selectedDealerId,
  hoveredDealerId,
  onDealerSelect,
  onDealerHover,
  apiKey,
}: GoogleMapViewProps) => {
  const [mapError] = useState<string | null>(null);

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
            center={center}
            selectedDealerId={selectedDealerId}
            hoveredDealerId={hoveredDealerId}
            onDealerSelect={onDealerSelect}
            onDealerHover={onDealerHover}
          />
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMapView;

