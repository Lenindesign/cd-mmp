import{j as e,R as E}from"./iframe-Nxp4yMSg.js";import{B as k}from"./Button-CI6sPZhV.js";import"./preload-helper-PPVm8Dsz.js";const S={error:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),empty:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}),e.jsx("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),e.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]}),"not-found":e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"}),e.jsx("line",{x1:"8",y1:"11",x2:"14",y2:"11"})]}),offline:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"}),e.jsx("path",{d:"M16.72 11.06A10.94 10.94 0 0 1 19 12.55"}),e.jsx("path",{d:"M5 12.55a10.94 10.94 0 0 1 5.17-2.39"}),e.jsx("path",{d:"M10.71 5.05A16 16 0 0 1 22.58 9"}),e.jsx("path",{d:"M1.42 9a15.91 15.91 0 0 1 4.7-2.88"}),e.jsx("path",{d:"M8.53 16.11a6 6 0 0 1 6.95 0"}),e.jsx("line",{x1:"12",y1:"20",x2:"12.01",y2:"20"})]})},C={error:{title:"Something went wrong",message:"An unexpected error occurred. Please try again."},empty:{title:"No results found",message:"We couldn't find any items matching your criteria."},"not-found":{title:"Page not found",message:"The page you're looking for doesn't exist or has been moved."},offline:{title:"You're offline",message:"Please check your internet connection and try again."}},t=({title:y,message:r,showRetry:a=!1,retryLabel:f="Try Again",onRetry:g,variant:m="error",icon:v,className:x="",children:R})=>{const h=C[m],b=y||h.title,j=r||h.message,w=v||S[m];return e.jsxs("div",{className:`error-state error-state--${m} ${x}`,role:"alert",children:[e.jsx("div",{className:"error-state__icon","aria-hidden":"true",children:w}),e.jsx("h3",{className:"error-state__title",children:b}),e.jsx("p",{className:"error-state__message",children:j}),R,a&&g&&e.jsx("div",{className:"error-state__actions",children:e.jsx(k,{variant:"primary",onClick:g,children:f})})]})};class T extends E.Component{constructor(r){super(r),this.state={hasError:!1}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,a){console.error("ErrorBoundary caught an error:",r,a),this.props.onError?.(r,a)}handleRetry=()=>{this.setState({hasError:!1,error:void 0})};render(){return this.state.hasError?this.props.fallback?this.props.fallback:e.jsx(t,{variant:"error",title:"Something went wrong",message:this.state.error?.message||"An unexpected error occurred.",showRetry:!0,onRetry:this.handleRetry}):this.props.children}}t.__docgenInfo={description:`ErrorState Component

Displays error, empty, or offline states with consistent styling.

@example
// Basic error state
<ErrorState variant="error" onRetry={() => refetch()} />

// Empty state
<ErrorState variant="empty" title="No vehicles found" />

// Custom error with action
<ErrorState
  title="Failed to load"
  message="Could not load vehicle data."
  showRetry
  onRetry={handleRetry}
/>`,methods:[],displayName:"ErrorState",props:{title:{required:!1,tsType:{name:"string"},description:"Error title"},message:{required:!1,tsType:{name:"string"},description:"Error message/description"},showRetry:{required:!1,tsType:{name:"boolean"},description:"Show retry button",defaultValue:{value:"false",computed:!1}},retryLabel:{required:!1,tsType:{name:"string"},description:"Retry button label",defaultValue:{value:"'Try Again'",computed:!1}},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Retry callback"},variant:{required:!1,tsType:{name:"union",raw:"'error' | 'empty' | 'not-found' | 'offline'",elements:[{name:"literal",value:"'error'"},{name:"literal",value:"'empty'"},{name:"literal",value:"'not-found'"},{name:"literal",value:"'offline'"}]},description:"Error variant",defaultValue:{value:"'error'",computed:!1}},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Custom icon"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class",defaultValue:{value:"''",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Children for custom content"}}};T.__docgenInfo={description:"",methods:[{name:"handleRetry",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ErrorBoundary",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},fallback:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onError:{required:!1,tsType:{name:"signature",type:"function",raw:"(error: Error, errorInfo: React.ErrorInfo) => void",signature:{arguments:[{type:{name:"Error"},name:"error"},{type:{name:"ReactErrorInfo",raw:"React.ErrorInfo"},name:"errorInfo"}],return:{name:"void"}}},description:""}}};const q={title:"Atoms/ErrorState",component:t,parameters:{layout:"centered",docs:{description:{component:`
# ErrorState

Displays error messages, empty states, and offline notifications to users.

---

## Variants

| Variant | Use Case |
|---------|----------|
| **error** | API failures, unexpected errors |
| **empty** | No results, empty lists |
| **not-found** | 404 pages, missing content |
| **offline** | Network connectivity issues |

