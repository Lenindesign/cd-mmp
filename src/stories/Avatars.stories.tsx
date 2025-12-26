import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { User, Car, Leaf, Zap, DollarSign, Compass } from 'lucide-react';

/**
 * # Avatars
 * 
 * Avatars represent users throughout the application. They support multiple display modes:
 * initials, images, and lifestyle-based vehicle images.
 * 
 * ## Design Specifications
 * 
 * | Size | Dimensions | Use Case |
 * |------|------------|----------|
 * | xs | 24px | Inline mentions, compact lists |
 * | sm | 32px | Comments, small cards |
 * | md | 40px | Header, navigation |
 * | lg | 56px | Profile sections |
 * | xl | 80px | Profile page hero |
 * | 2xl | 120px | Edit profile modal |
 * 
 * ## Lifestyle Avatars
 * 
 * Users can select a lifestyle-based avatar that displays a representative vehicle:
 * - **Family** → Honda Pilot
 * - **Adventure** → Jeep Wrangler  
 * - **Luxury** → Mercedes-Benz S-Class
 * - **Eco-Friendly** → Tesla Model 3
 * - **Performance** → Porsche 911
 * - **Commuter** → Toyota Camry
 * - **Value** → Honda Civic
 */

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'var(--font-family-primary, Poppins, sans-serif)',
  },
  section: {
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--color-gray-900, #1a1a1a)',
  },
  sectionDescription: {
    color: 'var(--color-gray-600, #666)',
    marginBottom: '1.5rem',
    lineHeight: 1.6,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '2rem',
    alignItems: 'flex-end',
  },
  avatarItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.75rem',
    color: 'var(--color-gray-500, #888)',
    fontFamily: 'monospace',
  },
  previewBox: {
    padding: '2rem',
    backgroundColor: 'var(--color-gray-50, #f9f9f9)',
    borderRadius: '12px',
    border: '1px solid var(--color-gray-200, #e5e5e5)',
  },
  codeBlock: {
    backgroundColor: 'var(--color-gray-900, #1a1a1a)',
    color: '#e5e5e5',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontFamily: 'monospace',
    overflow: 'auto',
    marginTop: '1rem',
  },
};

// Avatar sizes
const SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
  '2xl': 120,
};

// Avatar component
interface AvatarProps {
  size?: keyof typeof SIZES;
  name?: string;
  image?: string;
  variant?: 'initials' | 'image' | 'icon';
}

const Avatar: React.FC<AvatarProps> = ({ 
  size = 'md', 
  name = 'User', 
  image,
  variant = 'initials'
}) => {
  const dimension = SIZES[size];
  const fontSize = dimension * 0.4;
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  };

  const baseStyle: React.CSSProperties = {
    width: dimension,
    height: dimension,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  };

  if (variant === 'image' && image) {
    return (
      <div style={baseStyle}>
        <img 
          src={image} 
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div style={{
        ...baseStyle,
        backgroundColor: 'var(--color-gray-100, #f5f5f5)',
        border: '1px solid var(--color-gray-200, #e5e5e5)',
      }}>
        <User size={dimension * 0.5} color="var(--color-gray-400, #999)" />
      </div>
    );
  }

  // Initials variant
  return (
    <div style={{
      ...baseStyle,
      backgroundColor: 'var(--color-blue-cobalt, #2676DF)',
      color: 'white',
      fontSize: fontSize,
      fontWeight: 600,
      fontFamily: 'Inter, sans-serif',
    }}>
      {getInitials(name)}
    </div>
  );
};

// Lifestyle avatar with vehicle image
interface LifestyleAvatarProps {
  lifestyle: string;
  size?: keyof typeof SIZES;
}

