import type { Meta, StoryObj } from '@storybook/react';
import { AdDivider } from './AdDivider';

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
- Optional ad placeholder with configurable height
- Three variants: default, minimal, prominent
- Lines on either side of text (default variant)
- Responsive design

### Usage
\`\`\`tsx
<AdDivider
  text="Advertisement - Continue Reading Below"
  showAdPlaceholder={true}
  adHeight={250}
  variant="default"
/>
\`\`\`

### In Context
Place this component between content sections where ads would typically appear:

\`\`\`tsx
<ArticleSection />
<AdDivider />
<ArticleSection />
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
    showAdPlaceholder: {
      control: 'boolean',
      description: 'Show the ad placeholder area',
    },
    adHeight: {
      control: { type: 'range', min: 100, max: 600, step: 50 },
      description: 'Height of the ad placeholder in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AdDivider>;

export const Default: Story = {
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAdPlaceholder: true,
    adHeight: 250,
    variant: 'default',
  },
};

export const Minimal: Story = {
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAdPlaceholder: false,
    variant: 'minimal',
  },
};

export const Prominent: Story = {
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAdPlaceholder: true,
    adHeight: 300,
    variant: 'prominent',
  },
};

export const LargeAd: Story = {
  args: {
    text: 'Advertisement',
    showAdPlaceholder: true,
    adHeight: 600,
    variant: 'default',
  },
};

export const SmallAd: Story = {
  args: {
    text: 'Sponsored Content',
    showAdPlaceholder: true,
    adHeight: 100,
    variant: 'default',
  },
};

export const TextOnly: Story = {
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAdPlaceholder: false,
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

      {/* Ad Divider */}
      <AdDivider 
        text="Advertisement - Continue Reading Below"
        showAdPlaceholder={true}
        adHeight={250}
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

      {/* Another Ad Divider */}
      <AdDivider 
        text="Advertisement - Continue Reading Below"
        showAdPlaceholder={true}
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
          Default Variant
        </h3>
        <AdDivider variant="default" showAdPlaceholder={true} adHeight={150} />
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px', color: '#6b7280' }}>
          Minimal Variant
        </h3>
        <AdDivider variant="minimal" />
      </div>

      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px', color: '#6b7280' }}>
          Prominent Variant
        </h3>
        <AdDivider variant="prominent" showAdPlaceholder={true} adHeight={150} />
      </div>
    </div>
  ),
};

