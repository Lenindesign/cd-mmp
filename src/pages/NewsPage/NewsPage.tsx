import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ArticleCard } from '../../components/Resin/ArticleCard';
import { VehicleCard } from '../../components/VehicleCard/VehicleCard';
import { vehicleDatabase } from '../../data/vehicles';
import { getAllVehicles } from '../../services/vehicleService';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getCashDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import './NewsPage.css';

const hyundaiSantaFe = vehicleDatabase.find(v => v.make === 'Hyundai' && v.model === 'Santa Fe');
const hondaAccord = vehicleDatabase.find(v => v.make === 'Honda' && v.model === 'Accord');
const toyotaCorolla = vehicleDatabase.find(v => v.make === 'Toyota' && v.model === 'Corolla');
const fordF150 = vehicleDatabase.find(v => v.make === 'Ford' && v.model === 'F-150');
const chevyTrailblazer = vehicleDatabase.find(v => v.make === 'Chevrolet' && v.model === 'Trailblazer');
const kiaTelluride = vehicleDatabase.find(v => v.make === 'Kia' && v.model === 'Telluride');
const porscheCayenne = vehicleDatabase.find(v => v.make === 'Porsche' && v.model === 'Cayenne');

const heroStory = {
  category: 'INSTRUMENTED TEST',
  headline: "The Refreshed Solterra EV SUV Is the Quickest Subaru We've Ever Tested",
  subheadline: "Everyone knows EVs are quick, but we're still shocked to see the Solterra's acceleration times compared with sportier Subies.",
  author: 'Jack Fitzgerald',
  image: 'https://hips.hearstapps.com/mtg-prod/68acee0b9a8a250002dfbc03/2-2026-subaru-solterra-first-drive.jpg',
  href: '/news/solterra-quickest-subaru',
};

const articles = [
  { id: '1', category: 'Testing Hub', headline: 'The Ford F-150 Lightning Sets New Truck Standards', image: fordF150?.image || '', href: '/news/ford-f150-lightning-tested' },
  { id: '2', category: 'Testing Hub', headline: 'Porsche Cayenne Turbo GT: The Ultimate SUV', image: porscheCayenne?.image || '', href: '/news/porsche-cayenne-turbo-gt-tested' },
  { id: '3', category: 'Testing Hub', headline: 'Chevrolet Trailblazer RS: Compact SUV Tested', image: chevyTrailblazer?.image || '', href: '/news/chevy-trailblazer-rs-tested' },
  { id: '4', category: "Buyer's Guide", headline: 'Best SUVs of 2025: Kia Telluride Leads the Pack', image: kiaTelluride?.image || '', href: '/news/best-suvs-2025' },
  { id: '5', category: 'Listicle', headline: 'The 10 Most-Researched New Cars on Car and Driver in 2025', image: 'https://hips.hearstapps.com/hmg-prod/images/2025-lexus-gx-3-672b608154c3f.jpg?crop=0.563xw:0.562xh;0.201xw,0.178xh', href: '/listicle/top-researched-cars-2025' },
  { id: '6', category: 'Comparison', headline: 'Toyota Corolla vs Honda Civic: Which Is Better?', image: toyotaCorolla?.image || '', href: '/news/camry-vs-accord-comparison' },
  { id: '7', category: 'Review', headline: 'The 2025 Honda Accord Hybrid Gets Even Better MPG', image: hondaAccord?.image || '', href: '/news/honda-accord-hybrid-review' },
  { id: '8', category: 'Testing Hub', headline: 'Hyundai Santa Fe Hybrid: Family SUV Reimagined', image: hyundaiSantaFe?.image || '', href: '/news/hyundai-santa-fe-hybrid-tested' },
];

