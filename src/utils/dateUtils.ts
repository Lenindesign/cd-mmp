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
