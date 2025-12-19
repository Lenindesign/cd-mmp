import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Heart, ArrowRight, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import { getAvailableYears } from '../../services/vehicleService';
import { Button } from '../Button';
import { OptimizedImage } from '../OptimizedImage';
import './Hero.css';

interface HeroProps {
  vehicle: {
    make: string;
    model: string;
    year: number;
    tagline: string;
    rating: number;
    priceRange: string;
    image: string;
    galleryImages?: string[];
    photographer?: string;
    editorsChoice?: boolean;
    tenBest?: boolean;
    evOfTheYear?: boolean;
  };
  animateButtons?: boolean;
}

const Hero = ({ vehicle, animateButtons = false }: HeroProps) => {
  const [isFavorited, setIsFavorited] = useState(true);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [buttonsInView, setButtonsInView] = useState(false);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const navigate = useNavigate();

  // Intersection Observer for button animations
  useEffect(() => {
    if (!animateButtons || !buttonsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setButtonsInView(true);
            observer.disconnect(); // Only animate once
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    observer.observe(buttonsRef.current);

    return () => observer.disconnect();
  }, [animateButtons]);

  // Get available years for this make/model
  const availableYears = getAvailableYears(vehicle.make, vehicle.model);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleYearSelect = (year: string) => {
    setIsYearDropdownOpen(false);
    if (parseInt(year) !== vehicle.year) {
      // Navigate to the selected year's page
      const modelSlug = vehicle.model.replace(/\s+/g, '-');
      navigate(`/${year}/${vehicle.make}/${modelSlug}`);
    }
  };
  
  // Fallback placeholder image (Lamborghini Revuelto)
  const PLACEHOLDER_IMAGE = 'https://d2kde5ohu8qb21.cloudfront.net/files/659f9ed490e84500088bd486/012-2024-lamborghini-revuelto.jpg';

  // Gallery images from vehicle data
  const galleryImages = vehicle.galleryImages || [];

  // Main image with fallback
  const mainImage = vehicle.image || PLACEHOLDER_IMAGE;

  // All images for carousel (main image + gallery images)
  const allImages = [mainImage, ...galleryImages].filter(Boolean);
  const totalSlides = allImages.length;

  // Carousel navigation
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  // Touch handlers for swipe with visual feedback
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swiped left - go to next
        goToNextSlide();
      } else {
        // Swiped right - go to previous
        goToPrevSlide();
      }
    }
    
    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className="hero">
      {/* Breadcrumb */}
      <div className="hero__breadcrumb">
        <div className="container">
          <nav className="hero__breadcrumb-nav" aria-label="Breadcrumb">
            <a href="#" className="hero__breadcrumb-link">Home</a>
            <span className="hero__breadcrumb-sep">/</span>
            <a href="#" className="hero__breadcrumb-link">{vehicle.make}</a>
            <span className="hero__breadcrumb-sep">/</span>
            <a href="#" className="hero__breadcrumb-link hero__breadcrumb-current">{vehicle.model}</a>
          </nav>
        </div>
      </div>

      {/* Top Actions Bar */}
      <div className="hero__top-bar">
        <div className="container">
          <div className="hero__top-bar-content">
            {/* Year Selector */}
            <div className="hero__year-selector-wrapper" ref={yearDropdownRef}>
              <button 
                className={`hero__year-selector ${isYearDropdownOpen ? 'hero__year-selector--open' : ''}`}
                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                aria-expanded={isYearDropdownOpen}
                aria-haspopup="listbox"
              >
                <span>{vehicle.year}</span>
                <ChevronDown size={16} className={isYearDropdownOpen ? 'hero__year-chevron--open' : ''} />
              </button>
              
              {isYearDropdownOpen && availableYears.length > 1 && (
                <ul className="hero__year-dropdown" role="listbox">
                  {availableYears.map((year) => (
                    <li 
                      key={year}
                      role="option"
                      aria-selected={parseInt(year) === vehicle.year}
                      className={`hero__year-option ${parseInt(year) === vehicle.year ? 'hero__year-option--selected' : ''}`}
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                    </li>
                  ))}
                </ul>
              )}
              
              {isYearDropdownOpen && availableYears.length <= 1 && (
                <div className="hero__year-dropdown hero__year-dropdown--empty">
                  <span>Only {vehicle.year} available</span>
                </div>
              )}
            </div>

            {/* Favorites Button */}
            <button 
              className={`hero__favorites-btn ${isFavorited ? 'hero__favorites-btn--active' : ''}`}
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
              <span>{isFavorited ? 'ADDED TO FAVORITES' : 'ADD TO FAVORITES'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="hero__main">
        <div className="container">
          {/* Title Row */}
          <div className="hero__title-row">
            <h1 className="hero__title">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <div className="hero__rating">
              <div className="hero__rating-numbers">
                <span className="hero__rating-score">{vehicle.rating}</span>
                <span className="hero__rating-max">/10</span>
              </div>
              <div className="hero__rating-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16">
                  <path d="m22.735 8.905-.955-.955V6.518a4.253 4.253 0 0 0-4.273-4.273h-1.432l-.955-.954C13.45-.38 10.61-.38 8.938 1.29l-.955.954H6.551a4.253 4.253 0 0 0-4.273 4.273V7.95l-.955.955c-1.67 1.671-1.67 4.512 0 6.183l.955.955v1.432a4.253 4.253 0 0 0 4.273 4.273h1.432l.955.954c1.67 1.671 4.511 1.671 6.182 0l.955-.954h1.432a4.253 4.253 0 0 0 4.273-4.273v-1.432l.955-.955c1.67-1.671 1.67-4.512 0-6.183zm-6.421 1.671-4.512 4.512c-.238.238-.477.477-.955.477-.477 0-.716-.239-.954-.477l-2.149-2.149c-.477-.477-.477-1.432 0-1.91.478-.477 1.432-.477 1.91 0l1.193 1.194 3.557-3.318c.477-.716 1.432-.716 1.91 0a1.154 1.154 0 0 1 0 1.671z" fill="currentColor"/>
                </svg>
                <span>C/D RATING</span>
              </div>
            </div>
          </div>

          {/* Image Gallery - Desktop Grid */}
          <div className="hero__gallery hero__gallery--desktop">
            {/* Main Image */}
            <div className="hero__gallery-main">
              <OptimizedImage 
                src={vehicle.image} 
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className="hero__gallery-main-img"
                loading="eager"
                aspectRatio="16/10"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="hero__gallery-thumbs">
              {galleryImages.slice(0, 3).map((img, index) => (
                <div key={index} className="hero__gallery-thumb">
                  <OptimizedImage 
                    src={img} 
                    alt={`${vehicle.model} view ${index + 1}`}
                    aspectRatio="16/10"
                  />
                  {index === 2 && (
                    <div className="hero__gallery-thumb-overlay">
                      <span>View Photos</span>
                      <ArrowRight size={18} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery - Mobile Carousel */}
          <div 
            className={`hero__carousel hero__carousel--mobile ${isDragging ? 'dragging' : ''}`}
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carousel Track */}
            <div 
              className="hero__carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {allImages.map((img, index) => (
                <div key={index} className="hero__carousel-slide">
                  <OptimizedImage 
                    src={img} 
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} - View ${index + 1}`}
                    className="hero__carousel-img"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    aspectRatio="16/9"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              className="hero__carousel-arrow hero__carousel-arrow--prev"
              onClick={goToPrevSlide}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="hero__carousel-arrow hero__carousel-arrow--next"
              onClick={goToNextSlide}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* View Photos Button */}
            <button className="hero__carousel-view-photos">
              <Image size={20} />
              <span>View Photos</span>
            </button>

            {/* Dot Indicators */}
            <div className="hero__carousel-dots">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  className={`hero__carousel-dot ${index === currentSlide ? 'hero__carousel-dot--active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Photo Credit */}
          <div className="hero__photo-credit">
            <span className="hero__photographer">{vehicle.photographer || 'MICHAEL SIMARI'}</span>
            <span className="hero__credit-sep">|</span>
            <span className="hero__publication">CAR AND DRIVER</span>
          </div>

          {/* MSRP and Accolades Row */}
          <div className="hero__bottom-row">
            {/* MSRP Section */}
            <div className="hero__msrp">
              <span className="hero__msrp-label">MSRP</span>
              <div className="hero__msrp-price-row">
                <span className="hero__msrp-price">{vehicle.priceRange}</span>
                {/* Shop Buttons - Aligned with price numbers */}
                <div 
                  ref={buttonsRef}
                  className={`hero__shop-buttons ${animateButtons ? (buttonsInView ? 'hero__shop-buttons--animated' : 'hero__shop-buttons--hidden') : ''}`}
                >
                  <Button variant="primary" size="small" className={`hero__shop-btn ${animateButtons && buttonsInView ? 'hero__shop-btn--animate-1' : ''}`}>
                    SHOP NEW
                  </Button>
                  <Button variant="outline" size="small" className={`hero__shop-btn hero__shop-btn--outline ${animateButtons && buttonsInView ? 'hero__shop-btn--animate-2' : ''}`}>
                    SHOP USED
                  </Button>
                  <Button variant="outline" size="small" className={`hero__shop-btn hero__shop-btn--trade-in ${animateButtons && buttonsInView ? 'hero__shop-btn--animate-3' : ''}`}>
                    GET YOUR TRADE-IN VALUE
                  </Button>
                </div>
              </div>
            </div>

            {/* Accolades - Only show if vehicle has awards */}
            {(vehicle.editorsChoice || vehicle.tenBest || vehicle.evOfTheYear) && (
              <div className="hero__accolades">
                <div className="hero__accolades-header">
                  <span className="hero__accolades-title">
                    <em>Car and Driver</em> Accolades
                  </span>
                  <a href="#" className="hero__accolades-link">What's this?</a>
                </div>
                <div className="hero__accolades-badges">
                  {vehicle.editorsChoice && (
                    <div className="hero__accolade">
                      <div className="hero__accolade-icon hero__accolade-icon--ec">
                        <img 
                          src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE" 
                          alt="Editor's Choice"
                          width="48"
                          height="44"
                        />
                      </div>
                      <span className="hero__accolade-label">Editors'<br/>Choice</span>
                    </div>
                  )}
                  {vehicle.evOfTheYear && (
                    <div className="hero__accolade">
                      <div className="hero__accolade-icon hero__accolade-icon--ev">
                        <img 
                          src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ev-of-the-year.721e420.svg" 
                          alt="EV of the Year"
                          width="48"
                          height="49"
                        />
                      </div>
                      <span className="hero__accolade-label">EV of the<br/>Year</span>
                    </div>
                  )}
                  {vehicle.tenBest && (
                    <div className="hero__accolade">
                      <div className="hero__accolade-icon hero__accolade-icon--10best">
                        <img 
                          src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg" 
                          alt="10Best"
                          width="48"
                          height="54"
                        />
                      </div>
                      <span className="hero__accolade-label">10Best</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
