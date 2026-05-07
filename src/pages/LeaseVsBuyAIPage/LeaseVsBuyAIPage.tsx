import { useMemo, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Brain, Gauge, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';
import { calculateLeaseVsBuy } from './calculations';
import { createEditorialAnalysis, requestOpenAIAnalysis } from './aiAnalysisService';
import { creditTierOptions, defaultLeaseVsBuyInputs, preferenceOptions, riskOptions } from './defaults';
import type { AIAnalysis, LeaseVsBuyInputs } from './types';
import './LeaseVsBuyAIPage.css';

const money = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(value));


type NumericInputKey = {
  [K in keyof LeaseVsBuyInputs]: LeaseVsBuyInputs[K] extends number ? K : never
}[keyof LeaseVsBuyInputs];

type TextInputKey = {
  [K in keyof LeaseVsBuyInputs]: LeaseVsBuyInputs[K] extends string ? K : never
}[keyof LeaseVsBuyInputs];

interface NumberFieldProps {
  label: string;
  value: number;
  min?: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}

const NumberField = ({ label, value, min = 0, step = 1, suffix, onChange }: NumberFieldProps) => (
  <label className="lvb-ai__field">
    <span>{label}</span>
    <div className="lvb-ai__input-wrap">
      <input
        type="number"
        min={min}
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {suffix && <em>{suffix}</em>}
    </div>
  </label>
);

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TextField = ({ label, value, onChange }: TextFieldProps) => (
  <label className="lvb-ai__field">
    <span>{label}</span>
    <input type="text" value={value} onChange={(event) => onChange(event.target.value)} />
  </label>
);

interface SelectFieldProps {
  label: string;
  value: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

const SelectField = ({ label, value, options, onChange }: SelectFieldProps) => (
  <label className="lvb-ai__field">
    <span>{label}</span>
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

interface MetricCardProps {
  label: string;
  value: string;
  note: string;
}

const MetricCard = ({ label, value, note }: MetricCardProps) => (
  <article className="lvb-ai__metric">
    <span>{label}</span>
    <strong>{value}</strong>
    <p>{note}</p>
  </article>
);

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="lvb-ai__section-title">
    <span>{eyebrow}</span>
    <h2>{title}</h2>
  </div>
);

const AnalysisBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="lvb-ai__analysis-block">
    <h3>{title}</h3>
    <p>{children}</p>
  </section>
);

