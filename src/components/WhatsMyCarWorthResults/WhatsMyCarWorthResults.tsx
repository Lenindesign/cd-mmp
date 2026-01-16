import { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronRight, MapPin, Phone, Mail, Star, Bookmark, Check, Car, TrendingDown, TrendingUp, DollarSign, Clock, BarChart3, Zap, ArrowDown } from 'lucide-react';
import { Button } from '../Button';
import ForSaleNearYou from '../ForSaleNearYou';
import { DealerMapModal } from '../DealerLocatorMap';
import { vehicleDatabase } from '../../data/vehicles';
import './WhatsMyCarWorthResults.css';

// Rolling number animation component
const RollingNumber = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setIsAnimating(true);
    startTimeRef.current = null;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      // Start from a lower value and roll up
      const startValue = value * 0.7;
      const currentValue = Math.round(startValue + (value - startValue) * easeOutQuart);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setIsAnimating(false);
      }
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, duration]);

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(displayValue);

  return (
    <span className={`rolling-number ${isAnimating ? 'rolling-number--animating' : ''}`}>
      {formattedValue}
    </span>
  );
};

interface TradeEstimate {
  low: number;
  mid: number;
  high: number;
  vehicle: {
    year: number;
    make: string;
    model: string;
    mileage: number;
    condition: string;
  };
}

interface Dealer {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  rating: number;
  distance: number;
}

interface WhatsMyCarWorthResultsProps {
  variant?: 'marketplace-focused' | 'balanced' | 'content-focused';
  tradeEstimate: TradeEstimate;
  dealers: Dealer[];
  showSimilarVehicles?: boolean;
  showNextVehicle?: boolean;
}

