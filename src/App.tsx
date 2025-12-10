import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuickSpecs from './components/QuickSpecs';
import CostToOwn from './components/CostToOwn';
import TargetPriceRange from './components/TargetPriceRange';
import Incentives from './components/Incentives';
import AdSidebar from './components/AdSidebar';
import Overview from './components/Overview';
import TrimSelector from './components/TrimSelector';
import Warranty, { defaultWarrantyItems } from './components/Warranty';
import Comparison, { defaultCompetitors } from './components/Comparison';
import Footer from './components/Footer';
import ExitIntentModal from './components/ExitIntentModal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShopNewCars = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // Vehicle data for the 2025 Chevrolet Trax
  const vehicleData = {
    make: 'Chevrolet',
    model: 'Trax',
    year: 2025,
    tagline: 'The Trax is an affordable subcompact SUV that delivers impressive interior space, practical features, and excellent value for budget-conscious buyers seeking reliable transportation without compromising on modern amenities.',
    rating: 10,
    priceRange: '$21,895–$25,895',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c05811993000831eaff/001-2025-chevrolet-trax-exterior-front-view.jpg',
    images: [
      'https://d2kde5ohu8qb21.cloudfront.net/files/66466c0b6e89190008af75b2/005-2025-chevrolet-trax-exterior-front-view.jpg',
      'https://d2kde5ohu8qb21.cloudfront.net/files/66466c139cbba1000852d79d/008-2025-chevrolet-trax-exterior-front-view.jpg',
      'https://d2kde5ohu8qb21.cloudfront.net/files/66466c246e89190008af75b5/014-2025-chevrolet-trax-exterior-rear-view.jpg',
    ],
    photographer: 'MICHAEL SIMARI',
  };

  // Overview data
  const overviewData = {
    pros: [
      'Attractively low starting price',
      'Spacious interior for its class',
      'User-friendly infotainment system',
      'Composed ride quality',
      'Standard safety features',
    ],
    cons: [
      'Modest engine power',
      'No all-wheel-drive option',
      'Basic interior materials',
      'Limited towing capacity',
    ],
    whatsNew: [
      'Two new exterior colors: Cypress Gray and Marina Blue Metallic',
      'Engine now capable of running on E85 fuel',
      'Enhanced standard safety features',
    ],
    verdict: 'The 2025 Chevrolet Trax stands out as one of the most affordable new vehicles on the market while still offering a surprisingly spacious interior and modern technology. Its attractively low price makes it an excellent choice for first-time buyers or anyone seeking practical, no-frills transportation.',
  };

  // Trim data
  const trimData = [
    {
      id: 'ls',
      name: 'LS',
      price: '$21,895',
      features: [
        '8.0-inch touchscreen display',
        'Wireless Apple CarPlay & Android Auto',
        'Lane Keep Assist',
        'Automatic Emergency Braking',
        'Rear Vision Camera',
      ],
    },
    {
      id: '1rs',
      name: '1RS',
      price: '$23,195',
      features: [
        'All LS features plus:',
        'Sporty exterior styling',
        '17-inch alloy wheels',
        'Enhanced interior accents',
        'Sport pedals',
      ],
    },
    {
      id: 'lt',
      name: 'LT',
      price: '$23,395',
      recommended: true,
      features: [
        '11.0-inch diagonal touchscreen',
        'Wireless device charging',
        'Remote start',
        'Available heated seats',
        'Available heated steering wheel',
      ],
    },
    {
      id: 'rs',
      name: 'RS',
      price: '$24,995',
      features: [
        'All LT features plus:',
        'Sport-tuned suspension',
        '19-inch black painted wheels',
        'Black exterior accents',
        'Unique RS interior trim',
      ],
    },
    {
      id: 'activ',
      name: 'ACTIV',
      price: '$24,995',
      features: [
        'All LT features plus:',
        'Rugged exterior styling',
        'Faux skid plate',
        'Chrome accents',
        'All-terrain inspired design',
      ],
    },
  ];

  return (
    <div className="app">
      <Header onShopNewCars={handleShopNewCars} />
      
      <main className="main">
        <Hero vehicle={vehicleData} />
        
        {/* Content with Sidebar */}
        <div className="content-with-sidebar">
          <div className="content-main">
            <QuickSpecs />
            <CostToOwn 
              vehicleName="Chevrolet Trax" 
              totalCost={30700}
              rating="Below Average"
              costs={[
                { name: 'Depreciation', value: 8500, color: '#1B5F8A', position: 'bottom' },
                { name: 'Financing', value: 2800, color: '#3D8B8B', position: 'top' },
                { name: 'Taxes & Fees', value: 1650, color: '#D4A84B', position: 'bottom' },
                { name: 'Fuel', value: 7500, color: '#E67E22', position: 'top' },
                { name: 'Insurance', value: 6200, color: '#C0392B', position: 'bottom' },
                { name: 'Repairs', value: 1200, color: '#922B21', position: 'top' },
                { name: 'Maintenance', value: 2850, color: '#5C1E1E', position: 'bottom' },
              ]}
            />
            <TargetPriceRange 
              dealerPrice={23495} 
              targetPriceLow={21500} 
              targetPriceHigh={22800}
            />
            <Incentives make="Chevrolet" model="Trax" />
          </div>
          <AdSidebar />
        </div>
        
        <Overview 
          pros={overviewData.pros}
          cons={overviewData.cons}
          whatsNew={overviewData.whatsNew}
          verdict={overviewData.verdict}
          year={vehicleData.year}
        />
        
        <section id="pricing">
          <TrimSelector 
            trims={trimData}
            subtitle="The LT trim offers the best balance of features and value, making it our recommended choice for most buyers."
          />
        </section>
        
        <section id="warranty">
          <Warranty items={defaultWarrantyItems} />
        </section>
        
        <Comparison 
          competitors={defaultCompetitors}
          currentVehicle={{ make: 'Chevrolet', model: 'Trax' }}
        />
      </main>
      
      <Footer />
      
      {/* Exit Intent Modal */}
      <ExitIntentModal 
        vehicleName="2025 Chevrolet Trax" 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
