import { ThumbsUp, ThumbsDown } from 'lucide-react';
import './VehicleOverview.css';

interface VehicleOverviewProps {
  author?: string;
  authorAvatar?: string;
  authorTitle?: string;
  content?: string;
  highs?: string[];
  lows?: string[];
  whatsNew?: string[];
  verdict?: string;
  year?: number;
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

const defaultWhatsNew = [
  'Two new exterior colors: Cypress Gray and Marina Blue Metallic',
  'Engine now capable of running on E85 fuel',
  'Enhanced standard safety features',
];

const defaultVerdict = `The 2025 Chevrolet Trax stands out as one of the most affordable new vehicles on the market while still offering a surprisingly spacious interior and modern technology. Its attractively low price makes it an excellent choice for first-time buyers or anyone seeking practical, no-frills transportation.`;

const VehicleOverview = ({
  author = 'Austin Parsons',
  authorAvatar = 'https://hips.hearstapps.com/rover/profile_photos/f9f436d8-0271-47a0-a9fa-63e509b9d841_1735830112.jpg',
  authorTitle = 'Associate Editor',
  content = `As one of the most affordable subcompact SUVs on the market, the Chevrolet Trax delivers a high level of value with both style and grace. The Trax's appeal starts with its sharp exterior styling, a theme that continues into its quiet and well-equipped cabin. With heaps of rear legroom for adult passengers and a capacious cargo area for recreational equipment, the Trax's utility is undeniable. So, too, is its pleasant ride quality and surprisingly nimble handling. By deftly blending all those characteristics in a package that costs less than some upscale riding lawnmowers, the Trax is about as good as it gets when it comes to bang for your buck.`,
  highs = defaultHighs,
  lows = defaultLows,
  whatsNew = defaultWhatsNew,
  verdict = defaultVerdict,
  year = 2025,
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

        {/* What's New */}
        <div className="vehicle-overview__whats-new">
          <h3 className="vehicle-overview__whats-new-header">
            What's New for {year}?
          </h3>
          <ul className="vehicle-overview__whats-new-list">
            {whatsNew.map((item, index) => (
              <li key={index} className="vehicle-overview__whats-new-item">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Verdict */}
        <div className="vehicle-overview__verdict">
          <h3 className="vehicle-overview__verdict-title">The Verdict</h3>
          <p className="vehicle-overview__verdict-text">{verdict}</p>
        </div>
      </div>
    </section>
  );
};

export default VehicleOverview;

