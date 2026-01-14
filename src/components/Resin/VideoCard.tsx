import React from 'react';
import './VideoCard.css';

export interface VideoCardProps {
  /** Video thumbnail image URL */
  thumbnailUrl: string;
  /** Alt text for the thumbnail */
  thumbnailAlt: string;
  /** Video title/headline */
  title: string;
  /** Video duration (e.g., "3:45") */
  duration?: string;
  /** Optional overlay text on the thumbnail */
  overlayText?: string;
  /** Optional sponsor/brand name */
  sponsor?: string;
  /** Category or type label */
  label?: string;
  /** Author name */
  author?: string;
  /** Publication date */
  date?: string;
  /** Link URL or video URL */
  href?: string;
  /** Card size variant */
  variant?: 'large' | 'medium' | 'small';
  /** Optional click handler */
  onClick?: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  thumbnailUrl,
  thumbnailAlt,
  title,
  duration,
  overlayText,
  sponsor,
  label,
  author,
  date,
  href = '#',
  variant = 'large',
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article className={`video-card video-card--${variant}`}>
      <a 
        href={href} 
        className="video-card__link"
        onClick={handleClick}
      >
        <div className="video-card__thumbnail-container">
          <img 
            src={thumbnailUrl} 
            alt={thumbnailAlt} 
            className="video-card__thumbnail"
            loading="lazy"
          />
          
          {/* Play button overlay */}
          <div className="video-card__play-overlay">
            <div className="video-card__play-button">
              <svg 
                className="video-card__play-icon" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          
          {/* Duration badge */}
          {duration && (
            <span className="video-card__duration">{duration}</span>
          )}
          
          {/* Overlay text */}
          {overlayText && (
            <div className="video-card__overlay-text">
              {overlayText}
            </div>
          )}
        </div>
        
        <div className="video-card__content">
          {sponsor && (
            <span className="video-card__sponsor">{sponsor}</span>
          )}
          
          {label && (
            <span className="video-card__label">{label}</span>
          )}
          
          <h3 className="video-card__title">{title}</h3>
          
          {(author || date) && (
            <div className="video-card__meta">
              {author && (
                <span className="video-card__author">
                  By <span className="video-card__author-name">{author}</span>
                </span>
              )}
              {date && (
                <time className="video-card__date">{date}</time>
              )}
            </div>
          )}
        </div>
      </a>
    </article>
  );
};

export default VideoCard;

