import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  "staticDirs": ["../public"],
  async viteFinal(config) {
    // Set base path for GitHub Pages deployment
    if (process.env.NODE_ENV === 'production') {
      config.base = '/cd-mmp/';
    }
    return config;
  }
};
export default config;