/**
 * VehiclePageApple - Apple-Inspired Vehicle Page
 * 
 * Design Philosophy:
 * - Human-centered design with focus on emotional connection
 * - Generous whitespace for visual breathing room
 * - Progressive disclosure - show what matters, hide complexity
 * - Smooth animations that feel natural
 * - Typography as the primary design element
 * - Minimal chrome, maximum content
 * - Accessibility-first approach
 */

import { useParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect, useRef } from 'react';
import { ChevronDown, Heart, Share2, ArrowRight, Check, Star, Shield, Zap, Gauge, Calendar, MapPin } from 'lucide-react';
import { getVehicleBySlug, getAllVehicles } from '../../services/vehicleService';
import { useAuth } from '../../contexts/AuthContext';
import { OptimizedImage } from '../../components/OptimizedImage';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import './VehiclePageApple.css';

const VehiclePageApple = () => {
  const { year, make, model } = useParams<{ year: string; make: string; model: string }>();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Build slug from URL params
  const slug = useMemo(() => {
    if (year && make && model) {
      return `${year}/${make}/${model}`;
    }
    return '';
  }, [year, make, model]);

  // Get vehicle data
  const vehicle = useMemo(() => {
    if (!slug) return null;
    return getVehicleBySlug(slug);
  }, [slug]);

  // Get competitors for comparison
  const competitors = useMemo(() => {
    if (!vehicle) return [];
    return getAllVehicles()
      .filter(v => 
        v.bodyStyle === vehicle.bodyStyle && 
        v.id !== vehicle.id &&
        Math.abs(v.priceMin - vehicle.priceMin) < 15000
      )
      .slice(0, 3);
  }, [vehicle]);

  // Check if vehicle is saved
  const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : '';
  const isSaved = user?.savedVehicles?.some(v => v.name === vehicleName) || false;

  // Handle save/unsave
  const handleSaveClick = () => {
    if (!vehicle) return;
    
    if (!isAuthenticated) {
      setShowSignInModal(true);
      return;
    }
    
    if (isSaved) {
      const savedVehicle = user?.savedVehicles?.find(v => v.name === vehicleName);
      if (savedVehicle) {
        removeSavedVehicle(savedVehicle.id);
      }
    } else {
      addSavedVehicle({
        id: `${vehicle.year}-${vehicle.make}-${vehicle.model}`.toLowerCase().replace(/\s+/g, '-'),
        name: vehicleName,
        ownership: 'want',
      });
    }
  };

  // Scroll detection for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for section highlighting
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('data-section') || 'overview');
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  if (!vehicle) {
    return (
      <div className="apple-page apple-page--not-found">
        <div className="apple-page__not-found">
          <h1>Vehicle not found</h1>
          <p>We couldn't find the vehicle you're looking for.</p>
          <Link to="/vehicles" className="apple-page__back-link">
            Browse all vehicles
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = vehicle.galleryImages || [vehicle.image];

  return (
    <div className="apple-page">
      {/* Sticky Navigation */}
      <nav className={`apple-nav ${isScrolled ? 'apple-nav--visible' : ''}`}>
        <div className="apple-nav__container">
          <span className="apple-nav__title">{vehicle.year} {vehicle.make} {vehicle.model}</span>
          <div className="apple-nav__links">
            {['Overview', 'Gallery', 'Features', 'Pricing', 'Compare'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`apple-nav__link ${activeSection === item.toLowerCase() ? 'apple-nav__link--active' : ''}`}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="apple-nav__actions">
            <button className="apple-nav__btn apple-nav__btn--primary">
              Shop Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full-Screen Immersive (Apple Style) */}
      <section className="apple-hero" ref={heroRef} data-section="overview">
        {/* Full-screen background image */}
        <div className="apple-hero__image">
          <OptimizedImage
            src={vehicle.galleryImages?.[0] || vehicle.image}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="apple-hero__img"
          />
        </div>
        
        {/* Gradient overlay for text readability */}
        <div className="apple-hero__overlay" />
        
        {/* Content positioned at bottom */}
        <div className="apple-hero__content">
          <div className="apple-hero__text">
            <p className="apple-hero__eyebrow">Introducing</p>
            <h1 className="apple-hero__title">
              {vehicle.year} {vehicle.make}
              <span className="apple-hero__title-model">{vehicle.model}</span>
            </h1>
            <p className="apple-hero__tagline">Designed for the road ahead.</p>
            
            <div className="apple-hero__rating">
              <div className="apple-hero__rating-score">
                <span className="apple-hero__rating-number">{vehicle.staffRating}</span>
                <span className="apple-hero__rating-max">/10</span>
              </div>
              <div className="apple-hero__rating-label">
                <Check size={16} />
                <span>C/D Rating</span>
              </div>
            </div>

            <div className="apple-hero__price">
              <span className="apple-hero__price-label">Starting at</span>
              <span className="apple-hero__price-value">${vehicle.priceMin.toLocaleString()}</span>
            </div>

            <div className="apple-hero__actions">
              <button className="apple-btn apple-btn--primary apple-btn--large">
                Shop New {vehicle.model}
                <ArrowRight size={20} />
              </button>
              <button className="apple-btn apple-btn--secondary apple-btn--large">
                Build & Price
              </button>
            </div>

            <div className="apple-hero__meta">
              <button 
                className={`apple-hero__save ${isSaved ? 'apple-hero__save--active' : ''}`}
                onClick={handleSaveClick}
              >
                <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
              <button className="apple-hero__share">
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        <div className="apple-hero__scroll-hint">
          <ChevronDown size={24} />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Key Highlights - Quick Scannable Info */}
      <section className="apple-highlights">
        <div className="apple-highlights__container">
          <div className="apple-highlight">
            <div className="apple-highlight__icon">
              <Gauge size={28} />
            </div>
            <div className="apple-highlight__content">
              <span className="apple-highlight__value">{vehicle.horsepower || '200+'}</span>
              <span className="apple-highlight__label">Horsepower</span>
            </div>
          </div>
          <div className="apple-highlight">
            <div className="apple-highlight__icon">
              <Zap size={28} />
            </div>
            <div className="apple-highlight__content">
              <span className="apple-highlight__value">{vehicle.mpg || '32 MPG'}</span>
              <span className="apple-highlight__label">Combined MPG</span>
            </div>
          </div>
          <div className="apple-highlight">
            <div className="apple-highlight__icon">
              <Shield size={28} />
            </div>
            <div className="apple-highlight__content">
              <span className="apple-highlight__value">5-Star</span>
              <span className="apple-highlight__label">Safety Rating</span>
            </div>
          </div>
          <div className="apple-highlight">
            <div className="apple-highlight__icon">
              <Calendar size={28} />
            </div>
            <div className="apple-highlight__content">
              <span className="apple-highlight__value">3yr/36k</span>
              <span className="apple-highlight__label">Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Visual Storytelling */}
      <section className="apple-gallery" data-section="gallery" id="gallery">
        <div className="apple-section__header">
          <h2 className="apple-section__title">Every angle, considered.</h2>
          <p className="apple-section__subtitle">
            Explore the design details that make the {vehicle.model} stand out.
          </p>
        </div>

        <div className="apple-gallery__grid">
          {galleryImages.slice(0, 4).map((img, index) => (
            <div key={index} className={`apple-gallery__item apple-gallery__item--${index + 1}`}>
              <OptimizedImage
                src={img}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} - View ${index + 1}`}
                className="apple-gallery__img"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section - Progressive Disclosure */}
      <section className="apple-features" data-section="features" id="features">
        <div className="apple-section__header">
          <h2 className="apple-section__title">Features that matter.</h2>
          <p className="apple-section__subtitle">
            Every detail designed with you in mind.
          </p>
        </div>

        <div className="apple-features__grid">
          <div className="apple-feature">
            <div className="apple-feature__visual">
              <div className="apple-feature__icon-large">
                <Shield size={48} />
              </div>
            </div>
            <div className="apple-feature__content">
              <h3 className="apple-feature__title">Advanced Safety</h3>
              <p className="apple-feature__desc">
                Comprehensive suite of driver-assistance features including automatic emergency braking, 
                lane-keeping assist, and adaptive cruise control.
              </p>
              <ul className="apple-feature__list">
                <li><Check size={16} /> Forward Collision Warning</li>
                <li><Check size={16} /> Blind Spot Monitoring</li>
                <li><Check size={16} /> Rear Cross-Traffic Alert</li>
              </ul>
            </div>
          </div>

          <div className="apple-feature apple-feature--reverse">
            <div className="apple-feature__visual">
              <div className="apple-feature__icon-large">
                <Zap size={48} />
              </div>
            </div>
            <div className="apple-feature__content">
              <h3 className="apple-feature__title">Efficient Performance</h3>
              <p className="apple-feature__desc">
                Engineered for the perfect balance of power and efficiency. 
                Get where you're going with fewer stops.
              </p>
              <ul className="apple-feature__list">
                <li><Check size={16} /> {vehicle.mpg || '28/36'} MPG (City/Highway)</li>
                <li><Check size={16} /> {vehicle.horsepower || '200'}+ Horsepower</li>
                <li><Check size={16} /> Responsive Transmission</li>
              </ul>
            </div>
          </div>

          <div className="apple-feature">
            <div className="apple-feature__visual">
              <div className="apple-feature__icon-large">
                <Star size={48} />
              </div>
            </div>
            <div className="apple-feature__content">
              <h3 className="apple-feature__title">Premium Interior</h3>
              <p className="apple-feature__desc">
                Step inside a cabin designed for comfort on every journey. 
                Quality materials and intuitive technology throughout.
              </p>
              <ul className="apple-feature__list">
                <li><Check size={16} /> Touchscreen Infotainment</li>
                <li><Check size={16} /> Wireless Apple CarPlay & Android Auto</li>
                <li><Check size={16} /> Premium Audio System</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Clear & Transparent */}
      <section className="apple-pricing" data-section="pricing" id="pricing">
        <div className="apple-section__header apple-section__header--light">
          <h2 className="apple-section__title">Simple pricing.</h2>
          <p className="apple-section__subtitle">
            Find the {vehicle.model} that's right for you.
          </p>
        </div>

        <div className="apple-pricing__cards">
          <div className="apple-pricing__card">
            <div className="apple-pricing__card-header">
              <span className="apple-pricing__trim">Base</span>
              <span className="apple-pricing__price">${vehicle.priceMin.toLocaleString()}</span>
            </div>
            <p className="apple-pricing__desc">Everything you need to get started.</p>
            <ul className="apple-pricing__features">
              <li><Check size={16} /> Standard Safety Features</li>
              <li><Check size={16} /> 7" Touchscreen Display</li>
              <li><Check size={16} /> Apple CarPlay & Android Auto</li>
              <li><Check size={16} /> Bluetooth Connectivity</li>
            </ul>
            <button className="apple-btn apple-btn--outline apple-btn--full">
              Build This Trim
            </button>
          </div>

          <div className="apple-pricing__card apple-pricing__card--featured">
            <div className="apple-pricing__badge">Most Popular</div>
            <div className="apple-pricing__card-header">
              <span className="apple-pricing__trim">Premium</span>
              <span className="apple-pricing__price">${Math.round(vehicle.priceMin * 1.15).toLocaleString()}</span>
            </div>
            <p className="apple-pricing__desc">The perfect balance of features and value.</p>
            <ul className="apple-pricing__features">
              <li><Check size={16} /> Everything in Base, plus:</li>
              <li><Check size={16} /> 10.25" Touchscreen Display</li>
              <li><Check size={16} /> Leather-Wrapped Steering Wheel</li>
              <li><Check size={16} /> Heated Front Seats</li>
              <li><Check size={16} /> Wireless Phone Charging</li>
            </ul>
            <button className="apple-btn apple-btn--primary apple-btn--full">
              Build This Trim
            </button>
          </div>

          <div className="apple-pricing__card">
            <div className="apple-pricing__card-header">
              <span className="apple-pricing__trim">Limited</span>
              <span className="apple-pricing__price">${vehicle.priceMax.toLocaleString()}</span>
            </div>
            <p className="apple-pricing__desc">The ultimate {vehicle.model} experience.</p>
            <ul className="apple-pricing__features">
              <li><Check size={16} /> Everything in Premium, plus:</li>
              <li><Check size={16} /> Premium Audio System</li>
              <li><Check size={16} /> Panoramic Sunroof</li>
              <li><Check size={16} /> Ventilated Front Seats</li>
              <li><Check size={16} /> Head-Up Display</li>
            </ul>
            <button className="apple-btn apple-btn--outline apple-btn--full">
              Build This Trim
            </button>
          </div>
        </div>
      </section>

      {/* Compare Section - Side by Side */}
      <section className="apple-compare" data-section="compare" id="compare">
        <div className="apple-section__header">
          <h2 className="apple-section__title">See how it compares.</h2>
          <p className="apple-section__subtitle">
            The {vehicle.model} stands out from the competition.
          </p>
        </div>

        <div className="apple-compare__table">
          <div className="apple-compare__header">
            <div className="apple-compare__cell apple-compare__cell--empty"></div>
            <div className="apple-compare__cell apple-compare__cell--featured">
              <span className="apple-compare__vehicle-name">{vehicle.year} {vehicle.make} {vehicle.model}</span>
              <span className="apple-compare__price">${vehicle.priceMin.toLocaleString()}</span>
            </div>
            {competitors.map((comp) => (
              <div key={comp.id} className="apple-compare__cell">
                <span className="apple-compare__vehicle-name">{comp.year} {comp.make} {comp.model}</span>
                <span className="apple-compare__price">${comp.priceMin.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="apple-compare__row">
            <div className="apple-compare__cell apple-compare__cell--label">C/D Rating</div>
            <div className="apple-compare__cell apple-compare__cell--featured">
              <span className="apple-compare__value">{vehicle.staffRating}/10</span>
            </div>
            {competitors.map((comp) => (
              <div key={comp.id} className="apple-compare__cell">
                <span className="apple-compare__value">{comp.staffRating}/10</span>
              </div>
            ))}
          </div>

          <div className="apple-compare__row">
            <div className="apple-compare__cell apple-compare__cell--label">Starting Price</div>
            <div className="apple-compare__cell apple-compare__cell--featured">
              <span className="apple-compare__value">${vehicle.priceMin.toLocaleString()}</span>
            </div>
            {competitors.map((comp) => (
              <div key={comp.id} className="apple-compare__cell">
                <span className="apple-compare__value">${comp.priceMin.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="apple-compare__row">
            <div className="apple-compare__cell apple-compare__cell--label">Body Style</div>
            <div className="apple-compare__cell apple-compare__cell--featured">
              <span className="apple-compare__value">{vehicle.bodyStyle}</span>
            </div>
            {competitors.map((comp) => (
              <div key={comp.id} className="apple-compare__cell">
                <span className="apple-compare__value">{comp.bodyStyle}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="apple-compare__cta">
          <Link to="/vehicles" className="apple-btn apple-btn--secondary">
            Compare More Vehicles
          </Link>
        </div>
      </section>

      {/* CTA Section - Clear Next Step */}
      <section className="apple-cta">
        <div className="apple-cta__content">
          <h2 className="apple-cta__title">Ready to make it yours?</h2>
          <p className="apple-cta__subtitle">
            Find your perfect {vehicle.model} at a dealer near you.
          </p>
          <div className="apple-cta__actions">
            <button className="apple-btn apple-btn--white apple-btn--large">
              <MapPin size={20} />
              Find a Dealer
            </button>
            <button className="apple-btn apple-btn--outline-white apple-btn--large">
              Request a Quote
            </button>
          </div>
        </div>
      </section>

      {/* Sign In to Save Modal */}
      <SignInToSaveModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        itemType="vehicle"
        itemName={vehicleName}
        itemImage={vehicle?.image}
      />
    </div>
  );
};

export default VehiclePageApple;

