import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from './OnboardingLayout';
import './OnboardingStep4.css';

interface VehicleType {
  id: string;
  label: string;
  icon: string;
}

const vehicleTypes: VehicleType[] = [
  { 
    id: 'sedan', 
    label: 'Sedan',
    icon: '🚗'
  },
  { 
    id: 'suv', 
    label: 'SUV',
    icon: '🚙'
  },
  { 
    id: 'truck', 
    label: 'Truck',
    icon: '🛻'
  },
  { 
    id: 'coupe', 
    label: 'Coupe',
    icon: '🏎️'
  },
  { 
    id: 'hatchback', 
    label: 'Hatchback',
    icon: '🚘'
  },
  { 
    id: 'convertible', 
    label: 'Convertible',
    icon: '🏁'
  },
  { 
    id: 'wagon', 
    label: 'Wagon',
    icon: '🚃'
  },
  { 
    id: 'van', 
    label: 'Van/Minivan',
    icon: '🚐'
  },
  { 
    id: 'electric', 
    label: 'Electric',
    icon: '⚡'
  },
];

const OnboardingStep4: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleContinue = () => {
    // Store selections
    localStorage.setItem('onboarding_vehicle_types', JSON.stringify(selectedTypes));
    navigate('/onboarding/welcome');
  };

  const handleBack = () => {
    navigate('/onboarding/step-3');
  };

  const handleSkip = () => {
    navigate('/onboarding/welcome');
  };

  return (
    <OnboardingLayout 
      currentStep={4} 
      totalSteps={4} 
      showProgress={true}
      showBackButton={true}
      onBack={handleBack}
    >
      <div className="onboarding-card onboarding-step4">
        {/* Illustration */}
        <div className="onboarding-card__illustration">
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e611a35f00029a6a63/step4.svg" 
            alt="Vehicle types illustration"
          />
        </div>

        {/* Content */}
        <h1 className="onboarding-card__title">
          What type of vehicle interests you?
        </h1>
        <p className="onboarding-card__subtitle">
          Select all the vehicle types you'd like to explore.
        </p>

        {/* Vehicle Type Grid */}
        <div className="onboarding-step4__grid">
          {vehicleTypes.map((type) => (
            <button
              key={type.id}
              className={`onboarding-step4__card ${
                selectedTypes.includes(type.id) ? 'onboarding-step4__card--selected' : ''
              }`}
              onClick={() => toggleType(type.id)}
              aria-pressed={selectedTypes.includes(type.id)}
            >
              <span className="onboarding-step4__card-icon">{type.icon}</span>
              <span className="onboarding-step4__card-label">{type.label}</span>
              {selectedTypes.includes(type.id) && (
                <span className="onboarding-step4__card-check">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Selection count */}
        {selectedTypes.length > 0 && (
          <p className="onboarding-step4__count">
            {selectedTypes.length} vehicle type{selectedTypes.length !== 1 ? 's' : ''} selected
          </p>
        )}

        {/* Continue Button */}
        <button 
          className="onboarding-btn onboarding-btn--primary"
          onClick={handleContinue}
        >
          {selectedTypes.length > 0 ? 'Continue' : 'Continue without selecting'}
        </button>

        {/* Skip */}
        <button className="onboarding-skip" onClick={handleSkip}>
          Skip for now
        </button>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep4;









