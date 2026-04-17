import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import IncentivesModal, {
  type IncentivesModalVariant,
  type IncentiveOfferDetail,
  type IncentivesModalFormData,
} from './IncentivesModal';
import type { Incentive } from '../../services/incentivesService';
import './IncentivesModal.stories.css';

/* ---------------------------------------------------------------------------
 * SAMPLE DATA
 * Each vehicle/offer set can be mixed and matched across variants.
 * These mirror the shapes built by `offersToIncentives` on real deal pages.
 * --------------------------------------------------------------------------- */

const EQUINOX_IMAGE =
  'https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg';
const CAMRY_IMAGE =
  'https://hips.hearstapps.com/hmg-prod/images/2024-toyota-camry-102-64cbc4858e198.jpg';

const equinoxOffer: Partial<IncentiveOfferDetail> = {
  year: 2026,
  make: 'Chevrolet',
  model: 'Equinox',
  slug: '2026/chevrolet/equinox',
  imageUrl: EQUINOX_IMAGE,
  msrpMin: 33300,
  msrpMax: 38500,
  offerHeadline: '0% APR for 60 months',
  whatItMeans:
    'Zero-interest financing means every dollar of your payment goes toward the vehicle — not the bank. On a $35,000 loan, this saves you roughly $5,600 in interest vs. the average 7.1% rate.',
  yourSavings:
    "On a $35,000 loan over 60 months, $0 in interest vs. approximately $5,600 at 7.1% APR. That's over $93/month in savings.",
  whoQualifies:
    'Well-qualified buyers with approved credit through GM Financial.',
  eligibleTrims: ['LT', '2RS', '3RS', 'Activ'],
  dontWaitText:
    "This offer expires May 1, 2026. Chevrolet incentives change monthly, so lock in your rate before it's gone.",
  eventLabel: 'Chevrolet Equinox Current Offers',
  expirationDate: 'May 1, 2026',
};

const camryOffer: Partial<IncentiveOfferDetail> = {
  year: 2026,
  make: 'Toyota',
  model: 'Camry',
  slug: '2026/toyota/camry',
  imageUrl: CAMRY_IMAGE,
  msrpMin: 28855,
  msrpMax: 34780,
  offerHeadline: '$359/mo Lease for 36 months',
  whatItMeans:
    'A manufacturer-subsidized lease gives you a lower monthly payment than financing. You drive a new Camry for 3 years with the option to buy at the end.',
  yourSavings:
    'Monthly lease payments start at $359/mo with $2,999 due at signing — significantly less than typical finance payments on this vehicle.',
  whoQualifies:
    'Well-qualified lessees with approved credit through Toyota Financial Services.',
  eligibleTrims: ['LE', 'SE', 'XLE', 'XSE'],
  dontWaitText:
    'This offer expires April 30, 2026. Toyota adjusts lease programs monthly.',
  expirationDate: 'April 30, 2026',
};

const equinoxIncentives: Incentive[] = [
  {
    id: 'equinox-finance-1',
    type: 'finance',
    title: '0% APR for 60 months',
    description:
      'Zero-interest financing through GM Financial. Every payment goes toward the vehicle.',
    value: '0% APR',
    expirationDate: 'May 1, 2026',
    terms:
      'For well-qualified buyers. 60-month term available through GM Financial. Not compatible with some other offers.',
    eligibility: 'All qualified buyers with approved credit through GM Financial.',
    programName: 'Chevrolet Bonus Cash + APR',
    programDescription: 'Manufacturer financing incentive',
    groupAffiliation: 'everyone',
  },
  {
    id: 'equinox-cash-1',
    type: 'cash',
    title: '$1,500 Customer Cash',
    description:
      'Cash allowance applied toward the purchase of a new Equinox.',
    value: '$1,500',
    expirationDate: 'May 1, 2026',
    terms: 'Must take delivery by offer expiration. Cannot be combined with 0% APR.',
    groupAffiliation: 'everyone',
  },
  {
    id: 'equinox-special-military',
    type: 'special',
    title: '$500 Military Appreciation',
    description:
      'Cash allowance for active, reserve, and retired military personnel.',
    value: '$500',
    expirationDate: 'Ongoing',
    eligibility: 'Valid military ID required.',
    groupAffiliation: 'military',
  },
];

