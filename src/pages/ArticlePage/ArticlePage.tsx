import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  ChevronRight, 
  ChevronLeft,
  Share2, 
  Camera,
  Play,
  MapPin
} from 'lucide-react';
import { Button } from '../../components/Button';
import { ImageGallery } from '../../components/Resin/ImageGallery';
import { TextBlock } from '../../components/Resin/TextBlock';
import { ArticleCard } from '../../components/Resin/ArticleCard';
import { OptimizedImage } from '../../components/OptimizedImage';
import DealerMapModal from '../../components/DealerLocatorMap/DealerMapModal';
import { vehicleDatabase } from '../../data/vehicles';
import './ArticlePage.css';

// Get vehicles from database for related articles
const fordF150 = vehicleDatabase.find(v => v.make === 'Ford' && v.model === 'F-150');
const porscheCayenne = vehicleDatabase.find(v => v.make === 'Porsche' && v.model === 'Cayenne');
const chevyTrailblazer = vehicleDatabase.find(v => v.make === 'Chevrolet' && v.model === 'Trailblazer');
const hyundaiSantaFe = vehicleDatabase.find(v => v.make === 'Hyundai' && v.model === 'Santa Fe');

// Article data interface
interface ArticleAuthor {
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

interface ArticleImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

interface RelatedArticle {
  id: string;
  title: string;
  image: string;
  href: string;
  category?: string;
}

interface ArticleData {
  id: string;
  category: string;
  categorySlug: string;
  headline: string;
  subheadline?: string;
  author: ArticleAuthor;
  publishDate: string;
  updateDate?: string;
  readTime: number;
  heroImage: ArticleImage;
  galleryImages: ArticleImage[];
  keyPoints: string[];
  relatedVehicle?: {
    make: string;
    model: string;
    year: number;
  };
  relatedArticles: RelatedArticle[];
}

// Sample article data for the Solterra story
const sampleArticle: ArticleData = {
  id: 'solterra-quickest-subaru',
  category: 'Testing Hub',
  categorySlug: 'testing-hub',
  headline: "The Refreshed Solterra EV SUV Is the Quickest Subaru We've Ever Tested",
  subheadline: "Everyone knows EVs are quick, but we're still shocked to see the Solterra's acceleration times compared with sportier Subies.",
  author: {
    name: 'Jack Fitzgerald',
    title: 'Associate News Editor',
    avatar: 'https://d2kde5ohu8qb21.cloudfront.net/files/avatars/jack-fitzgerald.jpg',
    bio: "Jack Fitzgerald's love for cars stems from his as yet unshakable addiction to Formula 1. After a brief stint as a detailer for a local dealership group in college, he knew he needed a more permanent way to drive all the new cars he couldn't afford and decided to pursue a career in auto writing.",
  },
  publishDate: 'Dec 24, 2025',
  readTime: 4,
  heroImage: {
    id: 'hero',
    src: 'https://hips.hearstapps.com/mtg-prod/68acee0b9a8a250002dfbc03/2-2026-subaru-solterra-first-drive.jpg',
    alt: '2026 Subaru Solterra front three-quarter view',
    caption: 'View Exterior Photos',
    credit: 'Marc Urbano | Car and Driver',
  },
  galleryImages: [
    {
      id: '1',
      src: 'https://hips.hearstapps.com/mtg-prod/68acee0b9a8a250002dfbc03/2-2026-subaru-solterra-first-drive.jpg',
      alt: '2026 Subaru Solterra exterior front',
      caption: '2026 Subaru Solterra Touring XT',
      credit: 'Marc Urbano | Car and Driver',
    },
    {
      id: '2',
      src: 'https://hips.hearstapps.com/mtg-prod/68acee19a58c220002df483d/8-2026-subaru-solterra-first-drive.jpg',
      alt: '2026 Subaru Solterra interior',
      caption: '2026 Subaru Solterra interior dashboard',
      credit: 'Marc Urbano | Car and Driver',
    },
    {
      id: '3',
      src: 'https://hips.hearstapps.com/mtg-prod/68acee29a58c220002df4842/14-2026-subaru-solterra-first-drive.jpg',
      alt: '2026 Subaru Solterra rear view',
      caption: '2026 Subaru Solterra rear three-quarter',
      credit: 'Marc Urbano | Car and Driver',
    },
    {
      id: '4',
      src: 'https://hips.hearstapps.com/mtg-prod/68acee2eb249ff000249afa0/17-2026-subaru-solterra-first-drive.jpg',
      alt: '2026 Subaru Solterra side profile',
      caption: '2026 Subaru Solterra in motion',
      credit: 'Marc Urbano | Car and Driver',
    },
    {
      id: '5',
      src: 'https://hips.hearstapps.com/mtg-prod/68acee109a8a250002dfbc07/4-2026-subaru-solterra-first-drive.jpg',
      alt: '2026 Subaru Solterra detail',
      caption: '2026 Subaru Solterra exterior detail',
      credit: 'Marc Urbano | Car and Driver',
    },
    {
      id: '6',
      src: 'https://hips.hearstapps.com/mtg-prod/68acee4aa58c220002df484a/27-2026-subaru-solterra-first-drive.jpg',
      alt: '2026 Subaru Solterra rear quarter',
      caption: '2026 Subaru Solterra rear quarter view',
      credit: 'Marc Urbano | Car and Driver',
    },
  ],
  keyPoints: [
    'The 2026 Solterra is the quickest Subaru we\'ve ever tested, reaching 60 mph in a brisk 4.3 seconds and covering the quarter-mile in 13.0 seconds at 101 mph.',
    'That makes it quicker than the BRZ and every WRX STI model we\'ve tested, including an S209.',
    'We don\'t expect the Solterra to hold the title for long, with both the electric Uncharted and the Trailseeker as potential upstarts.',
  ],
  relatedVehicle: {
    make: 'Subaru',
    model: 'Solterra',
    year: 2026,
  },
  relatedArticles: [
    {
      id: '1',
      title: 'The Ford F-150 Lightning Sets New Truck Standards',
      image: fordF150?.image || '',
      href: '/news/ford-f150-lightning-tested',
      category: 'Testing Hub',
    },
    {
      id: '2',
      title: 'Porsche Cayenne Turbo GT: The Ultimate SUV',
      image: porscheCayenne?.image || '',
      href: '/news/porsche-cayenne-turbo-gt-tested',
      category: 'Testing Hub',
    },
    {
      id: '3',
      title: 'Chevrolet Trailblazer RS: Compact SUV Tested',
      image: chevyTrailblazer?.image || '',
      href: '/news/chevy-trailblazer-rs-tested',
      category: 'Testing Hub',
    },
    {
      id: '4',
      title: 'Hyundai Santa Fe Hybrid: Family SUV Reimagined',
      image: hyundaiSantaFe?.image || '',
      href: '/news/hyundai-santa-fe-hybrid-tested',
      category: 'Testing Hub',
    },
  ],
};

interface ArticlePageProps {
  article?: ArticleData;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ 
  article = sampleArticle 
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showDealerMap, setShowDealerMap] = useState(false);
  const [relatedScrollPosition, setRelatedScrollPosition] = useState(0);

