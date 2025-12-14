import type { Meta, StoryObj } from '@storybook/react';

const TypographyRow = ({ 
  name, 
  specs,
  fontFamily,
  fontSize,
  fontWeight,
}: { 
  name: string; 
  specs: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
}) => (
  <div style={{ 
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid var(--color-gray-200)'
  }}>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '8px',
      gap: '24px'
    }}>
      <div>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 600,
          color: 'var(--color-gray-800)',
          marginBottom: '4px'
        }}>
          {name}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>{specs}</div>
      </div>
    </div>
    <div style={{ 
      fontFamily, 
      fontSize, 
      fontWeight,
      color: 'var(--color-black)'
    }}>
      The quick brown fox jumps over the lazy dog.
    </div>
  </div>
);

const TypographyPage = () => (
  <div style={{ padding: '24px', fontFamily: 'var(--font-body)', maxWidth: '800px' }}>
    <h1 style={{ 
      fontFamily: 'var(--font-heading)',
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '32px',
      color: 'var(--color-black)'
    }}>
      Typography System
    </h1>
    
    <div style={{ 
      marginBottom: '32px',
      padding: '16px',
      background: 'var(--color-gray-100)',
      borderRadius: '8px'
    }}>
      <h3 style={{ marginBottom: '12px', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>Font Families</h3>
      <div style={{ display: 'grid', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <code style={{ 
            background: 'var(--color-white)', 
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            --font-display
          </code>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px' }}>Inter (Display)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <code style={{ 
            background: 'var(--color-white)', 
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            --font-heading
          </code>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px' }}>Inter (Headings)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <code style={{ 
            background: 'var(--color-white)', 
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            --font-body
          </code>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>Inter (Body)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <code style={{ 
            background: 'var(--color-white)', 
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            --font-article
          </code>
          <span style={{ fontFamily: 'var(--font-article)', fontSize: '14px' }}>Libre Baskerville (Articles)</span>
        </div>
      </div>
    </div>

    <h2 style={{ 
      fontFamily: 'var(--font-heading)',
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '16px',
      paddingBottom: '8px',
      borderBottom: '2px solid var(--color-blue-cobalt)'
    }}>
      Display & Headings
    </h2>

    <TypographyRow 
      name="Display XL" 
      specs="48px / Inter / Bold (800)"
      fontFamily="var(--font-display)"
      fontSize="48px"
      fontWeight={800}
    />
    
    <TypographyRow 
      name="Display Large" 
      specs="36px / Inter / Bold (700)"
      fontFamily="var(--font-display)"
      fontSize="36px"
      fontWeight={700}
    />
    
    <TypographyRow 
      name="Heading 1" 
      specs="32px / Inter / Bold (700)"
      fontFamily="var(--font-heading)"
      fontSize="32px"
      fontWeight={700}
    />
    
    <TypographyRow 
      name="Heading 2" 
      specs="24px / Inter / Bold (700)"
      fontFamily="var(--font-heading)"
      fontSize="24px"
      fontWeight={700}
    />
    
    <TypographyRow 
      name="Heading 3" 
      specs="20px / Inter / SemiBold (600)"
      fontFamily="var(--font-heading)"
      fontSize="20px"
      fontWeight={600}
    />
    
    <TypographyRow 
      name="Heading 4" 
      specs="18px / Inter / SemiBold (600)"
      fontFamily="var(--font-heading)"
      fontSize="18px"
      fontWeight={600}
    />

    <h2 style={{ 
      fontFamily: 'var(--font-heading)',
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '16px',
      marginTop: '32px',
      paddingBottom: '8px',
      borderBottom: '2px solid var(--color-blue-cobalt)'
    }}>
      Body Text
    </h2>
    
    <TypographyRow 
      name="Body Large" 
      specs="18px / Inter / Regular (400)"
      fontFamily="var(--font-body)"
      fontSize="18px"
      fontWeight={400}
    />
    
    <TypographyRow 
      name="Body Default" 
      specs="16px / Inter / Regular (400)"
      fontFamily="var(--font-body)"
      fontSize="16px"
      fontWeight={400}
    />
    
    <TypographyRow 
      name="Body Small" 
      specs="14px / Inter / Regular (400)"
      fontFamily="var(--font-body)"
      fontSize="14px"
      fontWeight={400}
    />
    
    <TypographyRow 
      name="Caption" 
      specs="12px / Inter / Regular (400)"
      fontFamily="var(--font-body)"
      fontSize="12px"
      fontWeight={400}
    />

    <h2 style={{ 
      fontFamily: 'var(--font-heading)',
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '16px',
      marginTop: '32px',
      paddingBottom: '8px',
      borderBottom: '2px solid var(--color-blue-cobalt)'
    }}>
      UI Text
    </h2>
    
    <TypographyRow 
      name="Button" 
      specs="14px / Inter / SemiBold (600) / Uppercase"
      fontFamily="var(--font-body)"
      fontSize="14px"
      fontWeight={600}
    />
    
    <TypographyRow 
      name="Label" 
      specs="12px / Inter / Medium (500)"
      fontFamily="var(--font-body)"
      fontSize="12px"
      fontWeight={500}
    />

    <h2 style={{ 
      fontFamily: 'var(--font-heading)',
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '16px',
      marginTop: '32px',
      paddingBottom: '8px',
      borderBottom: '2px solid var(--color-blue-cobalt)'
    }}>
      Font Weights
    </h2>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
      {[
        { name: 'Regular', weight: 400, var: '--font-weight-regular' },
        { name: 'Medium', weight: 500, var: '--font-weight-medium' },
        { name: 'SemiBold', weight: 600, var: '--font-weight-semibold' },
        { name: 'Bold', weight: 700, var: '--font-weight-bold' },
        { name: 'ExtraBold', weight: 800, var: '--font-weight-extrabold' },
      ].map((w) => (
        <div key={w.weight} style={{ 
          padding: '16px',
          background: 'var(--color-gray-50)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '24px', 
            fontWeight: w.weight,
            marginBottom: '8px'
          }}>
            Aa
          </div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>{w.name}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>{w.weight}</div>
          <code style={{ 
            fontSize: '10px', 
            background: 'var(--color-white)', 
            padding: '2px 4px',
            borderRadius: '4px'
          }}>
            {w.var}
          </code>
        </div>
      ))}
    </div>

    <h2 style={{ 
      fontFamily: 'var(--font-heading)',
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '16px',
      marginTop: '32px',
      paddingBottom: '8px',
      borderBottom: '2px solid var(--color-blue-cobalt)'
    }}>
      Font Sizes
    </h2>

    <div style={{ display: 'grid', gap: '12px' }}>
      {[
        { name: 'xs', size: '12px', var: '--font-size-xs' },
        { name: 'sm', size: '14px', var: '--font-size-sm' },
        { name: 'base', size: '16px', var: '--font-size-base' },
        { name: 'md', size: '16px', var: '--font-size-md' },
        { name: 'lg', size: '18px', var: '--font-size-lg' },
        { name: 'xl', size: '20px', var: '--font-size-xl' },
        { name: '2xl', size: '24px', var: '--font-size-2xl' },
        { name: '3xl', size: '32px', var: '--font-size-3xl' },
        { name: '4xl', size: '40px', var: '--font-size-4xl' },
      ].map((s) => (
        <div key={s.var} style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 0',
          borderBottom: '1px solid var(--color-gray-100)'
        }}>
          <code style={{ 
            fontSize: '12px', 
            background: 'var(--color-gray-100)', 
            padding: '4px 8px',
            borderRadius: '4px',
            minWidth: '140px'
          }}>
            {s.var}
          </code>
          <span style={{ fontSize: '12px', color: 'var(--color-gray-500)', minWidth: '50px' }}>{s.size}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: s.size }}>Sample Text</span>
        </div>
      ))}
    </div>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Typography',
  component: TypographyPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Typography scale and text styles for the Car and Driver design system.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const AllStyles: Story = {};
