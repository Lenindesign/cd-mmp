import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import GoogleOneTap, { getAuthUser, clearAuthUser, type GoogleUser } from './GoogleOneTap';
import { exportCDPData, clearCDPData } from '../../utils/cdpTracking';

const meta: Meta<typeof GoogleOneTap> = {
  title: 'Components/GoogleOneTap',
  component: GoogleOneTap,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Google One Tap authentication component for seamless sign-in on high-intent pages.

## Features
- Loads Google Identity Services script automatically
- Shows One Tap prompt after configurable delay (default 500ms)
- Stays visible when clicking outside (cancel_on_tap_outside: false)
- Tracks CDP events for analytics
- Stores authenticated user in localStorage (demo mode)

## Environment Setup
Add \`VITE_GOOGLE_CLIENT_ID\` to your environment variables with your Google OAuth 2.0 Client ID.

## Usage
\`\`\`tsx
import { GoogleOneTap } from './components/GoogleOneTap';
import { useGoogleOneTap } from './hooks/useGoogleOneTap';

const VehiclePage = () => {
  const { shouldShowOneTap, isAuthenticated } = useGoogleOneTap({
    pageType: 'mmp',
    vehicleInfo: { year: 2024, make: 'Honda', model: 'CR-V' }
  });

  return (
    <>
      {shouldShowOneTap && (
        <GoogleOneTap
          pageType="mmp"
          vehicleInfo={{ year: 2024, make: 'Honda', model: 'CR-V' }}
          isAuthenticated={isAuthenticated}
        />
      )}
      <VehicleDetails />
    </>
  );
};
\`\`\`

## CDP Events Tracked
- \`g1t_prompt_triggered\` - When prompt is shown
- \`g1t_prompt_dismissed\` - When prompt is dismissed
- \`user_registration\` with source \`google_one_tap\` - When user signs in
- \`high_intent_page_view\` - When user visits MMP or rankings pages
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    pageType: {
      control: 'select',
      options: ['mmp', 'rankings', 'comparison', 'pricing', 'other'],
      description: 'Page type for CDP tracking',
    },
    promptDelay: {
      control: { type: 'number', min: 0, max: 5000, step: 100 },
      description: 'Delay before showing prompt (ms)',
    },
    isAuthenticated: {
      control: 'boolean',
      description: 'Whether user is already authenticated',
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GoogleOneTap>;

// Demo wrapper component to show auth state
const DemoWrapper = ({ children, showControls = true }: { children: React.ReactNode; showControls?: boolean }) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [cdpData, setCdpData] = useState<ReturnType<typeof exportCDPData> | null>(null);

  useEffect(() => {
    // Check for existing user
    setUser(getAuthUser());
    setCdpData(exportCDPData());

    // Listen for storage changes
    const handleStorage = () => {
      setUser(getAuthUser());
      setCdpData(exportCDPData());
    };
    window.addEventListener('storage', handleStorage);
    
    // Poll for changes (for same-tab updates)
    const interval = setInterval(() => {
      setUser(getAuthUser());
      setCdpData(exportCDPData());
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const handleSignOut = () => {
    clearAuthUser();
    setUser(null);
  };

  const handleClearCDP = () => {
    clearCDPData();
    setCdpData(exportCDPData());
  };

  if (!showControls) {
    return <>{children}</>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ 
        marginBottom: '2rem', 
        padding: '1rem', 
        background: '#f5f5f5', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>
          Google One Tap Demo
        </h3>
        
        {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
          <div style={{ 
            padding: '0.75rem', 
            background: '#fff3cd', 
            border: '1px solid #ffc107',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}>
            <strong>Note:</strong> VITE_GOOGLE_CLIENT_ID is not set. 
            Add it to your .env file to enable Google One Tap.
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ 
            padding: '0.5rem 1rem', 
            background: user ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            fontSize: '0.875rem'
          }}>
            Status: {user ? `Signed in as ${user.email}` : 'Not signed in'}
          </div>
          
          {user && (
            <button
              onClick={handleSignOut}
              style={{
                padding: '0.5rem 1rem',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Sign Out
            </button>
          )}
          
          <button
            onClick={handleClearCDP}
            style={{
              padding: '0.5rem 1rem',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Clear CDP Data
          </button>
        </div>

        {user && (
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {user.picture && (
              <img 
                src={user.picture} 
                alt={user.name}
                style={{ width: 40, height: 40, borderRadius: '50%' }}
              />
            )}
            <div>
              <div style={{ fontWeight: 500 }}>{user.name}</div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>{user.email}</div>
            </div>
          </div>
        )}
      </div>

      {/* CDP Data Display */}
      {cdpData && (cdpData.events.length > 0 || cdpData.registration || cdpData.highIntentViews.length > 0) && (
        <div style={{ 
          marginBottom: '2rem', 
          padding: '1rem', 
          background: '#e8f4f8', 
          borderRadius: '8px',
          border: '1px solid #b8daff',
          fontSize: '0.875rem'
        }}>
          <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
            CDP Data (localStorage)
          </h4>
          
          {cdpData.registration && (
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Registration Source:</strong> {cdpData.registration.source}
            </div>
          )}
          
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>High-Intent Views:</strong> {cdpData.highIntentViews.length}
          </div>
          
          <div>
            <strong>Recent Events:</strong>
            <ul style={{ margin: '0.25rem 0 0 1.5rem', padding: 0 }}>
              {cdpData.events.slice(-5).map((event, i) => (
                <li key={i}>{event.event_type}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

/**
 * Default state - shows One Tap prompt for non-authenticated users.
 * Note: Requires VITE_GOOGLE_CLIENT_ID to be set in environment.
 */
export const Default: Story = {
  args: {
    pageType: 'mmp',
    vehicleInfo: {
      year: 2024,
      make: 'Honda',
      model: 'CR-V',
    },
    promptDelay: 500,
    isAuthenticated: false,
    debug: true,
  },
  render: (args) => (
    <DemoWrapper>
      <GoogleOneTap {...args} />
      <div style={{ 
        padding: '2rem', 
        background: 'white', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{ margin: '0 0 1rem 0' }}>2024 Honda CR-V</h2>
        <p style={{ color: '#666', margin: 0 }}>
          The Google One Tap prompt will appear in the top-right corner after {args.promptDelay}ms.
        </p>
      </div>
    </DemoWrapper>
  ),
};

/**
 * Already authenticated - One Tap will not show.
 */
export const Authenticated: Story = {
  args: {
    pageType: 'mmp',
    isAuthenticated: true,
  },
  render: (args) => (
    <DemoWrapper>
      <GoogleOneTap {...args} />
      <div style={{ 
        padding: '2rem', 
        background: 'white', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{ margin: '0 0 1rem 0' }}>Authenticated User</h2>
        <p style={{ color: '#666', margin: 0 }}>
          Google One Tap will not show because the user is already authenticated.
        </p>
      </div>
    </DemoWrapper>
  ),
};

/**
 * Rankings page context - tracks as high-intent rankings page view.
 */
export const RankingsPage: Story = {
  args: {
    pageType: 'rankings',
    promptDelay: 500,
    isAuthenticated: false,
    debug: true,
  },
  render: (args) => (
    <DemoWrapper>
      <GoogleOneTap {...args} />
      <div style={{ 
        padding: '2rem', 
        background: 'white', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{ margin: '0 0 1rem 0' }}>Best SUVs Rankings</h2>
        <p style={{ color: '#666', margin: 0 }}>
          This simulates the Rankings page context. CDP will track this as a high-intent page view.
        </p>
      </div>
    </DemoWrapper>
  ),
};

/**
 * Custom delay - shows prompt after 2 seconds.
 */
export const CustomDelay: Story = {
  args: {
    pageType: 'mmp',
    promptDelay: 2000,
    isAuthenticated: false,
    debug: true,
  },
  render: (args) => (
    <DemoWrapper>
      <GoogleOneTap {...args} />
      <div style={{ 
        padding: '2rem', 
        background: 'white', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{ margin: '0 0 1rem 0' }}>Custom Delay Demo</h2>
        <p style={{ color: '#666', margin: 0 }}>
          The Google One Tap prompt will appear after {args.promptDelay}ms (2 seconds).
        </p>
      </div>
    </DemoWrapper>
  ),
};

/**
 * With callbacks - demonstrates success and error handling.
 */
export const WithCallbacks: Story = {
  args: {
    pageType: 'mmp',
    vehicleInfo: {
      year: 2024,
      make: 'Toyota',
      model: 'RAV4',
    },
    promptDelay: 500,
    isAuthenticated: false,
    debug: true,
  },
  render: (args) => (
    <DemoWrapper>
      <GoogleOneTap 
        {...args}
        onSuccess={(user) => {
          console.log('Sign-in successful:', user);
          alert(`Welcome, ${user.name}!`);
        }}
        onError={(error) => {
          console.error('Sign-in error:', error);
        }}
        onDismiss={(reason) => {
          console.log('Prompt dismissed:', reason);
        }}
      />
      <div style={{ 
        padding: '2rem', 
        background: 'white', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{ margin: '0 0 1rem 0' }}>2024 Toyota RAV4</h2>
        <p style={{ color: '#666', margin: 0 }}>
          This demo has callbacks configured. Check the console for events.
        </p>
      </div>
    </DemoWrapper>
  ),
};
