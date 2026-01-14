import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import VehicleRatingEditor from './VehicleRatingEditor';

const meta = {
  title: 'Pages/VehicleRatingEditor',
  component: VehicleRatingEditor,
  parameters: {
    layout: 'fullscreen',
    router: { skip: true }, // This page provides its own MemoryRouter
    viewport: {
      defaultViewport: 'desktop1440',
    },
    chromatic: {
      viewports: [1440],
    },
    docs: {
      description: {
        component: 'Admin tool for editing vehicle ratings and scores.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AuthProvider>
      <MemoryRouter initialEntries={['/admin/vehicle-ratings']}>
        <Story />
      </MemoryRouter>
      </AuthProvider>
    ),
  ],
} satisfies Meta<typeof VehicleRatingEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view of the Vehicle Rating Editor page.
 * This is an admin tool for editors to manage vehicle staff ratings.
 * 
 * Features:
 * - Category tabs to organize vehicles (Sedans, SUVs, Trucks, Coupes, Convertibles, Wagons)
 * - Search functionality to filter vehicles by make, model, or year
 * - Inline editing of staff ratings (0-10 scale)
 * - Visual indicators for modified ratings
 * - Bulk save functionality
 * - Discard changes option
 */
export const Default: Story = {};

/**
 * The editor page with the Sedans category selected.
 * Shows all sedan vehicles with their current ratings.
 */
export const SedansCategory: Story = {};

/**
 * The editor page with the SUVs category selected.
 * Shows all SUV vehicles with their current ratings.
 */
export const SUVsCategory: Story = {};

/**
 * The editor page with the Trucks category selected.
 * Shows all truck vehicles with their current ratings.
 */
export const TrucksCategory: Story = {};

/**
 * The editor page with the Coupes category selected.
 * Shows all coupe vehicles with their current ratings.
 */
export const CoupesCategory: Story = {};

/**
 * The editor page with the Convertibles category selected.
 * Shows all convertible vehicles with their current ratings.
 */
export const ConvertiblesCategory: Story = {};

/**
 * The editor page with the Wagons category selected.
 * Shows all wagon vehicles with their current ratings.
 */
export const WagonsCategory: Story = {};

