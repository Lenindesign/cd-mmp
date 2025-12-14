import type { Meta, StoryObj } from '@storybook/react';
import '../index.css';

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
  },
};

export default meta;
type Story = StoryObj;

// Styles object using design system tokens
const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-white)',
    fontFamily: 'var(--font-body)',
    color: 'var(--color-black)',
  },
  header: {
    padding: 'var(--spacing-20) var(--spacing-8)',
    maxWidth: 'var(--max-width-narrow)',
    margin: '0 auto',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)',
    padding: 'var(--spacing-2) var(--spacing-4)',
    backgroundColor: 'var(--color-gray-100)',
    borderRadius: 'var(--border-radius-full)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-gray-600)',
    marginBottom: 'var(--spacing-6)',
    letterSpacing: '0.02em',
  },
  title: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 'var(--font-weight-extrabold)',
    fontFamily: 'var(--font-display)',
    lineHeight: 'var(--line-height-tight)',
    color: 'var(--color-black)',
    marginBottom: 'var(--spacing-6)',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--color-gray-600)',
    lineHeight: 'var(--line-height-relaxed)',
    maxWidth: '540px',
  },
  divider: {
    width: '48px',
    height: '2px',
    backgroundColor: 'var(--color-blue-cobalt)',
    margin: 'var(--spacing-16) auto',
    border: 'none',
  },
  section: {
    padding: '0 var(--spacing-8) var(--spacing-16)',
    maxWidth: 'var(--max-width-narrow)',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-gray-400)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: 'var(--spacing-6)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'var(--spacing-4)',
  },
  card: {
    display: 'block',
    padding: 'var(--spacing-6)',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-gray-200)',
    borderRadius: 'var(--border-radius-lg)',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all var(--transition-normal)',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-black)',
    marginBottom: 'var(--spacing-2)',
  },
  cardDescription: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-gray-500)',
    lineHeight: 'var(--line-height-normal)',
  },
  tokenRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-4)',
    padding: 'var(--spacing-4) 0',
    borderBottom: '1px solid var(--color-gray-100)',
  },
  colorSwatch: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--border-radius-md)',
    flexShrink: 0,
  },
  tokenName: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-black)',
  },
  tokenValue: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-gray-500)',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  footer: {
    padding: 'var(--spacing-12) var(--spacing-8)',
    borderTop: '1px solid var(--color-gray-100)',
    textAlign: 'center' as const,
    color: 'var(--color-gray-400)',
    fontSize: 'var(--font-size-sm)',
  },
} as const;

// Card component with hover effect
const Card = ({ 
  title, 
  description, 
  href 
}: { 
  title: string; 
  description: string; 
  href: string;
}) => (
  <a 
    href={href}
    style={styles.card}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'var(--color-blue-cobalt)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'var(--color-gray-200)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <h3 style={styles.cardTitle}>{title}</h3>
    <p style={styles.cardDescription}>{description}</p>
  </a>
);

// Color token display
const ColorToken = ({ name, value, variable }: { name: string; value: string; variable: string }) => (
  <div style={styles.tokenRow}>
    <div style={{ ...styles.colorSwatch, backgroundColor: value }} />
    <div style={{ flex: 1 }}>
      <div style={styles.tokenName}>{name}</div>
      <div style={styles.tokenValue}>{variable}</div>
    </div>
  </div>
);

