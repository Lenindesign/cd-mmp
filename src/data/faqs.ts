/**
 * Shared FAQ content for the deal-related pages.
 *
 * These arrays power the FAQ accordions on:
 * - Best Buying Deals hub (`/deals/best-buying-deals`)
 * - 0% APR deals page (`/deals/0-percent-apr`)
 * - Lease deals page (`/deals/lease`)
 *
 * They are exported so that Storybook stories can render the same content
 * without duplicating copy. Keep wording in sync with SEO-approved strings;
 * this is also the source used by `createFAQStructuredData` on each page.
 */

export type FaqItem = {
  question: string;
  answer: string;
  bullets?: string[];
};

export const ZERO_APR_FAQ: FaqItem[] = [
  {
    question: 'What cars are 0% financing right now?',
    answer:
      '0% APR offers are real, but they usually apply only to certain new models, trims, and loan terms for a limited time. The list changes month to month, so the right way to shop is to check the exact model year, term length, and ZIP-code availability instead of assuming an entire brand has 0% financing.\n\nA strong 0% offer is not just about the rate. Shoppers should also check whether the deal applies to the trim they actually want, whether inventory is available nearby, and whether taking the offer means giving up cash rebates or other incentives.',
    bullets: [
      'Filter by model, trim, and term, not just by brand.',
      'Confirm whether the offer is national, regional, or dealer specific.',
      'Check whether bonus cash can be combined with the 0% APR program.',
      'Look at real inventory before building your budget around an ad.',
    ],
  },
  {
    question: 'Can I get 0% interest on a car loan?',
    answer:
      'Yes, but usually only if you have excellent credit and the vehicle qualifies for a manufacturer-backed promotional offer. Most 0% APR deals are aimed at well-qualified buyers and often come with shorter terms, such as 36 or 48 months, rather than the longest loan options.\n\nBefore assuming you qualify, check your credit, read the fine print, and ask whether the offer must be financed through the manufacturer\u2019s captive lender. Even a real 0% deal may not be the best fit if the required monthly payment is too high for your budget.',
    bullets: [
      'Expect top-tier credit requirements on most 0% offers.',
      'Read the term length, residency rules, and model restrictions carefully.',
      'Ask whether you must finance through the manufacturer\u2019s lender to get the promo.',
      'Compare the 0% offer against a rebate or low-APR alternative.',
    ],
  },
  {
    question: 'Are 0% car deals really free?',
    answer:
      'A 0% APR car loan does mean you are not paying finance charges on the amount borrowed, so the interest itself is effectively free. But that does not automatically make the deal the cheapest overall option, because many 0% offers require shorter terms, stronger credit, or giving up a cash rebate.\n\nThe real comparison is total cost. On a large loan, 0% APR can save a shopper thousands in interest, but a rebate plus standard financing can still win if the cash offer is large enough or if the shorter 0% term makes the monthly payment too aggressive.',
    bullets: [
      'Compare total loan cost, not just the APR shown in the ad.',
      'Check whether 0% financing replaces cash back or bonus cash.',
      'Watch for add-ons in the finance office that can erase the savings.',
      'Make sure the monthly payment still fits your budget comfortably.',
    ],
  },
  {
    question: 'Can you negotiate 0% financing when buying a new car?',
    answer:
      'Sometimes, but the 0% rate itself is usually a manufacturer program rather than something the dealer invents. What you can often negotiate is the selling price, dealer fees, trade-in value, add-ons, and which incentive structure makes the most sense for your budget.\n\nIn practice, the best move is to negotiate the vehicle price first and then compare two versions of the deal side by side: one with 0% APR and one with the best available rebate or discount. That makes it much easier to see which deal is actually stronger.',
    bullets: [
      'Negotiate the out-the-door price separately from the financing offer.',
      'Ask for side-by-side quotes: 0% APR versus rebate plus standard rate.',
      'Be careful with products and add-ons that raise the financed amount.',
      'Confirm that the promotional rate still applies after the final terms are set.',
    ],
  },
  {
    question: 'What is the payment on a $30,000 car at 0% APR for 60 months?',
    answer:
      'At 0% APR for 60 months, a $30,000 loan works out to a base payment of $500 per month because you are simply dividing the amount financed by the number of months. That number rises if you roll taxes, title, registration, doc fees, or add-ons into the financed amount.\n\nThat simple math is one reason 0% deals are attractive: every payment dollar goes toward principal. But it also shows why some shoppers still need to be careful, because even with no interest, the monthly payment has to be high enough to clear the balance inside the promotional term.',
    bullets: [
      'Base math is $30,000 divided by 60 months, or $500 before taxes and fees.',
      'Add all out-the-door costs to estimate the real financed amount.',
      'Compare 36-, 48-, and 60-month terms before choosing the promo.',
      'Do not stretch your budget just because the APR is 0%.',
    ],
  },
  {
    question: 'Which cars have the lowest interest rates right now?',
    answer:
      'The lowest-rate vehicles are usually the same models backed by manufacturer subvented financing, sometimes at 0% APR and sometimes at 0.9% or 1.9% for longer terms. The best low-rate offer changes frequently, so shoppers should look at the exact model, trim, and loan term rather than only the brand name.\n\nA near-zero APR deal can actually be more practical than forcing a 0% offer if it comes with a longer term, more available inventory, or the ability to keep a rebate. The better deal is the one with the lower total cost and the payment that still fits your budget.',
    bullets: [
      'Check loan term length, not just the APR headline.',
      'Compare 0%, 0.9%, and 1.9% offers on the exact trim you want.',
      'Verify whether low APR can be combined with bonus cash.',
      'Make sure the offer is available in your ZIP code and on in-stock vehicles.',
    ],
  },
];

