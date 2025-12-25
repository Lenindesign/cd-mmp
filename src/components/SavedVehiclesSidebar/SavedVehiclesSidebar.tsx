import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Bookmark, Car, Clock, ChevronRight, Search, Plus, Trash2, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { vehicleDatabase } from '../../data/vehicles';
import { clearRecentlyViewed } from '../../services/recentlyViewedService';
import { OptimizedImage } from '../OptimizedImage';
import { DealerMapModal } from '../DealerLocatorMap';
import type { VehicleInfo } from '../DealerLocatorMap';
import './SavedVehiclesSidebar.css';

interface SavedVehiclesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RecentlyViewedVehicle {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  mileage?: number;
  viewedAt: Date;
}

const SavedVehiclesSidebar: React.FC<SavedVehiclesSidebarProps> = ({ isOpen, onClose }) => {
  const { user, addSavedVehicle, removeSavedVehicle } = useAuth();
  const [activeTab, setActiveTab] = useState<'recently-viewed' | 'want' | 'own'>('recently-viewed');
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedVehicle[]>([]);
  
  // Add vehicle search state
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showAddVehicleWant, setShowAddVehicleWant] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryWant, setSearchQueryWant] = useState('');
  const [searchResults, setSearchResults] = useState<typeof vehicleDatabase>([]);
  const [searchResultsWant, setSearchResultsWant] = useState<typeof vehicleDatabase>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchInputWantRef = useRef<HTMLInputElement>(null);
  
  // Dealer map modal state
  const [isDealerMapOpen, setIsDealerMapOpen] = useState(false);
  const [dealerMapVehicle, setDealerMapVehicle] = useState<VehicleInfo | null>(null);

  // Load recently viewed from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewedVehicles');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentlyViewed(parsed.slice(0, 10)); // Show max 10 recent
      } catch {
        setRecentlyViewed([]);
      }
    }
  }, [isOpen]);

  // Handle clearing recently viewed
  const handleClearRecentlyViewed = () => {
    clearRecentlyViewed();
    setRecentlyViewed([]);
  };

  // Get vehicle details from database
  const getVehicleDetails = (vehicleName: string) => {
    const parts = vehicleName.split(' ');
    
    // Check if first part is a year (4 digits)
    const firstPartIsYear = parts.length >= 1 && /^\d{4}$/.test(parts[0]);
    
    if (firstPartIsYear && parts.length >= 3) {
      // Format: "2025 Chevrolet Trax"
      const year = parseInt(parts[0]);
      const make = parts[1];
      const model = parts.slice(2).join(' ');
      
      // Try exact match first
      let vehicle = vehicleDatabase.find(
        v => Number(v.year) === year && v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()
      );
      
      // If no match, try without year
      if (!vehicle) {
        vehicle = vehicleDatabase.find(
          v => v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()
        );
      }
      
      // If still no match, try just make and model contains
      if (!vehicle) {
        vehicle = vehicleDatabase.find(
          v => v.make.toLowerCase() === make.toLowerCase() && 
               (v.model.toLowerCase().includes(model.toLowerCase()) || model.toLowerCase().includes(v.model.toLowerCase()))
        );
      }
      
      return vehicle;
    } else if (parts.length >= 2) {
      // Format: "Chevrolet Trax" or "Ram 1500" (no year)
      const make = parts[0];
      const model = parts.slice(1).join(' ');
      
      // Try exact match on make and model
      let vehicle = vehicleDatabase.find(
        v => v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()
      );
      
      // If no match, try partial match
      if (!vehicle) {
        vehicle = vehicleDatabase.find(
          v => v.make.toLowerCase() === make.toLowerCase() && 
               (v.model.toLowerCase().includes(model.toLowerCase()) || model.toLowerCase().includes(v.model.toLowerCase()))
        );
      }
      
      // If still no match, try searching the full name anywhere
      if (!vehicle) {
        const searchName = vehicleName.toLowerCase();
        vehicle = vehicleDatabase.find(
          v => `${v.make} ${v.model}`.toLowerCase().includes(searchName) ||
               searchName.includes(`${v.make} ${v.model}`.toLowerCase())
        );
      }
      
      return vehicle;
    }
    
    return null;
  };

  // Get cars I want from user's saved vehicles
  const carsIWant = user?.savedVehicles?.filter(v => v.ownership === 'want') || [];
  const carsIOwn = user?.savedVehicles?.filter(v => v.ownership === 'own') || [];

  // Handle search input change for "Cars I Own"
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length >= 2) {
      const results = vehicleDatabase.filter(v => {
        const searchStr = `${v.year} ${v.make} ${v.model}`.toLowerCase();
        return searchStr.includes(query.toLowerCase());
      }).slice(0, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Handle search input change for "Cars I Want"
  const handleSearchChangeWant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQueryWant(query);
    
    if (query.length >= 2) {
      const results = vehicleDatabase.filter(v => {
        const searchStr = `${v.year} ${v.make} ${v.model}`.toLowerCase();
        return searchStr.includes(query.toLowerCase());
      }).slice(0, 6);
      setSearchResultsWant(results);
    } else {
      setSearchResultsWant([]);
    }
  };

  // Handle adding a vehicle to "Cars I Own"
  const handleAddVehicle = (vehicle: typeof vehicleDatabase[0]) => {
    addSavedVehicle({
      id: `own-${vehicle.id}`,
      name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      ownership: 'own',
      savedAt: new Date().toISOString()
    });
    setSearchQuery('');
    setSearchResults([]);
    setShowAddVehicle(false);
  };

  // Handle adding a vehicle to "Cars I Want"
  const handleAddVehicleWant = (vehicle: typeof vehicleDatabase[0]) => {
    addSavedVehicle({
      id: `want-${vehicle.id}`,
      name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      ownership: 'want',
      savedAt: new Date().toISOString()
    });
    setSearchQueryWant('');
    setSearchResultsWant([]);
    setShowAddVehicleWant(false);
  };

  // Focus search input when showing add vehicle
  useEffect(() => {
    if (showAddVehicle && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showAddVehicle]);

  // Focus search input when showing add vehicle for "Cars I Want"
  useEffect(() => {
    if (showAddVehicleWant && searchInputWantRef.current) {
      searchInputWantRef.current.focus();
    }
  }, [showAddVehicleWant]);

  // Close on escape key
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

  if (!isOpen) return null;

  const tabs = [
    { id: 'recently-viewed' as const, label: 'Recently Viewed', icon: <Clock size={16} />, count: recentlyViewed.length },
    { id: 'want' as const, label: 'Cars I Want', icon: <Bookmark size={16} />, count: carsIWant.length },
    { id: 'own' as const, label: 'Cars I Own', icon: <Car size={16} />, count: carsIOwn.length },
  ];

  return (
    <>
      {/* Overlay */}
      <div className="saved-sidebar__overlay" onClick={onClose} />
      
      {/* Sidebar */}
      <aside className="saved-sidebar" role="dialog" aria-label="Saved vehicles">
        {/* Header */}
        <div className="saved-sidebar__header">
          <div className="saved-sidebar__header-content">
            <Bookmark size={20} fill="currentColor" className="saved-sidebar__header-icon" />
            <h2 className="saved-sidebar__title">My Garage</h2>
          </div>
          <button 
            className="saved-sidebar__close" 
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Welcome message */}
        <div className="saved-sidebar__welcome">
          <span className="saved-sidebar__welcome-text">Welcome!</span>
          <p className="saved-sidebar__welcome-desc">
            Here are the cars you've viewed, followed or own.
          </p>
        </div>

        {/* Tabs */}
        <div className="saved-sidebar__tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`saved-sidebar__tab ${activeTab === tab.id ? 'saved-sidebar__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className="saved-sidebar__tab-count">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="saved-sidebar__content">
          {/* Recently Viewed */}
          {activeTab === 'recently-viewed' && (
            <div className="saved-sidebar__section">
              {recentlyViewed.length > 0 ? (
                <>
                  <div className="saved-sidebar__section-header">
                    <span className="saved-sidebar__section-title">
                      Recently Viewed ({recentlyViewed.length})
                    </span>
                    <div className="saved-sidebar__section-actions">
                      <button 
                        className="saved-sidebar__clear-btn"
                        onClick={handleClearRecentlyViewed}
                        title="Clear recently viewed"
                      >
                        <Trash2 size={14} />
                        Clear
                      </button>
                      <Link to="/vehicles" className="saved-sidebar__section-link" onClick={onClose}>
                        Shop Now <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                  <div className="saved-sidebar__vehicles">
                    {recentlyViewed.map((vehicle, index) => (
                      <Link
                        key={`${vehicle.id}-${index}`}
                        to={`/${vehicle.slug}`}
                        className="saved-sidebar__vehicle"
                        onClick={onClose}
                      >
                        <div className="saved-sidebar__vehicle-image">
                          <OptimizedImage
                            src={vehicle.image}
                            alt={vehicle.name}
                            width={80}
                            height={60}
                          />
                        </div>
                        <div className="saved-sidebar__vehicle-info">
                          <span className="saved-sidebar__vehicle-name">{vehicle.name}</span>
                          <span className="saved-sidebar__vehicle-price">
                            ${vehicle.price.toLocaleString()}
                            {vehicle.mileage && (
                              <span className="saved-sidebar__vehicle-mileage">
                                • {vehicle.mileage.toLocaleString()} mi
                              </span>
                            )}
                          </span>
                        </div>
                        <button 
                          className={`saved-sidebar__vehicle-favorite ${user?.savedVehicles?.some(sv => sv.name === vehicle.name) ? 'saved-sidebar__vehicle-favorite--active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const isSaved = user?.savedVehicles?.some(sv => sv.name === vehicle.name);
                            if (isSaved) {
                              const savedVehicle = user?.savedVehicles?.find(sv => sv.name === vehicle.name);
                              if (savedVehicle) {
                                removeSavedVehicle(savedVehicle.id);
                              }
                            } else {
                              addSavedVehicle({
                                id: `want-${vehicle.id}-${Date.now()}`,
                                name: vehicle.name,
                                ownership: 'want',
                                savedAt: new Date().toISOString()
                              });
                            }
                          }}
                          aria-label={user?.savedVehicles?.some(sv => sv.name === vehicle.name) ? "Remove from saved" : "Save vehicle"}
                        >
                          <Bookmark size={18} fill={user?.savedVehicles?.some(sv => sv.name === vehicle.name) ? 'currentColor' : 'none'} />
                        </button>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="saved-sidebar__empty">
                  <Clock size={48} className="saved-sidebar__empty-icon" />
                  <h3 className="saved-sidebar__empty-title">No recently viewed</h3>
                  <p className="saved-sidebar__empty-desc">
                    Start browsing vehicles and they'll appear here.
                  </p>
                  <Link 
                    to="/vehicles" 
                    className="saved-sidebar__empty-cta"
                    onClick={onClose}
                  >
                    Browse Vehicles
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Cars I Want */}
          {activeTab === 'want' && (
            <div className="saved-sidebar__section">
              {carsIWant.length > 0 ? (
                <>
                  <div className="saved-sidebar__section-header">
                    <span className="saved-sidebar__section-title">
                      Cars I Want ({carsIWant.length})
                    </span>
                  </div>
                  <div className="saved-sidebar__vehicles">
                    {carsIWant.map((vehicle) => {
                      const details = getVehicleDetails(vehicle.name);
                      return (
                        <div key={vehicle.id} className="saved-sidebar__vehicle-wrapper">
                          <Link
                            to={details ? `/${details.slug}` : '/vehicles'}
                            className="saved-sidebar__vehicle"
                            onClick={onClose}
                          >
                            <div className="saved-sidebar__vehicle-image">
                              {details?.image ? (
                                <OptimizedImage
                                  src={details.image}
                                  alt={vehicle.name}
                                  width={80}
                                  height={60}
                                />
                              ) : (
                                <div className="saved-sidebar__vehicle-placeholder">
                                  <Car size={24} />
                                </div>
                              )}
                            </div>
                            <div className="saved-sidebar__vehicle-info">
                              <span className="saved-sidebar__vehicle-name">{vehicle.name}</span>
                              {details && (
                                <span className="saved-sidebar__vehicle-price">
                                  Starting at ${details.priceMin.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <button
                              className="saved-sidebar__vehicle-unsave"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeSavedVehicle(vehicle.id);
                              }}
                              aria-label="Remove from saved"
                              title="Remove from saved"
                            >
                              <Bookmark size={18} fill="currentColor" />
                            </button>
                          </Link>
                          {details && (
                            <button
                              className="saved-sidebar__vehicle-dealers"
                              onClick={() => {
                                setDealerMapVehicle({
                                  year: parseInt(details.year, 10),
                                  make: details.make,
                                  model: details.model,
                                  msrp: details.priceMin,
                                  image: details.image,
                                  priceMin: details.priceMin,
                                  priceMax: details.priceMax,
                                });
                                setIsDealerMapOpen(true);
                              }}
                            >
                              <MapPin size={14} />
                              <span>See cars available near you</span>
                              <ChevronRight size={14} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : !showAddVehicleWant && (
                <div className="saved-sidebar__empty">
                  <Bookmark size={48} className="saved-sidebar__empty-icon" />
                  <h3 className="saved-sidebar__empty-title">No saved vehicles</h3>
                  <p className="saved-sidebar__empty-desc">
                    Use the "Add a Vehicle" button below to search and save vehicles you want.
                  </p>
                  <Link 
                    to="/vehicles" 
                    className="saved-sidebar__empty-cta"
                    onClick={onClose}
                  >
                    Browse All Vehicles <ChevronRight size={16} />
                  </Link>
                </div>
              )}

              {/* Add Vehicle Search for Cars I Want - placed at bottom */}
              {showAddVehicleWant ? (
                <div className="saved-sidebar__add-vehicle">
                  <div className="saved-sidebar__search-wrapper">
                    <Search size={18} className="saved-sidebar__search-icon" />
                    <input
                      ref={searchInputWantRef}
                      type="text"
                      className="saved-sidebar__search-input"
                      placeholder="Search by year, make, or model..."
                      value={searchQueryWant}
                      onChange={handleSearchChangeWant}
                    />
                    <button 
                      className="saved-sidebar__search-close"
                      onClick={() => {
                        setShowAddVehicleWant(false);
                        setSearchQueryWant('');
                        setSearchResultsWant([]);
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  {searchResultsWant.length > 0 && (
                    <div className="saved-sidebar__search-results">
                      {searchResultsWant.map((vehicle) => (
                        <button
                          key={vehicle.id}
                          className="saved-sidebar__search-result"
                          onClick={() => handleAddVehicleWant(vehicle)}
                        >
                          <div className="saved-sidebar__search-result-image">
                            <OptimizedImage
                              src={vehicle.image}
                              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                              width={60}
                              height={45}
                            />
                          </div>
                          <div className="saved-sidebar__search-result-info">
                            <span className="saved-sidebar__search-result-name">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </span>
                            <span className="saved-sidebar__search-result-price">
                              ${vehicle.priceMin.toLocaleString()} - ${vehicle.priceMax.toLocaleString()}
                            </span>
                          </div>
                          <Plus size={18} className="saved-sidebar__search-result-add" />
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {searchQueryWant.length >= 2 && searchResultsWant.length === 0 && (
                    <div className="saved-sidebar__search-no-results">
                      No vehicles found for "{searchQueryWant}"
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  className="saved-sidebar__add-btn"
                  onClick={() => setShowAddVehicleWant(true)}
                >
                  <Plus size={18} />
                  <span>Add a Vehicle</span>
                </button>
              )}
            </div>
          )}

          {/* Cars I Own */}
          {activeTab === 'own' && (
            <div className="saved-sidebar__section">
              {carsIOwn.length > 0 && (
                <>
                  <div className="saved-sidebar__section-header">
                    <span className="saved-sidebar__section-title">
                      Cars I Own ({carsIOwn.length})
                    </span>
                  </div>
                  <div className="saved-sidebar__vehicles">
                    {carsIOwn.map((vehicle) => {
                      const details = getVehicleDetails(vehicle.name);
                      return (
                        <Link
                          key={vehicle.id}
                          to={details ? `/${details.slug}` : '/vehicles'}
                          className="saved-sidebar__vehicle"
                          onClick={onClose}
                        >
                          <div className="saved-sidebar__vehicle-image">
                            {details?.image ? (
                              <OptimizedImage
                                src={details.image}
                                alt={vehicle.name}
                                width={80}
                                height={60}
                              />
                            ) : (
                              <div className="saved-sidebar__vehicle-placeholder">
                                <Car size={24} />
                              </div>
                            )}
                          </div>
                          <div className="saved-sidebar__vehicle-info">
                            <span className="saved-sidebar__vehicle-name">{vehicle.name}</span>
                            {details && (
                              <span className="saved-sidebar__vehicle-price">
                                Starting at ${details.priceMin.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <button
                            className="saved-sidebar__vehicle-unsave"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeSavedVehicle(vehicle.id);
                            }}
                            aria-label="Remove from saved"
                            title="Remove from saved"
                          >
                            <Bookmark size={18} fill="currentColor" />
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}

              {carsIOwn.length === 0 && !showAddVehicle && (
                <div className="saved-sidebar__empty">
                  <Car size={48} className="saved-sidebar__empty-icon" />
                  <h3 className="saved-sidebar__empty-title">No vehicles added</h3>
                  <p className="saved-sidebar__empty-desc">
                    Use the "Add a Vehicle" button below to add cars you own.
                  </p>
                </div>
              )}

              {/* Add Vehicle Search - placed at bottom */}
              {showAddVehicle ? (
                <div className="saved-sidebar__add-vehicle">
                  <div className="saved-sidebar__search-wrapper">
                    <Search size={18} className="saved-sidebar__search-icon" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="saved-sidebar__search-input"
                      placeholder="Search by year, make, or model..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button 
                      className="saved-sidebar__search-close"
                      onClick={() => {
                        setShowAddVehicle(false);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="saved-sidebar__search-results">
                      {searchResults.map((vehicle) => (
                        <button
                          key={vehicle.id}
                          className="saved-sidebar__search-result"
                          onClick={() => handleAddVehicle(vehicle)}
                        >
                          <div className="saved-sidebar__search-result-image">
                            <OptimizedImage
                              src={vehicle.image}
                              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                              width={60}
                              height={45}
                            />
                          </div>
                          <div className="saved-sidebar__search-result-info">
                            <span className="saved-sidebar__search-result-name">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </span>
                            <span className="saved-sidebar__search-result-price">
                              ${vehicle.priceMin.toLocaleString()} - ${vehicle.priceMax.toLocaleString()}
                            </span>
                          </div>
                          <Plus size={18} className="saved-sidebar__search-result-add" />
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {searchQuery.length >= 2 && searchResults.length === 0 && (
                    <div className="saved-sidebar__search-no-results">
                      No vehicles found for "{searchQuery}"
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  className="saved-sidebar__add-btn"
                  onClick={() => setShowAddVehicle(true)}
                >
                  <Plus size={18} />
                  <span>Add a Vehicle</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="saved-sidebar__footer">
          <Link 
            to="/account?tab=saved" 
            className="saved-sidebar__footer-btn"
            onClick={onClose}
          >
            View All Saved
          </Link>
        </div>
      </aside>

      {/* Dealer Map Modal */}
      {dealerMapVehicle && (
        <DealerMapModal
          isOpen={isDealerMapOpen}
          onClose={() => {
            setIsDealerMapOpen(false);
            setDealerMapVehicle(null);
          }}
          vehicle={dealerMapVehicle}
        />
      )}
    </>
  );
};

export default SavedVehiclesSidebar;

