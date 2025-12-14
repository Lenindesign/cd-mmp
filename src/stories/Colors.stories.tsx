import type { Meta, StoryObj } from '@storybook/react';

const ColorSwatch = ({ 
  name, 
  value, 
  cssVar,
  textColor = '#000'
}: { 
  name: string; 
  value: string; 
  cssVar: string;
  textColor?: string;
}) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '16px',
    marginBottom: '8px'
  }}>
    <div 
      style={{ 
        width: '60px', 
        height: '60px', 
        backgroundColor: value,
        borderRadius: '8px',
        border: '1px solid var(--color-gray-200)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: textColor,
        fontSize: '10px',
        fontWeight: 600
      }} 
    >
      Aa
    </div>
    <div>
      <div style={{ fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-heading)' }}>{name}</div>
      <code style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>{cssVar}</code>
      <div style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--color-gray-600)' }}>{value}</div>
    </div>
  </div>
);

const ColorGroup = ({ 
  title, 
  colors 
}: { 
  title: string; 
  colors: Array<{ name: string; value: string; cssVar: string; textColor?: string }>;
}) => (
  <div style={{ marginBottom: '32px' }}>
    <h3 style={{ 
      fontFamily: 'var(--font-heading)',
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '16px',
      borderBottom: '2px solid var(--color-blue-cobalt)',
      paddingBottom: '8px'
    }}>
      {title}
    </h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
      {colors.map((color) => (
        <ColorSwatch key={color.cssVar} {...color} />
      ))}
    </div>
  </div>
);

const ColorsPage = () => (
  <div style={{ padding: '24px', fontFamily: 'var(--font-body)' }}>
    <h1 style={{ 
      fontFamily: 'var(--font-heading)',
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '32px',
      color: 'var(--color-black)'
    }}>
      Color System
    </h1>
    
    <ColorGroup 
      title="Primary - Blue Cobalt" 
      colors={[
        { name: 'Blue Cobalt', value: '#1B5F8A', cssVar: '--color-blue-cobalt', textColor: '#fff' },
        { name: 'Blue Cobalt Dark', value: '#154d70', cssVar: '--color-blue-cobalt-dark', textColor: '#fff' },
        { name: 'Blue Cobalt Light', value: '#60A5FA', cssVar: '--color-blue-cobalt-light', textColor: '#000' },
      ]}
    />
    
    <ColorGroup 
      title="Secondary - Red" 
      colors={[
        { name: 'Red', value: '#D22730', cssVar: '--color-red', textColor: '#fff' },
        { name: 'Red Dark', value: '#b31f27', cssVar: '--color-red-dark', textColor: '#fff' },
      ]}
    />
    
    <ColorGroup 
      title="Semantic - Status" 
      colors={[
        { name: 'Success', value: '#22c55e', cssVar: '--color-success', textColor: '#000' },
        { name: 'Success Light', value: 'rgba(34, 197, 94, 0.08)', cssVar: '--color-success-light', textColor: '#16a34a' },
        { name: 'Warning', value: '#f59e0b', cssVar: '--color-warning', textColor: '#000' },
        { name: 'Warning Light', value: 'rgba(245, 158, 11, 0.08)', cssVar: '--color-warning-light', textColor: '#c2410c' },
        { name: 'Error', value: '#ef4444', cssVar: '--color-error', textColor: '#000' },
        { name: 'Error Light', value: 'rgba(239, 68, 68, 0.1)', cssVar: '--color-error-light', textColor: '#dc2626' },
        { name: 'Info', value: '#0288d1', cssVar: '--color-info', textColor: '#fff' },
      ]}
    />
    
    <ColorGroup 
      title="Neutrals" 
      colors={[
        { name: 'Black', value: '#000000', cssVar: '--color-black', textColor: '#fff' },
        { name: 'Dark', value: '#222222', cssVar: '--color-dark', textColor: '#fff' },
        { name: 'Gray 900', value: '#1a1a1a', cssVar: '--color-gray-900', textColor: '#fff' },
        { name: 'Gray 800', value: '#333333', cssVar: '--color-gray-800', textColor: '#fff' },
        { name: 'Gray 700', value: '#4a4a4a', cssVar: '--color-gray-700', textColor: '#fff' },
        { name: 'Gray 600', value: '#666666', cssVar: '--color-gray-600', textColor: '#fff' },
        { name: 'Gray 500', value: '#888888', cssVar: '--color-gray-500', textColor: '#fff' },
        { name: 'Gray 400', value: '#aaaaaa', cssVar: '--color-gray-400', textColor: '#000' },
        { name: 'Gray 300', value: '#cdcdcd', cssVar: '--color-gray-300', textColor: '#000' },
        { name: 'Gray 200', value: '#e5e5e5', cssVar: '--color-gray-200', textColor: '#000' },
        { name: 'Gray 100', value: '#f5f5f5', cssVar: '--color-gray-100', textColor: '#000' },
        { name: 'Gray 50', value: '#fafafa', cssVar: '--color-gray-50', textColor: '#000' },
        { name: 'White', value: '#ffffff', cssVar: '--color-white', textColor: '#000' },
      ]}
    />
    
    <ColorGroup 
      title="Special Backgrounds" 
      colors={[
        { name: 'Teal Light', value: '#F1F7F7', cssVar: '--color-teal-light', textColor: '#000' },
        { name: 'Gray X-Light', value: '#f5f5f5', cssVar: '--color-gray-xlight', textColor: '#000' },
      ]}
    />
  </div>
);

const meta: Meta = {
  title: 'Tokens/Colors',
  component: ColorsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete color palette for the Car and Driver design system.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const AllColors: Story = {};
