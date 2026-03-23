import { useState, useEffect } from 'react';
import { X, ThumbsUp, ThumbsDown, MessageCircle, Share2, ChevronDown, Sparkles } from 'lucide-react';
import './ContactDealerModal.css';

export type ContactDealerVariant = 'default' | 'form' | 'edmunds';

/** Deal/offer data for the Edmunds-inspired variant */
export interface ContactDealerDealDetails {
  msrp: number;
  monthlyPayment: number;
  dueAtSigning: number;
  termMonths: number;
  imageUrl?: string;
  ourTakeRating?: string;
  ourTakeText?: string;
  keyDetails?: Array<{ label: string; value: string }>;
  comparisonLabel?: string;
}

export interface ContactDealerModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: ContactDealerVariant;
  vehicle?: {
    year: number;
    make: string;
    model: string;
  };
  dealDetails?: ContactDealerDealDetails;
  onSubmit?: (data: ContactDealerFormData) => void;
  onGetThisDeal?: () => void;
}

export interface ContactDealerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const DEFAULT_VEHICLE = { year: 2026, make: 'Honda', model: 'CR-V' };

const DEFAULT_DEAL_DETAILS: ContactDealerDealDetails = {
  msrp: 40095,
  monthlyPayment: 218,
  dueAtSigning: 2718,
  termMonths: 36,
  ourTakeRating: '5/5 Excellent',
  ourTakeText: "This lease deal offers exceptional value relative to the vehicle's MSRP.",
  keyDetails: [
    { label: 'Term', value: '36 months' },
    { label: 'Due at signing', value: '$2,718' },
    { label: 'Mileage allowance', value: '12,000 miles/year' },
    { label: 'Lifetime cost', value: '$10,348' },
    { label: 'Eligible trims', value: 'Sport' },
    { label: 'Offer ends', value: 'Mar. 30, 2026' },
  ],
  comparisonLabel: '$233/mo lower than similar cars',
};

