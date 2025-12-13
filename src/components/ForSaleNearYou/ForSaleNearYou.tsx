import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, MapPin, Gauge, Calendar, Heart } from 'lucide-react';
import { getListingsNearYou } from '../../services/listingsService';
import type { Listing } from '../../services/listingsService';
import './ForSaleNearYou.css';

interface ForSaleNearYouProps {
  vehicleName?: string;
  make?: string;
  model?: string;
  bodyStyle?: string;
  maxPrice?: number;
  location?: string;
  title?: string;
}

const ForSaleNearYou = ({ 
  vehicleName = "Chevrolet Trax",
  make = "Chevrolet",
  model = "Trax",
  bodyStyle = "SUV",
  maxPrice = 35000,
  location = "Miami, FL",
  title = "For Sale Near You"
}: ForSaleNearYouProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Get listings from service
  const listings = useMemo<Listing[]>(() => {
    return getListingsNearYou({ make, model, bodyStyle, maxPrice, location });
  }, [make, model, bodyStyle, maxPrice, location]);

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.for-sale__card')?.clientWidth || 400;
      const gap = 20;
      const scrollAmount = cardWidth + gap;
      
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });

      setTimeout(checkScrollPosition, 350);
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <section className="for-sale">
      <div className="container">
        <div className="for-sale__header">
          <h2 className="for-sale__title">{title}</h2>
          <p className="for-sale__subtitle">
            Browse {vehicleName} listings available in your area
          </p>
          <div className="for-sale__location">
            <MapPin size={16} />
            <span>{location}</span>
            <button className="for-sale__change-location">Change Location</button>
          </div>
        </div>
        
        <div className="for-sale__carousel-wrapper">
          {/* Left Arrow */}
          <button 
            className={`for-sale__nav for-sale__nav--left ${!canScrollLeft ? 'for-sale__nav--disabled' : ''}`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous listings"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel */}
          <div 
            className="for-sale__carousel" 
            ref={carouselRef}
            onScroll={checkScrollPosition}
          >
            {listings.map((listing) => (
              <div key={listing.id} className="for-sale__card">
                {/* Card Image */}
                <div className="for-sale__card-image">
                  <img 
                    src={listing.image} 
                    alt={`${listing.year} ${listing.make} ${listing.model}`}
                  />
                  <button 
                    className={`for-sale__card-favorite ${favorites.has(listing.id) ? 'for-sale__card-favorite--active' : ''}`}
                    onClick={() => toggleFavorite(listing.id)}
                    aria-label={favorites.has(listing.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart size={20} fill={favorites.has(listing.id) ? 'currentColor' : 'none'} />
                  </button>
                  {listing.isNew && (
                    <span className="for-sale__card-badge">NEW LISTING</span>
                  )}
                  {listing.priceReduced && (
                    <span className="for-sale__card-badge for-sale__card-badge--reduced">PRICE REDUCED</span>
                  )}
                </div>

                {/* Card Content */}
                <div className="for-sale__card-content">
                  {/* Title */}
                  <h3 className="for-sale__card-title">
                    <Link to={`/${listing.slug}`}>
                      {listing.year} {listing.make} {listing.model}
                    </Link>
                  </h3>
                  <span className="for-sale__card-trim">{listing.trim}</span>

                  {/* Price */}
                  <div className="for-sale__card-price">
                    <span className="for-sale__card-price-value">{formatPrice(listing.price)}</span>
                    {listing.originalPrice && listing.originalPrice > listing.price && (
                      <span className="for-sale__card-price-original">{formatPrice(listing.originalPrice)}</span>
                    )}
                  </div>

                  {/* Specs Row */}
                  <div className="for-sale__card-specs">
                    <div className="for-sale__card-spec">
                      <Gauge size={14} />
                      <span>{formatMileage(listing.mileage)} mi</span>
                    </div>
                    <div className="for-sale__card-spec">
                      <Calendar size={14} />
                      <span>{listing.year}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="for-sale__card-features">
                    {listing.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="for-sale__card-feature">{feature}</span>
                    ))}
                  </div>

                  {/* Dealer Info */}
                  <div className="for-sale__card-dealer">
                    <div className="for-sale__card-dealer-info">
                      <span className="for-sale__card-dealer-name">{listing.dealerName}</span>
                      <span className="for-sale__card-dealer-distance">{listing.distance} miles away</span>
                    </div>
                    {listing.dealerRating && (
                      <div className="for-sale__card-dealer-rating">
                        <span className="for-sale__card-dealer-stars">★ {listing.dealerRating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="for-sale__card-actions">
                    <Link to={`/${listing.slug}`} className="for-sale__card-btn for-sale__card-btn--primary">
                      View Details
                    </Link>
                    <button className="for-sale__card-btn for-sale__card-btn--secondary">
                      Check Availability
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            className={`for-sale__nav for-sale__nav--right ${!canScrollRight ? 'for-sale__nav--disabled' : ''}`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next listings"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="for-sale__footer">
          <div className="for-sale__results-count">
            Showing {listings.length} of {listings.length + 150}+ listings near {location}
          </div>
          <a href="#" className="for-sale__cta-btn">
            See All {vehicleName} Listings
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ForSaleNearYou;

