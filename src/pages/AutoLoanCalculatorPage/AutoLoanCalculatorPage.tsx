import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './AutoLoanCalculatorPage.css';

type CalcMode = 'price' | 'payment';
type VehicleCondition = 'new' | 'used';
type CreditTier = 'excellent' | 'good' | 'fair' | 'poor';

const CREDIT_TIERS: Array<{ id: CreditTier; label: string; description: string; baseLow: number; baseMid: number; baseHigh: number }> = [
  { id: 'excellent', label: 'Excellent 780+', description: 'Prime borrowers with deep credit history.', baseLow: 5.2, baseMid: 5.9, baseHigh: 6.8 },
  { id: 'good', label: 'Good 700-779', description: 'Solid credit with generally competitive deals.', baseLow: 5.9, baseMid: 6.6, baseHigh: 7.4 },
  { id: 'fair', label: 'Fair 660-699', description: 'More lender variance and higher approval friction.', baseLow: 8.4, baseMid: 9.8, baseHigh: 11.7 },
  { id: 'poor', label: 'Poor <660', description: 'Directional only; real deals vary widely.', baseLow: 12.5, baseMid: 14.2, baseHigh: 18.5 },
];

const STATE_FEES = [
  { code: 'CA', name: 'California', taxRate: 0.0825, titleRegistration: 485 },
  { code: 'FL', name: 'Florida', taxRate: 0.06, titleRegistration: 420 },
  { code: 'IL', name: 'Illinois', taxRate: 0.0725, titleRegistration: 360 },
  { code: 'NY', name: 'New York', taxRate: 0.04, titleRegistration: 310 },
  { code: 'TX', name: 'Texas', taxRate: 0.0625, titleRegistration: 255 },
  { code: 'WA', name: 'Washington', taxRate: 0.065, titleRegistration: 300 },
];

const TERM_OPTIONS = [36, 48, 60, 72, 84];

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(value));

