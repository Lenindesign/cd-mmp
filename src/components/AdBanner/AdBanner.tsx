import { useState } from 'react';
import './AdBanner.css';

interface AdBannerProps {
  imageUrl: string;
  altText?: string;
  link?: string;
}

const AdBanner = ({ imageUrl, altText = 'Advertisement', link }: AdBannerProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const adContent = imageError ? (
    <div className="ad-banner__placeholder">
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
      <span>Ad Space</span>
    </div>
  ) : (
    <img 
      src={imageUrl} 
      alt={altText} 
      className="ad-banner__image"
      onError={handleImageError}
      onLoad={handleImageLoad}
      style={{ display: imageLoading ? 'none' : 'block' }}
    />
  );

  return (
    <div className="ad-banner">
      <div className="ad-banner__header">
        <div className="ad-banner__header-line" />
        <span className="ad-banner__label">ADVERTISEMENT - CONTINUE READING BELOW</span>
        <div className="ad-banner__header-line" />
      </div>
      <div className="ad-banner__content">
        <div className="ad-banner__container">
          {link && !imageError ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="ad-banner__link">
              {adContent}
            </a>
          ) : (
            adContent
          )}
        </div>
      </div>
      <div className="ad-banner__line" />
    </div>
  );
};

export default AdBanner;

