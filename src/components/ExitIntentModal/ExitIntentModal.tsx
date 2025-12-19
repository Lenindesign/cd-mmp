import { useState, useEffect } from 'react';
import { X, Heart, TrendingDown, FileText } from 'lucide-react';
import './ExitIntentModal.css';

interface ExitIntentModalProps {
  vehicleName?: string;
  vehicleImage?: string;
  isOpen?: boolean;
  onClose?: () => void;
  animationStyle?: 'default' | 'elegant';
}

const ExitIntentModal = ({ 
  vehicleName = '2025 Kia Telluride EX',
  vehicleImage,
  isOpen = false,
  onClose,
  animationStyle = 'default'
}: ExitIntentModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Handle external isOpen prop
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
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
  }, [hasShown]);

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
    console.log('Email submitted:', email);
    handleClose();
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
                <span>{vehicleName}</span>
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

            {/* Car and Driver Logo */}
            <div className="exit-modal__logo">
              <svg viewBox="0 0 1364 263" xmlns="http://www.w3.org/2000/svg">
                <title>Logo</title>
                <desc>Brand Logo for Car and Driver</desc>
                <path fill="#FFFFFF" d="M76.91 198.564c0 7.861-2.052 13.33-8.888 13.33-7.176 0-9.57-4.787-9.57-13.33V62.862c0-8.887 2.05-12.647 9.23-12.647 7.176 0 9.228 4.445 9.228 12.647v39.308h55.716V60.466c0-33.495-15.038-59.473-60.158-59.473H62.213C16.408.993 0 29.705 0 66.282v129.207c0 38.966 15.04 67.334 62.554 67.334h9.914c44.435 0 60.158-30.42 60.158-62.554v-52.635H76.91zm140.72 60.158h54.694l-35.55-254.31h-69.39l-32.473 254.31h48.88l3.76-37.259h25.979zM200.54 93.968l7.862 77.248H192.68zm134.126-45.806h8.205c7.52 0 9.229 3.076 9.229 11.966v34.178c0 8.89-3.079 12.31-10.255 12.31h-7.18zm0 106.308h7.861c7.52 0 9.573 3.76 9.573 12.304v73.835c0 9.228 2.049 15.038 4.442 18.113h55.716v-1.708c-1.708-3.42-3.416-8.89-3.416-18.46V154.47c0-19.146-12.648-29.397-22.218-33.158 9.91-4.445 22.218-15.04 22.218-38.625V49.186c0-30.077-17.09-44.774-42.045-44.774h-88.53v254.31h56.399zm281.008 104.252h81.008c33.157 0 50.592-18.801 50.592-58.453V60.466c0-40.671-19.484-56.054-50.933-56.054h-80.667zm55.715-207.14h8.544c7.52 0 9.914 4.445 9.914 14.7v128.18c0 10.596-2.393 15.383-10.596 15.383h-7.862zm141.918-3.42h8.203c7.52 0 9.228 3.076 9.228 11.966v34.178c0 8.89-3.075 12.31-10.255 12.31h-7.176zm0 106.308h7.862c7.52 0 9.57 3.76 9.57 12.304v73.835c0 9.228 2.051 15.038 4.444 18.113H890.9v-1.708c-1.708-3.42-3.419-8.89-3.419-18.46V154.47c0-19.146-12.648-29.397-22.217-33.158 9.913-4.445 22.217-15.04 22.217-38.625V49.186c0-30.077-17.087-44.774-42.042-44.774h-88.532v254.31h56.401zm86.785 104.255h56.4V4.412h-56.4zm99.227-.003h73.832l34.186-254.31h-54.349l-15.385 159.286-15.382-159.286h-59.473zm114.267-254.31v254.31h107.674v-53.664h-51.958V154.47h39.996v-54.008h-39.996V57.05h49.906V4.412zm171.868 43.75h8.2c7.52 0 9.228 3.076 9.228 11.966v34.178c0 8.89-3.075 12.31-10.255 12.31h-7.173zm0 106.308h7.859c7.52 0 9.57 3.76 9.57 12.304v73.835c0 9.228 2.051 15.038 4.444 18.113h55.716v-1.708c-1.708-3.42-3.419-8.89-3.419-18.46V154.47c0-19.146-12.645-29.397-22.217-33.158 9.913-4.445 22.217-15.04 22.217-38.625V49.186c0-30.077-17.087-44.774-42.042-44.774h-88.532v254.31h56.404zm-823.856 29.195h19.441L468.018 78.982h-25.422L430.7 183.665h17.907l1.38-15.34h10.11zm-6.856-70.79 3.476 35.957h-6.354zm32.232-33.893v104.683h17.907V129.07l12.271 54.594h18.158V78.982h-17.658v50.651l-10.644-50.651zm57.382 104.683h29.679c12.145 0 18.532-7.742 18.532-24.063V102.06c0-16.743-7.138-23.08-18.658-23.08h-29.553zm19.819-85.263h3.724c2.755 0 3.632 1.825 3.632 6.05v52.76c0 4.36-.877 6.33-3.883 6.33h-3.473z"/>
                <path d="M428.499 64.016h166.27V4.609H428.5z" fill="#FFFFFF"/>
                <path d="M428.499 258.039h166.27v-59.402H428.5z" fill="#FFFFFF"/>
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

            <form className="exit-modal__form" onSubmit={handleSubmit}>
              <input
                type="text"
                inputMode="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="exit-modal__input"
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
              <button className="exit-modal__social-btn">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#000" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continue with Apple
              </button>
              <button className="exit-modal__social-btn exit-modal__social-btn--google">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
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
