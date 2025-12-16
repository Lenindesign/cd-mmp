import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import VehicleRanking from './VehicleRanking';

const meta: Meta<typeof VehicleRanking> = {
  title: 'Organisms/VehicleRanking',
  component: VehicleRanking,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Shows where the vehicle ranks in its category.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jvhWYHzYt25IBonCIzVEv0/Post-MVP-Marketplace?node-id=14-24575',
    },
  },
  tags: ['autodocs'],
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

export const Default: Story = {
  args: {
    bodyStyle: 'SUV',
    maxPrice: 35000,
  },
};

export const SUV: Story = {
  args: {
    bodyStyle: 'SUV',
    maxPrice: 50000,
    currentRank: 3,
  },
};

export const Sedan: Story = {
  args: {
    bodyStyle: 'Sedan',
    maxPrice: 40000,
    currentRank: 1,
  },
};

export const Truck: Story = {
  args: {
    bodyStyle: 'Truck',
    maxPrice: 60000,
  },
};

export const LuxurySUV: Story = {
  args: {
    bodyStyle: 'SUV',
    maxPrice: 100000,
  },
};

export const WithScore: Story = {
  args: {
    bodyStyle: 'SUV',
    maxPrice: 35000,
    showScore: true,
    scoreStyle: 'bold',
  },
};

export const WithSubtleScore: Story = {
  args: {
    bodyStyle: 'SUV',
    maxPrice: 35000,
    showScore: true,
    scoreStyle: 'subtle',
  },
};
