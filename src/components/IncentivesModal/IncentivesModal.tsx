import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  Check,
  Phone,
  MapPin,
  Navigation,
} from 'lucide-react';
import type { Incentive, GroupAffiliation, RateTier } from '../../services/incentiveAdapter';
import { getVehicleTrims } from '../../services/trimService';
import { formatExpiration } from '../../utils/dateUtils';
import './IncentivesModal.css';

function buildCashDownData(
  make: string, model: string,
  msrpMin: number, msrpMax: number,
  eligibleTrims: string[],
) {
  const trims = getVehicleTrims(make, model, msrpMin, msrpMax);
  const matched = trims.filter(t => eligibleTrims.some(
    et => et.toLowerCase() === t.name.toLowerCase(),
  ));

  let rows: { name: string; msrp: number; down: number }[];

  if (matched.length > 0) {
    rows = matched.map(t => {
      const msrp = parseInt(t.price.replace(/[^0-9]/g, ''), 10);
      return { name: t.name, msrp, down: Math.round(msrp * 0.1) };
    });
  } else {
    const count = eligibleTrims.length;
    const step = count > 1 ? (msrpMax - msrpMin) / (count - 1) : 0;
    rows = eligibleTrims.map((name, i) => {
      const msrp = Math.round(msrpMin + step * i);
      return { name, msrp, down: Math.round(msrp * 0.1) };
    });
  }

  const downs = rows.map(r => r.down);
  const lo = Math.min(...downs);
  const hi = Math.max(...downs);
  const rangeLabel = lo === hi
    ? `$${lo.toLocaleString()}`
    : `$${lo.toLocaleString()} – $${hi.toLocaleString()}`;
  return { rows, rangeLabel };
}

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
    "This offer expires January 2, 2026. Honda incentives change monthly, so lock in your rate before it's gone.",
  eventLabel: 'Honda CR-V Current Offers',
  expirationDate: 'January 2, 2026',
};

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
const formatMsrp = (min: number, max: number) => `MSRP ${formatCurrency(min)} - ${formatCurrency(max)}`;

/** Demo routing: 2024 Chevrolet Trax → matched dealer; 2024 Kia Seltos → none (replace with API later). */
function getConversionBDealerMatch(offer: IncentiveOfferDetail): 'dealer' | 'no-dealer' {
  const y = Number(offer.year);
  const make = offer.make.trim().toLowerCase();
  const model = offer.model.trim().toLowerCase();
  if (y === 2024 && make === 'kia' && model === 'seltos') return 'no-dealer';
  if (y === 2024 && (make === 'chevrolet' || make === 'chevy') && model === 'trax') return 'dealer';
  return 'dealer';
}

const CONVERSION_B_SAMPLE_DEALER = {
  name: 'Audi Pacific',
  address: '20460 Hawthorne Blvd',
  city: 'Torrance',
  state: 'CA',
  zip: '90503',
  phone: '(424) 955-2736',
  distanceMiles: 6,
};

const getOfferRowChipLabel = (type: Incentive['type']): string =>
  type === 'lease' ? 'Lease' : 'Buy';

