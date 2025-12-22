import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import VehiclePageApple from './VehiclePageApple';
import '../../App.css';

/**
 * # Apple-Inspired Vehicle Page
 * 
 * A reimagined vehicle detail page inspired by Apple's design philosophy
 * and human-centered design principles.
 * 
 * ## Design Philosophy
 * 
 * ### 1. **Generous Whitespace**
 * - Visual breathing room creates focus
 * - Content doesn't feel cramped or overwhelming
 * - Each section has clear separation
 * 
 * ### 2. **Typography as Design**
 * - Large, bold headlines create hierarchy
 * - SF Pro-inspired font stack for readability
 * - Careful letter-spacing and line-height
 * 
 * ### 3. **Progressive Disclosure**
 * - Show what matters first
 * - Details available on demand
 * - Reduces cognitive load
 * 
 * ### 4. **Natural Animations**
 * - Smooth, subtle transitions
 * - Animations that feel physical
 * - No jarring movements
 * 
 * ### 5. **Human-Centered**
 * - Clear call-to-actions
 * - Emotional connection through imagery
 * - Accessibility-first approach
 * 
 * ## Key Sections
 * 
 * 1. **Hero** - Immersive introduction with large imagery and key info
 * 2. **Highlights** - Quick-scan stats with icons
 * 3. **Gallery** - Visual storytelling with hover effects
 * 4. **Features** - Progressive disclosure of capabilities
 * 5. **Pricing** - Clear, transparent pricing cards
 * 6. **Compare** - Side-by-side comparison table
 * 7. **CTA** - Clear next step with dealer finder
 */
const meta: Meta<typeof VehiclePageApple> = {
  title: 'Pages/VehiclePage/Apple Design',
  component: VehiclePageApple,
  parameters: {
    layout: 'fullscreen',
    router: { skip: true },
    docs: {
      description: {
        component: `
An Apple-inspired vehicle page that reimagines the car shopping experience 
with human-centered design principles.

**Design Principles Applied:**
- Generous whitespace for visual breathing room
- Typography as the primary design element
- Progressive disclosure - show what matters, hide complexity
- Smooth, natural animations
- Minimal chrome, maximum content
- Accessibility-first approach

**Color Palette:**
Uses the existing Car & Driver design tokens but applies them in an Apple-inspired way:
- Primary text: #1d1d1f (near black)
- Secondary text: #6e6e73 (gray)
- Accent: var(--color-blue-cobalt)
- Backgrounds: White and #f5f5f7 (Apple gray)
        `,
      },
    },
    backgrounds: {
      default: 'white',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to create stories with different vehicles
const createAppleStory = (year: string, make: string, model: string): Story => ({
  decorators: [
    (Story) => (
      <AuthProvider>
        <MemoryRouter initialEntries={[`/${year}/${make}/${model}`]}>
          <Routes>
            <Route path="/:year/:make/:model" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    ),
  ],
});

/**
 * The default view showcasing a popular sedan.
 * Notice the generous whitespace and clear visual hierarchy.
 */
export const ToyotaCamry: Story = createAppleStory('2025', 'Toyota', 'Camry');

/**
 * A luxury SUV demonstrates how the design scales to premium vehicles.
 * The emotional connection is enhanced through large imagery.
 */
export const BMWX5: Story = createAppleStory('2025', 'BMW', 'X5');

/**
 * An electric vehicle showcases the modern, forward-thinking design.
 * Perfect alignment with Apple's tech-forward aesthetic.
 */
export const TeslaModel3: Story = createAppleStory('2025', 'Tesla', 'Model 3');

/**
 * A sports car demonstrates how the design handles performance vehicles.
 * The bold typography emphasizes the exciting nature of the car.
 */
export const ChevroletCorvette: Story = createAppleStory('2025', 'Chevrolet', 'Corvette');

/**
 * A compact SUV shows the design works for everyday vehicles too.
 * Human-centered design makes even practical cars feel special.
 */
export const HondaCRV: Story = createAppleStory('2026', 'Honda', 'CR-V');

/**
 * A truck demonstrates versatility of the Apple-inspired layout.
 * The design adapts to different vehicle types while maintaining consistency.
 */
export const FordF150: Story = createAppleStory('2025', 'Ford', 'F-150');

/**
 * An affordable compact car shows the design elevates any vehicle.
 * Good design shouldn't be reserved for luxury brands.
 */
export const ChevroletTrax: Story = createAppleStory('2025', 'Chevrolet', 'Trax');

/**
 * Error state when vehicle is not found.
 * Even error states are designed with care and provide clear next steps.
 */
export const NotFound: Story = createAppleStory('2024', 'InvalidMake', 'InvalidModel');

