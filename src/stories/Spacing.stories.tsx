import type { Meta, StoryObj } from '@storybook/react';

const SpacingBlock = ({ 
  name, 
  value, 
  cssVar,
  pixels
}: { 
  name: string; 
  value: string; 
  cssVar: string;
  pixels: string;
}) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '16px',
    marginBottom: '12px',
    padding: '8px 0',
    borderBottom: '1px solid var(--color-gray-100)'
  }}>
    <div 
      style={{ 
        width: pixels,
        height: '32px',
        backgroundColor: 'var(--color-blue-cobalt)',
        borderRadius: '4px',
        flexShrink: 0,
        minWidth: '4px'
      }} 
    />
    <div style={{ minWidth: '80px' }}>
      <div style={{ fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-heading)' }}>{name}</div>
      <div style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>{pixels}</div>
    </div>
    <code style={{ 
      fontSize: '12px', 
      background: 'var(--color-gray-100)', 
      padding: '4px 8px',
      borderRadius: '4px',
      color: 'var(--color-gray-700)'
    }}>
      {cssVar}
    </code>
    <span style={{ fontSize: '12px', color: 'var(--color-gray-500)', fontFamily: 'monospace' }}>{value}</span>
  </div>
);

const SpacingPage = () => (
  <div style={{ padding: '24px', fontFamily: 'var(--font-body)' }}>
    <h1 style={{ 
      fontFamily: 'var(--font-heading)',
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '16px',
      color: 'var(--color-black)'
    }}>
      Spacing System
    </h1>
    
    <p style={{ 
      marginBottom: '32px',
      color: 'var(--color-gray-600)'
    }}>
      Based on a 4px grid. Use these tokens for margins, paddings, and gaps.
    </p>
    
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ 
        fontFamily: 'var(--font-heading)',
        fontSize: '18px',
        fontWeight: 600,
        marginBottom: '16px',
        borderBottom: '2px solid var(--color-blue-cobalt)',
        paddingBottom: '8px'
      }}>
        Spacing Scale
      </h3>
      
      <SpacingBlock name="spacing-0" value="0" cssVar="var(--spacing-0)" pixels="0px" />
      <SpacingBlock name="spacing-1" value="0.25rem" cssVar="var(--spacing-1)" pixels="4px" />
      <SpacingBlock name="spacing-2" value="0.5rem" cssVar="var(--spacing-2)" pixels="8px" />
      <SpacingBlock name="spacing-3" value="0.75rem" cssVar="var(--spacing-3)" pixels="12px" />
      <SpacingBlock name="spacing-4" value="1rem" cssVar="var(--spacing-4)" pixels="16px" />
      <SpacingBlock name="spacing-5" value="1.25rem" cssVar="var(--spacing-5)" pixels="20px" />
      <SpacingBlock name="spacing-6" value="1.5rem" cssVar="var(--spacing-6)" pixels="24px" />
      <SpacingBlock name="spacing-8" value="2rem" cssVar="var(--spacing-8)" pixels="32px" />
      <SpacingBlock name="spacing-10" value="2.5rem" cssVar="var(--spacing-10)" pixels="40px" />
      <SpacingBlock name="spacing-12" value="3rem" cssVar="var(--spacing-12)" pixels="48px" />
      <SpacingBlock name="spacing-16" value="4rem" cssVar="var(--spacing-16)" pixels="64px" />
      <SpacingBlock name="spacing-20" value="5rem" cssVar="var(--spacing-20)" pixels="80px" />
      <SpacingBlock name="spacing-24" value="6rem" cssVar="var(--spacing-24)" pixels="96px" />
    </div>
    
    <div>
      <h3 style={{ 
        fontFamily: 'var(--font-heading)',
        fontSize: '18px',
        fontWeight: 600,
        marginBottom: '16px',
        borderBottom: '2px solid var(--color-blue-cobalt)',
        paddingBottom: '8px'
      }}>
        Border Radius
      </h3>
      
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {[
          { name: 'Small', value: '4px', cssVar: '--border-radius-sm' },
          { name: 'Medium', value: '8px', cssVar: '--border-radius-md' },
          { name: 'Large', value: '12px', cssVar: '--border-radius-lg' },
          { name: 'XL', value: '16px', cssVar: '--border-radius-xl' },
          { name: 'Full', value: '9999px', cssVar: '--border-radius-full' },
        ].map((radius) => (
          <div key={radius.cssVar} style={{ textAlign: 'center' }}>
            <div 
              style={{ 
                width: '80px',
                height: '80px',
                backgroundColor: 'var(--color-blue-cobalt)',
                borderRadius: radius.value,
                marginBottom: '8px'
              }} 
            />
            <div style={{ fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-heading)' }}>{radius.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>{radius.value}</div>
            <code style={{ 
              fontSize: '10px', 
              background: 'var(--color-gray-100)', 
              padding: '2px 4px',
              borderRadius: '4px'
            }}>
              {radius.cssVar}
            </code>
          </div>
        ))}
      </div>
    </div>

    <div style={{ marginTop: '32px' }}>
      <h3 style={{ 
        fontFamily: 'var(--font-heading)',
        fontSize: '18px',
        fontWeight: 600,
        marginBottom: '16px',
        borderBottom: '2px solid var(--color-blue-cobalt)',
        paddingBottom: '8px'
      }}>
        Shadows
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
        {[
          { name: 'Small', cssVar: '--shadow-sm', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
          { name: 'Default', cssVar: '--shadow', value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' },
          { name: 'Medium', cssVar: '--shadow-md', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
          { name: 'Large', cssVar: '--shadow-lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
          { name: 'XL', cssVar: '--shadow-xl', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
        ].map((shadow) => (
          <div key={shadow.cssVar} style={{ textAlign: 'center' }}>
            <div 
              style={{ 
                width: '100%',
                height: '80px',
                backgroundColor: 'var(--color-white)',
                borderRadius: '8px',
                boxShadow: shadow.value,
                marginBottom: '8px'
              }} 
            />
            <div style={{ fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-heading)' }}>{shadow.name}</div>
            <code style={{ 
              fontSize: '10px', 
              background: 'var(--color-gray-100)', 
              padding: '2px 4px',
              borderRadius: '4px'
            }}>
              {shadow.cssVar}
            </code>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Spacing',
  component: SpacingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Spacing scale, border radius, and shadow tokens.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const AllSpacing: Story = {};
