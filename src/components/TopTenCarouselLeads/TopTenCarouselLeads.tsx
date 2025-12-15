import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, ArrowRight, Trophy } from 'lucide-react';

// Editor's Choice Badge SVG Icon
const EditorsChoiceIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 261 240" width="16" height="14" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M259.43 93.03s4.576-5.936-2.599-8.963l-25.513-10.773s-7.173-3.029-6.438-10.284l2.61-25.654s.735-7.256-7.113-6.579l-27.969 2.403s-7.853.675-11.155-5.942L169.561 3.812s-3.305-6.617-9.745-2.415l-22.898 14.93s-6.44 4.202-12.881 0l-22.895-14.93S94.7-2.805 91.4 3.812L79.703 27.238s-3.302 6.617-11.155 5.942l-27.969-2.403s-7.849-.677-7.114 6.579l2.611 25.654s.737 7.255-6.438 10.284L4.125 84.067s-7.175 3.027-2.6 8.962l16.223 21.037s4.573 5.935 0 11.868L1.526 146.971s-4.576 5.935 2.6 8.964l25.512 10.773s7.175 3.027 6.438 10.283l-2.61 25.653s-.736 7.256 7.113 6.581l27.969-2.405s7.853-.675 11.155 5.942L91.4 236.188s3.3 6.617 9.742 2.415l22.895-14.933s6.441-4.199 12.881 0l22.898 14.933s6.44 4.202 9.745-2.415l11.692-23.426s3.302-6.617 11.155-5.942l27.969 2.405s7.848.675 7.113-6.581l-2.61-25.653s-.735-7.256 6.438-10.283l25.513-10.773s7.175-3.029 2.599-8.964l-16.22-21.037s-4.573-5.933 0-11.868l16.22-21.037Z" fill="#FEFEFE"/>
    <path fillRule="evenodd" clipRule="evenodd" fill="#1B5F8A" d="M184.986 99.46c-.14-4.326-.824-6.87-2.75-10.303-4.403-7.502-11.421-11.32-20.639-11.32-9.904 0-17.746 4.706-21.598 12.849-3.303 7.122-5.503 19.33-5.503 31.159 0 11.954 2.2 24.164 5.503 31.287 3.852 8.143 11.694 12.847 21.598 12.847 9.218 0 16.236-3.816 20.639-11.32 1.926-3.434 2.61-5.978 2.75-10.303h-12.931c-1.1 6.487-4.816 9.797-10.731 9.797-5.094 0-8.392-2.544-10.458-8.013-1.787-4.71-3.163-15.519-3.163-24.295 0-7.887 1.237-18.314 2.89-23.146 1.923-6.233 5.363-9.034 10.731-9.034 5.915 0 9.631 3.31 10.731 9.795h12.931ZM75.926 79.49v84.835h45.813v-11.828h-33.02v-28.109h19.537V112.56H88.72V91.318h31.506V79.49h-44.3Z"/>
  </svg>
);
import { getAllVehicles } from '../../services/vehicleService';
import { getVehicleLifestyles, type Lifestyle } from '../../services/lifestyleService';
import { OptimizedImage } from '../OptimizedImage';
import './TopTenCarouselLeads.css';

interface TopTenCarouselLeadsProps {
  title?: string;
  subtitle?: string;
  bodyStyle?: string;
  make?: string;
  lifestyle?: string;
  maxPrice?: number;
  currentVehicleId?: string;
  onShopUsed?: (vehicle: FilteredRankedVehicle) => void;
  onViewRankings?: () => void;
}

interface FilteredRankedVehicle {
  id: string;
  rank: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  slug: string;
  isCurrentVehicle?: boolean;
  badge?: 'best-value' | 'editors-choice' | 'most-popular';
}

const getBadgeLabel = (badge: string) => {
  switch (badge) {
    case 'best-value': return 'Best Value';
    case 'editors-choice': return "Editor's Choice";
    case 'most-popular': return 'Most Popular';
    default: return '';
  }
};

