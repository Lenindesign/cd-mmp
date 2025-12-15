import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '../index.css';

// Import components for patterns
import { Hero } from '../components/Hero/Hero';
import { QuickSpecs } from '../components/QuickSpecs/QuickSpecs';
import { TrimSelector } from '../components/TrimSelector/TrimSelector';
import { ForSaleNearYou } from '../components/ForSaleNearYou/ForSaleNearYou';
import { BuyingPotential } from '../components/BuyingPotential/BuyingPotential';
import { TopTenCarouselLeads } from '../components/TopTenCarouselLeads/TopTenCarouselLeads';
import { VehicleRanking } from '../components/VehicleRanking/VehicleRanking';

const meta: Meta = {
  title: 'Design System/Component Patterns',
  parameters: {
    layout: 'fullscreen',
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

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-white)',
    fontFamily: 'var(--font-body)',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: 'var(--spacing-8)',
  },
  header: {
    marginBottom: 'var(--spacing-8)',
  },
  title: {
    fontSize: 'var(--font-size-4xl)',
    fontWeight: 'var(--font-weight-bold)',
    fontFamily: 'var(--font-heading)',
    color: 'var(--color-black)',
    marginBottom: 'var(--spacing-2)',
  },
  subtitle: {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--color-gray-600)',
    lineHeight: 'var(--line-height-relaxed)',
    marginBottom: 'var(--spacing-6)',
  },
  patternSection: {
    marginBottom: 'var(--spacing-12)',
    padding: 'var(--spacing-6)',
    backgroundColor: 'var(--color-gray-100)',
    borderRadius: 'var(--border-radius-lg)',
  },
  patternTitle: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-semibold)',
    fontFamily: 'var(--font-heading)',
    color: 'var(--color-black)',
    marginBottom: 'var(--spacing-2)',
  },
  patternDescription: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-gray-600)',
    marginBottom: 'var(--spacing-4)',
    lineHeight: 'var(--line-height-relaxed)',
  },
  codeBlock: {
    backgroundColor: 'var(--color-gray-900)',
    color: 'var(--color-white)',
    padding: 'var(--spacing-4)',
    borderRadius: 'var(--border-radius-md)',
    fontFamily: 'monospace',
    fontSize: 'var(--font-size-sm)',
    overflow: 'auto',
    marginBottom: 'var(--spacing-4)',
  },
  preview: {
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--border-radius-md)',
    padding: 'var(--spacing-4)',
  },
} as const;

// Mock data
const mockVehicle = {
  id: '1',
  year: 2025,
  make: 'Toyota',
  model: 'Camry',
  trim: 'XLE',
  price: 32500,
  msrp: 35000,
  rating: 4.5,
  image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
  images: [
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
  ],
  specs: {
    mpg: '28/39',
    engine: '2.5L 4-Cylinder',
    horsepower: '203 hp',
    transmission: '8-Speed Automatic',
  },
  editorsChoice: true,
  tenBest: false,
};

const mockTrims = [
  { id: '1', name: 'LE', price: 28500, isRecommended: false },
  { id: '2', name: 'SE', price: 30500, isRecommended: false },
  { id: '3', name: 'XLE', price: 32500, isRecommended: true },
  { id: '4', name: 'XSE', price: 34500, isRecommended: false },
  { id: '5', name: 'TRD', price: 36500, isRecommended: false },
];

