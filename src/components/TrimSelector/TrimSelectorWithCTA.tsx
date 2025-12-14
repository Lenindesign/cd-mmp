import { useState, useRef, useMemo } from 'react';
import { 
  Check, Info, ChevronRight, ChevronLeft, MapPin, Shield,
  DollarSign, ArrowRight, CheckCircle, Gauge, Award, RefreshCw
} from 'lucide-react';
import { getAllVehicles, type Vehicle } from '../../services/vehicleService';
import './TrimSelector.css';
import './TrimSelectorWithCTA.css';

// Helper to get vehicle from database by make/model
// Prioritizes vehicles with galleryImages and higher ratings (usually newer models)
const getVehicleByMakeModel = (make: string, model: string, msrp?: number): Vehicle | undefined => {
  const vehicles = getAllVehicles();
  const matches = vehicles.filter(
    v => v.make.toLowerCase() === make.toLowerCase() && 
         v.model.toLowerCase() === model.toLowerCase()
  );
  
  if (matches.length === 0) return undefined;
  if (matches.length === 1) return matches[0];
  
  // If MSRP is provided, find the closest match by price
  if (msrp) {
    const closestMatch = matches.reduce((best, current) => {
      const bestDiff = Math.abs(best.priceMin - msrp);
      const currentDiff = Math.abs(current.priceMin - msrp);
      return currentDiff < bestDiff ? current : best;
    });
    return closestMatch;
  }
  
  // Otherwise, prefer vehicles with galleryImages
  const withGallery = matches.find(v => v.galleryImages && v.galleryImages.length > 0);
  if (withGallery) return withGallery;
  
  // Fall back to highest rated (usually newest model)
  return matches.sort((a, b) => b.staffRating - a.staffRating)[0];
};

// Helper to get multiple vehicle images from database (main + gallery)
const getVehicleImages = (make: string, model: string, count: number = 4, msrp?: number): string[] => {
  const vehicle = getVehicleByMakeModel(make, model, msrp);
  if (!vehicle) {
    return Array(count).fill(`https://via.placeholder.com/400x300?text=${encodeURIComponent(`${make} ${model}`)}`);
  }
  
  // Combine main image with gallery images (avoid duplicates)
  const allImages: string[] = [vehicle.image];
  if (vehicle.galleryImages && vehicle.galleryImages.length > 0) {
    // Filter out duplicates (main image might be in gallery too)
    const uniqueGalleryImages = vehicle.galleryImages.filter(img => img !== vehicle.image);
    allImages.push(...uniqueGalleryImages);
  }
  
  // Return requested count of images, cycling through available images if needed
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(allImages[i % allImages.length]);
  }
  return result;
};

