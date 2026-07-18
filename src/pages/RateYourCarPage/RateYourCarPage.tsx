import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Search, Star } from 'lucide-react';
import {
  Star as PhosphorStar,
  TrendUp as PhosphorTrendUp,
  UsersThree as PhosphorUsersThree,
} from '@phosphor-icons/react';
import { getAllVehicles, type Vehicle } from '../../services/vehicleService';
import './RateYourCarPage.css';

type RatingStep = 'select' | 'rate' | 'done';

interface VehicleOption {
  id: string;
  name: string;
  image: string;
  slug: string;
}

interface StoredRating {
  vehicleId: string;
  vehicleName: string;
  rating: number;
  timestamp: number;
}

interface VehicleSearchFieldProps {
  label?: string;
  placeholder: string;
  options: VehicleOption[];
  popularOptions: VehicleOption[];
  onSelect: (vehicle: VehicleOption) => void;
  large?: boolean;
}

const RATING_STORAGE_KEY = 'cd-mmp:vehicle-ratings';

const RATING_LABELS: Record<number, string> = {
  10: 'Awful',
  20: 'Poor',
  30: 'Below Average',
  40: 'Fair',
  50: 'Average',
  60: 'Decent',
  70: 'Good',
  80: 'Very Good',
  90: 'Great',
  100: 'Excellent',
};

const POPULAR_VEHICLES = [
  'Honda Civic',
  'Toyota RAV4',
  'Ford F-150',
  'Honda CR-V',
  'Toyota Camry',
  'Mazda CX-5',
];

