# sync-feedback-gsheet — sync stakeholder feedback to Google Sheets

A Supabase Edge Function that keeps a Google Sheet in sync with the
`siteping_feedback` table. Every new comment appears as a row; status changes
(open → resolved) update the existing row in place.

## Flow

```
Stakeholder submits pin
  → row inserted into siteping_feedback
  → Database Webhook POSTs to /functions/v1/sync-feedback-gsheet
  → Edge Function authenticates via Service Account
  → appends a row to the Google Sheet

Feedback resolved in admin
  → row updated in siteping_feedback
  → Database Webhook POSTs to /functions/v1/sync-feedback-gsheet
  → Edge Function finds the row by ID and patches the Status column
```

## Sheet columns

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| ID | Timestamp | Type | Status | Author | Email | Page URL | Comment | Viewport | Updated At |

The header row is auto-created on the first insert.

## Prerequisites

1. **Google Cloud project** with the Sheets API enabled
2. **Service Account** with a JSON key (see Step 1 below)
3. **Google Sheet** shared with the service account email
4. **Supabase CLI** installed and linked to your project

## Step 1 — Create a Google Service Account

1. Go to [Google Cloud Console → IAM → Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Select your project (or create one)
3. Click **Create Service Account**
   - Name: `cd-mmp-feedback-sync` (or anything)
   - Click **Done** (no extra roles needed)
4. Click the newly created account → **Keys** tab → **Add Key → Create new key → JSON**
5. A `.json` file downloads — this is your service account key

**Enable the Sheets API:**
1. Go to [APIs & Services → Library](https://console.cloud.google.com/apis/library)
2. Search for "Google Sheets API" → click **Enable**

## Step 2 — Create and share the Google Sheet

1. Create a new Google Sheet (or use an existing one)
2. Name the first tab **Feedback** (or set `GOOGLE_SHEET_NAME` to match your tab name)
3. Copy the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
   ```
4. Click **Share** → add the service account email
   (e.g. `cd-mmp-feedback-sync@your-project.iam.gserviceaccount.com`)
   with **Editor** access

## Step 3 — Set Supabase secrets

```bash
# Paste the entire JSON key as a single-line string
supabase secrets set \
  GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...@....iam.gserviceaccount.com","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}' \
  GOOGLE_SHEET_ID=your_sheet_id_here
```

If you haven't set `WEBHOOK_SECRET` yet (it's shared with `notify-feedback`):

```bash
supabase secrets set WEBHOOK_SECRET=$(openssl rand -hex 32)
```

Optional:

```bash
# If your tab isn't called "Feedback"
supabase secrets set GOOGLE_SHEET_NAME="My Custom Tab Name"
```

Verify:

```bash
supabase secrets list
```

## Step 4 — Deploy the function

```bash
supabase functions deploy sync-feedback-gsheet
```

Copy the URL from the output:

```
https://<project-ref>.supabase.co/functions/v1/sync-feedback-gsheet
```

## Step 5 — Create the Database Webhook

In the Supabase Dashboard:

1. Sidebar → **Database** → **Webhooks** → **Create a new hook**
2. Fill in:
   - **Name:** `sync-feedback-gsheet`
   - **Table:** `siteping_feedback`
   - **Events:** check **Insert** and **Update**
   - **Type:** `HTTP Request`
   - **Method:** `POST`
   - **URL:** paste the Edge Function URL from Step 4
   - **HTTP Headers:**
     - `Content-Type` → `application/json`
     - `x-webhook-secret` → paste your `WEBHOOK_SECRET` value
3. Click **Create webhook**

## Step 6 — Test it

1. Visit `https://cd-mmp-2025.netlify.app/?review=1`
2. Drop a pin and submit a comment
3. Open your Google Sheet — the row should appear within a few seconds
4. In the admin (`/admin/feedback`), resolve the feedback
5. The sheet row's **Status** and **Updated At** columns should update

## Troubleshooting

### "Row not appearing in the sheet"

1. Check the webhook delivery in **Database → Webhooks → Recent deliveries**
   - **401** → `WEBHOOK_SECRET` mismatch
   - **500** → missing `GOOGLE_SERVICE_ACCOUNT_JSON` or `GOOGLE_SHEET_ID`
   - **502** → Google API error (check function logs)
2. Check function logs:
   ```bash
   supabase functions logs sync-feedback-gsheet --tail
   ```

### "403 from Google Sheets API"

- Make sure the Sheets API is enabled in your GCP project
- Make sure the sheet is shared with the service account email as **Editor**

### "Token exchange failed"

- The service account JSON may be malformed. Re-download the key and set the secret again
- Make sure you're pasting the entire JSON (including `-----BEGIN PRIVATE KEY-----`)

## Local development

```bash
supabase functions serve sync-feedback-gsheet --env-file supabase/.env.local
```

Add to `supabase/.env.local`:

```
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
GOOGLE_SHEET_ID=your_sheet_id
WEBHOOK_SECRET=local-dev-secret
```

Test with curl:

```bash
curl -X POST http://localhost:54321/functions/v1/sync-feedback-gsheet \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: local-dev-secret" \
  -d '{
    "type": "INSERT",
    "table": "siteping_feedback",
    "schema": "public",
    "record": {
      "id": "00000000-0000-0000-0000-000000000099",
      "project_name": "cd-mmp-review",
      "type": "change",
      "message": "Test row from curl — Google Sheets sync",
      "status": "open",
      "url": "https://cd-mmp-2025.netlify.app/toyota/camry",
      "viewport": "1440x900",
      "user_agent": "curl/8.0",
      "author_name": "Lenin",
      "author_email": "lenin_aviles@hotmail.com",
      "client_id": "test-gsheet-1",
      "resolved_at": null,
      "created_at": "2026-04-20T15:00:00Z",
      "updated_at": "2026-04-20T15:00:00Z"
    },
    "old_record": null
  }'
```
