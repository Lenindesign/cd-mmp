import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  // Navigation
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Home,
  Navigation,
  
  // Actions
  Search,
  Plus,
  Minus,
  Check,
  Trash2,
  Send,
  Share2,
  
  // User & Account
  User,
  Users,
  LogOut,
  Mail,
  Phone,
  
  // Content
  Bookmark,
  Heart,
  Star,
  Image,
  FileText,
  MessageSquare,
  Info,
  AlertCircle,
  
  // Vehicle & Auto
  Car,
  Gauge,
  Shield,
  Calendar,
  MapPin,
  Clock,
  Award,
  GitCompare,
  
  // Finance & Pricing
  DollarSign,
  Tag,
  Target,
  Percent,
  TrendingUp,
  TrendingDown,
  BadgeCheck,
  CheckCircle,
  XCircle,
  Handshake,
  
  // Misc
  Zap,
  Leaf,
  Compass,
  Blend,
  Lightbulb,
  List,
  Map,
  Loader2,
  Eye,
  EyeOff,
  ArrowUpRight,
} from 'lucide-react';

/**
 * # Icons
 * 
 * The project uses **Lucide React** for iconography. Lucide is a fork of Feather Icons
 * with additional icons and active maintenance.
 * 
 * ## Installation
 * ```bash
 * npm install lucide-react
 * ```
 * 
 * ## Usage
 * ```tsx
 * import { Car, Star, MapPin } from 'lucide-react';
 * 
 * <Car size={24} color="currentColor" strokeWidth={2} />
 * ```
 * 
 * ## Guidelines
 * 
 * - **Size**: Use consistent sizes (16, 18, 20, 24, 32px)
 * - **Color**: Use `currentColor` to inherit text color, or CSS variables
 * - **Stroke Width**: Default is 2, use 1.5 for lighter appearance
 * - **Accessibility**: Always provide aria-label or sr-only text for interactive icons
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
  iconGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '1rem',
  },
  iconCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: 'var(--color-gray-50, #f9f9f9)',
    borderRadius: '8px',
    border: '1px solid var(--color-gray-200, #e5e5e5)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
  },
  iconCardHover: {
    backgroundColor: 'var(--color-blue-cobalt, #2676DF)',
    color: 'white',
    borderColor: 'var(--color-blue-cobalt, #2676DF)',
  },
  iconName: {
    fontSize: '0.625rem',
    color: 'inherit',
    textAlign: 'center' as const,
    wordBreak: 'break-word' as const,
  },
  categoryTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--color-gray-700, #374151)',
    borderBottom: '1px solid var(--color-gray-200)',
    paddingBottom: '0.5rem',
  },
  previewBox: {
    padding: '2rem',
    backgroundColor: 'var(--color-gray-50, #f9f9f9)',
    borderRadius: '12px',
    border: '1px solid var(--color-gray-200, #e5e5e5)',
    marginBottom: '1rem',
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
  label: {
    fontSize: '0.75rem',
    color: 'var(--color-gray-500, #888)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
};

// Icon display component
interface IconCardProps {
  icon: React.ReactNode;
  name: string;
  onClick?: () => void;
}

const IconCard: React.FC<IconCardProps> = ({ icon, name, onClick }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      style={{
        ...styles.iconCard,
        ...(hovered ? styles.iconCardHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      title={`Click to copy: ${name}`}
    >
      {icon}
      <span style={styles.iconName}>{name}</span>
    </div>
  );
};

// Icon categories with all icons used in the project
const iconCategories = {
  navigation: {
    title: 'Navigation',
    description: 'Icons for navigation, menus, and directional actions',
    icons: [
      { name: 'ArrowLeft', component: ArrowLeft },
      { name: 'ArrowRight', component: ArrowRight },
      { name: 'ChevronDown', component: ChevronDown },
      { name: 'ChevronUp', component: ChevronUp },
      { name: 'ChevronLeft', component: ChevronLeft },
      { name: 'ChevronRight', component: ChevronRight },
      { name: 'Menu', component: Menu },
      { name: 'X', component: X },
      { name: 'ExternalLink', component: ExternalLink },
      { name: 'Home', component: Home },
      { name: 'Navigation', component: Navigation },
      { name: 'ArrowUpRight', component: ArrowUpRight },
    ],
  },
  actions: {
    title: 'Actions',
    description: 'Icons for common user actions',
    icons: [
      { name: 'Search', component: Search },
      { name: 'Plus', component: Plus },
      { name: 'Minus', component: Minus },
      { name: 'Check', component: Check },
      { name: 'Trash2', component: Trash2 },
      { name: 'Send', component: Send },
      { name: 'Share2', component: Share2 },
      { name: 'Eye', component: Eye },
      { name: 'EyeOff', component: EyeOff },
    ],
  },
  user: {
    title: 'User & Account',
    description: 'Icons for user profiles and account features',
    icons: [
      { name: 'User', component: User },
      { name: 'Users', component: Users },
      { name: 'LogOut', component: LogOut },
      { name: 'Mail', component: Mail },
      { name: 'Phone', component: Phone },
    ],
  },
  content: {
    title: 'Content & Media',
    description: 'Icons for content, favorites, and information',
    icons: [
      { name: 'Bookmark', component: Bookmark },
      { name: 'Heart', component: Heart },
      { name: 'Star', component: Star },
      { name: 'Image', component: Image },
      { name: 'FileText', component: FileText },
      { name: 'MessageSquare', component: MessageSquare },
      { name: 'Info', component: Info },
      { name: 'AlertCircle', component: AlertCircle },
      { name: 'Lightbulb', component: Lightbulb },
    ],
  },
  vehicle: {
    title: 'Vehicle & Auto',
    description: 'Icons specific to automotive features',
    icons: [
      { name: 'Car', component: Car },
      { name: 'Gauge', component: Gauge },
      { name: 'Shield', component: Shield },
      { name: 'Calendar', component: Calendar },
      { name: 'MapPin', component: MapPin },
      { name: 'Clock', component: Clock },
      { name: 'Award', component: Award },
      { name: 'GitCompare', component: GitCompare },
      { name: 'Zap', component: Zap },
      { name: 'Leaf', component: Leaf },
    ],
  },
  finance: {
    title: 'Finance & Pricing',
    description: 'Icons for pricing, deals, and financial information',
    icons: [
      { name: 'DollarSign', component: DollarSign },
      { name: 'Tag', component: Tag },
      { name: 'Target', component: Target },
      { name: 'Percent', component: Percent },
      { name: 'TrendingUp', component: TrendingUp },
      { name: 'TrendingDown', component: TrendingDown },
      { name: 'BadgeCheck', component: BadgeCheck },
      { name: 'CheckCircle', component: CheckCircle },
      { name: 'XCircle', component: XCircle },
      { name: 'Handshake', component: Handshake },
    ],
  },
  misc: {
    title: 'Miscellaneous',
    description: 'Other commonly used icons',
    icons: [
      { name: 'Compass', component: Compass },
      { name: 'Blend', component: Blend },
      { name: 'List', component: List },
      { name: 'Map', component: Map },
      { name: 'Loader2', component: Loader2 },
    ],
  },
};

const meta: Meta = {
  title: 'Foundation/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Lucide React icons used throughout the Car and Driver Marketplace.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * All icons organized by category.
 */
