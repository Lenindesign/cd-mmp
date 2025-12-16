import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sign in - in a real app, this would call an auth API
    setTimeout(() => {
      setIsLoading(false);
      // After sign in, go to onboarding step 1
      navigate('/onboarding/step-1');
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Sign in with ${provider}`);
    // In a real app, this would initiate OAuth flow
    navigate('/onboarding/step-1');
  };

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
                required
              />
              <button 
                type="button"
                className="signin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
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
            {isLoading ? 'Signing in...' : 'Continue'}
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
            onClick={() => handleSocialLogin('Google')}
            type="button"
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
            onClick={() => handleSocialLogin('Facebook')}
            type="button"
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
            onClick={() => handleSocialLogin('Apple')}
            type="button"
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















