import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingWelcome.css';

const OnboardingWelcome: React.FC = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleExplore = () => {
    // Mark onboarding as complete
    localStorage.setItem('onboarding_complete', 'true');
    navigate('/onboarding/results');
  };

  const handleBrowseAll = () => {
    localStorage.setItem('onboarding_complete', 'true');
    navigate('/');
  };

  return (
    <div className="onboarding-welcome">
      {/* Background Effects */}
      <div className="onboarding-welcome__bg">
        <div className="onboarding-welcome__confetti" />
        <div className="onboarding-welcome__glow" />
      </div>

      {/* Logo */}
      <header className="onboarding-welcome__header">
        <img 
          src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e911a35f00029a6a6b/logo.svg" 
          alt="Car and Driver" 
          className="onboarding-welcome__logo"
        />
      </header>

      {/* Main Content */}
      <main className={`onboarding-welcome__content ${showContent ? 'onboarding-welcome__content--visible' : ''}`}>
        {/* Success Icon */}
        <div className="onboarding-welcome__icon">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="currentColor" className="onboarding-welcome__icon-bg"/>
            <path 
              d="M25 42L35 52L55 28" 
              stroke="white" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="onboarding-welcome__icon-check"
            />
          </svg>
        </div>

        {/* Welcome Message */}
        <h1 className="onboarding-welcome__title">
          You're all set!
        </h1>
        <p className="onboarding-welcome__subtitle">
          Welcome to Car and Driver. We've personalized your experience based on your preferences.
        </p>

        {/* Preferences Summary */}
        <div className="onboarding-welcome__summary">
          <h3 className="onboarding-welcome__summary-title">Your preferences</h3>
          <PreferencesSummary />
        </div>

        {/* Action Buttons */}
        <div className="onboarding-welcome__actions">
          <button 
            className="onboarding-btn onboarding-btn--primary"
            onClick={handleExplore}
          >
            View Your Recommendations
          </button>
          <button 
            className="onboarding-btn onboarding-btn--secondary"
            onClick={handleBrowseAll}
          >
            Browse All Vehicles
          </button>
        </div>
      </main>
    </div>
  );
};

const PreferencesSummary: React.FC = () => {
  const userType = localStorage.getItem('onboarding_user_type');
  const interests = JSON.parse(localStorage.getItem('onboarding_interests') || '[]');
  const vehicleTypes = JSON.parse(localStorage.getItem('onboarding_vehicle_types') || '[]');

  const hasPreferences = userType || interests.length > 0 || vehicleTypes.length > 0;

  if (!hasPreferences) {
    return (
      <p className="onboarding-welcome__summary-empty">
        No specific preferences selected. You'll see our general recommendations.
      </p>
    );
  }

  const interestLabels: Record<string, string> = {
    commuting: 'Daily Commuting',
    family: 'Family Adventures',
    offroad: 'Off-Road',
    luxury: 'Luxury & Comfort',
    performance: 'Performance',
    eco: 'Eco-Friendly',
    roadtrip: 'Road Trips',
    towing: 'Towing & Hauling',
    tech: 'Tech & Innovation',
    budget: 'Budget-Friendly',
    safety: 'Safety First',
    style: 'Style & Design',
  };

  const vehicleLabels: Record<string, string> = {
    sedan: 'Sedan',
    suv: 'SUV',
    truck: 'Truck',
    coupe: 'Coupe',
    hatchback: 'Hatchback',
    convertible: 'Convertible',
    wagon: 'Wagon',
    van: 'Van/Minivan',
    electric: 'Electric',
  };

  const userTypeLabels: Record<string, string> = {
    buyer: 'Buyer',
    seller: 'Seller',
    both: 'Buyer & Seller',
  };

  return (
    <div className="onboarding-welcome__preferences">
      {userType && (
        <div className="onboarding-welcome__pref-row">
          <span className="onboarding-welcome__pref-label">Looking to:</span>
          <span className="onboarding-welcome__pref-value">
            {userTypeLabels[userType] || userType}
          </span>
        </div>
      )}
      
      {interests.length > 0 && (
        <div className="onboarding-welcome__pref-row">
          <span className="onboarding-welcome__pref-label">Interests:</span>
          <span className="onboarding-welcome__pref-value">
            {interests.map((id: string) => interestLabels[id] || id).join(', ')}
          </span>
        </div>
      )}

      {vehicleTypes.length > 0 && (
        <div className="onboarding-welcome__pref-row">
          <span className="onboarding-welcome__pref-label">Vehicle types:</span>
          <span className="onboarding-welcome__pref-value">
            {vehicleTypes.map((id: string) => vehicleLabels[id] || id).join(', ')}
          </span>
        </div>
      )}
    </div>
  );
};

export default OnboardingWelcome;









