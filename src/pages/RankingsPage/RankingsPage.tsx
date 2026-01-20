import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Bookmark } from 'lucide-react';
import { getAllVehicles } from '../../services/vehicleService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { VehicleCard } from '../../components/VehicleCard';
import { SEO } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import { GoogleOneTap } from '../../components/GoogleOneTap';
import { useGoogleOneTap } from '../../hooks/useGoogleOneTap';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import './RankingsPage.css';

// Body style icons
const BODY_STYLE_ICONS: Record<string, string> = {
  suv: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suv-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*',
  sedan: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sedans-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*',
  truck: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/trucks-1585158794.png?crop=1.00xw:0.502xh;0,0.236xh&resize=180:*',
  coupe: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sportscar-1585158794.png?crop=1.00xw:0.502xh;0,0.255xh&resize=180:*',
  convertible: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/convertibles-1585158793.png?crop=1.00xw:0.502xh;0,0.258xh&resize=180:*',
  wagon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/wagons-1585158795.png?crop=1.00xw:0.502xh;0,0.244xh&resize=180:*',
  hatchback: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/crossovers-1585158793.png?crop=1.00xw:0.502xh;0,0.244xh&resize=180:*',
};

// Body style configuration with subcategories
const BODY_STYLE_CONFIG: Record<string, {
  title: string;
  description: string;
  subcategories: { id: string; name: string; filter: (v: any) => boolean }[];
}> = {
  suv: {
    title: 'Best SUVs',
    description: 'Our experts have tested and ranked every SUV on the market. From compact crossovers to full-size family haulers, find the perfect SUV for your needs.',
    subcategories: [
      { id: 'compact', name: 'Best Compact SUVs', filter: (v) => v.priceMin < 35000 },
      { id: 'midsize', name: 'Best Midsize SUVs', filter: (v) => v.priceMin >= 35000 && v.priceMin < 50000 },
      { id: 'luxury', name: 'Best Luxury SUVs', filter: (v) => v.priceMin >= 50000 },
      { id: 'family', name: 'Best SUVs for Families', filter: () => true }, // All SUVs qualify
      { id: 'offroad', name: 'Best Off-Road SUVs', filter: (v) => ['Jeep', 'Land Rover', 'Toyota', 'Ford'].includes(v.make) },
    ],
  },
  sedan: {
    title: 'Best Sedans',
    description: 'From efficient commuters to powerful sports sedans, discover the top-rated sedans tested by our experts.',
    subcategories: [
      { id: 'compact', name: 'Best Compact Sedans', filter: (v) => v.priceMin < 30000 },
      { id: 'midsize', name: 'Best Midsize Sedans', filter: (v) => v.priceMin >= 30000 && v.priceMin < 45000 },
      { id: 'luxury', name: 'Best Luxury Sedans', filter: (v) => v.priceMin >= 45000 },
      { id: 'sport', name: 'Best Sports Sedans', filter: (v) => ['BMW', 'Audi', 'Mercedes-Benz', 'Alfa Romeo'].includes(v.make) },
    ],
  },
  truck: {
    title: 'Best Trucks',
    description: 'Whether you need a workhorse or a lifestyle vehicle, find the best pickup trucks ranked by our experts.',
    subcategories: [
      { id: 'midsize', name: 'Best Midsize Trucks', filter: (v) => v.priceMin < 40000 },
      { id: 'fullsize', name: 'Best Full-Size Trucks', filter: (v) => v.priceMin >= 40000 && v.priceMin < 60000 },
      { id: 'heavy', name: 'Best Heavy-Duty Trucks', filter: (v) => v.priceMin >= 60000 },
      { id: 'electric', name: 'Best Electric Trucks', filter: (v) => ['Rivian', 'Ford', 'Chevrolet', 'GMC'].includes(v.make) && v.priceMin >= 50000 },
    ],
  },
  coupe: {
    title: 'Best Coupes',
    description: 'Sleek, stylish, and sporty. Discover the best coupes for driving enthusiasts.',
    subcategories: [
      { id: 'sports', name: 'Best Sports Coupes', filter: (v) => v.priceMin < 50000 },
      { id: 'luxury', name: 'Best Luxury Coupes', filter: (v) => v.priceMin >= 50000 },
      { id: 'performance', name: 'Best Performance Coupes', filter: (v) => ['Porsche', 'BMW', 'Mercedes-AMG', 'Chevrolet'].includes(v.make) },
    ],
  },
  convertible: {
    title: 'Best Convertibles',
    description: 'Open-air driving at its finest. Find the perfect convertible for sunny days ahead.',
    subcategories: [
      { id: 'affordable', name: 'Best Affordable Convertibles', filter: (v) => v.priceMin < 50000 },
      { id: 'luxury', name: 'Best Luxury Convertibles', filter: (v) => v.priceMin >= 50000 },
    ],
  },
  wagon: {
    title: 'Best Wagons',
    description: 'The practical choice for those who want space without sacrificing driving dynamics.',
    subcategories: [
      { id: 'all', name: 'All Wagons Ranked', filter: () => true },
    ],
  },
  hatchback: {
    title: 'Best Hatchbacks',
    description: 'Versatile, efficient, and fun to drive. Discover the best hatchbacks on the market.',
    subcategories: [
      { id: 'all', name: 'All Hatchbacks Ranked', filter: () => true },
    ],
  },
};