---

## Best Practices

- Always provide a clear action (retry, go back, search again)
- Use friendly, non-technical language
- Include relevant context about what went wrong
- Consider providing alternative actions

---

## Content Guidelines

| Element | Guidance |
|---------|----------|
| **Title** | Short, descriptive (2-5 words) |
| **Message** | Explain what happened and what to do next |
| **Action** | Clear verb ("Try Again", "Go Back", "Search") |
        `}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["error","empty","not-found","offline"],description:"Type of error state to display",table:{type:{summary:"error | empty | not-found | offline"},defaultValue:{summary:"error"},category:"Appearance"}},title:{control:"text",description:"Custom title text",table:{type:{summary:"string"},category:"Content"}},message:{control:"text",description:"Custom message text",table:{type:{summary:"string"},category:"Content"}},showRetry:{control:"boolean",description:"Show retry button",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Actions"}},retryLabel:{control:"text",description:"Custom retry button label",table:{type:{summary:"string"},defaultValue:{summary:"Try Again"},category:"Actions"}},onRetry:{description:"Callback when retry button is clicked",table:{type:{summary:"() => void"},category:"Actions"}}}},o={args:{variant:"error",showRetry:!0,onRetry:()=>console.log("Retry clicked")}},s={args:{variant:"empty",title:"No vehicles found",message:"Try adjusting your search criteria or browse all vehicles."}},n={args:{variant:"not-found"}},i={args:{variant:"offline",showRetry:!0,onRetry:()=>console.log("Retry clicked")}},l={args:{variant:"empty",title:"No saved vehicles",message:"Start saving vehicles to see them here."}},d={args:{variant:"error",title:"Failed to load vehicles",message:"There was a problem loading the vehicle list. Please try again.",showRetry:!0,retryLabel:"Try Again",onRetry:()=>alert("Retrying...")}},c={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"24px",maxWidth:"800px"},children:[e.jsx("div",{style:{border:"1px solid #e5e5e5",borderRadius:"8px",padding:"16px"},children:e.jsx(t,{variant:"error"})}),e.jsx("div",{style:{border:"1px solid #e5e5e5",borderRadius:"8px",padding:"16px"},children:e.jsx(t,{variant:"empty"})}),e.jsx("div",{style:{border:"1px solid #e5e5e5",borderRadius:"8px",padding:"16px"},children:e.jsx(t,{variant:"not-found"})}),e.jsx("div",{style:{border:"1px solid #e5e5e5",borderRadius:"8px",padding:"16px"},children:e.jsx(t,{variant:"offline"})})]}),parameters:{layout:"padded"}},p={args:{variant:"empty",title:"No matching vehicles",message:`We couldn't find any vehicles matching "xyz123". Try a different search term.`}},u={args:{variant:"empty",title:"No favorite vehicles yet",message:"Click the heart icon on any vehicle to save it to your favorites."}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    showRetry: true,
    onRetry: () => console.log('Retry clicked')
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'empty',
    title: 'No vehicles found',
    message: 'Try adjusting your search criteria or browse all vehicles.'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'not-found'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'offline',
    showRetry: true,
    onRetry: () => console.log('Retry clicked')
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'empty',
    title: 'No saved vehicles',
    message: 'Start saving vehicles to see them here.'
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    title: 'Failed to load vehicles',
    message: 'There was a problem loading the vehicle list. Please try again.',
    showRetry: true,
    retryLabel: 'Try Again',
    onRetry: () => alert('Retrying...')
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    maxWidth: '800px'
  }}>
      <div style={{
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      padding: '16px'
    }}>
        <ErrorState variant="error" />
      </div>
      <div style={{
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      padding: '16px'
    }}>
        <ErrorState variant="empty" />
      </div>
      <div style={{
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      padding: '16px'
    }}>
        <ErrorState variant="not-found" />
      </div>
      <div style={{
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      padding: '16px'
    }}>
        <ErrorState variant="offline" />
      </div>
    </div>,
  parameters: {
    layout: 'padded'
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'empty',
    title: 'No matching vehicles',
    message: 'We couldn\\'t find any vehicles matching "xyz123". Try a different search term.'
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'empty',
    title: 'No favorite vehicles yet',
    message: 'Click the heart icon on any vehicle to save it to your favorites.'
  }
}`,...u.parameters?.docs?.source}}};const B=["Error","Empty","NotFound","Offline","CustomContent","WithRetry","AllVariants","SearchResultsEmpty","FavoritesEmpty"];export{c as AllVariants,l as CustomContent,s as Empty,o as Error,u as FavoritesEmpty,n as NotFound,i as Offline,p as SearchResultsEmpty,d as WithRetry,B as __namedExportsOrder,q as default};
