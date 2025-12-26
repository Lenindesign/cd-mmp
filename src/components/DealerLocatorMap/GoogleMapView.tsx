import { useCallback, useState, useEffect, type ReactNode } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { List, X } from 'lucide-react';
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
  vehicleImage?: string;
  vehicleImages?: string[]; // Array of images for slideshow
  vehicleName?: string;
  sidebarContent?: ReactNode;
  sidebarTitle?: string;
  dealerDetailContent?: ReactNode;
  isDealerDetailOpen?: boolean;
  onCloseDealerDetail?: () => void;
}

// Inner component that uses the map context and handles center changes
const MapContent = ({
  dealers,
  center,
  selectedDealerId,
  hoveredDealerId,
  onDealerSelect,
  onDealerHover,
  vehicleImage,
  vehicleImages,
  vehicleName,
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
          vehicleImage={vehicleImage}
          vehicleImages={vehicleImages}
          vehicleName={vehicleName}
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
  vehicleImage,
  vehicleImages,
  vehicleName,
  sidebarContent,
  sidebarTitle = 'Dealers',
  dealerDetailContent,
  isDealerDetailOpen = false,
  onCloseDealerDetail,
}: GoogleMapViewProps) => {
  const [mapError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Track fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      // Reset sidebar to open when entering fullscreen
      if (document.fullscreenElement) {
        setIsSidebarOpen(true);
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Custom fullscreen handler - intercepts Google Maps fullscreen button
  // and properly requests fullscreen on the map container element
  useEffect(() => {
    const handleClick = async (e: Event) => {
      const target = e.target as HTMLElement;
      const fullscreenBtn = target.closest('.gm-fullscreen-control') as HTMLButtonElement;
      
      if (fullscreenBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        const mapContainer = document.querySelector('.google-map-view') as HTMLElement;
        
        try {
          if (document.fullscreenElement) {
            await document.exitFullscreen();
          } else if (mapContainer) {
            await mapContainer.requestFullscreen();
          }
        } catch (err) {
          console.error('Fullscreen request failed:', err);
        }
      }
    };
    
    document.addEventListener('click', handleClick, true);
    
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

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
            vehicleImage={vehicleImage}
            vehicleImages={vehicleImages}
            vehicleName={vehicleName}
          />
        </Map>
      </APIProvider>

      {/* Floating Sidebar for Fullscreen Mode */}
      {isFullscreen && sidebarContent && (
        <>
          {/* Toggle Button (shown when sidebar is closed) */}
          <button
            className={`dealer-locator__fullscreen-toggle ${isSidebarOpen ? 'dealer-locator__fullscreen-toggle--hidden' : ''}`}
            onClick={() => setIsSidebarOpen(true)}
          >
            <List size={18} />
            <span>Show Dealers</span>
          </button>

          {/* Floating Sidebar */}
          <div className={`dealer-locator__fullscreen-sidebar ${!isSidebarOpen ? 'dealer-locator__fullscreen-sidebar--hidden' : ''}`}>
            <div className="dealer-locator__fullscreen-sidebar-header">
              <h3 className="dealer-locator__fullscreen-sidebar-title">{sidebarTitle}</h3>
              <button
                className="dealer-locator__fullscreen-sidebar-close"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X size={18} />
              </button>
            </div>
            <div className="dealer-locator__fullscreen-sidebar-content">
              {sidebarContent}
            </div>
          </div>
        </>
      )}

      {/* Dealer Detail Panel for Fullscreen Mode - overlays the dealers list */}
      {isFullscreen && isDealerDetailOpen && dealerDetailContent && (
        <div className="dealer-locator__fullscreen-detail">
          <button 
            className="dealer-locator__fullscreen-detail-close"
            onClick={onCloseDealerDetail}
            aria-label="Close dealer details"
          >
            <X size={20} />
          </button>
          <div className="dealer-locator__fullscreen-detail-content">
            {dealerDetailContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapView;
