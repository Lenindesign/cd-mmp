import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { 
  Clock, Check, X, Info, FileText, 
  Award, Tag, Zap, Fuel, Leaf, 
  Car, ShieldCheck, History, User,
  TrendingDown, Minus
} from 'lucide-react';

/**
 * # Car and Driver Badges
 * 
 * Official accolade badges from Car and Driver, used to highlight award-winning vehicles.
 * These badges are sourced from the Car and Driver design tokens CDN and should be used
 * consistently across all components.
 * 
 * ## Badge Types
 * 
 * ### Award Badges
 * - **Editor's Choice**: Awarded to vehicles that represent the best in their class
 * - **10Best**: Awarded to vehicles that make the annual Top 10 list
 * - **EV of the Year**: Awarded to the best electric vehicle of the year
 * 
 * ### Status Badges
 * Used to communicate the current state of processes, offers, or items:
 * - **Pending**: Waiting for action (yellow/orange)
 * - **Approved/Success**: Completed successfully (green)
 * - **Rejected/Error**: Failed or declined (red)
 * - **Info**: Informational state (blue)
 * - **Draft**: Inactive or draft state (gray)
 * 
 * ## Database Properties
 * 
 * Vehicles in the database have boolean flags for accolades:
 * - `editorsChoice: boolean`
 * - `tenBest: boolean`
 * - `evOfTheYear: boolean`
 */

// Badge URLs from Car and Driver design tokens
const BADGE_URLS = {
  editorsChoice: 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE',
  tenBest: 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg',
  evOfTheYear: 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ev-of-the-year.721e420.svg',
};

// Styles for the story
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
    marginBottom: '1.5rem',
    color: 'var(--color-gray-900, #1a1a1a)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
  },
  badgeCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '1.5rem',
    backgroundColor: 'var(--color-gray-50, #f9f9f9)',
    borderRadius: '12px',
    border: '1px solid var(--color-gray-200, #e5e5e5)',
  },
  badgeWrapper: {
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  badgeImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain' as const,
  },
  badgeName: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--color-gray-900, #1a1a1a)',
    marginBottom: '0.5rem',
    textAlign: 'center' as const,
  },
  badgeDescription: {
    fontSize: '0.875rem',
    color: 'var(--color-gray-600, #666)',
    textAlign: 'center' as const,
    lineHeight: 1.5,
  },
  sizeGrid: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-end',
    flexWrap: 'wrap' as const,
  },
  sizeItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
  },
  sizeLabel: {
    fontSize: '0.75rem',
    color: 'var(--color-gray-500, #888)',
    fontFamily: 'monospace',
  },
  contextCard: {
    backgroundColor: 'var(--color-gray-900, #1a1a1a)',
    borderRadius: '12px',
    padding: '1rem',
    position: 'relative' as const,
    width: '280px',
    overflow: 'hidden',
  },
  contextImage: {
    width: '100%',
    height: '160px',
    backgroundColor: 'var(--color-gray-700, #444)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-gray-400, #999)',
    fontSize: '0.875rem',
    position: 'relative' as const,
  },
  contextBadges: {
    position: 'absolute' as const,
    top: '8px',
    right: '8px',
    display: 'flex',
    gap: '4px',
  },
  contextBadge: {
    width: '32px',
    height: '32px',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  contextBadgeImg: {
    width: '20px',
    height: '20px',
    objectFit: 'contain' as const,
  },
  contextContent: {
    padding: '0.75rem 0 0',
  },
  contextTitle: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '0.25rem',
  },
  contextPrice: {
    color: 'var(--color-gray-400, #999)',
    fontSize: '0.875rem',
  },
  accoladeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'var(--color-gray-50, #f9f9f9)',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  },
  accoladeIcon: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accoladeText: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  },
  accoladeTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--color-gray-900, #1a1a1a)',
  },
  accoladeSubtitle: {
    fontSize: '0.75rem',
    color: 'var(--color-gray-500, #888)',
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

// Badge component for display
interface BadgeDisplayProps {
  type: 'editorsChoice' | 'tenBest' | 'evOfTheYear';
  size?: number;
  withBackground?: boolean;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ type, size = 48, withBackground = false }) => {
  const url = BADGE_URLS[type];
  const alt = {
    editorsChoice: "Editor's Choice",
    tenBest: '10Best',
    evOfTheYear: 'EV of the Year',
  }[type];

  if (withBackground) {
    return (
      <div style={{
        width: size + 12,
        height: size + 12,
        backgroundColor: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <img src={url} alt={alt} style={{ width: size * 0.7, height: size * 0.7, objectFit: 'contain' }} />
      </div>
    );
  }

  return <img src={url} alt={alt} style={{ width: size, height: size, objectFit: 'contain' }} />;
};

const meta: Meta = {
  title: 'Elements/Badges',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Official Car and Driver accolade badges for award-winning vehicles.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

// ============================================================================
// INDEX COMPONENTS (for AllBadges overview)
// ============================================================================

// Mini versions of badge components for the index
const MiniStatusBadge: React.FC<{ status: 'pending' | 'approved' | 'rejected' | 'info' | 'draft' }> = ({ status }) => {
  const colors: Record<string, string> = {
    pending: '#f59e0b',
    approved: '#26870D',
    rejected: '#ef4444',
    info: '#1B5F8A',
    draft: '#6b7280',
  };
  const labels: Record<string, string> = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    info: 'Info',
    draft: 'Draft',
  };
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 8px',
      backgroundColor: colors[status],
      color: 'white',
      fontSize: '10px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderRadius: '9999px',
    }}>
      {labels[status]}
    </span>
  );
};

