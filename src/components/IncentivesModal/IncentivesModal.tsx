import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Info,
  TrendingDown,
  CheckCircle,
  Gem,
  Clock,
  Lightbulb,
  BadgeCheck,
  ShieldCheck,
} from 'lucide-react';
import type { Incentive, GroupAffiliation } from '../../services/incentivesService';
import { formatExpiration } from '../../utils/dateUtils';
import './IncentivesModal.css';

export type IncentivesModalVariant = 'simple' | 'complete-with-form' | 'edmunds' | 'conversion-a' | 'conversion-b' | 'conversion-b-no-form';

/** Offer detail for the reference-style modal (like the Chevrolet Trax 0% financing example) */
export interface IncentiveOfferDetail {
  year: number;
  make: string;
  model: string;
  slug?: string;
  imageUrl?: string;
  msrpMin: number;
  msrpMax: number;
  offerHeadline: string;
  whatItMeans: string;
  yourSavings: string;
  whoQualifies: string;
  eligibleTrims: string[];
  dontWaitText: string;
  eventLabel?: string;
  expirationDate?: string;
}

export interface IncentivesModalFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface IncentivesModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: IncentivesModalVariant;
  offer?: Partial<IncentiveOfferDetail>;
  allIncentives?: Incentive[];
  selectedIncentiveId?: string;
  initialDropdownOpen?: boolean;
  onCtaClick?: () => void;
  onSubmitForm?: (data: IncentivesModalFormData) => void;
}

/** Default sample: 2026 Honda CR-V with photo and incentives */
const HONDA_CRV_IMAGE = 'https://d2kde5ohu8qb21.cloudfront.net/files/685edb52f9d75b00021b1e55/07-2026-honda-cr-v-trailsport.jpg';

const DEFAULT_OFFER: IncentiveOfferDetail = {
  year: 2026,
  make: 'Honda',
  model: 'CR-V',
  imageUrl: HONDA_CRV_IMAGE,
  msrpMin: 30100,
  msrpMax: 40800,
  offerHeadline: '5.9% APR Financing for 48–60 months',
  whatItMeans:
    "Special APR through Honda Financial means more of your payment goes toward the car. On a typical $35,000 loan, this could save you thousands compared to standard rates.",
  yourSavings:
    "On a $35,000 loan over 60 months, you'd save approximately $2,800 in interest vs. the average 6.5% rate. Lease offers from $369/mo also available.",
  whoQualifies: 'Well-qualified buyers. Credit approval required through Honda Financial Services.',
  eligibleTrims: ['EX', 'EX-L', 'LX', 'Sport', 'Hybrid Sport'],
  dontWaitText:
    "This offer expires January 2, 2026. Honda incentives change monthly—lock in your rate before it's gone.",
  eventLabel: 'Honda CR-V Current Offers',
  expirationDate: 'January 2, 2026',
};

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
const formatMsrp = (min: number, max: number) => `MSRP ${formatCurrency(min)} - ${formatCurrency(max)}`;

const getOfferRowChipLabel = (type: Incentive['type']): string =>
  type === 'lease' ? 'Lease' : type === 'cash' ? 'Buy' : 'Finance';

const EXPERT_TIPS: Record<Incentive['type'], string> = {
  finance: "Low-rate financing deals can beat cash rebates if you qualify\u2014always compare the total interest saved vs. the rebate you\u2019re giving up before deciding.",
  cash: "Cash incentives can lower the purchase price significantly\u2014especially valuable if you\u2019re paying upfront or securing financing outside the dealership.",
  lease: "Lease incentives work best if you prefer lower monthly payments and driving a new car every few years, but pay close attention to mileage limits and end-of-lease fees to avoid surprises.",
  special: "Special incentives like military, college grad, or loyalty bonuses can stack with other offers\u2014ask the dealer which programs you qualify for to maximize your savings.",
};

const getExpertTip = (inc: Incentive): string => EXPERT_TIPS[inc.type] ?? (inc.terms || inc.description);