const LIFESTYLE_IMAGES: Record<string, { image: string; label: string; icon: React.ReactNode }> = {
  family: {
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466b819cbba1000852d78b/2025-honda-pilot-exterior-front-view.jpg',
    label: 'Family',
    icon: <User size={16} />,
  },
  adventure: {
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466a749cbba1000852d76d/2025-jeep-wrangler-exterior-front-view.jpg',
    label: 'Adventure',
    icon: <Compass size={16} />,
  },
  luxury: {
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg',
    label: 'Luxury',
    icon: <Car size={16} />,
  },
  'eco-friendly': {
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg',
    label: 'Eco-Friendly',
    icon: <Leaf size={16} />,
  },
  performance: {
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66e8824d603db5000878f458/2025hondaaccordhybridfrontthreequarters.jpg',
    label: 'Performance',
    icon: <Zap size={16} />,
  },
  commuter: {
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg',
    label: 'Commuter',
    icon: <Car size={16} />,
  },
  value: {
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg',
    label: 'Value',
    icon: <DollarSign size={16} />,
  },
};

const LifestyleAvatar: React.FC<LifestyleAvatarProps> = ({ lifestyle, size = 'md' }) => {
  const dimension = SIZES[size];
  const config = LIFESTYLE_IMAGES[lifestyle];

  if (!config) {
    return <Avatar size={size} name="User" />;
  }

  return (
    <div style={{
      width: dimension,
      height: dimension,
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid var(--color-blue-cobalt, #2676DF)',
    }}>
      <img 
        src={config.image} 
        alt={config.label}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

const meta: Meta = {
  title: 'Elements/Avatars',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'User avatars with initials, images, and lifestyle-based vehicle images.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * All avatar sizes from extra small to extra extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Avatar Sizes</h2>
        <p style={styles.sectionDescription}>
          Six sizes available for different contexts throughout the application.
        </p>
        
        <div style={styles.previewBox}>
          <div style={styles.grid}>
            {(Object.keys(SIZES) as Array<keyof typeof SIZES>).map((size) => (
              <div key={size} style={styles.avatarItem}>
                <Avatar size={size} name="John Doe" />
                <span style={styles.label}>{size} ({SIZES[size]}px)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Different avatar display variants.
 */
export const Variants: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Avatar Variants</h2>
        <p style={styles.sectionDescription}>
          Avatars can display initials, images, or a placeholder icon.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Initials (Default)</h3>
            <div style={styles.previewBox}>
              <div style={styles.grid}>
                <div style={styles.avatarItem}>
                  <Avatar size="lg" name="John Doe" variant="initials" />
                  <span style={styles.label}>John Doe → JD</span>
                </div>
                <div style={styles.avatarItem}>
                  <Avatar size="lg" name="Alice" variant="initials" />
                  <span style={styles.label}>Alice → AL</span>
                </div>
                <div style={styles.avatarItem}>
                  <Avatar size="lg" name="Bob Smith Johnson" variant="initials" />
                  <span style={styles.label}>Bob Smith → BS</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Image</h3>
            <div style={styles.previewBox}>
              <div style={styles.grid}>
                <div style={styles.avatarItem}>
                  <Avatar 
                    size="lg" 
                    name="User" 
                    variant="image"
                    image="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"
                  />
                  <span style={styles.label}>Custom image</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Icon Placeholder</h3>
            <div style={styles.previewBox}>
              <div style={styles.grid}>
                <div style={styles.avatarItem}>
                  <Avatar size="lg" variant="icon" />
                  <span style={styles.label}>No user data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Lifestyle-based avatars that display representative vehicles.
 */
export const LifestyleAvatars: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Lifestyle Avatars</h2>
        <p style={styles.sectionDescription}>
          Users can choose a lifestyle-based avatar that displays a vehicle representing their interests.
          These are used in the profile and account sections.
        </p>
        
        <div style={styles.previewBox}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem' }}>
            {Object.entries(LIFESTYLE_IMAGES).map(([key, config]) => (
              <div key={key} style={{ ...styles.avatarItem, gap: '0.75rem' }}>
                <LifestyleAvatar lifestyle={key} size="xl" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {config.icon}
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{config.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Avatars in realistic UI contexts.
 */
export const InContext: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Avatars in Context</h2>
        <p style={styles.sectionDescription}>
          Examples of how avatars appear in various UI patterns.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Header example */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Header / Navigation</h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--color-dark, #222)',
              borderRadius: '8px',
            }}>
              <span style={{ color: 'white', fontWeight: 600 }}>Car and Driver</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'white', fontSize: '0.875rem' }}>John D.</span>
                <Avatar size="sm" name="John Doe" />
              </div>
            </div>
          </div>
          
          {/* Comment example */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Comment / Review</h3>
            <div style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--color-gray-50, #f9f9f9)',
              borderRadius: '8px',
            }}>
              <Avatar size="md" name="Sarah Miller" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Sarah Miller</span>
                  <span style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>2 days ago</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-700)', lineHeight: 1.5 }}>
                  Great vehicle! The fuel economy exceeded my expectations.
                </p>
              </div>
            </div>
          </div>
          
          {/* Profile card example */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Profile Card</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid var(--color-gray-200)',
              maxWidth: '280px',
            }}>
              <LifestyleAvatar lifestyle="performance" size="xl" />
              <h4 style={{ marginTop: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Alex Thompson</h4>
              <p style={{ color: 'var(--color-gray-500)', fontSize: '0.875rem' }}>Performance Enthusiast</p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600 }}>12</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Saved</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600 }}>5</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Reviews</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Avatar group */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Avatar Group</h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
            }}>
              {['John Doe', 'Sarah M', 'Alex T', 'Maria G'].map((name, i) => (
                <div key={name} style={{ marginLeft: i > 0 ? '-8px' : 0 }}>
                  <div style={{
                    border: '2px solid white',
                    borderRadius: '50%',
                  }}>
                    <Avatar size="sm" name={name} />
                  </div>
                </div>
              ))}
              <div style={{
                marginLeft: '-8px',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'var(--color-gray-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-gray-600)',
                border: '2px solid white',
              }}>
                +8
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Implementation code and guidelines.
 */