export const BEST_BUYING_FAQ: FaqItem[] = [
  {
    question: 'What does a $1,000 car rebate mean?',
    answer:
      'A $1,000 car rebate usually means the manufacturer, government, or another incentive program is offering $1,000 in savings if you meet the eligibility rules. In some cases the money comes off the transaction at the dealership, while in others you claim the benefit later.\n\nThe important nuance is what kind of rebate it is. Customer cash, dealer cash, EV rebates, and tax credits all work differently, and some stack with other offers while others replace special financing or lease programs.',
    bullets: [
      'Ask whether the rebate is applied at point of sale or claimed later.',
      'Confirm whether it stacks with dealer discounts, low APR financing, or lease specials.',
      'Check ZIP code, trim, and VIN eligibility before counting the savings.',
      'Read the expiration date and fine print carefully.',
    ],
  },
  {
    question: 'Can you negotiate a new-car price if there are already incentives?',
    answer:
      'Yes. Manufacturer incentives and rebates do not automatically mean the negotiated selling price is final. In many cases you can still negotiate the vehicle price, shop one dealer quote against another, and push for a better out-the-door number.\n\nThe key is to separate the deal into layers: vehicle price, dealer fees, trade-in value, financing, and incentives. That makes it easier to see whether the rebate is actually lowering your cost or just making an average deal sound better in the ad.',
    bullets: [
      'Ask for the out-the-door price before discussing monthly payment.',
      'Separate dealer discount from manufacturer rebate on the quote sheet.',
      'Compare written quotes, not verbal promises.',
      'Watch for add-ons that can erase the savings in the finance office.',
    ],
  },
  {
    question: 'What monthly payment should you expect on a $30,000 to $40,000 car?',
    answer:
      'The monthly payment depends more on down payment, interest rate, and loan term than on the sticker price alone. On the same $30,000 to $40,000 vehicle, stretching the loan term can lower the payment, but it can also raise the total amount you pay over time.\n\nIncentives matter because a rebate lowers the amount financed, while a low APR lowers finance charges. The most useful way to judge affordability is to compare full loan cost and total financed amount, not just chase the lowest monthly number on the worksheet.',
    bullets: [
      'Run the payment at 48, 60, and 72 months before deciding what is realistic.',
      'Include taxes, registration, doc fees, and any trade-in payoff in the estimate.',
      'A lower payment can still be a worse deal if the term is much longer.',
      'Use incentives to reduce either the amount financed or the interest cost.',
    ],
  },
  {
    question: 'What credit score do you need to buy a $30,000 car?',
    answer:
      'There is no universal score required to buy a $30,000 car. Approval depends on the full deal: your credit score, income, current debts, down payment, trade-in equity, and the lender\u2019s own rules. Better credit usually means lower rates and more flexibility, but buyers with average credit can still get approved.\n\nThe more important question is whether the payment fits your budget at the rate you actually qualify for. A buyer with weaker credit may still get the car, but the higher APR can make the same vehicle much less affordable month to month.',
    bullets: [
      'Check your credit before shopping so you know which offers are realistic.',
      'Compare lender preapprovals instead of relying only on dealer-arranged financing.',
      'A bigger down payment can improve approval odds and reduce the payment.',
      'Watch the APR as closely as the monthly payment.',
    ],
  },
  {
    question: 'When is the best time to shop for new car incentives?',
    answer:
      'The best time to shop is usually when dealers or manufacturers are trying to move inventory. That often means end of month, end of quarter, holiday weekends, and especially the point when outgoing model-year vehicles are still on the lot and need help selling.\n\nTiming helps, but inventory matters just as much. A model with too much stock usually gets better incentives than a hot-selling vehicle with tight supply, even if you shop on a traditionally strong car-buying weekend.',
    bullets: [
      'Watch for model-year changeovers and aging inventory.',
      'Compare end-of-month offers against end-of-quarter offers on the same vehicle.',
      'Do not wait for a perfect date if the pricing already works for your budget.',
      'Confirm whether the incentive expires before you can actually take delivery.',
    ],
  },
  {
    question: 'Which cars qualify for tax credits and rebates?',
    answer:
      'Eligibility depends on the exact program. Some incentives are manufacturer rebates that apply to most shoppers on eligible inventory, while tax credits and state EV programs may depend on the vehicle\u2019s VIN, assembly or battery rules, MSRP cap, buyer income, and where the car is registered.\n\nThe safest approach is to verify the exact trim and VIN before you count the savings in your budget. Even within one model line, one version may qualify while another does not, and program rules can change faster than dealer ad copy.',
    bullets: [
      'Check whether the program is federal, state, utility, or manufacturer based.',
      'Verify model year, trim, MSRP, and ZIP-code rules before signing.',
      'Ask whether the savings is applied at purchase or claimed later when filing taxes.',
      'Save the VIN and program terms in writing if the credit affects your budget.',
    ],
  },
];

