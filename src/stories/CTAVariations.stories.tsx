import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';
import { VehicleCard } from '../components/VehicleCard';
import '../index.css';

/**
 * CTA Variations A/B Test Documentation
 * 
 * Goal: Explore alternative CTAs for the Marketplace to improve click-thru rate
 * and help SEO by adding Model name to Shopping CTAs.
 * 
 * Current CTA: "Shop Now"
 * Proposed CTA: "Shop the [Model]"
 */

const meta: Meta = {
  title: 'Design System/CTA Variations Test',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# CTA Variations A/B Test

## Goal

Explore alternative CTAs for the Marketplace to either improve the click-thru rate or validate that the existing CTA is the best one.

---

## SEO Recommendation

SEO has advised that adding the Model name to our Shopping CTAs will help our pages get indexed.

---

## Proposed Change

| Current CTA | Proposed CTA |
|-------------|--------------|
| Shop Now | Shop the [Model] |
| Shop New | Shop New [Model] |
| Shop Used | Shop Used [Model] |

---

## Pages & Sections Affected

| Page/Section | Current CTA | Proposed CTA |
|--------------|-------------|--------------|
| **MMP Hero** | Shop Now, Shop New, Shop Used | Shop the Trax, Shop New Trax, Shop Used Trax |
| **Vehicle Cards** | Shop Now | Shop the [Model] |
| **Similar Models Section** | Shop Now | Shop the [Model] |
| **More from [Make] Section** | Shop Now | Shop the [Model] |
| **Make Page** | Shop Now | Shop the [Model] |
| **Category Page** | Shop Now | Shop the [Model] |
| **Category Ranking Pages** | Shop Now | Shop the [Model] |

---

## Metrics to Track

- **Click-through Rate (CTR)** — Primary metric
- **Conversion Rate** — From CTA click to dealer lead
- **SEO Indexing** — Page ranking improvements
- **User Engagement** — Time to first CTA click

---

## Implementation Notes

- Model name should be dynamically inserted
- Truncate long model names if needed (e.g., "Shop the Grand Cherokee" → "Shop the Gr...")
- Consider mobile viewport constraints
- Maintain accessibility (button text should be descriptive)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ============================================
// HERO CTA VARIATIONS
// ============================================

export const HeroCTAComparison: Story = {
  name: 'Hero CTA Comparison',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of current vs proposed Hero CTAs.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '32px', maxWidth: '900px' }}>
      <style>
        {`
          .cta-section {
            padding: 24px;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
          }
          .cta-section h3 {
            margin: 0 0 8px 0;
            font-family: var(--font-heading);
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #666;
          }
          .cta-section h4 {
            margin: 0 0 16px 0;
            font-family: var(--font-heading);
            font-size: 20px;
            font-weight: 700;
          }
          .cta-buttons {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }
          .variant-label {
            display: inline-block;
            padding: 4px 8px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-radius: 4px;
            margin-bottom: 16px;
          }
          .variant-label--current {
            background: #f5f5f5;
            color: #666;
          }
          .variant-label--proposed {
            background: #e8f5e9;
            color: #2e7d32;
          }
        `}
      </style>

      <div>
        <h2 style={{ margin: '0 0 24px 0', fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: '700' }}>
          Hero Section CTAs
        </h2>
        <p style={{ margin: '0 0 32px 0', color: '#666', lineHeight: '1.6' }}>
          The Hero section contains three primary shopping CTAs. Adding the model name helps with SEO indexing.
        </p>
      </div>

      {/* Current Version */}
      <div className="cta-section">
        <span className="variant-label variant-label--current">Current (Control)</span>
        <h3>2025 Chevrolet Trax</h3>
        <h4>MSRP $20,400 - $24,400</h4>
        <div className="cta-buttons">
          <Button variant="primary" size="small">SHOP NEW</Button>
          <Button variant="outline" size="small">SHOP USED</Button>
          <Button variant="success" size="small">GET YOUR TRADE-IN VALUE</Button>
        </div>
      </div>

      {/* Proposed Version */}
      <div className="cta-section">
        <span className="variant-label variant-label--proposed">Proposed (Variant A)</span>
        <h3>2025 Chevrolet Trax</h3>
        <h4>MSRP $20,400 - $24,400</h4>
        <div className="cta-buttons">
          <Button variant="primary" size="small">SHOP NEW TRAX</Button>
          <Button variant="outline" size="small">SHOP USED TRAX</Button>
          <Button variant="success" size="small">GET YOUR TRADE-IN VALUE</Button>
        </div>
      </div>

      {/* Alternative Version */}
      <div className="cta-section">
        <span className="variant-label variant-label--proposed">Proposed (Variant B)</span>
        <h3>2025 Chevrolet Trax</h3>
        <h4>MSRP $20,400 - $24,400</h4>
        <div className="cta-buttons">
          <Button variant="primary" size="small">SHOP THE TRAX</Button>
          <Button variant="outline" size="small">SHOP USED TRAX</Button>
          <Button variant="success" size="small">GET YOUR TRADE-IN VALUE</Button>
        </div>
      </div>
    </div>
  ),
};