  // Find related vehicle in database for dealer map
  // Try exact match first, then fallback to same make
  const relatedVehicleData = article.relatedVehicle 
    ? vehicleDatabase.find(v => 
        v.make === article.relatedVehicle?.make && 
        v.model === article.relatedVehicle?.model
      ) || vehicleDatabase.find(v => v.make === article.relatedVehicle?.make)
    : null;

  // Official 2026 Subaru Solterra images from Hearst/Car and Driver
  const solterraImages = [
    'https://hips.hearstapps.com/mtg-prod/68acee0b9a8a250002dfbc03/2-2026-subaru-solterra-first-drive.jpg',
    'https://hips.hearstapps.com/mtg-prod/68acee0e9a8a250002dfbc05/3-2026-subaru-solterra-first-drive.jpg',
    'https://hips.hearstapps.com/mtg-prod/68acee29a58c220002df4842/14-2026-subaru-solterra-first-drive.jpg',
    'https://hips.hearstapps.com/mtg-prod/68acee2eb249ff000249afa0/17-2026-subaru-solterra-first-drive.jpg',
    'https://hips.hearstapps.com/mtg-prod/68acee109a8a250002dfbc07/4-2026-subaru-solterra-first-drive.jpg',
    'https://hips.hearstapps.com/mtg-prod/68acee19a58c220002df483d/8-2026-subaru-solterra-first-drive.jpg',
    'https://hips.hearstapps.com/mtg-prod/68acee4aa58c220002df484a/27-2026-subaru-solterra-first-drive.jpg',
    'https://hips.hearstapps.com/mtg-prod/68acee4c9a8a250002dfbc14/28-2026-subaru-solterra-first-drive.jpg',
  ];
  
