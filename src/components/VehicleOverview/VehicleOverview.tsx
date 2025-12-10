import { ThumbsUp, ThumbsDown } from 'lucide-react';
import './VehicleOverview.css';

interface VehicleOverviewProps {
  author?: string;
  authorAvatar?: string;
  authorTitle?: string;
  content?: string;
  highs?: string[];
  lows?: string[];
}

const defaultHighs = [
  'Attractively low starting price',
  'Spacious interior for its class',
  'User-friendly infotainment system',
  'Composed ride quality',
  'Standard safety features',
];

const defaultLows = [
  'Modest engine power',
  'No all-wheel-drive option',
  'Basic interior materials',
  'Limited towing capacity',
];

const VehicleOverview = ({
  author = 'Austin Parsons',
  authorAvatar = 'https://hips.hearstapps.com/rover/profile_photos/f9f436d8-0271-47a0-a9fa-63e509b9d841_1735830112.jpg',
  authorTitle = 'Associate Editor',
  content = `As one of the most affordable subcompact SUVs on the market, the Chevrolet Trax delivers a high level of value with both style and grace. The Trax's appeal starts with its sharp exterior styling, a theme that continues into its quiet and well-equipped cabin. With heaps of rear legroom for adult passengers and a capacious cargo area for recreational equipment, the Trax's utility is undeniable. So, too, is its pleasant ride quality and surprisingly nimble handling. By deftly blending all those characteristics in a package that costs less than some upscale riding lawnmowers, the Trax is about as good as it gets when it comes to bang for your buck.`,
  highs = defaultHighs,
  lows = defaultLows,
}: VehicleOverviewProps) => {
  return (
    <section className="vehicle-overview">
      <div className="vehicle-overview__card">
        <div className="vehicle-overview__byline">
          <img 
            src={authorAvatar} 
            alt={author} 
            className="vehicle-overview__avatar"
          />
          <div className="vehicle-overview__author-info">
            <span className="vehicle-overview__author-name">{author}</span>
            <span className="vehicle-overview__author-title">{authorTitle}</span>
          </div>
        </div>
        <h2 className="vehicle-overview__title">Overview</h2>
        <p className="vehicle-overview__content">{content}</p>
        
        {/* Highs and Lows */}
        <div className="vehicle-overview__highlights">
          <div className="vehicle-overview__highs">
            <div className="vehicle-overview__highlights-header">
              <ThumbsUp size={18} />
              <span>Highs</span>
            </div>
            <ul className="vehicle-overview__list">
              {highs.map((item, index) => (
                <li key={index} className="vehicle-overview__list-item vehicle-overview__list-item--high">
                  <span className="vehicle-overview__list-marker">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="vehicle-overview__lows">
            <div className="vehicle-overview__highlights-header vehicle-overview__highlights-header--low">
              <ThumbsDown size={18} />
              <span>Lows</span>
            </div>
            <ul className="vehicle-overview__list">
              {lows.map((item, index) => (
                <li key={index} className="vehicle-overview__list-item vehicle-overview__list-item--low">
                  <span className="vehicle-overview__list-marker">−</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleOverview;

