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
    images?: string[];
    photographer?: string;
    editorsChoice?: boolean;
    tenBest?: boolean;
    evOfTheYear?: boolean;
  };
}

const Hero = ({ vehicle }: HeroProps) => {
  const [isFavorited, setIsFavorited] = useState(true);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const navigate = useNavigate();

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
  
  // Default gallery images
  const galleryImages = vehicle.images || [
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c0b6e89190008af75b2/005-2025-chevrolet-trax-exterior-front-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c139cbba1000852d79d/008-2025-chevrolet-trax-exterior-front-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c246e89190008af75b5/014-2025-chevrolet-trax-exterior-rear-view.jpg',
  ];

  // All images for carousel (main image + gallery images)
  const allImages = [vehicle.image, ...galleryImages];
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
              <span className="hero__msrp-price">{vehicle.priceRange}</span>
            </div>

            {/* Shop Buttons - Centered */}
            <div className="hero__shop-buttons">
              <Button variant="primary" size="small" className="hero__shop-btn">
                SHOP NEW
              </Button>
              <Button variant="outline" size="small" className="hero__shop-btn hero__shop-btn--outline">
                SHOP USED
              </Button>
              <Button variant="outline" size="small" className="hero__shop-btn hero__shop-btn--outline">
                GET YOUR TRADE-IN VALUE
              </Button>
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
                        <svg viewBox="0 0 261 240" width="48" height="44" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M259.43 93.03s4.576-5.936-2.599-8.963l-25.513-10.773s-7.173-3.029-6.438-10.284l2.61-25.654s.735-7.256-7.113-6.579l-27.969 2.403s-7.853.675-11.155-5.942L169.561 3.812s-3.305-6.617-9.745-2.415l-22.898 14.93s-6.44 4.202-12.881 0l-22.895-14.93S94.7-2.805 91.4 3.812L79.703 27.238s-3.302 6.617-11.155 5.942l-27.969-2.403s-7.849-.677-7.114 6.579l2.611 25.654s.737 7.255-6.438 10.284L4.125 84.067s-7.175 3.027-2.6 8.962l16.223 21.037s4.573 5.935 0 11.868L1.526 146.971s-4.576 5.935 2.6 8.964l25.512 10.773s7.175 3.027 6.438 10.283l-2.61 25.653s-.736 7.256 7.113 6.581l27.969-2.405s7.853-.675 11.155 5.942L91.4 236.188s3.3 6.617 9.742 2.415l22.895-14.933s6.441-4.199 12.881 0l22.898 14.933s6.44 4.202 9.745-2.415l11.692-23.426s3.302-6.617 11.155-5.942l27.969 2.405s7.848.675 7.113-6.581l-2.61-25.653s-.735-7.256 6.438-10.283l25.513-10.773s7.175-3.029 2.599-8.964l-16.22-21.037s-4.573-5.933 0-11.868l16.22-21.037Z" fill="#231F20"/>
                          <path fillRule="evenodd" clipRule="evenodd" fill="#FEFEFE" d="M184.986 99.46c-.14-4.326-.824-6.87-2.75-10.303-4.403-7.502-11.421-11.32-20.639-11.32-9.904 0-17.746 4.706-21.598 12.849-3.303 7.122-5.503 19.33-5.503 31.159 0 11.954 2.2 24.164 5.503 31.287 3.852 8.143 11.694 12.847 21.598 12.847 9.218 0 16.236-3.816 20.639-11.32 1.926-3.434 2.61-5.978 2.75-10.303h-12.931c-1.1 6.487-4.816 9.797-10.731 9.797-5.094 0-8.392-2.544-10.458-8.013-1.787-4.71-3.163-15.519-3.163-24.295 0-7.887 1.237-18.314 2.89-23.146 1.923-6.233 5.363-9.034 10.731-9.034 5.915 0 9.631 3.31 10.731 9.795h12.931ZM75.926 79.49v84.835h45.813v-11.828h-33.02v-28.109h19.537V112.56H88.72V91.318h31.506V79.49h-44.3Z"/>
                          <path fillRule="evenodd" clipRule="evenodd" fill="#FEFEFE" d="M161.565 79.28c-9.213 0-16.562 4.367-20.163 11.981-3.264 7.035-5.372 19.04-5.372 30.581 0 11.615 2.108 23.673 5.377 30.716 3.594 7.606 10.945 11.971 20.158 11.971 8.671 0 15.152-3.556 19.26-10.564 1.577-2.808 2.255-4.955 2.488-8.167h-9.99c-1.481 6.332-5.717 9.797-12.031 9.797-5.749 0-9.654-2.938-11.936-8.981-1.822-4.802-3.248-15.683-3.248-24.772 0-8.367 1.299-18.725 2.958-23.584 2.086-6.743 6.086-10.042 12.226-10.042 6.314 0 10.55 3.465 12.031 9.795h9.99c-.233-3.215-.913-5.364-2.499-8.192-4.097-6.984-10.578-10.54-19.249-10.54Zm0 88.141c-10.514 0-18.91-4.996-23.034-13.714-3.423-7.382-5.633-19.889-5.633-31.865 0-11.902 2.21-24.356 5.628-31.73 4.129-8.726 12.525-13.724 23.039-13.724 9.766 0 17.379 4.174 22.015 12.075 2.056 3.668 2.793 6.422 2.939 10.95l.048 1.489h-15.884l-.208-1.22c-.977-5.77-3.982-8.575-9.183-8.575-4.677 0-7.52 2.464-9.227 7.986-1.566 4.579-2.828 14.768-2.828 22.749 0 8.667 1.378 19.35 3.074 23.815 1.842 4.872 4.61 7.046 8.981 7.046 5.201 0 8.206-2.807 9.183-8.575l.208-1.222h15.884l-.048 1.489c-.146 4.529-.883 7.283-2.926 10.926-4.649 7.926-12.26 12.1-22.028 12.1ZM77.504 162.879h42.684v-8.935H87.169v-31.002h19.536v-8.937H87.169v-24.13h31.506v-8.94H77.504v81.944Zm45.813 2.891H74.375V78.044h47.429v14.722H90.298v18.347h19.536v14.722H90.298v25.217h33.019v14.718Z"/>
                        </svg>
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
