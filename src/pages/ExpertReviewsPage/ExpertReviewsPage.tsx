import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ArticleCard } from '../../components/Resin/ArticleCard';
import './ExpertReviewsPage.css';

const HEARST_CDN = 'https://hips.hearstapps.com/mtg-prod/';

interface ReviewArticle {
  id: string;
  category: string;
  headline: string;
  image: string;
  href: string;
  author: string;
}

const CATEGORIES: { title: string; slug: string; articles: ReviewArticle[] }[] = [
  {
    title: 'Instrumented Tests',
    slug: 'testing-hub',
    articles: [
      { id: 'it-1', category: 'Instrumented Test', headline: 'Fierce Defender: 2025 Land Rover Defender Octa Test', image: `${HEARST_CDN}688159718ce5a90002280aad/005-2026-land-rover-defender-octa-goodwood-2025.jpg`, href: '/news/defender-octa-test', author: 'K.C. Colwell' },
      { id: 'it-2', category: 'Instrumented Test', headline: 'The Ford F-150 Lightning Sets New Truck Standards', image: `${HEARST_CDN}672a8165bee9b50008b7d315/016-2025-ford-f-150-hybrid-king-ranch-front-view.jpg`, href: '/news/ford-f150-lightning-tested', author: 'Dave VanderWerp' },
      { id: 'it-3', category: 'Instrumented Test', headline: 'Porsche Cayenne Turbo GT: The Ultimate SUV', image: `${HEARST_CDN}67080a658fa9240008e5956b/016-2024-porsche-cayenne-s.jpg`, href: '/news/porsche-cayenne-turbo-gt-tested', author: 'Eric Tingwall' },
      { id: 'it-4', category: 'Instrumented Test', headline: 'Chevrolet Trailblazer RS: Compact SUV Tested', image: `${HEARST_CDN}6685e0580bcd680008156657/7-2025-chevrolet-trailblazer-front-view.jpg`, href: '/news/chevy-trailblazer-rs-tested', author: 'K.C. Colwell' },
    ],
  },
  {
    title: "Buyer's Guides",
    slug: 'buyers-guide',
    articles: [
      { id: 'bg-1', category: "Buyer's Guide", headline: 'Best SUVs of 2025: Kia Telluride Leads the Pack', image: `${HEARST_CDN}65a1ccd79afa860008125aac/2024-kia-telluride-12.jpg`, href: '/news/best-suvs-2025', author: 'Editors' },
      { id: 'bg-2', category: "Buyer's Guide", headline: 'Best Sedans of 2025 and 2026', image: `${HEARST_CDN}671a7554264766000986939b/008-2025-honda-accord-hybrid.jpg`, href: '/news/best-sedans-2025', author: 'Editors' },
      { id: 'bg-3', category: "Buyer's Guide", headline: 'Best Trucks of 2025 and 2026', image: `${HEARST_CDN}672a8165bee9b50008b7d315/016-2025-ford-f-150-hybrid-king-ranch-front-view.jpg`, href: '/news/best-trucks-2025', author: 'Editors' },
      { id: 'bg-4', category: "Buyer's Guide", headline: 'Best Electric Cars of 2025 and 2026', image: `${HEARST_CDN}665f029f56460a00090e3cba/2025toyotacorollafx6.png`, href: '/news/best-evs-2025', author: 'Editors' },
    ],
  },
  {
    title: 'Comparisons',
    slug: 'comparisons',
    articles: [
      { id: 'cp-1', category: 'Comparison', headline: 'Toyota Corolla vs Honda Civic: Which Is Better?', image: `${HEARST_CDN}665f029f56460a00090e3cba/2025toyotacorollafx6.png`, href: '/news/camry-vs-accord-comparison', author: 'Tony Quiroga' },
      { id: 'cp-2', category: 'Comparison', headline: 'Hyundai Santa Fe vs Kia Telluride: Family SUV Showdown', image: `${HEARST_CDN}6891115e7984b8000228f78f/1-2026-hyundai-santa-fe-hybrid-front-view.jpg`, href: '/news/santa-fe-vs-telluride', author: 'Annie White' },
      { id: 'cp-3', category: 'Comparison', headline: 'Ford F-150 vs Chevrolet Silverado: Truck Titans', image: `${HEARST_CDN}672a8165bee9b50008b7d315/016-2025-ford-f-150-hybrid-king-ranch-front-view.jpg`, href: '/news/f150-vs-silverado', author: 'Dave VanderWerp' },
      { id: 'cp-4', category: 'Comparison', headline: 'Porsche Cayenne vs BMW X5: Luxury SUV Battle', image: `${HEARST_CDN}67080a658fa9240008e5956b/016-2024-porsche-cayenne-s.jpg`, href: '/news/cayenne-vs-x5', author: 'Eric Tingwall' },
    ],
  },
  {
    title: 'First Drives',
    slug: 'first-drives',
    articles: [
      { id: 'fd-1', category: 'First Drive', headline: 'Hyundai Santa Fe Hybrid: Family SUV Reimagined', image: `${HEARST_CDN}6891115e7984b8000228f78f/1-2026-hyundai-santa-fe-hybrid-front-view.jpg`, href: '/news/hyundai-santa-fe-hybrid-tested', author: 'Annie White' },
      { id: 'fd-2', category: 'First Drive', headline: '2025 Honda Accord Hybrid Gets Even Better MPG', image: `${HEARST_CDN}671a7554264766000986939b/008-2025-honda-accord-hybrid.jpg`, href: '/news/honda-accord-hybrid-review', author: 'Joey Capparella' },
      { id: 'fd-3', category: 'First Drive', headline: '2025 Honda HR-V Sport: Small SUV, Big Value', image: `${HEARST_CDN}6658e659f31254000921b1fa/16-2025-honda-hr-v-sport-front-view.jpg`, href: '/news/honda-hr-v-sport-tested', author: 'Tony Quiroga' },
      { id: 'fd-4', category: 'First Drive', headline: '2025 Kia Telluride: Three Rows of Excellence', image: `${HEARST_CDN}65a1ccd79afa860008125aac/2024-kia-telluride-12.jpg`, href: '/news/kia-telluride-first-drive', author: 'K.C. Colwell' },
    ],
  },
];

