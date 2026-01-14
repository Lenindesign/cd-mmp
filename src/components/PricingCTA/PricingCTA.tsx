import { ArrowRight, TrendingDown, Car, Shield, MapPin, DollarSign, Gauge, CheckCircle, Star, Calculator, ChevronRight } from 'lucide-react';
import './PricingCTA.css';

interface PricingCTAProps {
  vehicleName: string;
  make: string;
  model: string;
  msrp: number;
  location?: string;
}

// Mock data for local inventory insights
const getLocalInventoryData = (msrp: number) => ({
  lowPrice: Math.round(msrp * 0.75),
  highPrice: Math.round(msrp * 1.05),
  avgPrice: Math.round(msrp * 0.88),
  totalInventory: 247,
  goodGreatPrice: 89,
  oneOwner: 156,
  noAccidents: 198,
  lowMileage: 12500,
  highMileage: 85000,
  avgMileage: 42000,
});

// Sample listings for carousel
const getSampleListings = (_make: string, _model: string, msrp: number) => [
  {
    id: 1,
    year: 2023,
    price: Math.round(msrp * 0.85),
    mileage: 18500,
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c0b6e89190008af75b2/005-2025-chevrolet-trax-exterior-front-view.jpg',
    badge: 'Great Price',
    dealer: 'AutoNation Miami',
  },
  {
    id: 2,
    year: 2022,
    price: Math.round(msrp * 0.78),
    mileage: 32000,
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c139cbba1000852d79d/008-2025-chevrolet-trax-exterior-front-view.jpg',
    badge: 'One Owner',
    dealer: 'CarMax Doral',
  },
  {
    id: 3,
    year: 2023,
    price: Math.round(msrp * 0.82),
    mileage: 24000,
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c246e89190008af75b5/014-2025-chevrolet-trax-exterior-rear-view.jpg',
    badge: 'No Accidents',
    dealer: 'Kendall Toyota',
  },
];

