import type { Meta, StoryObj } from '@storybook/react';
import { AdDivider } from './AdDivider';

// Sample ad image URLs (leaderboard 728x90 format)
const sampleAdImages = {
  leaderboard: 'https://via.placeholder.com/728x90/1a1a1a/ffffff?text=728x90+Leaderboard+Ad',
  mediumRectangle: 'https://via.placeholder.com/300x250/1a1a1a/ffffff?text=300x250+Ad',
  halfPage: 'https://via.placeholder.com/300x600/1a1a1a/ffffff?text=300x600+Half+Page',
  billboard: 'https://via.placeholder.com/970x250/1a1a1a/ffffff?text=970x250+Billboard',
};

const meta: Meta<typeof AdDivider> = {
  title: 'Resin Components/AdDivider',
  component: AdDivider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Ad Divider

A divider component for indicating advertisement placement within content.
Inspired by Hearst's "Advertisement - Continue Reading Below" pattern.

### Features
- Customizable label text
- Supports actual ad images with links
- Fallback placeholder when no image provided
- Standard ad sizes supported (728x90, 300x250, 300x600, 970x250)
- Three variants: default, minimal, prominent
- Responsive design

### Usage
\`\`\`tsx
// With ad image
<AdDivider
  text="Advertisement - Continue Reading Below"
  adImageUrl="https://example.com/ad-728x90.jpg"
  adLinkUrl="https://advertiser.com"
  adWidth={728}
  adHeight={90}
/>

// Placeholder only
<AdDivider
  text="Advertisement - Continue Reading Below"
  showAd={true}
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
      options: ['default', 'minimal', 'prominent'],
      description: 'Visual style variant',
    },
    showAd: {
      control: 'boolean',
      description: 'Show the ad area',
    },
    adImageUrl: {
      control: 'text',
      description: 'URL of the ad image',
    },
    adLinkUrl: {
      control: 'text',
      description: 'URL to link the ad to',
    },
    adWidth: {
      control: { type: 'number' },
      description: 'Width of the ad in pixels',
    },
    adHeight: {
      control: { type: 'number' },
      description: 'Height of the ad in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AdDivider>;

export const Default: Story = {
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: true,
    adImageUrl: sampleAdImages.leaderboard,
    adLinkUrl: '#',
    adWidth: 728,
    adHeight: 90,
    variant: 'default',
  },
};

export const WithMediumRectangle: Story = {
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: true,
    adImageUrl: sampleAdImages.mediumRectangle,
    adLinkUrl: '#',
    adWidth: 300,
    adHeight: 250,
    variant: 'default',
  },
};

export const WithBillboard: Story = {
  args: {
    text: 'Advertisement',
    showAd: true,
    adImageUrl: sampleAdImages.billboard,
    adLinkUrl: '#',
    adWidth: 970,
    adHeight: 250,
    variant: 'default',
  },
};

export const Placeholder: Story = {
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: true,
    adWidth: 728,
    adHeight: 90,
    variant: 'default',
  },
};

export const Minimal: Story = {
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: false,
    variant: 'minimal',
  },
};

export const Prominent: Story = {
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: true,
    adImageUrl: sampleAdImages.leaderboard,
    adWidth: 728,
    adHeight: 90,
    variant: 'prominent',
  },
};

export const TextOnly: Story = {
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: false,
    variant: 'default',
  },
};

// In context example
export const InArticleContext: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Article content before ad */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>
          2025 Honda Accord Review: The Benchmark Sedan
        </h2>
        <p style={{ lineHeight: 1.7, color: '#374151', marginBottom: '16px' }}>
          The Honda Accord has long been the benchmark for midsize sedans, and the 2025 model 
          continues that tradition with refinements to its already excellent formula. With a 
          comfortable ride, spacious interior, and impressive fuel economy, it remains one of 
          our top picks in the segment.
        </p>
        <p style={{ lineHeight: 1.7, color: '#374151' }}>
          Under the hood, you'll find either a turbocharged 1.5-liter four-cylinder making 
          192 horsepower or a hybrid powertrain that combines a 2.0-liter four-cylinder with 
          two electric motors for a total of 204 horsepower. Both options deliver smooth, 
          refined power delivery.
        </p>
      </div>

      {/* Ad Divider with image */}
      <AdDivider 
        text="Advertisement - Continue Reading Below"
        showAd={true}
        adImageUrl={sampleAdImages.leaderboard}
        adWidth={728}
        adHeight={90}
        variant="default"
      />

      {/* Article content after ad */}
      <div style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
          Interior and Technology
        </h3>
        <p style={{ lineHeight: 1.7, color: '#374151', marginBottom: '16px' }}>
          Inside, the Accord offers a clean, modern design with high-quality materials 
          throughout. The 12.3-inch touchscreen infotainment system is responsive and 
          includes wireless Apple CarPlay and Android Auto. A 10.2-inch digital gauge 
          cluster comes standard on higher trims.
        </p>
        <p style={{ lineHeight: 1.7, color: '#374151' }}>
          Rear-seat passengers enjoy generous legroom and headroom, making the Accord 
          suitable for family duties. The trunk offers 16.7 cubic feet of cargo space, 
          which is competitive for the class.
        </p>
      </div>

      {/* Another Ad Divider with medium rectangle */}
      <AdDivider 
        text="Advertisement - Continue Reading Below"
        showAd={true}
        adImageUrl={sampleAdImages.mediumRectangle}
        adWidth={300}
        adHeight={250}
        variant="default"
      />

      {/* More content */}
      <div style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
          The Verdict
        </h3>
        <p style={{ lineHeight: 1.7, color: '#374151' }}>
          The 2025 Honda Accord earns our Editors' Choice award for its exceptional 
          combination of comfort, efficiency, and value. Whether you choose the 
          turbocharged or hybrid powertrain, you're getting one of the best sedans 
          money can buy.
        </p>
      </div>
    </div>
  ),
};

// Multiple variants comparison
export const AllVariants: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px', color: '#6b7280' }}>
          Default Variant with Ad
        </h3>
        <AdDivider 
          variant="default" 
          showAd={true} 
          adImageUrl={sampleAdImages.leaderboard}
          adWidth={728}
          adHeight={90}
        />
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px', color: '#6b7280' }}>
          Minimal Variant (Text Only)
        </h3>
        <AdDivider variant="minimal" showAd={false} />
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px', color: '#6b7280' }}>
          Prominent Variant with Ad
        </h3>
        <AdDivider 
          variant="prominent" 
          showAd={true} 
          adImageUrl={sampleAdImages.leaderboard}
          adWidth={728}
          adHeight={90}
        />
      </div>

      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px', color: '#6b7280' }}>
          Placeholder (No Image)
        </h3>
        <AdDivider 
          variant="default" 
          showAd={true}
          adWidth={728}
          adHeight={90}
        />
      </div>
    </div>
  ),
};

