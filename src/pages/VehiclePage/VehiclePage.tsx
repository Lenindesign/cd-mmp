import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getVehicleBySlug } from '../../services/vehicleService';
import { getVehicleTrims, getRecommendedTrimName } from '../../services/trimService';
import Hero from '../../components/Hero';
import QuickSpecs from '../../components/QuickSpecs';
import CostToOwn from '../../components/CostToOwn';
import TargetPriceRange from '../../components/TargetPriceRange';
import Incentives from '../../components/Incentives';
import BuyingPotential from '../../components/BuyingPotential';
import AdSidebar from '../../components/AdSidebar';
import { TrimSelectorWithCTA } from '../../components/TrimSelector';
import Warranty, { defaultWarrantyItems } from '../../components/Warranty';
import Comparison from '../../components/Comparison';
import VehicleRanking from '../../components/VehicleRanking';
import MarketSpeed from '../../components/MarketSpeed';
import VehicleOverview from '../../components/VehicleOverview';
import ForSaleNearYou from '../../components/ForSaleNearYou';
import ExitIntentModal from '../../components/ExitIntentModal';
import AdBanner from '../../components/AdBanner';
import { SEO, createVehicleStructuredData } from '../../components/SEO';
import './VehiclePage.css';

interface VehiclePageProps {
  defaultYear?: string;
  defaultMake?: string;
  defaultModel?: string;
}

const VehiclePage = ({ defaultYear, defaultMake, defaultModel }: VehiclePageProps) => {
  const params = useParams<{ year: string; make: string; model: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use props if provided (for home page), otherwise use URL params
  const year = defaultYear || params.year;
  const make = defaultMake || params.make;
  const model = defaultModel || params.model;
  
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
    editorsChoice: vehicle.editorsChoice,
    tenBest: vehicle.tenBest,
    evOfTheYear: vehicle.evOfTheYear,
    mpg: vehicle.mpg,
    horsepower: vehicle.horsepower,
    seatingCapacity: vehicle.seatingCapacity,
    cargoSpace: vehicle.cargoSpace,
    fuelType: vehicle.fuelType,
    drivetrain: vehicle.drivetrain,
  };

  // Get accurate trim data from service
  const trimData = useMemo(() => {
    return getVehicleTrims(vehicle.make, vehicle.model, vehicle.priceMin, vehicle.priceMax);
  }, [vehicle.make, vehicle.model, vehicle.priceMin, vehicle.priceMax]);

  // Get recommended trim name
  const recommendedTrimName = useMemo(() => {
    return getRecommendedTrimName(vehicle.make, vehicle.model);
  }, [vehicle.make, vehicle.model]);

  // SEO structured data
  const structuredData = createVehicleStructuredData({
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    description: `Expert review, specs, and pricing for the ${vehicle.year} ${vehicle.make} ${vehicle.model}. Starting at ${vehicle.priceRange}.`,
    image: vehicle.image,
    brand: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    priceMin: vehicle.priceMin,
    priceMax: vehicle.priceMax,
    rating: vehicle.staffRating,
    reviewCount: vehicle.reviewCount,
  });

  return (
    <>
      <SEO
        title={`${vehicle.year} ${vehicle.make} ${vehicle.model} Review, Pricing, and Specs`}
        description={`Read Car and Driver's expert review of the ${vehicle.year} ${vehicle.make} ${vehicle.model}. Get pricing starting at ${vehicle.priceRange}, specs, photos, and more.`}
        image={vehicle.image}
        type="article"
        keywords={[vehicle.make, vehicle.model, vehicle.bodyStyle, vehicle.fuelType, 'car review', 'pricing']}
        structuredData={structuredData}
      />
      <main className="main">
        <Hero vehicle={vehicleData} />
        
        {/* Content with Sidebar - Part 1 */}
        <div className="content-with-sidebar content-with-sidebar--no-bottom-padding">
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
          </div>
          <AdSidebar />
        </div>
        
        {/* Full Width Ad Banner */}
        <AdBanner 
          imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg"
          altText="Nissan Advertisement"
          link="https://www.nissanusa.com"
        />
        
        {/* Content with Sidebar - Part 2 */}
        <div className="content-with-sidebar content-with-sidebar--no-bottom-padding">
          <div className="content-main">
            <CostToOwn 
              vehicleName={`${vehicle.make} ${vehicle.model}`}
              msrp={vehicle.priceMin}
              fuelType={vehicle.fuelType}
            />
            <TargetPriceRange 
              msrp={vehicle.priceMin}
              vehicleName={`${vehicle.make} ${vehicle.model}`}
            />
            <Incentives 
              make={vehicle.make} 
              model={vehicle.model}
              msrp={vehicle.priceMin}
              bodyStyle={vehicle.bodyStyle}
              fuelType={vehicle.fuelType}
            />
          </div>
          <AdSidebar />
        </div>
        
        {/* Full Width Ad Banner - After Incentives */}
        <AdBanner 
          imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg"
          altText="Nissan Advertisement"
          link="https://www.nissanusa.com"
        />
        
        {/* Content with Sidebar - Part 3 */}
        <div className="content-with-sidebar content-with-sidebar--no-bottom-padding">
          <div className="content-main">
            <BuyingPotential 
              bodyStyle={vehicle.bodyStyle}
              vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              vehicleImage={vehicle.image}
            />
            <VehicleRanking 
              bodyStyle={vehicle.bodyStyle}
              currentVehicleId={vehicle.id}
              maxPrice={vehicle.priceMax + 15000}
            />
            <MarketSpeed 
              vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} 
              make={vehicle.make} 
              model={vehicle.model}
              bodyStyle={vehicle.bodyStyle}
              msrp={vehicle.priceMin}
            />
          </div>
          <AdSidebar />
        </div>
        
        {/* Full Width Ad Banner - After MarketSpeed */}
        <AdBanner 
          imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg"
          altText="Nissan Advertisement"
          link="https://www.nissanusa.com"
        />
        
        <section id="pricing">
          <TrimSelectorWithCTA 
            trims={trimData}
            subtitle={`The ${recommendedTrimName} trim offers the best balance of features and value for the ${vehicle.make} ${vehicle.model}.`}
            variant="v5d"
            make={vehicle.make}
            model={vehicle.model}
            msrp={vehicle.priceMin}
            location="Miami, FL"
          />
        </section>
        
        <section id="warranty">
          <Warranty items={defaultWarrantyItems} />
        </section>
        
        <Comparison 
          currentVehicle={{ make: vehicle.make, model: vehicle.model }}
        />
        
        <ForSaleNearYou 
          vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          make={vehicle.make}
          model={vehicle.model}
          bodyStyle={vehicle.bodyStyle}
          maxPrice={vehicle.priceMax + 10000}
          location="Miami, FL"
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