const MiniRankBadge: React.FC<{ rank: number }> = ({ rank }) => (
  <div style={{
    width: 28,
    height: 28,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 800,
    backgroundColor: rank === 1 ? '#1B5F8A' : 'white',
    color: rank === 1 ? 'white' : '#222',
    border: `2px solid ${rank === 1 ? 'white' : '#222'}`,
    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
  }}>
    {rank}
  </div>
);

const MiniDealBadge: React.FC<{ type: string; color: string }> = ({ type, color }) => (
  <span style={{
    display: 'inline-flex',
    padding: '4px 8px',
    backgroundColor: color,
    color: 'white',
    fontSize: '10px',
    fontWeight: 600,
    textTransform: 'uppercase',
    borderRadius: '4px',
  }}>
    {type}
  </span>
);

const MiniAttributeTag: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <span style={{
    display: 'inline-flex',
    padding: '2px 6px',
    backgroundColor: color,
    color: 'white',
    fontSize: '10px',
    fontWeight: 600,
    textTransform: 'uppercase',
    borderRadius: '4px',
  }}>
    {label}
  </span>
);

const MiniTrustBadge: React.FC<{ label: string }> = ({ label }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    color: '#26870D',
    fontSize: '10px',
    fontWeight: 600,
    borderRadius: '4px',
    border: '1px solid #26870D',
  }}>
    <ShieldCheck size={10} />
    {label}
  </span>
);

const indexStyles = {
  pageHeader: {
    marginBottom: '48px',
    paddingBottom: '32px',
    borderBottom: '1px solid var(--color-gray-200, #e5e5e5)',
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '12px',
    color: 'var(--color-dark, #1a1a1a)',
    fontFamily: 'var(--font-display, Poppins, sans-serif)',
  },
  pageDescription: {
    fontSize: '1.125rem',
    color: 'var(--color-gray-600, #666)',
    lineHeight: 1.6,
    maxWidth: '700px',
  },
  categoryCard: {
    backgroundColor: 'white',
    border: '1px solid var(--color-gray-200, #e5e5e5)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  categoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  categoryTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--color-dark, #1a1a1a)',
    marginBottom: '4px',
  },
  categoryDescription: {
    fontSize: '0.875rem',
    color: 'var(--color-gray-500, #888)',
    lineHeight: 1.5,
  },
  categoryLink: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'var(--color-blue-cobalt, #1B5F8A)',
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
  },
  badgePreview: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'var(--color-gray-50, #f9f9f9)',
    borderRadius: '8px',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-gray-200, #e5e5e5)',
    margin: '8px 0 16px',
  },
};

/**
 * Complete index of all badge types in the design system.
 */
