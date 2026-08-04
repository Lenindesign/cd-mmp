import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Search, Star, X } from 'lucide-react';
import { getAllVehicles, type Vehicle } from '../../services/vehicleService';
import './RateYourCarPage.css';

type RatingStep = 'select' | 'rate' | 'done';
type ReviewCategory = 'driverExperience' | 'reliability' | 'manufacturerWarranty' | 'budgetFriendly';

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

interface StoredReview {
  id: string;
  vehicleId: string;
  vehicleName: string;
  rating: number;
  title: string;
  body: string;
  relationship: string;
  experience: string;
  categoryRatings: Record<ReviewCategory, number>;
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
const REVIEW_STORAGE_KEY = 'cd-mmp:vehicle-reviews';
const RATE_YOUR_CAR_BACKGROUND_IMAGE = 'https://hips.hearstapps.com/hmg-prod/images/10best-cars-group-1546439689.jpg';
const VEHICLE_SELECTOR_IMAGE = 'https://hips.hearstapps.com/hmg-prod/images/2025-editors-choice-illustration-by-ryan-olbrysh-copy-67996747e6975.jpeg';

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

const BENEFIT_ITEMS = [
  {
    title: 'Add to the Expert Perspective',
    body: 'Your firsthand experience complements Car and Driver’s expert reviews with insight from everyday ownership.',
    icon: '/rate-your-car-icons/share-feedback.png',
  },
  {
    title: 'Share What Stands Out',
    body: 'Tell us what you love, what you would change, and what other drivers should know.',
    icon: '/rate-your-car-icons/expert-star.svg',
  },
  {
    title: 'Make Your Miles Count',
    body: 'Add your voice to a community of drivers sharing honest, real-world opinions about their cars.',
    icon: '/rate-your-car-icons/road-horizon.svg',
  },
];

const REVIEW_CATEGORY_ITEMS: Array<{ key: ReviewCategory; label: string; body: string }> = [
  {
    key: 'driverExperience',
    label: 'Driver Experience',
    body: 'Handling, comfort, and overall driving feel',
  },
  {
    key: 'reliability',
    label: 'Reliability',
    body: 'Dependability and performance over time',
  },
  {
    key: 'manufacturerWarranty',
    label: 'Manufacturer Warranty',
    body: 'Coverage quality and support experience',
  },
  {
    key: 'budgetFriendly',
    label: 'Budget Friendly',
    body: 'Cost of ownership and overall value',
  },
];

const EMPTY_REVIEW_CATEGORY_RATINGS: Record<ReviewCategory, number> = {
  driverExperience: 0,
  reliability: 0,
  manufacturerWarranty: 0,
  budgetFriendly: 0,
};

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

const readStoredReview = (vehicleId: string): StoredReview | null => {
  try {
    const reviews = JSON.parse(localStorage.getItem(REVIEW_STORAGE_KEY) || '{}') as Record<string, StoredReview>;
    return reviews[vehicleId] || null;
  } catch {
    return null;
  }
};

const storeReview = (review: StoredReview) => {
  try {
    const reviews = JSON.parse(localStorage.getItem(REVIEW_STORAGE_KEY) || '{}') as Record<string, StoredReview>;
    reviews[review.vehicleId] = review;
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // A storage failure should not block the local confirmation state.
  }
};

const getReviewRelationshipLabel = (relationship: string) => {
  switch (relationship) {
    case 'current-owner':
      return 'Current owner';
    case 'previous-owner':
      return 'Previous owner';
    case 'leased':
      return 'Leased';
    case 'test-drove':
      return 'Test drove';
    case 'passenger':
      return 'Passenger';
    default:
      return 'Driver';
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

  const [step, setStep] = useState<RatingStep>('select');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleOption | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [backgroundFailed, setBackgroundFailed] = useState(false);
  const [selectorImageFailed, setSelectorImageFailed] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [submittedReview, setSubmittedReview] = useState<StoredReview | null>(null);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [reviewRelationship, setReviewRelationship] = useState('current-owner');
  const [reviewExperience, setReviewExperience] = useState('');
  const [reviewCategoryRatings, setReviewCategoryRatings] = useState<Record<ReviewCategory, number>>({ ...EMPTY_REVIEW_CATEGORY_RATINGS });
  const displayRating = hoveredRating || selectedRating;

  const selectVehicle = (vehicle: VehicleOption) => {
    setSelectedVehicle(vehicle);
    setSelectedRating(readStoredRating(vehicle.id));
    setHoveredRating(0);
    setIsReviewFormOpen(false);
    setSubmittedReview(readStoredReview(vehicle.id));
    setReviewTitle('');
    setReviewBody('');
    setReviewRelationship('current-owner');
    setReviewExperience('');
    setReviewCategoryRatings({ ...EMPTY_REVIEW_CATEGORY_RATINGS });
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

  const submitRating = () => {
    if (!selectedVehicle || selectedRating === 0) return;
    storeRating(selectedVehicle, selectedRating);
    const storedReview = readStoredReview(selectedVehicle.id);
    setSubmittedReview(storedReview);
    setReviewTitle(storedReview?.title || '');
    setReviewBody(storedReview?.body || '');
    setReviewRelationship(storedReview?.relationship || 'current-owner');
    setReviewExperience(storedReview?.experience || '');
    setReviewCategoryRatings(storedReview?.categoryRatings || { ...EMPTY_REVIEW_CATEGORY_RATINGS });
    setIsReviewFormOpen(false);
    setStep('done');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const rateAnother = () => {
    setSelectedVehicle(null);
    setSelectedRating(0);
    setHoveredRating(0);
    setIsReviewFormOpen(false);
    setSubmittedReview(null);
    setReviewTitle('');
    setReviewBody('');
    setReviewRelationship('current-owner');
    setReviewExperience('');
    setReviewCategoryRatings({ ...EMPTY_REVIEW_CATEGORY_RATINGS });
    setStep('select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openReviewForm = () => {
    if (submittedReview) {
      setReviewTitle(submittedReview.title);
      setReviewBody(submittedReview.body);
      setReviewRelationship(submittedReview.relationship);
      setReviewExperience(submittedReview.experience);
      setReviewCategoryRatings(submittedReview.categoryRatings || { ...EMPTY_REVIEW_CATEGORY_RATINGS });
    }
    setIsReviewFormOpen(true);
  };

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedVehicle || selectedRating === 0 || !reviewTitle.trim() || !reviewBody.trim()) return;

    const review: StoredReview = {
      id: submittedReview?.id || `review-${Date.now()}`,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      rating: selectedRating,
      title: reviewTitle.trim(),
      body: reviewBody.trim(),
      relationship: reviewRelationship,
      experience: reviewExperience.trim(),
      categoryRatings: reviewCategoryRatings,
      timestamp: Date.now(),
    };
    storeReview(review);
    setSubmittedReview(review);
    setIsReviewFormOpen(false);
  };

  const setReviewCategoryRating = (category: ReviewCategory, rating: number) => {
    setReviewCategoryRatings((current) => ({
      ...current,
      [category]: rating,
    }));
  };

  useEffect(() => {
    if (!isReviewFormOpen) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setIsReviewFormOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isReviewFormOpen]);

  const backgroundStyle = !backgroundFailed
    ? ({ '--rate-your-car-background': `url("${RATE_YOUR_CAR_BACKGROUND_IMAGE}")` } as CSSProperties)
    : undefined;

  return (
    <div className="rate-your-car" style={backgroundStyle}>
      {!backgroundFailed && (
        <img
          className="rate-your-car__background-probe"
          src={RATE_YOUR_CAR_BACKGROUND_IMAGE}
          alt=""
          aria-hidden="true"
          onError={() => setBackgroundFailed(true)}
        />
      )}
      {backgroundFailed && (
        <span className="rate-your-car__background-missing">Vehicle photo unavailable</span>
      )}

      <div className="rate-your-car__container">
        <header className="rate-your-car__hero">
          <div className="rate-your-car__hero-stars" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} fill="currentColor" strokeWidth={1.5} />
            ))}
          </div>
          <div className="rate-your-car__wordmark">Review Your Car</div>
          <p>Every car leaves an impression. We want yours.</p>
        </header>

