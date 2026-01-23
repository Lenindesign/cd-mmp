import{j as e,r as o}from"./iframe-C2Wzpo-O.js";import{X as k}from"./x-DesiaY3B.js";import{I as S}from"./info-CbDW0jcJ.js";import{T as N}from"./triangle-alert-rppGdRNn.js";import{C as I}from"./circle-alert-_WamfSy3.js";import{C as E}from"./circle-check-big-VU2wemBC.js";import{B as d}from"./Button-D6NhDtLu.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-ByvCI8r-.js";const A=o.createContext(null),W=()=>{const s=o.useContext(A);if(!s)throw new Error("useToast must be used within a ToastProvider");return s},m=({type:s,title:i,message:c,action:n,onClose:l})=>{const t={success:e.jsx(E,{size:20}),error:e.jsx(I,{size:20}),warning:e.jsx(N,{size:20}),info:e.jsx(S,{size:20})};return e.jsxs("div",{className:`toast toast--${s}`,role:"alert","aria-live":"polite",children:[e.jsx("div",{className:"toast__icon",children:t[s]}),e.jsxs("div",{className:"toast__content",children:[i&&e.jsx("div",{className:"toast__title",children:i}),e.jsx("div",{className:"toast__message",children:c}),n&&e.jsx("button",{className:"toast__action",onClick:n.onClick,children:n.label})]}),e.jsx("button",{className:"toast__dismiss",onClick:l,"aria-label":"Close",children:e.jsx(k,{size:16})})]})},V=({toast:s,onDismiss:i})=>{const[c,n]=o.useState(!1);o.useEffect(()=>{if(s.duration!==0){const T=setTimeout(()=>{l()},s.duration||5e3);return()=>clearTimeout(T)}},[s.id,s.duration]);const l=()=>{n(!0),setTimeout(()=>i(s.id),200)},t={success:e.jsx(E,{size:20}),error:e.jsx(I,{size:20}),warning:e.jsx(N,{size:20}),info:e.jsx(S,{size:20})};return e.jsxs("div",{className:`toast toast--${s.type} ${c?"toast--exiting":""}`,role:"alert","aria-live":"polite",children:[e.jsx("div",{className:"toast__icon",children:t[s.type]}),e.jsxs("div",{className:"toast__content",children:[s.title&&e.jsx("div",{className:"toast__title",children:s.title}),e.jsx("div",{className:"toast__message",children:s.message}),s.action&&e.jsx("button",{className:"toast__action",onClick:()=>{s.action?.onClick(),l()},children:s.action.label})]}),e.jsx("button",{className:"toast__dismiss",onClick:l,"aria-label":"Dismiss notification",children:e.jsx(k,{size:16})})]})},R=({position:s="top-right"})=>{const{toasts:i,removeToast:c}=W();return i.length===0?null:e.jsx("div",{className:`toast-container toast-container--${s}`,children:i.map(n=>e.jsx(V,{toast:n,onDismiss:c},n.id))})},D=({children:s,position:i="top-right",maxToasts:c=5})=>{const[n,l]=o.useState([]),t=o.useCallback(a=>{const r=`toast-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;return l(j=>{const w=[...j,{...a,id:r}];return w.length>c?w.slice(-c):w}),r},[c]),T=o.useCallback(a=>{l(r=>r.filter(j=>j.id!==a))},[]),P=o.useCallback((a,r)=>t({type:"success",message:a,title:r}),[t]),q=o.useCallback((a,r)=>t({type:"error",message:a,title:r,duration:8e3}),[t]),O=o.useCallback((a,r)=>t({type:"warning",message:a,title:r}),[t]),z=o.useCallback((a,r)=>t({type:"info",message:a,title:r}),[t]);return e.jsxs(A.Provider,{value:{toasts:n,addToast:t,removeToast:T,success:P,error:q,warning:O,info:z},children:[s,e.jsx(R,{position:i})]})};m.__docgenInfo={description:"",methods:[],displayName:"Toast",props:{type:{required:!0,tsType:{name:"union",raw:"'success' | 'error' | 'warning' | 'info'",elements:[{name:"literal",value:"'success'"},{name:"literal",value:"'error'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'info'"}]},description:""},title:{required:!1,tsType:{name:"string"},description:""},message:{required:!0,tsType:{name:"string"},description:""},action:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  label: string;
  onClick: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};D.__docgenInfo={description:"",methods:[],displayName:"ToastProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},position:{required:!1,tsType:{name:"union",raw:"'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'",elements:[{name:"literal",value:"'top-right'"},{name:"literal",value:"'top-left'"},{name:"literal",value:"'bottom-right'"},{name:"literal",value:"'bottom-left'"},{name:"literal",value:"'top-center'"},{name:"literal",value:"'bottom-center'"}]},description:"",defaultValue:{value:"'top-right'",computed:!1}},maxToasts:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"5",computed:!1}}}};const{fn:_}=__STORYBOOK_MODULE_TEST__,H={title:"Atoms/Toast",component:m,parameters:{layout:"centered",docs:{description:{component:`
# Toast

Notification component for displaying feedback messages to users.

---

## Usage

Use toasts to provide non-blocking feedback about an action or event. They appear temporarily and dismiss automatically or on user action.

| Type | Use Case |
|------|----------|
| **Success** | Confirm completed actions (save, submit, delete) |
| **Error** | Alert users to failures that need attention |
| **Warning** | Warn about potential issues or expiring sessions |
| **Info** | Provide helpful information or updates |

---

## Best Practices

- Keep messages concise (under 100 characters)
- Use action buttons sparingly (one per toast)
- Don't stack more than 3 toasts at once
- Auto-dismiss success/info toasts after 5 seconds
- Require manual dismiss for error/warning toasts

---

## Accessibility

- Toasts use \`role="alert"\` for screen readers
- Focus is not stolen from current element
- Dismiss button has proper aria-label
        `}}},tags:["autodocs"],argTypes:{type:{control:"select",options:["success","error","warning","info"],description:"Visual style and semantic meaning of the toast",table:{type:{summary:"success | error | warning | info"},defaultValue:{summary:"info"},category:"Appearance"}},title:{control:"text",description:"Optional bold heading for the toast",table:{type:{summary:"string"},category:"Content"}},message:{control:"text",description:"Main message content",table:{type:{summary:"string"},category:"Content"}},action:{description:"Optional action button configuration",table:{type:{summary:"{ label: string; onClick: () => void }"},category:"Actions"}},onClose:{description:"Callback when toast is dismissed",table:{type:{summary:"() => void"},category:"Actions"}}},args:{onClose:_()}},u={args:{type:"success",title:"Success!",message:"Your changes have been saved."}},p={args:{type:"error",title:"Error",message:"Something went wrong. Please try again."}},g={args:{type:"warning",title:"Warning",message:"Your session will expire in 5 minutes."}},y={args:{type:"info",title:"Information",message:"New vehicles have been added to your search."}},h={args:{type:"info",title:"Price Alert",message:"A vehicle you saved just dropped in price!",action:{label:"View",onClick:_()}}},f={args:{type:"success",title:"Vehicle Removed",message:"Vehicle removed from your saved list.",action:{label:"Undo",onClick:_()}}},v={args:{type:"success",message:"Operation completed successfully."}},U=()=>{const{addToast:s}=W();return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"12px",alignItems:"center"},children:e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center"},children:[e.jsx(d,{variant:"primary",onClick:()=>s({type:"success",title:"Saved!",message:"Your preferences have been saved."}),children:"Show Success"}),e.jsx(d,{variant:"danger",onClick:()=>s({type:"error",title:"Error",message:"Failed to save changes."}),children:"Show Error"}),e.jsx(d,{variant:"outline",onClick:()=>s({type:"warning",title:"Warning",message:"Check your connection."}),children:"Show Warning"}),e.jsx(d,{variant:"secondary",onClick:()=>s({type:"info",title:"Info",message:"New updates available!"}),children:"Show Info"})]})})},x={render:()=>e.jsx(D,{children:e.jsx(U,{})})},b={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(m,{type:"success",title:"Success",message:"First toast",onClose:()=>{}}),e.jsx(m,{type:"error",title:"Error",message:"Second toast",onClose:()=>{}}),e.jsx(m,{type:"warning",title:"Warning",message:"Third toast",onClose:()=>{}}),e.jsx(m,{type:"info",title:"Info",message:"Fourth toast",onClose:()=>{}})]})},C={args:{type:"info",title:"Important Notice",message:"This is a longer message that demonstrates how the toast handles more content. It should wrap properly and remain readable."}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your changes have been saved.'
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.'
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'Your session will expire in 5 minutes.'
  }
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'info',
    title: 'Information',
    message: 'New vehicles have been added to your search.'
  }
}`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'info',
    title: 'Price Alert',
    message: 'A vehicle you saved just dropped in price!',
    action: {
      label: 'View',
      onClick: fn()
    }
  }
}`,...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'success',
    title: 'Vehicle Removed',
    message: 'Vehicle removed from your saved list.',
    action: {
      label: 'Undo',
      onClick: fn()
    }
  }
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'success',
    message: 'Operation completed successfully.'
  }
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <ToastProvider>
      <ToastDemo />
    </ToastProvider>
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
      <Toast type="success" title="Success" message="First toast" onClose={() => {}} />
      <Toast type="error" title="Error" message="Second toast" onClose={() => {}} />
      <Toast type="warning" title="Warning" message="Third toast" onClose={() => {}} />
      <Toast type="info" title="Info" message="Fourth toast" onClose={() => {}} />
    </div>
}`,...b.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'info',
    title: 'Important Notice',
    message: 'This is a longer message that demonstrates how the toast handles more content. It should wrap properly and remain readable.'
  }
}`,...C.parameters?.docs?.source}}};const J=["Success","Error","Warning","Info","WithAction","WithUndoAction","MessageOnly","InteractiveDemo","StackedToasts","LongMessage"];export{p as Error,y as Info,x as InteractiveDemo,C as LongMessage,v as MessageOnly,b as StackedToasts,u as Success,g as Warning,h as WithAction,f as WithUndoAction,J as __namedExportsOrder,H as default};
