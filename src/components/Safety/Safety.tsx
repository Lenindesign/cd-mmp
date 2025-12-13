import { Shield, Eye, AlertTriangle, Car, Navigation, Camera, Check, Star } from 'lucide-react';
import './Safety.css';

interface SafetyFeature {
  icon: React.ReactNode;
  name: string;
  standard: boolean;
}

interface SafetyProps {
  overallRating: number;
  crashRatings: {
    category: string;
    rating: number;
    maxRating: number;
  }[];
  features: SafetyFeature[];
  title?: string;
}

const Safety = ({ overallRating, crashRatings, features, title = "Safety and Driver-Assistance Features" }: SafetyProps) => {
  const renderStars = (rating: number, maxRating: number = 5) => {
    const stars = [];
    for (let i = 0; i < maxRating; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={`safety__star ${i < rating ? 'safety__star--filled' : 'safety__star--empty'}`}
        />
      );
    }
    return stars;
  };

  return (
    <section className="safety">
      <div className="container">
        <div className="safety__header">
          <h2 className="safety__title">{title}</h2>
        </div>
        
        <div className="safety__content">
          <div className="safety__ratings">
            <div className="safety__overall">
              <div className="safety__overall-badge">
                <Shield size={32} />
              </div>
              <div className="safety__overall-content">
                <span className="safety__overall-label">NHTSA Overall Rating</span>
                <div className="safety__overall-stars">
                  {renderStars(overallRating)}
                </div>
                <span className="safety__overall-score">{overallRating} out of 5 Stars</span>
              </div>
            </div>
            
            <div className="safety__crash-ratings">
              <h3 className="safety__crash-title">Crash Test Ratings</h3>
              <div className="safety__crash-grid">
                {crashRatings.map((rating, index) => (
                  <div key={index} className="safety__crash-item">
                    <span className="safety__crash-category">{rating.category}</span>
                    <div className="safety__crash-stars">
                      {renderStars(rating.rating, rating.maxRating)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="safety__features">
            <h3 className="safety__features-title">Driver-Assistance Features</h3>
            <div className="safety__features-list">
              {features.map((feature, index) => (
                <div key={index} className="safety__feature">
                  <div className="safety__feature-icon">
                    {feature.icon}
                  </div>
                  <span className="safety__feature-name">{feature.name}</span>
                  <span className={`safety__feature-badge ${feature.standard ? 'safety__feature-badge--standard' : 'safety__feature-badge--available'}`}>
                    {feature.standard ? (
                      <>
                        <Check size={12} />
                        Standard
                      </>
                    ) : (
                      'Available'
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;

export const defaultCrashRatings = [
  { category: 'Frontal Crash', rating: 4, maxRating: 5 },
  { category: 'Side Crash', rating: 5, maxRating: 5 },
  { category: 'Rollover', rating: 4, maxRating: 5 },
];

export const defaultSafetyFeatures: SafetyFeature[] = [
  {
    icon: <Eye size={20} />,
    name: 'Lane Keep Assist',
    standard: true,
  },
  {
    icon: <AlertTriangle size={20} />,
    name: 'Forward Collision Alert',
    standard: true,
  },
  {
    icon: <Car size={20} />,
    name: 'Automatic Emergency Braking',
    standard: true,
  },
  {
    icon: <Navigation size={20} />,
    name: 'Lane Departure Warning',
    standard: true,
  },
  {
    icon: <Camera size={20} />,
    name: 'Rear Vision Camera',
    standard: true,
  },
  {
    icon: <Eye size={20} />,
    name: 'Adaptive Cruise Control',
    standard: false,
  },
  {
    icon: <Car size={20} />,
    name: 'Blind Spot Monitoring',
    standard: false,
  },
  {
    icon: <AlertTriangle size={20} />,
    name: 'Rear Cross Traffic Alert',
    standard: false,
  },
];
















