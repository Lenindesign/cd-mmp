import { useState, useEffect } from 'react';
import { X, Heart, TrendingDown, FileText } from 'lucide-react';
import './ExitIntentModal.css';

interface ExitIntentModalProps {
  vehicleName?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const ExitIntentModal = ({ 
  vehicleName = '2025 Kia Telluride EX',
  isOpen = false,
  onClose
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
    <div className={`exit-modal__overlay ${isClosing ? 'exit-modal__overlay--closing' : ''}`} onClick={handleClose}>
      <div className={`exit-modal ${isClosing ? 'exit-modal--closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="exit-modal__close" onClick={handleClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Left Visual Panel */}
        <div className="exit-modal__visual">
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
