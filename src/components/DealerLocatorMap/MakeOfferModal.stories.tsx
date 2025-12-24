import type { Meta, StoryObj } from '@storybook/react';
import MakeOfferModal from './MakeOfferModal';
import type { DealerWithScore } from '../../services/dealerService';
import './MakeOfferModal.css';

const mockDealer: DealerWithScore = {
  id: 'dealer-1',
  name: 'AutoNation Honda Costa Mesa',
  address: '2855 Harbor Blvd',
  city: 'Costa Mesa',
  state: 'CA',
  zipCode: '92626',
  phone: '(714) 555-1234',
  rating: 4.7,
  reviewCount: 328,
  inventoryCount: 15,
  lowestPrice: 28995,
  highestPrice: 34500,
  distance: 3.2,
  lat: 33.6846,
  lng: -117.9089,
  inventory: [],
  dealScore: {
    total: 92,
    priceScore: 30,
    distanceScore: 25,
    ratingScore: 22,
    inventoryBonus: 15,
    isBestDeal: true,
  },
};

const mockVehicle = {
  year: 2025,
  make: 'Honda',
  model: 'Accord',
  trim: 'Sport',
  msrp: 32490,
};

const meta: Meta<typeof MakeOfferModal> = {
  title: 'Organisms/MakeOfferModal',
  component: MakeOfferModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The **MakeOfferModal** component allows users to submit price offers to dealers. It features:

- **Quick Select Options**: Pre-calculated offers at MSRP, 3%, 5%, and 8% below
- **Custom Offer Input**: Enter any amount
- **Trade-In Support**: Add trade-in vehicle value
- **Financing Options**: Indicate financing needs and down payment
- **Two-Step Flow**: Offer details → Contact information → Success
- **Savings Calculator**: Shows percentage and dollar savings from MSRP

## Usage

\`\`\`tsx
import { MakeOfferModal } from './components/DealerLocatorMap';

<MakeOfferModal
  isOpen={true}
  onClose={() => setIsOpen(false)}
  dealer={selectedDealer}
  vehicle={{ year: 2025, make: 'Honda', model: 'Accord', msrp: 32490 }}
  onSubmitOffer={(offer) => console.log('Offer submitted:', offer)}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
    },
    dealer: {
      description: 'The dealer to send the offer to',
    },
    vehicle: {
      description: 'Vehicle information including MSRP',
    },
    onClose: {
      description: 'Callback when modal is closed',
    },
    onSubmitOffer: {
      description: 'Callback when offer is submitted',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MakeOfferModal>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const Default: Story = {
  args: {
    isOpen: true,
    dealer: mockDealer,
    vehicle: mockVehicle,
    onClose: noop,
    onSubmitOffer: noop,
  },
};

export const LuxuryVehicle: Story = {
  args: {
    isOpen: true,
    dealer: {
      ...mockDealer,
      name: 'Beverly Hills BMW',
    },
    vehicle: {
      year: 2025,
      make: 'BMW',
      model: 'M5',
      trim: 'Competition',
      msrp: 112895,
    },
    onClose: noop,
    onSubmitOffer: noop,
  },
};

export const BudgetVehicle: Story = {
  args: {
    isOpen: true,
    dealer: {
      ...mockDealer,
      name: 'Kia of Irvine',
    },
    vehicle: {
      year: 2025,
      make: 'Kia',
      model: 'Forte',
      trim: 'LXS',
      msrp: 21490,
    },
    onClose: noop,
    onSubmitOffer: noop,
  },
};

export const ElectricVehicle: Story = {
  args: {
    isOpen: true,
    dealer: {
      ...mockDealer,
      name: 'Tesla Orange County',
    },
    vehicle: {
      year: 2025,
      make: 'Tesla',
      model: 'Model 3',
      trim: 'Long Range',
      msrp: 47990,
    },
    onClose: noop,
    onSubmitOffer: noop,
  },
};

// Interactive story showing the complete flow
export const InteractiveDemo: Story = {
  args: {
    isOpen: true,
    dealer: mockDealer,
    vehicle: mockVehicle,
    onClose: noop,
    onSubmitOffer: (offer) => {
      console.log('Offer submitted:', offer);
      alert(`Offer of $${offer.offerAmount.toLocaleString()} submitted to ${offer.dealerName}!`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Try submitting an offer! Fill out the form and click through the steps.',
      },
    },
  },
};

