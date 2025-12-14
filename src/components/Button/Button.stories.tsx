import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Mail, ArrowRight, Heart, Download, Plus } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary button component with multiple variants, sizes, and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// BASIC VARIANTS
// ============================================

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete Item',
    variant: 'danger',
  },
};

export const OnDark: Story = {
  args: {
    children: 'Button on Dark',
    variant: 'outline',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// ============================================
// SIZES
// ============================================

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'large',
  },
};

// ============================================
// WITH ICONS
// ============================================

export const WithIconLeft: Story = {
  args: {
    children: 'Send Email',
    iconLeft: <Mail size={16} />,
  },
};

export const WithIconRight: Story = {
  args: {
    children: 'Continue',
    iconRight: <ArrowRight size={16} />,
  },
};

export const IconOnly: Story = {
  args: {
    children: <Heart size={18} />,
    'aria-label': 'Add to favorites',
  },
};

// ============================================
// STATES
// ============================================

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

// ============================================
// ALL VARIANTS SHOWCASE
// ============================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button iconLeft={<Mail size={16} />}>Email</Button>
      <Button iconRight={<ArrowRight size={16} />}>Next</Button>
      <Button iconLeft={<Download size={16} />} iconRight={<ArrowRight size={16} />}>Download</Button>
      <Button><Plus size={18} /></Button>
    </div>
  ),
};
