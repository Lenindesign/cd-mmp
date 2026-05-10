import { Navigate, useParams } from 'react-router-dom';
import BrandHubPage from './BrandHubPage';

interface BrandHubRouteConfig {
  make: string;
  description: string;
  logoPath: string;
  offerCounts: {
    buying: number;
    leasing: number;
    total?: number;
  };
}

const BRAND_HUB_CONFIGS: Record<string, BrandHubRouteConfig> = {
  chevrolet: {
    make: 'Chevrolet',
    description:
      'Explore Chevrolet cars, trucks, and SUVs with Car and Driver reviews, ratings, prices, specs, and current deals.',
    logoPath: '/oem-logos/group-1494791749.svg',
    offerCounts: { buying: 15, leasing: 8, total: 23 },
  },
  ford: {
    make: 'Ford',
    description:
      'Explore Ford trucks, SUVs, and performance cars with Car and Driver reviews, ratings, prices, specs, and current deals.',
    logoPath: '/oem-logos/group-1494791746.svg',
    offerCounts: { buying: 12, leasing: 6, total: 18 },
  },
  bmw: {
    make: 'BMW',
    description:
      'Explore BMW cars and SUVs with Car and Driver reviews, ratings, prices, specs, and current deals.',
    logoPath: '/oem-logos/group-1494791734.svg',
    offerCounts: { buying: 3, leasing: 5, total: 8 },
  },
  audi: {
    make: 'Audi',
    description:
      'Explore Audi cars, wagons, and SUVs with Car and Driver reviews, ratings, prices, specs, and current deals.',
    logoPath: '/oem-logos/group-1494791751.svg',
    offerCounts: { buying: 0, leasing: 5, total: 5 },
  },
  hyundai: {
    make: 'Hyundai',
    description:
      'Explore Hyundai cars, SUVs, and trucks with Car and Driver reviews, ratings, prices, specs, and current deals.',
    logoPath: '/oem-logos/group-1494791747.svg',
    offerCounts: { buying: 14, leasing: 8, total: 22 },
  },
  nissan: {
    make: 'Nissan',
    description:
      'Explore Nissan cars, trucks, and SUVs with Car and Driver reviews, ratings, prices, specs, and current deals.',
    logoPath: '/oem-logos/group-1494791748.svg',
    offerCounts: { buying: 8, leasing: 5, total: 13 },
  },
  subaru: {
    make: 'Subaru',
    description:
      'Explore Subaru cars, wagons, and SUVs with Car and Driver reviews, ratings, prices, specs, and current deals.',
    logoPath: '/oem-logos/group-1494791756.svg',
    offerCounts: { buying: 0, leasing: 5, total: 5 },
  },
  kia: {
    make: 'Kia',
    description:
      'Explore Kia cars and SUVs with Car and Driver reviews, ratings, prices, specs, and current deals.',
    logoPath: '/oem-logos/group-1494791758.svg',
    offerCounts: { buying: 10, leasing: 6, total: 16 },
  },
  mazda: {
    make: 'Mazda',
    description:
      'Explore Mazda cars, wagons, and SUVs with Car and Driver reviews, ratings, prices, specs, and current deals.',
    logoPath: '/oem-logos/group-1494791754.svg',
    offerCounts: { buying: 0, leasing: 4, total: 4 },
  },
  volkswagen: {
    make: 'Volkswagen',
    description:
      'Explore Volkswagen cars, wagons, and SUVs with Car and Driver reviews, ratings, prices, specs, and current deals.',
    logoPath: '/oem-logos/group-1494791745.svg',
    offerCounts: { buying: 0, leasing: 4, total: 4 },
  },
};

const BrandHubRoutePage = () => {
  const { brandSlug } = useParams();
  const config = brandSlug ? BRAND_HUB_CONFIGS[brandSlug] : undefined;

  if (!brandSlug || !config) {
    return <Navigate to="/vehicles" replace />;
  }

  return (
    <BrandHubPage
      make={config.make}
      brandPath={`/brands/${brandSlug}`}
      description={config.description}
      logoPath={config.logoPath}
      offerCounts={config.offerCounts}
    />
  );
};

export default BrandHubRoutePage;
