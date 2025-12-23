import { useState, useMemo, useCallback } from 'react';
import { MapPin, List, Map, ChevronDown } from 'lucide-react';
import VehicleContextHeader, { type VehicleInfo } from './VehicleContextHeader';
import DealerCard from './DealerCard';
import DealerBottomSheet from './DealerBottomSheet';
import GoogleMapView from './GoogleMapView';
import { getDealersForVehicle, sortDealers, type DealerWithScore, type SortOption } from '../../services/dealerService';
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
  initialLocation = { lat: 25.7617, lng: -80.1918 }, // Miami default
  initialZipCode = '33101',
  showVehiclePreview = true,
  defaultView = 'list',
  maxResults = 20,
  onDealerSelect,
}: DealerLocatorMapProps) => {
  const [currentView, setCurrentView] = useState<'map' | 'list'>(defaultView);
  const [sortBy, setSortBy] = useState<SortOption>('bestDeal');
  const [selectedDealer, setSelectedDealer] = useState<DealerWithScore | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [location, setLocation] = useState(initialZipCode);

  // Get dealers data
  const dealers = useMemo(() => {
    const allDealers = getDealersForVehicle(
      vehicle.make,
      vehicle.model,
      initialLocation.lat,
      initialLocation.lng,
      vehicle.msrp
    );
    return sortDealers(allDealers, sortBy).slice(0, maxResults);
  }, [vehicle.make, vehicle.model, vehicle.msrp, initialLocation.lat, initialLocation.lng, sortBy, maxResults]);

  const handleDealerSelect = useCallback((dealer: DealerWithScore) => {
    setSelectedDealer(dealer);
    setIsBottomSheetOpen(true);
    onDealerSelect?.(dealer);
  }, [onDealerSelect]);

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setIsSortDropdownOpen(false);
  };

  const handleLocationChange = () => {
    // In a real app, this would open a location picker or use geolocation
    const newZip = prompt('Enter ZIP code:', location);
    if (newZip) {
      setLocation(newZip);
    }
  };

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
      <div className="dealer-locator__content">
        {/* Dealer List */}
        <div className={`dealer-locator__list ${currentView === 'map' ? 'dealer-locator__list--hidden-mobile' : ''}`}>
          {dealers.length === 0 ? (
            <div className="dealer-locator__empty">
              <p>No dealers found in your area.</p>
              <p>Try expanding your search radius or changing your location.</p>
            </div>
          ) : (
            <ul className="dealer-locator__dealers" role="list">
              {dealers.map((dealer) => (
                <li key={dealer.id}>
                  <DealerCard
                    dealer={dealer}
                    vehicleModel={vehicle.model}
                    isSelected={selectedDealer?.id === dealer.id}
                    onSelect={handleDealerSelect}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Map View */}
        <div className={`dealer-locator__map ${currentView === 'list' ? 'dealer-locator__map--hidden-mobile' : ''}`}>
          <GoogleMapView
            dealers={dealers}
            center={initialLocation}
            selectedDealerId={selectedDealer?.id}
            onDealerSelect={handleDealerSelect}
            apiKey={GOOGLE_MAPS_API_KEY}
          />
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      {selectedDealer && (
        <DealerBottomSheet
          dealer={selectedDealer}
          vehicleModel={vehicle.model}
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        />
      )}

      {/* Mobile Sticky Header (Compact Vehicle Context) */}
      <div className="dealer-locator__sticky-header">
        <VehicleContextHeader vehicle={vehicle} variant="compact" />
      </div>
    </div>
  );
};

export default DealerLocatorMap;