const TopTenCarouselLeads = ({
  title,
  subtitle,
  bodyStyle,
  make,
  lifestyle,
  maxPrice,
  currentVehicleId,
  onShopUsed,
  onViewRankings,
}: TopTenCarouselLeadsProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Get filtered and ranked vehicles from database
  const vehicles = useMemo<FilteredRankedVehicle[]>(() => {
    let allVehicles = getAllVehicles();
    
    // Filter by body style
    if (bodyStyle) {
      allVehicles = allVehicles.filter(v => 
        v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase()
      );
    }
    
    // Filter by make
    if (make) {
      allVehicles = allVehicles.filter(v => 
        v.make.toLowerCase() === make.toLowerCase()
      );
    }
    
    // Filter by lifestyle
    if (lifestyle) {
      allVehicles = allVehicles.filter(v => 
        getVehicleLifestyles(v).includes(lifestyle as Lifestyle)
      );
    }
    
    // Filter by max price
    if (maxPrice) {
      allVehicles = allVehicles.filter(v => v.priceMin <= maxPrice);
    }
    
    // Sort by rating (highest first)
    allVehicles.sort((a, b) => b.staffRating - a.staffRating);
    
    // Take top 10 and format
    return allVehicles.slice(0, 10).map((vehicle, index) => {
      // Determine badges
      let badge: 'best-value' | 'editors-choice' | 'most-popular' | undefined;
      if (index === 0 && vehicle.staffRating >= 9) {
        badge = 'editors-choice';
      } else if (vehicle.priceMin < 25000 && vehicle.staffRating >= 8) {
        badge = 'best-value';
      } else if (vehicle.reviewCount && vehicle.reviewCount > 150) {
        badge = 'most-popular';
      }
      
      return {
        id: vehicle.id,
        rank: index + 1,
        name: `${vehicle.make} ${vehicle.model}`,
        price: `$${vehicle.priceMin.toLocaleString()}`,
        image: vehicle.image, // Use the image directly from the database
        rating: vehicle.staffRating,
        slug: vehicle.slug,
        isCurrentVehicle: vehicle.id === currentVehicleId,
        badge,
      };
    });
  }, [bodyStyle, make, lifestyle, maxPrice, currentVehicleId]);

  // Generate dynamic category label
  const getCategoryLabelDynamic = (): string => {
    const parts: string[] = [];
    if (make) parts.push(make);
    if (lifestyle) parts.push(lifestyle);
    if (bodyStyle) {
      parts.push(bodyStyle + 's');
    } else {
      parts.push('Vehicles');
    }
    return parts.join(' ');
  };

  const categoryLabel = getCategoryLabelDynamic();
  const displayTitle = title || `10Best ${categoryLabel}`;
  const displaySubtitle = subtitle || (vehicles.length > 0 
    ? `See the best ${categoryLabel.toLowerCase()} ranked by our experts. Find your perfect match and start shopping today.`
    : `No vehicles match your current filters. Try adjusting your selection.`);

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.top-ten__card')?.clientWidth || 320;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });

      setTimeout(checkScrollPosition, 350);
    }
  };

  const handleShopUsed = (e: React.MouseEvent, vehicle: FilteredRankedVehicle) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShopUsed) {
      onShopUsed(vehicle);
    }
  };

  // Don't render if no vehicles match filters
  if (vehicles.length === 0) {
    return null;
  }

  return (
    <section className="top-ten">
      <div className="container">
        {/* Header */}
        <div className="top-ten__header">
          <div className="top-ten__header-content">
            <div className="top-ten__title-group">
              <img 
                src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg" 
                alt="10Best"
                className="top-ten__title-icon"
              />
              <h2 className="top-ten__title">{displayTitle}</h2>
            </div>
            <p className="top-ten__subtitle">{displaySubtitle}</p>
          </div>
          <button 
            className="top-ten__view-all"
            onClick={onViewRankings}
          >
            View All Rankings
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Carousel Wrapper */}
        <div className="top-ten__carousel-wrapper">
          {/* Left Navigation */}
          <button
            className={`top-ten__nav top-ten__nav--left ${!canScrollLeft ? 'top-ten__nav--disabled' : ''}`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous vehicles"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel */}
          <div
            className="top-ten__carousel"
            ref={carouselRef}
            onScroll={checkScrollPosition}
          >
            {vehicles.map((vehicle) => (
              <Link
                to={`/${vehicle.slug}`}
                key={vehicle.id}
                className={`top-ten__card ${vehicle.isCurrentVehicle ? 'top-ten__card--current' : ''}`}
              >
                {/* Card Image */}
                <div className="top-ten__card-image">
                  {/* Rank Badge */}
                  <span className={`top-ten__card-rank ${vehicle.rank === 1 ? 'top-ten__card-rank--first' : ''} ${vehicle.isCurrentVehicle ? 'top-ten__card-rank--current' : ''}`}>
                    {vehicle.rank === 1 && (
                      <img 
                        src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg" 
                        alt="10Best"
                        className="top-ten__card-rank-icon"
                      />
                    )}
                    {vehicle.rank}
                  </span>

                  {/* Special Badge */}
                  {vehicle.badge && (
                    <span className={`top-ten__card-badge top-ten__card-badge--${vehicle.badge}`}>
                      {vehicle.badge === 'editors-choice' && (
                        <EditorsChoiceIcon className="top-ten__card-badge-icon" />
                      )}
                      {getBadgeLabel(vehicle.badge)}
                    </span>
                  )}

                  <OptimizedImage 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    aspectRatio="16/10"
                  />
                </div>

                {/* Card Content */}
                <div className="top-ten__card-content">
                  <div className="top-ten__card-header">
                    <h3 className="top-ten__card-name">{vehicle.name}</h3>
                    <div className="top-ten__card-rating">
                      <span className="top-ten__card-rating-score">{vehicle.rating}</span>
                      <span className="top-ten__card-rating-max">/10</span>
                    </div>
                  </div>

                  <p className="top-ten__card-price">
                    <span className="top-ten__card-price-label">Starting at</span>
                    <span className="top-ten__card-price-value">{vehicle.price}</span>
                  </p>

                  {/* Lead Generation CTAs */}
                  <div className="top-ten__card-ctas">
                    <button
                      className="top-ten__card-cta top-ten__card-cta--primary"
                      onClick={(e) => handleShopUsed(e, vehicle)}
                    >
                      <span className="top-ten__card-cta-text">Shop Now</span>
                      <span className="top-ten__card-cta-count">
                        <MapPin size={12} />
                        {Math.floor(((parseInt(vehicle.id, 36) % 150) + 50))} near you
                      </span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}

            {/* View All Card */}
            <div className="top-ten__card top-ten__card--view-all">
              <div className="top-ten__view-all-content">
                <Trophy size={48} className="top-ten__view-all-icon" />
                <h3 className="top-ten__view-all-title">See All Top {categoryLabel}</h3>
                <p className="top-ten__view-all-text">
                  Explore our complete rankings with detailed reviews, specs, and pricing.
                </p>
                <button 
                  className="top-ten__view-all-btn"
                  onClick={onViewRankings}
                >
                  View Full Rankings
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Navigation */}
          <button
            className={`top-ten__nav top-ten__nav--right ${!canScrollRight ? 'top-ten__nav--disabled' : ''}`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next vehicles"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="top-ten__progress">
          <div className="top-ten__progress-track">
            <div
              className="top-ten__progress-fill"
              style={{
                width: carouselRef.current
                  ? `${Math.max(20, (carouselRef.current.scrollLeft / (carouselRef.current.scrollWidth - carouselRef.current.clientWidth)) * 100)}%`
                  : '20%'
              }}
            />
          </div>
          <span className="top-ten__progress-text">
            Showing {Math.min(10, vehicles.length)} of 10
          </span>
        </div>
      </div>
    </section>
  );
};

export default TopTenCarouselLeads;

