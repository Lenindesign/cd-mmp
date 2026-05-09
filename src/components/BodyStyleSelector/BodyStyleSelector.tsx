import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DEFAULT_BODY_STYLES, type BodyStyle } from './bodyStyleDefaults';
import './BodyStyleSelector.css';

export type { BodyStyle };

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

