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
  async viteFinal(config, { configType }) {
    // Set base path for GitHub Pages deployment only (not for Chromatic)
    // Chromatic sets CHROMATIC environment variable, so we check for that
    if (configType === 'PRODUCTION' && !process.env.CHROMATIC) {
      config.base = '/cd-mmp/';
    }
    return config;
  }
};
export default config;