const EXPERT_TIPS: Record<Incentive['type'], string> = {
  finance: "Low-rate financing deals can beat cash rebates if you qualify. Always compare the total interest saved versus the rebate you\u2019re giving up before deciding.",
  cash: "Cash incentives (loyalty discounts, cash-back offers) can lower the purchase price significantly. That\u2019s especially valuable if you\u2019re paying up front or securing financing outside the dealership.",
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



/** Row shape for the APR table — now includes optional cash back. */
export interface AprTableRow {
  term: number;
  apr: number;
  cashBack?: number;
}

export function getAprRangeLabel(active: { value: string; title: string; terms?: string; rateTiers?: RateTier[] }): string {
  const rows = buildAprTable(active);
  const rates = rows.map(r => r.apr);
  const lo = Math.min(...rates);
  const hi = Math.max(...rates);
  if (lo === hi) return active.value;
  return `${lo}% - ${hi}% APR`;
}

/**
 * Build the APR table rows for a finance incentive.
 * If the incentive has rateTiers (tiered deal), use that data directly.
 * Otherwise, fall back to parsing the text and generating synthetic rows.
 */
export function buildAprTable(incentive: { value: string; title: string; terms?: string; rateTiers?: RateTier[] }): AprTableRow[] {
  // If we have explicit tier data, use it directly
  if (incentive.rateTiers && incentive.rateTiers.length > 0) {
    return incentive.rateTiers.map(tier => ({
      term: tier.term,
      apr: tier.apr,
      cashBack: tier.cashBack,
    }));
  }

  // Legacy fallback: parse text and generate synthetic rows
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

/**
 * Checks if cash back varies by term (needs 3-column table) or is uniform (can show as badge).
 */
export function hasTieredCashBack(rows: AprTableRow[]): boolean {
  const cashBacks = rows.map(r => r.cashBack ?? 0).filter(c => c > 0);
  if (cashBacks.length === 0) return false;
  const uniqueValues = new Set(cashBacks);
  return uniqueValues.size > 1;
}

/**
 * Get uniform cash back amount if all rows have the same value (for badge display).
 */
export function getUniformCashBack(rows: AprTableRow[]): number | null {
  const cashBacks = rows.map(r => r.cashBack ?? 0).filter(c => c > 0);
  if (cashBacks.length === 0) return null;
  const uniqueValues = new Set(cashBacks);
  if (uniqueValues.size === 1) return cashBacks[0];
  return null;
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
  const [conversionBPostSubmit, setConversionBPostSubmit] = useState<'dealer' | 'no-dealer' | null>(null);
  const conversionBFormRef = useRef<HTMLFormElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const leftFadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setConversionBPostSubmit(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (selectedIncentiveId) {
        setActiveIncentiveId(selectedIncentiveId);
      } else if (allIncentives && allIncentives.length > 0) {
        setActiveIncentiveId(allIncentives[0].id);
      }
    }
  }, [isOpen, selectedIncentiveId, allIncentives]);

  const activeIncentive: Incentive | null = allIncentives?.find(i => i.id === activeIncentiveId) ?? (() => {
    if (allIncentives && allIncentives.length > 0) return null;
    const isLease = /lease/i.test(offer.offerHeadline ?? '');
    return {
      id: '__legacy__',
      type: isLease ? 'lease' as const : 'finance' as const,
      title: offer.offerHeadline ?? '',
      description: offer.whatItMeans ?? '',
      value: isLease
        ? (offer.offerHeadline?.match(/\$[\d,]+\/mo(?:nth)?/i)?.[0] ?? offer.offerHeadline ?? '')
        : (offer.offerHeadline?.match(/[\d.]+%\s*APR/i)?.[0] ?? offer.offerHeadline ?? ''),
      expirationDate: offer.expirationDate ?? '',
      terms: offer.yourSavings,
      programDescription: offer.whatItMeans,
      programRules: offer.whoQualifies,
      programName: undefined,
      eligibility: offer.whoQualifies,
      groupAffiliation: 'everyone' as const,
    };
  })();

  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const wasLockedRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      scrollYRef.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      wasLockedRef.current = true;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>('button, [tabindex]')?.focus());
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Only restore scroll if body was actually locked. This guards against
      // the cleanup firing when the modal opens (first deps change) and
      // against open-to-open re-renders — we only want to restore when
      // transitioning out of the locked state.
      if (wasLockedRef.current && isOpen) {
        wasLockedRef.current = false;
        document.body.style.overflow = '';
        window.scrollTo(0, scrollYRef.current);
        triggerRef.current?.focus({ preventScroll: true });
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const THRESHOLD = 8;
    const pairs: [HTMLElement | null, HTMLElement | null][] = [
      [leftColRef.current, leftFadeRef.current],
    ];
    const update = (col: HTMLElement | null, fade: HTMLElement | null) => {
      if (!col || !fade) return;
      const canScroll = col.scrollHeight - col.scrollTop - col.clientHeight > THRESHOLD;
      fade.classList.toggle('incentives-modal__scroll-fade--hidden', !canScroll);
    };
    const onScroll = (e: Event) => {
      const col = e.target as HTMLElement;
      if (col !== leftColRef.current) return;
      update(col, leftFadeRef.current);
    };
    const ro = new ResizeObserver(() => pairs.forEach(([c, f]) => update(c, f)));
    pairs.forEach(([col, fade]) => {
      if (!col) return;
      update(col, fade);
      col.addEventListener('scroll', onScroll, { passive: true });
      ro.observe(col);
    });
    return () => {
      pairs.forEach(([col]) => col?.removeEventListener('scroll', onScroll));
      ro.disconnect();
    };
  }, [isOpen, activeIncentiveId]);

  /** Shared lead handoff - conversion-b keeps modal open to show dealer / no-dealer result. */
  const submitLead = useCallback(() => {
    const resolvedMessage =
      message.trim() ||
      `I would like more information about available offers for the New ${vehicleLabel}.`;
    onSubmitForm?.({ firstName, lastName, email, phone, message: resolvedMessage });

    if (variant === 'conversion-b') {
      const match = getConversionBDealerMatch(offer);
      setConversionBPostSubmit(match);
      return;
    }
    onClose();
  }, [firstName, lastName, email, phone, message, vehicleLabel, onSubmitForm, onClose, variant, offer]);

  /** Sticky CTA sits outside the <form>; validate the real form node then submit via React state (same as onSubmit). */
  const handleConversionBContactClick = useCallback(() => {
    if (conversionBPostSubmit !== null) return;

    const form =
      conversionBFormRef.current ??
      (typeof document !== 'undefined'
        ? (document.getElementById('incentives-modal-form-v5') as HTMLFormElement | null)
        : null);
    if (!form) {
      submitLead();
      return;
    }
    const panel = document.getElementById('incentives-modal-dealer-panel');
    if (!form.checkValidity()) {
      (panel ?? form).scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        form.reportValidity();
        form
          .querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
            'input:invalid, textarea:invalid, select:invalid'
          )
          ?.focus();
      }, 400);
      return;
    }
    submitLead();
  }, [submitLead, conversionBPostSubmit]);

  if (!isOpen) return null;

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      navigate(vehicleUrl);
    }
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitLead();
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

  const modalTree = (
    <div className="incentives-modal__overlay cd-mobile-modal__overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className={`incentives-modal incentives-modal--${variant} cd-mobile-modal__panel`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="incentives-modal-title"
      >
        <button type="button" className="incentives-modal__close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        <div
          className={
            variant === 'conversion-b'
              ? 'incentives-modal__inner incentives-modal__inner--conversion-b'
              : 'incentives-modal__inner'
          }
        >
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
              <button type="button" className="incentives-modal__secondary-link" onClick={onClose}>
                View Full Vehicle Details
              </button>
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
                <form
                  id="incentives-modal-form-complete"
                  onSubmit={handleFormSubmit}
                  className="incentives-modal__form"
                >
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
                form="incentives-modal-form-complete"
                className="incentives-modal__cta"
              >
                REQUEST INFO FROM DEALER
              </button>
              <button type="button" className="incentives-modal__secondary-link" onClick={onClose}>
                View Full Vehicle Details
              </button>
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
              <div className="incentives-modal__v5-body-scroll">
                <div className="incentives-modal__v5-layout">
                {/* LEFT COLUMN: Offer browser + details */}
                <div className="incentives-modal__v5-col-wrap">
                <div ref={leftColRef} className="incentives-modal__v5-left">
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
                        <div className="incentives-modal__v5-offer-value-block">
                          <span className="incentives-modal__v5-offer-apr">
                            {activeIncentive.type === 'finance'
                              ? getAprRangeLabel(activeIncentive)
                              : activeIncentive.type === 'cash'
                                ? <>{activeIncentive.value} <span className="incentives-modal__v5-offer-apr-suffix">cash back</span></>
                                : activeIncentive.value}
                          </span>
                          {activeIncentive.type === 'finance' && activeIncentive.rateTiers && (() => {
                            const cashBacks = activeIncentive.rateTiers.map(t => t.cashBack ?? 0).filter(c => c > 0);
                            if (cashBacks.length === 0) return null;
                            const maxCashBack = Math.max(...cashBacks);
                            return (
                              <span className="incentives-modal__v5-offer-cashback-line">
                                + up to ${maxCashBack.toLocaleString()} cash back
                              </span>
                            );
                          })()}
                        </div>
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
                      {activeIncentive.type === 'finance' && (() => {
                        const rows = buildAprTable(activeIncentive);
                        const showCashBackColumn = hasTieredCashBack(rows);
                        const uniformCashBack = getUniformCashBack(rows);
                        const hasMoreTerms = rows.length > 3;
                        return (
                          <div className="incentives-modal__rate-table">
                            <h4 className="incentives-modal__rate-table-title">Available APR Options</h4>
                            {uniformCashBack && (
                              <div className="incentives-modal__rate-table-badge">
                                + ${uniformCashBack.toLocaleString()} Cash Back on all terms
                              </div>
                            )}
                            <div
                              className={`incentives-modal__rate-table-scroll${hasMoreTerms ? ' incentives-modal__rate-table-scroll--has-more' : ''}`}
                              tabIndex={hasMoreTerms ? 0 : undefined}
                              aria-label={hasMoreTerms ? 'APR terms table. Scroll for more terms.' : 'APR terms table'}
                            >
                              <table className={`incentives-modal__rate-grid${showCashBackColumn ? ' incentives-modal__rate-grid--with-cashback' : ''}`}>
                                <thead>
                                  <tr>
                                    <th>Term</th>
                                    <th>Rate</th>
                                    {showCashBackColumn && <th>Cash Back</th>}
                                  </tr>
                                </thead>
                                <tbody>
                                  {rows.map(row => (
                                    <tr key={row.term}>
                                      <td className="incentives-modal__rate-term">{row.term} mo</td>
                                      <td className="incentives-modal__rate-cell">{row.apr}%</td>
                                      {showCashBackColumn && (
                                        <td className="incentives-modal__rate-cashback">
                                          {row.cashBack ? `$${row.cashBack.toLocaleString()}` : '—'}
                                        </td>
                                      )}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {hasMoreTerms && (
                              <div className="incentives-modal__rate-scroll-cue" aria-hidden="true">
                                Scroll for more terms
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      <div className="incentives-modal__v5-key-details">
                        <h3 className="incentives-modal__v5-key-heading">Key offer details</h3>

                        {activeIncentive.type === 'lease' ? (
                          <>
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

                            {activeIncentive.terms && (() => {
                              const cd = buildCashDownData(offer.make, offer.model, offer.msrpMin, offer.msrpMax, offer.eligibleTrims);
                              return (
                                <div className="incentives-modal__v5-key-section">
                                  <h4 className="incentives-modal__v5-key-section-title">TERMS</h4>
                                  <p className="incentives-modal__v5-key-section-text">
                                    {activeIncentive.terms} Estimated cash down (10% of MSRP): {cd.rangeLabel}.
                                  </p>
                                  <table className="incentives-modal__v5-cashdown-table">
                                    <thead>
                                      <tr><th>Trim</th><th>MSRP</th><th>Est. Cash Down</th></tr>
                                    </thead>
                                    <tbody>
                                      {cd.rows.map(r => (
                                        <tr key={r.name}>
                                          <td>{r.name}</td>
                                          <td>${r.msrp.toLocaleString()}</td>
                                          <td>${r.down.toLocaleString()}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              );
                            })()}

                            <div className="incentives-modal__v5-key-section">
                              <h4 className="incentives-modal__v5-key-section-title">ELIGIBLE TRIMS</h4>
                              <p className="incentives-modal__v5-key-section-text">{offer.eligibleTrims.join(', ')}</p>
                            </div>
                            <div className="incentives-modal__v5-key-section">
                              <h4 className="incentives-modal__v5-key-section-title">DON&apos;T WAIT TOO LONG</h4>
                              <p className="incentives-modal__v5-key-section-text">
                                This offer expires {activeIncentive.expirationDate}. Manufacturer deals change monthly. Once it&apos;s gone, there&apos;s no guarantee it&apos;ll come back.
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="incentives-modal__v5-key-section">
                              <h4 className="incentives-modal__v5-key-section-title">WHAT IS THIS OFFER?</h4>
                              <p className="incentives-modal__v5-key-section-text">{offer.make} US Special Lease Rates</p>
                            </div>
                            <div className="incentives-modal__v5-key-section">
                              <h4 className="incentives-modal__v5-key-section-title">PROGRAM RULES</h4>
                              <p className="incentives-modal__v5-key-section-text">[Eligibility] Residents residing in qualifying regions of the United States.; [Qualification] O.A.C. New and unregistered vehicles only are eligible.</p>
                            </div>
                            <div className="incentives-modal__v5-key-section">
                              <h4 className="incentives-modal__v5-key-section-title">TERMS</h4>
                              <p className="incentives-modal__v5-key-section-text">Lease for 24 months at 10,000 miles/year with $1,879 due at signing.</p>
                            </div>
                            <div className="incentives-modal__v5-key-section">
                              <h4 className="incentives-modal__v5-key-section-title">ELIGIBLE TRIMS</h4>
                              <p className="incentives-modal__v5-key-section-text">{offer.eligibleTrims.join(', ')}</p>
                            </div>
                            <div className="incentives-modal__v5-key-section">
                              <h4 className="incentives-modal__v5-key-section-title">DON&apos;T WAIT TOO LONG</h4>
                              <p className="incentives-modal__v5-key-section-text">This offer expires January 2, 2026. Manufacturer deals change monthly—once it&apos;s gone, there&apos;s no guarantee it&apos;ll come back.</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                  <div ref={leftFadeRef} className="incentives-modal__scroll-fade" aria-hidden />
                </div>

                {/* RIGHT COLUMN: Dealer contact form or post-submit result */}
                <div className="incentives-modal__v5-col-wrap">
                <div className="incentives-modal__v5-right" id="incentives-modal-dealer-panel">
                  {conversionBPostSubmit === null && (
                    <>
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

                      <form
                        ref={conversionBFormRef}
                        id="incentives-modal-form-v5"
                        onSubmit={handleFormSubmit}
                        className="incentives-modal__v5-form"
                      >
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
                    </>
                  )}

                  {conversionBPostSubmit === 'dealer' && (
                    <div className="incentives-modal__v5-post-result incentives-modal__v5-post-result--dealer">
                      <div className="incentives-modal__v5-post-dealer-header">
                        <span className="incentives-modal__v5-post-dealer-icon" aria-hidden>
                          <Check size={18} strokeWidth={3} />
                        </span>
                        <h3 className="incentives-modal__v5-post-dealer-title">Your local dealer</h3>
                        <p className="incentives-modal__v5-post-dealer-sub">
                          They may contact you to discuss the next steps.
                        </p>
                      </div>
                      <div className="incentives-modal__v5-post-dealer-card">
                        <div className="incentives-modal__v5-post-dealer-card-main">
                          <p className="incentives-modal__v5-post-dealer-name">{CONVERSION_B_SAMPLE_DEALER.name}</p>
                          <p className="incentives-modal__v5-post-dealer-address">
                            {CONVERSION_B_SAMPLE_DEALER.address}
                            <br />
                            {CONVERSION_B_SAMPLE_DEALER.city}, {CONVERSION_B_SAMPLE_DEALER.state}{' '}
                            {CONVERSION_B_SAMPLE_DEALER.zip}
                          </p>
                        </div>
                        <div className="incentives-modal__v5-post-dealer-card-aside">
                          <a
                            className="incentives-modal__v5-post-dealer-link-row"
                            href="tel:+14249552736"
                          >
                            <Phone size={16} className="incentives-modal__v5-post-dealer-link-icon" aria-hidden />
                            {CONVERSION_B_SAMPLE_DEALER.phone}
                          </a>
                          <p className="incentives-modal__v5-post-dealer-distance">
                            <MapPin size={16} className="incentives-modal__v5-post-dealer-link-icon" aria-hidden />
                            {CONVERSION_B_SAMPLE_DEALER.distanceMiles} miles away
                          </p>
                          <div className="incentives-modal__v5-post-dealer-actions">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                `${CONVERSION_B_SAMPLE_DEALER.address}, ${CONVERSION_B_SAMPLE_DEALER.city}, ${CONVERSION_B_SAMPLE_DEALER.state} ${CONVERSION_B_SAMPLE_DEALER.zip}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="incentives-modal__v5-post-dealer-action-link"
                            >
                              Map
                            </a>
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                                `${CONVERSION_B_SAMPLE_DEALER.address}, ${CONVERSION_B_SAMPLE_DEALER.city}, ${CONVERSION_B_SAMPLE_DEALER.state} ${CONVERSION_B_SAMPLE_DEALER.zip}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="incentives-modal__v5-post-dealer-action-link"
                            >
                              <Navigation size={14} className="incentives-modal__v5-post-dealer-nav-icon" aria-hidden />
                              Directions
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {conversionBPostSubmit === 'no-dealer' && (
                    <div className="incentives-modal__v5-post-result incentives-modal__v5-post-result--no-dealer">
                      <h3 className="incentives-modal__v5-post-no-dealer-title">No dealer matched nearby</h3>
                      <p className="incentives-modal__v5-post-no-dealer-text">
                        Sorry, we don&apos;t have a participating dealer for this vehicle in your area right now.
                        Car &amp; Driver Marketplace has thousands of listings to explore.
                      </p>
                      <p className="incentives-modal__v5-post-no-dealer-cta-hint">
                        Use <strong>Shop on Marketplace</strong> below to browse inventory.
                      </p>
                    </div>
                  )}

                  <div className="incentives-modal__v5-cta-sticky">
                    {conversionBPostSubmit === null ? (
                      <button
                        type="button"
                        className="incentives-modal__v5-submit"
                        onClick={handleConversionBContactClick}
                      >
                        CONTACT DEALER
                      </button>
                    ) : (
                      <button type="button" className="incentives-modal__v5-submit" onClick={onClose}>
                        Done
                      </button>
                    )}
                    <button
                      type="button"
                      className="incentives-modal__v5-marketplace-btn"
                      onClick={() => {
                        onClose();
                        navigate(vehicleUrl);
                      }}
                    >
                      SHOP NEW TRAX
                    </button>
                  </div>
                </div>
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
                        <div className="incentives-modal__v5-offer-value-block">
                          <span className="incentives-modal__v5-offer-apr">
                            {activeIncentive.type === 'finance'
                              ? getAprRangeLabel(activeIncentive)
                              : activeIncentive.type === 'cash'
                                ? <>{activeIncentive.value} <span className="incentives-modal__v5-offer-apr-suffix">cash back</span></>
                                : activeIncentive.value}
                          </span>
                          {activeIncentive.type === 'finance' && activeIncentive.rateTiers && (() => {
                            const cashBacks = activeIncentive.rateTiers.map(t => t.cashBack ?? 0).filter(c => c > 0);
                            if (cashBacks.length === 0) return null;
                            const maxCashBack = Math.max(...cashBacks);
                            return (
                              <span className="incentives-modal__v5-offer-cashback-line">
                                + up to ${maxCashBack.toLocaleString()} cash back
                              </span>
                            );
                          })()}
                        </div>
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

                      {activeIncentive.type === 'finance' && (() => {
                        const rows = buildAprTable(activeIncentive);
                        const showCashBackColumn = hasTieredCashBack(rows);
                        const uniformCashBack = getUniformCashBack(rows);
                        const hasMoreTerms = rows.length > 3;
                        return (
                          <div className="incentives-modal__rate-table">
                            <h4 className="incentives-modal__rate-table-title">Available APR Options</h4>
                            {uniformCashBack && (
                              <div className="incentives-modal__rate-table-badge">
                                + ${uniformCashBack.toLocaleString()} Cash Back on all terms
                              </div>
                            )}
                            <div
                              className={`incentives-modal__rate-table-scroll${hasMoreTerms ? ' incentives-modal__rate-table-scroll--has-more' : ''}`}
                              tabIndex={hasMoreTerms ? 0 : undefined}
                              aria-label={hasMoreTerms ? 'APR terms table. Scroll for more terms.' : 'APR terms table'}
                            >
                              <table className={`incentives-modal__rate-grid${showCashBackColumn ? ' incentives-modal__rate-grid--with-cashback' : ''}`}>
                                <thead>
                                  <tr>
                                    <th>Term</th>
                                    <th>Rate</th>
                                    {showCashBackColumn && <th>Cash Back</th>}
                                  </tr>
                                </thead>
                                <tbody>
                                  {rows.map(row => (
                                    <tr key={row.term}>
                                      <td className="incentives-modal__rate-term">{row.term} mo</td>
                                      <td className="incentives-modal__rate-cell">{row.apr}%</td>
                                      {showCashBackColumn && (
                                        <td className="incentives-modal__rate-cashback">
                                          {row.cashBack ? `$${row.cashBack.toLocaleString()}` : '—'}
                                        </td>
                                      )}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {hasMoreTerms && (
                              <div className="incentives-modal__rate-scroll-cue" aria-hidden="true">
                                Scroll for more terms
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      <div className="incentives-modal__v5-key-details">
                        <h3 className="incentives-modal__v5-key-heading">Key offer details</h3>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">WHAT IS THIS OFFER?</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.make} US Special Lease Rates</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">PROGRAM RULES</h4>
                          <p className="incentives-modal__v5-key-section-text">[Eligibility] Residents residing in qualifying regions of the United States.; [Qualification] O.A.C. New and unregistered vehicles only are eligible.</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">TERMS</h4>
                          <p className="incentives-modal__v5-key-section-text">Lease for 24 months at 10,000 miles/year with $1,879 due at signing.</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">ELIGIBLE TRIMS</h4>
                          <p className="incentives-modal__v5-key-section-text">{offer.eligibleTrims.join(', ')}</p>
                        </div>
                        <div className="incentives-modal__v5-key-section">
                          <h4 className="incentives-modal__v5-key-section-title">DON&apos;T WAIT TOO LONG</h4>
                          <p className="incentives-modal__v5-key-section-text">This offer expires January 2, 2026. Manufacturer deals change monthly—once it&apos;s gone, there&apos;s no guarantee it&apos;ll come back.</p>
                        </div>
                      </div>

                      <div className="incentives-modal__v6-cta-row">
                        <button type="button" className="incentives-modal__v6-cta-primary" onClick={handleCta}>
                          SHOP ON MARKETPLACE
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined' && document.body) {
    return createPortal(modalTree, document.body);
  }
  return modalTree;
};

export default IncentivesModal;
