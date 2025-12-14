import type { Meta, StoryObj } from '@storybook/react';
import Specs, { defaultSedanSpecs, defaultElectricSpecs } from './Specs';

const meta: Meta<typeof Specs> = {
  title: 'Molecules/Specs',
  component: Specs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Full specifications table for a vehicle with Car and Driver official icons.',
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

export const SedanSpecs: Story = {
  args: {
    categories: defaultSedanSpecs,
    title: 'Sedan Specifications',
    description: 'Complete specifications for sedan vehicles',
  },
};

export const ElectricSpecs: Story = {
  args: {
    categories: defaultElectricSpecs,
    title: 'Electric Vehicle Specifications',
    description: 'Complete specifications for electric vehicles',
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Technical Specifications',
    description: 'Detailed specifications for all trim levels',
  },
};
