import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './SignUp.css';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, socialSignIn, isAuthenticated, user, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Pre-fill email from sessionStorage (from ExitIntentModal)
  useEffect(() => {
    const savedEmail = sessionStorage.getItem('signupEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      // Clear it after use
      sessionStorage.removeItem('signupEmail');
    }
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.onboardingCompleted) {
        navigate('/');
      } else {
        navigate('/onboarding/step-1');
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Clear errors when inputs change
  useEffect(() => {
    if (error) clearError();
    if (localError) setLocalError(null);
  }, [email, password, confirmPassword]);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(pwd)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(pwd)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Basic validation
    if (!email.trim()) {
      setLocalError('Please enter your email address');
      return;
    }
    if (!password) {
      setLocalError('Please enter a password');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setLocalError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setLocalError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      await signUp({ email, password });
      // Navigation handled by useEffect
    } catch {
      // Error is handled by the context
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      await socialSignIn(provider);
      // Navigation handled by useEffect
    } catch {
      // Error is handled by the context
    }
  };

  const displayError = localError || error;

  // Password strength indicator
  const getPasswordStrength = (): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { strength: 1, label: 'Weak', color: 'var(--color-error, #ef4444)' };
    if (score <= 4) return { strength: 2, label: 'Medium', color: 'var(--color-warning, #f59e0b)' };
    return { strength: 3, label: 'Strong', color: 'var(--color-success)' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Logo */}
        <div className="signup-logo">
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e911a35f00029a6a6b/logo.svg" 
            alt="Car and Driver" 
            className="signup-logo-img"
          />
        </div>

        {/* Title */}
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join Car and Driver to personalize your car shopping experience</p>

        {/* Error Message */}
        {displayError && (
          <div className="signup-error" role="alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{displayError}</span>
          </div>
        )}

        {/* Form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="signup-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="password">Password</label>
            <div className="signup-password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="signup-input"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="new-password"
                required
              />
              <button 
                type="button"
                className="signup-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="signup-password-strength">
                <div className="signup-strength-bars">
                  {[1, 2, 3].map((level) => (
                    <div 
                      key={level}
                      className="signup-strength-bar"
                      style={{ 
                        backgroundColor: level <= passwordStrength.strength ? passwordStrength.color : 'var(--color-gray-200)'
                      }}
                    />
                  ))}
                </div>
                <span className="signup-strength-label" style={{ color: passwordStrength.color }}>
                  {passwordStrength.label}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="confirm-password">Confirm Password</label>
            <div className="signup-password-wrapper">
              <input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                className="signup-input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="new-password"
                required
              />
              <button 
                type="button"
                className="signup-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <span className="signup-field-error">Passwords do not match</span>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="signup-terms">
            <label className="signup-checkbox-label">
              <input
                type="checkbox"
                className="signup-checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={isLoading}
              />
              <span className="signup-checkbox-custom"></span>
              <span className="signup-terms-text">
                I agree to the <Link to="/terms" className="signup-terms-link">Terms of Service</Link> and{' '}
                <Link to="/privacy" className="signup-terms-link">Privacy Policy</Link>
              </span>
            </label>
          </div>

          {/* Create Account Button */}
          <button 
            type="submit" 
            className="signup-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="signup-spinner"></span>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="signup-signin-text">
          Already have an account? <Link to="/sign-in" className="signup-signin-link">Sign In</Link>
        </p>

        {/* Divider */}
        <div className="signup-divider">
          <span>Or sign up with</span>
        </div>

        {/* Social Login Buttons */}
        <div className="signup-social-buttons">
          <button 
            className="signup-social-btn signup-social-btn--google"
            onClick={() => handleSocialLogin('google')}
            type="button"
            disabled={isLoading}
          >
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e311a35f00029a6a61/google.svg" 
              alt="" 
              className="signup-social-icon"
            />
            Google
          </button>

          <button 
            className="signup-social-btn signup-social-btn--facebook"
            onClick={() => handleSocialLogin('facebook')}
            type="button"
            disabled={isLoading}
          >
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e311a35f00029a6a5f/facebook.svg" 
              alt="" 
              className="signup-social-icon"
            />
            Facebook
          </button>

          <button 
            className="signup-social-btn signup-social-btn--apple"
            onClick={() => handleSocialLogin('apple')}
            type="button"
            disabled={isLoading}
          >
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e211a35f00029a6a5d/apple.svg" 
              alt="" 
              className="signup-social-icon"
            />
            Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