const camryIncentives: Incentive[] = [
  {
    id: 'camry-lease-1',
    type: 'lease',
    title: '$359/mo Lease for 36 months',
    description:
      'Manufacturer-subsidized lease with $2,999 due at signing. 12,000 miles/year.',
    value: '$359/mo',
    expirationDate: 'April 30, 2026',
    terms:
      '$359/mo for 36 months with $2,999 due at signing. 12,000 miles/year. $0.15/mi overage. Tax, title, license extra.',
    eligibility: 'Well-qualified lessees with approved credit through Toyota Financial Services.',
    programName: 'Toyota Lease Specials',
    groupAffiliation: 'everyone',
  },
  {
    id: 'camry-finance-1',
    type: 'finance',
    title: '3.9% APR for 60 months',
    description: 'Below-market financing through Toyota Financial.',
    value: '3.9% APR',
    expirationDate: 'April 30, 2026',
    terms: '3.9% APR for 60 months. 4.9% for 72 months. Well-qualified buyers through TFS.',
    groupAffiliation: 'everyone',
  },
];

/* ---------------------------------------------------------------------------
 * VARIANT LIST & LABELS
 * --------------------------------------------------------------------------- */

type ReviewVariant = Extract<IncentivesModalVariant, 'conversion-b' | 'conversion-b-no-form'>;

interface VariantConfig {
  label: string;
  title: string;
  description: string;
}

const VARIANT_CONFIG: Record<ReviewVariant, VariantConfig> = {
  'conversion-b': {
    label: '5',
    title: '5 – Conversion B (Two-Column + Form)',
    description:
      'Two-column layout: left side shows full offer details with incentive switching; right side has a lead form that resolves to dealer match. Production variant used on all deal pages.',
  },
  'conversion-b-no-form': {
    label: '6',
    title: '6 – Conversion B (No Form)',
    description:
      'Same left-column detail as Conversion B but without the form. Single column with a "Shop on Marketplace" CTA. Used in Hero component for info-only display.',
  },
};

const VARIANTS = Object.keys(VARIANT_CONFIG) as ReviewVariant[];

/* ---------------------------------------------------------------------------
 * SHARED STORY ACTIONS
 * --------------------------------------------------------------------------- */

const actions = {
  onClose: () => console.log('[story] Modal closed'),
  onCtaClick: () => console.log('[story] CTA clicked'),
  onSubmitForm: (data: IncentivesModalFormData) => console.log('[story] Form submitted', data),
};

/* ---------------------------------------------------------------------------
 * REVIEW ALL — interactive variant switcher
 * --------------------------------------------------------------------------- */

