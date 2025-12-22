import React from 'react';
import './ArticleCard.css';

export interface ArticleCardProps {
  /** Image URL for the article */
  imageUrl: string;
  /** Alt text for the image */
  imageAlt: string;
  /** Article headline */
  headline: string;
  /** Optional sponsor/brand name */
  sponsor?: string;
  /** Link URL */
  href?: string;
  /** Card layout variant */
  variant?: 'horizontal' | 'vertical' | 'compact';
  /** Image aspect ratio */
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  /** Optional click handler */
  onClick?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  imageUrl,
  imageAlt,
  headline,
  sponsor,
  href = '#',
  variant = 'horizontal',
  aspectRatio = 'portrait',
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article className={`article-card article-card--${variant}`}>
      <a 
        href={href} 
        className="article-card__link"
        onClick={handleClick}
      >
        <div className={`article-card__image-container article-card__image-container--${aspectRatio}`}>
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="article-card__image"
            loading="lazy"
          />
        </div>
        
        <div className="article-card__content">
          {sponsor && (
            <span className="article-card__sponsor">{sponsor}</span>
          )}
          
          <h3 className="article-card__headline">{headline}</h3>
        </div>
      </a>
    </article>
  );
};

export default ArticleCard;