export const AllIcons: Story = {
  render: () => {
    const copyToClipboard = (name: string) => {
      navigator.clipboard.writeText(`<${name} size={24} />`);
    };

    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Icon Library</h2>
          <p style={styles.sectionDescription}>
            All Lucide React icons used in the application. Click an icon to copy its JSX to clipboard.
          </p>
          
          {Object.entries(iconCategories).map(([key, category]) => (
            <div key={key} style={{ marginBottom: '2rem' }}>
              <h3 style={styles.categoryTitle}>{category.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginBottom: '1rem' }}>
                {category.description}
              </p>
              <div style={styles.iconGrid}>
                {category.icons.map(({ name, component: Icon }) => (
                  <IconCard
                    key={name}
                    name={name}
                    icon={<Icon size={24} />}
                    onClick={() => copyToClipboard(name)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Icon sizes and their use cases.
 */
export const Sizes: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Icon Sizes</h2>
        <p style={styles.sectionDescription}>
          Standard icon sizes for different contexts. Use consistent sizes throughout the application.
        </p>
        
        <div style={styles.previewBox}>
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {[
              { size: 12, label: '12px', use: 'Tiny indicators' },
              { size: 14, label: '14px', use: 'Inline with small text' },
              { size: 16, label: '16px', use: 'Inline with body text' },
              { size: 18, label: '18px', use: 'Form inputs, small buttons' },
              { size: 20, label: '20px', use: 'Default, buttons' },
              { size: 24, label: '24px', use: 'Navigation, headers' },
              { size: 32, label: '32px', use: 'Feature highlights' },
              { size: 48, label: '48px', use: 'Empty states, heroes' },
            ].map(({ size, label, use }) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <Car size={size} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: '0.625rem', color: 'var(--color-gray-500)', textAlign: 'center', maxWidth: '80px' }}>{use}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Icon colors and styling options.
 */
export const Colors: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Icon Colors</h2>
        <p style={styles.sectionDescription}>
          Icons inherit color from their parent by default. Use CSS variables for consistent theming.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p style={styles.label}>Brand Colors</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={32} color="var(--color-blue-cobalt, #1B5F8A)" />
                  <span style={{ fontSize: '0.75rem' }}>Blue Cobalt</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={32} color="var(--color-red, #D2232A)" />
                  <span style={{ fontSize: '0.75rem' }}>C/D Red</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={32} color="var(--color-dark, #222)" />
                  <span style={{ fontSize: '0.75rem' }}>Dark</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Semantic Colors</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={32} color="var(--color-success, #26870D)" />
                  <span style={{ fontSize: '0.75rem' }}>Success</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={32} color="var(--color-warning, #f59e0b)" />
                  <span style={{ fontSize: '0.75rem' }}>Warning</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <XCircle size={32} color="var(--color-error, #ef4444)" />
                  <span style={{ fontSize: '0.75rem' }}>Error</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Info size={32} color="var(--color-info, #0288d1)" />
                  <span style={{ fontSize: '0.75rem' }}>Info</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Gray Scale</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { color: 'var(--color-gray-700)', label: 'Gray 700' },
                  { color: 'var(--color-gray-500)', label: 'Gray 500' },
                  { color: 'var(--color-gray-300)', label: 'Gray 300' },
                ].map(({ color, label }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <Car size={32} color={color} />
                    <span style={{ fontSize: '0.75rem' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Filled Icons</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={32} color="var(--color-warning)" />
                  <span style={{ fontSize: '0.75rem' }}>Outline</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={32} fill="var(--color-warning)" color="var(--color-warning)" />
                  <span style={{ fontSize: '0.75rem' }}>Filled</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Bookmark size={32} color="var(--color-blue-cobalt)" />
                  <span style={{ fontSize: '0.75rem' }}>Outline</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Bookmark size={32} fill="var(--color-blue-cobalt)" color="var(--color-blue-cobalt)" />
                  <span style={{ fontSize: '0.75rem' }}>Filled (Saved)</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Heart size={32} color="var(--color-red)" />
                  <span style={{ fontSize: '0.75rem' }}>Outline</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Heart size={32} fill="var(--color-red)" color="var(--color-red)" />
                  <span style={{ fontSize: '0.75rem' }}>Filled</span>
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
 * Stroke width variations.
 */
export const StrokeWidths: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Stroke Widths</h2>
        <p style={styles.sectionDescription}>
          Adjust stroke width for different visual weights. Default is 2.
        </p>
        
        <div style={styles.previewBox}>
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            {[1, 1.5, 2, 2.5, 3].map((strokeWidth) => (
              <div key={strokeWidth} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Car size={24} strokeWidth={strokeWidth} />
                  <Star size={24} strokeWidth={strokeWidth} />
                  <MapPin size={24} strokeWidth={strokeWidth} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>strokeWidth={strokeWidth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Common icon patterns used in the application.
 */
export const CommonPatterns: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Common Icon Patterns</h2>
        <p style={styles.sectionDescription}>
          How icons are commonly used throughout the application.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Button with icon */}
          <div>
            <p style={styles.label}>Buttons with Icons</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'var(--color-blue-cobalt)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}>
                  <Search size={18} />
                  Search
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'var(--color-success)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}>
                  <DollarSign size={18} />
                  Get Trade-In Value
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'transparent',
                  color: 'var(--color-blue-cobalt)',
                  border: '1px solid var(--color-blue-cobalt)',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}>
                  <GitCompare size={18} />
                  Compare
                </button>
              </div>
            </div>
          </div>
          
          {/* Icon buttons */}
          <div>
            <p style={styles.label}>Icon-Only Buttons</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--color-gray-300)',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }} aria-label="Close">
                  <X size={20} color="var(--color-gray-600)" />
                </button>
                <button style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--color-gray-300)',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }} aria-label="Save">
                  <Bookmark size={20} color="var(--color-blue-cobalt)" />
                </button>
                <button style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-gray-100)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }} aria-label="Share">
                  <Share2 size={20} color="var(--color-gray-600)" />
                </button>
                <button style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-blue-cobalt)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }} aria-label="Search">
                  <Search size={20} color="white" />
                </button>
              </div>
            </div>
          </div>
          
          {/* List items with icons */}
          <div>
            <p style={styles.label}>List Items with Icons</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '300px' }}>
                {[
                  { icon: MapPin, label: 'Miami, FL', color: 'var(--color-gray-500)' },
                  { icon: Phone, label: '(305) 555-1234', color: 'var(--color-gray-500)' },
                  { icon: Clock, label: 'Open until 8 PM', color: 'var(--color-success)' },
                  { icon: Award, label: 'Certified Dealer', color: 'var(--color-warning)' },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} color={color} />
                    <span style={{ fontSize: '0.875rem' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Status indicators */}
          <div>
            <p style={styles.label}>Status Indicators</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'var(--color-success-light)', borderRadius: '4px' }}>
                  <TrendingDown size={16} color="var(--color-success)" />
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-success)', fontWeight: 500 }}>Price Drop</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'var(--color-warning-light)', borderRadius: '4px' }}>
                  <TrendingUp size={16} color="var(--color-warning)" />
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-warning)', fontWeight: 500 }}>High Demand</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'var(--color-info-light)', borderRadius: '4px' }}>
                  <BadgeCheck size={16} color="var(--color-blue-cobalt)" />
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-blue-cobalt)', fontWeight: 500 }}>Verified</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading spinner */}
          <div>
            <p style={styles.label}>Loading Spinner</p>
            <div style={styles.previewBox}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>Loading...</span>
              </div>
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Implementation code and best practices.
 */
