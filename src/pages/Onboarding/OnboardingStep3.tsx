import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingStep3.css';

// Speedometer Step Indicator Component (consistent with Step 1 & 2)
const StepIndicator: React.FC<{ step: number }> = ({ step }) => {
  const stepImages: Record<number, string> = {
    1: 'https://d2kde5ohu8qb21.cloudfront.net/files/693c48e811a35f00029a6a69/step1.svg',
    2: 'https://d2kde5ohu8qb21.cloudfront.net/files/693c48e711a35f00029a6a67/step2.svg',
    3: 'https://d2kde5ohu8qb21.cloudfront.net/files/693c48e611a35f00029a6a65/step3.svg',
    4: 'https://d2kde5ohu8qb21.cloudfront.net/files/693c48e611a35f00029a6a63/step4.svg',
  };

  return (
    <div className="step-indicator">
      <img 
        src={stepImages[step]} 
        alt={`Step ${step} of 4`} 
        className="step-indicator-img"
      />
    </div>
  );
};

// Chevron Icons (same as Step 1 & 2)
const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Search Icon
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Sample vehicle data for search suggestions
const vehicleSuggestions = [
  { id: '1', name: '2025 Toyota Camry', make: 'Toyota', model: 'Camry', year: '2025' },
  { id: '2', name: '2025 Honda Accord', make: 'Honda', model: 'Accord', year: '2025' },
  { id: '3', name: '2025 Ford Mustang', make: 'Ford', model: 'Mustang', year: '2025' },
  { id: '4', name: '2025 Chevrolet Trax', make: 'Chevrolet', model: 'Trax', year: '2025' },
  { id: '5', name: '2025 BMW 3 Series', make: 'BMW', model: '3 Series', year: '2025' },
  { id: '6', name: '2025 Mercedes-Benz C-Class', make: 'Mercedes-Benz', model: 'C-Class', year: '2025' },
  { id: '7', name: '2025 Audi A4', make: 'Audi', model: 'A4', year: '2025' },
  { id: '8', name: '2025 Tesla Model 3', make: 'Tesla', model: 'Model 3', year: '2025' },
  { id: '9', name: '2025 Hyundai Sonata', make: 'Hyundai', model: 'Sonata', year: '2025' },
  { id: '10', name: '2025 Mazda CX-5', make: 'Mazda', model: 'CX-5', year: '2025' },
];

interface SelectedVehicle {
  id: string;
  name: string;
}

const OnboardingStep3: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState<SelectedVehicle[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(vehicleSuggestions);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = vehicleSuggestions.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions(vehicleSuggestions);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectVehicle = (vehicle: typeof vehicleSuggestions[0]) => {
    if (!selectedVehicles.find(v => v.id === vehicle.id)) {
      setSelectedVehicles([...selectedVehicles, { id: vehicle.id, name: vehicle.name }]);
    }
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleRemoveVehicle = (vehicleId: string) => {
    setSelectedVehicles(selectedVehicles.filter(v => v.id !== vehicleId));
  };

  const handleContinue = () => {
    // Store selected vehicles
    localStorage.setItem('onboarding_vehicles', JSON.stringify(selectedVehicles));
    navigate('/onboarding/step-4');
  };

  const handleBack = () => {
    navigate('/onboarding/step-2');
  };

  const handleSkip = () => {
    navigate('/onboarding/step-4');
  };

  return (
    <div className="onboarding-step3">
      <div className="step3-container">
        {/* Step Indicator - Speedometer Graphic */}
        <StepIndicator step={3} />

        {/* Header Section */}
        <header className="step3-header">
          <h1 className="step3-title">Tell Us About Your Ride</h1>
          <p className="step3-subtitle">
            Choose what you drive now and what you'd like next
          </p>
        </header>

        {/* Search Card */}
        <div className="step3-card">
          <label htmlFor="vehicle-search" className="step3-label">
            SEARCH FOR A VEHICLE
          </label>
          
          <div className="step3-search-wrapper">
            <SearchIcon />
            <input
              ref={inputRef}
              id="vehicle-search"
              type="text"
              className="step3-search-input"
              placeholder="Start typing to search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              autoComplete="off"
            />
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div ref={suggestionsRef} className="step3-suggestions">
              {filteredSuggestions.slice(0, 5).map((vehicle) => (
                <button
                  key={vehicle.id}
                  className="step3-suggestion-item"
                  onClick={() => handleSelectVehicle(vehicle)}
                  type="button"
                >
                  {vehicle.name}
                </button>
              ))}
            </div>
          )}

          {/* Selected Vehicles */}
          {selectedVehicles.length > 0 && (
            <div className="step3-selected">
              {selectedVehicles.map((vehicle) => (
                <div key={vehicle.id} className="step3-selected-item">
                  <span>{vehicle.name}</span>
                  <button
                    className="step3-selected-remove"
                    onClick={() => handleRemoveVehicle(vehicle.id)}
                    aria-label={`Remove ${vehicle.name}`}
                    type="button"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation - Using CTA classes from design system (same as Step 1 & 2) */}
        <nav className="step3-navigation" aria-label="Onboarding navigation">
          <button 
            className="cta cta--md cta--secondary" 
            onClick={handleBack}
            type="button"
          >
            <ChevronLeftIcon />
            Back
          </button>

          <button 
            className="step3-skip" 
            onClick={handleSkip}
            type="button"
          >
            Skip this step
          </button>

          <button 
            className="cta cta--md cta--primary" 
            onClick={handleContinue}
            type="button"
          >
            Next
            <ChevronRightIcon />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default OnboardingStep3;
