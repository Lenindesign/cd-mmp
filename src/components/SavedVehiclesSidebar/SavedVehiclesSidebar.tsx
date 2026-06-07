import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Bookmark, Car, Clock, ChevronRight, Search, Plus, Trash2, MapPin, Star, GitCompare, Check, Wallet } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { vehicleDatabase } from '../../data/vehicles';
import { getVehiclesInBudget, type Vehicle } from '../../services/vehicleService';
import { clearRecentlyViewed } from '../../services/recentlyViewedService';
import { calculateBudgetSummary, formatBudgetCurrency, getBudgetPreferences } from '../../utils/budgetPreferences';
import { OptimizedImage } from '../OptimizedImage';
import { Button } from '../Button';
import { DealerMapModal } from '../DealerLocatorMap';
import type { VehicleInfo } from '../DealerLocatorMap';
import VehicleComparisonModal from './VehicleComparisonModal';
import Tabs from '../Tabs/Tabs';
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
  const { user, addSavedVehicle, removeSavedVehicle, removePaymentEstimate } = useAuth();
  const [activeTab, setActiveTab] = useState<'recently-viewed' | 'want' | 'budget'>('recently-viewed');
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedVehicle[]>([]);
  
  // Add vehicle search state
  const [showAddVehicleWant, setShowAddVehicleWant] = useState(false);
  const [searchQueryWant, setSearchQueryWant] = useState('');
  const [searchResultsWant, setSearchResultsWant] = useState<typeof vehicleDatabase>([]);
  const searchInputWantRef = useRef<HTMLInputElement>(null);
  
  // Dealer map modal state
  const [isDealerMapOpen, setIsDealerMapOpen] = useState(false);
  const [dealerMapVehicle, setDealerMapVehicle] = useState<VehicleInfo | null>(null);
  
  // Compare feature state
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

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
  const budgetPreferences = useMemo(() => getBudgetPreferences(user?.budgetPreferences), [user?.budgetPreferences]);
  const budgetSummary = useMemo(() => calculateBudgetSummary(budgetPreferences), [budgetPreferences]);
  const budgetMatches = useMemo(
    () => getVehiclesInBudget(budgetSummary.buyingPower, budgetPreferences.bodyStyle),
    [budgetSummary.buyingPower, budgetPreferences.bodyStyle]
  );
  const savedPaymentEstimates = useMemo(
    () => [...(user?.savedEstimates || [])].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)),
    [user?.savedEstimates]
  );
  const recentPaymentEstimates = savedPaymentEstimates.slice(0, 3);
  const budgetPreviewVehicles = budgetMatches.slice(0, 3);
  const budgetMatchUrl = `/vehicles?maxPrice=${budgetSummary.buyingPower}&bodyStyle=${encodeURIComponent(budgetPreferences.bodyStyle)}`;
  const getBudgetVehicleName = (vehicle: Vehicle) => `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const getEstimateHref = (estimateId: string) => (
    `/auto-loan-calculator/light-steps/review?savedEstimate=${encodeURIComponent(estimateId)}`
  );
  const formatEstimateDate = (createdAt: string) => {
    const date = new Date(createdAt);
    if (Number.isNaN(date.getTime())) return 'Saved estimate';

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  const getSavedBudgetVehicle = (vehicle: Vehicle) => {
    const vehicleName = getBudgetVehicleName(vehicle);
    return user?.savedVehicles?.find((savedVehicle) => (
      savedVehicle.name === vehicleName ||
      savedVehicle.id === vehicle.id ||
      savedVehicle.id === vehicle.slug ||
      savedVehicle.id === `want-${vehicle.id}`
    ));
  };
  const handleToggleBudgetVehicleSave = (vehicle: Vehicle) => {
    const savedVehicle = getSavedBudgetVehicle(vehicle);

    if (savedVehicle) {
      removeSavedVehicle(savedVehicle.id);
      return;
    }

    addSavedVehicle({
      id: `want-${vehicle.id}`,
      name: getBudgetVehicleName(vehicle),
      ownership: 'want',
      savedAt: new Date().toISOString(),
    });
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

  // Focus search input when showing add vehicle for "Cars I Want"
  useEffect(() => {
    if (showAddVehicleWant && searchInputWantRef.current) {
      searchInputWantRef.current.focus();
    }
  }, [showAddVehicleWant]);

  // Toggle compare selection for a vehicle
  const toggleCompareSelection = (vehicleId: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(vehicleId)) {
        return prev.filter(id => id !== vehicleId);
      }
      // Max 3 vehicles for comparison
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, vehicleId];
    });
  };

  // Handle compare action - open modal
  const handleCompare = () => {
    if (selectedForCompare.length >= 2) {
      setIsCompareModalOpen(true);
    }
  };

  // Get vehicles selected for comparison
  const getVehiclesForComparison = () => {
    // Check if we're comparing from recently viewed or cars I want
    if (activeTab === 'recently-viewed') {
      return selectedForCompare
        .map(id => recentlyViewed.find(v => v.id === id))
        .filter((v): v is RecentlyViewedVehicle => v !== undefined);
    } else if (activeTab === 'want') {
      // For cars I want, we need to construct the vehicle data from the saved vehicles
      return selectedForCompare
        .map(id => {
          const savedVehicle = carsIWant.find(v => v.id === id);
          if (!savedVehicle) return undefined;
          const details = getVehicleDetails(savedVehicle.name);
          if (!details) return undefined;
          return {
            id: savedVehicle.id,
            name: savedVehicle.name,
            slug: details.slug,
            image: details.image,
            price: details.priceMin,
            viewedAt: savedVehicle.savedAt ? new Date(savedVehicle.savedAt) : new Date()
          } as RecentlyViewedVehicle;
        })
        .filter((v): v is RecentlyViewedVehicle => v !== undefined);
    }
    return [];
  };

  // Reset compare mode when switching tabs
  useEffect(() => {
    setCompareMode(false);
    setSelectedForCompare([]);
  }, [activeTab]);

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
    { id: 'recently-viewed' as const, label: 'Viewed', icon: <Clock size={16} />, count: recentlyViewed.length },
    { id: 'want' as const, label: 'Cars I Want', icon: <Bookmark size={16} />, count: carsIWant.length },
    { id: 'budget' as const, label: 'My Budget', icon: <Wallet size={16} />, count: budgetMatches.length },
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
          <Button 
            variant="ghost"
            size="small"
            className="saved-sidebar__close" 
            onClick={onClose}
            aria-label="Close sidebar"
            iconLeft={<X size={24} />}
          />
        </div>

        {/* Welcome message */}
        <div className="saved-sidebar__welcome">
          <span className="saved-sidebar__welcome-text">Welcome!</span>
          <p className="saved-sidebar__welcome-desc">
            Here are the cars you've viewed, followed or own.
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          items={tabs.map(tab => ({
            value: tab.id,
            label: tab.label,
            icon: tab.icon,
            count: tab.count > 0 ? tab.count : undefined,
          }))}
          value={activeTab}
          onChange={setActiveTab}
          variant="underline"
          ariaLabel="Saved vehicles"
        />

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
                      <Button 
                        variant="ghost"
                        size="small"
                        className="saved-sidebar__clear-btn"
                        onClick={handleClearRecentlyViewed}
                        iconLeft={<Trash2 size={14} />}
                      >
                        Clear
                      </Button>
                      {recentlyViewed.length >= 2 && (
                        compareMode ? (
                          selectedForCompare.length >= 2 ? (
                            <Button
                              variant="primary"
                              size="small"
                              className="saved-sidebar__compare-action"
                              onClick={handleCompare}
                              iconLeft={<GitCompare size={14} />}
                            >
                              COMPARE ({selectedForCompare.length})
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost"
                              size="small"
                              className="saved-sidebar__section-link"
                              onClick={() => {
                                setCompareMode(false);
                                setSelectedForCompare([]);
                              }}
                            >
                              Cancel
                            </Button>
                          )
                        ) : (
                          <Button 
                            variant="ghost"
                            size="small"
                            className="saved-sidebar__section-link" 
                            onClick={() => setCompareMode(true)}
                            iconLeft={<GitCompare size={14} />}
                          >
                            COMPARE
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                  {compareMode && (
                    <p className="saved-sidebar__compare-hint">
                      Select 2-3 vehicles to compare
                    </p>
                  )}

                  <div className="saved-sidebar__vehicles">
                    {recentlyViewed.map((vehicle, index) => {
                      const vehicleDetails = getVehicleDetails(vehicle.name);
                      const isSelectedForCompare = selectedForCompare.includes(vehicle.id);
                      
                      return (
                        <div 
                          key={`${vehicle.id}-${index}`}
                          className={`saved-sidebar__vehicle-container ${isSelectedForCompare ? 'saved-sidebar__vehicle-container--selected' : ''}`}
                        >
                          {compareMode && (
                            <button
                              className={`saved-sidebar__compare-checkbox ${isSelectedForCompare ? 'saved-sidebar__compare-checkbox--checked' : ''}`}
                              onClick={() => toggleCompareSelection(vehicle.id)}
                              aria-label={isSelectedForCompare ? "Remove from compare" : "Add to compare"}
                            >
                              {isSelectedForCompare && <Check size={14} />}
                            </button>
                          )}
                          <Link
                            to={`/${vehicle.slug}`}
                            className="saved-sidebar__vehicle"
                            onClick={(e) => {
                              if (compareMode) {
                                e.preventDefault();
                                toggleCompareSelection(vehicle.id);
                              } else {
                                onClose();
                              }
                            }}
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
                              <div className="saved-sidebar__vehicle-meta">
                                <span className="saved-sidebar__vehicle-price">
                                  ${vehicle.price.toLocaleString()}
                                </span>
                                {vehicleDetails?.staffRating && (
                                  <span className="saved-sidebar__vehicle-rating">
                                    <Star size={12} fill="currentColor" />
                                    <span>{vehicleDetails.staffRating.toFixed(1)}</span>
                                    <span className="saved-sidebar__vehicle-rating-label">C/D</span>
                                  </span>
                                )}
                              </div>
                              {vehicle.mileage && (
                                <span className="saved-sidebar__vehicle-mileage">
                                  {vehicle.mileage.toLocaleString()} mi
                                </span>
                              )}
                            </div>
                            {!compareMode && (
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
                            )}
                          </Link>
                        </div>
                      );
                    })}
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
                    <div className="saved-sidebar__section-actions">
                      {carsIWant.length >= 2 && (
                        compareMode ? (
                          selectedForCompare.length >= 2 ? (
                            <Button
                              variant="primary"
                              size="small"
                              className="saved-sidebar__compare-action"
                              onClick={handleCompare}
                              iconLeft={<GitCompare size={14} />}
                            >
                              COMPARE ({selectedForCompare.length})
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost"
                              size="small"
                              className="saved-sidebar__section-link"
                              onClick={() => {
                                setCompareMode(false);
                                setSelectedForCompare([]);
                              }}
                            >
                              Cancel
                            </Button>
                          )
                        ) : (
                          <Button 
                            variant="ghost"
                            size="small"
                            className="saved-sidebar__section-link" 
                            onClick={() => setCompareMode(true)}
                            iconLeft={<GitCompare size={14} />}
                          >
                            COMPARE
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                  {compareMode && (
                    <p className="saved-sidebar__compare-hint">
                      Select 2-3 vehicles to compare
                    </p>
                  )}
                  <div className="saved-sidebar__vehicles">
                    {carsIWant.map((vehicle) => {
                      const details = getVehicleDetails(vehicle.name);
                      const isSelectedForCompare = selectedForCompare.includes(vehicle.id);
                      return (
                        <div 
                          key={vehicle.id} 
                          className={`saved-sidebar__vehicle-wrapper ${compareMode ? 'saved-sidebar__vehicle-wrapper--with-checkbox' : ''} ${isSelectedForCompare ? 'saved-sidebar__vehicle-wrapper--selected' : ''}`}
                        >
                          {compareMode && (
                            <button
                              className={`saved-sidebar__compare-checkbox ${isSelectedForCompare ? 'saved-sidebar__compare-checkbox--checked' : ''}`}
                              onClick={() => toggleCompareSelection(vehicle.id)}
                              aria-label={isSelectedForCompare ? "Remove from compare" : "Add to compare"}
                            >
                              {isSelectedForCompare && <Check size={14} />}
                            </button>
                          )}
                          <Link
                            to={details ? `/${details.slug}` : '/vehicles'}
                            className="saved-sidebar__vehicle"
                            onClick={(e) => {
                              if (compareMode) {
                                e.preventDefault();
                                toggleCompareSelection(vehicle.id);
                              } else {
                                onClose();
                              }
                            }}
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
                              <div className="saved-sidebar__vehicle-meta">
                                {details && (
                                  <span className="saved-sidebar__vehicle-price">
                                    ${details.priceMin.toLocaleString()}
                                  </span>
                                )}
                                {details?.staffRating && (
                                  <span className="saved-sidebar__vehicle-rating">
                                    <Star size={12} fill="currentColor" />
                                    <span>{details.staffRating.toFixed(1)}</span>
                                    <span className="saved-sidebar__vehicle-rating-label">C/D</span>
                                  </span>
                                )}
                              </div>
                            </div>
                            {!compareMode && (
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
                            )}
                          </Link>
                          {details && !compareMode && (
                            <button
                              className="saved-sidebar__vehicle-dealers"
                              onClick={() => {
                                setDealerMapVehicle({
                                  year: parseInt(details.year, 10),
                                  make: details.make,
                                  model: details.model,
                                  msrp: details.priceMin,
                                  image: details.image,
                                  galleryImages: details.galleryImages,
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
                <Button 
                  variant="outline"
                  className="saved-sidebar__add-btn"
                  onClick={() => setShowAddVehicleWant(true)}
                  iconLeft={<Plus size={18} />}
                >
                  Add a Vehicle
                </Button>
              )}
            </div>
          )}

          {/* My Budget */}
          {activeTab === 'budget' && (
            <div className="saved-sidebar__section">
              <div className="saved-sidebar__budget-panel saved-sidebar__budget-panel--tab" aria-label="My budget">
                <div className="saved-sidebar__budget-header">
                  <div className="saved-sidebar__budget-title-wrap">
                    <Wallet size={18} className="saved-sidebar__budget-icon" />
                    <span className="saved-sidebar__budget-title">My Budget</span>
                  </div>
                  <Link
                    to="/account?tab=profile#my-budget"
                    className="saved-sidebar__budget-edit"
                    onClick={onClose}
                  >
                    Edit
                  </Link>
                </div>
                <div className="saved-sidebar__budget-summary">
                  <div>
                    <span className="saved-sidebar__budget-label">
                      {formatBudgetCurrency(budgetPreferences.monthlyPayment)}/mo budget
                    </span>
                    <strong>{formatBudgetCurrency(budgetSummary.buyingPower)}</strong>
                  </div>
                  <span className="saved-sidebar__budget-count">
                    {budgetMatches.length} {budgetPreferences.bodyStyle} match{budgetMatches.length === 1 ? '' : 'es'}
                  </span>
                </div>
                <div className="saved-sidebar__estimate-section" aria-label="Saved payment estimates">
                  <div className="saved-sidebar__estimate-header">
                    <span>Saved Estimates</span>
                    {savedPaymentEstimates.length > 0 ? (
                      <small>{savedPaymentEstimates.length}</small>
                    ) : null}
                  </div>
                  {recentPaymentEstimates.length > 0 ? (
                    <div className="saved-sidebar__estimate-list">
                      {recentPaymentEstimates.map((estimate) => (
                        <article key={estimate.id} className="saved-sidebar__estimate-card">
                          <Link
                            to={getEstimateHref(estimate.id)}
                            className="saved-sidebar__estimate-card-main"
                            onClick={onClose}
                            aria-label={`Open ${estimate.title}`}
                          >
                            <div className="saved-sidebar__estimate-card-header">
                              <strong>{estimate.title}</strong>
                              <span>{formatEstimateDate(estimate.createdAt)} · {estimate.inputs.loanTermMonths} mo · {estimate.inputs.apr.toFixed(1)}% APR</span>
                            </div>
                            <dl className="saved-sidebar__estimate-metrics">
                              <div>
                                <dt>Monthly</dt>
                                <dd>{formatBudgetCurrency(estimate.results.monthlyPayment)}/mo</dd>
                              </div>
                              <div>
                                <dt>Financed</dt>
                                <dd>{formatBudgetCurrency(estimate.results.amountFinanced)}</dd>
                              </div>
                              <div>
                                <dt>Interest</dt>
                                <dd>{formatBudgetCurrency(estimate.results.totalInterestPaid)}</dd>
                              </div>
                            </dl>
                          </Link>
                          <button
                            type="button"
                            className="saved-sidebar__estimate-delete"
                            onClick={() => removePaymentEstimate(estimate.id)}
                            aria-label={`Remove ${estimate.title}`}
                            title="Remove estimate"
                          >
                            <Trash2 size={14} aria-hidden="true" />
                          </button>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="saved-sidebar__estimate-empty">
                      <p>Saved calculator estimates will appear here.</p>
                      <Link
                        to="/auto-loan-calculator/light-steps/review"
                        onClick={onClose}
                      >
                        Create an estimate <ChevronRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
                {budgetPreviewVehicles.length > 0 ? (
                  <div className="saved-sidebar__budget-preview" aria-label="Cars I can afford">
                    {budgetPreviewVehicles.map((vehicle) => {
                      const isSaved = Boolean(getSavedBudgetVehicle(vehicle));
                      return (
                        <div key={vehicle.id} className="saved-sidebar__budget-preview-item">
                          <Link
                            to={`/${vehicle.slug}`}
                            className="saved-sidebar__budget-preview-main"
                            onClick={onClose}
                          >
                            <span>{getBudgetVehicleName(vehicle)}</span>
                            <strong>{formatBudgetCurrency(vehicle.priceMin)}</strong>
                          </Link>
                          <button
                            type="button"
                            className={`saved-sidebar__budget-save ${isSaved ? 'saved-sidebar__budget-save--saved' : ''}`}
                            onClick={() => handleToggleBudgetVehicleSave(vehicle)}
                            aria-label={isSaved ? `Remove ${getBudgetVehicleName(vehicle)} from Cars I Want` : `Save ${getBudgetVehicleName(vehicle)} to Cars I Want`}
                            title={isSaved ? 'Saved to Cars I Want' : 'Save to Cars I Want'}
                          >
                            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="saved-sidebar__budget-empty">
                    No matches yet. Edit your budget to widen the search.
                  </p>
                )}
                <Link
                  to={budgetMatchUrl}
                  className="saved-sidebar__budget-link"
                  onClick={onClose}
                >
                  View Cars I Can Afford <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="saved-sidebar__footer">
          <Button 
            as="a"
            href="/account?tab=saved" 
            variant="primary"
            fullWidth
            className="saved-sidebar__footer-btn"
            onClick={onClose}
          >
            View All Saved
          </Button>
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

      {/* Vehicle Comparison Modal */}
      <VehicleComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => {
          setIsCompareModalOpen(false);
          setCompareMode(false);
          setSelectedForCompare([]);
        }}
        vehicles={getVehiclesForComparison()}
      />
    </>
  );
};

export default SavedVehiclesSidebar;
