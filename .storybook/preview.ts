import type { Preview } from '@storybook/react-vite'
import { create } from 'storybook/theming'
import '../src/index.css'

// Car and Driver theme for documentation pages
const docsTheme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'Car and Driver Design System',
  brandUrl: 'https://cd-mmp-2025.netlify.app/',
  brandImage: '/cd-logo.svg',
  brandTarget: '_blank',
  
  // Colors - Blue Cobalt, no red
  colorPrimary: '#1B5F8A',
  colorSecondary: '#1B5F8A',
  
  // Typography - Inter for readability
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"SF Mono", "Monaco", "Inconsolata", monospace',
  
  // Text colors - high contrast
  textColor: '#1a1a1a',
  textInverseColor: '#ffffff',
  textMutedColor: '#666666',
  
  // UI
  appBg: '#ffffff',
  appContentBg: '#fafafa',
  appBorderColor: '#e5e5e5',
  appBorderRadius: 4,
  
  // Toolbar
  barTextColor: '#4a4a4a',
  barSelectedColor: '#1B5F8A',
  barHoverColor: '#1B5F8A',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#cdcdcd',
  inputTextColor: '#1a1a1a',
  inputBorderRadius: 4,
});

const preview: Preview = {
  parameters: {
    // Controls configuration
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    
    // Background options
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#fafafa' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    
    // Documentation theme
    docs: {
      theme: docsTheme,
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h2, h3',
        title: 'Contents',
        disable: false,
      },
    },
    
    // Layout
    layout: 'padded',
    
    // Actions
    actions: { argTypesRegex: '^on[A-Z].*' },
    
    // Viewport
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
      },
    },
  },
  
  // Global decorators
  decorators: [],
};

export default preview;
