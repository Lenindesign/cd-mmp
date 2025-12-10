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
                    {vehicle.badge === 'editors-choice' && (
                      <svg viewBox="0 0 261 240" width="20" height="18" xmlns="http://www.w3.org/2000/svg" className="vehicle-ranking__card-badge-icon">
                        <path fillRule="evenodd" clipRule="evenodd" d="M259.43 93.03s4.576-5.936-2.599-8.963l-25.513-10.773s-7.173-3.029-6.438-10.284l2.61-25.654s.735-7.256-7.113-6.579l-27.969 2.403s-7.853.675-11.155-5.942L169.561 3.812s-3.305-6.617-9.745-2.415l-22.898 14.93s-6.44 4.202-12.881 0l-22.895-14.93S94.7-2.805 91.4 3.812L79.703 27.238s-3.302 6.617-11.155 5.942l-27.969-2.403s-7.849-.677-7.114 6.579l2.611 25.654s.737 7.255-6.438 10.284L4.125 84.067s-7.175 3.027-2.6 8.962l16.223 21.037s4.573 5.935 0 11.868L1.526 146.971s-4.576 5.935 2.6 8.964l25.512 10.773s7.175 3.027 6.438 10.283l-2.61 25.653s-.736 7.256 7.113 6.581l27.969-2.405s7.853-.675 11.155 5.942L91.4 236.188s3.3 6.617 9.742 2.415l22.895-14.933s6.441-4.199 12.881 0l22.898 14.933s6.44 4.202 9.745-2.415l11.692-23.426s3.302-6.617 11.155-5.942l27.969 2.405s7.848.675 7.113-6.581l-2.61-25.653s-.735-7.256 6.438-10.283l25.513-10.773s7.175-3.029 2.599-8.964l-16.22-21.037s-4.573-5.933 0-11.868l16.22-21.037Z" fill="#FEFEFE"/>
                        <path fillRule="evenodd" clipRule="evenodd" fill="#1B5F8A" d="M184.986 99.46c-.14-4.326-.824-6.87-2.75-10.303-4.403-7.502-11.421-11.32-20.639-11.32-9.904 0-17.746 4.706-21.598 12.849-3.303 7.122-5.503 19.33-5.503 31.159 0 11.954 2.2 24.164 5.503 31.287 3.852 8.143 11.694 12.847 21.598 12.847 9.218 0 16.236-3.816 20.639-11.32 1.926-3.434 2.61-5.978 2.75-10.303h-12.931c-1.1 6.487-4.816 9.797-10.731 9.797-5.094 0-8.392-2.544-10.458-8.013-1.787-4.71-3.163-15.519-3.163-24.295 0-7.887 1.237-18.314 2.89-23.146 1.923-6.233 5.363-9.034 10.731-9.034 5.915 0 9.631 3.31 10.731 9.795h12.931ZM75.926 79.49v84.835h45.813v-11.828h-33.02v-28.109h19.537V112.56H88.72V91.318h31.506V79.49h-44.3Z"/>
                      </svg>
                    )}
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
                <div className="vehicle-ranking__card-price-row">
                  <p className="vehicle-ranking__card-price">
                    <span className="vehicle-ranking__card-price-label">STARTING AT:</span> {vehicle.price}
                  </p>
                  <span className="vehicle-ranking__card-details-btn">
                    View Details
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleRanking;

