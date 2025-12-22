import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { VehicleCard } from '../../components/VehicleCard/VehicleCard';
import { vehicleDatabase } from '../../data/vehicles';
import './CardAudit.css';

// Helper to format vehicle data for VehicleCard props
const formatVehicleForCard = (vehicle: typeof vehicleDatabase[0]) => ({
  id: vehicle.id,
  name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
  slug: vehicle.slug,
  image: vehicle.image,
  price: vehicle.priceRange.split(' - ')[0], // Use starting price
  rating: vehicle.staffRating,
  bodyStyle: vehicle.bodyStyle,
  editorsChoice: vehicle.editorsChoice,
  tenBest: vehicle.tenBest,
  evOfTheYear: vehicle.evOfTheYear,
  epaMpg: vehicle.mpg ? parseInt(vehicle.mpg.split('/')[0]) : undefined,
  cdSays: `The ${vehicle.make} ${vehicle.model} offers ${vehicle.horsepower}hp and ${vehicle.mpg} MPG with ${vehicle.drivetrain} drivetrain.`,
  availableYears: [parseInt(vehicle.year), parseInt(vehicle.year) - 1, parseInt(vehicle.year) - 2],
});

// Card Pattern Analysis
const cardPatterns = [
  {
    name: 'VehicleCard',
    location: 'src/components/VehicleCard/',
    usedIn: ['TopTenCarouselLeads', 'VehiclesListPage', 'OnboardingResults'],
    features: [
      'Vehicle name & rating header',
      'Image with badges (rank, accolades, body style)',
      'Price section with CTAs',
      'EPA MPG display',
      'C/D Says editorial content',
      'Expandable model years overlay',
      'Used car variant (mileage, dealer info)',
    ],
    props: [
      'id, name, slug, image, bodyStyle',
      'price, priceLabel, rating, rank',
      'badge, editorsChoice, tenBest, evOfTheYear',
      'year, mileage, dealerName, distance, trim',
      'showShopButton, shopButtonText, shopButtonVariant, onShopClick',
      'ctas (array of CTAConfig)',
      'isCurrentVehicle',
      'epaMpg, cdSays, availableYears, yearDetails, modelName',
    ],
  },
  {
    name: 'VehicleRanking Card',
    location: 'src/components/VehicleRanking/',
    usedIn: ['VehiclePage (Where This Vehicle Ranks section)'],
    features: [
      'Horizontal layout with rank badge',
      'Image with accolade tooltips',
      'Name & rating inline',
      'Price with SHOP CTA',
      'Current vehicle highlighting',
    ],
    props: ['Inline card styling, not a separate component'],
  },
  {
    name: 'Comparison Card',
    location: 'src/components/Comparison/',
    usedIn: ['VehiclePage (Competitors section)'],
    features: [
      'Header with title & rating',
      'Image with accolade badges',
      'Price with Shop Now link',
      'EPA MPG section',
      'C/D Says review text',
      'Expand model years button',
    ],
    props: ['Inline card styling, not a separate component'],
  },
  {
    name: 'ForSaleNearYou Card',
    location: 'src/components/ForSaleNearYou/',
    usedIn: ['VehiclePage (Used listings section)'],
    features: [
      'Image with favorite button',
      'NEW LISTING / PRICE REDUCED badges',
      'Title, trim, price',
      'Specs row (mileage, year)',
      'Feature tags',
      'Dealer info with rating',
      'Contact actions (phone, directions)',
      'View Details / Check Availability CTAs',
    ],
    props: ['Inline card styling, not a separate component'],
  },
  {
    name: 'RankingsPage Hero Card',
    location: 'src/pages/RankingsPage/',
    usedIn: ['RankingsPage (#1 vehicle showcase)'],
    features: [
      'Large hero layout',
      'Header with title & rating',
      'Image with rank badge',
      'Price, MPG, badges section',
      'C/D Says editorial',
      'SHOP CTA button',
    ],
    props: ['Inline card styling, not a separate component'],
  },
  {
    name: 'RankingsPage Category Card',
    location: 'src/pages/RankingsPage/',
    usedIn: ['RankingsPage (category grid)'],
    features: [
      'Category image',
      'Category name',
      'Vehicle count',
      'Link to category page',
    ],
    props: ['Inline card styling, not a separate component'],
  },
  {
    name: 'TopTen View All Card',
    location: 'src/components/TopTenCarouselLeads/',
    usedIn: ['TopTenCarouselLeads (end of carousel)'],
    features: [
      'Dark gradient background',
      '10Best icon',
      'Title & description',
      'Full Rankings CTA',
    ],
    props: ['Inline card styling, not a separate component'],
  },
];

