#!/usr/bin/env node
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outputRoot = path.join(root, 'docs', 'obsidian-app-audit');
const appPath = path.join(root, 'src', 'App.tsx');
const dealRoutesPath = path.join(root, 'src', 'constants', 'dealRoutes.ts');

const appSource = readFileSync(appPath, 'utf8');
const dealRouteSource = existsSync(dealRoutesPath) ? readFileSync(dealRoutesPath, 'utf8') : '';

const moduleDefinitions = [
  {
    name: 'Authentication and Onboarding',
    description: 'Sign-in, sign-up, and onboarding paths that set up account identity and initial shopper preferences.',
    patterns: [/^\/sign-/, /^\/onboarding/],
    risks: ['Auth bypass behavior must remain clearly scoped to demo or local flows.', 'Social sign-in buttons need stable focus and loading states.'],
  },
  {
    name: 'Home and Editorial',
    description: 'Homepage, news, articles, listicles, and expert reviews that provide editorial context before shopping actions.',
    patterns: [/^\/$/, /^\/news/, /^\/news-stories/, /^\/article/, /^\/listicle/, /^\/expert-reviews/],
    risks: ['Editorial pages should keep heading order and article landmarks clean.', 'Article links should bridge naturally into vehicle, rankings, and shopping modules.'],
  },
  {
    name: 'Vehicle Discovery',
    description: 'Browse, brand, ranking, and compare routes where shoppers narrow the vehicle set.',
    patterns: [/^\/vehicles/, /^\/browse/, /^\/used-cars/, /^\/brands/, /^\/rankings/, /^\/compare/],
    risks: ['Vehicle cards need consistent image missing states and save behavior.', 'Filter, compare, and ranking controls need keyboard parity on mobile and desktop.'],
  },
  {
    name: 'Vehicle Detail',
    description: 'Year, make, model pages and their marketplace CTA variants.',
    patterns: [/^\/:year\/:make\/:model/],
    risks: ['Payment, deals, trims, specs, and inventory sections must stay internally consistent.', 'A/B routes should not drift from shared component behavior.'],
  },
  {
    name: 'Deals and Incentives',
    description: 'Deal hubs, lease paths, cash, finance, body-style, make, and model incentive pages.',
    patterns: [/^\/deals/, /^\/lease-deals/, /^\/:make\/deals-incentives/, /^\/:make\/:model\/deals-incentives/, /^\/:make\/lease-deals/, /^\/:make\/:model\/lease-deals/],
    risks: ['Deal math, filter state, and sort behavior are high-risk and should be covered by source-level tests.', 'Incentive badges must stay factual and avoid dealer-lot pressure.'],
  },
  {
    name: 'Finance and Calculator',
    description: 'Finance landing pages, vehicle payment calculators, and guided auto loan calculator variants.',
    patterns: [/^\/financing/, /^\/payment-calculator/, /^\/auto-loan-calculator/],
    risks: ['Finance math and rounding need unit tests for zero APR, trade-in, taxes, rebates, and terms.', 'Guided calculator must preserve keyboard navigation, focus state, reduced motion, and mobile overflow behavior.'],
  },
  {
    name: 'Trade In Valuation',
    description: 'What is my car worth and trade-in result routes.',
    patterns: [/^\/whats-my-car-worth/, /^\/trade-in-value/],
    risks: ['VIN, mileage, and value estimate flows need clear labels and error states.', 'Trade-in values must connect cleanly to calculator and budget assumptions.'],
  },
  {
    name: 'Account and Garage',
    description: 'Profile, saved cars, saved estimates, budget, and My Garage sidebar.',
    patterns: [/^\/account/],
    risks: ['Saved estimate and saved vehicle controls need one consistent bookmark pattern.', 'Garage sidebar tabs and close controls need accessible labels and predictable focus return.'],
  },
  {
    name: 'Admin and QA',
    description: 'Design system, audit, feedback, and internal editor routes.',
    patterns: [/^\/design-system/, /^\/admin/, /^\/audit/, /^\/email-preview/],
    risks: ['Internal tools should not leak production-only assumptions into shopper flows.', 'Storybook or audit routes must remain separate from production deployment decisions.'],
  },
  {
    name: 'Error Handling',
    description: 'Catch-all and not-found behavior.',
    patterns: [/^\*/],
    risks: ['Unknown paths should provide a useful recovery path back into browse, deals, or search.'],
  },
];

