import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import VehiclesListPage from './VehiclesListPage';

const meta: Meta<typeof VehiclesListPage> = {
  title: 'Pages/VehiclesListPage',
  component: VehiclesListPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main browse page for new and used vehicles with filters, search, and lifestyle recommendations.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NewCars: Story = {
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
    (Story) => {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/421dcf11-ec3c-40f4-96b0-d7195da06ee8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehiclesListPage.stories.tsx:46',message:'UsedCars story decorator',data:{initialEntry:'/?type=used'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A,E'})}).catch(()=>{});
      // #endregion
      return (
        <MemoryRouter initialEntries={['/?type=used']}>
          <Routes>
            <Route path="*" element={<Story />} />
          </Routes>
        </MemoryRouter>
      );
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Filtered to show only Toyota vehicles.',
      },
    },
  },
};

export const FilteredByBodyStyle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Filtered to show only SUVs.',
      },
    },
  },
};
