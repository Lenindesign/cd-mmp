import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'demo-video');
const BASE = 'https://cd-mmp-2025.netlify.app';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function slowScroll(page, deltaY, steps = 12) {
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, deltaY / steps);
    await sleep(80);
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: OUT,
      size: { width: 1440, height: 900 },
    },
  });

  const page = await context.newPage();
  console.log('🎬 Recording started...\n');

  // ─── Scene 1: Deals Hub Hero ───
  console.log('Scene 1: Deals Hub Overview');
  await page.goto(`${BASE}/deals`, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(3000);

  // Slow scroll through all categories
  await slowScroll(page, 900);
  await sleep(1500);
  await slowScroll(page, 900);
  await sleep(1500);
  await slowScroll(page, 900);
  await sleep(1500);
  await slowScroll(page, 900);
  await sleep(1500);
  await slowScroll(page, 900);
  await sleep(2000);

  // ─── Scene 2: Card features — scroll back to top ───
  console.log('Scene 2: Card Features + Tooltip');
  await page.evaluate(() => window.scrollTo({ top: 520, behavior: 'smooth' }));
  await sleep(1500);

  const tooltipIcon = page.locator('.deals-hub__card-tooltip-icon').first();
  if (await tooltipIcon.isVisible()) {
    await tooltipIcon.hover();
    await sleep(3000);
    await page.mouse.move(0, 0);
    await sleep(500);
  }

  // ─── Scene 3: Open Filters ───
  console.log('Scene 3: Filter Modal');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await sleep(1000);

  const filterBtn = page.locator('button').filter({ hasText: /Filters/i }).first();
  await filterBtn.click();
  await sleep(2000);

  // Select SUV
  const suvChip = page.locator('.deals-filter__chip').filter({ hasText: /^SUV$/i });
  if (await suvChip.isVisible()) {
    await suvChip.click();
    await sleep(1000);
  }

  // Expand Make section
  const makeToggle = page.locator('.deals-filter__section-toggle').filter({ hasText: /Make/i });
  if (await makeToggle.isVisible()) {
    await makeToggle.click();
    await sleep(1500);
  }

  // Apply
  const applyBtn = page.locator('.deals-filter__apply');
  if (await applyBtn.isVisible()) {
    await applyBtn.click();
    await sleep(2000);
  }

  // Show filtered results
  await slowScroll(page, 600);
  await sleep(2000);

  // Clear filter
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await sleep(500);
  await filterBtn.click();
  await sleep(800);
  const clearBtn = page.locator('.deals-filter__clear');
  if (await clearBtn.isVisible()) await clearBtn.click();
  await sleep(300);
  const applyBtn2 = page.locator('.deals-filter__apply');
  if (await applyBtn2.isVisible()) await applyBtn2.click();
  await sleep(1000);

  // ─── Scene 4: View All Deals ───
  console.log('Scene 4: All Deals Page');
  const viewAllLink = page.locator('a').filter({ hasText: /View All/i }).first();
  if (await viewAllLink.isVisible()) {
    await viewAllLink.click();
  } else {
    await page.goto(`${BASE}/deals/all`, { waitUntil: 'networkidle', timeout: 60000 });
  }
  await sleep(3000);

  // Scroll through cards
  await slowScroll(page, 800);
  await sleep(2000);

  // Click type filters
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await sleep(800);

  const zeroAprBtn = page.locator('.all-deals__type-btn').filter({ hasText: /0% APR/i });
  if (await zeroAprBtn.isVisible()) {
    await zeroAprBtn.click();
    await sleep(2000);
  }

  const cashBtn = page.locator('.all-deals__type-btn').filter({ hasText: /Cash Back/i });
  if (await cashBtn.isVisible()) {
    await cashBtn.click();
    await sleep(2000);
  }

  const financeBtn = page.locator('.all-deals__type-btn').filter({ hasText: /^Finance/i });
  if (await financeBtn.isVisible()) {
    await financeBtn.click();
    await sleep(2000);
  }

  const leaseBtn = page.locator('.all-deals__type-btn').filter({ hasText: /^Lease/i });
  if (await leaseBtn.isVisible()) {
    await leaseBtn.click();
    await sleep(2000);
  }

  const allBtn = page.locator('.all-deals__type-btn').filter({ hasText: /All Deals/i });
  if (await allBtn.isVisible()) {
    await allBtn.click();
    await sleep(1500);
  }

  // ─── Scene 5: Get This Deal Modal ───
  console.log('Scene 5: Get This Deal Modal');
  await slowScroll(page, 400);
  await sleep(500);

  const ctaBtn = page.locator('.all-deals__card-cta').first();
  if (await ctaBtn.isVisible()) {
    await ctaBtn.click();
    await sleep(3000);

    // Scroll within modal
    const modalBody = page.locator('.incentives-modal__body').first();
    if (await modalBody.isVisible()) {
      await modalBody.evaluate(el => {
        el.scrollTo({ top: 300, behavior: 'smooth' });
      });
      await sleep(2000);
    }

    const closeBtn = page.locator('.incentives-modal__close').first();
    if (await closeBtn.isVisible()) await closeBtn.click();
    await sleep(1000);
  }

  // ─── Scene 6: Zero APR Sub-page ───
  console.log('Scene 6: Zero APR Sub-page');
  await page.goto(`${BASE}/deals/zero-apr`, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2500);
  await slowScroll(page, 1000);
  await sleep(2000);

  // ─── Scene 7: Lease Deals Sub-page ───
  console.log('Scene 7: Lease Deals Sub-page');
  await page.goto(`${BASE}/deals/lease`, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2500);
  await slowScroll(page, 1000);
  await sleep(2000);

  // ─── Scene 8: Back to Hub (closing shot) ───
  console.log('Scene 8: Closing shot');
  await page.goto(`${BASE}/deals`, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(3000);

  // Close context to finalize video
  await context.close();
  await browser.close();

  console.log(`\n✅ Video saved to: ${OUT}/`);
  console.log('Look for the .webm file in that directory.\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
