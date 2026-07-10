import { useParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getVehicleBySlug, type Vehicle } from '../../services/vehicleService';
import { addRecentlyViewed } from '../../services/recentlyViewedService';
import { useSupabaseRating, getCategory } from '../../hooks/useSupabaseRating';
import { getVehicleTrims, getRecommendedTrimName } from '../../services/trimService';
import Hero from '../../components/Hero';
import QuickSpecs from '../../components/QuickSpecs';
import FuelEconomy from '../../components/FuelEconomy';
import PriceHistory from '../../components/PriceHistory';
import BuyingPotential from '../../components/BuyingPotential';
import AdSidebar from '../../components/AdSidebar';
import TrimSelector from '../../components/TrimSelector';
import Warranty from '../../components/Warranty';
import Comparison from '../../components/Comparison';
import VehicleRanking from '../../components/VehicleRanking';
import MarketSpeed from '../../components/MarketSpeed';
import VehicleOverview from '../../components/VehicleOverview';
import OfficialELotCarousel from '../../components/OfficialELotCarousel';
import ExitIntentModal from '../../components/ExitIntentModal';
import AdBanner from '../../components/AdBanner';
import { SEO, createVehicleStructuredData } from '../../components/SEO';
import { DealerLocatorMap } from '../../components/DealerLocatorMap';
import PaymentCalculator from '../../components/PaymentCalculator';
import TradeInEstimateModal, {
  type TradeInEstimateCondition,
  type TradeInSelectedOption,
} from '../../components/TradeInEstimateModal';
import { GoogleOneTap } from '../../components/GoogleOneTap';
import { useGoogleOneTap } from '../../hooks/useGoogleOneTap';
import './VehiclePage.css';

interface VehiclePageProps {
  defaultYear?: string;
  defaultMake?: string;
  defaultModel?: string;
}

interface CalculatorTradeInEstimate {
  vehicle: string;
  image?: string;
  mileage: number;
  zipCode: string;
  condition: TradeInEstimateCondition;
  options: TradeInSelectedOption[];
  value: number;
  appliedAt: number;
}

const joinEditorialList = (items: string[]) => {
  const filteredItems = items.filter(Boolean);

  if (filteredItems.length <= 1) {
    return filteredItems[0] || '';
  }

  if (filteredItems.length === 2) {
    return `${filteredItems[0]} and ${filteredItems[1]}`;
  }

  return `${filteredItems.slice(0, -1).join(', ')}, and ${filteredItems[filteredItems.length - 1]}`;
};

const buildHeroReviewSummary = (vehicle: Vehicle, rating: number) => {
  if (vehicle.make === 'Chevrolet' && vehicle.model === 'Trax') {
    return {
      highs: 'Attractively low starting price, spacious interior for its class, user-friendly infotainment, and composed ride quality.',
      lows: 'Modest engine power, no all-wheel-drive option, basic interior materials, and limited towing capacity.',
      verdict: 'As a smartly priced and space-efficient subcompact SUV, the Chevrolet Trax is one of the clearest value plays in its class.',
    };
  }

  const features = vehicle.features?.slice(0, 3) || [];
  const highs = features.length > 0
    ? joinEditorialList(features)
    : `Competitive value, useful ${vehicle.bodyStyle.toLowerCase()} packaging, and approachable day-to-day manners`;

  const lows: string[] = [];
  if (vehicle.horsepower && vehicle.horsepower < 170) {
    lows.push('modest engine output');
  }
  if (vehicle.drivetrain === 'FWD') {
    lows.push('front-wheel-drive focus');
  }
  if (vehicle.transmission === 'CVT') {
    lows.push('CVT tuning may not satisfy every driver');
  }

  return {
    highs: `${highs}.`,
    lows: `${joinEditorialList(lows.length > 0 ? lows : ['some rivals offer more excitement'])}.`,
    verdict: `With a ${rating}/10 C/D rating, the ${vehicle.make} ${vehicle.model} is a compelling ${vehicle.bodyStyle.toLowerCase()} choice for shoppers who want a clear balance of value, features, and everyday usability.`,
  };
};

