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