// ============================================
// VEHICLE CARD CTA VARIATIONS
// ============================================

export const VehicleCardCTAComparison: Story = {
  name: 'Vehicle Card CTA Comparison',
  parameters: {
    docs: {
      description: {
        story: 'Comparison of CTA variations on vehicle cards used in Similar Models and More from [Make] sections.',
      },
    },
  },
  render: () => (
    <div style={{ padding: '32px', maxWidth: '1200px' }}>
      <style>
        {`
          .card-grid {
            display: grid;
            grid-template-columns: repeat(3, 280px);
            gap: 24px;
            margin-bottom: 48px;
          }
          .section-header {
            margin-bottom: 24px;
          }
          .section-header h3 {
            margin: 0 0 8px 0;
            font-family: var(--font-heading);
            font-size: 20px;
            font-weight: 700;
          }
          .section-header p {
            margin: 0;
            color: #666;
            font-size: 14px;
          }
          .variant-badge {
            display: inline-block;
            padding: 4px 8px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-radius: 4px;
            margin-bottom: 12px;
          }
          .variant-badge--current { background: #f5f5f5; color: #666; }
          .variant-badge--proposed { background: #e8f5e9; color: #2e7d32; }
        `}
      </style>

      <h2 style={{ margin: '0 0 32px 0', fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: '700' }}>
        Vehicle Card CTAs
      </h2>

      {/* Current Version */}
      <div className="section-header">
        <span className="variant-badge variant-badge--current">Current (Control)</span>
        <h3>Similar Models Section</h3>
        <p>Generic "Shop Now" CTA on all cards</p>
      </div>
      <div className="card-grid">
        <VehicleCard
          id="1"
          name="2025 Honda Accord"
          slug="honda/accord/2025"
          image="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop"
          price="$28,990"
          rating={9.0}
          showShopButton
        />
        <VehicleCard
          id="2"
          name="2025 Toyota Camry"
          slug="toyota/camry/2025"
          image="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop"
          price="$27,070"
          rating={8.5}
          showShopButton
        />
        <VehicleCard
          id="3"
          name="2025 Mazda CX-5"
          slug="mazda/cx-5/2025"
          image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop"
          price="$30,300"
          rating={9.0}
          editorsChoice
          showShopButton
        />
      </div>

      {/* Proposed Version - Note: VehicleCard would need to be updated to support model-specific CTA */}
      <div className="section-header">
        <span className="variant-badge variant-badge--proposed">Proposed (Variant)</span>
        <h3>Similar Models Section</h3>
        <p>Model-specific "Shop the [Model]" CTA</p>
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 280px)', 
        gap: '24px',
        marginBottom: '48px'
      }}>
        {/* Mock cards showing proposed CTA text */}
        <div style={{ 
          border: '1px solid #e5e5e5', 
          borderRadius: '8px', 
          overflow: 'hidden',
          background: '#fff'
        }}>
          <div style={{ aspectRatio: '16/10', background: '#f5f5f5' }}>
            <img 
              src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop" 
              alt="Honda Accord"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700' }}>2025 Honda Accord</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>Starting at <strong>$28,990</strong></p>
            <Button variant="primary" size="small" fullWidth>SHOP THE ACCORD</Button>
          </div>
        </div>
        <div style={{ 
          border: '1px solid #e5e5e5', 
          borderRadius: '8px', 
          overflow: 'hidden',
          background: '#fff'
        }}>
          <div style={{ aspectRatio: '16/10', background: '#f5f5f5' }}>
            <img 
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop" 
              alt="Toyota Camry"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700' }}>2025 Toyota Camry</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>Starting at <strong>$27,070</strong></p>
            <Button variant="primary" size="small" fullWidth>SHOP THE CAMRY</Button>
          </div>
        </div>
        <div style={{ 
          border: '1px solid #e5e5e5', 
          borderRadius: '8px', 
          overflow: 'hidden',
          background: '#fff'
        }}>
          <div style={{ aspectRatio: '16/10', background: '#f5f5f5' }}>
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop" 
              alt="Mazda CX-5"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700' }}>2025 Mazda CX-5</h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>Starting at <strong>$30,300</strong></p>
            <Button variant="primary" size="small" fullWidth>SHOP THE CX-5</Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ============================================
