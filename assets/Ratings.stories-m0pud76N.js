import{j as e}from"./iframe-WkvYeMlb.js";import{S}from"./star-Cy8JuTyZ.js";import{U as C}from"./users-BypaPy9G.js";import{B as R}from"./badge-check-Bs6Hc1jJ.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-CcdqW5Dm.js";const r={container:{padding:"2rem",fontFamily:"var(--font-body)"},section:{marginBottom:"3rem"},sectionTitle:{fontSize:"1.5rem",fontWeight:600,marginBottom:"1rem",color:"var(--color-gray-900, #1a1a1a)"},sectionDescription:{color:"var(--color-gray-600, #666)",marginBottom:"1.5rem",lineHeight:1.6},previewBox:{padding:"2rem",backgroundColor:"var(--color-gray-50, #f9f9f9)",borderRadius:"12px",border:"1px solid var(--color-gray-200, #e5e5e5)",marginBottom:"1rem"},grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"1.5rem"},label:{fontSize:"0.75rem",color:"var(--color-gray-500, #888)",marginBottom:"0.5rem",textTransform:"uppercase",letterSpacing:"0.05em"},codeBlock:{backgroundColor:"var(--color-gray-900, #1a1a1a)",color:"#e5e5e5",padding:"1rem",borderRadius:"8px",fontSize:"0.875rem",fontFamily:"monospace",overflow:"auto",marginTop:"1rem"}},s=({score:t,maxScore:d=10,size:i="lg",showBadge:a=!0,label:n="C/D RATING"})=>{const l={sm:{score:"2rem",max:"1rem",badge:14,label:"0.625rem",gap:"0.125rem"},md:{score:"2.5rem",max:"1.25rem",badge:16,label:"0.75rem",gap:"0.25rem"},lg:{score:"3.5rem",max:"1.5rem",badge:18,label:"0.75rem",gap:"0.25rem"},xl:{score:"4.5rem",max:"2rem",badge:22,label:"0.875rem",gap:"0.375rem"}}[i];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:l.gap},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",fontFamily:"var(--font-display)",fontWeight:700,color:"var(--color-dark, #222)",lineHeight:1},children:[e.jsx("span",{style:{fontSize:l.score},children:t.toFixed(1)}),e.jsxs("span",{style:{fontSize:l.max,color:"var(--color-gray-500, #666)",fontWeight:400},children:["/",d]})]}),a&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.375rem"},children:[e.jsx(R,{size:l.badge,fill:"var(--color-blue-cobalt, #1B5F8A)",color:"white"}),e.jsx("span",{style:{fontSize:l.label,fontWeight:500,color:"var(--color-blue-cobalt, #1B5F8A)",letterSpacing:"0.02em"},children:n})]})]})},g=({rating:t,maxRating:d=5,size:i="md",showValue:a=!0,reviewCount:n})=>{const l={sm:14,md:18,lg:24}[i],m=Math.floor(t),x=t%1>=.5,p=d-m-(x?1:0);return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsxs("div",{style:{display:"flex",gap:"2px"},children:[Array.from({length:m}).map((z,w)=>e.jsx(S,{size:l,fill:"var(--color-warning, #f59e0b)",color:"var(--color-warning, #f59e0b)"},`full-${w}`)),x&&e.jsxs("div",{style:{position:"relative"},children:[e.jsx(S,{size:l,color:"var(--color-gray-300, #d1d5db)"}),e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"50%",overflow:"hidden"},children:e.jsx(S,{size:l,fill:"var(--color-warning, #f59e0b)",color:"var(--color-warning, #f59e0b)"})})]}),Array.from({length:p}).map((z,w)=>e.jsx(S,{size:l,color:"var(--color-gray-300, #d1d5db)"},`empty-${w}`))]}),a&&e.jsx("span",{style:{fontSize:i==="sm"?"0.75rem":i==="md"?"0.875rem":"1rem",fontWeight:500,color:"var(--color-gray-700, #374151)"},children:t.toFixed(1)}),n!==void 0&&e.jsxs("span",{style:{fontSize:i==="sm"?"0.625rem":"0.75rem",color:"var(--color-gray-500, #888)"},children:["(",n.toLocaleString(),")"]})]})},o=({rating:t,maxRating:d=10,size:i="md",label:a,variant:n="default"})=>{const l=((x,p)=>{const z=x/p;return z>=.8?"var(--color-success, #26870D)":z>=.6?"var(--color-warning, #f59e0b)":"var(--color-error, #ef4444)"})(t,d),m={sm:{fontSize:"1rem",padding:"0.25rem 0.5rem"},md:{fontSize:"1.25rem",padding:"0.375rem 0.75rem"},lg:{fontSize:"1.5rem",padding:"0.5rem 1rem"}};if(n==="circle"){const p={sm:40,md:56,lg:72}[i];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.25rem"},children:[e.jsx("div",{style:{width:p,height:p,borderRadius:"50%",backgroundColor:l,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:m[i].fontSize},children:t.toFixed(1)}),a&&e.jsx("span",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)"},children:a})]})}return n==="badge"?e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.5rem"},children:[a&&e.jsx("span",{style:{fontSize:"0.875rem",color:"var(--color-gray-600)"},children:a}),e.jsx("span",{style:{backgroundColor:l,color:"white",padding:m[i].padding,borderRadius:"4px",fontWeight:700,fontSize:m[i].fontSize},children:t.toFixed(1)})]}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.25rem"},children:[a&&e.jsx("span",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)",textTransform:"uppercase",letterSpacing:"0.05em"},children:a}),e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:"0.25rem"},children:[e.jsx("span",{style:{fontSize:m[i].fontSize,fontWeight:700,color:l},children:t.toFixed(1)}),e.jsxs("span",{style:{fontSize:i==="sm"?"0.75rem":"0.875rem",color:"var(--color-gray-400)"},children:["/",d]})]})]})},c=({rating:t,maxRating:d=10,label:i,showValue:a=!0})=>{const n=t/d*100,y=l=>l>=80?"var(--color-success, #26870D)":l>=60?"var(--color-warning, #f59e0b)":"var(--color-error, #ef4444)";return e.jsxs("div",{style:{width:"100%"},children:[(i||a)&&e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"0.375rem"},children:[i&&e.jsx("span",{style:{fontSize:"0.875rem",color:"var(--color-gray-700)"},children:i}),a&&e.jsx("span",{style:{fontSize:"0.875rem",fontWeight:600,color:y(n)},children:t.toFixed(1)})]}),e.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"var(--color-gray-200, #e5e5e5)",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{width:`${n}%`,height:"100%",backgroundColor:y(n),borderRadius:"4px",transition:"width 0.3s ease"}})})]})},A={title:"Elements/Ratings",parameters:{layout:"fullscreen",docs:{description:{component:"Rating displays for vehicle scores, user reviews, and editorial assessments."}}}},v={render:()=>e.jsx("div",{style:r.container,children:e.jsxs("div",{style:r.section,children:[e.jsx("h2",{style:r.sectionTitle,children:"C/D Score Display"}),e.jsx("p",{style:r.sectionDescription,children:"The primary score display used for Car and Driver ratings. Features a large score with the verified badge icon, indicating an official editorial rating."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Sizes"}),e.jsx("div",{style:r.previewBox,children:e.jsxs("div",{style:{display:"flex",gap:"3rem",alignItems:"flex-end",flexWrap:"wrap"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(s,{score:9.9,size:"sm"}),e.jsx("p",{style:{marginTop:"0.5rem",fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"Small"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(s,{score:9.9,size:"md"}),e.jsx("p",{style:{marginTop:"0.5rem",fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"Medium"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(s,{score:9.9,size:"lg"}),e.jsx("p",{style:{marginTop:"0.5rem",fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"Large"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(s,{score:9.9,size:"xl"}),e.jsx("p",{style:{marginTop:"0.5rem",fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"Extra Large"})]})]})})]}),e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Score Values"}),e.jsx("div",{style:r.previewBox,children:e.jsxs("div",{style:{display:"flex",gap:"3rem",flexWrap:"wrap"},children:[e.jsx(s,{score:9.9,size:"lg"}),e.jsx(s,{score:8.5,size:"lg"}),e.jsx(s,{score:7.2,size:"lg"}),e.jsx(s,{score:6,size:"lg"})]})})]}),e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Without Badge"}),e.jsx("div",{style:r.previewBox,children:e.jsxs("div",{style:{display:"flex",gap:"3rem",flexWrap:"wrap"},children:[e.jsx(s,{score:9.5,size:"lg",showBadge:!1}),e.jsx(s,{score:8,size:"lg",showBadge:!1})]})})]}),e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Custom Labels"}),e.jsx("div",{style:r.previewBox,children:e.jsxs("div",{style:{display:"flex",gap:"3rem",flexWrap:"wrap"},children:[e.jsx(s,{score:9.2,size:"lg",label:"EXPERT RATING"}),e.jsx(s,{score:8.7,size:"lg",label:"STAFF PICK"}),e.jsx(s,{score:9.5,size:"lg",label:"TOP RATED"})]})})]}),e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"In Context - Card Header"}),e.jsxs("div",{style:{width:"320px",backgroundColor:"white",borderRadius:"12px",border:"1px solid var(--color-gray-200)",overflow:"hidden"},children:[e.jsxs("div",{style:{height:"180px",backgroundColor:"var(--color-gray-100)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"},children:[e.jsx("img",{src:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",alt:"Honda Accord",style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",top:"12px",right:"12px",backgroundColor:"white",padding:"8px 12px",borderRadius:"8px",boxShadow:"var(--shadow-md, 0 3px 6px rgba(0,0,0,0.08))"},children:e.jsx(s,{score:8.5,size:"sm"})})]}),e.jsxs("div",{style:{padding:"1rem"},children:[e.jsx("h3",{style:{fontSize:"1.125rem",fontWeight:600,marginBottom:"0.25rem"},children:"2025 Honda Accord"}),e.jsx("p",{style:{fontSize:"0.875rem",color:"var(--color-gray-500)"},children:"Starting at $28,990"})]})]})]})]})]})})},h={render:()=>e.jsx("div",{style:r.container,children:e.jsxs("div",{style:r.section,children:[e.jsx("h2",{style:r.sectionTitle,children:"Star Ratings"}),e.jsx("p",{style:r.sectionDescription,children:"Used for community ratings and user reviews. Supports half-star increments."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Sizes"}),e.jsx("div",{style:r.previewBox,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2rem"},children:[e.jsx("span",{style:{width:"60px",fontSize:"0.875rem",color:"var(--color-gray-500)"},children:"Small"}),e.jsx(g,{rating:4.5,size:"sm"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2rem"},children:[e.jsx("span",{style:{width:"60px",fontSize:"0.875rem",color:"var(--color-gray-500)"},children:"Medium"}),e.jsx(g,{rating:4.5,size:"md"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"2rem"},children:[e.jsx("span",{style:{width:"60px",fontSize:"0.875rem",color:"var(--color-gray-500)"},children:"Large"}),e.jsx(g,{rating:4.5,size:"lg"})]})]})})]}),e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Rating Values"}),e.jsx("div",{style:r.previewBox,children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[5,4.5,4,3.5,3,2.5,2,1].map(t=>e.jsx(g,{rating:t,size:"md"},t))})})]}),e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"With Review Count"}),e.jsx("div",{style:r.previewBox,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(g,{rating:4.7,reviewCount:1243}),e.jsx(g,{rating:4.2,reviewCount:89}),e.jsx(g,{rating:3.8,reviewCount:12})]})})]})]})]})})},f={render:()=>e.jsx("div",{style:r.container,children:e.jsxs("div",{style:r.section,children:[e.jsx("h2",{style:r.sectionTitle,children:"Numeric Ratings"}),e.jsx("p",{style:r.sectionDescription,children:"Alternative numeric display styles for category scores and compact layouts. Color-coded by score level."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Default Variant"}),e.jsx("div",{style:r.previewBox,children:e.jsxs("div",{style:r.grid,children:[e.jsx(o,{rating:9.2,label:"C/D Rating"}),e.jsx(o,{rating:7.5,label:"C/D Rating"}),e.jsx(o,{rating:5.8,label:"C/D Rating"})]})})]}),e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Badge Variant"}),e.jsx("div",{style:r.previewBox,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(o,{rating:9.2,variant:"badge",label:"Overall:"}),e.jsx(o,{rating:7.5,variant:"badge",label:"Overall:"}),e.jsx(o,{rating:5.8,variant:"badge",label:"Overall:"})]})})]}),e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Circle Variant"}),e.jsx("div",{style:r.previewBox,children:e.jsxs("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap"},children:[e.jsx(o,{rating:9.2,variant:"circle",size:"lg",label:"Excellent"}),e.jsx(o,{rating:7.5,variant:"circle",size:"lg",label:"Good"}),e.jsx(o,{rating:5.8,variant:"circle",size:"lg",label:"Average"}),e.jsx(o,{rating:4.2,variant:"circle",size:"lg",label:"Below Avg"})]})})]}),e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Sizes"}),e.jsx("div",{style:r.previewBox,children:e.jsxs("div",{style:{display:"flex",gap:"2rem",alignItems:"flex-end"},children:[e.jsx(o,{rating:8.5,variant:"circle",size:"sm",label:"Small"}),e.jsx(o,{rating:8.5,variant:"circle",size:"md",label:"Medium"}),e.jsx(o,{rating:8.5,variant:"circle",size:"lg",label:"Large"})]})})]})]})]})})},u={render:()=>e.jsx("div",{style:r.container,children:e.jsxs("div",{style:r.section,children:[e.jsx("h2",{style:r.sectionTitle,children:"Rating Bars"}),e.jsx("p",{style:r.sectionDescription,children:"Used for showing category breakdowns and detailed scoring. Great for comparing multiple attributes."}),e.jsx("div",{style:r.previewBox,children:e.jsxs("div",{style:{maxWidth:"400px",display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(c,{rating:9.2,label:"Performance"}),e.jsx(c,{rating:8.5,label:"Comfort"}),e.jsx(c,{rating:7.8,label:"Interior"}),e.jsx(c,{rating:7.2,label:"Technology"}),e.jsx(c,{rating:6.5,label:"Value"}),e.jsx(c,{rating:5,label:"Fuel Economy"})]})})]})})},b={render:()=>e.jsx("div",{style:r.container,children:e.jsxs("div",{style:r.section,children:[e.jsx("h2",{style:r.sectionTitle,children:"Ratings in Context"}),e.jsx("p",{style:r.sectionDescription,children:"Examples of how ratings appear in vehicle cards, detail pages, and comparison views."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Vehicle Card"}),e.jsxs("div",{style:{width:"320px",backgroundColor:"white",borderRadius:"12px",border:"1px solid var(--color-gray-200)",overflow:"hidden"},children:[e.jsx("div",{style:{height:"180px",backgroundColor:"var(--color-gray-100)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("img",{src:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",alt:"Honda Accord",style:{width:"100%",height:"100%",objectFit:"cover"}})}),e.jsxs("div",{style:{padding:"1rem"},children:[e.jsx("h3",{style:{fontSize:"1.125rem",fontWeight:600,marginBottom:"0.5rem"},children:"2025 Honda Accord"}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx(S,{size:14,fill:"var(--color-blue-cobalt)",color:"var(--color-blue-cobalt)"}),e.jsx("span",{style:{fontSize:"0.875rem",fontWeight:600},children:"8.5"}),e.jsx("span",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"C/D Rating"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.25rem"},children:[e.jsx(C,{size:12,color:"var(--color-gray-400)"}),e.jsx("span",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"4.5 (892)"})]})]})]})]})]}),e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Rating Summary Panel"}),e.jsxs("div",{style:{maxWidth:"400px",padding:"1.5rem",backgroundColor:"white",borderRadius:"12px",border:"1px solid var(--color-gray-200)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"1.5rem",marginBottom:"1.5rem"},children:[e.jsx(s,{score:8.5,size:"lg"}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1.125rem",fontWeight:600,marginBottom:"0.25rem"},children:"Expert Evaluation"}),e.jsx("p",{style:{fontSize:"0.875rem",color:"var(--color-gray-500)"},children:"Based on comprehensive testing"})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:[e.jsx(c,{rating:9,label:"Performance"}),e.jsx(c,{rating:8.5,label:"Comfort"}),e.jsx(c,{rating:8,label:"Interior"}),e.jsx(c,{rating:7.5,label:"Value"})]})]})]}),e.jsxs("div",{children:[e.jsx("p",{style:r.label,children:"Staff + Community Ratings"}),e.jsxs("div",{style:{display:"flex",gap:"2rem",padding:"1.5rem",backgroundColor:"var(--color-gray-50)",borderRadius:"12px",maxWidth:"500px"},children:[e.jsxs("div",{style:{flex:1,textAlign:"center",borderRight:"1px solid var(--color-gray-200)",paddingRight:"2rem"},children:[e.jsxs("div",{style:{fontSize:"2rem",fontWeight:700,color:"var(--color-dark)"},children:["8.5",e.jsx("span",{style:{fontSize:"1rem",color:"var(--color-gray-400)",fontWeight:400},children:"/10"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.375rem",marginTop:"0.25rem"},children:[e.jsx(R,{size:14,fill:"var(--color-blue-cobalt)",color:"white"}),e.jsx("span",{style:{fontSize:"0.7rem",color:"var(--color-blue-cobalt)",fontWeight:500},children:"C/D RATING"})]})]}),e.jsxs("div",{style:{flex:1,textAlign:"center"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",marginBottom:"0.5rem"},children:[e.jsx(C,{size:16,color:"var(--color-gray-500)"}),e.jsx("span",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)",textTransform:"uppercase"},children:"Community"})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"0.25rem"},children:e.jsx(g,{rating:4.5,size:"md",showValue:!1})}),e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--color-gray-400)"},children:"892 reviews"})]})]})]})]})]})})},j={render:()=>e.jsx("div",{style:r.container,children:e.jsxs("div",{style:r.section,children:[e.jsx("h2",{style:r.sectionTitle,children:"Implementation"}),e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginBottom:"0.5rem"},children:"C/D Score Component"}),e.jsx("pre",{style:r.codeBlock,children:`interface CDScoreProps {
  score: number;         // 0-10 scale
  maxScore?: number;     // Default: 10
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;   // Show verified badge
  label?: string;        // Default: 'C/D RATING'
}

