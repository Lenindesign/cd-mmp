import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { ArrowLeft, Star, Fuel, Gauge, Users, Package, Settings } from 'lucide-react';
import { getVehicleBySlug, getSimilarVehicles } from '../../services/vehicleService';
import './VehiclePage.css';

const VehiclePage = () => {
  const { year, make, model } = useParams<{ year: string; make: string; model: string }>();
  
  const slug = `${year}/${make}/${model}`;
  
  const vehicle = useMemo(() => getVehicleBySlug(slug), [slug]);
  
  const similarVehicles = useMemo(() => {
    if (!vehicle) return [];
    return getSimilarVehicles(vehicle, 4);
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="vehicle-page vehicle-page--not-found">
        <div className="container">
          <h1>Vehicle Not Found</h1>
          <p>Sorry, we couldn't find the vehicle you're looking for.</p>
          <Link to="/vehicles" className="vehicle-page__back-link">
            <ArrowLeft size={18} />
            Browse All Vehicles
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="vehicle-page">
      {/* Breadcrumb */}
      <div className="vehicle-page__breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/vehicles">Vehicles</Link>
          <span>/</span>
          <Link to={`/vehicles?make=${vehicle.make}`}>{vehicle.make}</Link>
          <span>/</span>
          <span>{vehicle.model}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="vehicle-page__hero">
        <div className="container">
          <div className="vehicle-page__hero-content">
            <div className="vehicle-page__hero-info">
              <Link to="/vehicles" className="vehicle-page__back-link">
                <ArrowLeft size={18} />
                Back to Vehicles
              </Link>
              
              <h1 className="vehicle-page__title">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              
              {vehicle.trim && (
                <span className="vehicle-page__trim">{vehicle.trim}</span>
              )}
              
              <div className="vehicle-page__rating">
                <div className="vehicle-page__rating-score">
                  <span className="vehicle-page__rating-number">{vehicle.staffRating}</span>
                  <span className="vehicle-page__rating-max">/10</span>
                </div>
                <span className="vehicle-page__rating-label">C/D RATING</span>
              </div>
              
              <div className="vehicle-page__price">
                <span className="vehicle-page__price-label">MSRP</span>
                <span className="vehicle-page__price-value">{vehicle.priceRange}</span>
              </div>
              
              <div className="vehicle-page__cta-group">
                <button className="vehicle-page__cta vehicle-page__cta--primary">
                  Shop Now
                </button>
                <button className="vehicle-page__cta vehicle-page__cta--secondary">
                  Build & Price
                </button>
              </div>
            </div>
            
            <div className="vehicle-page__hero-image">
              <img src={vehicle.image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Specs */}
      <section className="vehicle-page__specs">
        <div className="container">
          <h2 className="vehicle-page__section-title">Quick Specs</h2>
          <div className="vehicle-page__specs-grid">
            {vehicle.mpg && (
              <div className="vehicle-page__spec-card">
                <Fuel size={24} />
                <span className="vehicle-page__spec-value">{vehicle.mpg}</span>
                <span className="vehicle-page__spec-label">MPG (City/Hwy)</span>
              </div>
            )}
            {vehicle.horsepower && (
              <div className="vehicle-page__spec-card">
                <Gauge size={24} />
                <span className="vehicle-page__spec-value">{vehicle.horsepower}</span>
                <span className="vehicle-page__spec-label">Horsepower</span>
              </div>
            )}
            {vehicle.seatingCapacity && (
              <div className="vehicle-page__spec-card">
                <Users size={24} />
                <span className="vehicle-page__spec-value">{vehicle.seatingCapacity}</span>
                <span className="vehicle-page__spec-label">Passengers</span>
              </div>
            )}
            {vehicle.cargoSpace && (
              <div className="vehicle-page__spec-card">
                <Package size={24} />
                <span className="vehicle-page__spec-value">{vehicle.cargoSpace} cu ft</span>
                <span className="vehicle-page__spec-label">Cargo Space</span>
              </div>
            )}
            <div className="vehicle-page__spec-card">
              <Settings size={24} />
              <span className="vehicle-page__spec-value">{vehicle.transmission}</span>
              <span className="vehicle-page__spec-label">Transmission</span>
            </div>
            <div className="vehicle-page__spec-card">
              <Star size={24} />
              <span className="vehicle-page__spec-value">{vehicle.drivetrain}</span>
              <span className="vehicle-page__spec-label">Drivetrain</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {vehicle.features && vehicle.features.length > 0 && (
        <section className="vehicle-page__features">
          <div className="container">
            <h2 className="vehicle-page__section-title">Key Features</h2>
            <ul className="vehicle-page__features-list">
              {vehicle.features.map((feature, index) => (
                <li key={index} className="vehicle-page__feature-item">
                  <span className="vehicle-page__feature-check">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Gallery */}
      {vehicle.galleryImages && vehicle.galleryImages.length > 0 && (
        <section className="vehicle-page__gallery">
          <div className="container">
            <h2 className="vehicle-page__section-title">Gallery</h2>
            <div className="vehicle-page__gallery-grid">
              {vehicle.galleryImages.slice(0, 6).map((image, index) => (
                <div key={index} className="vehicle-page__gallery-item">
                  <img src={image} alt={`${vehicle.make} ${vehicle.model} - Image ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Similar Vehicles */}
      {similarVehicles.length > 0 && (
        <section className="vehicle-page__similar">
          <div className="container">
            <h2 className="vehicle-page__section-title">Similar Vehicles</h2>
            <div className="vehicle-page__similar-grid">
              {similarVehicles.map((similar) => (
                <Link 
                  key={similar.id} 
                  to={`/${similar.slug}`}
                  className="vehicle-page__similar-card"
                >
                  <div className="vehicle-page__similar-image">
                    <img src={similar.image} alt={`${similar.year} ${similar.make} ${similar.model}`} />
                  </div>
                  <div className="vehicle-page__similar-info">
                    <h3 className="vehicle-page__similar-name">
                      {similar.year} {similar.make} {similar.model}
                    </h3>
                    <div className="vehicle-page__similar-meta">
                      <span className="vehicle-page__similar-rating">{similar.staffRating}/10</span>
                      <span className="vehicle-page__similar-price">{formatCurrency(similar.priceMin)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default VehiclePage;

