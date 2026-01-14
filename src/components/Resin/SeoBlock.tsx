import React from 'react';
import './SeoBlock.css';

export interface SeoBlockItem {
  id: string | number;
  imageUrl: string;
  imageAlt: string;
  headline: string;
  href?: string;
}

export interface SeoBlockProps {
  /** Section title */
  title?: string;
  /** Array of content items */
  items: SeoBlockItem[];
  /** Number of columns */
  columns?: 3 | 4 | 6;
  /** Show section border */
  showBorder?: boolean;
  /** Variant style */
  variant?: 'default' | 'compact' | 'cards';
}

export const SeoBlock: React.FC<SeoBlockProps> = ({
  title,
  items,
  columns = 4,
  showBorder = true,
  variant = 'default',
}) => {
  return (
    <section className={`seo-block seo-block--${variant} seo-block--cols-${columns}`}>
      {title && (
        <header className={`seo-block__header ${showBorder ? 'seo-block__header--bordered' : ''}`}>
          <h2 className="seo-block__title">{title}</h2>
        </header>
      )}

      <div className="seo-block__grid">
        {items.map((item) => (
          <article key={item.id} className="seo-block__item">
            <a 
              href={item.href || '#'} 
              className="seo-block__link"
            >
              <div className="seo-block__image-wrapper">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  className="seo-block__image"
                  loading="lazy"
                />
              </div>
              <h3 className="seo-block__headline">{item.headline}</h3>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SeoBlock;

