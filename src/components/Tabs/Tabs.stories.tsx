import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Fuel, Zap, Leaf, Car } from 'lucide-react';
import Tabs from './Tabs';
import type { TabItem } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['pills', 'segmented', 'underline'],
    },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const dealTypeItems: TabItem[] = [
  { value: 'all', label: 'All Deals' },
  { value: 'lease', label: 'Lease' },
  { value: 'finance', label: 'Finance' },
  { value: 'cash', label: 'Cash Back' },
];

const fuelItems: TabItem[] = [
  { value: 'all', label: 'All', icon: <Car size={16} /> },
  { value: 'gas', label: 'Gas', icon: <Fuel size={16} /> },
  { value: 'hybrid', label: 'Hybrid', icon: <Leaf size={16} /> },
  { value: 'electric', label: 'Electric', icon: <Zap size={16} />, count: 12 },
];

const contentItems: TabItem[] = [
  { value: 'saved', label: 'Saved', count: 5 },
  { value: 'wishlist', label: 'Wishlist', count: 3 },
];

const PillsTemplate = () => {
  const [value, setValue] = useState('all');
  return <Tabs items={dealTypeItems} value={value} onChange={setValue} variant="pills" />;
};

const PillsWithIconsTemplate = () => {
  const [value, setValue] = useState('all');
  return <Tabs items={fuelItems} value={value} onChange={setValue} variant="pills" />;
};

const SegmentedTemplate = () => {
  const [value, setValue] = useState('all');
  return <Tabs items={dealTypeItems} value={value} onChange={setValue} variant="segmented" />;
};

const UnderlineTemplate = () => {
  const [value, setValue] = useState('saved');
  return <Tabs items={contentItems} value={value} onChange={setValue} variant="underline" />;
};

export const Pills: Story = {
  render: () => <PillsTemplate />,
};

export const PillsWithIcons: Story = {
  render: () => <PillsWithIconsTemplate />,
};

export const PillsFullWidth: Story = {
  render: () => {
    const [value, setValue] = useState('all');
    return <Tabs items={dealTypeItems} value={value} onChange={setValue} variant="pills" fullWidth />;
  },
};

export const Segmented: Story = {
  render: () => <SegmentedTemplate />,
};

export const SegmentedCompact: Story = {
  render: () => {
    const [value, setValue] = useState('saved');
    return <Tabs items={contentItems} value={value} onChange={setValue} variant="segmented" />;
  },
};

export const Underline: Story = {
  render: () => <UnderlineTemplate />,
};

export const UnderlineWithCounts: Story = {
  render: () => {
    const items: TabItem[] = [
      { value: 'all', label: 'All', count: 28 },
      { value: 'new', label: 'New', count: 16 },
      { value: 'used', label: 'Used', count: 12 },
    ];
    const [value, setValue] = useState('all');
    return <Tabs items={items} value={value} onChange={setValue} variant="underline" />;
  },
};
