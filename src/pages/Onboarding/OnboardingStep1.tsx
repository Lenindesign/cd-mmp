import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingStep1.css';

// Speedometer Step Indicator Component
const StepIndicator: React.FC<{ step: number }> = ({ step }) => {
  // Use the provided step graphics from the database
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

// Location Icon Component
const LocationIcon: React.FC = () => (
  <svg 
    className="step1-location-icon" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" 
      fill="currentColor"
    />
  </svg>
);

// Chevron Left Icon Component
const ChevronLeftIcon: React.FC = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 18 18" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      d="M11.25 13.5L6.75 9L11.25 4.5" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Chevron Right Icon Component
const ChevronRightIcon: React.FC = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 18 18" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      d="M6.75 4.5L11.25 9L6.75 13.5" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const OnboardingStep1: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleNext = () => {
    // Save to localStorage for later use
    if (name) {
      localStorage.setItem('onboarding_name', name);
    }
    if (location) {
      localStorage.setItem('onboarding_location', location);
    }
    navigate('/onboarding/step-2');
  };

  const handleSkip = () => {
    navigate('/onboarding/step-2');
  };

  const handleBack = () => {
    navigate('/sign-in');
  };

  return (
    <div className="onboarding-step1">
      <div className="step1-container">
        {/* Step Indicator - Speedometer */}
        <StepIndicator step={1} />

        {/* Header Text */}
        <header className="step1-header">
          <span className="step1-subtitle">Start Your Engines</span>
          <h1 className="step1-title">Let's get to know each other</h1>
        </header>

        {/* Form Card */}
        <div className="step1-card" role="form" aria-label="Personal information">
          {/* Name Field */}
          <div className="step1-field">
            <label htmlFor="name-input" className="step1-label">
              WHAT IS YOUR NAME?
            </label>
            <div className="step1-input-wrapper">
              <input
                id="name-input"
                type="text"
                className="step1-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          </div>

          {/* Location Field */}
          <div className="step1-field">
            <label htmlFor="location-input" className="step1-label">
              WHERE ARE YOU LOCATED? (OPTIONAL)
            </label>
            <div className="step1-input-wrapper step1-input-with-icon">
              <input
                id="location-input"
                type="text"
                className="step1-input"
                placeholder="Current Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                autoComplete="address-level2"
              />
              <LocationIcon />
            </div>
          </div>
        </div>

        {/* Navigation - Using CTA classes from design system */}
        <nav className="step1-navigation" aria-label="Onboarding navigation">
          <button 
            className="cta cta--md cta--secondary" 
            onClick={handleBack}
            type="button"
          >
            <ChevronLeftIcon />
            Back
          </button>

          <button 
            className="step1-skip" 
            onClick={handleSkip}
            type="button"
          >
            Skip this step
          </button>

          <button 
            className="cta cta--md cta--primary" 
            onClick={handleNext}
            type="button"
          >
            Next
            <ChevronRightIcon />
          </button>
        </nav>

        {/* Car and Driver Logo */}
        <div className="step1-logo">
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e911a35f00029a6a6b/logo.svg" 
            alt="Car and Driver" 
            className="step1-logo-img"
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1;
