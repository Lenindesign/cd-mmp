import { useState, useRef } from 'react';
import { Check, Info, ChevronRight, ChevronLeft, GitCompare } from 'lucide-react';
import TrimComparisonModal, { type ComparisonTrim } from './TrimComparisonModal';
import type { TrimData } from '../../services/trimService';
import './TrimSelector.css';

interface TrimSelectorProps {
  trims: TrimData[];
  title?: string;
  subtitle?: string;
  vehicleName?: string;
}

const TrimSelector = ({ 
  trims, 
  title = "Pricing and Which One to Buy", 
  subtitle,
  vehicleName 
}: TrimSelectorProps) => {
  const [selectedTrim, setSelectedTrim] = useState(
    trims.find(t => t.recommended)?.id || trims[0]?.id
  );
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
    e.stopPropagation(); // Prevent card selection
    setCompareTrims(prev => {
      if (prev.includes(trimId)) {
        return prev.filter(id => id !== trimId);
      }
      // Max 4 trims for comparison
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, trimId];
    });
  };

  // Get trims for comparison modal - includes full specs from trimService
  const getComparisonTrims = (): ComparisonTrim[] => {
    return trims
      .filter(t => compareTrims.includes(t.id))
      .map(t => ({
        id: t.id,
        name: t.name,
        price: t.price,
        features: t.features,
        recommended: t.recommended,
        specs: t.specs, // Pass through the full specs from trimService
      }));
  };

  // Open comparison modal
  const openCompareModal = () => {
    if (compareTrims.length >= 2) {
      setIsCompareModalOpen(true);
    }
  };

  // Clear all selections
  const clearCompare = () => {
    setCompareTrims([]);
  };

  return (
    <section className="trim-selector">
      <div className="container">
        <div className="trim-selector__header">
          <div className="trim-selector__header-top">
            <div>
              <h2 className="trim-selector__title">{title}</h2>
              {subtitle && <p className="trim-selector__subtitle">{subtitle}</p>}
            </div>
            
            {/* Compare Button */}
            <div className="trim-selector__compare-actions">
              {compareTrims.length > 0 && (
                <button 
                  className="trim-selector__clear-btn"
                  onClick={clearCompare}
                >
                  Clear ({compareTrims.length})
                </button>
              )}
              <button 
                className={`trim-selector__compare-btn ${compareTrims.length >= 2 ? 'trim-selector__compare-btn--active' : ''}`}
                onClick={openCompareModal}
                disabled={compareTrims.length < 2}
              >
                <GitCompare size={18} />
                <span>Compare Trims</span>
                {compareTrims.length > 0 && (
                  <span className="trim-selector__compare-count">{compareTrims.length}</span>
                )}
              </button>
            </div>
          </div>
          
          {/* Compare instruction */}
          {compareTrims.length === 0 && (
            <p className="trim-selector__compare-hint">
              Select 2-4 trims to compare specifications side by side
            </p>
          )}
          {compareTrims.length === 1 && (
            <p className="trim-selector__compare-hint trim-selector__compare-hint--active">
              Select at least one more trim to compare
            </p>
          )}
        </div>
        
        <div className="trim-selector__carousel-wrapper">
          {canScrollLeft && (
            <button 
              className="trim-selector__nav trim-selector__nav--left"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          <div 
            className="trim-selector__carousel"
            ref={carouselRef}
            onScroll={handleScroll}
          >
            {sortedTrims.map((trim) => (
              <div 
                key={trim.id}
                className={`trim-card ${selectedTrim === trim.id ? 'trim-card--selected' : ''} ${trim.recommended ? 'trim-card--recommended trim-card--sticky' : ''} ${compareTrims.includes(trim.id) ? 'trim-card--comparing' : ''}`}
                onClick={() => setSelectedTrim(trim.id)}
              >
                {trim.recommended && (
                  <div className="trim-card__badge">
                    <span>Recommended</span>
                  </div>
                )}
                
                {/* Compare Checkbox */}
                <button
                  className={`trim-card__compare-checkbox ${compareTrims.includes(trim.id) ? 'trim-card__compare-checkbox--checked' : ''}`}
                  onClick={(e) => toggleCompare(trim.id, e)}
                  aria-label={compareTrims.includes(trim.id) ? `Remove ${trim.name} from comparison` : `Add ${trim.name} to comparison`}
                  title={compareTrims.includes(trim.id) ? 'Remove from comparison' : 'Add to comparison'}
                >
                  {compareTrims.includes(trim.id) ? (
                    <Check size={14} />
                  ) : (
                    <GitCompare size={14} />
                  )}
                </button>
                
                <div className="trim-card__header">
                  <h3 className="trim-card__name">{trim.name}</h3>
                  <div className="trim-card__price">
                    <span className="trim-card__price-label">Starting at</span>
                    <span className="trim-card__price-value">{trim.price}</span>
                  </div>
                </div>
                
                <ul className="trim-card__features">
                  {trim.features.map((feature, index) => (
                    <li key={index} className="trim-card__feature">
                      <Check size={16} className="trim-card__feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="trim-card__actions">
                  <button className="trim-card__btn trim-card__btn--primary">
                    Build This Trim
                    <ChevronRight size={16} />
                  </button>
                  <button className="trim-card__btn trim-card__btn--ghost">
                    <Info size={16} />
                    More Details
                  </button>
                </div>
                
                {selectedTrim === trim.id && (
                  <div className="trim-card__selected-indicator">
                    <Check size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {canScrollRight && (
            <button 
              className="trim-selector__nav trim-selector__nav--right"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
        
        <div className="trim-selector__disclaimer">
          <Info size={16} />
          <p>Prices shown are manufacturer's suggested retail prices (MSRP). Actual prices may vary based on location, dealer, and available inventory.</p>
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