export const LEASE_FAQ: FaqItem[] = [
  {
    question: 'Can you lease a car with no money down?',
    answer:
      'Yes, you can lease a car with no money down, but that usually means more of the upfront cost gets pushed into the monthly payment. In many offers, taxes, registration, acquisition fees, or even the first payment are still due at signing unless the ad specifically says everything is rolled in.\n\nA zero-down lease can help preserve cash and may be safer than putting a large amount upfront if the vehicle is stolen or totaled early in the term. But it is not automatically the cheapest option, so the smarter comparison is total lease cost over the full term, not just what is due on day one.',
    bullets: [
      'Verify whether "$0 down" also means "$0 due at signing."',
      'Compare total paid over the full 24- or 36-month term, not just the headline payment.',
      'Ask whether taxes, acquisition fee, and registration are included or rolled into the payment.',
      'Check mileage limits and end-of-lease fees before signing.',
    ],
  },
  {
    question: 'What credit score do you need to lease a car?',
    answer:
      'There is no single minimum credit score for every lease, but the best advertised lease specials usually go to shoppers with strong, top-tier credit. A 650 score may qualify with some lenders, while a 500 score is much tougher and often means fewer vehicle choices, a larger amount due at signing, or the need for a co-signer.\n\nDealers and lenders also look beyond the score itself. Income, debt, prior auto history, payment history, and stability all affect approval, so shoppers should assume the headline lease payment is built for well-qualified customers unless the fine print says otherwise.',
    bullets: [
      'Ask whether the advertised payment assumes top-tier credit.',
      'Bring proof of income and be ready to explain recent credit issues if needed.',
      'A trade-in, larger upfront payment, or co-signer can improve approval odds.',
      'If approval is tight, compare the lease against a lower-priced model or a used-car loan.',
    ],
  },
  {
    question: 'Can you really lease a car for $200 to $300 a month?',
    answer:
      'Sometimes, yes, but usually only on smaller, lower-trim vehicles or outgoing inventory with strong incentives. The lowest advertised lease payments often assume top-tier credit, limited annual mileage, a short term, and some money due at signing.\n\nThe more useful question is not just whether a $199 or $299 payment exists, but what you are giving up to get it. A slightly higher payment with lower drive-off costs, more realistic mileage, or fewer fees can easily be the better deal for a real shopper.',
    bullets: [
      'Check the amount due at signing before comparing monthly payments.',
      'Confirm mileage allowance, taxes, registration, and dealer fees.',
      'Expect payments to rise quickly on higher trims or popular option packages.',
      'Remember that lease offers change by ZIP code, inventory, and month.',
    ],
  },
  {
    question: 'Can you negotiate a car lease?',
    answer:
      'Yes, parts of a lease are negotiable, especially the selling price of the vehicle, the trade-in value, and sometimes certain end-of-lease fees. The pieces with the least flexibility are usually lender-set items such as residual value and acquisition fee.\n\nThe smartest way to negotiate a lease is to work the deal in layers. Nail down the vehicle price first, then review how the payment is built, because a dealer can make the monthly number look lower by extending the term or moving costs into the upfront amount.',
    bullets: [
      'Focus on cap cost, money due at signing, mileage allowance, and disposition fee.',
      'Ask for an itemized lease worksheet instead of discussing only the monthly payment.',
      'Compare quotes from more than one dealer, especially near month-end or quarter-end.',
      'Read the final contract closely to make sure it matches the quote.',
    ],
  },
  {
    question: 'What are the biggest downsides and red flags in a car lease?',
    answer:
      'The biggest downside to leasing is that you keep making payments without building ownership equity. A lease can look affordable at first, but excess-mileage charges, wear-and-tear bills, disposition fees, insurance requirements, and early termination costs can make it more expensive than shoppers expect.\n\nThe biggest red flags are vague fees, low headline payments tied to large upfront costs, unrealistic mileage caps, and numbers that change when the contract shows up. If the dealer cannot clearly explain every fee on the worksheet, that is a warning sign by itself.',
    bullets: [
      'Match the mileage limit to how you really drive, not how the ad is structured.',
      'Ask how wear-and-tear, tire damage, and excess mileage are billed at turn-in.',
      'Confirm whether gap coverage is included and what happens if you end the lease early.',
      'Compare the signed contract against the original quote line by line.',
    ],
  },
  {
    question: 'Is it better to lease or buy a car?',
    answer:
      'Leasing is usually better for shoppers who want a lower monthly payment, a newer car every few years, and less interest in long-term ownership. Buying is usually better if you drive a lot, want to keep the vehicle after the loan is paid off, or want the freedom to customize and build equity.\n\nFor most shoppers, the real difference is time horizon. If you swap vehicles often, a strong lease can make sense. If you keep cars for years, buying usually wins on long-term value because the payment eventually ends and the car is still yours.',
    bullets: [
      'Lease if lower payment and short commitment matter most.',
      'Buy if you want long-term value, no mileage limits, and ownership flexibility.',
      'Compare 3-year out-of-pocket cost against 6- to 8-year ownership cost.',
      'Check insurance, fees, residual value, and the lease buyout option before deciding.',
    ],
  },
];
