import type { Meta, StoryObj } from '@storybook/react';
import '../index.css';

const meta: Meta = {
  title: 'Welcome',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
  },
};

export default meta;

type Story = StoryObj;

// Car and Driver Logo SVG
const CarAndDriverLogo = () => (
  <svg viewBox="0 0 200 24" fill="currentColor" style={{ height: '32px', width: 'auto' }}>
    <text x="0" y="20" fontFamily="var(--font-display)" fontWeight="700" fontSize="20" letterSpacing="1">
      CAR AND DRIVER
    </text>
  </svg>
);

// Badge component
const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'new' | 'updated' }) => {
  const colors = {
    default: { bg: 'var(--color-gray-100)', text: 'var(--color-gray-700)' },
    new: { bg: 'var(--color-success)', text: 'white' },
    updated: { bg: 'var(--color-blue-cobalt)', text: 'white' },
  };
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      backgroundColor: colors[variant].bg,
      color: colors[variant].text,
    }}>
      {children}
    </span>
  );
};

// Quick Link Card
const QuickLinkCard = ({ 
  title, 
  description, 
  icon, 
  href,
  badge
}: { 
  title: string; 
  description: string; 
  icon: string;
  href: string;
  badge?: { text: string; variant: 'default' | 'new' | 'updated' };
}) => (
  <a 
    href={href}
    style={{
      display: 'block',
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '1px solid var(--color-gray-200)',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
      e.currentTarget.style.borderColor = 'var(--color-blue-cobalt)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
      e.currentTarget.style.borderColor = 'var(--color-gray-200)';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
      <span style={{ fontSize: '32px' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: '18px', 
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
          }}>
            {title}
          </h3>
          {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
        </div>
        <p style={{ 
          margin: 0, 
          fontSize: '14px', 
          color: 'var(--color-gray-600)',
          lineHeight: 1.5,
        }}>
          {description}
        </p>
      </div>
      <span style={{ color: 'var(--color-gray-400)', fontSize: '20px' }}>→</span>
    </div>
  </a>
);

// Color Token Display
const ColorToken = ({ name, token, color, textColor = 'white' }: { 
  name: string; 
  token: string; 
  color: string;
  textColor?: string;
}) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px',
    padding: '8px 12px',
    backgroundColor: 'var(--color-gray-50)',
    borderRadius: '8px',
  }}>
    <div style={{ 
      width: '40px', 
      height: '40px', 
      backgroundColor: color, 
      borderRadius: '8px',
      border: '1px solid rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: textColor,
      fontSize: '10px',
      fontWeight: 600,
    }}>
      Aa
    </div>
    <div>
      <div style={{ fontSize: '14px', fontWeight: 600 }}>{name}</div>
      <code style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>{token}</code>
    </div>
  </div>
);

// Stat Card
const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div style={{ textAlign: 'center', padding: '16px' }}>
    <div style={{ 
      fontSize: '36px', 
      fontWeight: 800, 
      fontFamily: 'var(--font-display)',
      color: 'var(--color-blue-cobalt)',
      lineHeight: 1,
    }}>
      {value}
    </div>
    <div style={{ 
      fontSize: '14px', 
      color: 'var(--color-gray-600)',
      marginTop: '4px',
    }}>
      {label}
    </div>
  </div>
);