// LONG MODEL NAME HANDLING
// ============================================

export const LongModelNameHandling: Story = {
  name: 'Long Model Name Handling',
  parameters: {
    docs: {
      description: {
        story: 'How to handle longer model names like "Grand Cherokee" or "Model 3 Performance".',
      },
    },
  },
  render: () => (
    <div style={{ padding: '32px', maxWidth: '800px' }}>
      <style>
        {`
          .model-test {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 32px;
            padding: 24px;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
          }
          .model-test h4 {
            margin: 0;
            font-family: var(--font-heading);
            font-size: 16px;
            font-weight: 600;
          }
          .model-test p {
            margin: 0;
            color: #666;
            font-size: 14px;
          }
          .button-row {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }
        `}
      </style>

      <h2 style={{ margin: '0 0 16px 0', fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: '700' }}>
        Long Model Name Handling
      </h2>
      <p style={{ margin: '0 0 32px 0', color: '#666', lineHeight: '1.6' }}>
        Some model names are longer and may need special consideration for button width and readability.
      </p>

      {/* Short Model Name */}
      <div className="model-test">
        <h4>Short Model: Trax (4 chars)</h4>
        <p>No issues with button width</p>
        <div className="button-row">
          <Button variant="primary" size="small">SHOP NEW TRAX</Button>
          <Button variant="outline" size="small">SHOP USED TRAX</Button>
        </div>
      </div>

      {/* Medium Model Name */}
      <div className="model-test">
        <h4>Medium Model: Accord (6 chars)</h4>
        <p>Comfortable fit</p>
        <div className="button-row">
          <Button variant="primary" size="small">SHOP NEW ACCORD</Button>
          <Button variant="outline" size="small">SHOP USED ACCORD</Button>
        </div>
      </div>

      {/* Long Model Name */}
      <div className="model-test">
        <h4>Long Model: Grand Cherokee (14 chars)</h4>
        <p>May need wider buttons or truncation on mobile</p>
        <div className="button-row">
          <Button variant="primary" size="small">SHOP NEW GRAND CHEROKEE</Button>
          <Button variant="outline" size="small">SHOP USED GRAND CHEROKEE</Button>
        </div>
      </div>

      {/* Very Long Model Name */}
      <div className="model-test">
        <h4>Very Long Model: Model 3 Performance (18 chars)</h4>
        <p>Consider using just "Model 3" for CTA</p>
        <div className="button-row">
          <Button variant="primary" size="small">SHOP NEW MODEL 3</Button>
          <Button variant="outline" size="small">SHOP USED MODEL 3</Button>
        </div>
      </div>
    </div>
  ),
};

// ============================================
// MOBILE RESPONSIVE TESTING
// ============================================

