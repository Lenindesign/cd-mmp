import {
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ExternalLink } from 'lucide-react';
import {
  getAllVehicles,
  getVehiclesByMake,
  getAvailableYears,
  getYearDetails,
} from '../../services/vehicleService';
import type { Vehicle } from '../../types/vehicle';
import { getVehicleOffers } from '../../utils/dealCalculations';
import { VehicleCard } from '../../components/VehicleCard';
import AdBanner from '../../components/AdBanner';
import { DEALS_GRID_BREAKER_AD_URL } from '../../constants/dealsLayout';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import '../ToyotaBrandPage/ToyotaBrandPage.css';

interface BrandOfferCounts {
  buying: number;
  leasing: number;
  total?: number;
  buyingBadge?: string;
  leasingBadge?: string;
}

interface BrandHubPageProps {
  make: string;
  brandPath: string;
  description: string;
  logoPath?: string;
  offerCounts: BrandOfferCounts;
  afterSections?: ReactNode;
}

interface BrandSection {
  id: string;
  title: string;
  description: string;
  vehicles: Vehicle[];
}

/** Body styles that roll up into the "Cars" section on the brand hub. */
const CAR_BODY_STYLES = new Set(['Sedan', 'Coupe', 'Hatchback', 'Convertible', 'Wagon']);

/** Official Car and Driver accolade badge URLs, matching VehicleCard. */
const BADGE_URLS = {
  tenBest:
    'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg',
  evOfYear:
    'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ev-of-the-year.721e420.svg',
  editorsChoice:
    'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE',
};

const generateCdSays = (year: string, make: string, model: string): string =>
  `Read our ${year} ${make} ${model} review for information on ratings, pricing, specs, and features.`;

const getCombinedMpg = (mpg?: string): number | undefined => {
  if (!mpg) return undefined;
  const [cityStr, hwyStr] = mpg.split('/');
  const city = parseInt(cityStr ?? '', 10);
  const hwy = parseInt(hwyStr ?? '', 10);
  if (Number.isNaN(city) || Number.isNaN(hwy)) return undefined;
  return Math.round(0.55 * city + 0.45 * hwy);
};

const toModelSlug = (model: string): string =>
  model.toLowerCase().replace(/\s+/g, '-');

const toMakeSlug = (make: string): string =>
  make.toLowerCase().replace(/\s+/g, '-');

const BRAND_RESEARCH_SECTION_ID = 'brand-page-research-title';

const formatList = (items: string[]): string => {
  if (items.length <= 2) return items.join(' and ');
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
};

/**
 * "Research Cars" make/model/year selector that navigates to the global
 * vehicle detail page at `/:year/:make/:model`. Catalog-driven, so new
 * vehicle records update the dropdowns automatically.
 */
