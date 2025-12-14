import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import TopTenCarouselLeads from './TopTenCarouselLeads';

const meta: Meta<typeof TopTenCarouselLeads> = {
  title: 'Organisms/TopTenCarouselLeads',
  component: TopTenCarouselLeads,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Carousel showcasing top-ranked vehicles with lead generation CTAs.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: '20px', background: '#f5f5f5' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const FilteredByBodyStyle: Story = {
  args: {
    bodyStyle: 'SUV',
    title: 'Top 10 SUVs',
    subtitle: 'Our experts pick the best SUVs on the market',
  },
};

export const FilteredByMake: Story = {
  args: {
    make: 'Toyota',
    title: 'Top Toyota Vehicles',
  },
};

export const FilteredByPrice: Story = {
  args: {
    maxPrice: 35000,
    title: 'Top Vehicles Under $35,000',
    subtitle: 'Best value picks for budget-conscious buyers',
  },
};

export const WithCurrentVehicle: Story = {
  args: {
    currentVehicleId: 'vehicle-1',
    title: 'See How This Vehicle Ranks',
  },
};

export const WithLifestyle: Story = {
  args: {
    lifestyle: 'family',
    title: 'Best Family Vehicles',
    subtitle: 'Safe, spacious, and practical choices for families',
  },
};
