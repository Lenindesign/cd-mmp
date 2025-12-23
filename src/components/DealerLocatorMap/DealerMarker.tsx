import { useCallback, useState } from 'react';
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { Award, Star, MapPin } from 'lucide-react';
import type { DealerWithScore } from '../../services/dealerService';
import { formatPrice, formatDistance } from '../../services/dealerService';
import './DealerLocatorMap.css';

interface DealerMarkerProps {
  dealer: DealerWithScore;
  isSelected?: boolean;
  onClick?: () => void;
}

const DealerMarker = ({
  dealer,
  isSelected = false,
  onClick,
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

  // Determine marker style based on state
  const getMarkerStyle = () => {
    if (dealer.dealScore.isBestDeal) {
      return {
        background: 'var(--color-gold, #DBCA8B)',
        borderColor: 'var(--color-gold-dark, #A59143)',
        scale: isSelected ? 1.3 : 1.1,
      };
    }
    if (isSelected) {
      return {
        background: 'var(--color-red, #D2232A)',
        borderColor: '#6C1216',
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
          className={`dealer-marker ${dealer.dealScore.isBestDeal ? 'dealer-marker--best' : ''} ${isSelected ? 'dealer-marker--selected' : ''}`}
          style={{
            transform: `scale(${style.scale})`,
          }}
        >
          <div 
            className="dealer-marker__pin"
            style={{
              backgroundColor: style.background,
              borderColor: style.borderColor,
            }}
          >
            {dealer.dealScore.isBestDeal ? (
              <Award size={16} className="dealer-marker__icon" />
            ) : (
              <MapPin size={16} className="dealer-marker__icon" />
            )}
            
            {/* Inventory Badge */}
            {dealer.inventoryCount > 0 && (
              <span className="dealer-marker__badge">
                {dealer.inventoryCount}
              </span>
            )}
          </div>
          
          {/* Pin tail */}
          <div 
            className="dealer-marker__tail"
            style={{
              borderTopColor: style.background,
            }}
          />
        </div>
      </AdvancedMarker>

      {/* Info Window */}
      {showInfoWindow && marker && (
        <InfoWindow
          anchor={marker}
          onCloseClick={handleInfoWindowClose}
          className="dealer-info-window"
        >
          <div className="dealer-info-window__content">
            {dealer.dealScore.isBestDeal && (
              <span className="dealer-info-window__badge">
                <Award size={12} />
                Best Deal
              </span>
            )}
            
            <h3 className="dealer-info-window__name">{dealer.name}</h3>
            
            <div className="dealer-info-window__meta">
              <span className="dealer-info-window__inventory">
                {dealer.inventoryCount} in stock
              </span>
              <span className="dealer-info-window__price">
                from {formatPrice(dealer.lowestPrice)}
              </span>
            </div>
            
            <div className="dealer-info-window__rating">
              <Star size={12} fill="#DBCA8B" stroke="#DBCA8B" />
              <span>{dealer.rating.toFixed(1)}</span>
              <span className="dealer-info-window__distance">
                · {formatDistance(dealer.distance || 0)}
              </span>
            </div>
            
            <div className="dealer-info-window__actions">
              <a
                href={`tel:${dealer.phone.replace(/[^0-9]/g, '')}`}
                className="dealer-info-window__action"
              >
                Call
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${dealer.address}, ${dealer.city}, ${dealer.state}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="dealer-info-window__action"
              >
                Directions
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default DealerMarker;