export const AllBadges: Story = {
  render: () => (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={indexStyles.pageHeader}>
        <h1 style={indexStyles.pageTitle}>Badge System</h1>
        <p style={indexStyles.pageDescription}>
          A comprehensive collection of badges used throughout the Car and Driver Marketplace. 
          Badges communicate status, awards, attributes, and trust indicators to users at a glance.
        </p>
      </div>
      
      {/* Award Badges */}
      <div style={indexStyles.categoryCard}>
        <div style={indexStyles.categoryHeader}>
          <div>
            <h2 style={indexStyles.categoryTitle}>Award Badges</h2>
            <p style={indexStyles.categoryDescription}>
              Official Car and Driver accolades for award-winning vehicles
            </p>
          </div>
          <span style={indexStyles.categoryLink}>See: Sizes, With Background, In Context →</span>
        </div>
        <div style={indexStyles.divider} />
        <div style={indexStyles.badgePreview}>
          <BadgeDisplay type="editorsChoice" size={40} />
          <BadgeDisplay type="tenBest" size={40} />
          <BadgeDisplay type="evOfTheYear" size={40} />
        </div>
      </div>
      
      {/* Status Badges */}
      <div style={indexStyles.categoryCard}>
        <div style={indexStyles.categoryHeader}>
          <div>
            <h2 style={indexStyles.categoryTitle}>Status Badges</h2>
            <p style={indexStyles.categoryDescription}>
              Communicate process states like pending, approved, or rejected
            </p>
          </div>
          <span style={indexStyles.categoryLink}>See: Status Badges, Status In Context →</span>
        </div>
        <div style={indexStyles.divider} />
        <div style={indexStyles.badgePreview}>
          <MiniStatusBadge status="pending" />
          <MiniStatusBadge status="approved" />
          <MiniStatusBadge status="rejected" />
          <MiniStatusBadge status="info" />
          <MiniStatusBadge status="draft" />
        </div>
      </div>
      
      {/* Rank Badges */}
      <div style={indexStyles.categoryCard}>
        <div style={indexStyles.categoryHeader}>
          <div>
            <h2 style={indexStyles.categoryTitle}>Rank Badges</h2>
            <p style={indexStyles.categoryDescription}>
              Circular badges for Top 10 rankings and vehicle comparisons
            </p>
          </div>
          <span style={indexStyles.categoryLink}>See: Rank Badges →</span>
        </div>
        <div style={indexStyles.divider} />
        <div style={indexStyles.badgePreview}>
          {[1, 2, 3, 4, 5].map((rank) => (
            <MiniRankBadge key={rank} rank={rank} />
          ))}
          <span style={{ fontSize: '12px', color: '#888' }}>... 10</span>
        </div>
      </div>
      
      {/* Deal/Value Badges */}
      <div style={indexStyles.categoryCard}>
        <div style={indexStyles.categoryHeader}>
          <div>
            <h2 style={indexStyles.categoryTitle}>Deal & Value Badges</h2>
            <p style={indexStyles.categoryDescription}>
              Pricing indicators showing deal quality and savings
            </p>
          </div>
          <span style={indexStyles.categoryLink}>See: Deal Badges →</span>
        </div>
        <div style={indexStyles.divider} />
        <div style={indexStyles.badgePreview}>
          <MiniDealBadge type="Best Deal" color="#26870D" />
          <MiniDealBadge type="Good Deal" color="#16a34a" />
          <MiniDealBadge type="Fair Deal" color="#f59e0b" />
          <MiniDealBadge type="Best Value" color="#1B5F8A" />
          <MiniDealBadge type="Price Drop" color="#ef4444" />
        </div>
      </div>
      
      {/* Vehicle Attribute Tags */}
      <div style={indexStyles.categoryCard}>
        <div style={indexStyles.categoryHeader}>
          <div>
            <h2 style={indexStyles.categoryTitle}>Vehicle Attribute Tags</h2>
            <p style={indexStyles.categoryDescription}>
              Quick identifiers for inventory status, fuel type, and drivetrain
            </p>
          </div>
          <span style={indexStyles.categoryLink}>See: Vehicle Attribute Tags →</span>
        </div>
        <div style={indexStyles.divider} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>Inventory</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <MiniAttributeTag label="New" color="#1B5F8A" />
              <MiniAttributeTag label="Used" color="#6b7280" />
              <MiniAttributeTag label="Certified" color="#7c3aed" />
            </div>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>Fuel Type</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <MiniAttributeTag label="EV" color="#16a34a" />
              <MiniAttributeTag label="Hybrid" color="#059669" />
              <MiniAttributeTag label="Gas" color="#6b7280" />
              <MiniAttributeTag label="Diesel" color="#374151" />
            </div>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>Drivetrain</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <MiniAttributeTag label="AWD" color="#1e40af" />
              <MiniAttributeTag label="FWD" color="#475569" />
              <MiniAttributeTag label="RWD" color="#475569" />
              <MiniAttributeTag label="4WD" color="#1e40af" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust/Pricing Badges */}
      <div style={indexStyles.categoryCard}>
        <div style={indexStyles.categoryHeader}>
          <div>
            <h2 style={indexStyles.categoryTitle}>Trust & Pricing Badges</h2>
            <p style={indexStyles.categoryDescription}>
              Build confidence with vehicle history and availability indicators
            </p>
          </div>
          <span style={indexStyles.categoryLink}>See: Pricing Trust Badges →</span>
        </div>
        <div style={indexStyles.divider} />
        <div style={indexStyles.badgePreview}>
          <MiniTrustBadge label="Clean History" />
          <MiniTrustBadge label="One Owner" />
          <MiniTrustBadge label="No Accidents" />
          <span style={{
            display: 'inline-flex',
            padding: '4px 8px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            fontSize: '10px',
            fontWeight: 500,
            borderRadius: '4px',
          }}>
            <strong style={{ marginRight: '3px' }}>3</strong> available
          </span>
        </div>
      </div>
      
      {/* Quick Reference */}
      <div style={{ 
        marginTop: '32px', 
        padding: '24px', 
        backgroundColor: 'var(--color-gray-50, #f9f9f9)', 
        borderRadius: '12px',
        border: '1px solid var(--color-gray-200, #e5e5e5)',
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>Quick Reference</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '0.875rem' }}>
          <div>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Award Badges</strong>
            <span style={{ color: '#666' }}>Editor's Choice, 10Best, EV of the Year</span>
          </div>
          <div>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Status Badges</strong>
            <span style={{ color: '#666' }}>Pending, Approved, Rejected, Info, Draft</span>
          </div>
          <div>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Rank Badges</strong>
            <span style={{ color: '#666' }}>1-10 rankings with #1 highlight</span>
          </div>
          <div>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Deal Badges</strong>
            <span style={{ color: '#666' }}>Best Deal, Good Deal, Fair Deal, Price Drop</span>
          </div>
          <div>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Attribute Tags</strong>
            <span style={{ color: '#666' }}>New/Used, EV/Hybrid/Gas, AWD/FWD/RWD</span>
          </div>
          <div>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Trust Badges</strong>
            <span style={{ color: '#666' }}>Clean History, One Owner, No Accidents</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Badge sizes for different contexts - from small inline badges to large feature displays.
 */
export const Sizes: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Badge Sizes</h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>
          Use appropriate sizes based on context: small for inline/card badges, medium for lists, large for hero sections.
        </p>
        
        {(['editorsChoice', 'tenBest', 'evOfTheYear'] as const).map((type) => (
          <div key={type} style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem', textTransform: 'capitalize' }}>
              {type === 'editorsChoice' ? "Editor's Choice" : type === 'tenBest' ? '10Best' : 'EV of the Year'}
            </h3>
            <div style={styles.sizeGrid}>
              {[16, 24, 32, 48, 64, 80].map((size) => (
                <div key={size} style={styles.sizeItem}>
                  <BadgeDisplay type={type} size={size} />
                  <span style={styles.sizeLabel}>{size}px</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * Badges with white circular backgrounds, commonly used on card images.
 */
export const WithBackground: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Badges with Background</h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>
          When placing badges on images, use a white circular background for visibility.
        </p>
        
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ padding: '2rem', backgroundColor: '#333', borderRadius: '12px' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <BadgeDisplay type="editorsChoice" size={32} withBackground />
              <BadgeDisplay type="tenBest" size={32} withBackground />
              <BadgeDisplay type="evOfTheYear" size={32} withBackground />
            </div>
            <p style={{ color: '#999', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>On dark background</p>
          </div>
          
          <div style={{ padding: '2rem', background: 'linear-gradient(149.73deg, rgba(38, 118, 223, 1) 0%, rgba(19, 52, 129, 1) 100%)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <BadgeDisplay type="editorsChoice" size={32} withBackground />
              <BadgeDisplay type="tenBest" size={32} withBackground />
              <BadgeDisplay type="evOfTheYear" size={32} withBackground />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>On gradient background</p>
          </div>
          
          <div style={{ padding: '2rem', backgroundImage: 'url(https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <BadgeDisplay type="editorsChoice" size={32} withBackground />
              <BadgeDisplay type="tenBest" size={32} withBackground />
              <BadgeDisplay type="evOfTheYear" size={32} withBackground />
            </div>
            <p style={{ color: 'white', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>On image background</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * How badges appear in vehicle cards and listings.
 */
export const InContext: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Badges in Context</h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>
          Examples of how badges are displayed in various components throughout the application.
        </p>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Vehicle Card</h3>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {/* Card with Editor's Choice */}
          <div style={styles.contextCard}>
            <div style={styles.contextImage}>
              <img 
                src="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg" 
                alt="Honda Accord"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div style={styles.contextBadges}>
                <div style={styles.contextBadge}>
                  <img src={BADGE_URLS.editorsChoice} alt="Editor's Choice" style={styles.contextBadgeImg} />
                </div>
              </div>
            </div>
            <div style={styles.contextContent}>
              <div style={styles.contextTitle}>2025 Honda Accord</div>
              <div style={styles.contextPrice}>Starting at $29,610</div>
            </div>
          </div>
          
          {/* Card with 10Best */}
          <div style={styles.contextCard}>
            <div style={styles.contextImage}>
              <img 
                src="https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg" 
                alt="Chevrolet Trax"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div style={styles.contextBadges}>
                <div style={styles.contextBadge}>
                  <img src={BADGE_URLS.tenBest} alt="10Best" style={styles.contextBadgeImg} />
                </div>
              </div>
            </div>
            <div style={styles.contextContent}>
              <div style={styles.contextTitle}>2025 Chevrolet Trax</div>
              <div style={styles.contextPrice}>Starting at $21,495</div>
            </div>
          </div>
          
          {/* Card with multiple badges */}
          <div style={styles.contextCard}>
            <div style={styles.contextImage}>
              <img 
                src="https://d2kde5ohu8qb21.cloudfront.net/files/66e8824d603db5000878f458/2025hondaaccordhybridfrontthreequarters.jpg" 
                alt="Honda Accord Hybrid"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div style={styles.contextBadges}>
                <div style={styles.contextBadge}>
                  <img src={BADGE_URLS.editorsChoice} alt="Editor's Choice" style={styles.contextBadgeImg} />
                </div>
                <div style={styles.contextBadge}>
                  <img src={BADGE_URLS.tenBest} alt="10Best" style={styles.contextBadgeImg} />
                </div>
              </div>
            </div>
            <div style={styles.contextContent}>
              <div style={styles.contextTitle}>2025 Honda Accord Hybrid</div>
              <div style={styles.contextPrice}>Starting at $32,990</div>
            </div>
          </div>
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Accolades Section</h3>
        <div style={{ maxWidth: '400px' }}>
          <div style={styles.accoladeRow}>
            <div style={styles.accoladeIcon}>
              <BadgeDisplay type="editorsChoice" size={48} />
            </div>
            <div style={styles.accoladeText}>
              <span style={styles.accoladeTitle}>Editors' Choice</span>
              <span style={styles.accoladeSubtitle}>Best in class for 2025</span>
            </div>
          </div>
          <div style={styles.accoladeRow}>
            <div style={styles.accoladeIcon}>
              <BadgeDisplay type="tenBest" size={48} />
            </div>
            <div style={styles.accoladeText}>
              <span style={styles.accoladeTitle}>10Best</span>
              <span style={styles.accoladeSubtitle}>Top 10 Cars of 2025</span>
            </div>
          </div>
          <div style={styles.accoladeRow}>
            <div style={styles.accoladeIcon}>
              <BadgeDisplay type="evOfTheYear" size={48} />
            </div>
            <div style={styles.accoladeText}>
              <span style={styles.accoladeTitle}>EV of the Year</span>
              <span style={styles.accoladeSubtitle}>Best Electric Vehicle 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Code snippets for implementing badges in components.
 */
export const Implementation: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Implementation</h2>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>Badge URLs</h3>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>
          Import these constants at the top of your component:
        </p>
        <pre style={styles.codeBlock}>
{`const EDITORS_CHOICE_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE';

const TEN_BEST_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg';

const EV_OF_THE_YEAR_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ev-of-the-year.721e420.svg';`}
        </pre>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Basic Usage</h3>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>
          Simple image element with the badge:
        </p>
        <pre style={styles.codeBlock}>
{`<img 
  src={EDITORS_CHOICE_BADGE_URL}
  alt="Editor's Choice"
  width="32"
  height="32"
/>`}
        </pre>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>With Background Circle</h3>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>
          For use on images or dark backgrounds:
        </p>
        <pre style={styles.codeBlock}>
{`<div className="badge-container">
  <img 
    src={TEN_BEST_BADGE_URL}
    alt="10Best"
    width="20"
    height="20"
  />
</div>

/* CSS */
.badge-container {
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}`}
        </pre>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Conditional Rendering</h3>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>
          Show badges based on vehicle database properties:
        </p>
        <pre style={styles.codeBlock}>
{`{(vehicle.editorsChoice || vehicle.tenBest || vehicle.evOfTheYear) && (
  <div className="card__badges">
    {vehicle.editorsChoice && (
      <div className="card__badge">
        <img src={EDITORS_CHOICE_BADGE_URL} alt="Editor's Choice" />
      </div>
    )}
    {vehicle.tenBest && (
      <div className="card__badge">
        <img src={TEN_BEST_BADGE_URL} alt="10Best" />
      </div>
    )}
    {vehicle.evOfTheYear && (
      <div className="card__badge">
        <img src={EV_OF_THE_YEAR_BADGE_URL} alt="EV of the Year" />
      </div>
    )}
  </div>
)}`}
        </pre>
      </div>
    </div>
  ),
};

// ============================================================================
// STATUS BADGES
// ============================================================================

// Status Badge types and colors
type StatusType = 'pending' | 'approved' | 'rejected' | 'info' | 'draft';

const STATUS_CONFIG: Record<StatusType, { 
  label: string; 
  bgColor: string; 
  textColor: string; 
  icon: React.FC<{ size?: number }>;
}> = {
  pending: {
    label: 'Pending',
    bgColor: '#f59e0b',
    textColor: '#ffffff',
    icon: Clock,
  },
  approved: {
    label: 'Approved',
    bgColor: '#26870D',
    textColor: '#ffffff',
    icon: Check,
  },
  rejected: {
    label: 'Rejected',
    bgColor: '#ef4444',
    textColor: '#ffffff',
    icon: X,
  },
  info: {
    label: 'Info',
    bgColor: '#1B5F8A',
    textColor: '#ffffff',
    icon: Info,
  },
  draft: {
    label: 'Draft',
    bgColor: '#6b7280',
    textColor: '#ffffff',
    icon: FileText,
  },
};

// Status Badge Component
interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  label,
  size = 'md',
  showIcon = true,
}) => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  
  const sizes = {
    sm: { padding: '4px 8px', fontSize: '10px', iconSize: 10, gap: '4px' },
    md: { padding: '6px 12px', fontSize: '12px', iconSize: 14, gap: '6px' },
    lg: { padding: '8px 16px', fontSize: '14px', iconSize: 16, gap: '8px' },
  };
  
  const sizeConfig = sizes[size];
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: sizeConfig.gap,
      padding: sizeConfig.padding,
      backgroundColor: config.bgColor,
      color: config.textColor,
      fontSize: sizeConfig.fontSize,
      fontWeight: 600,
      fontFamily: 'var(--font-body, Inter, sans-serif)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderRadius: '9999px',
      lineHeight: 1,
    }}>
      {showIcon && <Icon size={sizeConfig.iconSize} />}
      {label || config.label}
    </span>
  );
};

/**
 * Status badges communicate the current state of processes, offers, or items.
 * Color-coded for quick recognition.
 */
export const StatusBadges: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Status Badges</h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Status badges communicate the current state of processes, offers, or items. 
          They use color-coding for quick recognition and include icons for additional clarity.
        </p>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>All Status Types</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <StatusBadge status="pending" />
          <StatusBadge status="approved" />
          <StatusBadge status="rejected" />
          <StatusBadge status="info" />
          <StatusBadge status="draft" />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <StatusBadge status="pending" size="sm" />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <StatusBadge status="pending" size="md" />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <StatusBadge status="pending" size="lg" />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Large</span>
          </div>
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Without Icons</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <StatusBadge status="pending" showIcon={false} />
          <StatusBadge status="approved" showIcon={false} />
          <StatusBadge status="rejected" showIcon={false} />
          <StatusBadge status="info" showIcon={false} />
          <StatusBadge status="draft" showIcon={false} />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Custom Labels</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <StatusBadge status="pending" label="In Review" />
          <StatusBadge status="approved" label="Complete" />
          <StatusBadge status="rejected" label="Declined" />
          <StatusBadge status="info" label="New" />
          <StatusBadge status="draft" label="Inactive" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Status badges in real-world UI contexts.
 */
export const StatusInContext: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Status Badges in Context</h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Examples of how status badges appear in modals, cards, and lists.
        </p>
        
        {/* Modal Header Example */}
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Modal Header</h3>
        <div style={{
          width: '400px',
          background: 'linear-gradient(149.73deg, rgba(38, 78, 112, 1) 0%, rgba(19, 42, 69, 1) 100%)',
          borderRadius: '12px 12px 0 0',
          padding: '24px',
          marginBottom: '2rem',
        }}>
          <StatusBadge status="pending" />
          <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginTop: '16px', marginBottom: '4px' }}>
            Offer Negotiation
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', marginBottom: '4px' }}>
            2025 Honda Accord
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
            AutoNation Honda Costa Mesa
          </p>
        </div>
        
        {/* List Items Example */}
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>List Items</h3>
        <div style={{ maxWidth: '500px', marginBottom: '2rem' }}>
          {[
            { status: 'approved' as StatusType, title: 'Trade-In Appraisal', subtitle: '2022 Toyota Camry', value: '$18,500' },
            { status: 'pending' as StatusType, title: 'Financing Application', subtitle: 'Capital One Auto', value: '4.9% APR' },
            { status: 'rejected' as StatusType, title: 'Extended Warranty', subtitle: 'Declined by customer', value: '$2,400' },
            { status: 'draft' as StatusType, title: 'Service Contract', subtitle: 'Not yet submitted', value: '$1,200' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: 'var(--color-gray-50, #f9f9f9)',
              borderRadius: '8px',
              marginBottom: '8px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusBadge status={item.status} size="sm" />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-gray-900)', fontSize: '0.875rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>{item.subtitle}</div>
                </div>
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-gray-900)', fontSize: '0.875rem' }}>{item.value}</div>
            </div>
          ))}
        </div>
        
        {/* Card Example */}
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Offer Card</h3>
        <div style={{
          width: '320px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid var(--color-gray-200, #e5e5e5)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '160px',
            backgroundColor: 'var(--color-gray-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"
              alt="Honda Accord"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
              <StatusBadge status="approved" label="Accepted" />
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '4px' }}>2025 Honda Accord EX-L</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginBottom: '12px' }}>
              AutoNation Honda Costa Mesa
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Your Offer</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-success, #26870D)' }}>$32,450</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>MSRP</div>
                <div style={{ fontSize: '1rem', color: 'var(--color-gray-600)', textDecoration: 'line-through' }}>$34,895</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Implementation guide for status badges.
 */
export const StatusImplementation: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Status Badge Implementation</h2>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>Component Props</h3>
        <pre style={styles.codeBlock}>
{`interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected' | 'info' | 'draft';
  label?: string;           // Custom label text
  size?: 'sm' | 'md' | 'lg'; // Default: 'md'
  showIcon?: boolean;       // Default: true
}`}
        </pre>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Basic Usage</h3>
        <pre style={styles.codeBlock}>
{`import { StatusBadge } from '@/components/StatusBadge';

// Basic usage
<StatusBadge status="pending" />

// With custom label
<StatusBadge status="approved" label="Complete" />

// Different size
<StatusBadge status="rejected" size="sm" />

// Without icon
<StatusBadge status="info" showIcon={false} />`}
        </pre>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Color Reference</h3>
        <pre style={styles.codeBlock}>
{`// Status colors
const STATUS_COLORS = {
  pending:  '#f59e0b', // Yellow/Orange - Waiting
  approved: '#26870D', // Green - Success
  rejected: '#ef4444', // Red - Error
  info:     '#1B5F8A', // Blue - Informational
  draft:    '#6b7280', // Gray - Inactive
};`}
        </pre>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>CSS-Only Alternative</h3>
        <pre style={styles.codeBlock}>
{`.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;
  line-height: 1;
}

.status-badge--pending {
  background-color: #f59e0b;
  color: white;
}

.status-badge--approved {
  background-color: #26870D;
  color: white;
}

.status-badge--rejected {
  background-color: #ef4444;
  color: white;
}

.status-badge--info {
  background-color: #1B5F8A;
  color: white;
}

.status-badge--draft {
  background-color: #6b7280;
  color: white;
}`}
        </pre>
      </div>
    </div>
  ),
};

