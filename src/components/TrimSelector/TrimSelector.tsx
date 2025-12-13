import { useState } from 'react';
import { Check, Info, ChevronRight } from 'lucide-react';
import './TrimSelector.css';

interface Trim {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

interface TrimSelectorProps {
  trims: Trim[];
  title?: string;
  subtitle?: string;
}

const TrimSelector = ({ trims, title = "Pricing and Which One to Buy", subtitle }: TrimSelectorProps) => {
  const [selectedTrim, setSelectedTrim] = useState(
    trims.find(t => t.recommended)?.id || trims[0]?.id
  );

  return (
    <section className="trim-selector">
      <div className="container">
        <div className="trim-selector__header">
          <h2 className="trim-selector__title">{title}</h2>
          {subtitle && <p className="trim-selector__subtitle">{subtitle}</p>}
        </div>
        
        <div className="trim-selector__grid">
          {trims.map((trim) => (
            <div 
              key={trim.id}
              className={`trim-card ${selectedTrim === trim.id ? 'trim-card--selected' : ''} ${trim.recommended ? 'trim-card--recommended' : ''}`}
              onClick={() => setSelectedTrim(trim.id)}
            >
              {trim.recommended && (
                <div className="trim-card__badge">
                  <span>Recommended</span>
                </div>
              )}
              
              <div className="trim-card__header">
                <h3 className="trim-card__name">{trim.name}</h3>
                <div className="trim-card__price">
                  <span className="trim-card__price-label">Starting at</span>
                  <span className="trim-card__price-value">{trim.price}</span>
                </div>
              </div>
              
              <ul className="trim-card__features">
                {trim.features.map((feature, index) => (
                  <li key={index} className="trim-card__feature">
                    <Check size={16} className="trim-card__feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="trim-card__actions">
                <button className="trim-card__btn trim-card__btn--primary">
                  Build This Trim
                  <ChevronRight size={16} />
                </button>
                <button className="trim-card__btn trim-card__btn--ghost">
                  <Info size={16} />
                  More Details
                </button>
              </div>
              
              {selectedTrim === trim.id && (
                <div className="trim-card__selected-indicator">
                  <Check size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="trim-selector__disclaimer">
          <Info size={16} />
          <p>Prices shown are manufacturer's suggested retail prices (MSRP). Actual prices may vary based on location, dealer, and available inventory.</p>
        </div>
      </div>
    </section>
  );
};

export default TrimSelector;
















