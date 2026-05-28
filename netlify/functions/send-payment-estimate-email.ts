import type { Handler } from '@netlify/functions';

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
  userName?: string;
  vehicle?: {
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
    rows?: EstimateRow[];
  };
  mockUrl?: string;
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

const buildVehicleName = (payload: EstimateEmailPayload) => {
  const vehicle = payload.vehicle ?? {};
  const pieces = [vehicle.year, vehicle.make, vehicle.model, vehicle.trim].filter(Boolean);
  if (pieces.length > 0) return pieces.join(' ');
  return `${vehicle.condition === 'used' ? 'Used' : 'New'} ${vehicle.bodyStyle || 'vehicle'}`;
};

const buildEmailHtml = (payload: EstimateEmailPayload) => {
  const vehicleName = buildVehicleName(payload);
  const firstName = payload.userName?.trim().split(/\s+/)[0] || 'there';
  const monthlyPayment = payload.estimate?.monthlyPayment || '$0/mo';
  const summary = payload.estimate?.summary || `Based on the current calculator assumptions for a ${vehicleName}.`;
  const rows = payload.estimate?.rows?.length ? payload.estimate.rows : [];
  const shopUrl = payload.vehicle?.shopUrl || 'https://www.caranddriver.com/cars-for-sale/';
  const mockUrl = payload.mockUrl || 'https://cd-mmp-2025.netlify.app/payment-estimate-email-mock.html';

  const rowMarkup = rows
    .map((row) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #d9e2e7;color:#24364a;font-size:15px;${row.emphasis ? 'font-weight:800;' : ''}">${escapeHtml(row.label)}</td>
        <td align="right" style="padding:12px 16px;border-bottom:1px solid #d9e2e7;color:#111827;font-size:15px;font-weight:800;${row.emphasis ? 'color:#1b6695;font-size:18px;' : ''}">${escapeHtml(row.value)}</td>
      </tr>
    `)
    .join('');

  return `<!doctype html>
<html>
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
                <p style="margin:0 0 10px;color:#1b6695;font-size:56px;font-weight:800;line-height:1;">${escapeHtml(monthlyPayment)}</p>
                <p style="margin:0 0 22px;color:#4b5563;font-size:16px;line-height:1.45;">${escapeHtml(summary)}</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;border:1px solid #d8e0e5;border-collapse:collapse;">
                  ${rowMarkup}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h2 style="margin:0 0 10px;color:#111827;font-size:22px;">Your next step</h2>
                <p style="margin:0 0 20px;color:#4b5563;font-size:15px;line-height:1.45;">Compare real listings that match this estimate before you talk numbers with a dealer.</p>
                <a href="${escapeHtml(shopUrl)}" style="display:block;padding:14px 18px;background:#1b6f9f;color:#ffffff;font-size:14px;font-weight:800;letter-spacing:.4px;text-align:center;text-decoration:none;text-transform:uppercase;">Shop matching cars</a>
                <p style="margin:20px 0 0;color:#4b5563;font-size:13px;line-height:1.45;">Preview mock: <a href="${escapeHtml(mockUrl)}" style="color:#005a8b;">${escapeHtml(mockUrl)}</a></p>
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

  const email = payload.email?.trim().toLowerCase() || '';
  if (!isEmail(email)) {
    return json(400, { error: 'Enter a valid email address.' });
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