// ============================================================================
// RANK BADGES
// ============================================================================

interface RankBadgeProps {
  rank: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'current' | 'first';
}

const RankBadge: React.FC<RankBadgeProps> = ({ rank, size = 'md', variant = 'default' }) => {
  const sizes = {
    sm: { dimension: 28, fontSize: '12px', border: '2px' },
    md: { dimension: 40, fontSize: '16px', border: '2px' },
    lg: { dimension: 56, fontSize: '22px', border: '3px' },
  };
  
  const sizeConfig = sizes[size];
  const isSpecial = variant === 'first' || variant === 'current' || rank === 1;
  
  return (
    <div style={{
      width: sizeConfig.dimension,
      height: sizeConfig.dimension,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-heading, Poppins, sans-serif)',
      fontSize: sizeConfig.fontSize,
      fontWeight: 800,
      backgroundColor: isSpecial ? 'var(--color-blue-cobalt, #1B5F8A)' : 'white',
      color: isSpecial ? 'white' : 'var(--color-dark, #222)',
      border: `${sizeConfig.border} solid ${isSpecial ? 'white' : 'var(--color-dark, #222)'}`,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    }}>
      {rank}
    </div>
  );
};

/**
 * Rank badges for vehicle rankings and Top 10 lists.
 */
export const RankBadges: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Rank Badges</h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Circular badges displaying ranking position. Used on vehicle cards for Top 10 lists and comparisons.
          The #1 position gets special blue styling.
        </p>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Top 10 Rankings</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rank) => (
            <RankBadge key={rank} rank={rank} />
          ))}
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <RankBadge rank={1} size="sm" />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <RankBadge rank={1} size="md" />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <RankBadge rank={1} size="lg" />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Large</span>
          </div>
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>In Context - Vehicle Card</h3>
        <div style={{
          width: '280px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid var(--color-gray-200, #e5e5e5)',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          <div style={{ position: 'relative', height: '160px' }}>
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"
              alt="Honda Accord"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
              <RankBadge rank={1} size="md" />
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>2025 Honda Accord</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>Best Midsize Sedan</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// DEAL/VALUE BADGES
// ============================================================================

type DealType = 'best-deal' | 'good-deal' | 'fair-deal' | 'best-value' | 'price-drop';

const DEAL_CONFIG: Record<DealType, { 
  label: string; 
  bgColor: string; 
  textColor: string;
  icon: React.FC<{ size?: number }>;
}> = {
  'best-deal': {
    label: 'Best Deal',
    bgColor: '#26870D',
    textColor: '#ffffff',
    icon: Award,
  },
  'good-deal': {
    label: 'Good Deal',
    bgColor: '#16a34a',
    textColor: '#ffffff',
    icon: TrendingDown,
  },
  'fair-deal': {
    label: 'Fair Deal',
    bgColor: '#f59e0b',
    textColor: '#ffffff',
    icon: Minus,
  },
  'best-value': {
    label: 'Best Value',
    bgColor: '#1B5F8A',
    textColor: '#ffffff',
    icon: Tag,
  },
  'price-drop': {
    label: 'Price Drop',
    bgColor: '#ef4444',
    textColor: '#ffffff',
    icon: TrendingDown,
  },
};

interface DealBadgeProps {
  type: DealType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const DealBadge: React.FC<DealBadgeProps> = ({ type, label, size = 'md', showIcon = true }) => {
  const config = DEAL_CONFIG[type];
  const Icon = config.icon;
  
  const sizes = {
    sm: { padding: '4px 8px', fontSize: '10px', iconSize: 10, gap: '4px' },
    md: { padding: '6px 12px', fontSize: '12px', iconSize: 14, gap: '6px' },
    lg: { padding: '8px 16px', fontSize: '14px', iconSize: 16, gap: '8px' },
  };
  
  const sizeConfig = sizes[size];
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: sizeConfig.gap,
      padding: sizeConfig.padding,
      backgroundColor: config.bgColor,
      color: config.textColor,
      fontSize: sizeConfig.fontSize,
      fontWeight: 600,
      fontFamily: 'var(--font-body, Inter, sans-serif)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderRadius: '4px',
      lineHeight: 1,
    }}>
      {showIcon && <Icon size={sizeConfig.iconSize} />}
      {label || config.label}
    </span>
  );
};

