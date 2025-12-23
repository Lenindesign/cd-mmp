import { MapPin, Star, Phone, Navigation, Award, ChevronRight } from 'lucide-react';
import type { DealerWithScore } from '../../services/dealerService';
import { formatPrice, formatDistance, getPriceRange } from '../../services/dealerService';
import './DealerLocatorMap.css';

interface DealerCardProps {
  dealer: DealerWithScore;
  vehicleModel: string;
  isSelected?: boolean;
  variant?: 'full' | 'compact';
  onSelect?: (dealer: DealerWithScore) => void;
  onCallClick?: (dealer: DealerWithScore) => void;
  onDirectionsClick?: (dealer: DealerWithScore) => void;
}

const DealerCard = ({
  dealer,
  vehicleModel,
  isSelected = false,
  variant = 'full',
  onSelect,
  onCallClick,
  onDirectionsClick,
}: DealerCardProps) => {
  const handleCardClick = () => {
    onSelect?.(dealer);
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCallClick?.(dealer);
  };

  const handleDirectionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDirectionsClick?.(dealer);
  };

  const renderStars = (rating: number) => {
    return (
      <span className="dealer-card__stars">
        <Star size={14} fill="var(--color-gold)" stroke="var(--color-gold)" />
        <span>{rating.toFixed(1)}</span>
      </span>
    );
  };

  if (variant === 'compact') {
    return (
      <button
        className={`dealer-card dealer-card--compact ${isSelected ? 'dealer-card--selected' : ''}`}
        onClick={handleCardClick}
        aria-pressed={isSelected}
      >
        {dealer.dealScore.isBestDeal && (
          <span className="dealer-card__badge dealer-card__badge--best">
            <Award size={12} />
            Best Deal
          </span>
        )}
        
        <div className="dealer-card__header">
          <h3 className="dealer-card__name">{dealer.name}</h3>
          <ChevronRight size={16} className="dealer-card__chevron" />
        </div>
        
        <div className="dealer-card__meta">
          <span className="dealer-card__inventory">
            {dealer.inventoryCount} in stock · {formatPrice(dealer.lowestPrice)}
          </span>
          <span className="dealer-card__rating-distance">
            {renderStars(dealer.rating)} · {formatDistance(dealer.distance || 0)}
          </span>
        </div>
      </button>
    );
  }

  return (
    <article
      className={`dealer-card ${isSelected ? 'dealer-card--selected' : ''} ${dealer.dealScore.isBestDeal ? 'dealer-card--best-deal' : ''}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {dealer.dealScore.isBestDeal && (
        <div className="dealer-card__badge-row">
          <span className="dealer-card__badge dealer-card__badge--best">
            <Award size={14} />
            Best Deal
          </span>
        </div>
      )}
      
      <div className="dealer-card__content">
        <div className="dealer-card__header">
          <h3 className="dealer-card__name">{dealer.name}</h3>
        </div>
        
        <div className="dealer-card__inventory-row">
          <span className="dealer-card__inventory-count">
            {dealer.inventoryCount} {vehicleModel} in stock
          </span>
        </div>
        
        <div className="dealer-card__price-row">
          <span className="dealer-card__price">
            {getPriceRange(dealer.lowestPrice, dealer.highestPrice)}
          </span>
        </div>
        
        <div className="dealer-card__meta-row">
          <span className="dealer-card__rating">
            {renderStars(dealer.rating)}
            <span className="dealer-card__review-count">({dealer.reviewCount})</span>
          </span>
          <span className="dealer-card__distance">
            <MapPin size={14} />
            {formatDistance(dealer.distance || 0)}
          </span>
        </div>
        
        <div className="dealer-card__address">
          <span>{dealer.address}</span>
          <span>{dealer.city}, {dealer.state} {dealer.zipCode}</span>
        </div>
        
        <div className="dealer-card__actions">
          <a
            href={`tel:${dealer.phone.replace(/[^0-9]/g, '')}`}
            className="dealer-card__action dealer-card__action--call"
            onClick={handleCallClick}
            aria-label={`Call ${dealer.name}`}
          >
            <Phone size={16} />
            <span>Call</span>
          </a>
          
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${dealer.address}, ${dealer.city}, ${dealer.state} ${dealer.zipCode}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="dealer-card__action dealer-card__action--directions"
            onClick={handleDirectionsClick}
            aria-label={`Get directions to ${dealer.name}`}
          >
            <Navigation size={16} />
            <span>Directions</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default DealerCard;

