import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import VehiclesListPage from './VehiclesListPage';

const meta: Meta<typeof VehiclesListPage> = {
  title: 'Pages/VehiclesListPage',
  component: VehiclesListPage,
  parameters: {
    layout: 'fullscreen',
    router: { skip: true },
    docs: {
      description: {
        component: 'Main browse page for new and used vehicles with filters, search, and lifestyle recommendations.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <AuthProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
      </AuthProvider>
    ),
  ],
};

export const NewCars: Story = {
  decorators: [
    (Story) => (
      <AuthProvider>
      <MemoryRouter initialEntries={['/?type=new']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
      </AuthProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Shows only new cars for sale.',
      },
    },
  },
};

export const UsedCars: Story = {
  decorators: [
    (Story) => (
      <AuthProvider>
      <MemoryRouter initialEntries={['/?type=used']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
      </AuthProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Shows only used cars for sale.',
      },
    },
  },
};

export const FilteredByMake: Story = {
  decorators: [
    (Story) => (
      <AuthProvider>
      <MemoryRouter initialEntries={['/?make=Toyota']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
      </AuthProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Filtered to show only Toyota vehicles.',
      },
    },
  },
};

export const FilteredByBodyStyle: Story = {
  decorators: [
    (Story) => (
      <AuthProvider>
      <MemoryRouter initialEntries={['/?bodyStyle=SUV']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
      </AuthProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Filtered to show only SUVs.',
      },
    },
  },
};
