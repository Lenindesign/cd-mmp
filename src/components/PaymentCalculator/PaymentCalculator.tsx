import { useState, useMemo } from 'react';
import { Calculator, ChevronDown, DollarSign, ArrowRight } from 'lucide-react';
import './PaymentCalculator.css';

interface PaymentCalculatorProps {
  msrp: number;
  vehicleName: string;
  bestApr?: number;
  onGetDeal?: () => void;
}

const CREDIT_TIERS = [
  { label: 'Excellent (740+)', value: 'excellent', apr: 4.5 },
  { label: 'Very Good (700-739)', value: 'very-good', apr: 5.9 },
  { label: 'Good (670-699)', value: 'good', apr: 7.5 },
  { label: 'Fair (630-669)', value: 'fair', apr: 10.5 },
  { label: 'Rebuilding (<630)', value: 'rebuilding', apr: 14.0 },
];

const TERM_OPTIONS = [36, 48, 60, 72, 84];

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

type CalcTab = 'finance' | 'lease' | 'cash';

const PaymentCalculator = ({ msrp, vehicleName, bestApr, onGetDeal }: PaymentCalculatorProps) => {
  const [tab, setTab] = useState<CalcTab>('finance');
  const [downPayment, setDownPayment] = useState(Math.round(msrp * 0.1));
  const [tradeIn, setTradeIn] = useState(0);
  const [termMonths, setTermMonths] = useState(60);
  const [creditTier, setCreditTier] = useState('excellent');
  const [showCreditDropdown, setShowCreditDropdown] = useState(false);
  const [showTradeIn, setShowTradeIn] = useState(false);

  const selectedTier = CREDIT_TIERS.find(t => t.value === creditTier) || CREDIT_TIERS[0];
  const effectiveApr = bestApr && bestApr < selectedTier.apr ? bestApr : selectedTier.apr;

  const leaseMonthly = Math.round(msrp * 0.014);
  const cashPrice = msrp - tradeIn;

  const { monthly, totalInterest } = useMemo(() => {
    const principal = Math.max(0, msrp - downPayment - tradeIn);
    const monthlyRate = effectiveApr / 100 / 12;
    if (monthlyRate === 0) {
      return { monthly: principal / termMonths, totalInterest: 0 };
    }
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    const total = payment * termMonths;
    return { monthly: payment, totalInterest: total - principal };
  }, [msrp, downPayment, tradeIn, termMonths, effectiveApr]);

  const tabValues: Record<CalcTab, string> = {
    finance: `${fmt(monthly)}/mo.`,
    lease: `${fmt(leaseMonthly)}/mo.`,
    cash: fmt(cashPrice),
  };

  const handleSlider = (setter: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(Math.round(Number(e.target.value) / 100) * 100);
  };

  const resultLabel = tab === 'finance'
    ? 'Estimated Monthly Payment'
    : tab === 'lease'
    ? 'Estimated Lease Payment'
    : 'Estimated Cash Payment';

  const resultValue = tab === 'finance'
    ? monthly
    : tab === 'lease'
    ? leaseMonthly
    : cashPrice;

  const showPerMonth = tab !== 'cash';

  return (
    <section className="payment-calc">
      <div className="container">
        <div className="payment-calc__wrapper">
          <div className="payment-calc__header">
            <div className="payment-calc__header-left">
              <Calculator size={20} />
              <div>
                <h3 className="payment-calc__title">Calculate Your Payment</h3>
                <p className="payment-calc__subtitle">Estimate payments for the {vehicleName}</p>
              </div>
            </div>
            {bestApr && (
              <span className="payment-calc__promo">
                Special {bestApr}% APR available
              </span>
            )}
          </div>

          {/* Finance / Lease / Cash Tabs */}
          <div className="payment-calc__tabs" role="tablist">
            {(['finance', 'lease', 'cash'] as CalcTab[]).map(t => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                className={`payment-calc__tab ${tab === t ? 'payment-calc__tab--active' : ''}`}
                onClick={() => setTab(t)}
              >
                <span className="payment-calc__tab-top">
                  <span className="payment-calc__tab-radio" />
                  <span className="payment-calc__tab-label">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                </span>
                <span className="payment-calc__tab-value">{tabValues[t]}</span>
              </button>
            ))}
          </div>

          {/* Trade-In Row */}
          <div className="payment-calc__row">
            <button
              type="button"
              className="payment-calc__row-toggle"
              onClick={() => setShowTradeIn(p => !p)}
            >
              <div className="payment-calc__row-left">
                <span className="payment-calc__row-label">Trade-In</span>
                <span className="payment-calc__row-value">{fmt(tradeIn)}</span>
              </div>
              <ChevronDown size={16} className={`payment-calc__row-chevron ${showTradeIn ? 'payment-calc__row-chevron--open' : ''}`} />
            </button>
            {showTradeIn && (
              <div className="payment-calc__row-body">
                <input
                  type="range"
                  min={0}
                  max={Math.round(msrp * 0.6)}
                  step={100}
                  value={tradeIn}
                  onChange={handleSlider(setTradeIn)}
                  className="payment-calc__slider"
                />
                <div className="payment-calc__range-labels">
                  <span>$0</span>
                  <span>{fmt(msrp * 0.6)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Finance-specific controls */}
          {tab === 'finance' && (
            <div className="payment-calc__body">
              <div className="payment-calc__controls">
                <div className="payment-calc__field">
                  <div className="payment-calc__field-header">
                    <label className="payment-calc__label">Down Payment</label>
                    <span className="payment-calc__field-value">{fmt(downPayment)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.round(msrp * 0.5)}
                    step={100}
                    value={downPayment}
                    onChange={handleSlider(setDownPayment)}
                    className="payment-calc__slider"
                  />
                  <div className="payment-calc__range-labels">
                    <span>$0</span>
                    <span>{fmt(msrp * 0.5)}</span>
                  </div>
                </div>

                <div className="payment-calc__field">
                  <label className="payment-calc__label">Credit Score</label>
                  <div className="payment-calc__credit-select" onClick={() => setShowCreditDropdown(p => !p)}>
                    <span>{selectedTier.label}</span>
                    <ChevronDown size={16} className={showCreditDropdown ? 'payment-calc__chevron--open' : ''} />
                    {showCreditDropdown && (
                      <div className="payment-calc__credit-menu">
                        {CREDIT_TIERS.map(t => (
                          <button
                            key={t.value}
                            type="button"
                            className={`payment-calc__credit-option ${t.value === creditTier ? 'payment-calc__credit-option--active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); setCreditTier(t.value); setShowCreditDropdown(false); }}
                          >
                            <span>{t.label}</span>
                            <span className="payment-calc__credit-apr">{t.apr}% APR</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="payment-calc__field">
                <label className="payment-calc__label">Loan Term</label>
                <div className="payment-calc__terms">
                  {TERM_OPTIONS.map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`payment-calc__term ${t === termMonths ? 'payment-calc__term--active' : ''}`}
                      onClick={() => setTermMonths(t)}
                    >
                      {t} mo
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Result Card */}
          <div className="payment-calc__result-card">
            <span className="payment-calc__result-label">{resultLabel}</span>
            <span className="payment-calc__result-amount">
              <span className="payment-calc__result-dollar">$</span>
              {Math.round(resultValue).toLocaleString()}
              {showPerMonth && <span className="payment-calc__result-asterisk">*</span>}
            </span>
            {tab === 'finance' && (
              <div className="payment-calc__result-details">
                <span>{effectiveApr}% APR</span>
                <span className="payment-calc__result-sep">&middot;</span>
                <span>{termMonths} months</span>
                <span className="payment-calc__result-sep">&middot;</span>
                <span>{fmt(totalInterest)} interest</span>
              </div>
            )}
            <button type="button" className="payment-calc__result-link" onClick={onGetDeal}>
              Offer Breakdown
            </button>
            <button type="button" className="payment-calc__cta" onClick={onGetDeal}>
              <DollarSign size={16} />
              Get This Deal
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="payment-calc__disclaimer">
            {showPerMonth && '*'}Estimated {tab === 'cash' ? 'price' : 'payments'} based on {tab === 'cash' ? 'MSRP' : 'vehicle price'} 
            {' '}(excluding applicable taxes and fees){tradeIn > 0 ? ` with trade-in equity of ${fmt(tradeIn)}` : ''}.
            {tab !== 'cash' && ' Actual terms depend on credit approval, dealer, and lender.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentCalculator;
