import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { Button } from '../../components/Button/Button';
import './ListiclePage.css';

// Listicle item type
interface ListicleItem {
  rank: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  specs?: {
    label: string;
    value: string;
  }[];
  link?: string;
}

// Article metadata
const article = {
  category: 'NEWS',
  categorySlug: 'news',
  headline: 'The 10 Most-Researched New Cars on Car and Driver in 2025',
  subheadline: 'These are the vehicles that captured the most attention from our readers this year.',
  author: {
    name: 'Car and Driver Editors',
    avatar: 'https://www.caranddriver.com/author/car-and-driver-editors',
    title: 'Editorial Team',
  },
  publishDate: 'Dec 26, 2025',
  readTime: 8,
};

// Listicle items with provided images (ranked 10 to 1, countdown style)
const listicleItems: ListicleItem[] = [
  {
    rank: 10,
    title: '2025 Lexus GX',
    subtitle: 'Luxury Meets Off-Road Capability',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-lexus-gx-3-672b608154c3f.jpg?crop=0.563xw:0.562xh;0.201xw,0.178xh',
    description: 'The completely redesigned 2025 Lexus GX has captured the attention of luxury SUV shoppers with its bold new look and impressive off-road credentials. Built on Toyota\'s body-on-frame platform, it offers genuine capability while maintaining the refinement Lexus is known for. The twin-turbo V-6 delivers 349 horsepower, and the available Overtrail trim adds serious off-road hardware.',
    specs: [
      { label: 'Starting Price', value: '$64,250' },
      { label: 'Engine', value: '3.4L Twin-Turbo V-6' },
      { label: 'Horsepower', value: '349 hp' },
    ],
    link: '/vehicles/lexus/gx',
  },
  {
    rank: 9,
    title: '2024 Chevrolet Trax',
    subtitle: 'Budget-Friendly and Feature-Rich',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-chevrolet-trax-activ-2764-65395a7ebd8af.jpg?crop=0.614xw:0.518xh;0.303xw,0.395xh',
    description: 'The all-new Chevrolet Trax has been a revelation in the subcompact SUV segment. With a starting price under $22,000 and a surprisingly spacious interior, it offers tremendous value. The redesign brought modern styling, a larger footprint, and more standard features than many competitors costing thousands more.',
    specs: [
      { label: 'Starting Price', value: '$21,495' },
      { label: 'Engine', value: '1.2L Turbo 3-Cyl' },
      { label: 'MPG', value: '28 city / 32 hwy' },
    ],
    link: '/vehicles/chevrolet/trax',
  },
  {
    rank: 8,
    title: '2025 Genesis GV80',
    subtitle: 'Korean Luxury Refined',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-genesis-gv80-149-6642229d26dcf.jpg?crop=0.741xw:0.625xh;0.177xw,0.161xh',
    description: 'Genesis continues to impress with the updated GV80, which now offers a coupe-like roofline variant alongside the standard model. The interior rivals German competitors at a lower price point, and the available twin-turbo V-6 provides ample power. Advanced driver-assistance features come standard.',
    specs: [
      { label: 'Starting Price', value: '$59,050' },
      { label: 'Engine', value: '2.5L Turbo I-4 / 3.5L Twin-Turbo V-6' },
      { label: 'Horsepower', value: '300-375 hp' },
    ],
    link: '/vehicles/genesis/gv80',
  },
  {
    rank: 7,
    title: '2025 Toyota Grand Highlander',
    subtitle: 'Three-Row Family Hauler',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-toyota-grand-highlander-5-67295131c6ba2.jpg?crop=0.420xw:0.369xh;0.274xw,0.520xh',
    description: 'Toyota stretched the Highlander formula to create the Grand Highlander, and families have taken notice. The extra length translates to genuinely usable third-row seating and impressive cargo capacity. Available with a powerful turbo-four or an efficient hybrid powertrain, it checks all the boxes for family transportation.',
    specs: [
      { label: 'Starting Price', value: '$45,070' },
      { label: 'Engine', value: '2.4L Turbo / Hybrid' },
      { label: 'Seating', value: 'Up to 8' },
    ],
    link: '/vehicles/toyota/grand-highlander',
  },
  {
    rank: 6,
    title: '2025 Tesla Cybertruck',
    subtitle: 'Polarizing Design, Undeniable Interest',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-tesla-cybertruck-3-672e75cce7814.jpg?crop=0.607xw:0.513xh;0.0969xw,0.385xh',
    description: 'Love it or hate it, you can\'t ignore the Cybertruck. Tesla\'s stainless-steel pickup has generated enormous interest since its reveal, and now that it\'s actually on roads, curiosity remains high. The tri-motor version delivers supercar-like acceleration, while the range and towing capacity compete with traditional trucks.',
    specs: [
      { label: 'Starting Price', value: '$79,990' },
      { label: 'Range', value: 'Up to 340 miles' },
      { label: '0-60 mph', value: '2.6 seconds (Cyberbeast)' },
    ],
    link: '/vehicles/tesla/cybertruck',
  },
  {
    rank: 5,
    title: '2025 Mazda CX-50',
    subtitle: 'Sporty Driving Dynamics',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-mazda-cx-50-103-668da21a9cbea.jpg?crop=0.553xw:0.467xh;0.126xw,0.388xh',
    description: 'Mazda\'s CX-50 brings the brand\'s signature driving dynamics to the compact SUV segment with a more rugged, outdoor-focused design. The turbocharged engine option provides spirited performance, while the upscale interior punches above its price class. It\'s the enthusiast\'s choice in this competitive segment.',
    specs: [
      { label: 'Starting Price', value: '$30,300' },
      { label: 'Engine', value: '2.5L I-4 / 2.5L Turbo I-4' },
      { label: 'Horsepower', value: '187-256 hp' },
    ],
    link: '/vehicles/mazda/cx-50',
  },
  {
    rank: 4,
    title: '2023 Honda CR-V',
    subtitle: 'The Reliable Benchmark',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2023-honda-crv-exl-131-647e04fc82add.jpg?crop=0.481xw:0.406xh;0.284xw,0.406xh',
    description: 'The Honda CR-V continues to be a top choice for compact SUV shoppers, and for good reason. The latest generation offers more interior space, improved fuel economy with the hybrid option, and Honda\'s reputation for reliability. It\'s the sensible choice that doesn\'t sacrifice style or features.',
    specs: [
      { label: 'Starting Price', value: '$32,450' },
      { label: 'Engine', value: '1.5L Turbo / Hybrid' },
      { label: 'MPG', value: 'Up to 40 combined (Hybrid)' },
    ],
    link: '/vehicles/honda/cr-v',
  },
  {
    rank: 3,
    title: '2024 Toyota Land Cruiser',
    subtitle: 'The Legend Returns',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-toyota-land-cruiser-133-6616f43f7f474.jpg?crop=0.605xw:0.510xh;0.0816xw,0.314xh',
    description: 'After a brief hiatus from the U.S. market, the Land Cruiser is back with a more accessible price point and retro-inspired styling. Built on the same platform as the Lexus GX, it offers serious off-road capability with a more utilitarian character. The hybrid powertrain provides surprising efficiency for such a capable vehicle.',
    specs: [
      { label: 'Starting Price', value: '$57,345' },
      { label: 'Engine', value: '2.4L Turbo Hybrid' },
      { label: 'Horsepower', value: '326 hp (combined)' },
    ],
    link: '/vehicles/toyota/land-cruiser',
  },
  {
    rank: 2,
    title: '2025 Honda CR-V Hybrid',
    subtitle: 'Efficiency Without Compromise',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-honda-cr-v-hybrid-awd-sport-touring-102-679407cb80051.jpg?crop=0.656xw:0.554xh;0.0850xw,0.362xh',
    description: 'The CR-V Hybrid has become increasingly popular as fuel prices fluctuate. Honda\'s two-motor hybrid system delivers excellent fuel economy without sacrificing the practicality that makes the CR-V so popular. The seamless power delivery and quiet operation make it a compelling choice for daily driving.',
    specs: [
      { label: 'Starting Price', value: '$35,400' },
      { label: 'Powertrain', value: '2.0L Hybrid' },
      { label: 'MPG', value: '40 combined' },
    ],
    link: '/vehicles/honda/cr-v-hybrid',
  },
  {
    rank: 1,
    title: '2023 Kia Telluride',
    subtitle: 'Award-Winning Value',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2023-kia-telluride-x-line-101-1666960056.jpg?crop=0.655xw:0.556xh;0.168xw,0.349xh',
    description: 'The Kia Telluride continues to dominate the three-row SUV segment with its combination of style, space, and value. The X-Line and X-Pro trims add rugged styling and capability, while the interior rivals luxury competitors at a fraction of the price. It\'s no wonder it remains one of our most-researched vehicles.',
    specs: [
      { label: 'Starting Price', value: '$37,515' },
      { label: 'Engine', value: '3.8L V-6' },
      { label: 'Horsepower', value: '291 hp' },
    ],
    link: '/vehicles/kia/telluride',
  },
];