const percent = (value: number) => `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;

const readNumber = (params: URLSearchParams, key: string, fallback: number) => {
  const value = Number(params.get(key));
  return Number.isFinite(value) && value >= 0 ? value : fallback;
};

const monthlyPayment = (principal: number, apr: number, termMonths: number) => {
  if (principal <= 0) return 0;
  const monthlyRate = apr / 100 / 12;
  if (monthlyRate === 0) return principal / termMonths;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
};

const principalFromPayment = (payment: number, apr: number, termMonths: number) => {
  const monthlyRate = apr / 100 / 12;
  if (monthlyRate === 0) return payment * termMonths;
  return payment * ((1 - Math.pow(1 + monthlyRate, -termMonths)) / monthlyRate);
};

const getAprRange = (tierId: CreditTier, condition: VehicleCondition, termMonths: number) => {
  const tier = CREDIT_TIERS.find((item) => item.id === tierId) ?? CREDIT_TIERS[1];
  const usedAdjustment = condition === 'used' ? 1.1 : 0;
  const termAdjustment = termMonths >= 72 ? 0.45 : termMonths <= 48 ? -0.2 : 0;

  return {
    low: tier.baseLow + usedAdjustment + termAdjustment,
    mid: tier.baseMid + usedAdjustment + termAdjustment,
    high: tier.baseHigh + usedAdjustment + termAdjustment,
    tier,
  };
};

const getTaxFees = (stateCode: string, vehiclePrice: number, tradeInValue: number, manualOverride: number | null) => {
  if (manualOverride !== null) {
    return { salesTax: manualOverride, titleRegistration: 0, total: manualOverride, state: STATE_FEES[0] };
  }

  const state = STATE_FEES.find((item) => item.code === stateCode) ?? STATE_FEES[0];
  const taxableAmount = Math.max(0, vehiclePrice - tradeInValue);
  const salesTax = taxableAmount * state.taxRate;
  const titleRegistration = state.titleRegistration;

  return {
    salesTax,
    titleRegistration,
    total: salesTax + titleRegistration,
    state,
  };
};

const getAmountFinanced = ({
  price,
  downPayment,
  tradeInValue,
  amountOwed,
  incentives,
  taxFees,
  includeTaxes,
}: {
  price: number;
  downPayment: number;
  tradeInValue: number;
  amountOwed: number;
  incentives: number;
  taxFees: number;
  includeTaxes: boolean;
}) => {
  const tradeEquity = tradeInValue - amountOwed;
  return Math.max(0, price - downPayment - tradeEquity - incentives + (includeTaxes ? taxFees : 0));
};

const solveVehiclePrice = ({
  targetMonthly,
  apr,
  termMonths,
  downPayment,
  tradeInValue,
  amountOwed,
  incentives,
  stateCode,
  includeTaxes,
  manualTaxFees,
}: {
  targetMonthly: number;
  apr: number;
  termMonths: number;
  downPayment: number;
  tradeInValue: number;
  amountOwed: number;
  incentives: number;
  stateCode: string;
  includeTaxes: boolean;
  manualTaxFees: number | null;
}) => {
  const principalLimit = principalFromPayment(targetMonthly, apr, termMonths);
  let low = 0;
  let high = 160000;

  for (let index = 0; index < 40; index += 1) {
    const midpoint = (low + high) / 2;
    const fees = getTaxFees(stateCode, midpoint, tradeInValue, manualTaxFees);
    const financed = getAmountFinanced({
      price: midpoint,
      downPayment,
      tradeInValue,
      amountOwed,
      incentives,
      taxFees: fees.total,
      includeTaxes,
    });

    if (financed > principalLimit) {
      high = midpoint;
    } else {
      low = midpoint;
    }
  }

  return low;
};

const simulatePayoff = (principal: number, apr: number, monthly: number, extraMonthly: number, oneTimeExtra: number) => {
  const monthlyRate = apr / 100 / 12;
  let balance = Math.max(0, principal - oneTimeExtra);
  let month = 0;
  let interest = 0;

  while (balance > 0.5 && month < 480) {
    const monthlyInterest = balance * monthlyRate;
    const principalPaid = Math.min(balance + monthlyInterest, monthly + extraMonthly) - monthlyInterest;
    interest += monthlyInterest;
    balance = Math.max(0, balance - principalPaid);
    month += 1;
  }

  return { months: month, interest };
};

const buildSchedule = (principal: number, apr: number, monthly: number) => {
  const monthlyRate = apr / 100 / 12;
  let balance = principal;

  return Array.from({ length: 6 }, (_, index) => {
    const interest = balance * monthlyRate;
    const principalPaid = Math.min(balance, monthly - interest);
    balance = Math.max(0, balance - principalPaid);
    return {
      month: index + 1,
      principal: principalPaid,
      interest,
      balance,
    };
  });
};

const AutoLoanCalculatorPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [calcMode, setCalcMode] = useState<CalcMode>((searchParams.get('mode') as CalcMode) || 'price');
  const [vehicleCondition, setVehicleCondition] = useState<VehicleCondition>((searchParams.get('condition') as VehicleCondition) || 'new');
  const [vehiclePrice, setVehiclePrice] = useState(() => readNumber(searchParams, 'price', 32000));
  const [targetMonthly, setTargetMonthly] = useState(() => readNumber(searchParams, 'payment', 554));
  const [termMonths, setTermMonths] = useState(() => readNumber(searchParams, 'term', 60));
  const [apr, setApr] = useState(() => readNumber(searchParams, 'apr', 6.9));
  const [creditTier, setCreditTier] = useState<CreditTier>((searchParams.get('credit') as CreditTier) || 'good');
  const [downPayment, setDownPayment] = useState(() => readNumber(searchParams, 'down', 4000));
  const [tradeInValue, setTradeInValue] = useState(() => readNumber(searchParams, 'trade', 0));
  const [amountOwed, setAmountOwed] = useState(() => readNumber(searchParams, 'owed', 0));
  const [incentives, setIncentives] = useState(() => readNumber(searchParams, 'incentives', 0));
  const [stateCode, setStateCode] = useState(searchParams.get('state') || 'CA');
  const [includeTaxes, setIncludeTaxes] = useState(searchParams.get('includeTaxes') !== 'false');
  const [manualTaxFees, setManualTaxFees] = useState<number | null>(null);
  const [extraMonthly, setExtraMonthly] = useState(100);
  const [oneTimeExtra, setOneTimeExtra] = useState(0);
  const [refiBalance, setRefiBalance] = useState(22000);
  const [refiCurrentApr, setRefiCurrentApr] = useState(8.5);
  const [refiNewApr, setRefiNewApr] = useState(5.9);
  const [refiMonthsLeft, setRefiMonthsLeft] = useState(48);
  const [refiNewTerm, setRefiNewTerm] = useState(48);
  const [refiFees, setRefiFees] = useState(300);
  const [netIncome, setNetIncome] = useState(5800);
  const [monthlyDebt, setMonthlyDebt] = useState(650);
  const [targetIncomePercent, setTargetIncomePercent] = useState(15);
  const [insuranceEstimate, setInsuranceEstimate] = useState(140);
  const [leaseMsrp, setLeaseMsrp] = useState(38000);
  const [leaseTerm, setLeaseTerm] = useState(36);
  const [moneyFactor, setMoneyFactor] = useState(0.0021);
  const [residualPercent, setResidualPercent] = useState(58);
  const [dueAtSigning, setDueAtSigning] = useState(3000);
  const [leaseFees, setLeaseFees] = useState(650);
  const [buyoutApr, setBuyoutApr] = useState(7.2);
  const [buyoutTerm, setBuyoutTerm] = useState(60);

  const aprRange = useMemo(() => getAprRange(creditTier, vehicleCondition, termMonths), [creditTier, vehicleCondition, termMonths]);

  const activeVehiclePrice = useMemo(() => {
    if (calcMode === 'price') return vehiclePrice;
    return solveVehiclePrice({
      targetMonthly,
      apr,
      termMonths,
      downPayment,
      tradeInValue,
      amountOwed,
      incentives,
      stateCode,
      includeTaxes,
      manualTaxFees,
    });
  }, [amountOwed, apr, calcMode, downPayment, incentives, includeTaxes, manualTaxFees, stateCode, targetMonthly, termMonths, tradeInValue, vehiclePrice]);

  const taxFees = useMemo(
    () => getTaxFees(stateCode, activeVehiclePrice, tradeInValue, manualTaxFees),
    [activeVehiclePrice, manualTaxFees, stateCode, tradeInValue],
  );

  const amountFinanced = useMemo(
    () => getAmountFinanced({
      price: activeVehiclePrice,
      downPayment,
      tradeInValue,
      amountOwed,
      incentives,
      taxFees: taxFees.total,
      includeTaxes,
    }),
    [activeVehiclePrice, amountOwed, downPayment, incentives, includeTaxes, taxFees.total, tradeInValue],
  );

  const monthly = useMemo(
    () => calcMode === 'payment' ? targetMonthly : monthlyPayment(amountFinanced, apr, termMonths),
    [amountFinanced, apr, calcMode, targetMonthly, termMonths],
  );
  const totalInterest = Math.max(0, monthly * termMonths - amountFinanced);
  const totalCost = monthly * termMonths + downPayment + Math.max(0, amountOwed - tradeInValue) + (includeTaxes ? 0 : taxFees.total);

  const dealScenarios = useMemo(() => {
    const scenarios = [
      { name: 'A', label: 'Base case', down: Math.max(0, downPayment), trade: tradeInValue, incentive: incentives },
      { name: 'B', label: 'More cash down', down: downPayment + 3000, trade: tradeInValue, incentive: incentives },
      { name: 'C', label: 'Trade + incentive', down: downPayment + 1000, trade: tradeInValue + 3000, incentive: incentives + 1000 },
    ].map((scenario) => {
      const scenarioTax = getTaxFees(stateCode, activeVehiclePrice, scenario.trade, manualTaxFees);
      const scenarioPrincipal = getAmountFinanced({
        price: activeVehiclePrice,
        downPayment: scenario.down,
        tradeInValue: scenario.trade,
        amountOwed,
        incentives: scenario.incentive,
        taxFees: scenarioTax.total,
        includeTaxes,
      });
      const scenarioMonthly = monthlyPayment(scenarioPrincipal, apr, termMonths);
      const scenarioInterest = Math.max(0, scenarioMonthly * termMonths - scenarioPrincipal);
      return {
        ...scenario,
        principal: scenarioPrincipal,
        monthly: scenarioMonthly,
        totalInterest: scenarioInterest,
        totalCost: scenarioMonthly * termMonths + scenario.down,
      };
    });
    const bestTotal = Math.min(...scenarios.map((scenario) => scenario.totalCost));
    return scenarios.map((scenario) => ({ ...scenario, isBest: scenario.totalCost === bestTotal }));
  }, [activeVehiclePrice, amountOwed, apr, downPayment, incentives, includeTaxes, manualTaxFees, stateCode, termMonths, tradeInValue]);

  const payoff = useMemo(() => {
    const baseline = simulatePayoff(amountFinanced, apr, monthly, 0, 0);
    const accelerated = simulatePayoff(amountFinanced, apr, monthly, extraMonthly, oneTimeExtra);
    return {
      schedule: buildSchedule(amountFinanced, apr, monthly),
      monthsSaved: Math.max(0, baseline.months - accelerated.months),
      interestSaved: Math.max(0, baseline.interest - accelerated.interest),
    };
  }, [amountFinanced, apr, extraMonthly, monthly, oneTimeExtra]);

  const refinance = useMemo(() => {
    const currentMonthly = monthlyPayment(refiBalance, refiCurrentApr, refiMonthsLeft);
    const newMonthly = monthlyPayment(refiBalance + refiFees, refiNewApr, refiNewTerm);
    const monthlySavings = currentMonthly - newMonthly;
    const currentTotalInterest = currentMonthly * refiMonthsLeft - refiBalance;
    const newTotalInterest = newMonthly * refiNewTerm - (refiBalance + refiFees);
    return {
      currentMonthly,
      newMonthly,
      monthlySavings,
      interestSavings: currentTotalInterest - newTotalInterest - refiFees,
      breakEven: monthlySavings > 0 ? refiFees / monthlySavings : Infinity,
      extendsCost: refiNewTerm > refiMonthsLeft && currentMonthly * refiMonthsLeft < newMonthly * refiNewTerm,
    };
  }, [refiBalance, refiCurrentApr, refiFees, refiMonthsLeft, refiNewApr, refiNewTerm]);

  const affordability = useMemo(() => {
    const targetPayment = Math.max(0, netIncome * (targetIncomePercent / 100) - insuranceEstimate);
    const dtiPayment = Math.max(0, netIncome * 0.36 - monthlyDebt - insuranceEstimate);
    const safePayment = Math.min(targetPayment, dtiPayment);
    const safePrincipal = principalFromPayment(safePayment, 7.2, 60);
    return {
      safePayment,
      safeVehiclePrice: safePrincipal + downPayment,
      limitingRule: targetPayment < dtiPayment ? 'target budget' : 'debt-to-income ceiling',
    };
  }, [downPayment, insuranceEstimate, monthlyDebt, netIncome, targetIncomePercent]);

  const lease = useMemo(() => {
    const residualValue = leaseMsrp * (residualPercent / 100);
    const depreciation = (leaseMsrp - residualValue) / leaseTerm;
    const rentCharge = (leaseMsrp + residualValue) * moneyFactor;
    const baseMonthly = depreciation + rentCharge + leaseFees / leaseTerm;
    return {
      monthly: baseMonthly,
      effectiveMonthly: (baseMonthly * leaseTerm + dueAtSigning) / leaseTerm,
      buyoutPrice: residualValue,
      buyoutMonthly: monthlyPayment(residualValue, buyoutApr, buyoutTerm),
      equivalentApr: moneyFactor * 2400,
    };
  }, [buyoutApr, buyoutTerm, dueAtSigning, leaseFees, leaseMsrp, leaseTerm, moneyFactor, residualPercent]);

  useEffect(() => {
    const params = new URLSearchParams({
      mode: calcMode,
      condition: vehicleCondition,
      price: String(Math.round(vehiclePrice)),
      payment: String(Math.round(targetMonthly)),
      term: String(termMonths),
      apr: String(apr),
      credit: creditTier,
      down: String(Math.round(downPayment)),
      trade: String(Math.round(tradeInValue)),
      owed: String(Math.round(amountOwed)),
      incentives: String(Math.round(incentives)),
      state: stateCode,
      includeTaxes: String(includeTaxes),
    });
    setSearchParams(params, { replace: true });
  }, [amountOwed, apr, calcMode, creditTier, downPayment, incentives, includeTaxes, setSearchParams, stateCode, targetMonthly, termMonths, tradeInValue, vehicleCondition, vehiclePrice]);

  const applyAprMidpoint = () => setApr(Number(aprRange.mid.toFixed(2)));

  return (
    <div className="auto-loan-page">
      <section className="auto-loan-hero">
        <div className="container auto-loan-hero__grid">
          <div className="auto-loan-hero__content">
            <span className="auto-loan-eyebrow">Product spec version</span>
            <h1 className="auto-loan-hero__title">Auto Loan Calculator</h1>
            <p className="auto-loan-hero__lede">
              A fuller calculator built around the PM jobs-to-be-done: payments, APR ranges, taxes, deal scenarios,
              payoff, refinance, affordability, and lease buyout math.
            </p>
            <div className="auto-loan-hero__actions">
              <a href="#calculator" className="auto-loan-button auto-loan-button--primary">
                Start calculating
              </a>
              <Link to="/financing" className="auto-loan-button auto-loan-button--secondary">
                Current buying power page
              </Link>
            </div>
          </div>
          <aside className="auto-loan-hero__result" aria-label="Calculator headline result">
            <span className="auto-loan-result-card__label">{calcMode === 'price' ? 'Estimated payment' : 'Back-solved buying power'}</span>
            <strong>{calcMode === 'price' ? `${currency(monthly)}/mo` : currency(activeVehiclePrice)}</strong>
            <span>{percent(apr)} APR · {termMonths} months · {taxFees.state.name}</span>
          </aside>
        </div>
      </section>

      <section id="calculator" className="auto-loan-section">
        <div className="container auto-loan-layout">
          <div className="auto-loan-panel auto-loan-panel--input">
            <div className="auto-loan-section-heading">
              <div>
                <span className="auto-loan-eyebrow">JTBD 1</span>
                <h2>Primary payment calculator</h2>
              </div>
            </div>

            <div className="auto-loan-mode-toggle" aria-label="Calculator direction">
              <button type="button" className={calcMode === 'price' ? 'active' : ''} onClick={() => setCalcMode('price')}>
                Start with price
              </button>
              <button type="button" className={calcMode === 'payment' ? 'active' : ''} onClick={() => setCalcMode('payment')}>
                Start with payment
              </button>
            </div>

            <div className="auto-loan-form-grid">
              {calcMode === 'price' ? (
                <label className="auto-loan-field">
                  <span>Vehicle price</span>
                  <input type="number" value={vehiclePrice} min={0} step={500} onChange={(event) => setVehiclePrice(Number(event.target.value))} />
                </label>
              ) : (
                <label className="auto-loan-field">
                  <span>Target monthly payment</span>
                  <input type="number" value={targetMonthly} min={0} step={25} onChange={(event) => setTargetMonthly(Number(event.target.value))} />
                </label>
              )}

              <label className="auto-loan-field">
                <span>APR</span>
                <input type="number" value={apr} min={0} step={0.1} onChange={(event) => setApr(Number(event.target.value))} />
              </label>

              <label className="auto-loan-field">
                <span>Loan term</span>
                <select value={termMonths} onChange={(event) => setTermMonths(Number(event.target.value))}>
                  {TERM_OPTIONS.map((term) => (
                    <option key={term} value={term}>{term} months</option>
                  ))}
                </select>
              </label>

              <label className="auto-loan-field">
                <span>Down payment</span>
                <input type="number" value={downPayment} min={0} step={500} onChange={(event) => setDownPayment(Number(event.target.value))} />
              </label>

              <label className="auto-loan-field">
                <span>Trade-in value</span>
                <input type="number" value={tradeInValue} min={0} step={500} onChange={(event) => setTradeInValue(Number(event.target.value))} />
              </label>

              <label className="auto-loan-field">
                <span>Amount owed on trade</span>
                <input type="number" value={amountOwed} min={0} step={500} onChange={(event) => setAmountOwed(Number(event.target.value))} />
              </label>

              <label className="auto-loan-field">
                <span>Incentives / rebates</span>
                <input type="number" value={incentives} min={0} step={250} onChange={(event) => setIncentives(Number(event.target.value))} />
              </label>

              <label className="auto-loan-field">
                <span>State</span>
                <select value={stateCode} onChange={(event) => setStateCode(event.target.value)}>
                  {STATE_FEES.map((state) => (
                    <option key={state.code} value={state.code}>{state.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="auto-loan-check">
              <input type="checkbox" checked={includeTaxes} onChange={(event) => setIncludeTaxes(event.target.checked)} />
              <span>Include estimated taxes and fees in the loan</span>
            </label>
          </div>

          <aside className="auto-loan-panel auto-loan-summary" aria-live="polite">
            <span className="auto-loan-eyebrow">Sticky result</span>
            <h2>{calcMode === 'price' ? `${currency(monthly)} / mo` : currency(activeVehiclePrice)}</h2>
            <p>{calcMode === 'price' ? 'Estimated monthly payment' : 'Maximum vehicle price at your target payment'}</p>
            <dl>
              <div><dt>Amount financed</dt><dd>{currency(amountFinanced)}</dd></div>
              <div><dt>Total interest</dt><dd>{currency(totalInterest)}</dd></div>
              <div><dt>Taxes & fees</dt><dd>{currency(taxFees.total)}</dd></div>
              <div><dt>Total cost</dt><dd>{currency(totalCost)}</dd></div>
            </dl>
            <p className="auto-loan-disclaimer">
              Estimates are for planning only. Real lender approvals, taxes, dealer fees, and vehicle availability vary.
            </p>
          </aside>
        </div>
      </section>

      <section className="auto-loan-section auto-loan-section--gray">
        <div className="container auto-loan-module-grid">
          <article className="auto-loan-panel">
            <div className="auto-loan-section-heading">
              <div>
                <span className="auto-loan-eyebrow">JTBD 2</span>
                <h2>APR range estimator</h2>
              </div>
            </div>
            <div className="auto-loan-form-grid auto-loan-form-grid--compact">
              <label className="auto-loan-field">
                <span>Credit tier</span>
                <select value={creditTier} onChange={(event) => setCreditTier(event.target.value as CreditTier)}>
                  {CREDIT_TIERS.map((tier) => (
                    <option key={tier.id} value={tier.id}>{tier.label}</option>
                  ))}
                </select>
              </label>
              <label className="auto-loan-field">
                <span>Vehicle</span>
                <select value={vehicleCondition} onChange={(event) => setVehicleCondition(event.target.value as VehicleCondition)}>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </label>
            </div>
            <div className="auto-loan-apr-range">
              <span>{percent(aprRange.low)}</span>
              <strong>{percent(aprRange.mid)}</strong>
              <span>{percent(aprRange.high)}</span>
            </div>
            <p>{aprRange.tier.description} This is educational guidance, not a lender quote.</p>
            <button type="button" className="auto-loan-text-button" onClick={applyAprMidpoint}>Use mid APR in calculator</button>
          </article>

          <article className="auto-loan-panel">
            <div className="auto-loan-section-heading">
              <div>
                <span className="auto-loan-eyebrow">JTBD 3</span>
                <h2>Tax & fee estimator</h2>
              </div>
            </div>
            <dl className="auto-loan-breakdown">
              <div><dt>Sales tax</dt><dd>{currency(taxFees.salesTax)}</dd></div>
              <div><dt>Title + registration</dt><dd>{currency(taxFees.titleRegistration)}</dd></div>
              <div><dt>Total estimate</dt><dd>{currency(taxFees.total)}</dd></div>
            </dl>
            <label className="auto-loan-field">
              <span>Manual override</span>
              <input
                type="number"
                placeholder="Optional"
                value={manualTaxFees ?? ''}
                min={0}
                onChange={(event) => setManualTaxFees(event.target.value ? Number(event.target.value) : null)}
              />
            </label>
          </article>
        </div>
      </section>

      <section className="auto-loan-section">
        <div className="container">
          <div className="auto-loan-section-heading auto-loan-section-heading--standalone">
            <div>
              <span className="auto-loan-eyebrow">JTBD 4</span>
              <h2>Deal structure optimizer</h2>
              <p>Compare up to three simple scenarios without burying shoppers in unlimited knobs.</p>
            </div>
          </div>
          <div className="auto-loan-scenarios">
            {dealScenarios.map((scenario) => (
              <article key={scenario.name} className={`auto-loan-scenario ${scenario.isBest ? 'auto-loan-scenario--best' : ''}`}>
                {scenario.isBest && <span className="auto-loan-scenario__badge">Best value</span>}
                <span className="auto-loan-scenario__name">Scenario {scenario.name}</span>
                <h3>{scenario.label}</h3>
                <strong>{currency(scenario.monthly)}/mo</strong>
                <dl>
                  <div><dt>Down</dt><dd>{currency(scenario.down)}</dd></div>
                  <div><dt>Trade</dt><dd>{currency(scenario.trade)}</dd></div>
                  <div><dt>Incentives</dt><dd>{currency(scenario.incentive)}</dd></div>
                  <div><dt>Interest</dt><dd>{currency(scenario.totalInterest)}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="auto-loan-section auto-loan-section--gray">
        <div className="container auto-loan-module-grid">
          <article className="auto-loan-panel auto-loan-panel--wide">
            <div className="auto-loan-section-heading">
              <div>
                <span className="auto-loan-eyebrow">JTBD 6</span>
                <h2>Amortization & payoff</h2>
              </div>
            </div>
            <div className="auto-loan-form-grid auto-loan-form-grid--compact">
              <label className="auto-loan-field">
                <span>Extra monthly payment</span>
                <input type="number" value={extraMonthly} min={0} step={25} onChange={(event) => setExtraMonthly(Number(event.target.value))} />
              </label>
              <label className="auto-loan-field">
                <span>One-time extra payment</span>
                <input type="number" value={oneTimeExtra} min={0} step={100} onChange={(event) => setOneTimeExtra(Number(event.target.value))} />
              </label>
            </div>
            <div className="auto-loan-payoff-callout">
              Payoff {payoff.monthsSaved} months earlier · Save {currency(payoff.interestSaved)} in interest
            </div>
            <div className="auto-loan-table-wrap">
              <table className="auto-loan-table">
                <thead><tr><th>Month</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead>
                <tbody>
                  {payoff.schedule.map((row) => (
                    <tr key={row.month}>
                      <td>{row.month}</td>
                      <td>{currency(row.principal)}</td>
                      <td>{currency(row.interest)}</td>
                      <td>{currency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="auto-loan-panel">
            <div className="auto-loan-section-heading">
              <div>
                <span className="auto-loan-eyebrow">JTBD 7</span>
                <h2>Refinance savings</h2>
              </div>
            </div>
            <div className="auto-loan-form-grid auto-loan-form-grid--compact">
              <label className="auto-loan-field"><span>Balance</span><input type="number" value={refiBalance} onChange={(event) => setRefiBalance(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Months left</span><input type="number" value={refiMonthsLeft} onChange={(event) => setRefiMonthsLeft(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Current APR</span><input type="number" value={refiCurrentApr} step={0.1} onChange={(event) => setRefiCurrentApr(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>New APR</span><input type="number" value={refiNewApr} step={0.1} onChange={(event) => setRefiNewApr(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>New term</span><input type="number" value={refiNewTerm} onChange={(event) => setRefiNewTerm(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Fees</span><input type="number" value={refiFees} onChange={(event) => setRefiFees(Number(event.target.value))} /></label>
            </div>
            <dl className="auto-loan-breakdown">
              <div><dt>New payment</dt><dd>{currency(refinance.newMonthly)}/mo</dd></div>
              <div><dt>Monthly savings</dt><dd>{currency(refinance.monthlySavings)}</dd></div>
              <div><dt>Break-even</dt><dd>{Number.isFinite(refinance.breakEven) ? `${refinance.breakEven.toFixed(1)} mo` : 'No savings'}</dd></div>
            </dl>
            {refinance.extendsCost && (
              <p className="auto-loan-warning">Lower payment may still increase total cost.</p>
            )}
          </article>
        </div>
      </section>

      <section className="auto-loan-section">
        <div className="container auto-loan-module-grid">
          <article className="auto-loan-panel">
            <div className="auto-loan-section-heading">
              <div>
                <span className="auto-loan-eyebrow">JTBD 8</span>
                <h2>Affordability planner</h2>
              </div>
            </div>
            <div className="auto-loan-form-grid auto-loan-form-grid--compact">
              <label className="auto-loan-field"><span>Net income / mo</span><input type="number" value={netIncome} onChange={(event) => setNetIncome(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Monthly debt</span><input type="number" value={monthlyDebt} onChange={(event) => setMonthlyDebt(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Target % income</span><input type="number" value={targetIncomePercent} onChange={(event) => setTargetIncomePercent(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Insurance estimate</span><input type="number" value={insuranceEstimate} onChange={(event) => setInsuranceEstimate(Number(event.target.value))} /></label>
            </div>
            <div className="auto-loan-metric">
              <span>Responsible max payment</span>
              <strong>{currency(affordability.safePayment)}/mo</strong>
              <small>Back-solved max vehicle price: {currency(affordability.safeVehiclePrice)} using {affordability.limitingRule}.</small>
            </div>
          </article>

          <article className="auto-loan-panel">
            <div className="auto-loan-section-heading">
              <div>
                <span className="auto-loan-eyebrow">JTBD 9</span>
                <h2>Lease & buyout estimator</h2>
              </div>
            </div>
            <div className="auto-loan-form-grid auto-loan-form-grid--compact">
              <label className="auto-loan-field"><span>MSRP</span><input type="number" value={leaseMsrp} onChange={(event) => setLeaseMsrp(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Term</span><input type="number" value={leaseTerm} onChange={(event) => setLeaseTerm(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Money factor</span><input type="number" value={moneyFactor} step={0.0001} onChange={(event) => setMoneyFactor(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Residual %</span><input type="number" value={residualPercent} onChange={(event) => setResidualPercent(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Due at signing</span><input type="number" value={dueAtSigning} onChange={(event) => setDueAtSigning(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Fees</span><input type="number" value={leaseFees} onChange={(event) => setLeaseFees(Number(event.target.value))} /></label>
            </div>
            <dl className="auto-loan-breakdown">
              <div><dt>Lease payment</dt><dd>{currency(lease.monthly)}/mo</dd></div>
              <div><dt>Effective monthly</dt><dd>{currency(lease.effectiveMonthly)}</dd></div>
              <div><dt>Money factor APR</dt><dd>{percent(lease.equivalentApr)}</dd></div>
              <div><dt>Buyout payment</dt><dd>{currency(lease.buyoutMonthly)}/mo</dd></div>
            </dl>
            <div className="auto-loan-form-grid auto-loan-form-grid--compact">
              <label className="auto-loan-field"><span>Buyout APR</span><input type="number" value={buyoutApr} step={0.1} onChange={(event) => setBuyoutApr(Number(event.target.value))} /></label>
              <label className="auto-loan-field"><span>Buyout term</span><input type="number" value={buyoutTerm} onChange={(event) => setBuyoutTerm(Number(event.target.value))} /></label>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default AutoLoanCalculatorPage;
