import { DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsMyCarWorth from '../../components/WhatsMyCarWorth';
import './WhatsMyCarWorthPage.css';

const WhatsMyCarWorthPage = () => {
  const navigate = useNavigate();

  const handleGetEstimate = (data: {
    year: string;
    make: string;
    model: string;
    mileage: number;
    condition: string;
  }) => {
    console.log('Trade-in estimate requested:', data);
    // Navigate to results page with form data as URL params
    const params = new URLSearchParams({
      year: data.year,
      make: data.make,
      model: data.model,
      mileage: data.mileage.toString(),
      condition: data.condition,
    });
    navigate(`/whats-my-car-worth/results?${params.toString()}`);
  };

  return (
    <div className="whats-my-car-worth-page">
      <div className="whats-my-car-worth-page__hero">
        {/* Hexagon Vehicle Graphic with Black Book Logo */}
        <div className="whats-my-car-worth-page__hero-graphic">
          <div className="whats-my-car-worth-page__hero-hexagon">
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg" 
              alt="Honda Accord"
              className="whats-my-car-worth-page__hero-vehicle-img"
            />
            <div className="whats-my-car-worth-page__hero-blackbook-badge">
              <svg 
                viewBox="86 31 124 65" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Black Book"
                className="whats-my-car-worth-page__hero-blackbook-logo"
              >
                <path 
                  d="M159.5,70 C162.234825,70 164,72.2783462 164,74.9997043 C164,77.7222452 162.234825,80 159.5,80 C156.765175,80 155,77.7222452 155,74.9997043 C155,72.2783462 156.765175,70 159.5,70 Z M121,71.5 C121,72.5636085 120.269394,73 118.980818,73 L117,73 L117,70 L118.980818,70 C120.115374,70 121,70.4363915 121,71.5 Z M119.622941,76 C120.975592,76 122,76.5809809 122,77.9996846 C122,79.4190191 120.975592,80 119.622941,80 L117,80 L117,76 L119.622941,76 Z M142,54 L144,49 L146,54 L142,54 Z M112,49.4994884 C112,50.5636085 111.269394,51 109.980818,51 L108,51 L108,48 L109.980818,48 C111.115374,48 112,48.4363915 112,49.4994884 Z M138.5,70 C141.234825,70 143,72.2783462 143,74.9997043 C143,77.7222452 141.234825,80 138.5,80 C135.765175,80 134,77.7222452 134,74.9997043 C134,72.2783462 135.765175,70 138.5,70 Z M184.291206,59.3020233 L187.4771,59.3020233 L181.305202,52.1677264 L186.796298,45.2744729 L183.789717,45.2744729 L178.780121,51.5668816 L178.780121,45.2744729 L176.375562,45.2744729 L176.375562,59.3020233 L178.780121,59.3020233 L178.780121,52.9696367 L184.291206,59.3020233 Z M181.488043,81.7513952 L184.674524,81.7513952 L178.502039,74.6170983 L183.993723,67.7226689 L180.987142,67.7226689 L175.976958,74.0156656 L175.976958,67.7226689 L173.572398,67.7226689 L173.572398,81.7513952 L175.976958,81.7513952 L175.976958,75.4184206 L181.488043,81.7513952 Z M163.837167,59.5424788 C167.384039,59.5424788 169.22773,57.1585007 169.22773,57.1585007 L167.624495,55.5746692 C167.624495,55.5746692 166.302281,57.2984235 163.837167,57.2984235 C161.07163,57.2984235 159.167972,54.9938134 159.167972,52.2882481 C159.167972,49.5826829 161.07163,47.2780727 163.837167,47.2780727 C166.141782,47.2780727 167.404028,48.8213384 167.404028,48.8213384 L169.02784,47.2380948 C169.02784,47.2380948 167.204138,45.0328416 163.837167,45.0328416 C159.788807,45.0328416 156.722847,48.1399499 156.722847,52.2882481 C156.722847,56.4359584 159.788807,59.5424788 163.837167,59.5424788 Z M159.444291,81.9918507 C163.532041,81.9918507 166.538622,78.8853303 166.538622,74.737032 C166.538622,70.5887338 163.532041,67.4822134 159.444291,67.4822134 C155.355952,67.4822134 152.349959,70.5887338 152.349959,74.737032 C152.349959,78.8853303 155.355952,81.9918507 159.444291,81.9918507 Z M148.353335,59.3020233 L150.777883,59.3020233 L145.326765,45.2744729 L142.88164,45.2744729 L137.43111,59.3020233 L139.855658,59.3020233 L141.138482,55.9756243 L147.070511,55.9756243 L148.353335,59.3020233 Z M138.221851,81.9918507 C142.309602,81.9918507 145.316183,78.8853303 145.316183,74.737032 C145.316183,70.5887338 142.309602,67.4822134 138.221851,67.4822134 C134.134101,67.4822134 131.128108,70.5887338 131.128108,74.737032 C131.128108,78.8853303 134.134101,81.9918507 138.221851,81.9918507 Z M122.409964,59.3020233 L130.787119,59.3020233 L131.530827,57.0174022 L124.814523,57.0174022 L124.814523,45.2744729 L122.409964,45.2744729 L122.409964,59.3020233 Z M119.404559,81.7513952 C122.050162,81.7513952 124.094331,80.0676188 124.094331,77.602509 C124.094331,75.0774324 122.110129,74.3560659 121.910239,74.316088 C122.110129,74.2561211 123.372964,73.4342218 123.372964,71.7310444 C123.372964,68.7850237 121.188871,67.7226689 118.903658,67.7226689 L114.354397,67.7226689 L114.354397,81.7513952 L119.404559,81.7513952 Z M105.813215,59.3020233 L110.862789,59.3020233 C113.508392,59.3020233 115.552561,57.6188349 115.552561,55.1531372 C115.552561,52.6286484 113.568359,51.9078699 113.367881,51.867304 C113.568359,51.8073371 114.831193,50.9854379 114.831193,49.2816726 C114.831193,46.3362397 112.646513,45.2744729 110.361888,45.2744729 L105.813215,45.2744729 L105.813215,59.3020233 Z M193.978816,31 L210,96 L102.020596,96 L86,31 L193.978816,31 Z M110.622941,53 C111.975592,53 113,53.5804416 113,54.9993691 C113,56.4195584 111.975592,57 110.622941,57 L108,57 L108,53 L110.622941,53 Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
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
              <span className="whats-my-car-worth-page__hero-stat-value">Free</span>
              <span className="whats-my-car-worth-page__hero-stat-label">Instant Estimate</span>
            </div>
            <div className="whats-my-car-worth-page__hero-stat">
              <span className="whats-my-car-worth-page__hero-stat-value">30 Sec</span>
              <span className="whats-my-car-worth-page__hero-stat-label">To Get Your Value</span>
            </div>
            <div className="whats-my-car-worth-page__hero-stat">
              <span className="whats-my-car-worth-page__hero-stat-value">Black Book®</span>
              <span className="whats-my-car-worth-page__hero-stat-label">Powered By</span>
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