const LeaseVsBuyAIPage = () => {
  const [inputs, setInputs] = useState<LeaseVsBuyInputs>(defaultLeaseVsBuyInputs);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [analysisState, setAnalysisState] = useState<'idle' | 'loading' | 'ready'>('idle');

  const results = useMemo(() => calculateLeaseVsBuy(inputs), [inputs]);
  const fallbackAnalysis = useMemo(() => createEditorialAnalysis(inputs, results), [inputs, results]);
  const shownAnalysis = analysis ?? fallbackAnalysis;

  const updateNumber = (key: NumericInputKey, value: number) => {
    setInputs((current) => ({ ...current, [key]: Number.isFinite(value) ? value : 0 }));
  };

  const updateText = (key: TextInputKey, value: string) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const runAIAnalysis = async () => {
    setAnalysisState('loading');
    try {
      const nextAnalysis = await requestOpenAIAnalysis(inputs, results);
      setAnalysis(nextAnalysis);
    } catch {
      setAnalysis(createEditorialAnalysis(inputs, results));
    } finally {
      setAnalysisState('ready');
    }
  };

  const horizonComparisons = [3, 5, 7].map((year) => {
    const point = results.timeline.find((item) => item.year === year) ?? results.timeline[results.timeline.length - 1];
    const winner = point.buyCost <= point.leaseCost ? 'Buy' : 'Lease';
    const savings = Math.abs(point.buyCost - point.leaseCost);
    return { ...point, winner, savings };
  });

  return (
    <main className="lvb-ai">
      <section className="lvb-ai__hero">
        <div className="container">
          <nav className="lvb-ai__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/auto-loan-calculator">Auto Loan Calculator</Link>
            <span>/</span>
            <span>Lease vs Buy AI</span>
          </nav>
          <div className="lvb-ai__hero-grid">
            <div>
              <span className="lvb-ai__eyebrow">Lease vs Buy Intelligence Engine</span>
              <h1>AI-powered deal analysis for the moment before you sign.</h1>
              <p>
                Compare lease, finance, depreciation, equity, fees, and cash flow in one editorial-grade dashboard.
              </p>
              <div className="lvb-ai__hero-actions">
                <a href="#calculator" className="lvb-ai__button lvb-ai__button--primary">Analyze my deal</a>
                <a href="#ai-brief" className="lvb-ai__button lvb-ai__button--ghost">Read the AI brief</a>
              </div>
            </div>
            <aside className="lvb-ai__hero-preview" aria-label="AI insight preview">
              <div
                className="lvb-ai__score-ring"
                style={{ '--score': results.dealScore.score } as CSSProperties}
              >
                <span>{results.dealScore.score}</span>
                <small>{results.dealScore.label}</small>
              </div>
              <p>{shownAnalysis.executiveSummary}</p>
              <div className="lvb-ai__preview-bars" aria-hidden>
                {results.timeline.slice(0, 7).map((point) => (
                  <i key={point.year} style={{ height: `${Math.max(18, Math.min(100, point.buyCost / 900))}%` }} />
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="calculator" className="lvb-ai__dashboard">
        <div className="container">
          <div className="lvb-ai__dashboard-grid">
            <aside className="lvb-ai__inputs" aria-label="Lease vs buy inputs">
              <SectionTitle eyebrow="Inputs" title="Build the deal" />

              <details open className="lvb-ai__input-section">
                <summary>Vehicle</summary>
                <div className="lvb-ai__form-grid">
                  <TextField label="Make" value={inputs.make} onChange={(value) => updateText('make', value)} />
                  <TextField label="Model" value={inputs.model} onChange={(value) => updateText('model', value)} />
                  <TextField label="Trim" value={inputs.trim} onChange={(value) => updateText('trim', value)} />
                  <TextField label="ZIP code" value={inputs.zipCode} onChange={(value) => updateText('zipCode', value)} />
                  <NumberField label="MSRP" value={inputs.msrp} step={500} onChange={(value) => updateNumber('msrp', value)} />
                  <NumberField label="Negotiated price" value={inputs.negotiatedPrice} step={500} onChange={(value) => updateNumber('negotiatedPrice', value)} />
                </div>
              </details>

              <details open className="lvb-ai__input-section">
                <summary>Finance</summary>
                <div className="lvb-ai__form-grid">
                  <NumberField label="APR" value={inputs.apr} step={0.1} suffix="%" onChange={(value) => updateNumber('apr', value)} />
                  <NumberField label="Loan term" value={inputs.loanTermMonths} step={12} suffix="mo" onChange={(value) => updateNumber('loanTermMonths', value)} />
                  <NumberField label="Down payment" value={inputs.downPayment} step={500} onChange={(value) => updateNumber('downPayment', value)} />
                  <NumberField label="Trade-in value" value={inputs.tradeInValue} step={500} onChange={(value) => updateNumber('tradeInValue', value)} />
                  <NumberField label="Tax rate" value={inputs.taxes} step={0.1} suffix="%" onChange={(value) => updateNumber('taxes', value)} />
                  <NumberField label="Dealer fees" value={inputs.dealerFees} step={100} onChange={(value) => updateNumber('dealerFees', value)} />
                </div>
              </details>

              <details open className="lvb-ai__input-section">
                <summary>Lease</summary>
                <div className="lvb-ai__form-grid">
                  <NumberField label="Lease term" value={inputs.leaseTermMonths} step={12} suffix="mo" onChange={(value) => updateNumber('leaseTermMonths', value)} />
                  <NumberField label="Monthly payment" value={inputs.leaseMonthlyPayment} step={25} onChange={(value) => updateNumber('leaseMonthlyPayment', value)} />
                  <NumberField label="Mileage allowance" value={inputs.mileageAllowance} step={1000} suffix="mi" onChange={(value) => updateNumber('mileageAllowance', value)} />
                  <NumberField label="Residual" value={inputs.residualPercent} step={1} suffix="%" onChange={(value) => updateNumber('residualPercent', value)} />
                  <NumberField label="Money factor" value={inputs.moneyFactor} step={0.0001} onChange={(value) => updateNumber('moneyFactor', value)} />
                  <NumberField label="Drive-off costs" value={inputs.driveOffCosts} step={250} onChange={(value) => updateNumber('driveOffCosts', value)} />
                  <NumberField label="Acquisition fee" value={inputs.acquisitionFee} step={100} onChange={(value) => updateNumber('acquisitionFee', value)} />
                  <NumberField label="Disposition fee" value={inputs.dispositionFee} step={50} onChange={(value) => updateNumber('dispositionFee', value)} />
                </div>
              </details>

              <details open className="lvb-ai__input-section">
                <summary>Driver profile</summary>
                <div className="lvb-ai__form-grid">
                  <NumberField label="Annual mileage" value={inputs.annualMileage} step={1000} suffix="mi" onChange={(value) => updateNumber('annualMileage', value)} />
                  <NumberField label="Ownership duration" value={inputs.ownershipDurationYears} step={1} suffix="yrs" onChange={(value) => updateNumber('ownershipDurationYears', value)} />
                  <NumberField label="Investment return" value={inputs.investmentReturnPercent} step={0.5} suffix="%" onChange={(value) => updateNumber('investmentReturnPercent', value)} />
                  <SelectField label="Credit tier" value={inputs.creditTier} options={creditTierOptions} onChange={(value) => setInputs((current) => ({ ...current, creditTier: value as LeaseVsBuyInputs['creditTier'] }))} />
                  <SelectField label="Risk tolerance" value={inputs.riskTolerance} options={riskOptions} onChange={(value) => setInputs((current) => ({ ...current, riskTolerance: value as LeaseVsBuyInputs['riskTolerance'] }))} />
                  <SelectField label="Preference" value={inputs.preference} options={preferenceOptions} onChange={(value) => setInputs((current) => ({ ...current, preference: value as LeaseVsBuyInputs['preference'] }))} />
                </div>
              </details>
            </aside>

            <div className="lvb-ai__results">
              <div className="lvb-ai__sticky">
                <section className="lvb-ai__recommendation" aria-label="Recommendation">
                  <div>
                    <span className="lvb-ai__eyebrow">Recommendation</span>
                    <h2>{results.winner === 'buy' ? 'Buy this deal' : 'Lease this deal'}</h2>
                    <p>{shownAnalysis.finalRecommendation}</p>
                  </div>
                  <div className={`lvb-ai__deal-score lvb-ai__deal-score--${results.dealScore.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <strong>{results.dealScore.score}</strong>
                    <span>{results.dealScore.label}</span>
                  </div>
                </section>

                <div className="lvb-ai__metrics">
                  <MetricCard label="Buy payment" value={`${money(results.buyMonthlyPayment)}/mo`} note={`${money(results.totalInterest)} estimated interest`} />
                  <MetricCard label="Lease cost" value={`${money(results.leaseEffectiveMonthlyCost)}/mo`} note={`${money(results.totalLeaseCost)} over selected term`} />
                  <MetricCard label="Winner spread" value={money(results.savings)} note={`${results.winner === 'buy' ? 'Buying' : 'Leasing'} is ahead on horizon cost`} />
                  <MetricCard label="Resale forecast" value={money(results.resaleValue)} note={`${money(results.estimatedDepreciation)} depreciation exposure`} />
                </div>

                <section id="ai-brief" className="lvb-ai__ai-brief">
                  <div className="lvb-ai__ai-head">
                    <div>
                      <span><Brain size={18} aria-hidden /> AI editorial brief</span>
                      <p>Concise guidance from the deal math, risk profile, and visible finance terms.</p>
                    </div>
                    <button type="button" onClick={runAIAnalysis} disabled={analysisState === 'loading'}>
                      {analysisState === 'loading' ? 'Analyzing...' : 'Generate AI analysis'}
                    </button>
                  </div>
                  <section className="lvb-ai__analysis-block lvb-ai__analysis-block--feature">
                    <h3>Executive summary</h3>
                    <p>{shownAnalysis.executiveSummary}</p>
                  </section>
                  <div className="lvb-ai__analysis-grid">
                    <AnalysisBlock title="Financial winner">{shownAnalysis.financialWinner}</AnalysisBlock>
                    <AnalysisBlock title="Lifestyle winner">{shownAnalysis.lifestyleWinner}</AnalysisBlock>
                    <AnalysisBlock title="Long-term wealth">{shownAnalysis.longTermWealthWinner}</AnalysisBlock>
                    <AnalysisBlock title="Risk analysis">{shownAnalysis.riskAnalysis}</AnalysisBlock>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lvb-ai__visuals">
        <div className="container">
          <SectionTitle eyebrow="Advanced visualizations" title="What changes over time" />
          <div className="lvb-ai__chart-grid">
            <article className="lvb-ai__chart-card lvb-ai__chart-card--wide">
              <h3>Lease vs buy cost timeline</h3>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={results.timeline}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.55)" />
                  <YAxis tickFormatter={(value) => money(Number(value))} stroke="rgba(255,255,255,0.55)" width={78} />
                  <Tooltip formatter={(value) => money(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="buyCost" name="Buy cost" stroke="var(--color-blue-cobalt-light)" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="leaseCost" name="Lease cost" stroke="var(--color-gold)" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </article>

            <article className="lvb-ai__chart-card">
              <h3>Equity curve</h3>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={results.timeline}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.55)" />
                  <YAxis tickFormatter={(value) => money(Number(value))} stroke="rgba(255,255,255,0.55)" width={70} />
                  <Tooltip formatter={(value) => money(Number(value))} />
                  <Area type="monotone" dataKey="equity" name="Equity" stroke="var(--color-success)" fill="rgba(38, 135, 13, 0.25)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </article>

            <article className="lvb-ai__chart-card">
              <h3>Cash flow comparison</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={results.timeline.slice(0, Math.max(inputs.ownershipDurationYears, 3))}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.55)" />
                  <YAxis tickFormatter={(value) => money(Number(value))} stroke="rgba(255,255,255,0.55)" width={70} />
                  <Tooltip formatter={(value) => money(Number(value))} />
                  <Legend />
                  <Bar dataKey="cashFlowBuy" name="Buy" fill="var(--color-blue-cobalt-light)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cashFlowLease" name="Lease" fill="var(--color-gold)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </article>

            <article className="lvb-ai__chart-card">
              <h3>3 / 5 / 7-year comparison</h3>
              <div className="lvb-ai__horizon-cards" aria-label="3, 5, and 7 year lease versus buy comparison">
                {horizonComparisons.map((horizon) => (
                  <div key={horizon.year} className="lvb-ai__horizon-card">
                    <span>{horizon.year} years</span>
                    <strong>{horizon.winner} wins</strong>
                    <dl>
                      <div>
                        <dt>Buy cost</dt>
                        <dd>{money(horizon.buyCost)}</dd>
                      </div>
                      <div>
                        <dt>Lease cost</dt>
                        <dd>{money(horizon.leaseCost)}</dd>
                      </div>
                      <div>
                        <dt>Difference</dt>
                        <dd>{money(horizon.savings)}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
              <p>Each card compares projected horizon cost after payments, depreciation, equity, and lease fees.</p>
            </article>

            <article className="lvb-ai__chart-card">
              <h3>Deal score factors</h3>
              <div className="lvb-ai__factor-list">
                {results.dealScore.factors.map((factor) => (
                  <div key={factor.label}>
                    <span>{factor.label}</span>
                    <strong>{factor.score}</strong>
                    <i><b style={{ width: `${factor.score}%` }} /></i>
                    <small>{factor.note}</small>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="lvb-ai__advisor">
        <div className="container">
          <div className="lvb-ai__advisor-grid">
            <article>
              <Sparkles size={22} aria-hidden />
              <h2>AI negotiation assistant</h2>
              <p>Use the script below before discussing monthly payment. Ask the finance office to verify each number.</p>
              <ul>
                {shownAnalysis.negotiationAdvice.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <ShieldAlert size={22} aria-hidden />
              <h2>Dealer red flags</h2>
              <p>Markup risk is strongest where fees, money factor, and payment-only selling are not transparent.</p>
              <ul>
                {shownAnalysis.dealerRedFlags.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <TrendingUp size={22} aria-hidden />
              <h2>Depreciation forecast</h2>
              <p>{shownAnalysis.depreciationForecast}</p>
              <p>{shownAnalysis.longTermWealthWinner}</p>
            </article>
            <article>
              <Gauge size={22} aria-hidden />
              <h2>Next architecture hooks</h2>
              <ul>
                <li>Real-time incentives API placeholder: `/api/incentives`.</li>
                <li>Vehicle depreciation provider abstraction: `services/depreciation`.</li>
                <li>PDF/export and share links can serialize the input state.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LeaseVsBuyAIPage;
