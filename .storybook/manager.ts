import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'Car and Driver Design System',
  brandUrl: 'https://cd-mmp-2025.netlify.app/',
  brandImage: 'https://www.caranddriver.com/graphics/images/svg/car-and-driver-logo.svg',
  brandTarget: '_blank',
  
  // Colors - using Car and Driver design system
  colorPrimary: '#1B5F8A',      // Blue Cobalt
  colorSecondary: '#1B5F8A',    // Blue Cobalt
  
  // UI
  appBg: '#fafafa',             // gray-50
  appContentBg: '#ffffff',      // white
  appBorderColor: '#e5e5e5',    // gray-200
  appBorderRadius: 8,
  
  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  
  // Text colors
  textColor: '#000000',         // black
  textInverseColor: '#ffffff',  // white
  textMutedColor: '#666666',    // gray-600
  
  // Toolbar
  barTextColor: '#666666',      // gray-600
  barSelectedColor: '#1B5F8A',  // Blue Cobalt
  barHoverColor: '#1B5F8A',     // Blue Cobalt
  barBg: '#ffffff',             // white
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e5e5e5',       // gray-200
  inputTextColor: '#000000',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
});

