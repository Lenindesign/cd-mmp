const ignoredSiteNames = new Set(['cd-design-system']);

const siteName = process.env.SITE_NAME ?? '';

if (ignoredSiteNames.has(siteName)) {
  console.log(`Skipping Netlify build for ${siteName}. Production app deploys from cd-mmp-2025.`);
  process.exit(0);
}

console.log(`Continuing Netlify build${siteName ? ` for ${siteName}` : ''}.`);
process.exit(1);
