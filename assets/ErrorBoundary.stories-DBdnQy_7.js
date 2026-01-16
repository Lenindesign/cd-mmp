import{r as p,j as r}from"./iframe-CteVUm2l.js";import{T as h}from"./triangle-alert-DjcU5atD.js";import{c as m}from"./createLucideIcon-DtMutFgL.js";import{H as y}from"./house-CpLsois-.js";import"./preload-helper-PPVm8Dsz.js";const g=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],u=m("refresh-cw",g);class e extends p.Component{constructor(o){super(o),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(o){return{hasError:!0,error:o}}componentDidCatch(o,c){console.error("Error Boundary caught an error:",o,c),this.setState({error:o,errorInfo:c})}handleReset=()=>{this.setState({hasError:!1,error:null,errorInfo:null})};handleReload=()=>{window.location.reload()};handleGoHome=()=>{window.location.href="/"};render(){return this.state.hasError?this.props.fallback?this.props.fallback:r.jsx("div",{className:"error-boundary",children:r.jsxs("div",{className:"error-boundary__container",children:[r.jsx("div",{className:"error-boundary__icon",children:r.jsx(h,{size:64})}),r.jsxs("div",{className:"error-boundary__content",children:[r.jsx("h1",{className:"error-boundary__title",children:"Something Went Wrong"}),r.jsx("p",{className:"error-boundary__message",children:"We're sorry, but something unexpected happened. Our team has been notified and we're working on a fix."}),!1,r.jsxs("div",{className:"error-boundary__actions",children:[r.jsxs("button",{onClick:this.handleReset,className:"error-boundary__btn error-boundary__btn--secondary",children:[r.jsx(u,{size:18}),"Try Again"]}),r.jsxs("button",{onClick:this.handleReload,className:"error-boundary__btn error-boundary__btn--secondary",children:[r.jsx(u,{size:18}),"Reload Page"]}),r.jsxs("button",{onClick:this.handleGoHome,className:"error-boundary__btn error-boundary__btn--primary",children:[r.jsx(y,{size:18}),"Go to Homepage"]})]}),r.jsxs("p",{className:"error-boundary__help",children:["If the problem persists, please"," ",r.jsx("a",{href:"mailto:support@caranddriver.com",className:"error-boundary__link",children:"contact support"}),"."]})]})]})}):this.props.children}}e.__docgenInfo={description:"",methods:[{name:"handleReset",docblock:null,modifiers:[],params:[],returns:null},{name:"handleReload",docblock:null,modifiers:[],params:[],returns:null},{name:"handleGoHome",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ErrorBoundary",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},fallback:{required:!1,tsType:{name:"ReactNode"},description:""}}};const E={title:"Atoms/ErrorBoundary",component:e,parameters:{layout:"fullscreen",docs:{description:{component:`
# ErrorBoundary

React error boundary component that catches JavaScript errors in child components and displays a fallback UI.

---

## Purpose

Prevents the entire application from crashing when an error occurs in a component tree. Instead, it shows a user-friendly error message with recovery options.

---

## Features

| Feature | Description |
|---------|-------------|
| **Error Catching** | Catches errors in child component tree |
| **Fallback UI** | Shows user-friendly error message |
| **Recovery Actions** | Try Again, Reload Page, Go Home buttons |
| **Dev Details** | Shows stack trace in development mode |
| **Custom Fallback** | Accepts custom fallback component |

---

## Usage

Wrap components or routes that might throw errors:

\`\`\`tsx
<ErrorBoundary>
  <ComponentThatMightFail />
</ErrorBoundary>
\`\`\`

With custom fallback:

\`\`\`tsx
<ErrorBoundary fallback={<CustomErrorUI />}>
  <ComponentThatMightFail />
</ErrorBoundary>
\`\`\`

---

## Best Practices

- Wrap at route level for page-wide errors
- Wrap around third-party components
- Use custom fallbacks for specific contexts
- Log errors to monitoring service in production
        `}}},tags:["autodocs"]},n=({shouldThrow:l=!0})=>{if(l)throw new Error("This is a simulated error for demonstration purposes");return r.jsxs("div",{style:{padding:"40px",textAlign:"center"},children:[r.jsx("h2",{children:"Component Rendered Successfully"}),r.jsx("p",{children:"No error occurred."})]})},t={parameters:{docs:{description:{story:"Default error boundary UI when an error is caught. Shows error message with recovery options."}}},render:()=>r.jsx(e,{children:r.jsx(n,{shouldThrow:!0})})},a={parameters:{docs:{description:{story:"When no error occurs, children render normally."}}},render:()=>r.jsx(e,{children:r.jsx(n,{shouldThrow:!1})})},x=()=>r.jsxs("div",{style:{padding:"60px",textAlign:"center",background:"var(--color-neutrals-7, #F4F5F6)",minHeight:"300px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"16px"},children:[r.jsx("div",{style:{fontSize:"48px"},children:"🚗💨"}),r.jsx("h2",{style:{margin:0,fontFamily:"var(--font-heading)",fontSize:"24px"},children:"Oops! Hit a speed bump"}),r.jsx("p",{style:{margin:0,color:"var(--color-neutrals-4, #6E7481)",maxWidth:"400px"},children:"We encountered an unexpected issue. Please try refreshing the page."}),r.jsx("button",{onClick:()=>window.location.reload(),className:"cta cta--primary cta--default",style:{marginTop:"8px"},children:"Refresh Page"})]}),s={parameters:{docs:{description:{story:"Error boundary with a custom fallback component that matches the application theme."}}},render:()=>r.jsx(e,{fallback:r.jsx(x,{}),children:r.jsx(n,{shouldThrow:!0})})},i={parameters:{docs:{description:{story:"Multiple error boundaries can be nested. Only the nearest boundary catches the error."}}},render:()=>r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",padding:"24px"},children:[r.jsxs("div",{children:[r.jsx("h3",{style:{marginBottom:"16px"},children:"Section 1 (Error)"}),r.jsx(e,{children:r.jsx(n,{shouldThrow:!0})})]}),r.jsxs("div",{children:[r.jsx("h3",{style:{marginBottom:"16px"},children:"Section 2 (Working)"}),r.jsx(e,{children:r.jsx(n,{shouldThrow:!1})})]})]})},d={parameters:{docs:{description:{story:"Implementation guide for using ErrorBoundary in your application."}}},render:()=>r.jsxs("div",{style:{padding:"40px",maxWidth:"800px",margin:"0 auto"},children:[r.jsx("h1",{style:{marginBottom:"24px"},children:"ErrorBoundary Implementation Guide"}),r.jsxs("section",{style:{marginBottom:"32px"},children:[r.jsx("h2",{children:"Basic Usage"}),r.jsx("pre",{style:{background:"#1d1d1f",color:"#f5f5f7",padding:"16px",borderRadius:"8px",overflow:"auto"},children:`import ErrorBoundary from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicle/:slug" element={<VehiclePage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}`})]}),r.jsxs("section",{style:{marginBottom:"32px"},children:[r.jsx("h2",{children:"Route-Level Boundaries"}),r.jsx("pre",{style:{background:"#1d1d1f",color:"#f5f5f7",padding:"16px",borderRadius:"8px",overflow:"auto"},children:`<Routes>
  <Route 
    path="/vehicle/:slug" 
    element={
      <ErrorBoundary>
        <VehiclePage />
      </ErrorBoundary>
    } 
  />
</Routes>`})]}),r.jsxs("section",{children:[r.jsx("h2",{children:"When to Use"}),r.jsxs("ul",{style:{lineHeight:"1.8"},children:[r.jsx("li",{children:"Wrap the entire app at the root level"}),r.jsx("li",{children:"Wrap individual routes for isolated error handling"}),r.jsx("li",{children:"Wrap third-party components that might fail"}),r.jsx("li",{children:"Wrap data-dependent sections that could error on bad data"})]})]})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Default error boundary UI when an error is caught. Shows error message with recovery options.'
      }
    }
  },
  render: () => <ErrorBoundary>
      <BuggyComponent shouldThrow={true} />
    </ErrorBoundary>
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'When no error occurs, children render normally.'
      }
    }
  },
  render: () => <ErrorBoundary>
      <BuggyComponent shouldThrow={false} />
    </ErrorBoundary>
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Error boundary with a custom fallback component that matches the application theme.'
      }
    }
  },
  render: () => <ErrorBoundary fallback={<CustomFallback />}>
      <BuggyComponent shouldThrow={true} />
    </ErrorBoundary>
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Multiple error boundaries can be nested. Only the nearest boundary catches the error.'
      }
    }
  },
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    padding: '24px'
  }}>
      <div>
        <h3 style={{
        marginBottom: '16px'
      }}>Section 1 (Error)</h3>
        <ErrorBoundary>
          <BuggyComponent shouldThrow={true} />
        </ErrorBoundary>
      </div>
      <div>
        <h3 style={{
        marginBottom: '16px'
      }}>Section 2 (Working)</h3>
        <ErrorBoundary>
          <BuggyComponent shouldThrow={false} />
        </ErrorBoundary>
      </div>
    </div>
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Implementation guide for using ErrorBoundary in your application.'
      }
    }
  },
  render: () => <div style={{
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto'
  }}>
      <h1 style={{
      marginBottom: '24px'
    }}>ErrorBoundary Implementation Guide</h1>
      
      <section style={{
      marginBottom: '32px'
    }}>
        <h2>Basic Usage</h2>
        <pre style={{
        background: '#1d1d1f',
        color: '#f5f5f7',
        padding: '16px',
        borderRadius: '8px',
        overflow: 'auto'
      }}>
        {\`import ErrorBoundary from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicle/:slug" element={<VehiclePage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}\`}
        </pre>
      </section>

      <section style={{
      marginBottom: '32px'
    }}>
        <h2>Route-Level Boundaries</h2>
        <pre style={{
        background: '#1d1d1f',
        color: '#f5f5f7',
        padding: '16px',
        borderRadius: '8px',
        overflow: 'auto'
      }}>
        {\`<Routes>
  <Route 
    path="/vehicle/:slug" 
    element={
      <ErrorBoundary>
        <VehiclePage />
      </ErrorBoundary>
    } 
  />
</Routes>\`}
        </pre>
      </section>

      <section>
        <h2>When to Use</h2>
        <ul style={{
        lineHeight: '1.8'
      }}>
          <li>Wrap the entire app at the root level</li>
          <li>Wrap individual routes for isolated error handling</li>
          <li>Wrap third-party components that might fail</li>
          <li>Wrap data-dependent sections that could error on bad data</li>
        </ul>
      </section>
    </div>
}`,...d.parameters?.docs?.source}}};const k=["Default","Working","WithCustomFallback","NestedBoundaries","Documentation"];export{t as Default,d as Documentation,i as NestedBoundaries,s as WithCustomFallback,a as Working,k as __namedExportsOrder,E as default};
