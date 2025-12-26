import { Star } from 'lucide-react';
import './DealerLocatorMap.css';

export interface VehicleInfo {
  year: number;
  make: string;
  model: string;
  trim?: string;
  msrp: number;
  priceMin?: number;
  priceMax?: number;
  image: string;
  galleryImages?: string[]; // Array of images for slideshow
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
          <span className="vehicle-context__mini-name">{vehicle.year} {vehicle.model}</span>
          <div className="vehicle-context__mini-specs">
            <span className="vehicle-context__mini-spec">{formatPrice(vehicle.msrp)}</span>
            {vehicle.bodyStyle && (
              <span className="vehicle-context__mini-spec">{vehicle.bodyStyle}</span>
            )}
            {vehicle.mpg && (
              <span className="vehicle-context__mini-spec">{vehicle.mpg} MPG</span>
            )}
            {vehicle.rating && (
              <span className="vehicle-context__mini-spec">
                <Star size={12} fill="var(--color-gold)" stroke="var(--color-gold)" />
                {vehicle.rating}
              </span>
            )}
          </div>
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