const VehiclePage = ({ defaultYear, defaultMake, defaultModel }: VehiclePageProps) => {
  const params = useParams<{ year: string; make: string; model: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTradeInModalOpen, setIsTradeInModalOpen] = useState(false);
  const [calculatorTradeInEstimate, setCalculatorTradeInEstimate] = useState<CalculatorTradeInEstimate | null>(null);
  
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

  // Get accurate trim data from service
  const trimData = useMemo(() => {
    if (!vehicle) return [];
    return getVehicleTrims(vehicle.make, vehicle.model, vehicle.priceMin, vehicle.priceMax);
  }, [vehicle]);

  // Get recommended trim name
  const recommendedTrimName = useMemo(() => {
    if (!vehicle) return '';
    return getRecommendedTrimName(vehicle.make, vehicle.model);
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
    tagline: `The ${vehicle.make} ${vehicle.model}delivers ${vehicle.features?.slice(0, 2).join(' and ') || 'excellent features and value'}. A compelling choice in the ${vehicle.bodyStyle.toLowerCase()} segment.`,
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
    reviewSummary: buildHeroReviewSummary(vehicle, supabaseRating),
  };

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
        <OfficialELotCarousel
          year={vehicle.year}
          make={vehicle.make}
          model={vehicle.model}
          bodyStyle={vehicle.bodyStyle}
          location="Miami, FL"
          priceThreshold={vehicle.priceMax}
        />
        
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
            <Warranty
              items={[]}
              variant="vehicle-reliability"
              title="Reliability & Recalls"
              make={vehicle.make}
              model={vehicle.model}
              year={vehicle.year}
              bodyStyle={vehicle.bodyStyle}
              drivetrain={vehicle.drivetrain}
              nhtsaSafetyVehicleId={vehicle.nhtsaSafetyVehicleId}
              vehicleImage={vehicle.image}
              vehicleImageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              fullReportUrl={`/${vehicle.slug}/reliability-recalls`}
            />
            <VehicleOverview 
              content={`The ${vehicle.make} ${vehicle.model} delivers ${vehicle.features?.slice(0, 2).join(' and ') || 'excellent value'}. With ${vehicle.horsepower || 'competitive'} horsepower and ${vehicle.mpg || 'efficient'} MPG, it's a compelling choice for buyers in this segment.`}
              highs={vehicle.features?.slice(0, 5) || undefined}
              year={parseInt(vehicle.year)}
              verdict={`The ${vehicle.year} ${vehicle.make} ${vehicle.model} is a solid choice in the ${vehicle.bodyStyle.toLowerCase()} segment with ${vehicle.fuelType?.toLowerCase() || 'efficient'} power and a starting price of ${vehicle.priceRange}. With a staff rating of ${supabaseRating}/10, it delivers good value for its class.`}
            />
            <PaymentCalculator
              msrp={vehicle.priceMin}
              priceMax={vehicle.priceMax}
              vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              make={vehicle.make}
              model={vehicle.model}
              onEstimateTradeIn={() => setIsTradeInModalOpen(true)}
              tradeInEstimate={calculatorTradeInEstimate}
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
            subtitle={`The ${recommendedTrimName} trim provides the best balance of features and value for the ${vehicle.make} ${vehicle.model}.`}
            vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          />
        </section>
        
        <Comparison 
          currentVehicle={{ make: vehicle.make, model: vehicle.model }}
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
            showVehiclePreview={true}
            defaultView="list"
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
      <TradeInEstimateModal
        isOpen={isTradeInModalOpen}
        initialVehicle={calculatorTradeInEstimate?.vehicle}
        initialMileage={calculatorTradeInEstimate?.mileage}
        initialCondition={calculatorTradeInEstimate?.condition}
        description={`Add your current vehicle, mileage, and condition. We will apply the estimate to this ${vehicle.make} ${vehicle.model} payment calculation.`}
        onClose={() => setIsTradeInModalOpen(false)}
        onApply={(estimate) => setCalculatorTradeInEstimate({ ...estimate, appliedAt: Date.now() })}
      />
    </>
  );
};

export default VehiclePage;
