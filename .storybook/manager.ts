import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// Car and Driver Design System Theme
// Minimalist, elegant, prioritizing readability and legibility
const theme = create({
  base: 'light',
  
  // Brand Identity
  brandTitle: 'Car and Driver Design System',
  brandUrl: 'https://cd-mmp-2025.netlify.app/',
  brandImage: '/cd-logo.svg',
  brandTarget: '_blank',
  
  // Primary Colors - Blue Cobalt (no red for minimalism)
  colorPrimary: '#1B5F8A',        // Blue Cobalt - primary actions
  colorSecondary: '#1B5F8A',      // Blue Cobalt - secondary actions
  
  // UI Background Colors - Clean, minimal palette
  appBg: '#ffffff',               // Pure white sidebar for clarity
  appContentBg: '#fafafa',        // Subtle gray for content area
  appPreviewBg: '#ffffff',        // White preview background
  appBorderColor: '#e5e5e5',      // Light gray borders
  appBorderRadius: 4,             // Subtle rounded corners
  
  // Typography - Inter for maximum readability
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", monospace',
  
  // Text Colors - High contrast for legibility
  textColor: '#1a1a1a',           // Near-black for body text
  textInverseColor: '#ffffff',    // White text on dark backgrounds
  textMutedColor: '#666666',      // Muted gray for secondary text
  
  // Toolbar Colors - Clean, professional
  barTextColor: '#4a4a4a',        // Dark gray for toolbar text
  barSelectedColor: '#1B5F8A',    // Blue Cobalt for selected items
  barHoverColor: '#1B5F8A',       // Blue Cobalt on hover
  barBg: '#ffffff',               // White toolbar background
  
  // Button Colors
  buttonBg: '#1B5F8A',            // Blue Cobalt buttons
  buttonBorder: '#1B5F8A',        // Matching border
  booleanBg: '#e5e5e5',           // Light gray for boolean controls
  booleanSelectedBg: '#1B5F8A',   // Blue Cobalt when selected
  
  // Input Colors - Clean, accessible
  inputBg: '#ffffff',             // White input backgrounds
  inputBorder: '#cdcdcd',         // Medium gray borders
  inputTextColor: '#1a1a1a',      // Dark text in inputs
  inputBorderRadius: 4,           // Subtle rounded corners
  
  // Grid Colors
  gridCellSize: 8,                // 8px grid system
});

addons.setConfig({
  theme,
  
  // Sidebar Configuration
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
    renderLabel: (item) => item.name,
  },
  
  // Toolbar Configuration - Minimal, essential tools only
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
  
  // Panel Configuration
  showPanel: true,
  panelPosition: 'bottom',
  
  // Enable keyboard shortcuts
  enableShortcuts: true,
  
  // Initial active panel
  selectedPanel: 'storybook/controls/panel',
});
