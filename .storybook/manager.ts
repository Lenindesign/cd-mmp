import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'Car and Driver',
  brandUrl: 'https://cd-mmp-2025.netlify.app/',
  brandImage: '/cd-logo.svg',
  brandTarget: '_blank',
  
  // Colors - using Car and Driver design system
  colorPrimary: '#1B5F8A',
  colorSecondary: '#1B5F8A',
  
  // UI
  appBg: '#fafafa',
  appContentBg: '#ffffff',
  appBorderColor: '#e5e5e5',
  appBorderRadius: 8,
  
  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  
  // Text colors
  textColor: '#000000',
  textInverseColor: '#ffffff',
  textMutedColor: '#666666',
  
  // Toolbar
  barTextColor: '#666666',
  barSelectedColor: '#1B5F8A',
  barHoverColor: '#1B5F8A',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e5e5e5',
  inputTextColor: '#000000',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
});
