import { useState, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Trophy } from 'lucide-react';
import { getAllVehicles } from '../../services/vehicleService';
import { getVehicleLifestyles, type Lifestyle } from '../../services/lifestyleService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { VehicleCard } from '../VehicleCard';
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
  
  // Fetch all ratings from Supabase in production
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  
  // Helper to get vehicle rating (uses Supabase in production)
  const getVehicleRating = (vehicle: { id: string; bodyStyle: string; staffRating: number }): number => {
    return getSupabaseRating(vehicle.id, getCategory(vehicle.bodyStyle), vehicle.staffRating);
  };

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
    
    // Sort by rating (highest first) - use Supabase ratings
    allVehicles.sort((a, b) => getVehicleRating(b) - getVehicleRating(a));
    
    // Take top 10 and format
    return allVehicles.slice(0, 10).map((vehicle, index) => {
      const rating = getVehicleRating(vehicle);
      
      // Determine badges
      let badge: 'best-value' | 'editors-choice' | 'most-popular' | undefined;
      if (index === 0 && rating >= 9) {
        badge = 'editors-choice';
      } else if (vehicle.priceMin < 25000 && rating >= 8) {
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
        rating: rating,
        slug: vehicle.slug,
        isCurrentVehicle: vehicle.id === currentVehicleId,
        badge,
      };
    });
  }, [bodyStyle, make, lifestyle, maxPrice, currentVehicleId, getSupabaseRating]);

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
              <VehicleCard
                key={vehicle.id}
                id={vehicle.id}
                name={vehicle.name}
                slug={vehicle.slug}
                image={vehicle.image}
                price={vehicle.price}
                rating={vehicle.rating}
                rank={vehicle.rank}
                badge={vehicle.badge}
                isCurrentVehicle={vehicle.isCurrentVehicle}
                showShopButton={true}
                onShopClick={(e) => handleShopUsed(e, vehicle)}
              />
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

