import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingStep4.css';

// Speedometer Step Indicator Component (consistent with Steps 1-3)
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

// Chevron Icons (same as Steps 1-3)
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

// Checkmark Icon
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Car and Driver Logo Component
const CarAndDriverLogo = () => (
  <div style={{
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
  }}>
    <img 
      src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/logos/logo.68b8e69.svg?primary=%23fff" 
      alt="Car and Driver" 
      style={{ 
        width: '100%', 
        height: 'auto',
        objectFit: 'contain',
      }}
    />
  </div>
);

interface Newsletter {
  id: string;
  title: string;
  description: string;
  logo: React.ReactNode;
}

const newsletters: Newsletter[] = [
  {
    id: 'car-and-driver',
    title: 'Subscribe to Car and Driver Newsletter',
    description: 'Trust Car and Driver for the best car reviews, news, car rankings, and much more',
    logo: <CarAndDriverLogo />,
  },
];

const OnboardingStep4: React.FC = () => {
  const navigate = useNavigate();
  const [selectedNewsletters, setSelectedNewsletters] = useState<string[]>(['car-and-driver']);

  const toggleNewsletter = (newsletterId: string) => {
    setSelectedNewsletters(prev => 
      prev.includes(newsletterId) 
        ? prev.filter(id => id !== newsletterId)
        : [...prev, newsletterId]
    );
  };

  const handleFinish = () => {
    // Store newsletter preferences
    localStorage.setItem('onboarding_newsletters', JSON.stringify(selectedNewsletters));
    localStorage.setItem('onboarding_completed', 'true');
    navigate('/onboarding/welcome');
  };

  const handleBack = () => {
    navigate('/onboarding/step-3');
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    navigate('/onboarding/welcome');
  };

  return (
    <div className="onboarding-step4">
      <div className="step4-container">
        {/* Step Indicator - Speedometer Graphic */}
        <StepIndicator step={4} />

        {/* Header Section */}
        <header className="step4-header">
          <h1 className="step4-title">Let's Keep In Touch</h1>
          <p className="step4-subtitle">
            Select one of our newsletters that provide<br />
            car information suited to your needs
          </p>
        </header>

        {/* Newsletter Options */}
        <div className="step4-newsletters">
          {newsletters.map((newsletter) => (
            <button
              key={newsletter.id}
              className={`step4-newsletter-card ${selectedNewsletters.includes(newsletter.id) ? 'step4-newsletter-card--selected' : ''}`}
              onClick={() => toggleNewsletter(newsletter.id)}
              aria-pressed={selectedNewsletters.includes(newsletter.id)}
              type="button"
            >
              {/* Logo */}
              <div className="step4-newsletter-logo">
                {newsletter.logo}
              </div>

              {/* Content */}
              <div className="step4-newsletter-content">
                {/* Checkbox */}
                <div className={`step4-checkbox ${selectedNewsletters.includes(newsletter.id) ? 'step4-checkbox--checked' : ''}`}>
                  {selectedNewsletters.includes(newsletter.id) && <CheckIcon />}
                </div>

                <h3 className="step4-newsletter-title">{newsletter.title}</h3>
                <p className="step4-newsletter-description">{newsletter.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation - Using CTA classes from design system (same as Steps 1-3) */}
        <nav className="step4-navigation" aria-label="Onboarding navigation">
          <button 
            className="cta cta--md cta--secondary" 
            onClick={handleBack}
            type="button"
          >
            <ChevronLeftIcon />
            Back
          </button>

          <button 
            className="step4-skip" 
            onClick={handleSkip}
            type="button"
          >
            Skip this step
          </button>

          <button 
            className="cta cta--md cta--primary" 
            onClick={handleFinish}
            type="button"
          >
            Next
            <ChevronRightIcon />
          </button>
        </nav>

        {/* Car and Driver Logo */}
        <div className="step4-logo">
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e911a35f00029a6a6b/logo.svg" 
            alt="Car and Driver" 
            className="step4-logo-img"
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep4;
