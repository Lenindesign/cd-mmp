import { type ReactNode, useId } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './HomeCarouselSection.css';

export interface HomeCarouselSectionProps {
  title: string;
  meta: string;
  href: string;
  children: ReactNode;
  className?: string;
  ctaLabel?: string;
  layout?: 'standard' | 'articles';
}

export const HomeCarouselSection = ({
  title,
  meta,
  href,
  children,
  className,
  ctaLabel = 'View All',
  layout = 'standard',
}: HomeCarouselSectionProps) => {
  const titleId = useId();
  const classes = [
    'home-carousel-section',
    `home-carousel-section--${layout}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <section className={classes} aria-labelledby={titleId}>
      <div className="home-carousel-section__rail">
        <h2 id={titleId} className="home-carousel-section__title">{title}</h2>
        <span className="home-carousel-section__meta">{meta}</span>
        <Link to={href} className="home-carousel-section__cta">
          {ctaLabel} <ChevronRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <div className="home-carousel-section__items">
        {children}
      </div>
    </section>
  );
};

export default HomeCarouselSection;