export const DesignSystem: Story = {
  name: '👋 Welcome',
  render: () => (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: 'var(--color-gray-50)',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        padding: '64px 32px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            marginBottom: '32px',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'var(--color-red)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
            }}>
              CD
            </div>
            <div>
              <div style={{ 
                fontSize: '14px', 
                textTransform: 'uppercase', 
                letterSpacing: '2px',
                opacity: 0.7,
              }}>
                Car and Driver
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
              }}>
                Design System
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <h1 style={{ 
            fontSize: 'clamp(36px, 5vw, 56px)', 
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            margin: '0 0 16px 0',
            lineHeight: 1.1,
          }}>
            Build beautiful automotive
            <br />
            <span style={{ color: 'var(--color-red)' }}>experiences</span>
          </h1>
          <p style={{ 
            fontSize: '18px', 
            opacity: 0.8, 
            maxWidth: '600px',
            lineHeight: 1.6,
            margin: 0,
          }}>
            A comprehensive component library and design system for the Car and Driver 
            marketplace platform. Built with React, TypeScript, and accessibility in mind.
          </p>

          {/* Stats */}
          <div style={{ 
            display: 'flex', 
            gap: '48px', 
            marginTop: '48px',
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>40+</div>
              <div style={{ fontSize: '14px', opacity: 0.7 }}>Components</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>3</div>
              <div style={{ fontSize: '14px', opacity: 0.7 }}>Typography Families</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>12</div>
              <div style={{ fontSize: '14px', opacity: 0.7 }}>Color Tokens</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>A11y</div>
              <div style={{ fontSize: '14px', opacity: 0.7 }}>WCAG AA+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 32px' }}>
        
        {/* Quick Links */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 700, 
            fontFamily: 'var(--font-heading)',
            marginBottom: '24px',
          }}>
            🚀 Quick Start
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '16px' 
          }}>
            <QuickLinkCard
              icon="🎨"
              title="Colors"
              description="Brand colors, semantic tokens, and accessibility-compliant palettes"
              href="?path=/story/tokens-colors--all-colors"
            />
            <QuickLinkCard
              icon="✍️"
              title="Typography"
              description="Font families, sizes, weights, and text styling guidelines"
              href="?path=/story/tokens-typography--font-families"
            />
            <QuickLinkCard
              icon="📏"
              title="Spacing"
              description="Consistent spacing scale based on 4px increments"
              href="?path=/story/tokens-spacing--spacing-scale"
            />
            <QuickLinkCard
              icon="🔘"
              title="Button"
              description="Primary, secondary, ghost, and outline button variants"
              href="?path=/story/atoms-button--primary"
              badge={{ text: 'Popular', variant: 'default' }}
            />
            <QuickLinkCard
              icon="📝"
              title="TextField"
              description="Text inputs with labels, errors, and icon support"
              href="?path=/story/atoms-textfield--default"
            />
            <QuickLinkCard
              icon="🏠"
              title="Hero"
              description="Full-featured vehicle hero section with gallery"
              href="?path=/story/organisms-hero--default"
              badge={{ text: 'Complex', variant: 'updated' }}
            />
          </div>
        </section>

        {/* Architecture */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 700, 
            fontFamily: 'var(--font-heading)',
            marginBottom: '24px',
          }}>
            🏗️ Atomic Design Architecture
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {/* Atoms */}
            <div style={{ 
              padding: '24px', 
              backgroundColor: 'white', 
              borderRadius: '12px',
              border: '1px solid var(--color-gray-200)',
            }}>
              <div style={{ 
                display: 'inline-block',
                padding: '8px 16px', 
                backgroundColor: '#E8F5E9', 
                borderRadius: '8px',
                marginBottom: '16px',
              }}>
                <span style={{ fontSize: '20px', marginRight: '8px' }}>⚛️</span>
                <span style={{ fontWeight: 600, color: '#2E7D32' }}>Atoms</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-gray-600)', marginBottom: '16px' }}>
                Basic building blocks - cannot be broken down further
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Button', 'TextField', 'Toast', 'Spinner', 'ErrorState', 'Image'].map(c => (
                  <code key={c} style={{ 
                    padding: '4px 8px', 
                    backgroundColor: 'var(--color-gray-100)', 
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}>
                    {c}
                  </code>
                ))}
              </div>
            </div>

            {/* Molecules */}
            <div style={{ 
              padding: '24px', 
              backgroundColor: 'white', 
              borderRadius: '12px',
              border: '1px solid var(--color-gray-200)',
            }}>
              <div style={{ 
                display: 'inline-block',
                padding: '8px 16px', 
                backgroundColor: '#E3F2FD', 
                borderRadius: '8px',
                marginBottom: '16px',
              }}>
                <span style={{ fontSize: '20px', marginRight: '8px' }}>🧬</span>
                <span style={{ fontWeight: 600, color: '#1565C0' }}>Molecules</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-gray-600)', marginBottom: '16px' }}>
                Simple combinations of atoms working together
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['QuickSpecs', 'Incentives', 'TrimSelector', 'TargetPrice', 'MarketSpeed'].map(c => (
                  <code key={c} style={{ 
                    padding: '4px 8px', 
                    backgroundColor: 'var(--color-gray-100)', 
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}>
                    {c}
                  </code>
                ))}
              </div>
            </div>

            {/* Organisms */}
            <div style={{ 
              padding: '24px', 
              backgroundColor: 'white', 
              borderRadius: '12px',
              border: '1px solid var(--color-gray-200)',
            }}>
              <div style={{ 
                display: 'inline-block',
                padding: '8px 16px', 
                backgroundColor: '#FFF3E0', 
                borderRadius: '8px',
                marginBottom: '16px',
              }}>
                <span style={{ fontSize: '20px', marginRight: '8px' }}>🦠</span>
                <span style={{ fontWeight: 600, color: '#E65100' }}>Organisms</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-gray-600)', marginBottom: '16px' }}>
                Complex UI sections composed of molecules
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Header', 'Footer', 'Hero', 'Comparison', 'VehicleRanking', 'Modal'].map(c => (
                  <code key={c} style={{ 
                    padding: '4px 8px', 
                    backgroundColor: 'var(--color-gray-100)', 
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}>
                    {c}
                  </code>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Design Tokens Preview */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 700, 
            fontFamily: 'var(--font-heading)',
            marginBottom: '24px',
          }}>
            🎨 Design Tokens
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '24px' 
          }}>
            {/* Colors */}
            <div style={{ 
              padding: '24px', 
              backgroundColor: 'white', 
              borderRadius: '12px',
              border: '1px solid var(--color-gray-200)',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
                Primary Colors
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <ColorToken name="Blue Cobalt" token="--color-blue-cobalt" color="#1B5F8A" />
                <ColorToken name="Red" token="--color-red" color="#D22730" />
                <ColorToken name="Black" token="--color-black" color="#1a1a1a" />
              </div>
            </div>

            {/* Typography */}
            <div style={{ 
              padding: '24px', 
              backgroundColor: 'white', 
              borderRadius: '12px',
              border: '1px solid var(--color-gray-200)',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
                Typography
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ 
                    fontSize: '28px', 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}>
                    Barlow Condensed
                  </div>
                  <code style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>--font-display</code>
                </div>
                <div>
                  <div style={{ 
                    fontSize: '20px', 
                    fontFamily: 'var(--font-heading)', 
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    Inter for Headings
                  </div>
                  <code style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>--font-heading</code>
                </div>
                <div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontFamily: 'var(--font-article)', 
                    fontStyle: 'italic',
                    marginBottom: '4px',
                  }}>
                    Lora for Articles
                  </div>
                  <code style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>--font-article</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ 
            padding: '32px', 
            backgroundColor: '#E8F5E9', 
            borderRadius: '16px',
            border: '1px solid #A5D6A7',
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              fontFamily: 'var(--font-heading)',
              marginBottom: '16px',
              color: '#2E7D32',
            }}>
              ♿ Accessibility First
            </h2>
            <p style={{ fontSize: '16px', color: '#1B5E20', marginBottom: '24px', maxWidth: '600px' }}>
              All components are built with accessibility as a core requirement, not an afterthought.
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px' 
            }}>
              {[
                { icon: '🎯', text: 'Focus states visible' },
                { icon: '⌨️', text: 'Keyboard navigable' },
                { icon: '🏷️', text: 'ARIA labels included' },
                { icon: '🎨', text: 'Color contrast 4.5:1+' },
                { icon: '🐢', text: 'Reduced motion support' },
                { icon: '📱', text: 'Touch targets 44px+' },
              ].map(item => (
                <div key={item.text} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '12px 16px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#2E7D32' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ 
          textAlign: 'center', 
          padding: '32px',
          borderTop: '1px solid var(--color-gray-200)',
          color: 'var(--color-gray-500)',
          fontSize: '14px',
        }}>
          <p style={{ margin: '0 0 8px 0' }}>
            Built with ❤️ by the Car and Driver Design Team
          </p>
          <p style={{ margin: 0 }}>
            Version 1.0.0 • Last updated December 2024
          </p>
        </footer>
      </div>
    </div>
  ),
};