const relationships = [
  ['Header and Navigation', 'Home and Editorial', 'global entry'],
  ['Header and Navigation', 'Vehicle Discovery', 'browse links'],
  ['Header and Navigation', 'Deals and Incentives', 'deals links'],
  ['Header and Navigation', 'Account and Garage', 'garage entry'],
  ['Home and Editorial', 'Vehicle Discovery', 'article and list links'],
  ['Vehicle Discovery', 'Vehicle Detail', 'vehicle cards'],
  ['Vehicle Discovery', 'Deals and Incentives', 'deal and ranking context'],
  ['Vehicle Detail', 'Finance and Calculator', 'payment module'],
  ['Vehicle Detail', 'Deals and Incentives', 'incentive modules'],
  ['Vehicle Detail', 'Trade In Valuation', 'trade-in CTA'],
  ['Vehicle Detail', 'Account and Garage', 'save vehicle'],
  ['Deals and Incentives', 'Vehicle Detail', 'deal cards'],
  ['Deals and Incentives', 'Account and Garage', 'save deal vehicle'],
  ['Finance and Calculator', 'Account and Garage', 'saved estimates'],
  ['Finance and Calculator', 'Vehicle Discovery', 'cars in budget'],
  ['Finance and Calculator', 'Vehicle Detail', 'selected vehicle estimate'],
  ['Trade In Valuation', 'Finance and Calculator', 'trade credit'],
  ['Account and Garage', 'Vehicle Detail', 'saved cars'],
  ['Account and Garage', 'Finance and Calculator', 'open saved estimate'],
  ['Authentication and Onboarding', 'Account and Garage', 'account identity'],
];

const flowDefinitions = [
  {
    name: 'Guided Calculator to Garage',
    summary: 'A shopper creates an estimate, reviews cost breakdown, saves it, then reopens it from My Garage.',
    modules: ['Finance and Calculator', 'Account and Garage', 'Vehicle Discovery'],
    checkpoints: ['Keyboard arrow navigation across steps', 'Save and unsave estimate icon state', 'Saved estimate deep link restores assumptions', 'Mobile result stack stays inside calculator frame'],
  },
  {
    name: 'Vehicle Research to Finance',
    summary: 'A shopper lands on a vehicle detail page, reviews pricing, uses finance or lease calculator tabs, and moves into marketplace listings.',
    modules: ['Vehicle Detail', 'Finance and Calculator', 'Deals and Incentives', 'Vehicle Discovery'],
    checkpoints: ['Trim selection changes payment inputs when trim data exists', 'Finance and lease tooltips match guided calculator tooltip style', 'Shop CTA opens relevant marketplace path'],
  },
  {
    name: 'Deals Discovery',
    summary: 'A shopper compares buying, APR, cash back, lease, body-style, make, and model incentive pages.',
    modules: ['Deals and Incentives', 'Vehicle Detail', 'Account and Garage'],
    checkpoints: ['Deal filter chips update URL and results', 'Offer cards expose save and details affordances', 'Image failures use text-only missing image state'],
  },
  {
    name: 'Trade-In to Budget',
    summary: 'A shopper estimates trade-in value and feeds that value into payment or budget decisions.',
    modules: ['Trade In Valuation', 'Finance and Calculator', 'Account and Garage'],
    checkpoints: ['Trade equity and amount owed are distinct', 'Calculator copy explains whether trade affects total or loan amount', 'Saved estimates preserve trade assumptions'],
  },
  {
    name: 'Editorial to Shopping',
    summary: 'A reader starts in editorial content, then follows vehicle, rankings, compare, or deal paths into shopping.',
    modules: ['Home and Editorial', 'Vehicle Discovery', 'Vehicle Detail', 'Deals and Incentives'],
    checkpoints: ['Editorial pages do not bury marketplace next steps', 'Vehicle links preserve readable anchors and keyboard focus', 'No sales-pressure language enters editorial modules'],
  },
];

