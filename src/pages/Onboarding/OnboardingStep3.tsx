import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from './OnboardingLayout';
import './OnboardingStep3.css';

interface Interest {
  id: string;
  label: string;
  emoji: string;
}

const interests: Interest[] = [
  { id: 'commuting', label: 'Daily Commuting', emoji: '🏙️' },
  { id: 'family', label: 'Family Adventures', emoji: '👨‍👩‍👧‍👦' },
  { id: 'offroad', label: 'Off-Road', emoji: '🏔️' },
  { id: 'luxury', label: 'Luxury & Comfort', emoji: '✨' },
  { id: 'performance', label: 'Performance', emoji: '🏎️' },
  { id: 'eco', label: 'Eco-Friendly', emoji: '🌱' },
  { id: 'roadtrip', label: 'Road Trips', emoji: '🛣️' },
  { id: 'towing', label: 'Towing & Hauling', emoji: '🚜' },
  { id: 'tech', label: 'Tech & Innovation', emoji: '💡' },
  { id: 'budget', label: 'Budget-Friendly', emoji: '💰' },
  { id: 'safety', label: 'Safety First', emoji: '🛡️' },
  { id: 'style', label: 'Style & Design', emoji: '🎨' },
];

const OnboardingStep3: React.FC = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleContinue = () => {
    // Store selections
    localStorage.setItem('onboarding_interests', JSON.stringify(selectedInterests));
    navigate('/onboarding/step-4');
  };

  const handleBack = () => {
    navigate('/onboarding/step-2');
  };

  const handleSkip = () => {
    navigate('/onboarding/step-4');
  };

  return (
    <OnboardingLayout 
      currentStep={3} 
      totalSteps={4} 
      showProgress={true}
      showBackButton={true}
      onBack={handleBack}
    >
      <div className="onboarding-card onboarding-step3">
        {/* Illustration */}
        <div className="onboarding-card__illustration">
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e611a35f00029a6a65/step3.svg" 
            alt="Lifestyle interests illustration"
          />
        </div>

        {/* Content */}
        <h1 className="onboarding-card__title">
          What matters most to you?
        </h1>
        <p className="onboarding-card__subtitle">
          Select all that apply to help us find vehicles that fit your lifestyle.
        </p>

        {/* Interest Tags */}
        <div className="onboarding-step3__interests">
          {interests.map((interest) => (
            <button
              key={interest.id}
              className={`onboarding-step3__tag ${
                selectedInterests.includes(interest.id) ? 'onboarding-step3__tag--selected' : ''
              }`}
              onClick={() => toggleInterest(interest.id)}
              aria-pressed={selectedInterests.includes(interest.id)}
            >
              <span className="onboarding-step3__tag-emoji">{interest.emoji}</span>
              <span className="onboarding-step3__tag-label">{interest.label}</span>
            </button>
          ))}
        </div>

        {/* Selection count */}
        {selectedInterests.length > 0 && (
          <p className="onboarding-step3__count">
            {selectedInterests.length} selected
          </p>
        )}

        {/* Continue Button */}
        <button 
          className="onboarding-btn onboarding-btn--primary"
          onClick={handleContinue}
        >
          {selectedInterests.length > 0 ? 'Continue' : 'Continue without selecting'}
        </button>

        {/* Skip */}
        <button className="onboarding-skip" onClick={handleSkip}>
          Skip for now
        </button>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep3;
















