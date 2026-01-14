import { useSearchParams, useNavigate } from 'react-router-dom';
import WhatsMyCarWorthResults from '../../components/WhatsMyCarWorthResults';
import './WhatsMyCarWorthResultsPage.css';

const WhatsMyCarWorthResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get data from URL params
  const year = parseInt(searchParams.get('year') || '2021', 10);
  const make = searchParams.get('make') || 'Honda';
  const model = searchParams.get('model') || 'Accord';
  const mileage = parseInt(searchParams.get('mileage') || '45000', 10);
  const condition = searchParams.get('condition') || 'Good';

  // If required params are missing, redirect to form
  if (!searchParams.get('year') || !searchParams.get('make') || !searchParams.get('model')) {
    navigate('/whats-my-car-worth');
    return null;
  }

  // Mock trade estimate (in production, this would come from an API)
  const tradeEstimate = {
    low: Math.round(18500 * (mileage / 45000) * (condition === 'Excellent' ? 1.1 : condition === 'Good' ? 1.0 : condition === 'Fair' ? 0.9 : 0.8)),
    mid: Math.round(21500 * (mileage / 45000) * (condition === 'Excellent' ? 1.1 : condition === 'Good' ? 1.0 : condition === 'Fair' ? 0.9 : 0.8)),
    high: Math.round(24500 * (mileage / 45000) * (condition === 'Excellent' ? 1.1 : condition === 'Good' ? 1.0 : condition === 'Fair' ? 0.9 : 0.8)),
    vehicle: {
      year,
      make,
      model,
      mileage,
      condition: condition.charAt(0).toUpperCase() + condition.slice(1),
    },
  };

  // Mock dealers (in production, this would come from an API)
  const dealers = [
    {
      name: `${make} of Miami`,
      address: '1234 Main Street',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      phone: '(305) 555-1234',
      email: `contact@${make.toLowerCase()}miami.com`,
      rating: 4.7,
      distance: 5.2,
    },
    {
      name: `South Florida ${make}`,
      address: '5678 Ocean Drive',
      city: 'Miami Beach',
      state: 'FL',
      zip: '33139',
      phone: '(305) 555-5678',
      email: `info@southflorida${make.toLowerCase()}.com`,
      rating: 4.5,
      distance: 8.1,
    },
    {
      name: `Coral Gables ${make}`,
      address: '9012 Ponce de Leon Blvd',
      city: 'Coral Gables',
      state: 'FL',
      zip: '33134',
      phone: '(305) 555-9012',
      email: `sales@coralgables${make.toLowerCase()}.com`,
      rating: 4.6,
      distance: 12.3,
    },
  ];

  // Determine variant from URL or default to 'balanced'
  const variant = (searchParams.get('variant') || 'balanced') as 'marketplace-focused' | 'balanced' | 'content-focused';

  return (
    <div className="whats-my-car-worth-results-page">
      <WhatsMyCarWorthResults
        variant={variant}
        tradeEstimate={tradeEstimate}
        dealers={dealers}
        showSimilarVehicles={variant === 'marketplace-focused'}
        showNextVehicle={variant === 'balanced'}
      />
    </div>
  );
};

export default WhatsMyCarWorthResultsPage;
