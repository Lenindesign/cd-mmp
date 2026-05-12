const PRESERVED_WORDS = new Map<string, string>([
  ['abs', 'ABS'],
  ['apr', 'APR'],
  ['awd', 'AWD'],
  ['c/d', 'C/D'],
  ['ev', 'EV'],
  ['evs', 'EVs'],
  ['fwd', 'FWD'],
  ['hp', 'HP'],
  ['mpg', 'MPG'],
  ['msrp', 'MSRP'],
  ['phev', 'PHEV'],
  ['rwd', 'RWD'],
  ['suv', 'SUV'],
  ['suvs', 'SUVs'],
]);

const WORD_PATTERN = /[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)?(?:[-/][A-Za-z0-9]+(?:['’][A-Za-z0-9]+)?)*%?/g;

function titleCaseSegment(segment: string): string {
  const preserved = PRESERVED_WORDS.get(segment.toLowerCase());
  if (preserved) return preserved;
  if (!/[A-Za-z]/.test(segment)) return segment;
  if (segment === segment.toUpperCase()) return segment;

  const firstLetterIndex = segment.search(/[A-Za-z]/);
  if (firstLetterIndex === -1) return segment;

  return `${segment.slice(0, firstLetterIndex)}${segment
    .charAt(firstLetterIndex)
    .toUpperCase()}${segment.slice(firstLetterIndex + 1).toLowerCase()}`;
}

function titleCaseWord(word: string): string {
  return word
    .split(/([-/])/)
    .map((segment) => (segment === '-' || segment === '/' ? segment : titleCaseSegment(segment)))
    .join('');
}

export function toTitleCase(value: string): string {
  return value.replace(WORD_PATTERN, titleCaseWord);
}
