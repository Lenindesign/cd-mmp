import { useState } from 'react';
import './AdSidebar.css';

interface AdSidebarProps {
  imageUrl?: string;
  altText?: string;
  link?: string;
}

const AdSidebar = ({ 
  imageUrl = 'https://d2kde5ohu8qb21.cloudfront.net/files/69387d364230820002694996/300x600.jpg',
  altText = 'Advertisement',
  link = '#'
}: AdSidebarProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <aside className="ad-sidebar">
      <div className="ad-sidebar__container">
        <span className="ad-sidebar__label">Advertisement</span>
        {imageError ? (
          <div className="ad-sidebar__placeholder">
            <svg 
              width="32" 
              height="32" 
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
          <a href={link} className="ad-sidebar__link" target="_blank" rel="noopener noreferrer">
            {imageLoading && (
              <div className="ad-sidebar__loading">
                <div className="ad-sidebar__loading-spinner" />
              </div>
            )}
            <img 
              src={imageUrl} 
              alt={altText} 
              className={`ad-sidebar__image ${imageLoading ? 'ad-sidebar__image--loading' : ''}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </a>
        )}
      </div>
    </aside>
  );
};

export default AdSidebar;





























