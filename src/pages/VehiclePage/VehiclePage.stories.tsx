import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import VehiclePage from './VehiclePage';

const meta: Meta<typeof VehiclePage> = {
  title: 'Pages/VehiclePage',
  component: VehiclePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Vehicle detail page with hero, specs, pricing, comparisons, and marketplace integration.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to create stories with different vehicles
const createVehicleStory = (year: string, make: string, model: string): Story => ({
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[`/${year}/${make}/${model}`]}>
        <Routes>
          <Route path="/:year/:make/:model" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
});

export const ToyotaCamry: Story = createVehicleStory('2024', 'Toyota', 'Camry');

export const HondaCRV: Story = createVehicleStory('2024', 'Honda', 'CR-V');

export const FordF150: Story = createVehicleStory('2024', 'Ford', 'F-150');

export const ChevroletTrax: Story = createVehicleStory('2025', 'Chevrolet', 'Trax');

export const TeslaModel3: Story = createVehicleStory('2024', 'Tesla', 'Model-3');

export const BMWSeries5: Story = createVehicleStory('2024', 'BMW', '5-Series');

// Vehicle not found - tests error handling for invalid vehicle
export const NotFound: Story = createVehicleStory('2024', 'InvalidMake', 'InvalidModel');

// With default props - same as ToyotaCamry but named for backwards compatibility
export const WithDefaultProps: Story = createVehicleStory('2024', 'Toyota', 'Camry');
