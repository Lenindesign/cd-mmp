import React from 'react';
import './OnboardingLayout.css';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  showProgress?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentStep = 1,
  totalSteps = 4,
  showProgress = true,
  showBackButton = false,
  onBack,
}) => {
  return (
    <div className="onboarding-layout">
      {/* Background decorative elements */}
      <div className="onboarding-layout__bg-decoration">
        <div className="onboarding-layout__bg-circle onboarding-layout__bg-circle--1" />
        <div className="onboarding-layout__bg-circle onboarding-layout__bg-circle--2" />
        <div className="onboarding-layout__bg-circle onboarding-layout__bg-circle--3" />
      </div>

      {/* Header */}
      <header className="onboarding-header">
        <div className="onboarding-header__content">
          {showBackButton && onBack && (
            <button className="onboarding-header__back" onClick={onBack} aria-label="Go back">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e911a35f00029a6a6b/logo.svg" 
            alt="Car and Driver" 
            className="onboarding-header__logo"
          />

          {showProgress && (
            <div className="onboarding-header__progress">
              <span className="onboarding-header__step-text">
                STEP {currentStep}/{totalSteps}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="onboarding-main">
        {children}
      </main>
    </div>
  );
};

export default OnboardingLayout;





















