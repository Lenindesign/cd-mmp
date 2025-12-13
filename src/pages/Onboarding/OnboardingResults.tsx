import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { vehicleDatabase } from '../../data/vehicles';
import type { Vehicle } from '../../types/vehicle';
import './OnboardingResults.css';

type TabType = 'all' | 'new' | 'used';

const OnboardingResults: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get user preferences
  const vehicleTypePref = JSON.parse(localStorage.getItem('onboarding_vehicle_types') || '[]');

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const allVehicles = vehicleDatabase;
    
    // Filter by user preferences if any
    let filtered = allVehicles;
    if (vehicleTypePref.length > 0) {
      filtered = allVehicles.filter(v => {
        const type = v.bodyStyle?.toLowerCase() || '';
        return vehicleTypePref.some((pref: string) => 
          type.includes(pref) || 
          pref === 'suv' && type.includes('suv') ||
          pref === 'sedan' && type.includes('sedan') ||
          pref === 'truck' && type.includes('truck') ||
          pref === 'coupe' && type.includes('coupe') ||
          pref === 'hatchback' && type.includes('hatchback') ||
          pref === 'convertible' && type.includes('convertible') ||
          pref === 'wagon' && type.includes('wagon')
        );
      });
    }

    // If no matches found with preferences, show all
    if (filtered.length === 0) {
      filtered = allVehicles;
    }

    setVehicles(filtered);
    setFilteredVehicles(filtered);
    setIsLoading(false);
  }, []);

  // Filter by tab
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredVehicles(vehicles);
    } else if (activeTab === 'new') {
      setFilteredVehicles(vehicles.filter(v => parseInt(v.year) >= 2024));
    } else {
      setFilteredVehicles(vehicles.filter(v => parseInt(v.year) < 2024));
    }
  }, [activeTab, vehicles]);

  const handleVehicleClick = (vehicle: Vehicle) => {
    const slug = `/${vehicle.year}/${vehicle.make.toLowerCase()}/${vehicle.model.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(slug);
  };

  return (
    <div className="onboarding-results">
      {/* Header */}
      <header className="onboarding-results__header">
        <div className="onboarding-results__header-content">
          <Link to="/" className="onboarding-results__logo">
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e911a35f00029a6a6b/logo.svg" 
              alt="Car and Driver"
            />
          </Link>
          <nav className="onboarding-results__nav">
            <Link to="/" className="onboarding-results__nav-link">Browse All</Link>
            <Link to="/used-cars" className="onboarding-results__nav-link">Used Cars</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="onboarding-results__hero">
        <div className="onboarding-results__hero-content">
          <h1 className="onboarding-results__title">
            Your Personalized Results
          </h1>
          <p className="onboarding-results__subtitle">
            Based on your preferences, here are our top recommendations for you.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="onboarding-results__tabs-container">
        <div className="onboarding-results__tabs">
          <button
            className={`onboarding-results__tab ${activeTab === 'all' ? 'onboarding-results__tab--active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Results
            <span className="onboarding-results__tab-count">{vehicles.length}</span>
          </button>
          <button
            className={`onboarding-results__tab ${activeTab === 'new' ? 'onboarding-results__tab--active' : ''}`}
            onClick={() => setActiveTab('new')}
          >
            New Vehicles
            <span className="onboarding-results__tab-count">
              {vehicles.filter(v => parseInt(v.year) >= 2024).length}
            </span>
          </button>
          <button
            className={`onboarding-results__tab ${activeTab === 'used' ? 'onboarding-results__tab--active' : ''}`}
            onClick={() => setActiveTab('used')}
          >
            Used Vehicles
            <span className="onboarding-results__tab-count">
              {vehicles.filter(v => parseInt(v.year) < 2024).length}
            </span>
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <main className="onboarding-results__main">
        {isLoading ? (
          <div className="onboarding-results__loading">
            <div className="onboarding-results__spinner" />
            <p>Finding your perfect matches...</p>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="onboarding-results__empty">
            <p>No vehicles found matching your criteria.</p>
            <Link to="/" className="onboarding-btn onboarding-btn--primary">
              Browse All Vehicles
            </Link>
          </div>
        ) : (
          <div className="onboarding-results__grid">
            {filteredVehicles.slice(0, 12).map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                onClick={() => handleVehicleClick(vehicle)}
              />
            ))}
          </div>
        )}

        {filteredVehicles.length > 12 && (
          <div className="onboarding-results__view-more">
            <Link to="/" className="onboarding-btn onboarding-btn--outline">
              View All {filteredVehicles.length} Vehicles
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onClick }) => {
  return (
    <article className="results-card" onClick={onClick}>
      <div className="results-card__image">
        <img 
          src={vehicle.image || `https://via.placeholder.com/400x250?text=${vehicle.make}+${vehicle.model}`}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        />
        {parseInt(vehicle.year) >= 2024 && (
          <span className="results-card__badge">New</span>
        )}
      </div>
      <div className="results-card__content">
        <span className="results-card__year">{vehicle.year}</span>
        <h3 className="results-card__title">
          {vehicle.make} {vehicle.model}
        </h3>
        {vehicle.priceMin && (
          <p className="results-card__price">
            Starting at ${vehicle.priceMin.toLocaleString()}
          </p>
        )}
        {vehicle.bodyStyle && (
          <span className="results-card__type">{vehicle.bodyStyle}</span>
        )}
      </div>
    </article>
  );
};

export default OnboardingResults;