const getVehicleName = (vehicle: Vehicle) => `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

const toVehicleOption = (vehicle: Vehicle): VehicleOption => ({
  id: vehicle.id,
  name: getVehicleName(vehicle),
  image: vehicle.image,
  slug: vehicle.slug,
});

const readStoredRating = (vehicleId: string): number => {
  try {
    const ratings = JSON.parse(localStorage.getItem(RATING_STORAGE_KEY) || '{}') as Record<string, StoredRating>;
    return ratings[vehicleId]?.rating || 0;
  } catch {
    return 0;
  }
};

const storeRating = (vehicle: VehicleOption, rating: number) => {
  try {
    const ratings = JSON.parse(localStorage.getItem(RATING_STORAGE_KEY) || '{}') as Record<string, StoredRating>;
    ratings[vehicle.id] = {
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      rating,
      timestamp: Date.now(),
    };
    localStorage.setItem(RATING_STORAGE_KEY, JSON.stringify(ratings));
  } catch {
    // A storage failure should not block the rating confirmation state.
  }
};

const VehiclePhoto = ({ vehicle, className }: { vehicle: VehicleOption; className: string }) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [vehicle.image]);

  if (!vehicle.image || failed) {
    return (
      <div className={`${className} rate-your-car__photo-missing`} role="img" aria-label={`${vehicle.name} photo unavailable`}>
        Vehicle photo unavailable
      </div>
    );
  }

  return (
    <img
      className={className}
      src={vehicle.image}
      alt={vehicle.name}
      onError={() => setFailed(true)}
    />
  );
};

const VehicleSearchField = ({
  label,
  placeholder,
  options,
  popularOptions,
  onSelect,
  large = false,
}: VehicleSearchFieldProps) => {
  const inputId = useId();
  const listboxId = `${inputId}-results`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return popularOptions;

    return options
      .filter((vehicle) => {
        const name = vehicle.name.toLowerCase();
        return words.every((word) => name.includes(word));
      })
      .slice(0, 10);
  }, [options, popularOptions, query]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const chooseVehicle = (vehicle: VehicleOption) => {
    onSelect(vehicle);
    setQuery('');
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => Math.min(current + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      event.preventDefault();
      chooseVehicle(results[activeIndex]);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className="rate-your-car__search">
      {label && <label className="rate-your-car__search-label" htmlFor={inputId}>{label}</label>}
      <div className={`rate-your-car__search-control${large ? ' rate-your-car__search-control--large' : ''}`}>
        <Search aria-hidden="true" size={large ? 23 : 20} />
        <input
          id={inputId}
          type="search"
          value={query}
          placeholder={placeholder}
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isOpen && (
        <ul id={listboxId} className="rate-your-car__search-results" role="listbox">
          {query.length === 0 && results.length > 0 && (
            <li className="rate-your-car__search-heading" aria-hidden="true">Popular vehicles</li>
          )}
          {results.map((vehicle, index) => (
            <li
              id={`${listboxId}-${index}`}
              key={vehicle.id}
              className={`rate-your-car__search-result${activeIndex === index ? ' rate-your-car__search-result--active' : ''}`}
              role="option"
              aria-selected={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(event) => {
                event.preventDefault();
                chooseVehicle(vehicle);
              }}
            >
              {vehicle.name}
            </li>
          ))}
          {results.length === 0 && (
            <li className="rate-your-car__search-empty">No matching vehicles found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

const RateYourCarPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const vehicles = useMemo(() => {
    const seen = new Set<string>();
    return getAllVehicles()
      .slice()
      .sort((a, b) => Number(b.year) - Number(a.year))
      .filter((vehicle) => {
        const key = getVehicleName(vehicle).toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(toVehicleOption);
  }, []);

  const popularVehicles = useMemo(() => (
    POPULAR_VEHICLES
      .map((name) => vehicles.find((vehicle) => vehicle.name.toLowerCase().includes(name.toLowerCase())))
      .filter((vehicle): vehicle is VehicleOption => Boolean(vehicle))
  ), [vehicles]);

  const featuredVehicles = useMemo(() => {
    const choices = [
      popularVehicles[2],
      popularVehicles[0],
      popularVehicles[1],
      ...vehicles,
    ].filter((vehicle): vehicle is VehicleOption => Boolean(vehicle));
    const seen = new Set<string>();
    return choices.filter((vehicle) => {
      if (seen.has(vehicle.id)) return false;
      seen.add(vehicle.id);
      return true;
    }).slice(0, 3);
  }, [popularVehicles, vehicles]);

  const [step, setStep] = useState<RatingStep>('select');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleOption | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [backgroundFailed, setBackgroundFailed] = useState(false);
  const backgroundVehicle = selectedVehicle || featuredVehicles[0];
  const displayRating = hoveredRating || selectedRating;

  const selectVehicle = (vehicle: VehicleOption) => {
    setSelectedVehicle(vehicle);
    setSelectedRating(readStoredRating(vehicle.id));
    setHoveredRating(0);
    setStep('rate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const vehicleParam = searchParams.get('vehicle');
    if (!vehicleParam || selectedVehicle) return;
    const normalized = vehicleParam.toLowerCase().trim();
    const match = vehicles.find((vehicle) => vehicle.name.toLowerCase() === normalized);
    if (match) selectVehicle(match);
  }, [searchParams, selectedVehicle, vehicles]);

  useEffect(() => {
    setBackgroundFailed(false);
  }, [backgroundVehicle?.image]);

  const submitRating = () => {
    if (!selectedVehicle || selectedRating === 0) return;
    storeRating(selectedVehicle, selectedRating);
    setStep('done');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const rateAnother = () => {
    setSelectedVehicle(null);
    setSelectedRating(0);
    setHoveredRating(0);
    setStep('select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backgroundStyle = backgroundVehicle?.image && !backgroundFailed
    ? ({ '--rate-your-car-background': `url("${backgroundVehicle.image}")` } as CSSProperties)
    : undefined;

  return (
    <div className="rate-your-car" style={backgroundStyle}>
      {backgroundVehicle?.image && !backgroundFailed && (
        <img
          className="rate-your-car__background-probe"
          src={backgroundVehicle.image}
          alt=""
          aria-hidden="true"
          onError={() => setBackgroundFailed(true)}
        />
      )}
      {backgroundVehicle?.image && backgroundFailed && (
        <span className="rate-your-car__background-missing">Vehicle photo unavailable</span>
      )}

      <div className="rate-your-car__container">
        <header className="rate-your-car__hero">
          <img src="/rate-your-car-logo.svg?v=light" alt="Rate Your Car" className="rate-your-car__logo" />
          <p>Search for your vehicle and rate how it stacks up.</p>
        </header>

        <section className={`rate-your-car__card rate-your-car__card--${step}`} aria-live="polite">
          {step === 'select' && (
            <div className="rate-your-car__select-step">
              <div className="rate-your-car__vehicle-trio" aria-hidden="true">
                {featuredVehicles.map((vehicle) => (
                  <VehiclePhoto key={vehicle.id} vehicle={vehicle} className="rate-your-car__trio-photo" />
                ))}
              </div>
              <div className="rate-your-car__select-intro">
                <p className="rate-your-car__eyebrow">Car and Driver community</p>
                <h1>What do you drive?</h1>
                <p>Search for your vehicle to get started.</p>
              </div>
              <VehicleSearchField
                large
                placeholder="Search by year, make, or model..."
                options={vehicles}
                popularOptions={popularVehicles}
                onSelect={selectVehicle}
              />
            </div>
          )}

          {step === 'rate' && selectedVehicle && (
            <div className="rate-your-car__rate-step">
              <div className="rate-your-car__vehicle-header">
                <VehiclePhoto vehicle={selectedVehicle} className="rate-your-car__selected-photo" />
                <div>
                  <p className="rate-your-car__eyebrow">Your vehicle</p>
                  <h1>{selectedVehicle.name}</h1>
                </div>
              </div>

              <div className="rate-your-car__rating-area">
                <div className="rate-your-car__rating-panel">
                  <div className="rate-your-car__score-star" aria-hidden="true">
                    <Star fill="currentColor" strokeWidth={1.5} />
                    <span>{displayRating ? (displayRating / 20).toFixed(1) : '—'}</span>
                  </div>
                  <p className="rate-your-car__rating-label">
                    {displayRating ? RATING_LABELS[displayRating] : 'Rate this'}
                  </p>
                  <div
                    className="rate-your-car__stars"
                    role="radiogroup"
                    aria-label={`Rate ${selectedVehicle.name}`}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                        event.preventDefault();
                        setSelectedRating((current) => Math.min(100, Math.max(10, current + 10)));
                      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
                        event.preventDefault();
                        setSelectedRating((current) => Math.max(10, current - 10));
                      }
                    }}
                  >
                    {Array.from({ length: 5 }, (_, index) => {
                      const fullValue = (index + 1) * 20;
                      const halfValue = fullValue - 10;
                      const fill = displayRating >= fullValue ? 100 : displayRating >= halfValue ? 50 : 0;
                      return (
                        <div key={fullValue} className="rate-your-car__star-control">
                          <Star className="rate-your-car__star-outline" aria-hidden="true" />
                          <span className="rate-your-car__star-fill" style={{ width: `${fill}%` }} aria-hidden="true">
                            <Star fill="currentColor" />
                          </span>
                          <button
                            type="button"
                            className="rate-your-car__star-hit rate-your-car__star-hit--left"
                            role="radio"
                            aria-checked={selectedRating === halfValue}
                            aria-label={`${halfValue / 20} out of 5, ${RATING_LABELS[halfValue]}`}
                            onClick={() => setSelectedRating(halfValue)}
                            onMouseEnter={() => setHoveredRating(halfValue)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onFocus={() => setHoveredRating(halfValue)}
                            onBlur={() => setHoveredRating(0)}
                          />
                          <button
                            type="button"
                            className="rate-your-car__star-hit rate-your-car__star-hit--right"
                            role="radio"
                            aria-checked={selectedRating === fullValue}
                            aria-label={`${fullValue / 20} out of 5, ${RATING_LABELS[fullValue]}`}
                            onClick={() => setSelectedRating(fullValue)}
                            onMouseEnter={() => setHoveredRating(fullValue)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onFocus={() => setHoveredRating(fullValue)}
                            onBlur={() => setHoveredRating(0)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    className="rate-your-car__primary-button"
                    disabled={selectedRating === 0}
                    onClick={submitRating}
                  >
                    Submit Rating
                  </button>
                </div>
              </div>

              <div className="rate-your-car__different-vehicle">
                <VehicleSearchField
                  label="Rate a different vehicle"
                  placeholder="Select another Vehicle"
                  options={vehicles}
                  popularOptions={popularVehicles}
                  onSelect={selectVehicle}
                />
              </div>
            </div>
          )}

          {step === 'done' && selectedVehicle && (
            <div className="rate-your-car__done-step">
              <div className="rate-your-car__success-icon" aria-hidden="true">
                <Check />
              </div>
              <p className="rate-your-car__eyebrow">Rating submitted</p>
              <h1>Thank you!</h1>
              <p>You rated the <strong>{selectedVehicle.name}</strong>.</p>
              <div className="rate-your-car__done-rating" aria-label={`${selectedRating / 20} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => {
                  const fullValue = (index + 1) * 20;
                  const halfValue = fullValue - 10;
                  const fill = selectedRating >= fullValue ? 100 : selectedRating >= halfValue ? 50 : 0;
                  return (
                    <span key={fullValue} className="rate-your-car__done-star">
                      <Star aria-hidden="true" />
                      <span style={{ width: `${fill}%` }}><Star fill="currentColor" aria-hidden="true" /></span>
                    </span>
                  );
                })}
                <strong>{(selectedRating / 20).toFixed(1)}</strong>
              </div>
              <div className="rate-your-car__done-actions">
                <button type="button" className="rate-your-car__primary-button" onClick={rateAnother}>
                  Rate Another Car
                </button>
                <button type="button" className="rate-your-car__secondary-button" onClick={() => navigate(-1)}>
                  Done
                </button>
              </div>
            </div>
          )}
        </section>

        {step !== 'done' && (
          <section className="rate-your-car__benefits" aria-labelledby="rate-your-car-benefits-title">
            <h2 id="rate-your-car-benefits-title">Why your rating matters</h2>
            <div className="rate-your-car__benefit-grid">
              <article>
                <PhosphorUsersThree aria-hidden="true" weight="bold" />
                <h3>Help real buyers</h3>
                <p>Your honest opinion helps shoppers make more confident decisions.</p>
              </article>
              <article>
                <PhosphorStar aria-hidden="true" weight="bold" />
                <h3>Guide C/D research</h3>
                <p>Owner ratings add real-world context to vehicle research.</p>
              </article>
              <article>
                <PhosphorTrendUp aria-hidden="true" weight="bold" />
                <h3>Shape the market</h3>
                <p>Your rating contributes to the community scores shoppers compare.</p>
              </article>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default RateYourCarPage;