// Proposed Universal Card Features
const universalCardFeatures = {
  core: [
    { name: 'Image', description: 'Responsive image with aspect ratio options (16/10, 4/3, 1/1)', required: true },
    { name: 'Title', description: 'Vehicle name with optional year prefix', required: true },
    { name: 'Rating', description: 'C/D rating display (X/10 format)', required: false },
    { name: 'Price', description: 'Price with customizable label', required: true },
  ],
  badges: [
    { name: 'Rank Badge', description: 'Numeric rank for top 10 lists', required: false },
    { name: 'Accolades', description: "Editor's Choice, 10Best, EV of the Year", required: false },
    { name: 'Status Badges', description: 'Best Value, New Listing, Price Reduced', required: false },
    { name: 'Body Style', description: 'Category label (Sedan, SUV, etc.)', required: false },
  ],
  content: [
    { name: 'EPA MPG', description: 'Fuel efficiency display', required: false },
    { name: 'C/D Says', description: 'Editorial review snippet', required: false },
    { name: 'Specs Row', description: 'Mileage, year, features for used cars', required: false },
    { name: 'Dealer Info', description: 'Dealer name, distance, rating', required: false },
  ],
  actions: [
    { name: 'Primary CTA', description: 'Main action button (Shop Now, View Details)', required: false },
    { name: 'Secondary CTA', description: 'Alternative action (Trade-In, Check Availability)', required: false },
    { name: 'Favorite Button', description: 'Heart icon for saved vehicles', required: false },
    { name: 'Expand Years', description: 'Show all model years overlay', required: false },
  ],
  variants: [
    { name: 'Standard', description: 'Default vertical card layout' },
    { name: 'Horizontal', description: 'Side-by-side image and content' },
    { name: 'Compact', description: 'Smaller card for dense grids' },
    { name: 'Hero', description: 'Large featured card for #1 rankings' },
    { name: 'Used', description: 'With mileage, dealer, and contact info' },
    { name: 'Minimal', description: 'Image + title + price only' },
  ],
};

