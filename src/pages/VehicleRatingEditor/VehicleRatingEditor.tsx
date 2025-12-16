import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Save, Search, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { sedans, suvs, trucks, coupes, convertibles, wagons } from '../../data/vehicles';
import { LIFESTYLES, getVehicleLifestyles, type Lifestyle } from '../../services/lifestyleService';
import { OptimizedImage } from '../../components/OptimizedImage';
import type { Vehicle } from '../../types/vehicle';
import './VehicleRatingEditor.css';

type Category = 'sedans' | 'suvs' | 'trucks' | 'coupes' | 'convertibles' | 'wagons';

interface EditedRating {
  id: string;
  category: Category;
  newRating: number;
  originalRating: number;
}

// Check if we're in production (not localhost)
const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

// API endpoints based on environment
const API_ENDPOINTS = {
  getRatings: isProduction ? '/.netlify/functions/get-ratings' : 'http://localhost:3001/api/ratings/get',
  saveRatings: isProduction ? '/.netlify/functions/save-ratings' : 'http://localhost:3001/api/ratings',
};

type Subcategory = 'all' | 'gas' | 'hybrid' | 'electric';

const VehicleRatingEditor = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('sedans');
  const [activeSubcategory, setActiveSubcategory] = useState<Subcategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedLifestyle, setSelectedLifestyle] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [editedRatings, setEditedRatings] = useState<Map<string, EditedRating>>(new Map());
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [savedRatings, setSavedRatings] = useState<Record<string, number>>({});
  const [openDropdown, setOpenDropdown] = useState<Category | null>(null);

  // Load saved ratings from Supabase on mount (production only)
  useEffect(() => {
    if (isProduction) {
      (async () => {
        try {
          const response = await fetch(API_ENDPOINTS.getRatings);
          if (response.ok) {
            const data = await response.json();
            console.log('[DEBUG] Loaded ratings from Supabase:', {
              count: Object.keys(data.ratings || {}).length,
              keys: Object.keys(data.ratings || {}).slice(0, 10),
            });
            setSavedRatings(data.ratings || {});
          } else {
            console.error('[DEBUG] Failed to load ratings:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error loading saved ratings:', error);
        }
      })();
    }
  }, []);

  // Combine all vehicles with their category (already processed with images)
  const allVehicles = useMemo(() => ({
    sedans,
    suvs,
    trucks,
    coupes,
    convertibles,
    wagons,
  }), []);

  // Get unique makes for filters
  const uniqueMakes = useMemo(() => {
    const categoryVehicles = allVehicles[activeCategory];
    const makes = new Set(categoryVehicles.map(v => v.make));
    return Array.from(makes).sort();
  }, [allVehicles, activeCategory]);

  // Get unique years for filters
  const uniqueYears = useMemo(() => {
    const categoryVehicles = allVehicles[activeCategory];
    const years = new Set(categoryVehicles.map(v => v.year));
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)); // Sort descending (newest first)
  }, [allVehicles, activeCategory]);

  // Get vehicles for active category with all filters applied
  const vehicles = useMemo(() => {
    let categoryVehicles = allVehicles[activeCategory];

    // Apply subcategory filter (fuel type)
    if (activeSubcategory !== 'all') {
      const fuelTypeMap: Record<Subcategory, string> = {
        all: '',
        gas: 'Gas',
        hybrid: 'Hybrid',
        electric: 'Electric',
      };
      categoryVehicles = categoryVehicles.filter(v => v.fuelType === fuelTypeMap[activeSubcategory]);
    }

    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      categoryVehicles = categoryVehicles.filter(vehicle => 
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        `${vehicle.year}`.includes(searchLower)
      );
    }

    // Apply make filter
    if (selectedMake !== 'all') {
      categoryVehicles = categoryVehicles.filter(v => v.make === selectedMake);
    }

    // Apply year filter
    if (selectedYear !== 'all') {
      categoryVehicles = categoryVehicles.filter(v => v.year === selectedYear);
    }

    // Apply lifestyle filter
    if (selectedLifestyle !== 'all') {
      categoryVehicles = categoryVehicles.filter(v => 
        getVehicleLifestyles(v).includes(selectedLifestyle as Lifestyle)
      );
    }

    // Apply price range filter
    if (selectedPriceRange !== 'all') {
      categoryVehicles = categoryVehicles.filter(v => {
        switch (selectedPriceRange) {
          case 'under25k': return v.priceMin < 25000;
          case '25k-50k': return v.priceMin >= 25000 && v.priceMin < 50000;
          case '50k-75k': return v.priceMin >= 50000 && v.priceMin < 75000;
          case '75k-100k': return v.priceMin >= 75000 && v.priceMin < 100000;
          case 'over100k': return v.priceMin >= 100000;
          default: return true;
        }
      });
    }

    return categoryVehicles;
  }, [allVehicles, activeCategory, searchQuery, selectedMake, selectedYear, selectedLifestyle, selectedPriceRange]);

  // Get current rating (edited > saved from Supabase > original from JSON)
  const getCurrentRating = (vehicle: Vehicle): number => {
    const key = `${activeCategory}-${vehicle.id}`;
    const edited = editedRatings.get(key);
    if (edited) return edited.newRating;
    
    // In production, check if there's a saved rating from Supabase
    if (isProduction && savedRatings[key] !== undefined) {
      return savedRatings[key];
    }
    
    return vehicle.staffRating;
  };
  
  // Get the base rating (from Supabase in production, or from JSON locally)
  const getBaseRating = (vehicle: Vehicle): number => {
    const key = `${activeCategory}-${vehicle.id}`;
    if (isProduction && savedRatings[key] !== undefined) {
      return savedRatings[key];
    }
    return vehicle.staffRating;
  };

  // Check if rating has been edited
  const isEdited = (vehicle: Vehicle): boolean => {
    return editedRatings.has(`${activeCategory}-${vehicle.id}`);
  };

  // Handle rating change
  const handleRatingChange = (vehicle: Vehicle, newRating: number) => {
    const key = `${activeCategory}-${vehicle.id}`;
    const rating = Math.max(0, Math.min(10, newRating)); // Clamp between 0-10
    const baseRating = getBaseRating(vehicle);

    if (rating === baseRating) {
      // If changed back to base rating, remove from edited map
      const newMap = new Map(editedRatings);
      newMap.delete(key);
      setEditedRatings(newMap);
    } else {
      setEditedRatings(new Map(editedRatings).set(key, {
        id: vehicle.id,
        category: activeCategory,
        newRating: rating,
        originalRating: baseRating,
      }));
    }
  };

  // Handle save all changes
  const handleSaveAll = async () => {
    setSaveStatus('saving');
    
    try {
      const changes = Array.from(editedRatings.values());
      
      console.log(`[DEBUG] Saving ${changes.length} changes to ${isProduction ? 'Supabase' : 'local API'}...`);
      
      // Call the appropriate API endpoint based on environment
      const response = await fetch(API_ENDPOINTS.saveRatings, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save ratings');
      }

      const result = await response.json();
      console.log('Ratings saved successfully:', result);
      
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('idle');
        setEditedRatings(new Map()); // Clear edited ratings after successful save
        // Refresh the page to load updated data
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error saving ratings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  // Handle discard changes
  const handleDiscardChanges = () => {
    setEditedRatings(new Map());
    setSaveStatus('idle');
  };

  // Get subcategory counts for a category
  const getSubcategoryCounts = (category: Category) => {
    const categoryVehicles = allVehicles[category];
    return {
      all: categoryVehicles.length,
      gas: categoryVehicles.filter(v => v.fuelType === 'Gas').length,
      hybrid: categoryVehicles.filter(v => v.fuelType === 'Hybrid').length,
      electric: categoryVehicles.filter(v => v.fuelType === 'Electric').length,
    };
  };

  const categories: { key: Category; label: string; count: number }[] = [
    { key: 'sedans', label: 'Sedans', count: allVehicles.sedans.length },
    { key: 'suvs', label: 'SUVs', count: allVehicles.suvs.length },
    { key: 'trucks', label: 'Trucks', count: allVehicles.trucks.length },
    { key: 'coupes', label: 'Coupes', count: allVehicles.coupes.length },
    { key: 'convertibles', label: 'Convertibles', count: allVehicles.convertibles.length },
    { key: 'wagons', label: 'Wagons', count: allVehicles.wagons.length },
  ];

  // Handle category/subcategory selection
  const handleCategorySelect = (category: Category, subcategory: Subcategory) => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setOpenDropdown(null);
    // Reset other filters when changing category
    setSelectedMake('all');
    setSelectedYear('all');
  };

  // Toggle dropdown
  const toggleDropdown = (category: Category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.editor__category-dropdown')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="vehicle-rating-editor">
      <div className="container">
        {/* Header */}
        <div className="editor__header">
          <div className="editor__header-content">
            <h1 className="editor__title">Vehicle Rating Editor</h1>
            <p className="editor__subtitle">
              Update staff ratings for all vehicles. Changes are highlighted and can be saved in bulk.
            </p>
            {isProduction && (
              <div className="editor__production-warning">
                <AlertCircle size={18} />
                <span>
                  <strong>Production Mode:</strong> Changes are saved to Supabase database and will persist across deployments.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Save Status */}
        {saveStatus !== 'idle' && (
          <div className={`editor__status editor__status--${saveStatus}`}>
            {saveStatus === 'saving' && (
              <>
                <AlertCircle size={20} />
                <span>Saving changes...</span>
              </>
            )}
            {saveStatus === 'success' && (
              <>
                <CheckCircle size={20} />
                <span>Changes saved successfully!</span>
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <AlertCircle size={20} />
                <span>Error saving changes. Please try again.</span>
              </>
            )}
          </div>
        )}

        {/* Search and Filters */}
        <div className="editor__filters-container">
          {/* Search Bar */}
          <div className="editor__search">
            <Search size={18} className="editor__search-icon" />
            <input
              type="text"
              className="editor__search-input"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters Row */}
          <div className="editor__filters">
            {/* Make Filter */}
            <div className="editor__filter">
              <select
                className="editor__filter-select"
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                aria-label="Filter by make"
              >
                <option value="all">All Makes</option>
                {uniqueMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
              <ChevronDown size={16} className="editor__filter-icon" />
            </div>

            {/* Year Filter */}
            <div className="editor__filter">
              <select
                className="editor__filter-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filter by year"
              >
                <option value="all">All Years</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <ChevronDown size={16} className="editor__filter-icon" />
            </div>

            {/* Lifestyle Filter */}
            <div className="editor__filter">
              <select
                className="editor__filter-select"
                value={selectedLifestyle}
                onChange={(e) => setSelectedLifestyle(e.target.value)}
                aria-label="Filter by lifestyle"
              >
                <option value="all">All Lifestyles</option>
                {LIFESTYLES.map(lifestyle => (
                  <option key={lifestyle} value={lifestyle}>
                    {lifestyle}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="editor__filter-icon" />
            </div>

            {/* Price Range Filter */}
            <div className="editor__filter">
              <select
                className="editor__filter-select"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                aria-label="Filter by price range"
              >
                <option value="all">Price: Low to High</option>
                <option value="under25k">Under $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-75k">$50,000 - $75,000</option>
                <option value="75k-100k">$75,000 - $100,000</option>
                <option value="over100k">Over $100,000</option>
              </select>
              <ChevronDown size={16} className="editor__filter-icon" />
            </div>
          </div>
        </div>

        {/* Category Dropdowns */}
        <div className="editor__category-nav">
          {categories.map((category) => {
            const subcounts = getSubcategoryCounts(category.key);
            const isActive = activeCategory === category.key;
            const isOpen = openDropdown === category.key;
            
            // Get current display label
            const getDisplayLabel = () => {
              if (!isActive) return category.label;
              if (activeSubcategory === 'all') return `All ${category.label}`;
              return `${activeSubcategory.charAt(0).toUpperCase() + activeSubcategory.slice(1)} ${category.label}`;
            };
            
            return (
              <div 
                key={category.key} 
                className={`editor__category-dropdown ${isActive ? 'editor__category-dropdown--active' : ''}`}
              >
                <button
                  className="editor__category-trigger"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(category.key);
                  }}
                >
                  <span className="editor__category-label">{getDisplayLabel()}</span>
                  <span className="editor__category-count">{isActive && activeSubcategory !== 'all' 
                    ? subcounts[activeSubcategory] 
                    : category.count}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`editor__category-chevron ${isOpen ? 'editor__category-chevron--open' : ''}`} 
                  />
                </button>
                
                {isOpen && (
                  <div className="editor__category-menu">
                    <button
                      className={`editor__category-item ${isActive && activeSubcategory === 'all' ? 'editor__category-item--active' : ''}`}
                      onClick={() => handleCategorySelect(category.key, 'all')}
                    >
                      <span>All {category.label}</span>
                      <span className="editor__category-item-count">{subcounts.all}</span>
                    </button>
                    {subcounts.gas > 0 && (
                      <button
                        className={`editor__category-item ${isActive && activeSubcategory === 'gas' ? 'editor__category-item--active' : ''}`}
                        onClick={() => handleCategorySelect(category.key, 'gas')}
                      >
                        <span>Gas {category.label}</span>
                        <span className="editor__category-item-count">{subcounts.gas}</span>
                      </button>
                    )}
                    {subcounts.hybrid > 0 && (
                      <button
                        className={`editor__category-item ${isActive && activeSubcategory === 'hybrid' ? 'editor__category-item--active' : ''}`}
                        onClick={() => handleCategorySelect(category.key, 'hybrid')}
                      >
                        <span>Hybrid {category.label}</span>
                        <span className="editor__category-item-count">{subcounts.hybrid}</span>
                      </button>
                    )}
                    {subcounts.electric > 0 && (
                      <button
                        className={`editor__category-item ${isActive && activeSubcategory === 'electric' ? 'editor__category-item--active' : ''}`}
                        onClick={() => handleCategorySelect(category.key, 'electric')}
                      >
                        <span>Electric {category.label}</span>
                        <span className="editor__category-item-count">{subcounts.electric}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vehicle Table */}
        <div className="editor__table-wrapper">
          <table className="editor__table">
            <thead>
              <tr>
                <th className="editor__th-thumbnail">Vehicle</th>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>Price Range</th>
                <th>Current Rating</th>
                <th>New Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan={8} className="editor__empty">
                    No vehicles found matching your filters
                  </td>
                </tr>
              ) : (
                vehicles.map((vehicle) => {
                  const vehicleUrl = `/${vehicle.year}/${vehicle.make}/${vehicle.model}`;
                  return (
                    <tr
                      key={vehicle.id}
                      className={isEdited(vehicle) ? 'editor__row--edited' : ''}
                    >
                      <td className="editor__thumbnail-cell">
                        <Link to={vehicleUrl} className="editor__thumbnail-link">
                          <div className="editor__thumbnail">
                            <OptimizedImage
                              src={vehicle.image || ''}
                              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                              aspectRatio="4/3"
                              fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f5f5f7' width='400' height='300'/%3E%3Cpath fill='%2386868b' d='M160 140h80l10-30h-100zM130 140v30h140v-30h-20v15h-100v-15z'/%3E%3Ccircle fill='%23a0a0a0' cx='155' cy='170' r='15'/%3E%3Ccircle fill='%23a0a0a0' cx='245' cy='170' r='15'/%3E%3Ctext x='200' y='230' text-anchor='middle' fill='%2386868b' font-family='system-ui' font-size='14' font-weight='500'%3ENo Image%3C/text%3E%3C/svg%3E"
                            />
                          </div>
                        </Link>
                      </td>
                      <td className="editor__year">{vehicle.year}</td>
                      <td className="editor__make">
                        <Link to={vehicleUrl} className="editor__vehicle-link">{vehicle.make}</Link>
                      </td>
                      <td className="editor__model">
                        <Link to={vehicleUrl} className="editor__vehicle-link">{vehicle.model}</Link>
                      </td>
                      <td className="editor__price">{vehicle.priceRange}</td>
                      <td>
                        <span className="editor__rating editor__rating--original">
                          {vehicle.staffRating.toFixed(1)}
                        </span>
                      </td>
                      <td>
                        <input
                          type="number"
                          className={`editor__rating-input ${isEdited(vehicle) ? 'editor__rating-input--edited' : ''}`}
                          value={getCurrentRating(vehicle).toFixed(1)}
                          onChange={(e) => handleRatingChange(vehicle, parseFloat(e.target.value) || 0)}
                          min="0"
                          max="10"
                          step="0.1"
                        />
                      </td>
                      <td>
                        {isEdited(vehicle) && (
                          <span className="editor__status-badge editor__status-badge--edited">
                            Modified
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Instructions */}
        <div className="editor__instructions">
          <h3 className="editor__instructions-title">How to Use This Editor</h3>
          <ol className="editor__instructions-list">
            <li>Select a category tab to view vehicles in that category</li>
            <li>Use the search bar to filter vehicles by make, model, or year</li>
            <li>Click on the "New Rating" input to edit a vehicle's staff rating (0-10)</li>
            <li>Modified vehicles will be highlighted in yellow</li>
            <li>Click "Save Changes" to apply all modifications</li>
            <li>Click "Discard Changes" to reset all modifications</li>
          </ol>
          <p className="editor__instructions-note">
            <strong>Note:</strong> Changes made here will update the vehicle database files. 
            Make sure to review all changes before saving.
          </p>
        </div>
      </div>

      {/* Sticky Save Actions - Bottom Right */}
      {editedRatings.size > 0 && (
        <div className="editor__sticky-actions">
          <button
            className="cta cta--ghost cta--default"
            onClick={handleDiscardChanges}
            disabled={saveStatus === 'saving'}
          >
            Discard Changes
          </button>
          <button
            className="cta cta--primary cta--default"
            onClick={handleSaveAll}
            disabled={saveStatus === 'saving'}
          >
            <Save size={16} />
            Save {editedRatings.size} Change{editedRatings.size !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleRatingEditor;

