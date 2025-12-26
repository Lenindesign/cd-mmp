import{H as l}from"./Hero-BeNz9at9.js";import"./iframe-DbH_ucHO.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DsqcyNHv.js";import"./index-BIJ_Z0xc.js";import"./Button-BVWKAUS5.js";import"./OptimizedImage-BBT9CLPs.js";import"./chevron-down-CqR443Fw.js";import"./createLucideIcon-Du2TAp2n.js";import"./bookmark-D6RNGxcZ.js";import"./arrow-right-Cfz6cHVz.js";import"./chevron-left-BGf_hjP4.js";import"./chevron-right-CawSpziu.js";import"./image-Cuj_vFJR.js";const T={title:"Organisms/Hero",component:l,parameters:{layout:"fullscreen",docs:{description:{component:`
# Hero Section

## Overview

The Hero is the primary above-the-fold component on every Vehicle Detail Page (VDP). It's the first thing users see and sets the tone for their research journey.

---

## Business Purpose

| Goal | How Hero Achieves It |
|------|---------------------|
| First Impression | High-quality imagery and clear vehicle identity |
| Trust Building | C/D ratings and accolades establish credibility |
| Lead Generation | Shop New/Used CTAs drive dealer connections |
| Year Navigation | Dropdown helps users find the right model year |

---

## Key Metrics

- **CTA Click Rate** — Shop New vs Shop Used vs Trade-In
- **Gallery Engagement** — Slides viewed per session
- **Year Selector Usage** — How often users switch years
- **Time on Component** — Engagement before scrolling

---

## Component Elements

| Element | Purpose | Business Impact |
|---------|---------|-----------------|
| Vehicle Title | Year/Make/Model identification | SEO, user orientation |
| Rating Badge | C/D expert score (1-10) | Trust, credibility |
| Image Gallery | Visual showcase with thumbnails | Engagement, time on page |
| MSRP Range | Price transparency | Purchase intent qualification |
| Shop CTAs | Lead generation buttons | Dealer revenue |
| Accolades | Editor's Choice / 10Best badges | Trust signals, differentiation |
| Favorites | Save to account | User retention, personalization |

---

## Accolades System

Accolades appear when vehicles earn editorial recognition:

- **Editor's Choice** — Vehicles that excel in their segment
- **10Best** — Annual top picks across categories
- **EV of the Year** — Best electric vehicle (when applicable)

These badges increase user trust and can improve conversion rates.

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| Desktop (>938px) | Side-by-side layout, horizontal CTAs |
| Tablet (768-938px) | Stacked layout begins |
| Mobile (<768px) | Full-width stacked, centered CTAs |

---

## Product Considerations

**A/B Testing Opportunities**
- CTA button text variations
- Animated vs static buttons
- Accolade badge placement

**Data Requirements**
- Vehicle database must include rating, pricing, images
- Accolades require editorial flags in CMS

**Dependencies**
- Image CDN for gallery photos
- Vehicle service for year availability
        `}}},tags:["autodocs"],argTypes:{vehicle:{description:"Vehicle data object containing all display information",control:"object",table:{type:{summary:"VehicleData",detail:`{
  make: string;
  model: string;
  year: number;
  tagline: string;
  rating: number;
  priceRange: string;
  image: string;
  galleryImages?: string[];
  photographer?: string;
  editorsChoice?: boolean;
  tenBest?: boolean;
  evOfTheYear?: boolean;
}`},category:"Data"}},animateButtons:{description:"Enable entrance animations on shop buttons",control:"boolean",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Animation"}}}},e={make:"Chevrolet",model:"Trax",year:2025,tagline:"The Chevrolet Trax offers excellent value and modern features. A compelling choice in the subcompact SUV segment.",rating:10,priceRange:"$20,400 - $24,400",image:"https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg",galleryImages:["https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg","https://d2kde5ohu8qb21.cloudfront.net/files/66466c171a38f50008ca1b6e/009-2025-chevrolet-trax-exterior-side-view.jpg","https://d2kde5ohu8qb21.cloudfront.net/files/66466c139cbba1000852d79d/008-2025-chevrolet-trax-exterior-front-view.jpg","https://d2kde5ohu8qb21.cloudfront.net/files/66466c1e811993000831eb00/012-2025-chevrolet-trax-exterior-front-view.jpg","https://d2kde5ohu8qb21.cloudfront.net/files/66466c246e89190008af75b5/014-2025-chevrolet-trax-exterior-rear-view.jpg","https://d2kde5ohu8qb21.cloudfront.net/files/66466c05811993000831eaff/001-2025-chevrolet-trax-exterior-front-view.jpg"],photographer:"CAR AND DRIVER",editorsChoice:!0,tenBest:!0},t={args:{vehicle:e},parameters:{docs:{description:{story:"Default Hero with a featured vehicle displaying both Editor's Choice and 10Best accolades."}}}},n={args:{vehicle:{...e,editorsChoice:!1,tenBest:!0}},parameters:{docs:{description:{story:"Hero displaying only the 10Best badge in the accolades section."}}}},r={args:{vehicle:{...e,editorsChoice:!0,tenBest:!0}},parameters:{docs:{description:{story:"Hero displaying both Editor's Choice and 10Best badges together."}}}},a={args:{vehicle:{...e,editorsChoice:!0,tenBest:!0,evOfTheYear:!0}},parameters:{docs:{description:{story:"Hero displaying all three accolades: Editor's Choice, EV of the Year, and 10Best."}}}},o={args:{vehicle:{...e,editorsChoice:!1,tenBest:!1,evOfTheYear:!0}},parameters:{docs:{description:{story:"Hero displaying only the EV of the Year badge."}}}},s={args:{vehicle:{...e,editorsChoice:!1,tenBest:!1}},parameters:{docs:{description:{story:"Hero without any accolades. The accolades section is hidden when no awards are present."}}}},i={args:{vehicle:{make:"Chevrolet",model:"Trailblazer",year:2024,tagline:"The Chevrolet Trailblazer delivers style and versatility with excellent value.",rating:7.5,priceRange:"$24,995 - $31,895",image:"https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg",galleryImages:["https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg","https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9cc1a540008a57c2c/002-2024-chevrolet-trailblazer-front-view.jpg"],photographer:"CAR AND DRIVER",editorsChoice:!1,tenBest:!1}},parameters:{docs:{description:{story:"Hero for a different SUV model demonstrating flexibility with various vehicle data."}}}},c={args:{vehicle:e,animateButtons:!0},parameters:{docs:{description:{story:`
## Animated Shop Buttons

Hero with animated shop buttons that fade and slide in when scrolled into view. This creates a more engaging user experience and draws attention to the CTAs.

---

### How It Works

The animation uses the **Intersection Observer API** to detect when buttons enter the viewport, then triggers a staggered CSS animation.

---

### Implementation Steps

#### 1. Add State and Refs

\`\`\`tsx
const [buttonsInView, setButtonsInView] = useState(false);
const buttonsRef = useRef<HTMLDivElement>(null);
\`\`\`

#### 2. Set Up Intersection Observer

\`\`\`tsx
useEffect(() => {
  if (!animateButtons || !buttonsRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setButtonsInView(true);
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% visible
  );

  observer.observe(buttonsRef.current);
  return () => observer.disconnect();
}, [animateButtons]);
\`\`\`

#### 3. Apply Conditional Classes

\`\`\`tsx
<div 
  ref={buttonsRef}
  className={\`hero__shop-buttons \${
    animateButtons 
      ? (buttonsInView ? 'hero__shop-buttons--animated' : 'hero__shop-buttons--hidden') 
      : ''
  }\`}
>
  <Button className={\`hero__shop-btn \${animateButtons && buttonsInView ? 'hero__shop-btn--animate-1' : ''}\`}>
    SHOP NEW
  </Button>
  <Button className={\`hero__shop-btn \${animateButtons && buttonsInView ? 'hero__shop-btn--animate-2' : ''}\`}>
    SHOP USED
  </Button>
  <Button className={\`hero__shop-btn \${animateButtons && buttonsInView ? 'hero__shop-btn--animate-3' : ''}\`}>
    GET YOUR TRADE-IN VALUE
  </Button>
</div>
\`\`\`

#### 4. CSS Animation Keyframes

\`\`\`css
/* Button Load Animation */
@keyframes buttonFadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hide buttons until in view when animation is enabled */
.hero__shop-buttons--hidden .hero__shop-btn {
  opacity: 0;
}

.hero__shop-buttons--animated .hero__shop-btn {
  opacity: 0;
  animation: buttonFadeSlideIn 0.5s ease-out forwards;
}

/* Staggered animation delays */
.hero__shop-btn--animate-1 {
  animation-delay: 0.3s !important;
}

.hero__shop-btn--animate-2 {
  animation-delay: 0.45s !important;
}

.hero__shop-btn--animate-3 {
  animation-delay: 0.6s !important;
}
\`\`\`

---

### Animation Properties

| Property | Value | Purpose |
|----------|-------|---------|
| Duration | 0.5s | Quick but noticeable |
| Easing | ease-out | Natural deceleration |
| Transform | translateY(10px) → 0 | Subtle slide up effect |
| Opacity | 0 → 1 | Fade in |
| Stagger | 150ms between buttons | Sequential reveal |

---

### When to Use

- ✅ Landing pages where CTAs need emphasis
- ✅ A/B testing engagement improvements
- ✅ First-time visitor experiences
- ❌ Returning users who expect immediate interaction
- ❌ Performance-critical mobile experiences

---

### Accessibility Considerations

- Animation respects \`prefers-reduced-motion\` media query
- Buttons remain functional even if animation fails
- Focus states work independently of animation state
        `}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: chevroletTrax
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Hero with a featured vehicle displaying both Editor\\'s Choice and 10Best accolades.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      ...chevroletTrax,
      editorsChoice: false,
      tenBest: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero displaying only the 10Best badge in the accolades section.'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      ...chevroletTrax,
      editorsChoice: true,
      tenBest: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero displaying both Editor\\'s Choice and 10Best badges together.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      ...chevroletTrax,
      editorsChoice: true,
      tenBest: true,
      evOfTheYear: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero displaying all three accolades: Editor\\'s Choice, EV of the Year, and 10Best.'
      }
    }
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      ...chevroletTrax,
      editorsChoice: false,
      tenBest: false,
      evOfTheYear: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero displaying only the EV of the Year badge.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      ...chevroletTrax,
      editorsChoice: false,
      tenBest: false
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero without any accolades. The accolades section is hidden when no awards are present.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      make: 'Chevrolet',
      model: 'Trailblazer',
      year: 2024,
      tagline: 'The Chevrolet Trailblazer delivers style and versatility with excellent value.',
      rating: 7.5,
      priceRange: '$24,995 - $31,895',
      image: 'https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg',
      galleryImages: ['https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg', 'https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9cc1a540008a57c2c/002-2024-chevrolet-trailblazer-front-view.jpg'],
      photographer: 'CAR AND DRIVER',
      editorsChoice: false,
      tenBest: false
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero for a different SUV model demonstrating flexibility with various vehicle data.'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: chevroletTrax,
    animateButtons: true
  },
  parameters: {
    docs: {
      description: {
        story: \`
## Animated Shop Buttons

Hero with animated shop buttons that fade and slide in when scrolled into view. This creates a more engaging user experience and draws attention to the CTAs.

---

### How It Works

The animation uses the **Intersection Observer API** to detect when buttons enter the viewport, then triggers a staggered CSS animation.

---

### Implementation Steps

#### 1. Add State and Refs

\\\`\\\`\\\`tsx
const [buttonsInView, setButtonsInView] = useState(false);
const buttonsRef = useRef<HTMLDivElement>(null);
\\\`\\\`\\\`

#### 2. Set Up Intersection Observer

\\\`\\\`\\\`tsx
useEffect(() => {
  if (!animateButtons || !buttonsRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setButtonsInView(true);
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% visible
  );

  observer.observe(buttonsRef.current);
  return () => observer.disconnect();
}, [animateButtons]);
\\\`\\\`\\\`

#### 3. Apply Conditional Classes

\\\`\\\`\\\`tsx
<div 
  ref={buttonsRef}
  className={\\\`hero__shop-buttons \\\${
    animateButtons 
      ? (buttonsInView ? 'hero__shop-buttons--animated' : 'hero__shop-buttons--hidden') 
      : ''
  }\\\`}
>
  <Button className={\\\`hero__shop-btn \\\${animateButtons && buttonsInView ? 'hero__shop-btn--animate-1' : ''}\\\`}>
    SHOP NEW
  </Button>
  <Button className={\\\`hero__shop-btn \\\${animateButtons && buttonsInView ? 'hero__shop-btn--animate-2' : ''}\\\`}>
    SHOP USED
  </Button>
  <Button className={\\\`hero__shop-btn \\\${animateButtons && buttonsInView ? 'hero__shop-btn--animate-3' : ''}\\\`}>
    GET YOUR TRADE-IN VALUE
  </Button>
</div>
\\\`\\\`\\\`

#### 4. CSS Animation Keyframes

\\\`\\\`\\\`css
/* Button Load Animation */
@keyframes buttonFadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hide buttons until in view when animation is enabled */
.hero__shop-buttons--hidden .hero__shop-btn {
  opacity: 0;
}

.hero__shop-buttons--animated .hero__shop-btn {
  opacity: 0;
  animation: buttonFadeSlideIn 0.5s ease-out forwards;
}

/* Staggered animation delays */
.hero__shop-btn--animate-1 {
  animation-delay: 0.3s !important;
}

.hero__shop-btn--animate-2 {
  animation-delay: 0.45s !important;
}

.hero__shop-btn--animate-3 {
  animation-delay: 0.6s !important;
}
\\\`\\\`\\\`

---

### Animation Properties

| Property | Value | Purpose |
|----------|-------|---------|
| Duration | 0.5s | Quick but noticeable |
| Easing | ease-out | Natural deceleration |
| Transform | translateY(10px) → 0 | Subtle slide up effect |
| Opacity | 0 → 1 | Fade in |
| Stagger | 150ms between buttons | Sequential reveal |

---

### When to Use

- ✅ Landing pages where CTAs need emphasis
- ✅ A/B testing engagement improvements
- ✅ First-time visitor experiences
- ❌ Returning users who expect immediate interaction
- ❌ Performance-critical mobile experiences

---

### Accessibility Considerations

- Animation respects \\\`prefers-reduced-motion\\\` media query
- Buttons remain functional even if animation fails
- Focus states work independently of animation state
        \`
      }
    }
  }
}`,...c.parameters?.docs?.source}}};const A=["Default","WithTenBest","WithBothAwards","WithAllAwards","WithEVOfTheYear","NoAwards","SUV","WithAnimatedButtons"];export{t as Default,s as NoAwards,i as SUV,a as WithAllAwards,c as WithAnimatedButtons,r as WithBothAwards,o as WithEVOfTheYear,n as WithTenBest,A as __namedExportsOrder,T as default};