export const ExpertReviewsPage: React.FC = () => {
  const totalArticles = CATEGORIES.reduce((sum, cat) => sum + cat.articles.length, 0);

  return (
    <div className="expert-reviews">
      <div className="expert-reviews__hero">
        <div className="container">
          <div className="expert-reviews__hero-content">
            <nav className="expert-reviews__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="expert-reviews__breadcrumb-sep">/</span>
              <span>Expert Reviews</span>
            </nav>
            <h1 className="expert-reviews__title">Expert Reviews</h1>
            <p className="expert-reviews__description">
              Every vehicle tested, reviewed, and compared by the Car and Driver editorial team.
              Instrumented tests, first drives, buyer's guides, and head-to-head comparisons.
            </p>
            <div className="expert-reviews__stats">
              <span className="expert-reviews__stat">{totalArticles} Reviews</span>
              <span className="expert-reviews__stat-sep">·</span>
              <span className="expert-reviews__stat">{CATEGORIES.length} Categories</span>
            </div>
          </div>
        </div>
      </div>

      <div className="expert-reviews__rows">
        <div className="container">
          {CATEGORIES.map(cat => (
            <section key={cat.slug} className="expert-reviews__row">
              <div className="expert-reviews__row-header">
                <h2 className="expert-reviews__row-title">{cat.title}</h2>
                <Link to={`/news`} className="expert-reviews__row-cta">
                  View All <ChevronRight size={14} />
                </Link>
              </div>
              <div className="expert-reviews__row-grid">
                {cat.articles.map(article => (
                  <ArticleCard
                    key={article.id}
                    imageUrl={article.image}
                    imageAlt={article.headline}
                    headline={article.headline}
                    sponsor={article.category}
                    href={article.href}
                    variant="vertical"
                    aspectRatio="landscape"
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertReviewsPage;
