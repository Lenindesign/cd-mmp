import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import DealerLocatorMap from './DealerLocatorMap';
import type { VehicleInfo } from './VehicleContextHeader';
import './DealerMapModal.css';

export interface DealerMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: VehicleInfo;
  initialLocation?: { lat: number; lng: number };
  initialZipCode?: string;
}

const DealerMapModal: React.FC<DealerMapModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  initialLocation = { lat: 34.0522, lng: -118.2437 }, // LA default
  initialZipCode = 'Los Angeles, CA',
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="dealer-map-modal__backdrop" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className="dealer-map-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dealer-map-modal-title"
      >
        {/* Header */}
        <div className="dealer-map-modal__header">
          <h2 id="dealer-map-modal-title" className="dealer-map-modal__title">
            Find {vehicle.year} {vehicle.make} {vehicle.model} Near You
          </h2>
          <button
            className="dealer-map-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="dealer-map-modal__content">
          <DealerLocatorMap
            vehicle={vehicle}
            initialLocation={initialLocation}
            initialZipCode={initialZipCode}
            showVehiclePreview={false}
            defaultView="map"
            cardVariant="compact"
          />
        </div>
      </div>
    </>
  );
};

export default DealerMapModal;

