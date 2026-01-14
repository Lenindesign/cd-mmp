import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronDown, Grid, List, MapPin, Tag, Clock, TrendingDown, Shield, Wrench, User, AlertTriangle, Check } from 'lucide-react';
import { getUniqueBodyStyles, getAllVehicles } from '../../services/vehicleService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { getAllListings, getUniqueMakesFromListings, type Listing } from '../../services/listingsService';
import TopTenCarouselLeads from '../../components/TopTenCarouselLeads';
import './UsedCarsPage.css';

// Vehicle History Tooltip Component
interface TooltipProps {
  listing: Listing;
  position: 'left' | 'right';
}

const VehicleHistoryTooltip = ({ listing, position }: TooltipProps) => {
  if (!listing.history) return null;
  
  const { history } = listing;
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={`vht vht--${position}`}>
      {/* Arrow */}
      <div className="vht__arrow" />
      
      {/* Header */}
      <div className="vht__header">
        <Shield size={18} />
        <span>Vehicle History Report</span>
      </div>
      
      {/* Stats Grid */}
      <div className="vht__grid">
        {/* Owners */}
        <div className="vht__stat">
          <User size={20} className="vht__stat-icon" />
          <div className="vht__stat-content">
            <span className="vht__stat-label">Owners</span>
            <span className="vht__stat-value">{history.owners}</span>
          </div>
        </div>
        
        {/* Accidents */}
        <div className={`vht__stat ${history.accidents === 0 ? 'vht__stat--success' : 'vht__stat--warning'}`}>
          {history.accidents === 0 ? (
            <Check size={20} className="vht__stat-icon" />
          ) : (
            <AlertTriangle size={20} className="vht__stat-icon" />
          )}
          <div className="vht__stat-content">
            <span className="vht__stat-label">Accidents</span>
            <span className="vht__stat-value">
              {history.accidents === 0 ? 'None Reported' : `${history.accidents} Reported`}
            </span>
          </div>
        </div>
        
        {/* Title Status */}
        <div className={`vht__stat ${history.titleStatus === 'Clean' ? 'vht__stat--success' : 'vht__stat--warning'}`}>
          <Check size={20} className="vht__stat-icon" />
          <div className="vht__stat-content">
            <span className="vht__stat-label">Title</span>
            <span className="vht__stat-value">{history.titleStatus}</span>
          </div>
        </div>
        
        {/* Service Records */}
        <div className="vht__stat">
          <Wrench size={20} className="vht__stat-icon" />
          <div className="vht__stat-content">
            <span className="vht__stat-label">Service Records</span>
            <span className="vht__stat-value">{history.serviceRecords}</span>
          </div>
        </div>
        
        {/* Days on Market */}
        <div className="vht__stat">
          <Clock size={20} className="vht__stat-icon" />
          <div className="vht__stat-content">
            <span className="vht__stat-label">Days on Market</span>
            <span className="vht__stat-value">{history.daysOnMarket}</span>
          </div>
        </div>
        
        {/* Last Service */}
        <div className="vht__stat">
          <Wrench size={20} className="vht__stat-icon" />
          <div className="vht__stat-content">
            <span className="vht__stat-label">Last Service</span>
            <span className="vht__stat-value">{history.lastServiceDate || 'N/A'}</span>
          </div>
        </div>
      </div>
      
      {/* Vehicle Usage */}
      <div className="vht__usage">
        <span className="vht__usage-label">Vehicle Usage</span>
        <div className="vht__usage-tags">
          {history.personalUse && <span className="vht__tag vht__tag--success">Personal Use</span>}
          {history.fleetUse && <span className="vht__tag vht__tag--warning">Fleet Vehicle</span>}
          {history.rentalUse && <span className="vht__tag vht__tag--warning">Rental History</span>}
        </div>
      </div>
      
      {/* Price History */}
      {history.priceHistory.length > 0 && (
        <div className="vht__price">
          <div className="vht__price-header">
            <TrendingDown size={18} />
            <span>Price History</span>
          </div>
          <div className="vht__price-list">
            {history.priceHistory.map((entry, idx) => (
              <div key={idx} className="vht__price-row">
                <span className="vht__price-date">{entry.date}</span>
                <span className="vht__price-amount">{formatCurrency(entry.price)}</span>
                {entry.change && entry.change > 0 && (
                  <span className="vht__price-savings">-${entry.change.toLocaleString()}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const UsedCarsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [hoveredListing, setHoveredListing] = useState<string | null>(null);
  
  // Get filter values from URL params
  const selectedMake = searchParams.get('make') || '';
  const selectedBodyStyle = searchParams.get('bodyStyle') || '';
  const selectedCondition = searchParams.get('condition') || '';
  const maxMileage = searchParams.get('maxMileage') || '';
  const sortBy = searchParams.get('sort') || 'price-low';
  
  const allListings = useMemo(() => getAllListings(), []);
  const makes = useMemo(() => getUniqueMakesFromListings(), []);
  const bodyStyles = getUniqueBodyStyles();
  const allVehicles = useMemo(() => getAllVehicles(), []);
  
  // Fetch all ratings from Supabase in production
  const { getRating: getSupabaseRating } = useSupabaseRatings();

  // Helper to get vehicle rating by make/model (uses Supabase in production)
  const getVehicleRating = (make: string, model: string): number => {
    const vehicle = allVehicles.find(
      v => v.make.toLowerCase() === make.toLowerCase() && 
           v.model.toLowerCase() === model.toLowerCase()
    );
    if (!vehicle) return 0;
    return getSupabaseRating(vehicle.id, getCategory(vehicle.bodyStyle), vehicle.staffRating);
  };

  // Mileage ranges for filter
  const mileageRanges = [
    { value: '', label: 'Any Mileage' },
    { value: '10000', label: 'Under 10,000 mi' },
    { value: '25000', label: 'Under 25,000 mi' },
    { value: '50000', label: 'Under 50,000 mi' },
    { value: '75000', label: 'Under 75,000 mi' },
    { value: '100000', label: 'Under 100,000 mi' },
  ];

  // Condition options
  const conditionOptions = [
    { value: '', label: 'All Conditions' },
    { value: 'new', label: 'New' },
    { value: 'used', label: 'Used' },
    { value: 'certified', label: 'Certified Pre-Owned' },
  ];
  
  // Filter and sort listings
  const filteredListings = useMemo(() => {
    let result = [...allListings];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(l => 
        `${l.year} ${l.make} ${l.model} ${l.trim}`.toLowerCase().includes(query)
      );
    }
    
    // Make filter
    if (selectedMake) {
      result = result.filter(l => l.make === selectedMake);
    }
    
    // Body style filter (need to look up from vehicle database)
    if (selectedBodyStyle) {
      result = result.filter(l => l.bodyStyle === selectedBodyStyle);
    }
    
    // Condition filter
    if (selectedCondition) {
      if (selectedCondition === 'new') {
        result = result.filter(l => l.isNew);
      } else if (selectedCondition === 'used') {
        result = result.filter(l => !l.isNew && !l.isCertified);
      } else if (selectedCondition === 'certified') {
        result = result.filter(l => l.isCertified);
      }
    }
    
    // Mileage filter
    if (maxMileage) {
      const maxMiles = parseInt(maxMileage);
      result = result.filter(l => l.mileage <= maxMiles);
    }
    
    // Sort
    switch (sortBy) {
      case 'ranking':
        result.sort((a, b) => {
          const ratingA = getVehicleRating(a.make, a.model);
          const ratingB = getVehicleRating(b.make, b.model);
          return ratingB - ratingA; // Higher rating first
        });
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileage-low':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'mileage-high':
        result.sort((a, b) => b.mileage - a.mileage);
        break;
      case 'year-new':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'year-old':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'distance':
        result.sort((a, b) => a.distance - b.distance);
        break;
      case 'name':
        result.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
        break;
    }
    
    return result;
  }, [allListings, searchQuery, selectedMake, selectedBodyStyle, selectedCondition, maxMileage, sortBy]);
  
  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };
  
  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery('');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatMileage = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="used-cars-page">
      {/* Header */}
      <div className="used-cars-page__header">
        <div className="container">
          <h1 className="used-cars-page__title">Shop Used Cars</h1>
          <p className="used-cars-page__subtitle">
            Browse {allListings.length.toLocaleString()} listings near you
          </p>
        </div>
      </div>
      
      {/* Filters Bar */}
      <div className="used-cars-page__filters-bar">
        <div className="container">
          <div className="used-cars-page__filters-row">
            {/* Search */}
            <div className="used-cars-page__search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by make, model, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter Toggle (Mobile) */}
            <button 
              className="used-cars-page__filter-toggle"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={16} className={filtersOpen ? 'rotated' : ''} />
            </button>
            
            {/* Make Filter */}
            <select
              className="used-cars-page__select"
              value={selectedMake}
              onChange={(e) => updateFilter('make', e.target.value)}
            >
              <option value="">All Makes</option>
              {makes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
            
            {/* Body Style Filter */}
            <select
              className="used-cars-page__select"
              value={selectedBodyStyle}
              onChange={(e) => updateFilter('bodyStyle', e.target.value)}
            >
              <option value="">All Body Styles</option>
              {bodyStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
            
            {/* Condition Filter */}
            <select
              className="used-cars-page__select"
              value={selectedCondition}
              onChange={(e) => updateFilter('condition', e.target.value)}
            >
              {conditionOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            {/* Mileage Filter */}
            <select
              className="used-cars-page__select"
              value={maxMileage}
              onChange={(e) => updateFilter('maxMileage', e.target.value)}
            >
              {mileageRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            
            {/* Sort */}
            <select
              className="used-cars-page__select"
              value={sortBy}
              onChange={(e) => updateFilter('sort', e.target.value)}
            >
              <option value="ranking">Top Ranked</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="mileage-low">Mileage: Low to High</option>
              <option value="mileage-high">Mileage: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
              <option value="distance">Distance: Nearest</option>
              <option value="name">Name A-Z</option>
            </select>
            
            {/* View Mode */}
            <div className="used-cars-page__view-modes">
              <button 
                className={`used-cars-page__view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button 
                className={`used-cars-page__view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
          
          {/* Active Filters */}
          {(selectedMake || selectedBodyStyle || selectedCondition || maxMileage || searchQuery) && (
            <div className="used-cars-page__active-filters">
              <span className="used-cars-page__results-count">
                {filteredListings.length.toLocaleString()} listings found
              </span>
              <button 
                className="used-cars-page__clear-filters"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Top Ten Carousel */}
      <TopTenCarouselLeads
        title="Top 10 Best-Selling Used Vehicles"
        subtitle="Explore the most popular used vehicles ranked by our experts. Find your perfect match and start shopping today."
        bodyStyle={selectedBodyStyle || 'SUV'}
        maxPrice={50000}
      />
      
      {/* Listings Grid/List */}
      <div className="used-cars-page__content">
        <div className="container">
          <div className={`used-cars-page__grid ${viewMode === 'list' ? 'used-cars-page__grid--list' : ''}`}>
            {filteredListings.map((listing, index) => {
              // Determine tooltip position based on column (4-column grid)
              const columnIndex = index % 4;
              const tooltipPosition: 'left' | 'right' = columnIndex < 2 ? 'right' : 'left';
              
              return (
                <div 
                  key={listing.id}
                  className={`used-cars-page__card-wrapper used-cars-page__card-wrapper--tooltip-${tooltipPosition}`}
                  onMouseEnter={() => setHoveredListing(listing.id)}
                  onMouseLeave={() => setHoveredListing(null)}
                >
                  <Link 
                    to={`/${listing.slug}`}
                    className="used-cars-page__card"
                  >
                    <div className="used-cars-page__card-image">
                      <img 
                        src={listing.image} 
                        alt={`${listing.year} ${listing.make} ${listing.model}`}
                        loading="lazy"
                      />
                      {/* Badges */}
                      <div className="used-cars-page__card-badges">
                        {listing.isNew && (
                          <span className="used-cars-page__card-badge used-cars-page__card-badge--new">
                            New
                          </span>
                        )}
                        {listing.isCertified && (
                          <span className="used-cars-page__card-badge used-cars-page__card-badge--certified">
                            CPO
                          </span>
                        )}
                        {listing.priceReduced && (
                          <span className="used-cars-page__card-badge used-cars-page__card-badge--reduced">
                            <Tag size={12} /> Price Drop
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="used-cars-page__card-info">
                      <h3 className="used-cars-page__card-title">
                        {listing.year} {listing.make} {listing.model}
                      </h3>
                      <p className="used-cars-page__card-trim">{listing.trim}</p>
                      
                      <div className="used-cars-page__card-price-row">
                        <span className="used-cars-page__card-price">
                          {formatCurrency(listing.price)}
                        </span>
                        {listing.originalPrice && (
                          <span className="used-cars-page__card-original-price">
                            {formatCurrency(listing.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      <div className="used-cars-page__card-mileage">
                        <Clock size={14} />
                        <span>{formatMileage(listing.mileage)} miles</span>
                      </div>
                      
                      <div className="used-cars-page__card-dealer">
                        <MapPin size={14} />
                        <span>{listing.dealerName}</span>
                        <span className="used-cars-page__card-distance">
                          {listing.distance} mi away
                        </span>
                      </div>
                      
                      {listing.dealerRating && (
                        <div className="used-cars-page__card-dealer-rating">
                          <span className="used-cars-page__card-stars">★</span>
                          <span>{listing.dealerRating.toFixed(1)}</span>
                          <span className="used-cars-page__card-rating-label">Dealer Rating</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  {/* Vehicle History Tooltip */}
                  {hoveredListing === listing.id && listing.history && (
                    <VehicleHistoryTooltip listing={listing} position={tooltipPosition} />
                  )}
                </div>
              );
            })}
          </div>
          
          {filteredListings.length === 0 && (
            <div className="used-cars-page__empty">
              <h3>No listings found</h3>
              <p>Try adjusting your filters or search query</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsedCarsPage;

