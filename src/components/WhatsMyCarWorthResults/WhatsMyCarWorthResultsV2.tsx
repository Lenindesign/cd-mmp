import { useState, useMemo, useRef } from 'react';
import { ChevronRight, ChevronLeft, ChevronDown, MapPin, Bookmark, Heart } from 'lucide-react';
import { Button } from '../Button';
import { DealerMapModal } from '../DealerLocatorMap';
import { vehicleDatabase } from '../../data/vehicles';
import './WhatsMyCarWorthResultsV2.css';

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

interface WhatsMyCarWorthResultsV2Props {
  tradeEstimate: TradeEstimate;
  onStartOver?: () => void;
}

// Mock data for articles
const carShoppingArticles = [
  {
    id: '1',
    title: 'Trade in Your Car with a Loan for Cheaper Car',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-honda-accord-hybrid-touring-102-64d5dbf8c3b06.jpg',
    category: 'Trade-In Tips',
  },
  {
    id: '2',
    title: 'Trading in a Car with a Loan',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-toyota-camry-xse-fwd-101-6553f4c3b4e4a.jpg',
    category: 'Finance',
  },
  {
    id: '3',
    title: 'How to Trade in Your Car for the Best Deal',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-hyundai-sonata-sel-101-64d5dbf8c3b06.jpg',
    category: 'Buying Guide',
  },
  {
    id: '4',
    title: 'How to Get the Best Price for Trading in Your Car',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-kia-k5-gt-line-101-6553f4c3b4e4a.jpg',
    category: 'Negotiation',
  },
  {
    id: '5',
    title: "Here's Exactly How Trading in a Car Works",
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-nissan-altima-sr-101-64d5dbf8c3b06.jpg',
    category: 'Guide',
  },
  {
    id: '6',
    title: 'What to Do Next Once Your Car Lease is Over',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-mazda-mazda6-101-6553f4c3b4e4a.jpg',
    category: 'Leasing',
  },
  {
    id: '7',
    title: 'Best Websites for Selling Your Car',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-subaru-legacy-101-64d5dbf8c3b06.jpg',
    category: 'Selling',
  },
  {
    id: '8',
    title: '7 Things Not to Do at a Car Dealership',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-volkswagen-passat-101-6553f4c3b4e4a.jpg',
    category: 'Tips',
  },
  {
    id: '9',
    title: 'Car-Buying Negotiating Guide',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-chevrolet-malibu-101-64d5dbf8c3b06.jpg',
    category: 'Negotiation',
  },
  {
    id: '10',
    title: '5 Things to Do Before You Go to the Dealership',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-chrysler-300-101-6553f4c3b4e4a.jpg',
    category: 'Preparation',
  },
  {
    id: '11',
    title: 'How to Get the Most for Your Used Car',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-dodge-charger-101-64d5dbf8c3b06.jpg',
    category: 'Selling',
  },
  {
    id: '12',
    title: 'How Does Carvana Work?',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-ford-mustang-101-6553f4c3b4e4a.jpg',
    category: 'Online Buying',
  },
];

const faqs = [
  {
    question: 'How is my vehicle value calculated?',
    answer: 'Our vehicle values are calculated using Black Book data, which analyzes millions of wholesale and retail transactions to provide accurate market-based valuations.',
  },
  {
    question: 'How accurate are Car and Driver vehicle values?',
    answer: 'Our values are highly accurate as they are powered by Black Book, the industry standard for vehicle valuations used by dealers, banks, and insurance companies.',
  },
  {
    question: "Can I trade in my car if it isn't paid off?",
    answer: "Yes, you can trade in a car with an outstanding loan. The dealer will pay off your loan balance, and any remaining equity can be applied to your new vehicle purchase.",
  },
  {
    question: 'Is it better to trade in your car or sell it yourself?',
    answer: 'Trading in is more convenient and can offer tax benefits, while selling privately typically yields a higher price but requires more time and effort.',
  },
  {
    question: "Does my location affect my car's value?",
    answer: "Yes, vehicle values vary by region based on local demand, climate conditions, and market factors. Our estimates account for your specific location.",
  },
  {
    question: 'I have a classic car. Can I get its value here?',
    answer: 'Our tool is optimized for vehicles from the past 20 years. For classic or collector cars, we recommend consulting specialty valuation services.',
  },
  {
    question: 'How quickly does a car depreciate in value?',
    answer: 'New cars typically depreciate 20-30% in the first year and about 15% annually thereafter. After 5 years, most vehicles have lost about 60% of their original value.',
  },
];

