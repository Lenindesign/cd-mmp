import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Heart, Blend } from 'lucide-react';
import './OnboardingStep2.css';

// Speedometer Step Indicator Component (consistent with Step 1)
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

// Chevron Icons (same as Step 1)
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

// User type based on Figma design
type UserType = 'buyer' | 'enthusiast' | 'both' | null;


interface UserTypeOption {
  id: UserType;
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected?: boolean;
}

// User type options matching Figma design
const userTypeOptions: Omit<UserTypeOption, 'isSelected'>[] = [
  {
    id: 'buyer',
    title: 'Car Buyer',
    description: "I'm shopping for a new or used car.",
    icon: <Car size={28} strokeWidth={1.5} />,
  },
  {
    id: 'enthusiast',
    title: 'Car Enthusiast',
    description: 'I nerd out on all things car-related.',
    icon: <Heart size={28} strokeWidth={1.5} />,
  },
  {
    id: 'both',
    title: 'Both',
    description: "I'm a car lover on the lookout for my next ride.",
    icon: <Blend size={28} strokeWidth={1.5} />,
  },
];

const OnboardingStep2: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<UserType>(null);

  const handleContinue = () => {
    if (selectedType) {
      localStorage.setItem('onboarding_user_type', selectedType);
      navigate('/onboarding/step-3');
    }
  };

  const handleBack = () => {
    navigate('/onboarding/step-1');
  };

  const handleSkip = () => {
    navigate('/onboarding/step-3');
  };

  return (
    <div className="onboarding-step2">
      <div className="step2-container">
        {/* Step Indicator - Speedometer Graphic */}
        <StepIndicator step={2} />

        {/* Header Section */}
        <header className="step2-header">
          <h1 className="step2-title">What describes you best?</h1>
          <p className="step2-subtitle">
            Choose the option that best fits your automotive interests
          </p>
        </header>

        {/* Selection Cards - Horizontal Row */}
        <div className="step2-cards" role="group" aria-label="User type selection">
          {userTypeOptions.map((option) => (
            <button
              key={option.id}
              className={`step2-card ${selectedType === option.id ? 'step2-card--selected' : ''}`}
              onClick={() => setSelectedType(option.id)}
              aria-pressed={selectedType === option.id}
              type="button"
            >
              {/* Icon Container with dark/blue background */}
              <div className={`step2-card__image ${selectedType === option.id ? 'step2-card__image--selected' : ''}`}>
                <div className="step2-card__icon">
                  {option.icon}
                </div>
              </div>
              
              {/* Text Content */}
              <div className="step2-card__content">
                <h3 className="step2-card__title">{option.title}</h3>
                <p className="step2-card__description">{option.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation - Using CTA classes from design system (same as Step 1) */}
        <nav className="step2-navigation" aria-label="Onboarding navigation">
          <button 
            className="cta cta--md cta--secondary" 
            onClick={handleBack}
            type="button"
          >
            <ChevronLeftIcon />
            Back
          </button>

          <button 
            className="step2-skip" 
            onClick={handleSkip}
            type="button"
          >
            Skip this step
          </button>

          <button 
            className="cta cta--md cta--primary" 
            onClick={handleContinue}
            type="button"
            disabled={!selectedType}
          >
            Next
            <ChevronRightIcon />
          </button>
        </nav>

        {/* Car and Driver Logo */}
        <div className="step2-logo">
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e911a35f00029a6a6b/logo.svg" 
            alt="Car and Driver" 
            className="step2-logo-img"
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep2;
