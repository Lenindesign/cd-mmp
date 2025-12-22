import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './OnboardingWelcome.css';

// Confetti Component
interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  
  const colors = ['#D2232A', '#0061AF', '#DBCA8B', '#26870D', '#1B5F8A', '#FFD700', '#FF6B6B', '#4ECDC4'];
  
  useEffect(() => {
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 150; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 6 + Math.random() * 8,
        rotation: Math.random() * 360,
      });
    }
    setPieces(newPieces);
    
    // Clean up after animation
    const timer = setTimeout(() => setPieces([]), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

// Chevron Icons (same as other steps)
const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// C and D Badge Logo for the card - uses 100% to fill parent container
const CandDBadge = () => (
  <div style={{
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'linear-gradient(180deg, #ffffff 0%, #000000 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1px',
  }}>
    <div style={{
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: 'linear-gradient(180deg, #cccccc 0%, #ffffff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5%',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <img 
        src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e911a35f00029a6a6b/logo.svg" 
        alt="Car and Driver" 
        style={{ 
          width: '100%', 
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  </div>
);

const OnboardingWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [showContent, setShowContent] = useState(false);
  const [userName, setUserName] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [myCar, setMyCar] = useState('');
  const [newsletter, setNewsletter] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setShowContent(true), 100);

    // Get user data from auth context
    if (user) {
      setUserName(user.name || 'Member');

      // Set member since date from user creation date
      const createdDate = user.createdAt ? new Date(user.createdAt) : new Date();
      const formattedDate = `${String(createdDate.getMonth() + 1).padStart(2, '0')}/${String(createdDate.getDate()).padStart(2, '0')}/${createdDate.getFullYear()}`;
      setMemberSince(formattedDate);

      // Get selected vehicles (first one as "My Car")
      if (user.savedVehicles && user.savedVehicles.length > 0) {
        setMyCar(user.savedVehicles[0].name);
      } else {
        setMyCar('Not specified');
      }

      // Get newsletter preference
      if (user.newsletterSubscriptions && user.newsletterSubscriptions.includes('car-and-driver')) {
        setNewsletter('Car and Driver');
      } else {
        setNewsletter('None selected');
      }
    }

    return () => clearTimeout(timer);
  }, [user]);

  const handleFinish = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/onboarding/step-4');
  };

  const handleSkip = () => {
    navigate('/');
  };

  // Get first name for display
  const firstName = userName.split(' ')[0] || 'Member';

  return (
    <div className="onboarding-welcome">
      <Confetti />
      <div className="welcome-container">
        {/* Car and Driver Logo */}
        <header className="welcome-header">
          <svg viewBox="0 0 1364 263" className="welcome-logo welcome-logo--animated" xmlns="http://www.w3.org/2000/svg" aria-label="Car and Driver">
            {/* C */}
            <path className="welcome-logo__letter" fill="currentColor" d="M76.91 198.564c0 7.861-2.052 13.33-8.888 13.33-7.176 0-9.57-4.787-9.57-13.33V62.862c0-8.887 2.05-12.647 9.23-12.647 7.176 0 9.228 4.445 9.228 12.647v39.308h55.716V60.466c0-33.495-15.038-59.473-60.158-59.473H62.213C16.408.993 0 29.705 0 66.282v129.207c0 38.966 15.04 67.334 62.554 67.334h9.914c44.435 0 60.158-30.42 60.158-62.554v-52.635H76.91z"/>
            {/* A */}
            <path className="welcome-logo__letter" fill="currentColor" d="M217.63 258.722h54.694l-35.55-254.31h-69.39l-32.473 254.31h48.88l3.76-37.259h25.979zM200.54 93.968l7.862 77.248H192.68z"/>
            {/* R */}
            <path className="welcome-logo__letter" fill="currentColor" d="M334.666 48.162h8.205c7.52 0 9.229 3.076 9.229 11.966v34.178c0 8.89-3.079 12.31-10.255 12.31h-7.18zm0 106.308h7.861c7.52 0 9.573 3.76 9.573 12.304v73.835c0 9.228 2.049 15.038 4.442 18.113h55.716v-1.708c-1.708-3.42-3.416-8.89-3.416-18.46V154.47c0-19.146-12.648-29.397-22.218-33.158 9.91-4.445 22.218-15.04 22.218-38.625V49.186c0-30.077-17.09-44.774-42.045-44.774h-88.53v254.31h56.399z"/>
            {/* Red bar */}
            <path className="welcome-logo__bar" d="M428.499 64.016h166.27V4.609H428.5z" fill="#d2232a"/>
            {/* Blue bar */}
            <path className="welcome-logo__bar" d="M428.499 258.039h166.27v-59.402H428.5z" fill="#0061af"/>
            {/* AND (small text) */}
            <path className="welcome-logo__letter" fill="currentColor" d="M453.644 183.665h19.441L468.018 78.982h-25.422L430.7 183.665h17.907l1.38-15.34h10.11zm-6.856-70.79 3.476 35.957h-6.354zm32.232-33.893v104.683h17.907V129.07l12.271 54.594h18.158V78.982h-17.658v50.651l-10.644-50.651zm57.382 104.683h29.679c12.145 0 18.532-7.742 18.532-24.063V102.06c0-16.743-7.138-23.08-18.658-23.08h-29.553zm19.819-85.263h3.724c2.755 0 3.632 1.825 3.632 6.05v52.76c0 4.36-.877 6.33-3.883 6.33h-3.473z"/>
            {/* D */}
            <path className="welcome-logo__letter" fill="currentColor" d="M615.674 258.722h81.008c33.157 0 50.592-18.801 50.592-58.453V60.466c0-40.671-19.484-56.054-50.933-56.054h-80.667zm55.715-207.14h8.544c7.52 0 9.914 4.445 9.914 14.7v128.18c0 10.596-2.393 15.383-10.596 15.383h-7.862z"/>
            {/* R */}
            <path className="welcome-logo__letter" fill="currentColor" d="M813.307 48.162h8.203c7.52 0 9.228 3.076 9.228 11.966v34.178c0 8.89-3.075 12.31-10.255 12.31h-7.176zm0 106.308h7.862c7.52 0 9.57 3.76 9.57 12.304v73.835c0 9.228 2.051 15.038 4.444 18.113H890.9v-1.708c-1.708-3.42-3.419-8.89-3.419-18.46V154.47c0-19.146-12.648-29.397-22.217-33.158 9.913-4.445 22.217-15.04 22.217-38.625V49.186c0-30.077-17.087-44.774-42.042-44.774h-88.532v254.31h56.401z"/>
            {/* I */}
            <path className="welcome-logo__letter" fill="currentColor" d="M900.092 258.722h56.4V4.412h-56.4z"/>
            {/* V */}
            <path className="welcome-logo__letter" fill="currentColor" d="M999.319 258.719h73.832l34.186-254.31h-54.349l-15.385 159.286-15.382-159.286h-59.473z"/>
            {/* E */}
            <path className="welcome-logo__letter" fill="currentColor" d="M1113.586 4.412v254.31h107.674v-53.664h-51.958V154.47h39.996v-54.008h-39.996V57.05h49.906V4.412z"/>
            {/* R */}
            <path className="welcome-logo__letter" fill="currentColor" d="M1285.454 48.162h8.2c7.52 0 9.228 3.076 9.228 11.966v34.178c0 8.89-3.075 12.31-10.255 12.31h-7.173zm0 106.308h7.859c7.52 0 9.57 3.76 9.57 12.304v73.835c0 9.228 2.051 15.038 4.444 18.113h55.716v-1.708c-1.708-3.42-3.419-8.89-3.419-18.46V154.47c0-19.146-12.645-29.397-22.217-33.158 9.913-4.445 22.217-15.04 22.217-38.625V49.186c0-30.077-17.087-44.774-42.042-44.774h-88.532v254.31h56.404z"/>
          </svg>
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
            Close
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default OnboardingWelcome;
