import type { Meta, StoryObj } from '@storybook/react';
import '../index.css';

const meta: Meta = {
  title: 'Design System/Design Tokens',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
    chromatic: {
      disableSnapshot: true, // Disable Chromatic snapshots for this story (too large)
    },
  },
};

export default meta;
type Story = StoryObj;

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-white)',
    fontFamily: 'var(--font-body)',
    padding: 'var(--spacing-8)',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  header: {
    marginBottom: 'var(--spacing-8)',
  },
  title: {
    fontSize: 'var(--font-size-4xl)',
    fontWeight: 'var(--font-weight-bold)',
    fontFamily: 'var(--font-heading)',
    color: 'var(--color-black)',
    marginBottom: 'var(--spacing-2)',
  },
  subtitle: {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--color-gray-600)',
    lineHeight: 'var(--line-height-relaxed)',
  },
  section: {
    marginBottom: 'var(--spacing-12)',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-semibold)',
    fontFamily: 'var(--font-heading)',
    color: 'var(--color-black)',
    marginBottom: 'var(--spacing-4)',
    paddingBottom: 'var(--spacing-2)',
    borderBottom: '2px solid var(--color-gray-200)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 'var(--spacing-4)',
  },
  tokenCard: {
    padding: 'var(--spacing-4)',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-gray-200)',
    borderRadius: 'var(--border-radius-lg)',
  },
  tokenName: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-black)',
    marginBottom: 'var(--spacing-1)',
    fontFamily: 'monospace',
  },
  tokenValue: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-gray-500)',
    fontFamily: 'monospace',
  },
  colorSwatch: {
    height: '80px',
    borderRadius: 'var(--border-radius-md)',
    marginBottom: 'var(--spacing-2)',
    border: '1px solid var(--color-gray-200)',
  },
  spacingSwatch: {
    backgroundColor: 'var(--color-blue-cobalt)',
    marginBottom: 'var(--spacing-2)',
    borderRadius: 'var(--border-radius-sm)',
  },
  typographyExample: {
    marginBottom: 'var(--spacing-2)',
    color: 'var(--color-black)',
  },
  codeBlock: {
    backgroundColor: 'var(--color-gray-100)',
    padding: 'var(--spacing-2)',
    borderRadius: 'var(--border-radius-sm)',
    fontFamily: 'monospace',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-gray-700)',
    marginTop: 'var(--spacing-2)',
  },
} as const;

const colors = [
  { name: '--color-blue-cobalt', value: '#186CEA', usage: 'Primary brand color, links, interactive elements' },
  { name: '--color-white', value: '#FFFFFF', usage: 'Backgrounds, text on dark' },
  { name: '--color-black', value: '#000000', usage: 'Primary text, headings' },
  { name: '--color-gray-900', value: '#23262F', usage: 'Dark backgrounds, secondary text' },
  { name: '--color-gray-800', value: '#353945', usage: 'Borders, dividers' },
  { name: '--color-gray-700', value: '#777E90', usage: 'Tertiary text, placeholders' },
  { name: '--color-gray-600', value: '#B1B5C3', usage: 'Disabled text, subtle elements' },
  { name: '--color-gray-500', value: '#E6E8EC', usage: 'Borders, separators' },
  { name: '--color-gray-400', value: '#F4F5F6', usage: 'Light backgrounds' },
  { name: '--color-gray-300', value: '#FCFCFD', usage: 'Subtle backgrounds' },
  { name: '--color-gray-200', value: '#F5F5F5', usage: 'Hover states' },
  { name: '--color-gray-100', value: '#FAFAFA', usage: 'Backgrounds' },
  { name: '--color-red-500', value: '#EF4444', usage: 'Errors, destructive actions' },
  { name: '--color-green-500', value: '#22C55E', usage: 'Success states, positive actions' },
  { name: '--color-yellow-500', value: '#F59E0B', usage: 'Warnings, caution states' },
];

const spacing = [
  { name: '--spacing-1', value: '8px', usage: 'Tight spacing, small gaps' },
  { name: '--spacing-2', value: '16px', usage: 'Default spacing between elements' },
  { name: '--spacing-3', value: '24px', usage: 'Medium spacing, card padding' },
  { name: '--spacing-4', value: '32px', usage: 'Large spacing, section gaps' },
  { name: '--spacing-5', value: '40px', usage: 'Extra large spacing' },
  { name: '--spacing-6', value: '48px', usage: 'Section padding' },
  { name: '--spacing-8', value: '64px', usage: 'Page margins' },
  { name: '--spacing-10', value: '80px', usage: 'Large section spacing' },
  { name: '--spacing-12', value: '96px', usage: 'Hero spacing' },
  { name: '--spacing-16', value: '128px', usage: 'Extra large sections' },
  { name: '--spacing-20', value: '160px', usage: 'Maximum spacing' },
];