        <section className={`rate-your-car__card rate-your-car__card--${step}`} aria-live="polite">
          {step === 'select' && (
            <div className="rate-your-car__select-step">
              <div className="rate-your-car__selector-art">
                {!selectorImageFailed ? (
                  <img
                    src={VEHICLE_SELECTOR_IMAGE}
                    alt=""
                    aria-hidden="true"
                    onError={() => setSelectorImageFailed(true)}
                  />
                ) : (
                  <span>Illustration unavailable</span>
                )}
              </div>
              <div className="rate-your-car__select-content">
                <div className="rate-your-car__select-intro">
                  <p className="rate-your-car__eyebrow">Car and Driver wants to know</p>
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
                    <span>{displayRating ? (displayRating / 20).toFixed(1) : '0'}</span>
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
                <button type="button" className="rate-your-car__primary-button" onClick={openReviewForm}>
                  {submittedReview ? 'Edit Review' : 'Write A Review'}
                </button>
                <button type="button" className="rate-your-car__secondary-button" onClick={() => navigate(-1)}>
                  Done
                </button>
              </div>
              {submittedReview && !isReviewFormOpen && (
                <div className="rate-your-car__review-summary" aria-live="polite">
                  <p className="rate-your-car__eyebrow">Review saved</p>
                  <h2>{submittedReview.title}</h2>
                  <div className="rate-your-car__review-meta">
                    <span>{getReviewRelationshipLabel(submittedReview.relationship)}</span>
                    {submittedReview.experience && <span>{submittedReview.experience}</span>}
                  </div>
                  <p>{submittedReview.body}</p>
                </div>
              )}
            </div>
          )}
        </section>

