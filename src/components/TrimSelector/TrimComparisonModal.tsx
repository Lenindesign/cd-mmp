import { useEffect, useRef, useMemo } from 'react';
import { X, Check, Minus, Award } from 'lucide-react';
import type { TrimSpecs } from '../../services/trimService';
import './TrimComparisonModal.css';

export interface TrimSpec {
  category: string;
  specs: {
    name: string;
    values: (string | boolean | null)[];
  }[];
}

export interface ComparisonTrim {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
  specs?: TrimSpecs;
}

interface TrimComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  trims: ComparisonTrim[];
  vehicleName?: string;
}

const TrimComparisonModal = ({ isOpen, onClose, trims, vehicleName }: TrimComparisonModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Generate comparison data from trims
  const generateComparisonData = (): TrimSpec[] => {
    // Check if any trim has specs data
    const hasSpecs = trims.some(t => t.specs);

    const categories: TrimSpec[] = [
      {
        category: 'Performance',
        specs: [
          { name: 'Engine', values: trims.map(t => t.specs?.engine || inferFromFeatures(t, 'engine', 'turbo', 'v6', 'v8', 'electric', 'hybrid') || '—') },
          { name: 'Horsepower', values: trims.map(t => t.specs?.horsepower || inferHorsepower(t) || '—') },
          { name: 'Torque', values: trims.map(t => t.specs?.torque || '—') },
          { name: 'Transmission', values: trims.map(t => t.specs?.transmission || '—') },
          { name: 'Drivetrain', values: trims.map(t => t.specs?.drivetrain || inferDrivetrain(t) || '—') },
          { name: 'Fuel Economy', values: trims.map(t => t.specs?.fuelEconomy || '—') },
        ],
      },
      {
        category: 'Interior & Comfort',
        specs: [
          { name: 'Seating Capacity', values: trims.map(t => t.specs?.seating || '5') },
          { name: 'Cargo Space', values: trims.map(t => t.specs?.cargo || '—') },
          { name: 'Heated Seats', values: trims.map(t => hasSpecs ? (t.specs?.heatedSeats ?? false) : inferFeature(t, 'heated seat')) },
          { name: 'Ventilated Seats', values: trims.map(t => hasSpecs ? (t.specs?.ventilatedSeats ?? false) : inferFeature(t, 'ventilated')) },
          { name: 'Leather Seats', values: trims.map(t => hasSpecs ? (t.specs?.leatherSeats ?? false) : inferFeature(t, 'leather')) },
          { name: 'Sunroof/Moonroof', values: trims.map(t => hasSpecs ? (t.specs?.sunroof ?? false) : inferFeature(t, 'sunroof', 'moonroof', 'panoramic')) },
        ],
      },
      {
        category: 'Technology',
        specs: [
          { name: 'Navigation System', values: trims.map(t => hasSpecs ? (t.specs?.navigationSystem ?? false) : inferFeature(t, 'navigation')) },
          { name: 'Premium Audio', values: trims.map(t => hasSpecs ? (t.specs?.premiumAudio ?? false) : inferFeature(t, 'bose', 'harman', 'jbl', 'b&o', 'bang', 'premium audio')) },
          { name: 'Wireless Charging', values: trims.map(t => hasSpecs ? (t.specs?.wirelessCharging ?? false) : inferFeature(t, 'wireless charg')) },
          { name: 'Remote Start', values: trims.map(t => hasSpecs ? (t.specs?.remoteStart ?? false) : inferFeature(t, 'remote start')) },
          { name: 'Heads-Up Display', values: trims.map(t => hasSpecs ? (t.specs?.headsUpDisplay ?? false) : inferFeature(t, 'head-up', 'heads-up', 'hud')) },
        ],
      },
      {
        category: 'Safety & Driver Assistance',
        specs: [
          { name: 'Adaptive Cruise Control', values: trims.map(t => hasSpecs ? (t.specs?.adaptiveCruise ?? false) : inferFeature(t, 'adaptive cruise', 'smart cruise')) },
          { name: 'Blind Spot Monitor', values: trims.map(t => hasSpecs ? (t.specs?.blindSpotMonitor ?? false) : inferFeature(t, 'blind spot')) },
          { name: 'Lane Departure Warning', values: trims.map(t => hasSpecs ? (t.specs?.laneDepartureWarning ?? true) : inferFeature(t, 'lane keep', 'lane departure', 'safety sense', 'co-pilot', 'sensing')) },
          { name: 'Auto Emergency Braking', values: trims.map(t => hasSpecs ? (t.specs?.automaticEmergencyBraking ?? true) : inferFeature(t, 'emergency brak', 'auto brake', 'collision', 'safety sense', 'co-pilot', 'sensing')) },
          { name: 'Parking Assist', values: trims.map(t => hasSpecs ? (t.specs?.parkingAssist ?? false) : inferFeature(t, 'parking assist', 'park assist')) },
          { name: 'Surround View Camera', values: trims.map(t => hasSpecs ? (t.specs?.surroundViewCamera ?? false) : inferFeature(t, 'surround view', '360', 'surround vision', 'panoramic view')) },
        ],
      },
      {
        category: 'Warranty',
        specs: [
          { name: 'Basic Warranty', values: trims.map(() => '3 years / 36,000 miles') },
          { name: 'Powertrain Warranty', values: trims.map(() => '5 years / 60,000 miles') },
        ],
      },
    ];

    return categories;
  };

  // Helper to infer feature from features list
  const inferFeature = (trim: ComparisonTrim, ...keywords: string[]): boolean | null => {
    const featuresLower = trim.features.map(f => f.toLowerCase()).join(' ');
    return keywords.some(kw => featuresLower.includes(kw.toLowerCase())) ? true : null;
  };

  // Helper to infer text value from features
  const inferFromFeatures = (trim: ComparisonTrim, ...keywords: string[]): string | null => {
    for (const feature of trim.features) {
      const featureLower = feature.toLowerCase();
      for (const kw of keywords) {
        if (featureLower.includes(kw.toLowerCase())) {
          return feature;
        }
      }
    }
    return null;
  };

  // Helper to infer horsepower from features
  const inferHorsepower = (trim: ComparisonTrim): string | null => {
    for (const feature of trim.features) {
      const match = feature.match(/(\d+)\s*hp/i);
      if (match) {
        return `${match[1]} hp`;
      }
    }
    return null;
  };

  // Helper to infer drivetrain from features
  const inferDrivetrain = (trim: ComparisonTrim): string | null => {
    const featuresLower = trim.features.map(f => f.toLowerCase()).join(' ');
    if (featuresLower.includes('awd') || featuresLower.includes('all-wheel') || featuresLower.includes('4matic') || featuresLower.includes('xdrive') || featuresLower.includes('quattro')) {
      return 'AWD';
    }
    if (featuresLower.includes('4wd') || featuresLower.includes('4x4')) {
      return '4WD';
    }
    if (featuresLower.includes('rwd') || featuresLower.includes('rear-wheel')) {
      return 'RWD';
    }
    return null;
  };

  // Memoize comparison data
  const comparisonData = useMemo(() => generateComparisonData(), [trims]);

  // Analyze why the recommended trim is the best choice
  const recommendationAnalysis = useMemo(() => {
    const recommendedTrim = trims.find(t => t.recommended);
    if (!recommendedTrim) return null;

    // Parse prices for comparison
    const parsePrice = (price: string) => {
      const num = price.replace(/[^0-9]/g, '');
      return parseInt(num, 10) || 0;
    };

    const sortedByPrice = [...trims].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    const recommendedPrice = parsePrice(recommendedTrim.price);
    const highestPrice = parsePrice(sortedByPrice[sortedByPrice.length - 1].price);
    const pricePosition = sortedByPrice.findIndex(t => t.id === recommendedTrim.id);

    // Count features for each trim
    const countFeatures = (trim: ComparisonTrim) => {
      if (!trim.specs) return 0;
      let count = 0;
      if (trim.specs.heatedSeats) count++;
      if (trim.specs.ventilatedSeats) count++;
      if (trim.specs.leatherSeats) count++;
      if (trim.specs.sunroof) count++;
      if (trim.specs.navigationSystem) count++;
      if (trim.specs.premiumAudio) count++;
      if (trim.specs.wirelessCharging) count++;
      if (trim.specs.remoteStart) count++;
      if (trim.specs.headsUpDisplay) count++;
      return count;
    };

    // Count safety features for each trim
    const countSafetyFeatures = (trim: ComparisonTrim) => {
      if (!trim.specs) return 0;
      let count = 0;
      if (trim.specs.adaptiveCruise) count++;
      if (trim.specs.blindSpotMonitor) count++;
      if (trim.specs.laneDepartureWarning) count++;
      if (trim.specs.automaticEmergencyBraking) count++;
      if (trim.specs.parkingAssist) count++;
      if (trim.specs.surroundViewCamera) count++;
      return count;
    };

    const recommendedFeatures = countFeatures(recommendedTrim);
    const recommendedSafety = countSafetyFeatures(recommendedTrim);
    
    // Find max features across all trims
    const maxFeatures = Math.max(...trims.map(countFeatures));
    const maxSafety = Math.max(...trims.map(countSafetyFeatures));

    // Build analysis points
    const points: { icon: 'value' | 'features' | 'safety' | 'balance'; title: string; description: string }[] = [];

    // Value analysis
    if (pricePosition === 0) {
      points.push({
        icon: 'value',
        title: 'Most Affordable',
        description: `At ${recommendedTrim.price}, this is the lowest-priced option while still offering essential features.`
      });
    } else if (pricePosition < sortedByPrice.length / 2) {
      const savings = highestPrice - recommendedPrice;
      points.push({
        icon: 'value',
        title: 'Best Value',
        description: `Save up to $${savings.toLocaleString()} compared to higher trims while getting ${recommendedFeatures} premium features.`
      });
    } else if (recommendedFeatures === maxFeatures) {
      points.push({
        icon: 'value',
        title: 'Premium Without the Premium Price',
        description: `Gets you top-tier features at ${recommendedTrim.price}, offering better value than the highest trim.`
      });
    }

    // Features analysis
    if (recommendedFeatures >= maxFeatures * 0.7) {
      const featureList: string[] = [];
      if (recommendedTrim.specs?.heatedSeats) featureList.push('heated seats');
      if (recommendedTrim.specs?.leatherSeats) featureList.push('leather');
      if (recommendedTrim.specs?.sunroof) featureList.push('sunroof');
      if (recommendedTrim.specs?.premiumAudio) featureList.push('premium audio');
      if (recommendedTrim.specs?.wirelessCharging) featureList.push('wireless charging');
      
      if (featureList.length > 0) {
        points.push({
          icon: 'features',
          title: 'Loaded with Features',
          description: `Includes ${featureList.slice(0, 3).join(', ')}${featureList.length > 3 ? ` and ${featureList.length - 3} more` : ''} that lower trims lack.`
        });
      }
    } else if (recommendedFeatures > 0) {
      const baseTrim = sortedByPrice[0];
      const baseFeatures = countFeatures(baseTrim);
      const additionalFeatures = recommendedFeatures - baseFeatures;
      if (additionalFeatures > 0) {
        points.push({
          icon: 'features',
          title: 'Smart Upgrades',
          description: `Adds ${additionalFeatures} key comfort and convenience features over the base model.`
        });
      }
    }

    // Safety analysis
    if (recommendedSafety >= maxSafety * 0.8) {
      const safetyList: string[] = [];
      if (recommendedTrim.specs?.adaptiveCruise) safetyList.push('adaptive cruise');
      if (recommendedTrim.specs?.blindSpotMonitor) safetyList.push('blind spot monitoring');
      if (recommendedTrim.specs?.surroundViewCamera) safetyList.push('360° camera');
      
      points.push({
        icon: 'safety',
        title: 'Enhanced Safety',
        description: safetyList.length > 0 
          ? `Includes ${safetyList.slice(0, 2).join(' and ')} for added peace of mind.`
          : `Comes with ${recommendedSafety} advanced driver assistance features.`
      });
    } else if (recommendedSafety > countSafetyFeatures(sortedByPrice[0])) {
      points.push({
        icon: 'safety',
        title: 'Better Safety Suite',
        description: `Upgrades safety with features like blind spot monitoring not found on base trims.`
      });
    }

    // Overall balance
    if (points.length < 3 && pricePosition > 0 && pricePosition < sortedByPrice.length - 1) {
      points.push({
        icon: 'balance',
        title: 'Perfect Balance',
        description: `Strikes the ideal balance between price and features—you get what matters without overpaying.`
      });
    }

    return {
      trim: recommendedTrim,
      points: points.slice(0, 3) // Max 3 points
    };
  }, [trims]);

  // Early return after all hooks
  if (!isOpen || trims.length === 0) return null;

  const renderValue = (value: string | boolean | null) => {
    if (value === true) {
      return (
        <span className="comparison-value comparison-value--yes">
          <Check size={18} />
          <span className="sr-only">Yes</span>
        </span>
      );
    }
    if (value === false) {
      return (
        <span className="comparison-value comparison-value--no">
          <X size={16} />
          <span className="sr-only">No</span>
        </span>
      );
    }
    if (value === null || value === '—') {
      return (
        <span className="comparison-value comparison-value--na">
          <Minus size={16} />
          <span className="sr-only">Not available</span>
        </span>
      );
    }
    return <span className="comparison-value comparison-value--text">{value}</span>;
  };

  return (
    <div className="trim-comparison-modal" onClick={handleBackdropClick}>
      <div className="trim-comparison-modal__content" ref={modalRef}>
        {/* Header */}
        <header className="trim-comparison-modal__header">
          <div className="trim-comparison-modal__header-content">
            <h2 className="trim-comparison-modal__title">Compare Trims</h2>
            {vehicleName && (
              <p className="trim-comparison-modal__subtitle">{vehicleName}</p>
            )}
          </div>
          <button
            className="trim-comparison-modal__close"
            onClick={onClose}
            aria-label="Close comparison"
          >
            <X size={24} />
          </button>
        </header>

        {/* Scrollable content area */}
        <div className="trim-comparison-modal__body">
          {/* Why We Recommend Section - Scrolls with content */}
          {recommendationAnalysis && recommendationAnalysis.points.length > 0 && (
            <div className="recommendation-analysis">
              <div className="recommendation-analysis__header">
                <Award size={20} className="recommendation-analysis__icon" />
                <h3 className="recommendation-analysis__title">
                  Why We Recommend the {recommendationAnalysis.trim.name}
                </h3>
              </div>
              <div className="recommendation-analysis__points">
                {recommendationAnalysis.points.map((point, index) => (
                  <div key={index} className="recommendation-point">
                    <div className="recommendation-point__content">
                      <h4 className="recommendation-point__title">{point.title}</h4>
                      <p className="recommendation-point__description">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comparison Table - Header is sticky */}
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              {/* Trim Headers - Sticky */}
              <thead className="comparison-table__head">
                <tr>
                  <th className="comparison-table__corner">
                    <span className="sr-only">Feature</span>
                  </th>
                  {trims.map((trim) => (
                    <th key={trim.id} className="comparison-table__trim-header">
                      <div className="trim-header-content">
                        {trim.recommended && (
                          <span className="trim-header-badge">Recommended</span>
                        )}
                        <span className="trim-header-name">{trim.name}</span>
                        <span className="trim-header-price">{trim.price}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Comparison Body */}
              <tbody className="comparison-table__body">
                {comparisonData.map((category) => (
                  <>
                    {/* Category Header */}
                    <tr key={category.category} className="comparison-table__category-row">
                      <td colSpan={trims.length + 1} className="comparison-table__category">
                        {category.category}
                      </td>
                    </tr>
                    {/* Specs */}
                    {category.specs.map((spec) => (
                      <tr key={spec.name} className="comparison-table__spec-row">
                        <td className="comparison-table__spec-name">{spec.name}</td>
                        {spec.values.map((value, index) => (
                          <td
                            key={index}
                            className={`comparison-table__spec-value ${trims[index]?.recommended ? 'comparison-table__spec-value--recommended' : ''}`}
                          >
                            {renderValue(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer with Key Features Summary */}
        <footer className="trim-comparison-modal__footer">
          <div className="comparison-legend">
            <span className="comparison-legend__item">
              <Check size={16} className="comparison-legend__icon comparison-legend__icon--yes" />
              <span>Included</span>
            </span>
            <span className="comparison-legend__item">
              <Minus size={16} className="comparison-legend__icon comparison-legend__icon--na" />
              <span>Not Available / Unknown</span>
            </span>
          </div>
          <p className="comparison-disclaimer">
            Specifications shown are for reference only. Please verify with dealer for exact features and pricing.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TrimComparisonModal;

