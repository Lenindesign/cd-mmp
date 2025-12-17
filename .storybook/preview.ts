import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    // Story organization and sorting
    options: {
      storySort: {
        order: [
          'Introduction', 
          'Documentation', 
          ['Getting Started', 'Design Principles', 'Button', 'TextField'],
          'Tokens',
          ['Colors', 'Typography', 'Spacing'],
          'Design System',
          'Atoms', 
          'Molecules', 
          'Organisms', 
          'Pages'
        ],
      },
    },

    // Enhanced docs styling
    docs: {
      toc: false, // Disable the "On this page" sidebar to save space
    },

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

    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (375px)',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        mobileLarge: {
          name: 'Mobile Large (414px)',
          styles: {
            width: '414px',
            height: '896px',
          },
        },
        tablet: {
          name: 'Tablet (768px)',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop (1280px)',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
        desktop1440: {
          name: 'Desktop Large (1440px)',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
        wide: {
          name: 'Wide Screen (1920px)',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
