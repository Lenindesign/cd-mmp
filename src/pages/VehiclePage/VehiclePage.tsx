import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getVehicleBySlug } from '../../services/vehicleService';
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
import './VehiclePage.css';

const VehiclePage = () => {
  const { year, make, model } = useParams<{ year: string; make: string; model: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const slug = `${year}/${make}/${model}`;
  
  const vehicle = useMemo(() => getVehicleBySlug(slug), [slug]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!vehicle) {
    return (
      <div className="vehicle-page vehicle-page--not-found">
        <div className="container">
          <h1>Vehicle Not Found</h1>
          <p>Sorry, we couldn't find the vehicle you're looking for.</p>
          <Link to="/vehicles" className="vehicle-page__back-link">
            <ArrowLeft size={18} />
            Browse All Vehicles
          </Link>
        </div>
      </div>
    );
  }

  // Build vehicle data for Hero component
  const vehicleData = {
    make: vehicle.make,
    model: vehicle.model,
    year: parseInt(vehicle.year),
    tagline: `The ${vehicle.make} ${vehicle.model} offers ${vehicle.features?.slice(0, 2).join(' and ') || 'excellent features and value'}. A compelling choice in the ${vehicle.bodyStyle.toLowerCase()} segment.`,
    rating: vehicle.staffRating,
    priceRange: vehicle.priceRange,
    image: vehicle.image,
    images: vehicle.galleryImages?.slice(0, 3) || [],
    photographer: 'CAR AND DRIVER',
    mpg: vehicle.mpg,
    horsepower: vehicle.horsepower,
    seatingCapacity: vehicle.seatingCapacity,
    cargoSpace: vehicle.cargoSpace,
    fuelType: vehicle.fuelType,
    drivetrain: vehicle.drivetrain,
  };

  // Generate dynamic overview data based on vehicle
  const overviewData = {
    pros: vehicle.features?.slice(0, 5).map(f => f) || [
      'Competitive pricing',
      'Modern features',
      'Good fuel economy',
      'Reliable performance',
      'Spacious interior',
    ],
    cons: [
      'Limited availability in some regions',
      'Base model lacks some features',
      'Competition is strong in this segment',
    ],
    whatsNew: [
      `New styling updates for ${vehicle.year}`,
      'Enhanced safety features',
      'Updated infotainment system',
    ],
    verdict: `The ${vehicle.year} ${vehicle.make} ${vehicle.model} is a solid choice in the ${vehicle.bodyStyle.toLowerCase()} segment, offering ${vehicle.fuelType?.toLowerCase() || 'efficient'} power and a starting price of ${vehicle.priceRange}. With a staff rating of ${vehicle.staffRating}/10, it delivers good value for its class.`,
  };

  // Generate dynamic trim data
  const trimData = [
    {
      id: 'base',
      name: 'Base',
      price: `$${vehicle.priceMin.toLocaleString()}`,
      features: vehicle.features?.slice(0, 5) || [
        'Standard infotainment',
        'Safety features',
        'Cloth seats',
        'Manual climate control',
        'Bluetooth connectivity',
      ],
    },
    {
      id: 'mid',
      name: vehicle.trim || 'Sport',
      price: `$${Math.round((vehicle.priceMin + vehicle.priceMax) / 2).toLocaleString()}`,
      recommended: true,
      features: [
        'All Base features plus:',
        'Upgraded infotainment',
        'Enhanced safety suite',
        'Premium audio system',
        'Remote start',
      ],
    },
    {
      id: 'top',
      name: 'Premium',
      price: `$${vehicle.priceMax.toLocaleString()}`,
      features: [
        'All Sport features plus:',
        'Leather seats',
        'Panoramic sunroof',
        'Advanced driver assistance',
        'Premium interior trim',
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
            <QuickSpecs 
              specs={{
                mpg: vehicle.mpg || 'N/A',
                seating: vehicle.seatingCapacity ? `${vehicle.seatingCapacity} Seats` : 'N/A',
                powertrain: vehicle.fuelType || 'Gas',
                drivetrain: vehicle.drivetrain || 'N/A',
                warranty: '3 Years/36,000 Miles',
              }}
            />
            <VehicleOverview 
              content={`The ${vehicle.make} ${vehicle.model} delivers ${vehicle.features?.slice(0, 2).join(' and ') || 'excellent value'}. With ${vehicle.horsepower || 'competitive'} horsepower and ${vehicle.mpg || 'efficient'} MPG, it's a compelling choice for buyers in this segment.`}
              highs={vehicle.features?.slice(0, 5) || undefined}
              year={parseInt(vehicle.year)}
              verdict={`The ${vehicle.year} ${vehicle.make} ${vehicle.model} is a solid choice in the ${vehicle.bodyStyle.toLowerCase()} segment, offering ${vehicle.fuelType?.toLowerCase() || 'efficient'} power and a starting price of ${vehicle.priceRange}. With a staff rating of ${vehicle.staffRating}/10, it delivers good value for its class.`}
            />
            <CostToOwn vehicleName={`${vehicle.make} ${vehicle.model}`} />
            <TargetPriceRange />
            <Incentives make={vehicle.make} model={vehicle.model} />
            <BuyingPotential />
            <VehicleRanking 
              bodyStyle={vehicle.bodyStyle}
              currentVehicleId={vehicle.id}
              maxPrice={vehicle.priceMax + 15000}
            />
            <MarketSpeed 
              vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} 
              make={vehicle.make} 
              model={vehicle.model} 
            />
          </div>
          <AdSidebar />
        </div>
        
        <Overview 
          pros={overviewData.pros}
          cons={overviewData.cons}
          whatsNew={overviewData.whatsNew}
          verdict={overviewData.verdict}
          year={parseInt(vehicle.year)}
        />
        
        <section id="pricing">
          <TrimSelector 
            trims={trimData}
            subtitle={`The ${vehicle.trim || 'Sport'} trim offers the best balance of features and value for the ${vehicle.make} ${vehicle.model}.`}
          />
        </section>
        
        <section id="warranty">
          <Warranty items={defaultWarrantyItems} />
        </section>
        
        <Comparison 
          currentVehicle={{ make: vehicle.make, model: vehicle.model }}
        />
      </main>
      
      {/* Exit Intent Modal */}
      <ExitIntentModal 
        vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default VehiclePage;
