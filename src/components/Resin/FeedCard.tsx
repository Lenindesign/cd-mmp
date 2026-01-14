import React from 'react';
import './FeedCard.css';

export interface FeedCardProps {
  /** Article headline */
  headline: string;
  /** Image URL (optional for text-only variant) */
  imageUrl?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Author name */
  author?: string;
  /** Publication date */
  date?: string;
  /** Optional sponsor/brand name */
  sponsor?: string;
  /** Category or type label */
  label?: string;
  /** Link URL */
  href?: string;
  /** Card variant */
  variant?: 'default' | 'text-only' | 'compact';
  /** Optional click handler */
  onClick?: () => void;
}

export const FeedCard: React.FC<FeedCardProps> = ({
  headline,
  imageUrl,
  imageAlt = '',
  author,
  date,
  sponsor,
  label,
  href = '#',
  variant = 'default',
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const isTextOnly = variant === 'text-only' || !imageUrl;

  return (
    <article className={`feed-card feed-card--${variant} ${isTextOnly ? 'feed-card--text-only' : ''}`}>
      <a 
        href={href} 
        className="feed-card__link"
        onClick={handleClick}
      >
        {imageUrl && variant !== 'text-only' && (
          <div className="feed-card__image-container">
            <img 
              src={imageUrl} 
              alt={imageAlt} 
              className="feed-card__image"
              loading="lazy"
            />
          </div>
        )}
        
        <div className="feed-card__content">
          {(sponsor || label) && (
            <div className="feed-card__top-meta">
              {sponsor && (
                <span className="feed-card__sponsor">{sponsor}</span>
              )}
              {label && (
                <span className="feed-card__label">{label}</span>
              )}
            </div>
          )}
          
          <h3 className="feed-card__headline">{headline}</h3>
          
          <div className="feed-card__meta">
            {author && (
              <span className="feed-card__author">
                By <span className="feed-card__author-name">{author}</span>
              </span>
            )}
            {date && (
              <time className="feed-card__date">{date}</time>
            )}
          </div>
        </div>
      </a>
    </article>
  );
};

export default FeedCard;

