import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Star, Users, BadgeCheck } from 'lucide-react';

/**
 * # Ratings & Scores
 * 
 * Rating and score displays are used throughout the application to show vehicle scores,
 * user reviews, and editorial assessments.
 * 
 * ## Rating Types
 * 
 * | Type | Scale | Source |
 * |------|-------|--------|
 * | C/D Rating | 1-10 | Car and Driver editorial team |
 * | Community Rating | 1-5 stars | User reviews |
 * | Overall Score | 1-100 | Calculated composite |
 * 
 * ## Design Guidelines
 * 
 * - C/D Ratings use the prominent score display with verified badge
 * - Always show the C/D Rating badge with checkmark when displaying editorial scores
 * - Community ratings use star icons
 * - Always show the scale context (e.g., "/10" or "/5")
 * - Use semantic colors: green for high, yellow for medium, red for low
 */

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'var(--font-body)',
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
  previewBox: {
    padding: '2rem',
    backgroundColor: 'var(--color-gray-50, #f9f9f9)',
    borderRadius: '12px',
    border: '1px solid var(--color-gray-200, #e5e5e5)',
    marginBottom: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  label: {
    fontSize: '0.75rem',
    color: 'var(--color-gray-500, #888)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
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

// C/D Score Component (prominent score display with verified badge)
interface CDScoreProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  label?: string;
}

const CDScore: React.FC<CDScoreProps> = ({
  score,
  maxScore = 10,
  size = 'lg',
  showBadge = true,
  label = 'C/D RATING',
}) => {
  const sizes = {
    sm: { 
      score: '2rem', 
      max: '1rem', 
      badge: 14, 
      label: '0.625rem',
      gap: '0.125rem',
    },
    md: { 
      score: '2.5rem', 
      max: '1.25rem', 
      badge: 16, 
      label: '0.75rem',
      gap: '0.25rem',
    },
    lg: { 
      score: '3.5rem', 
      max: '1.5rem', 
      badge: 18, 
      label: '0.75rem',
      gap: '0.25rem',
    },
    xl: { 
      score: '4.5rem', 
      max: '2rem', 
      badge: 22, 
      label: '0.875rem',
      gap: '0.375rem',
    },
  };

  const sizeConfig = sizes[size];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: sizeConfig.gap,
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'baseline',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        color: 'var(--color-dark, #222)',
        lineHeight: 1,
      }}>
        <span style={{ fontSize: sizeConfig.score }}>{score.toFixed(1)}</span>
        <span style={{ 
          fontSize: sizeConfig.max, 
          color: 'var(--color-gray-500, #666)',
          fontWeight: 400,
        }}>/{maxScore}</span>
      </div>
      {showBadge && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.375rem',
        }}>
          <BadgeCheck 
            size={sizeConfig.badge} 
            fill="var(--color-blue-cobalt, #1B5F8A)" 
            color="white"
          />
          <span style={{ 
            fontSize: sizeConfig.label, 
            fontWeight: 500,
            color: 'var(--color-blue-cobalt, #1B5F8A)',
            letterSpacing: '0.02em',
          }}>
            {label}
          </span>
        </div>
      )}
    </div>
  );
};

// Star Rating Component
interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = true,
  reviewCount,
}) => {
  const sizes = { sm: 14, md: 18, lg: 24 };
  const iconSize = sizes[size];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={iconSize}
            fill="var(--color-warning, #f59e0b)"
            color="var(--color-warning, #f59e0b)"
          />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <div style={{ position: 'relative' }}>
            <Star size={iconSize} color="var(--color-gray-300, #d1d5db)" />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
              <Star size={iconSize} fill="var(--color-warning, #f59e0b)" color="var(--color-warning, #f59e0b)" />
            </div>
          </div>
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={iconSize}
            color="var(--color-gray-300, #d1d5db)"
          />
        ))}
      </div>
      {showValue && (
        <span style={{
          fontSize: size === 'sm' ? '0.75rem' : size === 'md' ? '0.875rem' : '1rem',
          fontWeight: 500,
          color: 'var(--color-gray-700, #374151)',
        }}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span style={{
          fontSize: size === 'sm' ? '0.625rem' : '0.75rem',
          color: 'var(--color-gray-500, #888)',
        }}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};

// Numeric Rating Component (Alternative display styles)
interface NumericRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  variant?: 'default' | 'badge' | 'circle';
}

