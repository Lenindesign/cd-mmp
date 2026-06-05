import { useState, useMemo, useEffect } from 'react';
import { getRangeInputStyle } from '../../utils/rangeInputStyle';
import './PaymentCalculator.css';

interface PaymentCalculatorProps {
  msrp: number;
  vehicleName: string;
  make?: string;
  model?: string;
  bestApr?: number;
  onGetDeal?: () => void;
  onEstimateTradeIn?: () => void;
  tradeInEstimate?: {
    vehicle?: string;
    image?: string;
    mileage?: number;
    zipCode?: string;
    condition?: string;
    options?: Array<{ id: string; label: string; value: number }>;
    value: number;
    appliedAt: number;
  } | null;
}

const CREDIT_TIERS = [
  { label: 'Excellent (720-850)', value: 'excellent', apr: 4.5 },
  { label: 'Very Good (700-719)', value: 'very-good', apr: 5.9 },
  { label: 'Good (670-699)', value: 'good', apr: 7.5 },
  { label: 'Fair (630-669)', value: 'fair', apr: 10.5 },
  { label: 'Building Credit (300-629)', value: 'rebuilding', apr: 14.0 },
];

const FINANCE_TERM_OPTIONS = [36, 48, 60, 72, 84];
const LEASE_TERM_OPTIONS = [24, 36, 39, 48];
const LEASE_RESIDUAL_OPTIONS = [50, 54, 58, 62, 66];
const LEASE_RATE_OPTIONS = [1.5, 3, 5, 7.5, 10];
const MIN_TRADE_IN_SLIDER_MAX = 50000;
const TRADE_IN_MAX_PRICE_MULTIPLIER = 1.25;

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const roundUpToHundred = (n: number) => Math.ceil(n / 100) * 100;
const parseMoneyInput = (value: string) => {
  const digits = value.replace(/[^\d]/g, '');
  return digits ? Number(digits) : 0;
};
const formatMoneyInput = (value: number) => Math.round(value).toLocaleString('en-US');
const formatCondition = (value?: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ') : '';
const fmtDeduction = (value: number) => (value > 0 ? `- ${fmt(value)}` : fmt(0));
const fmtApr = (apr: number) => `${Number.isInteger(apr) ? apr.toFixed(0) : apr.toFixed(1)}% APR`;

type CalcTab = 'finance' | 'lease' | 'cash';

const moneyFactorToAprDisplay = (mf: number) => Math.round(mf * 240000) / 100;

/** MF × 2400 ≈ APR % (dealer convention); APR ÷ 2400 → MF */
const aprPercentToMoneyFactor = (apr: number) => apr / 2400;

function ctaLabel(make: string | undefined, model: string | undefined, vehicleName: string): string {
  const mk = make?.trim();
  const md = model?.trim();
  if (mk && md) return `SHOP ${mk.toUpperCase()} ${md.toUpperCase()}`;
  const noYear = vehicleName.replace(/^\s*\d{4}\s+/, '').trim();
  if (noYear) return `SHOP ${noYear.toUpperCase()}`;
  return 'SHOP NOW';
}

const PaymentCalculator = ({
  msrp,
  vehicleName,
  make,
  model,
  bestApr,
  onGetDeal,
  onEstimateTradeIn,
  tradeInEstimate,
}: PaymentCalculatorProps) => {
  const [tab, setTab] = useState<CalcTab>('finance');

  const priceFloor = Math.max(5000, Math.round(msrp * 0.75));
  const priceCeiling = Math.round(msrp * 1.12);

  const [vehiclePrice, setVehiclePrice] = useState(() => clamp(Math.round(msrp), priceFloor, priceCeiling));
  useEffect(() => {
    setVehiclePrice(clamp(Math.round(msrp), priceFloor, priceCeiling));
  }, [msrp, priceFloor, priceCeiling]);

  const [downPayment, setDownPayment] = useState(() => Math.round(msrp * 0.1));
  const downPaymentMax = Math.round(vehiclePrice * 0.5);
  useEffect(() => {
    setDownPayment(p => clamp(p, 0, downPaymentMax));
  }, [downPaymentMax]);

  const [tradeIn, setTradeIn] = useState(0);
  const [termMonths, setTermMonths] = useState(60);
  const [creditTier, setCreditTier] = useState('excellent');
  const tradeInMax = Math.max(
    MIN_TRADE_IN_SLIDER_MAX,
    roundUpToHundred(vehiclePrice * TRADE_IN_MAX_PRICE_MULTIPLIER),
  );

  useEffect(() => {
    setTradeIn(p => clamp(p, 0, tradeInMax));
  }, [tradeInMax]);

  useEffect(() => {
    if (tradeInEstimate == null) return;

    const roundedEstimate = Math.round(tradeInEstimate.value / 100) * 100;
    setTradeIn(clamp(roundedEstimate, 0, tradeInMax));
  }, [tradeInEstimate, tradeInMax]);

  const [leaseTermMonths, setLeaseTermMonths] = useState(36);
  const [residualPct, setResidualPct] = useState(58);
  const [moneyFactor, setMoneyFactor] = useState(0.00125);
  const [mfDraft, setMfDraft] = useState('0.00125');
  const [mfError, setMfError] = useState<string | null>(null);

  useEffect(() => {
    setMfDraft(moneyFactor.toFixed(5));
    setMfError(null);
  }, [moneyFactor]);

  const selectedTier = CREDIT_TIERS.find(t => t.value === creditTier) || CREDIT_TIERS[0];
  const financeApr = bestApr !== undefined && bestApr < selectedTier.apr ? bestApr : selectedTier.apr;

  const adjustedCap = Math.max(0, vehiclePrice - downPayment - tradeIn);
  const residualValue = (msrp * residualPct) / 100;

  const { monthly, totalInterest, financeTotalOutOfPocket } = useMemo(() => {
    const principal = Math.max(0, vehiclePrice - downPayment - tradeIn);
    const monthlyRate = financeApr / 100 / 12;
    if (monthlyRate === 0) {
      const m = principal / termMonths;
      return {
        monthly: m,
        totalInterest: 0,
        financeTotalOutOfPocket: downPayment + principal,
      };
    }
    const payment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
    const total = payment * termMonths;
    const interest = total - principal;
    return {
      monthly: payment,
      totalInterest: interest,
      financeTotalOutOfPocket: downPayment + total,
    };
  }, [vehiclePrice, downPayment, tradeIn, termMonths, financeApr]);

  const leaseMonthly = useMemo(() => {
    if (leaseTermMonths <= 0) return 0;
    const cap = adjustedCap;
    const res = residualValue;
    const dep = Math.max(0, (cap - res) / leaseTermMonths);
    const rent = (cap + res) * moneyFactor;
    return dep + rent;
  }, [adjustedCap, residualValue, leaseTermMonths, moneyFactor]);

  const leaseTotalPayments = leaseMonthly * leaseTermMonths;
  const cashOutOfPocket = Math.max(0, vehiclePrice - tradeIn);
  const amountFinanced = Math.max(0, vehiclePrice - downPayment - tradeIn);

  const tabValues: Record<CalcTab, string> = {
    finance: `${fmt(monthly)}/mo`,
    lease: `${fmt(leaseMonthly)}/mo`,
    cash: fmt(cashOutOfPocket),
  };

  const leaseAprFromMf = moneyFactor * 2400;

  const handleDownPaymentInput = (raw: string) => {
    setDownPayment(clamp(parseMoneyInput(raw), 0, downPaymentMax));
  };

  const handleTradeInInput = (raw: string) => {
    setTradeIn(clamp(parseMoneyInput(raw), 0, tradeInMax));
  };

  const handleLeaseAprChange = (apr: number) => {
    setMoneyFactor(clamp(aprPercentToMoneyFactor(apr), 0.0001, 0.01));
  };

  const handleMfDraftChange = (raw: string) => {
    setMfDraft(raw);
    const trimmed = raw.trim();
    if (trimmed === '') {
      setMfError(null);
      return;
    }
    const n = parseFloat(raw.replace(/[^\d.]/g, ''));
    if (Number.isNaN(n)) {
      setMfError('Use numbers only.');
      return;
    }
    if (n < 0.0001 || n > 0.01) {
      setMfError('Enter a value between 0.0001 and 0.01.');
      return;
    }
    setMfError(null);
    setMoneyFactor(n);
  };

  const hero =
    tab === 'finance' ? monthly : tab === 'lease' ? leaseMonthly : cashOutOfPocket;
  const heroMonthly = tab !== 'cash';
  const resultHeading = heroMonthly ? 'Estimated monthly payment' : 'Estimated total to pay';
  const leaseRateDisplay = leaseAprFromMf.toFixed(2);
  const leaseRateOptionValues = LEASE_RATE_OPTIONS.map(rate => rate.toFixed(2));
  const leaseRateSelectValue = leaseRateDisplay;
  const leaseRateOptions = leaseRateOptionValues.includes(leaseRateSelectValue)
    ? LEASE_RATE_OPTIONS
    : [...LEASE_RATE_OPTIONS, leaseAprFromMf].sort((a, b) => a - b);
  const resultLede =
    tab === 'finance'
      ? `Based on a ${fmt(vehiclePrice)} expected purchase price, ${termMonths} months, and ${financeApr.toFixed(2)}% APR.`
      : tab === 'lease'
        ? `Based on a ${fmt(vehiclePrice)} price, ${fmt(downPayment)} due at signing, ${leaseTermMonths} months, ${residualPct}% lease-end value, and a ${leaseRateDisplay}% lease-rate estimate.`
        : `Estimated before tax, title, registration, dealer fees, and available incentives.`;
  const ctaMessage =
    tab === 'lease'
      ? 'Compare local listings that can support this lease estimate.'
      : 'Find real listings that fit this estimate.';
  const shopText = ctaLabel(make, model, vehicleName);
  const tradeVehicleName = tradeInEstimate?.vehicle?.trim();
  const tradeImage = tradeInEstimate?.image?.trim();
  const [tradeImageFailed, setTradeImageFailed] = useState(false);
  const tradeOptionCount = tradeInEstimate?.options?.length || 0;
  const tradeMeta = [
    typeof tradeInEstimate?.mileage === 'number' && tradeInEstimate.mileage > 0
      ? `${tradeInEstimate.mileage.toLocaleString()} mi`
      : '',
    formatCondition(tradeInEstimate?.condition),
    tradeOptionCount > 0 ? `${tradeOptionCount} option${tradeOptionCount === 1 ? '' : 's'}` : '',
  ].filter(Boolean).join(' · ');

  useEffect(() => {
    setTradeImageFailed(false);
  }, [tradeImage]);

  return (
    <section id="payment-calculator" className="payment-calc payment-calc--vehicle">
      <div className="container">
        <div className="payment-calc__wrap">
          <header className="payment-calc__head">
            <div>
              <h3 className="payment-calc__title">Estimate your payment</h3>
              <p className="payment-calc__sub">{vehicleName}</p>
            </div>
            {bestApr !== undefined && (
              <span className="payment-calc__badge">Special {bestApr}% APR</span>
            )}
          </header>

          <div className="payment-calc__body">
            <div className="payment-calc__inputs">
              <div className="payment-calc__tabs" role="tablist" aria-label="How you want to pay">
                {(['finance', 'lease', 'cash'] as CalcTab[]).map(t => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    className={`payment-calc__tab ${tab === t ? 'payment-calc__tab--on' : ''}`}
                    onClick={() => setTab(t)}
                  >
                    <span className="payment-calc__tab-name">
                      {t === 'finance' ? 'Finance' : t === 'lease' ? 'Lease' : 'Cash'}
                    </span>
                    <span className="payment-calc__tab-amt" aria-live="polite">
                      {tabValues[t]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="payment-calc__section payment-calc__section--shared">
                <div className="payment-calc__shared-stack">
                  <div className="payment-calc__field payment-calc__field--full">
                    <div className="payment-calc__row-label">
                      <label htmlFor="pc-price">Expected purchase price</label>
                      <span>{fmt(vehiclePrice)}</span>
                    </div>
                    <input
                      id="pc-price"
                      type="range"
                      min={priceFloor}
                      max={priceCeiling}
                      step={100}
                      value={vehiclePrice}
                      onChange={e => setVehiclePrice(Number(e.target.value))}
                      className="payment-calc__slider"
                      style={getRangeInputStyle(vehiclePrice, priceFloor, priceCeiling)}
                    />
                    <div className="payment-calc__ticks">
                      <span>{fmt(priceFloor)}</span>
                      <span>{fmt(priceCeiling)}</span>
                    </div>
                  </div>

                  {tab !== 'cash' && (
                    <label className="payment-calc__field payment-calc__field--full">
                      <span className="payment-calc__lab">
                        {tab === 'lease' ? 'Due at signing' : 'Down payment'}
                      </span>
                      <div className="payment-calc__money-input">
                        <span className="payment-calc__money-prefix" aria-hidden="true">$</span>
                        <input
                          id={tab === 'lease' ? 'pc-cap' : 'pc-down'}
                          type="text"
                          inputMode="numeric"
                          value={formatMoneyInput(downPayment)}
                          onChange={e => handleDownPaymentInput(e.target.value)}
                          className="payment-calc__money-input-control"
                          aria-label={`${tab === 'lease' ? 'Due at signing' : 'Down payment'}, maximum ${fmt(downPaymentMax)}`}
                          autoComplete="off"
                        />
                      </div>
                    </label>
                  )}

                  <div className="payment-calc__field payment-calc__field--full">
                    <div className="payment-calc__row-label">
                      <label htmlFor="pc-trade">Trade-in value</label>
                    </div>
                    <div className="payment-calc__money-input">
                      <span className="payment-calc__money-prefix" aria-hidden="true">$</span>
                      <input
                        id="pc-trade"
                        type="text"
                        inputMode="numeric"
                        value={formatMoneyInput(tradeIn)}
                        onChange={e => handleTradeInInput(e.target.value)}
                        className="payment-calc__money-input-control"
                        aria-label={`Trade-in value, maximum ${fmt(tradeInMax)}`}
                        autoComplete="off"
                      />
                    </div>
                    {onEstimateTradeIn && (
                      <button type="button" className="payment-calc__inline-action" onClick={onEstimateTradeIn}>
                        {tradeVehicleName ? 'Change trade-in' : 'Calculate your trade-in'}
                      </button>
                    )}
                    {tradeInEstimate && (
                      <div className="payment-calc__trade-summary" aria-live="polite">
                        {tradeImage && (
                          <div className="payment-calc__trade-summary-thumb" aria-hidden="true">
                            {tradeImageFailed ? (
                              <span>Image unavailable</span>
                            ) : (
                              <img
                                src={tradeImage}
                                alt=""
                                loading="lazy"
                                onError={() => setTradeImageFailed(true)}
                              />
                            )}
                          </div>
                        )}
                        <div>
                          <span className="payment-calc__trade-summary-label">Applied trade-in</span>
                          <strong>{tradeVehicleName || 'Selected vehicle'}</strong>
                          {tradeMeta && <span className="payment-calc__trade-summary-meta">{tradeMeta}</span>}
                        </div>
                        <span className="payment-calc__trade-summary-value">{fmt(tradeIn)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            {tab === 'finance' && (
              <div className="payment-calc__section payment-calc__section--pad">
                <label className="payment-calc__field payment-calc__field--full">
                  <span className="payment-calc__lab">Credit score</span>
                  <select
                    id="pc-credit"
                    className="payment-calc__select"
                    value={creditTier}
                    onChange={e => setCreditTier(e.target.value)}
                  >
                    {CREDIT_TIERS.map(t => (
                      <option key={t.value} value={t.value}>
                        {t.label} · {fmtApr(t.apr)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="payment-calc__field payment-calc__field--full">
                  <span className="payment-calc__lab">Loan term</span>
                  <select
                    id="pc-term"
                    className="payment-calc__select"
                    value={termMonths}
                    onChange={e => setTermMonths(Number(e.target.value))}
                  >
                    {FINANCE_TERM_OPTIONS.map(t => (
                      <option key={t} value={t}>
                        {t} months
                      </option>
                    ))}
                  </select>
                </label>
                {bestApr !== undefined && (
                  <p className="payment-calc__note">
                    The special rate in the banner replaces your range’s rate when it’s lower.
                  </p>
                )}
              </div>
            )}

            {tab === 'lease' && (
              <div className="payment-calc__section payment-calc__section--pad">
                <label className="payment-calc__field payment-calc__field--full">
                  <span className="payment-calc__lab">Lease term</span>
                  <select
                    id="pc-lease-term"
                    className="payment-calc__select"
                    value={leaseTermMonths}
                    onChange={e => setLeaseTermMonths(Number(e.target.value))}
                  >
                    {LEASE_TERM_OPTIONS.map(t => (
                      <option key={t} value={t}>
                        {t} months
                      </option>
                    ))}
                  </select>
                </label>
                <label className="payment-calc__field payment-calc__field--full">
                  <span className="payment-calc__lab">Lease rate estimate</span>
                  <select
                    id="pc-lease-apr"
                    className="payment-calc__select"
                    value={leaseRateSelectValue}
                    onChange={e => handleLeaseAprChange(Number(e.target.value))}
                    aria-describedby="pc-lease-apr-hint"
                  >
                    {leaseRateOptions.map(rate => (
                      <option key={rate.toFixed(2)} value={rate.toFixed(2)}>
                        {rate.toFixed(2)}% APR equivalent
                      </option>
                    ))}
                  </select>
                  <span id="pc-lease-apr-hint" className="payment-calc__muted">
                    Dealer leases use a money factor. This shows the same idea in APR form.
                  </span>
                </label>
                <label className="payment-calc__field payment-calc__field--full">
                  <span className="payment-calc__lab">Lease-end value</span>
                  <select
                    id="pc-res"
                    className="payment-calc__select"
                    value={residualPct}
                    onChange={e => setResidualPct(Number(e.target.value))}
                  >
                    {LEASE_RESIDUAL_OPTIONS.map(percent => (
                      <option key={percent} value={percent}>
                        {percent}% of sticker ({fmt((msrp * percent) / 100)})
                      </option>
                    ))}
                  </select>
                </label>
                <details className="payment-calc__details">
                  <summary className="payment-calc__details-sum">Have a dealer money factor?</summary>
                  <label className="payment-calc__field payment-calc__field--full">
                    <span className="payment-calc__lab">Money factor</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      className={`payment-calc__input ${mfError ? 'payment-calc__input--invalid' : ''}`}
                      value={mfDraft}
                      onChange={e => handleMfDraftChange(e.target.value)}
                      onBlur={() => {
                        if (!mfDraft.trim()) {
                          setMfDraft(moneyFactor.toFixed(5));
                          setMfError(null);
                        }
                      }}
                      aria-invalid={mfError ? true : undefined}
                      aria-describedby={mfError ? 'pc-mf-err' : 'pc-mf-tip'}
                      autoComplete="off"
                    />
                    {mfError ? (
                      <span id="pc-mf-err" className="payment-calc__err" role="alert">
                        {mfError}
                      </span>
                    ) : (
                      <span id="pc-mf-tip" className="payment-calc__muted">
                        Typical ~0.0005–0.005. About {moneyFactorToAprDisplay(moneyFactor)}% APR equivalent.
                      </span>
                    )}
                  </label>
                </details>
                <p className="payment-calc__muted">
                  Sticker (MSRP) {fmt(msrp)} · Amount leased after trade and due at signing: {fmt(adjustedCap)}
                </p>
              </div>
            )}

            {tab === 'cash' && (
              <p className="payment-calc__cash-note">
                We subtract your trade-in from the purchase price. Sales tax, registration, and dealer fees are not
                included.
              </p>
            )}
            </div>

            <aside className="payment-calc__aside" aria-label="Payment estimate">
              <div className="payment-calc__aside-inner">
                <div className="payment-calc__result">
                  <div className="payment-calc__result-hero">
                    <p className="payment-calc__result-kicker">{resultHeading}</p>
                    <p className="payment-calc__result-big" aria-live="polite">
                      <span className="payment-calc__sym">$</span>
                      {Math.round(hero).toLocaleString()}
                      {heroMonthly && <span className="payment-calc__mo">/mo</span>}
                    </p>
                    <p className="payment-calc__result-lede">{resultLede}</p>
                  </div>

                  {tab === 'finance' && (
                    <dl className="payment-calc__sum">
                      <div className="payment-calc__sum-row payment-calc__sum-row--supporting">
                        <dt>Vehicle Budget</dt>
                        <dd>{fmt(vehiclePrice)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--supporting">
                        <dt>Down Payment</dt>
                        <dd>{fmtDeduction(downPayment)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--supporting">
                        <dt>Trade-In Value</dt>
                        <dd>{fmtDeduction(tradeIn)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--calculated">
                        <dt>Amount Financed</dt>
                        <dd>{fmt(amountFinanced)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--calculated">
                        <dt>Total Interest Paid</dt>
                        <dd>{fmt(totalInterest)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--divider payment-calc__sum-row--total">
                        <dt>Est. Total Paid</dt>
                        <dd>{fmt(financeTotalOutOfPocket)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--emphasis">
                        <dt>Monthly Payment</dt>
                        <dd>{fmt(monthly)}/mo</dd>
                      </div>
                    </dl>
                  )}
                  {tab === 'lease' && (
                    <dl className="payment-calc__sum">
                      <div className="payment-calc__sum-row payment-calc__sum-row--supporting">
                        <dt>Vehicle Budget</dt>
                        <dd>{fmt(vehiclePrice)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--supporting">
                        <dt>Due at Signing</dt>
                        <dd>{fmtDeduction(downPayment)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--supporting">
                        <dt>Trade-In Value</dt>
                        <dd>{fmtDeduction(tradeIn)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--calculated">
                        <dt>Amount Leased</dt>
                        <dd>{fmt(adjustedCap)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--calculated">
                        <dt>Lease-End Value</dt>
                        <dd>{fmt(residualValue)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--calculated">
                        <dt>Lease Terms</dt>
                        <dd>{leaseRateDisplay}% · {leaseTermMonths} mo</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--divider payment-calc__sum-row--total">
                        <dt>Est. Payments Total</dt>
                        <dd>{fmt(leaseTotalPayments)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--emphasis">
                        <dt>Monthly Payment</dt>
                        <dd>{fmt(leaseMonthly)}/mo</dd>
                      </div>
                    </dl>
                  )}
                  {tab === 'cash' && (
                    <dl className="payment-calc__sum">
                      <div className="payment-calc__sum-row payment-calc__sum-row--supporting">
                        <dt>Purchase Price</dt>
                        <dd>{fmt(vehiclePrice)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--supporting">
                        <dt>Trade-In Value</dt>
                        <dd>{fmtDeduction(tradeIn)}</dd>
                      </div>
                      <div className="payment-calc__sum-row payment-calc__sum-row--divider payment-calc__sum-row--emphasis payment-calc__sum-row--total">
                        <dt>Est. Total to Pay</dt>
                        <dd>{fmt(cashOutOfPocket)}</dd>
                      </div>
                    </dl>
                  )}

                  <div className="payment-calc__cta-wrap">
                    <p className="payment-calc__cta-message">{ctaMessage}</p>
                    <button
                      type="button"
                      className="payment-calc__cta"
                      onClick={onGetDeal}
                      aria-label={
                        make?.trim() && model?.trim()
                          ? `Browse new and used ${make} ${model} listings`
                          : `Browse listings for ${vehicleName}`
                      }
                    >
                      {shopText}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <p className="payment-calc__fine">
            Estimates only. They don’t include tax or fees. Not a loan or lease offer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentCalculator;
