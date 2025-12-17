import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingWelcome.css';

// Chevron Icons (same as other steps)
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

// Car and Driver Logo
const CarAndDriverLogo = () => (
  <svg viewBox="0 0 200 40" width="200" height="40" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="30" fontFamily="Arial Black, sans-serif" fontSize="28" fontWeight="900">
      <tspan fill="#1B5F8A">CAR</tspan>
      <tspan fill="#000" fontSize="14" dy="0">AND</tspan>
      <tspan fill="#E90C17" fontSize="28" dy="0">DRIVER</tspan>
    </text>
  </svg>
);

// C and D Badge Logo for the card - uses 100% to fill parent container
const CandDBadge = () => (
  <div style={{
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16%',
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

const OnboardingWelcome: React.FC = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [userName, setUserName] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [myCar, setMyCar] = useState('');
  const [newsletter, setNewsletter] = useState('');

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setShowContent(true), 100);

    // Get user data from localStorage
    const storedName = localStorage.getItem('onboarding_name') || 'Member';
    setUserName(storedName);

    // Set member since date (today)
    const today = new Date();
    const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
    setMemberSince(formattedDate);

    // Get selected vehicles (first one as "My Car")
    const selectedVehicles = JSON.parse(localStorage.getItem('onboarding_selected_vehicles') || '[]');
    if (selectedVehicles.length > 0) {
      setMyCar(selectedVehicles[0]);
    } else {
      setMyCar('Not specified');
    }

    // Get newsletter preference
    const newsletters = JSON.parse(localStorage.getItem('onboarding_newsletters') || '[]');
    if (newsletters.includes('car-and-driver')) {
      setNewsletter('Car and Driver');
    } else {
      setNewsletter('None selected');
    }

    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    localStorage.setItem('onboarding_complete', 'true');
    navigate('/');
  };

  const handleBack = () => {
    navigate('/onboarding/step-4');
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_complete', 'true');
    navigate('/');
  };

  // Get first name for display
  const firstName = userName.split(' ')[0] || 'Member';

  return (
    <div className="onboarding-welcome">
      <div className="welcome-container">
        {/* Car and Driver Logo */}
        <header className="welcome-header">
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e911a35f00029a6a6b/logo.svg" 
            alt="Car and Driver" 
            className="welcome-logo"
          />
        </header>

        {/* Welcome Message */}
        <div className={`welcome-content ${showContent ? 'welcome-content--visible' : ''}`}>
          <h1 className="welcome-title">Welcome to the Club, {firstName}!</h1>
          <p className="welcome-subtitle">Enjoy your Car And Driver member benefits.</p>

          {/* Membership Card */}
          <div className="membership-card-wrapper">
            <div className="membership-card">
              <div className="membership-card__inner">
                {/* Background watermark logo */}
                <img 
                  src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/logos/logo.68b8e69.svg?primary=%23fff" 
                  alt="" 
                  className="membership-card__watermark"
                  aria-hidden="true"
                />
                
                {/* Card Header */}
                <div className="membership-card__header">
                  <div className="membership-card__badge">
                    <CandDBadge />
                  </div>
                  <div className="membership-card__header-text">
                    <h2 className="membership-card__title">Membership Card</h2>
                    <p className="membership-card__subtitle">Car And Driver Member</p>
                  </div>
                </div>

                {/* Card Details - 2x2 Grid */}
                <div className="membership-card__details">
                  <div className="membership-card__field">
                    <span className="membership-card__label">Member Since</span>
                    <span className="membership-card__value">{memberSince}</span>
                  </div>
                  <div className="membership-card__field">
                    <span className="membership-card__label">Name</span>
                    <span className="membership-card__value">{userName}</span>
                  </div>
                  <div className="membership-card__field">
                    <span className="membership-card__label">My Car</span>
                    <span className="membership-card__value">{myCar}</span>
                  </div>
                  <div className="membership-card__field">
                    <span className="membership-card__label">Newsletter</span>
                    <span className="membership-card__value">{newsletter}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Consistent with other steps */}
        <nav className="welcome-navigation" aria-label="Onboarding navigation">
          <button 
            className="cta cta--md cta--secondary" 
            onClick={handleBack}
            type="button"
          >
            <ChevronLeftIcon />
            Back
          </button>

          <button 
            className="welcome-skip" 
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
      </div>
    </div>
  );
};

export default OnboardingWelcome;
