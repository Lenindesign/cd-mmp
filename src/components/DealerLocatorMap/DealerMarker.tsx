import { useCallback, useState } from 'react';
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { Award, Star, MapPin } from 'lucide-react';
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
  vehicleName,
}: DealerMarkerProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showInfoWindow, setShowInfoWindow] = useState(false);

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
        background: 'var(--color-gold, #DBCA8B)',
        borderColor: 'var(--color-gold-dark, #A59143)',
        scale: isSelected || isHovered ? 1.3 : 1.1,
      };
    }
    if (isSelected || isHovered) {
      return {
        background: 'var(--color-blue-cobalt, #1B5F8A)',
        borderColor: 'var(--color-blue-cobalt-dark, #154d70)',
        scale: 1.3,
      };
    }
    return {
      background: 'var(--color-blue-cobalt, #1B5F8A)',
      borderColor: 'var(--color-blue-cobalt-dark, #154d70)',
      scale: 1,
    };
  };

  const style = getMarkerStyle();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: dealer.lat, lng: dealer.lng }}
        onClick={handleClick}
        title={dealer.name}
      >
        {/* Custom Marker Pin */}
        <div 
          className={`dealer-marker ${dealer.dealScore.isBestDeal ? 'dealer-marker--best' : ''} ${isSelected || isHovered ? 'dealer-marker--selected' : ''}`}
          style={{
            transform: `scale(${style.scale})`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="dealer-marker__pin"
            style={{
              backgroundColor: style.background,
              borderColor: style.borderColor,
            }}
          >
            {/* Show number if provided, otherwise show icon */}
            {index !== undefined ? (
              <span className="dealer-marker__number">{index}</span>
            ) : dealer.dealScore.isBestDeal ? (
              <Award size={16} className="dealer-marker__icon" />
            ) : (
              <MapPin size={16} className="dealer-marker__icon" />
            )}
          </div>
          
          {/* Pin tail */}
          <div 
            className="dealer-marker__tail"
            style={{
              borderTopColor: style.borderColor,
            }}
          />
        </div>
      </AdvancedMarker>

      {/* Info Window - show on hover (pin or sidebar) OR when dealer sidebar is active */}
      {(showInfoWindow || isSelected || isHovered) && marker && (
        <InfoWindow
          anchor={marker}
          onCloseClick={handleInfoWindowClose}
          className="dealer-info-window"
        >
          <div className="dealer-info-window__content">
            {/* Vehicle Image */}
            {vehicleImage && (
              <div className="dealer-info-window__image">
                <img src={vehicleImage} alt={vehicleName || 'Vehicle'} />
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

