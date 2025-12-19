import type { Meta, StoryObj } from '@storybook/react';
import '../index.css';

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
    docs: {
      description: {
        component: 'Welcome to the Car and Driver Design System documentation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Welcome: Story = {
  name: 'Design System',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  render: () => (
    <>
      <style>
        {`
          .docs-container {
            max-width: 720px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
            color: #1d1d1f;
            -webkit-font-smoothing: antialiased;
            padding: 0 24px;
          }
          
          .docs-header {
            padding: 80px 0 64px;
            border-bottom: 1px solid #d2d2d7;
            margin-bottom: 64px;
          }
          
          .docs-eyebrow {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #86868b;
            margin-bottom: 16px;
          }
          
          .docs-header h1 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 48px;
            font-weight: 600;
            letter-spacing: -0.02em;
            line-height: 1.1;
            margin: 0 0 24px 0;
            color: #1d1d1f;
          }
          
          .docs-header p {
            font-size: 21px;
            font-weight: 400;
            line-height: 1.5;
            color: #424245;
            margin: 0;
            max-width: 560px;
          }
          
          .docs-section {
            margin-bottom: 80px;
          }
          
          .docs-section-title {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.015em;
            color: #1d1d1f;
            margin: 0 0 12px 0;
          }
          
          .docs-section-subtitle {
            font-size: 17px;
            color: #86868b;
            margin: 0 0 40px 0;
            line-height: 1.5;
          }
          
          .docs-card-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          
          @media (max-width: 600px) {
            .docs-card-grid {
              grid-template-columns: 1fr;
            }
          }
          
          .docs-card {
            background: #f5f5f7;
            padding: 32px;
            text-decoration: none;
            color: inherit;
            display: block;
            transition: background 0.2s ease;
          }
          
          .docs-card:hover {
            background: #e8e8ed;
          }
          
          .docs-card h3 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 19px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #1d1d1f;
          }
          
          .docs-card p {
            font-size: 14px;
            color: #86868b;
            margin: 0;
            line-height: 1.5;
          }
          
          .docs-principles {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1px;
            background: #d2d2d7;
            border: 1px solid #d2d2d7;
          }
          
          @media (max-width: 600px) {
            .docs-principles {
              grid-template-columns: 1fr;
            }
          }
          
          .docs-principle {
            padding: 32px;
            background: #fff;
          }
          
          .docs-principle h4 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 17px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #1d1d1f;
          }
          
          .docs-principle p {
            font-size: 14px;
            color: #86868b;
            margin: 0;
            line-height: 1.5;
          }
          
          .docs-token-row {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px 0;
            border-bottom: 1px solid #e8e8ed;
          }
          
          .docs-color-swatch {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            flex-shrink: 0;
            border: 1px solid #e8e8ed;
          }
          
          .docs-token-name {
            font-size: 14px;
            font-weight: 500;
            color: #1d1d1f;
          }
          
          .docs-token-value {
            font-size: 13px;
            color: #86868b;
            font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          }
          
          .docs-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .docs-list li {
            font-size: 14px;
            color: #424245;
            padding: 8px 0;
            border-bottom: 1px solid #f5f5f7;
          }
          
          .docs-footer {
            padding: 48px 0;
            border-top: 1px solid #e8e8ed;
            text-align: center;
            color: #86868b;
            font-size: 12px;
            letter-spacing: 0.01em;
          }
        `}
      </style>
      <div className="docs-container">
        <div className="docs-header">
          <div className="docs-eyebrow">Design System v1.0</div>
          
          {/* Car and Driver Logo */}
          <svg viewBox="0 0 1364 263" style={{ width: '400px', height: 'auto', marginBottom: '32px' }} xmlns="http://www.w3.org/2000/svg">
            <path fill="#1d1d1f" d="M76.91 198.564c0 7.861-2.052 13.33-8.888 13.33-7.176 0-9.57-4.787-9.57-13.33V62.862c0-8.887 2.05-12.647 9.23-12.647 7.176 0 9.228 4.445 9.228 12.647v39.308h55.716V60.466c0-33.495-15.038-59.473-60.158-59.473H62.213C16.408.993 0 29.705 0 66.282v129.207c0 38.966 15.04 67.334 62.554 67.334h9.914c44.435 0 60.158-30.42 60.158-62.554v-52.635H76.91zm140.72 60.158h54.694l-35.55-254.31h-69.39l-32.473 254.31h48.88l3.76-37.259h25.979zM200.54 93.968l7.862 77.248H192.68zm134.126-45.806h8.205c7.52 0 9.229 3.076 9.229 11.966v34.178c0 8.89-3.079 12.31-10.255 12.31h-7.18zm0 106.308h7.861c7.52 0 9.573 3.76 9.573 12.304v73.835c0 9.228 2.049 15.038 4.442 18.113h55.716v-1.708c-1.708-3.42-3.416-8.89-3.416-18.46V154.47c0-19.146-12.648-29.397-22.218-33.158 9.91-4.445 22.218-15.04 22.218-38.625V49.186c0-30.077-17.09-44.774-42.045-44.774h-88.53v254.31h56.399zm281.008 104.252h81.008c33.157 0 50.592-18.801 50.592-58.453V60.466c0-40.671-19.484-56.054-50.933-56.054h-80.667zm55.715-207.14h8.544c7.52 0 9.914 4.445 9.914 14.7v128.18c0 10.596-2.393 15.383-10.596 15.383h-7.862zm141.918-3.42h8.203c7.52 0 9.228 3.076 9.228 11.966v34.178c0 8.89-3.075 12.31-10.255 12.31h-7.176zm0 106.308h7.862c7.52 0 9.57 3.76 9.57 12.304v73.835c0 9.228 2.051 15.038 4.444 18.113H890.9v-1.708c-1.708-3.42-3.419-8.89-3.419-18.46V154.47c0-19.146-12.648-29.397-22.217-33.158 9.913-4.445 22.217-15.04 22.217-38.625V49.186c0-30.077-17.087-44.774-42.042-44.774h-88.532v254.31h56.401zm86.785 104.255h56.4V4.412h-56.4zm99.227-.003h73.832l34.186-254.31h-54.349l-15.385 159.286-15.382-159.286h-59.473zm114.267-254.31v254.31h107.674v-53.664h-51.958V154.47h39.996v-54.008h-39.996V57.05h49.906V4.412zm171.868 43.75h8.2c7.52 0 9.228 3.076 9.228 11.966v34.178c0 8.89-3.075 12.31-10.255 12.31h-7.173zm0 106.308h7.859c7.52 0 9.57 3.76 9.57 12.304v73.835c0 9.228 2.051 15.038 4.444 18.113h55.716v-1.708c-1.708-3.42-3.419-8.89-3.419-18.46V154.47c0-19.146-12.645-29.397-22.217-33.158 9.913-4.445 22.217-15.04 22.217-38.625V49.186c0-30.077-17.087-44.774-42.042-44.774h-88.532v254.31h56.404zm-823.856 29.195h19.441L468.018 78.982h-25.422L430.7 183.665h17.907l1.38-15.34h10.11zm-6.856-70.79 3.476 35.957h-6.354zm32.232-33.893v104.683h17.907V129.07l12.271 54.594h18.158V78.982h-17.658v50.651l-10.644-50.651zm57.382 104.683h29.679c12.145 0 18.532-7.742 18.532-24.063V102.06c0-16.743-7.138-23.08-18.658-23.08h-29.553zm19.819-85.263h3.724c2.755 0 3.632 1.825 3.632 6.05v52.76c0 4.36-.877 6.33-3.883 6.33h-3.473z"/>
            <path d="M428.499 64.016h166.27V4.609H428.5z" fill="#d2232a"/>
            <path d="M428.499 258.039h166.27v-59.402H428.5z" fill="#0061af"/>
          </svg>
          
          <p>
            A component library for the automotive marketplace. 
            Designed for clarity. Built for scale.
          </p>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Getting Started</h2>
          <p className="docs-section-subtitle">
            Explore components, tokens, and patterns.
          </p>
          
          <div className="docs-card-grid">
            <a href="?path=/docs/atoms-button--docs" className="docs-card">
              <h3>Components</h3>
              <p>Browse the complete library of UI components</p>
            </a>
            
            <a href="?path=/story/tokens-colors--all-colors" className="docs-card">
              <h3>Colors</h3>
              <p>Color palette and semantic tokens</p>
            </a>
            
            <a href="?path=/story/tokens-typography--all-styles" className="docs-card">
              <h3>Typography</h3>
              <p>Type scale and font weights</p>
            </a>
            
            <a href="?path=/story/tokens-spacing--all-spacing" className="docs-card">
              <h3>Spacing</h3>
              <p>Consistent spatial system</p>
            </a>
          </div>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Color Palette</h2>
          <p className="docs-section-subtitle">
            Primary and secondary brand colors.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            <div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{ backgroundColor: '#222222' }} />
                <div style={{ flex: 1 }}>
                  <div className="docs-token-name">Dark Grey</div>
                  <div className="docs-token-value">--color-dark-grey</div>
                </div>
              </div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{ backgroundColor: '#1B5F8A' }} />
                <div style={{ flex: 1 }}>
                  <div className="docs-token-name">Dark Blue</div>
                  <div className="docs-token-value">--color-dark-blue</div>
                </div>
              </div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{ backgroundColor: '#DBCA8B' }} />
                <div style={{ flex: 1 }}>
                  <div className="docs-token-name">Gold</div>
                  <div className="docs-token-value">--color-gold</div>
                </div>
              </div>
            </div>
            <div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{ backgroundColor: '#D2232A' }} />
                <div style={{ flex: 1 }}>
                  <div className="docs-token-name">Red</div>
                  <div className="docs-token-value">--color-red</div>
                </div>
              </div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{ backgroundColor: '#26870D' }} />
                <div style={{ flex: 1 }}>
                  <div className="docs-token-name">Green</div>
                  <div className="docs-token-value">--color-green</div>
                </div>
              </div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{ backgroundColor: '#F5F5F5', border: '1px solid #d2d2d7' }} />
                <div style={{ flex: 1 }}>
                  <div className="docs-token-name">Light Grey</div>
                  <div className="docs-token-value">--color-light-grey</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Components</h2>
          <p className="docs-section-subtitle">
            Organized by atomic design principles.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', marginBottom: '16px' }}>Atoms</h4>
              <ul className="docs-list">
                <li>Button</li>
                <li>TextField</li>
                <li>Toast</li>
                <li>Spinner</li>
                <li>Image</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', marginBottom: '16px' }}>Molecules</h4>
              <ul className="docs-list">
                <li>QuickSpecs</li>
                <li>Incentives</li>
                <li>TrimSelector</li>
                <li>MarketSpeed</li>
                <li>Warranty</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', marginBottom: '16px' }}>Organisms</h4>
              <ul className="docs-list">
                <li>Header</li>
                <li>Footer</li>
                <li>Hero</li>
                <li>Comparison</li>
                <li>VehicleRanking</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Design Principles</h2>
          <p className="docs-section-subtitle">
            The core values that guide every design decision.
          </p>
          
          <div className="docs-principles">
            <div className="docs-principle">
              <h4>Clarity</h4>
              <p>Content-first design that reduces cognitive load</p>
            </div>
            <div className="docs-principle">
              <h4>Consistency</h4>
              <p>Predictable patterns across all touchpoints</p>
            </div>
            <div className="docs-principle">
              <h4>Accessibility</h4>
              <p>WCAG AA compliant with 4.5:1 contrast</p>
            </div>
            <div className="docs-principle">
              <h4>Performance</h4>
              <p>Optimized for speed and efficiency</p>
            </div>
          </div>
        </div>

        <footer className="docs-footer">
          <p>Car and Driver Design System</p>
        </footer>
      </div>
    </>
  ),
};
