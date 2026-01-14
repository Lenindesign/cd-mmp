import { useState, useMemo } from 'react';
import { ChevronRight, MapPin, Phone, Mail, Star, Bookmark } from 'lucide-react';
import { Button } from '../Button';
import ForSaleNearYou from '../ForSaleNearYou';
import { vehicleDatabase } from '../../data/vehicles';
import './WhatsMyCarWorthResults.css';

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
              <div className="trade-estimate__primary-amount">{formatPrice(tradeEstimate.mid)}</div>
              <div className="trade-estimate__primary-badge">Most Likely</div>
              <div className="trade-estimate__primary-range">
                Range: {formatPrice(tradeEstimate.low)} - {formatPrice(tradeEstimate.high)}
              </div>
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

            {/* Primary CTA - Most Important Action */}
            <div className="trade-estimate__actions">
              <Button variant="success" size="large" iconRight={<ChevronRight size={20} />}>
                Get Trade-In Offer
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

      {/* Local Dealers Section */}
      <section className="local-dealers">
        <div className="local-dealers__header">
          <h2 className="local-dealers__title">Local Dealers Near You</h2>
          <p className="local-dealers__subtitle">
            {primaryDealer && `Top dealer: ${primaryDealer.name} (purchased your lead)`}
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

      {/* Car Shopping Secrets Content Recirc */}
      <section className="content-recirc">
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
    </div>
  );
};

export default WhatsMyCarWorthResults;
