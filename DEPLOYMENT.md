# Deployment Guide

This project has two separate deployable targets: the **main application** (Netlify) and **Storybook** (GitHub Pages). By default, "deploy" means the main production application only. Deploy Storybook only when explicitly requested.

---

## Main Application (Netlify)

**Production URL:** `https://cd-mmp-2025.netlify.app`

### How it works

Netlify is connected to the `main` branch. Every push to `main` triggers an automatic build and deploy.

Configuration lives in `netlify.toml`:

- **Build command:** `npm run build` (runs `tsc -b && vite build`)
- **Publish directory:** `dist`
- **Node version:** 20
- **Serverless functions:** `netlify/functions/` (bundled with esbuild)
- **Build guard:** `netlify.toml` skips the legacy `cd-design-system` Netlify site by name
- **SPA fallback:** All routes redirect to `/index.html` (200)

The legacy Netlify site named `cd-design-system` is intentionally ignored by `netlify.toml` so pushes to `main` do not publish the app there. The production app site is `cd-mmp-2025`.

### Deploy steps

```bash
# 1. Stage your changes
git add .

# 2. Commit
git commit -m "your commit message"

# 3. Push to main — this triggers the Netlify build
git push origin main
```

Netlify will automatically:
1. Install dependencies (`npm ci`)
2. Run `npm run build`
3. Deploy the `dist` folder
4. Bundle and deploy serverless functions from `netlify/functions/`

### Monitoring the deploy

- Check build status in the [Netlify dashboard](https://app.netlify.com)
- Build logs show install, build, and function bundling steps
- Deploys typically complete in 1–2 minutes

### Rollback

Use the Netlify dashboard to roll back to a previous deploy if needed. Every successful build is kept as an immutable snapshot.

---

## Storybook (GitHub Pages)

**Production URL:** `https://lenindesign.github.io/cd-mmp/`

### Manual only

The GitHub Action at `.github/workflows/deploy-storybook.yml` is manual-only. It should not run on every production deploy.

Use the GitHub Actions `workflow_dispatch` trigger or run:

```bash
npm run deploy-storybook
```

This runs `storybook build` then publishes `storybook-static/` to the `gh-pages` branch via `gh-pages`.

---

## Chromatic (Visual Regression)

Chromatic is manual-only via `.github/workflows/chromatic.yml`. It is not a user-facing deploy; it captures visual snapshots for review when explicitly triggered.

Manual trigger:

```bash
npm run chromatic
```

Requires `CHROMATIC_PROJECT_TOKEN` to be set.

---

## Quick Reference

| Target       | Trigger              | Command                        | URL                                          |
|--------------|----------------------|--------------------------------|----------------------------------------------|
| App          | Push to `main`       | `git push origin main`         | `https://cd-mmp-2025.netlify.app`            |
| Storybook    | Manual only          | `npm run deploy-storybook`     | `https://lenindesign.github.io/cd-mmp/`      |
| Chromatic    | Manual only          | `npm run chromatic`            | Chromatic dashboard                          |
