import { useState, useEffect } from 'react';
import { X, Bookmark, Heart, FileText, Mail } from 'lucide-react';
import './ExitIntentModal.css';

interface ExitIntentModalProps {
  vehicleName?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const ExitIntentModal = ({ 
  vehicleName = '2025 Chevrolet Trax',
  isOpen = false,
  onClose
}: ExitIntentModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);

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
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
    setIsVisible(false);
    // Show success message or redirect
  };

  if (!isVisible) return null;

  return (
    <div className="exit-modal__overlay" onClick={handleClose}>
      <div className="exit-modal" onClick={(e) => e.stopPropagation()}>
        <button className="exit-modal__close" onClick={handleClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="exit-modal__content">
          {/* Header */}
          <div className="exit-modal__header">
            <div className="exit-modal__icon">
              <span className="material-symbols-outlined">garage_home</span>
            </div>
            <h2 className="exit-modal__title">Don't Lose Your Research!</h2>
            <p className="exit-modal__subtitle">
              You've been researching the <strong>{vehicleName}</strong>. 
              Create a free account to save your progress.
            </p>
          </div>

          {/* Benefits */}
          <div className="exit-modal__benefits">
            <div className="exit-modal__benefit">
              <div className="exit-modal__benefit-icon">
                <Bookmark size={20} />
              </div>
              <div className="exit-modal__benefit-text">
                <strong>Save Listings</strong>
                <span>Bookmark vehicles you love</span>
              </div>
            </div>

            <div className="exit-modal__benefit">
              <div className="exit-modal__benefit-icon">
                <Heart size={20} />
              </div>
              <div className="exit-modal__benefit-text">
                <strong>Track Favorites</strong>
                <span>Compare your top picks</span>
              </div>
            </div>

            <div className="exit-modal__benefit">
              <div className="exit-modal__benefit-icon">
                <FileText size={20} />
              </div>
              <div className="exit-modal__benefit-text">
                <strong>Save Articles</strong>
                <span>Read reviews later</span>
              </div>
            </div>

            <div className="exit-modal__benefit">
              <div className="exit-modal__benefit-icon">
                <Mail size={20} />
              </div>
              <div className="exit-modal__benefit-text">
                <strong>Price Alerts</strong>
                <span>Get notified on deals</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="exit-modal__form" onSubmit={handleSubmit}>
            <div className="exit-modal__input-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="exit-modal__input"
                required
              />
              <button type="submit" className="exit-modal__submit">
                Sign Up Free
              </button>
            </div>
            <p className="exit-modal__terms">
              By signing up, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
            </p>
          </form>

          {/* Social Login */}
          <div className="exit-modal__divider">
            <span>or continue with</span>
          </div>

          <div className="exit-modal__social">
            <button className="exit-modal__social-btn exit-modal__social-btn--google">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="exit-modal__social-btn exit-modal__social-btn--apple">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </button>
          </div>

          {/* Skip */}
          <button className="exit-modal__skip" onClick={handleClose}>
            No thanks, I'll continue browsing
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentModal;

