import { useState, useMemo } from 'react';
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

const VehicleRatingEditor = () => {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehicleRatingEditor.tsx:42',message:'Component mounted',data:{timestamp:new Date().toISOString()},timestamp:Date.now(),sessionId:'debug-session',runId:'initial',hypothesisId:'H1,H2'})}).catch(()=>{});
  // #endregion
  const [activeCategory, setActiveCategory] = useState<Category>('sedans');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedLifestyle, setSelectedLifestyle] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [editedRatings, setEditedRatings] = useState<Map<string, EditedRating>>(new Map());
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Combine all vehicles with their category (already processed with images)
  const allVehicles = useMemo(() => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehicleRatingEditor.tsx:55',message:'Loading processed vehicles',data:{sedansCount:sedans.length,suvsCount:suvs.length,trucksCount:trucks.length,coupesCount:coupes.length,convertiblesCount:convertibles.length,wagonsCount:wagons.length,firstSedanHasImage:!!sedans[0]?.image,firstSedanImage:sedans[0]?.image?.substring(0,50)},timestamp:Date.now(),sessionId:'debug-session',runId:'image-fix',hypothesisId:'H6-SOLUTION'})}).catch(()=>{});
    // #endregion
    return {
      sedans,
      suvs,
      trucks,
      coupes,
      convertibles,
      wagons,
    };
  }, []);

  // Get unique makes for filters
  const uniqueMakes = useMemo(() => {
    const categoryVehicles = allVehicles[activeCategory];
    const makes = new Set(categoryVehicles.map(v => v.make));
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehicleRatingEditor.tsx:75',message:'Unique makes calculated',data:{activeCategory,makesCount:makes.size,makes:Array.from(makes)},timestamp:Date.now(),sessionId:'debug-session',runId:'remove-body-style',hypothesisId:'H12'})}).catch(()=>{});
    // #endregion
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
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehicleRatingEditor.tsx:85',message:'Filtering vehicles',data:{activeCategory,searchQuery,selectedMake,selectedLifestyle,selectedPriceRange},timestamp:Date.now(),sessionId:'debug-session',runId:'remove-body-style',hypothesisId:'H12'})}).catch(()=>{});
    // #endregion
    let categoryVehicles = allVehicles[activeCategory];

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

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehicleRatingEditor.tsx:128',message:'Filtered vehicles result',data:{count:categoryVehicles.length},timestamp:Date.now(),sessionId:'debug-session',runId:'remove-body-style',hypothesisId:'H12'})}).catch(()=>{});
    // #endregion

    return categoryVehicles;
  }, [allVehicles, activeCategory, searchQuery, selectedMake, selectedYear, selectedLifestyle, selectedPriceRange]);

  // Get current rating (edited or original)
  const getCurrentRating = (vehicle: Vehicle): number => {
    const edited = editedRatings.get(`${activeCategory}-${vehicle.id}`);
    return edited ? edited.newRating : vehicle.staffRating;
  };

  // Check if rating has been edited
  const isEdited = (vehicle: Vehicle): boolean => {
    return editedRatings.has(`${activeCategory}-${vehicle.id}`);
  };

  // Handle rating change
  const handleRatingChange = (vehicle: Vehicle, newRating: number) => {
    const key = `${activeCategory}-${vehicle.id}`;
    const rating = Math.max(0, Math.min(10, newRating)); // Clamp between 0-10

    if (rating === vehicle.staffRating) {
      // If changed back to original, remove from edited map
      const newMap = new Map(editedRatings);
      newMap.delete(key);
      setEditedRatings(newMap);
    } else {
      setEditedRatings(new Map(editedRatings).set(key, {
        id: vehicle.id,
        category: activeCategory,
        newRating: rating,
        originalRating: vehicle.staffRating,
      }));
    }
  };

  // Handle save all changes
  const handleSaveAll = async () => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehicleRatingEditor.tsx:148',message:'Save button clicked - REAL SAVE',data:{editedRatingsCount:editedRatings.size,editedRatingsEntries:Array.from(editedRatings.values())},timestamp:Date.now(),sessionId:'debug-session',runId:'save-fix-v2',hypothesisId:'H1,H4'})}).catch(()=>{});
    // #endregion
    setSaveStatus('saving');
    
    try {
      const changes = Array.from(editedRatings.values());
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehicleRatingEditor.tsx:156',message:'Calling real API endpoint',data:{apiUrl:'http://localhost:3001/api/ratings',changesCount:changes.length,changes:changes},timestamp:Date.now(),sessionId:'debug-session',runId:'save-fix-v2',hypothesisId:'H4,H5'})}).catch(()=>{});
      // #endregion
      
      // Call the real API to save changes to JSON files
      const response = await fetch('http://localhost:3001/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save ratings');
      }

      const result = await response.json();
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehicleRatingEditor.tsx:175',message:'Save completed successfully',data:{result:result,changesCleared:true,actuallyPersisted:true},timestamp:Date.now(),sessionId:'debug-session',runId:'save-fix-v2',hypothesisId:'H1,H4,H5'})}).catch(()=>{});
      // #endregion
      
      console.log('Ratings saved successfully:', result);
      
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('idle');
        setEditedRatings(new Map()); // Clear edited ratings after successful save
        // Refresh the page to load updated data
        window.location.reload();
      }, 2000);
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehicleRatingEditor.tsx:191',message:'Save failed',data:{error:String(error),errorMessage:error instanceof Error ? error.message : 'Unknown error'},timestamp:Date.now(),sessionId:'debug-session',runId:'save-fix-v2',hypothesisId:'H3'})}).catch(()=>{});
      // #endregion
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

  const categories: { key: Category; label: string; count: number }[] = [
    { key: 'sedans', label: 'Sedans', count: allVehicles.sedans.length },
    { key: 'suvs', label: 'SUVs', count: allVehicles.suvs.length },
    { key: 'trucks', label: 'Trucks', count: allVehicles.trucks.length },
    { key: 'coupes', label: 'Coupes', count: allVehicles.coupes.length },
    { key: 'convertibles', label: 'Convertibles', count: allVehicles.convertibles.length },
    { key: 'wagons', label: 'Wagons', count: allVehicles.wagons.length },
  ];

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
          </div>

          {/* Save Actions */}
          {editedRatings.size > 0 && (
            <div className="editor__actions">
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

        {/* Category Tabs */}
        <div className="editor__tabs">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`editor__tab ${activeCategory === category.key ? 'editor__tab--active' : ''}`}
              onClick={() => setActiveCategory(category.key)}
            >
              {category.label}
              <span className="editor__tab-count">{category.count}</span>
            </button>
          ))}
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
                  // #region agent log
                  fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehicleRatingEditor.tsx:290',message:'Rendering vehicle row',data:{vehicleId:vehicle.id,hasImage:!!vehicle.image,make:vehicle.make,model:vehicle.model},timestamp:Date.now(),sessionId:'debug-session',runId:'initial',hypothesisId:'H2'})}).catch(()=>{});
                  // #endregion
                  // #region agent log
                  const imageUrl = vehicle.image || '';
                  const hasValidImage = !!vehicle.image;
                  fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehicleRatingEditor.tsx:295',message:'Image URL check',data:{vehicleId:vehicle.id,imageUrl,hasValidImage,imageIsNull:vehicle.image===null,imageIsEmpty:vehicle.image===''},timestamp:Date.now(),sessionId:'debug-session',runId:'image-fix',hypothesisId:'H6,H8'})}).catch(()=>{});
                  // #endregion
                  return (
                    <tr
                      key={vehicle.id}
                      className={isEdited(vehicle) ? 'editor__row--edited' : ''}
                    >
                      <td className="editor__thumbnail-cell">
                        <div className="editor__thumbnail">
                          <OptimizedImage
                            src={imageUrl}
                            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                            aspectRatio="4/3"
                            fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f5f5f7' width='400' height='300'/%3E%3Cpath fill='%2386868b' d='M160 140h80l10-30h-100zM130 140v30h140v-30h-20v15h-100v-15z'/%3E%3Ccircle fill='%23a0a0a0' cx='155' cy='170' r='15'/%3E%3Ccircle fill='%23a0a0a0' cx='245' cy='170' r='15'/%3E%3Ctext x='200' y='230' text-anchor='middle' fill='%2386868b' font-family='system-ui' font-size='14' font-weight='500'%3ENo Image%3C/text%3E%3C/svg%3E"
                          />
                        </div>
                      </td>
                      <td className="editor__year">{vehicle.year}</td>
                      <td className="editor__make">{vehicle.make}</td>
                      <td className="editor__model">{vehicle.model}</td>
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
    </div>
  );
};

export default VehicleRatingEditor;

