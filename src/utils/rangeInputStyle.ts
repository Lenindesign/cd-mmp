import type { CSSProperties } from 'react';

type RangeInputStyle = CSSProperties & {
  '--range-progress': string;
};

const clampRangePercent = (value: number, min: number, max: number) => {
  if (max <= min) return 0;
  const raw = ((value - min) / (max - min)) * 100;
  return Math.min(100, Math.max(0, raw));
};

export const getRangeInputStyle = (value: number, min: number, max: number): RangeInputStyle => ({
  '--range-progress': `${clampRangePercent(value, min, max)}%`,
});
