import { ChevronRight, Star } from 'lucide-react';
import './Comparison.css';

interface CompetitorVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: string;
  mpg: string;
  rating: number;
  image: string;
}

interface ComparisonProps {
  competitors: CompetitorVehicle[];
  currentVehicle: {
    make: string;
    model: string;
  };
  title?: string;
}

const Comparison = ({ competitors, currentVehicle, title = "Compare Similar Vehicles" }: ComparisonProps) => {
  return (
    <section className="comparison">
      <div className="container">
        <div className="comparison__header">
          <h2 className="comparison__title">{title}</h2>
          <p className="comparison__subtitle">
            See how the {currentVehicle.make} {currentVehicle.model} stacks up against the competition
          </p>
        </div>
        
        <div className="comparison__grid">
          {competitors.map((vehicle) => (
            <a href="#" key={vehicle.id} className="comparison__card">
              <div className="comparison__card-image">
                <img 
                  src={vehicle.image} 
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                />
              </div>
              
              <div className="comparison__card-content">
                <div className="comparison__card-header">
                  <span className="comparison__card-year">{vehicle.year}</span>
                  <h3 className="comparison__card-name">
                    {vehicle.make} {vehicle.model}
                  </h3>
                </div>
                
                <div className="comparison__card-rating">
                  <Star size={14} className="comparison__card-star" />
                  <span>{vehicle.rating.toFixed(1)}</span>
                </div>
                
                <div className="comparison__card-specs">
                  <div className="comparison__card-spec">
                    <span className="comparison__card-spec-label">Starting at</span>
                    <span className="comparison__card-spec-value">{vehicle.price}</span>
                  </div>
                  <div className="comparison__card-spec">
                    <span className="comparison__card-spec-label">MPG</span>
                    <span className="comparison__card-spec-value">{vehicle.mpg}</span>
                  </div>
                </div>
                
                <div className="comparison__card-action">
                  <span>View Details</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="comparison__cta">
          <a href="#" className="comparison__cta-btn">
            Compare All Subcompact SUVs
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Comparison;

export const defaultCompetitors: CompetitorVehicle[] = [
  {
    id: '1',
    make: 'Honda',
    model: 'HR-V',
    year: 2025,
    price: '$25,050',
    mpg: '28',
    rating: 8.0,
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/6658e659f31254000921b1fa/16-2025-honda-hr-v-sport-front-view.jpg',
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Corolla Cross',
    year: 2025,
    price: '$24,035',
    mpg: '32',
    rating: 7.5,
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/67577eabfdefd7000823540c/1-2025-toyota-corolla-cross-hybrid-front-view.jpg',
  },
  {
    id: '3',
    make: 'Hyundai',
    model: 'Kona',
    year: 2025,
    price: '$25,175',
    mpg: '30',
    rating: 8.0,
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/67fe9c57961d350008c4017f/007-2025-hyundai-kona-front-three-quarter.jpg',
  },
  {
    id: '4',
    make: 'Kia',
    model: 'Seltos',
    year: 2025,
    price: '$24,590',
    mpg: '29',
    rating: 7.5,
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/668c500afc8dbb0009e48f26/005-2025-kia-seltos-1-6l-turbo-front-view-motion.jpg',
  },
];



