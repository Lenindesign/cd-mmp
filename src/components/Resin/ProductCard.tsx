import React from 'react';
import './ProductCard.css';

export interface ProductCardProps {
  /** Product image URL */
  imageUrl: string;
  /** Alt text for the image */
  imageAlt: string;
  /** Product title/name */
  title: string;
  /** Brand name */
  brand?: string;
  /** Badge type for product */
  badge?: 'best-seller' | 'editors-choice' | 'sale' | 'new' | null;
  /** Custom tag/label text */
  tag?: string;
  /** Product description */
  description?: string;
  /** Price display */
  price?: string;
  /** Original price (for sale items) */
  originalPrice?: string;
  /** CTA button text */
  ctaText?: string;
  /** Link URL */
  href?: string;
  /** Optional click handler */
  onClick?: () => void;
}

const badgeLabels: Record<string, string> = {
  'best-seller': 'Best Seller',
  'editors-choice': "Editor's Choice",
  'sale': 'Sale',
  'new': 'New',
};

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  brand,
  badge,
  tag,
  description,
  price,
  originalPrice,
  ctaText = 'Shop Now',
  href = '#',
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article className="product-card">
      <a 
        href={href} 
        className="product-card__link"
        onClick={handleClick}
      >
        <div className="product-card__image-container">
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="product-card__image"
            loading="lazy"
          />
          {badge && (
            <span className={`product-card__badge product-card__badge--${badge}`}>
              {badgeLabels[badge]}
            </span>
          )}
        </div>
        
        <div className="product-card__content">
          {tag && (
            <span className="product-card__tag">{tag}</span>
          )}
          
          {brand && (
            <span className="product-card__brand">{brand}</span>
          )}
          
          <h3 className="product-card__title">{title}</h3>
          
          {(price || originalPrice) && (
            <div className="product-card__price-container">
              {price && <span className="product-card__price">{price}</span>}
              {originalPrice && (
                <span className="product-card__original-price">{originalPrice}</span>
              )}
            </div>
          )}
          
          <button className="product-card__cta" type="button">
            {ctaText}
          </button>
          
          {description && (
            <p className="product-card__description">{description}</p>
          )}
        </div>
      </a>
    </article>
  );
};

export default ProductCard;