export const Implementation: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Implementation</h2>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>Basic Usage</h3>
        <pre style={styles.codeBlock}>
{`import { Car, Star, MapPin } from 'lucide-react';

// Basic icon
<Car size={24} />

// With color
<Star size={24} color="var(--color-warning)" />

// Filled icon
<Star size={24} fill="var(--color-warning)" color="var(--color-warning)" />

// Custom stroke width
<MapPin size={24} strokeWidth={1.5} />

// Inherit color from parent
<span style={{ color: 'var(--color-blue-cobalt)' }}>
  <Car size={24} /> {/* Will be blue */}
</span>`}
        </pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Accessibility</h3>
        <pre style={styles.codeBlock}>
{`// Icon-only buttons MUST have aria-label
<button aria-label="Close dialog">
  <X size={24} />
</button>

// Decorative icons should be hidden from screen readers
<span aria-hidden="true">
  <Star size={16} />
</span>
4.5 Stars

// Icons with meaning need accessible text
<span>
  <MapPin size={16} aria-hidden="true" />
  <span className="sr-only">Location:</span>
  Miami, FL
</span>`}
        </pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Save Icon Convention</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>
          Per project guidelines, always use Bookmark (not Heart) for save functionality:
        </p>
        <pre style={styles.codeBlock}>
{`// ✅ Correct - Use Bookmark for save
import { Bookmark } from 'lucide-react';

<Bookmark 
  size={20} 
  color="var(--color-blue-cobalt)"
  fill={isSaved ? "var(--color-blue-cobalt)" : "none"}
/>

// ❌ Incorrect - Don't use Heart for save
// Heart is reserved for "favorites" or "likes" if needed`}
        </pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Common Icon Props</h3>
        <pre style={styles.codeBlock}>
{`interface LucideIconProps {
  size?: number | string;      // Icon dimensions (default: 24)
  color?: string;              // Stroke color (default: currentColor)
  strokeWidth?: number;        // Stroke width (default: 2)
  fill?: string;               // Fill color (default: none)
  className?: string;          // CSS class
  style?: React.CSSProperties; // Inline styles
}`}
        </pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Browse All Icons</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
          Lucide has 1000+ icons. Browse the full library at{' '}
          <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue-cobalt)' }}>
            lucide.dev/icons
          </a>
        </p>
      </div>
    </div>
  ),
};

