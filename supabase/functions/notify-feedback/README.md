# notify-feedback — email notifications for stakeholder feedback

A Supabase Edge Function that emails you whenever a new pin is submitted in the
SitePing feedback widget. Triggered by a Database Webhook on `INSERT` into
`public.siteping_feedback`. Uses [Resend](https://resend.com) for delivery.

## Flow

```
Stakeholder submits pin
  → row inserted into siteping_feedback
  → Database Webhook POSTs to /functions/v1/notify-feedback
  → Edge Function calls Resend API
  → you get an email with deep link to /admin/feedback
```

## Prerequisites

1. **Resend account** with an API key — sign up at https://resend.com, then
   _API Keys → Create API Key_. Give it `Sending access`. Copy the `re_...` key.
2. **Supabase CLI** installed locally (for the deploy step):
   ```bash
   brew install supabase/tap/supabase
   ```
3. Logged in to Supabase CLI:
   ```bash
   supabase login
   supabase link --project-ref <your-project-ref>
   ```
   (project-ref is the slug in your Supabase dashboard URL:
   `https://supabase.com/dashboard/project/<project-ref>`)

## Step 1 — Set secrets

Pick a random string for `WEBHOOK_SECRET` (e.g. `openssl rand -hex 32`). Then:

```bash
supabase secrets set \
  RESEND_API_KEY=re_your_real_key_here \
  NOTIFY_EMAIL=lenin_aviles@hotmail.com \
  WEBHOOK_SECRET=$(openssl rand -hex 32)
```

Verify:

```bash
supabase secrets list
```

You should see all three secrets (values hidden).

> **Tip:** `WEBHOOK_SECRET` prevents randos from hitting the function URL and
> spamming your inbox. You'll paste this same secret into the DB webhook in
> Step 3.

## Step 2 — Deploy the function

From the repo root:

```bash
supabase functions deploy notify-feedback
```

On success you'll see a URL like:

```
https://<project-ref>.supabase.co/functions/v1/notify-feedback
```

**Copy this URL — you need it for the webhook setup.**

## Step 3 — Create the Database Webhook

In the Supabase Dashboard:

1. Sidebar → **Database** → **Webhooks** → **Create a new hook**
2. Fill in:
   - **Name:** `notify-feedback-email`
   - **Table:** `siteping_feedback`
   - **Events:** check only `Insert`
   - **Type:** `HTTP Request`
   - **Method:** `POST`
   - **URL:** paste the Edge Function URL from Step 2
   - **HTTP Headers:**
     - `Content-Type` → `application/json`
     - `x-webhook-secret` → paste the same `WEBHOOK_SECRET` value from Step 1
3. Click **Create webhook**.

## Step 4 — Test it

From an incognito browser tab:

1. Visit `https://cd-mmp-2025.netlify.app/?review=1`
2. Click the feedback button, drop a pin, type a message, hit submit
3. Check `lenin_aviles@hotmail.com` — the email should arrive within a few
   seconds. If it goes to spam, mark as "Not spam" once.

## Troubleshooting

### "No email arrived"

1. Supabase Dashboard → **Database** → **Webhooks** → click the webhook →
   **Recent deliveries** tab. Look at the most recent delivery:
   - **Status 200** → webhook fired successfully, check spam folder
   - **Status 401** → `WEBHOOK_SECRET` mismatch (header vs secret)
   - **Status 500** → usually `RESEND_API_KEY` missing or invalid
   - **Status 502** → Resend rejected the email (check the response body)
2. Inspect function logs:
   ```bash
   supabase functions logs notify-feedback --tail
   ```

### "Resend error: 403 domain not verified"

The default `NOTIFY_FROM` uses `onboarding@resend.dev`, which works out of the
box. If you set a custom domain in `NOTIFY_FROM`, you must verify it in Resend
first (Domains → Add → add DNS records).

### "I want to change the recipient email"

```bash
supabase secrets set NOTIFY_EMAIL=new@email.com
```

No redeploy needed; secrets are read at function invocation.

### "I want to stop notifications temporarily"

In the Dashboard, toggle the webhook off under **Database → Webhooks**, or
delete the `RESEND_API_KEY` secret to fail the function.

## Local development

You can run the function locally with the Supabase CLI:

```bash
supabase functions serve notify-feedback --env-file supabase/.env.local
```

Create `supabase/.env.local` (git-ignored) with:

```
RESEND_API_KEY=re_...
NOTIFY_EMAIL=lenin_aviles@hotmail.com
WEBHOOK_SECRET=local-dev-secret
```

Then POST a test payload:

```bash
curl -X POST http://localhost:54321/functions/v1/notify-feedback \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: local-dev-secret" \
  -d '{
    "type": "INSERT",
    "table": "siteping_feedback",
    "schema": "public",
    "record": {
      "id": "00000000-0000-0000-0000-000000000001",
      "project_name": "cd-mmp-review",
      "type": "bug",
      "message": "Test notification from curl",
      "status": "open",
      "url": "https://cd-mmp-2025.netlify.app/",
      "viewport": "1440x900",
      "user_agent": "curl/8.0",
      "author_name": "Lenin",
      "author_email": "lenin_aviles@hotmail.com",
      "client_id": "test-client-1",
      "created_at": "2026-04-18T20:00:00Z"
    },
    "old_record": null
  }'
```
