import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Car and Driver Design System',
  brandUrl: '/',
  brandTarget: '_self',
  
  // UI colors
  colorPrimary: '#1B5F8A',
  colorSecondary: '#1B5F8A',
  
  // UI
  appBg: '#f5f5f5',
  appContentBg: '#ffffff',
  appBorderColor: '#e8e8ed',
  appBorderRadius: 0,
  
  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
  fontCode: 'SF Mono, SFMono-Regular, ui-monospace, Menlo, monospace',
  
  // Text colors
  textColor: '#1d1d1f',
  textInverseColor: '#ffffff',
  textMutedColor: '#86868b',
  
  // Toolbar
  barTextColor: '#86868b',
  barSelectedColor: '#1B5F8A',
  barHoverColor: '#1B5F8A',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e8e8ed',
  inputTextColor: '#1d1d1f',
  inputBorderRadius: 0,
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
});