const CardAudit = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'proposal' | 'preview' | 'compare'>('audit');

  // Get real vehicles from database
  const sampleVehicles = useMemo(() => {
    // Find specific vehicles for demos
    const hondaAccord = vehicleDatabase.find(v => v.make === 'Honda' && v.model === 'Accord');
    const bmw3Series = vehicleDatabase.find(v => v.make === 'BMW' && v.model === '3 Series');
    const mazdaCx5 = vehicleDatabase.find(v => v.make === 'Mazda' && v.model === 'CX-5');
    const toyotaCamry = vehicleDatabase.find(v => v.make === 'Toyota' && v.model === 'Camry');
    const teslaModel3 = vehicleDatabase.find(v => v.make === 'Tesla' && v.model === 'Model 3');
    const fordMustang = vehicleDatabase.find(v => v.make === 'Ford' && v.model === 'Mustang');
    
    return {
      standard: hondaAccord ? formatVehicleForCard(hondaAccord) : null,
      ranked: bmw3Series ? { ...formatVehicleForCard(bmw3Series), rank: 1 } : null,
      minimal: mazdaCx5 ? formatVehicleForCard(mazdaCx5) : null,
      used: toyotaCamry ? {
        ...formatVehicleForCard(toyotaCamry),
        mileage: 35000,
        dealerName: 'Toyota of Springfield',
        distance: 12,
        trim: 'XLE V6',
      } : null,
      electric: teslaModel3 ? formatVehicleForCard(teslaModel3) : null,
      coupe: fordMustang ? formatVehicleForCard(fordMustang) : null,
    };
  }, []);

  return (
    <div className="card-audit">
      <div className="card-audit__header">
        <h1 className="card-audit__title">Card Component Audit</h1>
        <p className="card-audit__subtitle">
          Analysis of all card patterns in the codebase to create a unified "Super Card" component
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="card-audit__tabs">
        <button
          className={`card-audit__tab ${activeTab === 'audit' ? 'card-audit__tab--active' : ''}`}
          onClick={() => setActiveTab('audit')}
        >
          Current Cards Audit
        </button>
        <button
          className={`card-audit__tab ${activeTab === 'compare' ? 'card-audit__tab--active' : ''}`}
          onClick={() => setActiveTab('compare')}
        >
          Before & After
        </button>
        <button
          className={`card-audit__tab ${activeTab === 'proposal' ? 'card-audit__tab--active' : ''}`}
          onClick={() => setActiveTab('proposal')}
        >
          Universal Card Proposal
        </button>
        <button
          className={`card-audit__tab ${activeTab === 'preview' ? 'card-audit__tab--active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Live Preview
        </button>
      </div>

      {/* Before & After Tab */}
      {activeTab === 'compare' && (
        <div className="card-audit__content">
          <h2 className="card-audit__section-title">Before & After Comparison</h2>
          <p className="card-audit__section-desc">
            Side-by-side comparison of current inline card implementations vs. the unified VehicleCard component.
          </p>

          {/* Comparison Card - Before/After */}
          <div className="card-audit__compare-section">
            <h3 className="card-audit__compare-title">
              <span className="card-audit__compare-number">1</span>
              Comparison Card
            </h3>
            <p className="card-audit__compare-location">
              <code>src/components/Comparison/Comparison.tsx</code> → Used in VehiclePage competitors section
            </p>
            
            <div className="card-audit__compare-grid">
              {/* Before */}
              <div className="card-audit__compare-before">
                <div className="card-audit__compare-label">
                  <span className="card-audit__compare-label-badge card-audit__compare-label-badge--before">BEFORE</span>
                  Inline Implementation (~90 lines CSS)
                </div>
                <div className="card-audit__compare-card-mock comparison__card--mock">
                  <div className="comparison__card-top--mock">
                    <h3 className="comparison__card-title--mock">
                      {sampleVehicles.standard?.name || '2026 Honda Accord'}
                    </h3>
                    <div className="comparison__card-rating--mock">
                      <div className="comparison__card-rating-row--mock">
                        <span className="comparison__card-rating-score--mock">{sampleVehicles.standard?.rating || 9.9}</span>
                        <span className="comparison__card-rating-max--mock">/10</span>
                      </div>
                      <span className="comparison__card-rating-label--mock">C/D RATING</span>
                    </div>
                  </div>
                  <div className="comparison__card-image--mock">
                    <img src={sampleVehicles.standard?.image} alt="Vehicle" />
                  </div>
                  <div className="comparison__card-price-row--mock">
                    <div className="comparison__card-price-info--mock">
                      <span className="comparison__card-price-label--mock">Starting at</span>
                      <div className="comparison__card-price-action--mock">
                        <span className="comparison__card-price-value--mock">{sampleVehicles.standard?.price || '$27,295'}</span>
                        <span className="comparison__card-shop-btn--mock">Shop Now</span>
                      </div>
                    </div>
                  </div>
                  <div className="comparison__card-mpg--mock">
                    <span className="comparison__card-mpg-label--mock">EPA MPG</span>
                    <div className="comparison__card-mpg-value--mock">
                      <span className="comparison__card-mpg-number--mock">{sampleVehicles.standard?.epaMpg || 48}</span>
                      <span className="comparison__card-mpg-unit--mock">combined</span>
                    </div>
                  </div>
                  <div className="comparison__card-divider--mock"></div>
                  <div className="comparison__card-review--mock">
                    <p><strong>C/D SAYS:</strong> {sampleVehicles.standard?.cdSays?.slice(0, 80)}... <span className="comparison__card-review-link--mock">Learn More</span></p>
                  </div>
                  <button className="comparison__card-expand--mock">
                    <span>EXPAND ALL MODEL YEARS</span>
                  </button>
                </div>
              </div>

              {/* After */}
              <div className="card-audit__compare-after">
                <div className="card-audit__compare-label">
                  <span className="card-audit__compare-label-badge card-audit__compare-label-badge--after">AFTER</span>
                  VehicleCard Component
                </div>
                <div className="card-audit__compare-card">
                  {sampleVehicles.standard && (
                    <VehicleCard
                      {...sampleVehicles.standard}
                      showShopButton={true}
                      shopButtonText="Shop Now"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="card-audit__compare-benefits">
              <h4>✅ Benefits of Migration</h4>
              <ul>
                <li>Eliminates ~90 lines of duplicate CSS</li>
                <li>Consistent hover states and transitions</li>
                <li>Built-in accessibility features</li>
                <li>Automatic image optimization</li>
              </ul>
            </div>
          </div>

          {/* VehicleRanking Card - Before/After */}
          <div className="card-audit__compare-section">
            <h3 className="card-audit__compare-title">
              <span className="card-audit__compare-number">2</span>
              Vehicle Ranking Card
            </h3>
            <p className="card-audit__compare-location">
              <code>src/components/VehicleRanking/VehicleRanking.tsx</code> → Used in "Where This Vehicle Ranks" section
            </p>
            
            <div className="card-audit__compare-grid">
              {/* Before */}
              <div className="card-audit__compare-before">
                <div className="card-audit__compare-label">
                  <span className="card-audit__compare-label-badge card-audit__compare-label-badge--before">BEFORE</span>
                  Inline Implementation (~120 lines CSS)
                </div>
                <div className="card-audit__compare-card-mock ranking__card--mock">
                  <div className="ranking__card-image--mock">
                    <span className="ranking__card-rank--mock">1</span>
                    <img src={sampleVehicles.ranked?.image} alt="Vehicle" />
                  </div>
                  <div className="ranking__card-info--mock">
                    <div className="ranking__card-header--mock">
                      <h3 className="ranking__card-name--mock">{sampleVehicles.ranked?.name || '2025 BMW 3 Series'}</h3>
                      <div className="ranking__card-rating--mock">
                        <span className="ranking__card-rating-score--mock">{sampleVehicles.ranked?.rating || 9.0}</span>
                        <span className="ranking__card-rating-max--mock">/10</span>
                      </div>
                    </div>
                    <p className="ranking__card-price--mock">
                      <span className="ranking__card-price-label--mock">STARTING AT:</span> {sampleVehicles.ranked?.price || '$44,900'}
                    </p>
                    <button className="ranking__card-cta--mock">
                      SHOP {(sampleVehicles.ranked?.name || 'BMW 3 SERIES').toUpperCase()}
                    </button>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="card-audit__compare-after">
                <div className="card-audit__compare-label">
                  <span className="card-audit__compare-label-badge card-audit__compare-label-badge--after">AFTER</span>
                  VehicleCard with rank prop
                </div>
                <div className="card-audit__compare-card">
                  {sampleVehicles.ranked && (
                    <VehicleCard
                      {...sampleVehicles.ranked}
                      showShopButton={true}
                      shopButtonText="Shop Now"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="card-audit__compare-benefits">
              <h4>✅ Benefits of Migration</h4>
              <ul>
                <li>Rank badge already supported via <code>rank</code> prop</li>
                <li>Current vehicle highlighting via <code>isCurrentVehicle</code></li>
                <li>Consistent rating display format</li>
                <li>Unified CTA styling</li>
              </ul>
            </div>
          </div>

          {/* ForSaleNearYou Card - Before/After */}
          <div className="card-audit__compare-section">
            <h3 className="card-audit__compare-title">
              <span className="card-audit__compare-number">3</span>
              For Sale Near You Card
            </h3>
            <p className="card-audit__compare-location">
              <code>src/components/ForSaleNearYou/ForSaleNearYou.tsx</code> → Used for used car listings
            </p>
            
            <div className="card-audit__compare-grid">
              {/* Before */}
              <div className="card-audit__compare-before">
                <div className="card-audit__compare-label">
                  <span className="card-audit__compare-label-badge card-audit__compare-label-badge--before">BEFORE</span>
                  Inline Implementation (~150 lines CSS)
                </div>
                <div className="card-audit__compare-card-mock forsale__card--mock">
                  <div className="forsale__card-image--mock">
                    <img src={sampleVehicles.used?.image} alt="Vehicle" />
                    <button className="forsale__card-favorite--mock">♡</button>
                    <span className="forsale__card-badge--mock">NEW LISTING</span>
                  </div>
                  <div className="forsale__card-content--mock">
                    <h3 className="forsale__card-title--mock">{sampleVehicles.used?.name || '2025 Toyota Camry'}</h3>
                    <span className="forsale__card-trim--mock">{sampleVehicles.used?.trim || 'XLE V6'}</span>
                    <div className="forsale__card-price--mock">
                      <span className="forsale__card-price-value--mock">{sampleVehicles.used?.price || '$24,500'}</span>
                    </div>
                    <div className="forsale__card-specs--mock">
                      <span>📏 {sampleVehicles.used?.mileage?.toLocaleString() || '35,000'} mi</span>
                      <span>📅 {sampleVehicles.used?.name?.split(' ')[0] || '2022'}</span>
                    </div>
                    <div className="forsale__card-dealer--mock">
                      <span className="forsale__card-dealer-name--mock">{sampleVehicles.used?.dealerName || 'Toyota of Springfield'}</span>
                      <span className="forsale__card-dealer-distance--mock">{sampleVehicles.used?.distance || 12} miles away</span>
                    </div>
                    <div className="forsale__card-actions--mock">
                      <button className="forsale__card-btn--primary--mock">View Details</button>
                      <button className="forsale__card-btn--secondary--mock">Check Availability</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="card-audit__compare-after">
                <div className="card-audit__compare-label">
                  <span className="card-audit__compare-label-badge card-audit__compare-label-badge--after">AFTER</span>
                  VehicleCard (used variant)
                </div>
                <div className="card-audit__compare-card">
                  {sampleVehicles.used && (
                    <VehicleCard
                      {...sampleVehicles.used}
                      ctas={[
                        { text: 'View Details', variant: 'primary' },
                        { text: 'Check Availability', variant: 'outline' },
                      ]}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="card-audit__compare-benefits">
              <h4>✅ Benefits of Migration</h4>
              <ul>
                <li>Used car props already supported: <code>mileage</code>, <code>dealerName</code>, <code>distance</code>, <code>trim</code></li>
                <li>Multiple CTAs via <code>ctas</code> array</li>
                <li>🔧 <strong>Needs:</strong> Favorite button, status badges (NEW LISTING, PRICE REDUCED)</li>
              </ul>
            </div>
          </div>

          {/* Summary */}
          <div className="card-audit__compare-summary">
            <h3>Migration Summary</h3>
            <div className="card-audit__compare-summary-grid">
              <div className="card-audit__compare-summary-item">
                <span className="card-audit__compare-summary-number">~360</span>
                <span className="card-audit__compare-summary-label">Lines of CSS to eliminate</span>
              </div>
              <div className="card-audit__compare-summary-item">
                <span className="card-audit__compare-summary-number">6</span>
                <span className="card-audit__compare-summary-label">Inline implementations to migrate</span>
              </div>
              <div className="card-audit__compare-summary-item">
                <span className="card-audit__compare-summary-number">1</span>
                <span className="card-audit__compare-summary-label">Universal component to maintain</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audit Tab */}
      {activeTab === 'audit' && (
        <div className="card-audit__content">
          <h2 className="card-audit__section-title">Current Card Implementations</h2>
          <p className="card-audit__section-desc">
            Found <strong>{cardPatterns.length} different card patterns</strong> across the codebase. 
            Only <strong>VehicleCard</strong> is a reusable component - the rest are inline implementations.
          </p>

          <div className="card-audit__patterns">
            {cardPatterns.map((pattern, index) => (
              <div key={index} className="card-audit__pattern">
                <div className="card-audit__pattern-header">
                  <h3 className="card-audit__pattern-name">{pattern.name}</h3>
                  <span className="card-audit__pattern-location">{pattern.location}</span>
                </div>
                
                <div className="card-audit__pattern-used">
                  <strong>Used in:</strong> {pattern.usedIn.join(', ')}
                </div>

                <div className="card-audit__pattern-features">
                  <strong>Features:</strong>
                  <ul>
                    {pattern.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="card-audit__pattern-props">
                  <strong>Props/Implementation:</strong>
                  <ul>
                    {pattern.props.map((prop, i) => (
                      <li key={i}><code>{prop}</code></li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="card-audit__summary">
            <h3>Key Findings</h3>
            <ul>
              <li>✅ <strong>VehicleCard</strong> is the most feature-rich and reusable</li>
              <li>⚠️ <strong>6 other card patterns</strong> are inline CSS/JSX implementations</li>
              <li>🔄 <strong>Common elements:</strong> Image, Title, Rating, Price, CTAs</li>
              <li>🎨 <strong>Styling inconsistencies:</strong> Different border-radius, shadows, spacing</li>
              <li>📱 <strong>Responsive behavior:</strong> Varies between implementations</li>
            </ul>
          </div>
        </div>
      )}

      {/* Proposal Tab */}
      {activeTab === 'proposal' && (
        <div className="card-audit__content">
          <h2 className="card-audit__section-title">Universal Card Proposal</h2>
          <p className="card-audit__section-desc">
            A single, flexible card component that can replace all existing card patterns through composition and variants.
          </p>

          <div className="card-audit__proposal-grid">
            {/* Core Features */}
            <div className="card-audit__feature-group">
              <h3 className="card-audit__feature-group-title">🎯 Core Elements</h3>
              <div className="card-audit__feature-list">
                {universalCardFeatures.core.map((feature, i) => (
                  <div key={i} className="card-audit__feature-item">
                    <span className={`card-audit__feature-badge ${feature.required ? 'card-audit__feature-badge--required' : ''}`}>
                      {feature.required ? 'Required' : 'Optional'}
                    </span>
                    <strong>{feature.name}</strong>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="card-audit__feature-group">
              <h3 className="card-audit__feature-group-title">🏆 Badge System</h3>
              <div className="card-audit__feature-list">
                {universalCardFeatures.badges.map((feature, i) => (
                  <div key={i} className="card-audit__feature-item">
                    <strong>{feature.name}</strong>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="card-audit__feature-group">
              <h3 className="card-audit__feature-group-title">📝 Content Sections</h3>
              <div className="card-audit__feature-list">
                {universalCardFeatures.content.map((feature, i) => (
                  <div key={i} className="card-audit__feature-item">
                    <strong>{feature.name}</strong>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="card-audit__feature-group">
              <h3 className="card-audit__feature-group-title">🔘 Actions & CTAs</h3>
              <div className="card-audit__feature-list">
                {universalCardFeatures.actions.map((feature, i) => (
                  <div key={i} className="card-audit__feature-item">
                    <strong>{feature.name}</strong>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="card-audit__variants">
            <h3 className="card-audit__feature-group-title">🎨 Card Variants</h3>
            <div className="card-audit__variant-grid">
              {universalCardFeatures.variants.map((variant, i) => (
                <div key={i} className="card-audit__variant-item">
                  <strong>{variant.name}</strong>
                  <p>{variant.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Proposed Interface */}
          <div className="card-audit__code-block">
            <h3>Proposed TypeScript Interface</h3>
            <pre>{`interface UniversalCardProps {
  // Core
  variant?: 'standard' | 'horizontal' | 'compact' | 'hero' | 'used' | 'minimal';
  image: string;
  imageAspectRatio?: '16/10' | '4/3' | '1/1' | '3/2';
  title: string;
  subtitle?: string;
  href?: string;
  
  // Rating
  rating?: number;
  ratingLabel?: string;
  
  // Price
  price: string;
  priceLabel?: string;
  originalPrice?: string; // For price reduced
  
  // Badges
  rank?: number;
  editorsChoice?: boolean;
  tenBest?: boolean;
  evOfTheYear?: boolean;
  statusBadge?: 'best-value' | 'new-listing' | 'price-reduced';
  bodyStyle?: string;
  
  // Content
  epaMpg?: number;
  cdSays?: string;
  specs?: { icon: ReactNode; label: string }[];
  features?: string[];
  
  // Dealer (for used)
  dealerName?: string;
  dealerDistance?: number;
  dealerRating?: number;
  dealerPhone?: string;
  dealerAddress?: string;
  
  // Actions
  primaryCta?: { text: string; onClick?: () => void; variant?: CTAVariant };
  secondaryCta?: { text: string; onClick?: () => void; variant?: CTAVariant };
  showFavorite?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  
  // Model Years
  availableYears?: number[];
  yearDetails?: { year: number; price: string; rating: number }[];
  
  // State
  isActive?: boolean;
  isLoading?: boolean;
}`}</pre>
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="card-audit__content">
          <h2 className="card-audit__section-title">Current VehicleCard Variants</h2>
          <p className="card-audit__section-desc">
            These are the current VehicleCard implementations. The goal is to extend this component to handle all card use cases.
          </p>

          <div className="card-audit__preview-grid">
            {/* Standard Card */}
            <div className="card-audit__preview-item">
              <h3>Standard Card</h3>
              <p>Full featured card with all options</p>
              <div className="card-audit__preview-card">
                {sampleVehicles.standard && (
                  <VehicleCard
                    {...sampleVehicles.standard}
                    showShopButton={true}
                    shopButtonText="Shop Now"
                  />
                )}
              </div>
            </div>

            {/* Card with CTAs */}
            <div className="card-audit__preview-item">
              <h3>Multiple CTAs</h3>
              <p>Card with Shop New + Trade-In buttons</p>
              <div className="card-audit__preview-card">
                {sampleVehicles.standard && (
                  <VehicleCard
                    {...sampleVehicles.standard}
                    ctas={[
                      { text: 'Shop New', variant: 'primary' },
                      { text: 'Trade-In', variant: 'success-outline' },
                    ]}
                  />
                )}
              </div>
            </div>

            {/* Ranked Card */}
            <div className="card-audit__preview-item">
              <h3>Ranked Card</h3>
              <p>Card with rank badge for Top 10 lists</p>
              <div className="card-audit__preview-card">
                {sampleVehicles.ranked && (
                  <VehicleCard
                    {...sampleVehicles.ranked}
                    showShopButton={true}
                  />
                )}
              </div>
            </div>

            {/* Used Car */}
            <div className="card-audit__preview-item">
              <h3>Used Car Card</h3>
              <p>Card with mileage and dealer info</p>
              <div className="card-audit__preview-card">
                {sampleVehicles.used && (
                  <VehicleCard
                    {...sampleVehicles.used}
                    showShopButton={true}
                    shopButtonText="View Details"
                  />
                )}
              </div>
            </div>

            {/* Minimal Card */}
            <div className="card-audit__preview-item">
              <h3>Minimal Card</h3>
              <p>Basic card without extras</p>
              <div className="card-audit__preview-card">
                {sampleVehicles.minimal && (
                  <VehicleCard
                    id={sampleVehicles.minimal.id}
                    name={sampleVehicles.minimal.name}
                    slug={sampleVehicles.minimal.slug}
                    image={sampleVehicles.minimal.image}
                    price={sampleVehicles.minimal.price}
                  />
                )}
              </div>
            </div>

            {/* With C/D Says */}
            <div className="card-audit__preview-item">
              <h3>With Editorial</h3>
              <p>Card with C/D Says section</p>
              <div className="card-audit__preview-card">
                {sampleVehicles.electric && (
                  <VehicleCard
                    {...sampleVehicles.electric}
                    editorsChoice={false}
                    tenBest={false}
                    availableYears={undefined}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="card-audit__next-steps">
            <h3>Next Steps</h3>
            <ol>
              <li>Extend VehicleCard with new variants (horizontal, hero, compact)</li>
              <li>Add missing features (favorite button, contact actions)</li>
              <li>Refactor Comparison, ForSaleNearYou, VehicleRanking to use VehicleCard</li>
              <li>Update RankingsPage hero cards to use VehicleCard variant="hero"</li>
              <li>Create Storybook stories for all variants</li>
              <li>Remove duplicate inline card CSS</li>
            </ol>
          </div>
        </div>
      )}

      <div className="card-audit__footer">
        <Link to="/" className="card-audit__back-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default CardAudit;

