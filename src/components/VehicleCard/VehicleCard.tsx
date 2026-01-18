import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ChevronUp, ChevronDown, ChevronRight, Bookmark } from 'lucide-react';
import { OptimizedImage } from '../OptimizedImage';
import { Button } from '../Button';
import { useAuth } from '../../contexts/AuthContext';
import './VehicleCard.css';

// Official Car and Driver Badge URLs
const EDITORS_CHOICE_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE';
const TEN_BEST_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg';
const EV_OF_THE_YEAR_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ev-of-the-year.721e420.svg';

export interface YearDetail {
  year: number;
  price: string;
  rating: number;
}

// Map CTA variants to Button component variants
export type CTAVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'success-outline' | 'danger';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';

export interface CTAConfig {
  text: string;
  variant?: CTAVariant;
  onClick?: (e: React.MouseEvent) => void;
}

// Helper to map CTA variants to Button variants
const mapCtaToButtonVariant = (ctaVariant: CTAVariant = 'outline'): ButtonVariant => {
  const variantMap: Record<CTAVariant, ButtonVariant> = {
    primary: 'primary',
    secondary: 'secondary',
    outline: 'outline',
    success: 'success',
    'success-outline': 'success', // Button component handles success as outline style
    danger: 'danger',
  };
  return variantMap[ctaVariant];
};

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
  evOfTheYear?: boolean;
  
  // Used car specific
  year?: number;
  mileage?: number;
  dealerName?: string;
  distance?: number;
  trim?: string;
  
  // CTA - Legacy single button support
  showShopButton?: boolean;
  shopButtonText?: string;
  shopButtonVariant?: CTAVariant;
  onShopClick?: (e: React.MouseEvent) => void;
  
  // CTA - Multiple buttons support
  ctas?: CTAConfig[];
  
  // State
  isCurrentVehicle?: boolean;
  
  // New fields for enhanced card
  epaMpg?: number;
  cdSays?: string;
  availableYears?: number[];
  yearDetails?: YearDetail[];
  modelName?: string;

  // Save/Bookmark functionality
  showSaveButton?: boolean;
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
  evOfTheYear,
  mileage,
  dealerName,
  distance,
  trim,
  showShopButton = false,
  shopButtonText = 'Shop Now',
  shopButtonVariant = 'outline',
  onShopClick,
  ctas,
  isCurrentVehicle = false,
  epaMpg,
  cdSays,
  availableYears,
  yearDetails,
  modelName,
  showSaveButton = false,
}: VehicleCardProps) => {
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const navigate = useNavigate();
  const isUsedCar = !!mileage;
  // Enhanced card layout is no longer automatically triggered
  // All cards now use the standard layout with optional features
  const isEnhancedCard = false; // Disabled - using standard card for all

  const [isYearsExpanded, setIsYearsExpanded] = useState(false);
  const [isYearsClosing, setIsYearsClosing] = useState(false);
  
  // Extract model name from the full name (e.g., "Mazda CX-30" -> "CX-30")
  const displayModelName = modelName || name.split(' ').slice(1).join(' ') || name;
  
  // Check if vehicle is saved
  const isSaved = user?.savedVehicles?.some(v => v.name === name) || false;
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    
    if (isSaved) {
      const savedVehicle = user?.savedVehicles?.find(v => v.name === name);
      if (savedVehicle) {
        removeSavedVehicle(savedVehicle.id);
      }
    } else {
      addSavedVehicle({
        id: slug,
        name,
        ownership: 'want',
      });
    }
  };
  
  const handleShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShopClick) {
      onShopClick(e);
    }
  };

  const handleYearsToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isYearsExpanded) {
      // Start closing animation
      setIsYearsClosing(true);
      setTimeout(() => {
        setIsYearsExpanded(false);
        setIsYearsClosing(false);
      }, 300); // Match animation duration
    } else {
      setIsYearsExpanded(true);
    }
  };

  // Enhanced Card Layout (matches Figma design with Lora font)
  if (isEnhancedCard) {
    return (
      <div className="vehicle-card vehicle-card--enhanced">
        {/* Header with Title and Rating */}
        <div className="vehicle-card__header-enhanced">
          <h3 className="vehicle-card__name-enhanced">{name}</h3>
          {rating && (
            <div className="vehicle-card__rating-enhanced">
              <span className="vehicle-card__rating-score-enhanced">{rating}</span>
              <span className="vehicle-card__rating-max-enhanced">/10</span>
              <span className="vehicle-card__rating-label">C/D RATING</span>
            </div>
          )}
        </div>

        {/* Image */}
        <Link to={`/${slug}`} className="vehicle-card__image-link">
          <div className="vehicle-card__image">
            {/* Accolades Badges */}
            {(editorsChoice || tenBest || evOfTheYear || badge === 'editors-choice') && (
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
                {evOfTheYear && (
                  <div className="vehicle-card__accolade vehicle-card__accolade--ev">
                    <img 
                      src={EV_OF_THE_YEAR_BADGE_URL} 
                      alt="EV of the Year"
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
        </Link>

        {/* Content */}
        <div className="vehicle-card__content-enhanced">
          {/* Price Row with Shop Button */}
          <div className="vehicle-card__price-row">
            <div className="vehicle-card__price-enhanced">
              <span className="vehicle-card__price-label-enhanced">{priceLabel}</span>
              <span className="vehicle-card__price-value-enhanced">{price}</span>
            </div>
            {showShopButton && (
              <Button
                variant="outline"
                size="small"
                onClick={handleShopClick}
              >
                Shop Now
              </Button>
            )}
          </div>

          {/* EPA MPG */}
          {epaMpg && (
            <div className="vehicle-card__mpg">
              <span className="vehicle-card__mpg-label">EPA MPG</span>
              <span className="vehicle-card__mpg-value">
                <strong>{epaMpg}</strong> combined
              </span>
            </div>
          )}

          {/* Divider */}
          {cdSays && <hr className="vehicle-card__divider" />}

          {/* C/D Says Section */}
          {cdSays && (
            <div className="vehicle-card__cd-says">
              <p className="vehicle-card__cd-says-text">
                <strong>C/D SAYS:</strong> {cdSays}{' '}
                <Link to={`/${slug}`} className="vehicle-card__learn-more">
                  Learn More
                </Link>
              </p>
            </div>
          )}

          {/* Expand Model Years */}
          {availableYears && availableYears.length > 0 && (
            <Button 
              variant="ghost"
              size="small"
              className="vehicle-card__expand-years"
              onClick={handleYearsToggle}
              iconRight={<ChevronUp size={18} aria-hidden="true" />}
            >
              EXPAND ALL MODEL YEARS
            </Button>
          )}

          {/* Years List (expandable) */}
          {isYearsExpanded && availableYears && (
            <div className="vehicle-card__years-list">
              {availableYears.map((year) => (
                <Link 
                  key={year} 
                  to={`/${slug}/${year}`}
                  className="vehicle-card__year-link"
                >
                  {year}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard Card Layout (original)
  return (
    <Link
      to={`/${slug}`}
      className={`vehicle-card ${isCurrentVehicle ? 'vehicle-card--current' : ''} ${isUsedCar ? 'vehicle-card--used' : ''}`}
    >
      {/* Card Content - Header Section (Above Image) */}
      <div className="vehicle-card__content vehicle-card__content--top">
        <div className="vehicle-card__header">
          <div className="vehicle-card__name-wrapper">
            <h3 className="vehicle-card__name" title={name}>{name}</h3>
          </div>
          {rating && (
            <div className="vehicle-card__rating">
              <div className="vehicle-card__rating-row">
                <span className="vehicle-card__rating-score">{rating}</span>
                <span className="vehicle-card__rating-max">/10</span>
              </div>
              <span className="vehicle-card__rating-label">C/D RATING</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Image */}
      <div className="vehicle-card__image">
        {/* Rank Badge with Save Button (for Top 10) */}
        {rank && (
          <div className="vehicle-card__rank-container">
            <span className={`vehicle-card__rank ${rank === 1 ? 'vehicle-card__rank--first' : ''} ${isCurrentVehicle ? 'vehicle-card__rank--current' : ''}`}>
              {rank}
            </span>
            {showSaveButton && isAuthenticated && (
              <button
                className={`vehicle-card__rank-save ${isSaved ? 'vehicle-card__rank-save--saved' : ''}`}
                onClick={handleSaveClick}
                aria-label={isSaved ? 'Remove from saved' : 'Save vehicle'}
              >
                <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            )}
          </div>
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

        {/* Accolades Badges (Editor's Choice, 10Best, EV of the Year) - Small icon style */}
        {(editorsChoice || tenBest || evOfTheYear || badge === 'editors-choice') && (
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
            {evOfTheYear && (
              <div className="vehicle-card__accolade vehicle-card__accolade--ev">
                <img 
                  src={EV_OF_THE_YEAR_BADGE_URL} 
                  alt="EV of the Year"
                />
              </div>
            )}
          </div>
        )}

        {/* Save Button (only show when no rank - ranked cards have save in rank container) */}
        {showSaveButton && isAuthenticated && !rank && (
          <button
            className={`vehicle-card__save-btn ${isSaved ? 'vehicle-card__save-btn--saved' : ''}`}
            onClick={handleSaveClick}
            aria-label={isSaved ? 'Remove from saved' : 'Save vehicle'}
          >
            <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        )}

        <OptimizedImage 
          src={image} 
          alt={name}
          aspectRatio="16/10"
        />
      </div>

      {/* Card Content - Below Image */}
      <div className="vehicle-card__content vehicle-card__content--bottom">
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

        {/* Price Row with Shop Button(s) */}
        <div className="vehicle-card__price-row">
          <div className="vehicle-card__price">
            <span className="vehicle-card__price-label">{priceLabel}</span>
            <span className="vehicle-card__price-value">{price}</span>
          </div>
          <div className="vehicle-card__ctas">
            {/* Multiple CTAs */}
            {ctas && ctas.length > 0 ? (
              ctas.map((cta, index) => (
                <Button
                  key={index}
                  variant={mapCtaToButtonVariant(cta.variant)}
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cta.onClick?.(e);
                  }}
                >
                  {cta.text}
                </Button>
              ))
            ) : (
              /* Legacy single button */
              showShopButton && (
                <Button
                  variant={mapCtaToButtonVariant(shopButtonVariant)}
                  size="small"
                  onClick={handleShopClick}
                >
                  {shopButtonText}
                </Button>
              )
            )}
          </div>
        </div>

        {/* EPA MPG Row */}
        {epaMpg && (
          <div className="vehicle-card__mpg-row">
            <span className="vehicle-card__mpg-label">EPA MPG</span>
            <span className="vehicle-card__mpg-value">
              <strong>{epaMpg}</strong> combined
            </span>
          </div>
        )}

        {/* Divider before C/D Says */}
        {cdSays && (
          <hr className="vehicle-card__divider-standard" />
        )}

        {/* C/D Says Section */}
        {cdSays && (
          <div className="vehicle-card__cd-says-row">
            <span className="vehicle-card__cd-says-label">C/D SAYS: </span>
            <span className="vehicle-card__cd-says-text">{cdSays}</span>
            <span className="vehicle-card__cd-says-link">
              Learn More
            </span>
          </div>
        )}

        {/* Expand Model Years */}
        {availableYears && availableYears.length > 0 && !isYearsExpanded && (
          <Button 
            variant="ghost"
            size="small"
            className="vehicle-card__expand-years"
            onClick={handleYearsToggle}
            iconRight={<ChevronUp size={18} aria-hidden="true" />}
          >
            EXPAND ALL MODEL YEARS
          </Button>
        )}
      </div>

      {/* Years List (expandable) - Full Card Overlay */}
      {isYearsExpanded && availableYears && (
        <div className={`vehicle-card__years-overlay ${isYearsClosing ? 'vehicle-card__years-overlay--closing' : ''}`} onClick={(e) => e.preventDefault()}>
          <h4 className="vehicle-card__years-title">{displayModelName} Model Years</h4>
          <div className="vehicle-card__years-items">
            {availableYears.map((year) => {
              // Find year details if available, otherwise use current card's price/rating
              const detail = yearDetails?.find(d => d.year === year);
              const yearPrice = detail?.price || price;
              const yearRating = detail?.rating || rating;
              
              return (
                <button 
                  key={year} 
                  className="vehicle-card__year-item"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`/${year}/${slug.split('/').slice(1).join('/')}`);
                  }}
                >
                  <div className="vehicle-card__year-info">
                    <span className="vehicle-card__year-label">View {year} {displayModelName} Details</span>
                    <span className="vehicle-card__year-meta">Starting at {yearPrice} · {yearRating}/10</span>
                  </div>
                  <ChevronRight size={20} className="vehicle-card__year-arrow" aria-hidden="true" />
                </button>
              );
            })}
          </div>
          <Button 
            variant="ghost"
            size="small"
            className="vehicle-card__collapse-years"
            onClick={handleYearsToggle}
            iconRight={<ChevronDown size={18} aria-hidden="true" />}
          >
            COLLAPSE
          </Button>
        </div>
      )}
    </Link>
  );
};

export default VehicleCard;

