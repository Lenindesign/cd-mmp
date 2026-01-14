import type { Meta, StoryObj } from '@storybook/react';
import { NewsPage } from './NewsPage';

const meta: Meta<typeof NewsPage> = {
  title: 'Pages/News + Stories',
  component: NewsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# News + Stories Index Page

The main landing page for editorial content, featuring a hero story and categorized article grids.

## Structure

1. **Hero Section** - Full-width featured story with large image, headline, subheadline, and byline
2. **Testing Hub Section** - 4-column grid of recent test articles
3. **Latest News Section** - 4-column grid with alternate background
4. **Editor's Pick** - Featured BigStoryCard with side-by-side layout

## Features

- Responsive grid layouts (4 → 3 → 2 → 1 columns)
- Hover effects on images and headlines
- Category badges and author bylines
- "View All" links for each section

## Routes

- \`/news\` - Main news index
- \`/news-stories\` - Alias route
- \`/news/:slug\` - Individual article pages
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NewsPage>;

export const Default: Story = {
  name: 'News + Stories Index',
};

