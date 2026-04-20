import { useState } from 'react';
import './AdSidebar.css';

const DEFAULT_PRIMARY_URL =
  'https://d2kde5ohu8qb21.cloudfront.net/files/69387d364230820002694996/300x600.jpg';
const DEFAULT_SECONDARY_URL =
  'https://pub-4345f0f77c424370b4354c6a404ac802.r2.dev/300x250.jpg';

interface AdSidebarProps {
  imageUrl?: string;
  altText?: string;
  link?: string;
  /** Medium rectangle (300×250) below the skyscraper */
  secondaryImageUrl?: string;
  secondaryAltText?: string;
  secondaryLink?: string;
  /** When true, only the skyscraper (300×600) is rendered */
  skyscraperOnly?: boolean;
}

type CreativeVariant = 'skyscraper' | 'mediumRectangle';

function AdSidebarCreative({
  imageUrl,
  altText,
  link,
  variant,
}: {
  imageUrl: string;
  altText: string;
  link: string;
  variant: CreativeVariant;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const isMedium = variant === 'mediumRectangle';
  const sizeClass = isMedium ? 'ad-sidebar__creative--medium' : 'ad-sidebar__creative--skyscraper';

  if (imageError) {
    return (
      <div className={`ad-sidebar__placeholder ${sizeClass}`} aria-hidden>
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
        <span>Ad Space</span>
      </div>
    );
  }

  return (
    <a href={link} className="ad-sidebar__link" target="_blank" rel="noopener noreferrer">
      {imageLoading && (
        <div className={`ad-sidebar__loading ${sizeClass}`}>
          <div className="ad-sidebar__loading-spinner" />
        </div>
      )}
      <img
        src={imageUrl}
        alt={altText}
        className={`ad-sidebar__image ${sizeClass} ${imageLoading ? 'ad-sidebar__image--loading' : ''}`}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
        onLoad={() => setImageLoading(false)}
      />
    </a>
  );
}

const AdSidebar = ({
  imageUrl = DEFAULT_PRIMARY_URL,
  altText = 'Advertisement',
  link = '#',
  secondaryImageUrl = DEFAULT_SECONDARY_URL,
  secondaryAltText = 'Advertisement',
  secondaryLink = '#',
  skyscraperOnly = false,
}: AdSidebarProps) => {
  return (
    <aside className="ad-sidebar">
      <div className="ad-sidebar__container">
        <span className="ad-sidebar__label">Advertisement</span>
        <div className="ad-sidebar__stack">
          <AdSidebarCreative variant="skyscraper" imageUrl={imageUrl} altText={altText} link={link} />
          {!skyscraperOnly && (
            <AdSidebarCreative
              variant="mediumRectangle"
              imageUrl={secondaryImageUrl}
              altText={secondaryAltText}
              link={secondaryLink}
            />
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdSidebar;
