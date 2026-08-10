import { CheckCircle2 } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import './MarketSnapshotConceptsPage.css';

type SignalTone = 'trust' | 'value' | 'condition' | 'timing' | 'convenience';

interface Signal {
  label: string;
  tone: SignalTone;
}

interface VehicleOption {
  name: string;
  trim: string;
  price: string;
  mileage: string;
  dealer: string;
  distance: string;
  daysOnLot: string;
  summary: string;
  signals: Signal[];
  score?: string;
}

interface Concept {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  strategy: string;
  metrics: { label: string; value: string; detail: string }[];
  leadVehicle: VehicleOption;
  secondaryVehicles: VehicleOption[];
  layout: 'baseline' | 'new' | 'recommended' | 'history' | 'value';
}

const vehicleImage = 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg';

const signalLibrary: { tone: SignalTone; label: string; examples: string[] }[] = [
  {
    tone: 'trust',
    label: 'Trust',
    examples: ['No accidents', 'One owner', 'Clean title', 'Free VHR', 'Certified used'],
  },
  {
    tone: 'value',
    label: 'Value',
    examples: ['Great price', 'Good price', 'Recent price drop', 'Below local average'],
  },
  {
    tone: 'condition',
    label: 'Use and Condition',
    examples: ['Low mileage', 'Below avg mileage', 'Personal use', 'Service history'],
  },
  {
    tone: 'timing',
    label: 'Market Timing',
    examples: ['Newly listed', 'Aging inventory', 'High days on lot', 'Selling quickly'],
  },
  {
    tone: 'convenience',
    label: 'Convenience',
    examples: ['Nearby', 'Highly rated dealer', 'Available today'],
  },
];

const usedMetrics = [
  { label: 'Available Near You', value: '25', detail: '40 2024 - 2026 models available' },
  { label: 'Local Price Range', value: '$14,000 - $32,000', detail: '$24,000 average asking price' },
  { label: 'Mileage Range', value: '43,000 - 104,000', detail: '68,000 average mileage near you' },
  { label: 'Average Days on Market', value: '32', detail: 'Buyer advantage when inventory sits longer' },
];

const newMetrics = [
  { label: 'Available Near You', value: '18', detail: '12 certified used models available nearby' },
  { label: 'Local Price Range', value: '$34,000 - $42,999', detail: 'Prices vary by trim and packages' },
  { label: 'Average Days on Market', value: '32', detail: 'Selling quickly compared to most new vehicles' },
  { label: 'Chevrolet Finance Specials', value: '3.99% - 5.99%', detail: 'Expires 9/8/26' },
];

const inventory: VehicleOption[] = [
  {
    name: '2025 Chevrolet Trax',
    trim: 'LT',
    price: '$22,400',
    mileage: '43,200 mi',
    dealer: 'Simpson Chevrolet',
    distance: '18.4 mi',
    daysOnLot: '32 days',
    score: '91',
    summary: 'Best balance of clean history, mileage, and price.',
    signals: [
      { label: 'No accidents', tone: 'trust' },
      { label: 'Below avg mileage', tone: 'condition' },
      { label: 'Good price', tone: 'value' },
    ],
  },
  {
    name: '2025 Chevrolet Trax',
    trim: '1RS',
    price: '$21,850',
    mileage: '58,900 mi',
    dealer: 'Harbor Chevrolet',
    distance: '12.7 mi',
    daysOnLot: '45 days',
    score: '86',
    summary: 'Strong value with extra negotiation room.',
    signals: [
      { label: 'Recent price drop', tone: 'value' },
      { label: 'No accidents', tone: 'trust' },
      { label: 'High days on lot', tone: 'timing' },
    ],
  },
  {
    name: '2025 Chevrolet Trax',
    trim: 'ACTIV',
    price: '$24,100',
    mileage: '49,600 mi',
    dealer: 'Brickell Chevrolet',
    distance: '7.8 mi',
    daysOnLot: '9 days',
    score: '84',
    summary: 'Clean and close, with newer listing timing.',
    signals: [
      { label: 'One owner', tone: 'trust' },
      { label: 'Free VHR', tone: 'trust' },
      { label: 'Newly listed', tone: 'timing' },
    ],
  },
];