function extractDealRouteConstants(source) {
  const map = new Map();
  const regex = /export const (\w+)\s*=\s*'([^']+)'/g;
  for (const match of source.matchAll(regex)) {
    map.set(match[1], match[2]);
  }
  return map;
}

function extractLazyImports(source) {
  const map = new Map();
  const regex = /const (\w+) = lazy\(\(\) => import\('([^']+)'\)\);/g;
  for (const match of source.matchAll(regex)) {
    map.set(match[1], `${match[2].replace(/^\.\//, 'src/')}.tsx`);
  }
  return map;
}

function extractRoutes(source, routeConstants, lazyImports) {
  const routes = [];
  const routeRegex = /<Route\s+path=(?:"([^"]+)"|\{([^}]+)\})\s+element=\{([\s\S]*?)\}\s*\/>/g;
  let order = 0;
  for (const match of source.matchAll(routeRegex)) {
    const quotedPath = match[1];
    const expressionPath = match[2];
    const element = match[3].trim().replace(/\s+/g, ' ');
    const pathValue = quotedPath ?? routeConstants.get(expressionPath) ?? `{${expressionPath}}`;
    const component = element.match(/<([A-Z]\w*)/)?.[1] ?? (element.includes('Navigate') ? 'Navigate' : 'Unknown');
    const sourceFile = lazyImports.get(component) ?? (component === 'Navigate' ? 'react-router-dom' : 'src/App.tsx');
    const moduleName = classifyRoute(pathValue);
    routes.push({
      order: ++order,
      route: pathValue,
      routeExpression: expressionPath ?? null,
      element,
      component,
      sourceFile,
      moduleName,
      noteName: routeNoteName(pathValue),
    });
  }
  return routes;
}

function classifyRoute(routePath) {
  const match = moduleDefinitions.find((definition) => definition.patterns.some((pattern) => pattern.test(routePath)));
  return match?.name ?? 'Unclassified';
}

function slugify(value) {
  return value
    .replace(/^\//, '')
    .replace(/\*/g, 'catch-all')
    .replace(/:/g, '')
    .replace(/[{}]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase() || 'home';
}

function routeNoteName(routePath) {
  if (routePath === '/') return 'Home';
  if (routePath === '*') return 'Catch All';
  return slugify(routePath)
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function wiki(target, label = target.split('/').pop()?.replace(/\.md$/, '') ?? target) {
  return `[[${target}|${label}]]`;
}

function mdTable(headers, rows) {
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell).replace(/\n/g, ' ')).join(' | ')} |`),
  ].join('\n');
}

function moduleGraph() {
  const nodeNames = new Map();
  const allNodes = new Set(['Header and Navigation', ...moduleDefinitions.map((module) => module.name)]);
  [...allNodes].forEach((name, index) => nodeNames.set(name, `N${index + 1}`));
  const nodeLines = [...allNodes].map((name) => `  ${nodeNames.get(name)}["${name}"]`);
  const edgeLines = relationships.map(([from, to, label]) => `  ${nodeNames.get(from)} -->|${label}| ${nodeNames.get(to)}`);
  return ['```mermaid', 'graph LR', ...nodeLines, ...edgeLines, '```'].join('\n');
}

function routeGraph(routes) {
  const groups = groupBy(routes, (route) => route.moduleName);
  const lines = ['```mermaid', 'graph LR'];
  moduleDefinitions.forEach((module) => {
    const nodeId = slugify(module.name).replace(/-/g, '_');
    lines.push(`  ${nodeId}["${module.name}"]`);
    (groups.get(module.name) ?? []).slice(0, 8).forEach((route) => {
      const routeId = `route_${route.order}`;
      lines.push(`  ${routeId}["${route.route}"]`);
      lines.push(`  ${nodeId} --> ${routeId}`);
    });
  });
  lines.push('```');
  return lines.join('\n');
}

