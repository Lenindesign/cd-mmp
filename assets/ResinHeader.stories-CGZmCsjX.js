import{r as _,j as e}from"./iframe-DD4Obs42.js";import{v as D}from"./index-Dto8T7jp.js";import"./preload-helper-PPVm8Dsz.js";const g=({logoUrl:r="/cd-logo.svg",logoUrlDark:p,logoAlt:v="Car and Driver",navItems:b=[],showSubscribe:x=!0,subscribeText:f="SUBSCRIBE",subscribeHref:S="#",showSignIn:y=!0,signInText:w="sign in",signInHref:k="#",showSearch:N=!0,onSearchClick:T,onMenuClick:q,sticky:R=!1,variant:j="default"})=>{const U=j==="dark"&&p?p:r,[u,C]=_.useState(!1),[h,B]=_.useState(!1),H=()=>{C(!u),T?.()},V=()=>{B(!h),q?.()};return e.jsxs("header",{className:`resin-header resin-header--${j} ${R?"resin-header--sticky":""}`,children:[e.jsxs("nav",{className:"resin-header__nav",children:[e.jsx("button",{className:"resin-header__menu-btn",onClick:V,"aria-label":"Open menu","aria-expanded":h,children:e.jsxs("span",{className:"resin-header__menu-icon",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})}),e.jsx("a",{href:"/",className:"resin-header__logo",children:e.jsx("img",{src:U,alt:v})}),e.jsx("ul",{className:"resin-header__links",children:b.map((a,m)=>e.jsx("li",{className:"resin-header__link-item",children:e.jsx("a",{href:a.href,className:`resin-header__link ${a.isActive?"resin-header__link--active":""}`,children:a.label})},m))}),e.jsxs("div",{className:"resin-header__actions",children:[x&&e.jsx("a",{href:S,className:"resin-header__subscribe",children:f}),y&&e.jsx("a",{href:k,className:"resin-header__signin",children:w}),N&&e.jsx("button",{className:"resin-header__search-btn",onClick:H,"aria-label":"Search","aria-expanded":u,children:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"M21 21l-4.35-4.35"})]})})]})]}),u&&e.jsx("div",{className:"resin-header__search-overlay",children:e.jsxs("div",{className:"resin-header__search-container",children:[e.jsx("input",{type:"search",placeholder:"Search...",className:"resin-header__search-input",autoFocus:!0}),e.jsx("button",{className:"resin-header__search-close",onClick:()=>C(!1),"aria-label":"Close search",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M18 6L6 18M6 6l12 12"})})})]})}),h&&e.jsx("div",{className:"resin-header__mobile-overlay",children:e.jsxs("div",{className:"resin-header__mobile-menu",children:[e.jsx("button",{className:"resin-header__mobile-close",onClick:()=>B(!1),"aria-label":"Close menu",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M18 6L6 18M6 6l12 12"})})}),e.jsx("a",{href:"/",className:"resin-header__mobile-logo",children:e.jsx("img",{src:r,alt:v})}),e.jsx("ul",{className:"resin-header__mobile-links",children:b.map((a,m)=>e.jsx("li",{children:e.jsx("a",{href:a.href,className:a.isActive?"active":"",children:a.label})},m))}),x&&e.jsx("a",{href:S,className:"resin-header__mobile-subscribe",children:f}),y&&e.jsx("a",{href:k,className:"resin-header__mobile-signin",children:w})]})})]})};g.__docgenInfo={description:"",methods:[],displayName:"ResinHeader",props:{logoUrl:{required:!1,tsType:{name:"string"},description:"Logo image URL",defaultValue:{value:"'/cd-logo.svg'",computed:!1}},logoUrlDark:{required:!1,tsType:{name:"string"},description:"Logo image URL for dark variant (white logo)"},logoAlt:{required:!1,tsType:{name:"string"},description:"Logo alt text",defaultValue:{value:"'Car and Driver'",computed:!1}},navItems:{required:!1,tsType:{name:"Array",elements:[{name:"NavItem"}],raw:"NavItem[]"},description:"Navigation items",defaultValue:{value:"[]",computed:!1}},showSubscribe:{required:!1,tsType:{name:"boolean"},description:"Show subscribe button",defaultValue:{value:"true",computed:!1}},subscribeText:{required:!1,tsType:{name:"string"},description:"Subscribe button text",defaultValue:{value:"'SUBSCRIBE'",computed:!1}},subscribeHref:{required:!1,tsType:{name:"string"},description:"Subscribe button URL",defaultValue:{value:"'#'",computed:!1}},showSignIn:{required:!1,tsType:{name:"boolean"},description:"Show sign in link",defaultValue:{value:"true",computed:!1}},signInText:{required:!1,tsType:{name:"string"},description:"Sign in text",defaultValue:{value:"'sign in'",computed:!1}},signInHref:{required:!1,tsType:{name:"string"},description:"Sign in URL",defaultValue:{value:"'#'",computed:!1}},showSearch:{required:!1,tsType:{name:"boolean"},description:"Show search button",defaultValue:{value:"true",computed:!1}},onSearchClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when search is clicked"},onMenuClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when menu is clicked"},sticky:{required:!1,tsType:{name:"boolean"},description:"Is the header sticky",defaultValue:{value:"false",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'transparent' | 'dark'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'transparent'"},{name:"literal",value:"'dark'"}]},description:"Header variant",defaultValue:{value:"'default'",computed:!1}}}};const A=D.find(r=>r.make==="Porsche"&&r.model==="911"),M={title:"Resin Components/ResinHeader",component:g,parameters:{layout:"fullscreen",docs:{description:{component:`
## Resin Header

A responsive navigation header component inspired by Hearst's Resin design system.
Used as the main site navigation with logo, links, and action buttons.

### Features
- Responsive design with mobile hamburger menu
- Sticky positioning option
- Multiple variants (default, transparent, dark)
- Search overlay
- Mobile slide-out menu
- Subscribe and sign-in CTAs

### Usage
\`\`\`tsx
<ResinHeader
  logoUrl="/cd-logo.svg"
  logoAlt="Car and Driver"
  navItems={[
    { label: 'Reviews', href: '/reviews', isActive: true },
    { label: 'News', href: '/news' },
    { label: 'Buying Guide', href: '/buying-guide' },
    { label: 'Videos', href: '/videos' },
  ]}
  showSubscribe={true}
  subscribeText="SUBSCRIBE"
  showSignIn={true}
  showSearch={true}
  sticky={true}
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{variant:{control:"radio",options:["default","transparent","dark"],description:"Header color variant"},sticky:{control:"boolean",description:"Whether the header sticks to the top on scroll"}}},I=[{label:"Reviews",href:"/reviews",isActive:!0},{label:"News",href:"/news"},{label:"Buying Guide",href:"/buying-guide"},{label:"Videos",href:"/videos"},{label:"Best Cars",href:"/best-cars"}],s={args:{logoUrl:"/cd-logo.svg",logoAlt:"Car and Driver",navItems:I,showSubscribe:!0,subscribeText:"SUBSCRIBE",showSignIn:!0,signInText:"sign in",showSearch:!0,variant:"default"}},n={args:{...s.args,sticky:!0},decorators:[r=>e.jsxs("div",{style:{height:"200vh"},children:[e.jsx(r,{}),e.jsxs("div",{style:{padding:"24px",maxWidth:"800px",margin:"0 auto"},children:[e.jsx("h1",{style:{fontSize:"2rem",marginBottom:"16px"},children:"Scroll to see sticky header"}),e.jsx("p",{style:{lineHeight:1.6,marginBottom:"16px"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{style:{lineHeight:1.6,marginBottom:"16px"},children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{style:{lineHeight:1.6,marginBottom:"16px"},children:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."})]})]})]},i={args:{...s.args,variant:"dark"},decorators:[r=>e.jsx("div",{style:{backgroundColor:"#1a1a1a",minHeight:"200px"},children:e.jsx(r,{})})]},t={args:{...s.args,variant:"transparent"},decorators:[r=>e.jsxs("div",{style:{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${A?.image||""})`,backgroundSize:"cover",backgroundPosition:"center",minHeight:"400px",position:"relative"},children:[e.jsx(r,{}),e.jsxs("div",{style:{padding:"120px 24px",textAlign:"center",color:"white"},children:[e.jsx("h1",{style:{fontSize:"3rem",marginBottom:"16px",fontWeight:800,textShadow:"0 2px 4px rgba(0,0,0,0.3)"},children:"2025 Porsche 911 Carrera GTS"}),e.jsx("p",{style:{fontSize:"1.25rem",opacity:.9,textShadow:"0 1px 2px rgba(0,0,0,0.3)"},children:"The benchmark sports car gets even better"})]})]})]},o={args:{logoUrl:"/cd-logo.svg",logoAlt:"Car and Driver",navItems:[{label:"Reviews",href:"/reviews"},{label:"News",href:"/news"}],showSubscribe:!1,showSignIn:!1,showSearch:!0,variant:"default"}},l={args:{logoUrl:"/cd-logo.svg",logoAlt:"Car and Driver",navItems:[{label:"Reviews",href:"/reviews"},{label:"News",href:"/news"},{label:"Buying Guide",href:"/buying-guide"},{label:"Videos",href:"/videos"},{label:"Best Cars",href:"/best-cars"},{label:"Rankings",href:"/rankings"},{label:"EV Hub",href:"/ev"}],showSubscribe:!0,subscribeText:"SUBSCRIBE",showSignIn:!0,signInText:"sign in",showSearch:!0,variant:"default"}},d={args:{logoUrl:"/cd-logo.svg",logoAlt:"Car and Driver",navItems:[{label:"Reviews",href:"/reviews"},{label:"News",href:"/news",isActive:!0},{label:"Buying Guide",href:"/buying-guide"},{label:"Videos",href:"/videos"}],showSubscribe:!0,showSignIn:!0,showSearch:!0,variant:"default"}},c={render:()=>e.jsxs("div",{style:{minHeight:"100vh",backgroundColor:"#f5f5f5"},children:[e.jsx(g,{logoUrl:"/cd-logo.svg",logoAlt:"Car and Driver",navItems:I,showSubscribe:!0,subscribeText:"SUBSCRIBE",showSignIn:!0,showSearch:!0,sticky:!0}),e.jsxs("main",{style:{maxWidth:"1200px",margin:"0 auto",padding:"24px"},children:[e.jsxs("div",{style:{backgroundColor:"white",padding:"48px",marginBottom:"24px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"},children:[e.jsx("h1",{style:{fontSize:"2.5rem",marginBottom:"16px",fontWeight:700},children:"2025 Car and Driver 10Best Cars"}),e.jsx("p",{style:{fontSize:"1.125rem",color:"#666",lineHeight:1.6},children:"Every year, our editors put hundreds of cars through their paces to determine the 10 best vehicles available. Here are this year's winners."})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"24px"},children:[1,2,3,4,5,6].map(r=>e.jsxs("div",{style:{backgroundColor:"white",padding:"24px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"},children:[e.jsx("div",{style:{backgroundColor:"#e5e5e5",height:"150px",marginBottom:"16px"}}),e.jsxs("h3",{style:{fontSize:"1.125rem",marginBottom:"8px"},children:["Vehicle ",r]}),e.jsx("p",{style:{color:"#666",fontSize:"0.875rem"},children:"Starting at $XX,XXX"})]},r))})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    navItems: defaultNavItems,
    showSubscribe: true,
    subscribeText: 'SUBSCRIBE',
    showSignIn: true,
    signInText: 'sign in',
    showSearch: true,
    variant: 'default'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    sticky: true
  },
  decorators: [Story => <div style={{
    height: '200vh'
  }}>
        <Story />
        <div style={{
      padding: '24px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
          <h1 style={{
        fontSize: '2rem',
        marginBottom: '16px'
      }}>Scroll to see sticky header</h1>
          <p style={{
        lineHeight: 1.6,
        marginBottom: '16px'
      }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p style={{
        lineHeight: 1.6,
        marginBottom: '16px'
      }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p style={{
        lineHeight: 1.6,
        marginBottom: '16px'
      }}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
            architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </div>]
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'dark'
  },
  decorators: [Story => <div style={{
    backgroundColor: '#1a1a1a',
    minHeight: '200px'
  }}>
        <Story />
      </div>]
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'transparent'
  },
  decorators: [Story => <div style={{
    backgroundImage: \`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(\${porsche911?.image || ''})\`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '400px',
    position: 'relative'
  }}>
        <Story />
        <div style={{
      padding: '120px 24px',
      textAlign: 'center',
      color: 'white'
    }}>
          <h1 style={{
        fontSize: '3rem',
        marginBottom: '16px',
        fontWeight: 800,
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
            2025 Porsche 911 Carrera GTS
          </h1>
          <p style={{
        fontSize: '1.25rem',
        opacity: 0.9,
        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
      }}>
            The benchmark sports car gets even better
          </p>
        </div>
      </div>]
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    navItems: [{
      label: 'Reviews',
      href: '/reviews'
    }, {
      label: 'News',
      href: '/news'
    }],
    showSubscribe: false,
    showSignIn: false,
    showSearch: true,
    variant: 'default'
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    navItems: [{
      label: 'Reviews',
      href: '/reviews'
    }, {
      label: 'News',
      href: '/news'
    }, {
      label: 'Buying Guide',
      href: '/buying-guide'
    }, {
      label: 'Videos',
      href: '/videos'
    }, {
      label: 'Best Cars',
      href: '/best-cars'
    }, {
      label: 'Rankings',
      href: '/rankings'
    }, {
      label: 'EV Hub',
      href: '/ev'
    }],
    showSubscribe: true,
    subscribeText: 'SUBSCRIBE',
    showSignIn: true,
    signInText: 'sign in',
    showSearch: true,
    variant: 'default'
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    logoUrl: '/cd-logo.svg',
    logoAlt: 'Car and Driver',
    navItems: [{
      label: 'Reviews',
      href: '/reviews'
    }, {
      label: 'News',
      href: '/news',
      isActive: true
    }, {
      label: 'Buying Guide',
      href: '/buying-guide'
    }, {
      label: 'Videos',
      href: '/videos'
    }],
    showSubscribe: true,
    showSignIn: true,
    showSearch: true,
    variant: 'default'
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  }}>
      <ResinHeader logoUrl="/cd-logo.svg" logoAlt="Car and Driver" navItems={defaultNavItems} showSubscribe={true} subscribeText="SUBSCRIBE" showSignIn={true} showSearch={true} sticky={true} />
      <main style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px'
    }}>
        <div style={{
        backgroundColor: 'white',
        padding: '48px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
          <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '16px',
          fontWeight: 700
        }}>
            2025 Car and Driver 10Best Cars
          </h1>
          <p style={{
          fontSize: '1.125rem',
          color: '#666',
          lineHeight: 1.6
        }}>
            Every year, our editors put hundreds of cars through their paces to determine 
            the 10 best vehicles available. Here are this year's winners.
          </p>
        </div>
        <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px'
      }}>
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{
          backgroundColor: 'white',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
              <div style={{
            backgroundColor: '#e5e5e5',
            height: '150px',
            marginBottom: '16px'
          }} />
              <h3 style={{
            fontSize: '1.125rem',
            marginBottom: '8px'
          }}>
                Vehicle {i}
              </h3>
              <p style={{
            color: '#666',
            fontSize: '0.875rem'
          }}>
                Starting at $XX,XXX
              </p>
            </div>)}
        </div>
      </main>
    </div>
}`,...c.parameters?.docs?.source}}};const W=["Default","Sticky","DarkVariant","TransparentVariant","MinimalNav","FullNav","WithActiveState","PageLayout"];export{i as DarkVariant,s as Default,l as FullNav,o as MinimalNav,c as PageLayout,n as Sticky,t as TransparentVariant,d as WithActiveState,W as __namedExportsOrder,M as default};