export const MobileResponsive: Story = {
  name: 'Mobile Responsive CTAs',
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'How the proposed CTAs appear on mobile devices. Important for touch targets and readability.',
      },
    },
  },
  render: () => (
    <div style={{ padding: '16px', maxWidth: '375px', margin: '0 auto' }}>
      <style>
        {`
          .mobile-hero-cta {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 16px;
            background: #f5f5f5;
            border-radius: 8px;
            margin-bottom: 24px;
          }
          .mobile-hero-cta h3 {
            margin: 0 0 4px 0;
            font-family: var(--font-heading);
            font-size: 18px;
            font-weight: 700;
          }
          .mobile-hero-cta p {
            margin: 0 0 12px 0;
            font-size: 14px;
            color: #666;
          }
        `}
      </style>

      <h2 style={{ margin: '0 0 24px 0', fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '700' }}>
        Mobile View
      </h2>

      <div className="mobile-hero-cta">
        <h3>2025 Chevrolet Trax</h3>
        <p>MSRP $20,400 - $24,400</p>
        <Button variant="primary" size="medium" fullWidth>SHOP NEW TRAX</Button>
        <Button variant="outline" size="medium" fullWidth>SHOP USED TRAX</Button>
        <Button variant="success" size="medium" fullWidth>GET YOUR TRADE-IN VALUE</Button>
      </div>

      <div className="mobile-hero-cta">
        <h3>2025 Jeep Grand Cherokee</h3>
        <p>MSRP $42,000 - $68,000</p>
        <Button variant="primary" size="medium" fullWidth>SHOP NEW GRAND CHEROKEE</Button>
        <Button variant="outline" size="medium" fullWidth>SHOP USED GRAND CHEROKEE</Button>
        <Button variant="success" size="medium" fullWidth>GET YOUR TRADE-IN VALUE</Button>
      </div>
    </div>
  ),
};

// ============================================
// ALL CTA VARIANTS MATRIX
// ============================================