/**
 * Deal and value badges for pricing indicators.
 */
export const DealBadges: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Deal & Value Badges</h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Badges indicating deal quality and pricing status. Used on dealer cards, vehicle listings, and pricing sections.
        </p>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>All Deal Types</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <DealBadge type="best-deal" />
          <DealBadge type="good-deal" />
          <DealBadge type="fair-deal" />
          <DealBadge type="best-value" />
          <DealBadge type="price-drop" />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <DealBadge type="best-deal" size="sm" />
          <DealBadge type="best-deal" size="md" />
          <DealBadge type="best-deal" size="lg" />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Without Icons</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <DealBadge type="best-deal" showIcon={false} />
          <DealBadge type="good-deal" showIcon={false} />
          <DealBadge type="fair-deal" showIcon={false} />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>In Context - Dealer Card</h3>
        <div style={{
          width: '320px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid var(--color-gray-200, #e5e5e5)',
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>AutoNation Honda</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Costa Mesa, CA · 3.2 mi</p>
            </div>
            <DealBadge type="best-deal" size="sm" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--color-gray-200, #e5e5e5)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Price</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>$32,450</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Savings</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-success, #26870D)' }}>-$2,445</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// VEHICLE ATTRIBUTE TAGS
// ============================================================================

type AttributeType = 'new' | 'used' | 'certified' | 'ev' | 'hybrid' | 'gas' | 'diesel' | 'awd' | 'fwd' | 'rwd' | '4wd';

const ATTRIBUTE_CONFIG: Record<AttributeType, { 
  label: string; 
  bgColor: string; 
  textColor: string;
  icon?: React.FC<{ size?: number }>;
}> = {
  // Inventory Status
  'new': { label: 'New', bgColor: '#1B5F8A', textColor: '#ffffff' },
  'used': { label: 'Used', bgColor: '#6b7280', textColor: '#ffffff' },
  'certified': { label: 'Certified', bgColor: '#7c3aed', textColor: '#ffffff', icon: ShieldCheck },
  // Fuel Types
  'ev': { label: 'EV', bgColor: '#16a34a', textColor: '#ffffff', icon: Zap },
  'hybrid': { label: 'Hybrid', bgColor: '#059669', textColor: '#ffffff', icon: Leaf },
  'gas': { label: 'Gas', bgColor: '#6b7280', textColor: '#ffffff', icon: Fuel },
  'diesel': { label: 'Diesel', bgColor: '#374151', textColor: '#ffffff', icon: Fuel },
  // Drivetrain
  'awd': { label: 'AWD', bgColor: '#1e40af', textColor: '#ffffff', icon: Car },
  'fwd': { label: 'FWD', bgColor: '#475569', textColor: '#ffffff', icon: Car },
  'rwd': { label: 'RWD', bgColor: '#475569', textColor: '#ffffff', icon: Car },
  '4wd': { label: '4WD', bgColor: '#1e40af', textColor: '#ffffff', icon: Car },
};

interface AttributeTagProps {
  type: AttributeType;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

const AttributeTag: React.FC<AttributeTagProps> = ({ type, size = 'md', showIcon = false }) => {
  const config = ATTRIBUTE_CONFIG[type];
  const Icon = config.icon;
  
  const sizes = {
    sm: { padding: '2px 6px', fontSize: '10px', iconSize: 10, gap: '3px' },
    md: { padding: '4px 8px', fontSize: '11px', iconSize: 12, gap: '4px' },
  };
  
  const sizeConfig = sizes[size];
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: sizeConfig.gap,
      padding: sizeConfig.padding,
      backgroundColor: config.bgColor,
      color: config.textColor,
      fontSize: sizeConfig.fontSize,
      fontWeight: 600,
      fontFamily: 'var(--font-body, Inter, sans-serif)',
      textTransform: 'uppercase',
      letterSpacing: '0.03em',
      borderRadius: '4px',
      lineHeight: 1,
    }}>
      {showIcon && Icon && <Icon size={sizeConfig.iconSize} />}
      {config.label}
    </span>
  );
};

