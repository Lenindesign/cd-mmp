import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { OptimizedImage } from '../OptimizedImage';
import './VehicleCard.css';

// Editor's Choice Badge SVG Icon
const EditorsChoiceIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 261 240" width="20" height="18" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M259.43 93.03s4.576-5.936-2.599-8.963l-25.513-10.773s-7.173-3.029-6.438-10.284l2.61-25.654s.735-7.256-7.113-6.579l-27.969 2.403s-7.853.675-11.155-5.942L169.561 3.812s-3.305-6.617-9.745-2.415l-22.898 14.93s-6.44 4.202-12.881 0l-22.895-14.93S94.7-2.805 91.4 3.812L79.703 27.238s-3.302 6.617-11.155 5.942l-27.969-2.403s-7.849-.677-7.114 6.579l2.611 25.654s.737 7.255-6.438 10.284L4.125 84.067s-7.175 3.027-2.6 8.962l16.223 21.037s4.573 5.935 0 11.868L1.526 146.971s-4.576 5.935 2.6 8.964l25.512 10.773s7.175 3.027 6.438 10.283l-2.61 25.653s-.736 7.256 7.113 6.581l27.969-2.405s7.853-.675 11.155 5.942L91.4 236.188s3.3 6.617 9.742 2.415l22.895-14.933s6.441-4.199 12.881 0l22.898 14.933s6.44 4.202 9.745-2.415l11.692-23.426s3.302-6.617 11.155-5.942l27.969 2.405s7.848.675 7.113-6.581l-2.61-25.653s-.735-7.256 6.438-10.283l25.513-10.773s7.175-3.029 2.599-8.964l-16.22-21.037s-4.573-5.933 0-11.868l16.22-21.037Z" fill="#FEFEFE"/>
    <path fillRule="evenodd" clipRule="evenodd" fill="#1B5F8A" d="M184.986 99.46c-.14-4.326-.824-6.87-2.75-10.303-4.403-7.502-11.421-11.32-20.639-11.32-9.904 0-17.746 4.706-21.598 12.849-3.303 7.122-5.503 19.33-5.503 31.159 0 11.954 2.2 24.164 5.503 31.287 3.852 8.143 11.694 12.847 21.598 12.847 9.218 0 16.236-3.816 20.639-11.32 1.926-3.434 2.61-5.978 2.75-10.303h-12.931c-1.1 6.487-4.816 9.797-10.731 9.797-5.094 0-8.392-2.544-10.458-8.013-1.787-4.71-3.163-15.519-3.163-24.295 0-7.887 1.237-18.314 2.89-23.146 1.923-6.233 5.363-9.034 10.731-9.034 5.915 0 9.631 3.31 10.731 9.795h12.931ZM75.926 79.49v84.835h45.813v-11.828h-33.02v-28.109h19.537V112.56H88.72V91.318h31.506V79.49h-44.3Z"/>
  </svg>
);

export interface VehicleCardProps {
  // Vehicle Info
  id: string;
  name: string;
  slug: string;
  image: string;
  bodyStyle?: string;
  
  // Pricing
  price: string;
  priceLabel?: string;
  
  // Rating (for new vehicles)
  rating?: number;
  
  // Rank (for top 10)
  rank?: number;
  
  // Badges
  badge?: 'best-value' | 'editors-choice';
  editorsChoice?: boolean;
  tenBest?: boolean;
  
  // Used car specific
  year?: number;
  mileage?: number;
  dealerName?: string;
  distance?: number;
  trim?: string;
  
  // CTA
  showShopButton?: boolean;
  onShopClick?: (e: React.MouseEvent) => void;
  
  // State
  isCurrentVehicle?: boolean;
}

const getBadgeLabel = (badge: string) => {
  switch (badge) {
    case 'best-value': return 'Best Value';
    case 'editors-choice': return "Editor's Choice";
    default: return '';
  }
};

export const VehicleCard = ({
  name,
  slug,
  image,
  bodyStyle,
  price,
  priceLabel = 'Starting at',
  rating,
  rank,
  badge,
  editorsChoice,
  tenBest,
  mileage,
  dealerName,
  distance,
  trim,
  showShopButton = false,
  onShopClick,
  isCurrentVehicle = false,
}: VehicleCardProps) => {
  const isUsedCar = !!mileage;
  
  const handleShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShopClick) {
      onShopClick(e);
    }
  };

  return (
    <Link
      to={`/${slug}`}
      className={`vehicle-card ${isCurrentVehicle ? 'vehicle-card--current' : ''} ${isUsedCar ? 'vehicle-card--used' : ''}`}
    >
      {/* Card Image */}
      <div className="vehicle-card__image">
        {/* Rank Badge (for Top 10) */}
        {rank && (
          <span className={`vehicle-card__rank ${rank === 1 ? 'vehicle-card__rank--first' : ''} ${isCurrentVehicle ? 'vehicle-card__rank--current' : ''}`}>
            {rank === 1 && (
              <img 
                src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg" 
                alt="10Best"
                className="vehicle-card__rank-icon"
              />
            )}
            {rank}
          </span>
        )}

        {/* Body Style Badge */}
        {bodyStyle && !rank && (
          <span className="vehicle-card__body-style">{bodyStyle}</span>
        )}

        {/* Special Badge (Top 10) */}
        {badge && (
          <span className={`vehicle-card__badge vehicle-card__badge--${badge}`}>
            {badge === 'editors-choice' && (
              <EditorsChoiceIcon className="vehicle-card__badge-icon" />
            )}
            {getBadgeLabel(badge)}
          </span>
        )}

        {/* Accolades Badges (Editor's Choice, 10Best) */}
        {(editorsChoice || tenBest) && !badge && (
          <div className="vehicle-card__accolades">
            {editorsChoice && (
              <div className="vehicle-card__accolade vehicle-card__accolade--ec">
                <EditorsChoiceIcon />
              </div>
            )}
            {tenBest && (
              <div className="vehicle-card__accolade vehicle-card__accolade--10best">
                <img 
                  src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg" 
                  alt="10Best"
                  width="22"
                  height="25"
                />
              </div>
            )}
          </div>
        )}

        <OptimizedImage 
          src={image} 
          alt={name}
          aspectRatio="16/10"
        />
      </div>

      {/* Card Content */}
      <div className="vehicle-card__content">
        <div className="vehicle-card__header">
          <h3 className="vehicle-card__name">{name}</h3>
          {rating && (
            <div className="vehicle-card__rating">
              <span className="vehicle-card__rating-score">{rating}</span>
              <span className="vehicle-card__rating-max">/10</span>
            </div>
          )}
        </div>

        {/* Used Car Details */}
        {isUsedCar && (
          <div className="vehicle-card__used-details">
            {trim && <p className="vehicle-card__trim">{trim}</p>}
            {mileage && (
              <p className="vehicle-card__mileage">
                <MapPin size={12} />
                {mileage.toLocaleString()} miles
              </p>
            )}
            {dealerName && distance && (
              <p className="vehicle-card__dealer">
                {dealerName} • {distance} mi
              </p>
            )}
          </div>
        )}

        <p className="vehicle-card__price">
          <span className="vehicle-card__price-label">{priceLabel}</span>
          <span className="vehicle-card__price-value">{price}</span>
        </p>

        {/* Shop Button (for Top 10 cards) */}
        {showShopButton && (
          <button
            className="cta cta--primary cta--sm cta--full"
            onClick={handleShopClick}
          >
            SHOP NOW
          </button>
        )}
      </div>
    </Link>
  );
};

export default VehicleCard;

