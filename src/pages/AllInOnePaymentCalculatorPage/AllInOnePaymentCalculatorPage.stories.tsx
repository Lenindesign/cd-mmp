import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { AuthProvider } from '../../contexts/AuthContext';
import { CarFinderProvider } from '../../contexts/CarFinderContext';
import '../../App.css';
import AllInOnePaymentCalculatorLightStepsPage from './AllInOnePaymentCalculatorLightStepsPage';

const meta: Meta<typeof AllInOnePaymentCalculatorLightStepsPage> = {
  title: 'Pages/Auto Loan Calculator/Guided Steps',
  component: AllInOnePaymentCalculatorLightStepsPage,
  parameters: {
    layout: 'fullscreen',
    router: { skip: true },
    docs: {
      description: {
        component:
          'Guided auto loan calculator with the full Car and Driver page shell, step routing, live estimate summary, and marketplace handoff.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const createGuidedStepStory = (stepSlug: string, description: string): Story => ({
  decorators: [
    (Story) => (
      <AuthProvider>
        <CarFinderProvider>
          <MemoryRouter initialEntries={[`/auto-loan-calculator/light-steps/${stepSlug}`]}>
            <div className="app">
              <Header />
              <main id="main-content">
                <Routes>
                  <Route path="/auto-loan-calculator/light-steps" element={<Story />} />
                  <Route path="/auto-loan-calculator/light-steps/:stepSlug" element={<Story />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </MemoryRouter>
        </CarFinderProvider>
      </AuthProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: description,
      },
    },
  },
});

export const BudgetStart: Story = createGuidedStepStory(
  'goal',
  'Step 1: choose whether to start from a target vehicle price or a monthly budget.',
);

export const LoanTerms: Story = createGuidedStepStory(
  'loan',
  'Step 2: adjust down payment, APR, and loan term while the estimate updates.',
);

export const Vehicle: Story = createGuidedStepStory(
  'vehicle',
  'Step 3: select a specific vehicle or browse by vehicle type, with warranty and insurance planning estimates.',
);

export const TradeAndFees: Story = createGuidedStepStory(
  'trade',
  'Step 4: add trade-in value, payoff, sales tax, registration, and dealer fee assumptions.',
);

export const Estimate: Story = createGuidedStepStory(
  'review',
  'Step 5: review the personalized estimate, optional email capture, and marketplace CTA.',
);

export const MobileEstimate: Story = {
  ...createGuidedStepStory(
    'review',
    'Mobile review state with the final-step sticky marketplace CTA.',
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobileLarge',
    },
    docs: {
      description: {
        story: 'Mobile review state with the final-step sticky marketplace CTA.',
      },
    },
  },
};