const concepts: Concept[] = [
  {
    id: 'used-baseline',
    label: 'Version 1',
    eyebrow: 'Used Car',
    title: 'Current Used Snapshot',
    description: 'Keeps the market card structure and places three inventory cards below it.',
    strategy: 'Best when the PM wants continuity with the current page, but it still feels more like analysis than guidance.',
    metrics: usedMetrics,
    leadVehicle: inventory[0],
    secondaryVehicles: inventory.slice(1),
    layout: 'baseline',
  },
  {
    id: 'new-car-contrast',
    label: 'Version 2',
    eyebrow: 'New Car',
    title: 'New Market Contrast',
    description: 'Shows how the same system changes for new cars, where incentives and availability matter more than history.',
    strategy: 'Useful as a control version so Product can compare new-car signals against used-car trust signals.',
    metrics: newMetrics,
    leadVehicle: {
      ...inventory[0],
      name: '2026 Chevrolet Trax',
      trim: 'LS',
      price: '$20,762',
      mileage: 'New',
      daysOnLot: '12 days',
      summary: 'Best entry price with local availability and finance support.',
      signals: [
        { label: 'Good price', tone: 'value' },
        { label: 'Newly listed', tone: 'timing' },
        { label: 'Finance special', tone: 'value' },
      ],
    },
    secondaryVehicles: [
      {
        ...inventory[1],
        name: '2026 Chevrolet Trax',
        trim: 'LT',
        price: '$23,995',
        mileage: 'New',
        signals: [
          { label: 'Dealer cash', tone: 'value' },
          { label: 'Available today', tone: 'convenience' },
        ],
      },
      {
        ...inventory[2],
        name: '2026 Chevrolet Trax',
        trim: '2RS',
        price: '$27,400',
        mileage: 'New',
        signals: [
          { label: 'High days on lot', tone: 'timing' },
          { label: 'Nearby', tone: 'convenience' },
        ],
      },
    ],
    layout: 'new',
  },
  {
    id: 'best-value-low-risk',
    label: 'Version 3',
    eyebrow: 'Used Car',
    title: 'Best Value, Lowest Risk',
    description: 'Recommends one best vehicle first, then shows the next best two matches.',
    strategy: 'My recommended direction. It answers the shopper question first and uses market signals as proof.',
    metrics: usedMetrics,
    leadVehicle: inventory[0],
    secondaryVehicles: inventory.slice(1),
    layout: 'recommended',
  },
  {
    id: 'clean-history-priority',
    label: 'Version 4',
    eyebrow: 'Used Car',
    title: 'Clean History Priority',
    description: 'Ranks history quality first, then mileage and price.',
    strategy: 'Best for cautious shoppers. It makes trust feel more important than the lowest advertised price.',
    metrics: usedMetrics,
    leadVehicle: {
      ...inventory[2],
      summary: 'Cleanest history profile with one owner and free vehicle history report.',
      signals: [
        { label: 'One owner', tone: 'trust' },
        { label: 'Free VHR', tone: 'trust' },
        { label: 'No accidents', tone: 'trust' },
      ],
    },
    secondaryVehicles: [inventory[0], inventory[1]],
    layout: 'history',
  },
  {
    id: 'value-hunter',
    label: 'Version 5',
    eyebrow: 'Used Car',
    title: 'Value Hunter',
    description: 'Ranks savings and negotiation leverage first, then uses history signals as checks.',
    strategy: 'Best for shoppers who want a deal, but it needs careful signal limits so it does not become dealer-lot noisy.',
    metrics: usedMetrics,
    leadVehicle: {
      ...inventory[1],
      summary: 'Lowest price with a recent drop and longer days on lot.',
      signals: [
        { label: 'Recent price drop', tone: 'value' },
        { label: 'High days on lot', tone: 'timing' },
        { label: 'No accidents', tone: 'trust' },
      ],
    },
    secondaryVehicles: [inventory[0], inventory[2]],
    layout: 'value',
  },
];

const badgeVariantByTone: Record<SignalTone, 'primary' | 'success' | 'dark' | 'neutral'> = {
  trust: 'success',
  value: 'primary',
  condition: 'dark',
  timing: 'neutral',
  convenience: 'neutral',
};

const SignalBadge = ({ signal }: { signal: Signal }) => (
  <Badge variant={badgeVariantByTone[signal.tone]} className="snapshot-concepts__signal">
    {signal.label}
  </Badge>
);

const MetricGrid = ({ metrics }: { metrics: Concept['metrics'] }) => (
  <div className="snapshot-concepts__metrics" aria-label="Market summary">
    {metrics.map((metric) => (
      <article key={metric.label} className="snapshot-concepts__metric">
        <span>{metric.label}</span>
        <strong>{metric.value}</strong>
        <p>{metric.detail}</p>
      </article>
    ))}
  </div>
);

