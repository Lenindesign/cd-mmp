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

// C and D Badge Logo for the card - uses the official C/D icon with circular background
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
      padding: '15%',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <img 
        src="/cd-icon.svg" 
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
        {/* Car and Driver Logo - Animated */}
        <header className="welcome-header">
          <svg viewBox="0 0 1364 262" className="welcome-logo welcome-logo--animated" xmlns="http://www.w3.org/2000/svg" aria-label="Car and Driver">
            {/* C */}
            <path className="welcome-logo__letter" fill="currentColor" d="M68.022 210.901C74.858 210.901 76.91 205.432 76.91 197.571V146.641H132.626V199.276C132.626 231.41 116.903 261.83 72.468 261.83H62.554C15.04 261.83 0 233.462 0 194.496V65.289C0 28.712 16.408 0 62.213 0H72.468C117.588 0 132.626 25.978 132.626 59.473V101.177H76.91V61.869C76.91 53.667 74.858 49.222 67.682 49.222C60.502 49.222 58.452 52.982 58.452 61.869V197.571C58.452 206.114 60.846 210.901 68.022 210.901Z"/>
            {/* A */}
            <path className="welcome-logo__letter" fill="currentColor" d="M272.324 257.729H217.63L213.53 220.47H187.551L183.791 257.729H134.911L167.384 3.41907H236.774L272.324 257.729ZM192.681 170.223H208.402L200.54 92.9747L192.681 170.223Z"/>
            {/* R */}
            <path className="welcome-logo__letter" fill="currentColor" d="M366.797 3.41907C391.752 3.41907 408.842 18.1158 408.842 48.1925V81.6935C408.842 105.278 396.534 115.873 386.624 120.318C396.194 124.079 408.842 134.331 408.842 153.477V237.561C408.842 247.13 410.55 252.601 412.258 256.021V257.729H356.542C354.149 254.654 352.101 248.844 352.101 239.616V165.781C352.101 157.237 350.047 153.477 342.527 153.477H334.666V257.729H278.268V3.41907H366.797ZM334.665 105.623H341.845C349.021 105.623 352.1 102.203 352.1 93.3126V59.1349C352.1 50.245 350.391 47.1691 342.871 47.1691H334.666L334.665 105.623Z"/>
            {/* Red bar */}
            <path className="welcome-logo__bar" d="M428.499 63.023H594.769V3.61597H428.5L428.499 63.023Z" fill="#D2232A"/>
            {/* Blue bar */}
            <path className="welcome-logo__bar" d="M428.499 257.046H594.769V197.644H428.5L428.499 257.046Z" fill="#0061AF"/>
            {/* AND */}
            <path className="welcome-logo__letter" fill="currentColor" d="M481.039 182.672H461.599L460.098 167.332H449.987L448.607 182.672H430.7L442.597 77.9894H468.019L481.039 182.672ZM451.864 147.839H458.219L454.742 111.882L451.864 147.839Z"/>
            <path className="welcome-logo__letter" fill="currentColor" d="M486.974 182.672V77.9889H507.008L517.652 128.64V77.9889H535.31V182.671H517.152L504.881 128.077V182.672H486.974Z"/>
            <path className="welcome-logo__letter" fill="currentColor" d="M573.909 77.9874C585.429 77.9875 592.567 84.3239 592.567 101.067V158.609C592.567 174.929 586.18 182.672 574.035 182.672H544.356V77.9874H573.909ZM564.175 162.549H567.647C570.653 162.549 571.531 160.579 571.531 156.219V103.459C571.531 99.2341 570.653 97.4093 567.898 97.4093H564.175V162.549Z"/>
            {/* D */}
            <path className="welcome-logo__letter" fill="currentColor" d="M696.341 3.41907C727.79 3.41907 747.273 18.8019 747.273 59.4728V199.276C747.273 238.928 729.839 257.729 696.682 257.729H615.674V3.41907H696.341ZM671.389 208.852H679.251C687.454 208.852 689.847 204.065 689.847 193.469V65.2892C689.847 55.0342 687.453 50.589 679.933 50.589H671.389V208.852Z"/>
            {/* R */}
            <path className="welcome-logo__letter" fill="currentColor" d="M845.438 3.41907C870.393 3.41907 887.48 18.1158 887.48 48.1925V81.6935C887.48 105.278 875.177 115.873 865.264 120.318C874.833 124.079 887.48 134.331 887.48 153.477V237.561C887.48 247.13 889.191 252.601 890.899 256.021V257.729H835.183C832.79 254.654 830.738 248.844 830.738 239.616V165.781C830.738 157.237 828.689 153.477 821.169 153.477H813.307L813.308 257.729H756.907V3.41907H845.438ZM813.307 105.623H820.482C827.662 105.623 830.737 102.203 830.737 93.3126V59.1349C830.737 50.245 829.03 47.1691 821.51 47.1691H813.307V105.623Z"/>
            {/* I */}
            <path className="welcome-logo__letter" fill="currentColor" d="M956.492 257.732H900.092V3.41895H956.492V257.732Z"/>
            {/* V */}
            <path className="welcome-logo__letter" fill="currentColor" d="M1073.15 257.729H999.319L962.748 3.41895H1022.22L1037.6 162.705L1052.99 3.41895H1107.34L1073.15 257.729Z"/>
            {/* E */}
            <path className="welcome-logo__letter" fill="currentColor" d="M1113.59 257.729V3.41895H1219.21V56.0569H1169.3V99.4689H1209.3V153.477H1169.3V204.065H1221.26V257.729H1113.59Z"/>
            {/* R */}
            <path className="welcome-logo__letter" fill="currentColor" d="M1285.45 47.1689H1293.65C1301.17 47.1689 1302.88 50.2449 1302.88 59.1349V93.313C1302.88 102.203 1299.81 105.623 1292.63 105.623H1285.45V47.1689ZM1285.45 153.477H1293.31C1300.83 153.477 1302.88 157.237 1302.88 165.781V239.616C1302.88 248.844 1304.93 254.654 1307.33 257.729H1363.04V256.021C1361.33 252.601 1359.62 247.131 1359.62 237.561V153.477C1359.62 134.331 1346.98 124.08 1337.41 120.319C1347.32 115.874 1359.62 105.279 1359.62 81.6939V48.1929C1359.62 18.1159 1342.54 3.41895 1317.58 3.41895H1229.05V257.729H1285.45V153.477Z"/>
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