/**
 * Vehicle attribute tags for inventory status, fuel type, and drivetrain.
 */
export const VehicleAttributeTags: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Vehicle Attribute Tags</h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Small tags indicating vehicle attributes like inventory status, fuel type, and drivetrain.
          Used on vehicle cards and listings for quick identification.
        </p>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Inventory Status</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <AttributeTag type="new" />
          <AttributeTag type="used" />
          <AttributeTag type="certified" showIcon />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Fuel Types</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <AttributeTag type="ev" showIcon />
          <AttributeTag type="hybrid" showIcon />
          <AttributeTag type="gas" showIcon />
          <AttributeTag type="diesel" showIcon />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Drivetrain</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <AttributeTag type="awd" />
          <AttributeTag type="fwd" />
          <AttributeTag type="rwd" />
          <AttributeTag type="4wd" />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Combined Tags</h3>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <AttributeTag type="new" />
          <AttributeTag type="ev" showIcon />
          <AttributeTag type="awd" />
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <AttributeTag type="used" />
          <AttributeTag type="hybrid" showIcon />
          <AttributeTag type="fwd" />
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <AttributeTag type="certified" showIcon />
          <AttributeTag type="gas" />
          <AttributeTag type="4wd" />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>In Context - Vehicle Listing</h3>
        <div style={{
          display: 'flex',
          gap: '16px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid var(--color-gray-200, #e5e5e5)',
          maxWidth: '500px',
        }}>
          <div style={{ width: '140px', height: '100px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"
              alt="Honda Accord"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <AttributeTag type="new" size="sm" />
              <AttributeTag type="hybrid" size="sm" showIcon />
              <AttributeTag type="fwd" size="sm" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>2025 Honda Accord Hybrid</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginBottom: '8px' }}>Sport-L · Costa Mesa, CA</p>
            <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>$35,890</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// PRICING/TRUST BADGES
