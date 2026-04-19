/**
 * Split a flat array into fixed-size chunks.
 *
 * Used by the deals listings to segment a flat list of deal cards into
 * groups that are separated by full-bleed ad breakers in the rendered page.
 * Previously duplicated in ~18 page files; centralizing means deal-grid
 * pagination is consistent everywhere.
 *
 * When `chunkSize` is 0 or negative the whole input is returned as a single
 * chunk, which mirrors the previous per-page implementations.
 */
export function chunkArray<T>(items: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) return [items];
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks;
}
