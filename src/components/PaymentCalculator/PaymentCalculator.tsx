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
  tradeInEstimate?: { value: number; appliedAt: number } | null;
}

const CREDIT_TIERS = [
  { label: 'Excellent (740+)', value: 'excellent', apr: 4.5 },
  { label: 'Very Good (700–739)', value: 'very-good', apr: 5.9 },
  { label: 'Good (670–699)', value: 'good', apr: 7.5 },
  { label: 'Fair (630–669)', value: 'fair', apr: 10.5 },
  { label: 'Building credit (below 630)', value: 'rebuilding', apr: 14.0 },
];

const FINANCE_TERM_OPTIONS = [36, 48, 60, 72, 84];
const LEASE_TERM_OPTIONS = [24, 36, 39, 48];

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

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
  useEffect(() => {
    setDownPayment(p => clamp(p, 0, Math.round(vehiclePrice * 0.5)));
  }, [vehiclePrice]);

  const [tradeIn, setTradeIn] = useState(0);
  const [termMonths, setTermMonths] = useState(60);
  const [creditTier, setCreditTier] = useState('excellent');
  const tradeInMax = Math.round(vehiclePrice * 0.6);

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
        financeTotalOutOfPocket: vehiclePrice - tradeIn,
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

  const tabValues: Record<CalcTab, string> = {
    finance: `${fmt(monthly)}/mo`,
    lease: `${fmt(leaseMonthly)}/mo`,
    cash: fmt(cashOutOfPocket),
  };

  const handleSlider =
    (setter: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Math.round(Number(e.target.value) / 100) * 100);
    };

  const leaseAprFromMf = moneyFactor * 2400;

  const handleLeaseAprSlider = (apr: number) => {
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
  const shopText = ctaLabel(make, model, vehicleName);

  return (
    <section id="payment-calculator" className="payment-calc">
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

                  <div className="payment-calc__field payment-calc__field--full">
                    <div className="payment-calc__row-label">
                      <label htmlFor="pc-trade">Trade-in value</label>
                      <span>{fmt(tradeIn)}</span>
                    </div>
                    <input
                      id="pc-trade"
                      type="range"
                      min={0}
                      max={tradeInMax}
                      step={100}
                      value={tradeIn}
                      onChange={handleSlider(setTradeIn)}
                      className="payment-calc__slider"
                      style={getRangeInputStyle(tradeIn, 0, tradeInMax)}
                    />
                    <div className="payment-calc__ticks">
                      <span>$0</span>
                      <span>{fmt(tradeInMax)}</span>
                    </div>
                    {onEstimateTradeIn && (
                      <button type="button" className="payment-calc__inline-action" onClick={onEstimateTradeIn}>
                        Calculate your trade-in
                      </button>
                    )}
                  </div>
                </div>
              </div>

            {tab === 'finance' && (
              <div className="payment-calc__section payment-calc__section--pad">
                <div className="payment-calc__grid2">
                  <label className="payment-calc__field">
                    <span className="payment-calc__lab">Estimated credit range</span>
                    <select
                      className="payment-calc__select"
                      value={creditTier}
                      onChange={e => setCreditTier(e.target.value)}
                      aria-describedby="pc-credit-hint"
                    >
                      {CREDIT_TIERS.map(t => (
                        <option key={t.value} value={t.value}>
                          {t.label} (~{t.apr}% APR)
                        </option>
                      ))}
                    </select>
                    <span id="pc-credit-hint" className="payment-calc__note payment-calc__note--inline">
                      Pick the range closest to your score. Your lender decides the final rate.
                    </span>
                  </label>
                  <div className="payment-calc__field">
                    <div className="payment-calc__row-label">
                      <label htmlFor="pc-down">Down payment</label>
                      <span>{fmt(downPayment)}</span>
                    </div>
                    <input
                      id="pc-down"
                      type="range"
                      min={0}
                      max={Math.round(vehiclePrice * 0.5)}
                      step={100}
                      value={downPayment}
                      onChange={handleSlider(setDownPayment)}
                      className="payment-calc__slider"
                      style={getRangeInputStyle(downPayment, 0, Math.round(vehiclePrice * 0.5))}
                    />
                    <div className="payment-calc__ticks">
                      <span>$0</span>
                      <span>{fmt(vehiclePrice * 0.5)}</span>
                    </div>
                    <p className="payment-calc__sync-note">
                      Same amount as <strong>Up-front payment</strong> on Lease; we keep them in sync.
                    </p>
                  </div>
                </div>
                <div className="payment-calc__field payment-calc__field--full">
                  <span className="payment-calc__lab">Loan term</span>
                  <div className="payment-calc__terms" role="group" aria-label="Loan length in months">
                    {FINANCE_TERM_OPTIONS.map(t => (
                      <button
                        key={t}
                        type="button"
                        className={`payment-calc__pill ${termMonths === t ? 'payment-calc__pill--on' : ''}`}
                        onClick={() => setTermMonths(t)}
                      >
                        {t} mo
                      </button>
                    ))}
                  </div>
                </div>
                {bestApr !== undefined && (
                  <p className="payment-calc__note">
                    The special rate in the banner replaces your range’s rate when it’s lower.
                  </p>
                )}
              </div>
            )}

            {tab === 'lease' && (
              <div className="payment-calc__section payment-calc__section--pad">
              <div className="payment-calc__grid2">
                <div className="payment-calc__field">
                  <div className="payment-calc__row-label">
                    <label htmlFor="pc-cap">Up-front payment</label>
                    <span>{fmt(downPayment)}</span>
                  </div>
                  <input
                    id="pc-cap"
                    type="range"
                    min={0}
                    max={Math.round(vehiclePrice * 0.5)}
                    step={100}
                    value={downPayment}
                    onChange={handleSlider(setDownPayment)}
                    className="payment-calc__slider"
                    style={getRangeInputStyle(downPayment, 0, Math.round(vehiclePrice * 0.5))}
                  />
                  <div className="payment-calc__ticks">
                    <span>$0</span>
                    <span>{fmt(vehiclePrice * 0.5)}</span>
                  </div>
                  <p className="payment-calc__sync-note">
                    Same amount as <strong>Down payment</strong> on Finance; we keep them in sync.
                  </p>
                </div>
                <div className="payment-calc__field">
                  <div className="payment-calc__row-label">
                    <label htmlFor="pc-res">Value at lease end</label>
                    <span>
                      {fmt(residualValue)} ({residualPct}% of sticker)
                    </span>
                  </div>
                  <input
                    id="pc-res"
                    type="range"
                    min={40}
                    max={72}
                    step={1}
                    value={residualPct}
                    onChange={e => setResidualPct(Number(e.target.value))}
                    className="payment-calc__slider"
                    style={getRangeInputStyle(residualPct, 40, 72)}
                  />
                  <div className="payment-calc__ticks">
                    <span>40%</span>
                    <span>72%</span>
                  </div>
                </div>
              </div>
              <div className="payment-calc__field payment-calc__field--full">
                <div className="payment-calc__row-label">
                  <label htmlFor="pc-lease-apr">Lease rate (like loan APR)</label>
                  <span>{leaseAprFromMf.toFixed(2)}%</span>
                </div>
                <input
                  id="pc-lease-apr"
                  type="range"
                  min={0}
                  max={15}
                  step={0.05}
                  value={clamp(leaseAprFromMf, 0, 15)}
                  onChange={e => handleLeaseAprSlider(Number(e.target.value))}
                  className="payment-calc__slider"
                  style={getRangeInputStyle(clamp(leaseAprFromMf, 0, 15), 0, 15)}
                  aria-describedby="pc-lease-apr-hint"
                />
                <div className="payment-calc__ticks">
                  <span>0%</span>
                  <span>15%</span>
                </div>
                <p id="pc-lease-apr-hint" className="payment-calc__muted">
                  Dealer leases use a “money factor”; this sets the same idea in APR form (factor × 2400).
                </p>
              </div>
              <details className="payment-calc__details">
                <summary className="payment-calc__details-sum">Money factor (dealer quote)</summary>
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
              <div className="payment-calc__field payment-calc__field--full">
                <span className="payment-calc__lab">Lease length</span>
                <div className="payment-calc__terms" role="group" aria-label="Lease length in months">
                  {LEASE_TERM_OPTIONS.map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`payment-calc__pill ${leaseTermMonths === t ? 'payment-calc__pill--on' : ''}`}
                      onClick={() => setLeaseTermMonths(t)}
                    >
                      {t} mo
                    </button>
                  ))}
                </div>
              </div>
              <p className="payment-calc__muted">
                Sticker (MSRP) {fmt(msrp)} · Amount leased after trade and up-front payment: {fmt(adjustedCap)}
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
                    <p className="payment-calc__result-kicker">
                      {heroMonthly ? 'Estimated monthly payment' : 'Estimated total to pay'}
                    </p>
                    <p className="payment-calc__result-big" aria-live="polite">
                      <span className="payment-calc__sym">$</span>
                      {Math.round(hero).toLocaleString()}
                      {heroMonthly && <span className="payment-calc__mo">/mo</span>}
                    </p>
                  </div>

                  {tab === 'finance' && (
                    <dl className="payment-calc__sum">
                      <div className="payment-calc__sum-row">
                        <dt>Rate &amp; term</dt>
                        <dd>
                          {financeApr.toFixed(2)}% APR · {termMonths} months
                        </dd>
                      </div>
                      <div className="payment-calc__sum-row">
                        <dt>Interest (est.)</dt>
                        <dd>{fmt(totalInterest)}</dd>
                      </div>
                      <div className="payment-calc__sum-row">
                        <dt>Total paid (est.)</dt>
                        <dd>{fmt(financeTotalOutOfPocket)}</dd>
                      </div>
                    </dl>
                  )}
                  {tab === 'lease' && (
                    <dl className="payment-calc__sum">
                      <div className="payment-calc__sum-row">
                        <dt>Lease length</dt>
                        <dd>{leaseTermMonths} months</dd>
                      </div>
                      <div className="payment-calc__sum-row">
                        <dt>Payments over term (est.)</dt>
                        <dd>{fmt(leaseTotalPayments)}</dd>
                      </div>
                    </dl>
                  )}

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
