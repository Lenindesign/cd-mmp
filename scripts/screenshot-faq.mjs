#!/usr/bin/env node
/**
 * Capture clean full-height screenshots of the FAQ sections on the
 * Zero-APR (Best Buying Deals) and Lease Deals pages.
 *
 * Requires the Vite dev server to be running on http://localhost:5173.
 */
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'screenshots');

const pages = [
  {
    url: 'http://localhost:5173/deals/best-buying-deals',
    selector: '.zero-apr-page__faq-section',
    filename: 'zero-apr-faq-all-expanded.png',
    label: 'Best Buying Deals',
  },
  {
    url: 'http://localhost:5173/deals/lease',
    selector: '.lease-deals-page__faq-section',
    filename: 'lease-faq-all-expanded.png',
    label: 'Lease Deals',
  },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 900 },
  deviceScaleFactor: 2,
});

for (const p of pages) {
  const page = await ctx.newPage();
  console.log(`→ ${p.label}: ${p.url}`);
  await page.goto(p.url, { waitUntil: 'networkidle' });

  const section = page.locator(p.selector).first();
  await section.waitFor({ state: 'visible', timeout: 15_000 });

  await page.addStyleTag({
    content: `
      .site-header,
      header,
      [class*="sticky"],
      [class*="toolbar"],
      [class*="filter-bar"] {
        position: static !important;
        top: auto !important;
      }
      [class*="deals-toolbar"],
      .deals-toolbar,
      .deals-filter-bar,
      [data-sticky],
      [class*="__sticky"] {
        display: none !important;
      }
    `,
  });
  await page.waitForTimeout(200);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);

  const out = path.join(outDir, p.filename);
  await section.screenshot({ path: out });
  console.log(`  saved → ${out}`);
  await page.close();
}

await browser.close();
