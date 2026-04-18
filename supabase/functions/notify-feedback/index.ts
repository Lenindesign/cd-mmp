// =============================================================================
// Edge Function: notify-feedback
// =============================================================================
// Triggered by a Supabase Database Webhook when a new row is inserted into
// `public.siteping_feedback`. Sends an email via Resend so stakeholders'
// feedback lands in the project owner's inbox in real time.
//
// Secrets expected (set via `supabase secrets set ...` or the Dashboard):
//   RESEND_API_KEY   — Resend API key, starts with `re_...`
//   NOTIFY_EMAIL     — Recipient address (e.g. lenin_aviles@hotmail.com)
//   WEBHOOK_SECRET   — Shared secret; the DB webhook must send it as
//                      `x-webhook-secret` or `Authorization: Bearer <secret>`
//   NOTIFY_FROM      — Optional. Defaults to the Resend shared sender.
//   ADMIN_URL        — Optional. Defaults to the Netlify admin dashboard.
// =============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
  created_at: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: FeedbackRow | null;
  old_record: FeedbackRow | null;
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") ?? "lenin_aviles@hotmail.com";
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");
const ADMIN_URL =
  Deno.env.get("ADMIN_URL") ?? "https://cd-mmp-2025.netlify.app/admin/feedback";
const FROM_ADDRESS =
  Deno.env.get("NOTIFY_FROM") ?? "cd-mmp feedback <onboarding@resend.dev>";

const TYPE_LABELS: Record<string, string> = {
  question: "Question",
  change: "Change request",
  bug: "Bug report",
  other: "Note",
};

const TYPE_EMOJI: Record<string, string> = {
  question: "❓",
  change: "✏️",
  bug: "🐛",
  other: "💬",
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(record: FeedbackRow) {
  const typeLabel = TYPE_LABELS[record.type] ?? record.type;
  const emoji = TYPE_EMOJI[record.type] ?? "💬";
  const author =
    record.author_name?.trim() ||
    record.author_email?.trim() ||
    "Anonymous reviewer";

  const authorEmailHtml = record.author_email
    ? `<a href="mailto:${escapeHtml(record.author_email)}" style="color:#1B5F8A;text-decoration:none;">${escapeHtml(record.author_email)}</a>`
    : "";

  const subject = `${emoji} [cd-mmp review] ${typeLabel} from ${author}`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;padding:16px;">
      <div style="padding:28px;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb;">
        <div style="display:inline-block;padding:4px 12px;background:#1B5F8A;color:#ffffff;border-radius:999px;font-size:12px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;">
          ${emoji}&nbsp; ${escapeHtml(typeLabel)}
        </div>
        <h2 style="margin:18px 0 0;font-size:20px;line-height:1.35;font-weight:600;">${escapeHtml(record.message)}</h2>
        <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e7eb;font-size:14px;line-height:1.7;color:#4b5563;">
          <div><strong style="color:#1a1a1a;">From:</strong> ${escapeHtml(author)} ${authorEmailHtml ? `(${authorEmailHtml})` : ""}</div>
          <div><strong style="color:#1a1a1a;">Page:</strong> <a href="${escapeHtml(record.url)}" style="color:#1B5F8A;word-break:break-all;">${escapeHtml(record.url)}</a></div>
          <div><strong style="color:#1a1a1a;">Viewport:</strong> ${escapeHtml(record.viewport)}</div>
        </div>
        <div style="margin-top:28px;text-align:center;">
          <a href="${escapeHtml(ADMIN_URL)}" style="display:inline-block;padding:12px 24px;background:#1B5F8A;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
            Open admin dashboard →
          </a>
        </div>
      </div>
      <p style="margin-top:16px;font-size:12px;color:#9ca3af;text-align:center;">
        You're receiving this because you own the cd-mmp feedback inbox. Reply to this email to respond to the reviewer directly.
      </p>
    </div>
  `;

  const text = [
    `${typeLabel.toUpperCase()} from ${author}`,
    "",
    record.message,
    "",
    `Page:      ${record.url}`,
    `Viewport:  ${record.viewport}`,
    record.author_email ? `Reply:     ${record.author_email}` : "",
    "",
    `Manage all feedback: ${ADMIN_URL}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Shared-secret auth so random folks can't POST to this function and spam email
  if (WEBHOOK_SECRET) {
    const header =
      req.headers.get("x-webhook-secret") ??
      req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
      "";
    if (header !== WEBHOOK_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  if (!RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY secret");
    return new Response("Server misconfigured: missing RESEND_API_KEY", {
      status: 500,
    });
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  if (
    payload.type !== "INSERT" ||
    payload.table !== "siteping_feedback" ||
    !payload.record
  ) {
    return new Response(
      JSON.stringify({ ok: true, skipped: "not-an-insert" }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  }

  const { subject, html, text } = buildEmail(payload.record);

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [NOTIFY_EMAIL],
      subject,
      html,
      text,
      reply_to: payload.record.author_email || undefined,
    }),
  });

  if (!resendRes.ok) {
    const body = await resendRes.text();
    console.error("Resend API error", resendRes.status, body);
    return new Response(`Resend error: ${resendRes.status} ${body}`, {
      status: 502,
    });
  }

  const data = await resendRes.json().catch(() => ({}));
  return new Response(JSON.stringify({ ok: true, resend: data }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
});
