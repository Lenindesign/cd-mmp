import { useState } from 'react';
import { X, DollarSign, Car, User, Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
import type { DealerWithScore } from '../../services/dealerService';
import { formatPrice } from '../../services/dealerService';
import './MakeOfferModal.css';

export interface OfferData {
  dealerId: string;
  dealerName: string;
  vehicleInfo: {
    year: number;
    make: string;
    model: string;
    trim?: string;
  };
  offerAmount: number;
  msrp: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  message?: string;
  tradeIn?: {
    hasTradeIn: boolean;
    estimatedValue?: number;
    vehicleDescription?: string;
  };
  financing?: {
    needsFinancing: boolean;
    downPayment?: number;
  };
}

interface MakeOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealer: DealerWithScore;
  vehicle: {
    year: number;
    make: string;
    model: string;
    trim?: string;
    msrp: number;
  };
  onSubmitOffer: (offer: OfferData) => void;
}

const MakeOfferModal = ({
  isOpen,
  onClose,
  dealer,
  vehicle,
  onSubmitOffer,
}: MakeOfferModalProps) => {
  const [step, setStep] = useState<'offer' | 'contact' | 'success'>('offer');
  const [offerAmount, setOfferAmount] = useState(Math.round(vehicle.msrp * 0.95)); // Start at 5% below MSRP
  const [hasTradeIn, setHasTradeIn] = useState(false);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [tradeInDescription, setTradeInDescription] = useState('');
  const [needsFinancing, setNeedsFinancing] = useState(false);
  const [downPayment, setDownPayment] = useState(0);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const suggestedOffers = [
    { label: 'MSRP', amount: vehicle.msrp, discount: 0 },
    { label: '3% Below', amount: Math.round(vehicle.msrp * 0.97), discount: 3 },
    { label: '5% Below', amount: Math.round(vehicle.msrp * 0.95), discount: 5 },
    { label: '8% Below', amount: Math.round(vehicle.msrp * 0.92), discount: 8 },
  ];

  const effectiveOffer = offerAmount - (hasTradeIn ? tradeInValue : 0);
  const savingsFromMsrp = vehicle.msrp - offerAmount;
  const savingsPercent = ((savingsFromMsrp / vehicle.msrp) * 100).toFixed(1);

  const validateOfferStep = () => {
    const newErrors: Record<string, string> = {};
    if (offerAmount <= 0) {
      newErrors.offerAmount = 'Please enter a valid offer amount';
    }
    if (hasTradeIn && !tradeInDescription.trim()) {
      newErrors.tradeInDescription = 'Please describe your trade-in vehicle';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactStep = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 'offer' && validateOfferStep()) {
      setStep('contact');
    } else if (step === 'contact' && validateContactStep()) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const offerData: OfferData = {
      dealerId: dealer.id,
      dealerName: dealer.name,
      vehicleInfo: {
        year: vehicle.year,
        make: vehicle.make,
        model: vehicle.model,
        trim: vehicle.trim,
      },
      offerAmount,
      msrp: vehicle.msrp,
      customerInfo: {
        name,
        email,
        phone,
      },
      message: message || undefined,
      tradeIn: hasTradeIn ? {
        hasTradeIn: true,
        estimatedValue: tradeInValue,
        vehicleDescription: tradeInDescription,
      } : undefined,
      financing: needsFinancing ? {
        needsFinancing: true,
        downPayment,
      } : undefined,
    };

    onSubmitOffer(offerData);
    setStep('success');
  };

  const handleClose = () => {
    setStep('offer');
    setErrors({});
    onClose();
  };

  return (
    <div className="offer-modal__overlay" onClick={handleClose}>
      <div className="offer-modal" onClick={(e) => e.stopPropagation()}>
        <button className="offer-modal__close" onClick={handleClose} aria-label="Close">
          <X size={24} />
        </button>

        {/* Header */}
        <header className="offer-modal__header">
          <h2 className="offer-modal__title">
            {step === 'success' ? 'Offer Submitted!' : 'Make an Offer'}
          </h2>
          <p className="offer-modal__subtitle">
            {step === 'success' 
              ? `Your offer has been sent to ${dealer.name}`
              : `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.trim ? ` ${vehicle.trim}` : ''}`
            }
          </p>
        </header>

        {/* Progress Steps */}
        {step !== 'success' && (
          <div className="offer-modal__progress">
            <div className={`offer-modal__step ${step === 'offer' ? 'offer-modal__step--active' : ''}`}>
              <span className="offer-modal__step-number">1</span>
              <span className="offer-modal__step-label">Your Offer</span>
            </div>
            <div className="offer-modal__step-divider" />
            <div className={`offer-modal__step ${step === 'contact' ? 'offer-modal__step--active' : ''}`}>
              <span className="offer-modal__step-number">2</span>
              <span className="offer-modal__step-label">Contact Info</span>
            </div>
          </div>
        )}

        {/* Step 1: Offer Details */}
        {step === 'offer' && (
          <div className="offer-modal__content">
            {/* MSRP Reference */}
            <div className="offer-modal__msrp-ref">
              <Car size={18} />
              <span>MSRP: <strong>{formatPrice(vehicle.msrp)}</strong></span>
            </div>

            {/* Quick Select Offers */}
            <div className="offer-modal__quick-offers">
              <label className="offer-modal__label">Quick Select</label>
              <div className="offer-modal__quick-buttons">
                {suggestedOffers.map((offer) => (
                  <button
                    key={offer.label}
                    type="button"
                    className={`offer-modal__quick-btn ${offerAmount === offer.amount ? 'offer-modal__quick-btn--active' : ''}`}
                    onClick={() => setOfferAmount(offer.amount)}
                  >
                    <span className="offer-modal__quick-label">{offer.label}</span>
                    <span className="offer-modal__quick-amount">{formatPrice(offer.amount)}</span>
                    {offer.discount > 0 && (
                      <span className="offer-modal__quick-savings">Save {offer.discount}%</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Offer Input */}
            <div className="offer-modal__field">
              <label className="offer-modal__label" htmlFor="offer-amount">
                <DollarSign size={16} />
                Your Offer
              </label>
              <div className="offer-modal__input-wrapper">
                <span className="offer-modal__input-prefix">$</span>
                <input
                  id="offer-amount"
                  type="number"
                  className={`offer-modal__input ${errors.offerAmount ? 'offer-modal__input--error' : ''}`}
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(Number(e.target.value))}
                  min={0}
                />
              </div>
              {errors.offerAmount && <span className="offer-modal__error">{errors.offerAmount}</span>}
              {savingsFromMsrp > 0 && (
                <span className="offer-modal__savings">
                  {savingsPercent}% below MSRP ({formatPrice(savingsFromMsrp)} savings)
                </span>
              )}
            </div>

            {/* Trade-In Section */}
            <div className="offer-modal__section">
              <label className="offer-modal__checkbox-label">
                <input
                  type="checkbox"
                  checked={hasTradeIn}
                  onChange={(e) => setHasTradeIn(e.target.checked)}
                />
                <span>I have a trade-in</span>
              </label>
              
              {hasTradeIn && (
                <div className="offer-modal__trade-in">
                  <div className="offer-modal__field">
                    <label className="offer-modal__label" htmlFor="trade-value">Estimated Value</label>
                    <div className="offer-modal__input-wrapper">
                      <span className="offer-modal__input-prefix">$</span>
                      <input
                        id="trade-value"
                        type="number"
                        className="offer-modal__input"
                        value={tradeInValue}
                        onChange={(e) => setTradeInValue(Number(e.target.value))}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="offer-modal__field">
                    <label className="offer-modal__label" htmlFor="trade-desc">Vehicle Description</label>
                    <input
                      id="trade-desc"
                      type="text"
                      className={`offer-modal__input ${errors.tradeInDescription ? 'offer-modal__input--error' : ''}`}
                      value={tradeInDescription}
                      onChange={(e) => setTradeInDescription(e.target.value)}
                      placeholder="e.g., 2019 Honda Civic EX, 45k miles"
                    />
                    {errors.tradeInDescription && <span className="offer-modal__error">{errors.tradeInDescription}</span>}
                  </div>
                </div>
              )}
            </div>

            {/* Financing Section */}
            <div className="offer-modal__section">
              <label className="offer-modal__checkbox-label">
                <input
                  type="checkbox"
                  checked={needsFinancing}
                  onChange={(e) => setNeedsFinancing(e.target.checked)}
                />
                <span>I need financing</span>
              </label>
              
              {needsFinancing && (
                <div className="offer-modal__field">
                  <label className="offer-modal__label" htmlFor="down-payment">Down Payment</label>
                  <div className="offer-modal__input-wrapper">
                    <span className="offer-modal__input-prefix">$</span>
                    <input
                      id="down-payment"
                      type="number"
                      className="offer-modal__input"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      min={0}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Message */}
            <div className="offer-modal__field">
              <label className="offer-modal__label" htmlFor="message">
                <MessageSquare size={16} />
                Message (Optional)
              </label>
              <textarea
                id="message"
                className="offer-modal__textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Any additional details or questions for the dealer..."
                rows={3}
              />
            </div>

            {/* Summary */}
            {hasTradeIn && tradeInValue > 0 && (
              <div className="offer-modal__summary">
                <div className="offer-modal__summary-row">
                  <span>Your Offer</span>
                  <span>{formatPrice(offerAmount)}</span>
                </div>
                <div className="offer-modal__summary-row offer-modal__summary-row--trade">
                  <span>Trade-In Credit</span>
                  <span>-{formatPrice(tradeInValue)}</span>
                </div>
                <div className="offer-modal__summary-row offer-modal__summary-row--total">
                  <span>Net Amount</span>
                  <span>{formatPrice(effectiveOffer)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Contact Info */}
        {step === 'contact' && (
          <div className="offer-modal__content">
            <div className="offer-modal__offer-summary">
              <span>Your offer:</span>
              <strong>{formatPrice(offerAmount)}</strong>
              {hasTradeIn && tradeInValue > 0 && (
                <span className="offer-modal__trade-note">
                  (Net: {formatPrice(effectiveOffer)} with trade-in)
                </span>
              )}
            </div>

            <div className="offer-modal__field">
              <label className="offer-modal__label" htmlFor="name">
                <User size={16} />
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className={`offer-modal__input ${errors.name ? 'offer-modal__input--error' : ''}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
              />
              {errors.name && <span className="offer-modal__error">{errors.name}</span>}
            </div>

            <div className="offer-modal__field">
              <label className="offer-modal__label" htmlFor="email">
                <Mail size={16} />
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`offer-modal__input ${errors.email ? 'offer-modal__input--error' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
              {errors.email && <span className="offer-modal__error">{errors.email}</span>}
            </div>

            <div className="offer-modal__field">
              <label className="offer-modal__label" htmlFor="phone">
                <Phone size={16} />
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                className={`offer-modal__input ${errors.phone ? 'offer-modal__input--error' : ''}`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
              />
              {errors.phone && <span className="offer-modal__error">{errors.phone}</span>}
            </div>

            <p className="offer-modal__disclaimer">
              By submitting, you agree to be contacted by {dealer.name} regarding this offer.
            </p>
          </div>
        )}

        {/* Success State */}
        {step === 'success' && (
          <div className="offer-modal__content offer-modal__content--success">
            <div className="offer-modal__success-icon">
              <CheckCircle size={64} />
            </div>
            <h3 className="offer-modal__success-title">Offer Sent Successfully!</h3>
            <p className="offer-modal__success-text">
              Your offer of <strong>{formatPrice(offerAmount)}</strong> has been sent to {dealer.name}.
            </p>
            <p className="offer-modal__success-text">
              The dealer will review your offer and respond within 24-48 hours. 
              Check your email at <strong>{email}</strong> for updates.
            </p>
            <div className="offer-modal__success-next">
              <h4>What happens next?</h4>
              <ol>
                <li>Dealer reviews your offer</li>
                <li>They may accept, counter, or ask questions</li>
                <li>You'll receive updates via email</li>
                <li>Finalize the deal at the dealership</li>
              </ol>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="offer-modal__footer">
          {step === 'offer' && (
            <button className="offer-modal__btn offer-modal__btn--primary" onClick={handleNextStep}>
              Continue to Contact Info
            </button>
          )}
          {step === 'contact' && (
            <>
              <button className="offer-modal__btn offer-modal__btn--secondary" onClick={() => setStep('offer')}>
                Back
              </button>
              <button className="offer-modal__btn offer-modal__btn--primary" onClick={handleNextStep}>
                <Send size={18} />
                Submit Offer
              </button>
            </>
          )}
          {step === 'success' && (
            <button className="offer-modal__btn offer-modal__btn--primary" onClick={handleClose}>
              Done
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default MakeOfferModal;






