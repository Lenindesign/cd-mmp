import { 
  Palette, Type, Layout, Square, MousePointer, 
  ArrowRight, Check, Info, ChevronRight,
  Copy, CheckCircle
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { LoadingSpinner, LoadingSkeleton } from '../../components/LoadingSpinner';
import { ErrorState } from '../../components/ErrorState';
import './DesignSystem.css';

const DesignSystem = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colors = {
    primary: [
      { name: 'Blue Cobalt', var: '--color-blue-cobalt', hex: '#1B5F8A', usage: 'Primary accent, links, CTAs' },
      { name: 'Blue Cobalt Dark', var: '--color-blue-cobalt-dark', hex: '#154d70', usage: 'Hover states' },
      { name: 'Blue Cobalt Light', var: '--color-blue-cobalt-light', hex: '#2a7aab', usage: 'Highlights' },
    ],
    secondary: [
      { name: 'Red', var: '--color-red', hex: '#D22730', usage: 'Alerts, errors' },
      { name: 'Red Dark', var: '--color-red-dark', hex: '#b31f27', usage: 'Hover states' },
    ],
    neutrals: [
      { name: 'Black', var: '--color-black', hex: '#000000', usage: 'Primary text, headers' },
      { name: 'Dark', var: '--color-dark', hex: '#222222', usage: 'Secondary dark' },
      { name: 'Gray 900', var: '--color-gray-900', hex: '#1a1a1a', usage: 'Dark backgrounds' },
      { name: 'Gray 800', var: '--color-gray-800', hex: '#333333', usage: 'Dark UI elements' },
      { name: 'Gray 700', var: '--color-gray-700', hex: '#4a4a4a', usage: 'Secondary text dark' },
      { name: 'Gray 600', var: '--color-gray-600', hex: '#666666', usage: 'Muted text' },
      { name: 'Gray 500', var: '--color-gray-500', hex: '#888888', usage: 'Placeholder text' },
      { name: 'Gray 400', var: '--color-gray-400', hex: '#aaaaaa', usage: 'Disabled states' },
      { name: 'Gray 300', var: '--color-gray-300', hex: '#cdcdcd', usage: 'Borders' },
      { name: 'Gray 200', var: '--color-gray-200', hex: '#e5e5e5', usage: 'Light borders' },
      { name: 'Gray 100', var: '--color-gray-100', hex: '#f5f5f5', usage: 'Light backgrounds' },
      { name: 'Gray 50', var: '--color-gray-50', hex: '#fafafa', usage: 'Subtle backgrounds' },
      { name: 'White', var: '--color-white', hex: '#ffffff', usage: 'Backgrounds, text on dark' },
    ],
    semantic: [
      { name: 'Success', var: '--color-success', hex: '#2e7d32', usage: 'Success states' },
      { name: 'Warning', var: '--color-warning', hex: '#ed6c02', usage: 'Warning states' },
      { name: 'Info', var: '--color-info', hex: '#0288d1', usage: 'Informational' },
    ],
  };

  const typography = [
    { name: 'Display', var: '--font-display', value: 'Inter', usage: 'Large headings, hero titles' },
    { name: 'Heading', var: '--font-heading', value: 'Inter', usage: 'Section headings, buttons' },
    { name: 'Body', var: '--font-body', value: 'Inter', usage: 'Body text, paragraphs' },
  ];

  const fontWeights = [
    { name: 'Regular', var: '--font-weight-regular', value: '400' },
    { name: 'Medium', var: '--font-weight-medium', value: '500' },
    { name: 'Semibold', var: '--font-weight-semibold', value: '600' },
    { name: 'Bold', var: '--font-weight-bold', value: '700' },
    { name: 'Extrabold', var: '--font-weight-extrabold', value: '800' },
  ];

  const fontSizes = [
    { name: 'XS', var: '--font-size-xs', value: '0.6875rem (11px)' },
    { name: 'SM', var: '--font-size-sm', value: '0.75rem (12px)' },
    { name: 'Base', var: '--font-size-base', value: '0.875rem (14px)' },
    { name: 'MD', var: '--font-size-md', value: '1rem (16px)' },
    { name: 'LG', var: '--font-size-lg', value: '1.125rem (18px)' },
    { name: 'XL', var: '--font-size-xl', value: '1.25rem (20px)' },
    { name: '2XL', var: '--font-size-2xl', value: '1.5rem (24px)' },
    { name: '3XL', var: '--font-size-3xl', value: '2.25rem (36px)' },
    { name: '4XL', var: '--font-size-4xl', value: '3rem (48px)' },
    { name: '5XL', var: '--font-size-5xl', value: '4rem (64px)' },
  ];

  const spacing = [
    { name: 'Spacing 1', var: '--spacing-1', value: '0.25rem (4px)' },
    { name: 'Spacing 2', var: '--spacing-2', value: '0.5rem (8px)' },
    { name: 'Spacing 3', var: '--spacing-3', value: '0.75rem (12px)' },
    { name: 'Spacing 4', var: '--spacing-4', value: '1rem (16px)' },
    { name: 'Spacing 5', var: '--spacing-5', value: '1.25rem (20px)' },
    { name: 'Spacing 6', var: '--spacing-6', value: '1.5rem (24px)' },
    { name: 'Spacing 8', var: '--spacing-8', value: '2rem (32px)' },
    { name: 'Spacing 10', var: '--spacing-10', value: '2.5rem (40px)' },
    { name: 'Spacing 12', var: '--spacing-12', value: '3rem (48px)' },
    { name: 'Spacing 16', var: '--spacing-16', value: '4rem (64px)' },
  ];

  const borderRadius = [
    { name: 'SM', var: '--border-radius-sm', value: '4px' },
    { name: 'MD', var: '--border-radius-md', value: '0.25rem (4px)' },
    { name: 'LG', var: '--border-radius-lg', value: '0.5rem (8px)' },
    { name: 'XL', var: '--border-radius-xl', value: '12px' },
    { name: 'Full', var: '--border-radius-full', value: '9999px' },
  ];

  const shadows = [
    { name: 'SM', var: '--shadow-sm', value: '0 1px 2px rgba(0, 0, 0, 0.05)' },
    { name: 'MD', var: '--shadow-md', value: '0 3px 6px rgba(0, 0, 0, 0.08)' },
    { name: 'LG', var: '--shadow-lg', value: '0 8px 24px rgba(0, 0, 0, 0.12)' },
    { name: 'XL', var: '--shadow-xl', value: '0 16px 48px rgba(0, 0, 0, 0.16)' },
  ];

  return (
    <main className="design-system">
      <div className="design-system__hero">
        <div className="container">
          <h1 className="design-system__title">Car and Driver Design System</h1>
          <p className="design-system__subtitle">
            The official design system documentation for Car and Driver digital products. 
            This guide provides the foundation for building consistent, accessible, and beautiful interfaces.
          </p>
        </div>
      </div>

      <div className="container">
        <nav className="design-system__nav">
          <a href="#colors" className="design-system__nav-link">
            <Palette size={18} />
            Colors
          </a>
          <a href="#typography" className="design-system__nav-link">
            <Type size={18} />
            Typography
          </a>
          <a href="#spacing" className="design-system__nav-link">
            <Layout size={18} />
            Spacing
          </a>
          <a href="#effects" className="design-system__nav-link">
            <Square size={18} />
            Effects
          </a>
          <a href="#components" className="design-system__nav-link">
            <MousePointer size={18} />
            Components
          </a>
        </nav>

        {/* Colors Section */}
        <section id="colors" className="design-system__section">
          <div className="design-system__section-header">
            <Palette size={24} />
            <h2 className="design-system__section-title">Colors</h2>
          </div>
          <p className="design-system__section-desc">
            Our color palette is designed to be bold, accessible, and consistent across all platforms.
            Always use CSS variables instead of hardcoded hex values.
          </p>

          <h3 className="design-system__subsection-title">Primary Colors</h3>
          <div className="design-system__color-grid">
            {colors.primary.map((color) => (
              <div 
                key={color.name} 
                className="design-system__color-card"
                onClick={() => copyToClipboard(`var(${color.var})`, color.name)}
              >
                <div 
                  className="design-system__color-swatch" 
                  style={{ backgroundColor: color.hex }}
                />
                <div className="design-system__color-info">
                  <span className="design-system__color-name">{color.name}</span>
                  <code className="design-system__color-var">{color.var}</code>
                  <span className="design-system__color-hex">{color.hex}</span>
                  <span className="design-system__color-usage">{color.usage}</span>
                </div>
                <div className="design-system__color-copy">
                  {copiedColor === color.name ? <CheckCircle size={16} /> : <Copy size={16} />}
                </div>
              </div>
            ))}
          </div>

          <h3 className="design-system__subsection-title">Secondary Colors</h3>
          <div className="design-system__color-grid">
            {colors.secondary.map((color) => (
              <div 
                key={color.name} 
                className="design-system__color-card"
                onClick={() => copyToClipboard(`var(${color.var})`, color.name)}
              >
                <div 
                  className="design-system__color-swatch" 
                  style={{ backgroundColor: color.hex }}
                />
                <div className="design-system__color-info">
                  <span className="design-system__color-name">{color.name}</span>
                  <code className="design-system__color-var">{color.var}</code>
                  <span className="design-system__color-hex">{color.hex}</span>
                  <span className="design-system__color-usage">{color.usage}</span>
                </div>
                <div className="design-system__color-copy">
                  {copiedColor === color.name ? <CheckCircle size={16} /> : <Copy size={16} />}
                </div>
              </div>
            ))}
          </div>

          <h3 className="design-system__subsection-title">Neutrals</h3>
          <div className="design-system__color-grid design-system__color-grid--compact">
            {colors.neutrals.map((color) => (
              <div 
                key={color.name} 
                className="design-system__color-card design-system__color-card--compact"
                onClick={() => copyToClipboard(`var(${color.var})`, color.name)}
              >
                <div 
                  className="design-system__color-swatch design-system__color-swatch--small" 
                  style={{ backgroundColor: color.hex }}
                />
                <div className="design-system__color-info">
                  <span className="design-system__color-name">{color.name}</span>
                  <code className="design-system__color-var">{color.var}</code>
                </div>
              </div>
            ))}
          </div>

          <h3 className="design-system__subsection-title">Semantic Colors</h3>
          <div className="design-system__color-grid">
            {colors.semantic.map((color) => (
              <div 
                key={color.name} 
                className="design-system__color-card"
                onClick={() => copyToClipboard(`var(${color.var})`, color.name)}
              >
                <div 
                  className="design-system__color-swatch" 
                  style={{ backgroundColor: color.hex }}
                />
                <div className="design-system__color-info">
                  <span className="design-system__color-name">{color.name}</span>
                  <code className="design-system__color-var">{color.var}</code>
                  <span className="design-system__color-hex">{color.hex}</span>
                  <span className="design-system__color-usage">{color.usage}</span>
                </div>
                <div className="design-system__color-copy">
                  {copiedColor === color.name ? <CheckCircle size={16} /> : <Copy size={16} />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="design-system__section">
          <div className="design-system__section-header">
            <Type size={24} />
            <h2 className="design-system__section-title">Typography</h2>
          </div>
          <p className="design-system__section-desc">
            Typography is key to the Car and Driver brand identity. We use Inter as our primary typeface
            for its excellent legibility and modern aesthetic.
          </p>

          <h3 className="design-system__subsection-title">Font Families</h3>
          <div className="design-system__table-wrapper">
            <table className="design-system__table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Variable</th>
                  <th>Value</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                {typography.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td><code>{item.var}</code></td>
                    <td>{item.value}</td>
                    <td>{item.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="design-system__subsection-title">Font Weights</h3>
          <div className="design-system__weight-grid">
            {fontWeights.map((weight) => (
              <div key={weight.name} className="design-system__weight-card">
                <span 
                  className="design-system__weight-preview" 
                  style={{ fontWeight: parseInt(weight.value) }}
                >
                  Aa
                </span>
                <span className="design-system__weight-name">{weight.name}</span>
                <code className="design-system__weight-var">{weight.var}</code>
                <span className="design-system__weight-value">{weight.value}</span>
              </div>
            ))}
          </div>

          <h3 className="design-system__subsection-title">Font Sizes</h3>
          <div className="design-system__sizes-list">
            {fontSizes.map((size) => (
              <div key={size.name} className="design-system__size-item">
                <code className="design-system__size-var">{size.var}</code>
                <span className="design-system__size-value">{size.value}</span>
                <span 
                  className="design-system__size-preview"
                  style={{ fontSize: `var(${size.var})` }}
                >
                  The quick brown fox
                </span>
              </div>
            ))}
          </div>

          <h3 className="design-system__subsection-title">Type Scale Examples</h3>
          <div className="design-system__type-examples">
            <div className="design-system__type-example">
              <span className="design-system__type-label">H1 - Hero Title</span>
              <h1 style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
                2025 Kia Telluride
              </h1>
            </div>
            <div className="design-system__type-example">
              <span className="design-system__type-label">H2 - Section Title</span>
              <h2 style={{ fontSize: '36px', fontWeight: 800, lineHeight: 1.2, margin: 0 }}>
                Pricing and Which One to Buy
              </h2>
            </div>
            <div className="design-system__type-example">
              <span className="design-system__type-label">H3 - Subsection</span>
              <h3 style={{ fontSize: '24px', fontWeight: 700, lineHeight: 1.3, margin: 0 }}>
                Featured Listings Near You
              </h3>
            </div>
            <div className="design-system__type-example">
              <span className="design-system__type-label">Body - Regular</span>
              <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.5, margin: 0 }}>
                The Kia Telluride is a three-row SUV that offers spacious seating for up to eight passengers.
              </p>
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section id="spacing" className="design-system__section">
          <div className="design-system__section-header">
            <Layout size={24} />
            <h2 className="design-system__section-title">Spacing</h2>
          </div>
          <p className="design-system__section-desc">
            Consistent spacing creates visual harmony. Our spacing scale is based on a 4px unit system.
          </p>

          <div className="design-system__spacing-grid">
            {spacing.map((space) => (
              <div key={space.name} className="design-system__spacing-item">
                <div 
                  className="design-system__spacing-visual"
                  style={{ width: `var(${space.var})`, height: `var(${space.var})` }}
                />
                <div className="design-system__spacing-info">
                  <code>{space.var}</code>
                  <span>{space.value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Effects Section */}
        <section id="effects" className="design-system__section">
          <div className="design-system__section-header">
            <Square size={24} />
            <h2 className="design-system__section-title">Effects</h2>
          </div>
          <p className="design-system__section-desc">
            Border radius, shadows, and transitions add depth and polish to the interface.
          </p>

          <h3 className="design-system__subsection-title">Border Radius</h3>
          <div className="design-system__radius-grid">
            {borderRadius.map((radius) => (
              <div key={radius.name} className="design-system__radius-item">
                <div 
                  className="design-system__radius-preview"
                  style={{ borderRadius: `var(${radius.var})` }}
                />
                <code>{radius.var}</code>
                <span>{radius.value}</span>
              </div>
            ))}
          </div>

          <h3 className="design-system__subsection-title">Shadows</h3>
          <div className="design-system__shadow-grid">
            {shadows.map((shadow) => (
              <div key={shadow.name} className="design-system__shadow-item">
                <div 
                  className="design-system__shadow-preview"
                  style={{ boxShadow: `var(${shadow.var})` }}
                />
                <code>{shadow.var}</code>
                <span className="design-system__shadow-value">{shadow.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Components Section */}
        <section id="components" className="design-system__section">
          <div className="design-system__section-header">
            <MousePointer size={24} />
            <h2 className="design-system__section-title">Components</h2>
          </div>
          <p className="design-system__section-desc">
            Reusable components that follow our design system guidelines.
          </p>

          <h3 className="design-system__subsection-title">Buttons</h3>
          <p className="design-system__component-desc">
            Use the <code>&lt;Button&gt;</code> component for all interactive actions. 
            Import from <code>@/components/Button</code>.
          </p>
          
          <div className="design-system__component-showcase">
            <h4 className="design-system__variant-title">Variants</h4>
            <div className="design-system__button-group">
              <Button variant="primary" iconRight={<ArrowRight size={16} />}>
                Primary
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          <div className="design-system__component-showcase">
            <h4 className="design-system__variant-title">Sizes</h4>
            <div className="design-system__button-group">
              <Button variant="primary" size="small">Small</Button>
              <Button variant="primary" size="medium">Medium</Button>
              <Button variant="primary" size="large">Large</Button>
            </div>
          </div>

          <div className="design-system__component-showcase">
            <h4 className="design-system__variant-title">States</h4>
            <div className="design-system__button-group">
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="outline" fullWidth>Full Width</Button>
            </div>
          </div>
            
          <div className="design-system__code-block">
            <pre>{`import { Button } from '@/components/Button';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>

// With Icons
<Button iconLeft={<Icon />}>With Icon</Button>
<Button iconRight={<ArrowRight />}>Continue</Button>

// As Link
<Button as="a" href="/pricing">View Pricing</Button>`}</pre>
          </div>

          <h3 className="design-system__subsection-title">Loading States</h3>
          <p className="design-system__component-desc">
            Use loading components to indicate async operations. Import from <code>@/components/LoadingSpinner</code>.
          </p>
          
          <div className="design-system__component-showcase">
            <h4 className="design-system__variant-title">Spinners</h4>
            <div className="design-system__loading-group">
              <div className="design-system__loading-item">
                <LoadingSpinner size="small" />
                <span>Small</span>
              </div>
              <div className="design-system__loading-item">
                <LoadingSpinner size="default" />
                <span>Default</span>
              </div>
              <div className="design-system__loading-item">
                <LoadingSpinner size="large" />
                <span>Large</span>
              </div>
            </div>
          </div>

          <div className="design-system__component-showcase">
            <h4 className="design-system__variant-title">Skeletons</h4>
            <div className="design-system__skeleton-group">
              <LoadingSkeleton width="100%" height={16} />
              <LoadingSkeleton width="80%" height={16} />
              <LoadingSkeleton width="60%" height={16} />
            </div>
          </div>

          <h3 className="design-system__subsection-title">Error States</h3>
          <p className="design-system__component-desc">
            Use error states for error handling and empty states. Import from <code>@/components/ErrorState</code>.
          </p>
          
          <div className="design-system__component-showcase design-system__error-showcase">
            <div className="design-system__error-example">
              <ErrorState 
                variant="empty" 
                title="No results found"
                message="Try adjusting your search criteria."
              />
            </div>
          </div>

          <h3 className="design-system__subsection-title">Cards</h3>
          <div className="design-system__component-showcase">
            <div className="design-system__card-examples">
              <div className="design-system__example-card">
                <div className="design-system__example-card-badge">Recommended</div>
                <h4>EX Trim</h4>
                <p>Starting at $43,590</p>
                <ul>
                  <li><Check size={14} /> Leather seats</li>
                  <li><Check size={14} /> Sunroof</li>
                  <li><Check size={14} /> Premium audio</li>
                </ul>
                <button className="design-system__btn design-system__btn--primary design-system__btn--full">
                  Build This Trim
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="design-system__example-card design-system__example-card--listing">
                <div className="design-system__example-card-image">
                  <span className="design-system__example-card-deal">Great Price</span>
                </div>
                <div className="design-system__example-card-content">
                  <span className="design-system__example-card-title">2022 Telluride EX</span>
                  <span className="design-system__example-card-price">$28,618</span>
                  <span className="design-system__example-card-mileage">28,450 mi</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="design-system__subsection-title">Badges & Labels</h3>
          <div className="design-system__component-showcase">
            <div className="design-system__badge-group">
              <span className="design-system__badge design-system__badge--primary">YOUR NEXT STEP</span>
              <span className="design-system__badge design-system__badge--success">Great Price</span>
              <span className="design-system__badge design-system__badge--info">One Owner</span>
              <span className="design-system__badge design-system__badge--dark">No Accidents</span>
            </div>
          </div>

          <h3 className="design-system__subsection-title">Form Elements</h3>
          <div className="design-system__component-showcase">
            <div className="design-system__form-examples">
              <div className="design-system__form-group">
                <label>Text Input</label>
                <input type="text" placeholder="Enter your email" className="design-system__input" />
              </div>
              <div className="design-system__form-group">
                <label>Select</label>
                <select className="design-system__select">
                  <option>Select an option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="design-system__section design-system__section--guidelines">
          <div className="design-system__section-header">
            <Info size={24} />
            <h2 className="design-system__section-title">Usage Guidelines</h2>
          </div>
          
          <div className="design-system__guidelines-grid">
            <div className="design-system__guideline-card design-system__guideline-card--do">
              <h4><Check size={18} /> Do</h4>
              <ul>
                <li>Always use CSS variables for colors</li>
                <li>Use the spacing scale consistently</li>
                <li>Follow the type hierarchy</li>
                <li>Maintain sufficient color contrast</li>
                <li>Use semantic HTML elements</li>
              </ul>
            </div>
            <div className="design-system__guideline-card design-system__guideline-card--dont">
              <h4><span className="design-system__x-icon">✕</span> Don't</h4>
              <ul>
                <li>Hardcode hex color values</li>
                <li>Use arbitrary spacing values</li>
                <li>Create custom button styles</li>
                <li>Skip accessibility features</li>
                <li>Deviate from the type scale</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DesignSystem;



