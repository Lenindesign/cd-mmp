import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { OptimizedImage } from '../OptimizedImage';
import './VehicleCard.css';

// Official Car and Driver Badge URLs
const EDITORS_CHOICE_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE';
const TEN_BEST_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg';

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
            {rank}
          </span>
        )}

        {/* Body Style Badge */}
        {bodyStyle && !rank && (
          <span className="vehicle-card__body-style">{bodyStyle}</span>
        )}

        {/* Best Value Badge (text style) */}
        {badge === 'best-value' && (
          <span className="vehicle-card__badge vehicle-card__badge--best-value">
            {getBadgeLabel(badge)}
          </span>
        )}

        {/* Accolades Badges (Editor's Choice, 10Best) - Small icon style */}
        {(editorsChoice || tenBest || badge === 'editors-choice') && (
          <div className="vehicle-card__accolades">
            {(editorsChoice || badge === 'editors-choice') && (
              <div className="vehicle-card__accolade vehicle-card__accolade--ec">
                <img 
                  src={EDITORS_CHOICE_BADGE_URL} 
                  alt="Editor's Choice"
                />
              </div>
            )}
            {tenBest && (
              <div className="vehicle-card__accolade vehicle-card__accolade--10best">
                <img 
                  src={TEN_BEST_BADGE_URL} 
                  alt="10Best"
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

