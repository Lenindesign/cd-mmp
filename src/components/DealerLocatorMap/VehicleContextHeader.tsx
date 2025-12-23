import { Star } from 'lucide-react';
import './DealerLocatorMap.css';

export interface VehicleInfo {
  year: number;
  make: string;
  model: string;
  trim?: string;
  msrp: number;
  image: string;
  rating?: number;
  bodyStyle?: string;
  mpg?: number;
}

interface VehicleContextHeaderProps {
  vehicle: VehicleInfo;
  variant?: 'full' | 'compact';
  className?: string;
}

const VehicleContextHeader = ({
  vehicle,
  variant = 'full',
  className = '',
}: VehicleContextHeaderProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const vehicleTitle = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  if (variant === 'compact') {
    return (
      <div className={`vehicle-context vehicle-context--compact ${className}`}>
        <div className="vehicle-context__mini">
          <span className="vehicle-context__mini-icon">🚗</span>
          <span className="vehicle-context__mini-name">{vehicle.year} {vehicle.model}</span>
          <span className="vehicle-context__mini-price">{formatPrice(vehicle.msrp)}</span>
        </div>
      </div>
    );
  }

  return (
    <header className={`vehicle-context ${className}`}>
      <h1 className="vehicle-context__title">
        Find Dealers for {vehicleTitle}
      </h1>
      
      <div className="vehicle-context__content">
        <div className="vehicle-context__image-wrapper">
          <img
            src={vehicle.image}
            alt={vehicleTitle}
            className="vehicle-context__image"
            loading="eager"
          />
        </div>
        
        <div className="vehicle-context__details">
          <div className="vehicle-context__specs">
            <span className="vehicle-context__spec">
              <strong>MSRP</strong> {formatPrice(vehicle.msrp)}
            </span>
            
            {vehicle.bodyStyle && (
              <span className="vehicle-context__spec vehicle-context__spec--divider">
                {vehicle.bodyStyle}
              </span>
            )}
            
            {vehicle.mpg && (
              <span className="vehicle-context__spec vehicle-context__spec--divider">
                {vehicle.mpg} MPG
              </span>
            )}
            
            {vehicle.rating && (
              <span className="vehicle-context__spec vehicle-context__spec--divider vehicle-context__spec--rating">
                <Star size={14} fill="var(--color-gold)" stroke="var(--color-gold)" />
                {vehicle.rating} C/D Rating
              </span>
            )}
          </div>
          
          {vehicle.trim && (
            <span className="vehicle-context__trim">{vehicle.trim}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default VehicleContextHeader;

