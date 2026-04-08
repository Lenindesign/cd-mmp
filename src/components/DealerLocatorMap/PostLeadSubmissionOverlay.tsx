import { X, Check, MapPin, Navigation, Phone, AlertCircle } from 'lucide-react';
import type { DealerWithScore } from '../../services/dealerService';
import { formatDistance } from '../../services/dealerService';
import './PostLeadSubmissionOverlay.css';

export type PostLeadSubmissionVariant = 'your-dealer' | 'no-dealer';

export interface PostLeadSubmissionOverlayProps {
  variant: PostLeadSubmissionVariant;
  /** Required when variant is your-dealer */
  dealer?: DealerWithScore;
  onDismiss: () => void;
}

const PostLeadSubmissionOverlay = ({
  variant,
  dealer,
  onDismiss,
}: PostLeadSubmissionOverlayProps) => {
  const effectiveVariant = variant === 'your-dealer' && !dealer ? 'no-dealer' : variant;

  const directionsHref =
    dealer &&
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${dealer.address}, ${dealer.city}, ${dealer.state} ${dealer.zipCode}`
    )}`;

  return (
    <div className="post-lead-overlay" role="dialog" aria-modal="true" aria-labelledby="post-lead-overlay-title">
      <div className="post-lead-overlay__backdrop" onClick={onDismiss} aria-hidden="true" />
      <div className="post-lead-overlay__panel">
        <button type="button" className="post-lead-overlay__close" onClick={onDismiss} aria-label="Close">
          <X size={22} />
        </button>

        {effectiveVariant === 'your-dealer' && dealer && (
          <>
            <div className="post-lead-overlay__header post-lead-overlay__header--dealer">
              <div className="post-lead-overlay__title-row">
                <div className="post-lead-overlay__check" aria-hidden>
                  <Check size={14} strokeWidth={3} />
                </div>
                <h2 id="post-lead-overlay-title" className="post-lead-overlay__title">
                  Your dealer
                </h2>
              </div>
              <p className="post-lead-overlay__subtitle">They may contact you to discuss the next steps.</p>
            </div>

            <div className="post-lead-overlay__dealer-card">
              <div className="post-lead-overlay__dealer-info">
                <h3 className="post-lead-overlay__dealer-name">{dealer.name}</h3>
                <p className="post-lead-overlay__dealer-line">{dealer.address}</p>
                <p className="post-lead-overlay__dealer-line">
                  {dealer.city}, {dealer.state} {dealer.zipCode}
                </p>
              </div>
              <div className="post-lead-overlay__dealer-contact">
                <a href={`tel:${dealer.phone.replace(/[^0-9]/g, '')}`} className="post-lead-overlay__phone">
                  <Phone size={14} aria-hidden />
                  {dealer.phone}
                </a>
                <p className="post-lead-overlay__distance">
                  <MapPin size={14} aria-hidden />
                  {formatDistance(dealer.distance || 0)} away
                </p>
                <div className="post-lead-overlay__links">
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="post-lead-overlay__link"
                  >
                    <Navigation size={14} aria-hidden />
                    Directions
                  </a>
                </div>
              </div>
            </div>

            <p className="post-lead-overlay__footnote">
              Your request was sent. Watch your phone and email for follow-up from the dealer.
            </p>
          </>
        )}

        {effectiveVariant === 'no-dealer' && (
          <>
            <div className="post-lead-overlay__icon-wrap post-lead-overlay__icon-wrap--muted" aria-hidden>
              <AlertCircle size={40} />
            </div>
            <h2 id="post-lead-overlay-title" className="post-lead-overlay__title post-lead-overlay__title--center">
              No dealer found
            </h2>
            <div className="post-lead-overlay__sorry">
              <strong>We&apos;re sorry…</strong>
              <p>
                We couldn&apos;t match a participating dealer near your location for this request right now. Try a
                different ZIP or city, or browse all deals—we&apos;ll keep improving coverage in your area.
              </p>
            </div>
          </>
        )}

        <button type="button" className="post-lead-overlay__done" onClick={onDismiss}>
          Done
        </button>
      </div>
    </div>
  );
};

export default PostLeadSubmissionOverlay;