const ContactDealerModal = ({
  isOpen,
  onClose,
  variant,
  vehicle = DEFAULT_VEHICLE,
  dealDetails: dealDetailsProp,
  onSubmit,
  onGetThisDeal,
}: ContactDealerModalProps) => {
  const dealDetails = variant === 'edmunds' ? { ...DEFAULT_DEAL_DETAILS, ...dealDetailsProp } : undefined;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const vehicleLabel = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const prefillMessage = `I would like more information about available offers for the New ${vehicleLabel}.`;

  useEffect(() => {
    if (isOpen && variant === 'form') {
      setMessage(prefillMessage);
    }
  }, [isOpen, variant, prefillMessage]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      firstName,
      lastName,
      email,
      phone,
      message: message || prefillMessage,
    });
    onClose();
  };

  if (!isOpen) return null;

  const disclaimerText =
    'By clicking the button, you agree to the Autotrader Visitor Agreement and Privacy Statement and that your contact and/or My Wallet information will be shared with the dealer and/or Car and Driver, including for their own advertising purposes. Each party\'s use of your information is subject to their privacy policy.';

  return (
    <div className="contact-dealer-modal__overlay" onClick={onClose}>
      <div
        className={`contact-dealer-modal ${variant === 'edmunds' ? 'contact-dealer-modal--edmunds' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dealer-modal-title"
      >
        <button
          type="button"
          className="contact-dealer-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Header – blue for default/form; Edmunds uses white header area */}
        {variant !== 'edmunds' && (
          <header className="contact-dealer-modal__header">
            <h2 id="contact-dealer-modal-title" className="contact-dealer-modal__title">
              {variant === 'form' ? 'Got Questions? Contact The Dealer' : 'Contact the Dealer'}
            </h2>
            <p className="contact-dealer-modal__subtitle">
              {vehicleLabel}
            </p>
          </header>
        )}

        {/* Content */}
        <div className="contact-dealer-modal__content">
          {variant === 'default' && (
            <>
              <p className="contact-dealer-modal__intro">
                Get in touch with a dealer about this vehicle. They can answer questions, share current offers, and schedule a test drive.
              </p>
            </>
          )}

          {variant === 'form' && (
            <form
              id="contact-dealer-form"
              onSubmit={handleSubmit}
              className="contact-dealer-modal__form"
            >
              <div className="contact-dealer-modal__row contact-dealer-modal__row--two-col">
                <div className="contact-dealer-modal__field">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="contact-dealer-modal__input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    aria-label="First name"
                  />
                </div>
                <div className="contact-dealer-modal__field">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="contact-dealer-modal__input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    aria-label="Last name"
                  />
                </div>
              </div>
              <div className="contact-dealer-modal__row contact-dealer-modal__row--two-col">
                <div className="contact-dealer-modal__field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="contact-dealer-modal__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email"
                  />
                </div>
                <div className="contact-dealer-modal__field">
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    className="contact-dealer-modal__input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-label="Phone (optional)"
                  />
                </div>
              </div>
              <div className="contact-dealer-modal__field">
                <label className="contact-dealer-modal__label">MESSAGE</label>
                <textarea
                  className="contact-dealer-modal__textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  aria-label="Message"
                />
              </div>
              <p className="contact-dealer-modal__disclaimer">
                <a href="#" className="contact-dealer-modal__link">Visitor Agreement</a>
                {' and '}
                <a href="#" className="contact-dealer-modal__link">Privacy Statement</a>
                {' — '}
                {disclaimerText}
              </p>
            </form>
          )}

          {variant === 'edmunds' && dealDetails && (
            <div className="contact-dealer-modal__edmunds">
              <div className="contact-dealer-modal__edmunds-header">
                <h2 id="contact-dealer-modal-title" className="contact-dealer-modal__edmunds-title">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h2>
                <a href="#" className="contact-dealer-modal__edmunds-review">Read review &gt;</a>
              </div>
              <p className="contact-dealer-modal__edmunds-msrp">
                MSRP: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(dealDetails.msrp)}
              </p>

              <div className="contact-dealer-modal__edmunds-image-wrap">
                {dealDetails.imageUrl ? (
                  <img src={dealDetails.imageUrl} alt={vehicleLabel} className="contact-dealer-modal__edmunds-image" />
                ) : (
                  <div className="contact-dealer-modal__edmunds-image-placeholder">
                    <span>{vehicle.make} {vehicle.model}</span>
                  </div>
                )}
              </div>

              <div className="contact-dealer-modal__edmunds-engagement">
                <button type="button" className="contact-dealer-modal__edmunds-pill">
                  <ThumbsUp size={14} /> 134
                </button>
                <button type="button" className="contact-dealer-modal__edmunds-pill">
                  <ThumbsDown size={14} />
                </button>
                <button type="button" className="contact-dealer-modal__edmunds-pill">
                  <MessageCircle size={14} /> 98
                </button>
                <button type="button" className="contact-dealer-modal__edmunds-pill">
                  <Share2 size={14} /> Share
                </button>
              </div>

              <div className="contact-dealer-modal__edmunds-price-block">
                <span className="contact-dealer-modal__edmunds-monthly">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(dealDetails.monthlyPayment)}/mo
                </span>
                <span className="contact-dealer-modal__edmunds-signing">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(dealDetails.dueAtSigning)} at signing | {dealDetails.termMonths} month term
                </span>
              </div>

              <div className="contact-dealer-modal__edmunds-our-take">
                <h3 className="contact-dealer-modal__edmunds-our-take-heading">Our take</h3>
                <div className="contact-dealer-modal__edmunds-our-take-card">
                  <Sparkles size={24} className="contact-dealer-modal__edmunds-our-take-icon" aria-hidden />
                  <p className="contact-dealer-modal__edmunds-our-take-rating">{dealDetails.ourTakeRating}</p>
                  <p className="contact-dealer-modal__edmunds-our-take-text">{dealDetails.ourTakeText}</p>
                </div>
              </div>

              {dealDetails.comparisonLabel && (
                <p className="contact-dealer-modal__edmunds-comparison">{dealDetails.comparisonLabel}</p>
              )}

              <div className="contact-dealer-modal__edmunds-key-details">
                <h3 className="contact-dealer-modal__edmunds-key-heading">Key offer details</h3>
                <dl className="contact-dealer-modal__edmunds-dl">
                  {dealDetails.keyDetails?.map((row, i) => (
                    <div key={i} className="contact-dealer-modal__edmunds-dl-row">
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="contact-dealer-modal__edmunds-fine-print">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(dealDetails.dueAtSigning)} total due at lease signing includes down payment, first month payment, and $0 security deposit. Total cost to lessee over the lease term may vary. Excludes sales tax, title, registration and other fees. Lessee responsible for maintenance, insurance, and excess wear/mileage.
              </p>
              <button type="button" className="contact-dealer-modal__edmunds-read-more">
                Read more <ChevronDown size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="contact-dealer-modal__footer">
          {variant === 'default' && (
            <button
              type="button"
              className="contact-dealer-modal__btn contact-dealer-modal__btn--primary"
              onClick={onClose}
            >
              Request Dealer Info
            </button>
          )}
          {variant === 'form' && (
            <button
              type="submit"
              form="contact-dealer-form"
              className="contact-dealer-modal__btn contact-dealer-modal__btn--primary"
            >
              REQUEST INFO
            </button>
          )}
          {variant === 'edmunds' && (
            <button
              type="button"
              className="contact-dealer-modal__btn contact-dealer-modal__btn--primary"
              onClick={() => { onGetThisDeal?.(); onClose(); }}
            >
              Get this deal
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default ContactDealerModal;
