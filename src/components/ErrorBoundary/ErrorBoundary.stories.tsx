import type { Meta, StoryObj } from '@storybook/react';
import ErrorBoundary from './ErrorBoundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Atoms/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ErrorBoundary

React error boundary component that catches JavaScript errors in child components and displays a fallback UI.

---

## Purpose

Prevents the entire application from crashing when an error occurs in a component tree. Instead, it shows a user-friendly error message with recovery options.

---

## Features

| Feature | Description |
|---------|-------------|
| **Error Catching** | Catches errors in child component tree |
| **Fallback UI** | Shows user-friendly error message |
| **Recovery Actions** | Try Again, Reload Page, Go Home buttons |
| **Dev Details** | Shows stack trace in development mode |
| **Custom Fallback** | Accepts custom fallback component |

---

## Usage

Wrap components or routes that might throw errors:

\`\`\`tsx
<ErrorBoundary>
  <ComponentThatMightFail />
</ErrorBoundary>
\`\`\`

With custom fallback:

\`\`\`tsx
<ErrorBoundary fallback={<CustomErrorUI />}>
  <ComponentThatMightFail />
</ErrorBoundary>
\`\`\`

---

## Best Practices

- Wrap at route level for page-wide errors
- Wrap around third-party components
- Use custom fallbacks for specific contexts
- Log errors to monitoring service in production
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Component that throws an error
const BuggyComponent = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a simulated error for demonstration purposes');
  }
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Component Rendered Successfully</h2>
      <p>No error occurred.</p>
    </div>
  );
};

// ============================================
// DEFAULT ERROR STATE
// ============================================

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default error boundary UI when an error is caught. Shows error message with recovery options.',
      },
    },
  },
  render: () => (
    <ErrorBoundary>
      <BuggyComponent shouldThrow={true} />
    </ErrorBoundary>
  ),
};

// ============================================
// WORKING STATE
// ============================================

export const Working: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When no error occurs, children render normally.',
      },
    },
  },
  render: () => (
    <ErrorBoundary>
      <BuggyComponent shouldThrow={false} />
    </ErrorBoundary>
  ),
};

// ============================================
// CUSTOM FALLBACK
// ============================================

const CustomFallback = () => (
  <div style={{ 
    padding: '60px', 
    textAlign: 'center',
    background: 'var(--color-neutrals-7, #F4F5F6)',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  }}>
    <div style={{ fontSize: '48px' }}>🚗💨</div>
    <h2 style={{ 
      margin: 0, 
      fontFamily: 'var(--font-heading, Poppins, sans-serif)',
      fontSize: '24px',
    }}>
      Oops! Hit a speed bump
    </h2>
    <p style={{ 
      margin: 0, 
      color: 'var(--color-neutrals-4, #6E7481)',
      maxWidth: '400px',
    }}>
      We encountered an unexpected issue. Please try refreshing the page.
    </p>
    <button 
      onClick={() => window.location.reload()}
      className="cta cta--primary cta--default"
      style={{ marginTop: '8px' }}
    >
      Refresh Page
    </button>
  </div>
);

export const WithCustomFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error boundary with a custom fallback component that matches the application theme.',
      },
    },
  },
  render: () => (
    <ErrorBoundary fallback={<CustomFallback />}>
      <BuggyComponent shouldThrow={true} />
    </ErrorBoundary>
  ),
};

// ============================================
// NESTED ERROR BOUNDARIES
// ============================================

export const NestedBoundaries: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple error boundaries can be nested. Only the nearest boundary catches the error.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Section 1 (Error)</h3>
        <ErrorBoundary>
          <BuggyComponent shouldThrow={true} />
        </ErrorBoundary>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Section 2 (Working)</h3>
        <ErrorBoundary>
          <BuggyComponent shouldThrow={false} />
        </ErrorBoundary>
      </div>
    </div>
  ),
};

// ============================================
// DOCUMENTATION
// ============================================

export const Documentation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Implementation guide for using ErrorBoundary in your application.',
      },
    },
  },
  render: () => (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px' }}>ErrorBoundary Implementation Guide</h1>
      
      <section style={{ marginBottom: '32px' }}>
        <h2>Basic Usage</h2>
        <pre style={{ 
          background: '#1d1d1f', 
          color: '#f5f5f7', 
          padding: '16px', 
          borderRadius: '8px',
          overflow: 'auto',
        }}>
{`import ErrorBoundary from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicle/:slug" element={<VehiclePage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}`}
        </pre>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2>Route-Level Boundaries</h2>
        <pre style={{ 
          background: '#1d1d1f', 
          color: '#f5f5f7', 
          padding: '16px', 
          borderRadius: '8px',
          overflow: 'auto',
        }}>
{`<Routes>
  <Route 
    path="/vehicle/:slug" 
    element={
      <ErrorBoundary>
        <VehiclePage />
      </ErrorBoundary>
    } 
  />
</Routes>`}
        </pre>
      </section>

      <section>
        <h2>When to Use</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Wrap the entire app at the root level</li>
          <li>Wrap individual routes for isolated error handling</li>
          <li>Wrap third-party components that might fail</li>
          <li>Wrap data-dependent sections that could error on bad data</li>
        </ul>
      </section>
    </div>
  ),
};