// Usage
<CDScore score={9.9} />
<CDScore score={8.5} size="xl" />
<CDScore score={7.2} showBadge={false} />
<CDScore score={9.0} label="EXPERT RATING" />`}),e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginTop:"2rem",marginBottom:"0.5rem"},children:"Star Rating Component"}),e.jsx("pre",{style:r.codeBlock,children:`interface StarRatingProps {
  rating: number;        // 0-5 scale
  maxRating?: number;    // Default: 5
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
}

// Usage
<StarRating rating={4.5} />
<StarRating rating={4.2} size="lg" reviewCount={892} />`}),e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginTop:"2rem",marginBottom:"0.5rem"},children:"Numeric Rating Component"}),e.jsx("pre",{style:r.codeBlock,children:`interface NumericRatingProps {
  rating: number;        // 0-10 scale (typically)
  maxRating?: number;    // Default: 10
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  variant?: 'default' | 'badge' | 'circle';
}

// Usage
<NumericRating rating={8.5} label="C/D Rating" />
<NumericRating rating={9.0} variant="circle" size="lg" />
<NumericRating rating={7.5} variant="badge" label="Overall:" />`}),e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginTop:"2rem",marginBottom:"0.5rem"},children:"Color Thresholds"}),e.jsx("pre",{style:r.codeBlock,children:`// Rating color logic
const getColor = (rating: number, maxRating: number) => {
  const percentage = rating / maxRating;
  
  if (percentage >= 0.8) {
    return 'var(--color-success)';  // Green: 8+/10 or 4+/5
  }
  if (percentage >= 0.6) {
    return 'var(--color-warning)';  // Yellow: 6-7.9/10 or 3-3.9/5
  }
  return 'var(--color-error)';      // Red: <6/10 or <3/5
};`}),e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginTop:"2rem",marginBottom:"0.5rem"},children:"CSS Variables Used"}),e.jsx("pre",{style:r.codeBlock,children:`/* Rating colors */
--color-success: #26870D     /* High ratings (green) */
--color-warning: #f59e0b     /* Medium ratings, stars (yellow/gold) */
--color-error: #ef4444       /* Low ratings (red) */
--color-blue-cobalt: #1B5F8A /* C/D Rating accent */

