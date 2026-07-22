import type { Handler } from '@netlify/functions';
import { getNewVehicles, getUsedVehicles } from '../../src/services/vehicleService';
import type { Vehicle } from '../../src/types/vehicle';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type EstimateRow = {
  label: string;
  value: string;
  emphasis?: boolean;
};

type EstimateEmailPayload = {
  email?: string;
  testMode?: boolean;
  userName?: string;
  vehicle?: {
    selectionMode?: 'specific' | 'bodyStyle';
    condition?: string;
    year?: string;
    make?: string;
    model?: string;
    trim?: string;
    bodyStyle?: string;
    image?: string;
    shopUrl?: string;
  };
  estimate?: {
    monthlyPayment?: string;
    summary?: string;
    targetVehiclePrice?: number;
    rows?: EstimateRow[];
  };
  mockUrl?: string;
};

type EstimateRecommendation = {
  name: string;
  image?: string;
  priceRange: string;
  rating: string;
  accolades: string;
  editorsChoice: boolean;
  tenBest: boolean;
  evOfTheYear: boolean;
  rankLabel: string;
  fuelEconomy: string;
  shopUrl: string;
};

const json = (statusCode: number, body: Record<string, unknown>) => ({
  statusCode,
  headers: {
    ...corsHeaders,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;

const getBodyStylePluralLabel = (bodyStyle: string) => {
  const normalized = bodyStyle.trim().toLowerCase();
  if (normalized === 'suv') return 'SUVs';
  if (normalized === 'ev') return 'EVs';
  if (normalized === 'hybrid') return 'Hybrids';
  if (normalized === 'crossover') return 'Crossovers';
  return `${bodyStyle}s`;
};

const isBodyStyleEstimate = (payload: EstimateEmailPayload) => payload.vehicle?.selectionMode === 'bodyStyle';

const matchesRecommendationCategory = (vehicle: Vehicle, bodyStyle: string) => {
  const normalized = bodyStyle.trim().toLowerCase();
  if (normalized === 'ev') return vehicle.fuelType === 'Electric';
  if (normalized === 'hybrid') return vehicle.fuelType === 'Hybrid' || vehicle.fuelType === 'Plug-in Hybrid';
  if (normalized === 'crossover') return vehicle.bodyStyle === 'SUV';
  return vehicle.bodyStyle.toLowerCase() === normalized;
};

const buildVehicleAccolades = (vehicle: Vehicle, rank: number) => {
  const accolades = [
    vehicle.editorsChoice ? "Editor's Choice" : undefined,
    vehicle.tenBest ? '10Best' : undefined,
    vehicle.evOfTheYear ? 'EV of the Year' : undefined,
    vehicle.award || undefined,
  ].filter((value, index, all): value is string => Boolean(value) && all.indexOf(value) === index);

  if (accolades.length === 0 && rank <= 3) {
    accolades.push('Top-rated pick');
  }

  return accolades.join(' · ');
};

const buildRecommendationShopUrl = (condition: string | undefined, vehicle: Vehicle) => {
  const listingCondition = condition === 'used' ? 'used' : 'new';
  const params = new URLSearchParams({
    year: vehicle.year,
    make: vehicle.make,
    model: vehicle.model,
  });
  return `https://www.caranddriver.com/cars-for-sale/${listingCondition}?${params.toString()}`;
};

const buildBodyStyleRecommendations = (payload: EstimateEmailPayload): EstimateRecommendation[] => {
  const bodyStyle = payload.vehicle?.bodyStyle?.trim();
  const targetVehiclePrice = payload.estimate?.targetVehiclePrice;
  if (!bodyStyle || !targetVehiclePrice || targetVehiclePrice <= 0) return [];

  const sourceVehicles = payload.vehicle?.condition === 'used' ? getUsedVehicles() : getNewVehicles();
  const rankedVehicles = sourceVehicles
    .filter((vehicle) => matchesRecommendationCategory(vehicle, bodyStyle))
    .sort((a, b) => b.staffRating - a.staffRating);

  const seenModels = new Set<string>();
  const affordableVehicles = rankedVehicles.filter((vehicle) => {
    if (vehicle.priceMin > targetVehiclePrice) return false;
    const modelKey = `${vehicle.make.toLowerCase()}::${vehicle.model.toLowerCase()}`;
    if (seenModels.has(modelKey)) return false;
    seenModels.add(modelKey);
    return true;
  });

  return affordableVehicles.slice(0, 3).map((vehicle, index) => ({
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    image: vehicle.image,
    priceRange: vehicle.priceRange || `${formatCurrency(vehicle.priceMin)} - ${formatCurrency(vehicle.priceMax)}`,
    rating: vehicle.staffRating.toFixed(1),
    accolades: buildVehicleAccolades(vehicle, index + 1),
    editorsChoice: Boolean(vehicle.editorsChoice),
    tenBest: Boolean(vehicle.tenBest),
    evOfTheYear: Boolean(vehicle.evOfTheYear),
    rankLabel: `#${index + 1} among ${getBodyStylePluralLabel(bodyStyle)} starting under ${formatCurrency(targetVehiclePrice)}`,
    fuelEconomy: vehicle.mpg || 'EPA estimate pending',
    shopUrl: buildRecommendationShopUrl(payload.vehicle?.condition, vehicle),
  }));
};

const buildRecommendationRows = (recommendations: EstimateRecommendation[]) => {
  if (recommendations.length <= 1) return [recommendations];
  const [lead, ...rest] = recommendations;
  return [[lead], rest];
};

const buildRecommendationAccolades = (vehicle: EstimateRecommendation) => {
  const badges = [
    vehicle.editorsChoice ? {
      label: "Editor's Choice",
      image: 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE',
    } : null,
    vehicle.tenBest ? {
      label: '10Best',
      image: 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg',
    } : null,
    vehicle.evOfTheYear ? {
      label: 'EV of the Year',
      image: 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ev-of-the-year.721e420.svg',
    } : null,
  ].filter((badge): badge is { label: string; image: string } => badge !== null);

  if (badges.length === 0) {
    return `<p style="margin:0 0 14px;color:#4b5563;font-size:14px;line-height:1.45;">${escapeHtml(vehicle.accolades || 'Top-rated pick')}</p>`;
  }

  return `
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 14px;border-collapse:collapse;">
      <tr>
        ${badges.map((badge) => `
          <td align="center" style="padding:0 10px 0 0;vertical-align:top;">
            <span style="display:inline-block;width:44px;height:44px;border:1px solid #d7dde5;border-radius:999px;background:#ffffff;text-align:center;line-height:44px;box-shadow:0 2px 6px rgba(15,23,42,.08);">
              <img src="${escapeHtml(badge.image)}" alt="${escapeHtml(badge.label)}" width="24" height="24" style="display:inline-block;width:24px;height:24px;vertical-align:middle;object-fit:contain;border:0;">
            </span>
            <span style="display:block;margin-top:5px;color:#5d6670;font-size:9px;font-weight:700;letter-spacing:.3px;line-height:1.1;text-transform:uppercase;">${escapeHtml(badge.label)}</span>
          </td>
        `).join('')}
      </tr>
    </table>`;
};

const isLocalOrigin = (origin: string | undefined) => {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    return ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
  } catch {
    return false;
  }
};

const buildVehicleName = (payload: EstimateEmailPayload) => {
  const vehicle = payload.vehicle ?? {};
  const pieces = [vehicle.year, vehicle.make, vehicle.model, vehicle.trim].filter(Boolean);
  if (pieces.length > 0) return pieces.join(' ');
  if (vehicle.selectionMode === 'bodyStyle' && vehicle.bodyStyle) {
    return `${vehicle.condition === 'used' ? 'Used' : 'New'} ${getBodyStylePluralLabel(vehicle.bodyStyle)}`;
  }
  return `${vehicle.condition === 'used' ? 'Used' : 'New'} ${vehicle.bodyStyle || 'vehicle'}`;
};

const buildEmailHtml = (payload: EstimateEmailPayload) => {
  const vehicleName = buildVehicleName(payload);
  const firstName = payload.userName?.trim().split(/\s+/)[0] || 'there';
  const monthlyPayment = payload.estimate?.monthlyPayment || '$0/mo';
  const rows = payload.estimate?.rows?.length ? payload.estimate.rows : [];
  const shopUrl = payload.vehicle?.shopUrl || 'https://www.caranddriver.com/cars-for-sale/';
  const mockUrl = payload.mockUrl || 'https://cd-mmp-2025.netlify.app/payment-estimate-email-mock.html';
  const targetVehiclePrice = payload.estimate?.targetVehiclePrice;
  const bodyStyleRecommendations = isBodyStyleEstimate(payload) ? buildBodyStyleRecommendations(payload) : [];
  const bodyStyleLabel = payload.vehicle?.bodyStyle?.trim() || 'vehicle';
  const bodyStylePlural = getBodyStylePluralLabel(bodyStyleLabel);
  const bodyStyleRecommendationRows = buildRecommendationRows(bodyStyleRecommendations);

  const rowMarkup = rows
    .map((row) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #d9e2e7;color:#24364a;font-size:15px;${row.emphasis ? 'font-weight:800;' : ''}">${escapeHtml(row.label)}</td>
        <td align="right" style="padding:12px 16px;border-bottom:1px solid #d9e2e7;color:#111827;font-size:15px;font-weight:800;${row.emphasis ? 'color:#1b6695;font-size:18px;' : ''}">${escapeHtml(row.value)}</td>
      </tr>
    `)
    .join('');

  const nextStepMarkup = bodyStyleRecommendations.length > 0
    ? `
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 8px;color:#005a8b;font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;">Popular picks in your budget</p>
                <h2 style="margin:0 0 12px;color:#111827;font-size:24px;line-height:1.15;">Three ${escapeHtml(bodyStylePlural.toLowerCase())} worth shopping starting under ${escapeHtml(formatCurrency(targetVehiclePrice || 0))}</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="body-style-grid" style="width:100%;border-collapse:separate;border-spacing:0;">
                  ${bodyStyleRecommendationRows.map((row, rowIndex) => `
                  <tr>
                    ${row.map((vehicle, index) => `
                      <td class="body-style-grid__cell" style="width:${row.length === 1 ? '100%' : '50%'};padding:${index === row.length - 1 ? '0' : '0 12px 0 0'};padding-bottom:${rowIndex === bodyStyleRecommendationRows.length - 1 ? '0' : '16px'};vertical-align:top;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border:1px solid #d8e0e5;border-radius:10px;overflow:hidden;background:#ffffff;">
                          <tr>
                            <td style="padding:0;">
                              ${vehicle.image
                                ? `<img src="${escapeHtml(vehicle.image)}" alt="${escapeHtml(vehicle.name)}" style="display:block;width:100%;height:${row.length === 1 ? '300px' : '168px'};object-fit:cover;border:0;">`
                                : `<div style="padding:28px 16px;background:#eef5f7;color:#4b5563;font-size:14px;line-height:1.4;text-align:center;">Image unavailable</div>`}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:18px 16px 16px;">
                              <p style="margin:0 0 6px;color:#111827;font-size:22px;font-weight:800;line-height:1.1;">${escapeHtml(vehicle.name)}</p>
                              <p style="margin:0 0 10px;color:#005a8b;font-size:13px;font-weight:800;line-height:1.35;">${escapeHtml(vehicle.rankLabel)}</p>
                              <p style="margin:0;color:#111827;font-size:36px;font-weight:800;line-height:1;">${escapeHtml(vehicle.rating)}<span style="font-size:18px;">/10</span></p>
                              <p style="margin:5px 0 12px;color:#4b5563;font-size:11px;letter-spacing:1px;line-height:1.2;text-transform:uppercase;">C/D Rating</p>
                              ${buildRecommendationAccolades(vehicle)}
                              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">
                                <tr>
                                  <td style="padding:10px 0;border-top:1px solid #e5e7eb;color:#6b7280;font-size:11px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;">MSRP Range</td>
                                </tr>
                                <tr>
                                  <td style="padding:0 0 12px;color:#111827;font-size:18px;font-weight:800;line-height:1.2;">${escapeHtml(vehicle.priceRange)}</td>
                                </tr>
                                <tr>
                                  <td style="padding:10px 0;border-top:1px solid #e5e7eb;color:#6b7280;font-size:11px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;">Fuel Economy</td>
                                </tr>
                                <tr>
                                  <td style="padding:0 0 16px;color:#111827;font-size:18px;font-weight:800;line-height:1.2;">${escapeHtml(vehicle.fuelEconomy)}</td>
                                </tr>
                              </table>
                              <a href="${escapeHtml(vehicle.shopUrl)}" style="display:block;padding:12px 14px;background:#1b6f9f;color:#ffffff;font-size:12px;font-weight:800;letter-spacing:.4px;text-align:center;text-decoration:none;text-transform:uppercase;">Shop now</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    `).join('')}
                  </tr>
                  `).join('')}
                </table>
              </td>
            </tr>`
    : `
            <tr>
              <td style="padding:32px;">
                <h2 style="margin:0 0 10px;color:#111827;font-size:22px;">Your next step</h2>
                <p style="margin:0 0 20px;color:#4b5563;font-size:15px;line-height:1.45;">Compare real listings that match this estimate before you talk numbers with a dealer.</p>
                <a href="${escapeHtml(shopUrl)}" style="display:block;padding:14px 18px;background:#1b6f9f;color:#ffffff;font-size:14px;font-weight:800;letter-spacing:.4px;text-align:center;text-decoration:none;text-transform:uppercase;">Shop matching cars</a>
                <p style="margin:20px 0 0;color:#4b5563;font-size:13px;line-height:1.45;">Preview mock: <a href="${escapeHtml(mockUrl)}" style="color:#005a8b;">${escapeHtml(mockUrl)}</a></p>
              </td>
            </tr>`;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      @media only screen and (max-width: 640px) {
        .body-style-grid__cell {
          display: block !important;
          width: 100% !important;
          padding: 0 0 16px 0 !important;
        }
      }
    </style>
  </head>
  <body style="margin:0;background:#f3f5f7;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f7;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:640px;max-width:100%;background:#ffffff;border:1px solid #d8e0e5;">
            <tr>
              <td align="center" style="padding:28px 32px;border-bottom:1px solid #d8e0e5;">
                <img src="https://cd-mmp-2025.netlify.app/car-and-driver-logo.svg" width="220" alt="Car and Driver" style="display:block;border:0;max-width:220px;width:220px;height:auto;">
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 8px;color:#005a8b;font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;">Your payment estimate</p>
                <h1 style="margin:0 0 16px;color:#111827;font-size:30px;line-height:1.08;">${escapeHtml(firstName)}, your ${escapeHtml(vehicleName)} estimate</h1>
                <p style="margin:0;color:#24364a;font-size:16px;line-height:1.55;">Thank you for using Car and Driver to calculate an estimated monthly payment for a ${escapeHtml(vehicleName)}. Use this estimate as a planning guide while shopping, and keep in mind that final pricing, taxes, fees, trade-in value, and financing terms may vary by vehicle and retailer.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;background:#eef5f7;border-top:1px solid #d8e0e5;border-bottom:1px solid #d8e0e5;">
                <p style="margin:0 0 6px;color:#4b5563;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">Estimated monthly payment</p>
                <p style="margin:0 0 22px;color:#1b6695;font-size:56px;font-weight:800;line-height:1;">${escapeHtml(monthlyPayment)}</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;border:1px solid #d8e0e5;border-collapse:collapse;">
                  ${rowMarkup}
                </table>
              </td>
            </tr>
            ${nextStepMarkup}
            <tr>
              <td style="padding:0 32px 32px;color:#4b5563;font-size:13px;line-height:1.45;">
                Preview mock: <a href="${escapeHtml(mockUrl)}" style="color:#005a8b;">${escapeHtml(mockUrl)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px;background:#101828;color:#ffffff;font-size:12px;line-height:1.5;">
                Estimates are for planning only and are not loan approvals or offers. Dealer pricing, lender terms, taxes, fees, and incentives may change.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  let payload: EstimateEmailPayload;
  try {
    payload = JSON.parse(event.body || '{}') as EstimateEmailPayload;
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const rawEmail = payload.email?.trim() || '';
  const email = rawEmail.toLowerCase();
  const requestOrigin = event.headers.origin ?? event.headers.Origin;
  const testMode = payload.testMode === true && isLocalOrigin(requestOrigin);

  if (!rawEmail) {
    return json(400, { error: 'Enter an email address.' });
  }

  if (!testMode && !isEmail(email)) {
    return json(400, { error: 'Enter a valid email address.' });
  }

  if (testMode) {
    return json(200, {
      ok: true,
      testMode: true,
      id: `test-${Date.now()}`,
      message: `Test estimate accepted for ${rawEmail}.`,
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PAYMENT_ESTIMATE_EMAIL_FROM || 'Car and Driver <estimates@caranddriver.com>';
  if (!apiKey) {
    return json(503, {
      error: 'Email service is not configured.',
      details: 'Set RESEND_API_KEY and PAYMENT_ESTIMATE_EMAIL_FROM in Netlify environment variables.',
    });
  }

  const vehicleName = buildVehicleName(payload);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: `Your ${vehicleName} payment estimate`,
        html: buildEmailHtml(payload),
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      return json(502, {
        error: 'Email provider rejected the request.',
        details: result,
      });
    }

    return json(200, {
      ok: true,
      id: result.id,
      message: `Estimate sent to ${email}.`,
    });
  } catch (error) {
    return json(502, {
      error: 'Failed to send estimate email.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
