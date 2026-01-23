import { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronRight, MapPin, Phone, Mail, Star, Bookmark, Check, Car, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { Button } from '../Button';
import ForSaleNearYou from '../ForSaleNearYou';
import { DealerMapModal } from '../DealerLocatorMap';
import { vehicleDatabase } from '../../data/vehicles';
import './WhatsMyCarWorthResults.css';

// Black Book logo component - using official logo from Black Book
const BlackBookLogo = () => (
  <div className="black-book-logo">
    <img 
      src="https://app.blackbookinformation.com/app/assets/img/cdtt-bb-logo.png" 
      alt="Powered by Black Book" 
      className="black-book-logo__image"
    />
  </div>
);

// Filled help icon (circle with question mark)
const HelpIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <text 
      x="12" 
      y="17" 
      textAnchor="middle" 
      fill="white" 
      fontSize="14" 
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      ?
    </text>
  </svg>
);

// Custom map pin icon
const CustomMapPinIcon = ({ size = 14 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 9 13" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      d="M4.03125 11.7656C0.609375 6.84375 0 6.32812 0 4.5C0 2.01562 1.99219 0 4.5 0C6.98438 0 9 2.01562 9 4.5C9 6.32812 8.36719 6.84375 4.94531 11.7656C4.73438 12.0938 4.24219 12.0938 4.03125 11.7656ZM4.5 6.375C5.53125 6.375 6.375 5.55469 6.375 4.5C6.375 3.46875 5.53125 2.625 4.5 2.625C3.44531 2.625 2.625 3.46875 2.625 4.5C2.625 5.55469 3.44531 6.375 4.5 6.375Z" 
      fill="#1B5F8A"
    />
  </svg>
);

// Custom phone icon
const CustomPhoneIcon = ({ size = 14 }: { size?: number }) => (
  <svg 
    width={Math.round(size * 9 / 14)} 
    height={size} 
    viewBox="0 0 9 14" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      d="M0 1.75C0 0.792969 0.765625 0 1.75 0H7C7.95703 0 8.75 0.792969 8.75 1.75V12.25C8.75 13.2344 7.95703 14 7 14H1.75C0.765625 14 0 13.2344 0 12.25V1.75ZM1.75 6.34375C1.75 6.72656 2.02344 7 2.40625 7H6.34375C6.69922 7 7 6.72656 7 6.34375V4.15625C7 3.80078 6.69922 3.5 6.34375 3.5H2.40625C2.02344 3.5 1.75 3.80078 1.75 4.15625V6.34375ZM2.1875 9.625C2.54297 9.625 2.84375 9.35156 2.84375 8.96875C2.84375 8.61328 2.54297 8.3125 2.1875 8.3125C1.80469 8.3125 1.53125 8.61328 1.53125 8.96875C1.53125 9.35156 1.80469 9.625 2.1875 9.625ZM2.1875 10.5C1.80469 10.5 1.53125 10.8008 1.53125 11.1562C1.53125 11.5391 1.80469 11.8125 2.1875 11.8125C2.54297 11.8125 2.84375 11.5391 2.84375 11.1562C2.84375 10.8008 2.54297 10.5 2.1875 10.5ZM4.375 9.625C4.73047 9.625 5.03125 9.35156 5.03125 8.96875C5.03125 8.61328 4.73047 8.3125 4.375 8.3125C3.99219 8.3125 3.71875 8.61328 3.71875 8.96875C3.71875 9.35156 3.99219 9.625 4.375 9.625ZM4.375 10.5C3.99219 10.5 3.71875 10.8008 3.71875 11.1562C3.71875 11.5391 3.99219 11.8125 4.375 11.8125C4.73047 11.8125 5.03125 11.5391 5.03125 11.1562C5.03125 10.8008 4.73047 10.5 4.375 10.5ZM6.5625 9.625C6.91797 9.625 7.21875 9.35156 7.21875 8.96875C7.21875 8.61328 6.91797 8.3125 6.5625 8.3125C6.17969 8.3125 5.90625 8.61328 5.90625 8.96875C5.90625 9.35156 6.17969 9.625 6.5625 9.625ZM6.5625 10.5C6.17969 10.5 5.90625 10.8008 5.90625 11.1562C5.90625 11.5391 6.17969 11.8125 6.5625 11.8125C6.91797 11.8125 7.21875 11.5391 7.21875 11.1562C7.21875 10.8008 6.91797 10.5 6.5625 10.5ZM3.5 1.3125C3.25391 1.3125 3.0625 1.53125 3.0625 1.75C3.0625 1.99609 3.25391 2.1875 3.5 2.1875H5.25C5.46875 2.1875 5.6875 1.99609 5.6875 1.75C5.6875 1.53125 5.46875 1.3125 5.25 1.3125H3.5Z" 
      fill="#1B5F8A"
    />
  </svg>
);

// Custom seal check icon (for Expert Tip)
const SealCheckIcon = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path 
      d="M21.1744 9.63937C20.8209 9.27 20.4553 8.88937 20.3175 8.55469C20.19 8.24813 20.1825 7.74 20.175 7.24781C20.1609 6.33281 20.1459 5.29594 19.425 4.575C18.7041 3.85406 17.6672 3.83906 16.7522 3.825C16.26 3.8175 15.7519 3.81 15.4453 3.6825C15.1116 3.54469 14.73 3.17906 14.3606 2.82562C13.7137 2.20406 12.9787 1.5 12 1.5C11.0213 1.5 10.2872 2.20406 9.63937 2.82562C9.27 3.17906 8.88937 3.54469 8.55469 3.6825C8.25 3.81 7.74 3.8175 7.24781 3.825C6.33281 3.83906 5.29594 3.85406 4.575 4.575C3.85406 5.29594 3.84375 6.33281 3.825 7.24781C3.8175 7.74 3.81 8.24813 3.6825 8.55469C3.54469 8.88844 3.17906 9.27 2.82562 9.63937C2.20406 10.2862 1.5 11.0213 1.5 12C1.5 12.9787 2.20406 13.7128 2.82562 14.3606C3.17906 14.73 3.54469 15.1106 3.6825 15.4453C3.81 15.7519 3.8175 16.26 3.825 16.7522C3.83906 17.6672 3.85406 18.7041 4.575 19.425C5.29594 20.1459 6.33281 20.1609 7.24781 20.175C7.74 20.1825 8.24813 20.19 8.55469 20.3175C8.88844 20.4553 9.27 20.8209 9.63937 21.1744C10.2862 21.7959 11.0213 22.5 12 22.5C12.9787 22.5 13.7128 21.7959 14.3606 21.1744C14.73 20.8209 15.1106 20.4553 15.4453 20.3175C15.7519 20.19 16.26 20.1825 16.7522 20.175C17.6672 20.1609 18.7041 20.1459 19.425 19.425C20.1459 18.7041 20.1609 17.6672 20.175 16.7522C20.1825 16.26 20.19 15.7519 20.3175 15.4453C20.4553 15.1116 20.8209 14.73 21.1744 14.3606C21.7959 13.7137 22.5 12.9787 22.5 12C22.5 11.0213 21.7959 10.2872 21.1744 9.63937ZM20.0916 13.3228C19.6425 13.7916 19.1775 14.2763 18.9309 14.8716C18.6947 15.4434 18.6844 16.0969 18.675 16.7297C18.6656 17.3859 18.6553 18.0731 18.3638 18.3638C18.0722 18.6544 17.3897 18.6656 16.7297 18.675C16.0969 18.6844 15.4434 18.6947 14.8716 18.9309C14.2763 19.1775 13.7916 19.6425 13.3228 20.0916C12.8541 20.5406 12.375 21 12 21C11.625 21 11.1422 20.5387 10.6772 20.0916C10.2122 19.6444 9.72375 19.1775 9.12844 18.9309C8.55656 18.6947 7.90313 18.6844 7.27031 18.675C6.61406 18.6656 5.92687 18.6553 5.63625 18.3638C5.34562 18.0722 5.33437 17.3897 5.325 16.7297C5.31562 16.0969 5.30531 15.4434 5.06906 14.8716C4.8225 14.2763 4.3575 13.7916 3.90844 13.3228C3.45937 12.8541 3 12.375 3 12C3 11.625 3.46125 11.1422 3.90844 10.6772C4.35562 10.2122 4.8225 9.72375 5.06906 9.12844C5.30531 8.55656 5.31562 7.90313 5.325 7.27031C5.33437 6.61406 5.34469 5.92687 5.63625 5.63625C5.92781 5.34562 6.61031 5.33437 7.27031 5.325C7.90313 5.31562 8.55656 5.30531 9.12844 5.06906C9.72375 4.8225 10.2084 4.3575 10.6772 3.90844C11.1459 3.45937 11.625 3 12 3C12.375 3 12.8578 3.46125 13.3228 3.90844C13.7878 4.35562 14.2763 4.8225 14.8716 5.06906C15.4434 5.30531 16.0969 5.31562 16.7297 5.325C17.3859 5.33437 18.0731 5.34469 18.3638 5.63625C18.6544 5.92781 18.6656 6.61031 18.675 7.27031C18.6844 7.90313 18.6947 8.55656 18.9309 9.12844C19.1775 9.72375 19.6425 10.2084 20.0916 10.6772C20.5406 11.1459 21 11.625 21 12C21 12.375 20.5387 12.8578 20.0916 13.3228ZM16.2806 9.21937C16.3504 9.28903 16.4057 9.37175 16.4434 9.46279C16.4812 9.55384 16.5006 9.65144 16.5006 9.75C16.5006 9.84856 16.4812 9.94616 16.4434 10.0372C16.4057 10.1283 16.3504 10.211 16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1217 15.6557 10.039 15.6004 9.96937 15.5306L7.71937 13.2806C7.57864 13.1399 7.49958 12.949 7.49958 12.75C7.49958 12.551 7.57864 12.3601 7.71937 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44902 11.9996 8.63989 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.289 9.14964 15.3717 9.09432 15.4628 9.05658C15.5538 9.01884 15.6514 8.99941 15.75 8.99941C15.8486 8.99941 15.9462 9.01884 16.0372 9.05658C16.1283 9.09432 16.211 9.14964 16.2806 9.21937Z" 
      fill="#26870D"
    />
  </svg>
);

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

  // Calculate condition-based values (Clean, Average, Rough)
  const conditionValues = useMemo(() => {
    const baseValue = tradeEstimate.mid;
    return {
      clean: {
        tradeIn: Math.round(baseValue * 1.1),
        privateParty: Math.round(baseValue * 1.2),
      },
      average: {
        tradeIn: baseValue,
        privateParty: Math.round(baseValue * 1.1),
      },
      rough: {
        tradeIn: Math.round(baseValue * 0.9),
        privateParty: baseValue,
      },
    };
  }, [tradeEstimate.mid]);

  // Vehicle options (mock data - would come from API)
  const vehicleOptions = useMemo(() => {
    return [
      { name: 'Power Running Boards', price: 450 },
      { name: 'Elevation Edition', price: 30 },
    ];
  }, []);

  // Calculate realistic depreciation forecast
  const depreciationForecast = useMemo(() => {
    const currentValue = tradeEstimate.mid;
    const vehicleAge = new Date().getFullYear() - tradeEstimate.vehicle.year;
    
    // Depreciation rates vary by age:
    // Years 1-3: ~15-20% per year (steeper)
    // Years 4-6: ~10-12% per year (moderate)
    // Years 7+: ~7-8% per year (slower)
    let annualDepreciationRate: number;
    if (vehicleAge <= 3) {
      annualDepreciationRate = 0.17; // 17% per year
    } else if (vehicleAge <= 6) {
      annualDepreciationRate = 0.11; // 11% per year
    } else {
      annualDepreciationRate = 0.075; // 7.5% per year
    }
    
    // Convert to daily rate
    const dailyDepreciationRate = annualDepreciationRate / 365;
    const dailyDepreciation = Math.round(currentValue * dailyDepreciationRate);
    
    // Calculate 30/60/90 day projections
    const day30Loss = Math.round(currentValue * dailyDepreciationRate * 30);
    const day60Loss = Math.round(currentValue * dailyDepreciationRate * 60);
    const day90Loss = Math.round(currentValue * dailyDepreciationRate * 90);
    
    return {
      dailyDepreciation,
      day30Loss,
      day60Loss,
      day90Loss,
      annualRate: Math.round(annualDepreciationRate * 100),
      vehicleAge,
    };
  }, [tradeEstimate.mid, tradeEstimate.vehicle.year]);

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
      {/* Value Section - New Design */}
      <section className="value-section">
        {/* Header */}
        <div className="value-section__header">
          <div className="value-section__header-left">
            <span className="value-section__label">YOUR VEHICLE'S RESALE VALUE</span>
            <h1 className="value-section__title">
              {tradeEstimate.vehicle.year} {tradeEstimate.vehicle.make} {tradeEstimate.vehicle.model}
            </h1>
            <button className="value-section__change-link">Change Vehicle</button>
          </div>
          <BlackBookLogo />
        </div>

        {/* Vehicle Details - Secondary Info */}
        <div className="value-section__details">
          <div className="value-section__detail">
            <span className="value-section__detail-label">Style</span>
            <span className="value-section__detail-value">4D SUV FWD</span>
          </div>
          <span className="value-section__detail-divider">•</span>
          <div className="value-section__detail">
            <span className="value-section__detail-label">Mileage</span>
            <span className="value-section__detail-value">{tradeEstimate.vehicle.mileage.toLocaleString()}</span>
          </div>
          {vehicleOptions.length > 0 && (
            <>
              <span className="value-section__detail-divider">•</span>
              <div className="value-section__detail">
                <span className="value-section__detail-label">Options</span>
                <span className="value-section__detail-value">
                  {vehicleOptions.map(o => o.name).join(', ')} (+${vehicleOptions.reduce((sum, o) => sum + o.price, 0)})
                </span>
              </div>
            </>
          )}
        </div>

        {/* Trade-In Values - Primary Focus */}
        <div className="value-section__values">
          <div className="value-section__value-card">
            <span className="value-section__value-label">
              Clean
              <HelpIcon className="value-section__help-icon" />
            </span>
            <span className="value-section__value-amount">
              {formatPrice(conditionValues.clean.tradeIn)}
            </span>
          </div>
          
          <div className="value-section__value-card value-section__value-card--primary">
            <span className="value-section__value-badge">Most Common</span>
            <span className="value-section__value-label">
              Average
              <HelpIcon className="value-section__help-icon" />
            </span>
            <span className="value-section__value-amount value-section__value-amount--primary">
              {formatPrice(conditionValues.average.tradeIn)}
            </span>
          </div>
          
          <div className="value-section__value-card">
            <span className="value-section__value-label">
              Rough
              <HelpIcon className="value-section__help-icon" />
            </span>
            <span className="value-section__value-amount">
              {formatPrice(conditionValues.rough.tradeIn)}
            </span>
          </div>
        </div>

        {/* Private Party Link */}
        <div className="value-section__private-party">
          <span className="value-section__private-party-text">Interested in selling your vehicle yourself?</span>
          <a href="#" className="value-section__private-party-link">
            See the private party values for your {tradeEstimate.vehicle.year} {tradeEstimate.vehicle.make} {tradeEstimate.vehicle.model}.
          </a>
        </div>

        {/* Expert Tip */}
        <div className="value-section__tip">
          <div className="value-section__tip-header">
            <SealCheckIcon size={18} className="value-section__tip-icon" />
            <span className="value-section__tip-title">C/D Expert Tip:</span>
          </div>
          <p className="value-section__tip-text">
            <strong>Choose the condition that best matches your car today,</strong> not how it looked when it was new.
          </p>
          <ul className="value-section__tip-list">
            <li><strong>Clean:</strong> No major dents, scratches, or mechanical issues—well cared for inside and out.</li>
            <li><strong>Average:</strong> Normal wear and tear for its age, but nothing that needs immediate repair.</li>
            <li><strong>Rough:</strong> Visible damage, mechanical problems, or heavy interior wear.</li>
          </ul>
          <p className="value-section__tip-stat">
            <TrendingDown size={14} />
            <strong>About 70% of trade-ins are rated in average condition,</strong> making it the most accurate choice for most vehicles when you're unsure.
          </p>
        </div>

        {/* Your Local Dealer */}
        <div className="value-section__local-dealer">
          <div className="value-section__local-dealer-header">
            <div className="value-section__local-dealer-title-row">
              <div className="value-section__local-dealer-check">
                <Check size={16} />
              </div>
              <h3 className="value-section__local-dealer-title">YOUR LOCAL DEALER</h3>
            </div>
            <p className="value-section__local-dealer-subtitle">They may contact you to discuss the next steps.</p>
          </div>
          <div className="value-section__local-dealer-card">
            <div className="value-section__local-dealer-info">
              <h4 className="value-section__local-dealer-name">Serra Buick GMC Cadillac</h4>
              <p className="value-section__local-dealer-address">12300 Thirty Mile Road</p>
              <p className="value-section__local-dealer-city">Washington Township, MI</p>
            </div>
            <div className="value-section__local-dealer-contact">
              <a href="tel:5862812800" className="value-section__local-dealer-phone">
                <CustomPhoneIcon size={14} />
                (586) 281-2800
              </a>
              <p className="value-section__local-dealer-distance">
                <CustomMapPinIcon size={14} />
                18 miles away
              </p>
              <div className="value-section__local-dealer-links">
                <a href="#" className="value-section__local-dealer-link">Map</a>
                <a href="#" className="value-section__local-dealer-link">Directions</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trade Inventory Section - Hidden for now */}

      {/* Marketplace Analysis Section */}
      <section className="marketplace-analysis">
        <div className="marketplace-analysis__header">
          <h2 className="marketplace-analysis__title">
            Kia K5 Market Analysis
          </h2>
          <p className="marketplace-analysis__subtitle">Real-time pricing intelligence for your area</p>
        </div>
        <div className="marketplace-analysis__grid">
          <div className="marketplace-analysis__card">
            <div className="marketplace-analysis__card-content">
              <span className="marketplace-analysis__card-label">Market Speed</span>
              <span className="marketplace-analysis__card-value">Hot</span>
              <span className="marketplace-analysis__card-detail">K5s sell in avg. 18 days</span>
            </div>
          </div>
          <div className="marketplace-analysis__card">
            <div className="marketplace-analysis__card-content">
              <span className="marketplace-analysis__card-label">Price Trend</span>
              <span className="marketplace-analysis__card-value marketplace-analysis__card-value--positive">Buyer's Market</span>
              <span className="marketplace-analysis__card-detail">Prices down 3.2% this month</span>
            </div>
          </div>
          <div className="marketplace-analysis__card">
            <div className="marketplace-analysis__card-content">
              <span className="marketplace-analysis__card-label">Local Inventory</span>
              <span className="marketplace-analysis__card-value">47 Available</span>
              <span className="marketplace-analysis__card-detail">Within 25 miles of you</span>
            </div>
          </div>
          <div className="marketplace-analysis__card">
            <div className="marketplace-analysis__card-content">
              <span className="marketplace-analysis__card-label">Avg. Savings</span>
              <span className="marketplace-analysis__card-value">$2,847</span>
              <span className="marketplace-analysis__card-detail">Below MSRP in your area</span>
            </div>
          </div>
        </div>
        <div className="marketplace-analysis__insight">
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
