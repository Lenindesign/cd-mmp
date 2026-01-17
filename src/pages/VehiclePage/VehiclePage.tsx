import { useParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getVehicleBySlug } from '../../services/vehicleService';
import { addRecentlyViewed } from '../../services/recentlyViewedService';
import { useSupabaseRating, getCategory } from '../../hooks/useSupabaseRating';
import { getVehicleTrims, getRecommendedTrimName } from '../../services/trimService';
import Hero from '../../components/Hero';
import QuickSpecs from '../../components/QuickSpecs';
import FuelEconomy from '../../components/FuelEconomy';
import CostToOwn from '../../components/CostToOwn';
import PriceHistory from '../../components/PriceHistory';
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
import AdBanner from '../../components/AdBanner';
import { SEO, createVehicleStructuredData } from '../../components/SEO';
import { DealerLocatorMap } from '../../components/DealerLocatorMap';
import { GoogleOneTap } from '../../components/GoogleOneTap';
import { useGoogleOneTap } from '../../hooks/useGoogleOneTap';
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

  // Google One Tap integration for high-intent MMP page
  const { shouldShowOneTap, isAuthenticated } = useGoogleOneTap({
    pageType: 'mmp',
    vehicleInfo: vehicle ? {
      year: parseInt(vehicle.year),
      make: vehicle.make,
      model: vehicle.model,
    } : undefined,
  });

  // Fetch rating from Supabase in production
  const category = vehicle ? getCategory(vehicle.bodyStyle) : '';
  const { rating: supabaseRating } = useSupabaseRating(
    vehicle?.id || '',
    category,
    vehicle?.staffRating || 0
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Track recently viewed vehicles
  useEffect(() => {
    if (vehicle) {
      addRecentlyViewed({
        id: vehicle.id,
        year: vehicle.year,
        make: vehicle.make,
        model: vehicle.model,
        slug: vehicle.slug,
        image: vehicle.image,
        priceMin: vehicle.priceMin,
      });
    }
  }, [vehicle]);

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

  // Build vehicle data for Hero component (use Supabase rating in production)
  const vehicleData = {
    make: vehicle.make,
    model: vehicle.model,
    year: parseInt(vehicle.year),
    tagline: `The ${vehicle.make} ${vehicle.model} offers ${vehicle.features?.slice(0, 2).join(' and ') || 'excellent features and value'}. A compelling choice in the ${vehicle.bodyStyle.toLowerCase()} segment.`,
    rating: supabaseRating,
    priceRange: vehicle.priceRange,
    image: vehicle.image,
    galleryImages: vehicle.galleryImages || [],
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
    rating: supabaseRating,
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
      
      {/* Google One Tap for non-authenticated users on high-intent pages */}
      {shouldShowOneTap && (
        <GoogleOneTap
          pageType="mmp"
          vehicleInfo={{
            year: parseInt(vehicle.year),
            make: vehicle.make,
            model: vehicle.model,
          }}
          isAuthenticated={isAuthenticated}
        />
      )}
      
      <main className="main">
        <Hero vehicle={vehicleData} animateButtons />
        
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
              verdict={`The ${vehicle.year} ${vehicle.make} ${vehicle.model} is a solid choice in the ${vehicle.bodyStyle.toLowerCase()} segment, offering ${vehicle.fuelType?.toLowerCase() || 'efficient'} power and a starting price of ${vehicle.priceRange}. With a staff rating of ${supabaseRating}/10, it delivers good value for its class.`}
            />
            <FuelEconomy
              year={parseInt(vehicle.year)}
              make={vehicle.make}
              model={vehicle.model}
              bodyStyle={vehicle.bodyStyle}
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
            <PriceHistory
              vehicleYear={parseInt(vehicle.year)}
              make={vehicle.make}
              model={vehicle.model}
              trim={trimData[0]?.name || 'Base'}
              asNewValue={vehicle.priceMin}
              previousYearValue={Math.round(vehicle.priceMin * 0.85)}
              currentValue={Math.round(vehicle.priceMin * 0.78)}
              forecastYear1Value={Math.round(vehicle.priceMin * 0.70)}
              forecastYear2Value={Math.round(vehicle.priceMin * 0.62)}
              expertTip={`Vehicle value drops most during first year of ownership. Consider shopping for a 1-3 year old ${vehicle.make} ${vehicle.model} for the best bang for your buck.`}
              shopUrl={`/vehicles/${vehicle.year}/${vehicle.make.toLowerCase()}/${vehicle.model.toLowerCase()}`}
              tradeInUrl="#trade-in"
              competitors={[
                {
                  name: `${vehicle.year} Honda Accord`,
                  asNewValue: 29500,
                  currentValue: 23600,
                  depreciationPercent: 20.0
                },
                {
                  name: `${vehicle.year} Toyota Camry`,
                  asNewValue: 28400,
                  currentValue: 23440,
                  depreciationPercent: 17.5
                },
                {
                  name: `${vehicle.year} Mazda 6`,
                  asNewValue: 26800,
                  currentValue: 20770,
                  depreciationPercent: 22.5
                },
              ]}
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
              showScore={true}
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
          <TrimSelector 
            trims={trimData}
            subtitle={`The ${recommendedTrimName} trim offers the best balance of features and value for the ${vehicle.make} ${vehicle.model}.`}
            vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          />
        </section>
        
        <section id="warranty">
          <Warranty 
            items={defaultWarrantyItems}
            make={vehicle.make}
            model={vehicle.model}
            year={vehicle.year}
            bodyStyle={vehicle.bodyStyle}
          />
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
        
        {/* Dealer Locator Map */}
        <section id="find-dealers" className="vehicle-page__dealer-locator">
          <DealerLocatorMap
            vehicle={{
              year: parseInt(vehicle.year),
              make: vehicle.make,
              model: vehicle.model,
              image: vehicle.image,
              galleryImages: vehicle.galleryImages,
              msrp: vehicle.priceMin,
              priceMin: vehicle.priceMin,
              priceMax: vehicle.priceMax,
              bodyStyle: vehicle.bodyStyle,
              mpg: vehicle.mpg ? parseInt(vehicle.mpg) : undefined,
              rating: supabaseRating,
            }}
            cardVariant="compact"
            initialLocation={{ lat: 34.0522, lng: -118.2437 }}
            initialZipCode="Los Angeles, CA"
          />
        </section>
      </main>
      
      {/* Exit Intent Modal */}
      <ExitIntentModal 
        vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        vehicleImage={vehicle.image || 'https://d2kde5ohu8qb21.cloudfront.net/files/659f9ed490e84500088bd486/012-2024-lamborghini-revuelto.jpg'}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default VehiclePage;
