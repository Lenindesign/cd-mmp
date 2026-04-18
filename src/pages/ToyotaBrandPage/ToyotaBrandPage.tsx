import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ExternalLink } from 'lucide-react';
import {
  getAllVehicles,
  getVehiclesByMake,
  getAvailableYears,
  getYearDetails,
} from '../../services/vehicleService';
import type { Vehicle } from '../../types/vehicle';
import { getVehicleOffers } from '../../utils/dealCalculations';
import { VehicleCard } from '../../components/VehicleCard';
import ToyotaIncentives from '../../components/ToyotaIncentives/ToyotaIncentives';
import TopRankedGlance from '../../components/TopRankedGlance/TopRankedGlance';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import './ToyotaBrandPage.css';

const MAKE = 'Toyota';
const BRAND_PATH = '/brands/toyota';

/**
 * Editorial blurb sourced from the public caranddriver.com Toyota hub so the
 * lede reads consistently with the design target. Kept as a plain constant
 * since there's no brand-description field on our make entities yet.
 */
const BRAND_DESCRIPTION =
  "Toyota offers a wide range of legendarily reliable vehicles, ranging from the GR86 sports car to the three-row Grand Highlander. The Camry is one of the better mid-size sedans you can buy, while the Tacoma has a well-earned reputation for being a sturdy pickup that isn't afraid to get dirty. The Corolla sedan and the RAV4 SUV are great choices for those seeking economical transportation, but when it comes to fuel economy, the Prius hybrid is king. Read our Toyota reviews below for pricing, specs, and more.";

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

interface BrandSection {
  id: string;
  title: string;
  description: string;
  vehicles: Vehicle[];
}

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

