import type { Meta, StoryObj } from '@storybook/react';
import { ErrorState } from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Atoms/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ErrorState

Displays error messages, empty states, and offline notifications to users.

---

## Variants

| Variant | Use Case |
|---------|----------|
| **error** | API failures, unexpected errors |
| **empty** | No results, empty lists |
| **not-found** | 404 pages, missing content |
| **offline** | Network connectivity issues |

---

## Best Practices

- Always provide a clear action (retry, go back, search again)
- Use friendly, non-technical language
- Include relevant context about what went wrong
- Consider providing alternative actions

---

## Content Guidelines

| Element | Guidance |
|---------|----------|
| **Title** | Short, descriptive (2-5 words) |
| **Message** | Explain what happened and what to do next |
| **Action** | Clear verb ("Try Again", "Go Back", "Search") |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'empty', 'not-found', 'offline'],
      description: 'Type of error state to display',
      table: {
        type: { summary: 'error | empty | not-found | offline' },
        defaultValue: { summary: 'error' },
        category: 'Appearance',
      },
    },
    title: {
      control: 'text',
      description: 'Custom title text',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    message: {
      control: 'text',
      description: 'Custom message text',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    showRetry: {
      control: 'boolean',
      description: 'Show retry button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Actions',
      },
    },
    retryLabel: {
      control: 'text',
      description: 'Custom retry button label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Try Again' },
        category: 'Actions',
      },
    },
    onRetry: {
      description: 'Callback when retry button is clicked',
      table: {
        type: { summary: '() => void' },
        category: 'Actions',
      },
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

