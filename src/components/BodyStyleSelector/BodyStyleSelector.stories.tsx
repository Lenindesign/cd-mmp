import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BodyStyleSelector } from './BodyStyleSelector';

const meta: Meta<typeof BodyStyleSelector> = {
  title: 'Molecules/BodyStyleSelector',
  component: BodyStyleSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Body Style Selector

A carousel component for selecting vehicle body styles. Features smooth scrolling and multiple visual variants.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['minimal', 'pills'],
      description: 'Visual style variant',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'minimal' },
      },
    },
    multiSelect: {
      control: 'boolean',
      description: 'Allow multiple selections',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BodyStyleSelector>;

// Interactive wrapper for single select
const SingleSelectWrapper = ({ variant }: { variant?: 'default' | 'minimal' | 'cards' | 'pills' | 'dark' }) => {
  const [selectedId, setSelectedId] = useState<string>('suvs');
  
  return (
    <BodyStyleSelector
      variant={variant}
      selectedId={selectedId}
      onSelect={(bodyStyle) => setSelectedId(bodyStyle.id)}
    />
  );
};

// Interactive wrapper for multi select
const MultiSelectWrapper = ({ variant }: { variant?: 'default' | 'minimal' | 'cards' | 'pills' | 'dark' }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['suvs', 'sedans']);
  
  return (
    <BodyStyleSelector
      variant={variant}
      multiSelect
      selectedIds={selectedIds}
      onMultiSelect={setSelectedIds}
    />
  );
};

/**
 * Minimal variant - Borderless design with subtle backgrounds.
 * Great for embedding in existing layouts without visual clutter.
 */
export const Minimal: Story = {
  render: () => <SingleSelectWrapper variant="minimal" />,
};

/**
 * Pills variant - Compact horizontal pills for space-constrained layouts.
 * Selected state inverts colors for clear visual feedback.
 */
export const Pills: Story = {
  render: () => <SingleSelectWrapper variant="pills" />,
};

/**
 * Minimal with multi-select mode
 */
export const MinimalMultiSelect: Story = {
  render: () => <MultiSelectWrapper variant="minimal" />,
};

/**
 * Pills with multi-select mode
 */
export const PillsMultiSelect: Story = {
  render: () => <MultiSelectWrapper variant="pills" />,
};