// =============================================
// VARIANT 1B: Local Inventory Insights
// =============================================
export const PricingCTAV1B = ({ vehicleName, msrp, location = 'Miami, FL' }: PricingCTAProps) => {
  const data = getLocalInventoryData(msrp);
  
  return (
    <section className="pricing-cta pricing-cta--v1b">
      <div className="container">
        <div className="pricing-cta__header">
          <h2 className="pricing-cta__title">Shop {vehicleName} Near You</h2>
          <p className="pricing-cta__subtitle">
            <MapPin size={16} />
            {data.totalInventory} vehicles available near {location}
          </p>
        </div>
        
        <div className="pricing-cta__content pricing-cta__content--v1b">
          <div className="pricing-cta__price-insights">
            <h3 className="pricing-cta__section-title">Local Price Insights</h3>
            <div className="pricing-cta__price-range">
              <div className="pricing-cta__price-bar">
                <div className="pricing-cta__price-fill" style={{ width: '70%' }}></div>
                <div className="pricing-cta__price-marker" style={{ left: '45%' }}>
                  <span className="pricing-cta__price-marker-label">AVG</span>
                </div>
              </div>
              <div className="pricing-cta__price-labels">
                <span className="pricing-cta__price-low">${data.lowPrice.toLocaleString()}</span>
                <span className="pricing-cta__price-avg">${data.avgPrice.toLocaleString()}</span>
                <span className="pricing-cta__price-high">${data.highPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="pricing-cta__inventory-badges">
            <div className="pricing-cta__badge pricing-cta__badge--good">
              <TrendingDown size={18} />
              <span className="pricing-cta__badge-count">{data.goodGreatPrice}</span>
              <span className="pricing-cta__badge-label">Good/Great Price</span>
            </div>
            <div className="pricing-cta__badge pricing-cta__badge--owner">
              <Car size={18} />
              <span className="pricing-cta__badge-count">{data.oneOwner}</span>
              <span className="pricing-cta__badge-label">One Owner</span>
            </div>
            <div className="pricing-cta__badge pricing-cta__badge--clean">
              <Shield size={18} />
              <span className="pricing-cta__badge-count">{data.noAccidents}</span>
              <span className="pricing-cta__badge-label">No Accidents</span>
            </div>
          </div>
          
          <div className="pricing-cta__actions">
            <button className="pricing-cta__btn pricing-cta__btn--primary">
              SHOP {data.totalInventory} LISTINGS
              <ArrowRight size={18} />
            </button>
            <button className="pricing-cta__btn pricing-cta__btn--secondary">
              ESTIMATE TRADE-IN VALUE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================
// VARIANT 2B: Expert Tip + Value Props
// =============================================
export const PricingCTAV2B = ({ vehicleName, make, model, msrp, location = 'Miami, FL' }: PricingCTAProps) => {
  const data = getLocalInventoryData(msrp);
  
  return (
    <section className="pricing-cta pricing-cta--v2b">
      <div className="container">
        <div className="pricing-cta__content pricing-cta__content--v2b">
          <div className="pricing-cta__expert-tip">
            <div className="pricing-cta__expert-badge">
              <Star size={16} fill="currentColor" />
              <span>C/D EXPERT TIP</span>
            </div>
            <p className="pricing-cta__expert-text">
              The best time to buy a used {make} {model} is now. With {data.totalInventory} vehicles 
              available near {location}, you have plenty of options to find the right one at a competitive price.
            </p>
          </div>
          
          <div className="pricing-cta__value-props">
            <h3 className="pricing-cta__section-title">Why Shop With Us</h3>
            <div className="pricing-cta__props-grid">
              <div className="pricing-cta__prop">
                <div className="pricing-cta__prop-icon">
                  <TrendingDown size={24} />
                </div>
                <div className="pricing-cta__prop-content">
                  <span className="pricing-cta__prop-title">Competitive Pricing</span>
                  <span className="pricing-cta__prop-desc">Compare prices from {data.totalInventory}+ dealers</span>
                </div>
              </div>
              <div className="pricing-cta__prop">
                <div className="pricing-cta__prop-icon">
                  <MapPin size={24} />
                </div>
                <div className="pricing-cta__prop-content">
                  <span className="pricing-cta__prop-title">Nationwide Network</span>
                  <span className="pricing-cta__prop-desc">Access dealers across the country</span>
                </div>
              </div>
              <div className="pricing-cta__prop">
                <div className="pricing-cta__prop-icon">
                  <Shield size={24} />
                </div>
                <div className="pricing-cta__prop-content">
                  <span className="pricing-cta__prop-title">Verified History</span>
                  <span className="pricing-cta__prop-desc">{data.noAccidents} vehicles with clean records</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pricing-cta__next-step">
            <span className="pricing-cta__next-label">YOUR NEXT STEP</span>
            <button className="pricing-cta__btn pricing-cta__btn--large">
              <span>Browse {vehicleName} Inventory</span>
              <span className="pricing-cta__btn-count">{data.totalInventory} available</span>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================
// VARIANT 3B: eLot Carousel Preview
// =============================================
export const PricingCTAV3B = ({ vehicleName, make, model, msrp, location = 'Miami, FL' }: PricingCTAProps) => {
  const data = getLocalInventoryData(msrp);
  const listings = getSampleListings(make, model, msrp);
  
  return (
    <section className="pricing-cta pricing-cta--v3b">
      <div className="container">
        <div className="pricing-cta__header pricing-cta__header--with-action">
          <div>
            <h2 className="pricing-cta__title">{vehicleName} For Sale Near {location}</h2>
            <p className="pricing-cta__subtitle">
              Price Range: ${data.lowPrice.toLocaleString()} - ${data.highPrice.toLocaleString()}
            </p>
          </div>
          <a href="#" className="pricing-cta__view-all">
            View All {data.totalInventory} Listings
            <ArrowRight size={16} />
          </a>
        </div>
        
        <div className="pricing-cta__carousel">
          {listings.map((listing) => (
            <div key={listing.id} className="pricing-cta__card">
              <div className="pricing-cta__card-image">
                <img src={listing.image} alt={`${listing.year} ${make} ${model}`} />
                <span className="pricing-cta__card-badge">{listing.badge}</span>
              </div>
              <div className="pricing-cta__card-content">
                <h4 className="pricing-cta__card-title">{listing.year} {make} {model}</h4>
                <p className="pricing-cta__card-mileage">{listing.mileage.toLocaleString()} miles</p>
                <p className="pricing-cta__card-price">${listing.price.toLocaleString()}</p>
                <p className="pricing-cta__card-dealer">{listing.dealer}</p>
              </div>
              <button className="pricing-cta__card-btn">View Details</button>
            </div>
          ))}
          <div className="pricing-cta__card pricing-cta__card--more">
            <div className="pricing-cta__card-more-content">
              <span className="pricing-cta__card-more-count">+{data.totalInventory - 3}</span>
              <span className="pricing-cta__card-more-label">More Listings</span>
              <button className="pricing-cta__btn pricing-cta__btn--outline">
                SEE ALL
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================
// VARIANT 4B: Shop by Payment
// =============================================
export const PricingCTAV4B = ({ vehicleName, msrp, location = 'Miami, FL' }: Omit<PricingCTAProps, 'make' | 'model'>) => {
  const data = getLocalInventoryData(msrp);
  const monthlyPayment = Math.round((data.avgPrice * 0.8) / 60); // Rough estimate
  
  return (
    <section className="pricing-cta pricing-cta--v4b">
      <div className="container">
        <div className="pricing-cta__content pricing-cta__content--v4b">
          <div className="pricing-cta__payment-section">
            <h2 className="pricing-cta__title">Find Your {vehicleName}</h2>
            
            <div className="pricing-cta__payment-toggle">
              <button className="pricing-cta__toggle-btn pricing-cta__toggle-btn--active">
                <DollarSign size={18} />
                Shop by Price
              </button>
              <button className="pricing-cta__toggle-btn">
                <Calculator size={18} />
                Shop by Payment
              </button>
            </div>
            
            <div className="pricing-cta__payment-display">
              <div className="pricing-cta__payment-card">
                <span className="pricing-cta__payment-label">Average Price</span>
                <span className="pricing-cta__payment-value">${data.avgPrice.toLocaleString()}</span>
                <span className="pricing-cta__payment-estimate">
                  Est. ${monthlyPayment}/mo*
                </span>
              </div>
              <div className="pricing-cta__payment-range">
                <div className="pricing-cta__range-item">
                  <span className="pricing-cta__range-label">Low</span>
                  <span className="pricing-cta__range-value">${data.lowPrice.toLocaleString()}</span>
                </div>
                <div className="pricing-cta__range-item">
                  <span className="pricing-cta__range-label">High</span>
                  <span className="pricing-cta__range-value">${data.highPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <p className="pricing-cta__payment-note">
              *Based on 60-month financing with 20% down. <a href="#">Get pre-qualified</a> for personalized rates.
            </p>
          </div>
          
          <div className="pricing-cta__payment-actions">
            <button className="pricing-cta__btn pricing-cta__btn--primary pricing-cta__btn--full">
              SHOP {data.totalInventory} VEHICLES NEAR {location.toUpperCase()}
              <ArrowRight size={18} />
            </button>
            <button className="pricing-cta__btn pricing-cta__btn--ghost">
              <Calculator size={18} />
              GET PRE-QUALIFIED
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================
// VARIANT 5B: Full Market Analysis
// =============================================
export const PricingCTAV5B = ({ vehicleName, msrp, location = 'Miami, FL' }: PricingCTAProps) => {
  const data = getLocalInventoryData(msrp);
  
  return (
    <section className="pricing-cta pricing-cta--v5b">
      <div className="container">
        <div className="pricing-cta__header">
          <h2 className="pricing-cta__title">Local Market Analysis</h2>
          <p className="pricing-cta__subtitle">
            <MapPin size={16} />
            {vehicleName} market insights for {location}
          </p>
        </div>
        
        <div className="pricing-cta__market-grid">
          <div className="pricing-cta__market-card">
            <div className="pricing-cta__market-icon">
              <DollarSign size={24} />
            </div>
            <h3 className="pricing-cta__market-title">Pricing</h3>
            <div className="pricing-cta__market-stats">
              <div className="pricing-cta__stat">
                <span className="pricing-cta__stat-value">${data.lowPrice.toLocaleString()}</span>
                <span className="pricing-cta__stat-label">Low</span>
              </div>
              <div className="pricing-cta__stat pricing-cta__stat--highlight">
                <span className="pricing-cta__stat-value">${data.avgPrice.toLocaleString()}</span>
                <span className="pricing-cta__stat-label">Average</span>
              </div>
              <div className="pricing-cta__stat">
                <span className="pricing-cta__stat-value">${data.highPrice.toLocaleString()}</span>
                <span className="pricing-cta__stat-label">High</span>
              </div>
            </div>
          </div>
          
          <div className="pricing-cta__market-card">
            <div className="pricing-cta__market-icon">
              <Gauge size={24} />
            </div>
            <h3 className="pricing-cta__market-title">Mileage</h3>
            <div className="pricing-cta__market-stats">
              <div className="pricing-cta__stat">
                <span className="pricing-cta__stat-value">{(data.lowMileage / 1000).toFixed(0)}K</span>
                <span className="pricing-cta__stat-label">Low</span>
              </div>
              <div className="pricing-cta__stat pricing-cta__stat--highlight">
                <span className="pricing-cta__stat-value">{(data.avgMileage / 1000).toFixed(0)}K</span>
                <span className="pricing-cta__stat-label">Average</span>
              </div>
              <div className="pricing-cta__stat">
                <span className="pricing-cta__stat-value">{(data.highMileage / 1000).toFixed(0)}K</span>
                <span className="pricing-cta__stat-label">High</span>
              </div>
            </div>
          </div>
          
          <div className="pricing-cta__market-card">
            <div className="pricing-cta__market-icon">
              <CheckCircle size={24} />
            </div>
            <h3 className="pricing-cta__market-title">Inventory Quality</h3>
            <div className="pricing-cta__market-badges">
              <div className="pricing-cta__quality-badge">
                <span className="pricing-cta__quality-count">{data.goodGreatPrice}</span>
                <span className="pricing-cta__quality-label">Good/Great Price</span>
              </div>
              <div className="pricing-cta__quality-badge">
                <span className="pricing-cta__quality-count">{data.oneOwner}</span>
                <span className="pricing-cta__quality-label">One Owner</span>
              </div>
              <div className="pricing-cta__quality-badge">
                <span className="pricing-cta__quality-count">{data.noAccidents}</span>
                <span className="pricing-cta__quality-label">No Accidents</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pricing-cta__trade-in-banner">
          <div className="pricing-cta__trade-in-content">
            <div className="pricing-cta__trade-in-icon">
              <Car size={32} />
            </div>
            <div className="pricing-cta__trade-in-text">
              <h4>What's Your Car Worth?</h4>
              <p>Get an instant estimate powered by Black Book</p>
            </div>
          </div>
          <button className="pricing-cta__btn pricing-cta__btn--secondary">
            ESTIMATE TRADE-IN
            <ArrowRight size={18} />
          </button>
        </div>
        
        <div className="pricing-cta__actions pricing-cta__actions--centered">
          <button className="pricing-cta__btn pricing-cta__btn--primary pricing-cta__btn--large">
            SHOP {data.totalInventory} {vehicleName.toUpperCase()} LISTINGS
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

