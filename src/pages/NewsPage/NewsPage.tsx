import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, ChevronRight } from 'lucide-react';
import { ArticleCard } from '../../components/Resin/ArticleCard';
import { BigStoryCard } from '../../components/Resin/BigStoryCard';
import { vehicleDatabase } from '../../data/vehicles';
import './NewsPage.css';

// Get vehicles from database for images
const getVehicleImage = (make: string, model: string): string => {
  const vehicle = vehicleDatabase.find(v => 
    v.make.toLowerCase() === make.toLowerCase() && 
    v.model.toLowerCase() === model.toLowerCase()
  );
  return vehicle?.image || '';
};

// Hero story data (featured article)
interface HeroStory {
  id: string;
  category: string;
  categorySlug: string;
  headline: string;
  subheadline: string;
  author: string;
  image: string;
  href: string;
}

// Standard story data
interface Story {
  id: string;
  category?: string;
  headline: string;
  image: string;
  href: string;
  author?: string;
  date?: string;
}

// Get specific vehicles from database
const subaruForester = vehicleDatabase.find(v => v.make === 'Subaru' && v.model === 'Forester');
const hyundaiSantaFe = vehicleDatabase.find(v => v.make === 'Hyundai' && v.model === 'Santa Fe');
const hondaAccord = vehicleDatabase.find(v => v.make === 'Honda' && v.model === 'Accord');
const toyotaCorolla = vehicleDatabase.find(v => v.make === 'Toyota' && v.model === 'Corolla');
const fordF150 = vehicleDatabase.find(v => v.make === 'Ford' && v.model === 'F-150');
const chevyTrailblazer = vehicleDatabase.find(v => v.make === 'Chevrolet' && v.model === 'Trailblazer');
const kiaTelluride = vehicleDatabase.find(v => v.make === 'Kia' && v.model === 'Telluride');
const subaruBRZ = vehicleDatabase.find(v => v.make === 'Subaru' && v.model === 'BRZ');
const porscheCayenne = vehicleDatabase.find(v => v.make === 'Porsche' && v.model === 'Cayenne');
const acuraMDX = vehicleDatabase.find(v => v.make === 'Acura' && v.model === 'MDX');

// Sample data using real vehicle images
const heroStory: HeroStory = {
  id: 'solterra-quickest-subaru',
  category: 'INSTRUMENTED TEST',
  categorySlug: 'testing-hub',
  headline: "The Refreshed Solterra EV SUV Is the Quickest Subaru We've Ever Tested",
  subheadline: "Everyone knows EVs are quick, but we're still shocked to see the Solterra's acceleration times compared with sportier Subies.",
  author: 'Jack Fitzgerald',
  // Official 2026 Subaru Solterra image from Hearst/Car and Driver
  image: 'https://hips.hearstapps.com/mtg-prod/68acee0b9a8a250002dfbc03/2-2026-subaru-solterra-first-drive.jpg',
  href: '/news/solterra-quickest-subaru',
};

const featuredStories: Story[] = [
  {
    id: '1',
    category: 'Testing Hub',
    headline: 'The Ford F-150 Lightning Sets New Truck Standards',
    image: fordF150?.image || '',
    href: '/news/ford-f150-lightning-tested',
    author: 'Dave VanderWerp',
    date: 'Dec 23, 2025',
  },
  {
    id: '2',
    category: 'Testing Hub',
    headline: 'Porsche Cayenne Turbo GT: The Ultimate SUV',
    image: porscheCayenne?.image || '',
    href: '/news/porsche-cayenne-turbo-gt-tested',
    author: 'Eric Tingwall',
    date: 'Dec 22, 2025',
  },
  {
    id: '3',
    category: 'Testing Hub',
    headline: 'Chevrolet Trailblazer RS: Compact SUV Tested',
    image: chevyTrailblazer?.image || '',
    href: '/news/chevy-trailblazer-rs-tested',
    author: 'K.C. Colwell',
    date: 'Dec 21, 2025',
  },
  {
    id: '4',
    category: 'Testing Hub',
    headline: 'Hyundai Santa Fe Hybrid: Family SUV Reimagined',
    image: hyundaiSantaFe?.image || '',
    href: '/news/hyundai-santa-fe-hybrid-tested',
    author: 'Annie White',
    date: 'Dec 20, 2025',
  },
];

const latestNews: Story[] = [
  {
    id: '5',
    category: 'Listicle',
    headline: 'The 10 Most-Researched New Cars on Car and Driver in 2025',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-lexus-gx-3-672b608154c3f.jpg?crop=0.563xw:0.562xh;0.201xw,0.178xh',
    href: '/listicle/top-researched-cars-2025',
  },
  {
    id: '6',
    category: "Buyer's Guide",
    headline: 'Best SUVs of 2025: Kia Telluride Leads the Pack',
    image: kiaTelluride?.image || '',
    href: '/news/best-suvs-2025',
  },
  {
    id: '7',
    category: 'Comparison',
    headline: 'Toyota Corolla vs Honda Civic: Which Is Better?',
    image: toyotaCorolla?.image || '',
    href: '/news/camry-vs-accord-comparison',
  },
  {
    id: '8',
    category: 'Review',
    headline: 'The 2025 Honda Accord Hybrid Gets Even Better MPG',
    image: hondaAccord?.image || '',
    href: '/news/honda-accord-hybrid-review',
  },
];

export const NewsPage: React.FC = () => {
  return (
    <div className="news-page">
      {/* Hero Section - Full Width Featured Story */}
      <section className="news-page__hero">
        <Link to={heroStory.href} className="news-page__hero-link">
          <div className="news-page__hero-image">
            <img 
              src={heroStory.image} 
              alt={heroStory.headline}
              loading="eager"
            />
          </div>
          <div className="news-page__hero-content">
            <span className="news-page__hero-category">{heroStory.category}</span>
            <h1 className="news-page__hero-headline">{heroStory.headline}</h1>
            <p className="news-page__hero-subheadline">{heroStory.subheadline}</p>
            <div className="news-page__hero-byline">
              <BadgeCheck size={16} className="news-page__hero-verified" />
              <span>Reviewed By</span>
              <span className="news-page__hero-author">{heroStory.author}</span>
            </div>
          </div>
        </Link>
      </section>

      {/* Testing Hub Section */}
      <section className="news-page__section">
        <div className="news-page__section-header">
          <h2 className="news-page__section-title">Testing Hub</h2>
          <Link to="/testing-hub" className="news-page__section-link">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="news-page__grid news-page__grid--4col">
          {featuredStories.map((story) => (
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

      {/* Latest News Section */}
      <section className="news-page__section news-page__section--alt">
        <div className="news-page__section-header">
          <h2 className="news-page__section-title">Latest News</h2>
          <Link to="/news/all" className="news-page__section-link">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="news-page__grid news-page__grid--4col">
          {latestNews.map((story) => (
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

      {/* Featured Story - Big Card */}
      <section className="news-page__section">
        <div className="news-page__section-header">
          <h2 className="news-page__section-title">Editor's Pick</h2>
        </div>
        <BigStoryCard
          imageUrl="https://hips.hearstapps.com/mtg-prod/68acee2eb249ff000249afa0/17-2026-subaru-solterra-first-drive.jpg"
          imageAlt="2026 Subaru Solterra"
          label="INSTRUMENTED TEST"
          headline="The Refreshed Solterra EV SUV Is the Quickest Subaru We've Ever Tested"
          author="Jack Fitzgerald"
          date="Dec 24, 2025"
          href="/news/solterra-quickest-subaru"
          imagePosition="left"
        />
      </section>
    </div>
  );
};

export default NewsPage;
