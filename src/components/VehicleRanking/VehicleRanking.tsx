import { ChevronRight } from 'lucide-react';
import './VehicleRanking.css';

interface RankedVehicle {
  id: string;
  rank: number;
  name: string;
  price: string;
  image: string;
  isCurrentVehicle?: boolean;
}

interface VehicleRankingProps {
  category?: string;
  currentRank?: number;
  vehicles?: RankedVehicle[];
}

const defaultVehicles: RankedVehicle[] = [
  {
    id: '1',
    rank: 1,
    name: 'Chevrolet Trax',
    price: '$21,895',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c05811993000831eaff/001-2025-chevrolet-trax-exterior-front-view.jpg',
    isCurrentVehicle: true,
  },
  {
    id: '2',
    rank: 2,
    name: 'Mazda CX-30',
    price: '$26,690',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/67787d391248840008bc9cf3/1-2025-mazda-cx-30-turbo-front-view.jpg',
  },
  {
    id: '3',
    rank: 3,
    name: 'Kia Seltos',
    price: '$26,085',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/668c500afc8dbb0009e48f26/005-2025-kia-seltos-1-6l-turbo-front-view-motion.jpg',
  },
  {
    id: '4',
    rank: 4,
    name: 'Volkswagen Taos',
    price: '$26,920',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-volkswagen-taos-se-102-6706b4eaaf1f1.jpg?crop=0.668xw:0.751xh;0.180xw,0.148xh&resize=768:*',
  },
  {
    id: '5',
    rank: 5,
    name: 'Buick Envista',
    price: '$25,195',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-buick-envista-avenir-102-6543653d18584.jpg?crop=0.651xw:0.732xh;0.180xw,0.166xh&resize=768:*',
  },
  {
    id: '6',
    rank: 6,
    name: 'Kia Niro Hybrid',
    price: '$28,435',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2023-kia-niro-hybrid-ex-touring-101-1654274803.jpg?crop=0.668xw:0.751xh;0.189xw,0.148xh&resize=768:*',
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
                <span className="vehicle-ranking__card-rank">{vehicle.rank}</span>
                <img src={vehicle.image} alt={vehicle.name} />
              </div>
              <div className="vehicle-ranking__card-info">
                <h3 className="vehicle-ranking__card-name">{vehicle.name}</h3>
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

