import type { Meta, StoryObj } from '@storybook/react';
import { ResinHeader } from './ResinHeader';
import { vehicleDatabase } from '../../data/vehicles';

// Get a vehicle with a great hero image
const porsche911 = vehicleDatabase.find(v => v.make === 'Porsche' && v.model === '911');

const meta: Meta<typeof ResinHeader> = {
  title: 'Resin Components/ResinHeader',
  component: ResinHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Resin Header

A responsive navigation header component inspired by Hearst's Resin design system.
Used as the main site navigation with logo, links, and action buttons.

### Features
- Responsive design with mobile hamburger menu
- Sticky positioning option
- Multiple variants (default, transparent, dark)
- Search overlay
- Mobile slide-out menu
- Subscribe and sign-in CTAs

### Usage
\`\`\`tsx
<ResinHeader
  logoUrl="/cd-logo.svg"
  logoAlt="Car and Driver"
  navItems={[
    { label: 'Reviews', href: '/reviews', isActive: true },
    { label: 'News', href: '/news' },
    { label: 'Buying Guide', href: '/buying-guide' },
    { label: 'Videos', href: '/videos' },
  ]}
  showSubscribe={true}
  subscribeText="SUBSCRIBE"
  showSignIn={true}
  showSearch={true}
  sticky={true}
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
      options: ['default', 'transparent', 'dark'],
      description: 'Header color variant',
    },
    sticky: {
      control: 'boolean',
      description: 'Whether the header sticks to the top on scroll',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResinHeader>;

const defaultNavItems = [
  { label: 'Reviews', href: '/reviews', isActive: true },
  { label: 'News', href: '/news' },
  { label: 'Buying Guide', href: '/buying-guide' },
  { label: 'Videos', href: '/videos' },
  { label: 'Best Cars', href: '/best-cars' },
];

export const Default: Story = {
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    navItems: defaultNavItems,
    showSubscribe: true,
    subscribeText: 'SUBSCRIBE',
    showSignIn: true,
    signInText: 'sign in',
    showSearch: true,
    variant: 'default',
  },
};

export const Sticky: Story = {
  args: {
    ...Default.args,
    sticky: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh' }}>
        <Story />
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Scroll to see sticky header</h1>
          <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
            architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </div>
    ),
  ],
};

export const DarkVariant: Story = {
  args: {
    ...Default.args,
    variant: 'dark',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const TransparentVariant: Story = {
  args: {
    ...Default.args,
    variant: 'transparent',
  },
  decorators: [
    (Story) => (
      <div 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${porsche911?.image || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px',
          position: 'relative',
        }}
      >
        <Story />
        <div style={{ 
          padding: '120px 24px', 
          textAlign: 'center', 
          color: 'white' 
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            2025 Porsche 911 Carrera GTS
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            The benchmark sports car gets even better
          </p>
        </div>
      </div>
    ),
  ],
};

export const MinimalNav: Story = {
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    navItems: [
      { label: 'Reviews', href: '/reviews' },
      { label: 'News', href: '/news' },
    ],
    showSubscribe: false,
    showSignIn: false,
    showSearch: true,
    variant: 'default',
  },
};

export const FullNav: Story = {
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    navItems: [
      { label: 'Reviews', href: '/reviews' },
      { label: 'News', href: '/news' },
      { label: 'Buying Guide', href: '/buying-guide' },
      { label: 'Videos', href: '/videos' },
      { label: 'Best Cars', href: '/best-cars' },
      { label: 'Rankings', href: '/rankings' },
      { label: 'EV Hub', href: '/ev' },
    ],
    showSubscribe: true,
    subscribeText: 'SUBSCRIBE',
    showSignIn: true,
    signInText: 'sign in',
    showSearch: true,
    variant: 'default',
  },
};

export const WithActiveState: Story = {
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    navItems: [
      { label: 'Reviews', href: '/reviews' },
      { label: 'News', href: '/news', isActive: true },
      { label: 'Buying Guide', href: '/buying-guide' },
      { label: 'Videos', href: '/videos' },
    ],
    showSubscribe: true,
    showSignIn: true,
    showSearch: true,
    variant: 'default',
  },
};

// Page layout example
export const PageLayout: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <ResinHeader
        logoUrl="/cd-logo.svg"
        logoAlt="Car and Driver"
        navItems={defaultNavItems}
        showSubscribe={true}
        subscribeText="SUBSCRIBE"
        showSignIn={true}
        showSearch={true}
        sticky={true}
      />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '48px', 
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', fontWeight: 700 }}>
            2025 Car and Driver 10Best Cars
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666', lineHeight: 1.6 }}>
            Every year, our editors put hundreds of cars through their paces to determine 
            the 10 best vehicles available. Here are this year's winners.
          </p>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '24px' 
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              style={{ 
                backgroundColor: 'white', 
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ 
                backgroundColor: '#e5e5e5', 
                height: '150px', 
                marginBottom: '16px' 
              }} />
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>
                Vehicle {i}
              </h3>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>
                Starting at $XX,XXX
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  ),
};

