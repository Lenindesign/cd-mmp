import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Info, ChevronRight } from 'lucide-react';
import SavingsText from '../SavingsText';
import { OptimizedImage } from '../OptimizedImage';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import { formatExpiration } from '../../utils/dateUtils';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { vehicleImageFor } from '../../utils/vehicleImages';
import './DealCard.css';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface DealCardDetail {
  label: string;
  value: React.ReactNode;
}

export interface DealCardPayment {
  amount: string;
  period: string;
  /** Pre-formatted savings text passed to <SavingsText>, OR a plain string rendered as-is. */
  savings?: { type: 'savings-text'; text: string } | { type: 'plain'; text: string };
  savingsTooltip?: string;
  expirationDate: string;
  /** Optional cash back label for tiered finance deals (e.g. "+ up to $2,000 cash back") */
  cashBackLabel?: string;
}

export interface DealCardPill {
  chipLabel: string;
  text: string;
  expirationDate: string;
}

export interface DealCardProps {
  /** Unique key for offers-popup matching */
  slug: string;
  vehicleName: string;
  vehicleImage: string;
  vehicleImageFallback?: string;
  imageLoading?: React.ImgHTMLAttributes<HTMLImageElement>['loading'];
  vehicleSlug: string;
  vehicleMake: string;
  vehicleModel: string;

  /** Rating (e.g. 8.5). Omit to hide the rating block. */
  rating?: number | null;

  /** Tag shown on the image overlay (e.g. "Lease", "Cash", "Buy") */
  dealTypeTag?: string;

  /** Extra badge on the image (e.g. body-style or fuel-type label) */
  imageBadge?: string;

  /** Award badges */
  editorsChoice?: boolean;
  tenBest?: boolean;

  /** Save / favorite state */
  isSaved: boolean;
  onSaveClick: (e: React.MouseEvent) => void;

  /** Offers popup */
  offers: VehicleOfferSummary[];
  offersPopupOpen: boolean;
  onToggleOffersPopup: (e: React.MouseEvent) => void;
  onCloseOffersPopup: (e: React.MouseEvent) => void;

  /** Payment block data */
  payment: DealCardPayment;

  /** Deal pill (hidden globally via index.css, but kept for completeness) */
  pill?: DealCardPill;

  /** Detail rows (e.g. Term, MSRP Range, Due at Signing) */
  details: DealCardDetail[];

  /** Optional special eligibility labels, e.g. Military eligible. */
  eligibilityLabels?: string[];

  /** Primary CTA click handler */
  onDealClick: (e: React.MouseEvent) => void;

  /** Secondary CTA - defaults to "Shop New {model}" link.
   *  Set to 'none' to hide, or provide a custom config. */
  secondaryCta?:
    | 'none'
    | { type: 'link'; to: string; label: string }
    | { type: 'toggle'; to: string; label: string };
}

const escapeSvgText = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&apos;';
      default:
        return char;
    }
  });