function ReviewAllVariants() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const variant = VARIANTS[currentIndex];
  const config = VARIANT_CONFIG[variant];

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex(i => (i === 0 ? VARIANTS.length - 1 : i - 1));
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex(i => (i === VARIANTS.length - 1 ? 0 : i + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="stories-switcher">
      <div className="stories-switcher__panel">
        <p className="stories-switcher__intro">
          Pick a variant, then open the modal. Use{' '}
          <kbd className="stories-switcher__kbd">←</kbd>{' '}
          <kbd className="stories-switcher__kbd">→</kbd> to cycle when the modal is open.
        </p>

        <div className="stories-switcher__controls" role="group" aria-label="Variant picker">
          <span className="stories-switcher__label">Variant:</span>
          {VARIANTS.map((v, index) => {
            const isActive = currentIndex === index;
            return (
              <button
                key={v}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={
                  isActive
                    ? 'stories-switcher__pill stories-switcher__pill--active'
                    : 'stories-switcher__pill'
                }
                aria-pressed={isActive}
                aria-label={VARIANT_CONFIG[v].title}
              >
                {VARIANT_CONFIG[v].label}
              </button>
            );
          })}
        </div>

        <div className="stories-switcher__meta">
          <p className="stories-switcher__title">{config.title}</p>
          <p className="stories-switcher__description">{config.description}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="stories-switcher__cta"
        >
          Open modal
        </button>
      </div>

      <IncentivesModal
        isOpen={isOpen}
        variant={variant}
        offer={equinoxOffer}
        allIncentives={equinoxIncentives}
        selectedIncentiveId="equinox-finance-1"
        {...actions}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * META
 * --------------------------------------------------------------------------- */

const meta: Meta<typeof IncentivesModal> = {
  title: 'Organisms/IncentivesModal',
  component: IncentivesModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A full-screen modal for vehicle deal/incentive details. Used across all deal pages to show offer breakdowns, expert tips, eligibility, and lead capture.\n\n' +
          '**Production variants:** conversion-b (default, two-column + form) and conversion-b-no-form (single column, used in Hero).\n\n' +
          'Use the "Review all" story to cycle between variants interactively. The Conversion B sub-stories below demonstrate different incentive types (finance, lease, cash, military/restricted) and the default fallback.',
      },
      story: { inline: false, iframeHeight: 600 },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'Modal layout variant',
      table: { category: 'Core' },
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
      table: { category: 'Core' },
    },
    offer: {
      description: 'Vehicle and offer data. Falls back to built-in sample.',
      table: { category: 'Data' },
    },
    allIncentives: {
      description: 'Full incentive list — enables offer switching in conversion-b.',
      table: { category: 'Data' },
    },
    selectedIncentiveId: {
      description: 'Pre-selected incentive ID.',
      table: { category: 'Data' },
    },
    onClose: { table: { category: 'Callbacks' } },
    onCtaClick: { table: { category: 'Callbacks' } },
    onSubmitForm: { table: { category: 'Callbacks' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
 * STORIES
 * --------------------------------------------------------------------------- */

/**
 * Interactive variant switcher. Pick 1–6 and use arrow keys to cycle.
 * All variants use the Chevrolet Equinox 0% APR sample with 3 incentives.
 */
export const ReviewAll: Story = {
  name: 'Review all (1–6 switcher)',
  render: () => <ReviewAllVariants />,
};

/**
 * **Conversion B** — production default on all deal pages.
 * Two-column: left = full offer with incentive switching; right = lead form → dealer match.
 * This story provides `allIncentives` with 3 offers (finance, cash, special) for switching.
 */
export const ConversionB: Story = {
  name: '5 – Conversion B (Finance offer)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-finance-1',
    ...actions,
  },
};

/**
 * **Conversion B with Lease** — same two-column layout but with a lease-type incentive selected.
 * Shows lease-specific sections: monthly payment, cash-down table by trim, mileage terms.
 */
export const ConversionBLease: Story = {
  name: '5b – Conversion B (Lease offer)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: camryOffer,
    allIncentives: camryIncentives,
    selectedIncentiveId: 'camry-lease-1',
    ...actions,
  },
};

/**
 * **Conversion B with Cash** — pre-selects the $1,500 cash back offer.
 * Shows cash-specific rendering: "cash back" suffix, different expert tip.
 */
export const ConversionBCash: Story = {
  name: '5c – Conversion B (Cash offer)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-cash-1',
    ...actions,
  },
};

/**
 * **Conversion B with Military incentive** — shows the restricted eligibility UI.
 * The eligibility box renders with a "Military / Veterans" badge and restricted styling.
 */
export const ConversionBMilitary: Story = {
  name: '5d – Conversion B (Military/restricted)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-special-military',
    ...actions,
  },
};

/**
 * **Conversion B — no offer data.** Falls back to the built-in Honda CR-V sample.
 * Tests the default/fallback rendering path.
 */
export const ConversionBFallback: Story = {
  name: '5e – Conversion B (Default fallback)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    ...actions,
  },
};

/**
 * **Conversion B — No Form** — single-column, no lead form.
 * Used in the Hero component for info-only display. Shows "Shop on Marketplace" CTA.
 */
export const ConversionBNoForm: Story = {
  name: '6 – Conversion B (No Form)',
  args: {
    isOpen: true,
    variant: 'conversion-b-no-form',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-finance-1',
    ...actions,
  },
};
