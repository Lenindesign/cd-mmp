/** Monthly amortization points for finance visualization (Recharts). */

export type FinanceSchedulePoint = {
  month: number;
  balance: number;
  cumulativeInterest: number;
  cumulativePayment: number;
};

export function computeFinanceSchedule(
  principal: number,
  monthlyRate: number,
  termMonths: number,
  monthlyPayment: number
): FinanceSchedulePoint[] {
  const points: FinanceSchedulePoint[] = [];
  let balance = Math.max(0, principal);
  let cumulativeInterest = 0;

  points.push({
    month: 0,
    balance,
    cumulativeInterest: 0,
    cumulativePayment: 0,
  });

  if (termMonths <= 0 || balance <= 0) {
    return points;
  }

  if (monthlyRate === 0) {
    const principalSlice = principal / termMonths;
    for (let m = 1; m <= termMonths; m++) {
      balance = Math.max(0, principal - principalSlice * m);
      points.push({
        month: m,
        balance,
        cumulativeInterest: 0,
        cumulativePayment: monthlyPayment * m,
      });
    }
    return points;
  }

  for (let m = 1; m <= termMonths; m++) {
    const interestPortion = balance * monthlyRate;
    let principalPortion = monthlyPayment - interestPortion;
    if (principalPortion > balance) principalPortion = balance;
    cumulativeInterest += interestPortion;
    balance = Math.max(0, balance - principalPortion);
    points.push({
      month: m,
      balance,
      cumulativeInterest,
      cumulativePayment: monthlyPayment * m,
    });
  }

  return points;
}
