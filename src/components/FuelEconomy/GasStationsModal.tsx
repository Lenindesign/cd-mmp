import { useState, useEffect, useCallback } from 'react';
import { X, MapPin, Navigation, ExternalLink, Fuel, Loader2, Zap } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import './GasStationsModal.css';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

interface Station {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
  totalRatings?: number;
  isOpen?: boolean;
  placeId?: string;
}

// Keep GasStation as alias for backwards compatibility
type GasStation = Station;

interface GasStationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleName?: string;
  isElectric?: boolean;
}

// Component to search for nearby stations using Places API
const StationsMapContent = ({ 
  userLocation, 
  onStationsFound,
  isElectric = false
}: { 
  userLocation: { lat: number; lng: number };
  onStationsFound: (stations: Station[]) => void;
  isElectric?: boolean;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const searchNearbyStations = async () => {
      try {
        // @ts-ignore - Google Maps Places library
        const { Place } = await google.maps.importLibrary('places');
        
        const request = {
          fields: ['displayName', 'location', 'formattedAddress', 'rating', 'userRatingCount', 'regularOpeningHours', 'id'],
          locationRestriction: {
            center: userLocation,
            radius: isElectric ? 16000 : 8000, // Larger radius for EV chargers (less common)
          },
          includedPrimaryTypes: isElectric ? ['electric_vehicle_charging_station'] : ['gas_station'],
          maxResultCount: 20,
        };

        // @ts-ignore
        const { places } = await Place.searchNearby(request);
        
        if (places && places.length > 0) {
          const stations: Station[] = places.map((place: any, index: number) => ({
            id: place.id || `station-${index}`,
            name: place.displayName || (isElectric ? 'Charging Station' : 'Gas Station'),
            address: place.formattedAddress || '',
            lat: place.location?.lat() || userLocation.lat,
            lng: place.location?.lng() || userLocation.lng,
            rating: place.rating,
            totalRatings: place.userRatingCount,
            isOpen: place.regularOpeningHours?.isOpen?.(),
            placeId: place.id,
          }));
          onStationsFound(stations);
        }
      } catch (error) {
        console.error('Error searching for stations:', error);
        // Fallback: try legacy Places API
        tryLegacyPlacesSearch();
      }
    };

    const tryLegacyPlacesSearch = () => {
      // @ts-ignore
      const service = new google.maps.places.PlacesService(map);
      
      const request = {
        location: userLocation,
        radius: isElectric ? 16000 : 8000,
        type: isElectric ? 'electric_vehicle_charging_station' : 'gas_station',
      };

      service.nearbySearch(request, (results: any[], status: string) => {
        // @ts-ignore
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const stations: Station[] = results.slice(0, 20).map((place: any, index: number) => ({
            id: place.place_id || `station-${index}`,
            name: place.name || (isElectric ? 'Charging Station' : 'Gas Station'),
            address: place.vicinity || '',
            lat: place.geometry?.location?.lat() || userLocation.lat,
            lng: place.geometry?.location?.lng() || userLocation.lng,
            rating: place.rating,
            totalRatings: place.user_ratings_total,
            isOpen: place.opening_hours?.isOpen?.(),
            placeId: place.place_id,
          }));
          onStationsFound(stations);
        }
      });
    };

    searchNearbyStations();
  }, [map, userLocation, onStationsFound, isElectric]);

  return null;
};

