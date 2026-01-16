import type { Meta, StoryObj } from '@storybook/react';
import NegotiationAdvice from './NegotiationAdvice';

const meta: Meta<typeof NegotiationAdvice> = {
  title: 'Components/NegotiationAdvice',
  component: NegotiationAdvice,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays personalized negotiation advice based on local market inventory data. Provides actionable tips for both new and used car purchases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    vehicle: {
      description: 'Vehicle inventory data used to generate advice',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NegotiationAdvice>;

/**
 * New car negotiation advice for a Honda CR-V with high inventory and aged units.
 * This scenario favors buyers with plenty of room to negotiate.
 */
export const NewCarBuyersMarket: Story = {
  args: {
    vehicle: {
      listingType: 'new',
      make: 'Honda',
      model: 'CR-V',
      numberAvailable: 20,
      averageDaysOnLot: 45,
      cashIncentive: 750,
      numberWithGoodPrice: 0,
      numberNewlyListed: 0,
    },
  },
};

/**
 * New car negotiation advice for a Toyota RAV4 with limited inventory.
 * This scenario is more competitive for buyers.
 */
export const NewCarSellersMarket: Story = {
  args: {
    vehicle: {
      listingType: 'new',
      make: 'Toyota',
      model: 'RAV4',
      numberAvailable: 8,
      averageDaysOnLot: 18,
      cashIncentive: 0,
      numberWithGoodPrice: 0,
      numberNewlyListed: 0,
    },
  },
};

/**
 * New car negotiation advice for a Kia K5 with moderate inventory and incentives.
 */
export const NewCarKiaK5: Story = {
  args: {
    vehicle: {
      listingType: 'new',
      make: 'Kia',
      model: 'K5',
      numberAvailable: 15,
      averageDaysOnLot: 38,
      cashIncentive: 1500,
      numberWithGoodPrice: 0,
      numberNewlyListed: 0,
    },
  },
};

/**
 * Used car negotiation advice for a Honda CR-V with tight, overpriced market.
 * Wide mileage range creates negotiating opportunities.
 */
export const UsedCarOverpriced: Story = {
  args: {
    vehicle: {
      listingType: 'used',
      make: 'Honda',
      model: 'CR-V',
      numberAvailable: 5,
      mileageRange: {
        low: 15000,
        high: 120000,
      },
      numberWithGoodPrice: 0,
      numberNewlyListed: 1,
    },
  },
};

/**
 * Used car negotiation advice with some well-priced options available.
 */
export const UsedCarMixedMarket: Story = {
  args: {
    vehicle: {
      listingType: 'used',
      make: 'Toyota',
      model: 'Camry',
      numberAvailable: 12,
      mileageRange: {
        low: 25000,
        high: 85000,
      },
      numberWithGoodPrice: 3,
      numberNewlyListed: 4,
    },
  },
};

/**
 * Used car negotiation advice for a Kia K5 with limited inventory.
 */
export const UsedCarKiaK5: Story = {
  args: {
    vehicle: {
      listingType: 'used',
      make: 'Kia',
      model: 'K5',
      numberAvailable: 7,
      mileageRange: {
        low: 18000,
        high: 95000,
      },
      numberWithGoodPrice: 1,
      numberNewlyListed: 2,
    },
  },
};

/**
 * Comparison of new vs used car advice side by side.
 */
export const NewVsUsedComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'Poppins, sans-serif' }}>Example 1: New Car</h3>
        <NegotiationAdvice
          vehicle={{
            listingType: 'new',
            make: 'Honda',
            model: 'CR-V',
            numberAvailable: 20,
            averageDaysOnLot: 45,
            cashIncentive: 750,
            numberWithGoodPrice: 0,
            numberNewlyListed: 0,
          }}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'Poppins, sans-serif' }}>Example 2: Used Car</h3>
        <NegotiationAdvice
          vehicle={{
            listingType: 'used',
            make: 'Honda',
            model: 'CR-V',
            numberAvailable: 5,
            mileageRange: {
              low: 15000,
              high: 120000,
            },
            numberWithGoodPrice: 0,
            numberNewlyListed: 1,
          }}
        />
      </div>
    </div>
  ),
};
