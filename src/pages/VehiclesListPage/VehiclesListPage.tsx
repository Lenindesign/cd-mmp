import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronDown, Grid, List } from 'lucide-react';
import { getAllVehicles, getUniqueMakes, getUniqueBodyStyles } from '../../services/vehicleService';
import './VehiclesListPage.css';

const VehiclesListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Get filter values from URL params
  const selectedMake = searchParams.get('make') || '';
  const selectedBodyStyle = searchParams.get('bodyStyle') || '';
  const sortBy = searchParams.get('sort') || 'rating';
  
  const allVehicles = getAllVehicles();
  const makes = getUniqueMakes();
  const bodyStyles = getUniqueBodyStyles();
  
  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
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
    
    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.staffRating - a.staffRating);
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
  }, [allVehicles, searchQuery, selectedMake, selectedBodyStyle, sortBy]);
  
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

  return (
    <div className="vehicles-list-page">
      {/* Header */}
      <div className="vehicles-list-page__header">
        <div className="container">
          <h1 className="vehicles-list-page__title">Browse All Vehicles</h1>
          <p className="vehicles-list-page__subtitle">
            Explore {allVehicles.length} vehicles in our database
          </p>
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
            
            {/* Sort */}
            <select
              className="vehicles-list-page__select"
              value={sortBy}
              onChange={(e) => updateFilter('sort', e.target.value)}
            >
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
              <option value="year">Newest First</option>
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
          {(selectedMake || selectedBodyStyle || searchQuery) && (
            <div className="vehicles-list-page__active-filters">
              <span className="vehicles-list-page__results-count">
                {filteredVehicles.length} vehicles found
              </span>
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
      
      {/* Vehicle Grid/List */}
      <div className="vehicles-list-page__content">
        <div className="container">
          <div className={`vehicles-list-page__grid ${viewMode === 'list' ? 'vehicles-list-page__grid--list' : ''}`}>
            {filteredVehicles.map((vehicle) => (
              <Link 
                key={vehicle.id}
                to={`/${vehicle.slug}`}
                className="vehicles-list-page__card"
              >
                <div className="vehicles-list-page__card-image">
                  <img 
                    src={vehicle.image} 
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    loading="lazy"
                  />
                  <span className="vehicles-list-page__card-body-style">
                    {vehicle.bodyStyle}
                  </span>
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
          </div>
          
          {filteredVehicles.length === 0 && (
            <div className="vehicles-list-page__empty">
              <h3>No vehicles found</h3>
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