const VehicleCard = ({
  vehicle,
  featured = false,
}: {
  vehicle: VehicleOption;
  featured?: boolean;
}) => (
  <article className={`snapshot-concepts__vehicle ${featured ? 'snapshot-concepts__vehicle--featured' : ''}`}>
    <div className="snapshot-concepts__vehicle-media">
      <img src={vehicleImage} alt={`${vehicle.name} ${vehicle.trim}`} />
      {featured && (
        <Badge variant="dark" className="snapshot-concepts__pick-badge">
          Best Match
        </Badge>
      )}
    </div>
    <div className="snapshot-concepts__vehicle-body">
      <div className="snapshot-concepts__vehicle-topline">
        <span>{vehicle.score ? `${vehicle.score} match score` : 'Local match'}</span>
        <strong>{vehicle.price}</strong>
      </div>
      <h3>{vehicle.name} {vehicle.trim}</h3>
      <p>{vehicle.summary}</p>
      <dl className="snapshot-concepts__vehicle-facts">
        <div>
          <dt>Mileage</dt>
          <dd>{vehicle.mileage}</dd>
        </div>
        <div>
          <dt>Dealer</dt>
          <dd>{vehicle.dealer}</dd>
        </div>
        <div>
          <dt>Distance</dt>
          <dd>{vehicle.distance}</dd>
        </div>
        <div>
          <dt>Days on lot</dt>
          <dd>{vehicle.daysOnLot}</dd>
        </div>
      </dl>
      <div className="snapshot-concepts__signals" aria-label="Top vehicle signals">
        {vehicle.signals.slice(0, featured ? 3 : 2).map((signal) => (
          <SignalBadge key={`${vehicle.name}-${vehicle.trim}-${signal.label}`} signal={signal} />
        ))}
      </div>
      <Button as="a" href="https://www.caranddriver.com/cars-for-sale/used?year=2025&make=Chevrolet&model=Trax" variant={featured ? 'primary' : 'outline'} size="small">
        View Listing
      </Button>
    </div>
  </article>
);

const ConceptModule = ({ concept }: { concept: Concept }) => (
  <section id={concept.id} className={`snapshot-concepts__module snapshot-concepts__module--${concept.layout}`} aria-labelledby={`${concept.id}-title`}>
    <div className="snapshot-concepts__module-head">
      <div>
        <p className="snapshot-concepts__version">{concept.label} / {concept.eyebrow}</p>
        <h2 id={`${concept.id}-title`}>{concept.title}</h2>
        <p>{concept.description}</p>
      </div>
      <div className="snapshot-concepts__strategy">
        <span>{concept.strategy}</span>
      </div>
    </div>

    <MetricGrid metrics={concept.metrics} />

    <div className="snapshot-concepts__recommendation">
      <div className="snapshot-concepts__recommendation-copy">
        <p className="snapshot-concepts__section-label">Recommended first</p>
        <h3>{concept.leadVehicle.summary}</h3>
        <p>Show one lead recommendation with only the strongest signals. Keep the next two vehicles available for comparison.</p>
      </div>
      <VehicleCard vehicle={concept.leadVehicle} featured />
    </div>

    <div className="snapshot-concepts__next">
      <div className="snapshot-concepts__next-head">
        <p className="snapshot-concepts__section-label">Next best matches</p>
        <span>Limited to two signals each so the cards do not compete with each other.</span>
      </div>
      <div className="snapshot-concepts__next-grid">
        {concept.secondaryVehicles.map((vehicle) => (
          <VehicleCard key={`${concept.id}-${vehicle.trim}-${vehicle.price}`} vehicle={vehicle} />
        ))}
      </div>
    </div>
  </section>
);

const MarketSnapshotConceptsPage = () => (
  <main className="snapshot-concepts">
    <section className="snapshot-concepts__hero">
      <div className="snapshot-concepts__hero-copy">
        <p className="snapshot-concepts__eyebrow">Product Review</p>
        <h1>Market Snapshot Concepts</h1>
        <p>
          Five focused versions for presenting how Car and Driver can recommend the best local vehicle while showing the next best options without overwhelming shoppers.
        </p>
      </div>
      <div className="snapshot-concepts__principles" aria-label="Presentation principles">
        <span><CheckCircle2 size={16} aria-hidden /> Recommend one best vehicle first</span>
        <span><CheckCircle2 size={16} aria-hidden /> Show the next best two vehicles</span>
        <span><CheckCircle2 size={16} aria-hidden /> Limit signals to what helps the decision</span>
      </div>
    </section>

    <section className="snapshot-concepts__library" aria-labelledby="signal-library-title">
      <div>
        <p className="snapshot-concepts__section-label">Signal Library</p>
        <h2 id="signal-library-title">Use signals selectively</h2>
        <p>Use plain marketplace labels. Pick the strongest two or three signals per vehicle instead of showing the full library at once.</p>
      </div>
      <div className="snapshot-concepts__signal-library">
        {signalLibrary.map((group) => (
          <article key={group.tone} className={`snapshot-concepts__signal-group snapshot-concepts__signal-group--${group.tone}`}>
            <div className="snapshot-concepts__signal-group-head">
              <Badge variant={badgeVariantByTone[group.tone]}>{group.label}</Badge>
            </div>
            <div className="snapshot-concepts__library-badges">
              {group.examples.map((example) => (
                <Badge key={`${group.tone}-${example}`} variant={badgeVariantByTone[group.tone]}>
                  {example}
                </Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>

    <nav className="snapshot-concepts__nav" aria-label="Market snapshot concept versions">
      {concepts.map((concept) => (
        <a key={concept.id} href={`#${concept.id}`}>
          <span>{concept.label}</span>
          {concept.title}
        </a>
      ))}
    </nav>

    <div className="snapshot-concepts__modules">
      {concepts.map((concept) => (
        <ConceptModule key={concept.id} concept={concept} />
      ))}
    </div>
  </main>
);

export default MarketSnapshotConceptsPage;
