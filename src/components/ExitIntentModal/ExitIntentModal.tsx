import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, TrendingDown, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './ExitIntentModal.css';

interface ExitIntentModalProps {
  vehicleName?: string;
  vehicleImage?: string;
  isOpen?: boolean;
  onClose?: () => void;
  animationStyle?: 'default' | 'elegant';
  enableExitIntent?: boolean; // Whether to detect exit intent internally
}

const ExitIntentModal = ({ 
  vehicleName,
  vehicleImage,
  isOpen = false,
  onClose,
  animationStyle = 'elegant',
  enableExitIntent = false // Disabled by default - only Header should enable this
}: ExitIntentModalProps) => {
  const navigate = useNavigate();
  const { socialSignIn } = useAuth();
  // Use provided vehicle name or a generic fallback
  const displayVehicleName = vehicleName || 'Your favorite vehicle';
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Handle external isOpen prop
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
    // Only enable exit intent detection if explicitly enabled
    if (!enableExitIntent) return;

    // Check if modal has been shown before in this session
    const modalShown = sessionStorage.getItem('exitModalShown');
    if (modalShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitModalShown', 'true');
      }
    };

    // Add delay before enabling exit intent
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, enableExitIntent]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      if (onClose) {
        onClose();
      }
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store email for sign-up pre-fill
    if (email) {
      sessionStorage.setItem('signupEmail', email);
    }
    handleClose();
    // Navigate to sign-up page
    navigate('/sign-up');
  };

  const handleSocialLogin = async (provider: 'apple' | 'google') => {
    setIsSigningIn(true);
    try {
      await socialSignIn(provider);
      handleClose();
      // Navigate to onboarding - the auth context will handle redirect if already completed
      navigate('/onboarding/step-1');
    } catch (error) {
      console.error('Social sign-in failed:', error);
      setIsSigningIn(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`exit-modal__overlay ${isClosing ? 'exit-modal__overlay--closing' : ''} ${animationStyle === 'elegant' ? 'exit-modal__overlay--elegant' : ''}`} onClick={handleClose}>
      <div className={`exit-modal ${isClosing ? 'exit-modal--closing' : ''} ${animationStyle === 'elegant' ? 'exit-modal--elegant' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="exit-modal__close" onClick={handleClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Left Visual Panel */}
        <div 
          className="exit-modal__visual"
          style={vehicleImage ? { '--vehicle-image': `url(${vehicleImage})` } as React.CSSProperties : undefined}
        >
          <div className="exit-modal__visual-content">
            <h2 className="exit-modal__visual-title">
              Your Research.
              <span>Always Saved.</span>
            </h2>
            <p className="exit-modal__visual-subtitle">
              Join millions of car enthusiasts who never lose their research again.
            </p>
            
            {/* Floating Cards */}
            <div className="exit-modal__cards">
              <div className="exit-modal__card exit-modal__card--1">
                <Heart size={16} fill="currentColor" className="exit-modal__card-icon exit-modal__card-icon--heart" />
                <span>{displayVehicleName}</span>
              </div>
              <div className="exit-modal__card exit-modal__card--2">
                <TrendingDown size={16} className="exit-modal__card-icon exit-modal__card-icon--price" />
                <span>Price dropped $2,400!</span>
              </div>
              <div className="exit-modal__card exit-modal__card--3">
                <FileText size={16} className="exit-modal__card-icon exit-modal__card-icon--article" />
                <span>3 articles saved</span>
              </div>
            </div>

            {/* Car and Driver Logo - Animated White */}
            <div className="exit-modal__logo">
              <svg viewBox="0 0 1364 262" className="exit-modal__logo-svg" xmlns="http://www.w3.org/2000/svg">
                <title>Logo</title>
                <desc>Brand Logo for Car and Driver</desc>
                {/* C */}
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M68.022 210.901C74.858 210.901 76.91 205.432 76.91 197.571V146.641H132.626V199.276C132.626 231.41 116.903 261.83 72.468 261.83H62.554C15.04 261.83 0 233.462 0 194.496V65.289C0 28.712 16.408 0 62.213 0H72.468C117.588 0 132.626 25.978 132.626 59.473V101.177H76.91V61.869C76.91 53.667 74.858 49.222 67.682 49.222C60.502 49.222 58.452 52.982 58.452 61.869V197.571C58.452 206.114 60.846 210.901 68.022 210.901Z"/>
                {/* A */}
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M272.324 257.729H217.63L213.53 220.47H187.551L183.791 257.729H134.911L167.384 3.41907H236.774L272.324 257.729ZM192.681 170.223H208.402L200.54 92.9747L192.681 170.223Z"/>
                {/* R */}
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M366.797 3.41907C391.752 3.41907 408.842 18.1158 408.842 48.1925V81.6935C408.842 105.278 396.534 115.873 386.624 120.318C396.194 124.079 408.842 134.331 408.842 153.477V237.561C408.842 247.13 410.55 252.601 412.258 256.021V257.729H356.542C354.149 254.654 352.101 248.844 352.101 239.616V165.781C352.101 157.237 350.047 153.477 342.527 153.477H334.666V257.729H278.268V3.41907H366.797ZM334.665 105.623H341.845C349.021 105.623 352.1 102.203 352.1 93.3126V59.1349C352.1 50.245 350.391 47.1691 342.871 47.1691H334.666L334.665 105.623Z"/>
                {/* Red bar - white in this context */}
                <path className="exit-modal__logo-bar" d="M428.499 63.023H594.769V3.61597H428.5L428.499 63.023Z" fill="#FFFFFF"/>
                {/* Blue bar - white in this context */}
                <path className="exit-modal__logo-bar" d="M428.499 257.046H594.769V197.644H428.5L428.499 257.046Z" fill="#FFFFFF"/>
                {/* AND */}
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M481.039 182.672H461.599L460.098 167.332H449.987L448.607 182.672H430.7L442.597 77.9894H468.019L481.039 182.672ZM451.864 147.839H458.219L454.742 111.882L451.864 147.839Z"/>
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M486.974 182.672V77.9889H507.008L517.652 128.64V77.9889H535.31V182.671H517.152L504.881 128.077V182.672H486.974Z"/>
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M573.909 77.9874C585.429 77.9875 592.567 84.3239 592.567 101.067V158.609C592.567 174.929 586.18 182.672 574.035 182.672H544.356V77.9874H573.909ZM564.175 162.549H567.647C570.653 162.549 571.531 160.579 571.531 156.219V103.459C571.531 99.2341 570.653 97.4093 567.898 97.4093H564.175V162.549Z"/>
                {/* D */}
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M696.341 3.41907C727.79 3.41907 747.273 18.8019 747.273 59.4728V199.276C747.273 238.928 729.839 257.729 696.682 257.729H615.674V3.41907H696.341ZM671.389 208.852H679.251C687.454 208.852 689.847 204.065 689.847 193.469V65.2892C689.847 55.0342 687.453 50.589 679.933 50.589H671.389V208.852Z"/>
                {/* R */}
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M845.438 3.41907C870.393 3.41907 887.48 18.1158 887.48 48.1925V81.6935C887.48 105.278 875.177 115.873 865.264 120.318C874.833 124.079 887.48 134.331 887.48 153.477V237.561C887.48 247.13 889.191 252.601 890.899 256.021V257.729H835.183C832.79 254.654 830.738 248.844 830.738 239.616V165.781C830.738 157.237 828.689 153.477 821.169 153.477H813.307L813.308 257.729H756.907V3.41907H845.438ZM813.307 105.623H820.482C827.662 105.623 830.737 102.203 830.737 93.3126V59.1349C830.737 50.245 829.03 47.1691 821.51 47.1691H813.307V105.623Z"/>
                {/* I */}
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M956.492 257.732H900.092V3.41895H956.492V257.732Z"/>
                {/* V */}
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M1073.15 257.729H999.319L962.748 3.41895H1022.22L1037.6 162.705L1052.99 3.41895H1107.34L1073.15 257.729Z"/>
                {/* E */}
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M1113.59 257.729V3.41895H1219.21V56.0569H1169.3V99.4689H1209.3V153.477H1169.3V204.065H1221.26V257.729H1113.59Z"/>
                {/* R */}
                <path className="exit-modal__logo-letter" fill="#FFFFFF" d="M1285.45 47.1689H1293.65C1301.17 47.1689 1302.88 50.2449 1302.88 59.1349V93.313C1302.88 102.203 1299.81 105.623 1292.63 105.623H1285.45V47.1689ZM1285.45 153.477H1293.31C1300.83 153.477 1302.88 157.237 1302.88 165.781V239.616C1302.88 248.844 1304.93 254.654 1307.33 257.729H1363.04V256.021C1361.33 252.601 1359.62 247.131 1359.62 237.561V153.477C1359.62 134.331 1346.98 124.08 1337.41 120.319C1347.32 115.874 1359.62 105.279 1359.62 81.6939V48.1929C1359.62 18.1159 1342.54 3.41895 1317.58 3.41895H1229.05V257.729H1285.45V153.477Z"/>
              </svg>
            </div>

            {/* Stats */}
            <div className="exit-modal__stats">
              <div className="exit-modal__stat">
                <span className="exit-modal__stat-value">2.3M+</span>
                <span className="exit-modal__stat-label">Active Members</span>
              </div>
              <div className="exit-modal__stat">
                <span className="exit-modal__stat-value">15K+</span>
                <span className="exit-modal__stat-label">Reviews & Articles</span>
              </div>
              <div className="exit-modal__stat">
                <span className="exit-modal__stat-value">500K+</span>
                <span className="exit-modal__stat-label">Cars Saved Daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="exit-modal__form-panel">
          <div className="exit-modal__form-content">
            <h3 className="exit-modal__title">Create your free account</h3>
            <p className="exit-modal__subtitle">
              Save your research and get price alerts.
            </p>

            <form className="exit-modal__form" onSubmit={handleSubmit} autoComplete="on">
              <input
                type="email"
                name="email"
                inputMode="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="exit-modal__input"
                autoComplete="email"
                autoFocus
              />
              <button type="submit" className="exit-modal__submit">
                Continue
              </button>
            </form>

            <div className="exit-modal__divider">
              <span>or</span>
            </div>

            <div className="exit-modal__social">
              <button 
                className="exit-modal__social-btn" 
                onClick={() => handleSocialLogin('apple')}
                disabled={isSigningIn}
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#000" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                {isSigningIn ? 'Signing in...' : 'Continue with Apple'}
              </button>
              <button 
                className="exit-modal__social-btn exit-modal__social-btn--google" 
                onClick={() => handleSocialLogin('google')}
                disabled={isSigningIn}
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isSigningIn ? 'Signing in...' : 'Continue with Google'}
              </button>
            </div>

            <p className="exit-modal__terms">
              By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
            </p>
          </div>

          <button className="exit-modal__skip" onClick={handleClose}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentModal;
