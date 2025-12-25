import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { MapPin, List, Map, ChevronDown, Loader2, Navigation } from 'lucide-react';
import VehicleContextHeader, { type VehicleInfo } from './VehicleContextHeader';
import DealerCard from './DealerCard';
import DealerBottomSheet, { DealerDetailContent } from './DealerBottomSheet';
import GoogleMapView from './GoogleMapView';
import MakeOfferModal from './MakeOfferModal';
import type { OfferData } from './MakeOfferModal';
import { getDealersForVehicle, sortDealers, type DealerWithScore, type SortOption, type VehicleInventoryItem } from '../../services/dealerService';
import { useGooglePlacesAutocomplete, type PlacePrediction } from '../../hooks/useGooglePlacesAutocomplete';
import './DealerLocatorMap.css';

// Get API key from environment variable
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

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
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [selectedPredictionIndex, setSelectedPredictionIndex] = useState(-1);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Google Places Autocomplete hook
  const {
    predictions,
    isLoading: isLoadingPredictions,
    isReady: isPlacesReady,
    searchPlaces,
    getPlaceDetails,
    reverseGeocode,
    clearPredictions,
  } = useGooglePlacesAutocomplete({
    apiKey: GOOGLE_MAPS_API_KEY,
    debounceMs: 300,
    types: ['(regions)'], // Cities, states, postal codes
    componentRestrictions: { country: 'us' },
  });

  // Get dealers data based on search location (NOT map view center)
  const dealers = useMemo(() => {
    const allDealers = getDealersForVehicle(
      vehicle.make,
      vehicle.model,
      searchLocation.lat,
      searchLocation.lng,
      vehicle.msrp,
      100, // max distance
      vehicle.priceMin,
      vehicle.priceMax
    );
    return sortDealers(allDealers, sortBy).slice(0, maxResults);
  }, [vehicle.make, vehicle.model, vehicle.msrp, vehicle.priceMin, vehicle.priceMax, searchLocation.lat, searchLocation.lng, sortBy, maxResults]);

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
    setLocationInput('');
    clearPredictions();
    setShowAutocomplete(false);
    setSelectedPredictionIndex(-1);
    setIsLocationModalOpen(true);
    // Focus input after modal opens
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Handle input change with autocomplete
  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationInput(value);
    setSelectedPredictionIndex(-1);
    
    if (value.trim().length >= 2) {
      searchPlaces(value);
      setShowAutocomplete(true);
    } else {
      clearPredictions();
      setShowAutocomplete(false);
    }
  };

  // Handle selecting an autocomplete prediction
  const handleSelectPrediction = async (prediction: PlacePrediction) => {
    try {
      const details = await getPlaceDetails(prediction.placeId);
      
      // Update both search location (for dealer filtering) and map view center
      setSearchLocation({ lat: details.lat, lng: details.lng });
      setMapViewCenter({ lat: details.lat, lng: details.lng });
      setLocation(details.formattedAddress);
      setLocationInput('');
      clearPredictions();
      setShowAutocomplete(false);
      setIsLocationModalOpen(false);
      setHasInitializedCenter(false); // Allow re-centering on best deal
      console.log('Location updated to:', details.formattedAddress, 'Coords:', { lat: details.lat, lng: details.lng });
    } catch (error) {
      console.error('Error getting place details:', error);
      alert('Unable to get location details. Please try again.');
    }
  };

  // Handle keyboard navigation in autocomplete
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showAutocomplete || predictions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedPredictionIndex(prev => 
          prev < predictions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedPredictionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedPredictionIndex >= 0 && predictions[selectedPredictionIndex]) {
          handleSelectPrediction(predictions[selectedPredictionIndex]);
        }
        break;
      case 'Escape':
        setShowAutocomplete(false);
        clearPredictions();
        break;
    }
  };

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If there are predictions and one is selected, use that
    if (selectedPredictionIndex >= 0 && predictions[selectedPredictionIndex]) {
      await handleSelectPrediction(predictions[selectedPredictionIndex]);
      return;
    }
    
    // If there are predictions, use the first one
    if (predictions.length > 0) {
      await handleSelectPrediction(predictions[0]);
      return;
    }
    
    // Otherwise show a message
    if (locationInput.trim()) {
      alert('Please select a location from the suggestions.');
    }
  };

  const handleUseCurrentLocation = async () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const coords = { lat: latitude, lng: longitude };
        
        try {
          // Try to reverse geocode to get a nice address
          if (isPlacesReady) {
            const details = await reverseGeocode(latitude, longitude);
            setLocation(details.formattedAddress);
          } else {
            setLocation('Current Location');
          }
        } catch (error) {
          console.error('Reverse geocode failed:', error);
          setLocation('Current Location');
        }
        
        // Update both search location (for dealer filtering) and map view center
        setSearchLocation(coords);
        setMapViewCenter(coords);
        setIsLocationModalOpen(false);
        setHasInitializedCenter(false); // Allow re-centering on best deal
        setIsGettingLocation(false);
        console.log('Using current location:', latitude, longitude);
      },
      (error) => {
        setIsGettingLocation(false);
        let message = 'Unable to get your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access was denied. Please enable location permissions in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out. Please try again.';
            break;
        }
        alert(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) {
        setShowAutocomplete(false);
      }
    };

    if (showAutocomplete) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAutocomplete]);

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
            vehicleImage={vehicle.image}
            vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            sidebarTitle={`${dealers.length} Dealers Near You`}
            sidebarContent={
              dealers.length === 0 ? (
                <div className="dealer-locator__empty">
                  <p>No dealers found in your area.</p>
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
              )
            }
            isDealerDetailOpen={isBottomSheetOpen}
            onCloseDealerDetail={() => {
              setIsBottomSheetOpen(false);
              setSelectedDealer(null);
            }}
            dealerDetailContent={
              selectedDealer ? (
                <DealerDetailContent
                  dealer={selectedDealer}
                  vehicleModel={vehicle.model}
                  onMakeOffer={handleMakeOffer}
                />
              ) : null
            }
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
              <div className="location-modal__input-wrapper" ref={autocompleteRef}>
                <input
                  ref={inputRef}
                  id="location-input"
                  type="text"
                  className="location-modal__input"
                  value={locationInput}
                  onChange={handleLocationInputChange}
                  onKeyDown={handleInputKeyDown}
                  onFocus={() => {
                    if (predictions.length > 0) setShowAutocomplete(true);
                  }}
                  placeholder="e.g., Miami, FL or 33101"
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-controls="location-autocomplete-list"
                  aria-expanded={showAutocomplete && predictions.length > 0}
                />
                {isLoadingPredictions && (
                  <div className="location-modal__input-loader">
                    <Loader2 size={18} className="spinning" />
                  </div>
                )}
                
                {/* Autocomplete Dropdown */}
                {showAutocomplete && predictions.length > 0 && (
                  <ul 
                    id="location-autocomplete-list"
                    className="location-modal__autocomplete"
                    role="listbox"
                  >
                    {predictions.map((prediction, index) => (
                      <li
                        key={prediction.placeId}
                        role="option"
                        aria-selected={index === selectedPredictionIndex}
                        className={`location-modal__autocomplete-item ${
                          index === selectedPredictionIndex ? 'location-modal__autocomplete-item--selected' : ''
                        }`}
                        onClick={() => handleSelectPrediction(prediction)}
                        onMouseEnter={() => setSelectedPredictionIndex(index)}
                      >
                        <MapPin size={16} className="location-modal__autocomplete-icon" />
                        <div className="location-modal__autocomplete-text">
                          <span className="location-modal__autocomplete-main">
                            {prediction.mainText}
                          </span>
                          {prediction.secondaryText && (
                            <span className="location-modal__autocomplete-secondary">
                              {prediction.secondaryText}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <button type="submit" className="location-modal__submit" disabled={predictions.length === 0 && locationInput.trim().length > 0}>
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
              disabled={isGettingLocation}
            >
              {isGettingLocation ? (
                <>
                  <Loader2 size={18} className="spinning" />
                  Getting location...
                </>
              ) : (
                <>
                  <Navigation size={18} />
                  Use my current location
                </>
              )}
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