const AFFILIATION_META: Record<GroupAffiliation, { label: string; restricted: boolean; description: string }> = {
  everyone:         { label: 'Open to All Buyers',        restricted: false, description: 'All qualified buyers. See dealer for complete details.' },
  military:         { label: 'Military / Veterans',        restricted: true,  description: 'Active duty, reserve, retired military, or veterans discharged within 3 years.' },
  'first-responder':{ label: 'First Responders',           restricted: true,  description: 'Firefighters, police officers, EMTs, and 911 dispatchers with proof of employment.' },
  college:          { label: 'Students / Recent Grads',    restricted: true,  description: 'Graduated within the past 2 years or graduating within the next 6 months.' },
  loyalty:          { label: 'Current Owners / Lessees',   restricted: true,  description: 'Must currently own or lease a vehicle from the same manufacturer.' },
  targeted:         { label: 'Targeted / Conditional',     restricted: true,  description: 'Eligibility requirements vary. See dealer for qualification details.' },
  automobility:     { label: 'Automobility Program',       restricted: true,  description: 'For customers with qualifying disabilities. Adaptive equipment assistance available.' },
  'disaster-relief':{ label: 'Disaster Relief',            restricted: true,  description: 'For customers in FEMA-declared disaster areas with a damaged or destroyed vehicle.' },
  'trade-in':       { label: 'Trade-In Required',          restricted: false, description: 'Must trade in a qualifying vehicle to receive this incentive.' },
};

const getEligibilityInfo = (inc: Incentive): { label: string; restricted: boolean; description: string } => {
  const aff = inc.groupAffiliation ?? 'everyone';
  const meta = AFFILIATION_META[aff];
  return {
    label: meta.label,
    restricted: meta.restricted,
    description: inc.eligibility || meta.description,
  };
};



export function getAprRangeLabel(active: { value: string; title: string; terms?: string }): string {
  const rows = buildAprTable(active);
  const rates = rows.map(r => r.apr);
  const lo = Math.min(...rates);
  const hi = Math.max(...rates);
  if (lo === hi) return active.value;
  return `${lo}%–${hi}% APR`;
}

export function buildAprTable(incentive: { value: string; title: string; terms?: string }) {
  const text = `${incentive.value} ${incentive.title} ${incentive.terms ?? ''}`;
  const aprMatch = text.match(/([\d.]+)%/);
  const apr = aprMatch ? parseFloat(aprMatch[1]) : 0;

  const termNumbers: number[] = [];
  const rangeMatch = text.match(/(\d+)\s*[-–]\s*(\d+)\s*month/i);
  const singleMatch = text.match(/(\d+)\s*month/i);
  if (rangeMatch) {
    const lo = parseInt(rangeMatch[1], 10);
    const hi = parseInt(rangeMatch[2], 10);
    for (const t of [24, 36, 48, 60, 72, 84]) {
      if (t >= lo && t <= hi) termNumbers.push(t);
    }
  } else if (singleMatch) {
    termNumbers.push(parseInt(singleMatch[1], 10));
  }

  if (termNumbers.length === 0) termNumbers.push(36, 48, 60, 72);

  const spreadByTerm: Record<number, number> = {
    24: -0.5, 36: 0, 48: 0.3, 60: 0.6, 72: 1.0, 84: 1.4,
  };

  return termNumbers.map(t => ({
    term: t,
    apr: Math.round((apr + (spreadByTerm[t] ?? 0)) * 100) / 100,
  }));
}

