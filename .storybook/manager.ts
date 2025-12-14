import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// Car and Driver Design System Theme
// Minimalist, elegant, focused on readability and legibility
const theme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'Car and Driver Design System',
  brandUrl: 'https://cd-mmp-2025.netlify.app/',
  brandImage: '/cd-logo.svg',
  brandTarget: '_blank',
  
  // Primary Colors - Blue Cobalt (no red for minimalism)
  colorPrimary: '#1B5F8A',        // Blue Cobalt - primary actions
  colorSecondary: '#1B5F8A',      // Blue Cobalt - secondary actions
  
  // UI Background Colors - Clean, minimal
  appBg: '#ffffff',               // Pure white sidebar for clarity
  appContentBg: '#fafafa',        // Subtle gray for content area
  appPreviewBg: '#ffffff',        // White preview background
  appBorderColor: '#e5e5e5',      // Light gray borders
  appBorderRadius: 4,             // Subtle rounded corners
  
  // Typography - Inter for maximum readability
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", monospace',
  
  // Text Colors - High contrast for readability
  textColor: '#1a1a1a',           // Near black for body text
  textInverseColor: '#ffffff',    // White on dark backgrounds
  textMutedColor: '#666666',      // Medium gray for secondary text
  
  // Toolbar - Clean, minimal chrome
  barTextColor: '#4a4a4a',        // Dark gray for toolbar text
  barHoverColor: '#1B5F8A',       // Blue Cobalt on hover
  barSelectedColor: '#1B5F8A',    // Blue Cobalt for selected
  barBg: '#ffffff',               // White toolbar background
  
  // Form Elements - Clean, accessible
  inputBg: '#ffffff',             // White input backgrounds
  inputBorder: '#cdcdcd',         // Visible borders for clarity
  inputTextColor: '#1a1a1a',      // Dark text in inputs
  inputBorderRadius: 4,           // Subtle rounded corners
  
  // Buttons
  buttonBg: '#1B5F8A',            // Blue Cobalt buttons
  buttonBorder: '#1B5F8A',        // Matching borders
  
  // Boolean (toggle switches)
  booleanBg: '#e5e5e5',           // Light gray background
  booleanSelectedBg: '#1B5F8A',   // Blue Cobalt when selected
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
    renderLabel: (item) => item.name,
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
  enableShortcuts: true,
});
