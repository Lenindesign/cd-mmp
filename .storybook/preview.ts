import type { Preview } from '@storybook/react-vite'
import { create } from 'storybook/theming'
import '../src/index.css'

// Car and Driver theme for docs
const docsTheme = create({
  base: 'light',
  brandTitle: 'Car and Driver',
  brandUrl: 'https://cd-mmp-2025.netlify.app/',
  colorPrimary: '#1B5F8A',
  colorSecondary: '#1B5F8A',
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#222222' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
    docs: {
      theme: docsTheme,
    },
  },
};

export default preview;
