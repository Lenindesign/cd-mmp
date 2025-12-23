import { useEffect, useRef } from 'react';
import { X, Phone, Navigation, Star, Clock, Award, ExternalLink } from 'lucide-react';
import type { DealerWithScore } from '../../services/dealerService';
import { formatPrice } from '../../services/dealerService';
import './DealerLocatorMap.css';

interface DealerBottomSheetProps {
  dealer: DealerWithScore;
  vehicleModel: string;
  isOpen: boolean;
  onClose: () => void;
}

const DealerBottomSheet = ({
  dealer,
  vehicleModel,
  isOpen,
  onClose,
}: DealerBottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (isOpen && sheetRef.current) {
      const focusableElements = sheetRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getTodayHours = () => {
    if (!dealer.hours) return 'Hours not available';
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return dealer.hours[today as keyof typeof dealer.hours] || 'Closed';
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="bottom-sheet__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sheet */}
      <div 
        ref={sheetRef}
        className="bottom-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dealer-sheet-title"
      >
        {/* Drag Handle */}
        <div className="bottom-sheet__handle" />
        
        {/* Close Button */}
        <button 
          className="bottom-sheet__close"
          onClick={onClose}
          aria-label="Close dealer details"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="bottom-sheet__content">
          {/* Header */}
          <header className="bottom-sheet__header">
            {dealer.dealScore.isBestDeal && (
              <span className="bottom-sheet__badge">
                <Award size={14} />
                Best Deal
              </span>
            )}
            
            <h2 id="dealer-sheet-title" className="bottom-sheet__title">
              {dealer.name}
            </h2>
            
            <address className="bottom-sheet__address">
              {dealer.address}<br />
              {dealer.city}, {dealer.state} {dealer.zipCode}
            </address>
            
            <div className="bottom-sheet__rating">
              <Star size={16} fill="var(--color-gold)" stroke="var(--color-gold)" />
              <span className="bottom-sheet__rating-value">{dealer.rating.toFixed(1)}</span>
              <span className="bottom-sheet__rating-count">({dealer.reviewCount} reviews)</span>
            </div>
          </header>

          {/* Hours */}
          <div className="bottom-sheet__hours">
            <Clock size={16} />
            <span>Today: {getTodayHours()}</span>
          </div>

          {/* Inventory Section */}
          <section className="bottom-sheet__inventory">
            <h3 className="bottom-sheet__section-title">
              Inventory for {vehicleModel}
            </h3>
            
            <ul className="bottom-sheet__inventory-list">
              {dealer.inventory.map((item, index) => (
                <li key={index} className="bottom-sheet__inventory-item">
                  <div className="bottom-sheet__inventory-details">
                    <span className="bottom-sheet__inventory-trim">
                      {dealer.inventory[0].isNew ? 'New' : 'Used'} {vehicleModel} {item.trim}
                    </span>
                    {item.exteriorColor && (
                      <span className="bottom-sheet__inventory-color">
                        {item.exteriorColor}
                      </span>
                    )}
                  </div>
                  <span className="bottom-sheet__inventory-price">
                    {formatPrice(item.price)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Certifications */}
          {dealer.certifications && dealer.certifications.length > 0 && (
            <section className="bottom-sheet__certifications">
              <h3 className="bottom-sheet__section-title">Certifications</h3>
              <ul className="bottom-sheet__cert-list">
                {dealer.certifications.map((cert, index) => (
                  <li key={index} className="bottom-sheet__cert">
                    {cert}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Actions */}
          <div className="bottom-sheet__actions">
            <a
              href={`tel:${dealer.phone.replace(/[^0-9]/g, '')}`}
              className="bottom-sheet__action bottom-sheet__action--primary"
            >
              <Phone size={18} />
              <span>Call Dealer</span>
            </a>
            
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${dealer.address}, ${dealer.city}, ${dealer.state} ${dealer.zipCode}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bottom-sheet__action bottom-sheet__action--secondary"
            >
              <Navigation size={18} />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Website Link */}
          {dealer.website && (
            <a
              href={dealer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bottom-sheet__website"
            >
              Visit Dealer Website
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default DealerBottomSheet;

