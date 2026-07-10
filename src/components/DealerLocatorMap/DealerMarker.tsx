import { useCallback, useState } from 'react';
import { InfoWindow, Marker, useMarkerRef } from '@vis.gl/react-google-maps';
import { Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { DealerWithScore } from '../../services/dealerService';
import { formatPrice, formatDistance } from '../../services/dealerService';
import './DealerLocatorMap.css';

interface DealerMarkerProps {
  dealer: DealerWithScore;
  index?: number; // 1-based index for numbered markers
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: () => void;
  onHover?: (dealer: DealerWithScore | null) => void;
  vehicleImage?: string;
  vehicleImages?: string[]; // Array of images for slideshow
  vehicleName?: string;
}

const DealerMarker = ({
  dealer,
  index,
  isSelected = false,
  isHovered = false,
  onClick,
  onHover,
  vehicleImage,
  vehicleImages = [],
  vehicleName,
}: DealerMarkerProps) => {
  const [markerRef, marker] = useMarkerRef();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine single image with images array, removing duplicates
  const allImages = vehicleImages.length > 0 
    ? vehicleImages 
    : vehicleImage 
      ? [vehicleImage] 
      : [];

  const handlePrevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const handleNextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  const handleClick = useCallback(() => {
    onClick?.();
    setShowInfoWindow(true);
  }, [onClick]);

  const handleInfoWindowClose = useCallback(() => {
    setShowInfoWindow(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    onHover?.(dealer);
    setShowInfoWindow(true);
  }, [dealer, onHover]);

  const handleMouseLeave = useCallback(() => {
    onHover?.(null);
    setShowInfoWindow(false);
  }, [onHover]);

  // Determine marker style based on state
  const getMarkerStyle = () => {
    if (dealer.dealScore.isBestDeal) {
      return {
        background: '#DBCA8B',
        borderColor: '#A59143',
        scale: isSelected || isHovered ? 1.3 : 1.1,
      };
    }
    if (isSelected || isHovered) {
      return {
        background: '#1B5F8A',
        borderColor: '#154d70',
        scale: 1.3,
      };
    }
    return {
      background: '#1B5F8A',
      borderColor: '#154d70',
      scale: 1,
    };
  };

  const style = getMarkerStyle();
  const markerScale = style.scale >= 1.3 ? 13 : style.scale > 1 ? 12 : 11;
  const markerLabel = index !== undefined
    ? String(index)
    : dealer.dealScore.isBestDeal
      ? '★'
      : '';
  const markerIcon = {
    path: 'M 0,-1 A 1,1 0 1 1 0,1 A 1,1 0 1 1 0,-1',
    fillColor: style.background,
    fillOpacity: 1,
    strokeColor: style.borderColor,
    strokeWeight: 3,
    scale: markerScale,
  };

  return (
    <>
      <Marker
        ref={markerRef}
        position={{ lat: dealer.lat, lng: dealer.lng }}
        onClick={handleClick}
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
        title={dealer.name}
        zIndex={isSelected || isHovered ? 20 : dealer.dealScore.isBestDeal ? 10 : undefined}
        icon={markerIcon}
        label={{
          text: markerLabel,
          color: dealer.dealScore.isBestDeal ? '#222222' : '#ffffff',
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          fontWeight: '700',
        }}
      />

      {/* Info Window - show on hover (pin or sidebar) OR when dealer sidebar is active */}
      {(showInfoWindow || isSelected || isHovered) && marker && (
        <InfoWindow
          anchor={marker}
          onCloseClick={handleInfoWindowClose}
          className="dealer-info-window"
        >
          <div className="dealer-info-window__content">
            {/* Vehicle Image Slideshow */}
            {allImages.length > 0 && (
              <div className="dealer-info-window__slideshow">
                <img 
                  src={allImages[currentImageIndex]} 
                  alt={`${vehicleName || 'Vehicle'} - Photo ${currentImageIndex + 1}`} 
                  className="dealer-info-window__slide-image"
                  onError={(e) => {
                    // Fallback to first image if current fails
                    const target = e.target as HTMLImageElement;
                    if (currentImageIndex !== 0 && allImages[0]) {
                      target.src = allImages[0];
                    }
                  }}
                />
                {allImages.length > 1 && (
                  <>
                    <button 
                      className="dealer-info-window__nav dealer-info-window__nav--prev"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      className="dealer-info-window__nav dealer-info-window__nav--next"
                      onClick={handleNextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <div className="dealer-info-window__dots">
                      {allImages.map((_, idx) => (
                        <button
                          key={idx}
                          className={`dealer-info-window__dot ${idx === currentImageIndex ? 'dealer-info-window__dot--active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            
            <div className="dealer-info-window__body">
              {dealer.dealScore.isBestDeal && (
                <span className="dealer-info-window__badge">
                  <Award size={10} />
                  Best Deal
                </span>
              )}
              
              <h3 className="dealer-info-window__name">{dealer.name}</h3>
              
              <div className="dealer-info-window__meta">
                <div className="dealer-info-window__rating">
                  <Star size={14} fill="var(--color-gold)" stroke="var(--color-gold)" />
                  <span className="dealer-info-window__rating-value">{dealer.rating.toFixed(1)}</span>
                  <span className="dealer-info-window__rating-count">({dealer.reviewCount} reviews)</span>
                </div>
                <span className="dealer-info-window__distance">
                  {formatDistance(dealer.distance || 0)}
                </span>
              </div>
              
              <div className="dealer-info-window__price-row">
                <span className="dealer-info-window__price">
                  from {formatPrice(dealer.lowestPrice)}
                </span>
              </div>
              
              <div className="dealer-info-window__actions">
                <a
                  href={`tel:${dealer.phone.replace(/[^0-9]/g, '')}`}
                  className="dealer-info-window__action dealer-info-window__action--primary"
                >
                  Call
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${dealer.address}, ${dealer.city}, ${dealer.state}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dealer-info-window__action dealer-info-window__action--secondary"
                >
                  Directions
                </a>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default DealerMarker;
