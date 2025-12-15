# Chromatic Visual Testing - Quick Start

## 🚀 5-Minute Setup

### Step 1: Sign Up (2 minutes)
1. Go to https://www.chromatic.com/
2. Click "Sign in with GitHub"
3. Select your repository: `Lenindesign/cd-mmp`
4. Copy your project token (starts with `chpt_...`)

### Step 2: Run First Build (2 minutes)
```bash
cd /Users/leninaviles/Desktop/apps/mmp
npx chromatic --project-token=YOUR_TOKEN_HERE
```

This creates your baseline - all screenshots are automatically accepted.

### Step 3: Add to GitHub Secrets (1 minute)
1. Go to https://github.com/Lenindesign/cd-mmp/settings/secrets/actions
2. Click "New repository secret"
3. Name: `CHROMATIC_PROJECT_TOKEN`
4. Value: Your token from Step 1
5. Click "Add secret"

**Done!** 🎉 Now every PR will automatically run visual tests.

---

## 📊 How It Works

### Automatic Testing
- **Every Push to Main**: Chromatic runs and updates baseline
- **Every Pull Request**: Chromatic compares changes to baseline
- **Visual Differences**: You review and approve/reject in Chromatic UI

### What Gets Tested
- All Storybook stories
- 4 viewports: Mobile (375px), Tablet (768px), Desktop (1280px), Wide (1920px)
- Every component state (default, hover, error, etc.)

---

## 🎯 Daily Workflow

### Making Component Changes

1. **Make your changes** to a component
   ```bash
   git checkout -b feature/update-button
   # Edit src/components/Button/Button.tsx
   ```

2. **Test locally** in Storybook
   ```bash
   npm run storybook
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "Update button styles"
   git push origin feature/update-button
   ```

4. **Create Pull Request** on GitHub

5. **Chromatic runs automatically**
   - Check the "Chromatic" status in your PR
   - Click "Details" to see visual changes

6. **Review Changes in Chromatic**
   - Green ✅ = No visual changes
   - Yellow ⚠️ = Visual changes detected
   - Click to see before/after comparison

7. **Accept or Reject**
   - **Accept**: Changes are intentional (new design)
   - **Reject**: Changes are bugs (fix them)

8. **Merge PR** once approved

---

## 🔍 Reviewing Visual Changes

### In Chromatic Dashboard

1. Click "Details" on the Chromatic check in your PR
2. You'll see a list of changed stories
3. Click any story to see:
   - **Before** (baseline)
   - **After** (your changes)
   - **Diff** (highlighted differences)
4. Click ✅ **Accept** or ❌ **Deny**

### Example: Button Color Change

```
Before: Blue button (#186CEA)
After:  Red button (#E90C17)
Diff:   Entire button highlighted
```

**If intentional**: Click ✅ Accept (becomes new baseline)  
**If bug**: Click ❌ Deny (fix the code)

---

## 📈 Chromatic Dashboard

Access your dashboard: https://www.chromatic.com/builds

### What You'll See
- **Builds**: Every Chromatic run
- **Changes**: Visual differences detected
- **Coverage**: How many components tested
- **History**: Timeline of all changes

### Key Metrics
- **Snapshots**: Total screenshots captured
- **Changes**: Components with visual differences
- **Accepted**: Changes you approved
- **Denied**: Changes you rejected

---

## 💡 Pro Tips

### 1. Run Locally Before Pushing
```bash
npm run chromatic
```
Catch visual issues before creating a PR.

### 2. Ignore Flaky Stories
If a story has random differences (animations, dates), add to `.chromatic.yml`:
```yaml
ignorePatterns:
  - "**/FlakyComponent.stories.tsx"
```

### 3. Test Specific Stories
```bash
npx chromatic --only-story-names="Button/*"
```
Only test Button stories (faster for debugging).

### 4. Skip Chromatic on Docs Changes
Add `[skip chromatic]` to your commit message:
```bash
git commit -m "Update README [skip chromatic]"
```

### 5. View Build Locally
After running Chromatic, it gives you a URL like:
```
View build details at https://www.chromatic.com/build?appId=...
```
Click it to see results immediately.

---

## 🐛 Troubleshooting

### "No stories found"
**Fix**: Make sure Storybook builds successfully first
```bash
npm run build-storybook
```

### "Build failed"
**Check**:
1. All dependencies installed: `npm install`
2. No TypeScript errors: `npm run lint`
3. Storybook runs locally: `npm run storybook`

### "Too many snapshots"
**Solution**: You're on the free tier (5,000 snapshots/month)
- Reduce stories
- Ignore test stories
- Upgrade to Pro plan

### "Visual differences but nothing changed"
**Causes**:
- Font rendering differences
- Animation timing
- Dynamic content (dates, random data)

**Fix**: Use consistent mock data in stories

---

## 📚 Resources

- **Chromatic Docs**: https://www.chromatic.com/docs/
- **Your Dashboard**: https://www.chromatic.com/builds
- **Storybook Integration**: https://storybook.js.org/docs/sharing/publish-storybook#chromatic
- **Full Setup Guide**: See `CHROMATIC_SETUP.md` in this repo

---

## ✅ Checklist

- [ ] Signed up for Chromatic
- [ ] Linked GitHub repository
- [ ] Copied project token
- [ ] Ran first build locally
- [ ] Added token to GitHub Secrets
- [ ] Pushed GitHub Actions workflow
- [ ] Created a test PR to verify it works

**Once all checked, you're ready to catch visual bugs automatically!** 🎉