// ============================================================================

type TrustBadgeType = 'owner-verified' | 'clean-history' | 'one-owner' | 'no-accidents' | 'service-records';

const TRUST_CONFIG: Record<TrustBadgeType, { 
  label: string; 
  icon: React.FC<{ size?: number }>;
}> = {
  'owner-verified': { label: 'Owner Verified', icon: User },
  'clean-history': { label: 'Clean History', icon: ShieldCheck },
  'one-owner': { label: 'One Owner', icon: User },
  'no-accidents': { label: 'No Accidents', icon: ShieldCheck },
  'service-records': { label: 'Service Records', icon: History },
};

interface TrustBadgeProps {
  type: TrustBadgeType;
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md';
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ type, variant = 'outlined', size = 'md' }) => {
  const config = TRUST_CONFIG[type];
  const Icon = config.icon;
  
  const sizes = {
    sm: { padding: '4px 8px', fontSize: '10px', iconSize: 12, gap: '4px' },
    md: { padding: '6px 10px', fontSize: '11px', iconSize: 14, gap: '6px' },
  };
  
  const sizeConfig = sizes[size];
  const isFilled = variant === 'filled';
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: sizeConfig.gap,
      padding: sizeConfig.padding,
      backgroundColor: isFilled ? 'var(--color-success, #26870D)' : 'transparent',
      color: isFilled ? 'white' : 'var(--color-success, #26870D)',
      fontSize: sizeConfig.fontSize,
      fontWeight: 600,
      fontFamily: 'var(--font-body, Inter, sans-serif)',
      borderRadius: '4px',
      border: isFilled ? 'none' : '1px solid var(--color-success, #26870D)',
      lineHeight: 1,
    }}>
      <Icon size={sizeConfig.iconSize} />
      {config.label}
    </span>
  );
};

