import { useEffect, useRef, useState } from 'react';
import { X, Phone, Navigation, Star, Clock, Award, ExternalLink, Bookmark } from 'lucide-react';
import type { DealerWithScore, VehicleInventoryItem } from '../../services/dealerService';
import { formatPrice } from '../../services/dealerService';
import { useAuth } from '../../contexts/AuthContext';
import ExitIntentModal from '../ExitIntentModal/ExitIntentModal';
import './DealerLocatorMap.css';

interface DealerDetailContentProps {
  dealer: DealerWithScore;
  vehicleModel: string;
  onMakeOffer?: (dealer: DealerWithScore, vehicle: VehicleInventoryItem) => void;
}

// Reusable dealer detail content component (without modal wrapper)
export const DealerDetailContent = ({
  dealer,
  vehicleModel,
  onMakeOffer,
}: DealerDetailContentProps) => {
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [pendingSaveItem, setPendingSaveItem] = useState<VehicleInventoryItem | null>(null);

  const isVehicleSaved = (item: VehicleInventoryItem) => {
    const vehicleName = `${item.year} ${item.make} ${item.model} ${item.trim}`;
    return user?.savedVehicles?.some(v => v.name === vehicleName) || false;
  };

  const handleSaveClick = (item: VehicleInventoryItem) => {
    if (!isAuthenticated) {
      setPendingSaveItem(item);
      setShowSignUpModal(true);
      return;
    }
    
    const vehicleName = `${item.year} ${item.make} ${item.model} ${item.trim}`;
    const vehicleId = `${item.year}-${item.make}-${item.model}-${item.trim}`.toLowerCase().replace(/\s+/g, '-');
    
    if (isVehicleSaved(item)) {
      const savedVehicle = user?.savedVehicles?.find(v => v.name === vehicleName);
      if (savedVehicle) {
        removeSavedVehicle(savedVehicle.id);
      }
    } else {
      addSavedVehicle({
        id: vehicleId,
        name: vehicleName,
        ownership: 'want',
      });
    }
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
    setPendingSaveItem(null);
  };

  const getTodayHours = () => {
    if (!dealer.hours) return 'Hours not available';
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return dealer.hours[today as keyof typeof dealer.hours] || 'Closed';
  };

  return (
    <>
      {/* Header */}
      <header className="bottom-sheet__header">
        {dealer.dealScore.isBestDeal && (
          <span className="bottom-sheet__badge">
            <Award size={14} />
            Best Deal
          </span>
        )}
        
        <h2 className="bottom-sheet__title">
          {dealer.name}
        </h2>
        
        <div className="bottom-sheet__address-row">
          <address className="bottom-sheet__address">
            {dealer.address}<br />
            {dealer.city}, {dealer.state} {dealer.zipCode}
          </address>
          
          <div className="bottom-sheet__quick-actions">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${dealer.address}, ${dealer.city}, ${dealer.state} ${dealer.zipCode}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bottom-sheet__quick-badge bottom-sheet__quick-badge--directions"
              aria-label="Get directions"
            >
              <Navigation size={12} />
              <span>Directions</span>
            </a>
            <a
              href={`tel:${dealer.phone.replace(/[^0-9]/g, '')}`}
              className="bottom-sheet__quick-badge bottom-sheet__quick-badge--call"
              aria-label="Call dealer"
            >
              <Phone size={12} />
              <span>Call</span>
            </a>
          </div>
        </div>
        
        <div className="bottom-sheet__rating">
          <Star size={16} fill="var(--color-gold)" stroke="var(--color-gold)" />
          <span className="bottom-sheet__rating-value">{dealer.rating.toFixed(1)}</span>
          <span className="bottom-sheet__rating-count">({dealer.reviewCount.toLocaleString()} reviews)</span>
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
          {dealer.inventory.map((item, index) => {
            const saved = isVehicleSaved(item);
            return (
              <li key={index} className="bottom-sheet__inventory-item">
                <div className="bottom-sheet__inventory-row">
                  <div className="bottom-sheet__inventory-details">
                    <span className="bottom-sheet__inventory-trim">
                      {item.isNew ? 'New' : 'Used'} {item.year} {item.make} {item.model} {item.trim}
                    </span>
                    <span className="bottom-sheet__inventory-meta">
                      {item.exteriorColor}
                      {!item.isNew && item.mileage && (
                        <> · {item.mileage.toLocaleString()} mi</>
                      )}
                    </span>
                  </div>
                  <span className="bottom-sheet__inventory-price">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <div className="bottom-sheet__inventory-actions">
                  <button
                    className="bottom-sheet__inventory-offer"
                    onClick={() => onMakeOffer?.(dealer, item)}
                  >
                    Make an Offer
                  </button>
                  <button
                    className={`bottom-sheet__inventory-save ${saved ? 'bottom-sheet__inventory-save--saved' : ''}`}
                    onClick={() => handleSaveClick(item)}
                    aria-label={saved ? 'Remove from saved' : 'Save vehicle'}
                    title={saved ? 'Remove from saved' : 'Save vehicle'}
                  >
                    <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </li>
            );
          })}
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

      {/* Sign Up Modal for non-authenticated users */}
      <ExitIntentModal
        isOpen={showSignUpModal}
        onClose={handleCloseSignUpModal}
        vehicleName={pendingSaveItem ? `${pendingSaveItem.year} ${pendingSaveItem.make} ${pendingSaveItem.model} ${pendingSaveItem.trim}` : vehicleModel}
        animationStyle="elegant"
      />
    </>
  );
};

interface DealerBottomSheetProps {
  dealer: DealerWithScore;
  vehicleModel: string;
  isOpen: boolean;
  onClose: () => void;
  onMakeOffer?: (dealer: DealerWithScore, vehicle: VehicleInventoryItem) => void;
}

const DealerBottomSheet = ({
  dealer,
  vehicleModel,
  isOpen,
  onClose,
  onMakeOffer,
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
          <DealerDetailContent
            dealer={dealer}
            vehicleModel={vehicleModel}
            onMakeOffer={onMakeOffer}
          />
        </div>
      </div>
    </>
  );
};

export default DealerBottomSheet;

