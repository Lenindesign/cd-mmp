import{j as e,R as A}from"./iframe-CwAjgNKQ.js";import"./preload-helper-PPVm8Dsz.js";const j=({children:a,htmlContent:t,size:o="medium",dropCap:d=!1,relaxedSpacing:w=!1,maxWidth:T="medium",className:k=""})=>{const H=["text-block",`text-block--${o}`,`text-block--${T}`,d&&"text-block--drop-cap",w&&"text-block--relaxed",k].filter(Boolean).join(" ");return t?e.jsx("div",{className:H,dangerouslySetInnerHTML:{__html:t}}):e.jsx("div",{className:H,children:a})},i=j,n=({level:a=2,children:t,className:o=""})=>{const d=`h${a}`;return A.createElement(d,{className:`text-block__heading text-block__heading--h${a} ${o}`},t)},r=({children:a,lead:t=!1,className:o=""})=>e.jsx("p",{className:`text-block__paragraph ${t?"text-block__paragraph--lead":""} ${o}`,children:a}),b=({children:a,cite:t,className:o=""})=>e.jsxs("blockquote",{className:`text-block__quote ${o}`,children:[e.jsx("p",{children:a}),t&&e.jsxs("cite",{className:"text-block__quote-cite",children:["— ",t]})]}),c=({items:a,ordered:t=!1,className:o=""})=>{const d=t?"ol":"ul",w=a.map((T,k)=>e.jsx("li",{className:"text-block__list-item",children:T},k));return A.createElement(d,{className:`text-block__list ${t?"text-block__list--ordered":""} ${o}`},w)},s=({children:a,variant:t="info",className:o=""})=>e.jsx("div",{className:`text-block__highlight text-block__highlight--${t} ${o}`,children:a}),l=({variant:a="line"})=>e.jsx("hr",{className:`text-block__divider text-block__divider--${a}`});i.Heading=n;i.Paragraph=r;i.Quote=b;i.List=c;i.Highlight=s;i.Divider=l;j.__docgenInfo={description:"",methods:[],displayName:"TextBlockComponent",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content as React children or HTML string"},htmlContent:{required:!1,tsType:{name:"string"},description:"HTML content (alternative to children)"},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"Text size variant",defaultValue:{value:"'medium'",computed:!1}},dropCap:{required:!1,tsType:{name:"boolean"},description:"Enable drop cap on first paragraph",defaultValue:{value:"false",computed:!1}},relaxedSpacing:{required:!1,tsType:{name:"boolean"},description:"Add extra spacing between paragraphs",defaultValue:{value:"false",computed:!1}},maxWidth:{required:!1,tsType:{name:"union",raw:"'narrow' | 'medium' | 'wide' | 'full'",elements:[{name:"literal",value:"'narrow'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'wide'"},{name:"literal",value:"'full'"}]},description:"Maximum width constraint",defaultValue:{value:"'medium'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class",defaultValue:{value:"''",computed:!1}}}};n.__docgenInfo={description:"",methods:[],displayName:"Heading",props:{level:{required:!1,tsType:{name:"union",raw:"1 | 2 | 3 | 4 | 5 | 6",elements:[{name:"literal",value:"1"},{name:"literal",value:"2"},{name:"literal",value:"3"},{name:"literal",value:"4"},{name:"literal",value:"5"},{name:"literal",value:"6"}]},description:"",defaultValue:{value:"2",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};r.__docgenInfo={description:"",methods:[],displayName:"Paragraph",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},lead:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};b.__docgenInfo={description:"",methods:[],displayName:"Quote",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},cite:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};c.__docgenInfo={description:"",methods:[],displayName:"List",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},ordered:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};s.__docgenInfo={description:"",methods:[],displayName:"Highlight",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'info' | 'warning' | 'success' | 'tip'",elements:[{name:"literal",value:"'info'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'success'"},{name:"literal",value:"'tip'"}]},description:"",defaultValue:{value:"'info'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};l.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{variant:{required:!1,tsType:{name:"union",raw:"'line' | 'dots' | 'space'",elements:[{name:"literal",value:"'line'"},{name:"literal",value:"'dots'"},{name:"literal",value:"'space'"}]},description:"",defaultValue:{value:"'line'",computed:!1}}}};const W={title:"Resin Components/TextBlock",component:i,parameters:{layout:"padded",docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{size:{control:"radio",options:["small","medium","large"],description:"Text size variant"},maxWidth:{control:"radio",options:["narrow","medium","wide","full"],description:"Maximum width constraint"},dropCap:{control:"boolean",description:"Enable drop cap on first paragraph"},relaxedSpacing:{control:"boolean",description:"Add extra spacing between paragraphs"}}},h={args:{size:"medium",maxWidth:"medium",dropCap:!1,relaxedSpacing:!1},render:a=>e.jsxs(i,{...a,children:[e.jsx(n,{level:1,children:"2025 Honda Accord Review: The Benchmark Sedan"}),e.jsx(r,{lead:!0,children:"The Honda Accord has long been the benchmark for midsize sedans, and the 2025 model continues that tradition with refinements to its already excellent formula."}),e.jsx(r,{children:"With a comfortable ride, spacious interior, and impressive fuel economy, it remains one of our top picks in the segment. The Accord offers two powertrain choices: a turbocharged 1.5-liter four-cylinder making 192 horsepower, or a hybrid system that combines a 2.0-liter four-cylinder with two electric motors for 204 horsepower."}),e.jsx(r,{children:"Both options deliver smooth, refined power delivery that makes the Accord a pleasure to drive in any situation, from highway cruising to city commuting."})]})},m={args:{size:"large",maxWidth:"medium",dropCap:!0,relaxedSpacing:!0},render:a=>e.jsxs(i,{...a,children:[e.jsx(r,{children:"The automotive landscape is changing rapidly, with electric vehicles now accounting for a significant portion of new car sales. But traditional sedans like the Honda Accord continue to prove their worth, offering a combination of efficiency, comfort, and value that's hard to beat."}),e.jsx(r,{children:"In our comprehensive testing, the 2025 Accord demonstrated why it remains a favorite among both critics and consumers. Its refined powertrain options, spacious interior, and impressive list of standard features make it a compelling choice in a crowded market."})]})},p={args:{size:"medium",maxWidth:"medium"},render:a=>e.jsxs(i,{...a,children:[e.jsx(n,{level:2,children:"What the Experts Say"}),e.jsx(r,{children:"Industry experts consistently praise the Accord for its balanced approach to performance and efficiency. The hybrid model, in particular, has garnered attention for its seamless power delivery."}),e.jsx(b,{cite:"Car and Driver",children:"The Accord Hybrid is the best midsize sedan we've tested this year. Its combination of fuel efficiency, driving dynamics, and interior quality sets a new standard for the segment."}),e.jsx(r,{children:"This praise is well-deserved. In our testing, the Accord Hybrid achieved an impressive 47 mpg combined, while still delivering enough power for confident highway merging and passing maneuvers."})]})},u={args:{size:"medium",maxWidth:"medium"},render:a=>e.jsxs(i,{...a,children:[e.jsx(n,{level:2,children:"Key Features"}),e.jsx(r,{children:"The 2025 Honda Accord comes packed with features that make it stand out in the competitive midsize sedan segment:"}),e.jsx(c,{items:["Honda Sensing suite of driver-assistance features (standard)","12.3-inch touchscreen infotainment system","Wireless Apple CarPlay and Android Auto","Heated front seats (EX and above)","Adaptive cruise control with low-speed follow"]}),e.jsx(n,{level:3,children:"Available Powertrains"}),e.jsx(c,{ordered:!0,items:["1.5L Turbocharged 4-cylinder (192 hp) - LX, EX, Sport","2.0L Hybrid (204 hp) - Sport-L Hybrid, Touring Hybrid"]})]})},g={args:{size:"medium",maxWidth:"medium"},render:a=>e.jsxs(i,{...a,children:[e.jsx(n,{level:2,children:"Important Considerations"}),e.jsxs(s,{variant:"success",children:[e.jsx("strong",{children:"Editors' Choice:"})," The 2025 Honda Accord earns our Editors' Choice award for its exceptional combination of comfort, efficiency, and value."]}),e.jsx(r,{children:"Before making your purchase decision, there are several factors to consider about the 2025 Accord."}),e.jsxs(s,{variant:"info",children:[e.jsx("strong",{children:"Fuel Economy:"})," The Accord Hybrid achieves up to 51 mpg city and 44 mpg highway, making it one of the most efficient sedans in its class."]}),e.jsxs(s,{variant:"warning",children:[e.jsx("strong",{children:"Note:"})," The Sport trim with the 2.0T engine has been discontinued for 2025. If you want more power, the hybrid is now your only option."]}),e.jsxs(s,{variant:"tip",children:[e.jsx("strong",{children:"Pro Tip:"})," Consider the EX-L trim for the best balance of features and value. It includes leather seats, a power moonroof, and the full Honda Sensing suite."]})]})},f={args:{size:"medium",maxWidth:"medium"},render:a=>e.jsxs(i,{...a,children:[e.jsx(n,{level:2,children:"Section One: Design"}),e.jsx(r,{children:"The 2025 Accord features a sleek, modern design that balances sophistication with sportiness. The front fascia is bold without being aggressive, while the roofline flows smoothly into a subtle rear spoiler."}),e.jsx(l,{variant:"line"}),e.jsx(n,{level:2,children:"Section Two: Performance"}),e.jsx(r,{children:"On the road, the Accord delivers a composed, confident driving experience. The steering is precise, the brakes are strong, and the suspension strikes an excellent balance between comfort and control."}),e.jsx(l,{variant:"dots"}),e.jsx(n,{level:2,children:"Section Three: Value"}),e.jsx(r,{children:"Starting at $28,990, the Accord offers excellent value for money. Even the base LX trim includes features like adaptive cruise control, lane-keeping assist, and a 7-inch touchscreen."})]})},v={args:{size:"medium",maxWidth:"medium",htmlContent:`
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
    `}},y={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"48px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px",color:"#6b7280"},children:"Small"}),e.jsx(i,{size:"small",maxWidth:"full",children:e.jsx(r,{children:"The Honda Accord has long been the benchmark for midsize sedans. With a comfortable ride, spacious interior, and impressive fuel economy, it remains one of our top picks."})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px",color:"#6b7280"},children:"Medium (Default)"}),e.jsx(i,{size:"medium",maxWidth:"full",children:e.jsx(r,{children:"The Honda Accord has long been the benchmark for midsize sedans. With a comfortable ride, spacious interior, and impressive fuel economy, it remains one of our top picks."})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px",color:"#6b7280"},children:"Large"}),e.jsx(i,{size:"large",maxWidth:"full",children:e.jsx(r,{children:"The Honda Accord has long been the benchmark for midsize sedans. With a comfortable ride, spacious interior, and impressive fuel economy, it remains one of our top picks."})})]})]})},x={render:()=>e.jsxs(i,{size:"medium",maxWidth:"medium",dropCap:!0,relaxedSpacing:!0,children:[e.jsx(n,{level:1,children:"2025 Honda Accord Review"}),e.jsx(r,{lead:!0,children:"The Honda Accord continues to set the standard for midsize sedans with its exceptional blend of comfort, efficiency, and value."}),e.jsx(r,{children:"For decades, the Honda Accord has been synonymous with reliability and practicality. The 2025 model year brings subtle refinements that enhance an already excellent formula, cementing the Accord's position as one of the best sedans money can buy."}),e.jsx(n,{level:2,children:"Design and Styling"}),e.jsx(r,{children:"The exterior design strikes a perfect balance between sophistication and sportiness. A bold front grille, sleek LED headlights, and a flowing roofline give the Accord a presence that stands out in parking lots and on highways alike."}),e.jsx(b,{cite:"Car and Driver Design Team",children:"Honda has mastered the art of evolutionary design. The Accord looks fresh without alienating loyal customers who appreciate its timeless appeal."}),e.jsx(n,{level:2,children:"Performance"}),e.jsx(r,{children:"Two powertrain options are available for 2025:"}),e.jsx(c,{items:["1.5-liter turbocharged four-cylinder (192 hp, 192 lb-ft)","2.0-liter hybrid system (204 hp combined)"]}),e.jsx(s,{variant:"tip",children:"If fuel efficiency is your priority, the hybrid is the clear choice, achieving up to 51 mpg in city driving."}),e.jsx(l,{variant:"dots"}),e.jsx(n,{level:2,children:"The Verdict"}),e.jsx(r,{children:"The 2025 Honda Accord earns our highest recommendation. Whether you choose the efficient hybrid or the peppy turbocharged engine, you're getting one of the best sedans available today."}),e.jsxs(s,{variant:"success",children:[e.jsx("strong",{children:"Editors' Choice Award:"})," The Accord's combination of quality, value, and driving enjoyment makes it an easy choice for our Editors' Choice award."]})]})};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    maxWidth: 'medium',
    dropCap: false,
    relaxedSpacing: false
  },
  render: args => <TextBlock {...args}>
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
}`,...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'large',
    maxWidth: 'medium',
    dropCap: true,
    relaxedSpacing: true
  },
  render: args => <TextBlock {...args}>
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
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    maxWidth: 'medium'
  },
  render: args => <TextBlock {...args}>
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
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    maxWidth: 'medium'
  },
  render: args => <TextBlock {...args}>
      <Heading level={2}>Key Features</Heading>
      <Paragraph>
        The 2025 Honda Accord comes packed with features that make it stand out in the 
        competitive midsize sedan segment:
      </Paragraph>
      <List items={['Honda Sensing suite of driver-assistance features (standard)', '12.3-inch touchscreen infotainment system', 'Wireless Apple CarPlay and Android Auto', 'Heated front seats (EX and above)', 'Adaptive cruise control with low-speed follow']} />
      <Heading level={3}>Available Powertrains</Heading>
      <List ordered items={['1.5L Turbocharged 4-cylinder (192 hp) - LX, EX, Sport', '2.0L Hybrid (204 hp) - Sport-L Hybrid, Touring Hybrid']} />
    </TextBlock>
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    maxWidth: 'medium'
  },
  render: args => <TextBlock {...args}>
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
}`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    maxWidth: 'medium'
  },
  render: args => <TextBlock {...args}>
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
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    maxWidth: 'medium',
    htmlContent: \`
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
    \`
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '48px'
  }}>
      <div>
        <h3 style={{
        marginBottom: '16px',
        color: '#6b7280'
      }}>Small</h3>
        <TextBlock size="small" maxWidth="full">
          <Paragraph>
            The Honda Accord has long been the benchmark for midsize sedans. With a comfortable 
            ride, spacious interior, and impressive fuel economy, it remains one of our top picks.
          </Paragraph>
        </TextBlock>
      </div>

      <div>
        <h3 style={{
        marginBottom: '16px',
        color: '#6b7280'
      }}>Medium (Default)</h3>
        <TextBlock size="medium" maxWidth="full">
          <Paragraph>
            The Honda Accord has long been the benchmark for midsize sedans. With a comfortable 
            ride, spacious interior, and impressive fuel economy, it remains one of our top picks.
          </Paragraph>
        </TextBlock>
      </div>

      <div>
        <h3 style={{
        marginBottom: '16px',
        color: '#6b7280'
      }}>Large</h3>
        <TextBlock size="large" maxWidth="full">
          <Paragraph>
            The Honda Accord has long been the benchmark for midsize sedans. With a comfortable 
            ride, spacious interior, and impressive fuel economy, it remains one of our top picks.
          </Paragraph>
        </TextBlock>
      </div>
    </div>
}`,...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <TextBlock size="medium" maxWidth="medium" dropCap relaxedSpacing>
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

      <List items={['1.5-liter turbocharged four-cylinder (192 hp, 192 lb-ft)', '2.0-liter hybrid system (204 hp combined)']} />

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
}`,...x.parameters?.docs?.source}}};const z=["Default","WithDropCap","WithQuote","WithLists","WithHighlights","WithDividers","HTMLContent","AllSizes","FullArticle"];export{y as AllSizes,h as Default,x as FullArticle,v as HTMLContent,f as WithDividers,m as WithDropCap,g as WithHighlights,u as WithLists,p as WithQuote,z as __namedExportsOrder,W as default};
