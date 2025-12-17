import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import DesignSystem from './DesignSystem';

const meta: Meta<typeof DesignSystem> = {
  title: 'Pages/DesignSystem',
  component: DesignSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Design system documentation page showcasing colors, typography, spacing, and component examples.',
      },
    },
  },

  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

