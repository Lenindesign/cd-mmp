import { ChevronRight, ArrowRight } from 'lucide-react';
import './VehicleRanking.css';

interface RankedVehicle {
  id: string;
  rank: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  isCurrentVehicle?: boolean;
  badge?: 'best-value' | 'editors-choice' | 'most-popular';
}

interface VehicleRankingProps {
  category?: string;
  currentRank?: number;
  vehicles?: RankedVehicle[];
}

const getBadgeLabel = (badge: string) => {
  switch (badge) {
    case 'best-value': return 'Best Value';
    case 'editors-choice': return "Editor's Choice";
    case 'most-popular': return 'Most Popular';
    default: return '';
  }
};

const defaultVehicles: RankedVehicle[] = [
  {
    id: '1',
    rank: 1,
    name: 'Chevrolet Trax',
    price: '$21,895',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c05811993000831eaff/001-2025-chevrolet-trax-exterior-front-view.jpg',
    rating: 10,
    isCurrentVehicle: true,
    badge: 'best-value',
  },
  {
    id: '2',
    rank: 2,
    name: 'Mazda CX-30',
    price: '$26,690',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/67787d391248840008bc9cf3/1-2025-mazda-cx-30-turbo-front-view.jpg',
    rating: 9.5,
    badge: 'editors-choice',
  },
  {
    id: '3',
    rank: 3,
    name: 'Kia Seltos',
    price: '$26,085',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/668c500afc8dbb0009e48f26/005-2025-kia-seltos-1-6l-turbo-front-view-motion.jpg',
    rating: 8.5,
  },
  {
    id: '4',
    rank: 4,
    name: 'Volkswagen Taos',
    price: '$26,920',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/68893d6023d6d400023e4b53/03-2026-volkswagen-taos.jpg',
    rating: 8.0,
  },
  {
    id: '5',
    rank: 5,
    name: 'Buick Envista',
    price: '$25,195',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/6866dcfac8f85a0002812ef5/001-2026-buick-envista-front-view.jpg',
    rating: 7.5,
    badge: 'most-popular',
  },
  {
    id: '6',
    rank: 6,
    name: 'Kia Niro Hybrid',
    price: '$28,435',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/6737be9bdb89a1000897284d/1-2025-kia-niro-hybrid-front-view.jpg',
    rating: 8.0,
  },
];

const VehicleRanking = ({
  category = 'Best Subcompact SUVs',
  currentRank = 1,
  vehicles = defaultVehicles,
}: VehicleRankingProps) => {
  return (
    <section className="vehicle-ranking">
      <div className="vehicle-ranking__card-wrapper">
        <div className="vehicle-ranking__header">
          <h2 className="vehicle-ranking__title">Where This Vehicle Ranks</h2>
          <a href="#" className="vehicle-ranking__category-link">
            <span className="vehicle-ranking__category-rank">#{currentRank}</span>
            <span className="vehicle-ranking__category-name">in {category}</span>
            <ChevronRight size={20} />
          </a>
        </div>

        <div className="vehicle-ranking__grid">
          {vehicles.map((vehicle) => (
            <a 
              href="#" 
              key={vehicle.id} 
              className={`vehicle-ranking__card ${vehicle.isCurrentVehicle ? 'vehicle-ranking__card--current' : ''}`}
            >
              <div className="vehicle-ranking__card-image">
                {/* Rank Badge */}
                <span className={`vehicle-ranking__card-rank ${vehicle.isCurrentVehicle ? 'vehicle-ranking__card-rank--current' : ''}`}>
                  {vehicle.rank}
                </span>
                
                {/* Value Badge */}
                {vehicle.badge && (
                  <span className={`vehicle-ranking__card-badge vehicle-ranking__card-badge--${vehicle.badge}`}>
                    {getBadgeLabel(vehicle.badge)}
                  </span>
                )}
                
                <img src={vehicle.image} alt={vehicle.name} />
                
                {/* Hover Overlay */}
                <div className="vehicle-ranking__card-overlay">
                  <span className="vehicle-ranking__card-overlay-btn">
                    View Details
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
              
              <div className="vehicle-ranking__card-info">
                <div className="vehicle-ranking__card-header">
                  <h3 className="vehicle-ranking__card-name">{vehicle.name}</h3>
                  {/* C/D Rating */}
                  <div className="vehicle-ranking__card-rating">
                    <span className="vehicle-ranking__card-rating-score">{vehicle.rating}</span>
                    <span className="vehicle-ranking__card-rating-max">/10</span>
                  </div>
                </div>
                <p className="vehicle-ranking__card-price">
                  <span className="vehicle-ranking__card-price-label">STARTING AT:</span> {vehicle.price}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleRanking;

