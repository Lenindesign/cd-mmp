import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  slug: string;
  review?: string;
  hasEditorChoice?: boolean;
  hasTenBest?: boolean;
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
                    <Link to={`/${vehicle.slug}`}>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </Link>
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
                  {/* Accolades Badges - Upper Right Corner */}
                  {(vehicle.hasEditorChoice || vehicle.hasTenBest) && (
                    <div className="comparison__card-accolades">
                      {vehicle.hasEditorChoice && (
                        <div className="comparison__card-accolade comparison__card-accolade--ec">
                          <img 
                            src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE" 
                            alt="Editor's Choice"
                          />
                        </div>
                      )}
                      {vehicle.hasTenBest && (
                        <div className="comparison__card-accolade comparison__card-accolade--10best">
                          <img 
                            src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg" 
                            alt="10Best"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Price Section */}
                <div className="comparison__card-price-row">
                  <div className="comparison__card-price-info">
                    <span className="comparison__card-price-label">Starting at</span>
                    <div className="comparison__card-price-action">
                      <span className="comparison__card-price-value">{vehicle.price}</span>
                      <Link to={`/${vehicle.slug}`} className="comparison__card-shop-btn">Shop Now</Link>
                    </div>
                  </div>
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
                    <Link to={`/${vehicle.slug}`} className="comparison__card-review-link">Learn More</Link>
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
    slug: '2025/Honda/HR-V',
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
    slug: '2025/Toyota/Corolla-Cross',
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
    slug: '2025/Hyundai/Kona',
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
    slug: '2025/Kia/Seltos',
    review: 'The Seltos offers a turbocharged engine option and a feature-rich interior at a competitive price point.',
    hasEditorChoice: false,
  },
];