/* Supporting colors */
--color-gray-200: #e5e5e5    /* Empty stars, bar backgrounds */
--color-gray-300: #d1d5db    /* Empty star stroke */
--color-gray-500: #888       /* Labels, review counts */`})]})})};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>C/D Score Display</h2>
        <p style={styles.sectionDescription}>
          The primary score display used for Car and Driver ratings. Features a large score with 
          the verified badge icon, indicating an official editorial rating.
        </p>
        
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
          <div>
            <p style={styles.label}>Sizes</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '3rem',
              alignItems: 'flex-end',
              flexWrap: 'wrap'
            }}>
                <div style={{
                textAlign: 'center'
              }}>
                  <CDScore score={9.9} size="sm" />
                  <p style={{
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>Small</p>
                </div>
                <div style={{
                textAlign: 'center'
              }}>
                  <CDScore score={9.9} size="md" />
                  <p style={{
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>Medium</p>
                </div>
                <div style={{
                textAlign: 'center'
              }}>
                  <CDScore score={9.9} size="lg" />
                  <p style={{
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>Large</p>
                </div>
                <div style={{
                textAlign: 'center'
              }}>
                  <CDScore score={9.9} size="xl" />
                  <p style={{
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>Extra Large</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Score Values</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '3rem',
              flexWrap: 'wrap'
            }}>
                <CDScore score={9.9} size="lg" />
                <CDScore score={8.5} size="lg" />
                <CDScore score={7.2} size="lg" />
                <CDScore score={6.0} size="lg" />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Without Badge</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '3rem',
              flexWrap: 'wrap'
            }}>
                <CDScore score={9.5} size="lg" showBadge={false} />
                <CDScore score={8.0} size="lg" showBadge={false} />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Custom Labels</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '3rem',
              flexWrap: 'wrap'
            }}>
                <CDScore score={9.2} size="lg" label="EXPERT RATING" />
                <CDScore score={8.7} size="lg" label="STAFF PICK" />
                <CDScore score={9.5} size="lg" label="TOP RATED" />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>In Context - Card Header</p>
            <div style={{
            width: '320px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid var(--color-gray-200)',
            overflow: 'hidden'
          }}>
              <div style={{
              height: '180px',
              backgroundColor: 'var(--color-gray-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
                <img src="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg" alt="Honda Accord" style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} />
                <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-md, 0 3px 6px rgba(0,0,0,0.08))'
              }}>
                  <CDScore score={8.5} size="sm" />
                </div>
              </div>
              <div style={{
              padding: '1rem'
            }}>
                <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '0.25rem'
              }}>2025 Honda Accord</h3>
                <p style={{
                fontSize: '0.875rem',
                color: 'var(--color-gray-500)'
              }}>Starting at $28,990</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...v.parameters?.docs?.source},description:{story:"C/D Score - The prominent Car and Driver score display with verified badge.",...v.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Star Ratings</h2>
        <p style={styles.sectionDescription}>
          Used for community ratings and user reviews. Supports half-star increments.
        </p>
        
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
          <div>
            <p style={styles.label}>Sizes</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem'
              }}>
                  <span style={{
                  width: '60px',
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-500)'
                }}>Small</span>
                  <StarRating rating={4.5} size="sm" />
                </div>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem'
              }}>
                  <span style={{
                  width: '60px',
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-500)'
                }}>Medium</span>
                  <StarRating rating={4.5} size="md" />
                </div>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem'
              }}>
                  <span style={{
                  width: '60px',
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-500)'
                }}>Large</span>
                  <StarRating rating={4.5} size="lg" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Rating Values</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
                {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1].map(rating => <StarRating key={rating} rating={rating} size="md" />)}
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>With Review Count</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
                <StarRating rating={4.7} reviewCount={1243} />
                <StarRating rating={4.2} reviewCount={89} />
                <StarRating rating={3.8} reviewCount={12} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...h.parameters?.docs?.source},description:{story:"Star ratings for community/user reviews.",...h.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Numeric Ratings</h2>
        <p style={styles.sectionDescription}>
          Alternative numeric display styles for category scores and compact layouts. Color-coded by score level.
        </p>
        
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
          <div>
            <p style={styles.label}>Default Variant</p>
            <div style={styles.previewBox}>
              <div style={styles.grid}>
                <NumericRating rating={9.2} label="C/D Rating" />
                <NumericRating rating={7.5} label="C/D Rating" />
                <NumericRating rating={5.8} label="C/D Rating" />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Badge Variant</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
                <NumericRating rating={9.2} variant="badge" label="Overall:" />
                <NumericRating rating={7.5} variant="badge" label="Overall:" />
                <NumericRating rating={5.8} variant="badge" label="Overall:" />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Circle Variant</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
                <NumericRating rating={9.2} variant="circle" size="lg" label="Excellent" />
                <NumericRating rating={7.5} variant="circle" size="lg" label="Good" />
                <NumericRating rating={5.8} variant="circle" size="lg" label="Average" />
                <NumericRating rating={4.2} variant="circle" size="lg" label="Below Avg" />
              </div>
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Sizes</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-end'
            }}>
                <NumericRating rating={8.5} variant="circle" size="sm" label="Small" />
                <NumericRating rating={8.5} variant="circle" size="md" label="Medium" />
                <NumericRating rating={8.5} variant="circle" size="lg" label="Large" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...f.parameters?.docs?.source},description:{story:"Numeric ratings for staff/editorial scores.",...f.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Rating Bars</h2>
        <p style={styles.sectionDescription}>
          Used for showing category breakdowns and detailed scoring. Great for comparing multiple attributes.
        </p>
        
        <div style={styles.previewBox}>
          <div style={{
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
            <RatingBar rating={9.2} label="Performance" />
            <RatingBar rating={8.5} label="Comfort" />
            <RatingBar rating={7.8} label="Interior" />
            <RatingBar rating={7.2} label="Technology" />
            <RatingBar rating={6.5} label="Value" />
            <RatingBar rating={5.0} label="Fuel Economy" />
          </div>
        </div>
      </div>
    </div>
}`,...u.parameters?.docs?.source},description:{story:"Rating bars for category breakdowns.",...u.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Ratings in Context</h2>
        <p style={styles.sectionDescription}>
          Examples of how ratings appear in vehicle cards, detail pages, and comparison views.
        </p>
        
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
          {/* Vehicle Card Rating */}
          <div>
            <p style={styles.label}>Vehicle Card</p>
            <div style={{
            width: '320px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid var(--color-gray-200)',
            overflow: 'hidden'
          }}>
              <div style={{
              height: '180px',
              backgroundColor: 'var(--color-gray-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                <img src="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg" alt="Honda Accord" style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} />
              </div>
              <div style={{
              padding: '1rem'
            }}>
                <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>2025 Honda Accord</h3>
                <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                  <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                    <Star size={14} fill="var(--color-blue-cobalt)" color="var(--color-blue-cobalt)" />
                    <span style={{
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}>8.5</span>
                    <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-gray-500)'
                  }}>C/D Rating</span>
                  </div>
                  <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                    <Users size={12} color="var(--color-gray-400)" />
                    <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-gray-500)'
                  }}>4.5 (892)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rating Summary */}
          <div>
            <p style={styles.label}>Rating Summary Panel</p>
            <div style={{
            maxWidth: '400px',
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid var(--color-gray-200)'
          }}>
              <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
                <CDScore score={8.5} size="lg" />
                <div>
                  <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.25rem'
                }}>Expert Evaluation</h3>
                  <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-500)'
                }}>Based on comprehensive testing</p>
                </div>
              </div>
              <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
                <RatingBar rating={9.0} label="Performance" />
                <RatingBar rating={8.5} label="Comfort" />
                <RatingBar rating={8.0} label="Interior" />
                <RatingBar rating={7.5} label="Value" />
              </div>
            </div>
          </div>
          
          {/* Dual Rating Display */}
          <div>
            <p style={styles.label}>Staff + Community Ratings</p>
            <div style={{
            display: 'flex',
            gap: '2rem',
            padding: '1.5rem',
            backgroundColor: 'var(--color-gray-50)',
            borderRadius: '12px',
            maxWidth: '500px'
          }}>
              <div style={{
              flex: 1,
              textAlign: 'center',
              borderRight: '1px solid var(--color-gray-200)',
              paddingRight: '2rem'
            }}>
                <div style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-dark)'
              }}>8.5<span style={{
                  fontSize: '1rem',
                  color: 'var(--color-gray-400)',
                  fontWeight: 400
                }}>/10</span></div>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
                marginTop: '0.25rem'
              }}>
                  <BadgeCheck size={14} fill="var(--color-blue-cobalt)" color="white" />
                  <span style={{
                  fontSize: '0.7rem',
                  color: 'var(--color-blue-cobalt)',
                  fontWeight: 500
                }}>C/D RATING</span>
                </div>
              </div>
              <div style={{
              flex: 1,
              textAlign: 'center'
            }}>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                  <Users size={16} color="var(--color-gray-500)" />
                  <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)',
                  textTransform: 'uppercase'
                }}>Community</span>
                </div>
                <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '0.25rem'
              }}>
                  <StarRating rating={4.5} size="md" showValue={false} />
                </div>
                <div style={{
                fontSize: '0.75rem',
                color: 'var(--color-gray-400)'
              }}>892 reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...b.parameters?.docs?.source},description:{story:"Combined rating displays as seen on vehicle cards and pages.",...b.parameters?.docs?.description}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Implementation</h2>
        
        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginBottom: '0.5rem'
      }}>C/D Score Component</h3>
        <pre style={styles.codeBlock}>
        {\`interface CDScoreProps {
  score: number;         // 0-10 scale
  maxScore?: number;     // Default: 10
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;   // Show verified badge
  label?: string;        // Default: 'C/D RATING'
}

// Usage
<CDScore score={9.9} />
<CDScore score={8.5} size="xl" />
<CDScore score={7.2} showBadge={false} />
<CDScore score={9.0} label="EXPERT RATING" />\`}
        </pre>
        
        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.5rem'
      }}>Star Rating Component</h3>
        <pre style={styles.codeBlock}>
        {\`interface StarRatingProps {
  rating: number;        // 0-5 scale
  maxRating?: number;    // Default: 5
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
}

// Usage
<StarRating rating={4.5} />
<StarRating rating={4.2} size="lg" reviewCount={892} />\`}
        </pre>
        
        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.5rem'
      }}>Numeric Rating Component</h3>
        <pre style={styles.codeBlock}>
        {\`interface NumericRatingProps {
  rating: number;        // 0-10 scale (typically)
  maxRating?: number;    // Default: 10
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  variant?: 'default' | 'badge' | 'circle';
}

// Usage
<NumericRating rating={8.5} label="C/D Rating" />
<NumericRating rating={9.0} variant="circle" size="lg" />
<NumericRating rating={7.5} variant="badge" label="Overall:" />\`}
        </pre>

        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.5rem'
      }}>Color Thresholds</h3>
        <pre style={styles.codeBlock}>
        {\`// Rating color logic
const getColor = (rating: number, maxRating: number) => {
  const percentage = rating / maxRating;
  
  if (percentage >= 0.8) {
    return 'var(--color-success)';  // Green: 8+/10 or 4+/5
  }
  if (percentage >= 0.6) {
    return 'var(--color-warning)';  // Yellow: 6-7.9/10 or 3-3.9/5
  }
  return 'var(--color-error)';      // Red: <6/10 or <3/5
};\`}
        </pre>

        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.5rem'
      }}>CSS Variables Used</h3>
        <pre style={styles.codeBlock}>
        {\`/* Rating colors */
--color-success: #26870D     /* High ratings (green) */
--color-warning: #f59e0b     /* Medium ratings, stars (yellow/gold) */
--color-error: #ef4444       /* Low ratings (red) */
--color-blue-cobalt: #1B5F8A /* C/D Rating accent */

/* Supporting colors */
--color-gray-200: #e5e5e5    /* Empty stars, bar backgrounds */
--color-gray-300: #d1d5db    /* Empty star stroke */
--color-gray-500: #888       /* Labels, review counts */\`}
        </pre>
      </div>
    </div>
}`,...j.parameters?.docs?.source},description:{story:"Implementation guidelines and code examples.",...j.parameters?.docs?.description}}};const N=["CDScores","StarRatings","NumericRatings","RatingBars","InContext","Implementation"];export{v as CDScores,j as Implementation,b as InContext,f as NumericRatings,u as RatingBars,h as StarRatings,N as __namedExportsOrder,A as default};