  // Use Solterra images for this article, fallback to database if available
  const vehicleImage = solterraImages[0];
  const vehicleGallery = solterraImages;

  // Create vehicle info for dealer map modal
  const dealerMapVehicle = {
    year: article.relatedVehicle?.year || 2026,
    make: article.relatedVehicle?.make || 'Subaru',
    model: article.relatedVehicle?.model || 'Solterra',
    msrp: relatedVehicleData?.priceMin || 45000,
    priceMin: relatedVehicleData?.priceMin || 45000,
    priceMax: relatedVehicleData?.priceMax || 55000,
    image: vehicleImage,
    galleryImages: vehicleGallery,
    rating: relatedVehicleData?.staffRating || 8.5,
    bodyStyle: relatedVehicleData?.bodyStyle || 'SUV',
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.headline,
          text: article.subheadline,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const scrollRelated = (direction: 'left' | 'right') => {
    const container = document.querySelector('.article__related-scroll');
    if (container) {
      const scrollAmount = 320;
      const newPosition = direction === 'left' 
        ? relatedScrollPosition - scrollAmount 
        : relatedScrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setRelatedScrollPosition(newPosition);
    }
  };

  return (
    <article className="article-page">
      {/* Breadcrumb */}
      <nav className="article__breadcrumb" aria-label="Breadcrumb">
        <ol className="article__breadcrumb-list">
          <li className="article__breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="article__breadcrumb-item">
            <Link to={`/${article.categorySlug}`}>{article.category}</Link>
          </li>
          <li className="article__breadcrumb-item article__breadcrumb-item--current">
            <span>{article.headline.substring(0, 50)}...</span>
          </li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="article__header">
        <div className="article__header-content">
          <span className="article__category">{article.category}</span>
          
          <h1 className="article__headline">{article.headline}</h1>
          
          {article.subheadline && (
            <p className="article__subheadline">{article.subheadline}</p>
          )}

          <div className="article__meta">
            <div className="article__byline">
              <span className="article__author">
                By <Link to={`/author/${article.author.name.toLowerCase().replace(' ', '-')}`} className="article__author-link">
                  {article.author.name}
                </Link>
              </span>
              <span className="article__date">Published: {article.publishDate}</span>
            </div>

            <div className="article__actions">
              <Button
                variant="ghost"
                size="small"
                onClick={handleSave}
                iconLeft={<Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />}
                className={`article__save-btn ${isSaved ? 'article__save-btn--saved' : ''}`}
              >
                {isSaved ? 'Saved' : 'Save Article'}
              </Button>
              <Button
                variant="ghost"
                size="small"
                onClick={handleShare}
                iconLeft={<Share2 size={18} />}
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <figure className="article__hero-image">
        <div 
          className="article__hero-image-wrapper"
          onClick={() => setShowGallery(true)}
        >
          <OptimizedImage
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            aspectRatio="16/9"
          />
          <button className="article__gallery-trigger">
            <Camera size={20} />
            <span>{article.heroImage.caption}</span>
          </button>
        </div>
        <figcaption className="article__hero-caption">
          <span className="article__hero-credit">{article.heroImage.credit}</span>
        </figcaption>
      </figure>

      {/* Main Content Area with Sidebar */}
      <div className="article__main-container">
        {/* Main Content Column */}
        <div className="article__main-content">
          {/* Key Points Box */}
          <aside className="article__key-points">
            <ul className="article__key-points-list">
              {article.keyPoints.map((point, index) => (
                <li key={index} className="article__key-point">
                  <strong>•</strong> {point}
                </li>
              ))}
            </ul>
          </aside>

          {/* Article Body */}
          <div className="article__body">
        <TextBlock maxWidth="medium" size="large" dropCap>
          <TextBlock.Paragraph lead>
            <em>Welcome to</em> Car and Driver's <strong>Testing Hub</strong>, <em>where we zoom in on the test numbers. We've been pushing vehicles to their limits since 1956 to provide objective data to bolster our subjective impressions.</em>
          </TextBlock.Paragraph>

          <TextBlock.Paragraph>
            Aside from the BRZ, which is primarily focused on rear-wheel drive fun, and the WRX, which hasn't had an STI model since 2021, Subaru has been neglecting its performance side for several years now. Still, the brand's history is littered with flame-spitting rally champions and several decades of sporty models. Surely one of them put down a blistering acceleration time at our test track, right? Despite close competition from an STI S209, the title of quickest Subaru we've ever tested now belongs to an electric SUV, the 2026 Solterra.
          </TextBlock.Paragraph>
        </TextBlock>

        {/* For Sale Near You CTA */}
        <div className="article__for-sale-cta">
          <h3 className="article__for-sale-title">For Sale Near You</h3>
          <p className="article__for-sale-subtitle">
            See all results for {article.relatedVehicle?.year} {article.relatedVehicle?.make} {article.relatedVehicle?.model} for sale near you
          </p>
          <Button 
            variant="primary" 
            iconRight={<MapPin size={16} />}
            onClick={() => setShowDealerMap(true)}
          >
            Shop {article.relatedVehicle?.make} {article.relatedVehicle?.model}
          </Button>
        </div>

        {/* Inline Image */}
        {article.galleryImages[1] && (
          <figure className="article__inline-image">
            <div 
              className="article__inline-image-wrapper"
              onClick={() => setShowGallery(true)}
            >
              <OptimizedImage
                src={article.galleryImages[1].src}
                alt={article.galleryImages[1].alt}
                aspectRatio="16/9"
              />
              <button className="article__gallery-trigger article__gallery-trigger--small">
                <Camera size={16} />
                <span>View Interior Photos</span>
              </button>
            </div>
            <figcaption className="article__inline-caption">
              <span className="article__inline-credit">{article.galleryImages[1].credit}</span>
            </figcaption>
          </figure>
        )}

        <TextBlock maxWidth="medium" size="large">
          <TextBlock.Paragraph>
            Producing 338 horsepower from its dual-motor all-wheel-drive powertrain, our Solterra Touring XT test model shot to 60 mph in 4.3 seconds and hit the century mark in 11.8 seconds. To put that in the context of some of Subaru's previous performance models, a 2024 BRZ tS required 5.5 seconds to hit 60 mph and 13.7 ticks to reach 100 mph. A 2019 STI S209 we tested took 4.4 seconds to reach 60 mph, though it did beat the Solterra to triple digits, requiring just 11.2 seconds.
          </TextBlock.Paragraph>

          <TextBlock.Paragraph>
            Things get even more interesting in the quarter-mile. The BRZ needed 14.0 seconds at 101 mph to travel 1320 feet, but the Solterra and S209 tied in the drag race, crossing the quarter-mile marker at 13.0 seconds flat. With its instant torque, the Solterra charged ahead from the line, but the electric SUV spent roughly a second at its top speed of 101 mph, giving the S209 time to crawl back into the race, which it finished at 107 mph.
          </TextBlock.Paragraph>
        </TextBlock>

        {/* Second Inline Image */}
        {article.galleryImages[2] && (
          <figure className="article__inline-image">
            <div 
              className="article__inline-image-wrapper"
              onClick={() => setShowGallery(true)}
            >
              <OptimizedImage
                src={article.galleryImages[2].src}
                alt={article.galleryImages[2].alt}
                aspectRatio="16/9"
              />
              <button className="article__gallery-trigger article__gallery-trigger--small">
                <Camera size={16} />
                <span>View Exterior Photos</span>
              </button>
            </div>
            <figcaption className="article__inline-caption">
              <span className="article__inline-credit">{article.galleryImages[2].credit}</span>
            </figcaption>
          </figure>
        )}

        <TextBlock maxWidth="medium" size="large">
          <TextBlock.Paragraph>
            While Subaru hasn't confirmed any new performance models are in the pipeline, it has hinted at bringing back STI-badged models. Even still, we don't expect the Solterra to hold its acceleration title for long. The new Subaru Uncharted EV is on the way and has the same 338-hp dual-motor setup as the Solterra, but with a smaller footprint. The upcoming mid-size Trailseeker could also dethrone the Solterra. While the former model will be slightly larger, it will also have more power, with every version packing 375 horsepower.
          </TextBlock.Paragraph>

          <TextBlock.Heading level={3}>More on Subaru</TextBlock.Heading>
          
          <TextBlock.List 
            items={[
              'Subaru Brings Back the Hot Hatch with STI Concepts',
              'Subaru Solterra: Review, Pricing, and Specs',
            ]}
          />
        </TextBlock>

        {/* Shop CTA */}
        <div className="article__shop-cta">
          <div className="article__shop-cta-content">
            <span className="article__shop-cta-icon">➡️</span>
            <p className="article__shop-cta-text">
              <strong>Skip the lot.</strong> Let Car and Driver help you find your next car.
            </p>
          </div>
          <div className="article__shop-cta-buttons">
            <Button variant="primary">Shop New Cars</Button>
            <Button variant="outline">Shop Used Cars</Button>
          </div>
        </div>

        {/* Author Bio - Inside content well */}
        <aside className="article__author-bio">
          <div className="article__author-avatar">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author.name)}&background=1B5F8A&color=fff&size=96`;
              }}
            />
          </div>
          <div className="article__author-info">
            <span className="article__author-name">{article.author.name}</span>
            <span className="article__author-title">{article.author.title}</span>
            <p className="article__author-bio-text">{article.author.bio}</p>
          </div>
        </aside>
          </div>
        </div>

        {/* Sidebar with Ads */}
        <aside className="article__sidebar">
          {/* Ad Unit 1 */}
          <div className="article__ad-unit">
            <span className="article__ad-label">Advertisement</span>
            <div className="article__ad-placeholder article__ad-placeholder--tall">
              <div className="article__ad-content">
                <span className="article__ad-size">300×600</span>
                <span className="article__ad-type">Half Page Ad</span>
              </div>
            </div>
          </div>

          {/* Sticky Ad Container */}
          <div className="article__sidebar-sticky">
            {/* Ad Unit 2 */}
            <div className="article__ad-unit">
              <span className="article__ad-label">Advertisement</span>
              <div className="article__ad-placeholder">
                <div className="article__ad-content">
                  <span className="article__ad-size">300×250</span>
                  <span className="article__ad-type">Medium Rectangle</span>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="article__sidebar-widget">
              <h4 className="article__sidebar-widget-title">Get the Latest</h4>
              <p className="article__sidebar-widget-text">
                Sign up for our newsletter to get the latest car news, reviews, and buying advice.
              </p>
              <Button variant="primary" size="small" fullWidth>
                Subscribe
              </Button>
            </div>

            {/* Ad Unit 3 */}
            <div className="article__ad-unit">
              <span className="article__ad-label">Advertisement</span>
              <div className="article__ad-placeholder">
                <div className="article__ad-content">
                  <span className="article__ad-size">300×250</span>
                  <span className="article__ad-type">Medium Rectangle</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Articles - "Watch Next" */}
      <section className="article__related">
        <div className="article__related-header">
          <div className="article__related-title-group">
            <Play size={20} className="article__related-icon" />
            <h2 className="article__related-title">Watch Next</h2>
          </div>
          <div className="article__related-nav">
            <button 
              className="article__related-nav-btn"
              onClick={() => scrollRelated('left')}
              aria-label="Previous articles"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="article__related-nav-btn"
              onClick={() => scrollRelated('right')}
              aria-label="Next articles"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="article__related-scroll">
          {article.relatedArticles.map((related) => (
            <ArticleCard
              key={related.id}
              imageUrl={related.image}
              imageAlt={related.title}
              headline={related.title}
              sponsor={related.category}
              href={related.href}
              variant="vertical"
              aspectRatio="landscape"
            />
          ))}
        </div>

        {/* Category Label */}
        <div className="article__related-category">
          <span className="article__related-category-label">{article.category}</span>
        </div>
      </section>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="article__gallery-modal">
          <div className="article__gallery-modal-backdrop" onClick={() => setShowGallery(false)} />
          <div className="article__gallery-modal-content">
            <button 
              className="article__gallery-modal-close"
              onClick={() => setShowGallery(false)}
              aria-label="Close gallery"
            >
              ×
            </button>
            <ImageGallery
              images={article.galleryImages}
              title={`${article.relatedVehicle?.year} ${article.relatedVehicle?.make} ${article.relatedVehicle?.model} Photos`}
              showThumbnails
              showCounter
              showCaptions
              aspectRatio="16:9"
              variant="fullwidth"
            />
          </div>
        </div>
      )}

      {/* Dealer Map Modal */}
      <DealerMapModal
        isOpen={showDealerMap}
        onClose={() => setShowDealerMap(false)}
        vehicle={dealerMapVehicle}
      />
    </article>
  );
};

export default ArticlePage;

