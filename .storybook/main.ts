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
    "@storybook/addon-onboarding",
    "@storybook/addon-designs"
  ],
  "framework": "@storybook/react-vite",
  "staticDirs": ["../public"],
  async viteFinal(config) {
    // Don't set base path - let it default to '/' for all builds
    // GitHub Pages deployment will handle the base path via _redirects
    return config;
  }
};
export default config;