function groupBy(items, getter) {
  const map = new Map();
  items.forEach((item) => {
    const key = getter(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  });
  return map;
}

function frontmatter(entries) {
  return [
    '---',
    ...Object.entries(entries).map(([key, value]) => {
      if (Array.isArray(value)) return `${key}: [${value.map((item) => `"${item}"`).join(', ')}]`;
      return `${key}: "${String(value).replace(/"/g, '\\"')}"`;
    }),
    '---',
    '',
  ].join('\n');
}

function routeAuditFocus(route) {
  if (route.moduleName === 'Finance and Calculator') return 'Verify finance math, keyboard flow, responsive result stack, reduced motion, and save or email actions.';
  if (route.moduleName === 'Vehicle Detail') return 'Verify hero, trims, payment calculator, deals, specs, ads, image fallback, and marketplace CTA paths.';
  if (route.moduleName === 'Deals and Incentives') return 'Verify filters, deal cards, incentive detail actions, save state, route canonicalization, and image fallback.';
  if (route.moduleName === 'Account and Garage') return 'Verify saved vehicle, saved estimate, budget, sidebar tabs, focus return, and remove actions.';
  if (route.moduleName === 'Vehicle Discovery') return 'Verify browse filters, cards, rankings, compare actions, save state, and horizontal overflow.';
  if (route.moduleName === 'Home and Editorial') return 'Verify semantic article structure, editorial links, image alt text, and marketplace bridge CTAs.';
  if (route.moduleName === 'Trade In Valuation') return 'Verify form labels, VIN or value states, trade credit handoff, and errors.';
  return 'Verify route loads, has a recovery path, and uses shared shell behavior.';
}

async function writeObsidianAudit(routes) {
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(path.join(outputRoot, 'Modules'), { recursive: true });
  await mkdir(path.join(outputRoot, 'Routes'), { recursive: true });
  await mkdir(path.join(outputRoot, 'Flows'), { recursive: true });
  await mkdir(path.join(outputRoot, 'Issues'), { recursive: true });

  const generatedAt = new Date().toISOString();
  const routeRows = routes.map((route) => [
    route.order,
    wiki(`Routes/${route.noteName}`, route.route),
    wiki(`Modules/${route.moduleName}`, route.moduleName),
    route.component,
    route.sourceFile,
  ]);

  await writeFile(
    path.join(outputRoot, '00 App Map.md'),
    [
      frontmatter({ type: 'app-map', generated: generatedAt, source: 'src/App.tsx' }),
      '# CD MMP App Audit Map',
      '',
      'This vault maps route families, shopper flows, and technical audit checkpoints for the marketplace app. Open this folder as an Obsidian vault, then use the local graph around module notes to see relationships.',
      '',
      '## Start Here',
      '',
      '- Use [[01 Route Inventory]] for the complete route table generated from `src/App.tsx`.',
      '- Use [[02 Audit Runbook]] for QA commands and manual checks.',
      '- Use [[Issues/00 QA Backlog]] to turn findings into tickets or implementation passes.',
      '',
      '## Product Module Graph',
      '',
      moduleGraph(),
      '',
      '## Route Family Preview',
      '',
      routeGraph(routes),
      '',
      '## Core Flows',
      '',
      flowDefinitions.map((flow) => `- ${wiki(`Flows/${flow.name}`, flow.name)}`).join('\n'),
      '',
      '## Module Notes',
      '',
      moduleDefinitions.map((module) => `- ${wiki(`Modules/${module.name}`, module.name)}`).join('\n'),
      '',
    ].join('\n'),
  );

  await writeFile(
    path.join(outputRoot, '01 Route Inventory.md'),
    [
      frontmatter({ type: 'route-inventory', generated: generatedAt, source: 'src/App.tsx', route_count: routes.length }),
      '# Route Inventory',
      '',
      `Generated from \`src/App.tsx\`. Route count: **${routes.length}**.`,
      '',
      mdTable(['#', 'Route', 'Module', 'Component', 'Source'], routeRows),
      '',
    ].join('\n'),
  );

  await writeFile(
    path.join(outputRoot, '02 Audit Runbook.md'),
    [
      frontmatter({ type: 'runbook', generated: generatedAt }),
      '# Audit Runbook',
      '',
      '## Automated Gates',
      '',
      'Run these before handing the app to developers or before a production deploy:',
      '',
      '```bash',
      'npm run build',
      'npm run lint',
      'npm run test:run',
      'npm run test:playwright',
      'git diff --check',
      '```',
      '',
      '## Manual QA Matrix',
      '',
      mdTable(
        ['Area', 'Desktop', 'Mobile', 'Keyboard', 'Accessibility', 'Data Integrity'],
        [
          ['Finance and Calculator', 'Steps, sticky nav, review, save, email', '390px and 642px result stack', 'Arrow keys, tab order, focus return', 'Tooltips, labels, reduced motion', 'APR, terms, trade, taxes, incentives'],
          ['Vehicle Detail', 'Hero, pricing, finance, lease, cash tabs', 'Payment module and ads', 'Tabs and form fields', 'Info tooltips and image alt states', 'Trim price and payment updates'],
          ['Deals and Incentives', 'Hub, filters, card grid, modals', 'Filter modal and active pills', 'Cards, chips, close actions', 'Badges not color-only', 'Offer math and route filters'],
          ['Account and Garage', 'Profile, saved, subscriptions', 'Sidebar drawer and tabs', 'Close, remove, open saved estimate', 'Focus trap and aria labels', 'Saved estimates and saved vehicles'],
          ['Vehicle Discovery', 'Browse, brands, rankings, compare', 'Cards and carousel overflow', 'Filters and compare controls', 'Headings, links, image fallback', 'Vehicle data and rankings'],
        ],
      ),
      '',
      '## Design System Checks',
      '',
      '- Use C/D cobalt for links, selected states, and primary actions only.',
      '- Use gray token borders for inactive cards and fields.',
      '- Keep card radii in the 4px to 8px range unless a component token says otherwise.',
      '- Preserve visible focus states, but avoid browser-default duplicate tooltips.',
      '- Vehicle and deal image failures must render text-only missing image states.',
      '',
      '## Obsidian Workflow',
      '',
      '1. Open `docs/obsidian-app-audit` as a vault.',
      '2. Start at [[00 App Map]].',
      '3. Open the graph view and filter by `type: module` or `type: flow`.',
      '4. Add findings to [[Issues/00 QA Backlog]] with P0-P3 severity.',
      '5. Link each issue back to a route, module, and flow note.',
      '',
    ].join('\n'),
  );

  const grouped = groupBy(routes, (route) => route.moduleName);
  for (const module of moduleDefinitions) {
    const moduleRoutes = grouped.get(module.name) ?? [];
    const relatedEdges = relationships.filter(([from, to]) => from === module.name || to === module.name);
    const relatedFlows = flowDefinitions.filter((flow) => flow.modules.includes(module.name));
    await writeFile(
      path.join(outputRoot, 'Modules', `${module.name}.md`),
      [
        frontmatter({ type: 'module', generated: generatedAt, routes: moduleRoutes.length }),
        `# ${module.name}`,
        '',
        module.description,
        '',
        '## Routes',
        '',
        moduleRoutes.length
          ? moduleRoutes.map((route) => `- ${wiki(`Routes/${route.noteName}`, route.route)} - \`${route.component}\``).join('\n')
          : '- No routes detected in this module.',
        '',
        '## Related Modules',
        '',
        relatedEdges.length
          ? relatedEdges.map(([from, to, label]) => {
              const other = from === module.name ? to : from;
              const direction = from === module.name ? 'outbound' : 'inbound';
              return `- ${wiki(`Modules/${other}`, other)} - ${direction}: ${label}`;
            }).join('\n')
          : '- No explicit module relationships documented yet.',
        '',
        '## Related Flows',
        '',
        relatedFlows.length
          ? relatedFlows.map((flow) => `- ${wiki(`Flows/${flow.name}`, flow.name)}`).join('\n')
          : '- No core flow mapped yet.',
        '',
        '## Audit Risks',
        '',
        module.risks.map((risk) => `- ${risk}`).join('\n'),
        '',
      ].join('\n'),
    );
  }

  for (const route of routes) {
    const relatedFlows = flowDefinitions.filter((flow) => flow.modules.includes(route.moduleName));
    await writeFile(
      path.join(outputRoot, 'Routes', `${route.noteName}.md`),
      [
        frontmatter({
          type: 'route',
          generated: generatedAt,
          route: route.route,
          module: route.moduleName,
          component: route.component,
        }),
        `# ${route.route}`,
        '',
        `Module: ${wiki(`Modules/${route.moduleName}`, route.moduleName)}`,
        '',
        `Component: \`${route.component}\``,
        '',
        `Source: \`${route.sourceFile}\``,
        '',
        route.routeExpression ? `Route constant or expression: \`${route.routeExpression}\`` : '',
        '',
        '## Audit Focus',
        '',
        routeAuditFocus(route),
        '',
        '## Related Flows',
        '',
        relatedFlows.length
          ? relatedFlows.map((flow) => `- ${wiki(`Flows/${flow.name}`, flow.name)}`).join('\n')
          : '- No core flow mapped yet.',
        '',
        '## Checks',
        '',
        '- Route loads without console errors.',
        '- Primary CTA path is clear and keyboard accessible.',
        '- No horizontal overflow at 390px, 768px, 1024px, and 1280px.',
        '- Page uses shared design tokens for borders, colors, typography, and focus states.',
        '',
      ].filter(Boolean).join('\n'),
    );
  }

  for (const flow of flowDefinitions) {
    await writeFile(
      path.join(outputRoot, 'Flows', `${flow.name}.md`),
      [
        frontmatter({ type: 'flow', generated: generatedAt, modules: flow.modules }),
        `# ${flow.name}`,
        '',
        flow.summary,
        '',
        '## Modules',
        '',
        flow.modules.map((module) => `- ${wiki(`Modules/${module}`, module)}`).join('\n'),
        '',
        '## QA Checkpoints',
        '',
        flow.checkpoints.map((checkpoint) => `- ${checkpoint}`).join('\n'),
        '',
        '## Finding Template',
        '',
        '```md',
        '- [ ] P? - Issue title',
        '  - Route: [[Routes/...]]',
        '  - Module: [[Modules/...]]',
        '  - Impact:',
        '  - Evidence:',
        '  - Recommendation:',
        '```',
        '',
      ].join('\n'),
    );
  }

  await writeFile(
    path.join(outputRoot, 'Issues', '00 QA Backlog.md'),
    [
      frontmatter({ type: 'issue-backlog', generated: generatedAt }),
      '# QA Backlog',
      '',
      'Use this as the Obsidian issue collector during the audit. Keep each finding linked to a route, module, and flow.',
      '',
      '## P0 Blocking',
      '',
      '- [ ] Add findings here.',
      '',
      '## P1 Major',
      '',
      '- [ ] Add findings here.',
      '',
      '## P2 Minor',
      '',
      '- [ ] Add findings here.',
      '',
      '## P3 Polish',
      '',
      '- [ ] Add findings here.',
      '',
      '## Known High-Risk Areas To Check First',
      '',
      '- [[Modules/Finance and Calculator]] finance math, keyboard navigation, sticky nav, motion direction, and mobile result stack.',
      '- [[Modules/Vehicle Detail]] payment calculator tabs, trim selection, image fallback, ads, and inventory CTA paths.',
      '- [[Modules/Deals and Incentives]] route filters, deal cards, offer details, and save state.',
      '- [[Modules/Account and Garage]] saved estimates, saved vehicles, sidebar tabs, and focus management.',
      '- [[Modules/Vehicle Discovery]] browse filters, card carousels, and no-horizontal-overflow behavior.',
      '',
    ].join('\n'),
  );
}

const routeConstants = extractDealRouteConstants(dealRouteSource);
const lazyImports = extractLazyImports(appSource);
const routes = extractRoutes(appSource, routeConstants, lazyImports);
await writeObsidianAudit(routes);

console.log(`Generated ${routes.length} route notes in ${path.relative(root, outputRoot)}`);
