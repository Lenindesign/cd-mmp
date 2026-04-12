import { useState } from 'react';
import './GridAd.css';

const DEFAULT_AD_URL =
  'https://d2kde5ohu8qb21.cloudfront.net/files/69387d364230820002694996/300x250.jpg';

interface GridAdProps {
  imageUrl?: string;
  altText?: string;
  link?: string;
}

const GridAd = ({
  imageUrl = DEFAULT_AD_URL,
  altText = 'Advertisement',
  link = '#',
}: GridAdProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="grid-ad" role="complementary" aria-label="Advertisement">
      <span className="grid-ad__label">Advertisement</span>
      <div className="grid-ad__container">
        {imageError ? (
          <div className="grid-ad__placeholder">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            <span>Ad Space</span>
          </div>
        ) : (
          <a href={link} target="_blank" rel="noopener noreferrer" className="grid-ad__link">
            {imageLoading && (
              <div className="grid-ad__loading">
                <div className="grid-ad__loading-spinner" />
              </div>
            )}
            <img
              src={imageUrl}
              alt={altText}
              className={`grid-ad__image ${imageLoading ? 'grid-ad__image--loading' : ''}`}
              onError={() => { setImageError(true); setImageLoading(false); }}
              onLoad={() => setImageLoading(false)}
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default GridAd;
