# Chromatic Visual Testing Setup

## 🎨 What is Chromatic?

Chromatic is a visual regression testing tool that captures screenshots of your Storybook components and compares them across builds to catch unintended visual changes.

## 🚀 Getting Started

### 1. Create a Chromatic Account

1. Go to [chromatic.com](https://www.chromatic.com/)
2. Sign up with your GitHub account
3. Link your `cd-mmp` repository

### 2. Get Your Project Token

After linking your repository, Chromatic will provide a project token. You'll need this for authentication.

### 3. Run Chromatic Locally

```bash
# Install Chromatic CLI (already installed in package.json)
npm install --save-dev chromatic

# Run Chromatic with your project token
npx chromatic --project-token=<your-project-token>
```

### 4. Add to GitHub Actions

Create `.github/workflows/chromatic.yml`:

```yaml
name: Chromatic Visual Tests

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Required for Chromatic

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          buildScriptName: 'build-storybook'
          autoAcceptChanges: 'main'  # Auto-approve changes on main branch
          exitZeroOnChanges: true     # Don't fail CI on visual changes
```

### 5. Add Project Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `CHROMATIC_PROJECT_TOKEN`
5. Value: Your Chromatic project token
6. Click "Add secret"

## 📊 How It Works

### First Run (Baseline)
```bash
npx chromatic --project-token=<token>
```
- Captures screenshots of all Storybook stories
- Creates a baseline for future comparisons
- All changes are automatically accepted

### Subsequent Runs
```bash
npx chromatic --project-token=<token>
```
- Captures new screenshots
- Compares with previous baseline
- Highlights visual differences
- You review and accept/reject changes

## 🎯 Best Practices

### 1. Review Changes Before Merging
- Always check the Chromatic build report in PRs
- Review visual diffs carefully
- Accept intentional changes, reject bugs

### 2. Use Chromatic for Component Changes
- Run Chromatic when modifying CSS
- Run when changing component structure
- Run when updating design tokens

### 3. Ignore Flaky Tests
Add to `.chromatic.yml` if certain stories are flaky:
```yaml
ignorePatterns:
  - "**/FlakeyComponent.stories.tsx"
```

### 4. Test Responsive Designs
Chromatic automatically tests all viewports defined in `.chromatic.yml`:
- Mobile (375px)
- Tablet (768px)
- Desktop (1280px)
- Wide (1920px)

## 🔧 Configuration

### `.chromatic.yml` Options

```yaml
# Project ID (get from chromatic.com)
projectId: "your-project-id"

# Build command
buildScriptName: "build-storybook"

# Branch pattern for testing
branchPattern: "main|develop|feature/*"

# Ignore specific stories
ignorePatterns:
  - "**/*.test.stories.tsx"

# Viewports for responsive testing
viewports:
  - name: "Mobile"
    width: 375
    height: 667

# Visual change threshold (in pixels)
threshold: 0.2

# Auto-accept changes on main branch
autoAcceptChanges: "main"

# Enable TurboSnap for faster builds
turboSnap: true
```

## 📈 Monitoring

### Chromatic Dashboard
- View all builds: [chromatic.com/builds](https://www.chromatic.com/builds)
- See visual diffs
- Track component changes over time
- Monitor test coverage

### GitHub PR Checks
- Chromatic adds a check to each PR
- Click "Details" to see visual changes
- Review and approve directly from PR

## 🐛 Troubleshooting

### Build Fails with "No stories found"
```bash
# Make sure Storybook builds successfully first
npm run build-storybook
```

### Screenshots Look Different Locally
- Chromatic uses a consistent browser environment
- Local screenshots may differ slightly
- Trust the Chromatic screenshots as source of truth

### Too Many False Positives
- Increase `threshold` in `.chromatic.yml`
- Add animations to ignore list
- Use `chromatic-ignore` in stories

### Slow Builds
- Enable `turboSnap: true` in config
- Only test changed components
- Reduce number of viewports if needed

## 💰 Pricing

- **Free Tier**: 5,000 snapshots/month
- **Pro**: Unlimited snapshots, $149/month
- **Enterprise**: Custom pricing

For Car and Driver's design system, the free tier should be sufficient for initial setup.

## 📚 Resources

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Storybook + Chromatic Guide](https://storybook.js.org/docs/sharing/publish-storybook#chromatic)
- [Visual Testing Best Practices](https://www.chromatic.com/docs/visual-testing-best-practices)

## 🎉 Next Steps

1. Sign up for Chromatic
2. Get your project token
3. Run first build: `npx chromatic --project-token=<token>`
4. Add GitHub Action for automated testing
5. Review visual changes in PRs
6. Maintain visual consistency across the design system!

