import { DollarSign } from 'lucide-react';
import WhatsMyCarWorth from '../../components/WhatsMyCarWorth';
import './WhatsMyCarWorthPage.css';

const WhatsMyCarWorthPage = () => {
  const handleGetEstimate = (data: {
    year: string;
    make: string;
    model: string;
    mileage: number;
    condition: string;
  }) => {
    console.log('Trade-in estimate requested:', data);
    // In production, this would send data to an API or analytics
  };

  return (
    <div className="whats-my-car-worth-page">
      <div className="whats-my-car-worth-page__hero">
        <div className="whats-my-car-worth-page__hero-content">
          <div className="whats-my-car-worth-page__hero-badge">
            <DollarSign size={20} />
            <span>Trade-In Value</span>
          </div>
          <h1 className="whats-my-car-worth-page__hero-title">
            What's My Car Worth?
          </h1>
          <p className="whats-my-car-worth-page__hero-subtitle">
            Find out what your vehicle is worth in today's market. Get an instant estimate 
            powered by real-time market data from Black Book—the industry standard for 
            vehicle valuation.
          </p>
          
          <div className="whats-my-car-worth-page__hero-stats">
            <div className="whats-my-car-worth-page__hero-stat">
              <span className="whats-my-car-worth-page__hero-stat-value">50M+</span>
              <span className="whats-my-car-worth-page__hero-stat-label">Valuations</span>
            </div>
            <div className="whats-my-car-worth-page__hero-stat">
              <span className="whats-my-car-worth-page__hero-stat-value">Daily</span>
              <span className="whats-my-car-worth-page__hero-stat-label">Updates</span>
            </div>
            <div className="whats-my-car-worth-page__hero-stat">
              <span className="whats-my-car-worth-page__hero-stat-value">2025</span>
              <span className="whats-my-car-worth-page__hero-stat-label">Model Year</span>
            </div>
          </div>
        </div>
      </div>

      <div className="whats-my-car-worth-page__content">
        <div className="whats-my-car-worth-page__main">
          <WhatsMyCarWorth onGetEstimate={handleGetEstimate} />
        </div>

        <aside className="whats-my-car-worth-page__sidebar">
          <div className="whats-my-car-worth-page__info-card">
            <h3 className="whats-my-car-worth-page__info-title">How It Works</h3>
            <ol className="whats-my-car-worth-page__steps">
              <li className="whats-my-car-worth-page__step">
                <span className="whats-my-car-worth-page__step-number">1</span>
                <div className="whats-my-car-worth-page__step-content">
                  <strong>Enter Your Vehicle</strong>
                  <p>Select your car's year, make, and model or scan your VIN</p>
                </div>
              </li>
              <li className="whats-my-car-worth-page__step">
                <span className="whats-my-car-worth-page__step-number">2</span>
                <div className="whats-my-car-worth-page__step-content">
                  <strong>Add Details</strong>
                  <p>Enter your mileage and select your vehicle's condition</p>
                </div>
              </li>
              <li className="whats-my-car-worth-page__step">
                <span className="whats-my-car-worth-page__step-number">3</span>
                <div className="whats-my-car-worth-page__step-content">
                  <strong>Get Your Value</strong>
                  <p>Receive an instant estimate with low, mid, and high values</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="whats-my-car-worth-page__info-card">
            <h3 className="whats-my-car-worth-page__info-title">Why Use Our Tool?</h3>
            <ul className="whats-my-car-worth-page__benefits">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
                <span>Real-time market data from Black Book</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
                <span>Updated daily with latest pricing</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
                <span>No personal information required</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
                <span>Instant results in seconds</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
                <span>VIN scanning for accurate identification</span>
              </li>
            </ul>
          </div>

          <div className="whats-my-car-worth-page__info-card whats-my-car-worth-page__info-card--highlight">
            <h3 className="whats-my-car-worth-page__info-title">Ready to Sell?</h3>
            <p className="whats-my-car-worth-page__info-text">
              Once you know your car's value, explore trade-in offers from dealers in your area 
              or list it for sale on our marketplace.
            </p>
            <a href="/vehicles" className="whats-my-car-worth-page__cta-link">
              Browse New Cars →
            </a>
          </div>
        </aside>
      </div>

      <section className="whats-my-car-worth-page__faq">
        <h2 className="whats-my-car-worth-page__faq-title">Frequently Asked Questions</h2>
        <div className="whats-my-car-worth-page__faq-grid">
          <div className="whats-my-car-worth-page__faq-item">
            <h4>How accurate is the estimate?</h4>
            <p>
              Our estimates are based on real-time market data from Black Book, the industry 
              standard for vehicle valuation. While actual offers may vary based on local market 
              conditions and vehicle inspection, our estimates provide a reliable baseline.
            </p>
          </div>
          <div className="whats-my-car-worth-page__faq-item">
            <h4>What factors affect my car's value?</h4>
            <p>
              Key factors include mileage, condition, accident history, service records, 
              optional equipment, and current market demand for your specific make and model.
            </p>
          </div>
          <div className="whats-my-car-worth-page__faq-item">
            <h4>Where can I find my VIN?</h4>
            <p>
              Your VIN (Vehicle Identification Number) can be found on your dashboard near 
              the windshield, on the driver's side door jamb, or on your vehicle registration 
              and insurance documents.
            </p>
          </div>
          <div className="whats-my-car-worth-page__faq-item">
            <h4>Is my information secure?</h4>
            <p>
              Yes! We don't require any personal information to provide an estimate. Your 
              vehicle information is only used to calculate the value and is not stored or shared.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatsMyCarWorthPage;

