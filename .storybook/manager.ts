import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'Car and Driver',
  brandUrl: 'https://cd-mmp-2025.netlify.app/',
  brandImage: '/cd-logo.svg',
  brandTarget: '_blank',
});

addons.setConfig({
  theme,
});
