import TopTenCarouselLeads from '../../components/TopTenCarouselLeads';
import './CarouselAuditPage.css';

/** Twenty headline + filter combos for QA and layout review of TopTenCarouselLeads. */
const CAROUSEL_SECTIONS: Array<{
  title: string;
  subtitle: string;
  bodyStyle?: string;
  make?: string;
  maxPrice?: number;
}> = [
  { title: '10Best SUVs Worth the Money', subtitle: 'Top-rated utility vehicles from our testing.', bodyStyle: 'SUV' },
  { title: 'Sedans That Lead the Class', subtitle: 'Comfort, value, and driving manners in one package.', bodyStyle: 'Sedan' },
  { title: 'Trucks Built for Real Work', subtitle: 'Capability and livability for job sites and weekends.', bodyStyle: 'Truck' },
  { title: 'Coupes We’d Actually Daily', subtitle: 'Two-door picks that are more than weekend toys.', bodyStyle: 'Coupe' },
  { title: 'Convertibles for Open-Air Season', subtitle: 'Drop-top fun without giving up everyday use.', bodyStyle: 'Convertible' },
  { title: 'Wagons Worth a Second Look', subtitle: 'Cargo space and road manners without the SUV bulk.', bodyStyle: 'Wagon' },
  { title: 'Hatchbacks That Punch Above Their Weight', subtitle: 'Smart packaging and surprising refinement.', bodyStyle: 'Hatchback' },
  { title: 'Chevrolet Standouts', subtitle: 'Bowtie models that scored highest with our editors.', make: 'Chevrolet' },
  { title: 'Honda Hits Across Body Styles', subtitle: 'Reliability and resale in the models we recommend.', make: 'Honda' },
  { title: 'Toyota Picks for Families', subtitle: 'Space, safety, and long-term value in one list.', make: 'Toyota' },
  { title: 'Strong Choices Under $30,000', subtitle: 'New cars that feel more expensive than the sticker.', maxPrice: 30000 },
  { title: 'Still Great Under $40,000', subtitle: 'More features and power without luxury-tax pricing.', maxPrice: 40000 },
  { title: 'Efficiency Leaders', subtitle: 'High MPG and low running costs for commuters.', bodyStyle: 'Sedan' },
  { title: 'Snow-Ready AWD Crossovers', subtitle: 'SUVs we trust when the forecast turns ugly.', bodyStyle: 'SUV' },
  { title: 'City-Smart Small Footprints', subtitle: 'Easy to park, still useful for passengers and gear.', bodyStyle: 'Hatchback' },
  { title: 'Weekend Adventure Rigs', subtitle: 'Trail-ready trucks and SUVs that stay civilized on pavement.', bodyStyle: 'Truck' },
  { title: 'First-Car Confidence Builders', subtitle: 'Predictable handling and strong safety credentials.', bodyStyle: 'Sedan' },
  { title: 'Style-Forward Two-Doors', subtitle: 'Design-led coupes that still work as real cars.', bodyStyle: 'Coupe' },
  { title: 'Open-Road Cruisers', subtitle: 'Comfort and quiet for long highway days.', bodyStyle: 'Sedan' },
  { title: 'Wildcard Favorites from the Garage', subtitle: 'The vehicles our staff argue about—in a good way.', bodyStyle: 'SUV' },
];

const CarouselAuditPage = () => {
  return (
    <main className="carousel-audit-page">
      <div className="carousel-audit-page__container">
        <header className="carousel-audit-page__intro">
          <h1 className="carousel-audit-page__title">Top ten carousel — headline matrix</h1>
          <p className="carousel-audit-page__lede">
            Twenty instances of TopTenCarouselLeads with distinct titles and filters. Use this page for
            layout, spacing, and copy QA. Open at <code>/audit/carousels</code>.
          </p>
        </header>
        <div className="carousel-audit-page__stack">
          {CAROUSEL_SECTIONS.map((section, index) => (
            <TopTenCarouselLeads
              key={`carousel-audit-${index}`}
              title={section.title}
              subtitle={section.subtitle}
              bodyStyle={section.bodyStyle}
              make={section.make}
              maxPrice={section.maxPrice}
              inventoryType="new"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CarouselAuditPage;
