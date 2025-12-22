import React, { useState } from 'react';
import './AdDivider.css';

export interface AdDividerProps {
  /** Text to display */
  text?: string;
  /** Show ad area */
  showAd?: boolean;
  /** Ad image URL */
  adImageUrl?: string;
  /** Ad link URL */
  adLinkUrl?: string;
  /** Ad alt text */
  adAltText?: string;
  /** Ad placeholder height (when no image) */
  adHeight?: number;
  /** Ad width (standard sizes: 728, 300, 970) */
  adWidth?: number;
  /** Variant style */
  variant?: 'default' | 'minimal' | 'prominent';
  /** Custom ad slot ID for tracking */
  adSlotId?: string;
}

export const AdDivider: React.FC<AdDividerProps> = ({
  text = 'Advertisement - Continue Reading Below',
  showAd = true,
  adImageUrl,
  adLinkUrl = '#',
  adAltText = 'Advertisement',
  adHeight = 90,
  adWidth = 728,
  variant = 'default',
  adSlotId,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const renderAdContent = () => {
    if (adImageUrl && !imageError) {
      const adImage = (
        <img
          src={adImageUrl}
          alt={adAltText}
          className="ad-divider__image"
          onError={handleImageError}
          style={{ maxWidth: adWidth, maxHeight: adHeight }}
        />
      );

      if (adLinkUrl && adLinkUrl !== '#') {
        return (
          <a 
            href={adLinkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ad-divider__link"
          >
            {adImage}
          </a>
        );
      }

      return adImage;
    }

    // Show placeholder when no image or image failed to load
    return (
      <div 
        className="ad-divider__placeholder"
        style={{ width: adWidth, height: adHeight }}
      >
        <div className="ad-divider__placeholder-content">
          <svg 
            width="24" 
            height="24" 
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
      </div>
    );
  };

  return (
    <div 
      className={`ad-divider ad-divider--${variant}`}
      data-ad-slot={adSlotId}
    >
      <div className="ad-divider__label">
        <span className="ad-divider__text">{text}</span>
      </div>
      
      {showAd && (
        <div className="ad-divider__container">
          {renderAdContent()}
        </div>
      )}
    </div>
  );
};

export default AdDivider;

