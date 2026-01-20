import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, Bookmark, FileText, Play } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { storeAuthUser, type GoogleUser } from '../GoogleOneTap/GoogleOneTap';
import { trackUserRegistration } from '../../utils/cdpTracking';
import './SignInToSaveModal.css';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const GOOGLE_SCRIPT_URL = 'https://accounts.google.com/gsi/client';

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

/**
 * Decode JWT token from Google
 */
const decodeJWT = (token: string): GoogleUser | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      given_name: payload.given_name,
      family_name: payload.family_name,
      picture: payload.picture,
      email_verified: payload.email_verified,
      locale: payload.locale,
    };
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
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
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  // Handle successful Google sign-in
  const handleGoogleCredentialResponse = useCallback((response: { credential: string }) => {
    console.log('[SignInToSaveModal] Google credential response received');
    
    const user = decodeJWT(response.credential);
    
    if (user) {
      console.log('[SignInToSaveModal] User decoded:', user.email);
      
      // Store user in localStorage
      storeAuthUser(user);
      
      // Notify AuthContext so Header can show user and avatar
      window.dispatchEvent(new CustomEvent('auth-google-signin', { detail: user }));

      // Track registration with CDP
      trackUserRegistration('google_one_tap', {
        email: user.email,
        name: user.name,
        user_id: user.id,
      });
      
      // Close modal after successful sign-in
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, 200);
    } else {
      console.error('[SignInToSaveModal] Failed to decode user information');
      setIsSigningIn(false);
    }
  }, [onClose]);

  // Load Google Identity Services script
  useEffect(() => {
    if (!isOpen || scriptLoadedRef.current) return;

    // Check if script is already loaded
    if (window.google?.accounts?.id) {
      console.log('[SignInToSaveModal] Google script already loaded');
      setIsGoogleReady(true);
      scriptLoadedRef.current = true;
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(`script[src="${GOOGLE_SCRIPT_URL}"]`);
    if (existingScript) {
      console.log('[SignInToSaveModal] Script tag exists, waiting for load');
      existingScript.addEventListener('load', () => {
        setIsGoogleReady(true);
        scriptLoadedRef.current = true;
      });
      // Also check if it's already loaded
      if (window.google?.accounts?.id) {
        setIsGoogleReady(true);
        scriptLoadedRef.current = true;
      }
      return;
    }

    console.log('[SignInToSaveModal] Loading Google Identity Services script');
    
    const script = document.createElement('script');
    script.src = GOOGLE_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('[SignInToSaveModal] Script loaded');
      setIsGoogleReady(true);
      scriptLoadedRef.current = true;
    };
    
    script.onerror = () => {
      console.error('[SignInToSaveModal] Failed to load Google Identity Services script');
    };
    
    document.head.appendChild(script);
  }, [isOpen]);

  // Initialize Google button when ready
  useEffect(() => {
    if (!isOpen || !isGoogleReady || !googleButtonRef.current || !GOOGLE_CLIENT_ID) return;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) return;

      console.log('[SignInToSaveModal] Initializing Google button');

      try {
        // Initialize Google Identity Services
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: false,
          context: 'signin',
          itp_support: true,
          use_fedcm_for_prompt: false,
        });

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: googleButtonRef.current.offsetWidth || 320,
        });

        console.log('[SignInToSaveModal] Google button rendered');
      } catch (error) {
        console.error('[SignInToSaveModal] Error initializing Google button:', error);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isOpen, isGoogleReady, handleGoogleCredentialResponse]);

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

  const handleAppleLogin = async () => {
    setIsSigningIn(true);
    try {
      await socialSignIn('apple');
      handleClose();
    } catch (error) {
      console.error('Apple sign-in failed:', error);
      setIsSigningIn(false);
    }
  };

  if (!isOpen) return null;

  const typeLabel = getItemTypeLabel(itemType);
  const TypeIcon = () => getItemTypeIcon(itemType);

  // Use portal to render modal at document body level (prevents rendering inside cards/links)
  return createPortal(
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
              onClick={handleAppleLogin}
              disabled={isSigningIn}
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              {isSigningIn ? 'Signing in...' : 'Continue with Apple'}
            </button>
            {/* Google One Tap Button Container */}
            <div 
              ref={googleButtonRef} 
              className="save-modal__google-btn-container"
              style={{ minHeight: '44px' }}
            />
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
    </div>,
    document.body
  );
};

export default SignInToSaveModal;