const WhatsMyCarWorthResultsV2 = ({
  tradeEstimate,
  onStartOver: _onStartOver,
}: WhatsMyCarWorthResultsV2Props) => {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [savedListings, setSavedListings] = useState<Set<string>>(new Set());
  const [showDealersModal, setShowDealersModal] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const _similarCarouselRef = useRef<HTMLDivElement>(null);

  // Find vehicle image from database
  const vehicleImage = useMemo(() => {
    const vehicle = vehicleDatabase.find(
      (v) =>
        String(v.year) === String(tradeEstimate.vehicle.year) &&
        v.make.toLowerCase() === tradeEstimate.vehicle.make.toLowerCase() &&
        v.model.toLowerCase() === tradeEstimate.vehicle.model.toLowerCase()
    );
    return vehicle?.image || 'https://hips.hearstapps.com/hmg-prod/images/2022-honda-pilot-trailsport-102-1655918874.jpg';
  }, [tradeEstimate.vehicle]);

  // Generate value table data
  const valueTable = useMemo(() => {
    const baseValue = tradeEstimate.mid;
    return {
      condition: [
        { label: 'CLEAN', tradeIn: Math.round(baseValue * 1.05), privateParty: Math.round(baseValue * 1.15) },
        { label: 'AVERAGE', tradeIn: Math.round(baseValue * 0.95), privateParty: Math.round(baseValue * 1.05) },
        { label: 'ROUGH', tradeIn: Math.round(baseValue * 0.85), privateParty: Math.round(baseValue * 0.95) },
      ],
    };
  }, [tradeEstimate.mid]);

  // Get next vehicle options (newer years of same model)
  const nextVehicleYears = [2026, 2025, 2024, 2023, 2022, 2021];

  // Get similar vehicles for carousel
  const forSaleListings = useMemo(() => {
    return vehicleDatabase
      .filter(v => v.make === tradeEstimate.vehicle.make || v.bodyStyle === 'Sedan')
      .slice(0, 8)
      .map((v, i) => ({
        id: `listing-${i}`,
        year: v.year,
        make: v.make,
        model: v.model,
        trim: v.trim || 'Base',
        price: v.priceMin + Math.floor(Math.random() * 5000),
        mileage: Math.floor(Math.random() * 50000) + 10000,
        image: v.image,
        dealer: `${v.make} of Miami`,
        distance: (Math.random() * 20 + 2).toFixed(1),
      }));
  }, [tradeEstimate.vehicle.make]);

  // Get similar vehicles with ratings
  const similarVehicles = useMemo(() => {
    return vehicleDatabase
      .filter(v => v.bodyStyle === 'Sedan' && Number(v.year) >= 2020)
      .slice(0, 3)
      .map((v, i) => ({
        id: `similar-${i}`,
        year: v.year,
        make: v.make,
        model: v.model,
        rating: (8 + Math.random() * 2).toFixed(1),
        ratingLabel: i === 0 ? '10 Best' : undefined,
        price: v.priceMin,
        image: v.image,
        mpg: `${24 + i * 2}-${32 + i * 2}`,
        editorNote: `The ${v.year} ${v.make} ${v.model} offers excellent value with refined handling and a comfortable interior.`,
      }));
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const toggleFavorite = (id: string) => {
    setSavedListings(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="wmcw-v2">
      {/* Hero Section */}
      <section className="wmcw-v2__hero">
        <div className="wmcw-v2__hero-content">
          <div className="wmcw-v2__hero-badge">
            <span>POWERED BY</span>
            <svg 
              viewBox="86 31 124 65" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Black Book"
              className="wmcw-v2__black-book-logo"
            >
              <path 
                d="M159.5,70 C162.234825,70 164,72.2783462 164,74.9997043 C164,77.7222452 162.234825,80 159.5,80 C156.765175,80 155,77.7222452 155,74.9997043 C155,72.2783462 156.765175,70 159.5,70 Z M121,71.5 C121,72.5636085 120.269394,73 118.980818,73 L117,73 L117,70 L118.980818,70 C120.115374,70 121,70.4363915 121,71.5 Z M119.622941,76 C120.975592,76 122,76.5809809 122,77.9996846 C122,79.4190191 120.975592,80 119.622941,80 L117,80 L117,76 L119.622941,76 Z M142,54 L144,49 L146,54 L142,54 Z M112,49.4994884 C112,50.5636085 111.269394,51 109.980818,51 L108,51 L108,48 L109.980818,48 C111.115374,48 112,48.4363915 112,49.4994884 Z M138.5,70 C141.234825,70 143,72.2783462 143,74.9997043 C143,77.7222452 141.234825,80 138.5,80 C135.765175,80 134,77.7222452 134,74.9997043 C134,72.2783462 135.765175,70 138.5,70 Z M184.291206,59.3020233 L187.4771,59.3020233 L181.305202,52.1677264 L186.796298,45.2744729 L183.789717,45.2744729 L178.780121,51.5668816 L178.780121,45.2744729 L176.375562,45.2744729 L176.375562,59.3020233 L178.780121,59.3020233 L178.780121,52.9696367 L184.291206,59.3020233 Z M181.488043,81.7513952 L184.674524,81.7513952 L178.502039,74.6170983 L183.993723,67.7226689 L180.987142,67.7226689 L175.976958,74.0156656 L175.976958,67.7226689 L173.572398,67.7226689 L173.572398,81.7513952 L175.976958,81.7513952 L175.976958,75.4184206 L181.488043,81.7513952 Z M163.837167,59.5424788 C167.384039,59.5424788 169.22773,57.1585007 169.22773,57.1585007 L167.624495,55.5746692 C167.624495,55.5746692 166.302281,57.2984235 163.837167,57.2984235 C161.07163,57.2984235 159.167972,54.9938134 159.167972,52.2882481 C159.167972,49.5826829 161.07163,47.2780727 163.837167,47.2780727 C166.141782,47.2780727 167.404028,48.8213384 167.404028,48.8213384 L169.02784,47.2380948 C169.02784,47.2380948 167.204138,45.0328416 163.837167,45.0328416 C159.788807,45.0328416 156.722847,48.1399499 156.722847,52.2882481 C156.722847,56.4359584 159.788807,59.5424788 163.837167,59.5424788 Z M159.444291,81.9918507 C163.532041,81.9918507 166.538622,78.8853303 166.538622,74.737032 C166.538622,70.5887338 163.532041,67.4822134 159.444291,67.4822134 C155.355952,67.4822134 152.349959,70.5887338 152.349959,74.737032 C152.349959,78.8853303 155.355952,81.9918507 159.444291,81.9918507 Z M148.353335,59.3020233 L150.777883,59.3020233 L145.326765,45.2744729 L142.88164,45.2744729 L137.43111,59.3020233 L139.855658,59.3020233 L141.138482,55.9756243 L147.070511,55.9756243 L148.353335,59.3020233 Z M138.221851,81.9918507 C142.309602,81.9918507 145.316183,78.8853303 145.316183,74.737032 C145.316183,70.5887338 142.309602,67.4822134 138.221851,67.4822134 C134.134101,67.4822134 131.128108,70.5887338 131.128108,74.737032 C131.128108,78.8853303 134.134101,81.9918507 138.221851,81.9918507 Z M122.409964,59.3020233 L130.787119,59.3020233 L131.530827,57.0174022 L124.814523,57.0174022 L124.814523,45.2744729 L122.409964,45.2744729 L122.409964,59.3020233 Z M119.404559,81.7513952 C122.050162,81.7513952 124.094331,80.0676188 124.094331,77.602509 C124.094331,75.0774324 122.110129,74.3560659 121.910239,74.316088 C122.110129,74.2561211 123.372964,73.4342218 123.372964,71.7310444 C123.372964,68.7850237 121.188871,67.7226689 118.903658,67.7226689 L114.354397,67.7226689 L114.354397,81.7513952 L119.404559,81.7513952 Z M105.813215,59.3020233 L110.862789,59.3020233 C113.508392,59.3020233 115.552561,57.6188349 115.552561,55.1531372 C115.552561,52.6286484 113.568359,51.9078699 113.367881,51.867304 C113.568359,51.8073371 114.831193,50.9854379 114.831193,49.2816726 C114.831193,46.3362397 112.646513,45.2744729 110.361888,45.2744729 L105.813215,45.2744729 L105.813215,59.3020233 Z M193.978816,31 L210,96 L102.020596,96 L86,31 L193.978816,31 Z M110.622941,53 C111.975592,53 113,53.5804416 113,54.9993691 C113,56.4195584 111.975592,57 110.622941,57 L108,57 L108,53 L110.622941,53 Z" 
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="wmcw-v2__title">What's My Car Worth?</h1>
          <p className="wmcw-v2__subtitle">
            Find your vehicle's market value, an estimate of what you should expect to get if you're
            trading it in to a dealer or selling it privately. Its value is calculated based on the information
            you provided and based on the sales trade-in and sales data dealers with similar appraising
            websites.
          </p>
        </div>
      </section>

      {/* Vehicle Value Section */}
      <section className="wmcw-v2__value-section">
        <div className="wmcw-v2__value-header">
          <span className="wmcw-v2__value-label">YOUR VEHICLE'S RESALE VALUE</span>
          <span className="wmcw-v2__powered-by">
            POWERED BY <strong>BLACK BOOK</strong>
          </span>
        </div>

        <div className="wmcw-v2__vehicle-info">
          <h2 className="wmcw-v2__vehicle-name">
            {tradeEstimate.vehicle.year} {tradeEstimate.vehicle.make} {tradeEstimate.vehicle.model}
          </h2>
          <p className="wmcw-v2__vehicle-details">
            {tradeEstimate.vehicle.mileage.toLocaleString()} miles<br />
            <span className="wmcw-v2__vehicle-options">No options selected</span>
          </p>
        </div>

        {/* Value Table */}
        <div className="wmcw-v2__value-table">
          <div className="wmcw-v2__table-header">
            <div className="wmcw-v2__table-col">CONDITION</div>
            <div className="wmcw-v2__table-col">TRADE-IN</div>
            <div className="wmcw-v2__table-col">PRIVATE PARTY SALE</div>
          </div>
          {valueTable.condition.map((row, index) => (
            <div key={index} className="wmcw-v2__table-row">
              <div className="wmcw-v2__table-col wmcw-v2__table-col--condition">
                {row.label}
              </div>
              <div className="wmcw-v2__table-col wmcw-v2__table-col--value">
                {formatPrice(row.tradeIn)}
              </div>
              <div className="wmcw-v2__table-col wmcw-v2__table-col--value">
                {formatPrice(row.privateParty)}
              </div>
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          size="medium" 
          className="wmcw-v2__local-dealers-btn"
          onClick={() => setShowDealersModal(true)}
        >
          Find Your Local Dealers
        </Button>

        <div className="wmcw-v2__sorry-box">
          <strong>We're Sorry...</strong>
          <p>
            We couldn't find any participating dealers near your location that have
            vehicles to offer for your trade-in.
          </p>
        </div>
      </section>

      {/* Your Next Vehicle Section */}
      <section className="wmcw-v2__next-vehicle">
        <div className="wmcw-v2__section-header wmcw-v2__section-header--dark">
          <h2 className="wmcw-v2__section-title wmcw-v2__section-title--white">YOUR NEXT VEHICLE</h2>
        </div>

        <div className="wmcw-v2__next-vehicle-content">
          <div className="wmcw-v2__next-vehicle-main">
            <h3 className="wmcw-v2__next-vehicle-name">
              {selectedYear} Kia K5
            </h3>
            <p className="wmcw-v2__next-vehicle-price">Starting at $28,585</p>

            {/* Year Tabs */}
            <div className="wmcw-v2__year-tabs">
              {nextVehicleYears.map(year => (
                <button
                  key={year}
                  className={`wmcw-v2__year-tab ${selectedYear === year ? 'wmcw-v2__year-tab--active' : ''}`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Vehicle Highlights */}
            <div className="wmcw-v2__highlights">
              <div className="wmcw-v2__highlight">
                <span className="wmcw-v2__highlight-label">Highs</span>
                <p>Striking looks, 290-hp GT model is a riot to drive, plenty of standard equipment.</p>
              </div>
              <div className="wmcw-v2__highlight">
                <span className="wmcw-v2__highlight-label">Lows</span>
                <p>Rear-seat room is tighter than rivals, GT's ride is a bit stiff for some tastes, infotainment can be distracting.</p>
              </div>
              <div className="wmcw-v2__highlight">
                <span className="wmcw-v2__highlight-label">Verdict</span>
                <p>The K5 stands out from mid-size family sedans while delivering good value.</p>
              </div>
            </div>

            <div className="wmcw-v2__next-vehicle-actions">
              <Button variant="primary" size="medium">LEARN MORE</Button>
              <Button variant="outline" size="medium">SHOP NOW</Button>
            </div>
          </div>

          <div className="wmcw-v2__next-vehicle-image">
            <img 
              src="https://hips.hearstapps.com/hmg-prod/images/2025-kia-k5-gt-line-101-6553f4c3b4e4a.jpg" 
              alt={`${selectedYear} Kia K5`}
            />
            <button className="wmcw-v2__save-btn">
              <Bookmark size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* For Sale Near You Section */}
      <section className="wmcw-v2__for-sale">
        <div className="wmcw-v2__section-header">
          <div>
            <h2 className="wmcw-v2__section-title">For Sale Near You</h2>
            <p className="wmcw-v2__section-subtitle">
              <MapPin size={14} /> 
              New {tradeEstimate.vehicle.make} {tradeEstimate.vehicle.model} for sale near <strong>33101</strong>
            </p>
          </div>
          <a href="#" className="wmcw-v2__view-all">
            View All <ChevronRight size={16} />
          </a>
        </div>

        <div className="wmcw-v2__carousel-wrapper">
          <button 
            className="wmcw-v2__carousel-nav wmcw-v2__carousel-nav--left"
            onClick={() => scroll(carouselRef, 'left')}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="wmcw-v2__carousel" ref={carouselRef}>
            {forSaleListings.map((listing) => (
              <div key={listing.id} className="wmcw-v2__listing-card">
                <div className="wmcw-v2__listing-image">
                  <img src={listing.image} alt={`${listing.year} ${listing.make} ${listing.model}`} />
                  <button 
                    className={`wmcw-v2__listing-favorite ${savedListings.has(listing.id) ? 'wmcw-v2__listing-favorite--active' : ''}`}
                    onClick={() => toggleFavorite(listing.id)}
                  >
                    <Heart size={18} fill={savedListings.has(listing.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="wmcw-v2__listing-info">
                  <h4 className="wmcw-v2__listing-title">
                    {listing.year} {listing.make} {listing.model}
                  </h4>
                  <p className="wmcw-v2__listing-trim">{listing.trim}</p>
                  <p className="wmcw-v2__listing-price">{formatPrice(listing.price)}</p>
                  <p className="wmcw-v2__listing-mileage">{listing.mileage.toLocaleString()} mi</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="wmcw-v2__carousel-nav wmcw-v2__carousel-nav--right"
            onClick={() => scroll(carouselRef, 'right')}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Similar Vehicles Section */}
      <section className="wmcw-v2__similar">
        <div className="wmcw-v2__section-header">
          <h2 className="wmcw-v2__section-title">Similar Vehicles</h2>
        </div>

        <div className="wmcw-v2__similar-grid">
          {similarVehicles.map((vehicle) => (
            <div key={vehicle.id} className="wmcw-v2__similar-card">
              <div className="wmcw-v2__similar-image">
                <img src={vehicle.image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
                {vehicle.ratingLabel && (
                  <span className="wmcw-v2__similar-badge">{vehicle.ratingLabel}</span>
                )}
              </div>
              <div className="wmcw-v2__similar-content">
                <div className="wmcw-v2__similar-header">
                  <h4 className="wmcw-v2__similar-name">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h4>
                  <div className="wmcw-v2__similar-rating">
                    <span className="wmcw-v2__rating-score">{vehicle.rating}</span>
                    <span className="wmcw-v2__rating-label">/10</span>
                  </div>
                </div>
                <div className="wmcw-v2__similar-details">
                  <div className="wmcw-v2__similar-detail">
                    <span className="wmcw-v2__detail-label">Starting at</span>
                    <span className="wmcw-v2__detail-value">{formatPrice(vehicle.price)}</span>
                  </div>
                  <div className="wmcw-v2__similar-detail">
                    <span className="wmcw-v2__detail-label">MPG</span>
                    <span className="wmcw-v2__detail-value">{vehicle.mpg}</span>
                  </div>
                </div>
                <p className="wmcw-v2__similar-note">
                  <strong>C/D NOTE:</strong> {vehicle.editorNote}
                </p>
                <a href="#" className="wmcw-v2__similar-link">
                  VIEW ALL MODEL YEARS <ChevronRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="wmcw-v2__faqs">
        <h2 className="wmcw-v2__section-title">FAQs</h2>
        <div className="wmcw-v2__faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`wmcw-v2__faq-item ${expandedFaq === index ? 'wmcw-v2__faq-item--expanded' : ''}`}
            >
              <button 
                className="wmcw-v2__faq-question"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <span>{faq.question}</span>
                <ChevronDown size={20} className="wmcw-v2__faq-icon" />
              </button>
              {expandedFaq === index && (
                <div className="wmcw-v2__faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Thinking of Selling Section */}
      <section className="wmcw-v2__selling">
        <div className="wmcw-v2__selling-content">
          <h2 className="wmcw-v2__selling-title">Thinking of selling your car?</h2>
          <p className="wmcw-v2__selling-subtitle">Get the latest in all things auto financing.</p>
          <form className="wmcw-v2__selling-form">
            <input 
              type="email" 
              placeholder="Ex. What's your email address?"
              className="wmcw-v2__selling-input"
            />
            <Button variant="outline" size="medium" className="wmcw-v2__selling-btn">
              LET'S GO
            </Button>
          </form>
          <p className="wmcw-v2__selling-disclaimer">
            By clicking "LET'S GO" you agree to the <a href="#">Terms of Use</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookie Policy</a>. 
            You also agree to receive promotional emails from Car and Driver. You may unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Car Shopping Secrets Section */}
      <section className="wmcw-v2__articles">
        <h2 className="wmcw-v2__articles-title">CAR-SHOPPING SECRETS</h2>
        <div className="wmcw-v2__articles-grid">
          {carShoppingArticles.map((article) => (
            <a key={article.id} href="#" className="wmcw-v2__article-card">
              <div className="wmcw-v2__article-image">
                <img src={article.image} alt={article.title} />
              </div>
              <h4 className="wmcw-v2__article-title">{article.title}</h4>
            </a>
          ))}
        </div>
      </section>

      {/* Dealers Modal - Using existing DealerMapModal component */}
      <DealerMapModal
        isOpen={showDealersModal}
        onClose={() => setShowDealersModal(false)}
        vehicle={{
          year: tradeEstimate.vehicle.year,
          make: tradeEstimate.vehicle.make,
          model: tradeEstimate.vehicle.model,
          msrp: tradeEstimate.mid,
          image: vehicleImage,
        }}
        initialLocation={{ lat: 25.7617, lng: -80.1918 }}
        initialZipCode="Miami, FL"
      />
    </div>
  );
};

export default WhatsMyCarWorthResultsV2;
