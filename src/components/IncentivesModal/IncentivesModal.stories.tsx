import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import IncentivesModal, { type IncentivesModalVariant } from './IncentivesModal';

const VARIANTS: IncentivesModalVariant[] = [
  'simple',
  'complete-with-form',
  'edmunds',
  'conversion-a',
  'conversion-b',
];

const VARIANT_NAMES: Record<IncentivesModalVariant, string> = {
  simple: 'Incentives Modal 1 – Simple',
  'complete-with-form': 'Incentives Modal 2 – Complete + contact form',
  edmunds: 'Incentives Modal 3 – Edmunds-style',
  'conversion-a': 'Incentives Modal 4 – Conversion (urgency + benefits)',
  'conversion-b': 'Incentives Modal 5 – Conversion (minimal)',
};

function ReviewAllVariants() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const variant = VARIANTS[currentIndex];

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
          Pick a variant 1–5, then open the modal. Sample: 2026 Honda CR-V with photo. Use <kbd>←</kbd> <kbd>→</kbd> to cycle when the modal is open.
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
              aria-label={`Incentives Modal ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--color-gray-500)', margin: 0 }}>
          {VARIANT_NAMES[variant]}
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

      <IncentivesModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant={variant}
        onCtaClick={() => console.log('CTA clicked')}
        onSubmitForm={(data) => console.log('Form submitted', data)}
      />
    </div>
  );
}

const meta: Meta<typeof IncentivesModal> = {
  title: 'Organisms/IncentivesModal',
  component: IncentivesModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Five variants based on your reference modal, using the **2026 Honda CR-V** as the sample (with photo and current incentives):

- **Incentives Modal 1 (Simple)** – Vehicle photo + name + MSRP, green offer banner, one short “what it means” line, event label, “Get this deal” + “View full vehicle details”.
- **Incentives Modal 2 (Complete + form)** – Full reference layout (What does this mean, Your savings, Who qualifies, Eligible trims, Don’t wait) plus **contact dealer form** (First/Last, Email, Phone, Message) and “Request info from dealer”.
- **Incentives Modal 3 (Edmunds-style)** – Offer headline, “Our take” value card, Key offer details list, “Get this deal”.
- **Incentives Modal 4 (Conversion A)** – Urgency badge, header + offer banner, savings line, benefit bullets, single CTA.
- **Incentives Modal 5 (Conversion B)** – Minimal: header, hero offer line, one-liner, one CTA.

Use the **Review all** story and the 1–5 counter to pick one.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  isOpen: true,
  onClose: () => {},
  onCtaClick: () => {},
};

export const ReviewAll: Story = {
  name: 'Review all (1–5 counter)',
  render: () => <ReviewAllVariants />,
};

export const IncentivesModal1: Story = {
  name: 'Incentives Modal 1',
  args: { ...defaultArgs, variant: 'simple' },
};

export const IncentivesModal2: Story = {
  name: 'Incentives Modal 2',
  args: { ...defaultArgs, variant: 'complete-with-form' },
};

export const IncentivesModal3: Story = {
  name: 'Incentives Modal 3',
  args: { ...defaultArgs, variant: 'edmunds' },
};

export const IncentivesModal4: Story = {
  name: 'Incentives Modal 4',
  args: { ...defaultArgs, variant: 'conversion-a' },
};

export const IncentivesModal5: Story = {
  name: 'Incentives Modal 5',
  args: { ...defaultArgs, variant: 'conversion-b' },
};