// Station marker component - info window state is managed by parent
const StationMarker = ({ 
  station, 
  isSelected, 
  showInfoWindow,
  onClick,
  onCloseInfoWindow,
  isElectric = false
}: { 
  station: Station; 
  isSelected: boolean;
  showInfoWindow: boolean;
  onClick: () => void;
  onCloseInfoWindow: () => void;
  isElectric?: boolean;
}) => {
  return (
    <>
      <AdvancedMarker
        position={{ lat: station.lat, lng: station.lng }}
        onClick={onClick}
      >
        <div className={`gas-marker ${isSelected ? 'gas-marker--selected' : ''} ${isElectric ? 'gas-marker--electric' : ''}`}>
          {isElectric ? <Zap size={16} /> : <Fuel size={16} />}
        </div>
      </AdvancedMarker>

      {showInfoWindow && (
        <InfoWindow
          position={{ lat: station.lat, lng: station.lng }}
          onCloseClick={onCloseInfoWindow}
          pixelOffset={[0, -40]}
        >
          <div className="gas-info-window">
            <h4 className="gas-info-window__name">{station.name}</h4>
            <p className="gas-info-window__address">{station.address}</p>
            {station.rating && (
              <div className="gas-info-window__rating">
                <span className="gas-info-window__stars">★ {station.rating.toFixed(1)}</span>
                {station.totalRatings && (
                  <span className="gas-info-window__count">({station.totalRatings} reviews)</span>
                )}
              </div>
            )}
            {station.isOpen !== undefined && (
              <span className={`gas-info-window__status ${station.isOpen ? 'gas-info-window__status--open' : 'gas-info-window__status--closed'}`}>
                {station.isOpen ? 'Open Now' : 'Closed'}
              </span>
            )}
            <div className="gas-info-window__actions">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}&destination_place_id=${station.placeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gas-info-window__directions"
              >
                <Navigation size={14} />
                Directions
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

const GasStationsModal = ({ isOpen, onClose, vehicleName, isElectric = false }: GasStationsModalProps) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isLoadingStations, setIsLoadingStations] = useState(true);
  // Track which station's info window is open (only one at a time)
  const [openInfoWindowId, setOpenInfoWindowId] = useState<string | null>(null);
  
  // Text labels based on vehicle type
  const stationType = isElectric ? 'Charging Station' : 'Gas Station';
  const stationTypePlural = isElectric ? 'Charging Stations' : 'Gas Stations';

  // Get user's location
  useEffect(() => {
    if (!isOpen) return;

    setIsLoadingLocation(true);
    setLocationError(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Default to Los Angeles if location not available
          setUserLocation({ lat: 34.0522, lng: -118.2437 });
          setLocationError('Unable to get your location. Showing results for Los Angeles.');
          setIsLoadingLocation(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setUserLocation({ lat: 34.0522, lng: -118.2437 });
      setLocationError('Geolocation not supported. Showing results for Los Angeles.');
      setIsLoadingLocation(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleStationsFound = useCallback((foundStations: Station[]) => {
    setStations(foundStations);
    setIsLoadingStations(false);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="gas-stations-modal__backdrop" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div 
        className="gas-stations-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gas-stations-modal-title"
      >
        {/* Header */}
        <div className="gas-stations-modal__header">
          <div className="gas-stations-modal__header-content">
            {isElectric ? <Zap size={24} /> : <Fuel size={24} />}
            <div>
              <h2 id="gas-stations-modal-title" className="gas-stations-modal__title">
                {stationTypePlural} Near You
              </h2>
              {vehicleName && (
                <p className="gas-stations-modal__subtitle">
                  Find {isElectric ? 'charging' : 'fuel'} for your {vehicleName}
                </p>
              )}
            </div>
          </div>
          <button
            className="gas-stations-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="gas-stations-modal__content">
          {isLoadingLocation ? (
            <div className="gas-stations-modal__loading">
              <Loader2 size={32} className="gas-stations-modal__spinner" />
              <p>Getting your location...</p>
            </div>
          ) : !GOOGLE_MAPS_API_KEY ? (
            <div className="gas-stations-modal__error">
              <MapPin size={48} />
              <p>Map not available</p>
              <a 
                href={isElectric ? "https://www.plugshare.com" : "https://www.gasbuddy.com"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="gas-stations-modal__fallback-link"
              >
                {isElectric ? 'Find chargers on PlugShare' : 'Find gas prices on GasBuddy'}
                <ExternalLink size={16} />
              </a>
            </div>
          ) : userLocation ? (
            <div className="gas-stations-modal__map-container">
              {locationError && (
                <div className="gas-stations-modal__location-warning">
                  <MapPin size={16} />
                  {locationError}
                </div>
              )}

              <div className="gas-stations-modal__layout">
                {/* Sidebar with stations list */}
                <div className="gas-stations-modal__sidebar">
                  <div className="gas-stations-modal__sidebar-header">
                    <h3>
                      {isLoadingStations ? 'Searching...' : `${stations.length} ${stations.length === 1 ? stationType : stationTypePlural} Found`}
                    </h3>
                  </div>
                  
                  {isLoadingStations ? (
                    <div className="gas-stations-modal__sidebar-loading">
                      <Loader2 size={24} className="gas-stations-modal__spinner" />
                    </div>
                  ) : stations.length === 0 ? (
                    <div className="gas-stations-modal__sidebar-empty">
                      <p>No {stationTypePlural.toLowerCase()} found nearby</p>
                    </div>
                  ) : (
                    <ul className="gas-stations-modal__list">
                      {stations.map((station) => (
                        <li 
                          key={station.id}
                          className={`gas-stations-modal__list-item ${selectedStation?.id === station.id ? 'gas-stations-modal__list-item--selected' : ''}`}
                          onClick={() => setSelectedStation(station)}
                        >
                          <div className={`gas-stations-modal__station-icon ${isElectric ? 'gas-stations-modal__station-icon--electric' : ''}`}>
                            {isElectric ? <Zap size={18} /> : <Fuel size={18} />}
                          </div>
                          <div className="gas-stations-modal__station-info">
                            <h4 className="gas-stations-modal__station-name">{station.name}</h4>
                            <p className="gas-stations-modal__station-address">{station.address}</p>
                            <div className="gas-stations-modal__station-meta">
                              {station.rating && (
                                <span className="gas-stations-modal__station-rating">
                                  ★ {station.rating.toFixed(1)}
                                </span>
                              )}
                              {station.isOpen !== undefined && (
                                <span className={`gas-stations-modal__station-status ${station.isOpen ? 'gas-stations-modal__station-status--open' : 'gas-stations-modal__station-status--closed'}`}>
                                  {station.isOpen ? 'Open' : 'Closed'}
                                </span>
                              )}
                            </div>
                          </div>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}&destination_place_id=${station.placeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gas-stations-modal__station-directions"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Navigation size={16} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* External link for prices/info */}
                  <div className="gas-stations-modal__gasbuddy">
                    {isElectric ? (
                      <>
                        <p>Find more chargers & availability</p>
                        <a 
                          href={`https://www.plugshare.com/?latitude=${userLocation.lat}&longitude=${userLocation.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gas-stations-modal__gasbuddy-link"
                        >
                          <Zap size={16} />
                          View on PlugShare
                          <ExternalLink size={14} />
                        </a>
                      </>
                    ) : (
                      <>
                        <p>Want to compare gas prices?</p>
                        <a 
                          href={`https://www.gasbuddy.com/home?search=${encodeURIComponent(userLocation.lat + ',' + userLocation.lng)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gas-stations-modal__gasbuddy-link"
                        >
                          <img 
                            src="https://www.gasbuddy.com/favicon.ico" 
                            alt="GasBuddy" 
                            width="16" 
                            height="16"
                          />
                          Compare Prices on GasBuddy
                          <ExternalLink size={14} />
                        </a>
                      </>
                    )}
                  </div>
                </div>

                {/* Map */}
                <div className="gas-stations-modal__map">
                  <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                    <Map
                      defaultCenter={userLocation}
                      defaultZoom={13}
                      mapId="gas-stations-map"
                      gestureHandling="greedy"
                      disableDefaultUI={false}
                      zoomControl={true}
                      mapTypeControl={false}
                      streetViewControl={false}
                      fullscreenControl={true}
                      className="gas-stations-modal__map-element"
                    >
                      {/* User location marker */}
                      <AdvancedMarker position={userLocation}>
                        <div className="gas-marker gas-marker--user">
                          <MapPin size={20} />
                        </div>
                      </AdvancedMarker>

                      {/* Station markers */}
                      {stations.map((station) => (
                        <StationMarker
                          key={station.id}
                          station={station}
                          isSelected={selectedStation?.id === station.id}
                          showInfoWindow={openInfoWindowId === station.id}
                          onClick={() => {
                            setSelectedStation(station);
                            // Toggle info window - if clicking same marker, close it; otherwise open new one
                            setOpenInfoWindowId(prev => prev === station.id ? null : station.id);
                          }}
                          onCloseInfoWindow={() => setOpenInfoWindowId(null)}
                          isElectric={isElectric}
                        />
                      ))}

                      {/* Search for stations */}
                      <StationsMapContent
                        userLocation={userLocation}
                        onStationsFound={handleStationsFound}
                        isElectric={isElectric}
                      />
                    </Map>
                  </APIProvider>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="gas-stations-modal__footer">
          <p className="gas-stations-modal__disclaimer">
            {isElectric 
              ? 'Charging station locations provided by Google Maps. For real-time availability, visit PlugShare.'
              : 'Gas station locations provided by Google Maps. For real-time prices, visit GasBuddy.'}
          </p>
        </div>
      </div>
    </>
  );
};

export default GasStationsModal;

