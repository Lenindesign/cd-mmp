import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '../index.css';

const meta: Meta = {
  title: 'My Patterns/Pattern Name',
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      disableSnapshot: true,
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Overview',
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
          
          .docs-list {
            list-style: none;
            padding: 0;
            margin: 0 0 48px 0;
          }
          
          .docs-list li {
            font-size: 15px;
            color: #424245;
            padding: 12px 0;
            border-bottom: 1px solid #e8e8ed;
            line-height: 1.5;
          }
          
          .docs-list li strong {
            font-weight: 600;
            color: #1d1d1f;
          }
          
          .docs-code-block {
            background: #1d1d1f;
            padding: 24px;
            margin-bottom: 48px;
            overflow: hidden;
          }
          
          .docs-code-content {
            font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
            font-size: 13px;
            line-height: 1.7;
            color: #f5f5f7;
            margin: 0;
            overflow-x: auto;
          }
          
          .docs-paragraph {
            font-size: 15px;
            color: #424245;
            line-height: 1.6;
          }
          
          .docs-preview {
            background: #f5f5f7;
            padding: 48px;
            margin-top: 48px;
          }
          
          .docs-preview-placeholder {
            background: #ffffff;
            border: 1px solid #e8e8ed;
            padding: 48px;
            text-align: center;
            color: #86868b;
            font-size: 14px;
          }
        `}
      </style>
      <div className="docs-container">
        <div className="docs-header">
          <div className="docs-eyebrow">Pattern Template</div>
          <h1>Pattern Name</h1>
          <p>
            Brief description of what this pattern does and when to use it.
          </p>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Components Used</h2>
          <ul className="docs-list">
            <li>
              <strong>ComponentA</strong> - What it does
            </li>
            <li>
              <strong>ComponentB</strong> - What it does
            </li>
          </ul>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Code Example</h2>
          <pre className="docs-code-block">
            <code className="docs-code-content">
{`<ComponentA />
<ComponentB />`}
            </code>
          </pre>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">When to Use</h2>
          <p className="docs-paragraph">
            Explain the use case for this pattern.
          </p>
        </div>
      </div>
    </>
  ),
};

export const Default: Story = {
  name: 'Default',
  render: () => (
    <>
      <style>
        {`
          .docs-container {
            max-width: 960px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
            padding: 48px 24px;
          }
          
          .docs-preview {
            background: #f5f5f7;
            padding: 48px;
          }
          
          .docs-preview-placeholder {
            background: #ffffff;
            border: 1px solid #e8e8ed;
            padding: 48px;
            text-align: center;
            color: #86868b;
            font-size: 14px;
          }
        `}
      </style>
      <div className="docs-container">
        <div className="docs-preview">
          <div className="docs-preview-placeholder">
            Replace this with your actual components
          </div>
        </div>
      </div>
    </>
  ),
};

export const Variation1: Story = {
  name: 'Variation 1',
  render: () => (
    <>
      <style>
        {`
          .docs-container {
            max-width: 960px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
            padding: 48px 24px;
          }
          
          .docs-preview {
            background: #f5f5f7;
            padding: 48px;
          }
          
          .docs-preview-placeholder {
            background: #ffffff;
            border: 1px solid #e8e8ed;
            padding: 48px;
            text-align: center;
            color: #86868b;
            font-size: 14px;
          }
        `}
      </style>
      <div className="docs-container">
        <div className="docs-preview">
          <div className="docs-preview-placeholder">
            Show a variation of your pattern
          </div>
        </div>
      </div>
    </>
  ),
};

export const Mobile: Story = {
  name: 'Mobile',
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  render: () => (
    <>
      <style>
        {`
          .docs-container {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
            padding: 24px;
          }
          
          .docs-preview {
            background: #f5f5f7;
            padding: 24px;
          }
          
          .docs-preview-placeholder {
            background: #ffffff;
            border: 1px solid #e8e8ed;
            padding: 24px;
            text-align: center;
            color: #86868b;
            font-size: 14px;
          }
        `}
      </style>
      <div className="docs-container">
        <div className="docs-preview">
          <div className="docs-preview-placeholder">
            Mobile-optimized version
          </div>
        </div>
      </div>
    </>
  ),
};