const ListiclePage = () => {
  const [isSaved, setIsSaved] = useState(false);

  // Horizontal ad component - full width
  const HorizontalAd = ({ size = 'leaderboard' }: { size?: 'leaderboard' | 'billboard' }) => (
    <div className="listicle__horizontal-ad">
      <div className={`listicle__ad-placeholder listicle__ad-placeholder--${size}`}>
        <div className="listicle__ad-content">
          <span className="listicle__ad-size">
            {size === 'leaderboard' ? '728×90' : '970×250'}
          </span>
          <span className="listicle__ad-type">
            {size === 'leaderboard' ? 'Leaderboard' : 'Billboard'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="listicle-page">
      {/* Breadcrumb */}
      <nav className="listicle__breadcrumb">
        <ol className="listicle__breadcrumb-list">
          <li className="listicle__breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="listicle__breadcrumb-item">
            <Link to="/news">News</Link>
          </li>
          <li className="listicle__breadcrumb-item listicle__breadcrumb-item--current">
            <span>Top Researched Cars 2025</span>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="listicle__header">
        <div className="listicle__header-content">
          <Link to={`/${article.categorySlug}`} className="listicle__category">
            {article.category}
          </Link>
          <h1 className="listicle__headline">{article.headline}</h1>
          <p className="listicle__subheadline">{article.subheadline}</p>
          
          <div className="listicle__meta">
            <div className="listicle__byline">
              <span className="listicle__author">
                By <span className="listicle__author-link">{article.author.name}</span>
              </span>
              <span className="listicle__date">
                Published {article.publishDate} • {article.readTime} min read
              </span>
            </div>
            <div className="listicle__actions">
              <Button
                variant="ghost"
                size="small"
                iconLeft={<Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />}
                onClick={() => setIsSaved(!isSaved)}
                className={isSaved ? 'listicle__save-btn--saved' : ''}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="small"
                iconLeft={<Share2 size={18} />}
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Top Billboard Ad */}
      <HorizontalAd size="billboard" />

      {/* Section 1: Introduction + Items 10-8 with Sidebar */}
      <div className="listicle__main-container">
        <main className="listicle__main-content">
          {/* Introduction */}
          <div className="listicle__intro">
            <p>
              Every year, millions of car shoppers turn to <em>Car and Driver</em> to research their next vehicle purchase. 
              We track which models generate the most interest, and the results often reflect broader trends in the 
              automotive market. This year's list shows a clear preference for SUVs, with a mix of luxury, value, 
              and capability dominating the rankings.
            </p>
            <p>
              From the rugged Lexus GX to the budget-friendly Chevrolet Trax, these 10 vehicles represent what 
              American car buyers are most curious about in 2025.
            </p>
          </div>

          {/* Items 10-8 */}
          <div className="listicle__items">
            {listicleItems.slice(0, 3).map((item, index) => (
              <article key={item.rank} className="listicle__item" id={`item-${item.rank}`}>
                <div className="listicle__item-rank">
                  <span className={`listicle__rank-number ${item.rank === 1 ? 'listicle__rank-number--gold' : ''}`}>
                    {item.rank}
                  </span>
                </div>
                
                <div className="listicle__item-image">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading={index > 2 ? 'lazy' : 'eager'}
                  />
                </div>
                
                <div className="listicle__item-content">
                  <h2 className="listicle__item-title">{item.title}</h2>
                  <p className="listicle__item-subtitle">{item.subtitle}</p>
                  <p className="listicle__item-description">{item.description}</p>
                  
                  {item.specs && (
                    <div className="listicle__item-specs">
                      <div className="listicle__specs-list">
                        {item.specs.map((spec) => (
                          <div key={spec.label} className="listicle__spec">
                            <span className="listicle__spec-label">{spec.label}</span>
                            <span className="listicle__spec-value">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="listicle__specs-cta">
                        <Button 
                          variant="outline" 
                          size="small"
                          iconRight={<MapPin size={14} />}
                          className="listicle__shop-btn"
                        >
                          Shop {item.title.split(' ').slice(1).join(' ')}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {item.link && (
                    <Link to={item.link} className="listicle__item-link">
                      <span>Full Review & Specs</span>
                      <ExternalLink size={14} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Sidebar Section 1 */}
        <aside className="listicle__sidebar">
          <div className="listicle__sidebar-sticky">
            <div className="listicle__ad-unit">
              <span className="listicle__ad-label">Advertisement</span>
              <div className="listicle__ad-placeholder listicle__ad-placeholder--mrec">
                <div className="listicle__ad-content">
                  <span className="listicle__ad-size">300×250</span>
                  <span className="listicle__ad-type">Medium Rectangle</span>
                </div>
              </div>
            </div>

            <div className="listicle__quick-nav">
              <h4 className="listicle__quick-nav-title">Jump to Vehicle</h4>
              <ol className="listicle__quick-nav-list">
                {listicleItems.map((item) => (
                  <li key={item.rank}>
                    <a href={`#item-${item.rank}`} className="listicle__quick-nav-link">
                      <span className="listicle__quick-nav-rank">{item.rank}</span>
                      <span className="listicle__quick-nav-name">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </aside>
      </div>

      {/* Full Width Ad Break 1 */}
      <HorizontalAd size="leaderboard" />

      {/* Section 2: Items 7-5 with Sidebar */}
      <div className="listicle__main-container">
        <main className="listicle__main-content">
          <div className="listicle__items">
            {listicleItems.slice(3, 6).map((item) => (
              <article key={item.rank} className="listicle__item" id={`item-${item.rank}`}>
                <div className="listicle__item-rank">
                  <span className={`listicle__rank-number ${item.rank === 1 ? 'listicle__rank-number--gold' : ''}`}>
                    {item.rank}
                  </span>
                </div>
                
                <div className="listicle__item-image">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                
                <div className="listicle__item-content">
                  <h2 className="listicle__item-title">{item.title}</h2>
                  <p className="listicle__item-subtitle">{item.subtitle}</p>
                  <p className="listicle__item-description">{item.description}</p>
                  
                  {item.specs && (
                    <div className="listicle__item-specs">
                      <div className="listicle__specs-list">
                        {item.specs.map((spec) => (
                          <div key={spec.label} className="listicle__spec">
                            <span className="listicle__spec-label">{spec.label}</span>
                            <span className="listicle__spec-value">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="listicle__specs-cta">
                        <Button 
                          variant="outline" 
                          size="small"
                          iconRight={<MapPin size={14} />}
                          className="listicle__shop-btn"
                        >
                          Shop {item.title.split(' ').slice(1).join(' ')}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {item.link && (
                    <Link to={item.link} className="listicle__item-link">
                      <span>Full Review & Specs</span>
                      <ExternalLink size={14} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Sidebar Section 2 */}
        <aside className="listicle__sidebar">
          <div className="listicle__sidebar-sticky">
            <div className="listicle__ad-unit">
              <span className="listicle__ad-label">Advertisement</span>
              <div className="listicle__ad-placeholder listicle__ad-placeholder--tall">
                <div className="listicle__ad-content">
                  <span className="listicle__ad-size">300×600</span>
                  <span className="listicle__ad-type">Half Page</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Full Width Ad Break 2 */}
      <HorizontalAd size="leaderboard" />

      {/* Section 3: Items 4-2 with Sidebar */}
      <div className="listicle__main-container">
        <main className="listicle__main-content">
          <div className="listicle__items">
            {listicleItems.slice(6, 9).map((item) => (
              <article key={item.rank} className="listicle__item" id={`item-${item.rank}`}>
                <div className="listicle__item-rank">
                  <span className={`listicle__rank-number ${item.rank === 1 ? 'listicle__rank-number--gold' : ''}`}>
                    {item.rank}
                  </span>
                </div>
                
                <div className="listicle__item-image">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                
                <div className="listicle__item-content">
                  <h2 className="listicle__item-title">{item.title}</h2>
                  <p className="listicle__item-subtitle">{item.subtitle}</p>
                  <p className="listicle__item-description">{item.description}</p>
                  
                  {item.specs && (
                    <div className="listicle__item-specs">
                      <div className="listicle__specs-list">
                        {item.specs.map((spec) => (
                          <div key={spec.label} className="listicle__spec">
                            <span className="listicle__spec-label">{spec.label}</span>
                            <span className="listicle__spec-value">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="listicle__specs-cta">
                        <Button 
                          variant="outline" 
                          size="small"
                          iconRight={<MapPin size={14} />}
                          className="listicle__shop-btn"
                        >
                          Shop {item.title.split(' ').slice(1).join(' ')}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {item.link && (
                    <Link to={item.link} className="listicle__item-link">
                      <span>Full Review & Specs</span>
                      <ExternalLink size={14} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Sidebar Section 3 */}
        <aside className="listicle__sidebar">
          <div className="listicle__sidebar-sticky">
            <div className="listicle__ad-unit">
              <span className="listicle__ad-label">Advertisement</span>
              <div className="listicle__ad-placeholder listicle__ad-placeholder--mrec">
                <div className="listicle__ad-content">
                  <span className="listicle__ad-size">300×250</span>
                  <span className="listicle__ad-type">Medium Rectangle</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Full Width Ad Break 3 */}
      <HorizontalAd size="leaderboard" />

      {/* Section 4: Item 1 (Winner) + Conclusion with Sidebar */}
      <div className="listicle__main-container">
        <main className="listicle__main-content">
          <div className="listicle__items">
            {listicleItems.slice(9, 10).map((item) => (
              <article key={item.rank} className="listicle__item listicle__item--winner" id={`item-${item.rank}`}>
                <div className="listicle__item-rank">
                  <span className={`listicle__rank-number ${item.rank === 1 ? 'listicle__rank-number--gold' : ''}`}>
                    {item.rank}
                  </span>
                </div>
                
                <div className="listicle__item-image">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                
                <div className="listicle__item-content">
                  <h2 className="listicle__item-title">{item.title}</h2>
                  <p className="listicle__item-subtitle">{item.subtitle}</p>
                  <p className="listicle__item-description">{item.description}</p>
                  
                  {item.specs && (
                    <div className="listicle__item-specs">
                      <div className="listicle__specs-list">
                        {item.specs.map((spec) => (
                          <div key={spec.label} className="listicle__spec">
                            <span className="listicle__spec-label">{spec.label}</span>
                            <span className="listicle__spec-value">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="listicle__specs-cta">
                        <Button 
                          variant="outline" 
                          size="small"
                          iconRight={<MapPin size={14} />}
                          className="listicle__shop-btn"
                        >
                          Shop {item.title.split(' ').slice(1).join(' ')}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {item.link && (
                    <Link to={item.link} className="listicle__item-link">
                      <span>Full Review & Specs</span>
                      <ExternalLink size={14} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Conclusion */}
          <div className="listicle__conclusion">
            <h3>What These Results Tell Us</h3>
            <p>
              The dominance of SUVs in this year's list isn't surprising—they continue to be the preferred 
              body style for American buyers. What's notable is the range of price points represented, from 
              the sub-$22,000 Chevrolet Trax to the $80,000 Tesla Cybertruck.
            </p>
            <p>
              Hybrid and electric vehicles are also well-represented, suggesting that efficiency and 
              alternative powertrains are increasingly important to shoppers. As we move into 2026, 
              expect to see even more electrified options competing for spots on this list.
            </p>
          </div>

          {/* Related Content CTA */}
          <div className="listicle__related-cta">
            <TrendingUp size={24} />
            <div className="listicle__related-cta-content">
              <h4>Explore More Rankings</h4>
              <p>See our complete vehicle rankings by category</p>
            </div>
            <Button variant="primary" iconRight={<ChevronRight size={16} />}>
              View All Rankings
            </Button>
          </div>
        </main>

        {/* Sidebar Section 4 */}
        <aside className="listicle__sidebar">
          <div className="listicle__sidebar-sticky">
            <div className="listicle__ad-unit">
              <span className="listicle__ad-label">Advertisement</span>
              <div className="listicle__ad-placeholder listicle__ad-placeholder--tall">
                <div className="listicle__ad-content">
                  <span className="listicle__ad-size">300×600</span>
                  <span className="listicle__ad-type">Half Page</span>
                </div>
              </div>
            </div>

            <div className="listicle__sidebar-widget">
              <h4 className="listicle__sidebar-widget-title">Stay Updated</h4>
              <p className="listicle__sidebar-widget-text">
                Get the latest car news and reviews delivered to your inbox.
              </p>
              <Button variant="primary" fullWidth>
                Subscribe
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Navigation */}
      <nav className="listicle__bottom-nav">
        <div className="listicle__bottom-nav-content">
          <Button variant="outline" iconLeft={<ChevronLeft size={16} />}>
            Previous Article
          </Button>
          <Button variant="outline" iconRight={<ChevronRight size={16} />}>
            Next Article
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default ListiclePage;

