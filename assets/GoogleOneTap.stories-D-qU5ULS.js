import{G as o,j as e,r as x,g as b,e as u,c as v,a as D}from"./iframe--VFCZUcI.js";import"./preload-helper-PPVm8Dsz.js";const w={title:"Components/GoogleOneTap",component:o,parameters:{layout:"fullscreen",docs:{description:{component:`
Google One Tap authentication component for seamless sign-in on high-intent pages.

## Features
- Loads Google Identity Services script automatically
- Shows One Tap prompt after configurable delay (default 500ms)
- Stays visible when clicking outside (cancel_on_tap_outside: false)
- Tracks CDP events for analytics
- Stores authenticated user in localStorage (demo mode)

## Environment Setup
Add \`VITE_GOOGLE_CLIENT_ID\` to your environment variables with your Google OAuth 2.0 Client ID.

## Usage
\`\`\`tsx
import { GoogleOneTap } from './components/GoogleOneTap';
import { useGoogleOneTap } from './hooks/useGoogleOneTap';

const VehiclePage = () => {
  const { shouldShowOneTap, isAuthenticated } = useGoogleOneTap({
    pageType: 'mmp',
    vehicleInfo: { year: 2024, make: 'Honda', model: 'CR-V' }
  });

  return (
    <>
      {shouldShowOneTap && (
        <GoogleOneTap
          pageType="mmp"
          vehicleInfo={{ year: 2024, make: 'Honda', model: 'CR-V' }}
          isAuthenticated={isAuthenticated}
        />
      )}
      <VehicleDetails />
    </>
  );
};
\`\`\`

## CDP Events Tracked
- \`g1t_prompt_triggered\` - When prompt is shown
- \`g1t_prompt_dismissed\` - When prompt is dismissed
- \`user_registration\` with source \`google_one_tap\` - When user signs in
- \`high_intent_page_view\` - When user visits MMP or rankings pages
        `}}},tags:["autodocs"],argTypes:{pageType:{control:"select",options:["mmp","rankings","comparison","pricing","other"],description:"Page type for CDP tracking"},promptDelay:{control:{type:"number",min:0,max:5e3,step:100},description:"Delay before showing prompt (ms)"},isAuthenticated:{control:"boolean",description:"Whether user is already authenticated"},debug:{control:"boolean",description:"Enable debug logging"}}},c=({children:r,showControls:s=!0})=>{const[n,m]=x.useState(null),[t,g]=x.useState(null);x.useEffect(()=>{m(b()),g(u());const h=()=>{m(b()),g(u())};window.addEventListener("storage",h);const y=setInterval(()=>{m(b()),g(u())},1e3);return()=>{window.removeEventListener("storage",h),clearInterval(y)}},[]);const f=()=>{v(),m(null)},T=()=>{D(),g(u())};return s?e.jsxs("div",{style:{padding:"2rem",fontFamily:"system-ui, sans-serif"},children:[e.jsxs("div",{style:{marginBottom:"2rem",padding:"1rem",background:"#f5f5f5",borderRadius:"8px",border:"1px solid #e0e0e0"},children:[e.jsx("h3",{style:{margin:"0 0 1rem 0",fontSize:"1rem",fontWeight:600},children:"Google One Tap Demo"}),!1,e.jsxs("div",{style:{display:"flex",gap:"1rem",alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("div",{style:{padding:"0.5rem 1rem",background:n?"#d4edda":"#f8d7da",borderRadius:"4px",fontSize:"0.875rem"},children:["Status: ",n?`Signed in as ${n.email}`:"Not signed in"]}),n&&e.jsx("button",{onClick:f,style:{padding:"0.5rem 1rem",background:"#dc3545",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"0.875rem"},children:"Sign Out"}),e.jsx("button",{onClick:T,style:{padding:"0.5rem 1rem",background:"#6c757d",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"0.875rem"},children:"Clear CDP Data"})]}),n&&e.jsxs("div",{style:{marginTop:"1rem",display:"flex",alignItems:"center",gap:"0.75rem"},children:[n.picture&&e.jsx("img",{src:n.picture,alt:n.name,style:{width:40,height:40,borderRadius:"50%"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:500},children:n.name}),e.jsx("div",{style:{fontSize:"0.875rem",color:"#666"},children:n.email})]})]})]}),t&&(t.events.length>0||t.registration||t.highIntentViews.length>0)&&e.jsxs("div",{style:{marginBottom:"2rem",padding:"1rem",background:"#e8f4f8",borderRadius:"8px",border:"1px solid #b8daff",fontSize:"0.875rem"},children:[e.jsx("h4",{style:{margin:"0 0 0.75rem 0",fontSize:"0.875rem",fontWeight:600},children:"CDP Data (localStorage)"}),t.registration&&e.jsxs("div",{style:{marginBottom:"0.5rem"},children:[e.jsx("strong",{children:"Registration Source:"})," ",t.registration.source]}),e.jsxs("div",{style:{marginBottom:"0.5rem"},children:[e.jsx("strong",{children:"High-Intent Views:"})," ",t.highIntentViews.length]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Recent Events:"}),e.jsx("ul",{style:{margin:"0.25rem 0 0 1.5rem",padding:0},children:t.events.slice(-5).map((h,y)=>e.jsx("li",{children:h.event_type},y))})]})]}),r]}):e.jsx(e.Fragment,{children:r})},a={args:{pageType:"mmp",vehicleInfo:{year:2024,make:"Honda",model:"CR-V"},promptDelay:500,isAuthenticated:!1,debug:!0},render:r=>e.jsxs(c,{children:[e.jsx(o,{...r}),e.jsxs("div",{style:{padding:"2rem",background:"white",borderRadius:"8px",border:"1px solid #e0e0e0"},children:[e.jsx("h2",{style:{margin:"0 0 1rem 0"},children:"2024 Honda CR-V"}),e.jsxs("p",{style:{color:"#666",margin:0},children:["The Google One Tap prompt will appear in the top-right corner after ",r.promptDelay,"ms."]})]})]})},i={args:{pageType:"mmp",isAuthenticated:!0},render:r=>e.jsxs(c,{children:[e.jsx(o,{...r}),e.jsxs("div",{style:{padding:"2rem",background:"white",borderRadius:"8px",border:"1px solid #e0e0e0"},children:[e.jsx("h2",{style:{margin:"0 0 1rem 0"},children:"Authenticated User"}),e.jsx("p",{style:{color:"#666",margin:0},children:"Google One Tap will not show because the user is already authenticated."})]})]})},d={args:{pageType:"rankings",promptDelay:500,isAuthenticated:!1,debug:!0},render:r=>e.jsxs(c,{children:[e.jsx(o,{...r}),e.jsxs("div",{style:{padding:"2rem",background:"white",borderRadius:"8px",border:"1px solid #e0e0e0"},children:[e.jsx("h2",{style:{margin:"0 0 1rem 0"},children:"Best SUVs Rankings"}),e.jsx("p",{style:{color:"#666",margin:0},children:"This simulates the Rankings page context. CDP will track this as a high-intent page view."})]})]})},l={args:{pageType:"mmp",promptDelay:2e3,isAuthenticated:!1,debug:!0},render:r=>e.jsxs(c,{children:[e.jsx(o,{...r}),e.jsxs("div",{style:{padding:"2rem",background:"white",borderRadius:"8px",border:"1px solid #e0e0e0"},children:[e.jsx("h2",{style:{margin:"0 0 1rem 0"},children:"Custom Delay Demo"}),e.jsxs("p",{style:{color:"#666",margin:0},children:["The Google One Tap prompt will appear after ",r.promptDelay,"ms (2 seconds)."]})]})]})},p={args:{pageType:"mmp",vehicleInfo:{year:2024,make:"Toyota",model:"RAV4"},promptDelay:500,isAuthenticated:!1,debug:!0},render:r=>e.jsxs(c,{children:[e.jsx(o,{...r,onSuccess:s=>{console.log("Sign-in successful:",s),alert(`Welcome, ${s.name}!`)},onError:s=>{console.error("Sign-in error:",s)},onDismiss:s=>{console.log("Prompt dismissed:",s)}}),e.jsxs("div",{style:{padding:"2rem",background:"white",borderRadius:"8px",border:"1px solid #e0e0e0"},children:[e.jsx("h2",{style:{margin:"0 0 1rem 0"},children:"2024 Toyota RAV4"}),e.jsx("p",{style:{color:"#666",margin:0},children:"This demo has callbacks configured. Check the console for events."})]})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    pageType: 'mmp',
    vehicleInfo: {
      year: 2024,
      make: 'Honda',
      model: 'CR-V'
    },
    promptDelay: 500,
    isAuthenticated: false,
    debug: true
  },
  render: args => <DemoWrapper>
      <GoogleOneTap {...args} />
      <div style={{
      padding: '2rem',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #e0e0e0'
    }}>
        <h2 style={{
        margin: '0 0 1rem 0'
      }}>2024 Honda CR-V</h2>
        <p style={{
        color: '#666',
        margin: 0
      }}>
          The Google One Tap prompt will appear in the top-right corner after {args.promptDelay}ms.
        </p>
      </div>
    </DemoWrapper>
}`,...a.parameters?.docs?.source},description:{story:`Default state - shows One Tap prompt for non-authenticated users.
Note: Requires VITE_GOOGLE_CLIENT_ID to be set in environment.`,...a.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    pageType: 'mmp',
    isAuthenticated: true
  },
  render: args => <DemoWrapper>
      <GoogleOneTap {...args} />
      <div style={{
      padding: '2rem',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #e0e0e0'
    }}>
        <h2 style={{
        margin: '0 0 1rem 0'
      }}>Authenticated User</h2>
        <p style={{
        color: '#666',
        margin: 0
      }}>
          Google One Tap will not show because the user is already authenticated.
        </p>
      </div>
    </DemoWrapper>
}`,...i.parameters?.docs?.source},description:{story:"Already authenticated - One Tap will not show.",...i.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    pageType: 'rankings',
    promptDelay: 500,
    isAuthenticated: false,
    debug: true
  },
  render: args => <DemoWrapper>
      <GoogleOneTap {...args} />
      <div style={{
      padding: '2rem',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #e0e0e0'
    }}>
        <h2 style={{
        margin: '0 0 1rem 0'
      }}>Best SUVs Rankings</h2>
        <p style={{
        color: '#666',
        margin: 0
      }}>
          This simulates the Rankings page context. CDP will track this as a high-intent page view.
        </p>
      </div>
    </DemoWrapper>
}`,...d.parameters?.docs?.source},description:{story:"Rankings page context - tracks as high-intent rankings page view.",...d.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    pageType: 'mmp',
    promptDelay: 2000,
    isAuthenticated: false,
    debug: true
  },
  render: args => <DemoWrapper>
      <GoogleOneTap {...args} />
      <div style={{
      padding: '2rem',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #e0e0e0'
    }}>
        <h2 style={{
        margin: '0 0 1rem 0'
      }}>Custom Delay Demo</h2>
        <p style={{
        color: '#666',
        margin: 0
      }}>
          The Google One Tap prompt will appear after {args.promptDelay}ms (2 seconds).
        </p>
      </div>
    </DemoWrapper>
}`,...l.parameters?.docs?.source},description:{story:"Custom delay - shows prompt after 2 seconds.",...l.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    pageType: 'mmp',
    vehicleInfo: {
      year: 2024,
      make: 'Toyota',
      model: 'RAV4'
    },
    promptDelay: 500,
    isAuthenticated: false,
    debug: true
  },
  render: args => <DemoWrapper>
      <GoogleOneTap {...args} onSuccess={user => {
      console.log('Sign-in successful:', user);
      alert(\`Welcome, \${user.name}!\`);
    }} onError={error => {
      console.error('Sign-in error:', error);
    }} onDismiss={reason => {
      console.log('Prompt dismissed:', reason);
    }} />
      <div style={{
      padding: '2rem',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #e0e0e0'
    }}>
        <h2 style={{
        margin: '0 0 1rem 0'
      }}>2024 Toyota RAV4</h2>
        <p style={{
        color: '#666',
        margin: 0
      }}>
          This demo has callbacks configured. Check the console for events.
        </p>
      </div>
    </DemoWrapper>
}`,...p.parameters?.docs?.source},description:{story:"With callbacks - demonstrates success and error handling.",...p.parameters?.docs?.description}}};const R=["Default","Authenticated","RankingsPage","CustomDelay","WithCallbacks"];export{i as Authenticated,l as CustomDelay,a as Default,d as RankingsPage,p as WithCallbacks,R as __namedExportsOrder,w as default};
