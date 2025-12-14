import { test, expect } from '@playwright/test';

test.describe('Storybook Visual Tests', () => {
  test('should load the welcome page', async ({ page }) => {
    await page.goto('/?path=/story/introduction--welcome');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check that the Car and Driver logo is visible
    await expect(page.locator('svg').first()).toBeVisible();
    
    // Take a screenshot for visual comparison
    await expect(page).toHaveScreenshot('welcome-page.png');
  });

  test('should load the Button component', async ({ page }) => {
    await page.goto('/?path=/docs/atoms-button--docs');
    
    await page.waitForLoadState('networkidle');
    
    // Check that the docs are visible
    await expect(page.locator('h1')).toContainText('Button');
    
    await expect(page).toHaveScreenshot('button-docs.png');
  });
});

