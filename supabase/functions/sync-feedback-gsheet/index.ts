// =============================================================================
// Edge Function: sync-feedback-gsheet
// =============================================================================
// Triggered by a Supabase Database Webhook on INSERT or UPDATE into
// `public.siteping_feedback`. Appends new rows and patches status changes in a
// shared Google Sheet so stakeholders always have a live spreadsheet view.
//
// Secrets expected (set via `supabase secrets set ...` or the Dashboard):
//   GOOGLE_SERVICE_ACCOUNT_JSON — full JSON key for a GCP service account
//   GOOGLE_SHEET_ID             — the spreadsheet ID (from the URL)
//   WEBHOOK_SECRET              — shared secret (reuse the same one from
//                                 notify-feedback or generate a new one)
// =============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeedbackRow {
  id: string;
  project_name: string;
  type: "question" | "change" | "bug" | "other";
  message: string;
  status: string;
  url: string;
  viewport: string;
  user_agent: string;
  author_name: string;
  author_email: string;
  client_id: string;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: FeedbackRow | null;
  old_record: FeedbackRow | null;
}

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
  token_uri: string;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");
const GOOGLE_SHEET_ID = Deno.env.get("GOOGLE_SHEET_ID");
const SHEET_NAME = Deno.env.get("GOOGLE_SHEET_NAME") ?? "Feedback";

let serviceAccount: ServiceAccountKey | null = null;
try {
  const raw = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
  if (raw) serviceAccount = JSON.parse(raw);
} catch {
  console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON");
}

const TYPE_LABELS: Record<string, string> = {
  question: "Question",
  change: "Change request",
  bug: "Bug report",
  other: "Note",
};

// ---------------------------------------------------------------------------
// Google Auth — JWT-based service account token exchange
// ---------------------------------------------------------------------------

function base64url(data: Uint8Array): string {
  return btoa(String.fromCharCode(...data))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function createSignedJwt(sa: ServiceAccountKey): Promise<string> {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: sa.token_uri,
    iat: now,
    exp: now + 3600,
  };

  const enc = new TextEncoder();
  const headerB64 = base64url(enc.encode(JSON.stringify(header)));
  const claimB64 = base64url(enc.encode(JSON.stringify(claim)));
  const unsignedToken = `${headerB64}.${claimB64}`;

  // Import the PEM private key
  const pemBody = sa.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const keyBytes = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = new Uint8Array(
    await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, enc.encode(unsignedToken)),
  );

  return `${unsignedToken}.${base64url(signature)}`;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(sa: ServiceAccountKey): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const jwt = await createSignedJwt(sa);
  const res = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Token exchange failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return cachedToken.token;
}

// ---------------------------------------------------------------------------
// Google Sheets helpers
// ---------------------------------------------------------------------------

const SHEETS_BASE = "https://sheets.googleapis.com/v4/spreadsheets";

async function sheetsRequest(
  token: string,
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const url = `${SHEETS_BASE}/${GOOGLE_SHEET_ID}${path}`;
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
}

async function ensureHeaderRow(token: string): Promise<void> {
  const range = encodeURIComponent(`${SHEET_NAME}!A1:J1`);
  const res = await sheetsRequest(token, `/values/${range}`);
  const data = await res.json();

  if (data.values && data.values.length > 0 && data.values[0].length >= 8) {
    return; // headers already exist
  }

  const headers = [
    "ID",
    "Timestamp",
    "Type",
    "Status",
    "Author",
    "Email",
    "Page URL",
    "Comment",
    "Viewport",
    "Updated At",
  ];

  await sheetsRequest(
    token,
    `/values/${range}?valueInputOption=RAW`,
    {
      method: "PUT",
      body: JSON.stringify({ values: [headers] }),
    },
  );
}

function formatRow(record: FeedbackRow): string[] {
  const typeLabel = TYPE_LABELS[record.type] ?? record.type;
  const author = record.author_name?.trim() || "Anonymous";
  const timestamp = new Date(record.created_at).toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const updatedAt = new Date(record.updated_at).toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return [
    record.id,
    timestamp,
    typeLabel,
    record.status.charAt(0).toUpperCase() + record.status.slice(1),
    author,
    record.author_email || "",
    record.url,
    record.message,
    record.viewport,
    updatedAt,
  ];
}

async function appendRow(token: string, record: FeedbackRow): Promise<void> {
  const range = encodeURIComponent(`${SHEET_NAME}!A:J`);
  const row = formatRow(record);

  const res = await sheetsRequest(
    token,
    `/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      body: JSON.stringify({ values: [row] }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets append failed (${res.status}): ${body}`);
  }
}

async function findRowById(
  token: string,
  feedbackId: string,
): Promise<number | null> {
  const range = encodeURIComponent(`${SHEET_NAME}!A:A`);
  const res = await sheetsRequest(token, `/values/${range}`);
  const data = await res.json();

  if (!data.values) return null;

  for (let i = 0; i < data.values.length; i++) {
    if (data.values[i][0] === feedbackId) {
      return i + 1; // 1-indexed row number
    }
  }
  return null;
}

async function updateRow(
  token: string,
  rowNumber: number,
  record: FeedbackRow,
): Promise<void> {
  const range = encodeURIComponent(`${SHEET_NAME}!A${rowNumber}:J${rowNumber}`);
  const row = formatRow(record);

  const res = await sheetsRequest(
    token,
    `/values/${range}?valueInputOption=RAW`,
    {
      method: "PUT",
      body: JSON.stringify({ values: [row] }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets update failed (${res.status}): ${body}`);
  }
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (WEBHOOK_SECRET) {
    const header =
      req.headers.get("x-webhook-secret") ??
      req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
      "";
    if (header !== WEBHOOK_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  if (!serviceAccount) {
    console.error("Missing or invalid GOOGLE_SERVICE_ACCOUNT_JSON secret");
    return new Response("Server misconfigured: missing GOOGLE_SERVICE_ACCOUNT_JSON", {
      status: 500,
    });
  }

  if (!GOOGLE_SHEET_ID) {
    console.error("Missing GOOGLE_SHEET_ID secret");
    return new Response("Server misconfigured: missing GOOGLE_SHEET_ID", {
      status: 500,
    });
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  if (payload.table !== "siteping_feedback" || !payload.record) {
    return new Response(
      JSON.stringify({ ok: true, skipped: "irrelevant-event" }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  }

  try {
    const token = await getAccessToken(serviceAccount);

    if (payload.type === "INSERT") {
      await ensureHeaderRow(token);
      await appendRow(token, payload.record);
      return new Response(
        JSON.stringify({ ok: true, action: "appended" }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }

    if (payload.type === "UPDATE") {
      const rowNumber = await findRowById(token, payload.record.id);
      if (rowNumber) {
        await updateRow(token, rowNumber, payload.record);
        return new Response(
          JSON.stringify({ ok: true, action: "updated", row: rowNumber }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      // Row not found in sheet — append it as a new entry
      await ensureHeaderRow(token);
      await appendRow(token, payload.record);
      return new Response(
        JSON.stringify({ ok: true, action: "appended-missing" }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ ok: true, skipped: payload.type }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("sync-feedback-gsheet error:", message);
    return new Response(`Google Sheets sync error: ${message}`, { status: 502 });
  }
});
