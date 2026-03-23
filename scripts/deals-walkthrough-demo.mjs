import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'demo-walkthrough-screenshots');
const BASE = 'https://cd-mmp-2025.netlify.app';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function slowScroll(page, deltaY, steps = 8) {
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, deltaY / steps);
    await sleep(120);
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const shot = async (name) => {
    const path = join(OUT, `${name}.png`);
    await page.screenshot({ path, fullPage: false });
    console.log(`  ✓ ${name}.png`);
    return path;
  };

  // Scene 1: Deals Hub Overview
  console.log('\n🎬 Scene 1: Deals Hub Overview');
  await page.goto(`${BASE}/deals`, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2000);
  await shot('01-deals-hub-hero');

  await slowScroll(page, 1400);
  await sleep(500);
  await shot('02-deals-hub-zero-apr-cards');

  await slowScroll(page, 1400);
  await sleep(500);
  await shot('03-deals-hub-cash-finance-cards');

  await slowScroll(page, 1400);
  await sleep(500);
  await shot('04-deals-hub-lease-suv-cards');

  // Scene 2: Card Features — savings tooltip
  console.log('\n🎬 Scene 2: Card Features');
  await page.evaluate(() => window.scrollTo({ top: 580, behavior: 'instant' }));
  await sleep(500);
  await shot('05-card-payment-savings');

  const tooltipIcon = page.locator('.deals-hub__card-tooltip-icon').first();
  if (await tooltipIcon.isVisible()) {
    await tooltipIcon.hover();
    await sleep(600);
    await shot('06-savings-tooltip-hover');
  }

  // Scene 3: Filter Modal
  console.log('\n🎬 Scene 3: Filter Modal');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await sleep(300);

  const filterBtn = page.locator('button').filter({ hasText: /Filters/i }).first();
  await filterBtn.click();
  await sleep(1000);
  await shot('07-filter-modal-open');

  const suvChip = page.locator('.deals-filter__chip').filter({ hasText: /^SUV$/i });
  if (await suvChip.isVisible()) {
    await suvChip.click();
    await sleep(400);
    await shot('08-filter-suv-selected');
  }

  const applyBtn = page.locator('.deals-filter__apply');
  if (await applyBtn.isVisible()) {
    await applyBtn.click();
    await sleep(800);
    await shot('09-filtered-results-suv');
  }

  // Clear filter — reopen and clear
  await filterBtn.click();
  await sleep(500);
  const clearBtn = page.locator('.deals-filter__clear');
  if (await clearBtn.isVisible()) {
    await clearBtn.click();
    await sleep(300);
  }
  const applyBtn2 = page.locator('.deals-filter__apply');
  if (await applyBtn2.isVisible()) await applyBtn2.click();
  await sleep(500);

  // Scene 4: View All Deals Page
  console.log('\n🎬 Scene 4: All Deals Page');
  const viewAllLink = page.locator('a').filter({ hasText: /View All/i }).first();
  if (await viewAllLink.isVisible()) {
    await viewAllLink.click();
  } else {
    await page.goto(`${BASE}/deals/all`, { waitUntil: 'networkidle', timeout: 60000 });
  }
  await sleep(2000);
  await shot('10-all-deals-overview');

  await slowScroll(page, 800);
  await sleep(400);
  await shot('11-all-deals-cards-grid');

  // Type filter buttons
  const cashBackBtn = page.locator('.all-deals__type-btn').filter({ hasText: /Cash Back/i });
  if (await cashBackBtn.isVisible()) {
    await cashBackBtn.click();
    await sleep(600);
    await shot('12-all-deals-cash-back-filter');
  }

  const leaseBtn = page.locator('.all-deals__type-btn').filter({ hasText: /^Lease/i });
  if (await leaseBtn.isVisible()) {
    await leaseBtn.click();
    await sleep(600);
    await shot('13-all-deals-lease-filter');
  }

  const allBtn = page.locator('.all-deals__type-btn').filter({ hasText: /All Deals/i });
  if (await allBtn.isVisible()) {
    await allBtn.click();
    await sleep(400);
  }

  // Scene 5: Get This Deal Modal
  console.log('\n🎬 Scene 5: Get This Deal Modal');
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
  await sleep(300);
  const ctaBtn = page.locator('.all-deals__card-cta').first();
  if (await ctaBtn.isVisible()) {
    await ctaBtn.click();
    await sleep(1200);
    await shot('14-incentives-modal-open');

    // Scroll within modal to show form
    const modalBody = page.locator('.incentives-modal__body').first();
    if (await modalBody.isVisible()) {
      await modalBody.evaluate(el => el.scrollTop = 200);
      await sleep(400);
      await shot('15-incentives-modal-form');
    }

    const closeBtn = page.locator('.incentives-modal__close').first();
    if (await closeBtn.isVisible()) await closeBtn.click();
    await sleep(400);
  }

  // Scene 6: Sub-page (Zero APR)
  console.log('\n🎬 Scene 6: Zero APR Sub-page');
  await page.goto(`${BASE}/deals/zero-apr`, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2000);
  await shot('16-zero-apr-page-hero');

  await slowScroll(page, 1200);
  await sleep(500);
  await shot('17-zero-apr-page-cards');

  // Scene 7: Lease Deals Sub-page
  console.log('\n🎬 Scene 7: Lease Deals Sub-page');
  await page.goto(`${BASE}/deals/lease`, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2000);
  await shot('18-lease-deals-page');

  await slowScroll(page, 1200);
  await sleep(500);
  await shot('19-lease-deals-cards');

  await browser.close();
  console.log(`\n✅ Done! ${19} screenshots saved to: ${OUT}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
