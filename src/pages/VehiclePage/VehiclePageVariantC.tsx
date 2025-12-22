import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { getVehicleBySlug } from '../../services/vehicleService';
import { addRecentlyViewed } from '../../services/recentlyViewedService';
import { useSupabaseRating, getCategory } from '../../hooks/useSupabaseRating';
import { getVehicleTrims, getRecommendedTrimName } from '../../services/trimService';
import Hero from '../../components/Hero';
import QuickSpecs from '../../components/QuickSpecs';
import CostToOwn from '../../components/CostToOwn';
import PriceHistory from '../../components/PriceHistory';
import { TargetPriceRangeWithCTA } from '../../components/TargetPriceRange';
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
import './VehiclePage.css';

interface VehiclePageVariantCProps {
  variant: 'v1c' | 'v2c' | 'v3c' | 'v4c' | 'v5c';
}

const VARIANTS = ['v1c', 'v2c', 'v3c', 'v4c', 'v5c'] as const;

// Display labels for each variant
const getVariantLabel = (index: number, total: number) => {
  return `Inline CTA V${index + 1}/${total}`;
};

const VehiclePageVariantC = ({ variant }: VehiclePageVariantCProps) => {
  const params = useParams<{ year: string; make: string; model: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const year = params.year;
  const make = params.make;
  const model = params.model;
  
  const slug = `${year}/${make}/${model}`;
  
  // Variant navigation
  const currentIndex = VARIANTS.indexOf(variant);
  
  const goToPrevVariant = () => {
    const prevIndex = currentIndex === 0 ? VARIANTS.length - 1 : currentIndex - 1;
    navigate(`/${year}/${make}/${model}/${VARIANTS[prevIndex]}`);
  };
  
  const goToNextVariant = () => {
    const nextIndex = currentIndex === VARIANTS.length - 1 ? 0 : currentIndex + 1;
    navigate(`/${year}/${make}/${model}/${VARIANTS[nextIndex]}`);
  };
  
  const vehicle = useMemo(() => getVehicleBySlug(slug), [slug]);

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

  // Build vehicle data for Hero component
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
  };

  // Get accurate trim data from service
  const trimData = useMemo(() => {
    return getVehicleTrims(vehicle.make, vehicle.model, vehicle.priceMin, vehicle.priceMax);
  }, [vehicle.make, vehicle.model, vehicle.priceMin, vehicle.priceMax]);

  // Get recommended trim name
  const recommendedTrimName = useMemo(() => {
    return getRecommendedTrimName(vehicle.make, vehicle.model);
  }, [vehicle.make, vehicle.model]);

  return (
    <>
      {/* Variant Badge with Navigation - Purple for C variants */}
      <div style={{
        position: 'fixed',
        top: '70px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        background: '#8B5CF6', // Purple for C variants
        color: 'white',
        borderRadius: '0',
        fontWeight: 'bold',
        fontSize: '14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        overflow: 'hidden',
      }}>
        <button
          onClick={goToPrevVariant}
          style={{
            background: 'rgba(0,0,0,0.2)',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
          aria-label="Previous variant"
        >
          <ChevronLeft size={18} />
        </button>
        <span style={{ padding: '8px 16px', minWidth: '140px', textAlign: 'center' }}>
          {getVariantLabel(currentIndex, VARIANTS.length)}
        </span>
        <button
          onClick={goToNextVariant}
          style={{
            background: 'rgba(0,0,0,0.2)',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
          aria-label="Next variant"
        >
          <ChevronRight size={18} />
        </button>
      </div>

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
          </div>
          <AdSidebar />
        </div>
        
        {/* Full Width Ad Banner */}
        <AdBanner 
          imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg"
          altText="Nissan Advertisement"
          link="https://www.nissanusa.com"
        />
        
        {/* Content with Sidebar - Part 2: Contains the Target Price Range WITH Marketplace CTA */}
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
              expertTip={`Average purchasing price of a ${vehicle.year} ${vehicle.make} ${vehicle.model} in your area is $${Math.round(vehicle.priceMin * 0.75).toLocaleString()}. Consider this vehicle for excellent value retention in its segment.`}
              shopUrl={`/vehicles/${vehicle.year}/${vehicle.make.toLowerCase()}/${vehicle.model.toLowerCase()}`}
              tradeInUrl="#trade-in"
            />
            
            {/* TARGET PRICE RANGE WITH INTEGRATED MARKETPLACE CTA - This is what we're testing */}
            <TargetPriceRangeWithCTA 
              msrp={vehicle.priceMin}
              vehicleName={`${vehicle.make} ${vehicle.model}`}
              make={vehicle.make}
              model={vehicle.model}
              variant={variant}
              location="Miami, FL"
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
        vehicleImage={vehicle.image || 'https://d2kde5ohu8qb21.cloudfront.net/files/659f9ed490e84500088bd486/012-2024-lamborghini-revuelto.jpg'}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default VehiclePageVariantC;

