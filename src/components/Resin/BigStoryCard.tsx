import React from 'react';
import './BigStoryCard.css';

export interface BigStoryCardProps {
  /** Image URL for the article */
  imageUrl: string;
  /** Alt text for the image */
  imageAlt: string;
  /** Optional sponsor/brand name */
  sponsor?: string;
  /** Optional category label */
  label?: string;
  /** Article headline */
  headline: string;
  /** Author name */
  author?: string;
  /** Publication date */
  date?: string;
  /** Link URL */
  href?: string;
  /** Image position - right or left */
  imagePosition?: 'right' | 'left';
  /** Optional click handler */
  onClick?: () => void;
}

export const BigStoryCard: React.FC<BigStoryCardProps> = ({
  imageUrl,
  imageAlt,
  sponsor,
  label,
  headline,
  author,
  date,
  href = '#',
  imagePosition = 'right',
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article className={`big-story-card big-story-card--image-${imagePosition}`}>
      <a 
        href={href} 
        className="big-story-card__link"
        onClick={handleClick}
      >
        <div className="big-story-card__image-container">
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="big-story-card__image"
            loading="lazy"
          />
        </div>
        
        <div className="big-story-card__content">
          {sponsor && (
            <span className="big-story-card__sponsor">{sponsor}</span>
          )}
          
          {label && (
            <span className="big-story-card__label">{label}</span>
          )}
          
          <h3 className="big-story-card__headline">{headline}</h3>
          
          <div className="big-story-card__meta">
            {author && (
              <span className="big-story-card__author">
                By <span className="big-story-card__author-name">{author}</span>
              </span>
            )}
            {date && (
              <time className="big-story-card__date">{date}</time>
            )}
          </div>
        </div>
      </a>
    </article>
  );
};

export default BigStoryCard;