        {step !== 'done' && (
          <section className="rate-your-car__benefits" aria-labelledby="rate-your-car-benefits-title">
            <h2 id="rate-your-car-benefits-title">Put Your Experience on the Record</h2>
            <div className="rate-your-car__benefit-grid">
              {BENEFIT_ITEMS.map((item) => (
                <article key={item.title}>
                  <span className="rate-your-car__benefit-icon" aria-hidden="true">
                    <img src={item.icon} alt="" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
      {isReviewFormOpen && selectedVehicle && (
        <div className="rate-your-car__review-drawer-shell" role="presentation">
          <button
            type="button"
            className="rate-your-car__review-drawer-scrim"
            aria-label="Close review form"
            onClick={() => setIsReviewFormOpen(false)}
          />
          <aside
            className="rate-your-car__review-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rate-your-car-review-title"
          >
            <div className="rate-your-car__review-drawer-topbar">
              <button
                type="button"
                className="rate-your-car__review-close"
                aria-label="Close review form"
                onClick={() => setIsReviewFormOpen(false)}
                autoFocus
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <form className="rate-your-car__review-drawer-form" onSubmit={submitReview}>
              <div className="rate-your-car__review-drawer-content">
                <div className="rate-your-car__review-title-row">
                  <h2 id="rate-your-car-review-title">{submittedReview ? 'Edit Your Review' : 'Add User Review'}</h2>
                  <p>Help other shoppers understand what this car is like in real life.</p>
                </div>

                <div className="rate-your-car__review-vehicle-card">
                  <VehiclePhoto vehicle={selectedVehicle} className="rate-your-car__review-vehicle-photo" />
                  <div>
                    <strong>{selectedVehicle.name}</strong>
                    <span>Car and Driver community review</span>
                  </div>
                </div>

                <section className="rate-your-car__review-rating-card" aria-labelledby="rate-your-car-review-rating-title">
                  <div className="rate-your-car__review-section-header">
                    <h3 id="rate-your-car-review-rating-title">Rate Your Experience (1-5)</h3>
                    <strong>{selectedRating > 0 ? (selectedRating / 20).toFixed(1) : '?'}/5</strong>
                  </div>
                  <div className="rate-your-car__review-rating-buttons" role="radiogroup" aria-label={`Rate ${selectedVehicle.name}`}>
                    {Array.from({ length: 5 }, (_, index) => {
                      const value = (index + 1) * 20;
                      return (
                        <button
                          key={value}
                          type="button"
                          className={`rate-your-car__review-star-button${selectedRating >= value ? ' rate-your-car__review-star-button--active' : ''}`}
                          role="radio"
                          aria-checked={selectedRating === value}
                          aria-label={`${index + 1} out of 5`}
                          onClick={() => setSelectedRating(value)}
                        >
                          <Star fill="currentColor" aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="rate-your-car__review-section" aria-labelledby="rate-your-car-review-copy-title">
                  <div className="rate-your-car__review-section-header rate-your-car__review-section-header--stacked">
                    <h3 id="rate-your-car-review-copy-title">Your Review</h3>
                    <p>Share your thoughts and experiences.</p>
                  </div>
                  <label>
                    <span>Review Title</span>
                    <input
                      type="text"
                      value={reviewTitle}
                      placeholder="Give your review a title"
                      onChange={(event) => setReviewTitle(event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    <span>Your Review</span>
                    <textarea
                      value={reviewBody}
                      placeholder="Let others know what you like and dislike based on your hands-on experience with this vehicle."
                      rows={5}
                      onChange={(event) => setReviewBody(event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    <span>Your experience with this vehicle</span>
                    <select
                      value={reviewRelationship}
                      onChange={(event) => setReviewRelationship(event.target.value)}
                    >
                      <option value="current-owner">I currently own this vehicle</option>
                      <option value="previous-owner">I previously owned this vehicle</option>
                      <option value="leased">I leased this vehicle</option>
                      <option value="test-drove">I test drove this vehicle</option>
                      <option value="passenger">I was a passenger</option>
                    </select>
                  </label>
                  <label>
                    <span>Experience duration</span>
                    <input
                      type="text"
                      value={reviewExperience}
                      placeholder="Six months, 12,000 miles"
                      onChange={(event) => setReviewExperience(event.target.value)}
                    />
                  </label>
                </section>

                <section className="rate-your-car__review-section" aria-labelledby="rate-your-car-review-category-title">
                  <div className="rate-your-car__review-section-header rate-your-car__review-section-header--stacked">
                    <h3 id="rate-your-car-review-category-title">Rate Your Experience</h3>
                    <p>Optional details help readers understand your rating.</p>
                  </div>
                  <div className="rate-your-car__review-category-list">
                    {REVIEW_CATEGORY_ITEMS.map((item) => (
                      <div className="rate-your-car__review-category" key={item.key}>
                        <div>
                          <strong>{item.label}</strong>
                          <span>{item.body}</span>
                        </div>
                        <div className="rate-your-car__review-category-stars" role="radiogroup" aria-label={item.label}>
                          {Array.from({ length: 5 }, (_, index) => {
                            const value = (index + 1) * 20;
                            return (
                              <button
                                key={value}
                                type="button"
                                className={`rate-your-car__review-category-star${reviewCategoryRatings[item.key] >= value ? ' rate-your-car__review-category-star--active' : ''}`}
                                role="radio"
                                aria-checked={reviewCategoryRatings[item.key] === value}
                                aria-label={`${item.label}: ${index + 1} out of 5`}
                                onClick={() => setReviewCategoryRating(item.key, value)}
                              >
                                <Star fill="currentColor" aria-hidden="true" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <div className="rate-your-car__review-drawer-footer">
                <button
                  type="submit"
                  className="rate-your-car__primary-button"
                  disabled={selectedRating === 0 || !reviewTitle.trim() || !reviewBody.trim()}
                >
                  {submittedReview ? 'Update Review' : 'Submit Your Review'}
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
};

export default RateYourCarPage;