const typography = [
  { name: '--font-heading', value: 'Poppins, sans-serif', example: 'The quick brown fox', style: { fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600 } },
  { name: '--font-body', value: 'Geist, sans-serif', example: 'The quick brown fox jumps over the lazy dog', style: { fontFamily: 'var(--font-body)', fontSize: '16px' } },
];

const fontSizes = [
  { name: '--font-size-xs', value: '12px', example: 'Extra Small Text' },
  { name: '--font-size-sm', value: '14px', example: 'Small Text' },
  { name: '--font-size-base', value: '16px', example: 'Base Text' },
  { name: '--font-size-lg', value: '18px', example: 'Large Text' },
  { name: '--font-size-xl', value: '20px', example: 'Extra Large Text' },
  { name: '--font-size-2xl', value: '24px', example: '2XL Text' },
  { name: '--font-size-3xl', value: '30px', example: '3XL Text' },
  { name: '--font-size-4xl', value: '36px', example: '4XL Text' },
];

const borderRadius = [
  { name: '--border-radius-sm', value: '4px' },
  { name: '--border-radius-md', value: '8px' },
  { name: '--border-radius-lg', value: '16px' },
  { name: '--border-radius-full', value: '100px' },
  { name: '--border-radius-circle', value: '400px' },
];

const shadows = [
  { name: '--shadow-depth-5', value: '0px 4px 20px 0px rgba(20, 20, 22, 0.06)' },
];

export const AllTokens: Story = {
  name: '📋 All Design Tokens',
  render: () => (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Design Tokens</h1>
          <p style={styles.subtitle}>
            Car and Driver's design system tokens. These CSS variables ensure consistency across all components.
          </p>
        </header>

        {/* Colors */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🎨 Colors</h2>
          <div style={styles.grid}>
            {colors.map((color) => (
              <div key={color.name} style={styles.tokenCard}>
                <div style={{ ...styles.colorSwatch, backgroundColor: color.value }} />
                <div style={styles.tokenName}>{color.name}</div>
                <div style={styles.tokenValue}>{color.value}</div>
                <div style={{ ...styles.tokenValue, marginTop: 'var(--spacing-1)' }}>{color.usage}</div>
                <div style={styles.codeBlock}>color: var({color.name});</div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📏 Spacing</h2>
          <div style={styles.grid}>
            {spacing.map((space) => (
              <div key={space.name} style={styles.tokenCard}>
                <div style={{ ...styles.spacingSwatch, width: space.value, height: '24px' }} />
                <div style={styles.tokenName}>{space.name}</div>
                <div style={styles.tokenValue}>{space.value}</div>
                <div style={{ ...styles.tokenValue, marginTop: 'var(--spacing-1)' }}>{space.usage}</div>
                <div style={styles.codeBlock}>padding: var({space.name});</div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>✍️ Typography</h2>
          <div style={styles.grid}>
            {typography.map((font) => (
              <div key={font.name} style={styles.tokenCard}>
                <div style={{ ...styles.typographyExample, ...font.style }}>{font.example}</div>
                <div style={styles.tokenName}>{font.name}</div>
                <div style={styles.tokenValue}>{font.value}</div>
                <div style={styles.codeBlock}>font-family: var({font.name});</div>
              </div>
            ))}
          </div>
          
          <h3 style={{ ...styles.sectionTitle, fontSize: 'var(--font-size-xl)', marginTop: 'var(--spacing-6)' }}>Font Sizes</h3>
          <div style={styles.grid}>
            {fontSizes.map((size) => (
              <div key={size.name} style={styles.tokenCard}>
                <div style={{ ...styles.typographyExample, fontSize: size.value }}>{size.example}</div>
                <div style={styles.tokenName}>{size.name}</div>
                <div style={styles.tokenValue}>{size.value}</div>
                <div style={styles.codeBlock}>font-size: var({size.name});</div>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🔲 Border Radius</h2>
          <div style={styles.grid}>
            {borderRadius.map((radius) => (
              <div key={radius.name} style={styles.tokenCard}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--color-blue-cobalt)',
                  borderRadius: radius.value,
                  marginBottom: 'var(--spacing-2)',
                }} />
                <div style={styles.tokenName}>{radius.name}</div>
                <div style={styles.tokenValue}>{radius.value}</div>
                <div style={styles.codeBlock}>border-radius: var({radius.name});</div>
              </div>
            ))}
          </div>
        </section>

        {/* Shadows */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>💫 Shadows</h2>
          <div style={styles.grid}>
            {shadows.map((shadow) => (
              <div key={shadow.name} style={styles.tokenCard}>
                <div style={{
                  width: '100%',
                  height: '80px',
                  backgroundColor: 'var(--color-white)',
                  boxShadow: shadow.value,
                  borderRadius: 'var(--border-radius-md)',
                  marginBottom: 'var(--spacing-2)',
                }} />
                <div style={styles.tokenName}>{shadow.name}</div>
                <div style={styles.tokenValue}>{shadow.value}</div>
                <div style={styles.codeBlock}>box-shadow: var({shadow.name});</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  ),
};