// Helper to calculate combined MPG
const getCombinedMpg = (mpg?: string): number | undefined => {
  if (!mpg) return undefined;
  const parts = mpg.split('/');
  if (parts.length !== 2) return undefined;
  const city = parseInt(parts[0], 10);
  const highway = parseInt(parts[1], 10);
  if (isNaN(city) || isNaN(highway)) return undefined;
  return Math.round(0.55 * city + 0.45 * highway);
};

// Helper to generate C/D Says description
const generateCdSays = (year: string, make: string, model: string): string => {
  return `Read our ${year} ${make} ${model} review for information on ratings, pricing, specs, and features.`;
};

const RankingsPage = () => {
  const { bodyStyle, subcategory } = useParams<{ bodyStyle: string; subcategory?: string }>();
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated: isAuthContextAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();

  // Google One Tap integration for high-intent rankings page
  const { shouldShowOneTap, isAuthenticated: isOneTapAuthenticated } = useGoogleOneTap({
    pageType: 'rankings',
  });

  // Combined authentication state
  const isAuthenticated = isAuthContextAuthenticated || isOneTapAuthenticated;

  // State for sign-in modal
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);

  // Get config for current body style
  const config = bodyStyle ? BODY_STYLE_CONFIG[bodyStyle.toLowerCase()] : null;

  // Check if a vehicle is saved
  const isVehicleSaved = (vehicleName: string) => {
    return user?.savedVehicles?.some(v => v.name === vehicleName) || false;
  };

  // Handle save click for hero cards
  const handleSaveClick = (e: React.MouseEvent, vehicle: { name: string; slug: string; image?: string }) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      setPendingSaveVehicle(vehicle);
      setShowSignInModal(true);
      return;
    }
    
    const isSaved = isVehicleSaved(vehicle.name);
    if (isSaved) {
      const savedVehicle = user?.savedVehicles?.find(v => v.name === vehicle.name);
      if (savedVehicle) {
        removeSavedVehicle(savedVehicle.id);
      }
    } else {
      addSavedVehicle({
        id: vehicle.slug,
        name: vehicle.name,
        ownership: 'want',
      });
    }
  };

  // Get vehicle rating helper
  const getVehicleRating = (vehicle: { id: string; bodyStyle: string; staffRating: number }): number => {
    return getSupabaseRating(vehicle.id, getCategory(vehicle.bodyStyle), vehicle.staffRating);
  };

  // Get all vehicles for this body style
  const allVehicles = useMemo(() => {
    if (!bodyStyle) return [];
    
    const vehicles = getAllVehicles()
      .filter(v => v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase())
      .filter(v => parseInt(v.year) >= 2024); // Include 2024+ vehicles
    
    // Sort by rating
    return vehicles.sort((a, b) => getVehicleRating(b) - getVehicleRating(a));
  }, [bodyStyle, getSupabaseRating]);

  // Get subcategory vehicles if subcategory is specified
  const subcategoryConfig = subcategory && config
    ? config.subcategories.find(s => s.id === subcategory)
    : null;

  const displayVehicles = useMemo(() => {
    if (subcategoryConfig) {
      return allVehicles.filter(subcategoryConfig.filter);
    }
    return allVehicles;
  }, [allVehicles, subcategoryConfig]);

  // Format vehicles for display
  const formattedVehicles = useMemo(() => {
    return displayVehicles.slice(0, 20).map((vehicle, index) => ({
      id: vehicle.id,
      rank: index + 1,
      name: `${vehicle.make} ${vehicle.model}`,
      year: vehicle.year,
      price: `$${vehicle.priceMin.toLocaleString()}`,
      image: vehicle.image,
      rating: getVehicleRating(vehicle),
      slug: vehicle.slug,
      editorsChoice: vehicle.editorsChoice,
      tenBest: vehicle.tenBest,
      epaMpg: getCombinedMpg(vehicle.mpg),
      cdSays: generateCdSays(vehicle.year, vehicle.make, vehicle.model),
      modelName: vehicle.model,
    }));
  }, [displayVehicles, getSupabaseRating]);

  // Get top vehicle and count for each body style category (for landing page)
  const categoryData = useMemo(() => {
    const result: Record<string, { 
      topVehicle: { name: string; year: string; image: string } | null;
      count: number;
    }> = {};
    
    Object.keys(BODY_STYLE_CONFIG).forEach((key) => {
      const vehicles = getAllVehicles()
        .filter(v => v.bodyStyle.toLowerCase() === key.toLowerCase())
        .filter(v => parseInt(v.year) >= 2024)
        .sort((a, b) => getVehicleRating(b) - getVehicleRating(a));
      
      result[key] = {
        topVehicle: vehicles.length > 0 ? {
          name: `${vehicles[0].make} ${vehicles[0].model}`,
          year: vehicles[0].year,
          image: vehicles[0].image,
        } : null,
        count: vehicles.length,
      };
    });
    
    return result;
  }, [getSupabaseRating]);

  // Calculate total vehicles ranked
  const totalVehiclesRanked = useMemo(() => {
    return Object.values(categoryData).reduce((sum, cat) => sum + cat.count, 0);
  }, [categoryData]);

  // Get top 3 vehicles for each subcategory (for main body style page)
  // Must be before early return to maintain hook order
  const subcategoryVehicles = useMemo(() => {
    if (!config || subcategory) return null; // Don't compute if no config or on a subcategory page
    
    return config.subcategories.map((sub) => {
      const filtered = allVehicles
        .filter(sub.filter)
        .slice(0, 3)
        .map((vehicle, index) => ({
          id: vehicle.id,
          rank: index + 1,
          name: `${vehicle.make} ${vehicle.model}`,
          year: vehicle.year,
          price: `$${vehicle.priceMin.toLocaleString()}`,
          image: vehicle.image,
          rating: getVehicleRating(vehicle),
          slug: vehicle.slug,
          editorsChoice: vehicle.editorsChoice,
          tenBest: vehicle.tenBest,
          epaMpg: getCombinedMpg(vehicle.mpg),
          cdSays: generateCdSays(vehicle.year, vehicle.make, vehicle.model),
          modelName: vehicle.model,
        }));
      
      return {
        ...sub,
        vehicles: filtered,
        totalCount: allVehicles.filter(sub.filter).length,
      };
    }).filter(sub => sub.vehicles.length > 0);
  }, [allVehicles, config, subcategory, getSupabaseRating]);

  // If no config found, show 404-like state
  if (!config) {
    return (
      <div className="rankings-page">
        <SEO title="Rankings | Car and Driver" />
        
        {/* Google One Tap for non-authenticated users */}
        {shouldShowOneTap && (
          <GoogleOneTap
            pageType="rankings"
            isAuthenticated={isAuthenticated}
          />
        )}
        <div className="rankings-page__hero rankings-page__hero--landing">
          <div className="container">
            <div className="rankings-page__hero-content">
              <div className="rankings-page__hero-badge">
                <img 
                  src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                  alt="10Best"
                  className="rankings-page__hero-icon"
                />
                <span>Expert Rankings</span>
              </div>
              <h1 className="rankings-page__title">Find Your Perfect Car</h1>
              <p className="rankings-page__description">
                Every vehicle tested, rated, and ranked by our expert editors. 
                From fuel-efficient commuters to powerful sports cars—discover the best in every category.
              </p>
              <div className="rankings-page__hero-stats">
                <div className="rankings-page__hero-stat">
                  <span className="rankings-page__hero-stat-value">{totalVehiclesRanked}</span>
                  <span className="rankings-page__hero-stat-label">Vehicles Ranked</span>
                </div>
                <div className="rankings-page__hero-stat">
                  <span className="rankings-page__hero-stat-value">{Object.keys(BODY_STYLE_CONFIG).length}</span>
                  <span className="rankings-page__hero-stat-label">Categories</span>
                </div>
                <div className="rankings-page__hero-stat">
                  <span className="rankings-page__hero-stat-value">2025</span>
                  <span className="rankings-page__hero-stat-label">Model Year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="rankings-page__categories-header">
            <h2 className="rankings-page__categories-title">Browse by Category</h2>
            <p className="rankings-page__categories-subtitle">Select a category to see our complete rankings</p>
          </div>
          <div className="rankings-page__categories">
            {Object.entries(BODY_STYLE_CONFIG).map(([key, value]) => {
              const { topVehicle, count } = categoryData[key];
              return (
                <Link key={key} to={`/rankings/${key}`} className="rankings-page__category-card">
                  <div className="rankings-page__category-card-inner">
                    {topVehicle && (
                      <div className="rankings-page__category-image-wrapper">
                        <img 
                          src={topVehicle.image}
                          alt={topVehicle.name}
                          className="rankings-page__category-image"
                        />
                        <span className="rankings-page__category-rank">1</span>
                      </div>
                    )}
                    <div className="rankings-page__category-content">
                      <div className="rankings-page__category-badge">
                        <img 
                          src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                          alt="10Best"
                          className="rankings-page__category-icon"
                        />
                        <span>10BEST</span>
                      </div>
                      {BODY_STYLE_ICONS[key] && (
                        <img 
                          src={BODY_STYLE_ICONS[key]} 
                          alt="" 
                          className="rankings-page__category-title-icon"
                        />
                      )}
                      <h3 className="rankings-page__category-title">{value.title}</h3>
                      {topVehicle && (
                        <p className="rankings-page__category-top">
                          {topVehicle.year} {topVehicle.name}
                        </p>
                      )}
                      <span className="rankings-page__category-count">{count} vehicles ranked</span>
                    </div>
                  </div>
                  <div className="rankings-page__category-hover">
                    <span>View Rankings</span>
                    <ChevronRight size={18} />
                  </div>
                  <ChevronRight size={24} className="rankings-page__category-arrow" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const pageTitle = subcategoryConfig ? subcategoryConfig.name : config.title;

  return (
    <div className="rankings-page">
      <SEO 
        title={`${pageTitle} | Car and Driver Rankings`}
        description={config.description}
      />
      
      {/* Google One Tap for non-authenticated users */}
      {shouldShowOneTap && (
        <GoogleOneTap
          pageType="rankings"
          isAuthenticated={isAuthenticated}
        />
      )}

      {/* Hero Section */}
      <div className="rankings-page__hero">
        <div className="container">
          <div className="rankings-page__hero-content">
            <div className="rankings-page__hero-badge">
              <img 
                src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg" 
                alt="10Best"
                className="rankings-page__hero-icon"
              />
              <span>Expert Rankings</span>
            </div>
            <h1 className="rankings-page__title">{pageTitle}</h1>
            <p className="rankings-page__description">{config.description}</p>
            <p className="rankings-page__count">
              <strong>{allVehicles.length}</strong> vehicles ranked
            </p>
          </div>
        </div>
      </div>

      {/* Subcategory Anchor Navigation - only show on main body style page */}
      {!subcategory && config && (
        <div className="rankings-page__subnav rankings-page__subnav--sticky">
          <div className="container">
            <div className="rankings-page__subnav-pills">
              {subcategoryVehicles && subcategoryVehicles.length > 0 && subcategoryVehicles.map((sub) => (
                <a 
                  key={sub.id} 
                  href={`#${sub.id}`}
                  className="rankings-page__subnav-pill"
                >
                  {sub.name.replace('Best ', '')}
                </a>
              ))}
              {subcategoryVehicles && subcategoryVehicles.length > 0 && (
                <div className="rankings-page__subnav-divider"></div>
              )}
              {Object.entries(BODY_STYLE_CONFIG)
                .filter(([key]) => key !== bodyStyle?.toLowerCase())
                .map(([key, value]) => (
                  <Link 
                    key={key} 
                    to={`/rankings/${key}`}
                    className="rankings-page__subnav-pill rankings-page__subnav-pill--body-style"
                  >
                    {BODY_STYLE_ICONS[key] && (
                      <img 
                        src={BODY_STYLE_ICONS[key]} 
                        alt="" 
                        className="rankings-page__subnav-pill-icon"
                      />
                    )}
                    {value.title}
                  </Link>
                ))}
            </div>
            {/* Scroll indicator button */}
            <button 
              className="rankings-page__subnav-scroll-btn"
              onClick={(e) => {
                const container = e.currentTarget.parentElement;
                const pills = container?.querySelector('.rankings-page__subnav-pills');
                if (pills) {
                  pills.scrollBy({ left: 200, behavior: 'smooth' });
                }
              }}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="rankings-page__content">
        <div className="container">
          <div className="rankings-page__layout">
            <div className="rankings-page__main">
              
              {/* MAIN BODY STYLE PAGE: Show top 3 from each subcategory */}
              {!subcategory && subcategoryVehicles && subcategoryVehicles.map((sub) => (
                <section 
                  key={sub.id} 
                  id={sub.id} 
                  className="rankings-page__subcategory-section"
                >
                  <div className="rankings-page__subcategory-header">
                    <h2 className="rankings-page__subcategory-title">{sub.name}</h2>
                    <Link 
                      to={`/rankings/${bodyStyle}/${sub.id}`}
                      className="rankings-page__subcategory-more"
                    >
                      See all {sub.totalCount} vehicles
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                  
                  {/* #1 Hero Card */}
                  {sub.vehicles.length >= 1 && (
                    <div className="rankings-page__hero-card rankings-page__hero-card--subcategory">
                      <Link to={`/${sub.vehicles[0].slug}`} className="rankings-page__hero-card-content">
                        <div className="rankings-page__hero-card-header">
                          <h3 className="rankings-page__hero-card-title">
                            {sub.vehicles[0].year} {sub.vehicles[0].name}
                          </h3>
                          <div className="rankings-page__hero-card-rating">
                            <div className="rankings-page__hero-card-rating-score">
                              <span className="rankings-page__hero-card-rating-value">{sub.vehicles[0].rating}</span>
                              <span className="rankings-page__hero-card-rating-max">/10</span>
                            </div>
                            <span className="rankings-page__hero-card-rating-label">C/D RATING</span>
                          </div>
                        </div>
                        <div className="rankings-page__hero-card-image-container">
                          <div className="rankings-page__hero-card-rank-container">
                            <div className="rankings-page__hero-card-rank rankings-page__hero-card-rank--first">1</div>
                            <button
                              className={`rankings-page__hero-card-save ${isVehicleSaved(`${sub.vehicles[0].year} ${sub.vehicles[0].name}`) ? 'rankings-page__hero-card-save--saved' : ''}`}
                              onClick={(e) => handleSaveClick(e, { name: `${sub.vehicles[0].year} ${sub.vehicles[0].name}`, slug: sub.vehicles[0].slug, image: sub.vehicles[0].image })}
                              aria-label={isVehicleSaved(`${sub.vehicles[0].year} ${sub.vehicles[0].name}`) ? 'Remove from saved' : 'Save vehicle'}
                            >
                              <Bookmark size={18} fill={isVehicleSaved(`${sub.vehicles[0].year} ${sub.vehicles[0].name}`) ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                          <img 
                            src={sub.vehicles[0].image} 
                            alt={sub.vehicles[0].name}
                            className="rankings-page__hero-card-image"
                          />
                        </div>
                        <div className="rankings-page__hero-card-details">
                          <div className="rankings-page__hero-card-price-row">
                            <div className="rankings-page__hero-card-price">
                              <span className="rankings-page__hero-card-price-label">Starting at</span>
                              <span className="rankings-page__hero-card-price-value">{sub.vehicles[0].price}</span>
                            </div>
                            <div className="rankings-page__hero-card-mpg">
                              <span className="rankings-page__hero-card-mpg-label">EPA MPG</span>
                              <span className="rankings-page__hero-card-mpg-value">
                                {sub.vehicles[0].epaMpg ? (
                                  <>
                                    <strong>{sub.vehicles[0].epaMpg}</strong>
                                    <span className="rankings-page__hero-card-mpg-unit">combined</span>
                                  </>
                                ) : 'N/A'}
                              </span>
                            </div>
                            {(sub.vehicles[0].tenBest || sub.vehicles[0].editorsChoice) && (
                              <>
                                <div className="rankings-page__hero-card-divider"></div>
                                <div className="rankings-page__hero-card-badges">
                                  {sub.vehicles[0].tenBest && (
                                    <div className="rankings-page__hero-card-badge-item">
                                      <img 
                                        src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                                        alt="10Best"
                                        className="rankings-page__hero-card-badge"
                                      />
                                      <span className="rankings-page__hero-card-badge-label">10Best</span>
                                    </div>
                                  )}
                                  {sub.vehicles[0].editorsChoice && (
                                    <div className="rankings-page__hero-card-badge-item">
                                      <img 
                                        src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE"
                                        alt="Editor's Choice"
                                        className="rankings-page__hero-card-badge"
                                      />
                                      <span className="rankings-page__hero-card-badge-label">Editor's Choice</span>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                            <button className="rankings-page__hero-card-cta">
                              {parseInt(sub.vehicles[0].year) >= 2025 ? 'SHOP NEW' : 'SHOP USED'} {sub.vehicles[0].modelName.toUpperCase()}
                            </button>
                          </div>
                          <div className="rankings-page__hero-card-cdsays">
                            <span className="rankings-page__hero-card-cdsays-label">C/D SAYS:</span>
                            <span className="rankings-page__hero-card-cdsays-text">
                              {sub.vehicles[0].cdSays} <span className="rankings-page__hero-card-cdsays-link">Learn More</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* #2 and #3 Cards */}
                  {sub.vehicles.length > 1 && (
                    <div className="rankings-page__subcategory-grid">
                      {sub.vehicles.slice(1).map((vehicle) => (
                        <VehicleCard
                          key={vehicle.id}
                          id={vehicle.id}
                          name={vehicle.name}
                          slug={vehicle.slug}
                          image={vehicle.image}
                          price={vehicle.price}
                          rating={vehicle.rating}
                          rank={vehicle.rank}
                          editorsChoice={vehicle.editorsChoice}
                          tenBest={vehicle.tenBest}
                          showShopButton={true}
                          showSaveButton={true}
                          shopButtonText={`${parseInt(vehicle.year) >= 2025 ? 'SHOP NEW' : 'SHOP USED'} ${vehicle.modelName.toUpperCase()}`}
                          shopButtonVariant="outline"
                          epaMpg={vehicle.epaMpg}
                          cdSays={vehicle.cdSays}
                          modelName={vehicle.modelName}
                        />
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {/* SUBCATEGORY PAGE: Show full list */}
              {subcategory && (
                <>
                  {/* #1 Hero Card */}
                  {formattedVehicles.length >= 1 && (
                    <section className="rankings-page__hero-card">
                      <div className="rankings-page__hero-card-label">{subcategoryConfig?.name || 'Top Pick'}</div>
                      <Link to={`/${formattedVehicles[0].slug}`} className="rankings-page__hero-card-content">
                        <div className="rankings-page__hero-card-header">
                          <h2 className="rankings-page__hero-card-title">
                            {formattedVehicles[0].year} {formattedVehicles[0].name}
                          </h2>
                          <div className="rankings-page__hero-card-rating">
                            <div className="rankings-page__hero-card-rating-score">
                              <span className="rankings-page__hero-card-rating-value">{formattedVehicles[0].rating}</span>
                              <span className="rankings-page__hero-card-rating-max">/10</span>
                            </div>
                            <span className="rankings-page__hero-card-rating-label">C/D RATING</span>
                          </div>
                        </div>
                        <div className="rankings-page__hero-card-image-container">
                          <div className="rankings-page__hero-card-rank-container">
                            <div className="rankings-page__hero-card-rank rankings-page__hero-card-rank--first">1</div>
                            <button
                              className={`rankings-page__hero-card-save ${isVehicleSaved(`${formattedVehicles[0].year} ${formattedVehicles[0].name}`) ? 'rankings-page__hero-card-save--saved' : ''}`}
                              onClick={(e) => handleSaveClick(e, { name: `${formattedVehicles[0].year} ${formattedVehicles[0].name}`, slug: formattedVehicles[0].slug, image: formattedVehicles[0].image })}
                              aria-label={isVehicleSaved(`${formattedVehicles[0].year} ${formattedVehicles[0].name}`) ? 'Remove from saved' : 'Save vehicle'}
                            >
                              <Bookmark size={18} fill={isVehicleSaved(`${formattedVehicles[0].year} ${formattedVehicles[0].name}`) ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                          <img 
                            src={formattedVehicles[0].image} 
                            alt={formattedVehicles[0].name}
                            className="rankings-page__hero-card-image"
                          />
                        </div>
                        <div className="rankings-page__hero-card-details">
                          <div className="rankings-page__hero-card-price-row">
                            <div className="rankings-page__hero-card-price">
                              <span className="rankings-page__hero-card-price-label">Starting at</span>
                              <span className="rankings-page__hero-card-price-value">{formattedVehicles[0].price}</span>
                            </div>
                            <div className="rankings-page__hero-card-mpg">
                              <span className="rankings-page__hero-card-mpg-label">EPA MPG</span>
                              <span className="rankings-page__hero-card-mpg-value">
                                {formattedVehicles[0].epaMpg ? (
                                  <>
                                    <strong>{formattedVehicles[0].epaMpg}</strong>
                                    <span className="rankings-page__hero-card-mpg-unit">combined</span>
                                  </>
                                ) : 'N/A'}
                              </span>
                            </div>
                            {(formattedVehicles[0].tenBest || formattedVehicles[0].editorsChoice) && (
                              <>
                                <div className="rankings-page__hero-card-divider"></div>
                                <div className="rankings-page__hero-card-badges">
                                  {formattedVehicles[0].tenBest && (
                                    <div className="rankings-page__hero-card-badge-item">
                                      <img 
                                        src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                                        alt="10Best"
                                        className="rankings-page__hero-card-badge"
                                      />
                                      <span className="rankings-page__hero-card-badge-label">10Best</span>
                                    </div>
                                  )}
                                  {formattedVehicles[0].editorsChoice && (
                                    <div className="rankings-page__hero-card-badge-item">
                                      <img 
                                        src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE"
                                        alt="Editor's Choice"
                                        className="rankings-page__hero-card-badge"
                                      />
                                      <span className="rankings-page__hero-card-badge-label">Editor's Choice</span>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                            <button className="rankings-page__hero-card-cta">
                              {parseInt(formattedVehicles[0].year) >= 2025 ? 'SHOP NEW' : 'SHOP USED'} {formattedVehicles[0].modelName.toUpperCase()}
                            </button>
                          </div>
                          <div className="rankings-page__hero-card-cdsays">
                            <span className="rankings-page__hero-card-cdsays-label">C/D SAYS:</span>
                            <span className="rankings-page__hero-card-cdsays-text">
                              {formattedVehicles[0].cdSays} <span className="rankings-page__hero-card-cdsays-link">Learn More</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </section>
                  )}

                  {/* Full Rankings List */}
                  <section className="rankings-page__full-list">
                    <h2 className="rankings-page__section-title">
                      <img 
                        src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                        alt="10Best"
                        className="rankings-page__section-icon"
                      />
                      All {subcategoryConfig?.name || pageTitle}
                    </h2>
                    <div className="rankings-page__grid">
                      {formattedVehicles.slice(1).map((vehicle) => (
                        <VehicleCard
                          key={vehicle.id}
                          id={vehicle.id}
                          name={vehicle.name}
                          slug={vehicle.slug}
                          image={vehicle.image}
                          price={vehicle.price}
                          rating={vehicle.rating}
                          rank={vehicle.rank}
                          editorsChoice={vehicle.editorsChoice}
                          tenBest={vehicle.tenBest}
                          showShopButton={true}
                          showSaveButton={true}
                          shopButtonText={`${parseInt(vehicle.year) >= 2025 ? 'SHOP NEW' : 'SHOP USED'} ${vehicle.modelName.toUpperCase()}`}
                          shopButtonVariant="outline"
                          epaMpg={vehicle.epaMpg}
                          cdSays={vehicle.cdSays}
                          modelName={vehicle.modelName}
                        />
                      ))}
                    </div>
                  </section>
                </>
              )}

              {/* Empty State */}
              {((subcategory && formattedVehicles.length === 0) || (!subcategory && (!subcategoryVehicles || subcategoryVehicles.length === 0))) && (
                <div className="rankings-page__empty">
                  <img 
                    src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                    alt="10Best"
                    className="rankings-page__empty-icon"
                  />
                  <h3>No vehicles found</h3>
                  <p>We don't have any vehicles in this category yet.</p>
                  <Link to={`/rankings/${bodyStyle}`} className="rankings-page__back-link">
                    View all {config.title}
                  </Link>
                </div>
              )}
            </div>

            {/* Sticky Sidebar Ad */}
            <aside className="rankings-page__sidebar">
              <AdSidebar />
            </aside>
          </div>
        </div>
      </div>

      {/* Related Categories Carousel */}
      <div className="rankings-page__related">
        <div className="container">
          <div className="rankings-page__related-header">
            <h2 className="rankings-page__section-title">Explore Other Rankings</h2>
            <div className="rankings-page__carousel-controls">
              <button 
                className="rankings-page__carousel-btn rankings-page__carousel-btn--prev"
                onClick={() => {
                  const container = document.querySelector('.rankings-page__related-carousel');
                  if (container) container.scrollBy({ left: -280, behavior: 'smooth' });
                }}
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="rankings-page__carousel-btn rankings-page__carousel-btn--next"
                onClick={() => {
                  const container = document.querySelector('.rankings-page__related-carousel');
                  if (container) container.scrollBy({ left: 280, behavior: 'smooth' });
                }}
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="rankings-page__related-carousel">
            {Object.entries(BODY_STYLE_CONFIG).map(([key, value]) => (
              <Link 
                key={key} 
                to={`/rankings/${key}`} 
                className={`rankings-page__related-card ${key === bodyStyle?.toLowerCase() ? 'rankings-page__related-card--active' : ''}`}
              >
                {BODY_STYLE_ICONS[key] && (
                  <img 
                    src={BODY_STYLE_ICONS[key]} 
                    alt="" 
                    className="rankings-page__related-icon"
                  />
                )}
                <h3>{value.title}</h3>
                <span className="rankings-page__related-count">
                  {getAllVehicles().filter(v => v.bodyStyle.toLowerCase() === key).length} vehicles
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sign In to Save Modal */}
      <SignInToSaveModal
        isOpen={showSignInModal}
        onClose={() => {
          setShowSignInModal(false);
          setPendingSaveVehicle(null);
        }}
        itemType="vehicle"
        itemName={pendingSaveVehicle?.name}
        itemImage={pendingSaveVehicle?.image}
      />
    </div>
  );
};

export default RankingsPage;

