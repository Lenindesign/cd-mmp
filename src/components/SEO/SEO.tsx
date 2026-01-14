import { useEffect } from 'react';

export interface SEOProps {
  /** Page title - will be appended with site name */
  title?: string;
  /** Page description for search results */
  description?: string;
  /** Canonical URL for the page */
  canonical?: string;
  /** Open Graph image URL */
  image?: string;
  /** Open Graph type (default: website) */
  type?: 'website' | 'article' | 'product';
  /** Don't append site name to title */
  titleTemplate?: boolean;
  /** Additional keywords */
  keywords?: string[];
  /** Structured data (JSON-LD) */
  structuredData?: object;
  /** No index directive */
  noIndex?: boolean;
}

const SITE_NAME = 'Car and Driver';
const DEFAULT_DESCRIPTION = 'Expert car reviews, ratings, and news. Find your next vehicle with Car and Driver\'s comprehensive research tools.';
const DEFAULT_IMAGE = 'https://www.caranddriver.com/og-image.jpg';

/**
 * SEO Component
 * 
 * Manages document head meta tags for SEO optimization.
 * Uses native DOM manipulation for React 19 compatibility.
 * 
 * @example
 * // Basic usage
 * <SEO title="2025 Toyota Camry Review" />
 * 
 * // Full usage
 * <SEO
 *   title="2025 Toyota Camry Review"
 *   description="Read our expert review of the 2025 Toyota Camry..."
 *   image="/images/camry-og.jpg"
 *   type="article"
 * />
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  titleTemplate = true,
  keywords = [],
  structuredData,
  noIndex = false,
}) => {
  useEffect(() => {
    // Set document title
    const fullTitle = title 
      ? titleTemplate 
        ? `${title} | ${SITE_NAME}`
        : title
      : SITE_NAME;
    document.title = fullTitle;

    // Helper to set/update meta tag
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    setMeta('description', description);
    
    if (keywords.length > 0) {
      setMeta('keywords', keywords.join(', '));
    }

    // Robots
    if (noIndex) {
      setMeta('robots', 'noindex, nofollow');
    } else {
      setMeta('robots', 'index, follow');
    }

    // Open Graph tags
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:image', image, true);
    setMeta('og:site_name', SITE_NAME, true);
    
    if (canonical) {
      setMeta('og:url', canonical, true);
      
      // Set canonical link
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // Structured data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function to remove structured data on unmount
    return () => {
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script && structuredData) {
        script.remove();
      }
    };
  }, [title, description, canonical, image, type, titleTemplate, keywords, structuredData, noIndex]);

  return null;
};

/**
 * Helper to create Vehicle structured data
 */
export const createVehicleStructuredData = (vehicle: {
  name: string;
  description?: string;
  image: string;
  brand: string;
  model: string;
  year: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  reviewCount?: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Car',
  name: vehicle.name,
  description: vehicle.description,
  image: vehicle.image,
  brand: {
    '@type': 'Brand',
    name: vehicle.brand,
  },
  model: vehicle.model,
  vehicleModelDate: vehicle.year,
  ...(vehicle.priceMin && {
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: vehicle.priceMin,
      highPrice: vehicle.priceMax || vehicle.priceMin,
      priceCurrency: 'USD',
    },
  }),
  ...(vehicle.rating && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: vehicle.rating,
      bestRating: 10,
      worstRating: 0,
      reviewCount: vehicle.reviewCount || 1,
    },
  }),
});

/**
 * Helper to create BreadcrumbList structured data
 */
export const createBreadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export default SEO;

