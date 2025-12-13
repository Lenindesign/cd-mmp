import { ThumbsUp, ThumbsDown, Bookmark, Printer, Clock } from 'lucide-react';
import { useState } from 'react';
import './VehicleOverview.css';

interface ContentSection {
  title: string;
  content: string;
}

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
  additionalSections?: ContentSection[];
  publishedDate?: string;
  updatedDate?: string;
  readingTime?: number;
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
  'Two new exterior colors: White Sands and Apex Red replace Crimson Metallic and Nitro Yellow Metallic',
  'Changes to package availability',
  'Several options deleted including Winter/Summer Mat Package, cargo area organizer, premium carpeted floor mats, and highway safety kit',
];

const defaultVerdict = `The 2025 Chevrolet Trax stands out as one of the most affordable new vehicles on the market while still offering a surprisingly spacious interior and modern technology. Its attractively low price makes it an excellent choice for first-time buyers or anyone seeking practical, no-frills transportation.`;

const defaultContent = `As one of the most affordable subcompact SUVs on the market, the Chevrolet Trax delivers a high level of value with both style and grace. The Trax's appeal starts with its sharp exterior styling, a theme that continues into its quiet and well-equipped cabin. With heaps of rear legroom for adult passengers and a capacious cargo area for recreational equipment, the Trax's utility is undeniable. So, too, is its pleasant ride quality and surprisingly nimble handling. By deftly blending all those characteristics in a package that costs less than some upscale riding lawnmowers, the Trax is about as good as it gets when it comes to bang for your buck.`;

const defaultAdditionalSections: ContentSection[] = [
  {
    title: 'Pricing and Which One to Buy',
    content: `The Chevy Trax offers some promising extras without coming close to breaking the bank. The LT is the sweet spot between affordability and features. It comes with a big 11.0-inch infotainment touchscreen and remote start, and we'd spend the extra cash for the optional heated front seats and steering wheel. Wireless Apple CarPlay and Android Auto are also standard on LT and up, which makes navigation and playing music from your smartphone a breeze.`,
  },
  {
    title: 'Engine, Transmission, and Performance',
    content: `The Trax has a modest powertrain consisting of a 137-hp turbocharged 1.2-liter inline-three cylinder engine, a six-speed automatic transmission, and front-wheel drive. All-wheel drive isn't available even as an option. The Trax gets off the line with enough gusto to avoid feeling sluggish around town, but you'll notice the lack of power when merging or passing on the freeway. Still, we prefer its conventional six-speed automatic over the continuously variable transmissions (CVTs) found in many of its rivals, as this transmission shifts smoothly and avoids the droning found in CVT-equipped competitors such as the Honda HR-V and Subaru Crosstrek. Handling is decidedly carlike, and the Trax feels more agile than many of its rivals. Its brake pedal feels reassuringly firm underfoot, and the steering is predictable and relatively communicative given its basic-transportation mission.`,
  },
  {
    title: '0–60 MPH Times',
    content: `The Trax got to 60 mph in 8.8 seconds in our testing, which is slower than some competitors but acceptable by the admittedly low performance standards of the subcompact SUV segment.`,
  },
  {
    title: 'Fuel Economy and Real-World MPG',
    content: `While the EPA hasn't released any fuel economy information for the 2026 Chevy Trax yet, last year's model earned EPA estimates of 28 mpg in the city and 32 mpg on the highway. On our 75-mph highway fuel-economy route, the Trax returned 30 mpg.`,
  },
  {
    title: 'Interior, Comfort, and Cargo',
    content: `The Trax has a pleasant enough and easy-to-use interior with a good amount of space for drivers and passengers. Its driver-facing infotainment screen and climate controls are neatly placed, and the rest of the interior is made up of the unexceptional materials expected in this affordable segment. Compared with the old model, the Trax has a longer wheelbase than before, which has resulted in additional rear legroom and more cargo space. Its driving position also feels much lower this time around and more carlike, which we consider a plus. While tech luxuries such as remote start, heated front seats and steering wheel, and a sunroof are trim-dependent, these features help liven up the cabin.`,
  },
  {
    title: 'Infotainment and Connectivity',
    content: `Chevy gives the Trax LS and 1RS trims an 8.0-inch infotainment touchscreen as standard equipment, which is already a larger unit than what was previously offered on the fanciest version of the previous generation. An 11.0-inch infotainment touchscreen comes on trims LT and up and includes an 8.0-inch digital gauge cluster. Connectivity features include wireless Apple CarPlay and Android Auto, an available wireless phone charger, and a Wi-Fi hotspot.`,
  },
  {
    title: 'Safety and Driver-Assistance Features',
    content: `Every Trax comes standard with the Chevy Safety Assist driver-assistance suite. Key safety features include standard automated emergency braking with pedestrian detection, standard lane-departure warning and lane-keeping assist, and available adaptive cruise control.`,
  },
  {
    title: 'Warranty and Maintenance Coverage',
    content: `Chevy's basic warranty package is just that—basic—but so is the coverage of its competitors. The Kia Soul and its corporate cousin, the Hyundai Kona, both offer longer protection plans. Chevy also provides one free dealer maintenance visit within the first year of ownership, which is a nice perk. The limited warranty covers three years or 36,000 miles, the powertrain warranty covers five years or 60,000 miles, and complimentary maintenance is covered for the first visit.`,
  },
];

const VehicleOverview = ({
  author = 'Austin Parsons',
  authorAvatar = 'https://hips.hearstapps.com/rover/profile_photos/f9f436d8-0271-47a0-a9fa-63e509b9d841_1735830112.jpg',
  authorTitle = 'Associate Editor',
  content = defaultContent,
  highs = defaultHighs,
  lows = defaultLows,
  whatsNew = defaultWhatsNew,
  verdict = defaultVerdict,
  year = 2026,
  additionalSections = defaultAdditionalSections,
  publishedDate = 'Dec 10, 2025',
  updatedDate = 'Dec 10, 2025',
  readingTime = 8,
}: VehicleOverviewProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="vehicle-overview">
      <div className="vehicle-overview__card">
        <div className="vehicle-overview__byline">
          <div className="vehicle-overview__byline-left">
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
          
          <div className="vehicle-overview__byline-right">
            <div className="vehicle-overview__meta">
              <div className="vehicle-overview__dates">
                <span className="vehicle-overview__date">
                  Published {publishedDate}
                </span>
                {updatedDate !== publishedDate && (
                  <span className="vehicle-overview__date vehicle-overview__date--updated">
                    Updated {updatedDate}
                  </span>
                )}
              </div>
              <div className="vehicle-overview__reading-time">
                <Clock size={14} />
                <span>{readingTime} min read</span>
              </div>
            </div>
            
            <div className="vehicle-overview__actions">
              <button 
                className={`vehicle-overview__action-btn ${isSaved ? 'vehicle-overview__action-btn--active' : ''}`}
                onClick={() => setIsSaved(!isSaved)}
                aria-label={isSaved ? 'Remove from saved' : 'Save article'}
              >
                <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <button 
                className="vehicle-overview__action-btn"
                onClick={handlePrint}
                aria-label="Print article"
              >
                <Printer size={18} />
              </button>
            </div>
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

        {/* Additional Sections */}
        {additionalSections.map((section, index) => (
          <div key={index} className="vehicle-overview__section">
            <h3 className="vehicle-overview__section-title">{section.title}</h3>
            <p className="vehicle-overview__section-content">{section.content}</p>
          </div>
        ))}

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
