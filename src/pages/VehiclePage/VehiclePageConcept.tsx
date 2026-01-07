import { useParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  ChevronDown, 
  Fuel, 
  Gauge, 
  Users, 
  Cog,
  Star,
  Bookmark,
  Share2,
  ArrowRight,
  Check,
  Minus,
  Plus
} from 'lucide-react';
import { getVehicleBySlug, getAvailableYears } from '../../services/vehicleService';
import { vehicleDatabase } from '../../data/vehicles';
import { DealerLocatorMap } from '../../components/DealerLocatorMap';
import TrimSelector from '../../components/TrimSelector/TrimSelector';
import { getVehicleTrims } from '../../services/trimService';
import FuelEconomy from '../../components/FuelEconomy/FuelEconomy';
import './VehiclePageConcept.css';

const VehiclePageConcept = () => {
  const params = useParams<{ year: string; make: string; model: string }>();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);
  const [showDealerMap, setShowDealerMap] = useState(false);
  const [showTrimSelector, setShowTrimSelector] = useState(false);
  const [showFuelEconomy, setShowFuelEconomy] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  
  const year = params.year;
  const make = params.make;
  const model = params.model;
  const slug = `${year}/${make}/${model}`;
  
  const vehicle = useMemo(() => getVehicleBySlug(slug), [slug]);
  
  // Check if vehicle is saved
  const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : '';
  const isSaved = user?.savedVehicles?.some(v => v.name === vehicleName) || false;
  
  const handleSaveClick = () => {
    if (!isAuthenticated || !vehicle) return;
    
    if (isSaved) {
      const savedVehicle = user?.savedVehicles?.find(v => v.name === vehicleName);
      if (savedVehicle) {
        removeSavedVehicle(savedVehicle.id);
      }
    } else {
      addSavedVehicle({
        id: `${vehicle.slug}-${Date.now()}`,
        name: vehicleName,
        ownership: 'want',
      });
    }
  };

  // Get similar vehicles for comparison
  const similarVehicles = useMemo(() => {
    if (!vehicle) return [];
    return vehicleDatabase
      .filter(v => v.bodyStyle === vehicle.bodyStyle && v.id !== vehicle.id)
      .slice(0, 3);
  }, [vehicle]);

  // Get trims for this vehicle
  const vehicleTrims = useMemo(() => {
    if (!vehicle) return [];
    return getVehicleTrims(vehicle.make, vehicle.model, vehicle.priceMin, vehicle.priceMax);
  }, [vehicle]);

  // Get available years for this make/model
  const availableYears = useMemo(() => {
    if (!vehicle) return [];
    return getAvailableYears(vehicle.make, vehicle.model);
  }, [vehicle]);

  // Close year dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle year selection
  const handleYearSelect = (selectedYear: string) => {
    setIsYearDropdownOpen(false);
    // Navigate to the concept page for the selected year
    window.location.href = `/${selectedYear}/${vehicle?.make}/${vehicle?.model}/concept`;
  };

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showDealerMap) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDealerMap]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showDealerMap) {
        setShowDealerMap(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showDealerMap]);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Build gallery media (images + video for specific vehicles)
  const galleryMedia = useMemo(() => {
    if (!vehicle) return [{ type: 'image' as const, src: '' }];
    
    const baseImages = vehicle.galleryImages || [vehicle.image];
    
    // Custom gallery for Mazda CX-5 with Hearst images and video
    if (vehicle.make === 'Mazda' && vehicle.model === 'CX-5') {
      return [
        { type: 'image' as const, src: 'https://hips.hearstapps.com/mtg-prod/6778870454a81800085167ef/18-2025-mazda-cx-90-front-view.jpg' },
        { type: 'video' as const, src: 'https://aceray.com/wp-content/uploads/2026/01/mazda-x4-broll.mp4' },
        { type: 'image' as const, src: 'https://hips.hearstapps.com/mtg-prod/686c4f4fbf3cec0002569567/2026mazdacx-514.jpg' },
        { type: 'image' as const, src: 'https://hips.hearstapps.com/mtg-prod/686c4f46308c7d00024e576e/2026mazdacx-55.jpg' },
      ];
    }
    
    return baseImages.map(src => ({ type: 'image' as const, src }));
  }, [vehicle]);

  const currentMedia = galleryMedia[currentImageIndex] || { type: 'image', src: '' };

  // Preload images
  useEffect(() => {
    if (!vehicle) return;
    
    const imageUrls = galleryMedia
      .filter(m => m.type === 'image')
      .map(m => m.src);
    
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= 1) { // Show as soon as first image loads
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= 1) {
          setImagesLoaded(true);
        }
      };
      img.src = url;
    });
  }, [vehicle, galleryMedia]);

  // Auto-rotate gallery (pause on video)
  useEffect(() => {
    if (galleryMedia.length <= 1) return;
    // Don't auto-rotate if current slide is a video
    if (currentMedia.type === 'video') return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % galleryMedia.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryMedia.length, currentMedia.type]);

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

  // Editorial Review Content
  const editorialReview = {
    headline: `${vehicle.year} ${vehicle.make} ${vehicle.model} Review: The Benchmark Evolves`,
    author: 'Eric Stafford',
    authorTitle: 'Senior Editor',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    leadParagraph: `The ${vehicle.year} ${vehicle.make} ${vehicle.model} continues to set the standard in the ${vehicle.bodyStyle.toLowerCase()} segment, delivering a compelling blend of performance, comfort, and technology that few rivals can match. After spending a week with this latest iteration, we came away impressed by how ${vehicle.make} has refined an already excellent formula.`,
    fullReview: [
      {
        heading: 'Driving Impressions',
        content: `Behind the wheel, the ${vehicle.model} feels planted and confident. The steering is precise with good feedback, and the chassis strikes an excellent balance between comfort and sportiness. Whether navigating city traffic or carving through mountain roads, this ${vehicle.bodyStyle.toLowerCase()} never feels out of its element. The ${vehicle.horsepower} horsepower engine provides more than adequate thrust, with smooth power delivery throughout the rev range.`
      },
      {
        heading: 'Interior & Technology',
        content: `Step inside and you're greeted by a cabin that punches well above its price point. Material quality is excellent, with soft-touch surfaces where your hands naturally rest. The infotainment system is intuitive and responsive, featuring wireless Apple CarPlay and Android Auto. The digital gauge cluster is crisp and customizable, though some may miss traditional analog dials.`
      },
      {
        heading: 'Practicality',
        content: `With seating for ${vehicle.seatingCapacity || 5} and a generous cargo area, the ${vehicle.model} handles daily duties with ease. Rear-seat passengers enjoy ample legroom, and the trunk swallows luggage without complaint. Fuel economy of ${vehicle.mpg} MPG combined means fewer stops at the pump, a welcome trait for commuters and road-trippers alike.`
      },
      {
        heading: 'The Verdict',
        content: `The ${vehicle.year} ${vehicle.make} ${vehicle.model} earns its reputation as a segment leader. It's not the flashiest choice, nor the most affordable, but it delivers a well-rounded package that's difficult to fault. For buyers seeking a refined, reliable, and rewarding ${vehicle.bodyStyle.toLowerCase()}, this should be at the top of your shopping list.`
      }
    ]
  };

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
          <div className={`concept__hero-image-wrapper ${imagesLoaded ? 'concept__hero-image-wrapper--loaded' : ''}`} ref={heroRef}>
            {currentMedia.type === 'video' ? (
              <video
                className="concept__hero-video"
                src={currentMedia.src}
                autoPlay
                muted
                playsInline
                onEnded={() => setCurrentImageIndex(prev => (prev + 1) % galleryMedia.length)}
              />
            ) : (
              <div 
                className="concept__hero-image"
                style={{ backgroundImage: `url(${currentMedia.src})` }}
              />
            )}
            <div className="concept__hero-overlay" />
          </div>

          {/* Gallery Progress & Save - Top of screen */}
          <div className="concept__top-bar">
            <div className="concept__top-bar-spacer" />
            {galleryMedia.length > 1 && (
              <div className="concept__gallery-progress">
                {galleryMedia.map((media, idx) => (
                  <button
                    key={idx}
                    className={`concept__gallery-progress-item ${idx === currentImageIndex ? 'concept__gallery-progress-item--active' : ''} ${idx < currentImageIndex ? 'concept__gallery-progress-item--complete' : ''} ${media.type === 'video' ? 'concept__gallery-progress-item--video' : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    aria-label={media.type === 'video' ? `Play video` : `View image ${idx + 1}`}
                  >
                    <span className="concept__gallery-progress-fill" />
                  </button>
                ))}
              </div>
            )}
            <button 
              className={`concept__save-btn ${isSaved ? 'concept__save-btn--saved' : ''}`}
              onClick={handleSaveClick}
              aria-label={isSaved ? 'Remove from saved' : 'Save vehicle'}
            >
              <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>

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
            <div className="concept__year-make-row">
              <div className="concept__year-selector" ref={yearDropdownRef}>
                <button 
                  className={`concept__year-pill ${isYearDropdownOpen ? 'concept__year-pill--open' : ''}`}
                  onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                  aria-expanded={isYearDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span>{vehicle.year}</span>
                  <ChevronDown size={14} className={`concept__year-chevron ${isYearDropdownOpen ? 'concept__year-chevron--rotated' : ''}`} />
                </button>
                
                {isYearDropdownOpen && (
                  <ul className="concept__year-dropdown" role="listbox">
                    {availableYears.length > 1 ? (
                      availableYears.map((yr) => (
                        <li 
                          key={yr}
                          role="option"
                          aria-selected={yr === String(vehicle.year)}
                          className={`concept__year-option ${yr === String(vehicle.year) ? 'concept__year-option--selected' : ''}`}
                          onClick={() => handleYearSelect(yr)}
                        >
                          {yr}
                        </li>
                      ))
                    ) : (
                      <li className="concept__year-option concept__year-option--only">
                        Only {vehicle.year} available
                      </li>
                    )}
                  </ul>
                )}
              </div>
              <span className="concept__make">{vehicle.make}</span>
            </div>
            <h1 className="concept__title">
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

      {/* Editorial Review Section */}
      <section className="concept__section concept__review">
        <div className="concept__container concept__container--wide">
          <article className="concept__review-article">
            <header className="concept__review-header">
              <h2 className="concept__review-headline">{editorialReview.headline}</h2>
              <div className="concept__review-meta">
                <div className="concept__review-author">
                  <span className="concept__review-author-name">{editorialReview.author}</span>
                  <span className="concept__review-author-title">{editorialReview.authorTitle}</span>
                </div>
                <time className="concept__review-date">{editorialReview.date}</time>
              </div>
            </header>

            <div className="concept__review-content">
              <p className="concept__review-lead">{editorialReview.leadParagraph}</p>
              
              <div className={`concept__review-full ${isReviewExpanded ? 'concept__review-full--expanded' : ''}`}>
                {editorialReview.fullReview.map((section, idx) => (
                  <div key={idx} className="concept__review-section">
                    <h3 className="concept__review-section-heading">{section.heading}</h3>
                    <p className="concept__review-section-content">{section.content}</p>
                  </div>
                ))}
              </div>

              <button 
                className="concept__review-toggle"
                onClick={() => setIsReviewExpanded(!isReviewExpanded)}
                aria-expanded={isReviewExpanded}
              >
                {isReviewExpanded ? (
                  <>
                    <Minus size={18} />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    <span>Read Full Review</span>
                  </>
                )}
              </button>
            </div>
          </article>
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
                  <div className="concept__spec-expanded">
                    <p className="concept__spec-detail">{spec.detail}</p>
                    {spec.id === 'efficiency' && (
                      <button 
                        className="concept__spec-cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFuelEconomy(true);
                        }}
                      >
                        View Full EPA Data
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width Image Break - Interior */}
      <section className="concept__image-break">
        <img 
          src="https://hips.hearstapps.com/mtg-prod/66984f2dc46bda0008bb416b/8-2025-mazda-cx-5-interior.jpg" 
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
          <div className="concept__pricing-header-row">
            <h2 className="concept__section-title">Pricing</h2>
            <button 
              className="concept__compare-trims-btn"
              onClick={() => setShowTrimSelector(true)}
            >
              See All Trims
              <ArrowRight size={16} />
            </button>
          </div>
          
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
                  to={`/${similar.slug}/concept`}
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
          <button 
            className="concept__cta concept__cta--large"
            onClick={() => setShowDealerMap(true)}
          >
            <span>Find a Dealer</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Dealer Locator Modal */}
      {showDealerMap && (
        <div className="concept__modal-overlay" onClick={() => setShowDealerMap(false)}>
          <div 
            className="concept__modal" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dealer-modal-title"
          >
            <div className="concept__modal-header">
              <h2 id="dealer-modal-title" className="concept__modal-title">
                Find {vehicle.make} Dealers Near You
              </h2>
              <button 
                className="concept__modal-close"
                onClick={() => setShowDealerMap(false)}
                aria-label="Close dealer map"
              >
                <Plus size={24} style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>
            <div className="concept__modal-body">
              <DealerLocatorMap
                vehicle={{
                  year: parseInt(vehicle.year),
                  make: vehicle.make,
                  model: vehicle.model,
                  image: vehicle.image,
                  galleryImages: vehicle.galleryImages,
                  msrp: vehicle.priceMin,
                  priceMin: vehicle.priceMin,
                  priceMax: vehicle.priceMax,
                  bodyStyle: vehicle.bodyStyle,
                  mpg: vehicle.mpg ? parseInt(vehicle.mpg) : undefined,
                  rating: vehicle.staffRating,
                }}
                cardVariant="compact"
                initialLocation={{ lat: 34.0522, lng: -118.2437 }}
                initialZipCode="Los Angeles, CA"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer Spacer */}
      <div className="concept__footer-spacer" />

      {/* Compare Trims Modal */}
      {showTrimSelector && (
        <div 
          className="concept__modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowTrimSelector(false);
          }}
        >
          <div className="concept__modal concept__modal--trims">
            <button 
              className="concept__modal-close"
              onClick={() => setShowTrimSelector(false)}
              aria-label="Close"
            >
              ×
            </button>
            <TrimSelector
              trims={vehicleTrims}
              vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              title="Compare Trims"
              subtitle={`The ${vehicleTrims.find(t => t.recommended)?.name || vehicleTrims[0]?.name} trim offers the best balance of features and value for the ${vehicle.make} ${vehicle.model}.`}
            />
          </div>
        </div>
      )}

      {/* Fuel Economy Modal */}
      {showFuelEconomy && (
        <div 
          className="concept__modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowFuelEconomy(false);
          }}
        >
          <div className="concept__modal concept__modal--fuel">
            <button 
              className="concept__modal-close"
              onClick={() => setShowFuelEconomy(false)}
              aria-label="Close"
            >
              ×
            </button>
            <FuelEconomy
              year={parseInt(vehicle.year)}
              make={vehicle.make}
              model={vehicle.model}
              bodyStyle={vehicle.bodyStyle}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclePageConcept;