const NumericRating: React.FC<NumericRatingProps> = ({
  rating,
  maxRating = 10,
  size = 'md',
  label,
  variant = 'default',
}) => {
  const getColor = (value: number, max: number) => {
    const percentage = value / max;
    if (percentage >= 0.8) return 'var(--color-success, #26870D)';
    if (percentage >= 0.6) return 'var(--color-warning, #f59e0b)';
    return 'var(--color-error, #ef4444)';
  };

  const color = getColor(rating, maxRating);
  const sizes = {
    sm: { fontSize: '1rem', padding: '0.25rem 0.5rem' },
    md: { fontSize: '1.25rem', padding: '0.375rem 0.75rem' },
    lg: { fontSize: '1.5rem', padding: '0.5rem 1rem' },
  };

  if (variant === 'circle') {
    const circleSizes = { sm: 40, md: 56, lg: 72 };
    const dimension = circleSizes[size];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
        <div style={{
          width: dimension,
          height: dimension,
          borderRadius: '50%',
          backgroundColor: color,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: sizes[size].fontSize,
        }}>
          {rating.toFixed(1)}
        </div>
        {label && (
          <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>{label}</span>
        )}
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        {label && (
          <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>{label}</span>
        )}
        <span style={{
          backgroundColor: color,
          color: 'white',
          padding: sizes[size].padding,
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: sizes[size].fontSize,
        }}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  }

  // Default variant
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {label && (
        <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
        <span style={{
          fontSize: sizes[size].fontSize,
          fontWeight: 700,
          color: color,
        }}>
          {rating.toFixed(1)}
        </span>
        <span style={{
          fontSize: size === 'sm' ? '0.75rem' : '0.875rem',
          color: 'var(--color-gray-400)',
        }}>
          /{maxRating}
        </span>
      </div>
    </div>
  );
};

// Rating Bar Component
interface RatingBarProps {
  rating: number;
  maxRating?: number;
  label?: string;
  showValue?: boolean;
}

const RatingBar: React.FC<RatingBarProps> = ({
  rating,
  maxRating = 10,
  label,
  showValue = true,
}) => {
  const percentage = (rating / maxRating) * 100;
  const getColor = (pct: number) => {
    if (pct >= 80) return 'var(--color-success, #26870D)';
    if (pct >= 60) return 'var(--color-warning, #f59e0b)';
    return 'var(--color-error, #ef4444)';
  };

  return (
    <div style={{ width: '100%' }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
          {label && <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-700)' }}>{label}</span>}
          {showValue && <span style={{ fontSize: '0.875rem', fontWeight: 600, color: getColor(percentage) }}>{rating.toFixed(1)}</span>}
        </div>
      )}
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: 'var(--color-gray-200, #e5e5e5)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: getColor(percentage),
          borderRadius: '4px',
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Elements/Ratings',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Rating displays for vehicle scores, user reviews, and editorial assessments.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * C/D Score - The prominent Car and Driver score display with verified badge.
 */
export const CDScores: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>C/D Score Display</h2>
        <p style={styles.sectionDescription}>
          The primary score display used for Car and Driver ratings. Features a large score with 
          the verified badge icon, indicating an official editorial rating.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p style={styles.label}>Sizes</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <CDScore score={9.9} size="sm" />
                  <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Small</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <CDScore score={9.9} size="md" />
                  <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Medium</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <CDScore score={9.9} size="lg" />
                  <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Large</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <CDScore score={9.9} size="xl" />
                  <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Extra Large</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Score Values</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <CDScore score={9.9} size="lg" />
                <CDScore score={8.5} size="lg" />
                <CDScore score={7.2} size="lg" />
                <CDScore score={6.0} size="lg" />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Without Badge</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <CDScore score={9.5} size="lg" showBadge={false} />
                <CDScore score={8.0} size="lg" showBadge={false} />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Custom Labels</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <CDScore score={9.2} size="lg" label="EXPERT RATING" />
                <CDScore score={8.7} size="lg" label="STAFF PICK" />
                <CDScore score={9.5} size="lg" label="TOP RATED" />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>In Context - Card Header</p>
            <div style={{
              width: '320px',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid var(--color-gray-200)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '180px',
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
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'white',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-md, 0 3px 6px rgba(0,0,0,0.08))',
                }}>
                  <CDScore score={8.5} size="sm" />
                </div>
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>2025 Honda Accord</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>Starting at $28,990</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Star ratings for community/user reviews.
 */
export const StarRatings: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Star Ratings</h2>
        <p style={styles.sectionDescription}>
          Used for community ratings and user reviews. Supports half-star increments.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p style={styles.label}>Sizes</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <span style={{ width: '60px', fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>Small</span>
                  <StarRating rating={4.5} size="sm" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <span style={{ width: '60px', fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>Medium</span>
                  <StarRating rating={4.5} size="md" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <span style={{ width: '60px', fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>Large</span>
                  <StarRating rating={4.5} size="lg" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Rating Values</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1].map((rating) => (
                  <StarRating key={rating} rating={rating} size="md" />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>With Review Count</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <StarRating rating={4.7} reviewCount={1243} />
                <StarRating rating={4.2} reviewCount={89} />
                <StarRating rating={3.8} reviewCount={12} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Numeric ratings for staff/editorial scores.
 */
export const NumericRatings: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Numeric Ratings</h2>
        <p style={styles.sectionDescription}>
          Alternative numeric display styles for category scores and compact layouts. Color-coded by score level.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p style={styles.label}>Default Variant</p>
            <div style={styles.previewBox}>
              <div style={styles.grid}>
                <NumericRating rating={9.2} label="C/D Rating" />
                <NumericRating rating={7.5} label="C/D Rating" />
                <NumericRating rating={5.8} label="C/D Rating" />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Badge Variant</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <NumericRating rating={9.2} variant="badge" label="Overall:" />
                <NumericRating rating={7.5} variant="badge" label="Overall:" />
                <NumericRating rating={5.8} variant="badge" label="Overall:" />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Circle Variant</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <NumericRating rating={9.2} variant="circle" size="lg" label="Excellent" />
                <NumericRating rating={7.5} variant="circle" size="lg" label="Good" />
                <NumericRating rating={5.8} variant="circle" size="lg" label="Average" />
                <NumericRating rating={4.2} variant="circle" size="lg" label="Below Avg" />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Sizes</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
                <NumericRating rating={8.5} variant="circle" size="sm" label="Small" />
                <NumericRating rating={8.5} variant="circle" size="md" label="Medium" />
                <NumericRating rating={8.5} variant="circle" size="lg" label="Large" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Rating bars for category breakdowns.
 */
export const RatingBars: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Rating Bars</h2>
        <p style={styles.sectionDescription}>
          Used for showing category breakdowns and detailed scoring. Great for comparing multiple attributes.
        </p>
        
        <div style={styles.previewBox}>
          <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <RatingBar rating={9.2} label="Performance" />
            <RatingBar rating={8.5} label="Comfort" />
            <RatingBar rating={7.8} label="Interior" />
            <RatingBar rating={7.2} label="Technology" />
            <RatingBar rating={6.5} label="Value" />
            <RatingBar rating={5.0} label="Fuel Economy" />
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Combined rating displays as seen on vehicle cards and pages.
 */
export const InContext: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Ratings in Context</h2>
        <p style={styles.sectionDescription}>
          Examples of how ratings appear in vehicle cards, detail pages, and comparison views.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Vehicle Card Rating */}
          <div>
            <p style={styles.label}>Vehicle Card</p>
            <div style={{
              width: '320px',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid var(--color-gray-200)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '180px',
                backgroundColor: 'var(--color-gray-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img 
                  src="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"
                  alt="Honda Accord"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>2025 Honda Accord</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={14} fill="var(--color-blue-cobalt)" color="var(--color-blue-cobalt)" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>8.5</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>C/D Rating</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Users size={12} color="var(--color-gray-400)" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>4.5 (892)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rating Summary */}
          <div>
            <p style={styles.label}>Rating Summary Panel</p>
            <div style={{
              maxWidth: '400px',
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid var(--color-gray-200)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <CDScore score={8.5} size="lg" />
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>Expert Evaluation</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>Based on comprehensive testing</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <RatingBar rating={9.0} label="Performance" />
                <RatingBar rating={8.5} label="Comfort" />
                <RatingBar rating={8.0} label="Interior" />
                <RatingBar rating={7.5} label="Value" />
              </div>
            </div>
          </div>
          
          {/* Dual Rating Display */}
          <div>
            <p style={styles.label}>Staff + Community Ratings</p>
            <div style={{
              display: 'flex',
              gap: '2rem',
              padding: '1.5rem',
              backgroundColor: 'var(--color-gray-50)',
              borderRadius: '12px',
              maxWidth: '500px',
            }}>
              <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid var(--color-gray-200)', paddingRight: '2rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-dark)' }}>8.5<span style={{ fontSize: '1rem', color: 'var(--color-gray-400)', fontWeight: 400 }}>/10</span></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                  <BadgeCheck size={14} fill="var(--color-blue-cobalt)" color="white" />
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-blue-cobalt)', fontWeight: 500 }}>C/D RATING</span>
                </div>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Users size={16} color="var(--color-gray-500)" />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase' }}>Community</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem' }}>
                  <StarRating rating={4.5} size="md" showValue={false} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>892 reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Implementation guidelines and code examples.
 */
export const Implementation: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Implementation</h2>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>C/D Score Component</h3>
        <pre style={styles.codeBlock}>
{`interface CDScoreProps {
  score: number;         // 0-10 scale
  maxScore?: number;     // Default: 10
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;   // Show verified badge
  label?: string;        // Default: 'C/D RATING'
}

// Usage
<CDScore score={9.9} />
<CDScore score={8.5} size="xl" />
<CDScore score={7.2} showBadge={false} />
<CDScore score={9.0} label="EXPERT RATING" />`}
        </pre>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Star Rating Component</h3>
        <pre style={styles.codeBlock}>
{`interface StarRatingProps {
  rating: number;        // 0-5 scale
  maxRating?: number;    // Default: 5
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
}

// Usage
<StarRating rating={4.5} />
<StarRating rating={4.2} size="lg" reviewCount={892} />`}
        </pre>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Numeric Rating Component</h3>
        <pre style={styles.codeBlock}>
{`interface NumericRatingProps {
  rating: number;        // 0-10 scale (typically)
  maxRating?: number;    // Default: 10
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  variant?: 'default' | 'badge' | 'circle';
}

// Usage
<NumericRating rating={8.5} label="C/D Rating" />
<NumericRating rating={9.0} variant="circle" size="lg" />
<NumericRating rating={7.5} variant="badge" label="Overall:" />`}
        </pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Color Thresholds</h3>
        <pre style={styles.codeBlock}>
{`// Rating color logic
const getColor = (rating: number, maxRating: number) => {
  const percentage = rating / maxRating;
  
  if (percentage >= 0.8) {
    return 'var(--color-success)';  // Green: 8+/10 or 4+/5
  }
  if (percentage >= 0.6) {
    return 'var(--color-warning)';  // Yellow: 6-7.9/10 or 3-3.9/5
  }
  return 'var(--color-error)';      // Red: <6/10 or <3/5
};`}
        </pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>CSS Variables Used</h3>
        <pre style={styles.codeBlock}>
{`/* Rating colors */
--color-success: #26870D     /* High ratings (green) */
--color-warning: #f59e0b     /* Medium ratings, stars (yellow/gold) */
--color-error: #ef4444       /* Low ratings (red) */
--color-blue-cobalt: #1B5F8A /* C/D Rating accent */

/* Supporting colors */
--color-gray-200: #e5e5e5    /* Empty stars, bar backgrounds */
--color-gray-300: #d1d5db    /* Empty star stroke */
--color-gray-500: #888       /* Labels, review counts */`}
        </pre>
      </div>
    </div>
  ),
};

