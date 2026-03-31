const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const getCurrentPeriod = (): { month: string; year: number } => {
  const now = new Date();
  return {
    month: MONTH_NAMES[now.getMonth()],
    year: now.getFullYear(),
  };
};

/**
 * Standardized expiration date formatter for deals.
 * Accepts "April 1, 2026" or any Date-parseable string.
 * Returns "4/1/26" (compact numeric).
 */
export const formatExpiration = (dateStr: string): string => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}`;
  } catch {
    return dateStr;
  }
};