const mockListings = [
  { id: '1', year: 2025, make: 'Toyota', model: 'Camry', trim: 'XLE', price: 32500, mileage: 0, distance: 5, dealer: 'Toyota Downtown', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400' },
  { id: '2', year: 2024, make: 'Toyota', model: 'Camry', trim: 'SE', price: 28900, mileage: 12000, distance: 8, dealer: 'City Toyota', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400' },
];

const mockTopTen = [
  { rank: 1, year: 2025, make: 'Honda', model: 'Accord', rating: 4.8, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400', editorsChoice: true, mostPopular: true },
  { rank: 2, year: 2025, make: 'Toyota', model: 'Camry', rating: 4.7, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400', editorsChoice: true },
  { rank: 3, year: 2025, make: 'Mazda', model: 'Mazda6', rating: 4.6, image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400' },
];

export const Overview: Story = {
  name: '📚 Pattern Overview',
  render: () => (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Component Patterns</h1>
          <p style={styles.subtitle}>
            Real-world examples of how to compose Car and Driver components to build common UI patterns.
            These patterns demonstrate best practices for layout, spacing, and component composition.
          </p>
        </header>

        <div style={styles.patternSection}>
          <h2 style={styles.patternTitle}>🚗 Vehicle Detail Pattern</h2>
          <p style={styles.patternDescription}>
            The standard pattern for displaying vehicle details. Combines Hero, QuickSpecs, and TrimSelector
            to create a comprehensive vehicle overview page.
          </p>
          <div style={styles.codeBlock}>
{`<Hero vehicle={vehicle} />
<QuickSpecs specs={vehicle.specs} />
<TrimSelector trims={trims} currentTrim={vehicle.trim} />`}
          </div>
          <p style={styles.patternDescription}>
            <strong>Use when:</strong> Displaying a single vehicle with full details and trim options.
          </p>
        </div>

        <div style={styles.patternSection}>
          <h2 style={styles.patternTitle}>🏆 Rankings Pattern</h2>
          <p style={styles.patternDescription}>
            Display top-rated vehicles in a category. Uses TopTenCarouselLeads or VehicleRanking
            to showcase editor's picks and most popular vehicles.
          </p>
          <div style={styles.codeBlock}>
{`<TopTenCarouselLeads 
  vehicles={topTenVehicles}
  category="Sedans"
/>`}
          </div>
          <p style={styles.patternDescription}>
            <strong>Use when:</strong> Showing curated lists, rankings, or featured vehicles.
          </p>
        </div>

        <div style={styles.patternSection}>
          <h2 style={styles.patternTitle}>🛒 Shopping Pattern</h2>
          <p style={styles.patternDescription}>
            Help users find vehicles for sale. Combines ForSaleNearYou with BuyingPotential
            to show local inventory and purchasing options.
          </p>
          <div style={styles.codeBlock}>
{`<ForSaleNearYou 
  listings={nearbyListings}
  zipCode="10001"
/>
<BuyingPotential 
  price={vehicle.price}
  msrp={vehicle.msrp}
/>`}
          </div>
          <p style={styles.patternDescription}>
            <strong>Use when:</strong> Users are ready to purchase or want to see local inventory.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const VehicleDetailPattern: Story = {
  name: '🚗 Vehicle Detail Pattern',
  render: () => (
    <div style={styles.page}>
      <Hero vehicle={mockVehicle} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'var(--spacing-4)' }}>
        <QuickSpecs 
          specs={[
            { label: 'MPG', value: mockVehicle.specs.mpg, icon: 'gas' },
            { label: 'Engine', value: mockVehicle.specs.engine, icon: 'engine' },
            { label: 'Horsepower', value: mockVehicle.specs.horsepower, icon: 'gauge' },
            { label: 'Transmission', value: mockVehicle.specs.transmission, icon: 'gear' },
          ]}
        />
        <TrimSelector 
          trims={mockTrims}
          currentTrim={mockVehicle.trim}
          onTrimSelect={() => {}}
        />
      </div>
    </div>
  ),
};

export const RankingsPattern: Story = {
  name: '🏆 Rankings Pattern',
  render: () => (
    <div style={styles.page}>
      <TopTenCarouselLeads vehicles={mockTopTen} />
      <div style={{ height: 'var(--spacing-8)' }} />
      <VehicleRanking vehicles={mockTopTen} category="Sedans" />
    </div>
  ),
};

export const ShoppingPattern: Story = {
  name: '🛒 Shopping Pattern',
  render: () => (
    <div style={styles.page}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'var(--spacing-4)' }}>
        <ForSaleNearYou 
          listings={mockListings}
          zipCode="10001"
        />
        <div style={{ height: 'var(--spacing-8)' }} />
        <BuyingPotential 
          vehicleId={mockVehicle.id}
          year={mockVehicle.year}
          make={mockVehicle.make}
          model={mockVehicle.model}
          trim={mockVehicle.trim}
        />
      </div>
    </div>
  ),
};

