import { useState, useRef, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown } from 'lucide-react';
import { getAllVehicles, getAvailableYears, getYearDetails } from '../../services/vehicleService';
import { getVehicleLifestyles, type Lifestyle } from '../../services/lifestyleService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { VehicleCard } from '../VehicleCard';
import './TopTenCarouselLeads.css';

// Body style options with icons - only include body styles that exist in the database
const BODY_STYLE_OPTIONS = [
  { id: 'all', name: 'All Body Styles', icon: '', dbValue: '' },
  { id: 'suvs', name: 'SUVs', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suv-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*', dbValue: 'SUV' },
  { id: 'sedans', name: 'Sedans', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sedans-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*', dbValue: 'Sedan' },
  { id: 'trucks', name: 'Trucks', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/trucks-1585158794.png?crop=1.00xw:0.502xh;0,0.236xh&resize=180:*', dbValue: 'Truck' },
  { id: 'coupes', name: 'Coupes', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sportscar-1585158794.png?crop=1.00xw:0.502xh;0,0.255xh&resize=180:*', dbValue: 'Coupe' },
  { id: 'convertibles', name: 'Convertibles', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/convertibles-1585158793.png?crop=1.00xw:0.502xh;0,0.258xh&resize=180:*', dbValue: 'Convertible' },
  { id: 'wagons', name: 'Wagons', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/wagons-1585158795.png?crop=1.00xw:0.502xh;0,0.244xh&resize=180:*', dbValue: 'Wagon' },
  { id: 'hatchbacks', name: 'Hatchbacks', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/crossovers-1585158793.png?crop=1.00xw:0.502xh;0,0.244xh&resize=180:*', dbValue: 'Hatchback' },
];

interface TopTenCarouselLeadsProps {
  title?: string;
  subtitle?: string;
  bodyStyle?: string;
  make?: string;
  lifestyle?: string;
  maxPrice?: number;
  currentVehicleId?: string;
  inventoryType?: 'new' | 'used';
  onShopUsed?: (vehicle: FilteredRankedVehicle) => void;
  onBodyStyleChange?: (bodyStyleId: string) => void;
}

interface YearDetail {
  year: number;
  price: string;
  rating: number;
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
  badge?: 'best-value' | 'editors-choice';
  editorsChoice?: boolean;
  tenBest?: boolean;
  epaMpg?: number;
  cdSays?: string;
  bodyStyle?: string;
  availableYears?: number[];
  yearDetails?: YearDetail[];
  modelName?: string;
  vehicleYear?: string;
}


// Helper to calculate combined MPG from city/highway string (e.g., "25/31" -> 28)
const getCombinedMpg = (mpg?: string): number | undefined => {
  if (!mpg) return undefined;
  const parts = mpg.split('/');
  if (parts.length !== 2) return undefined;
  const city = parseInt(parts[0], 10);
  const highway = parseInt(parts[1], 10);
  if (isNaN(city) || isNaN(highway)) return undefined;
  // EPA combined formula: 0.55 * city + 0.45 * highway (rounded)
  return Math.round(0.55 * city + 0.45 * highway);
};

// Helper to generate C/D Says description
const generateCdSays = (year: string, make: string, model: string, bodyStyle: string): string => {
  const bodyStyleLower = bodyStyle.toLowerCase();
  return `Read our ${year} ${make} ${model} review for information on ratings, pricing, specs, and features, and see how this ${bodyStyleLower} performed in our testing.`;
};

const TopTenCarouselLeads = ({
  title,
  subtitle,
  bodyStyle,
  make,
  lifestyle,
  maxPrice,
  currentVehicleId,
  inventoryType = 'new',
  onShopUsed,
  onBodyStyleChange,
}: TopTenCarouselLeadsProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBodyStyle, setSelectedBodyStyle] = useState('all');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBodyStyleSelect = (bodyStyleId: string) => {
    setSelectedBodyStyle(bodyStyleId);
    setIsDropdownOpen(false);
    if (onBodyStyleChange) {
      onBodyStyleChange(bodyStyleId === 'all' ? '' : bodyStyleId);
    }
  };

  const getSelectedBodyStyleName = () => {
    const selected = BODY_STYLE_OPTIONS.find(opt => opt.id === selectedBodyStyle);
    return selected?.name || 'All Body Styles';
  };
  
  // Fetch all ratings from Supabase in production
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  
  // Helper to get vehicle rating (uses Supabase in production)
  const getVehicleRating = (vehicle: { id: string; bodyStyle: string; staffRating: number }): number => {
    return getSupabaseRating(vehicle.id, getCategory(vehicle.bodyStyle), vehicle.staffRating);
  };

  // Determine the active body style filter (internal state takes precedence over prop)
  // Get the dbValue from the selected option for exact matching
  const selectedOption = BODY_STYLE_OPTIONS.find(opt => opt.id === selectedBodyStyle);
  const activeBodyStyleFilter = selectedBodyStyle !== 'all' && selectedOption?.dbValue 
    ? selectedOption.dbValue 
    : bodyStyle;

  // Get filtered and ranked vehicles from database
  const vehicles = useMemo<FilteredRankedVehicle[]>(() => {
    let allVehicles = getAllVehicles();
    
    // Filter by inventory type (year)
    // Used: 2024 only, New: 2025 or newer
    if (inventoryType === 'used') {
      allVehicles = allVehicles.filter(v => v.year === '2024');
    } else {
      allVehicles = allVehicles.filter(v => parseInt(v.year) >= 2025);
    }
    
    // Filter by body style (use activeBodyStyleFilter which combines dropdown + prop)
    if (activeBodyStyleFilter) {
      allVehicles = allVehicles.filter(v => 
        v.bodyStyle.toLowerCase() === activeBodyStyleFilter.toLowerCase()
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
      
      // Determine badges - Best Value only (accolades come from database)
      let badge: 'best-value' | 'editors-choice' | undefined;
      if (vehicle.priceMin < 25000 && rating >= 8 && !vehicle.editorsChoice) {
        badge = 'best-value';
      }
      
      // Get available years for this vehicle (convert string years to numbers)
      const yearsForVehicle = getAvailableYears(vehicle.make, vehicle.model)
        .map(y => parseInt(y, 10))
        .filter(y => !isNaN(y))
        .sort((a, b) => b - a); // Sort descending (newest first)
      
      // Get year details (price and rating for each year)
      const yearDetailsForVehicle = getYearDetails(vehicle.make, vehicle.model);

      return {
        id: vehicle.id,
        rank: index + 1,
        name: `${vehicle.make} ${vehicle.model}`,
        price: `$${vehicle.priceMin.toLocaleString()}`,
        image: vehicle.image,
        rating: rating,
        slug: vehicle.slug,
        isCurrentVehicle: vehicle.id === currentVehicleId,
        badge,
        editorsChoice: vehicle.editorsChoice,
        tenBest: vehicle.tenBest,
        epaMpg: getCombinedMpg(vehicle.mpg),
        cdSays: generateCdSays(vehicle.year, vehicle.make, vehicle.model, vehicle.bodyStyle),
        bodyStyle: vehicle.bodyStyle,
        availableYears: yearsForVehicle.length > 0 ? yearsForVehicle : undefined,
        yearDetails: yearDetailsForVehicle.length > 0 ? yearDetailsForVehicle : undefined,
        modelName: vehicle.model,
        vehicleYear: vehicle.year,
      };
    });
  }, [activeBodyStyleFilter, make, lifestyle, maxPrice, currentVehicleId, inventoryType, getSupabaseRating]);

  // Generate dynamic category label
  const getCategoryLabelDynamic = (): string => {
    const parts: string[] = [];
    if (make) parts.push(make);
    if (lifestyle) parts.push(lifestyle);
    
    // Use the selected body style name from dropdown if selected
    if (selectedBodyStyle !== 'all') {
      const selectedOption = BODY_STYLE_OPTIONS.find(opt => opt.id === selectedBodyStyle);
      parts.push(selectedOption?.name || 'Vehicles');
    } else if (bodyStyle) {
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

  // Generate rankings page URL based on selected body style
  const getRankingsUrl = (): string => {
    if (selectedBodyStyle !== 'all') {
      // Map dropdown IDs to rankings page slugs
      const rankingsSlugMap: Record<string, string> = {
        'suvs': 'suv',
        'sedans': 'sedan',
        'trucks': 'truck',
        'coupes': 'coupe',
        'convertibles': 'convertible',
        'wagons': 'wagon',
        'hatchbacks': 'hatchback',
      };
      const slug = rankingsSlugMap[selectedBodyStyle] || selectedBodyStyle;
      return `/rankings/${slug}`;
    }
    // Default to all rankings
    return '/rankings';
  };

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

  // Check if we have vehicles to show
  const hasVehicles = vehicles.length > 0;

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
            <p className="top-ten__subtitle">
              {hasVehicles 
                ? displaySubtitle 
                : `No ${getSelectedBodyStyleName().toLowerCase()} available for ${inventoryType === 'new' ? '2025+' : '2024'}. Try selecting a different body style.`
              }
            </p>
          </div>
          <div className="top-ten__dropdown" ref={dropdownRef}>
            <button 
              className="top-ten__dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              {selectedBodyStyle !== 'all' && (
                <img 
                  src={BODY_STYLE_OPTIONS.find(opt => opt.id === selectedBodyStyle)?.icon} 
                  alt="" 
                  className="top-ten__dropdown-icon"
                />
              )}
              <span>{getSelectedBodyStyleName()}</span>
              <ChevronDown 
                size={18} 
                className={`top-ten__dropdown-chevron ${isDropdownOpen ? 'top-ten__dropdown-chevron--open' : ''}`}
              />
            </button>
            
            {isDropdownOpen && (
              <div className="top-ten__dropdown-menu" role="listbox">
                {BODY_STYLE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    className={`top-ten__dropdown-item ${selectedBodyStyle === option.id ? 'top-ten__dropdown-item--selected' : ''}`}
                    onClick={() => handleBodyStyleSelect(option.id)}
                    role="option"
                    aria-selected={selectedBodyStyle === option.id}
                  >
                    {option.icon && (
                      <img 
                        src={option.icon} 
                        alt="" 
                        className="top-ten__dropdown-item-icon"
                      />
                    )}
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Carousel Wrapper - only show if we have vehicles */}
        {hasVehicles ? (
          <>
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
                {vehicles.map((vehicle) => {
                  const isUsed = vehicle.vehicleYear === '2024';
                  const modelName = vehicle.modelName?.toUpperCase() || '';
                  // If model name is longer than 10 characters, just show "SHOP NEW" or "SHOP USED"
                  const ctaText = modelName.length > 10
                    ? (isUsed ? 'SHOP USED' : 'SHOP NEW')
                    : (isUsed ? `SHOP USED ${modelName}` : `SHOP NEW ${modelName}`);
                  
                  return (
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
                      editorsChoice={vehicle.editorsChoice}
                      tenBest={vehicle.tenBest}
                      isCurrentVehicle={vehicle.isCurrentVehicle}
                      showShopButton={true}
                      shopButtonText={ctaText}
                      shopButtonVariant="outline"
                      onShopClick={(e) => handleShopUsed(e, vehicle)}
                      epaMpg={vehicle.epaMpg}
                      cdSays={vehicle.cdSays}
                      availableYears={vehicle.availableYears}
                      yearDetails={vehicle.yearDetails}
                      modelName={vehicle.modelName}
                    />
                  );
                })}

                {/* View All Card */}
                <Link 
                  to={getRankingsUrl()} 
                  className="top-ten__card top-ten__card--view-all"
                >
                  <div className="top-ten__view-all-content">
                    <img 
                      src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                      alt="10Best"
                      className="top-ten__view-all-icon"
                    />
                    <h3 className="top-ten__view-all-title">See All Top {categoryLabel}</h3>
                    <p className="top-ten__view-all-text">
                      Explore our complete rankings with detailed reviews, specs, and pricing.
                    </p>
                    <span className="top-ten__view-all-btn">
                      View Full Rankings
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </Link>
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
          </>
        ) : (
          /* Empty state when no vehicles match */
          <div className="top-ten__empty-state">
            <p className="top-ten__empty-message">
              Select a different body style to see available vehicles.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopTenCarouselLeads;

