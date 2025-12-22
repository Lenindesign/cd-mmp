import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './SignIn.css';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, socialSignIn, isAuthenticated, user, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

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
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Basic validation
    if (!email.trim()) {
      setLocalError('Please enter your email address');
      return;
    }
    if (!password) {
      setLocalError('Please enter your password');
      return;
    }

    try {
      await signIn({ email, password });
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

  return (
    <div className="signin-page">
      <div className="signin-container">
        {/* Logo */}
        <div className="signin-logo">
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e911a35f00029a6a6b/logo.svg" 
            alt="Car and Driver" 
            className="signin-logo-img"
          />
        </div>

        {/* Title */}
        <h1 className="signin-title">Sign In</h1>

        {/* Error Message */}
        {displayError && (
          <div className="signin-error" role="alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{displayError}</span>
          </div>
        )}

        {/* Form */}
        <form className="signin-form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="signin-field">
            <label className="signin-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="signin-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="signin-field">
            <label className="signin-label" htmlFor="password">Password</label>
            <div className="signin-password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="signin-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
                required
              />
              <button 
                type="button"
                className="signin-password-toggle"
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
          </div>

          {/* Forgot Password Link */}
          <Link to="/forgot-password" className="signin-forgot-link">
            Forgot or need a password?
          </Link>

          {/* Continue Button */}
          <button 
            type="submit" 
            className="signin-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="signin-spinner"></span>
                Signing in...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="signin-signup-text">
          Don't have an account? <Link to="/sign-up" className="signin-signup-link">Sign Up</Link>
        </p>

        {/* Divider */}
        <div className="signin-divider">
          <span>Or</span>
        </div>

        {/* Social Login Buttons */}
        <div className="signin-social-buttons">
          <button 
            className="signin-social-btn signin-social-btn--google"
            onClick={() => handleSocialLogin('google')}
            type="button"
            disabled={isLoading}
          >
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e311a35f00029a6a61/google.svg" 
              alt="" 
              className="signin-social-icon"
            />
            Continue with Google
          </button>

          <button 
            className="signin-social-btn signin-social-btn--facebook"
            onClick={() => handleSocialLogin('facebook')}
            type="button"
            disabled={isLoading}
          >
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e311a35f00029a6a5f/facebook.svg" 
              alt="" 
              className="signin-social-icon"
            />
            Continue with Facebook
          </button>

          <button 
            className="signin-social-btn signin-social-btn--apple"
            onClick={() => handleSocialLogin('apple')}
            type="button"
            disabled={isLoading}
          >
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e211a35f00029a6a5d/apple.svg" 
              alt="" 
              className="signin-social-icon"
            />
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
