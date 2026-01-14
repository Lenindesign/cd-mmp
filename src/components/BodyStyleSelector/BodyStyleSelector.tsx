import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './BodyStyleSelector.css';

export interface BodyStyle {
  id: string;
  name: string;
  icon: string;
}

export interface BodyStyleSelectorProps {
  /** Array of body styles to display */
  bodyStyles?: BodyStyle[];
  /** Currently selected body style ID */
  selectedId?: string;
  /** Callback when a body style is selected */
  onSelect?: (bodyStyle: BodyStyle) => void;
  /** Visual variant */
  variant?: 'default' | 'minimal' | 'cards' | 'pills' | 'dark';
  /** Whether to allow multiple selections */
  multiSelect?: boolean;
  /** Array of selected IDs for multi-select mode */
  selectedIds?: string[];
  /** Callback for multi-select mode */
  onMultiSelect?: (selectedIds: string[]) => void;
}

const DEFAULT_BODY_STYLES: BodyStyle[] = [
  { id: 'suvs', name: 'SUVs', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suv-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*' },
  { id: 'hybrids', name: 'Hybrids', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hybridcar-647e4833d60f9.jpg?crop=1.00xw:0.502xh;0,0.247xh&resize=180:*' },
  { id: 'crossovers', name: 'Crossovers', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/crossovers-1585158793.png?crop=1.00xw:0.502xh;0,0.244xh&resize=180:*' },
  { id: 'trucks', name: 'Pickup Trucks', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/trucks-1585158794.png?crop=1.00xw:0.502xh;0,0.236xh&resize=180:*' },
  { id: 'luxury', name: 'Luxury', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/luxury-1585158794.png?crop=1.00xw:0.502xh;0,0.247xh&resize=180:*' },
  { id: 'evs', name: 'EVs', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hybrids-1585158794.png?crop=1.00xw:0.502xh;0,0.247xh&resize=180:*' },
  { id: 'sports', name: 'Sports Cars', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sportscar-1585158794.png?crop=1.00xw:0.502xh;0,0.255xh&resize=180:*' },
  { id: 'sedans', name: 'Sedans', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sedans-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*' },
  { id: 'wagons', name: 'Wagons', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/wagons-1585158795.png?crop=1.00xw:0.502xh;0,0.244xh&resize=180:*' },
  { id: 'convertibles', name: 'Convertibles', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/convertibles-1585158793.png?crop=1.00xw:0.502xh;0,0.258xh&resize=180:*' },
  { id: 'vans', name: 'Vans', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/vans-1585158795.png?crop=1.00xw:0.502xh;0,0.252xh&resize=180:*' },
  { id: 'coupes', name: 'Coupes', icon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sedans-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*' },
];

export const BodyStyleSelector = ({
  bodyStyles = DEFAULT_BODY_STYLES,
  selectedId,
  onSelect,
  variant = 'default',
  multiSelect = false,
  selectedIds = [],
  onMultiSelect,
}: BodyStyleSelectorProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollability, 300);
    }
  };

  const handleSelect = (bodyStyle: BodyStyle) => {
    if (multiSelect && onMultiSelect) {
      const isSelected = selectedIds.includes(bodyStyle.id);
      if (isSelected) {
        onMultiSelect(selectedIds.filter(id => id !== bodyStyle.id));
      } else {
        onMultiSelect([...selectedIds, bodyStyle.id]);
      }
    } else if (onSelect) {
      onSelect(bodyStyle);
    }
  };

  const isSelected = (id: string) => {
    if (multiSelect) {
      return selectedIds.includes(id);
    }
    return selectedId === id;
  };

  return (
    <div className={`body-style-selector body-style-selector--${variant}`}>
      {canScrollLeft && (
        <button
          className="body-style-selector__nav body-style-selector__nav--left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="body-style-selector__scroll"
        onScroll={checkScrollability}
      >
        <div className="body-style-selector__items">
          {bodyStyles.map((bodyStyle) => (
            <button
              key={bodyStyle.id}
              className={`body-style-selector__item ${
                isSelected(bodyStyle.id) ? 'body-style-selector__item--selected' : ''
              }`}
              onClick={() => handleSelect(bodyStyle)}
              aria-pressed={isSelected(bodyStyle.id)}
            >
              <div className="body-style-selector__icon-wrapper">
                <img
                  src={bodyStyle.icon}
                  alt={bodyStyle.name}
                  className="body-style-selector__icon"
                  loading="lazy"
                />
              </div>
              <span className="body-style-selector__label">{bodyStyle.name}</span>
            </button>
          ))}
        </div>
      </div>

      {canScrollRight && (
        <button
          className="body-style-selector__nav body-style-selector__nav--right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default BodyStyleSelector;

