import type { Meta, StoryObj } from '@storybook/react';
import { TextBlock, Heading, Paragraph, Quote, List, Highlight, Divider } from './TextBlock';

const meta: Meta<typeof TextBlock> = {
  title: 'Resin Components/TextBlock',
  component: TextBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Text Block

A rich text content component for article body content.
Inspired by Hearst's editorial text styling.

### Features
- Multiple size variants (small, medium, large)
- Drop cap support
- Relaxed spacing option
- Max width constraints
- Sub-components for structured content:
  - Heading (h1-h6)
  - Paragraph (with lead option)
  - Quote (with citation)
  - List (ordered/unordered)
  - Highlight (info, warning, success, tip)
  - Divider (line, dots, space)

### Usage
\`\`\`tsx
<TextBlock size="medium" dropCap maxWidth="medium">
  <Heading level={1}>Article Title</Heading>
  <Paragraph lead>Lead paragraph with larger text.</Paragraph>
  <Paragraph>Regular paragraph content...</Paragraph>
  <Quote cite="Car and Driver">
    The best sedan we've tested this year.
  </Quote>
  <List items={['Item 1', 'Item 2', 'Item 3']} />
</TextBlock>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Text size variant',
    },
    maxWidth: {
      control: 'radio',
      options: ['narrow', 'medium', 'wide', 'full'],
      description: 'Maximum width constraint',
    },
    dropCap: {
      control: 'boolean',
      description: 'Enable drop cap on first paragraph',
    },
    relaxedSpacing: {
      control: 'boolean',
      description: 'Add extra spacing between paragraphs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextBlock>;

export const Default: Story = {
  args: {
    size: 'medium',
    maxWidth: 'medium',
    dropCap: false,
    relaxedSpacing: false,
  },
  render: (args) => (
    <TextBlock {...args}>
      <Heading level={1}>2025 Honda Accord Review: The Benchmark Sedan</Heading>
      <Paragraph lead>
        The Honda Accord has long been the benchmark for midsize sedans, and the 2025 model 
        continues that tradition with refinements to its already excellent formula.
      </Paragraph>
      <Paragraph>
        With a comfortable ride, spacious interior, and impressive fuel economy, it remains 
        one of our top picks in the segment. The Accord offers two powertrain choices: a 
        turbocharged 1.5-liter four-cylinder making 192 horsepower, or a hybrid system that 
        combines a 2.0-liter four-cylinder with two electric motors for 204 horsepower.
      </Paragraph>
      <Paragraph>
        Both options deliver smooth, refined power delivery that makes the Accord a pleasure 
        to drive in any situation, from highway cruising to city commuting.
      </Paragraph>
    </TextBlock>
  ),
};

export const WithDropCap: Story = {
  args: {
    size: 'large',
    maxWidth: 'medium',
    dropCap: true,
    relaxedSpacing: true,
  },
  render: (args) => (
    <TextBlock {...args}>
      <Paragraph>
        The automotive landscape is changing rapidly, with electric vehicles now accounting 
        for a significant portion of new car sales. But traditional sedans like the Honda 
        Accord continue to prove their worth, offering a combination of efficiency, comfort, 
        and value that's hard to beat.
      </Paragraph>
      <Paragraph>
        In our comprehensive testing, the 2025 Accord demonstrated why it remains a favorite 
        among both critics and consumers. Its refined powertrain options, spacious interior, 
        and impressive list of standard features make it a compelling choice in a crowded market.
      </Paragraph>
    </TextBlock>
  ),
};

export const WithQuote: Story = {
  args: {
    size: 'medium',
    maxWidth: 'medium',
  },
  render: (args) => (
    <TextBlock {...args}>
      <Heading level={2}>What the Experts Say</Heading>
      <Paragraph>
        Industry experts consistently praise the Accord for its balanced approach to 
        performance and efficiency. The hybrid model, in particular, has garnered attention 
        for its seamless power delivery.
      </Paragraph>
      <Quote cite="Car and Driver">
        The Accord Hybrid is the best midsize sedan we've tested this year. Its combination 
        of fuel efficiency, driving dynamics, and interior quality sets a new standard for 
        the segment.
      </Quote>
      <Paragraph>
        This praise is well-deserved. In our testing, the Accord Hybrid achieved an impressive 
        47 mpg combined, while still delivering enough power for confident highway merging and 
        passing maneuvers.
      </Paragraph>
    </TextBlock>
  ),
};

export const WithLists: Story = {
  args: {
    size: 'medium',
    maxWidth: 'medium',
  },
  render: (args) => (
    <TextBlock {...args}>
      <Heading level={2}>Key Features</Heading>
      <Paragraph>
        The 2025 Honda Accord comes packed with features that make it stand out in the 
        competitive midsize sedan segment:
      </Paragraph>
      <List 
        items={[
          'Honda Sensing suite of driver-assistance features (standard)',
          '12.3-inch touchscreen infotainment system',
          'Wireless Apple CarPlay and Android Auto',
          'Heated front seats (EX and above)',
          'Adaptive cruise control with low-speed follow',
        ]}
      />
      <Heading level={3}>Available Powertrains</Heading>
      <List 
        ordered
        items={[
          '1.5L Turbocharged 4-cylinder (192 hp) - LX, EX, Sport',
          '2.0L Hybrid (204 hp) - Sport-L Hybrid, Touring Hybrid',
        ]}
      />
    </TextBlock>
  ),
};

export const WithHighlights: Story = {
  args: {
    size: 'medium',
    maxWidth: 'medium',
  },
  render: (args) => (
    <TextBlock {...args}>
      <Heading level={2}>Important Considerations</Heading>
      
      <Highlight variant="success">
        <strong>Editors' Choice:</strong> The 2025 Honda Accord earns our Editors' Choice 
        award for its exceptional combination of comfort, efficiency, and value.
      </Highlight>

      <Paragraph>
        Before making your purchase decision, there are several factors to consider about 
        the 2025 Accord.
      </Paragraph>

      <Highlight variant="info">
        <strong>Fuel Economy:</strong> The Accord Hybrid achieves up to 51 mpg city and 
        44 mpg highway, making it one of the most efficient sedans in its class.
      </Highlight>

      <Highlight variant="warning">
        <strong>Note:</strong> The Sport trim with the 2.0T engine has been discontinued 
        for 2025. If you want more power, the hybrid is now your only option.
      </Highlight>

      <Highlight variant="tip">
        <strong>Pro Tip:</strong> Consider the EX-L trim for the best balance of features 
        and value. It includes leather seats, a power moonroof, and the full Honda Sensing 
        suite.
      </Highlight>
    </TextBlock>
  ),
};

export const WithDividers: Story = {
  args: {
    size: 'medium',
    maxWidth: 'medium',
  },
  render: (args) => (
    <TextBlock {...args}>
      <Heading level={2}>Section One: Design</Heading>
      <Paragraph>
        The 2025 Accord features a sleek, modern design that balances sophistication with 
        sportiness. The front fascia is bold without being aggressive, while the roofline 
        flows smoothly into a subtle rear spoiler.
      </Paragraph>

      <Divider variant="line" />

      <Heading level={2}>Section Two: Performance</Heading>
      <Paragraph>
        On the road, the Accord delivers a composed, confident driving experience. The 
        steering is precise, the brakes are strong, and the suspension strikes an excellent 
        balance between comfort and control.
      </Paragraph>

      <Divider variant="dots" />

      <Heading level={2}>Section Three: Value</Heading>
      <Paragraph>
        Starting at $28,990, the Accord offers excellent value for money. Even the base LX 
        trim includes features like adaptive cruise control, lane-keeping assist, and a 
        7-inch touchscreen.
      </Paragraph>
    </TextBlock>
  ),
};

export const HTMLContent: Story = {
  args: {
    size: 'medium',
    maxWidth: 'medium',
    htmlContent: `
      <h2>2025 Honda Accord: By the Numbers</h2>
      <p>Here's a quick overview of the key specifications:</p>
      <ul>
        <li><strong>Base Price:</strong> $28,990</li>
        <li><strong>Horsepower:</strong> 192 hp (1.5T) / 204 hp (Hybrid)</li>
        <li><strong>Fuel Economy:</strong> Up to 51 mpg city (Hybrid)</li>
        <li><strong>Cargo Space:</strong> 16.7 cu ft</li>
      </ul>
      <blockquote>
        <p>The Accord remains the gold standard for midsize sedans.</p>
        <cite>— Car and Driver</cite>
      </blockquote>
      <p>Whether you're looking for <em>efficiency</em>, <strong>comfort</strong>, or 
      <u>value</u>, the Accord delivers on all fronts.</p>
    `,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', color: '#6b7280' }}>Small</h3>
        <TextBlock size="small" maxWidth="full">
          <Paragraph>
            The Honda Accord has long been the benchmark for midsize sedans. With a comfortable 
            ride, spacious interior, and impressive fuel economy, it remains one of our top picks.
          </Paragraph>
        </TextBlock>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', color: '#6b7280' }}>Medium (Default)</h3>
        <TextBlock size="medium" maxWidth="full">
          <Paragraph>
            The Honda Accord has long been the benchmark for midsize sedans. With a comfortable 
            ride, spacious interior, and impressive fuel economy, it remains one of our top picks.
          </Paragraph>
        </TextBlock>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', color: '#6b7280' }}>Large</h3>
        <TextBlock size="large" maxWidth="full">
          <Paragraph>
            The Honda Accord has long been the benchmark for midsize sedans. With a comfortable 
            ride, spacious interior, and impressive fuel economy, it remains one of our top picks.
          </Paragraph>
        </TextBlock>
      </div>
    </div>
  ),
};

// Full article example
export const FullArticle: Story = {
  render: () => (
    <TextBlock size="medium" maxWidth="medium" dropCap relaxedSpacing>
      <Heading level={1}>2025 Honda Accord Review</Heading>
      <Paragraph lead>
        The Honda Accord continues to set the standard for midsize sedans with its 
        exceptional blend of comfort, efficiency, and value.
      </Paragraph>

      <Paragraph>
        For decades, the Honda Accord has been synonymous with reliability and practicality. 
        The 2025 model year brings subtle refinements that enhance an already excellent 
        formula, cementing the Accord's position as one of the best sedans money can buy.
      </Paragraph>

      <Heading level={2}>Design and Styling</Heading>
      <Paragraph>
        The exterior design strikes a perfect balance between sophistication and sportiness. 
        A bold front grille, sleek LED headlights, and a flowing roofline give the Accord 
        a presence that stands out in parking lots and on highways alike.
      </Paragraph>

      <Quote cite="Car and Driver Design Team">
        Honda has mastered the art of evolutionary design. The Accord looks fresh without 
        alienating loyal customers who appreciate its timeless appeal.
      </Quote>

      <Heading level={2}>Performance</Heading>
      <Paragraph>
        Two powertrain options are available for 2025:
      </Paragraph>

      <List items={[
        '1.5-liter turbocharged four-cylinder (192 hp, 192 lb-ft)',
        '2.0-liter hybrid system (204 hp combined)',
      ]} />

      <Highlight variant="tip">
        If fuel efficiency is your priority, the hybrid is the clear choice, achieving 
        up to 51 mpg in city driving.
      </Highlight>

      <Divider variant="dots" />

      <Heading level={2}>The Verdict</Heading>
      <Paragraph>
        The 2025 Honda Accord earns our highest recommendation. Whether you choose the 
        efficient hybrid or the peppy turbocharged engine, you're getting one of the best 
        sedans available today.
      </Paragraph>

      <Highlight variant="success">
        <strong>Editors' Choice Award:</strong> The Accord's combination of quality, 
        value, and driving enjoyment makes it an easy choice for our Editors' Choice award.
      </Highlight>
    </TextBlock>
  ),
};

