import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Bookmark, FileText, Play } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './SignInToSaveModal.css';

export type SaveItemType = 'vehicle' | 'article' | 'video';

interface SignInToSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: SaveItemType;
  itemName?: string;
  itemImage?: string;
}

const getItemTypeLabel = (type: SaveItemType): string => {
  switch (type) {
    case 'vehicle': return 'vehicle';
    case 'article': return 'article';
    case 'video': return 'video';
    default: return 'item';
  }
};

const getItemTypeIcon = (type: SaveItemType) => {
  switch (type) {
    case 'vehicle': return <Bookmark size={20} />;
    case 'article': return <FileText size={20} />;
    case 'video': return <Play size={20} />;
    default: return <Bookmark size={20} />;
  }
};

const SignInToSaveModal = ({ 
  isOpen,
  onClose,
  itemType,
  itemName,
  itemImage,
}: SignInToSaveModalProps) => {
  const navigate = useNavigate();
  const { socialSignIn } = useAuth();
  const [isClosing, setIsClosing] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleSignIn = () => {
    handleClose();
    navigate('/sign-in');
  };

  const handleCreateAccount = () => {
    handleClose();
    navigate('/sign-up');
  };

  const handleSocialLogin = async (provider: 'apple' | 'google') => {
    setIsSigningIn(true);
    try {
      await socialSignIn(provider);
      handleClose();
      // After sign in, user can save the item
    } catch (error) {
      console.error('Social sign-in failed:', error);
      setIsSigningIn(false);
    }
  };

  if (!isOpen) return null;

  const typeLabel = getItemTypeLabel(itemType);
  const TypeIcon = () => getItemTypeIcon(itemType);

  return (
    <div 
      className={`save-modal__overlay ${isClosing ? 'save-modal__overlay--closing' : ''}`} 
      onClick={handleClose}
    >
      <div 
        className={`save-modal ${isClosing ? 'save-modal--closing' : ''}`} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-modal-title"
      >
        <button 
          className="save-modal__close" 
          onClick={handleClose} 
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Icon Header */}
        <div className="save-modal__icon-header">
          <div className="save-modal__icon-circle">
            <TypeIcon />
          </div>
        </div>

        {/* Content */}
        <div className="save-modal__content">
          <h2 id="save-modal-title" className="save-modal__title">
            Sign in to save this {typeLabel}
          </h2>
          
          {itemName && (
            <p className="save-modal__item-name">{itemName}</p>
          )}
          
          <p className="save-modal__description">
            Create a free account to save {typeLabel}s, get price alerts, and access your research from any device.
          </p>

          {/* Preview Image (optional) */}
          {itemImage && (
            <div className="save-modal__preview">
              <img src={itemImage} alt={itemName || `${typeLabel} preview`} />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="save-modal__actions">
          {/* Social Sign In */}
          <div className="save-modal__social">
            <button 
              className="save-modal__social-btn save-modal__social-btn--apple" 
              onClick={() => handleSocialLogin('apple')}
              disabled={isSigningIn}
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              {isSigningIn ? 'Signing in...' : 'Continue with Apple'}
            </button>
            <button 
              className="save-modal__social-btn save-modal__social-btn--google" 
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

          <div className="save-modal__divider">
            <span>or</span>
          </div>

          {/* Email Sign In/Up */}
          <button 
            className="save-modal__btn save-modal__btn--primary"
            onClick={handleCreateAccount}
          >
            Create Free Account
          </button>
          
          <button 
            className="save-modal__btn save-modal__btn--secondary"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>

        {/* Terms */}
        <p className="save-modal__terms">
          By continuing, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default SignInToSaveModal;
