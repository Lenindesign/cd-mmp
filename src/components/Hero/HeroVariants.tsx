import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Bookmark, ArrowRight, RefreshCw, MapPin } from 'lucide-react';
import { getAvailableYears } from '../../services/vehicleService';
import './Hero.css';
import './HeroVariants.css';

interface HeroProps {
  vehicle: {
    make: string;
    model: string;
    year: number;
    tagline: string;
    rating: number;
    priceRange: string;
    image: string;
    galleryImages?: string[];
    photographer?: string;
  };
}

// Shared hero content component
const HeroContent = ({ vehicle, children }: { vehicle: HeroProps['vehicle']; children: React.ReactNode }) => {
  const [isFavorited, setIsFavorited] = useState(true);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const availableYears = getAvailableYears(vehicle.make, vehicle.model);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleYearSelect = (year: string) => {
    setIsYearDropdownOpen(false);
    if (parseInt(year) !== vehicle.year) {
      const modelSlug = vehicle.model.replace(/\s+/g, '-');
      navigate(`/${year}/${vehicle.make}/${modelSlug}`);
    }
  };

  // Fallback placeholder image (Lamborghini Revuelto)
  const PLACEHOLDER_IMAGE = 'https://d2kde5ohu8qb21.cloudfront.net/files/659f9ed490e84500088bd486/012-2024-lamborghini-revuelto.jpg';

  const galleryImages = vehicle.galleryImages || [];
  const mainImage = vehicle.image || PLACEHOLDER_IMAGE;

  return (
    <section className="hero">
      {/* Breadcrumb */}
      <div className="hero__breadcrumb">
        <div className="container">
          <nav className="hero__breadcrumb-nav" aria-label="Breadcrumb">
            <a href="#" className="hero__breadcrumb-link">Home</a>
            <span className="hero__breadcrumb-sep">/</span>
            <a href="#" className="hero__breadcrumb-link">{vehicle.make}</a>
            <span className="hero__breadcrumb-sep">/</span>
            <a href="#" className="hero__breadcrumb-link hero__breadcrumb-current">{vehicle.model}</a>
          </nav>
        </div>
      </div>

      {/* Top Actions Bar */}
      <div className="hero__top-bar">
        <div className="container">
          <div className="hero__top-bar-content">
            <div className="hero__year-selector-wrapper" ref={yearDropdownRef}>
              <button 
                className={`hero__year-selector ${isYearDropdownOpen ? 'hero__year-selector--open' : ''}`}
                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              >
                <span>{vehicle.year}</span>
                <ChevronDown size={16} className={isYearDropdownOpen ? 'hero__year-chevron--open' : ''} />
              </button>
              
              {isYearDropdownOpen && availableYears.length > 1 && (
                <ul className="hero__year-dropdown" role="listbox">
                  {availableYears.map((year) => (
                    <li 
                      key={year}
                      className={`hero__year-option ${parseInt(year) === vehicle.year ? 'hero__year-option--selected' : ''}`}
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button 
              className={`hero__favorites-btn ${isFavorited ? 'hero__favorites-btn--active' : ''}`}
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Bookmark size={16} fill={isFavorited ? 'currentColor' : 'none'} />
              <span>{isFavorited ? 'SAVED' : 'SAVE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="hero__main">
        <div className="container">
          <div className="hero__title-row">
            <h1 className="hero__title">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <div className="hero__rating">
              <div className="hero__rating-numbers">
                <span className="hero__rating-score">{vehicle.rating}</span>
                <span className="hero__rating-max">/10</span>
              </div>
              <div className="hero__rating-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16">
                  <path d="m22.735 8.905-.955-.955V6.518a4.253 4.253 0 0 0-4.273-4.273h-1.432l-.955-.954C13.45-.38 10.61-.38 8.938 1.29l-.955.954H6.551a4.253 4.253 0 0 0-4.273 4.273V7.95l-.955.955c-1.67 1.671-1.67 4.512 0 6.183l.955.955v1.432a4.253 4.253 0 0 0 4.273 4.273h1.432l.955.954c1.67 1.671 4.511 1.671 6.182 0l.955-.954h1.432a4.253 4.253 0 0 0 4.273-4.273v-1.432l.955-.955c1.67-1.671 1.67-4.512 0-6.183zm-6.421 1.671-4.512 4.512c-.238.238-.477.477-.955.477-.477 0-.716-.239-.954-.477l-2.149-2.149c-.477-.477-.477-1.432 0-1.91.478-.477 1.432-.477 1.91 0l1.193 1.194 3.557-3.318c.477-.716 1.432-.716 1.91 0a1.154 1.154 0 0 1 0 1.671z" fill="currentColor"/>
                </svg>
                <span>C/D RATING</span>
              </div>
            </div>
          </div>

          <div className="hero__gallery">
            <div className="hero__gallery-main">
              <img 
                src={mainImage} 
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className="hero__gallery-main-img"
              />
            </div>
            <div className="hero__gallery-thumbs">
              {galleryImages.slice(0, 3).map((img, index) => (
                <div key={index} className="hero__gallery-thumb">
                  <img src={img} alt={`${vehicle.model} view ${index + 1}`} />
                  {index === 2 && (
                    <div className="hero__gallery-thumb-overlay">
                      <span>View Photos</span>
                      <ArrowRight size={18} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hero__photo-credit">
            <span className="hero__photographer">{vehicle.photographer || 'MICHAEL SIMARI'}</span>
            <span className="hero__credit-sep">|</span>
            <span className="hero__publication">CAR AND DRIVER</span>
          </div>

          {/* CTA Section - Injected by variant */}
          {children}
        </div>
      </div>
    </section>
  );
};

// Shared Accolades Component
const Accolades = () => (
  <div className="hero__accolades">
    <div className="hero__accolades-header">
      <span className="hero__accolades-title">
        <em>Car and Driver</em> Accolades
      </span>
      <a href="#" className="hero__accolades-link">What's this?</a>
    </div>
    <div className="hero__accolades-badges">
      <div className="hero__accolade">
        <div className="hero__accolade-icon hero__accolade-icon--ec">
          <img 
            src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE" 
            alt="Editor's Choice"
            width="48"
            height="44"
          />
        </div>
        <span className="hero__accolade-label">Editors'<br/>Choice</span>
      </div>
      <div className="hero__accolade">
        <div className="hero__accolade-icon hero__accolade-icon--10best">
          <img 
            src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg" 
            alt="10Best"
            width="48"
            height="54"
          />
        </div>
        <span className="hero__accolade-label">10Best</span>
      </div>
    </div>
  </div>
);

// =============================================
// VARIANT 1: Original v2 - Baseline
// =============================================
export const HeroV1 = ({ vehicle }: HeroProps) => {
  return (
    <HeroContent vehicle={vehicle}>
      <div className="hero__bottom-row hero-v1">
        <div className="hero__msrp">
          <span className="hero__msrp-label">MSRP</span>
          <span className="hero__msrp-price">{vehicle.priceRange}</span>
        </div>
        
        <div className="hero-v1__ctas">
          <button className="hero-v1__btn hero-v1__btn--new">
            <span className="hero-v1__btn-label">SHOP NEW</span>
            <span className="hero-v1__btn-count"><MapPin size={12} />42 near you</span>
          </button>
          <button className="hero-v1__btn hero-v1__btn--used">
            <span className="hero-v1__btn-label">SHOP USED</span>
            <span className="hero-v1__btn-count"><MapPin size={12} />128 near you</span>
          </button>
          <button className="hero-v1__trade-in">
            <RefreshCw size={16} />
            <span>TRADE-IN VALUE</span>
          </button>
        </div>

        <Accolades />
      </div>
    </HeroContent>
  );
};

// =============================================
// VARIANT 2: Larger buttons with prominent counts
// =============================================
export const HeroV2 = ({ vehicle }: HeroProps) => {
  return (
    <HeroContent vehicle={vehicle}>
      <div className="hero__bottom-row hero-v2">
        <div className="hero__msrp">
          <span className="hero__msrp-label">MSRP</span>
          <span className="hero__msrp-price">{vehicle.priceRange}</span>
        </div>
        
        <div className="hero-v2__ctas">
          <button className="hero-v2__btn hero-v2__btn--new">
            <span className="hero-v2__btn-count-large">42</span>
            <div className="hero-v2__btn-text">
              <span className="hero-v2__btn-label">SHOP NEW</span>
              <span className="hero-v2__btn-sublabel">listings near you</span>
            </div>
          </button>
          <button className="hero-v2__btn hero-v2__btn--used">
            <span className="hero-v2__btn-count-large">128</span>
            <div className="hero-v2__btn-text">
              <span className="hero-v2__btn-label">SHOP USED</span>
              <span className="hero-v2__btn-sublabel">listings near you</span>
            </div>
          </button>
          <button className="hero-v2__trade-in">
            <RefreshCw size={16} />
            <span>TRADE-IN VALUE</span>
          </button>
        </div>

        <Accolades />
      </div>
    </HeroContent>
  );
};

// =============================================
// VARIANT 3: Horizontal inline with badge counts
// =============================================
export const HeroV3 = ({ vehicle }: HeroProps) => {
  return (
    <HeroContent vehicle={vehicle}>
      <div className="hero__bottom-row hero-v3">
        <div className="hero__msrp">
          <span className="hero__msrp-label">MSRP</span>
          <span className="hero__msrp-price">{vehicle.priceRange}</span>
        </div>
        
        <div className="hero-v3__ctas">
          <button className="hero-v3__btn hero-v3__btn--new">
            SHOP NEW
            <span className="hero-v3__badge">42</span>
          </button>
          <button className="hero-v3__btn hero-v3__btn--used">
            SHOP USED
            <span className="hero-v3__badge hero-v3__badge--used">128</span>
          </button>
          <button className="hero-v3__trade-in">
            <RefreshCw size={16} />
            <span>TRADE-IN VALUE</span>
          </button>
        </div>

        <Accolades />
      </div>
    </HeroContent>
  );
};

// =============================================
// VARIANT 4: Card-style CTA with inventory preview
// =============================================
export const HeroV4 = ({ vehicle }: HeroProps) => {
  return (
    <HeroContent vehicle={vehicle}>
      <div className="hero__bottom-row hero-v4">
        <div className="hero__msrp">
          <span className="hero__msrp-label">MSRP</span>
          <span className="hero__msrp-price">{vehicle.priceRange}</span>
        </div>
        
        <div className="hero-v4__ctas">
          <div className="hero-v4__card hero-v4__card--new">
            <div className="hero-v4__card-header">
              <span className="hero-v4__card-title">New Inventory</span>
              <span className="hero-v4__card-count">42 available</span>
            </div>
            <button className="hero-v4__btn hero-v4__btn--new">
              <span>SHOP NEW</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="hero-v4__card hero-v4__card--used">
            <div className="hero-v4__card-header">
              <span className="hero-v4__card-title">Used & Certified</span>
              <span className="hero-v4__card-count">128 available</span>
            </div>
            <button className="hero-v4__btn hero-v4__btn--used">
              <span>SHOP USED</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <button className="hero-v4__trade-in">
            <RefreshCw size={16} />
            <span>TRADE-IN VALUE</span>
          </button>
        </div>

        <Accolades />
      </div>
    </HeroContent>
  );
};

// =============================================
// VARIANT 5: Dark theme buttons
// =============================================
export const HeroV5 = ({ vehicle }: HeroProps) => {
  return (
    <HeroContent vehicle={vehicle}>
      <div className="hero__bottom-row hero-v5">
        <div className="hero__msrp">
          <span className="hero__msrp-label">MSRP</span>
          <span className="hero__msrp-price">{vehicle.priceRange}</span>
        </div>
        
        <div className="hero-v5__ctas">
          <button className="hero-v5__btn hero-v5__btn--new">
            <span className="hero-v5__btn-label">SHOP NEW</span>
            <span className="hero-v5__btn-count">42 near you</span>
          </button>
          <button className="hero-v5__btn hero-v5__btn--used">
            <span className="hero-v5__btn-label">SHOP USED</span>
            <span className="hero-v5__btn-count">128 near you</span>
          </button>
          <button className="hero-v5__trade-in">
            <span>TRADE-IN VALUE</span>
          </button>
        </div>

        <Accolades />
      </div>
    </HeroContent>
  );
};

// =============================================
// VARIANT 10: Split button with unified look
// =============================================
export const HeroV10 = ({ vehicle }: HeroProps) => {
  return (
    <HeroContent vehicle={vehicle}>
      <div className="hero__bottom-row hero-v10">
        <div className="hero__msrp">
          <span className="hero__msrp-label">MSRP</span>
          <span className="hero__msrp-price">{vehicle.priceRange}</span>
        </div>
        
        <div className="hero-v10__ctas">
          <div className="hero-v10__shop-group">
            <button className="hero-v10__btn hero-v10__btn--new">
              <span className="hero-v10__btn-label">SHOP NEW</span>
              <span className="hero-v10__btn-count">42</span>
            </button>
            <button className="hero-v10__btn hero-v10__btn--used">
              <span className="hero-v10__btn-label">SHOP USED</span>
              <span className="hero-v10__btn-count">128</span>
            </button>
          </div>
          <button className="hero-v10__trade-in">
            <RefreshCw size={16} />
            <span>TRADE-IN VALUE</span>
          </button>
        </div>

        <Accolades />
      </div>
    </HeroContent>
  );
};
