import type { Meta, StoryObj } from '@storybook/react';
import { ErrorState } from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Atoms/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Error and empty state displays following the Car and Driver design system.',
      },
    },
  },

  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'empty', 'not-found', 'offline'],
    },
    showRetry: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Error variant
export const Error: Story = {
  args: {
    variant: 'error',
    showRetry: true,
    onRetry: () => console.log('Retry clicked'),
  },
};

// Empty variant
export const Empty: Story = {
  args: {
    variant: 'empty',
    title: 'No vehicles found',
    message: 'Try adjusting your search criteria or browse all vehicles.',
  },
};

// Not Found variant
export const NotFound: Story = {
  args: {
    variant: 'not-found',
  },
};

// Offline variant
export const Offline: Story = {
  args: {
    variant: 'offline',
    showRetry: true,
    onRetry: () => console.log('Retry clicked'),
  },
};

// Custom Title and Message
export const CustomContent: Story = {
  args: {
    variant: 'empty',
    title: 'No saved vehicles',
    message: 'Start saving vehicles to see them here.',
  },
};

// With Retry Button
export const WithRetry: Story = {
  args: {
    variant: 'error',
    title: 'Failed to load vehicles',
    message: 'There was a problem loading the vehicle list. Please try again.',
    showRetry: true,
    retryLabel: 'Try Again',
    onRetry: () => alert('Retrying...'),
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '800px' }}>
      <div style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
        <ErrorState variant="error" />
      </div>
      <div style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
        <ErrorState variant="empty" />
      </div>
      <div style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
        <ErrorState variant="not-found" />
      </div>
      <div style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
        <ErrorState variant="offline" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Search Results Empty
export const SearchResultsEmpty: Story = {
  args: {
    variant: 'empty',
    title: 'No matching vehicles',
    message: 'We couldn\'t find any vehicles matching "xyz123". Try a different search term.',
  },
};

// Favorites Empty
export const FavoritesEmpty: Story = {
  args: {
    variant: 'empty',
    title: 'No favorite vehicles yet',
    message: 'Click the heart icon on any vehicle to save it to your favorites.',
  },
};