const ResearchCarsSelector = () => {
  const navigate = useNavigate();
  const allVehicles = useMemo(() => getAllVehicles(), []);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const makes = useMemo(
    () => Array.from(new Set(allVehicles.map(v => v.make))).sort(),
    [allVehicles],
  );

  const models = useMemo(() => {
    if (!make) return [];
    return Array.from(new Set(allVehicles.filter(v => v.make === make).map(v => v.model))).sort();
  }, [allVehicles, make]);

  const years = useMemo(() => {
    if (!make || !model) return [];
    return allVehicles
      .filter(v => v.make === make && v.model === model)
      .map(v => v.year)
      .sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
  }, [allVehicles, make, model]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const target = allVehicles.find(v => v.make === make && v.model === model && v.year === year);
    if (target) {
      navigate(`/${target.slug}`);
    }
  };

  return (
    <section className="brand-page__research" aria-labelledby="brand-page-research-title">
      <div className="brand-page__research-header">
        <h2 id="brand-page-research-title" className="brand-page__research-title">
          Research Cars
        </h2>
        <p className="brand-page__research-sub">
          Explore Car and Driver&apos;s trusted reviews with exclusive test data and expert insights:
        </p>
      </div>
      <form className="brand-page__research-row" onSubmit={handleSubmit}>
        <label className="brand-page__research-field">
          <span className="brand-page__research-label">Make</span>
          <select
            value={make}
            aria-label="Select Make"
            onChange={e => {
              setMake(e.target.value);
              setModel('');
              setYear('');
            }}
          >
            <option value="">Select Make</option>
            {makes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
        <label className="brand-page__research-field">
          <span className="brand-page__research-label">Model</span>
          <select
            value={model}
            aria-label="Select Model"
            disabled={!make}
            onChange={e => {
              setModel(e.target.value);
              setYear('');
            }}
          >
            <option value="">Select Model</option>
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
        <label className="brand-page__research-field">
          <span className="brand-page__research-label">Year</span>
          <select
            value={year}
            aria-label="Select Year"
            disabled={!model}
            onChange={e => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <button type="submit" className="brand-page__research-submit" disabled={!make || !model || !year}>
          Go
        </button>
      </form>
    </section>
  );
};

const BrandHubPage = ({
  make,
  brandPath,
  description,
  logoPath,
  offerCounts,
  afterSections,
}: BrandHubPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const makeSlug = toMakeSlug(make);
  const [isHeroDescriptionExpanded, setIsHeroDescriptionExpanded] = useState(false);
  const isHeroDescriptionExpandable = description.length > 180;

  const allBrandVehicles = useMemo(() => getVehiclesByMake(make), [make]);

  const latestByModel = useMemo(() => {
    const byModel = new Map<string, Vehicle>();
    for (const vehicle of allBrandVehicles) {
      const key = vehicle.model.toLowerCase();
      const current = byModel.get(key);
      if (!current || parseInt(vehicle.year, 10) > parseInt(current.year, 10)) {
        byModel.set(key, vehicle);
      }
    }
    return Array.from(byModel.values());
  }, [allBrandVehicles]);

  const sections: BrandSection[] = useMemo(() => {
    const byModel = (a: Vehicle, b: Vehicle) => a.model.localeCompare(b.model);
    const raw: BrandSection[] = [
      {
        id: 'cars',
        title: 'Cars',
        description: 'Sedans, coupes, convertibles, hatchbacks, and wagons',
        vehicles: latestByModel.filter(v => CAR_BODY_STYLES.has(v.bodyStyle)).sort(byModel),
      },
      {
        id: 'suvs',
        title: 'SUVs',
        description: 'Full-size, mid-size, compact, subcompact, and off-roaders',
        vehicles: latestByModel.filter(v => v.bodyStyle === 'SUV').sort(byModel),
      },
      {
        id: 'trucks',
        title: 'Trucks',
        description: 'Full-size, mid-size, and compact pickups',
        vehicles: latestByModel.filter(v => v.bodyStyle === 'Truck').sort(byModel),
      },
      {
        id: 'vans',
        title: 'Vans',
        description: 'Minivans, passenger vans, work vans, and cargo vans',
        vehicles: latestByModel
          .filter(v => v.bodyStyle === 'Van' || v.bodyStyle === 'Minivan')
          .sort(byModel),
      },
      {
        id: 'evs',
        title: 'EVs',
        description: 'EV cars, trucks, SUVs, and vans',
        vehicles: latestByModel.filter(v => v.fuelType === 'Electric').sort(byModel),
      },
    ];
    return raw.filter(section => section.vehicles.length > 0);
  }, [latestByModel]);

  const sectionTitleList = useMemo(
    () => formatList(sections.map(section => section.title)),
    [sections],
  );

  const activeSubnavId = useMemo(() => {
    if (!location.hash) return BRAND_RESEARCH_SECTION_ID;

    const rawHash = location.hash.slice(1);
    try {
      return decodeURIComponent(rawHash);
    } catch {
      return rawHash;
    }
  }, [location.hash]);

  const getSubnavLinkClass = (id: string) =>
    `brand-page__subnav-link${activeSubnavId === id ? ' brand-page__subnav-link--active' : ''}`;

  const breadcrumbJsonLd = useMemo(
    () =>
      createBreadcrumbStructuredData([
        { name: 'Home', url: '/' },
        { name: make, url: brandPath },
      ]),
    [brandPath, make],
  );

  return (
    <div className="brand-page">
      <SEO
        title={`${make} Models — Explore ${make}'s Lineup${sectionTitleList ? ` of ${sectionTitleList}` : ''}`}
        description={`Explore the full ${make} lineup at Car and Driver, with expert reviews, ratings, starting prices, and fuel economy for every current ${make} model.`}
        canonical={brandPath}
        structuredData={breadcrumbJsonLd}
      />

      <header className="brand-page__hero">
        {logoPath && (
          <img
            className="brand-page__hero-watermark"
            src={logoPath}
            alt=""
            aria-hidden="true"
          />
        )}
        <div className="container">
          <div className="brand-page__hero-content">
            <nav aria-label="Breadcrumb" className="brand-page__breadcrumb">
              <Link to="/" className="brand-page__breadcrumb-link">Home</Link>
              <span className="brand-page__breadcrumb-sep" aria-hidden>/</span>
              <span className="brand-page__breadcrumb-current">{make}</span>
            </nav>
            <h1 className="brand-page__title">{make}</h1>
            <div className="brand-page__description-wrap">
              <p
                className={`brand-page__description${isHeroDescriptionExpandable && !isHeroDescriptionExpanded ? ' brand-page__description--clamped' : ''}`}
                id="brand-hero-description"
              >
                {description}
              </p>
              {isHeroDescriptionExpandable && (
                <button
                  type="button"
                  className="brand-page__description-toggle"
                  onClick={() => setIsHeroDescriptionExpanded((expanded) => !expanded)}
                  aria-expanded={isHeroDescriptionExpanded}
                  aria-controls="brand-hero-description"
                >
                  <span>{isHeroDescriptionExpanded ? 'Read less' : 'Read more'}</span>
                  {!isHeroDescriptionExpanded && <ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />}
                </button>
              )}
            </div>
            {(offerCounts.buying > 0 || offerCounts.leasing > 0) && (
              <div className="brand-page__hero-offers" aria-label={`${make} deals and incentives`}>
                {offerCounts.buying > 0 && (
                  <Link to={`/${makeSlug}/deals-incentives`} className="brand-page__hero-offer-link">
                    <span className="brand-page__hero-offer-main">
                      <span className="brand-page__hero-offer-chip">BUY</span>
                      <span className="brand-page__hero-offer-copy">
                        <span>See All {make} Buying Deals</span>
                      </span>
                    </span>
                  </Link>
                )}
                {offerCounts.buying > 0 && offerCounts.leasing > 0 && (
                  <span className="brand-page__hero-offers-divider" aria-hidden="true" />
                )}
                {offerCounts.leasing > 0 && (
                  <Link to={`/${makeSlug}/lease-deals`} className="brand-page__hero-offer-link">
                    <span className="brand-page__hero-offer-main">
                      <span className="brand-page__hero-offer-chip">LEASE</span>
                      <span className="brand-page__hero-offer-copy">
                        <span>See All {make} Leasing Deals</span>
                      </span>
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="brand-page__subnav" aria-label={`${make} page sections`}>
        <div className="container brand-page__subnav-inner">
          <div className="brand-page__subnav-track">
            <a
              className={getSubnavLinkClass(BRAND_RESEARCH_SECTION_ID)}
              href={`#${BRAND_RESEARCH_SECTION_ID}`}
              aria-current={activeSubnavId === BRAND_RESEARCH_SECTION_ID ? 'location' : undefined}
            >
              Research
            </a>
            {sections.map(section => {
              const isActive = activeSubnavId === section.id;
              return (
                <a
                  key={section.id}
                  className={getSubnavLinkClass(section.id)}
                  href={`#${section.id}`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {section.title}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="brand-page__breaker-ad" role="complementary" aria-label="Advertisement">
          <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" hideHeader hideLine />
        </div>

        <div className="brand-page__featured-row">
          <div className="brand-page__featured-main">
            <ResearchCarsSelector />

            <section className="brand-page__legend" aria-label="Rating legend">
              <h2 className="brand-page__legend-title">
                <em>Car and Driver</em> Rating and Accolades
              </h2>
              <p className="brand-page__legend-sub">
                Look for these icons to identify which models are at the top of their class.
              </p>
              <ul className="brand-page__legend-items">
                <li className="brand-page__legend-item">
                  <img src={BADGE_URLS.tenBest} alt="" className="brand-page__legend-icon" />
                  <span className="brand-page__legend-label">10Best</span>
                </li>
                <li className="brand-page__legend-item">
                  <img src={BADGE_URLS.evOfYear} alt="" className="brand-page__legend-icon" />
                  <span className="brand-page__legend-label">EV of the Year</span>
                </li>
                <li className="brand-page__legend-item">
                  <img
                    src={BADGE_URLS.editorsChoice}
                    alt=""
                    className="brand-page__legend-icon brand-page__legend-icon--dark"
                  />
                  <span className="brand-page__legend-label">Editors&apos; Choice</span>
                </li>
                <li className="brand-page__legend-item">
                  <span className="brand-page__legend-rating" aria-hidden>
                    <span className="brand-page__legend-rating-inner">
                      <span className="brand-page__legend-rating-num">10</span>
                      <span className="brand-page__legend-rating-denom">/10</span>
                    </span>
                  </span>
                  <span className="brand-page__legend-label">C/D Rating</span>
                </li>
              </ul>
            </section>

            <aside className="brand-page__native-ad" aria-label="Sponsored">
              <span className="brand-page__native-ad-badge">Ad</span>
              <div className="brand-page__native-ad-logo">
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/nissan-brand-logo-1200x938-1594842787.jpg?crop=0.783xw:1.00xh;0.109xw,0&resize=1200:*"
                  alt="Nissan"
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <p className="brand-page__native-ad-copy">
                <span className="brand-page__native-ad-tagline">Style that captivates. Comfort that restores.</span>
                <span className="brand-page__native-ad-vehicle">2026 Nissan Murano.</span>
              </p>
              <a
                href="#"
                className="brand-page__native-ad-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                EXPLORE DEALS
                <ExternalLink size={14} aria-hidden />
              </a>
            </aside>
          </div>
          <aside className="brand-page__featured-ad" aria-label="Advertisement">
            <span className="brand-page__featured-ad-label">Advertisement</span>
            <a
              href="#"
              className="brand-page__featured-ad-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://d2kde5ohu8qb21.cloudfront.net/files/69387d364230820002694996/300x600.jpg"
                alt="Advertisement"
                width={300}
                height={600}
                className="brand-page__featured-ad-image"
              />
            </a>
          </aside>
        </div>

        {sections.map(section => (
          <section key={section.id} id={section.id} className="brand-page__section">
            <div className="brand-page__section-header">
              <h2 className="brand-page__section-title">{section.title}</h2>
              <p className="brand-page__section-description">{section.description}</p>
            </div>
            <div className="brand-page__grid">
              {section.vehicles.map(vehicle => {
                const yearDetails = getYearDetails(vehicle.make, vehicle.model);
                const availableYears = getAvailableYears(vehicle.make, vehicle.model).map(y => parseInt(y, 10));
                const offers = getVehicleOffers(vehicle.make, vehicle.model);
                return (
                  <VehicleCard
                    key={vehicle.id}
                    id={vehicle.id}
                    name={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    slug={vehicle.slug}
                    image={vehicle.image}
                    bodyStyle={vehicle.bodyStyle}
                    price={`$${vehicle.priceMin.toLocaleString()}`}
                    rating={vehicle.staffRating}
                    editorsChoice={vehicle.editorsChoice}
                    tenBest={vehicle.tenBest}
                    evOfTheYear={vehicle.evOfTheYear}
                    epaMpg={getCombinedMpg(vehicle.mpg)}
                    cdSays={generateCdSays(vehicle.year, vehicle.make, vehicle.model)}
                    modelName={vehicle.model}
                    showShopButton
                    showSaveButton
                    shopButtonText={`SHOP NEW ${vehicle.model.toUpperCase()}`}
                    shopButtonVariant="primary"
                    onShopClick={() => navigate(`/${vehicle.slug}`)}
                    availableYears={availableYears}
                    yearDetails={yearDetails}
                    incentiveCount={offers.length}
                    onIncentiveClick={() =>
                      navigate(`/${vehicle.make.toLowerCase()}/${toModelSlug(vehicle.model)}/deals-incentives`)
                    }
                  />
                );
              })}
            </div>
          </section>
        ))}

        {afterSections}
      </div>
    </div>
  );
};

export default BrandHubPage;
