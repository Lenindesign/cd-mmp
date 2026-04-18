import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  BEST_BUYING_FAQ,
  LEASE_FAQ,
  ZERO_APR_FAQ,
  type FaqItem,
} from '../data/faqs';
import '../pages/ZeroAprDealsPage/ZeroAprDealsPage.css';
import '../pages/LeaseDealsPage/LeaseDealsPage.css';
import '../index.css';

/**
 * FAQ accordions rendered exactly as they appear on the three deal pages.
 *
 * The markup, class prefixes, and chevron sizing mirror the production pages
 * so these stories double as visual-regression coverage for the FAQ copy and
 * spacing. Toggle the `initialState` story control to compare the all-collapsed
 * and all-expanded presentations.
 */

const CAR_AND_DRIVER = 'Car and Driver';

function renderZeroAprQuestion(question: string): ReactNode {
  const i = question.indexOf(CAR_AND_DRIVER);
  if (i === -1) return question;
  return (
    <>
      {question.slice(0, i)}
      <em className="zero-apr-page__faq-question-brand">{CAR_AND_DRIVER}</em>
      {question.slice(i + CAR_AND_DRIVER.length)}
    </>
  );
}

type FaqAccordionPreviewProps = {
  data: FaqItem[];
  classPrefix: 'zero-apr-page' | 'lease-deals-page';
  heading: string;
  headingClass: 'faq-heading' | 'section-title';
  headingId?: string;
  sectionAriaLabelledBy?: string;
  chevronSize: number;
  renderQuestion?: (question: string) => ReactNode;
  initiallyExpanded: boolean;
};

function FaqAccordionPreview({
  data,
  classPrefix,
  heading,
  headingClass,
  headingId,
  sectionAriaLabelledBy,
  chevronSize,
  renderQuestion,
  initiallyExpanded,
}: FaqAccordionPreviewProps) {
  const [expanded, setExpanded] = useState<Set<number>>(() =>
    initiallyExpanded ? new Set(data.map((_, i) => i)) : new Set()
  );

  const toggle = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section
      className={`${classPrefix}__faq-section`}
      aria-labelledby={sectionAriaLabelledBy}
    >
      <h2 id={headingId} className={`${classPrefix}__${headingClass}`}>
        {heading}
      </h2>
      <div className={`${classPrefix}__faq-list`}>
        {data.map((faq, index) => {
          const isOpen = expanded.has(index);
          return (
            <div
              key={index}
              className={`${classPrefix}__faq-item${
                isOpen ? ` ${classPrefix}__faq-item--expanded` : ''
              }`}
            >
              <button
                type="button"
                className={`${classPrefix}__faq-question`}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span
                  className={
                    classPrefix === 'zero-apr-page'
                      ? 'zero-apr-page__faq-question-text'
                      : undefined
                  }
                >
                  {renderQuestion ? renderQuestion(faq.question) : faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp size={chevronSize} aria-hidden />
                ) : (
                  <ChevronDown size={chevronSize} aria-hidden />
                )}
              </button>
              {isOpen && (
                <div className={`${classPrefix}__faq-answer`}>
                  {faq.answer.split('\n\n').map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                  {faq.bullets && faq.bullets.length > 0 && (
                    <>
                      <p>
                        <strong>Things to keep in mind:</strong>
                      </p>
                      <ul>
                        {faq.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

type StoryProps = {
  /**
   * Controls whether the accordion mounts with every FAQ open (`expanded`)
   * or every FAQ closed (`collapsed`). Clicks still toggle individual items.
   */
  initialState: 'collapsed' | 'expanded';
};

const PAGE_WRAPPER_STYLE: React.CSSProperties = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: 'var(--spacing-8, 32px) var(--spacing-6, 24px)',
  backgroundColor: 'var(--color-white, #ffffff)',
};

const meta: Meta<StoryProps> = {
  title: 'Patterns/FAQ Sections',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Deals FAQ Sections

Production FAQ accordions from the three deal pages, rendered with real copy
and the same BEM classes each page ships with. Use these stories to review the
accordion pattern at rest (all collapsed) and fully open (all expanded) for:

- **Best Buying Deals** — \`/deals/best-buying-deals\`
- **0% APR Deals** — \`/deals/0-percent-apr\`
- **Lease Deals** — \`/deals/lease\`

Each question remains interactive — click any row to toggle it. The
\`initialState\` control switches between the collapsed and expanded variants.
        `.trim(),
      },
    },
  },
  argTypes: {
    initialState: {
      control: { type: 'radio' },
      options: ['collapsed', 'expanded'],
      description: 'Initial accordion state when the story mounts.',
    },
  },
  args: {
    initialState: 'collapsed',
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const BestBuyingDealsCollapsed: Story = {
  name: 'Best Buying Deals — Collapsed',
  args: { initialState: 'collapsed' },
  render: (args) => (
    <div style={PAGE_WRAPPER_STYLE}>
      <FaqAccordionPreview
        data={BEST_BUYING_FAQ}
        classPrefix="zero-apr-page"
        heading="FAQs"
        headingClass="faq-heading"
        headingId="best-buying-faq-heading"
        sectionAriaLabelledBy="best-buying-faq-heading"
        chevronSize={24}
        renderQuestion={renderZeroAprQuestion}
        initiallyExpanded={args.initialState === 'expanded'}
      />
    </div>
  ),
};

export const BestBuyingDealsExpanded: Story = {
  ...BestBuyingDealsCollapsed,
  name: 'Best Buying Deals — All Expanded',
  args: { initialState: 'expanded' },
};

export const ZeroAprCollapsed: Story = {
  name: '0% APR — Collapsed',
  args: { initialState: 'collapsed' },
  render: (args) => (
    <div style={PAGE_WRAPPER_STYLE}>
      <FaqAccordionPreview
        data={ZERO_APR_FAQ}
        classPrefix="zero-apr-page"
        heading="FAQs"
        headingClass="faq-heading"
        headingId="zero-apr-faq-heading"
        sectionAriaLabelledBy="zero-apr-faq-heading"
        chevronSize={24}
        renderQuestion={renderZeroAprQuestion}
        initiallyExpanded={args.initialState === 'expanded'}
      />
    </div>
  ),
};

export const ZeroAprExpanded: Story = {
  ...ZeroAprCollapsed,
  name: '0% APR — All Expanded',
  args: { initialState: 'expanded' },
};

export const LeaseCollapsed: Story = {
  name: 'Lease — Collapsed',
  args: { initialState: 'collapsed' },
  render: (args) => (
    <div style={PAGE_WRAPPER_STYLE}>
      <FaqAccordionPreview
        data={LEASE_FAQ}
        classPrefix="lease-deals-page"
        heading="Frequently Asked Questions About Leasing"
        headingClass="section-title"
        chevronSize={20}
        initiallyExpanded={args.initialState === 'expanded'}
      />
    </div>
  ),
};

export const LeaseExpanded: Story = {
  ...LeaseCollapsed,
  name: 'Lease — All Expanded',
  args: { initialState: 'expanded' },
};
