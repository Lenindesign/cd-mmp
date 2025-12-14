import type { Meta, StoryObj } from '@storybook/react';
import QuickSpecs from './QuickSpecs';

const meta: Meta<typeof QuickSpecs> = {
  title: 'Molecules/QuickSpecs',
  component: QuickSpecs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Quick specifications grid for vehicle details.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sedan: Story = {
  args: {
    specs: {
      mpg: '28/39 City/Hwy',
      seating: '5 Seats',
      powertrain: 'Gas',
      drivetrain: 'Front-Wheel Drive',
      warranty: '3 Years/36,000 Miles',
    },
  },
};

export const Electric: Story = {
  args: {
    specs: {
      mpg: '120 MPGe',
      seating: '5 Seats',
      powertrain: 'Electric',
      drivetrain: 'All-Wheel Drive',
      warranty: '8 Years/100,000 Miles',
    },
  },
};

export const Truck: Story = {
  args: {
    specs: {
      mpg: '18/24 City/Hwy',
      seating: '6 Seats',
      powertrain: 'Gas V8',
      drivetrain: '4-Wheel Drive',
      warranty: '3 Years/36,000 Miles',
    },
  },
};

export const Hybrid: Story = {
  args: {
    specs: {
      mpg: '51/53 City/Hwy',
      seating: '5 Seats',
      powertrain: 'Hybrid',
      drivetrain: 'All-Wheel Drive',
      warranty: '8 Years/100,000 Miles (Battery)',
    },
  },
};