export const NewsPage: React.FC = () => {
  const topSuvs = useMemo(() => {
    return getAllVehicles()
      .filter(v => v.bodyStyle === 'SUV')
      .sort((a, b) => (b.staffRating || 0) - (a.staffRating || 0))
      .slice(0, 3);
  }, []);

  const bestDeals = useMemo(() => {
    const deals: { id: string; type: string; label: string; vehicleName: string; image: string; slug: string; price: string; rating?: number }[] = [];

    for (const d of getZeroAprDeals().slice(0, 1)) {
      deals.push({ id: d.id, type: '0% APR', label: '0% APR Financing', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, image: d.vehicle.image, slug: d.vehicle.slug, price: d.vehicle.priceRange, rating: d.vehicle.staffRating });
    }
    for (const d of getCashDeals().slice(0, 1)) {
      deals.push({ id: d.id, type: 'Cash Back', label: `${d.incentiveValue} Cash Back`, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, image: d.vehicle.image, slug: d.vehicle.slug, price: d.vehicle.priceRange, rating: d.vehicle.staffRating });
    }
    for (const d of getLeaseDeals().slice(0, 1)) {
      deals.push({ id: d.id, type: 'Lease', label: `${d.monthlyPayment}/mo Lease`, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, image: d.vehicle.image, slug: d.vehicle.slug, price: d.vehicle.priceRange, rating: d.vehicle.staffRating });
    }

    return deals;
  }, []);

  return (
    <div className="news-page">
      {/* Hero */}
      <section className="news-page__hero">
        <Link to={heroStory.href} className="news-page__hero-link">
          <div className="news-page__hero-image">
            <img src={heroStory.image} alt={heroStory.headline} loading="eager" />
          </div>
          <div className="news-page__hero-content">
            <span className="news-page__hero-category">{heroStory.category}</span>
            <h1 className="news-page__hero-headline">{heroStory.headline}</h1>
            <p className="news-page__hero-subheadline">{heroStory.subheadline}</p>
            <div className="news-page__hero-byline">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16" className="news-page__hero-verified">
                <path d="m22.735 8.905-.955-.955V6.518a4.253 4.253 0 0 0-4.273-4.273h-1.432l-.955-.954C13.45-.38 10.61-.38 8.938 1.29l-.955.954H6.551a4.253 4.253 0 0 0-4.273 4.273V7.95l-.955.955c-1.67 1.671-1.67 4.512 0 6.183l.955.955v1.432a4.253 4.253 0 0 0 4.273 4.273h1.432l.955.954c1.67 1.671 4.511 1.671 6.182 0l.955-.954h1.432a4.253 4.253 0 0 0 4.273-4.273v-1.432l.955-.955c1.67-1.671 1.67-4.512 0-6.183zm-6.421 1.671-4.512 4.512c-.238.238-.477.477-.955.477-.477 0-.716-.239-.954-.477l-2.149-2.149c-.477-.477-.477-1.432 0-1.91.478-.477 1.432-.477 1.91 0l1.193 1.194 3.557-3.318c.477-.716 1.432-.716 1.91 0a1.154 1.154 0 0 1 0 1.671z" fill="currentColor"/>
              </svg>
              <span>Reviewed By</span>
              <span className="news-page__hero-author">{heroStory.author}</span>
            </div>
          </div>
        </Link>
      </section>

      {/* Row 1: Latest Articles */}
      <div className="news-page__rows">
        <div className="container">
          <section className="news-page__row">
            <div className="news-page__row-left">
              <h2 className="news-page__row-title">Latest Articles</h2>
              <span className="news-page__row-count">{articles.length} stories</span>
              <Link to="/news/all" className="news-page__row-cta">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="news-page__row-cards news-page__row-cards--articles">
              {articles.slice(0, 4).map(story => (
                <ArticleCard
                  key={story.id}
                  imageUrl={story.image}
                  imageAlt={story.headline}
                  headline={story.headline}
                  sponsor={story.category}
                  href={story.href}
                  variant="vertical"
                  aspectRatio="landscape"
                />
              ))}
            </div>
          </section>

          {/* Row 2: Best SUVs */}
          <section className="news-page__row">
            <div className="news-page__row-left">
              <h2 className="news-page__row-title">Best SUVs</h2>
              <span className="news-page__row-count">{topSuvs.length} top rated</span>
              <Link to="/rankings/suv" className="news-page__row-cta">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="news-page__row-cards">
              {topSuvs.map((v, i) => (
                <VehicleCard
                  key={v.id}
                  id={v.id}
                  name={`${v.year} ${v.make} ${v.model}`}
                  slug={v.slug}
                  image={v.image}
                  price={v.priceRange}
                  rating={v.staffRating}
                  rank={i + 1}
                  editorsChoice={v.editorsChoice}
                  tenBest={v.tenBest}
                  showSaveButton={true}
                  showShopButton={true}
                  shopButtonText={`SHOP NEW ${v.model.toUpperCase()}`}
                  shopButtonVariant="outline"
                  modelName={v.model}
                />
              ))}
            </div>
          </section>

          {/* Row 3: Best Deals */}
          <section className="news-page__row">
            <div className="news-page__row-left">
              <h2 className="news-page__row-title">Best Deals</h2>
              <span className="news-page__row-count">{bestDeals.length} featured</span>
              <Link to="/deals" className="news-page__row-cta">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="news-page__row-cards">
              {bestDeals.map(deal => (
                <Link key={deal.id} to={`/vehicle/${deal.slug}`} className="news-page__deal-card">
                  <div className="news-page__deal-card-image">
                    <img src={deal.image} alt={deal.vehicleName} />
                    <span className="news-page__deal-card-badge">{deal.type}</span>
                  </div>
                  <div className="news-page__deal-card-body">
                    <h3 className="news-page__deal-card-name">{deal.vehicleName}</h3>
                    <span className="news-page__deal-card-label">{deal.label}</span>
                    <span className="news-page__deal-card-price">{deal.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
