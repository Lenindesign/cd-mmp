import { useState } from 'react';
import Hero from '../../components/Hero';
import QuickSpecs from '../../components/QuickSpecs';
import CostToOwn from '../../components/CostToOwn';
import TargetPriceRange from '../../components/TargetPriceRange';
import Incentives from '../../components/Incentives';
import BuyingPotential from '../../components/BuyingPotential';
import AdSidebar from '../../components/AdSidebar';
import Overview from '../../components/Overview';
import TrimSelector from '../../components/TrimSelector';
import Warranty, { defaultWarrantyItems } from '../../components/Warranty';
import Comparison from '../../components/Comparison';
import VehicleRanking from '../../components/VehicleRanking';
import MarketSpeed from '../../components/MarketSpeed';
import VehicleOverview from '../../components/VehicleOverview';
import ExitIntentModal from '../../components/ExitIntentModal';
import { suvs } from '../../services/vehicleService';

// Get the 2025 Chevrolet Trax from database
const traxFromDB = suvs.find(v => v.make === 'Chevrolet' && v.model === 'Trax' && v.year === '2025');

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Vehicle data for the 2025 Chevrolet Trax (enhanced with database)
  const vehicleData = {
    make: traxFromDB?.make || 'Chevrolet',
    model: traxFromDB?.model || 'Trax',
    year: parseInt(traxFromDB?.year || '2025'),
    tagline: 'The Trax is an affordable subcompact SUV that delivers impressive interior space, practical features, and excellent value for budget-conscious buyers seeking reliable transportation without compromising on modern amenities.',
    rating: 10, // Editorial rating override
    priceRange: '$21,895–$25,895',
    image: traxFromDB?.image || 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c05811993000831eaff/001-2025-chevrolet-trax-exterior-front-view.jpg',
    images: traxFromDB?.galleryImages?.slice(0, 3) || [
      'https://d2kde5ohu8qb21.cloudfront.net/files/66466c0b6e89190008af75b2/005-2025-chevrolet-trax-exterior-front-view.jpg',
      'https://d2kde5ohu8qb21.cloudfront.net/files/66466c139cbba1000852d79d/008-2025-chevrolet-trax-exterior-front-view.jpg',
      'https://d2kde5ohu8qb21.cloudfront.net/files/66466c246e89190008af75b5/014-2025-chevrolet-trax-exterior-rear-view.jpg',
    ],
    photographer: 'MICHAEL SIMARI',
    // Additional data from database
    mpg: traxFromDB?.mpg,
    horsepower: traxFromDB?.horsepower,
    seatingCapacity: traxFromDB?.seatingCapacity,
    cargoSpace: traxFromDB?.cargoSpace,
    fuelType: traxFromDB?.fuelType,
    drivetrain: traxFromDB?.drivetrain,
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
    <>
      <main className="main">
        <Hero vehicle={vehicleData} />
        
        {/* Content with Sidebar */}
        <div className="content-with-sidebar">
          <div className="content-main">
            <QuickSpecs />
            <VehicleOverview />
            <CostToOwn vehicleName="Chevrolet Trax" />
            <TargetPriceRange />
            <Incentives make="Chevrolet" model="Trax" />
            <BuyingPotential />
            <VehicleRanking />
            <MarketSpeed vehicleName="2025 Chevrolet Trax" make="Chevrolet" model="Trax" />
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
          currentVehicle={{ make: vehicleData.make, model: vehicleData.model }}
        />
      </main>
      
      {/* Exit Intent Modal */}
      <ExitIntentModal 
        vehicleName="2025 Chevrolet Trax" 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default HomePage;