const IncentivesModal = ({
  isOpen,
  onClose,
  variant,
  offer: offerProp,
  allIncentives,
  selectedIncentiveId,
  initialDropdownOpen: _initialDropdownOpen = false,
  onCtaClick,
  onSubmitForm,
}: IncentivesModalProps) => {
  const navigate = useNavigate();
  const offer: IncentiveOfferDetail = { ...DEFAULT_OFFER, ...offerProp };
  const vehicleLabel = `${offer.year} ${offer.make} ${offer.model}`;
  const ctaLabel = `GET THIS DEAL ON THE ${offer.make.toUpperCase()} ${offer.model.toUpperCase()}`;
  const vehicleUrl = offer.slug ? `/${offer.slug}` : `/vehicles?make=${encodeURIComponent(offer.make)}&model=${encodeURIComponent(offer.model)}`;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [activeIncentiveId, setActiveIncentiveId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (selectedIncentiveId) {
        setActiveIncentiveId(selectedIncentiveId);
      } else if (allIncentives && allIncentives.length > 0) {
        setActiveIncentiveId(allIncentives[0].id);
      }
    }
  }, [isOpen, selectedIncentiveId, allIncentives]);

  const activeIncentive = allIncentives?.find(i => i.id === activeIncentiveId) || null;

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

  if (!isOpen) return null;

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      navigate(vehicleUrl);
    }
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitForm?.({ firstName, lastName, email, phone, message });
    onClose();
  };

  const renderHeader = () => (
    <div className="incentives-modal__header-row">
      <div className="incentives-modal__vehicle-thumb">
        {offer.imageUrl ? (
          <img src={offer.imageUrl} alt={vehicleLabel} />
        ) : (
          <div className="incentives-modal__vehicle-thumb-placeholder">
            {offer.make} {offer.model}
          </div>
        )}
      </div>
      <div className="incentives-modal__header-text">
        <h2 id="incentives-modal-title" className="incentives-modal__vehicle-name">
          {vehicleLabel}
        </h2>
        <p className="incentives-modal__msrp">{formatMsrp(offer.msrpMin, offer.msrpMax)}</p>
      </div>
    </div>
  );

  const renderOfferBanner = () => (
    <div className="incentives-modal__offer-banner">
      <span className="incentives-modal__offer-banner-prefix">%</span>
      {offer.offerHeadline}
    </div>
  );

  const renderSection = (icon: React.ReactNode, heading: string, children: React.ReactNode) => (
    <div className="incentives-modal__section">
      <div className="incentives-modal__section-icon" aria-hidden>
        {icon}
      </div>
      <div className="incentives-modal__section-content">
        <h3 className="incentives-modal__section-heading">{heading}</h3>
        <div className="incentives-modal__section-body">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="incentives-modal__overlay" onClick={onClose}>
      <div
        className={`incentives-modal incentives-modal--${variant}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="incentives-modal-title"
      >
        <button type="button" className="incentives-modal__close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        <div className="incentives-modal__inner">
          {/* Variant 1: Simple – like reference but stripped down */}
          {variant === 'simple' && (
            <>
              {renderHeader()}
              {renderOfferBanner()}
              <p className="incentives-modal__copy-single">{offer.whatItMeans}</p>
              {offer.eventLabel && (
                <p className="incentives-modal__event-label">{offer.eventLabel}</p>
              )}
              <button type="button" className="incentives-modal__cta" onClick={handleCta}>
                {ctaLabel}
              </button>
              <a href="#" className="incentives-modal__secondary-link" onClick={(e) => { e.preventDefault(); onClose(); }}>
                View Full Vehicle Details
              </a>
            </>
          )}

          {/* Variant 2: Complete + contact dealer form */}
          {variant === 'complete-with-form' && (
            <>
              {renderHeader()}
              {renderOfferBanner()}
              {renderSection(
                <Info size={18} />,
                'WHAT DOES THIS MEAN?',
                <p>{offer.whatItMeans}</p>
              )}
              {renderSection(
                <TrendingDown size={18} />,
                'YOUR SAVINGS',
                <p>{offer.yourSavings}</p>
              )}
              {renderSection(
                <CheckCircle size={18} />,
                'WHO QUALIFIES',
                <p>{offer.whoQualifies}</p>
              )}
              {renderSection(
                <Gem size={18} />,
                'ELIGIBLE TRIMS',
                <div className="incentives-modal__trim-pills">
                  {offer.eligibleTrims.map((t) => (
                    <span key={t} className="incentives-modal__trim-pill">{t}</span>
                  ))}
                </div>
              )}
              {renderSection(
                <Clock size={18} />,
                "DON'T WAIT TOO LONG",
                <p>{offer.dontWaitText}</p>
              )}

              <div className="incentives-modal__form-block">
                <h3 className="incentives-modal__form-title">Contact a dealer about this offer</h3>
                <form id="incentives-modal-form" onSubmit={handleFormSubmit} className="incentives-modal__form">
                  <div className="incentives-modal__form-row">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      aria-label="First name"
                      className="incentives-modal__input"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      aria-label="Last name"
                      className="incentives-modal__input"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email"
                    className="incentives-modal__input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-label="Phone"
                    className="incentives-modal__input"
                  />
                  <textarea
                    placeholder="Message (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    aria-label="Message"
                    className="incentives-modal__textarea"
                  />
                </form>
              </div>

              {offer.eventLabel && (
                <p className="incentives-modal__event-label">{offer.eventLabel}</p>
              )}
              <button
                type="submit"
                form="incentives-modal-form"
                className="incentives-modal__cta"
              >
                REQUEST INFO FROM DEALER
              </button>
              <a href="#" className="incentives-modal__secondary-link" onClick={(e) => { e.preventDefault(); onClose(); }}>
                View Full Vehicle Details
              </a>
            </>
          )}

          {/* Variant 3: Edmunds-style */}
          {variant === 'edmunds' && (
            <>
              <h2 id="incentives-modal-title" className="incentives-modal__vehicle-name incentives-modal__vehicle-name--standalone">
                {vehicleLabel}
              </h2>
              <p className="incentives-modal__msrp incentives-modal__msrp--standalone">{formatMsrp(offer.msrpMin, offer.msrpMax)}</p>
              <div className="incentives-modal__offer-banner">{offer.offerHeadline}</div>

              <div className="incentives-modal__our-take">
                <div className="incentives-modal__our-take-header">
                  <Lightbulb size={22} className="incentives-modal__our-take-icon" aria-hidden />
                  <p className="incentives-modal__our-take-rating">Strong value</p>
                </div>
                <p className="incentives-modal__our-take-text">{offer.yourSavings}</p>
              </div>

              <div className="incentives-modal__key-details">
                <h3 className="incentives-modal__key-heading">Key offer details</h3>
                <dl className="incentives-modal__key-dl">
                  <div className="incentives-modal__key-row">
                    <dt>Offer</dt>
                    <dd>{offer.offerHeadline}</dd>
                  </div>
                  <div className="incentives-modal__key-row">
                    <dt>Who qualifies</dt>
                    <dd>{offer.whoQualifies}</dd>
                  </div>
                  <div className="incentives-modal__key-row">
                    <dt>Eligible trims</dt>
                    <dd>{offer.eligibleTrims.join(', ')}</dd>
                  </div>
                  {offer.expirationDate && (
                    <div className="incentives-modal__key-row">
                      <dt>Expires</dt>
                      <dd>{offer.expirationDate}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <button type="button" className="incentives-modal__cta" onClick={handleCta}>
                Get this deal
              </button>
            </>
          )}

          {/* Variant 4: Conversion A – urgency + benefits + one CTA */}
          {variant === 'conversion-a' && (
            <>
              <div className="incentives-modal__badge incentives-modal__badge--urgency">
                <Clock size={14} /> Expires {offer.expirationDate ?? 'soon'}
              </div>
              {renderHeader()}
              {renderOfferBanner()}
              <p className="incentives-modal__savings-line">
                {offer.yourSavings}
              </p>
              <ul className="incentives-modal__benefit-list">
                <li><CheckCircle size={16} aria-hidden /> {offer.whoQualifies}</li>
                <li><CheckCircle size={16} aria-hidden /> Eligible trims: {offer.eligibleTrims.join(', ')}</li>
                <li><CheckCircle size={16} aria-hidden /> Special 5.9% APR for 48–60 months</li>
              </ul>
              <button type="button" className="incentives-modal__cta" onClick={handleCta}>
                {ctaLabel}
              </button>
            </>
          )}

          {/* Variant 5: Modal A – two-column layout with dealer contact form */}
          {variant === 'conversion-b' && (
            <>
              <div className="incentives-modal__v5-layout">
                {/* LEFT COLUMN: Offer browser + details */}
                <div className="incentives-modal__v5-left">
                  <h2 id="incentives-modal-title" className="incentives-modal__v5-title">
                    {vehicleLabel}
                  </h2>
                  <div className="incentives-modal__v5-msrp-row">
                    <span className="incentives-modal__v5-msrp">{formatMsrp(offer.msrpMin, offer.msrpMax)}</span>
                    <a href={vehicleUrl} className="incentives-modal__v5-read-review" onClick={(e) => { e.preventDefault(); navigate(vehicleUrl); onClose(); }}>
                      Read Review
                    </a>
                  </div>

                  {/* Selected Offer Detail */}
                  {activeIncentive && (
                    <div className="incentives-modal__v5-detail">
                      <div className="incentives-modal__v5-offer-row">
                        <span className="incentives-modal__v5-offer-chip">
                          {getOfferRowChipLabel(activeIncentive.type)}
                        </span>
                        <span className="incentives-modal__v5-offer-apr">
                          {activeIncentive.type === 'finance'
                            ? getAprRangeLabel(activeIncentive)
                            : activeIncentive.value}
                        </span>
                        <span className="incentives-modal__v5-offer-divider" aria-hidden />
                        <span className="incentives-modal__v5-offer-expires">
                          expires {formatExpiration(activeIncentive.expirationDate)}
                        </span>
                      </div>

                      <div className="incentives-modal__v5-expert-tip">
                        <div className="incentives-modal__v5-expert-tip-left">
                          <BadgeCheck size={21} className="incentives-modal__v5-expert-tip-icon" aria-hidden />
                          <span className="incentives-modal__v5-expert-tip-label">C/D Expert Tip:</span>
                        </div>
                        <p className="incentives-modal__v5-expert-tip-text">
                          {getExpertTip(activeIncentive)}
                        </p>
                      </div>

                      {(() => {
                        const elig = getEligibilityInfo(activeIncentive);
                        if (!elig.restricted) return null;
                        return (
                          <div className="incentives-modal__v5-eligibility-box incentives-modal__v5-eligibility-box--restricted">
                            <div className="incentives-modal__v5-eligibility-header">
                              <ShieldCheck size={16} />
                              <span className="incentives-modal__v5-eligibility-title">
                                {elig.label}
                              </span>
                            </div>
                            {activeIncentive.programName && (
                              <p className="incentives-modal__v5-eligibility-program">
                                {activeIncentive.programName}
                              </p>
                            )}
                            <p className="incentives-modal__v5-eligibility-text">
                              {elig.description}
                            </p>
                          </div>
                        );
                      })()}

                      {/* APR Rate Table for finance offers */}
                      {activeIncentive.type === 'finance' && (
                        <div className="incentives-modal__rate-table">
                          <h4 className="incentives-modal__rate-table-title">Available APR Options</h4>
                          <table className="incentives-modal__rate-grid">
                            <thead>
                              <tr>
                                <th>Term</th>
                                <th>Rate</th>
                              </tr>
                            </thead>
                            <tbody>
                              {buildAprTable(activeIncentive).map(row => (
                                <tr key={row.term}>
                                  <td className="incentives-modal__rate-term">{row.term} mo</td>
                                  <td className="incentives-modal__rate-cell">{row.apr}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="incentives-modal__v5-key-details">
                        <h3 className="incentives-modal__v5-key-heading">Key offer details</h3>

                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">WHAT IS THIS OFFER?</h4>
                          <p className="incentives-modal__v5-key-section-text">{activeIncentive.programDescription || activeIncentive.description}</p>
                        </div>

                        {activeIncentive.programRules && (
                          <div className="incentives-modal__v5-key-section">
                            <h4 className="incentives-modal__v5-key-section-title">PROGRAM RULES</h4>
                            <p className="incentives-modal__v5-key-section-text">{activeIncentive.programRules}</p>
                          </div>
                        )}

                        {activeIncentive.terms && activeIncentive.type !== 'cash' && (
                          <div className="incentives-modal__v5-key-section">
                            <h4 className="incentives-modal__v5-key-section-title">TERMS</h4>
                            <p className="incentives-modal__v5-key-section-text">{activeIncentive.terms}</p>
                          </div>
                        )}

                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">ELIGIBLE TRIMS</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.eligibleTrims.join(', ')}</p>
                        </div>

                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">DON'T WAIT TOO LONG</h4>
                          <p className="incentives-modal__v5-key-section-text">
                            This offer expires {activeIncentive.expirationDate}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fallback if no allIncentives provided — use legacy single-offer view */}
                  {(!allIncentives || allIncentives.length === 0) && (
                    <>
                      <div className="incentives-modal__v5-offer-row">
                        <span className="incentives-modal__v5-offer-chip">Finance</span>
                        <span className="incentives-modal__v5-offer-apr">
                          {offer.offerHeadline.match(/^[\d.]+%\s*APR/i)?.[0] ?? offer.offerHeadline.split(/\s+/)[0]}
                        </span>
                        <span className="incentives-modal__v5-offer-divider" aria-hidden />
                        <span className="incentives-modal__v5-offer-expires">
                          expires {offer.expirationDate ? formatExpiration(offer.expirationDate) : 'soon'}
                        </span>
                      </div>

                      <div className="incentives-modal__v5-expert-tip">
                        <div className="incentives-modal__v5-expert-tip-left">
                          <BadgeCheck size={21} className="incentives-modal__v5-expert-tip-icon" aria-hidden />
                          <span className="incentives-modal__v5-expert-tip-label">C/D Expert Tip:</span>
                        </div>
                        <p className="incentives-modal__v5-expert-tip-text">{offer.yourSavings}</p>
                      </div>

                      <div className="incentives-modal__v5-key-details">
                        <h3 className="incentives-modal__v5-key-heading">Key offer details</h3>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">WHAT DOES THIS MEAN?</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.whatItMeans}</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">YOUR SAVINGS</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.yourSavings}</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">WHO QUALIFIES</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.whoQualifies}</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">ELIGIBLE TRIMS</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.eligibleTrims.join(', ')}</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">DON'T WAIT TOO LONG</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.dontWaitText}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* RIGHT COLUMN: Dealer contact form */}
                <div className="incentives-modal__v5-right">
                  <h3 className="incentives-modal__v5-form-heading">Got Questions? Contact the Dealer</h3>

                  <div className="incentives-modal__v5-form-image-wrap">
                    {offer.imageUrl ? (
                      <img src={offer.imageUrl} alt={vehicleLabel} className="incentives-modal__v5-form-image" />
                    ) : (
                      <div className="incentives-modal__v5-image-placeholder">
                        {offer.make} {offer.model}
                      </div>
                    )}
                  </div>

                  <form id="incentives-modal-form" onSubmit={handleFormSubmit} className="incentives-modal__v5-form">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      aria-label="First name"
                      className="incentives-modal__v5-input"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      aria-label="Last name"
                      className="incentives-modal__v5-input"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Email"
                      className="incentives-modal__v5-input"
                    />
                    <input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-label="Phone"
                      className="incentives-modal__v5-input"
                    />
                    <label className="incentives-modal__v5-message-label">MESSAGE</label>
                    <textarea
                      value={message || `I would like more information about available offers for the New ${vehicleLabel}.`}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      aria-label="Message"
                      className="incentives-modal__v5-textarea"
                    />
                    <p className="incentives-modal__v5-disclaimer">
                      By clicking the button, you agree to the Autotrader <a href="#">Visitor Agreement</a> and Privacy Statement and that your contact and/or My Wallet information will be shared with the dealer and/or Car and Driver, including for their own advertising purposes. Each party's use of your information is subject to their privacy policy.
                    </p>
                  </form>
                  <div className="incentives-modal__v5-cta-sticky">
                    <button type="submit" form="incentives-modal-form" className="incentives-modal__v5-submit">
                      CONTACT DEALER
                    </button>
                    <button
                      type="button"
                      className="incentives-modal__v5-marketplace-btn"
                      onClick={() => { onClose(); navigate(vehicleUrl); }}
                    >
                      SHOP ON MARKETPLACE
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Variant 6: Modal B – single-column offer browser, no lead form */}
          {variant === 'conversion-b-no-form' && (
            <>
              <div className="incentives-modal__v5-layout incentives-modal__v5-layout--single">
                <div className="incentives-modal__v5-left incentives-modal__v5-left--full">
                  <div className="incentives-modal__v6-header">
                    <div className="incentives-modal__vehicle-thumb">
                      {offer.imageUrl ? (
                        <img src={offer.imageUrl} alt={vehicleLabel} />
                      ) : (
                        <div className="incentives-modal__vehicle-thumb-placeholder">
                          {offer.make} {offer.model}
                        </div>
                      )}
                    </div>
                    <div className="incentives-modal__v6-header-text">
                      <h2 id="incentives-modal-title" className="incentives-modal__v5-title">
                        {vehicleLabel}
                      </h2>
                      <div className="incentives-modal__v5-msrp-row">
                        <span className="incentives-modal__v5-msrp">{formatMsrp(offer.msrpMin, offer.msrpMax)}</span>
                        <a href={vehicleUrl} className="incentives-modal__v5-read-review" onClick={(e) => { e.preventDefault(); navigate(vehicleUrl); onClose(); }}>
                          Read Review
                        </a>
                      </div>
                    </div>
                  </div>

                  {activeIncentive && (
                    <div className="incentives-modal__v5-detail">
                      <div className="incentives-modal__v5-offer-row">
                        <span className="incentives-modal__v5-offer-chip">
                          {getOfferRowChipLabel(activeIncentive.type)}
                        </span>
                        <span className="incentives-modal__v5-offer-apr">
                          {activeIncentive.type === 'finance'
                            ? getAprRangeLabel(activeIncentive)
                            : activeIncentive.value}
                        </span>
                        <span className="incentives-modal__v5-offer-divider" aria-hidden />
                        <span className="incentives-modal__v5-offer-expires">
                          expires {formatExpiration(activeIncentive.expirationDate)}
                        </span>
                      </div>

                      <div className="incentives-modal__v5-expert-tip">
                        <div className="incentives-modal__v5-expert-tip-left">
                          <BadgeCheck size={21} className="incentives-modal__v5-expert-tip-icon" aria-hidden />
                          <span className="incentives-modal__v5-expert-tip-label">C/D Expert Tip:</span>
                        </div>
                        <p className="incentives-modal__v5-expert-tip-text">
                          {getExpertTip(activeIncentive)}
                        </p>
                      </div>

                      {(() => {
                        const elig = getEligibilityInfo(activeIncentive);
                        if (!elig.restricted) return null;
                        return (
                          <div className="incentives-modal__v5-eligibility-box incentives-modal__v5-eligibility-box--restricted">
                            <div className="incentives-modal__v5-eligibility-header">
                              <ShieldCheck size={16} />
                              <span className="incentives-modal__v5-eligibility-title">
                                {elig.label}
                              </span>
                            </div>
                            {activeIncentive.programName && (
                              <p className="incentives-modal__v5-eligibility-program">
                                {activeIncentive.programName}
                              </p>
                            )}
                            <p className="incentives-modal__v5-eligibility-text">
                              {elig.description}
                            </p>
                          </div>
                        );
                      })()}

                      {activeIncentive.type === 'finance' && (
                        <div className="incentives-modal__rate-table">
                          <h4 className="incentives-modal__rate-table-title">Available APR Options</h4>
                          <table className="incentives-modal__rate-grid">
                            <thead>
                              <tr>
                                <th>Term</th>
                                <th>Rate</th>
                              </tr>
                            </thead>
                            <tbody>
                              {buildAprTable(activeIncentive).map(row => (
                                <tr key={row.term}>
                                  <td className="incentives-modal__rate-term">{row.term} mo</td>
                                  <td className="incentives-modal__rate-cell">{row.apr}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="incentives-modal__v5-key-details">
                        <h3 className="incentives-modal__v5-key-heading">Key offer details</h3>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">WHAT IS THIS OFFER?</h4>
                          <p className="incentives-modal__v5-key-section-text">{activeIncentive.programDescription || activeIncentive.description}</p>
                        </div>

                        {activeIncentive.programRules && (
                          <div className="incentives-modal__v5-key-section">
                            <h4 className="incentives-modal__v5-key-section-title">PROGRAM RULES</h4>
                            <p className="incentives-modal__v5-key-section-text">{activeIncentive.programRules}</p>
                          </div>
                        )}

                        {activeIncentive.terms && activeIncentive.type !== 'cash' && (
                          <div className="incentives-modal__v5-key-section">
                            <h4 className="incentives-modal__v5-key-section-title">TERMS</h4>
                            <p className="incentives-modal__v5-key-section-text">{activeIncentive.terms}</p>
                          </div>
                        )}

                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">ELIGIBLE TRIMS</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.eligibleTrims.join(', ')}</p>
                        </div>

                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">DON'T WAIT TOO LONG</h4>
                          <p className="incentives-modal__v5-key-section-text">
                            This offer expires {activeIncentive.expirationDate}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.
                          </p>
                        </div>
                      </div>

                      <div className="incentives-modal__v6-cta-row">
                        <button type="button" className="incentives-modal__v6-cta-primary" onClick={handleCta}>
                          SHOP ON MARKETPLACE
                        </button>
                      </div>
                    </div>
                  )}

                  {(!allIncentives || allIncentives.length === 0) && (
                    <>
                      <div className="incentives-modal__v5-offer-row">
                        <span className="incentives-modal__v5-offer-chip">Finance</span>
                        <span className="incentives-modal__v5-offer-apr">
                          {offer.offerHeadline.match(/^[\d.]+%\s*APR/i)?.[0] ?? offer.offerHeadline.split(/\s+/)[0]}
                        </span>
                        <span className="incentives-modal__v5-offer-divider" aria-hidden />
                        <span className="incentives-modal__v5-offer-expires">
                          expires {offer.expirationDate ? formatExpiration(offer.expirationDate) : 'soon'}
                        </span>
                      </div>

                      <div className="incentives-modal__v5-expert-tip">
                        <div className="incentives-modal__v5-expert-tip-left">
                          <BadgeCheck size={21} className="incentives-modal__v5-expert-tip-icon" aria-hidden />
                          <span className="incentives-modal__v5-expert-tip-label">C/D Expert Tip:</span>
                        </div>
                        <p className="incentives-modal__v5-expert-tip-text">{offer.yourSavings}</p>
                      </div>

                      <div className="incentives-modal__v5-key-details">
                        <h3 className="incentives-modal__v5-key-heading">Key offer details</h3>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">WHAT DOES THIS MEAN?</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.whatItMeans}</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">YOUR SAVINGS</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.yourSavings}</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">WHO QUALIFIES</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.whoQualifies}</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">ELIGIBLE TRIMS</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.eligibleTrims.join(', ')}</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">DON'T WAIT TOO LONG</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.dontWaitText}</p>
                        </div>
                      </div>

                      <div className="incentives-modal__v6-cta-row">
                        <button type="button" className="incentives-modal__v6-cta-primary" onClick={handleCta}>
                          SHOP ON MARKETPLACE
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncentivesModal;