interface Trim {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

interface TrimSelectorWithCTAProps {
  trims: Trim[];
  title?: string;
  subtitle?: string;
  variant: 'v1d' | 'v2d' | 'v3d' | 'v4d' | 'v5d';
  make?: string;
  model?: string;
  msrp?: number;
  location?: string;
}

// Mock inventory data generator
const getLocalInventoryData = (msrp: number = 35000) => ({
  totalListings: 247,
  goodPriceCount: 89,
  oneOwnerCount: 156,
  noAccidentCount: 198,
  priceLow: Math.round(msrp * 0.65),
  priceHigh: Math.round(msrp * 0.95),
  priceAvg: Math.round(msrp * 0.78),
  mileageLow: 12000,
  mileageHigh: 85000,
  mileageAvg: 42000,
  monthlyPayment: Math.round((msrp * 0.75 * 0.8) / 60),
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

// =============================================
// V1D: Stats-Focused Layout
// Larger stats cards, compact eLot preview
// =============================================
const MarketplaceCTAV1D = ({ make: _make, model, msrp, location }: { make: string; model: string; msrp: number; location: string }) => {
  const data = getLocalInventoryData(msrp);
  
  const eLotListings = [
    { id: 1, year: '2022', price: formatPrice(data.priceAvg - 2000), mileage: '28,450 mi', badge: 'Great Price' },
    { id: 2, year: '2021', price: formatPrice(data.priceAvg), mileage: '35,200 mi', badge: 'One Owner' },
    { id: 3, year: '2023', price: formatPrice(data.priceAvg + 3000), mileage: '12,800 mi', badge: 'No Accidents' },
  ];
  
  return (
    <div className="trim-marketplace trim-marketplace--v1d">
      {/* Header */}
      <div className="trim-marketplace__next-step-banner">
        <span className="trim-marketplace__next-step-badge">YOUR NEXT STEP</span>
        <h3 className="trim-marketplace__title">Ready to shop used {model} listings?</h3>
        <p className="trim-marketplace__subtitle-text">
          We found {data.totalListings} used {model} vehicles near {location}
        </p>
      </div>
      
      {/* Large Stats Grid - 2x2 */}
      <div className="trim-marketplace__stats-grid trim-marketplace__stats-grid--large">
        <div className="trim-marketplace__stat-card">
          <div className="trim-marketplace__stat-card-icon">
            <DollarSign size={24} />
          </div>
          <div className="trim-marketplace__stat-card-content">
            <span className="trim-marketplace__stat-card-value">{formatPrice(data.priceAvg)}</span>
            <span className="trim-marketplace__stat-card-label">Average Price</span>
            <span className="trim-marketplace__stat-card-range">{formatPrice(data.priceLow)} – {formatPrice(data.priceHigh)}</span>
          </div>
        </div>
        <div className="trim-marketplace__stat-card">
          <div className="trim-marketplace__stat-card-icon">
            <Gauge size={24} />
          </div>
          <div className="trim-marketplace__stat-card-content">
            <span className="trim-marketplace__stat-card-value">{formatNumber(data.mileageAvg)} mi</span>
            <span className="trim-marketplace__stat-card-label">Average Mileage</span>
            <span className="trim-marketplace__stat-card-range">{formatNumber(data.mileageLow)} – {formatNumber(data.mileageHigh)} mi</span>
          </div>
        </div>
        <div className="trim-marketplace__stat-card trim-marketplace__stat-card--highlight">
          <div className="trim-marketplace__stat-card-icon">
            <Award size={24} />
          </div>
          <div className="trim-marketplace__stat-card-content">
            <span className="trim-marketplace__stat-card-value">{data.goodPriceCount}</span>
            <span className="trim-marketplace__stat-card-label">Good/Great Deals</span>
            <span className="trim-marketplace__stat-card-range">of {data.totalListings} total listings</span>
          </div>
        </div>
        <div className="trim-marketplace__stat-card">
          <div className="trim-marketplace__stat-card-icon">
            <Shield size={24} />
          </div>
          <div className="trim-marketplace__stat-card-content">
            <span className="trim-marketplace__stat-card-value">{data.noAccidentCount}</span>
            <span className="trim-marketplace__stat-card-label">No Accidents</span>
            <span className="trim-marketplace__stat-card-range">{data.oneOwnerCount} one-owner vehicles</span>
          </div>
        </div>
      </div>
      
      {/* Compact eLot Row */}
      <div className="trim-marketplace__elot trim-marketplace__elot--compact">
        <div className="trim-marketplace__elot-header">
          <h4 className="trim-marketplace__elot-title">Featured Listings</h4>
          <a href="#" className="trim-marketplace__elot-link">
            View All {data.totalListings}
            <ChevronRight size={16} />
          </a>
        </div>
        <div className="trim-marketplace__elot-row">
          {eLotListings.map((listing) => (
            <div key={listing.id} className="trim-marketplace__elot-item">
              <span className="trim-marketplace__elot-item-badge">{listing.badge}</span>
              <span className="trim-marketplace__elot-item-title">{listing.year} {model}</span>
              <span className="trim-marketplace__elot-item-price">{listing.price}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="trim-marketplace__actions trim-marketplace__actions--full">
        <button className="trim-marketplace__btn trim-marketplace__btn--primary trim-marketplace__btn--large">
          SHOP ALL {data.totalListings} LISTINGS
          <ArrowRight size={18} />
        </button>
        <button className="trim-marketplace__btn trim-marketplace__btn--secondary">
          ESTIMATE TRADE-IN VALUE
        </button>
      </div>
    </div>
  );
};

// =============================================
// V2D: eLot-Focused Layout
// Larger eLot cards, horizontal stats
// =============================================
const MarketplaceCTAV2D = ({ make, model, msrp, location }: { make: string; model: string; msrp: number; location: string }) => {
  const data = getLocalInventoryData(msrp);
  const vehicleImages = getVehicleImages(make, model, 4, msrp);
  
  const eLotListings = [
    { id: 1, year: '2022', price: formatPrice(data.priceAvg - 2000), mileage: '28,450 mi', badge: 'Great Price', image: vehicleImages[0] },
    { id: 2, year: '2021', price: formatPrice(data.priceAvg), mileage: '35,200 mi', badge: 'One Owner', image: vehicleImages[1] },
    { id: 3, year: '2023', price: formatPrice(data.priceAvg + 3000), mileage: '12,800 mi', badge: 'No Accidents', image: vehicleImages[2] },
    { id: 4, year: '2022', price: formatPrice(data.priceAvg - 1000), mileage: '41,200 mi', badge: 'Great Price', image: vehicleImages[3] },
  ];
  
  return (
    <div className="trim-marketplace trim-marketplace--v2d">
      {/* Header with inline stats */}
      <div className="trim-marketplace__header-with-stats">
        <div className="trim-marketplace__header-content">
          <span className="trim-marketplace__next-step-badge">YOUR NEXT STEP</span>
          <h3 className="trim-marketplace__title">Shop {data.totalListings} Used {model} Near {location}</h3>
        </div>
        <div className="trim-marketplace__inline-stats">
          <div className="trim-marketplace__inline-stat">
            <span className="trim-marketplace__inline-stat-value">{formatPrice(data.priceAvg)}</span>
            <span className="trim-marketplace__inline-stat-label">Avg Price</span>
          </div>
          <div className="trim-marketplace__inline-stat">
            <span className="trim-marketplace__inline-stat-value">{data.goodPriceCount}</span>
            <span className="trim-marketplace__inline-stat-label">Great Deals</span>
          </div>
        </div>
      </div>
      
      {/* Large eLot Grid */}
      <div className="trim-marketplace__elot trim-marketplace__elot--large">
        <div className="trim-marketplace__elot-grid trim-marketplace__elot-grid--large">
          {eLotListings.map((listing) => (
            <div key={listing.id} className="trim-marketplace__elot-card trim-marketplace__elot-card--large">
              <div className="trim-marketplace__elot-card-image trim-marketplace__elot-card-image--large">
                <img 
                  src={listing.image} 
                  alt={`${listing.year} ${model}`}
                  className="trim-marketplace__elot-card-img"
                />
                <span className="trim-marketplace__elot-card-badge">{listing.badge}</span>
              </div>
              <div className="trim-marketplace__elot-card-info">
                <span className="trim-marketplace__elot-card-title">{listing.year} {model}</span>
                <span className="trim-marketplace__elot-card-price">{listing.price}</span>
                <span className="trim-marketplace__elot-card-mileage">{listing.mileage}</span>
              </div>
            </div>
          ))}
          <div className="trim-marketplace__elot-card trim-marketplace__elot-card--more trim-marketplace__elot-card--large">
            <span className="trim-marketplace__elot-more-count">+{data.totalListings - 4}</span>
            <span className="trim-marketplace__elot-more-text">More Listings</span>
            <ArrowRight size={24} />
          </div>
        </div>
      </div>
      
      {/* Value Props Row */}
      <div className="trim-marketplace__value-props">
        <div className="trim-marketplace__value-prop">
          <CheckCircle size={16} />
          <span>Competitive pricing from 1000+ dealers</span>
        </div>
        <div className="trim-marketplace__value-prop">
          <CheckCircle size={16} />
          <span>Filter by price, payment, or distance</span>
        </div>
        <div className="trim-marketplace__value-prop">
          <CheckCircle size={16} />
          <span>Vehicle history on every listing</span>
        </div>
      </div>
      
      {/* Actions */}
      <div className="trim-marketplace__actions trim-marketplace__actions--full">
        <button className="trim-marketplace__btn trim-marketplace__btn--primary trim-marketplace__btn--large">
          VIEW ALL {data.totalListings} LISTINGS
          <ArrowRight size={18} />
        </button>
        <button className="trim-marketplace__btn trim-marketplace__btn--secondary">
          <RefreshCw size={16} />
          ESTIMATE TRADE-IN VALUE
        </button>
      </div>
    </div>
  );
};

// =============================================
// V3D: Compact Single-Row Layout
// Everything in a more compact format
// =============================================
const MarketplaceCTAV3D = ({ make, model, msrp, location }: { make: string; model: string; msrp: number; location: string }) => {
  const data = getLocalInventoryData(msrp);
  const vehicleImages = getVehicleImages(make, model, 2, msrp);
  
  const eLotListings = [
    { id: 1, year: '2022', price: formatPrice(data.priceAvg - 2000), badge: 'Great Price', image: vehicleImages[0] },
    { id: 2, year: '2021', price: formatPrice(data.priceAvg), badge: 'One Owner', image: vehicleImages[1] },
  ];
  
  return (
    <div className="trim-marketplace trim-marketplace--v3d">
      <div className="trim-marketplace__compact-layout">
        {/* Left: Info & Stats */}
        <div className="trim-marketplace__compact-info">
          <span className="trim-marketplace__next-step-badge">YOUR NEXT STEP</span>
          <h3 className="trim-marketplace__title trim-marketplace__title--compact">
            {data.totalListings} Used {model} Near {location}
          </h3>
          <div className="trim-marketplace__compact-stats">
            <div className="trim-marketplace__compact-stat">
              <span className="trim-marketplace__compact-stat-value">{formatPrice(data.priceAvg)}</span>
              <span className="trim-marketplace__compact-stat-label">Avg Price</span>
            </div>
            <div className="trim-marketplace__compact-stat">
              <span className="trim-marketplace__compact-stat-value">{data.goodPriceCount}</span>
              <span className="trim-marketplace__compact-stat-label">Great Deals</span>
            </div>
            <div className="trim-marketplace__compact-stat">
              <span className="trim-marketplace__compact-stat-value">{data.noAccidentCount}</span>
              <span className="trim-marketplace__compact-stat-label">No Accidents</span>
            </div>
          </div>
        </div>
        
        {/* Center: Mini eLot */}
        <div className="trim-marketplace__compact-elot">
          {eLotListings.map((listing) => (
            <div key={listing.id} className="trim-marketplace__compact-card">
              <div className="trim-marketplace__compact-card-image">
                <img 
                  src={listing.image} 
                  alt={`${listing.year} ${model}`}
                  className="trim-marketplace__compact-card-img"
                />
              </div>
              <div className="trim-marketplace__compact-card-info">
                <span className="trim-marketplace__compact-card-badge">{listing.badge}</span>
                <span className="trim-marketplace__compact-card-title">{listing.year} {model}</span>
                <span className="trim-marketplace__compact-card-price">{listing.price}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Right: CTA */}
        <div className="trim-marketplace__compact-cta">
          <button className="trim-marketplace__btn trim-marketplace__btn--primary trim-marketplace__btn--large trim-marketplace__btn--full">
            SHOP ALL LISTINGS
            <ArrowRight size={18} />
          </button>
          <button className="trim-marketplace__btn trim-marketplace__btn--ghost trim-marketplace__btn--full">
            Trade-In Value
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================
// V4D: Dark Theme Layout
// Dark background, white text, premium feel
// =============================================
const MarketplaceCTAV4D = ({ make, model, msrp, location }: { make: string; model: string; msrp: number; location: string }) => {
  const data = getLocalInventoryData(msrp);
  const vehicleImages = getVehicleImages(make, model, 3, msrp);
  
  const eLotListings = [
    { id: 1, year: '2022', price: formatPrice(data.priceAvg - 2000), mileage: '28,450 mi', badge: 'Great Price', image: vehicleImages[0] },
    { id: 2, year: '2021', price: formatPrice(data.priceAvg), mileage: '35,200 mi', badge: 'One Owner', image: vehicleImages[1] },
    { id: 3, year: '2023', price: formatPrice(data.priceAvg + 3000), mileage: '12,800 mi', badge: 'No Accidents', image: vehicleImages[2] },
  ];
  
  return (
    <div className="trim-marketplace trim-marketplace--v4d">
      <div className="trim-marketplace__dark-module">
        {/* Header */}
        <div className="trim-marketplace__dark-header">
          <span className="trim-marketplace__dark-badge">YOUR NEXT STEP</span>
          <h3 className="trim-marketplace__dark-title">Ready to shop used {model} listings?</h3>
          <p className="trim-marketplace__dark-subtitle">
            <MapPin size={14} />
            {data.totalListings} vehicles available near {location}
          </p>
        </div>
        
        {/* Stats Row */}
        <div className="trim-marketplace__dark-stats">
          <div className="trim-marketplace__dark-stat">
            <span className="trim-marketplace__dark-stat-value">{formatPrice(data.priceAvg)}</span>
            <span className="trim-marketplace__dark-stat-label">Average Price</span>
          </div>
          <div className="trim-marketplace__dark-stat">
            <span className="trim-marketplace__dark-stat-value">{formatNumber(data.mileageAvg)}</span>
            <span className="trim-marketplace__dark-stat-label">Avg. Mileage</span>
          </div>
          <div className="trim-marketplace__dark-stat">
            <span className="trim-marketplace__dark-stat-value">{data.goodPriceCount}</span>
            <span className="trim-marketplace__dark-stat-label">Good/Great Deals</span>
          </div>
          <div className="trim-marketplace__dark-stat">
            <span className="trim-marketplace__dark-stat-value">{data.noAccidentCount}</span>
            <span className="trim-marketplace__dark-stat-label">No Accidents</span>
          </div>
        </div>
        
        {/* eLot Preview */}
        <div className="trim-marketplace__dark-elot">
          <div className="trim-marketplace__dark-elot-header">
            <h4 className="trim-marketplace__dark-elot-title">Featured Listings</h4>
            <a href="#" className="trim-marketplace__dark-elot-link">
              View All
              <ChevronRight size={16} />
            </a>
          </div>
          <div className="trim-marketplace__dark-elot-grid">
            {eLotListings.map((listing) => (
              <div key={listing.id} className="trim-marketplace__dark-card">
                <div className="trim-marketplace__dark-card-image">
                  <img 
                    src={listing.image} 
                    alt={`${listing.year} ${model}`}
                    className="trim-marketplace__dark-card-img"
                  />
                  <span className="trim-marketplace__dark-card-badge">{listing.badge}</span>
                </div>
                <div className="trim-marketplace__dark-card-info">
                  <span className="trim-marketplace__dark-card-title">{listing.year} {model}</span>
                  <span className="trim-marketplace__dark-card-price">{listing.price}</span>
                  <span className="trim-marketplace__dark-card-mileage">{listing.mileage}</span>
                </div>
              </div>
            ))}
            <div className="trim-marketplace__dark-card trim-marketplace__dark-card--more">
              <span className="trim-marketplace__dark-more-count">+{data.totalListings - 3}</span>
              <span className="trim-marketplace__dark-more-text">More</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="trim-marketplace__dark-actions">
          <button className="trim-marketplace__btn trim-marketplace__btn--white trim-marketplace__btn--large">
            SHOP ALL {data.totalListings} LISTINGS
            <ArrowRight size={18} />
          </button>
          <button className="trim-marketplace__btn trim-marketplace__btn--outline-white">
            <RefreshCw size={16} />
            ESTIMATE TRADE-IN VALUE
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================
// V5D: Full Marketplace Module (Original)
// Complete module with all elements
// =============================================
const MarketplaceCTAV5D = ({ make, model, msrp, location, trimName }: { make: string; model: string; msrp: number; location: string; trimName?: string }) => {
  const data = getLocalInventoryData(msrp);
  const vehicleImages = getVehicleImages(make, model, 3, msrp);
  const displayModel = trimName ? `${model} ${trimName}` : model;
  
  const eLotListings = [
    { id: 1, year: '2022', price: formatPrice(data.priceAvg - 2000), mileage: '28,450 mi', badge: 'Great Price', image: vehicleImages[0] },
    { id: 2, year: '2021', price: formatPrice(data.priceAvg), mileage: '35,200 mi', badge: 'One Owner', image: vehicleImages[1] },
    { id: 3, year: '2023', price: formatPrice(data.priceAvg + 3000), mileage: '12,800 mi', badge: 'No Accidents', image: vehicleImages[2] },
  ];
  
  return (
    <div className="trim-marketplace trim-marketplace--v5d">
      {/* Your Next Step Banner */}
      <div className="trim-marketplace__next-step-banner">
        <span className="trim-marketplace__next-step-badge">YOUR NEXT STEP</span>
        <h3 className="trim-marketplace__title">Ready to shop used {model} listings?</h3>
        <p className="trim-marketplace__subtitle-text">
          We found {data.totalListings} used {model} vehicles near {location}
        </p>
      </div>
      
      {/* Quick Stats Row */}
      <div className="trim-marketplace__quick-stats">
        <div className="trim-marketplace__quick-stat">
          <span className="trim-marketplace__quick-stat-value">{formatPrice(data.priceAvg)}</span>
          <span className="trim-marketplace__quick-stat-label">Average Price</span>
        </div>
        <div className="trim-marketplace__quick-stat">
          <span className="trim-marketplace__quick-stat-value">{formatNumber(data.mileageAvg)}</span>
          <span className="trim-marketplace__quick-stat-label">Avg. Mileage</span>
        </div>
        <div className="trim-marketplace__quick-stat">
          <span className="trim-marketplace__quick-stat-value">{data.goodPriceCount}</span>
          <span className="trim-marketplace__quick-stat-label">Good/Great Deals</span>
        </div>
        <div className="trim-marketplace__quick-stat">
          <span className="trim-marketplace__quick-stat-value">{data.noAccidentCount}</span>
          <span className="trim-marketplace__quick-stat-label">No Accidents</span>
        </div>
      </div>
      
      {/* eLot Preview */}
      <div className="trim-marketplace__elot">
        <div className="trim-marketplace__elot-header">
          <h4 className="trim-marketplace__elot-title">Featured Listings Near You</h4>
          <a href="#" className="trim-marketplace__elot-link">
            View All {data.totalListings} Listings
            <ChevronRight size={16} />
          </a>
        </div>
        <div className="trim-marketplace__elot-grid">
          {eLotListings.map((listing) => (
            <div key={listing.id} className="trim-marketplace__elot-card">
              <div className="trim-marketplace__elot-card-image">
                <img 
                  src={listing.image} 
                  alt={`${listing.year} ${displayModel}`}
                  className="trim-marketplace__elot-card-img"
                />
                <span className="trim-marketplace__elot-card-badge">{listing.badge}</span>
              </div>
              <div className="trim-marketplace__elot-card-info">
                <span className="trim-marketplace__elot-card-title">{listing.year} {displayModel}</span>
                <span className="trim-marketplace__elot-card-price">{listing.price}</span>
                <span className="trim-marketplace__elot-card-mileage">{listing.mileage}</span>
              </div>
            </div>
          ))}
          <div className="trim-marketplace__elot-card trim-marketplace__elot-card--more">
            <span className="trim-marketplace__elot-more-count">+{data.totalListings - 3}</span>
            <span className="trim-marketplace__elot-more-text">More Listings</span>
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
      
      {/* Value Props */}
      <div className="trim-marketplace__value-props">
        <div className="trim-marketplace__value-prop">
          <CheckCircle size={16} />
          <span>Competitive pricing from 1000+ dealers</span>
        </div>
        <div className="trim-marketplace__value-prop">
          <CheckCircle size={16} />
          <span>Filter by price, payment, or distance</span>
        </div>
        <div className="trim-marketplace__value-prop">
          <CheckCircle size={16} />
          <span>Vehicle history on every listing</span>
        </div>
      </div>
      
      {/* Actions */}
      <div className="trim-marketplace__actions trim-marketplace__actions--full">
        <button className="trim-marketplace__btn trim-marketplace__btn--primary trim-marketplace__btn--large">
          SHOP ALL {data.totalListings} LISTINGS
          <ArrowRight size={18} />
        </button>
        <button className="trim-marketplace__btn trim-marketplace__btn--secondary">
          <RefreshCw size={16} />
          ESTIMATE TRADE-IN VALUE
        </button>
      </div>
    </div>
  );
};

// =============================================
// MAIN COMPONENT
// =============================================
const TrimSelectorWithCTA = ({ 
  trims, 
  title = "Pricing and Which One to Buy", 
  subtitle,
  variant,
  make = 'Vehicle',
  model = 'Vehicle',
  msrp = 35000,
  location = 'Miami, FL'
}: TrimSelectorWithCTAProps) => {
  const [selectedTrim, setSelectedTrim] = useState(
    trims.find(t => t.recommended)?.id || trims[0]?.id
  );
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Sort trims: recommended first, then others
  const sortedTrims = useMemo(() => {
    const recommended = trims.find(t => t.recommended);
    const others = trims.filter(t => !t.recommended);
    return recommended ? [recommended, ...others] : trims;
  }, [trims]);

  // Get recommended trim name for marketplace CTA
  const recommendedTrimName = useMemo(() => {
    const recommended = trims.find(t => t.recommended);
    return recommended?.name || trims[0]?.name;
  }, [trims]);

  // Check scroll position
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll carousel
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320; // Card width + gap
      const newScrollLeft = direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScrollPosition, 300);
    }
  };

  // Select marketplace CTA variant
  const MarketplaceCTA = {
    v1d: () => <MarketplaceCTAV1D make={make} model={model} msrp={msrp} location={location} />,
    v2d: () => <MarketplaceCTAV2D make={make} model={model} msrp={msrp} location={location} />,
    v3d: () => <MarketplaceCTAV3D make={make} model={model} msrp={msrp} location={location} />,
    v4d: () => <MarketplaceCTAV4D make={make} model={model} msrp={msrp} location={location} />,
    v5d: () => <MarketplaceCTAV5D make={make} model={model} msrp={msrp} location={location} trimName={recommendedTrimName} />,
  }[variant];

  return (
    <section className="trim-selector">
      <div className="container">
        <div className="trim-selector__header">
          <h2 className="trim-selector__title">{title}</h2>
          {subtitle && <p className="trim-selector__subtitle">{subtitle}</p>}
        </div>
        
        {/* Carousel Container */}
        <div className="trim-selector__carousel-wrapper">
          {/* Left Navigation Arrow */}
          <button 
            className={`trim-selector__nav trim-selector__nav--left ${!canScrollLeft ? 'trim-selector__nav--disabled' : ''}`}
            onClick={() => scrollCarousel('left')}
            disabled={!canScrollLeft}
            aria-label="Previous trims"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Carousel Track */}
          <div 
            className="trim-selector__carousel"
            ref={carouselRef}
            onScroll={checkScrollPosition}
          >
            {sortedTrims.map((trim) => (
              <div 
                key={trim.id}
                className={`trim-card ${selectedTrim === trim.id ? 'trim-card--selected' : ''} ${trim.recommended ? 'trim-card--recommended trim-card--sticky' : ''}`}
                onClick={() => setSelectedTrim(trim.id)}
                style={trim.recommended ? { 
                  position: 'sticky', 
                  left: 0, 
                  zIndex: 10 
                } : undefined}
              >
                {trim.recommended && (
                  <div className="trim-card__badge">
                    <span>Recommended</span>
                  </div>
                )}
                
                <div className="trim-card__header">
                  <h3 className="trim-card__name">{trim.name}</h3>
                  <div className="trim-card__price">
                    <span className="trim-card__price-label">Starting at</span>
                    <span className="trim-card__price-value">{trim.price}</span>
                  </div>
                </div>
                
                <ul className="trim-card__features">
                  {trim.features.map((feature, idx) => (
                    <li key={idx} className="trim-card__feature">
                      <Check size={16} className="trim-card__feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="trim-card__actions">
                  <button className="trim-card__btn trim-card__btn--primary">
                    Build This Trim
                    <ChevronRight size={16} />
                  </button>
                  <button className="trim-card__btn trim-card__btn--ghost">
                    <Info size={16} />
                    More Details
                  </button>
                </div>
                
                {selectedTrim === trim.id && (
                  <div className="trim-card__selected-indicator">
                    <Check size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Right Navigation Arrow */}
          <button 
            className={`trim-selector__nav trim-selector__nav--right ${!canScrollRight ? 'trim-selector__nav--disabled' : ''}`}
            onClick={() => scrollCarousel('right')}
            disabled={!canScrollRight}
            aria-label="Next trims"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Marketplace CTA - Variant Specific */}
        <MarketplaceCTA />
        
        <div className="trim-selector__disclaimer">
          <Info size={16} />
          <p>Prices shown are manufacturer's suggested retail prices (MSRP). Actual prices may vary based on location, dealer, and available inventory.</p>
        </div>
      </div>
    </section>
  );
};

export default TrimSelectorWithCTA;
