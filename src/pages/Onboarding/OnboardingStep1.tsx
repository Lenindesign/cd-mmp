import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingStep1.css';

// Speedometer Step Indicator Component
const StepIndicator: React.FC<{ step: number }> = ({ step }) => {
  // Use the provided step graphics
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
      <div className="step1-content">
        {/* Step Indicator - Speedometer */}
        <StepIndicator step={1} />

        {/* Header Text */}
        <div className="step1-header">
          <span className="step1-subtitle">Start Your Engines</span>
          <h1 className="step1-title">Let's get to know each other</h1>
        </div>

        {/* Form Card */}
        <div className="step1-card">
          {/* Name Field */}
          <div className="step1-field">
            <label className="step1-label">WHAT IS YOUR NAME?</label>
            <div className="step1-input-wrapper">
              <input
                type="text"
                className="step1-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Location Field */}
          <div className="step1-field">
            <label className="step1-label">WHERE ARE YOU LOCATED? (OPTIONAL)</label>
            <div className="step1-input-wrapper step1-input-with-icon">
              <input
                type="text"
                className="step1-input"
                placeholder="Current Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <svg className="step1-location-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#1B5F8A"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="step1-navigation">
          <button className="step1-btn step1-btn-back" onClick={handleBack}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.25 13.5L6.75 9L11.25 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          <button className="step1-skip" onClick={handleSkip}>
            Skip this step
          </button>

          <button className="step1-btn step1-btn-next" onClick={handleNext}>
            Next
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1;