// Typography sample
const TypeSample = ({ name, size, weight, sample }: { name: string; size: string; weight: string; sample: string }) => (
  <div style={{ ...styles.tokenRow, flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
    <div style={{ 
      fontSize: size, 
      fontWeight: weight, 
      color: 'var(--color-black)',
      lineHeight: 'var(--line-height-snug)',
    }}>
      {sample}
    </div>
    <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
      <span style={styles.tokenValue}>{name}</span>
      <span style={{ ...styles.tokenValue, color: 'var(--color-gray-400)' }}>{size}</span>
    </div>
  </div>
);

// Spacing visual
const SpacingToken = ({ name, value, px }: { name: string; value: string; px: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', padding: 'var(--spacing-2) 0' }}>
    <div style={{ 
      width: value, 
      height: '8px', 
      backgroundColor: 'var(--color-blue-cobalt)',
      borderRadius: '2px',
      flexShrink: 0,
    }} />
    <span style={{ ...styles.tokenValue, minWidth: '80px' }}>{name}</span>
    <span style={{ ...styles.tokenValue, color: 'var(--color-gray-400)' }}>{px}</span>
  </div>
);

export const Welcome: Story = {
  name: '👋 Design System',
  render: () => (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.badge}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          Design System v1.0
        </div>
        <h1 style={styles.title}>
          Car and Driver
        </h1>
        <p style={styles.subtitle}>
          A focused component library built for the automotive marketplace. 
          Designed for clarity, built for scale.
        </p>
      </header>

      <hr style={styles.divider} />

      {/* Getting Started */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Getting Started</h2>
        <div style={styles.grid}>
          <Card 
            title="Components" 
            description="Browse the complete library of UI components"
            href="?path=/docs/atoms-button--docs"
          />
          <Card 
            title="Colors" 
            description="Color palette and semantic tokens"
            href="?path=/story/tokens-colors--all-colors"
          />
          <Card 
            title="Typography" 
            description="Type scale and font weights"
            href="?path=/story/tokens-typography--font-families"
          />
          <Card 
            title="Spacing" 
            description="Consistent spatial system"
            href="?path=/story/tokens-spacing--spacing-scale"
          />
        </div>
      </section>

      {/* Colors */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Color Palette</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-8)' }}>
          <div>
            <ColorToken name="Blue Cobalt" value="#1B5F8A" variable="--color-blue-cobalt" />
            <ColorToken name="Red" value="#D22730" variable="--color-red" />
            <ColorToken name="Black" value="#000000" variable="--color-black" />
          </div>
          <div>
            <ColorToken name="Gray 600" value="#666666" variable="--color-gray-600" />
            <ColorToken name="Gray 200" value="#e5e5e5" variable="--color-gray-200" />
            <ColorToken name="Gray 50" value="#fafafa" variable="--color-gray-50" />
          </div>
        </div>
      </section>

      {/* Typography */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Typography</h2>
        <TypeSample name="Display" size="var(--font-size-4xl)" weight="var(--font-weight-extrabold)" sample="Headlines" />
        <TypeSample name="Heading" size="var(--font-size-2xl)" weight="var(--font-weight-bold)" sample="Section Titles" />
        <TypeSample name="Body" size="var(--font-size-md)" weight="var(--font-weight-regular)" sample="Body text for reading" />
        <TypeSample name="Caption" size="var(--font-size-sm)" weight="var(--font-weight-medium)" sample="Supporting details" />
      </section>

      {/* Spacing */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Spacing Scale</h2>
        <SpacingToken name="--spacing-2" value="var(--spacing-2)" px="8px" />
        <SpacingToken name="--spacing-4" value="var(--spacing-4)" px="16px" />
        <SpacingToken name="--spacing-6" value="var(--spacing-6)" px="24px" />
        <SpacingToken name="--spacing-8" value="var(--spacing-8)" px="32px" />
        <SpacingToken name="--spacing-12" value="var(--spacing-12)" px="48px" />
        <SpacingToken name="--spacing-16" value="var(--spacing-16)" px="64px" />
      </section>

      {/* Component Categories */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Components</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-8)' }}>
          <div>
            <h3 style={{ 
              fontSize: 'var(--font-size-base)', 
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-black)',
              marginBottom: 'var(--spacing-4)',
            }}>
              Atoms
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
              {['Button', 'TextField', 'Toast', 'Spinner', 'Image'].map(item => (
                <li key={item} style={{ 
                  fontSize: 'var(--font-size-base)', 
                  color: 'var(--color-gray-600)',
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ 
              fontSize: 'var(--font-size-base)', 
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-black)',
              marginBottom: 'var(--spacing-4)',
            }}>
              Molecules
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
              {['QuickSpecs', 'Incentives', 'TrimSelector', 'MarketSpeed', 'Warranty'].map(item => (
                <li key={item} style={{ 
                  fontSize: 'var(--font-size-base)', 
                  color: 'var(--color-gray-600)',
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ 
              fontSize: 'var(--font-size-base)', 
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-black)',
              marginBottom: 'var(--spacing-4)',
            }}>
              Organisms
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
              {['Header', 'Footer', 'Hero', 'Comparison', 'VehicleRanking'].map(item => (
                <li key={item} style={{ 
                  fontSize: 'var(--font-size-base)', 
                  color: 'var(--color-gray-600)',
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Design Principles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-8)' }}>
          {[
            { title: 'Clarity', desc: 'Content-first design that reduces cognitive load' },
            { title: 'Consistency', desc: 'Predictable patterns across all touchpoints' },
            { title: 'Accessibility', desc: 'WCAG AA compliant with 4.5:1 contrast' },
            { title: 'Performance', desc: 'Optimized for speed and efficiency' },
          ].map(principle => (
            <div key={principle.title}>
              <h3 style={{ 
                fontSize: 'var(--font-size-md)', 
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-black)',
                marginBottom: 'var(--spacing-2)',
              }}>
                {principle.title}
              </h3>
              <p style={{ 
                fontSize: 'var(--font-size-base)', 
                color: 'var(--color-gray-500)',
                lineHeight: 'var(--line-height-relaxed)',
              }}>
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Car and Driver Design System</p>
      </footer>
    </div>
  ),
};
