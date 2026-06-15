import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Shared badge primitive based on the Car and Driver design-system badge treatment.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Your Next Step',
    variant: 'primary',
  },
};

export const StatusSet: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant="neutral">Low</Badge>
      <Badge variant="info">Moderate</Badge>
      <Badge variant="primary">High</Badge>
      <Badge variant="success">Excellent</Badge>
      <Badge variant="dark">No Accidents</Badge>
    </div>
  ),
};
