import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronDown, Grid, List, Users, Mountain, Gem, Leaf, Gauge, Briefcase, PiggyBank, MapPin, Clock, Tag, TrendingDown, Shield, Wrench, User, AlertTriangle, Check } from 'lucide-react';
import { getAllVehicles, getUniqueMakes, getUniqueBodyStyles } from '../../services/vehicleService';
import { getAllListings, getUniqueMakesFromListings, type Listing } from '../../services/listingsService';
import { LIFESTYLES, getVehicleLifestyles, type Lifestyle } from '../../services/lifestyleService';
import TopTenCarouselLeads from '../../components/TopTenCarouselLeads';
import { OptimizedImage } from '../../components/OptimizedImage';
import { SEO } from '../../components/SEO';
import './VehiclesListPage.css';

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

const VehiclesListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [hoveredListing, setHoveredListing] = useState<string | null>(null);
  
  // Get filter values from URL params
  const inventoryType = searchParams.get('type') || 'new'; // 'new' or 'used'
  const selectedMake = searchParams.get('make') || '';
  const selectedBodyStyle = searchParams.get('bodyStyle') || '';
  const selectedLifestyle = searchParams.get('lifestyle') || '';
  const maxMileage = searchParams.get('maxMileage') || '';
  const sortBy = searchParams.get('sort') || (inventoryType === 'new' ? 'rating' : 'price-low');
  
  const allVehicles = getAllVehicles();
  const allListings = useMemo(() => getAllListings(), []);
  const makes = inventoryType === 'new' ? getUniqueMakes() : getUniqueMakesFromListings();
  const bodyStyles = getUniqueBodyStyles();

  // Helper to get vehicle rating by make/model for ranking sort
  const getVehicleRating = (make: string, model: string): number => {
    const vehicle = allVehicles.find(
      v => v.make.toLowerCase() === make.toLowerCase() && 
           v.model.toLowerCase() === model.toLowerCase()
    );
    return vehicle?.staffRating || 0;
  };

  // Mileage ranges for used cars
  const mileageRanges = [
    { value: '', label: 'Any Mileage' },
    { value: '10000', label: 'Under 10,000 mi' },
    { value: '25000', label: 'Under 25,000 mi' },
    { value: '50000', label: 'Under 50,000 mi' },
    { value: '75000', label: 'Under 75,000 mi' },
  ];

  // Lifestyle icon mapping
  const getLifestyleIcon = (lifestyle: string) => {
    switch (lifestyle) {
      case 'Family': return <Users size={16} />;
      case 'Adventure': return <Mountain size={16} />;
      case 'Luxury': return <Gem size={16} />;
      case 'Eco-Friendly': return <Leaf size={16} />;
      case 'Performance': return <Gauge size={16} />;
      case 'Commuter': return <Briefcase size={16} />;
      case 'Value': return <PiggyBank size={16} />;
      default: return null;
    }
  };
  
  // Filter and sort NEW vehicles
  const filteredVehicles = useMemo(() => {
    if (inventoryType !== 'new') return [];
    
    let result = [...allVehicles];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(v => 
        `${v.year} ${v.make} ${v.model}`.toLowerCase().includes(query)
      );
    }
    
    // Make filter
    if (selectedMake) {
      result = result.filter(v => v.make === selectedMake);
    }
    
    // Body style filter
    if (selectedBodyStyle) {
      result = result.filter(v => v.bodyStyle === selectedBodyStyle);
    }
    
    // Lifestyle filter
    if (selectedLifestyle) {
      result = result.filter(v => 
        getVehicleLifestyles(v).includes(selectedLifestyle as Lifestyle)
      );
    }
    
    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.staffRating - a.staffRating);
        break;
      case '10best':
        // 10Best vehicles first (sorted by price low to high), then others by price
        result.sort((a, b) => {
          const aIs10Best = a.tenBest || a.editorsChoice ? 1 : 0;
          const bIs10Best = b.tenBest || b.editorsChoice ? 1 : 0;
          if (bIs10Best !== aIs10Best) return bIs10Best - aIs10Best;
          return a.priceMin - b.priceMin;
        });
        break;
      case 'price-low':
        result.sort((a, b) => a.priceMin - b.priceMin);
        break;
      case 'price-high':
        result.sort((a, b) => b.priceMin - a.priceMin);
        break;
      case 'name':
        result.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
        break;
      case 'year':
        result.sort((a, b) => b.year.localeCompare(a.year));
        break;
    }
    
    return result;
  }, [inventoryType, allVehicles, searchQuery, selectedMake, selectedBodyStyle, selectedLifestyle, sortBy]);

  // Filter and sort USED listings
  const filteredListings = useMemo(() => {
    if (inventoryType !== 'used') return [];
    
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
    
    // Body style filter
    if (selectedBodyStyle) {
      result = result.filter(l => l.bodyStyle === selectedBodyStyle);
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
      case 'year':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'distance':
        result.sort((a, b) => a.distance - b.distance);
        break;
      case 'name':
        result.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
        break;
    }
    
    return result;
  }, [inventoryType, allListings, searchQuery, selectedMake, selectedBodyStyle, maxMileage, sortBy, getVehicleRating]);

  // Get the count for display
  const totalCount = inventoryType === 'new' ? filteredVehicles.length : filteredListings.length;
  
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

  // Handle inventory type change
  const handleInventoryTypeChange = (type: 'new' | 'used') => {
    const newParams = new URLSearchParams();
    newParams.set('type', type);
    // Reset sort to appropriate default
    if (type === 'new') {
      newParams.set('sort', 'rating');
    } else {
      newParams.set('sort', 'price-low');
    }
    setSearchParams(newParams);
    setSearchQuery('');
  };

  // Dynamic SEO title based on filters
  const seoTitle = inventoryType === 'new' 
    ? selectedMake 
      ? `New ${selectedMake} Cars for Sale` 
      : 'Browse New Cars for Sale'
    : selectedMake 
      ? `Used ${selectedMake} Cars for Sale` 
      : 'Browse Used Cars for Sale';

  const seoDescription = inventoryType === 'new'
    ? `Browse ${filteredVehicles.length.toLocaleString()} new vehicles. Compare prices, ratings, and specs to find your perfect car.`
    : `Browse ${filteredListings.length.toLocaleString()} used cars for sale. Find certified pre-owned vehicles, price drops, and great deals.`;

  return (
    <div className="vehicles-list-page">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={['cars for sale', 'new cars', 'used cars', selectedMake || '', selectedBodyStyle || ''].filter(Boolean)}
      />
      {/* Header */}
      <div className="vehicles-list-page__header">
        <div className="container">
          <h1 className="vehicles-list-page__title">Browse All Vehicles</h1>
          <div className="vehicles-list-page__subtitle-row">
            <p className="vehicles-list-page__subtitle">
              Explore {inventoryType === 'new' ? allVehicles.length.toLocaleString() : allListings.length.toLocaleString()} {inventoryType === 'new' ? 'new vehicles' : 'listings'} in our database
            </p>
            <div className="vehicles-list-page__type-toggle">
              <button
                className={`vehicles-list-page__type-btn ${inventoryType === 'new' ? 'active' : ''}`}
                onClick={() => handleInventoryTypeChange('new')}
              >
                All New
              </button>
              <button
                className={`vehicles-list-page__type-btn ${inventoryType === 'used' ? 'active' : ''}`}
                onClick={() => handleInventoryTypeChange('used')}
              >
                All Used
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters Bar */}
      <div className="vehicles-list-page__filters-bar">
        <div className="container">
          <div className="vehicles-list-page__filters-row">
            {/* Search */}
            <div className="vehicles-list-page__search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter Toggle (Mobile) */}
            <button 
              className="vehicles-list-page__filter-toggle"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={16} className={filtersOpen ? 'rotated' : ''} />
            </button>
            
            {/* Make Filter */}
            <select
              className="vehicles-list-page__select"
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
              className="vehicles-list-page__select"
              value={selectedBodyStyle}
              onChange={(e) => updateFilter('bodyStyle', e.target.value)}
            >
              <option value="">All Body Styles</option>
              {bodyStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
            
            {/* Lifestyle Filter (New Cars Only) */}
            {inventoryType === 'new' && (
              <select
                className="vehicles-list-page__select vehicles-list-page__select--lifestyle"
                value={selectedLifestyle}
                onChange={(e) => updateFilter('lifestyle', e.target.value)}
              >
                <option value="">All Lifestyles</option>
                {LIFESTYLES.map(lifestyle => (
                  <option key={lifestyle} value={lifestyle}>{lifestyle}</option>
                ))}
              </select>
            )}

            {/* Mileage Filter (Used Cars Only) */}
            {inventoryType === 'used' && (
              <select
                className="vehicles-list-page__select"
                value={maxMileage}
                onChange={(e) => updateFilter('maxMileage', e.target.value)}
              >
                {mileageRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            )}
            
            {/* Sort */}
            <select
              className="vehicles-list-page__select"
              value={sortBy}
              onChange={(e) => updateFilter('sort', e.target.value)}
            >
              {inventoryType === 'new' ? (
                <>
                  <option value="rating">Highest Rated</option>
                  <option value="10best">10Best: Low to High</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                  <option value="year">Newest First</option>
                </>
              ) : (
                <>
                  <option value="ranking">Top Ranked</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="mileage-low">Mileage: Low to High</option>
                  <option value="year">Year: Newest First</option>
                  <option value="distance">Distance: Nearest</option>
                  <option value="name">Name A-Z</option>
                </>
              )}
            </select>
            
            {/* View Mode */}
            <div className="vehicles-list-page__view-modes">
              <button 
                className={`vehicles-list-page__view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button 
                className={`vehicles-list-page__view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
          
          {/* Active Filters */}
          {(selectedMake || selectedBodyStyle || selectedLifestyle || maxMileage || searchQuery) && (
            <div className="vehicles-list-page__active-filters">
              <span className="vehicles-list-page__results-count">
                {totalCount.toLocaleString()} {inventoryType === 'new' ? 'vehicles' : 'listings'} found
              </span>
              {selectedLifestyle && inventoryType === 'new' && (
                <span className="vehicles-list-page__active-lifestyle">
                  {getLifestyleIcon(selectedLifestyle)}
                  {selectedLifestyle}
                </span>
              )}
              <button 
                className="vehicles-list-page__clear-filters"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Top Ten Carousel - Filters dynamically based on user selection */}
      <TopTenCarouselLeads
        bodyStyle={selectedBodyStyle || undefined}
        make={selectedMake || undefined}
        lifestyle={inventoryType === 'new' ? (selectedLifestyle || undefined) : undefined}
        onViewRankings={() => updateFilter('sort', inventoryType === 'new' ? 'rating' : 'ranking')}
      />
      
      {/* Vehicle Grid/List */}
      <div className="vehicles-list-page__content">
        <div className="container">
          <div className={`vehicles-list-page__grid ${viewMode === 'list' ? 'vehicles-list-page__grid--list' : ''}`}>
            {/* New Vehicles */}
            {inventoryType === 'new' && filteredVehicles.map((vehicle) => (
              <Link 
                key={vehicle.id}
                to={`/${vehicle.slug}`}
                className="vehicles-list-page__card"
              >
                <div className="vehicles-list-page__card-image">
                  <OptimizedImage 
                    src={vehicle.image} 
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    aspectRatio="16/10"
                    wrapperClassName="vehicles-list-page__card-img-wrapper"
                  />
                  <span className="vehicles-list-page__card-body-style">
                    {vehicle.bodyStyle}
                  </span>
                  {/* Accolades Badges */}
                  {(vehicle.editorsChoice || vehicle.tenBest) && (
                    <div className="vehicles-list-page__card-accolades">
                      {vehicle.editorsChoice && (
                        <div className="vehicles-list-page__card-accolade vehicles-list-page__card-accolade--ec" title="Editor's Choice">
                          <svg viewBox="0 0 261 240" width="24" height="22" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M259.43 93.03s4.576-5.936-2.599-8.963l-25.513-10.773s-7.173-3.029-6.438-10.284l2.61-25.654s.735-7.256-7.113-6.579l-27.969 2.403s-7.853.675-11.155-5.942L169.561 3.812s-3.305-6.617-9.745-2.415l-22.898 14.93s-6.44 4.202-12.881 0l-22.895-14.93S94.7-2.805 91.4 3.812L79.703 27.238s-3.302 6.617-11.155 5.942l-27.969-2.403s-7.849-.677-7.114 6.579l2.611 25.654s.737 7.255-6.438 10.284L4.125 84.067s-7.175 3.027-2.6 8.962l16.223 21.037s4.573 5.935 0 11.868L1.526 146.971s-4.576 5.935 2.6 8.964l25.512 10.773s7.175 3.027 6.438 10.283l-2.61 25.653s-.736 7.256 7.113 6.581l27.969-2.405s7.853-.675 11.155 5.942L91.4 236.188s3.3 6.617 9.742 2.415l22.895-14.933s6.441-4.199 12.881 0l22.898 14.933s6.44 4.202 9.745-2.415l11.692-23.426s3.302-6.617 11.155-5.942l27.969 2.405s7.848.675 7.113-6.581l-2.61-25.653s-.735-7.256 6.438-10.283l25.513-10.773s7.175-3.029 2.599-8.964l-16.22-21.037s-4.573-5.933 0-11.868l16.22-21.037Z" fill="#FEFEFE"/>
                            <path fillRule="evenodd" clipRule="evenodd" fill="#1B5F8A" d="M184.986 99.46c-.14-4.326-.824-6.87-2.75-10.303-4.403-7.502-11.421-11.32-20.639-11.32-9.904 0-17.746 4.706-21.598 12.849-3.303 7.122-5.503 19.33-5.503 31.159 0 11.954 2.2 24.164 5.503 31.287 3.852 8.143 11.694 12.847 21.598 12.847 9.218 0 16.236-3.816 20.639-11.32 1.926-3.434 2.61-5.978 2.75-10.303h-12.931c-1.1 6.487-4.816 9.797-10.731 9.797-5.094 0-8.392-2.544-10.458-8.013-1.787-4.71-3.163-15.519-3.163-24.295 0-7.887 1.237-18.314 2.89-23.146 1.923-6.233 5.363-9.034 10.731-9.034 5.915 0 9.631 3.31 10.731 9.795h12.931ZM75.926 79.49v84.835h45.813v-11.828h-33.02v-28.109h19.537V112.56H88.72V91.318h31.506V79.49h-44.3Z"/>
                          </svg>
                        </div>
                      )}
                      {vehicle.tenBest && (
                        <div className="vehicles-list-page__card-accolade vehicles-list-page__card-accolade--10best" title="10Best">
                          <img 
                            src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg" 
                            alt="10Best"
                            width="22"
                            height="25"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="vehicles-list-page__card-info">
                  <h3 className="vehicles-list-page__card-title">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="vehicles-list-page__card-rating">
                    <span className="vehicles-list-page__card-rating-score">
                      {vehicle.staffRating}
                    </span>
                    <span className="vehicles-list-page__card-rating-max">/10</span>
                  </div>
                  <div className="vehicles-list-page__card-meta">
                    <span className="vehicles-list-page__card-price">
                      Starting at {formatCurrency(vehicle.priceMin)}
                    </span>
                    {vehicle.mpg && (
                      <span className="vehicles-list-page__card-mpg">
                        {vehicle.mpg} MPG
                      </span>
                    )}
                  </div>
                  <div className="vehicles-list-page__card-specs">
                    <span>{vehicle.fuelType}</span>
                    <span>•</span>
                    <span>{vehicle.drivetrain}</span>
                    <span>•</span>
                    <span>{vehicle.transmission}</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Used Listings */}
            {inventoryType === 'used' && filteredListings.map((listing, index) => {
              // Determine tooltip position based on column (4-column grid)
              // Columns 0, 1 → right; Columns 2, 3 → left
              const columnIndex = index % 4;
              const tooltipPosition: 'left' | 'right' = columnIndex < 2 ? 'right' : 'left';
              
              return (
                <div 
                  key={listing.id}
                  className={`vehicles-list-page__card-wrapper vehicles-list-page__card-wrapper--tooltip-${tooltipPosition}`}
                  onMouseEnter={() => setHoveredListing(listing.id)}
                  onMouseLeave={() => setHoveredListing(null)}
                >
                  <Link 
                    to={`/${listing.slug}`}
                    className="vehicles-list-page__card vehicles-list-page__card--used"
                  >
                    <div className="vehicles-list-page__card-image">
                      <OptimizedImage 
                        src={listing.image} 
                        alt={`${listing.year} ${listing.make} ${listing.model}`}
                        aspectRatio="16/10"
                        wrapperClassName="vehicles-list-page__card-img-wrapper"
                      />
                      {/* Badges */}
                      <div className="vehicles-list-page__card-badges">
                        {listing.isNew && (
                          <span className="vehicles-list-page__card-badge vehicles-list-page__card-badge--new">
                            New
                          </span>
                        )}
                        {listing.isCertified && (
                          <span className="vehicles-list-page__card-badge vehicles-list-page__card-badge--certified">
                            CPO
                          </span>
                        )}
                        {listing.priceReduced && (
                          <span className="vehicles-list-page__card-badge vehicles-list-page__card-badge--reduced">
                            <Tag size={10} /> Price Drop
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="vehicles-list-page__card-info">
                      <h3 className="vehicles-list-page__card-title">
                        {listing.year} {listing.make} {listing.model}
                      </h3>
                    <p className="vehicles-list-page__card-trim">{listing.trim}</p>
                    
                    <div className="vehicles-list-page__card-price-row">
                      <span className="vehicles-list-page__card-price vehicles-list-page__card-price--used">
                        {formatCurrency(listing.price)}
                      </span>
                      {listing.originalPrice && (
                        <span className="vehicles-list-page__card-original-price">
                          {formatCurrency(listing.originalPrice)}
                        </span>
                      )}
                    </div>
                    
                    <div className="vehicles-list-page__card-mileage">
                      <Clock size={14} />
                      <span>{formatMileage(listing.mileage)} miles</span>
                    </div>
                    
                    <div className="vehicles-list-page__card-dealer">
                      <MapPin size={14} />
                      <span>{listing.dealerName}</span>
                      <span className="vehicles-list-page__card-distance">
                        {listing.distance} mi
                      </span>
                    </div>
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
          
          {totalCount === 0 && (
            <div className="vehicles-list-page__empty">
              <h3>No {inventoryType === 'new' ? 'vehicles' : 'listings'} found</h3>
              <p>Try adjusting your filters or search query</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehiclesListPage;

