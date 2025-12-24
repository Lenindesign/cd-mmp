import { useState, useMemo, useCallback, useEffect } from 'react';
import { MapPin, List, Map, ChevronDown } from 'lucide-react';
import VehicleContextHeader, { type VehicleInfo } from './VehicleContextHeader';
import DealerCard from './DealerCard';
import DealerBottomSheet from './DealerBottomSheet';
import GoogleMapView from './GoogleMapView';
import MakeOfferModal from './MakeOfferModal';
import type { OfferData } from './MakeOfferModal';
import { getDealersForVehicle, sortDealers, type DealerWithScore, type SortOption, type VehicleInventoryItem } from '../../services/dealerService';
import './DealerLocatorMap.css';

// Get API key from environment variable
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Mock geocoding data for demo purposes
// In production, use Google Geocoding API
const LOCATION_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'miami': { lat: 25.7617, lng: -80.1918 },
  'miami, fl': { lat: 25.7617, lng: -80.1918 },
  '33101': { lat: 25.7617, lng: -80.1918 },
  'los angeles': { lat: 34.0522, lng: -118.2437 },
  'los angeles, ca': { lat: 34.0522, lng: -118.2437 },
  '90001': { lat: 33.9425, lng: -118.2551 },
  'lake forest': { lat: 33.6469, lng: -117.6891 },
  'lake forest, ca': { lat: 33.6469, lng: -117.6891 },
  '92630': { lat: 33.6469, lng: -117.6891 },
  'new york': { lat: 40.7128, lng: -74.0060 },
  'new york, ny': { lat: 40.7128, lng: -74.0060 },
  '10001': { lat: 40.7484, lng: -73.9967 },
  'chicago': { lat: 41.8781, lng: -87.6298 },
  'chicago, il': { lat: 41.8781, lng: -87.6298 },
  '60601': { lat: 41.8819, lng: -87.6278 },
  'houston': { lat: 29.7604, lng: -95.3698 },
  'houston, tx': { lat: 29.7604, lng: -95.3698 },
  '77001': { lat: 29.7523, lng: -95.3583 },
  'phoenix': { lat: 33.4484, lng: -112.0740 },
  'phoenix, az': { lat: 33.4484, lng: -112.0740 },
  '85001': { lat: 33.4484, lng: -112.0773 },
  'san diego': { lat: 32.7157, lng: -117.1611 },
  'san diego, ca': { lat: 32.7157, lng: -117.1611 },
  '92101': { lat: 32.7194, lng: -117.1628 },
  'dallas': { lat: 32.7767, lng: -96.7970 },
  'dallas, tx': { lat: 32.7767, lng: -96.7970 },
  '75201': { lat: 32.7872, lng: -96.7985 },
  'irvine': { lat: 33.6846, lng: -117.8265 },
  'irvine, ca': { lat: 33.6846, lng: -117.8265 },
  '92618': { lat: 33.6694, lng: -117.8231 },
};

// Simple geocoding function (mock for demo)
const geocodeLocation = (locationText: string): { lat: number; lng: number } | null => {
  const normalized = locationText.toLowerCase().trim();
  return LOCATION_COORDINATES[normalized] || null;
};

export interface DealerLocatorMapProps {
  vehicle: VehicleInfo;
  initialLocation?: { lat: number; lng: number };
  initialZipCode?: string;
  showVehiclePreview?: boolean;
  defaultView?: 'map' | 'list';
  maxResults?: number;
  cardVariant?: 'full' | 'compact';
  onDealerSelect?: (dealer: DealerWithScore) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'bestDeal', label: 'Best Deal' },
  { value: 'distance', label: 'Distance' },
  { value: 'price', label: 'Lowest Price' },
  { value: 'rating', label: 'Highest Rated' },
];

