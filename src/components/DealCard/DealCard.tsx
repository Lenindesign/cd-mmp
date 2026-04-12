import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Info, ChevronRight } from 'lucide-react';
import SavingsText from '../SavingsText';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import { formatExpiration } from '../../utils/dateUtils';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
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

  /** Primary CTA click handler */
  onDealClick: (e: React.MouseEvent) => void;

  /** Secondary CTA — defaults to "Shop New {model}" link.
   *  Set to 'none' to hide, or provide a custom config. */
  secondaryCta?:
    | 'none'
    | { type: 'link'; to: string; label: string }
    | { type: 'toggle'; to: string; label: string };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const DealCard: React.FC<DealCardProps> = ({
  vehicleName,
  vehicleImage,
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
  onDealClick,
  secondaryCta,
}) => {
  const vehiclePath = `/${vehicleSlug}`;

  const defaultSecondaryCta = secondaryCta === undefined
    ? { type: 'link' as const, to: vehiclePath, label: `Shop New ${vehicleModel}` }
    : secondaryCta;

  return (
    <div className="deal-card">
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
      <Link to={vehiclePath} className="deal-card__image-link">
        <div className="deal-card__image-container">
          <img src={vehicleImage} alt={vehicleName} className="deal-card__image" />

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
            >
              {offers.length} Offers Available
            </button>
          )}

          {offersPopupOpen && (
            <div className="deal-card__offers-popup">
              <div className="deal-card__offers-popup-header">
                <strong>{offers.length} Available Offers</strong>
                <button
                  type="button"
                  className="deal-card__offers-popup-close"
                  onClick={onCloseOffersPopup}
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
              {tenBest && <img src={TEN_BEST_BADGE_URL} alt="10Best" className="deal-card__badge-img" />}
              {editorsChoice && <img src={EDITORS_CHOICE_BADGE_URL} alt="Editors' Choice" className="deal-card__badge-img" />}
            </div>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="deal-card__body">
        {/* Payment block */}
        <div className="deal-card__payment-block">
          <div className="deal-card__payment">
            <span className="deal-card__payment-amount">{payment.amount}</span>
            <span className="deal-card__payment-period">{payment.period}</span>
          </div>
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

export default DealCard;
