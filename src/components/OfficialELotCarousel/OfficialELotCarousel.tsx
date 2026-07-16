import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getListingsNearYou, type Listing } from '../../services/listingsService';
import { OptimizedImage } from '../OptimizedImage';
import './OfficialELotCarousel.css';

type OfficialELotListing = Listing & {
  priceBadge: 'Great Price' | 'Good Price';
};

interface OfficialELotCarouselProps {
  year: string | number;
  make: string;
  model: string;
  bodyStyle: string;
  location?: string;
  priceThreshold?: number;
  className?: string;
  title?: string;
  resultsLinkLabel?: string;
  resultsLinkPrefix?: string;
  resultsLinkAnchorLabel?: string;
  resultsLinkSuffix?: string;
  resultsLinkHref?: string;
}

const formatCurrency = (value: number) => (
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
);

const getMarketplaceUrl = (year: string | number, make: string, model: string) => {
  const params = new URLSearchParams({
    year: String(year),
    make,
    model,
  });

  return `https://www.caranddriver.com/cars-for-sale/used?${params.toString()}`;
};

const getListingMarketplaceUrl = (listing: Listing) => {
  const condition = listing.isNew ? 'new' : 'used';
  const params = new URLSearchParams({
    year: String(listing.year),
    make: listing.make,
    model: listing.model,
  });

  if (listing.isCertified) {
    params.set('certified', 'true');
  }

  return `https://www.caranddriver.com/cars-for-sale/${condition}?${params.toString()}`;
};

const getListingConditionLabel = (listing: Listing) => {
  if (listing.isCertified) return `Certified ${listing.year}`;
  return `${listing.isNew ? 'New' : 'Used'} ${listing.year}`;
};

const OfficialELotCarousel = ({
  year,
  make,
  model,
  bodyStyle,
  location = 'Miami, FL',
  priceThreshold,
  className = '',
  title = 'For Sale Near You',
  resultsLinkLabel,
  resultsLinkPrefix,
  resultsLinkAnchorLabel,
  resultsLinkSuffix,
  resultsLinkHref,
}: OfficialELotCarouselProps) => {
  const headingId = useId();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselState, setCarouselState] = useState({
    canScrollPrevious: false,
    canScrollNext: false,
  });

  const listings = useMemo<OfficialELotListing[]>(() => {
    const nearbyListings = getListingsNearYou({
      make,
      model,
      bodyStyle,
      location,
    });
    const preferredListings = nearbyListings.filter((listing) => (
      listing.make === make &&
      listing.model === model
    ));
    const sortedListings = [
      ...preferredListings.filter((listing) => !listing.isNew),
      ...preferredListings.filter((listing) => listing.isNew),
    ];
    const uniqueListings = sortedListings.filter((listing, index, allListings) => (
      allListings.findIndex((item) => item.id === listing.id) === index
    ));
    const greatPriceThreshold = priceThreshold ?? Number.POSITIVE_INFINITY;

    return uniqueListings.slice(0, 8).map((listing) => ({
      ...listing,
      priceBadge: listing.price <= greatPriceThreshold ? 'Great Price' : 'Good Price',
    }));
  }, [bodyStyle, location, make, model, priceThreshold]);

  const updateCarouselState = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    setCarouselState({
      canScrollPrevious: carousel.scrollLeft > 1,
      canScrollNext: carousel.scrollLeft < maxScrollLeft - 1,
    });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    updateCarouselState();
    carousel.addEventListener('scroll', updateCarouselState, { passive: true });
    window.addEventListener('resize', updateCarouselState);

    return () => {
      carousel.removeEventListener('scroll', updateCarouselState);
      window.removeEventListener('resize', updateCarouselState);
    };
  }, [listings.length, updateCarouselState]);

  const scrollListings = (direction: 'previous' | 'next') => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === 'next' ? carousel.clientWidth * 0.9 : -carousel.clientWidth * 0.9,
      behavior: 'smooth',
    });
  };

  if (listings.length === 0) {
    return null;
  }

  const sectionClassName = [
    'aio-payment__light-affordable-section',
    'aio-payment__light-elot-section',
    'official-elot-section',
    className,
  ].filter(Boolean).join(' ');
  const allResultsHref = resultsLinkHref ?? getMarketplaceUrl(year, make, model);
  const searchLabel = `used ${year} ${make} ${model}`;
  const resultsText = resultsLinkLabel ?? `See all results for ${searchLabel} for sale near ${location}`;
  const hasInlineResultsLink = Boolean(resultsLinkAnchorLabel);

  return (
    <section className={sectionClassName}>
      <div className="container">
        <section className="aio-payment__light-elot" aria-labelledby={headingId}>
          <div className="aio-payment__light-elot-head">
            <h2 id={headingId}>{title}</h2>
            {hasInlineResultsLink ? (
              <p className="aio-payment__light-elot-results-line">
                {resultsLinkPrefix ?? 'See all results for'}{' '}
                <a className="aio-payment__light-elot-results-link" href={allResultsHref}>
                  {resultsLinkAnchorLabel}
                </a>
                {resultsLinkSuffix ? ` ${resultsLinkSuffix}` : null}
                <ArrowRight size={18} aria-hidden="true" />
              </p>
            ) : (
              <a className="aio-payment__light-elot-results-link" href={allResultsHref}>
                <span>{resultsText}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            )}
          </div>

          <div className="aio-payment__light-elot-carousel-wrap">
            <button
              type="button"
              className="aio-payment__light-elot-nav aio-payment__light-elot-nav--left"
              onClick={() => scrollListings('previous')}
              disabled={!carouselState.canScrollPrevious}
              aria-label="Show previous listings"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>

            <div ref={carouselRef} className="aio-payment__light-elot-carousel" role="list">
              {listings.map((listing) => {
                const listingMarketplaceHref = getListingMarketplaceUrl(listing);

                return (
                  <article key={listing.id} className="aio-payment__light-elot-card" role="listitem">
                    <a
                      href={listingMarketplaceHref}
                      className="aio-payment__light-elot-image-link"
                      aria-label={`Shop ${listing.year} ${listing.make} ${listing.model} in C/D Marketplace`}
                    >
                      <OptimizedImage
                        src={listing.image}
                        alt={`${listing.year} ${listing.make} ${listing.model}`}
                        aspectRatio="4/3"
                        wrapperClassName="aio-payment__light-elot-image"
                      />
                      <span className={`aio-payment__light-elot-price-badge aio-payment__light-elot-price-badge--${listing.priceBadge === 'Great Price' ? 'great' : 'good'}`}>
                        {listing.priceBadge}
                      </span>
                    </a>
                    <div className="aio-payment__light-elot-card-body">
                      <p className="aio-payment__light-elot-kicker">{getListingConditionLabel(listing)}</p>
                      <h3 className="aio-payment__light-elot-card-title">
                        <a href={listingMarketplaceHref}>{listing.make} {listing.model}</a>
                      </h3>
                      <p className="aio-payment__light-elot-card-price">
                        <span aria-hidden="true">$</span>
                        {formatCurrency(listing.price).replace('$', '')}
                      </p>
                      <p className="aio-payment__light-elot-dealer">{listing.dealerName}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              className="aio-payment__light-elot-nav aio-payment__light-elot-nav--right"
              onClick={() => scrollListings('next')}
              disabled={!carouselState.canScrollNext}
              aria-label="Show more listings"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default OfficialELotCarousel;
