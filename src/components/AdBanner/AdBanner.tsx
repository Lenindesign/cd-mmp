import { useState } from 'react';
import './AdBanner.css';

interface AdBannerProps {
  imageUrl: string;
  altText?: string;
  link?: string;
  hideHeader?: boolean;
  hideLine?: boolean;
  /** Hide header + line on desktop only (≥768px). Overrides hideHeader/hideLine on large screens. */
  minimalDesktop?: boolean;
  /** On mobile, swap to a 300×250 creative and hide the header/line entirely. */
  mobileCompact?: boolean;
  mobileImageUrl?: string;
}

const DEFAULT_MOBILE_AD_URL =
  'https://pub-4345f0f77c424370b4354c6a404ac802.r2.dev/300x250.jpg';

const AdBanner = ({ imageUrl, altText = 'Advertisement', link, hideHeader = false, hideLine = false, minimalDesktop = false, mobileCompact = false, mobileImageUrl = DEFAULT_MOBILE_AD_URL }: AdBannerProps) => {
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

  const classNames = [
    'ad-banner',
    minimalDesktop && 'ad-banner--minimal-desktop',
    mobileCompact && 'ad-banner--mobile-compact',
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {!hideHeader && (
        <div className="ad-banner__header">
          <div className="ad-banner__header-line" />
          <span className="ad-banner__label">ADVERTISEMENT - CONTINUE READING BELOW</span>
          <div className="ad-banner__header-line" />
        </div>
      )}
      <div className="ad-banner__content">
        <div className="ad-banner__container ad-banner__container--desktop">
          {link && !imageError ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="ad-banner__link">
              {adContent}
            </a>
          ) : (
            adContent
          )}
        </div>
        {mobileCompact && (
          <div className="ad-banner__container ad-banner__container--mobile">
            <img
              src={mobileImageUrl}
              alt={altText}
              className="ad-banner__image ad-banner__image--mobile"
            />
          </div>
        )}
      </div>
      {!hideLine && <div className="ad-banner__line" />}
    </div>
  );
};

export default AdBanner;