export const Implementation: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Implementation</h2>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>Avatar Utilities</h3>
        <p style={styles.sectionDescription}>
          Use the avatar utilities from <code>src/utils/avatarUtils.ts</code>:
        </p>
        <pre style={styles.codeBlock}>
{`import { getAvatarImageUrl, getUserInitials } from '../utils/avatarUtils';

// Get initials from name
const initials = getUserInitials('John Doe'); // "JD"
const initials2 = getUserInitials('Alice'); // "AL"

// Get lifestyle avatar image URL
const imageUrl = getAvatarImageUrl('avatar-family'); 
// Returns Honda Pilot image URL

const imageUrl2 = getAvatarImageUrl('initials'); 
// Returns null (use initials instead)`}
        </pre>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Basic Avatar Component</h3>
        <pre style={styles.codeBlock}>
{`interface AvatarProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  name?: string;
  image?: string;
}

const Avatar: React.FC<AvatarProps> = ({ size, name, image }) => {
  const sizes = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80, '2xl': 120 };
  const dimension = sizes[size];

  if (image) {
    return (
      <div style={{
        width: dimension,
        height: dimension,
        borderRadius: '50%',
        overflow: 'hidden',
      }}>
        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  return (
    <div style={{
      width: dimension,
      height: dimension,
      borderRadius: '50%',
      backgroundColor: 'var(--color-blue-cobalt)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: dimension * 0.4,
      fontWeight: 600,
    }}>
      {getUserInitials(name)}
    </div>
  );
};`}
        </pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>CSS Variables Used</h3>
        <pre style={styles.codeBlock}>
{`/* Avatar colors */
--color-blue-cobalt: #1B5F8A    /* Initials background */
--color-gray-100: #f5f5f5       /* Icon placeholder background */
--color-gray-200: #e5e5e5       /* Icon placeholder border */
--color-gray-400: #999          /* Icon color */

/* Border radius */
--border-radius-full: 9999px    /* Circular avatars */`}
        </pre>
      </div>
    </div>
  ),
};