export const AllCTAVariants: Story = {
  name: 'All CTA Variants Matrix',
  parameters: {
    docs: {
      description: {
        story: 'Complete matrix of all CTA text variations being tested.',
      },
    },
  },
  render: () => (
    <div style={{ padding: '32px', maxWidth: '1000px' }}>
      <style>
        {`
          .matrix-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
          }
          .matrix-table th {
            text-align: left;
            padding: 12px 16px;
            background: #f5f5f5;
            font-weight: 600;
            border-bottom: 2px solid #e5e5e5;
          }
          .matrix-table td {
            padding: 12px 16px;
            border-bottom: 1px solid #e5e5e5;
            vertical-align: top;
          }
          .matrix-table tr:hover td {
            background: #fafafa;
          }
          .cta-current {
            color: #666;
          }
          .cta-proposed {
            color: #2e7d32;
            font-weight: 600;
          }
        `}
      </style>

      <h2 style={{ margin: '0 0 16px 0', fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: '700' }}>
        CTA Variants Matrix
      </h2>
      <p style={{ margin: '0 0 32px 0', color: '#666', lineHeight: '1.6' }}>
        Complete list of all CTA variations across pages and sections.
      </p>

      <table className="matrix-table">
        <thead>
          <tr>
            <th>Page/Section</th>
            <th>CTA Type</th>
            <th>Current (Control)</th>
            <th>Proposed (Variant)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={3}><strong>MMP Hero</strong></td>
            <td>Primary</td>
            <td className="cta-current">SHOP NEW</td>
            <td className="cta-proposed">SHOP NEW [MODEL]</td>
          </tr>
          <tr>
            <td>Secondary</td>
            <td className="cta-current">SHOP USED</td>
            <td className="cta-proposed">SHOP USED [MODEL]</td>
          </tr>
          <tr>
            <td>Tertiary</td>
            <td className="cta-current">GET YOUR TRADE-IN VALUE</td>
            <td className="cta-proposed">GET YOUR TRADE-IN VALUE</td>
          </tr>
          <tr>
            <td><strong>Vehicle Cards</strong></td>
            <td>Primary</td>
            <td className="cta-current">SHOP NOW</td>
            <td className="cta-proposed">SHOP THE [MODEL]</td>
          </tr>
          <tr>
            <td><strong>Similar Models</strong></td>
            <td>Primary</td>
            <td className="cta-current">Shop Now</td>
            <td className="cta-proposed">Shop the [MODEL]</td>
          </tr>
          <tr>
            <td><strong>More from [Make]</strong></td>
            <td>Primary</td>
            <td className="cta-current">Shop Now</td>
            <td className="cta-proposed">Shop the [MODEL]</td>
          </tr>
          <tr>
            <td><strong>Make Page</strong></td>
            <td>Primary</td>
            <td className="cta-current">Shop Now</td>
            <td className="cta-proposed">Shop the [MODEL]</td>
          </tr>
          <tr>
            <td><strong>Category Page</strong></td>
            <td>Primary</td>
            <td className="cta-current">Shop Now</td>
            <td className="cta-proposed">Shop the [MODEL]</td>
          </tr>
          <tr>
            <td><strong>Category Rankings</strong></td>
            <td>Primary</td>
            <td className="cta-current">Shop Now</td>
            <td className="cta-proposed">Shop the [MODEL]</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

// ============================================
// IMPLEMENTATION CHECKLIST
// ============================================

export const ImplementationChecklist: Story = {
  name: 'Implementation Checklist',
  parameters: {
    docs: {
      description: {
        story: 'Technical implementation checklist for the CTA variations.',
      },
    },
  },
  render: () => (
    <div style={{ padding: '32px', maxWidth: '800px' }}>
      <style>
        {`
          .checklist {
            list-style: none;
            padding: 0;
            margin: 0 0 32px 0;
          }
          .checklist li {
            padding: 12px 0;
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            align-items: flex-start;
            gap: 12px;
          }
          .checklist-checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid #ccc;
            border-radius: 4px;
            flex-shrink: 0;
            margin-top: 2px;
          }
          .checklist-content {
            flex: 1;
          }
          .checklist-content strong {
            display: block;
            margin-bottom: 4px;
          }
          .checklist-content p {
            margin: 0;
            color: #666;
            font-size: 14px;
          }
          .code-block {
            background: #1d1d1f;
            color: #f5f5f7;
            padding: 16px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 13px;
            overflow-x: auto;
            margin: 16px 0;
          }
        `}
      </style>

      <h2 style={{ margin: '0 0 16px 0', fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: '700' }}>
        Implementation Checklist
      </h2>
      <p style={{ margin: '0 0 32px 0', color: '#666', lineHeight: '1.6' }}>
        Technical tasks required to implement the CTA variations.
      </p>

      <h3 style={{ margin: '0 0 16px 0', fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '600' }}>
        Component Updates
      </h3>
      <ul className="checklist">
        <li>
          <div className="checklist-checkbox"></div>
          <div className="checklist-content">
            <strong>Hero Component</strong>
            <p>Add <code>ctaVariant</code> prop to toggle between "Shop New" and "Shop New [Model]"</p>
          </div>
        </li>
        <li>
          <div className="checklist-checkbox"></div>
          <div className="checklist-content">
            <strong>VehicleCard Component</strong>
            <p>Add <code>ctaText</code> prop or <code>ctaVariant</code> to customize button text</p>
          </div>
        </li>
        <li>
          <div className="checklist-checkbox"></div>
          <div className="checklist-content">
            <strong>Comparison Component</strong>
            <p>Update Shop Now button to use model-specific text</p>
          </div>
        </li>
        <li>
          <div className="checklist-checkbox"></div>
          <div className="checklist-content">
            <strong>TopTenCarouselLeads Component</strong>
            <p>Update Shop Now button to use model-specific text</p>
          </div>
        </li>
      </ul>

      <h3 style={{ margin: '32px 0 16px 0', fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '600' }}>
        Example Implementation
      </h3>
      <pre className="code-block">
{`// Hero.tsx
interface HeroProps {
  vehicle: VehicleData;
  ctaVariant?: 'default' | 'with-model';
}

const Hero = ({ vehicle, ctaVariant = 'default' }: HeroProps) => {
  const shopNewText = ctaVariant === 'with-model' 
    ? \`SHOP NEW \${vehicle.model.toUpperCase()}\`
    : 'SHOP NEW';
    
  const shopUsedText = ctaVariant === 'with-model'
    ? \`SHOP USED \${vehicle.model.toUpperCase()}\`
    : 'SHOP USED';

  return (
    <div className="hero__shop-buttons">
      <Button variant="primary">{shopNewText}</Button>
      <Button variant="outline">{shopUsedText}</Button>
    </div>
  );
};`}
      </pre>

      <h3 style={{ margin: '32px 0 16px 0', fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '600' }}>
        A/B Test Configuration
      </h3>
      <pre className="code-block">
{`// Feature flag for A/B test
const CTA_VARIANT = process.env.REACT_APP_CTA_VARIANT || 'default';

// Usage
<Hero 
  vehicle={vehicle} 
  ctaVariant={CTA_VARIANT as 'default' | 'with-model'} 
/>`}
      </pre>
    </div>
  ),
};