/**
 * "Research Cars" make/model/year selector that navigates to the global
 * vehicle detail page at `/:year/:make/:model`. Catalog-driven — any time
 * we add a new vehicle the dropdowns update automatically.
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
    if (!make) return [] as string[];
    return Array.from(
      new Set(allVehicles.filter(v => v.make === make).map(v => v.model)),
    ).sort();
  }, [allVehicles, make]);
  const years = useMemo(() => {
    if (!make || !model) return [] as string[];
    return Array.from(
      new Set(
        allVehicles
          .filter(v => v.make === make && v.model === model)
          .map(v => v.year),
      ),
    ).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
  }, [allVehicles, make, model]);

  const canGo = Boolean(make && model && year);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canGo) return;
    navigate(`/${year}/${make.toLowerCase()}/${toModelSlug(model)}`);
  };

  return (
    <form className="brand-page__research" onSubmit={handleSubmit}>
      <div className="brand-page__research-header">
        <h2 className="brand-page__research-title">Research Cars</h2>
        <p className="brand-page__research-sub">
          Explore Car and Driver&apos;s trusted reviews with exclusive test data and expert insights:
        </p>
      </div>
      <div className="brand-page__research-row">
        <label className="brand-page__research-field">
          <span className="brand-page__research-label">Make</span>
          <select
            aria-label="Select Make"
            value={make}
            onChange={e => {
              setMake(e.target.value);
              setModel('');
              setYear('');
            }}
          >
            <option value="">Select Make</option>
            {makes.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
        <label className="brand-page__research-field">
          <span className="brand-page__research-label">Model</span>
          <select
            aria-label="Select Model"
            value={model}
            onChange={e => {
              setModel(e.target.value);
              setYear('');
            }}
            disabled={!make}
          >
            <option value="">Select Model</option>
            {models.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
        <label className="brand-page__research-field">
          <span className="brand-page__research-label">Year</span>
          <select
            aria-label="Select Year"
            value={year}
            onChange={e => setYear(e.target.value)}
            disabled={!model}
          >
            <option value="">Select Year</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="brand-page__research-go" disabled={!canGo}>
          GO
        </button>
      </div>
    </form>
  );
};

const ToyotaBrandPage = () => {
  const navigate = useNavigate();
  const allToyotas = useMemo(() => getVehiclesByMake(MAKE), []);

  /**
   * Collapse the catalog to one entry per model family, picking the newest
   * year available. This mirrors the source brand hub which shows "2026
   * Toyota Camry" with a year-history dropdown rather than one card per year.
   */
  const latestByModel = useMemo(() => {
    const byModel = new Map<string, Vehicle>();
    for (const v of allToyotas) {
      const key = v.model.toLowerCase();
      const current = byModel.get(key);
      if (!current || parseInt(v.year, 10) > parseInt(current.year, 10)) {
        byModel.set(key, v);
      }
    }
    return Array.from(byModel.values());
  }, [allToyotas]);

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

  const breadcrumbJsonLd = useMemo(
    () =>
      createBreadcrumbStructuredData([
        { name: 'Home', url: '/' },
        { name: MAKE, url: BRAND_PATH },
      ]),
    [],
  );

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const firstSectionId = sections[0]?.id ?? 'cars';

  return (
    <div className="brand-page">
      <SEO
        title={`${MAKE} Models — Explore Toyota's Lineup of Cars, Trucks, and SUVs`}
        description={`Explore the full ${MAKE} lineup at Car and Driver, with expert reviews, ratings, starting prices, and fuel economy for every current Toyota model.`}
        canonical={BRAND_PATH}
        structuredData={breadcrumbJsonLd}
      />

      <div className="container">
        <nav aria-label="Breadcrumb" className="brand-page__breadcrumb">
          <Link to="/" className="brand-page__breadcrumb-link">Home</Link>
          <span className="brand-page__breadcrumb-sep" aria-hidden>/</span>
          <span className="brand-page__breadcrumb-current">{MAKE}</span>
        </nav>

        <header className="brand-page__hero">
          <div className="brand-page__hero-text">
            <h1 className="brand-page__title">{MAKE}</h1>
            <p className="brand-page__description">{BRAND_DESCRIPTION}</p>
            {sections.length > 0 && (
              <button
                type="button"
                className="brand-page__browse"
                onClick={() => scrollToSection(firstSectionId)}
              >
                Browse vehicles
                <ChevronRight size={16} aria-hidden />
              </button>
            )}
          </div>
          <div className="brand-page__hero-image">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/2026-toyota-rav4-limited-352-68f0e7f67ae2b.jpg?crop=0.702xw:0.526xh;0.271xw,0.337xh&resize=800:*"
              alt="2026 Toyota RAV4 Hybrid"
            />
            <span className="brand-page__hero-caption">2026 Toyota RAV4 Hybrid</span>
          </div>
        </header>

        <TopRankedGlance make={MAKE} limit={3} />

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
                EXPLORE OFFERS
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
              {section.vehicles.map(v => {
                const yearDetails = getYearDetails(v.make, v.model);
                const availableYears = getAvailableYears(v.make, v.model).map(y => parseInt(y, 10));
                const offers = getVehicleOffers(v.make, v.model);
                return (
                  <VehicleCard
                    key={v.id}
                    id={v.id}
                    name={`${v.year} ${v.make} ${v.model}`}
                    slug={v.slug}
                    image={v.image}
                    bodyStyle={v.bodyStyle}
                    price={`$${v.priceMin.toLocaleString()}`}
                    rating={v.staffRating}
                    editorsChoice={v.editorsChoice}
                    tenBest={v.tenBest}
                    evOfTheYear={v.evOfTheYear}
                    epaMpg={getCombinedMpg(v.mpg)}
                    cdSays={generateCdSays(v.year, v.make, v.model)}
                    modelName={v.model}
                    showShopButton
                    showSaveButton
                    shopButtonText={`SHOP NEW ${v.model.toUpperCase()}`}
                    shopButtonVariant="primary"
                    onShopClick={() => navigate(`/${v.slug}`)}
                    availableYears={availableYears}
                    yearDetails={yearDetails}
                    incentiveCount={offers.length}
                    onIncentiveClick={() =>
                      navigate(`/${v.make.toLowerCase()}/${toModelSlug(v.model)}/deals-incentives`)
                    }
                  />
                );
              })}
            </div>
          </section>
        ))}

        <ToyotaIncentives />

        <div className="brand-page__footer-cta">
          <p className="brand-page__footer-cta-count">
            <strong>{latestByModel.length}</strong> current {MAKE} models in our catalog
          </p>
          <div className="brand-page__footer-cta-links">
            <Link to={`/${MAKE.toLowerCase()}/deals-incentives`} className="brand-page__footer-cta-link">
              See {MAKE} deals &amp; incentives
              <ChevronRight size={16} aria-hidden />
            </Link>
            <Link to={`/${MAKE.toLowerCase()}/lease-deals`} className="brand-page__footer-cta-link">
              See {MAKE} lease deals
              <ChevronRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToyotaBrandPage;
