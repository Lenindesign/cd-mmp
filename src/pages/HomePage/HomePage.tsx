import { useState } from 'react';
import Hero from '../../components/Hero';
import QuickSpecs from '../../components/QuickSpecs';
import CostToOwn from '../../components/CostToOwn';
import TargetPriceRange from '../../components/TargetPriceRange';
import Incentives from '../../components/Incentives';
import BuyingPotential from '../../components/BuyingPotential';
import AdSidebar from '../../components/AdSidebar';
import TrimSelector from '../../components/TrimSelector';
import Warranty, { defaultWarrantyItems } from '../../components/Warranty';
import Comparison from '../../components/Comparison';
import VehicleRanking from '../../components/VehicleRanking';
import MarketSpeed from '../../components/MarketSpeed';
import VehicleOverview from '../../components/VehicleOverview';
import ForSaleNearYou from '../../components/ForSaleNearYou';
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
        <Hero vehicle={vehicleData} animateButtons />
        
        {/* Content with Sidebar */}
        <div className="content-with-sidebar">
          <div className="content-main">
            <QuickSpecs />
            <VehicleOverview />
            <CostToOwn 
              vehicleName="Chevrolet Trax"
              msrp={traxFromDB?.priceMin || 21895}
              fuelType={traxFromDB?.fuelType || 'Gas'}
            />
            <TargetPriceRange 
              msrp={traxFromDB?.priceMin || 21895}
              vehicleName="Chevrolet Trax"
            />
            <Incentives 
              make="Chevrolet" 
              model="Trax"
              msrp={traxFromDB?.priceMin || 21895}
              bodyStyle={traxFromDB?.bodyStyle || 'SUV'}
              fuelType={traxFromDB?.fuelType || 'Gas'}
            />
            <BuyingPotential 
              bodyStyle={traxFromDB?.bodyStyle || 'SUV'}
              vehicleName="2025 Chevrolet Trax"
              vehicleImage={traxFromDB?.image || 'https://d2kde5ohu8qb21.cloudfront.net/files/66c5ee7c8a192c000814f46b/suvs-0029-2025-chevrolet-trax.png'}
            />
            <VehicleRanking />
            <MarketSpeed 
              vehicleName="2025 Chevrolet Trax" 
              make="Chevrolet" 
              model="Trax"
              bodyStyle={traxFromDB?.bodyStyle || 'SUV'}
              msrp={traxFromDB?.priceMin || 21895}
            />
          </div>
          <AdSidebar />
        </div>
        
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
        
        <ForSaleNearYou 
          vehicleName={`${vehicleData.year} ${vehicleData.make} ${vehicleData.model}`}
          make={vehicleData.make}
          model={vehicleData.model}
          bodyStyle={traxFromDB?.bodyStyle || 'SUV'}
          maxPrice={35000}
          location="Miami, FL"
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