interface CountBadgeProps {
  count: number;
  label?: string;
  size?: 'sm' | 'md';
}

const CountBadge: React.FC<CountBadgeProps> = ({ count, label = 'available', size = 'md' }) => {
  const sizes = {
    sm: { padding: '4px 8px', fontSize: '10px' },
    md: { padding: '6px 10px', fontSize: '11px' },
  };
  
  const sizeConfig = sizes[size];
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: sizeConfig.padding,
      backgroundColor: 'var(--color-gray-100, #f3f4f6)',
      color: 'var(--color-gray-700, #374151)',
      fontSize: sizeConfig.fontSize,
      fontWeight: 500,
      fontFamily: 'var(--font-body, Inter, sans-serif)',
      borderRadius: '4px',
      lineHeight: 1,
    }}>
      <strong>{count}</strong> {label}
    </span>
  );
};

/**
 * Trust and pricing badges for vehicle history and availability.
 */
export const PricingTrustBadges: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Pricing & Trust Badges</h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Badges that build trust and provide transparency about vehicle history and availability.
        </p>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Trust Badges - Outlined</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <TrustBadge type="owner-verified" />
          <TrustBadge type="clean-history" />
          <TrustBadge type="one-owner" />
          <TrustBadge type="no-accidents" />
          <TrustBadge type="service-records" />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Trust Badges - Filled</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <TrustBadge type="owner-verified" variant="filled" />
          <TrustBadge type="clean-history" variant="filled" />
          <TrustBadge type="one-owner" variant="filled" />
          <TrustBadge type="no-accidents" variant="filled" />
          <TrustBadge type="service-records" variant="filled" />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>Count Badges</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <CountBadge count={3} label="available" />
          <CountBadge count={12} label="in stock" />
          <CountBadge count={5} label="nearby" />
        </div>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem' }}>In Context - Used Car Listing</h3>
        <div style={{
          width: '350px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid var(--color-gray-200, #e5e5e5)',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'relative', height: '180px' }}>
            <img 
              src="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"
              alt="Honda Accord"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
              <AttributeTag type="certified" showIcon size="sm" />
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '4px' }}>2022 Honda Accord EX-L</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginBottom: '12px' }}>
              32,450 miles · Costa Mesa, CA
            </p>
            
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <TrustBadge type="clean-history" size="sm" />
              <TrustBadge type="one-owner" size="sm" />
              <TrustBadge type="service-records" size="sm" />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--color-gray-200, #e5e5e5)' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>$26,995</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Est. $425/mo</div>
              </div>
              <CountBadge count={3} label="available" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

