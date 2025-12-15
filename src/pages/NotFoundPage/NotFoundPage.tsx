import { useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found">
      <div className="not-found__container">
        {/* 404 Graphic */}
        <div className="not-found__graphic">
          <span className="not-found__number">404</span>
          <div className="not-found__car">
            <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>Lost Car</title>
              {/* Simple car illustration */}
              <rect x="40" y="40" width="120" height="40" rx="8" fill="var(--color-neutrals-3)" />
              <rect x="60" y="25" width="80" height="30" rx="6" fill="var(--color-neutrals-4)" />
              {/* Wheels */}
              <circle cx="70" cy="80" r="12" fill="var(--color-neutrals-1)" />
              <circle cx="70" cy="80" r="6" fill="var(--color-neutrals-6)" />
              <circle cx="130" cy="80" r="12" fill="var(--color-neutrals-1)" />
              <circle cx="130" cy="80" r="6" fill="var(--color-neutrals-6)" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="not-found__content">
          <h1 className="not-found__title">Page Not Found</h1>
          <p className="not-found__message">
            Looks like this page took a wrong turn. The vehicle you're looking for might have been moved or doesn't exist.
          </p>

          {/* Actions */}
          <div className="not-found__actions">
            <button 
              onClick={handleGoBack}
              className="not-found__btn not-found__btn--secondary"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
            <button 
              onClick={handleGoHome}
              className="not-found__btn not-found__btn--primary"
            >
              <Home size={18} />
              Go to Homepage
            </button>
          </div>

          {/* Suggestions */}
          <div className="not-found__suggestions">
            <h2 className="not-found__suggestions-title">
              <Search size={20} />
              What are you looking for?
            </h2>
            <div className="not-found__suggestions-grid">
              <a href="/?type=new" className="not-found__suggestion-card">
                <span className="not-found__suggestion-title">New Vehicles</span>
                <span className="not-found__suggestion-desc">Browse the latest models</span>
              </a>
              <a href="/?type=used" className="not-found__suggestion-card">
                <span className="not-found__suggestion-title">Used Vehicles</span>
                <span className="not-found__suggestion-desc">Find great deals</span>
              </a>
              <a href="/?bodyStyle=SUV" className="not-found__suggestion-card">
                <span className="not-found__suggestion-title">SUVs</span>
                <span className="not-found__suggestion-desc">Explore SUV options</span>
              </a>
              <a href="/?bodyStyle=Sedan" className="not-found__suggestion-card">
                <span className="not-found__suggestion-title">Sedans</span>
                <span className="not-found__suggestion-desc">View sedan models</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