const DealerLocatorMap = ({
  vehicle,
  initialLocation = { lat: 33.6846, lng: -117.8265 }, // Irvine/OC default
  initialZipCode = 'Los Angeles, CA',
  showVehiclePreview = true,
  defaultView = 'list',
  maxResults = 20,
  cardVariant = 'full',
  onDealerSelect,
}: DealerLocatorMapProps) => {
  const [currentView, setCurrentView] = useState<'map' | 'list'>(defaultView);
  const [sortBy, setSortBy] = useState<SortOption>('bestDeal');
  const [selectedDealer, setSelectedDealer] = useState<DealerWithScore | null>(null);
  const [hoveredDealerId, setHoveredDealerId] = useState<string | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [location, setLocation] = useState(initialZipCode);
  // searchLocation is used for dealer filtering/distance calculations (only changes when user changes location)
  const [searchLocation, setSearchLocation] = useState(initialLocation);
  // mapViewCenter is used for map panning (changes on hover, doesn't affect dealer list)
  const [mapViewCenter, setMapViewCenter] = useState(initialLocation);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerVehicle, setOfferVehicle] = useState<VehicleInventoryItem | null>(null);
  const [offerDealer, setOfferDealer] = useState<DealerWithScore | null>(null);

  // Get dealers data based on search location (NOT map view center)
  const dealers = useMemo(() => {
    const allDealers = getDealersForVehicle(
      vehicle.make,
      vehicle.model,
      searchLocation.lat,
      searchLocation.lng,
      vehicle.msrp
    );
    return sortDealers(allDealers, sortBy).slice(0, maxResults);
  }, [vehicle.make, vehicle.model, vehicle.msrp, searchLocation.lat, searchLocation.lng, sortBy, maxResults]);

  // Center map on the #1 Best Deal dealer on initial load
  const [hasInitializedCenter, setHasInitializedCenter] = useState(false);
  
  useEffect(() => {
    if (!hasInitializedCenter && dealers.length > 0) {
      // Find the best deal dealer (first one when sorted by bestDeal)
      const bestDealDealer = dealers.find(d => d.dealScore.isBestDeal) || dealers[0];
      if (bestDealDealer) {
        setMapViewCenter({ lat: bestDealDealer.lat, lng: bestDealDealer.lng });
        setHasInitializedCenter(true);
      }
    }
  }, [dealers, hasInitializedCenter]);

  const handleDealerSelect = useCallback((dealer: DealerWithScore) => {
    setSelectedDealer(dealer);
    setIsBottomSheetOpen(true);
    onDealerSelect?.(dealer);
  }, [onDealerSelect]);

  // Handle hover from sidebar cards - pans map to dealer location
  const handleSidebarHover = useCallback((dealer: DealerWithScore | null) => {
    setHoveredDealerId(dealer?.id || null);
    if (dealer) {
      setMapViewCenter({ lat: dealer.lat, lng: dealer.lng });
    }
  }, []);

  // Handle hover from map markers - only highlights sidebar card, no map panning
  const handleMapMarkerHover = useCallback((dealer: DealerWithScore | null) => {
    setHoveredDealerId(dealer?.id || null);
  }, []);

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setIsSortDropdownOpen(false);
  };

  const handleLocationChange = () => {
    setLocationInput(location);
    setIsLocationModalOpen(true);
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLocation = locationInput.trim();
    if (newLocation) {
      // Try to geocode the location
      const coords = geocodeLocation(newLocation);
      if (coords) {
        // Update both search location (for dealer filtering) and map view center
        setSearchLocation(coords);
        setMapViewCenter(coords);
        setLocation(newLocation);
        setLocationInput('');
        setIsLocationModalOpen(false);
        setHasInitializedCenter(false); // Allow re-centering on best deal
        console.log('Location updated to:', newLocation, 'Coords:', coords);
      } else {
        // Location not found in our mock data
        alert(`Location "${newLocation}" not found. Try: Miami, Los Angeles, New York, Chicago, Houston, Phoenix, San Diego, Dallas, Irvine, Lake Forest, or their ZIP codes.`);
      }
    }
  };

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coords = { lat: latitude, lng: longitude };
          // Update both search location (for dealer filtering) and map view center
          setSearchLocation(coords);
          setMapViewCenter(coords);
          setLocation('Current Location');
          setIsLocationModalOpen(false);
          setHasInitializedCenter(false); // Allow re-centering on best deal
          console.log('Using current location:', latitude, longitude);
        },
        () => {
          alert('Unable to get your location. Please enter it manually.');
        }
      );
    }
  };

  const handleMakeOffer = useCallback((dealer: DealerWithScore, vehicleItem: VehicleInventoryItem) => {
    setOfferDealer(dealer);
    setOfferVehicle(vehicleItem);
    setIsOfferModalOpen(true);
  }, []);

  const handleSubmitOffer = useCallback((offer: OfferData) => {
    console.log('Offer submitted:', offer);
    // In a real app, this would send the offer to a backend API
    // For now, we just close the modal after the success state is shown
  }, []);

  const totalInventory = dealers.reduce((sum, d) => sum + d.inventoryCount, 0);

  return (
    <div className="dealer-locator">
      {/* Vehicle Context Header */}
      {showVehiclePreview && (
        <VehicleContextHeader vehicle={vehicle} />
      )}

      {/* Location Bar */}
      <div className="dealer-locator__toolbar">
        <div className="dealer-locator__location">
          <MapPin size={16} />
          <span>{location}</span>
          <button 
            className="dealer-locator__change-location"
            onClick={handleLocationChange}
          >
            Change
          </button>
        </div>

        <div className="dealer-locator__sort">
          <span className="dealer-locator__sort-label">Sort:</span>
          <div className="dealer-locator__sort-dropdown">
            <button
              className="dealer-locator__sort-trigger"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              aria-expanded={isSortDropdownOpen}
              aria-haspopup="listbox"
            >
              {sortOptions.find(o => o.value === sortBy)?.label}
              <ChevronDown size={16} className={isSortDropdownOpen ? 'rotated' : ''} />
            </button>
            
            {isSortDropdownOpen && (
              <ul className="dealer-locator__sort-options" role="listbox">
                {sortOptions.map(option => (
                  <li key={option.value}>
                    <button
                      className={`dealer-locator__sort-option ${sortBy === option.value ? 'active' : ''}`}
                      onClick={() => handleSortChange(option.value)}
                      role="option"
                      aria-selected={sortBy === option.value}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* View Toggle (Mobile) */}
      <div className="dealer-locator__view-toggle">
        <button
          className={`dealer-locator__view-btn ${currentView === 'list' ? 'active' : ''}`}
          onClick={() => setCurrentView('list')}
          aria-pressed={currentView === 'list'}
        >
          <List size={18} />
          <span>List</span>
        </button>
        <button
          className={`dealer-locator__view-btn ${currentView === 'map' ? 'active' : ''}`}
          onClick={() => setCurrentView('map')}
          aria-pressed={currentView === 'map'}
        >
          <Map size={18} />
          <span>Map</span>
        </button>
      </div>

      {/* Results Summary */}
      <div className="dealer-locator__summary">
        <span className="dealer-locator__count">
          {dealers.length} dealers · {totalInventory} {vehicle.model} in stock
        </span>
      </div>

      {/* Main Content Area */}
      <div className={`dealer-locator__content ${isBottomSheetOpen ? 'dealer-locator__content--panel-open' : ''}`}>
        {/* Dealer List */}
        <div className={`dealer-locator__list ${currentView === 'map' ? 'dealer-locator__list--hidden-mobile' : ''} ${isBottomSheetOpen ? 'dealer-locator__list--panel-open' : ''}`}>
          {dealers.length === 0 ? (
            <div className="dealer-locator__empty">
              <p>No dealers found in your area.</p>
              <p>Try expanding your search radius or changing your location.</p>
            </div>
          ) : (
            <ul className={`dealer-locator__dealers ${cardVariant === 'compact' ? 'dealer-locator__dealers--compact' : ''}`} role="list">
              {dealers.map((dealer, idx) => (
                <li key={dealer.id}>
                  <DealerCard
                    dealer={dealer}
                    vehicleModel={vehicle.model}
                    index={idx + 1}
                    isSelected={selectedDealer?.id === dealer.id}
                    isHovered={hoveredDealerId === dealer.id}
                    variant={cardVariant}
                    onSelect={handleDealerSelect}
                    onHover={handleSidebarHover}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Map View */}
        <div className={`dealer-locator__map ${currentView === 'list' ? 'dealer-locator__map--hidden-mobile' : ''} ${isBottomSheetOpen ? 'dealer-locator__map--panel-open' : ''}`}>
          <GoogleMapView
            dealers={dealers}
            center={mapViewCenter}
            selectedDealerId={selectedDealer?.id}
            hoveredDealerId={hoveredDealerId}
            onDealerSelect={handleDealerSelect}
            onDealerHover={handleMapMarkerHover}
            apiKey={GOOGLE_MAPS_API_KEY}
          />
        </div>

        {/* Dealer Detail Panel (inside content area so it matches map height) */}
        {selectedDealer && (
          <DealerBottomSheet
            dealer={selectedDealer}
            vehicleModel={vehicle.model}
            isOpen={isBottomSheetOpen}
            onClose={() => {
              setIsBottomSheetOpen(false);
              setSelectedDealer(null);
            }}
            onMakeOffer={handleMakeOffer}
          />
        )}
      </div>

      {/* Make Offer Modal */}
      {offerDealer && offerVehicle && (
        <MakeOfferModal
          isOpen={isOfferModalOpen}
          onClose={() => {
            setIsOfferModalOpen(false);
            setOfferDealer(null);
            setOfferVehicle(null);
          }}
          dealer={offerDealer}
          vehicle={{
            year: offerVehicle.year,
            make: offerVehicle.make,
            model: offerVehicle.model,
            trim: offerVehicle.trim,
            msrp: offerVehicle.price,
          }}
          onSubmitOffer={handleSubmitOffer}
        />
      )}

      {/* Mobile Sticky Header (Compact Vehicle Context) */}
      <div className="dealer-locator__sticky-header">
        <VehicleContextHeader vehicle={vehicle} variant="compact" />
      </div>

      {/* Location Change Modal */}
      {isLocationModalOpen && (
        <>
          <div 
            className="location-modal__backdrop"
            onClick={() => setIsLocationModalOpen(false)}
          />
          <div className="location-modal" role="dialog" aria-modal="true" aria-labelledby="location-modal-title">
            <h3 id="location-modal-title" className="location-modal__title">Change Location</h3>
            
            <form onSubmit={handleLocationSubmit} className="location-modal__form">
              <label htmlFor="location-input" className="location-modal__label">
                Enter city, state or ZIP code
              </label>
              <input
                id="location-input"
                type="text"
                className="location-modal__input"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="e.g., Miami, FL or 33101"
                autoFocus
              />
              
              <button type="submit" className="location-modal__submit">
                Update Location
              </button>
            </form>

            <div className="location-modal__divider">
              <span>or</span>
            </div>

            <button 
              type="button"
              className="location-modal__current"
              onClick={handleUseCurrentLocation}
            >
              <MapPin size={18} />
              Use my current location
            </button>

            <button 
              type="button"
              className="location-modal__close"
              onClick={() => setIsLocationModalOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DealerLocatorMap;

