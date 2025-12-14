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

  test('should load the Button component story', async ({ page }) => {
    await page.goto('/?path=/story/atoms-button--primary');
    
    await page.waitForLoadState('networkidle');
    
    // Check that the button is visible in the canvas
    await expect(page.frameLocator('#storybook-preview-iframe').locator('button')).toBeVisible();
    
    await expect(page).toHaveScreenshot('button-primary.png');
  });

  test('should load the TextField component', async ({ page }) => {
    await page.goto('/?path=/story/atoms-textfield--default');
    
    await page.waitForLoadState('networkidle');
    
    // Check that the input is visible
    await expect(page.frameLocator('#storybook-preview-iframe').locator('input')).toBeVisible();
    
    await expect(page).toHaveScreenshot('textfield-default.png');
  });

  test('should load the Hero component', async ({ page }) => {
    await page.goto('/?path=/story/organisms-hero--default');
    
    await page.waitForLoadState('networkidle');
    
    // Check that the hero section is visible
    await expect(page.frameLocator('#storybook-preview-iframe').locator('.hero')).toBeVisible();
    
    await expect(page).toHaveScreenshot('hero-default.png');
  });
});
