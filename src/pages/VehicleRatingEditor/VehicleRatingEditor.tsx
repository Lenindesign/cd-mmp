import { useState, useMemo } from 'react';
import { Save, Search, AlertCircle, CheckCircle } from 'lucide-react';
import sedansData from '../../data/vehicles/sedans.json';
import suvsData from '../../data/vehicles/suvs.json';
import trucksData from '../../data/vehicles/trucks.json';
import coupesData from '../../data/vehicles/coupes.json';
import convertiblesData from '../../data/vehicles/convertibles.json';
import wagonsData from '../../data/vehicles/wagons.json';
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
  const [activeCategory, setActiveCategory] = useState<Category>('sedans');
  const [searchQuery, setSearchQuery] = useState('');
  const [editedRatings, setEditedRatings] = useState<Map<string, EditedRating>>(new Map());
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Combine all vehicles with their category
  const allVehicles = useMemo(() => {
    return {
      sedans: sedansData as Vehicle[],
      suvs: suvsData as Vehicle[],
      trucks: trucksData as Vehicle[],
      coupes: coupesData as Vehicle[],
      convertibles: convertiblesData as Vehicle[],
      wagons: wagonsData as Vehicle[],
    };
  }, []);

  // Get vehicles for active category
  const vehicles = useMemo(() => {
    const categoryVehicles = allVehicles[activeCategory];
    
    if (!searchQuery) return categoryVehicles;

    return categoryVehicles.filter(vehicle => {
      const searchLower = searchQuery.toLowerCase();
      return (
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        `${vehicle.year}`.includes(searchLower)
      );
    });
  }, [allVehicles, activeCategory, searchQuery]);

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
    setSaveStatus('saving');
    
    try {
      // In a real app, this would make API calls to save the changes
      // For now, we'll simulate a save and show instructions
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Changes to save:', Array.from(editedRatings.values()));
      
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('idle');
        setEditedRatings(new Map()); // Clear edited ratings after successful save
      }, 3000);
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

        {/* Search Bar */}
        <div className="editor__search">
          <Search size={20} className="editor__search-icon" />
          <input
            type="text"
            className="editor__search-input"
            placeholder="Search by make, model, or year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
                  <td colSpan={7} className="editor__empty">
                    No vehicles found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                vehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className={isEdited(vehicle) ? 'editor__row--edited' : ''}
                  >
                    <td>{vehicle.year}</td>
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
                ))
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

