import { useParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ChevronDown, 
  Fuel, 
  Gauge, 
  Users, 
  Cog,
  Shield,
  Star,
  Play,
  Bookmark,
  Share2,
  ArrowRight,
  Check
} from 'lucide-react';
import { getVehicleBySlug } from '../../services/vehicleService';
import { vehicleDatabase } from '../../data/vehicles';
import './VehiclePageConcept.css';

const VehiclePageConcept = () => {
  const params = useParams<{ year: string; make: string; model: string }>();
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const year = params.year;
  const make = params.make;
  const model = params.model;
  const slug = `${year}/${make}/${model}`;
  
  const vehicle = useMemo(() => getVehicleBySlug(slug), [slug]);

  // Get similar vehicles for comparison
  const similarVehicles = useMemo(() => {
    if (!vehicle) return [];
    return vehicleDatabase
      .filter(v => v.bodyStyle === vehicle.bodyStyle && v.id !== vehicle.id)
      .slice(0, 3);
  }, [vehicle]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      
      // Parallax effect on hero
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide the CarFinderChat FAB on this concept page
  useEffect(() => {
    const fab = document.querySelector('.car-finder-chat__fab') as HTMLElement;
    if (fab) {
      fab.style.display = 'none';
    }
    return () => {
      if (fab) {
        fab.style.display = '';
      }
    };
  }, []);

  // Auto-rotate gallery images
  useEffect(() => {
    if (!vehicle?.galleryImages?.length) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        (prev + 1) % (vehicle.galleryImages?.length || 1)
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [vehicle?.galleryImages?.length]);

  if (!vehicle) {
    return (
      <div className="concept concept--not-found">
        <div className="concept__not-found-content">
          <h1>Vehicle Not Found</h1>
          <p>The vehicle you're looking for doesn't exist.</p>
          <Link to="/vehicles" className="concept__back-link">
            <ArrowLeft size={18} />
            Browse All Vehicles
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = vehicle.galleryImages || [vehicle.image];
  const currentImage = galleryImages[currentImageIndex] || vehicle.image;

  const specs = [
    { 
      id: 'performance',
      icon: Gauge, 
      label: 'Performance', 
      value: `${vehicle.horsepower} HP`,
      detail: 'Twin-turbocharged inline-6 engine delivers exhilarating power with refined efficiency. 0-60 in 4.4 seconds.',
    },
    { 
      id: 'efficiency',
      icon: Fuel, 
      label: 'Efficiency', 
      value: `${vehicle.mpg} MPG`,
      detail: 'Combined city and highway fuel economy. Eco mode available for extended range driving.',
    },
    { 
      id: 'seating',
      icon: Users, 
      label: 'Capacity', 
      value: `${vehicle.seatingCapacity || 5} Seats`,
      detail: 'Spacious interior with premium leather seating. Rear seats fold flat for cargo flexibility.',
    },
    { 
      id: 'drivetrain',
      icon: Cog, 
      label: 'Drivetrain', 
      value: vehicle.drivetrain || 'AWD',
      detail: 'Intelligent all-wheel drive system adapts to road conditions in real-time.',
    },
  ];

  const highlights = [
    'Best-in-class safety ratings',
    'Premium interior materials',
    'Advanced driver assistance',
    'Wireless Apple CarPlay & Android Auto',
    'Panoramic moonroof',
    'Adaptive suspension',
  ];

  return (
    <div className="concept">
      {/* Floating Navigation */}
      <nav className={`concept__nav ${isScrolled ? 'concept__nav--scrolled' : ''}`}>
        <Link to="/vehicles" className="concept__nav-back">
          <ArrowLeft size={20} />
        </Link>
        <div className="concept__nav-title">
          {isScrolled && (
            <span>{vehicle.year} {vehicle.make} {vehicle.model}</span>
          )}
        </div>
        <div className="concept__nav-actions">
          <button className="concept__nav-btn" aria-label="Save vehicle">
            <Bookmark size={20} />
          </button>
          <button className="concept__nav-btn" aria-label="Share">
            <Share2 size={20} />
          </button>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="concept__hero">
        <div className="concept__hero-image-wrapper">
          <div 
            ref={heroRef}
            className="concept__hero-image"
            style={{ backgroundImage: `url(${currentImage})` }}
          />
          <div className="concept__hero-overlay" />
        </div>

        {/* Gallery Progress - Top of screen */}
        {galleryImages.length > 1 && (
          <div className="concept__gallery-progress">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                className={`concept__gallery-progress-item ${idx === currentImageIndex ? 'concept__gallery-progress-item--active' : ''} ${idx < currentImageIndex ? 'concept__gallery-progress-item--complete' : ''}`}
                onClick={() => setCurrentImageIndex(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <span className="concept__gallery-progress-fill" />
              </button>
            ))}
          </div>
        )}

        <div className="concept__hero-content">
          {/* Badges */}
          {(vehicle.editorsChoice || vehicle.tenBest) && (
            <div className="concept__badges">
              {vehicle.editorsChoice && (
                <span className="concept__badge concept__badge--ec">Editor's Choice</span>
              )}
              {vehicle.tenBest && (
                <span className="concept__badge concept__badge--10best">10Best</span>
              )}
            </div>
          )}

          <div className="concept__hero-text">
            <span className="concept__year">{vehicle.year}</span>
            <h1 className="concept__title">
              <span className="concept__make">{vehicle.make}</span>
              <span className="concept__model">{vehicle.model}</span>
            </h1>
          </div>

          <div className="concept__hero-meta">
            <div className="concept__rating">
              <Star size={18} fill="currentColor" />
              <span className="concept__rating-value">{vehicle.staffRating}</span>
              <span className="concept__rating-max">/10</span>
            </div>
            <span className="concept__divider">•</span>
            <span className="concept__price">{vehicle.priceRange}</span>
          </div>

          {/* Scroll Indicator */}
          <button 
            className="concept__scroll-hint"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            aria-label="Scroll to learn more"
          >
            <span>Discover</span>
            <ChevronDown size={24} />
          </button>
        </div>
      </section>

      {/* Overview Section */}
      <section className="concept__section concept__overview">
        <div className="concept__container">
          <p className="concept__tagline">
            The {vehicle.make} {vehicle.model} represents the pinnacle of {vehicle.bodyStyle.toLowerCase()} design—where performance meets everyday practicality.
          </p>
          
          <div className="concept__cta-row">
            <button className="concept__cta concept__cta--primary">
              <span>Shop New</span>
              <ArrowRight size={18} />
            </button>
            <button className="concept__cta concept__cta--secondary">
              <span>Shop Used</span>
            </button>
            <button className="concept__cta concept__cta--tertiary">
              <span>Get Trade-In Value</span>
            </button>
          </div>
        </div>
      </section>

      {/* Specs Section - Progressive Disclosure */}
      <section className="concept__section concept__specs">
        <div className="concept__container">
          <h2 className="concept__section-title">At a Glance</h2>
          
          <div className="concept__specs-grid">
            {specs.map((spec) => (
              <button
                key={spec.id}
                className={`concept__spec-card ${expandedSpec === spec.id ? 'concept__spec-card--expanded' : ''}`}
                onClick={() => setExpandedSpec(expandedSpec === spec.id ? null : spec.id)}
              >
                <div className="concept__spec-header">
                  <spec.icon size={24} strokeWidth={1.5} />
                  <div className="concept__spec-info">
                    <span className="concept__spec-value">{spec.value}</span>
                    <span className="concept__spec-label">{spec.label}</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`concept__spec-chevron ${expandedSpec === spec.id ? 'concept__spec-chevron--rotated' : ''}`}
                  />
                </div>
                {expandedSpec === spec.id && (
                  <p className="concept__spec-detail">{spec.detail}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width Image Break */}
      <section className="concept__image-break">
        <img 
          src={galleryImages[1] || vehicle.image} 
          alt={`${vehicle.make} ${vehicle.model} interior`}
        />
        <div className="concept__image-break-caption">
          <span>Interior crafted with precision</span>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="concept__section concept__highlights">
        <div className="concept__container">
          <h2 className="concept__section-title">Why We Love It</h2>
          
          <ul className="concept__highlights-list">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="concept__highlight-item">
                <Check size={20} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="concept__section concept__pricing">
        <div className="concept__container">
          <h2 className="concept__section-title">Pricing</h2>
          
          <div className="concept__pricing-card">
            <div className="concept__pricing-header">
              <span className="concept__pricing-label">Starting MSRP</span>
              <span className="concept__pricing-value">${vehicle.priceMin.toLocaleString()}</span>
            </div>
            <div className="concept__pricing-range">
              <div className="concept__pricing-bar">
                <div className="concept__pricing-fill" style={{ width: '30%' }} />
                <div className="concept__pricing-marker" style={{ left: '30%' }} />
              </div>
              <div className="concept__pricing-labels">
                <span>Base</span>
                <span>${vehicle.priceMax.toLocaleString()}</span>
              </div>
            </div>
            <p className="concept__pricing-note">
              Price excludes destination, taxes, and fees. Actual pricing may vary.
            </p>
          </div>
        </div>
      </section>

      {/* Compare Section */}
      {similarVehicles.length > 0 && (
        <section className="concept__section concept__compare">
          <div className="concept__container">
            <h2 className="concept__section-title">Compare Alternatives</h2>
            
            <div className="concept__compare-grid">
              {similarVehicles.map((similar) => (
                <Link 
                  key={similar.id}
                  to={`/vehicles/${similar.slug}`}
                  className="concept__compare-card"
                >
                  <div className="concept__compare-image">
                    <img src={similar.image} alt={`${similar.make} ${similar.model}`} />
                  </div>
                  <div className="concept__compare-info">
                    <span className="concept__compare-name">
                      {similar.year} {similar.make} {similar.model}
                    </span>
                    <span className="concept__compare-price">{similar.priceRange}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="concept__section concept__final-cta">
        <div className="concept__container">
          <h2 className="concept__final-title">Ready to Experience the {vehicle.model}?</h2>
          <p className="concept__final-subtitle">Find dealers near you with available inventory.</p>
          <button className="concept__cta concept__cta--large">
            <span>Find a Dealer</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="concept__footer-spacer" />
    </div>
  );
};

export default VehiclePageConcept;

