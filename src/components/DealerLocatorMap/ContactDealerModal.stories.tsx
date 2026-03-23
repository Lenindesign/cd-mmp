import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import ContactDealerModal, {
  type ContactDealerVariant,
  type ContactDealerFormData,
} from './ContactDealerModal';

const VARIANTS: ContactDealerVariant[] = ['default', 'form', 'edmunds'];

const VARIANT_LABELS: Record<ContactDealerVariant, string> = {
  default: 'Same modal look, simple CTA',
  form: 'Contact dealer form',
  edmunds: 'Edmunds-inspired deal details',
};

function ReviewBothVariants() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const variant = VARIANTS[currentIndex];

  const handleSubmit = (data: ContactDealerFormData) => {
    console.log('Contact dealer submit:', data);
  };

  // Cycle variants with keyboard arrows when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((i) => (i === 0 ? VARIANTS.length - 1 : i - 1));
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex((i) => (i === VARIANTS.length - 1 ? 0 : i + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <p style={{ fontSize: '14px', color: 'var(--color-gray-600)', margin: 0 }}>
          Pick 1, 2, or 3 then open the modal. Use <kbd>←</kbd> <kbd>→</kbd> to cycle when the modal is open.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>Variant:</span>
          {VARIANTS.map((_, index) => (
            <button
              key={VARIANTS[index]}
              type="button"
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: currentIndex === index ? '2px solid var(--color-blue-cobalt)' : '1px solid var(--color-gray-300)',
                background: currentIndex === index ? 'var(--color-blue-cobalt)' : 'var(--color-white)',
                color: currentIndex === index ? 'white' : 'var(--color-dark)',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
              }}
              aria-pressed={currentIndex === index}
              aria-label={`Variant ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--color-gray-500)', margin: 0 }}>
          {VARIANT_LABELS[variant]}
          {isOpen && ' · Use ← → to cycle'}
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '14px',
            color: 'white',
            background: 'var(--color-blue-cobalt)',
            border: 'none',
            borderRadius: 'var(--border-radius-sm)',
            cursor: 'pointer',
          }}
        >
          Open modal
        </button>
      </div>

      <ContactDealerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant={variant}
        vehicle={variant === 'edmunds' ? { year: 2025, make: 'Jeep', model: 'Gladiator' } : { year: 2026, make: 'Honda', model: 'CR-V' }}
        onSubmit={handleSubmit}
        onGetThisDeal={variant === 'edmunds' ? () => console.log('Get this deal') : undefined}
      />
    </div>
  );
}

const meta: Meta<typeof ContactDealerModal> = {
  title: 'Organisms/ContactDealerModal',
  component: ContactDealerModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Contact Dealer modal styled like the Make Offer modal (blue header, same layout and footer).

- **Default** – Same look: "Contact the Dealer" title, vehicle subtitle, short intro text, and "Request Dealer Info" button.
- **Form** – Same look with the full contact form: "Got Questions? Contact The Dealer", First/Last name, Email, Phone (optional), Message (prefilled), disclaimer, and "REQUEST INFO" button.
- **Edmunds** – Deal-detail style: white modal, vehicle name + MSRP + Read review, image area, engagement pills (like/comment/share), monthly price + at signing, "Our take" mint card, key offer details, "Get this deal" CTA, fine print.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ReviewBoth: Story = {
  name: '1. Review all variants (1–2–3 counter)',
  render: () => <ReviewBothVariants />,
};

export const Default: Story = {
  name: '2. Default (same modal look)',
  args: {
    isOpen: true,
    onClose: () => {},
    variant: 'default',
    vehicle: { year: 2026, make: 'Honda', model: 'CR-V' },
  },
};

export const Form: Story = {
  name: '3. Contact dealer form',
  args: {
    isOpen: true,
    onClose: () => {},
    variant: 'form',
    vehicle: { year: 2026, make: 'Honda', model: 'CR-V' },
  },
};

export const Edmunds: Story = {
  name: '4. Edmunds-inspired deal details',
  args: {
    isOpen: true,
    onClose: () => {},
    variant: 'edmunds',
    vehicle: { year: 2025, make: 'Jeep', model: 'Gladiator' },
    dealDetails: {
      msrp: 40095,
      monthlyPayment: 218,
      dueAtSigning: 2718,
      termMonths: 36,
      ourTakeRating: '5/5 Excellent',
      ourTakeText: "This lease deal offers exceptional value relative to the vehicle's MSRP.",
      keyDetails: [
        { label: 'Term', value: '36 months' },
        { label: 'Due at signing', value: '$2,718' },
        { label: 'Mileage allowance', value: '12,000 miles/year' },
        { label: 'Lifetime cost', value: '$10,348' },
        { label: 'Eligible trims', value: 'Sport' },
        { label: 'Offer ends', value: 'Mar. 30, 2026' },
      ],
      comparisonLabel: '$233/mo lower than similar cars',
    },
    onGetThisDeal: () => {},
  },
};
