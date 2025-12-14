import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// Car and Driver logo as data URI
const carAndDriverLogo = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 20" fill="#000000">
  <text x="0" y="16" font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="14" letter-spacing="0.5">CAR AND DRIVER</text>
</svg>
`)}`;

const theme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'Car and Driver',
  brandUrl: 'https://cd-mmp-2025.netlify.app/',
  brandImage: carAndDriverLogo,
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
