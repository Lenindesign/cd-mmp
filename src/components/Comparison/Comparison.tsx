import { useState, useRef, useMemo } from 'react';
import { ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { getComparisonVehicles } from '../../services/vehicleService';
import './Comparison.css';

interface CompetitorVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: string;
  mpg: string;
  rating: number;
  image: string;
  review?: string;
  hasEditorChoice?: boolean;
}

interface ComparisonProps {
  competitors?: CompetitorVehicle[];
  currentVehicle: {
    make: string;
    model: string;
  };
  title?: string;
}

const Comparison = ({ competitors, currentVehicle, title = "Compare Similar Vehicles" }: ComparisonProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Use database if no competitors provided
  const displayCompetitors = useMemo<CompetitorVehicle[]>(() => {
    if (competitors && competitors.length > 0) {
      return competitors;
    }
    // Get competitors from database
    return getComparisonVehicles(currentVehicle, 8) as CompetitorVehicle[];
  }, [competitors, currentVehicle]);

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.comparison__card')?.clientWidth || 400;
      const gap = 20; // spacing between cards
      const scrollAmount = cardWidth + gap;
      
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });

      // Check scroll position after animation
      setTimeout(checkScrollPosition, 350);
    }
  };

  return (
    <section className="comparison">
      <div className="container">
        <div className="comparison__header">
          <h2 className="comparison__title">{title}</h2>
          <p className="comparison__subtitle">
            See how the {currentVehicle.make} {currentVehicle.model} stacks up against the competition
          </p>
        </div>
        
        <div className="comparison__carousel-wrapper">
          {/* Left Arrow */}
          <button 
            className={`comparison__nav comparison__nav--left ${!canScrollLeft ? 'comparison__nav--disabled' : ''}`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous vehicles"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel */}
          <div 
            className="comparison__carousel" 
            ref={carouselRef}
            onScroll={checkScrollPosition}
          >
            {displayCompetitors.map((vehicle) => (
              <div key={vehicle.id} className="comparison__card">
                {/* Card Header */}
                <div className="comparison__card-top">
                  <h3 className="comparison__card-title">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="comparison__card-rating">
                    <div className="comparison__card-rating-row">
                      <span className="comparison__card-rating-score">{vehicle.rating.toFixed(1)}</span>
                      <span className="comparison__card-rating-max">/10</span>
                    </div>
                    <span className="comparison__card-rating-label">C/D RATING</span>
                  </div>
                </div>

                {/* Image */}
                <div className="comparison__card-image">
                  <img 
                    src={vehicle.image} 
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  />
                </div>
                
                {/* Price Section */}
                <div className="comparison__card-price-row">
                  <div className="comparison__card-price-info">
                    <span className="comparison__card-price-label">Starting at</span>
                    <div className="comparison__card-price-action">
                      <span className="comparison__card-price-value">{vehicle.price}</span>
                      <a href="#" className="comparison__card-shop-btn">Shop Now</a>
                    </div>
                  </div>
                  {vehicle.hasEditorChoice && (
                    <div className="comparison__card-badge">
                      <svg viewBox="0 0 261 240" width="44" height="40" xmlns="http://www.w3.org/2000/svg" className="comparison__card-badge-icon">
                        <path fillRule="evenodd" clipRule="evenodd" d="M259.43 93.03s4.576-5.936-2.599-8.963l-25.513-10.773s-7.173-3.029-6.438-10.284l2.61-25.654s.735-7.256-7.113-6.579l-27.969 2.403s-7.853.675-11.155-5.942L169.561 3.812s-3.305-6.617-9.745-2.415l-22.898 14.93s-6.44 4.202-12.881 0l-22.895-14.93S94.7-2.805 91.4 3.812L79.703 27.238s-3.302 6.617-11.155 5.942l-27.969-2.403s-7.849-.677-7.114 6.579l2.611 25.654s.737 7.255-6.438 10.284L4.125 84.067s-7.175 3.027-2.6 8.962l16.223 21.037s4.573 5.935 0 11.868L1.526 146.971s-4.576 5.935 2.6 8.964l25.512 10.773s7.175 3.027 6.438 10.283l-2.61 25.653s-.736 7.256 7.113 6.581l27.969-2.405s7.853-.675 11.155 5.942L91.4 236.188s3.3 6.617 9.742 2.415l22.895-14.933s6.441-4.199 12.881 0l22.898 14.933s6.44 4.202 9.745-2.415l11.692-23.426s3.302-6.617 11.155-5.942l27.969 2.405s7.848.675 7.113-6.581l-2.61-25.653s-.735-7.256 6.438-10.283l25.513-10.773s7.175-3.029 2.599-8.964l-16.22-21.037s-4.573-5.933 0-11.868l16.22-21.037Z" fill="#231F20"/>
                        <path fillRule="evenodd" clipRule="evenodd" fill="#FEFEFE" d="M184.986 99.46c-.14-4.326-.824-6.87-2.75-10.303-4.403-7.502-11.421-11.32-20.639-11.32-9.904 0-17.746 4.706-21.598 12.849-3.303 7.122-5.503 19.33-5.503 31.159 0 11.954 2.2 24.164 5.503 31.287 3.852 8.143 11.694 12.847 21.598 12.847 9.218 0 16.236-3.816 20.639-11.32 1.926-3.434 2.61-5.978 2.75-10.303h-12.931c-1.1 6.487-4.816 9.797-10.731 9.797-5.094 0-8.392-2.544-10.458-8.013-1.787-4.71-3.163-15.519-3.163-24.295 0-7.887 1.237-18.314 2.89-23.146 1.923-6.233 5.363-9.034 10.731-9.034 5.915 0 9.631 3.31 10.731 9.795h12.931ZM75.926 79.49v84.835h45.813v-11.828h-33.02v-28.109h19.537V112.56H88.72V91.318h31.506V79.49h-44.3Z"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* MPG Section */}
                <div className="comparison__card-mpg">
                  <span className="comparison__card-mpg-label">EPA MPG</span>
                  <div className="comparison__card-mpg-value">
                    <span className="comparison__card-mpg-number">{vehicle.mpg}</span>
                    <span className="comparison__card-mpg-unit">combined</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="comparison__card-divider"></div>

                {/* Review Section */}
                <div className="comparison__card-review">
                  <p className="comparison__card-review-text">
                    <strong>C/D SAYS:</strong> {vehicle.review}
                    <a href="#" className="comparison__card-review-link">Learn More</a>
                  </p>
                </div>

                {/* Expand Section */}
                <button className="comparison__card-expand">
                  <span>EXPAND ALL MODEL YEARS</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            className={`comparison__nav comparison__nav--right ${!canScrollRight ? 'comparison__nav--disabled' : ''}`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next vehicles"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="comparison__cta">
          <a href="#" className="comparison__cta-btn">
            Compare All Subcompact SUVs
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Comparison;

export const defaultCompetitors: CompetitorVehicle[] = [
  {
    id: '1',
    make: 'Honda',
    model: 'HR-V',
    year: 2025,
    price: '$25,050',
    mpg: '26–30',
    rating: 8.0,
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/6658e659f31254000921b1fa/16-2025-honda-hr-v-sport-front-view.jpg',
    review: 'The Honda HR-V offers a spacious interior and excellent fuel economy, making it a practical choice for daily commuters.',
    hasEditorChoice: false,
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Corolla Cross',
    year: 2025,
    price: '$24,035',
    mpg: '29–32',
    rating: 7.5,
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/67577eabfdefd7000823540c/1-2025-toyota-corolla-cross-hybrid-front-view.jpg',
    review: 'The Corolla Cross delivers Toyota reliability with available hybrid efficiency and a comfortable ride quality.',
    hasEditorChoice: false,
  },
  {
    id: '3',
    make: 'Hyundai',
    model: 'Kona',
    year: 2025,
    price: '$25,175',
    mpg: '28–32',
    rating: 8.0,
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/67fe9c57961d350008c4017f/007-2025-hyundai-kona-front-three-quarter.jpg',
    review: 'The Kona stands out with its bold styling and tech-forward cabin, offering good value in a compact package.',
    hasEditorChoice: true,
  },
  {
    id: '4',
    make: 'Kia',
    model: 'Seltos',
    year: 2025,
    price: '$24,590',
    mpg: '27–31',
    rating: 7.5,
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/668c500afc8dbb0009e48f26/005-2025-kia-seltos-1-6l-turbo-front-view-motion.jpg',
    review: 'The Seltos offers a turbocharged engine option and a feature-rich interior at a competitive price point.',
    hasEditorChoice: false,
  },
];
