import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ArticlePage } from './ArticlePage';

const meta: Meta<typeof ArticlePage> = {
  title: 'Pages/ArticlePage',
  component: ArticlePage,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Article Page

A full-featured article page component that matches the Car and Driver editorial style.

## Structure

The article page includes:

1. **Breadcrumb Navigation** - Home > Category > Article
2. **Article Header** - Category badge, headline, subheadline, byline, date, actions
3. **Hero Image** - Full-width with gallery trigger overlay
4. **Key Points Box** - Highlighted bullet points at the top
5. **Article Body** - Rich text content with inline images
6. **For Sale CTA** - Vehicle shopping call-to-action
7. **Shop CTA** - "Skip the lot" promotional block
8. **Author Bio** - Avatar, name, title, and biography
9. **Related Articles** - Horizontal scrolling carousel

## Usage

\`\`\`tsx
import { ArticlePage } from './pages/ArticlePage';

// With default sample article
<ArticlePage />

// With custom article data
<ArticlePage article={customArticleData} />
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticlePage>;

// Default story with sample Solterra article
export const Default: Story = {
  name: '2026 Subaru Solterra - Testing Hub',
};

// Custom article example
export const CustomArticle: Story = {
  name: 'Custom Article',
  args: {
    article: {
      id: 'custom-article',
      category: 'News',
      categorySlug: 'news',
      headline: 'The 2025 Honda Accord Hybrid Gets Even Better MPG',
      subheadline: 'Honda refines its popular sedan with improved efficiency and new tech features.',
      author: {
        name: 'Sarah Chen',
        title: 'Senior Editor',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=1B5F8A&color=fff&size=96',
        bio: 'Sarah Chen has been covering the automotive industry for over 15 years, with a focus on hybrid and electric vehicles.',
      },
      publishDate: 'Dec 20, 2025',
      readTime: 5,
      heroImage: {
        id: 'hero',
        src: 'https://d2kde5ohu8qb21.cloudfront.net/files/2025-honda-accord-101.jpg',
        alt: '2025 Honda Accord Hybrid front view',
        caption: 'View Exterior Photos',
        credit: 'Honda',
      },
      galleryImages: [
        {
          id: '1',
          src: 'https://d2kde5ohu8qb21.cloudfront.net/files/2025-honda-accord-101.jpg',
          alt: '2025 Honda Accord exterior',
          caption: '2025 Honda Accord Hybrid',
          credit: 'Honda',
        },
      ],
      keyPoints: [
        'The 2025 Accord Hybrid achieves an EPA-estimated 51 mpg combined.',
        'New Google built-in infotainment system with wireless Android Auto and Apple CarPlay.',
        'Honda Sensing safety suite now includes enhanced traffic jam assist.',
      ],
      relatedVehicle: {
        make: 'Honda',
        model: 'Accord',
        year: 2025,
      },
      relatedArticles: [
        {
          id: '1',
          title: 'Best Hybrid Sedans of 2025',
          image: 'https://d2kde5ohu8qb21.cloudfront.net/files/hybrid-sedans-2025.jpg',
          href: '/news/best-hybrid-sedans-2025',
          category: 'Buyer\'s Guide',
        },
        {
          id: '2',
          title: 'Toyota Camry vs Honda Accord: Which Is Better?',
          image: 'https://d2kde5ohu8qb21.cloudfront.net/files/camry-vs-accord.jpg',
          href: '/news/camry-vs-accord-comparison',
          category: 'Comparison',
        },
      ],
    },
  },
};

