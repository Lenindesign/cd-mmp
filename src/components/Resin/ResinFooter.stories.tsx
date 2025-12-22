import type { Meta, StoryObj } from '@storybook/react';
import { ResinFooter } from './ResinFooter';

const meta: Meta<typeof ResinFooter> = {
  title: 'Resin Components/ResinFooter',
  component: ResinFooter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Resin Footer

A comprehensive footer component inspired by Hearst's Resin design system.
Includes logo, social links, navigation groups, legal links, and privacy controls.

### Features
- Logo with inverted colors for dark background
- Social media links with icons (X, YouTube, Facebook, Instagram, Pinterest, TikTok, LinkedIn)
- Multiple navigation link groups
- Network attribution section
- Affiliate disclosure text
- Copyright notice
- Legal/policy links
- Privacy choices opt-out link with icon
- Multiple variants (default, minimal, expanded)

### Usage
\`\`\`tsx
<ResinFooter
  logoUrl="/cd-logo.svg"
  logoAlt="Car and Driver"
  socialLinks={[
    { platform: 'x', href: 'https://x.com/caranddriver' },
    { platform: 'youtube', href: 'https://youtube.com/caranddriver' },
    { platform: 'instagram', href: 'https://instagram.com/caranddriver' },
  ]}
  linkGroups={[
    {
      title: 'About',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ]}
  legalLinks={[
    { label: 'Privacy Notice', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ]}
  copyright="©2025 Car and Driver. All Rights Reserved."
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'minimal', 'expanded'],
      description: 'Footer layout variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResinFooter>;

const defaultSocialLinks = [
  { platform: 'x' as const, href: 'https://x.com/caranddriver' },
  { platform: 'youtube' as const, href: 'https://youtube.com/caranddriver' },
  { platform: 'facebook' as const, href: 'https://facebook.com/caranddriver' },
  { platform: 'instagram' as const, href: 'https://instagram.com/caranddriver' },
  { platform: 'pinterest' as const, href: 'https://pinterest.com/caranddriver' },
];

const defaultLinkGroups = [
  {
    title: 'About',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Advertise', href: '/advertise' },
    ],
  },
  {
    title: 'Reviews',
    links: [
      { label: 'New Car Reviews', href: '/reviews/new' },
      { label: 'Used Car Reviews', href: '/reviews/used' },
      { label: 'Comparison Tests', href: '/reviews/comparisons' },
      { label: 'Long-Term Tests', href: '/reviews/long-term' },
    ],
  },
  {
    title: 'Buying Guide',
    links: [
      { label: 'Best Cars', href: '/best-cars' },
      { label: '10Best', href: '/10best' },
      { label: "Editors' Choice", href: '/editors-choice' },
      { label: 'EV Buying Guide', href: '/ev-guide' },
    ],
  },
  {
    title: 'News',
    links: [
      { label: 'Latest News', href: '/news' },
      { label: 'Spy Shots', href: '/news/spy-shots' },
      { label: 'Industry News', href: '/news/industry' },
      { label: 'Recalls', href: '/news/recalls' },
    ],
  },
];

const defaultLegalLinks = [
  { label: 'Privacy Notice', href: '/privacy' },
  { label: 'Your California Privacy Rights', href: '/california-privacy' },
  { label: 'Interest-Based Ads', href: '/interest-based-ads' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Site Map', href: '/sitemap' },
];

export const Default: Story = {
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    socialLinks: defaultSocialLinks,
    linkGroups: defaultLinkGroups,
    legalLinks: defaultLegalLinks,
    copyright: '©2025 Car and Driver. All Rights Reserved.',
    affiliateDisclosure: 'We may earn commission from links on this page, but we only recommend products we back.',
    networkName: 'A Part of Hearst Digital Media',
    showPrivacyChoices: true,
    variant: 'default',
  },
};

export const Minimal: Story = {
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    socialLinks: defaultSocialLinks,
    linkGroups: [],
    legalLinks: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
    copyright: '©2025 Car and Driver. All Rights Reserved.',
    affiliateDisclosure: '',
    showPrivacyChoices: true,
    variant: 'minimal',
  },
};

export const Expanded: Story = {
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    socialLinks: [
      ...defaultSocialLinks,
      { platform: 'tiktok' as const, href: 'https://tiktok.com/@caranddriver' },
      { platform: 'linkedin' as const, href: 'https://linkedin.com/company/caranddriver' },
    ],
    linkGroups: [
      ...defaultLinkGroups,
      {
        title: 'Videos',
        links: [
          { label: 'Latest Videos', href: '/videos' },
          { label: 'Track Tests', href: '/videos/track-tests' },
          { label: 'First Drives', href: '/videos/first-drives' },
          { label: 'How-To', href: '/videos/how-to' },
        ],
      },
      {
        title: 'Subscribe',
        links: [
          { label: 'Magazine', href: '/subscribe/magazine' },
          { label: 'Newsletter', href: '/subscribe/newsletter' },
          { label: 'RSS Feed', href: '/rss' },
          { label: 'Customer Service', href: '/customer-service' },
        ],
      },
    ],
    legalLinks: defaultLegalLinks,
    copyright: '©2025 Car and Driver. All Rights Reserved.',
    affiliateDisclosure: 'We may earn commission from links on this page, but we only recommend products we back.',
    networkName: 'A Part of Hearst Digital Media',
    showPrivacyChoices: true,
    variant: 'expanded',
  },
};

export const WithoutNavigation: Story = {
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    socialLinks: defaultSocialLinks,
    linkGroups: [],
    legalLinks: defaultLegalLinks,
    copyright: '©2025 Car and Driver. All Rights Reserved.',
    affiliateDisclosure: 'We may earn commission from links on this page, but we only recommend products we back.',
    showPrivacyChoices: true,
    variant: 'default',
  },
};

export const SocialOnly: Story = {
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    socialLinks: defaultSocialLinks,
    linkGroups: [],
    legalLinks: [],
    copyright: '©2025 Car and Driver.',
    affiliateDisclosure: '',
    showPrivacyChoices: false,
    variant: 'minimal',
  },
};

// Full page example
export const PageWithFooter: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, backgroundColor: '#f5f5f5', padding: '48px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', fontWeight: 700 }}>
            Page Content
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666', lineHeight: 1.6 }}>
            This example shows how the footer looks at the bottom of a page layout.
            The footer sticks to the bottom and provides consistent navigation and legal information.
          </p>
        </div>
      </main>
      <ResinFooter
        logoUrl="/cd-logo.svg"
        logoAlt="Car and Driver"
        socialLinks={defaultSocialLinks}
        linkGroups={defaultLinkGroups}
        legalLinks={defaultLegalLinks}
        copyright="©2025 Car and Driver. All Rights Reserved."
        affiliateDisclosure="We may earn commission from links on this page, but we only recommend products we back."
        networkName="A Part of Hearst Digital Media"
        showPrivacyChoices={true}
        variant="default"
      />
    </div>
  ),
};

