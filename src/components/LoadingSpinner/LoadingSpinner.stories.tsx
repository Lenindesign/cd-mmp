import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner, LoadingSkeleton, LoadingCard } from './LoadingSpinner';

// LoadingSpinner Stories
const meta: Meta<typeof LoadingSpinner> = {
  title: 'Atoms/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# LoadingSpinner

Loading indicators for asynchronous operations and content placeholders.

---

## Components

| Component | Use Case |
|-----------|----------|
| **LoadingSpinner** | Inline or centered spinning indicator |
| **LoadingSkeleton** | Content placeholder with shimmer effect |
| **LoadingCard** | Pre-built vehicle card skeleton |

---

## Usage Guidelines

- Use spinners for short operations (< 3 seconds)
- Use skeletons for content loading (lists, cards, pages)
- Always provide accessible loading announcements
- Consider progress indicators for long operations

---

## Sizes

| Size | Use Case |
|------|----------|
| **Small** | Buttons, inline actions |
| **Default** | General purpose |
| **Large** | Full-page loading, modals |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the spinner',
      table: {
        type: { summary: 'small | default | large' },
        defaultValue: { summary: 'default' },
        category: 'Appearance',
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'white', 'dark'],
      description: 'Color variant for different backgrounds',
      table: {
        type: { summary: 'primary | white | dark' },
        defaultValue: { summary: 'primary' },
        category: 'Appearance',
      },
    },
    centered: {
      control: 'boolean',
      description: 'Center spinner in parent container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Layout',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Spinner
export const Default: Story = {
  args: {
    size: 'default',
    variant: 'primary',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

// Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'large',
  },
};

export const White: Story = {
  args: {
    variant: 'white',
    size: 'large',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    size: 'large',
  },
};

// Centered
export const Centered: Story = {
  args: {
    size: 'large',
    centered: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '300px', border: '1px dashed #ccc' }}>
        <Story />
      </div>
    ),
  ],
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="small" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="default" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Default</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="large" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Large</p>
      </div>
    </div>
  ),
};

// Skeleton Stories
export const SkeletonDefault: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <LoadingSkeleton width="100%" height={20} />
    </div>
  ),
};

export const SkeletonText: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <LoadingSkeleton width="100%" height={16} />
      <LoadingSkeleton width="80%" height={16} />
      <LoadingSkeleton width="60%" height={16} />
    </div>
  ),
};

export const SkeletonCard: Story = {
  render: () => (
    <div style={{ width: '200px' }}>
      <LoadingSkeleton width="100%" height={120} rounded="md" />
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <LoadingSkeleton width="70%" height={14} />
        <LoadingSkeleton width="50%" height={12} />
      </div>
    </div>
  ),
};

export const SkeletonRounded: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <LoadingSkeleton width={40} height={40} rounded="full" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <LoadingSkeleton width={150} height={14} />
        <LoadingSkeleton width={100} height={12} />
      </div>
    </div>
  ),
};

// Loading Card
export const CardSkeleton: Story = {
  render: () => (
    <div style={{ width: '280px' }}>
      <LoadingCard />
    </div>
  ),
};

export const CardSkeletonGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '900px' }}>
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Real-world example
export const VehicleListLoading: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '1200px' }}>
      <div style={{ marginBottom: '24px' }}>
        <LoadingSkeleton width={200} height={32} rounded="sm" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

