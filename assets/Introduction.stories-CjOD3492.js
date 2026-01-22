import{j as e}from"./iframe-CUg71BSt.js";import"./preload-helper-PPVm8Dsz.js";const t={title:"Introduction",parameters:{layout:"fullscreen",options:{showPanel:!1},docs:{description:{component:"Welcome to the Car and Driver Design System documentation."}}},tags:["autodocs"]},o={name:"Design System",parameters:{chromatic:{disableSnapshot:!0}},render:()=>e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
          .docs-container {
            max-width: 720px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
            color: #1d1d1f;
            -webkit-font-smoothing: antialiased;
            padding: 0 24px;
          }
          
          .docs-header {
            padding: 80px 0 64px;
            border-bottom: 1px solid #d2d2d7;
            margin-bottom: 64px;
          }
          
          .docs-eyebrow {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #86868b;
            margin-bottom: 16px;
          }
          
          .docs-header h1 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 48px;
            font-weight: 600;
            letter-spacing: -0.02em;
            line-height: 1.1;
            margin: 0 0 24px 0;
            color: #1d1d1f;
          }
          
          .docs-header p {
            font-size: 21px;
            font-weight: 400;
            line-height: 1.5;
            color: #424245;
            margin: 0;
            max-width: 560px;
          }
          
          .docs-section {
            margin-bottom: 80px;
          }
          
          .docs-section-title {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.015em;
            color: #1d1d1f;
            margin: 0 0 12px 0;
          }
          
          .docs-section-subtitle {
            font-size: 17px;
            color: #86868b;
            margin: 0 0 40px 0;
            line-height: 1.5;
          }
          
          .docs-card-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          
          @media (max-width: 600px) {
            .docs-card-grid {
              grid-template-columns: 1fr;
            }
          }
          
          .docs-card {
            background: #f5f5f7;
            padding: 32px;
            text-decoration: none;
            color: inherit;
            display: block;
            transition: background 0.2s ease;
          }
          
          .docs-card:hover {
            background: #e8e8ed;
          }
          
          .docs-card h3 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 19px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #1d1d1f;
          }
          
          .docs-card p {
            font-size: 14px;
            color: #86868b;
            margin: 0;
            line-height: 1.5;
          }
          
          .docs-principles {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1px;
            background: #d2d2d7;
            border: 1px solid #d2d2d7;
          }
          
          @media (max-width: 600px) {
            .docs-principles {
              grid-template-columns: 1fr;
            }
          }
          
          .docs-principle {
            padding: 32px;
            background: #fff;
          }
          
          .docs-principle h4 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 17px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #1d1d1f;
          }
          
          .docs-principle p {
            font-size: 14px;
            color: #86868b;
            margin: 0;
            line-height: 1.5;
          }
          
          .docs-token-row {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px 0;
            border-bottom: 1px solid #e8e8ed;
          }
          
          .docs-color-swatch {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            flex-shrink: 0;
            border: 1px solid #e8e8ed;
          }
          
          .docs-token-name {
            font-size: 14px;
            font-weight: 500;
            color: #1d1d1f;
          }
          
          .docs-token-value {
            font-size: 13px;
            color: #86868b;
            font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          }
          
          .docs-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .docs-list li {
            font-size: 14px;
            color: #424245;
            padding: 8px 0;
            border-bottom: 1px solid #f5f5f7;
          }
          
          .docs-footer {
            padding: 48px 0;
            border-top: 1px solid #e8e8ed;
            text-align: center;
            color: #86868b;
            font-size: 12px;
            letter-spacing: 0.01em;
          }
          
          /* Animated Logo Styles */
          .intro-logo {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .intro-logo:hover {
            transform: scale(1.02);
          }
          
          .intro-logo path {
            opacity: 0;
          }
          
          .intro-logo-letter {
            transform: scale(0.3);
            transform-origin: center center;
            animation: introLetterScaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .intro-logo-bar {
            transform: scaleX(0);
            transform-origin: left center;
            animation: introBarReveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          /* Animation delays for each path */
          .intro-logo path:nth-child(1) { animation-delay: 0.05s; }   /* C */
          .intro-logo path:nth-child(2) { animation-delay: 0.1s; }    /* A */
          .intro-logo path:nth-child(3) { animation-delay: 0.15s; }   /* R */
          .intro-logo path:nth-child(4) { animation-delay: 0.2s; }    /* Red bar */
          .intro-logo path:nth-child(5) { animation-delay: 0.25s; }   /* Blue bar */
          .intro-logo path:nth-child(6) { animation-delay: 0.3s; }    /* A (AND) */
          .intro-logo path:nth-child(7) { animation-delay: 0.32s; }   /* N (AND) */
          .intro-logo path:nth-child(8) { animation-delay: 0.34s; }   /* D (AND) */
          .intro-logo path:nth-child(9) { animation-delay: 0.4s; }    /* D */
          .intro-logo path:nth-child(10) { animation-delay: 0.45s; }  /* R */
          .intro-logo path:nth-child(11) { animation-delay: 0.5s; }   /* I */
          .intro-logo path:nth-child(12) { animation-delay: 0.55s; }  /* V */
          .intro-logo path:nth-child(13) { animation-delay: 0.6s; }   /* E */
          .intro-logo path:nth-child(14) { animation-delay: 0.65s; }  /* R */
          
          @keyframes introLetterScaleIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            60% {
              opacity: 1;
              transform: scale(1.08);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes introBarReveal {
            0% {
              opacity: 0;
              transform: scaleX(0);
            }
            60% {
              opacity: 1;
              transform: scaleX(1.05);
            }
            100% {
              opacity: 1;
              transform: scaleX(1);
            }
          }
        `}),e.jsxs("div",{className:"docs-container",children:[e.jsxs("div",{className:"docs-header",children:[e.jsx("div",{className:"docs-eyebrow",children:"Design System v2.0"}),e.jsxs("svg",{viewBox:"0 0 1364 262",className:"intro-logo",style:{width:"400px",height:"auto",marginBottom:"32px",overflow:"visible"},xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M68.022 210.901C74.858 210.901 76.91 205.432 76.91 197.571V146.641H132.626V199.276C132.626 231.41 116.903 261.83 72.468 261.83H62.554C15.04 261.83 0 233.462 0 194.496V65.289C0 28.712 16.408 0 62.213 0H72.468C117.588 0 132.626 25.978 132.626 59.473V101.177H76.91V61.869C76.91 53.667 74.858 49.222 67.682 49.222C60.502 49.222 58.452 52.982 58.452 61.869V197.571C58.452 206.114 60.846 210.901 68.022 210.901Z"}),e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M272.324 257.729H217.63L213.53 220.47H187.551L183.791 257.729H134.911L167.384 3.41907H236.774L272.324 257.729ZM192.681 170.223H208.402L200.54 92.9747L192.681 170.223Z"}),e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M366.797 3.41907C391.752 3.41907 408.842 18.1158 408.842 48.1925V81.6935C408.842 105.278 396.534 115.873 386.624 120.318C396.194 124.079 408.842 134.331 408.842 153.477V237.561C408.842 247.13 410.55 252.601 412.258 256.021V257.729H356.542C354.149 254.654 352.101 248.844 352.101 239.616V165.781C352.101 157.237 350.047 153.477 342.527 153.477H334.666V257.729H278.268V3.41907H366.797ZM334.665 105.623H341.845C349.021 105.623 352.1 102.203 352.1 93.3126V59.1349C352.1 50.245 350.391 47.1691 342.871 47.1691H334.666L334.665 105.623Z"}),e.jsx("path",{className:"intro-logo-bar",d:"M428.499 63.023H594.769V3.61597H428.5L428.499 63.023Z",fill:"#D2232A"}),e.jsx("path",{className:"intro-logo-bar",d:"M428.499 257.046H594.769V197.644H428.5L428.499 257.046Z",fill:"#0061AF"}),e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M481.039 182.672H461.599L460.098 167.332H449.987L448.607 182.672H430.7L442.597 77.9894H468.019L481.039 182.672ZM451.864 147.839H458.219L454.742 111.882L451.864 147.839Z"}),e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M486.974 182.672V77.9889H507.008L517.652 128.64V77.9889H535.31V182.671H517.152L504.881 128.077V182.672H486.974Z"}),e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M573.909 77.9874C585.429 77.9875 592.567 84.3239 592.567 101.067V158.609C592.567 174.929 586.18 182.672 574.035 182.672H544.356V77.9874H573.909ZM564.175 162.549H567.647C570.653 162.549 571.531 160.579 571.531 156.219V103.459C571.531 99.2341 570.653 97.4093 567.898 97.4093H564.175V162.549Z"}),e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M696.341 3.41907C727.79 3.41907 747.273 18.8019 747.273 59.4728V199.276C747.273 238.928 729.839 257.729 696.682 257.729H615.674V3.41907H696.341ZM671.389 208.852H679.251C687.454 208.852 689.847 204.065 689.847 193.469V65.2892C689.847 55.0342 687.453 50.589 679.933 50.589H671.389V208.852Z"}),e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M845.438 3.41907C870.393 3.41907 887.48 18.1158 887.48 48.1925V81.6935C887.48 105.278 875.177 115.873 865.264 120.318C874.833 124.079 887.48 134.331 887.48 153.477V237.561C887.48 247.13 889.191 252.601 890.899 256.021V257.729H835.183C832.79 254.654 830.738 248.844 830.738 239.616V165.781C830.738 157.237 828.689 153.477 821.169 153.477H813.307L813.308 257.729H756.907V3.41907H845.438ZM813.307 105.623H820.482C827.662 105.623 830.737 102.203 830.737 93.3126V59.1349C830.737 50.245 829.03 47.1691 821.51 47.1691H813.307V105.623Z"}),e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M956.492 257.732H900.092V3.41895H956.492V257.732Z"}),e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M1073.15 257.729H999.319L962.748 3.41895H1022.22L1037.6 162.705L1052.99 3.41895H1107.34L1073.15 257.729Z"}),e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M1113.59 257.729V3.41895H1219.21V56.0569H1169.3V99.4689H1209.3V153.477H1169.3V204.065H1221.26V257.729H1113.59Z"}),e.jsx("path",{className:"intro-logo-letter",fill:"currentColor",d:"M1285.45 47.1689H1293.65C1301.17 47.1689 1302.88 50.2449 1302.88 59.1349V93.313C1302.88 102.203 1299.81 105.623 1292.63 105.623H1285.45V47.1689ZM1285.45 153.477H1293.31C1300.83 153.477 1302.88 157.237 1302.88 165.781V239.616C1302.88 248.844 1304.93 254.654 1307.33 257.729H1363.04V256.021C1361.33 252.601 1359.62 247.131 1359.62 237.561V153.477C1359.62 134.331 1346.98 124.08 1337.41 120.319C1347.32 115.874 1359.62 105.279 1359.62 81.6939V48.1929C1359.62 18.1159 1342.54 3.41895 1317.58 3.41895H1229.05V257.729H1285.45V153.477Z"})]}),e.jsx("p",{children:"A component library for the automotive marketplace. Designed for clarity. Built for scale."})]}),e.jsxs("div",{className:"docs-section",children:[e.jsx("h2",{className:"docs-section-title",children:"Getting Started"}),e.jsx("p",{className:"docs-section-subtitle",children:"Explore components, tokens, and patterns."}),e.jsxs("div",{className:"docs-card-grid",children:[e.jsxs("a",{href:"?path=/docs/atoms-button--docs",className:"docs-card",children:[e.jsx("h3",{children:"Components"}),e.jsx("p",{children:"Browse the complete library of UI components"})]}),e.jsxs("a",{href:"?path=/story/tokens-colors--all-colors",className:"docs-card",children:[e.jsx("h3",{children:"Colors"}),e.jsx("p",{children:"Color palette and semantic tokens"})]}),e.jsxs("a",{href:"?path=/story/tokens-typography--all-styles",className:"docs-card",children:[e.jsx("h3",{children:"Typography"}),e.jsx("p",{children:"Type scale and font weights"})]}),e.jsxs("a",{href:"?path=/story/tokens-spacing--all-spacing",className:"docs-card",children:[e.jsx("h3",{children:"Spacing"}),e.jsx("p",{children:"Consistent spatial system"})]})]})]}),e.jsxs("div",{className:"docs-section",children:[e.jsx("h2",{className:"docs-section-title",children:"Color Palette"}),e.jsx("p",{className:"docs-section-subtitle",children:"Primary and secondary brand colors."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"48px"},children:[e.jsxs("div",{children:[e.jsxs("div",{className:"docs-token-row",children:[e.jsx("div",{className:"docs-color-swatch",style:{backgroundColor:"#222222"}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"docs-token-name",children:"Dark Grey"}),e.jsx("div",{className:"docs-token-value",children:"--color-dark-grey"})]})]}),e.jsxs("div",{className:"docs-token-row",children:[e.jsx("div",{className:"docs-color-swatch",style:{backgroundColor:"#1B5F8A"}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"docs-token-name",children:"Dark Blue"}),e.jsx("div",{className:"docs-token-value",children:"--color-dark-blue"})]})]}),e.jsxs("div",{className:"docs-token-row",children:[e.jsx("div",{className:"docs-color-swatch",style:{backgroundColor:"#DBCA8B"}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"docs-token-name",children:"Gold"}),e.jsx("div",{className:"docs-token-value",children:"--color-gold"})]})]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"docs-token-row",children:[e.jsx("div",{className:"docs-color-swatch",style:{backgroundColor:"#D2232A"}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"docs-token-name",children:"Red"}),e.jsx("div",{className:"docs-token-value",children:"--color-red"})]})]}),e.jsxs("div",{className:"docs-token-row",children:[e.jsx("div",{className:"docs-color-swatch",style:{backgroundColor:"#26870D"}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"docs-token-name",children:"Green"}),e.jsx("div",{className:"docs-token-value",children:"--color-green"})]})]}),e.jsxs("div",{className:"docs-token-row",children:[e.jsx("div",{className:"docs-color-swatch",style:{backgroundColor:"#F5F5F5",border:"1px solid #d2d2d7"}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"docs-token-name",children:"Light Grey"}),e.jsx("div",{className:"docs-token-value",children:"--color-light-grey"})]})]})]})]})]}),e.jsxs("div",{className:"docs-section",children:[e.jsx("h2",{className:"docs-section-title",children:"Components"}),e.jsx("p",{className:"docs-section-subtitle",children:"Organized by atomic design principles."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"48px"},children:[e.jsxs("div",{children:[e.jsx("h4",{style:{fontSize:"14px",fontWeight:600,color:"#1d1d1f",marginBottom:"16px"},children:"Atoms"}),e.jsxs("ul",{className:"docs-list",children:[e.jsx("li",{children:"Button"}),e.jsx("li",{children:"TextField"}),e.jsx("li",{children:"Toast"}),e.jsx("li",{children:"Spinner"}),e.jsx("li",{children:"Image"})]})]}),e.jsxs("div",{children:[e.jsx("h4",{style:{fontSize:"14px",fontWeight:600,color:"#1d1d1f",marginBottom:"16px"},children:"Molecules"}),e.jsxs("ul",{className:"docs-list",children:[e.jsx("li",{children:"QuickSpecs"}),e.jsx("li",{children:"Incentives"}),e.jsx("li",{children:"TrimSelector"}),e.jsx("li",{children:"MarketSpeed"}),e.jsx("li",{children:"Warranty"})]})]}),e.jsxs("div",{children:[e.jsx("h4",{style:{fontSize:"14px",fontWeight:600,color:"#1d1d1f",marginBottom:"16px"},children:"Organisms"}),e.jsxs("ul",{className:"docs-list",children:[e.jsx("li",{children:"Header"}),e.jsx("li",{children:"Footer"}),e.jsx("li",{children:"Hero"}),e.jsx("li",{children:"Comparison"}),e.jsx("li",{children:"VehicleRanking"})]})]})]})]}),e.jsxs("div",{className:"docs-section",children:[e.jsx("h2",{className:"docs-section-title",children:"Design Principles"}),e.jsx("p",{className:"docs-section-subtitle",children:"The core values that guide every design decision."}),e.jsxs("div",{className:"docs-principles",children:[e.jsxs("div",{className:"docs-principle",children:[e.jsx("h4",{children:"Clarity"}),e.jsx("p",{children:"Content-first design that reduces cognitive load"})]}),e.jsxs("div",{className:"docs-principle",children:[e.jsx("h4",{children:"Consistency"}),e.jsx("p",{children:"Predictable patterns across all touchpoints"})]}),e.jsxs("div",{className:"docs-principle",children:[e.jsx("h4",{children:"Accessibility"}),e.jsx("p",{children:"WCAG AA compliant with 4.5:1 contrast"})]}),e.jsxs("div",{className:"docs-principle",children:[e.jsx("h4",{children:"Performance"}),e.jsx("p",{children:"Optimized for speed and efficiency"})]})]})]}),e.jsx("footer",{className:"docs-footer",children:e.jsx("p",{children:"Car and Driver Design System"})})]})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Design System',
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  render: () => <>
      <style>
        {\`
          .docs-container {
            max-width: 720px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
            color: #1d1d1f;
            -webkit-font-smoothing: antialiased;
            padding: 0 24px;
          }
          
          .docs-header {
            padding: 80px 0 64px;
            border-bottom: 1px solid #d2d2d7;
            margin-bottom: 64px;
          }
          
          .docs-eyebrow {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #86868b;
            margin-bottom: 16px;
          }
          
          .docs-header h1 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 48px;
            font-weight: 600;
            letter-spacing: -0.02em;
            line-height: 1.1;
            margin: 0 0 24px 0;
            color: #1d1d1f;
          }
          
          .docs-header p {
            font-size: 21px;
            font-weight: 400;
            line-height: 1.5;
            color: #424245;
            margin: 0;
            max-width: 560px;
          }
          
          .docs-section {
            margin-bottom: 80px;
          }
          
          .docs-section-title {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.015em;
            color: #1d1d1f;
            margin: 0 0 12px 0;
          }
          
          .docs-section-subtitle {
            font-size: 17px;
            color: #86868b;
            margin: 0 0 40px 0;
            line-height: 1.5;
          }
          
          .docs-card-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          
          @media (max-width: 600px) {
            .docs-card-grid {
              grid-template-columns: 1fr;
            }
          }
          
          .docs-card {
            background: #f5f5f7;
            padding: 32px;
            text-decoration: none;
            color: inherit;
            display: block;
            transition: background 0.2s ease;
          }
          
          .docs-card:hover {
            background: #e8e8ed;
          }
          
          .docs-card h3 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 19px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #1d1d1f;
          }
          
          .docs-card p {
            font-size: 14px;
            color: #86868b;
            margin: 0;
            line-height: 1.5;
          }
          
          .docs-principles {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1px;
            background: #d2d2d7;
            border: 1px solid #d2d2d7;
          }
          
          @media (max-width: 600px) {
            .docs-principles {
              grid-template-columns: 1fr;
            }
          }
          
          .docs-principle {
            padding: 32px;
            background: #fff;
          }
          
          .docs-principle h4 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 17px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #1d1d1f;
          }
          
          .docs-principle p {
            font-size: 14px;
            color: #86868b;
            margin: 0;
            line-height: 1.5;
          }
          
          .docs-token-row {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px 0;
            border-bottom: 1px solid #e8e8ed;
          }
          
          .docs-color-swatch {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            flex-shrink: 0;
            border: 1px solid #e8e8ed;
          }
          
          .docs-token-name {
            font-size: 14px;
            font-weight: 500;
            color: #1d1d1f;
          }
          
          .docs-token-value {
            font-size: 13px;
            color: #86868b;
            font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          }
          
          .docs-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .docs-list li {
            font-size: 14px;
            color: #424245;
            padding: 8px 0;
            border-bottom: 1px solid #f5f5f7;
          }
          
          .docs-footer {
            padding: 48px 0;
            border-top: 1px solid #e8e8ed;
            text-align: center;
            color: #86868b;
            font-size: 12px;
            letter-spacing: 0.01em;
          }
          
          /* Animated Logo Styles */
          .intro-logo {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .intro-logo:hover {
            transform: scale(1.02);
          }
          
          .intro-logo path {
            opacity: 0;
          }
          
          .intro-logo-letter {
            transform: scale(0.3);
            transform-origin: center center;
            animation: introLetterScaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .intro-logo-bar {
            transform: scaleX(0);
            transform-origin: left center;
            animation: introBarReveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          /* Animation delays for each path */
          .intro-logo path:nth-child(1) { animation-delay: 0.05s; }   /* C */
          .intro-logo path:nth-child(2) { animation-delay: 0.1s; }    /* A */
          .intro-logo path:nth-child(3) { animation-delay: 0.15s; }   /* R */
          .intro-logo path:nth-child(4) { animation-delay: 0.2s; }    /* Red bar */
          .intro-logo path:nth-child(5) { animation-delay: 0.25s; }   /* Blue bar */
          .intro-logo path:nth-child(6) { animation-delay: 0.3s; }    /* A (AND) */
          .intro-logo path:nth-child(7) { animation-delay: 0.32s; }   /* N (AND) */
          .intro-logo path:nth-child(8) { animation-delay: 0.34s; }   /* D (AND) */
          .intro-logo path:nth-child(9) { animation-delay: 0.4s; }    /* D */
          .intro-logo path:nth-child(10) { animation-delay: 0.45s; }  /* R */
          .intro-logo path:nth-child(11) { animation-delay: 0.5s; }   /* I */
          .intro-logo path:nth-child(12) { animation-delay: 0.55s; }  /* V */
          .intro-logo path:nth-child(13) { animation-delay: 0.6s; }   /* E */
          .intro-logo path:nth-child(14) { animation-delay: 0.65s; }  /* R */
          
          @keyframes introLetterScaleIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            60% {
              opacity: 1;
              transform: scale(1.08);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes introBarReveal {
            0% {
              opacity: 0;
              transform: scaleX(0);
            }
            60% {
              opacity: 1;
              transform: scaleX(1.05);
            }
            100% {
              opacity: 1;
              transform: scaleX(1);
            }
          }
        \`}
      </style>
      <div className="docs-container">
        <div className="docs-header">
          <div className="docs-eyebrow">Design System v2.0</div>
          
          {/* Animated Car and Driver Logo */}
          <svg viewBox="0 0 1364 262" className="intro-logo" style={{
          width: '400px',
          height: 'auto',
          marginBottom: '32px',
          overflow: 'visible'
        }} xmlns="http://www.w3.org/2000/svg">
            {/* C */}
            <path className="intro-logo-letter" fill="currentColor" d="M68.022 210.901C74.858 210.901 76.91 205.432 76.91 197.571V146.641H132.626V199.276C132.626 231.41 116.903 261.83 72.468 261.83H62.554C15.04 261.83 0 233.462 0 194.496V65.289C0 28.712 16.408 0 62.213 0H72.468C117.588 0 132.626 25.978 132.626 59.473V101.177H76.91V61.869C76.91 53.667 74.858 49.222 67.682 49.222C60.502 49.222 58.452 52.982 58.452 61.869V197.571C58.452 206.114 60.846 210.901 68.022 210.901Z" />
            {/* A */}
            <path className="intro-logo-letter" fill="currentColor" d="M272.324 257.729H217.63L213.53 220.47H187.551L183.791 257.729H134.911L167.384 3.41907H236.774L272.324 257.729ZM192.681 170.223H208.402L200.54 92.9747L192.681 170.223Z" />
            {/* R */}
            <path className="intro-logo-letter" fill="currentColor" d="M366.797 3.41907C391.752 3.41907 408.842 18.1158 408.842 48.1925V81.6935C408.842 105.278 396.534 115.873 386.624 120.318C396.194 124.079 408.842 134.331 408.842 153.477V237.561C408.842 247.13 410.55 252.601 412.258 256.021V257.729H356.542C354.149 254.654 352.101 248.844 352.101 239.616V165.781C352.101 157.237 350.047 153.477 342.527 153.477H334.666V257.729H278.268V3.41907H366.797ZM334.665 105.623H341.845C349.021 105.623 352.1 102.203 352.1 93.3126V59.1349C352.1 50.245 350.391 47.1691 342.871 47.1691H334.666L334.665 105.623Z" />
            {/* Red bar */}
            <path className="intro-logo-bar" d="M428.499 63.023H594.769V3.61597H428.5L428.499 63.023Z" fill="#D2232A" />
            {/* Blue bar */}
            <path className="intro-logo-bar" d="M428.499 257.046H594.769V197.644H428.5L428.499 257.046Z" fill="#0061AF" />
            {/* AND */}
            <path className="intro-logo-letter" fill="currentColor" d="M481.039 182.672H461.599L460.098 167.332H449.987L448.607 182.672H430.7L442.597 77.9894H468.019L481.039 182.672ZM451.864 147.839H458.219L454.742 111.882L451.864 147.839Z" />
            <path className="intro-logo-letter" fill="currentColor" d="M486.974 182.672V77.9889H507.008L517.652 128.64V77.9889H535.31V182.671H517.152L504.881 128.077V182.672H486.974Z" />
            <path className="intro-logo-letter" fill="currentColor" d="M573.909 77.9874C585.429 77.9875 592.567 84.3239 592.567 101.067V158.609C592.567 174.929 586.18 182.672 574.035 182.672H544.356V77.9874H573.909ZM564.175 162.549H567.647C570.653 162.549 571.531 160.579 571.531 156.219V103.459C571.531 99.2341 570.653 97.4093 567.898 97.4093H564.175V162.549Z" />
            {/* D */}
            <path className="intro-logo-letter" fill="currentColor" d="M696.341 3.41907C727.79 3.41907 747.273 18.8019 747.273 59.4728V199.276C747.273 238.928 729.839 257.729 696.682 257.729H615.674V3.41907H696.341ZM671.389 208.852H679.251C687.454 208.852 689.847 204.065 689.847 193.469V65.2892C689.847 55.0342 687.453 50.589 679.933 50.589H671.389V208.852Z" />
            {/* R */}
            <path className="intro-logo-letter" fill="currentColor" d="M845.438 3.41907C870.393 3.41907 887.48 18.1158 887.48 48.1925V81.6935C887.48 105.278 875.177 115.873 865.264 120.318C874.833 124.079 887.48 134.331 887.48 153.477V237.561C887.48 247.13 889.191 252.601 890.899 256.021V257.729H835.183C832.79 254.654 830.738 248.844 830.738 239.616V165.781C830.738 157.237 828.689 153.477 821.169 153.477H813.307L813.308 257.729H756.907V3.41907H845.438ZM813.307 105.623H820.482C827.662 105.623 830.737 102.203 830.737 93.3126V59.1349C830.737 50.245 829.03 47.1691 821.51 47.1691H813.307V105.623Z" />
            {/* I */}
            <path className="intro-logo-letter" fill="currentColor" d="M956.492 257.732H900.092V3.41895H956.492V257.732Z" />
            {/* V */}
            <path className="intro-logo-letter" fill="currentColor" d="M1073.15 257.729H999.319L962.748 3.41895H1022.22L1037.6 162.705L1052.99 3.41895H1107.34L1073.15 257.729Z" />
            {/* E */}
            <path className="intro-logo-letter" fill="currentColor" d="M1113.59 257.729V3.41895H1219.21V56.0569H1169.3V99.4689H1209.3V153.477H1169.3V204.065H1221.26V257.729H1113.59Z" />
            {/* R */}
            <path className="intro-logo-letter" fill="currentColor" d="M1285.45 47.1689H1293.65C1301.17 47.1689 1302.88 50.2449 1302.88 59.1349V93.313C1302.88 102.203 1299.81 105.623 1292.63 105.623H1285.45V47.1689ZM1285.45 153.477H1293.31C1300.83 153.477 1302.88 157.237 1302.88 165.781V239.616C1302.88 248.844 1304.93 254.654 1307.33 257.729H1363.04V256.021C1361.33 252.601 1359.62 247.131 1359.62 237.561V153.477C1359.62 134.331 1346.98 124.08 1337.41 120.319C1347.32 115.874 1359.62 105.279 1359.62 81.6939V48.1929C1359.62 18.1159 1342.54 3.41895 1317.58 3.41895H1229.05V257.729H1285.45V153.477Z" />
          </svg>
          
          <p>
            A component library for the automotive marketplace. 
            Designed for clarity. Built for scale.
          </p>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Getting Started</h2>
          <p className="docs-section-subtitle">
            Explore components, tokens, and patterns.
          </p>
          
          <div className="docs-card-grid">
            <a href="?path=/docs/atoms-button--docs" className="docs-card">
              <h3>Components</h3>
              <p>Browse the complete library of UI components</p>
            </a>
            
            <a href="?path=/story/tokens-colors--all-colors" className="docs-card">
              <h3>Colors</h3>
              <p>Color palette and semantic tokens</p>
            </a>
            
            <a href="?path=/story/tokens-typography--all-styles" className="docs-card">
              <h3>Typography</h3>
              <p>Type scale and font weights</p>
            </a>
            
            <a href="?path=/story/tokens-spacing--all-spacing" className="docs-card">
              <h3>Spacing</h3>
              <p>Consistent spatial system</p>
            </a>
          </div>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Color Palette</h2>
          <p className="docs-section-subtitle">
            Primary and secondary brand colors.
          </p>
          
          <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px'
        }}>
            <div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{
                backgroundColor: '#222222'
              }} />
                <div style={{
                flex: 1
              }}>
                  <div className="docs-token-name">Dark Grey</div>
                  <div className="docs-token-value">--color-dark-grey</div>
                </div>
              </div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{
                backgroundColor: '#1B5F8A'
              }} />
                <div style={{
                flex: 1
              }}>
                  <div className="docs-token-name">Dark Blue</div>
                  <div className="docs-token-value">--color-dark-blue</div>
                </div>
              </div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{
                backgroundColor: '#DBCA8B'
              }} />
                <div style={{
                flex: 1
              }}>
                  <div className="docs-token-name">Gold</div>
                  <div className="docs-token-value">--color-gold</div>
                </div>
              </div>
            </div>
            <div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{
                backgroundColor: '#D2232A'
              }} />
                <div style={{
                flex: 1
              }}>
                  <div className="docs-token-name">Red</div>
                  <div className="docs-token-value">--color-red</div>
                </div>
              </div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{
                backgroundColor: '#26870D'
              }} />
                <div style={{
                flex: 1
              }}>
                  <div className="docs-token-name">Green</div>
                  <div className="docs-token-value">--color-green</div>
                </div>
              </div>
              <div className="docs-token-row">
                <div className="docs-color-swatch" style={{
                backgroundColor: '#F5F5F5',
                border: '1px solid #d2d2d7'
              }} />
                <div style={{
                flex: 1
              }}>
                  <div className="docs-token-name">Light Grey</div>
                  <div className="docs-token-value">--color-light-grey</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Components</h2>
          <p className="docs-section-subtitle">
            Organized by atomic design principles.
          </p>
          
          <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '48px'
        }}>
            <div>
              <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '16px'
            }}>Atoms</h4>
              <ul className="docs-list">
                <li>Button</li>
                <li>TextField</li>
                <li>Toast</li>
                <li>Spinner</li>
                <li>Image</li>
              </ul>
            </div>
            <div>
              <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '16px'
            }}>Molecules</h4>
              <ul className="docs-list">
                <li>QuickSpecs</li>
                <li>Incentives</li>
                <li>TrimSelector</li>
                <li>MarketSpeed</li>
                <li>Warranty</li>
              </ul>
            </div>
            <div>
              <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '16px'
            }}>Organisms</h4>
              <ul className="docs-list">
                <li>Header</li>
                <li>Footer</li>
                <li>Hero</li>
                <li>Comparison</li>
                <li>VehicleRanking</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Design Principles</h2>
          <p className="docs-section-subtitle">
            The core values that guide every design decision.
          </p>
          
          <div className="docs-principles">
            <div className="docs-principle">
              <h4>Clarity</h4>
              <p>Content-first design that reduces cognitive load</p>
            </div>
            <div className="docs-principle">
              <h4>Consistency</h4>
              <p>Predictable patterns across all touchpoints</p>
            </div>
            <div className="docs-principle">
              <h4>Accessibility</h4>
              <p>WCAG AA compliant with 4.5:1 contrast</p>
            </div>
            <div className="docs-principle">
              <h4>Performance</h4>
              <p>Optimized for speed and efficiency</p>
            </div>
          </div>
        </div>

        <footer className="docs-footer">
          <p>Car and Driver Design System</p>
        </footer>
      </div>
    </>
}`,...o.parameters?.docs?.source}}};const a=["Welcome"];export{o as Welcome,a as __namedExportsOrder,t as default};
