import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './OnboardingStep1.css';

// Speedometer Step Indicator Component
const StepIndicator: React.FC<{ step: number }> = ({ step }) => {
  // Use the provided step graphics from the database
  const stepImages: Record<number, string> = {
    1: 'https://d2kde5ohu8qb21.cloudfront.net/files/693c48e811a35f00029a6a69/step1.svg',
    2: 'https://d2kde5ohu8qb21.cloudfront.net/files/693c48e711a35f00029a6a67/step2.svg',
    3: 'https://d2kde5ohu8qb21.cloudfront.net/files/693c48e611a35f00029a6a65/step3.svg',
    4: 'https://d2kde5ohu8qb21.cloudfront.net/files/693c48e611a35f00029a6a63/step4.svg',
  };

  return (
    <div className="step-indicator">
      <img 
        src={stepImages[step]} 
        alt={`Step ${step} of 4`} 
        className="step-indicator-img"
      />
    </div>
  );
};

// Location Icon Component (clickable for geolocation)
interface LocationIconProps {
  onClick?: () => void;
  isLoading?: boolean;
}

const LocationIcon: React.FC<LocationIconProps> = ({ onClick, isLoading }) => (
  <button
    type="button"
    className={`step1-location-btn ${isLoading ? 'step1-location-btn--loading' : ''}`}
    onClick={onClick}
    title="Use my current location"
    aria-label="Detect my location"
  >
    {isLoading ? (
      <svg 
        className="step1-location-icon step1-location-icon--spinning" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.4 31.4" />
      </svg>
    ) : (
      <svg 
        className="step1-location-icon" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path 
          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" 
          fill="currentColor"
        />
      </svg>
    )}
  </button>
);

// Chevron Left Icon Component
const ChevronLeftIcon: React.FC = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 18 18" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      d="M11.25 13.5L6.75 9L11.25 4.5" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Chevron Right Icon Component
const ChevronRightIcon: React.FC = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 18 18" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      d="M6.75 4.5L11.25 9L6.75 13.5" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const OnboardingStep1: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  // Pre-fill with existing user data
  useEffect(() => {
    if (user) {
      if (user.name) setName(user.name);
      if (user.location) setLocation(user.location);
    }
  }, [user]);

  // Reverse geocode coordinates to city name
  const reverseGeocode = useCallback(async (lat: number, lon: number): Promise<string> => {
    try {
      // Using OpenStreetMap's Nominatim API (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en-US,en',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location');
      }
      
      const data = await response.json();
      
      // Extract city, state from the response
      const address = data.address;
      const city = address.city || address.town || address.village || address.municipality || address.county;
      const state = address.state;
      
      if (city && state) {
        return `${city}, ${state}`;
      } else if (city) {
        return city;
      } else if (state) {
        return state;
      }
      
      return data.display_name?.split(',').slice(0, 2).join(',') || 'Location found';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw new Error('Could not determine city name');
    }
  }, []);

  // Handle geolocation detection
  const handleDetectLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const cityName = await reverseGeocode(latitude, longitude);
          setLocation(cityName);
          setIsLoadingLocation(false);
        } catch (error) {
          setLocationError('Could not determine your city');
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        setIsLoadingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enter manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location unavailable. Please enter manually.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again.');
            break;
          default:
            setLocationError('Could not detect location. Please enter manually.');
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  }, [reverseGeocode]);

  const handleNext = async () => {
    // Save to user profile
    try {
      await updateUser({
        name: name || user?.name,
        location: location || user?.location,
      });
    } catch (err) {
      console.error('Failed to save user data:', err);
    }
    navigate('/onboarding/step-2');
  };

  const handleSkip = () => {
    navigate('/onboarding/step-2');
  };

  const handleBack = () => {
    navigate('/sign-in');
  };

  return (
    <div className="onboarding-step1">
      <div className="step1-container">
        {/* Step Indicator - Speedometer */}
        <StepIndicator step={1} />

        {/* Header Text */}
        <header className="step1-header">
          <span className="step1-subtitle">Start Your Engines</span>
          <h1 className="step1-title">Let's get to know each other</h1>
        </header>

        {/* Form Card - Using form element for browser autocomplete support */}
        <form 
          className="step1-card" 
          aria-label="Personal information"
          autoComplete="on"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          {/* Name Field */}
          <div className="step1-field">
            <label htmlFor="name-input" className="step1-label">
              WHAT IS YOUR NAME?
            </label>
            <div className="step1-input-wrapper">
              <input
                id="name-input"
                name="fullname"
                type="text"
                className="step1-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => e.target.select()}
                autoComplete="name"
              />
            </div>
          </div>

          {/* Location Field */}
          <div className="step1-field">
            <label htmlFor="location-input" className="step1-label">
              WHERE ARE YOU LOCATED? (OPTIONAL)
            </label>
            <div className="step1-input-wrapper step1-input-with-icon">
              <input
                id="location-input"
                name="city"
                type="text"
                className="step1-input"
                placeholder="Enter city or click icon to detect"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setLocationError(null);
                }}
                onFocus={(e) => e.target.select()}
                autoComplete="address-level2"
                disabled={isLoadingLocation}
              />
              <LocationIcon 
                onClick={handleDetectLocation} 
                isLoading={isLoadingLocation}
              />
            </div>
            {locationError && (
              <span className="step1-location-error">{locationError}</span>
            )}
          </div>
        </form>

        {/* Navigation - Using CTA classes from design system */}
        <nav className="step1-navigation" aria-label="Onboarding navigation">
          <button 
            className="cta cta--md cta--secondary" 
            onClick={handleBack}
            type="button"
          >
            <ChevronLeftIcon />
            Back
          </button>

          <button 
            className="step1-skip" 
            onClick={handleSkip}
            type="button"
          >
            Skip this step
          </button>

          <button 
            className="cta cta--md cta--primary" 
            onClick={handleNext}
            type="button"
          >
            Next
            <ChevronRightIcon />
          </button>
        </nav>

        {/* Car and Driver Logo */}
        <div className="step1-logo">
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/693c48e911a35f00029a6a6b/logo.svg" 
            alt="Car and Driver" 
            className="step1-logo-img"
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1;
