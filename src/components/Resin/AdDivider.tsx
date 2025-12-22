import React from 'react';
import './AdDivider.css';

export interface AdDividerProps {
  /** Text to display */
  text?: string;
  /** Show ad placeholder */
  showAdPlaceholder?: boolean;
  /** Ad placeholder height */
  adHeight?: number;
  /** Variant style */
  variant?: 'default' | 'minimal' | 'prominent';
  /** Custom ad slot ID for tracking */
  adSlotId?: string;
}

export const AdDivider: React.FC<AdDividerProps> = ({
  text = 'Advertisement - Continue Reading Below',
  showAdPlaceholder = true,
  adHeight = 250,
  variant = 'default',
  adSlotId,
}) => {
  return (
    <div 
      className={`ad-divider ad-divider--${variant}`}
      data-ad-slot={adSlotId}
    >
      <div className="ad-divider__label">
        <span className="ad-divider__text">{text}</span>
      </div>
      
      {showAdPlaceholder && (
        <div 
          className="ad-divider__placeholder"
          style={{ height: adHeight }}
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
      )}
    </div>
  );
};

export default AdDivider;