const WhatsMyCarWorthResults = ({
  variant = 'balanced',
  tradeEstimate,
  dealers,
  showSimilarVehicles = true,
  showNextVehicle = true,
}: WhatsMyCarWorthResultsProps) => {
  // Use first dealer as primary (the one who purchased the lead)
  const primaryDealer = dealers[0];
  const [saved, setSaved] = useState(false);
  const [showDealersModal, setShowDealersModal] = useState(false);

  // Find vehicle image from database
  const vehicleImage = useMemo(() => {
    const vehicle = vehicleDatabase.find(
      (v) =>
        String(v.year) === String(tradeEstimate.vehicle.year) &&
        v.make.toLowerCase() === tradeEstimate.vehicle.make.toLowerCase() &&
        v.model.toLowerCase() === tradeEstimate.vehicle.model.toLowerCase()
    );
    return vehicle?.image || 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg';
  }, [tradeEstimate.vehicle]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate buying power metrics
  const buyingPower = useMemo(() => {
    const tradeValue = tradeEstimate.mid;
    // Estimated monthly payment reduction (assuming 60-month loan at 6% APR)
    const monthlyReduction = Math.round(tradeValue / 60);
    // New car MSRP for same model
    const newCarMsrp = 32825; // Example MSRP for new Accord
    const afterTradeIn = newCarMsrp - tradeValue;
    
    return {
      monthlyReduction,
      newCarMsrp,
      afterTradeIn,
      coversDownPayment: tradeValue >= 5000,
    };
  }, [tradeEstimate.mid]);

  // VIN-specific inventory with trade-in adjusted pricing - Kia K5 options
  const inventoryWithTradeIn = useMemo(() => {
    return [
      { 
        id: '1',
        stockNumber: 'K5-78421',
        daysOnLot: 12,
        year: 2025, 
        make: 'Kia', 
        model: 'K5',
        trim: 'GT-Line AWD',
        exteriorColor: 'Wolf Gray',
        interiorColor: 'Black',
        msrp: 32190, 
        image: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a4c354fc591800081603fc/3-2024-kia-k5-front-view.jpg',
        mileage: 0,
        isNew: true,
        dealer: 'Pinecrest Kia',
        distance: 4.2,
        incentives: [
          { type: 'rebate', label: '$1,500 Customer Cash', amount: 1500 },
          { type: 'apr', label: '1.9% APR for 60 mo', amount: 0 },
        ],
      },
      { 
        id: '2',
        stockNumber: 'U-29156',
        daysOnLot: 67,
        year: 2024, 
        make: 'Kia', 
        model: 'K5',
        trim: 'EX',
        exteriorColor: 'Passion Red',
        interiorColor: 'Gray',
        msrp: 24890, 
        image: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a4ab44cd06f600080e4953/14-2024-kia-forte-front-view.jpg',
        mileage: 18420,
        isNew: false,
        dealer: 'AutoNation Kia Miami',
        distance: 8.6,
        certified: true,
        incentives: [
          { type: 'rebate', label: '$2,000 Dealer Discount', amount: 2000 },
          { type: 'apr', label: '2.9% APR for 72 mo', amount: 0 },
          { type: 'warranty', label: '100K mi CPO Warranty', amount: 0 },
        ],
      },
      { 
        id: '3',
        stockNumber: 'K5-78733',
        daysOnLot: 45,
        year: 2025, 
        make: 'Kia', 
        model: 'K5',
        trim: 'GT',
        exteriorColor: 'Snow White Pearl',
        interiorColor: 'Red',
        msrp: 34090, 
        image: 'https://d2kde5ohu8qb21.cloudfront.net/files/690bee134ffec60002725d25/010-2025-kia-ev6.jpg',
        mileage: 0,
        isNew: true,
        dealer: 'Kendall Kia',
        distance: 12.1,
        incentives: [
          { type: 'rebate', label: '$1,000 Bonus Cash', amount: 1000 },
          { type: 'loyalty', label: '$500 Loyalty Bonus', amount: 500 },
        ],
      },
    ].map(car => ({
      ...car,
      afterTradeIn: car.msrp - tradeEstimate.mid,
      monthlyPayment: Math.round((car.msrp - tradeEstimate.mid) / 60),
    }));
  }, [tradeEstimate]);

  const faqs = [
    {
      question: 'How accurate is the estimate?',
      answer: 'Our estimates are based on real-time market data from Black Book, the industry standard for vehicle valuation. While actual offers may vary based on local market conditions and vehicle inspection, our estimates provide a reliable baseline.',
    },
    {
      question: "What factors affect my car's value?",
      answer: 'Key factors include mileage, condition, accident history, service records, optional equipment, and current market demand for your specific make and model.',
    },
    {
      question: 'Where can I find my VIN?',
      answer: "Your VIN (Vehicle Identification Number) can be found on your dashboard near the windshield, on the driver's side door jamb, or on your vehicle registration and insurance documents.",
    },
    {
      question: 'Is my information secure?',
      answer: "Yes! We don't require any personal information to provide an estimate. Your vehicle information is only used to calculate the value and is not stored or shared.",
    },
  ];

  return (
    <div className={`whats-my-car-worth-results whats-my-car-worth-results--${variant}`}>
      {/* Trade Estimate Section */}
      <section className="trade-estimate">
        <div className="trade-estimate__container">
          {/* Vehicle Image */}
          <div className="trade-estimate__image-wrapper">
            <img 
              src={vehicleImage} 
              alt={`${tradeEstimate.vehicle.year} ${tradeEstimate.vehicle.make} ${tradeEstimate.vehicle.model}`}
              className="trade-estimate__image"
            />
          </div>

          {/* Content */}
          <div className="trade-estimate__content">
            <div className="trade-estimate__header">
              <h1 className="trade-estimate__title">Your Trade Estimate</h1>
              <p className="trade-estimate__subtitle">
                {tradeEstimate.vehicle.year} {tradeEstimate.vehicle.make} {tradeEstimate.vehicle.model}
              </p>
            </div>
            
            {/* Primary Estimate - Most Prominent */}
            <div className="trade-estimate__primary">
              <div className="trade-estimate__primary-label">Estimated Trade-In Value</div>
              <div className="trade-estimate__primary-amount">
                <RollingNumber value={tradeEstimate.mid} duration={1800} />
              </div>
              <div className="trade-estimate__primary-badge">Most Likely</div>
              <div className="trade-estimate__primary-range">
                Range: {formatPrice(tradeEstimate.low)} - {formatPrice(tradeEstimate.high)}
              </div>
            </div>

            {/* Value Forecast */}
            <div className="trade-estimate__forecast">
              <div className="trade-estimate__forecast-header">
                <TrendingDown size={16} className="trade-estimate__forecast-icon trade-estimate__forecast-icon--down" />
                <span className="trade-estimate__forecast-title">Value Forecast</span>
              </div>
              <div className="trade-estimate__forecast-content">
                <div className="trade-estimate__forecast-item">
                  <span className="trade-estimate__forecast-label">30 days</span>
                  <span className="trade-estimate__forecast-value trade-estimate__forecast-value--down">-$420</span>
                </div>
                <div className="trade-estimate__forecast-item">
                  <span className="trade-estimate__forecast-label">60 days</span>
                  <span className="trade-estimate__forecast-value trade-estimate__forecast-value--down">-$890</span>
                </div>
                <div className="trade-estimate__forecast-item">
                  <span className="trade-estimate__forecast-label">90 days</span>
                  <span className="trade-estimate__forecast-value trade-estimate__forecast-value--down">-$1,340</span>
                </div>
              </div>
              <p className="trade-estimate__forecast-note">
                <Clock size={12} />
                Your {tradeEstimate.vehicle.make} {tradeEstimate.vehicle.model} is depreciating ~$14/day. Trade in sooner to maximize value.
              </p>
            </div>

            {/* Vehicle Details */}
            <div className="trade-estimate__details">
              <div className="trade-estimate__detail">
                <span className="trade-estimate__detail-label">Mileage</span>
                <span className="trade-estimate__detail-value">{tradeEstimate.vehicle.mileage.toLocaleString()} mi</span>
              </div>
              <div className="trade-estimate__detail">
                <span className="trade-estimate__detail-label">Condition</span>
                <span className="trade-estimate__detail-value">{tradeEstimate.vehicle.condition}</span>
              </div>
            </div>

            {/* Buying Power Section - NEW: Reframes value as forward-looking */}
            <div className="trade-estimate__buying-power">
              <div className="trade-estimate__buying-power-header">
                <Car size={20} />
                <span>Your Buying Power</span>
              </div>
              <div className="trade-estimate__buying-power-benefits">
                <div className="trade-estimate__buying-power-item">
                  <Check size={16} className="trade-estimate__check-icon" />
                  <span>Cover most down payments on a new {tradeEstimate.vehicle.make}</span>
                </div>
                <div className="trade-estimate__buying-power-item">
                  <Check size={16} className="trade-estimate__check-icon" />
                  <span>Reduce monthly payments by ~{formatPrice(buyingPower.monthlyReduction)}/mo</span>
                </div>
                <div className="trade-estimate__buying-power-item">
                  <Check size={16} className="trade-estimate__check-icon" />
                  <span>Put you into a newer {tradeEstimate.vehicle.model} today</span>
                </div>
              </div>
            </div>

            {/* Primary CTA - Forward-looking language */}
            <div className="trade-estimate__actions">
              <Button variant="success" size="large">
                Apply Trade-In to New Cars
              </Button>
              <Button 
                variant="outline" 
                size="large" 
                onClick={() => setSaved(!saved)}
                iconLeft={<Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />}
              >
                {saved ? 'Saved' : 'Save Estimate'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Inventory Section BEFORE Dealers - with trade-in adjusted pricing */}
      <section className="trade-inventory">
        <div className="trade-inventory__header">
          <h2 className="trade-inventory__title">
            Kia K5 With Your {formatPrice(tradeEstimate.mid)} Trade-In
          </h2>
          <p className="trade-inventory__subtitle">
            See how your trade-in applies to available K5 inventory near you
          </p>
        </div>
        <div className="trade-inventory__grid">
          {inventoryWithTradeIn.map((car) => (
            <div key={car.id} className="trade-inventory__card">
              <div className="trade-inventory__card-image">
                <img src={car.image} alt={`${car.year} ${car.make} ${car.model}`} />
                {car.isNew ? (
                  <span className="trade-inventory__badge">New</span>
                ) : car.certified ? (
                  <span className="trade-inventory__badge trade-inventory__badge--certified">CPO</span>
                ) : null}
              </div>
              <div className="trade-inventory__card-content">
                <h3 className="trade-inventory__card-title">
                  {car.year} {car.make} {car.model} {car.trim}
                </h3>
                <div className="trade-inventory__card-specs">
                  <span className="trade-inventory__spec">{car.exteriorColor}</span>
                  <span className="trade-inventory__spec-divider">•</span>
                  <span className="trade-inventory__spec">{car.interiorColor} Interior</span>
                  {!car.isNew && (
                    <>
                      <span className="trade-inventory__spec-divider">•</span>
                      <span className="trade-inventory__spec">{car.mileage.toLocaleString()} mi</span>
                    </>
                  )}
                </div>
                <div className="trade-inventory__card-pricing">
                  <div className="trade-inventory__price-row">
                    <span className="trade-inventory__price-label">{car.isNew ? 'MSRP' : 'Price'}</span>
                    <span className="trade-inventory__price-msrp">{formatPrice(car.msrp)}</span>
                  </div>
                  <div className="trade-inventory__price-row trade-inventory__price-row--highlight">
                    <span className="trade-inventory__price-label">
                      <TrendingDown size={14} />
                      After trade-in
                    </span>
                    <span className="trade-inventory__price-after">~{formatPrice(car.afterTradeIn)} + tax</span>
                  </div>
                  <div className="trade-inventory__price-row">
                    <span className="trade-inventory__price-label">Est. monthly</span>
                    <span className="trade-inventory__price-monthly">~{formatPrice(car.monthlyPayment)}/mo</span>
                  </div>
                </div>
                {car.incentives && car.incentives.length > 0 && (
                  <div className="trade-inventory__card-incentives">
                    {car.incentives.map((incentive, idx) => (
                      <span 
                        key={idx} 
                        className={`trade-inventory__incentive trade-inventory__incentive--${incentive.type}`}
                      >
                        {incentive.label}
                      </span>
                    ))}
                  </div>
                )}
                <div className="trade-inventory__card-dealer">
                  <MapPin size={12} />
                  <span>{car.dealer}</span>
                  <span className="trade-inventory__card-distance">{car.distance} mi</span>
                </div>
                <div className="trade-inventory__card-vin">
                  <span>Stock #{car.stockNumber}</span>
                  <span className={`trade-inventory__days-on-lot ${car.daysOnLot > 45 ? 'trade-inventory__days-on-lot--high' : ''}`}>
                    {car.daysOnLot} days on lot
                  </span>
                </div>
                <Button variant="primary" size="medium" className="trade-inventory__card-cta">
                  Check Availability
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="trade-inventory__footer">
          <Button 
            variant="outline" 
            size="medium" 
            iconRight={<ChevronRight size={18} />}
            onClick={() => setShowDealersModal(true)}
          >
            See All Kia K5 Near You
          </Button>
        </div>
      </section>

      {/* Marketplace Analysis Section */}
      <section className="marketplace-analysis">
        <div className="marketplace-analysis__header">
          <h2 className="marketplace-analysis__title">
            <BarChart3 size={24} />
            Kia K5 Market Analysis
          </h2>
          <p className="marketplace-analysis__subtitle">Real-time pricing intelligence for your area</p>
        </div>
        <div className="marketplace-analysis__grid">
          <div className="marketplace-analysis__card">
            <div className="marketplace-analysis__card-icon marketplace-analysis__card-icon--speed">
              <Zap size={20} />
            </div>
            <div className="marketplace-analysis__card-content">
              <span className="marketplace-analysis__card-label">Market Speed</span>
              <span className="marketplace-analysis__card-value">Hot</span>
              <span className="marketplace-analysis__card-detail">K5s sell in avg. 18 days</span>
            </div>
          </div>
          <div className="marketplace-analysis__card">
            <div className="marketplace-analysis__card-icon marketplace-analysis__card-icon--trend">
              <TrendingDown size={20} />
            </div>
            <div className="marketplace-analysis__card-content">
              <span className="marketplace-analysis__card-label">Price Trend</span>
              <span className="marketplace-analysis__card-value marketplace-analysis__card-value--positive">Buyer's Market</span>
              <span className="marketplace-analysis__card-detail">Prices down 3.2% this month</span>
            </div>
          </div>
          <div className="marketplace-analysis__card">
            <div className="marketplace-analysis__card-icon marketplace-analysis__card-icon--inventory">
              <Car size={20} />
            </div>
            <div className="marketplace-analysis__card-content">
              <span className="marketplace-analysis__card-label">Local Inventory</span>
              <span className="marketplace-analysis__card-value">47 Available</span>
              <span className="marketplace-analysis__card-detail">Within 25 miles of you</span>
            </div>
          </div>
          <div className="marketplace-analysis__card">
            <div className="marketplace-analysis__card-icon marketplace-analysis__card-icon--savings">
              <DollarSign size={20} />
            </div>
            <div className="marketplace-analysis__card-content">
              <span className="marketplace-analysis__card-label">Avg. Savings</span>
              <span className="marketplace-analysis__card-value">$2,847</span>
              <span className="marketplace-analysis__card-detail">Below MSRP in your area</span>
            </div>
          </div>
        </div>
        <div className="marketplace-analysis__insight">
          <div className="marketplace-analysis__insight-icon">
            <ArrowDown size={16} />
          </div>
          <p className="marketplace-analysis__insight-text">
            <strong>Best time to buy:</strong> With 67+ day inventory and declining prices, you have strong negotiating power. 
            Dealers are motivated to move K5s—use your {formatPrice(tradeEstimate.mid)} trade-in as leverage.
          </p>
        </div>
      </section>

      {/* eLot Carousel - More Vehicles */}
      <section className="elot-section">
        <div className="elot-section__header">
          <h2 className="elot-section__title">More Vehicles That Match Your Budget</h2>
          <a href="#" className="elot-section__link">
            View All
            <ChevronRight size={16} />
          </a>
        </div>
        <div className="elot-section__carousel">
          {[
            { id: 'e1', year: 2025, make: 'Hyundai', model: 'Sonata', trim: 'SEL', price: 29550, image: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a4c354fc591800081603fc/3-2024-kia-k5-front-view.jpg', mileage: 0, isNew: true },
            { id: 'e2', year: 2024, make: 'Toyota', model: 'Camry', trim: 'SE', price: 27890, image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg', mileage: 15600, isNew: false },
            { id: 'e3', year: 2025, make: 'Honda', model: 'Accord', trim: 'Sport', price: 31078, image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66e8824d603db5000878f458/2025hondaaccordhybridfrontthreequarters.jpg', mileage: 0, isNew: true },
            { id: 'e4', year: 2024, make: 'Mazda', model: 'Mazda6', trim: 'Touring', price: 26500, image: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a4ab44cd06f600080e4953/14-2024-kia-forte-front-view.jpg', mileage: 22100, isNew: false },
            { id: 'e5', year: 2025, make: 'Nissan', model: 'Altima', trim: 'SV', price: 28790, image: 'https://d2kde5ohu8qb21.cloudfront.net/files/690bee134ffec60002725d25/010-2025-kia-ev6.jpg', mileage: 0, isNew: true },
          ].map((car) => (
            <div key={car.id} className="elot-section__card">
              <div className="elot-section__card-image">
                <img src={car.image} alt={`${car.year} ${car.make} ${car.model}`} />
                {car.isNew && <span className="elot-section__badge">New</span>}
              </div>
              <div className="elot-section__card-content">
                <h3 className="elot-section__card-title">{car.year} {car.make} {car.model} {car.trim}</h3>
                <div className="elot-section__card-pricing">
                  <span className="elot-section__card-price">{formatPrice(car.price)}</span>
                  <span className="elot-section__card-after">
                    After trade-in: <strong>{formatPrice(car.price - tradeEstimate.mid)}</strong>
                  </span>
                </div>
                {!car.isNew && <span className="elot-section__card-mileage">{car.mileage.toLocaleString()} mi</span>}
              </div>
            </div>
          ))}
          <div className="elot-section__card elot-section__card--more">
            <div className="elot-section__more-content">
              <span className="elot-section__more-count">142+</span>
              <span className="elot-section__more-text">More vehicles in your budget</span>
              <Button variant="outline" size="small">Browse All</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dealer Map Modal - Shows the NEXT vehicle (K5), not the trade-in */}
      <DealerMapModal
        isOpen={showDealersModal}
        onClose={() => setShowDealersModal(false)}
        vehicle={{
          year: 2025,
          make: 'Kia',
          model: 'K5',
          msrp: inventoryWithTradeIn[0]?.msrp || 28590,
          image: inventoryWithTradeIn[0]?.image || vehicleImage,
        }}
        initialLocation={{ lat: 25.7617, lng: -80.1918 }}
        initialZipCode="Miami, FL"
      />

      {/* Local Dealers Section - with contextual framing */}
      <section className="local-dealers">
        <div className="local-dealers__header">
          <h2 className="local-dealers__title">
            Use Your {formatPrice(tradeEstimate.mid)} Trade-In at These Dealers
          </h2>
          <p className="local-dealers__subtitle">
            Confirm your value in person • No obligation • Most offers honored same day
          </p>
        </div>

        <div className="local-dealers__grid">
          {dealers.slice(0, 3).map((dealer, index) => (
            <div 
              key={index} 
              className={`local-dealer__card ${index === 0 ? 'local-dealer__card--primary' : ''}`}
            >
              {index === 0 && (
                <div className="local-dealer__badge">Your Lead Dealer</div>
              )}
              <div className="local-dealer__info">
                <h3 className="local-dealer__name">{dealer.name}</h3>
                <div className="local-dealer__rating">
                  <Star size={16} fill="currentColor" />
                  <span>{dealer.rating.toFixed(1)}</span>
                  <span className="local-dealer__distance">({dealer.distance} miles away)</span>
                </div>
                <div className="local-dealer__address">
                  <MapPin size={16} />
                  <span>{dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}</span>
                </div>
                <div className="local-dealer__contact">
                  <a href={`tel:${dealer.phone}`} className="local-dealer__contact-link">
                    <Phone size={16} />
                    <span>{dealer.phone}</span>
                  </a>
                  <a href={`mailto:${dealer.email}`} className="local-dealer__contact-link">
                    <Mail size={16} />
                    <span>Email Dealer</span>
                  </a>
                </div>
              </div>
              <div className="local-dealer__actions">
                <Button variant={index === 0 ? "primary" : "outline"} size="medium">
                  Contact Dealer
                </Button>
                <Button variant="outline" size="medium">
                  Get Directions
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Variant-specific content sections */}
      {variant === 'marketplace-focused' && (
        <>
          {/* For Sale Near You - Full Component */}
          {showSimilarVehicles && primaryDealer && (
            <ForSaleNearYou
              vehicleName={`${tradeEstimate.vehicle.make} ${tradeEstimate.vehicle.model}`}
              make={tradeEstimate.vehicle.make}
              model={tradeEstimate.vehicle.model}
              location={`${primaryDealer.city}, ${primaryDealer.state}`}
              title="More Vehicles Near You"
            />
          )}
        </>
      )}

      {variant === 'balanced' && (
        <>
          {/* Your Next Vehicle */}
          {showNextVehicle && (
            <section className="next-vehicle">
              <div className="next-vehicle__header">
                <h2 className="next-vehicle__title">Your Next Vehicle</h2>
                <p className="next-vehicle__subtitle">Based on your trade-in</p>
              </div>
              <div className="next-vehicle__card">
                <div className="next-vehicle__image">
                  <img 
                    src="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg" 
                    alt="2025 Honda Accord"
                  />
                </div>
                <div className="next-vehicle__info">
                  <h3 className="next-vehicle__name">2025 {tradeEstimate.vehicle.make} {tradeEstimate.vehicle.model}</h3>
                  <p className="next-vehicle__price">Starting at $32,825</p>
                  <Button variant="primary" size="medium" iconRight={<ChevronRight size={18} />}>
                    Shop New {tradeEstimate.vehicle.make} {tradeEstimate.vehicle.model}
                  </Button>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {variant === 'content-focused' && (
        <>
          {/* Content-focused variant has no additional vehicle sections */}
        </>
      )}

      {/* FAQs Section */}
      <section className="faqs">
        <h2 className="faqs__title">Frequently Asked Questions</h2>
        <div className="faqs__grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faqs__item">
              <h4 className="faqs__question">{faq.question}</h4>
              <p className="faqs__answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Sign-Up */}
      <section className="newsletter">
        <div className="newsletter__content">
          <h2 className="newsletter__title">Stay Updated on Car Values</h2>
          <p className="newsletter__subtitle">
            Get weekly updates on market trends, pricing insights, and exclusive dealer offers.
          </p>
          <form className="newsletter__form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter__input"
            />
            <Button variant="primary" size="medium">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Car Shopping Secrets Content Recirc - De-emphasized */}
      <section className="content-recirc content-recirc--secondary">
        <div className="content-recirc__header">
          <h2 className="content-recirc__title">Car Shopping Secrets</h2>
          <a href="#" className="content-recirc__link">
            View All Articles
            <ChevronRight size={16} />
          </a>
        </div>
        <div className="content-recirc__grid">
          {[
            { title: '10 Best Used Cars Under $20,000', category: 'Buying Guide', image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg' },
            { title: 'How to Negotiate the Best Trade-In Value', category: 'Tips', image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg' },
            { title: 'What to Know Before Trading In Your Car', category: 'Buying Guide', image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg' },
          ].map((article, index) => (
            <article key={index} className="content-recirc__card">
              <div className="content-recirc__card-image">
                <img src={article.image} alt={article.title} />
                <span className="content-recirc__card-category">{article.category}</span>
              </div>
              <div className="content-recirc__card-content">
                <h3 className="content-recirc__card-title">{article.title}</h3>
                <a href="#" className="content-recirc__card-link">
                  Read More
                  <ChevronRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Bar for Mobile - Keeps trade-in value visible */}
      <div className="trade-estimate__sticky-bar">
        <div className="trade-estimate__sticky-content">
          <div className="trade-estimate__sticky-value">
            <DollarSign size={18} />
            <span className="trade-estimate__sticky-amount">{formatPrice(tradeEstimate.mid)}</span>
            <span className="trade-estimate__sticky-label">Trade-In</span>
          </div>
          <Button variant="success" size="medium" iconRight={<ChevronRight size={18} />}>
            Apply to New Car
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsMyCarWorthResults;
