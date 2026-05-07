import { useMemo } from 'react';
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { computeFinanceSchedule } from './financeSchedule';
import './PaymentCalculatorFinanceCharts.css';

/** Matches CSS vars on `.payment-calc-viz` for Recharts SVG attributes */
const COLORS = {
  principal: 'var(--payment-calc-viz-principal)',
  interest: 'var(--payment-calc-viz-interest)',
  balance: 'var(--payment-calc-viz-balance)',
  cumulativeInterest: 'var(--payment-calc-viz-cumulative-interest)',
  payment: 'var(--payment-calc-viz-payment)',
} as const;

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.round(value));

export interface PaymentCalculatorFinanceChartsProps {
  loanPrincipal: number;
  financeApr: number;
  termMonths: number;
  monthlyPayment: number;
  totalInterest: number;
}

function fmtMoneyCompact(n: number): string {
  const abs = Math.abs(Math.round(n));
  if (abs >= 1000) return `$${Math.round(abs / 1000)}K`;
  return `$${abs}`;
}

export function PaymentCalculatorFinanceCharts({
  loanPrincipal,
  financeApr,
  termMonths,
  monthlyPayment,
  totalInterest,
}: PaymentCalculatorFinanceChartsProps) {
  const monthlyRate = financeApr / 100 / 12;

  const schedule = useMemo(
    () => computeFinanceSchedule(loanPrincipal, monthlyRate, termMonths, monthlyPayment),
    [loanPrincipal, monthlyRate, termMonths, monthlyPayment]
  );

  const breakdown = useMemo(() => {
    const pi = loanPrincipal + totalInterest;
    if (pi <= 0) return [];
    if (totalInterest <= 0) {
      return [{ name: 'Principal', value: loanPrincipal }];
    }
    return [
      { name: 'Principal', value: loanPrincipal },
      { name: 'Interest', value: totalInterest },
    ];
  }, [loanPrincipal, totalInterest]);

  const totalLoanPayments = loanPrincipal + totalInterest;
  const interestShare = totalLoanPayments > 0 ? Math.round((totalInterest / totalLoanPayments) * 100) : 0;

  const yDomainMax = useMemo(() => {
    if (schedule.length === 0) return 1;
    return Math.max(loanPrincipal * 1.05, 1);
  }, [schedule, loanPrincipal]);

  const halfwayPoint = useMemo(() => {
    if (schedule.length === 0 || loanPrincipal <= 0) return undefined;
    const target = loanPrincipal / 2;
    return schedule.find((point) => point.balance <= target && point.month > 0);
  }, [loanPrincipal, schedule]);

  const monthAxisTicks = useMemo(() => {
    const out = new Set<number>([0]);
    const last = termMonths;
    if (last <= 0) return [0];
    const step = last <= 24 ? 4 : last <= 48 ? 6 : 12;
    for (let m = step; m < last; m += step) out.add(m);
    out.add(last);
    return [...out].sort((a, b) => a - b);
  }, [termMonths]);

  if (loanPrincipal <= 0 || termMonths <= 0) {
    return null;
  }

  return (
    <div className="payment-calc-viz">
      <div className="payment-calc-viz__summary" aria-label="Loan summary">
        <div>
          <span>Monthly payment</span>
          <strong>{currency(monthlyPayment)}</strong>
        </div>
        <div>
          <span>Amount financed</span>
          <strong>{currency(loanPrincipal)}</strong>
        </div>
        <div>
          <span>Total interest</span>
          <strong>{currency(totalInterest)}</strong>
        </div>
        <div>
          <span>Total loan payments</span>
          <strong>{currency(totalLoanPayments)}</strong>
        </div>
      </div>
      <div className="payment-calc-viz__layout">
        {schedule.length > 1 && (
          <div className="payment-calc-viz__panel payment-calc-viz__panel--lines">
            <figure className="payment-calc-viz__figure payment-calc-viz__figure--lines">
              <figcaption className="payment-calc-viz__title">Loan balance over time</figcaption>
              <p className="payment-calc-viz__insight">
                {halfwayPoint
                  ? `You are about halfway paid down around month ${halfwayPoint.month}.`
                  : `Paid off in ${termMonths} months with this payment.`}
              </p>
              <div className="payment-calc-viz__line-wrap">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={schedule} margin={{ top: 12, right: 8, left: 4, bottom: 8 }}>
                    <CartesianGrid stroke="var(--color-gray-200)" strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="month"
                      domain={[0, termMonths]}
                      ticks={monthAxisTicks}
                      tick={{ fontSize: 11, fill: 'var(--color-gray-600)' }}
                      tickLine={false}
                      axisLine={{ stroke: 'var(--color-gray-300)' }}
                    />
                    <YAxis
                      tickFormatter={fmtMoneyCompact}
                      domain={[0, yDomainMax]}
                      tick={{ fontSize: 11, fill: 'var(--color-gray-600)' }}
                      tickLine={false}
                      axisLine={{ stroke: 'var(--color-gray-300)' }}
                      width={48}
                    />
                    <Tooltip
                      formatter={(value) => currency(Number(value))}
                      labelFormatter={label => `Month ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      name="Balance"
                      stroke={COLORS.balance}
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="payment-calc-viz__legend" aria-label="Payments over time legend">
                  <span><i className="payment-calc-viz__legend-dot payment-calc-viz__legend-dot--balance" />Balance</span>
                </div>
              </div>
            </figure>
          </div>
        )}

        {breakdown.length > 0 && (
          <div className="payment-calc-viz__panel payment-calc-viz__panel--donut">
            <figure className="payment-calc-viz__figure">
              <figcaption className="payment-calc-viz__title">Cost split</figcaption>
              <div className="payment-calc-viz__donut-wrap">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                    <Pie
                      data={breakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={58}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      strokeWidth={0}
                    >
                      {breakdown.map(entry => (
                        <Cell
                          key={entry.name}
                          fill={
                            entry.name === 'Principal' ? COLORS.principal : COLORS.interest
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => currency(Number(value))}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="payment-calc-viz__donut-center">
                  <strong>{interestShare}%</strong>
                  <span>interest</span>
                </div>
              </div>
            </figure>

            <dl className="payment-calc-viz__cost-list">
              <div>
                <dt><i className="payment-calc-viz__legend-dot payment-calc-viz__legend-dot--balance" />Principal</dt>
                <dd>{currency(loanPrincipal)}</dd>
              </div>
              <div>
                <dt><i className="payment-calc-viz__legend-dot payment-calc-viz__legend-dot--interest" />Interest</dt>
                <dd>{currency(totalInterest)}</dd>
              </div>
            </dl>

            <a
              href="https://www.google.com/search?q=vehicle+sales+tax+and+registration+fees+by+state"
              target="_blank"
              rel="noopener noreferrer"
              className="payment-calc-viz__tax-link"
            >
              Find average tax rate and fees in your state
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
