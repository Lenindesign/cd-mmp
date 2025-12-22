import React from 'react';
import './ListicleCard.css';

export interface ListicleItem {
  id: string | number;
  imageUrl: string;
  imageAlt: string;
  headline: string;
  href?: string;
  sponsor?: string;
  itemNumber?: number;
}

export interface ListicleCardProps {
  /** Array of listicle items */
  items: ListicleItem[];
  /** Section title */
  title?: string;
  /** Number of columns (2, 3, or 4) */
  columns?: 2 | 3 | 4;
  /** Show item numbers */
  showNumbers?: boolean;
  /** Card variant */
  variant?: 'default' | 'compact' | 'featured';
  /** Link to view all */
  viewAllHref?: string;
  /** View all text */
  viewAllText?: string;
}

export const ListicleCard: React.FC<ListicleCardProps> = ({
  items,
  title,
  columns = 4,
  showNumbers = false,
  variant = 'default',
  viewAllHref,
  viewAllText = 'View All',
}) => {
  return (
    <section className={`listicle-card listicle-card--${variant} listicle-card--cols-${columns}`}>
      {title && (
        <header className="listicle-card__header">
          <h2 className="listicle-card__title">{title}</h2>
          {viewAllHref && (
            <a href={viewAllHref} className="listicle-card__view-all">
              {viewAllText}
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </header>
      )}

      <div className="listicle-card__grid">
        {items.map((item, index) => (
          <article key={item.id} className="listicle-card__item">
            <a 
              href={item.href || '#'} 
              className="listicle-card__link"
            >
              <div className="listicle-card__image-wrapper">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  className="listicle-card__image"
                  loading="lazy"
                />
                {showNumbers && (
                  <span className="listicle-card__number">
                    {item.itemNumber || index + 1}
                  </span>
                )}
              </div>

              <div className="listicle-card__content">
                {item.sponsor && (
                  <span className="listicle-card__sponsor">{item.sponsor}</span>
                )}
                <h3 className="listicle-card__headline">{item.headline}</h3>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ListicleCard;

