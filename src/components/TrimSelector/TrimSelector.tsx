import { useState, useRef } from 'react';
import { Check, ChevronRight, ChevronLeft, Plus, MapPin } from 'lucide-react';
import TrimComparisonModal, { type ComparisonTrim } from './TrimComparisonModal';
import type { TrimData } from '../../services/trimService';
import './TrimSelector.css';

interface TrimSelectorProps {
  trims: TrimData[];
  title?: string;
  subtitle?: string;
  vehicleName?: string;
  zipCode?: string;
  maxSelections?: number;
}

const TrimSelector = ({ 
  trims, 
  title = "Compare Trims", 
  subtitle = "Select up to 5 trims to compare features, specs, prices, and performance.",
  vehicleName,
  zipCode = "10940",
  maxSelections = 5
}: TrimSelectorProps) => {
  const [compareTrims, setCompareTrims] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Sort trims to put recommended first
  const sortedTrims = [...trims].sort((a, b) => {
    if (a.recommended && !b.recommended) return -1;
    if (!a.recommended && b.recommended) return 1;
    return 0;
  });

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320; // Card width + gap
      const newScrollLeft = direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Toggle trim in comparison list
  const toggleCompare = (trimId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompareTrims(prev => {
      if (prev.includes(trimId)) {
        return prev.filter(id => id !== trimId);
      }
      if (prev.length >= maxSelections) {
        return prev;
      }
      return [...prev, trimId];
    });
  };

  // Get trims for comparison modal
  const getComparisonTrims = (): ComparisonTrim[] => {
    return trims
      .filter(t => compareTrims.includes(t.id))
      .map(t => ({
        id: t.id,
        name: t.name,
        price: t.price,
        features: t.features,
        recommended: t.recommended,
        specs: t.specs,
      }));
  };

  // Open comparison modal
  const openCompareModal = () => {
    if (compareTrims.length >= 2) {
      setIsCompareModalOpen(true);
    }
  };

  // Extract MPG from trim specs if available
  const getMpg = (trim: TrimData): string | null => {
    if (trim.specs?.fuelEconomy && trim.specs.fuelEconomy !== '—') {
      return trim.specs.fuelEconomy;
    }
    return null;
  };

  return (
    <section className="trim-selector">
      <div className="container">
        {/* Header */}
        <div className="trim-selector__header">
          <div className="trim-selector__header-left">
            <h2 className="trim-selector__title">{title}</h2>
            <p className="trim-selector__subtitle">{subtitle}</p>
          </div>
          
          <div className="trim-selector__header-right">
            <span className="trim-selector__selection-count">
              {compareTrims.length} of {maxSelections} selected
            </span>
            <button 
              className={`trim-selector__compare-btn ${compareTrims.length >= 2 ? 'trim-selector__compare-btn--active' : ''}`}
              onClick={openCompareModal}
              disabled={compareTrims.length < 2}
            >
              Compare Trims
            </button>
          </div>
        </div>
        
        {/* Carousel */}
        <div className="trim-selector__carousel-wrapper">
          {/* Recommended Card - Fixed outside scroll */}
          {sortedTrims.filter(t => t.recommended).map((trim) => {
            const isSelected = compareTrims.includes(trim.id);
            const mpg = getMpg(trim);
            
            return (
              <div 
                key={trim.id}
                className={`trim-card trim-card--recommended ${isSelected ? 'trim-card--selected' : ''}`}
              >
                <div className="trim-card__top">
                  <div className="trim-card__name-row">
                    {isSelected && (
                      <Check size={18} className="trim-card__check-icon" />
                    )}
                    <h3 className="trim-card__name">{trim.name}</h3>
                    <span className="trim-card__badge">Recommended</span>
                  </div>
                  <button
                    className={`trim-card__add-btn ${isSelected ? 'trim-card__add-btn--selected' : ''}`}
                    onClick={(e) => toggleCompare(trim.id, e)}
                    aria-label={isSelected ? `Remove ${trim.name} from comparison` : `Add ${trim.name} to comparison`}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                <div className="trim-card__pricing">
                  <span className="trim-card__price">{trim.price}</span>
                  {mpg && <span className="trim-card__mpg">{mpg}</span>}
                </div>
                
                <ul className="trim-card__features">
                  {trim.features.slice(0, 2).map((feature, index) => (
                    <li key={index} className="trim-card__feature">
                      <span className="trim-card__feature-bullet">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="trim-card__shop-btn">
                  Shop
                  <ChevronRight size={16} />
                </button>
              </div>
            );
          })}

          {/* Scrollable Carousel for other trims */}
          <div className="trim-selector__carousel-scroll-area">
            {canScrollLeft && (
              <button 
                className="trim-selector__nav trim-selector__nav--left"
                onClick={() => scroll('left')}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            <div 
              className="trim-selector__carousel"
              ref={carouselRef}
              onScroll={handleScroll}
            >
              {sortedTrims.filter(t => !t.recommended).map((trim) => {
                const isSelected = compareTrims.includes(trim.id);
                const mpg = getMpg(trim);
                
                return (
                  <div 
                    key={trim.id}
                    className={`trim-card ${isSelected ? 'trim-card--selected' : ''}`}
                  >
                    <div className="trim-card__top">
                      <div className="trim-card__name-row">
                        {isSelected && (
                          <Check size={18} className="trim-card__check-icon" />
                        )}
                        <h3 className="trim-card__name">{trim.name}</h3>
                      </div>
                      <button
                        className={`trim-card__add-btn ${isSelected ? 'trim-card__add-btn--selected' : ''}`}
                        onClick={(e) => toggleCompare(trim.id, e)}
                        aria-label={isSelected ? `Remove ${trim.name} from comparison` : `Add ${trim.name} to comparison`}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    
                    <div className="trim-card__pricing">
                      <span className="trim-card__price">{trim.price}</span>
                      {mpg && <span className="trim-card__mpg">{mpg}</span>}
                    </div>
                    
                    <ul className="trim-card__features">
                      {trim.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="trim-card__feature">
                          <span className="trim-card__feature-bullet">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className="trim-card__shop-btn">
                      Shop
                      <ChevronRight size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
            
            {canScrollRight && (
              <button 
                className="trim-selector__nav trim-selector__nav--right"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
        
        {/* Location */}
        <div className="trim-selector__location">
          <MapPin size={16} />
          <span>{zipCode}</span>
          <button className="trim-selector__change-location">Change Location</button>
        </div>
      </div>

      {/* Comparison Modal */}
      <TrimComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        trims={getComparisonTrims()}
        vehicleName={vehicleName}
      />
    </section>
  );
};

export default TrimSelector;