const getDealCardFallbackImage = (vehicleName: string, badge?: string) => {
  const title = escapeSvgText(vehicleName);
  const kicker = escapeSvgText(badge || 'Vehicle');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f7f8f8"/>
          <stop offset="100%" stop-color="#e8ecef"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg)"/>
      <path d="M132 312h536c24 0 44 20 44 44v16H88v-16c0-24 20-44 44-44Z" fill="#d8e2e8"/>
      <path d="M194 286c42-66 86-102 158-102h116c68 0 119 35 160 102H194Z" fill="#ffffff"/>
      <path d="M244 286c34-42 64-64 111-64h104c42 0 77 22 107 64H244Z" fill="#c8d7e0"/>
      <path d="M181 315h438c34 0 64 22 74 54H107c10-32 40-54 74-54Z" fill="#1f638f"/>
      <circle cx="229" cy="372" r="45" fill="#f7f8f8"/>
      <circle cx="229" cy="372" r="23" fill="#53616a"/>
      <circle cx="571" cy="372" r="45" fill="#f7f8f8"/>
      <circle cx="571" cy="372" r="23" fill="#53616a"/>
      <rect x="306" y="132" width="188" height="36" rx="18" fill="#1f638f" opacity="0.12"/>
      <text x="400" y="157" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="3" fill="#1f638f">${kicker.toUpperCase()}</text>
      <text x="400" y="445" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="800" fill="#1f2328">${title}</text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const DealCard: React.FC<DealCardProps> = ({
  slug,
  vehicleName,
  vehicleImage,
  vehicleImageFallback,
  imageLoading = 'lazy',
  vehicleSlug,
  vehicleModel,
  rating,
  dealTypeTag,
  imageBadge,
  editorsChoice,
  tenBest,
  isSaved,
  onSaveClick,
  offers,
  offersPopupOpen,
  onToggleOffersPopup,
  onCloseOffersPopup,
  payment,
  pill,
  details,
  eligibilityLabels,
  onDealClick,
  secondaryCta,
}) => {
  const vehiclePath = `/${vehicleSlug}`;
  const generatedFallback = vehicleImageFor(vehicleName);
  const primaryImage = vehicleImage || vehicleImageFallback || generatedFallback;
  const fallbackSrc = getDealCardFallbackImage(vehicleName, imageBadge || dealTypeTag);

  const defaultSecondaryCta = secondaryCta === undefined
    ? { type: 'link' as const, to: vehiclePath, label: `Shop New ${vehicleModel}` }
    : secondaryCta;

  return (
    <div className="deal-card" role="listitem">
      {/* Header */}
      <div className="deal-card__header">
        <Link to={vehiclePath} className="deal-card__name-link">
          <h3 className="deal-card__name">{vehicleName}</h3>
        </Link>
        {rating != null && (
          <div className="deal-card__rating">
            <span className="deal-card__rating-value">{rating}</span>
            <span className="deal-card__rating-max">/10</span>
            <span className="deal-card__rating-label">C/D Rating</span>
          </div>
        )}
      </div>

      {/* Image */}
      <div className="deal-card__image-container">
        <Link to={vehiclePath} className="deal-card__image-link" aria-label={`View ${vehicleName}`}>
          <OptimizedImage
            src={primaryImage}
            fallbackSrc={fallbackSrc}
            alt={vehicleName}
            className="deal-card__image"
            wrapperClassName="deal-card__optimized-image"
            loading={imageLoading}
            fallbackDelayMs={1600}
          />
        </Link>

        {dealTypeTag && (
          <span className="deal-card__deal-type-tag">{dealTypeTag}</span>
        )}

        <button
          type="button"
          className={`deal-card__save ${isSaved ? 'deal-card__save--saved' : ''}`}
          onClick={onSaveClick}
          aria-label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        {offers.length > 1 && (
          <button
            type="button"
            className="deal-card__offers-tag"
            onClick={onToggleOffersPopup}
            aria-expanded={offersPopupOpen}
            aria-controls={`${slug}-offers-popup`}
          >
            {offers.length} Offers Available
          </button>
        )}

        {offersPopupOpen && (
          <div className="deal-card__offers-popup" id={`${slug}-offers-popup`} role="region" aria-label={`${offers.length} available offers`}>
            <div className="deal-card__offers-popup-header">
              <strong>{offers.length} Available Offers</strong>
              <button
                type="button"
                className="deal-card__offers-popup-close"
                onClick={onCloseOffersPopup}
                aria-label="Close offers"
              >
                &times;
              </button>
            </div>
            <ul className="deal-card__offers-popup-list">
              {offers.map((o, idx) => (
                <li key={idx} className="deal-card__offers-popup-item">
                  <span className={`deal-card__offers-popup-type deal-card__offers-popup-type--${o.type}`}>
                    {o.type === 'zero-apr' ? '0% APR' : o.type === 'cash' ? 'Cash' : o.type === 'finance' ? 'Buy' : 'Lease'}
                  </span>
                  <span className="deal-card__offers-popup-label">{o.label}</span>
                  <span className="deal-card__offers-popup-exp">
                    expires {formatExpiration(o.expires)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {imageBadge && (
          <span className="deal-card__image-badge">{imageBadge}</span>
        )}

        {(editorsChoice || tenBest) && (
          <div className="deal-card__badges">
            {tenBest && (
              <span className="deal-card__badge" aria-label="10Best winner">
                <img src={TEN_BEST_BADGE_URL} alt="" aria-hidden="true" className="deal-card__badge-img" />
                <span className="deal-card__badge-tip" role="tooltip">10Best</span>
              </span>
            )}
            {editorsChoice && (
              <span className="deal-card__badge" aria-label="Editors' Choice">
                <img src={EDITORS_CHOICE_BADGE_URL} alt="" aria-hidden="true" className="deal-card__badge-img" />
                <span className="deal-card__badge-tip" role="tooltip">Editors' Choice</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="deal-card__body">
        {/* Payment block */}
        <div className="deal-card__payment-block">
          <div className="deal-card__payment">
            <span className="deal-card__payment-amount">{payment.amount}</span>
            <span className="deal-card__payment-period">{payment.period}</span>
          </div>
          {payment.cashBackLabel && (
            <span className="deal-card__payment-cashback">{payment.cashBackLabel}</span>
          )}
          {payment.savings && (
            <span className="deal-card__payment-savings">
              {payment.savings.type === 'savings-text'
                ? <SavingsText text={payment.savings.text} />
                : payment.savings.text}
              {payment.savingsTooltip && (
                <span className="deal-card__tooltip-wrap">
                  <Info size={13} className="deal-card__tooltip-icon" />
                  <span className="deal-card__tooltip">{payment.savingsTooltip}</span>
                </span>
              )}
            </span>
          )}
          <span className="deal-card__payment-expires">
            Expires {formatExpiration(payment.expirationDate)}
            {eligibilityLabels && eligibilityLabels.length > 0 && (
              <>
                <span className="deal-card__payment-meta-separator" aria-hidden="true">•</span>
                <span className="deal-card__payment-eligibility">
                  {eligibilityLabels.join(' • ')}
                </span>
              </>
            )}
          </span>
        </div>

        {/* Deal pill */}
        {pill && (
          <button
            type="button"
            className="deal-card__deal-pill"
            onClick={onDealClick}
          >
            <span className="deal-card__deal-pill-chip">{pill.chipLabel}</span>
            <span className="deal-card__deal-pill-text">{pill.text}</span>
            <span className="deal-card__deal-pill-divider" />
            <span className="deal-card__deal-pill-expires">
              expires {formatExpiration(pill.expirationDate)}
            </span>
          </button>
        )}

        {/* Detail rows */}
        {details.length > 0 && (
          <div className="deal-card__details">
            {details.map((d, i) => (
              <div key={i} className="deal-card__detail">
                <span className="deal-card__detail-label">{d.label}</span>
                <span className="deal-card__detail-value">{d.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Primary CTA */}
        <button type="button" className="deal-card__cta" onClick={onDealClick}>
          Get This Deal
        </button>

        {/* Secondary CTA */}
        {defaultSecondaryCta !== 'none' && defaultSecondaryCta && (
          defaultSecondaryCta.type === 'toggle' ? (
            <Link to={defaultSecondaryCta.to} className="deal-card__toggle">
              <span>{defaultSecondaryCta.label}</span>
              <ChevronRight size={14} />
            </Link>
          ) : (
            <Link
              to={defaultSecondaryCta.to}
              className="deal-card__cta deal-card__cta--secondary"
            >
              {defaultSecondaryCta.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default React.memo(DealCard);
