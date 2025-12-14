import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from './OnboardingLayout';
import './OnboardingStep2.css';

type UserType = 'buyer' | 'seller' | 'both' | null;

interface UserTypeOption {
  id: UserType;
  title: string;
  description: string;
  icon: string;
}

const userTypeOptions: UserTypeOption[] = [
  {
    id: 'buyer',
    title: 'I\'m a Buyer',
    description: 'Looking to purchase a new or used vehicle',
    icon: 'https://d2kde5ohu8qb21.cloudfront.net/files/693c48e1dbe93500027ce8e8/buyer.svg',
  },
  {
    id: 'seller',
    title: 'I\'m a Seller',
    description: 'Looking to sell or trade my current vehicle',
    icon: 'https://d2kde5ohu8qb21.cloudfront.net/files/693c48e1dbe93500027ce8e8/buyer.svg', // Using buyer icon as placeholder
  },
  {
    id: 'both',
    title: 'Both',
    description: 'I want to buy and sell vehicles',
    icon: 'https://d2kde5ohu8qb21.cloudfront.net/files/693c48dddbe935000241fc05/both.svg',
  },
];

const OnboardingStep2: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<UserType>(null);

  const handleContinue = () => {
    if (selectedType) {
      // Store selection in localStorage or context
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
    <OnboardingLayout 
      currentStep={2} 
      totalSteps={4} 
      showProgress={true}
      showBackButton={true}
      onBack={handleBack}
    >
      <div className="onboarding-card onboarding-step2">
        {/* Illustration */}
        <div className="onboarding-card__illustration">
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e711a35f00029a6a67/step2.svg" 
            alt="User type illustration"
          />
        </div>

        {/* Content */}
        <h1 className="onboarding-card__title">
          What brings you here?
        </h1>
        <p className="onboarding-card__subtitle">
          Tell us what you're looking to do so we can personalize your experience.
        </p>

        {/* Selection Cards */}
        <div className="onboarding-step2__options">
          {userTypeOptions.map((option) => (
            <button
              key={option.id}
              className={`onboarding-step2__option ${
                selectedType === option.id ? 'onboarding-step2__option--selected' : ''
              }`}
              onClick={() => setSelectedType(option.id)}
              aria-pressed={selectedType === option.id}
            >
              <div className="onboarding-step2__option-icon">
                <img src={option.icon} alt="" />
              </div>
              <div className="onboarding-step2__option-content">
                <h3 className="onboarding-step2__option-title">{option.title}</h3>
                <p className="onboarding-step2__option-description">{option.description}</p>
              </div>
              <div className="onboarding-step2__option-check">
                {selectedType === option.id && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="currentColor" />
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button 
          className="onboarding-btn onboarding-btn--primary"
          onClick={handleContinue}
          disabled={!selectedType}
        >
          Continue
        </button>

        {/* Skip */}
        <button className="onboarding-skip" onClick={handleSkip}>
          Skip for now
        </button>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep2;









